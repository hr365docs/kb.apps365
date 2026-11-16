// Conversation model: serialize/parse, local-storage cache, history load and save through the Node API.
import { conversationSourceDetails, readConversationSource } from "./conversation-persistence.mjs";
import { API_BASE_URL, LOCAL_CONVERSATION_STORAGE_PREFIX, canUseRemotePersistence, tenantId } from "./config.js";
import { state } from "./state.js";
import { searchInput } from "./dom.js";
import { normalizeEmail, userName } from "./identity.js";
import { ensureCustomerSession } from "./customer-session.js";
import { renderHistoryList } from "./shell.js";
import { ensureWebChatInitialized, waitForDirectLineConversationId } from "./directline.js";

let conversationLoadStarted = false;
let conversationLoadVersion = 0;
let serverHistoryReloadScheduled = false;
let conversationSaveTimer = null;

export function getConversationKey(conv) {
  return conv?.conversationId || conv?.spId || conv?.id || "";
}

function normalizeConversationTimestamp(value) {
  if (!value) return Date.now();
  const ts = new Date(value).getTime();
  return Number.isNaN(ts) ? Date.now() : ts;
}

function getLocalConversationStorageKey() {
  const scope = [
    tenantId,
    window.location.pathname || "/",
    state.currentUserEmail || "anonymous",
  ].join(":");
  return `${LOCAL_CONVERSATION_STORAGE_PREFIX}:${scope}`;
}

function cloneConversationForStorage(
  conv,
  { includeContentUrl = false } = {},
) {
  if (!conv) return null;

  return {
    ...conv,
    messages: (conv.messages || []).map((message) => ({
      ...message,
      from: message.from ? { ...message.from } : message.from,
      attachments: Array.isArray(message.attachments)
        ? message.attachments.map((att) => ({
            name: att.name || "Attachment",
            contentType: att.contentType || "",
            ...(includeContentUrl
              ? {
                  contentUrl: att.contentUrl || "",
                  thumbnailUrl: att.thumbnailUrl || "",
                }
              : {}),
          }))
        : [],
    })),
  };
}

function normalizeLocalConversationItem(item) {
  if (!item) return null;

  const messages = sanitizeStoredMessages(item.messages || []);
  const previewSource = messages[messages.length - 1] || {
    text: item.preview || item.title || "",
  };
  const preview = getActivityPreview(previewSource);
  const title =
    item.title ||
    messages.find((m) => m.from?.role === "user")?.text?.trim() ||
    preview ||
    "New chat";

  return {
    spId: item.spId || null,
    conversationId: item.conversationId || item.id || `local-${Date.now()}`,
    title: title.slice(0, 50),
    preview,
    timestamp: normalizeConversationTimestamp(
      item.timestamp || item.modified || item.createdAt,
    ),
    createdAt: item.createdAt || new Date().toISOString(),
    email: item.email || state.currentUserEmail || "",
    pageUrl: item.pageUrl || window.location.href || "",
    userIp: item.userIp || "",
    userId: item.userId || state.userId || "",
    userGuid: item.userGuid || "",
    source: readConversationSource(item),
    feedback: item.feedback || {},
    rating: item.rating || null,
    ratingCardShown: Boolean(item.ratingCardShown || item.rating),
    liveAgent: normalizeLiveAgent(item.liveAgent),
    messages,
  };
}

function loadConversationsFromLocalStorage() {
  try {
    const raw = localStorage.getItem(getLocalConversationStorageKey());
    if (!raw) return [];
    const parsed = JSON.parse(raw);
    if (!Array.isArray(parsed)) return [];
    return parsed.map(normalizeLocalConversationItem).filter(Boolean);
  } catch {
    return [];
  }
}

function saveConversationsToLocalStorage() {
  try {
    const snapshot = state.conversations
      .filter(isConversationForCurrentUser)
      .map((conv) =>
        cloneConversationForStorage(conv, { includeContentUrl: true }),
      );
    localStorage.setItem(
      getLocalConversationStorageKey(),
      JSON.stringify(snapshot),
    );
  } catch (error) {
    console.warn("Unable to save conversations locally", error);
  }
}

function sanitizeStoredMessages(rawMessages) {
  if (!Array.isArray(rawMessages)) return [];

  return rawMessages
    .map((message, index) => {
      if (!message) return null;
      if (message.type && message.from) return message;

      const role =
        message.role === "assistant"
          ? "bot"
          : message.role === "bot"
            ? "bot"
            : message.role === "agent"
              ? "agent"
              : "user";
      const text = message.content || message.text || "";
      const attachments = Array.isArray(message.attachments)
        ? message.attachments.map((att) => ({
            name: att.name || "Attachment",
            contentType: att.contentType || "",
            contentUrl: att.contentUrl || "",
            thumbnailUrl: att.thumbnailUrl || "",
          }))
        : [];

      const isAgent = role === "agent";
      return {
        id: message.id || `msg-${index}`,
        type: "message",
        text,
        attachments,
        from: {
          id:
            role === "user"
              ? state.userId
              : isAgent
                ? message.senderEmail || "agent"
                : "bot",
          name:
            role === "user"
              ? userName
              : isAgent
                ? message.senderName || "Support agent"
                : "Copilot",
          role,
          ...(isAgent && message.senderEmail
            ? { email: message.senderEmail }
            : {}),
        },
        timestamp: message.timestamp || new Date().toISOString(),
      };
    })
    .filter(Boolean);
}

const LIVE_AGENT_STATUSES = [
  "none",
  "pending",
  "assigned",
  "fallback",
  "closed",
];

export function normalizeLiveAgent(value) {
  const status = LIVE_AGENT_STATUSES.includes(value?.status)
    ? value.status
    : "none";
  return {
    status,
    ...(value?.assignedAgentEmail
      ? { assignedAgentEmail: value.assignedAgentEmail }
      : {}),
    ...(value?.assignedAgentName
      ? { assignedAgentName: value.assignedAgentName }
      : {}),
  };
}

function serializeMessageRole(message) {
  const role = message.from?.role;
  if (role === "bot") return "assistant";
  if (role === "agent") return "agent";
  return "user";
}

// Builds the whole ConversationDetails object: everything that used to live in
// separate list columns, plus the message transcript.
function serializeConversation(conv, { includeContentUrl = false } = {}) {
  return {
    title: conv.title || conv.preview || "New chat",
    pageUrl: conv.pageUrl || window.location.href || "",
    userIp: conv.userIp || state.userPublicIp || "",
    feedback: conv.feedback || {},
    messages: (conv.messages || []).map((message) => {
      const role = serializeMessageRole(message);
      return {
        id: message.id || "",
        role,
        content: message.text || "",
        ...(role === "agent" && message.from?.email
          ? { senderEmail: message.from.email }
          : {}),
        ...(role === "agent" && message.from?.name
          ? { senderName: message.from.name }
          : {}),
        attachments: Array.isArray(message.attachments)
          ? message.attachments.map((att) => ({
              name: att.name || "Attachment",
              contentType: att.contentType || "",
              ...(includeContentUrl
                ? {
                    contentUrl: att.contentUrl || "",
                    thumbnailUrl: att.thumbnailUrl || "",
                  }
                : {}),
            }))
          : [],
        timestamp: message.timestamp || new Date().toISOString(),
      };
    }),
    ratingPrompted: Boolean(conv.ratingCardShown || conv.rating),
    rating: conv.rating || null,
    liveAgent: normalizeLiveAgent(conv.liveAgent),
    ...conversationSourceDetails(conv.source),
  };
}

function parseConversationItem(item) {
  const rawDetails = item.ConversationDetails || "";
  let parsed = {};
  if (rawDetails) {
    try {
      parsed = JSON.parse(rawDetails) || {};
    } catch {
      parsed = {};
    }
  }

  const messages = sanitizeStoredMessages(parsed.messages || []);
  const previewSource = messages[messages.length - 1] || {
    text: parsed.title || "",
  };
  const preview = getActivityPreview(previewSource);
  const title =
    parsed.title ||
    messages.find((m) => m.from?.role === "user")?.text?.trim() ||
    preview ||
    "New chat";
  const feedback =
    parsed.feedback && typeof parsed.feedback === "object"
      ? parsed.feedback
      : {};
  const liveAgent = normalizeLiveAgent(
    parsed.liveAgent || { status: item.LiveAgentEscalated },
  );

  return {
    spId: item.Id || item.ID || null,
    conversationId:
      item.ConversationId ||
      item.ConversationID ||
      `sp-${item.Id || item.ID || Date.now()}`,
    title: title.slice(0, 50),
    preview,
    timestamp: normalizeConversationTimestamp(item.Modified || item.Created),
    createdAt: item.Created || new Date().toISOString(),
    email: item.UserEmail || "",
    pageUrl: parsed.pageUrl || "",
    userIp: parsed.userIp || "",
    userId: item.UserEmail || "",
    userGuid: item.UserGUID || "",
    source: readConversationSource(parsed),
    rating: item.Rating
      ? { value: Number(item.Rating), comment: item.FeedbackComment || "" }
      : null,
    ratingCardShown: parsed.ratingPrompted === true || Boolean(item.Rating),
    feedback,
    liveAgent,
    messages,
  };
}
function buildConversationFields(conv) {
  const details = serializeConversation(conv, { includeContentUrl: true });
  return {
    Title: String(details.title || "New chat").slice(0, 255),
    ConversationId: conv.conversationId || "",
    UserEmail: conv.email || state.currentUserEmail || "",
    PageUrl: String(details.pageUrl || "").slice(0, 255),   // ← add
    UserIP: String(details.userIp || ""),
    ConversationDetails: JSON.stringify(details),
    LiveAgentEscalated: details.liveAgent.status,
    Rating: conv.rating?.value ?? null,
    FeedbackComment: conv.rating?.comment || "",
  };
}

// Later statuses written by the API (agent joined, chat closed) must not be rolled
// back by a widget save built from an older in-memory copy.
const LIVE_AGENT_STATUS_RANK = {
  none: 0,
  pending: 1,
  fallback: 1,
  assigned: 2,
  closed: 3,
};

// widgetDetails: serializeConversation() output. rawCurrent: the item's stored JSON.
// Keeps keys the widget doesn't model (session, fallback, ...), liveAgent extras
// (assignedAgentId), and agent messages the widget hasn't received yet.
function mergeServerOwnedDetails(widgetDetails, rawCurrent) {
  let current = null;
  try {
    current = JSON.parse(rawCurrent || "null");
  } catch {
    current = null;
  }
  if (!current || typeof current !== "object" || Array.isArray(current))
    return widgetDetails;

  const serverLive =
    current.liveAgent && typeof current.liveAgent === "object"
      ? current.liveAgent
      : {};
  const widgetStatus = widgetDetails.liveAgent.status;
  const serverStatus = LIVE_AGENT_STATUSES.includes(serverLive.status)
    ? serverLive.status
    : "none";
  const liveAgent = {
    ...serverLive,
    ...widgetDetails.liveAgent,
    status:
      LIVE_AGENT_STATUS_RANK[serverStatus] >
      LIVE_AGENT_STATUS_RANK[widgetStatus]
        ? serverStatus
        : widgetStatus,
  };

  const knownIds = new Set(widgetDetails.messages.map((m) => m.id));
  const missingAgentMessages = (
    Array.isArray(current.messages) ? current.messages : []
  ).filter(
    (m) =>
      m?.role === "agent" &&
      m.id &&
      !knownIds.has(m.id) &&
      !knownIds.has(`agent-${m.id}`),
  );
  const time = (m) => Date.parse(m.timestamp) || 0;
  const messages = missingAgentMessages.length
    ? [...widgetDetails.messages, ...missingAgentMessages].sort(
        (a, b) => time(a) - time(b),
      )
    : widgetDetails.messages;

  return { ...current, ...widgetDetails, liveAgent, messages };
}

function isConversationForCurrentUser(conv) {
  const ownerEmail = String(conv.email || "")
    .trim()
    .toLowerCase();
  const currentEmail = String(state.currentUserEmail || "")
    .trim()
    .toLowerCase();

  if (!currentEmail || !ownerEmail) return false;
  return ownerEmail === currentEmail;
}

async function persistConversation(conv) {
  if (!conv) return;
  // Don't write the item until its ConversationId (directLine.conversationId) is known,
  // so the save carries the real id instead of an empty one.
  if (conv.conversationIdPending) await conv.conversationIdPending;
  if (!canUseRemotePersistence) {
    saveConversationsToLocalStorage();
    return conv;
  }
  if (!conv.conversationId) return conv;

  // The API owns the SharePoint write: it finds/creates the item and merges the
  // server-owned parts of ConversationDetails (session binding, assignedAgentId,
  // agent messages, later liveAgent status) before saving.
  const token = await ensureCustomerSession(conv.conversationId);
  const response = await fetch(`${API_BASE_URL}/api/chat/conversations`, {
    method: "POST",
    headers: {
      Accept: "application/json",
      "Content-Type": "application/json",
      Authorization: `Bearer ${token}`,
    },
    body: JSON.stringify({
      email: normalizeEmail(conv.email || state.currentUserEmail),
      fields: buildConversationFields(conv),
    }),
  });
  if (!response.ok) {
    throw new Error(`Conversation save failed (${response.status})`);
  }
  const data = await response.json().catch(() => null);
  const savedId = data?.id ?? data?.Id ?? data?.ID ?? data?.spId ?? null;
  if (savedId && !conv.spId) conv.spId = savedId;
  return conv;
}

// Which Direct Line conversation a history request can authenticate as: the active
// session's conversation, else the open conversation, else the live Direct Line one.
export function getHistoryConversationId() {
  return (
    (state.customerSessionToken && state.customerSessionConversationId) ||
    state.currentConversation?.conversationId ||
    state.directLine?.conversationId ||
    ""
  );
}

// History was requested before any conversation id existed. Once Direct Line is online
// (one attempt per page), reload so the server history replaces the local fallback.
function scheduleServerHistoryReload() {
  if (serverHistoryReloadScheduled) return;
  serverHistoryReloadScheduled = true;
  void ensureWebChatInitialized()
    .then(() => waitForDirectLineConversationId())
    .then((conversationId) => {
      if (!conversationId) return;
      return state.conversationSaveQueue
        .then(() => loadConversations(true))
        .then(() => renderHistoryList(searchInput?.value || ""));
    })
    .catch(() => {});
}

export function queueConversationSave(conv, immediate = false) {
  if (!conv) return;
  clearTimeout(conversationSaveTimer);

  if (!canUseRemotePersistence) {
    conversationSaveTimer = setTimeout(
      () => {
        saveConversationsToLocalStorage();
      },
      immediate ? 0 : 150,
    );
    return;
  }

  if (immediate) {
    state.conversationSaveQueue = state.conversationSaveQueue
      .then(() => persistConversation(conv))
      .catch((error) => {
        console.error("Unable to save conversation", error);
      });
    return;
  }

  conversationSaveTimer = setTimeout(() => {
    state.conversationSaveQueue = state.conversationSaveQueue
      .then(() => persistConversation(conv))
      .catch((error) => {
        console.error("Unable to save conversation", error);
      });
  }, 500);
}

export async function loadConversations(forceReload = false) {
  if (forceReload) {
    state.conversationLoadPromise = null;
  } else if (state.conversationLoadPromise) {
    return state.conversationLoadPromise;
  }

  if (forceReload) {
    conversationLoadStarted = false;
  }

  const loadVersion = ++conversationLoadVersion;

  state.conversationLoadPromise = (async () => {
    try {
      if (!state.currentUserEmail) {
        state.conversations = [];
        if (loadVersion === conversationLoadVersion) {
          conversationLoadStarted = true;
          renderHistoryList(searchInput?.value || "");
        }
        return state.conversations;
      }

      let serverItems = null;
      if (canUseRemotePersistence) {
        const historyConversationId = getHistoryConversationId();
        const historyToken = historyConversationId
          ? await ensureCustomerSession(historyConversationId)
          : "";
        if (historyToken) {
          const response = await fetch(
            `${API_BASE_URL}/api/chat/conversations?email=${encodeURIComponent(state.currentUserEmail)}`,
            {
              method: "GET",
              headers: {
                Accept: "application/json",
                "Content-Type": "application/json",
                Authorization: `Bearer ${historyToken}`,
              },
            },
          );
          if (!response.ok) {
            throw new Error(
              `Conversation list request failed (${response.status})`,
            );
          }
          const data = await response.json();
          serverItems = Array.isArray(data)
            ? data
            : Array.isArray(data?.conversations)
              ? data.conversations
              : Array.isArray(data?.items)
                ? data.items
                : Array.isArray(data?.value)
                  ? data.value
                  : [];
        } else {
          // No conversation session yet: use the local cache now and load server
          // history as soon as the Direct Line conversation id (and so a session) exists.
          scheduleServerHistoryReload();
        }
      }
      state.conversations = serverItems
        ? serverItems
            .map(parseConversationItem)
            .filter(isConversationForCurrentUser)
        : loadConversationsFromLocalStorage();
      if (loadVersion !== conversationLoadVersion) {
        return state.conversations;
      }
      if (state.currentConversation) {
        const key = getConversationKey(state.currentConversation);
        const stillPresent = state.conversations.some(
          (c) => getConversationKey(c) === key,
        );
        if (!stillPresent) {
          state.conversations.unshift(state.currentConversation);
        }
      }

      conversationLoadStarted = true;
      renderHistoryList(searchInput?.value || "");
      return state.conversations;
    } catch (error) {
      if (canUseRemotePersistence) {
        console.warn(
          "Unable to load conversations from the chat API, using local cache",
          error,
        );
      }
      state.conversations = loadConversationsFromLocalStorage();
      if (loadVersion !== conversationLoadVersion) {
        return state.conversations;
      }
      conversationLoadStarted = true;
      renderHistoryList(searchInput?.value || "");
      return state.conversations;
    } finally {
      if (loadVersion === conversationLoadVersion) {
        state.conversationLoadPromise = null;
      }
    }
  })();

  return state.conversationLoadPromise;
}

export function getActivityPreview(activity) {
  if (activity.text && activity.text.trim()) return activity.text;
  if (activity.attachments?.length) {
    const names = activity.attachments
      .map((a) => a.name || "file")
      .join(", ");
    return `📎 ${names}`;
  }
  return "Message";
}

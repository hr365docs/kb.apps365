import { hydrateIcons } from "./icons.js";
import {
  FLOATING_WIDGET_SOURCE,
  KB_SITE_SEARCH_SOURCE,
  conversationSourceDetails,
  normalizeConversationSource,
  persistConversationItem,
  readConversationSource,
} from "./conversation-persistence.mjs";
import {
  DEFAULT_ASSISTANT_DISPLAY_NAME,
  createBrandingController,
} from "./branding.mjs";

(function () {
  "use strict";

  const tenantId = "apps365";
  const defaultUserId = "";
  const defaultUserName = "";
  const MAX_FILE_SIZE = 4 * 1024 * 1024; // Direct Line channel limit
  // Live chat API (node.js) deployed on Azure App Service.
  const API_BASE_URL =
    "https://knowledgebaseagentr-azhkdfendtachngp.westus3-01.azurewebsites.net";
  const BRANDING_REFRESH_COOLDOWN_MS = 15_000;
  const DEFAULT_BRAND_LOGO_URL =
    "https://ik.imagekit.io/zn4au2jftpm5/CLAILogo.svg";

  // sessionStorage key prefix for the customer session token (per conversationId).
  const LIVE_SESSION_STORAGE_PREFIX = "cw-live-session:";
  const SIGNALR_CDN_URL =
    "https://cdnjs.cloudflare.com/ajax/libs/microsoft-signalr/8.0.7/signalr.min.js";
  const SIGNALR_CDN_INTEGRITY =
    "sha384-mU1xC5yC2LldSW74Rj1Ax8wPiLw/28V5eh51uKJMlBbRVsOtUYd4xyzNsgIAJARB";
  const SHAREPOINT_SITE_URL =
    "https://cubiclogics.sharepoint.com/sites/Apps365KBAgent";
  const SHAREPOINT_LIST_TITLE = "HR365CAChats";
  const SHAREPOINT_HAS_USER_GUID_COLUMN = false;
  const SHAREPOINT_CONVERSATION_SELECT = [
    "Id",
    ...(SHAREPOINT_HAS_USER_GUID_COLUMN ? ["UserGUID"] : []),
    "ConversationId",
    "UserEmail",
    "ConversationDetails",
    "LiveAgentEscalated",
    "Rating",
    "FeedbackComment",
    "Created",
    "Modified",
  ].join(",");
  const SHAREPOINT_TOKEN_URL =
    "https://mt365token.azurewebsites.net/api/token/cubiclogics";
  const isLocalEnvironment =
    location.protocol === "file:" ||
    /^(localhost|127\.0\.0\.1)$/i.test(location.hostname);
  const forceSharePointLocally =
    new URLSearchParams(location.search).get("forceSp") === "1";
  const canUseSharePointPersistence =
    !isLocalEnvironment || forceSharePointLocally;
  const USER_EMAIL_STORAGE_KEY = "kb_user_email";
  const LOCAL_CONVERSATION_STORAGE_PREFIX = "cw-conversations-v1";

  function normalizeEmail(value) {
    return String(value || "")
      .trim()
      .toLowerCase();
  }

  function getStoredUserEmail() {
    try {
      return normalizeEmail(localStorage.getItem(USER_EMAIL_STORAGE_KEY));
    } catch {
      return "";
    }
  }

  function setStoredUserEmail(email) {
    const normalized = normalizeEmail(email);
    try {
      if (normalized) {
        localStorage.setItem(USER_EMAIL_STORAGE_KEY, normalized);
      } else {
        localStorage.removeItem(USER_EMAIL_STORAGE_KEY);
      }
    } catch {
      // Ignore storage failures so the widget keeps working without persistence.
    }
    return normalized;
  }

  function getCurrentUserProfile() {
    const context = window._spPageContextInfo || {};
    const email = normalizeEmail(
      context.userEmail || window.CW_USER_EMAIL || getStoredUserEmail(),
    );
    const login = String(
      context.userLoginName || window.CW_USER_LOGIN || "",
    ).trim();
    const name =
      String(
        context.userDisplayName || window.CW_USER_NAME || defaultUserName,
      ).trim() || defaultUserName;
    const id = email || login || defaultUserId;
    // Only a real directory GUID (signed-in SharePoint page); anonymous visitors get none.
    const guid = String(context.aadUserId || window.CW_USER_GUID || "").trim();

    return {
      id,
      email,
      name,
      guid,
    };
  }

  const currentUser = getCurrentUserProfile();
  let userId = currentUser.id;
  const userName = currentUser.name;
  let currentUserEmail = currentUser.email;

  const widget = document.getElementById("cw-widget");
  const fab = document.getElementById("cw-fab");
  const header = document.getElementById("cw-header");
  const headerTitle = document.getElementById("cw-header-title");
  const sidebarBrandTitle = document.getElementById("cw-sidebar-brand-title");
  const headerSubtitle = document.getElementById("cw-header-subtitle");
  const body = document.getElementById("cw-body");
  const input = document.getElementById("cw-input");
  const newChatBtn = document.getElementById("cw-new-chat");
  const sidebarNewChatBtn = document.getElementById("cw-sidebar-new-chat");
  const expandBtn = document.getElementById("cw-expand-btn");
  const endLiveBtn = document.getElementById("cw-end-live-btn");
  const sidebarToggleBtn = document.getElementById("cw-sidebar-toggle");
  const sendBtn = document.getElementById("cw-send-btn");
  const attachBtn = document.getElementById("cw-attach-btn");
  const fileInput = document.getElementById("cw-file-input");
  const filePreviews = document.getElementById("cw-file-previews");
  const composer = document.getElementById("cw-composer");
  const sidebar = document.getElementById("cw-sidebar");
  const sidebarBackdrop = document.getElementById("cw-sidebar-backdrop");
  const historyList = document.getElementById("cw-history-list");
  const searchInput = document.getElementById("cw-search-input");
  const bodyScroll = document.querySelector(".cw-body-scroll");
  const footer = document.querySelector(".cw-footer");
  const quickReplyBtns = document.querySelectorAll(".cw-quick-reply");
  let webchatDiv = document.getElementById("webchat");

  if (!widget || !fab || !header || !webchatDiv) return;

  // Fill in every static icon span (expand, collapse, close, search, add,
  // panel-open/closed, sparkle, attach, send)
  hydrateIcons(document);

  let conversations = [];
  let currentConversation = null;
  let nextConversationSource = FLOATING_WIDGET_SOURCE;
  let chatStarted = false;
  let directLine;
  let store;
  let webChatInitPromise = null;
  let webChatInitialized = false;
  let assistantDisplayName = DEFAULT_ASSISTANT_DISPLAY_NAME;
  let currentBrandLogoUrl = DEFAULT_BRAND_LOGO_URL;
  // True once a stored conversation has taken directLine.conversationId, so "New chat"
  // knows it needs a fresh Direct Line conversation (and therefore a fresh id).
  let directLineConversationClaimed = false;
  let customerSessionToken = null;
  let customerSessionConversationId = "";
  let customerSessionPromise = null;
  let liveAgentActive = false;
  let liveSession = null;
  let signalRLoadPromise = null;
  let renderedMessageIds = new Set();
  const feedbackCache = {};
  let conversationLoadPromise = null;
  let conversationLoadStarted = false;
  let conversationLoadVersion = 0;
  let sharePointToken = "";
  let sharePointTokenExpiresAt = 0;
  let sharePointListEntityType = "";
  let sharePointDigest = "";
  let sharePointDigestExpiresAt = 0;
  let conversationSaveQueue = Promise.resolve();
  let conversationSaveTimer = null;

  let isOpen = false;
  let sessionRestored = false;
  let userPublicIp = "";
  fetch("https://api.ipify.org?format=json")
    .then((r) => r.json())
    .then((data) => {
      userPublicIp = data.ip || "";
    })
    .catch(() => {
      userPublicIp = "";
    });
  let isExpanded = false;
  let isSidebarOpen = false;
  let isSidebarCollapsed = false;
  let isDragging = false;
  let dragOffsetX = 0;
  let dragOffsetY = 0;
  let pendingFiles = [];
  let lastUserMsgEl = null;
  let isReplayingHistory = false;
  let replayGuardTimer = null;
  let isWaitingForResponse = false;
  let responseTimeoutTimer = null;
  const BOT_RESPONSE_TIMEOUT_MS = 30000;
  const RATING_IDLE_MS = 4 * 60 * 1000;
  let ratingIdleTimer = null;
  if (window.marked) {
    marked.setOptions({ breaks: true, gfm: true });
  }

  function getConversationKey(conv) {
    return conv?.conversationId || conv?.spId || conv?.id || "";
  }

  function normalizeConversationTimestamp(value) {
    if (!value) return Date.now();
    const ts = new Date(value).getTime();
    return Number.isNaN(ts) ? Date.now() : ts;
  }

  function escapeODataString(value) {
    return String(value || "").replace(/'/g, "''");
  }

  function getConversationOwnerQuery() {
    // SharePoint's classic list REST API does not support the tolower() OData
    // function (400 Bad Request), which silently broke this filter and made
    // every load fall back to the local per-browser cache instead of SharePoint.
    // Email is already normalized to lowercase everywhere it's written, so a
    // plain eq comparison is sufficient and SharePoint-supported.
    const email = normalizeEmail(currentUserEmail);
    return email ? `&$filter=UserEmail eq '${escapeODataString(email)}'` : "";
  }

  function getLocalConversationStorageKey() {
    const scope = [
      tenantId,
      window.location.pathname || "/",
      currentUserEmail || "anonymous",
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
      email: item.email || currentUserEmail || "",
      pageUrl: item.pageUrl || window.location.href || "",
      userIp: item.userIp || "",
      userId: item.userId || userId || "",
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
      const snapshot = conversations
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

  function decodeJwtExpiry(token) {
    try {
      const payload = JSON.parse(
        atob(token.split(".")[1].replace(/-/g, "+").replace(/_/g, "/")),
      );
      return typeof payload.exp === "number" ? payload.exp * 1000 : 0;
    } catch {
      return 0;
    }
  }

  async function fetchSharePointToken() {
    if (!canUseSharePointPersistence) {
      throw new Error(
        "SharePoint persistence is disabled in local development",
      );
    }

    const response = await fetch(SHAREPOINT_TOKEN_URL);
    if (!response.ok) {
      throw new Error(`Token request failed (${response.status})`);
    }

    const data = await response.json();
    const token = data.tokens || data.access_token || data.token || "";
    if (!token) {
      throw new Error("Token response did not include a token");
    }

    sharePointToken = token;
    sharePointTokenExpiresAt =
      decodeJwtExpiry(token) || Date.now() + 45 * 60 * 1000;
    return token;
  }

  async function getSharePointToken() {
    if (!canUseSharePointPersistence) {
      throw new Error(
        "SharePoint persistence is disabled in local development",
      );
    }

    if (sharePointToken && sharePointTokenExpiresAt > Date.now() + 60_000) {
      return sharePointToken;
    }
    return fetchSharePointToken();
  }

  async function spRequest(path, options = {}, { skipDigest = false } = {}) {
    if (!canUseSharePointPersistence) {
      throw new Error(
        "SharePoint persistence is disabled in local development",
      );
    }

    const token = await getSharePointToken();
    const headers = new Headers(options.headers || {});
    headers.set("Authorization", `Bearer ${token}`);

    const method = (options.method || "GET").toUpperCase();
    const hasBody = options.body !== undefined && options.body !== null;
    if (!headers.has("Accept"))
      headers.set("Accept", "application/json;odata=nometadata");
    if (hasBody && !headers.has("Content-Type"))
      headers.set("Content-Type", "application/json;odata=nometadata");

    if (
      !skipDigest &&
      method !== "GET" &&
      method !== "HEAD" &&
      path !== "/_api/contextinfo"
    ) {
      headers.set("X-RequestDigest", await getSharePointDigest());
    }

    return fetch(`${SHAREPOINT_SITE_URL}${path}`, {
      ...options,
      method,
      headers,
    });
  }

  async function getSharePointDigest() {
    if (sharePointDigest && sharePointDigestExpiresAt > Date.now() + 60_000) {
      return sharePointDigest;
    }

    const response = await spRequest(
      "/_api/contextinfo",
      {
        method: "POST",
        headers: {
          Accept: "application/json;odata=verbose",
        },
      },
      { skipDigest: true },
    );

    if (!response.ok) {
      throw new Error(`Context info request failed (${response.status})`);
    }

    const data = await response.json();
    const info =
      data?.d?.GetContextWebInformation || data?.GetContextWebInformation || {};
    sharePointDigest = info.FormDigestValue || "";
    const timeoutSeconds = Number(info.FormDigestTimeoutSeconds || 30);
    sharePointDigestExpiresAt =
      Date.now() + Math.max(timeoutSeconds - 60, 1) * 1000;
    return sharePointDigest;
  }

  async function ensureSharePointListMetadata() {
    if (sharePointListEntityType) return;

    const safeTitle = SHAREPOINT_LIST_TITLE.replace(/'/g, "''");
    const response = await spRequest(
      `/_api/web/lists/getbytitle('${safeTitle}')?$select=ListItemEntityTypeFullName`,
      { method: "GET" },
    );
    if (!response.ok) {
      throw new Error(`List metadata request failed (${response.status})`);
    }

    const data = await response.json();
    sharePointListEntityType =
      data.ListItemEntityTypeFullName ||
      data.d?.ListItemEntityTypeFullName ||
      "";
    if (!sharePointListEntityType) {
      throw new Error("Unable to resolve SharePoint list entity type");
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
                ? userId
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

  function normalizeLiveAgent(value) {
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
      userIp: conv.userIp || userPublicIp || "",
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

  function parseSharePointConversationItem(item) {
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
      UserEmail: conv.email || currentUserEmail || "",
      PageUrl: String(details.pageUrl || "").slice(0, 255),   // ← add
      UserIP: String(details.userIp || ""),      
      ...(SHAREPOINT_HAS_USER_GUID_COLUMN
        ? { UserGUID: conv.userGuid || currentUser.guid || "" }
        : {}),
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
    const currentEmail = String(currentUserEmail || "")
      .trim()
      .toLowerCase();

    if (!currentEmail || !ownerEmail) return false;
    return ownerEmail === currentEmail;
  }

  function extractEmailFromText(text) {
    const match = String(text || "").match(
      /\b[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}\b/i,
    );
    return match ? normalizeEmail(match[0]) : "";
  }

  function applyUserEmailIdentity(
    email,
    { persist = true, reloadHistory = true } = {},
  ) {
    const normalized = normalizeEmail(email);
    if (!normalized || normalized === normalizeEmail(currentUserEmail))
      return false;

    currentUserEmail = normalized;
    userId = normalized;

    if (persist) {
      setStoredUserEmail(normalized);
    }

    // Identity reaches the live-chat server as soon as it's known, but only if a
    // customer session already exists (bot-only chats never create one).
    if (customerSessionToken) {
      void bindCustomerSession();
    }

    conversationLoadPromise = null;
    if (reloadHistory) {
      Promise.resolve().then(() => {
        void conversationSaveQueue
          .then(() => loadConversationsFromSharePoint(true))
          .then(() => {
            renderHistoryList(searchInput?.value || "");
          });
      });
    }

    return true;
  }

  async function persistConversation(conv) {
    if (!conv) return;
    // Don't write the item until its ConversationId (directLine.conversationId) is known,
    // so the create carries the real id instead of an empty one.
    if (conv.conversationIdPending) await conv.conversationIdPending;
    if (!canUseSharePointPersistence) {
      saveConversationsToLocalStorage();
      return conv;
    }
    await ensureSharePointListMetadata();

    const fields = buildConversationFields(conv);
    const safeTitle = SHAREPOINT_LIST_TITLE.replace(/'/g, "''");
    const payload = {
      __metadata: {
        type: sharePointListEntityType,
      },
      ...fields,
    };

    const update = async (itemId) => {
      const itemPath = `/_api/web/lists/getbytitle('${safeTitle}')/items(${itemId})`;
      // The live chat API writes into the same ConversationDetails JSON (session binding,
      // fallback, assignedAgentId, agent messages). Re-read and merge before every write,
      // guarded by the item's ETag, so a widget save never erases what the server wrote.
      for (let attempt = 1; ; attempt++) {
        const current = await spRequest(
          `${itemPath}?$select=ConversationDetails`,
          {
            method: "GET",
            headers: { Accept: "application/json;odata=verbose" },
          },
        );
        if (!current.ok) {
          throw new Error(
            `Conversation read before update failed (${current.status})`,
          );
        }
        const currentItem = (await current.json())?.d || {};
        const details = mergeServerOwnedDetails(
          JSON.parse(fields.ConversationDetails),
          currentItem.ConversationDetails,
        );

        const response = await spRequest(itemPath, {
          method: "POST",
          headers: {
            Accept: "application/json;odata=verbose",
            "Content-Type": "application/json;odata=verbose",
            "If-Match": currentItem.__metadata?.etag || "*",
            "X-HTTP-Method": "MERGE",
          },
          body: JSON.stringify({
            ...payload,
            ConversationDetails: JSON.stringify(details),
            LiveAgentEscalated: details.liveAgent.status,
          }),
        });

        if (response.status === 412 && attempt < 3) continue;
        if (!response.ok) {
          throw new Error(`Conversation update failed (${response.status})`);
        }
        return conv;
      }
    };

    const create = async () => {
      const response = await spRequest(
        `/_api/web/lists/getbytitle('${safeTitle}')/items`,
        {
          method: "POST",
          headers: {
            Accept: "application/json;odata=verbose",
            "Content-Type": "application/json;odata=verbose",
          },
          body: JSON.stringify(payload),
        },
      );

      if (!response.ok) {
        throw new Error(`Conversation create failed (${response.status})`);
      }

      const data = await response.json();
      return data?.d?.Id || data?.d?.ID || data?.Id || data?.ID || null;
    };

    await persistConversationItem(conv, {
      findExisting: async (conversationId) => {
        const response = await spRequest(
          `/_api/web/lists/getbytitle('${safeTitle}')/items?$select=Id&$filter=ConversationId eq '${escapeODataString(conversationId)}'&$top=1`,
          {
            method: "GET",
            headers: { Accept: "application/json;odata=verbose" },
          },
        );
        if (!response.ok) {
          throw new Error(
            `Conversation lookup failed (${response.status})`,
          );
        }
        const data = await response.json();
        const item = data?.d?.results?.[0] || data?.value?.[0];
        return item?.Id || item?.ID || null;
      },
      update,
      create,
    });
    return conv;
  }

  function queueConversationSave(conv, immediate = false) {
    if (!conv) return;
    clearTimeout(conversationSaveTimer);

    if (!canUseSharePointPersistence) {
      conversationSaveTimer = setTimeout(
        () => {
          saveConversationsToLocalStorage();
        },
        immediate ? 0 : 150,
      );
      return;
    }

    if (immediate) {
      conversationSaveQueue = conversationSaveQueue
        .then(() => persistConversation(conv))
        .catch((error) => {
          console.error("Unable to save conversation", error);
        });
      return;
    }

    conversationSaveTimer = setTimeout(() => {
      conversationSaveQueue = conversationSaveQueue
        .then(() => persistConversation(conv))
        .catch((error) => {
          console.error("Unable to save conversation", error);
        });
    }, 500);
  }

  async function loadConversationsFromSharePoint(forceReload = false) {
    if (forceReload) {
      conversationLoadPromise = null;
    } else if (conversationLoadPromise) {
      return conversationLoadPromise;
    }

    if (forceReload) {
      conversationLoadStarted = false;
    }

    const loadVersion = ++conversationLoadVersion;

    conversationLoadPromise = (async () => {
      try {
        if (!currentUserEmail) {
          conversations = [];
          if (loadVersion === conversationLoadVersion) {
            conversationLoadStarted = true;
            renderHistoryList(searchInput?.value || "");
          }
          return conversations;
        }

        if (canUseSharePointPersistence) {
          await ensureSharePointListMetadata();
          const safeTitle = SHAREPOINT_LIST_TITLE.replace(/'/g, "''");
          const response = await spRequest(
            `/_api/web/lists/getbytitle('${safeTitle}')/items?$select=${SHAREPOINT_CONVERSATION_SELECT}&$orderby=Modified desc&$top=25${getConversationOwnerQuery()}`,

            { method: "GET" },
          );

          if (!response.ok) {
            throw new Error(
              `Conversation list request failed (${response.status})`,
            );
          }

          const data = await response.json();
          const items = Array.isArray(data?.value) ? data.value : [];
          conversations = items
            .map(parseSharePointConversationItem)
            .filter(isConversationForCurrentUser);
        } else {
          conversations = loadConversationsFromLocalStorage();
        }
        if (loadVersion !== conversationLoadVersion) {
          return conversations;
        }
        if (currentConversation) {
          const key = getConversationKey(currentConversation);
          const stillPresent = conversations.some(
            (c) => getConversationKey(c) === key,
          );
          if (!stillPresent) {
            conversations.unshift(currentConversation);
          }
        }

        conversationLoadStarted = true;
        renderHistoryList(searchInput?.value || "");
        return conversations;
      } catch (error) {
        if (canUseSharePointPersistence) {
          console.warn(
            "Unable to load conversations from SharePoint, using local cache",
            error,
          );
        }
        conversations = loadConversationsFromLocalStorage();
        if (loadVersion !== conversationLoadVersion) {
          return conversations;
        }
        conversationLoadStarted = true;
        renderHistoryList(searchInput?.value || "");
        return conversations;
      } finally {
        if (loadVersion === conversationLoadVersion) {
          conversationLoadPromise = null;
        }
      }
    })();

    return conversationLoadPromise;
  }

  function formatDate(ts) {
    const d = new Date(ts);
    const now = new Date();
    const sameDay =
      d.getDate() === now.getDate() &&
      d.getMonth() === now.getMonth() &&
      d.getFullYear() === now.getFullYear();
    if (sameDay) return "Today";
    const yesterday = new Date(now);
    yesterday.setDate(now.getDate() - 1);
    if (
      d.getDate() === yesterday.getDate() &&
      d.getMonth() === yesterday.getMonth() &&
      d.getFullYear() === yesterday.getFullYear()
    ) {
      return `Yesterday, ${d.toLocaleTimeString([], { hour: "numeric", minute: "2-digit" })}`;
    }
    const dateOptions = { month: "short", day: "numeric" };
    if (d.getFullYear() !== now.getFullYear()) dateOptions.year = "numeric";
    return `${d.toLocaleDateString(undefined, dateOptions)}, ${d.toLocaleTimeString([], { hour: "numeric", minute: "2-digit" })}`;
  }

  function escapeHtml(str) {
    const div = document.createElement("div");
    div.textContent = str;
    return div.innerHTML;
  }

  function renderMarkdown(text) {
    if (!text) return "";
    if (window.marked) return marked.parse(text);
    return escapeHtml(text)
      .replace(/\*\*(.+?)\*\*/g, "<strong>$1</strong>")
      .replace(/\n/g, "<br>");
  }

  function scrollToBottom() {
    if (!bodyScroll) return;
    requestAnimationFrame(() => {
      bodyScroll.scrollTop = bodyScroll.scrollHeight;
    });
  }
  function scrollToMessageStart(msgEl) {
    if (!bodyScroll || !msgEl) return;
    requestAnimationFrame(() => {
      const containerTop = bodyScroll.getBoundingClientRect().top;
      const msgTop = msgEl.getBoundingClientRect().top;
      const offset = msgTop - containerTop;
      bodyScroll.scrollTop += offset - 10;
    });
  }

  function clearMessages() {
    body.innerHTML = "";
    renderedMessageIds.clear();
  }

  function bindSupportSelectButtons(container) {
    const techBtn = container.querySelector('[data-support="technical"]');
    const salesBtn = container.querySelector('[data-support="sales"]');

    function selectSupportButton(selectedButton) {
      container.querySelectorAll(".cw-support-select-btn").forEach((button) => {
        const isSelected = button === selectedButton;
        button.classList.toggle("is-selected", isSelected);
        button.setAttribute("aria-pressed", String(isSelected));
      });
    }

    async function sendSupportSelection(button, supportType, label) {
      selectSupportButton(button);
      try {
        await ensureWebChatInitialized();
      } catch {
        showToast("Chat is still loading. Please try again.");
        return;
      }
      sendMessage(label, { supportType });
      input?.focus();
    }

    techBtn?.addEventListener("click", () => {
      void sendSupportSelection(techBtn, "technical", "Technical Support");
    });

    salesBtn?.addEventListener("click", () => {
      void sendSupportSelection(salesBtn, "sales", "Sales Support");
    });
  }

  function showEmptyState() {
    clearMessages();
    const empty = document.createElement("div");
    empty.className = "cw-empty-state";
    empty.innerHTML = `
      <div class="cw-assistant-avatar" aria-hidden="true">
        <img class="cw-brand-logo" data-brand-logo src="${escapeHtml(DEFAULT_BRAND_LOGO_URL)}" alt="" />
      </div>
      <div class="cw-empty-bubble">
        <span class="cw-empty-greeting"></span>
      </div>
    `;
    body.appendChild(empty);
    syncBrandLogos(empty);
    updateEmptyStateGreeting();

    const supportCard = document.createElement("div");
    supportCard.className = "cw-support-select";
    supportCard.innerHTML = `
      <div class="cw-support-select-subtitle">Please select the type of support you need.</div>
      <div class="cw-support-select-actions">
        <button type="button" class="cw-support-select-btn" data-support="technical" aria-pressed="false">Technical Support</button>
        <button type="button" class="cw-support-select-btn" data-support="sales" aria-pressed="false">Sales Support</button>
      </div>
    `;
    body.appendChild(supportCard);
    bindSupportSelectButtons(supportCard);
  }

  function hideEmptyState() {
    body.querySelector(".cw-empty-state")?.remove();
  }

  function showToast(message) {
    const existing = widget.querySelector(".cw-toast");
    existing?.remove();

    const toast = document.createElement("div");
    toast.className = "cw-toast";
    toast.textContent = message;
    widget.appendChild(toast);

    requestAnimationFrame(() => toast.classList.add("is-visible"));
    setTimeout(() => {
      toast.classList.remove("is-visible");
      setTimeout(() => toast.remove(), 250);
    }, 3200);
  }

  function formatFileSize(bytes) {
    if (bytes < 1024) return `${bytes} B`;
    if (bytes < 1024 * 1024) return `${(bytes / 1024).toFixed(1)} KB`;
    return `${(bytes / (1024 * 1024)).toFixed(1)} MB`;
  }

  function isImageAttachment(att) {
    return (att.contentType || "").startsWith("image/");
  }

  function renderChatAttachmentCard(att) {
    const name = att.name || "Attachment";
    const url = att.contentUrl || att.thumbnailUrl || "";
    const ext = getFileExtension(name);

    if (isImageAttachment(att) && url) {
      return `
        <div class="cw-user-attach-card">
          <img src="${escapeHtml(url)}" alt="${escapeHtml(name)}" loading="lazy" />
        </div>
      `;
    }

    return `
      <div class="cw-user-attach-card cw-user-attach-card--file">
        <span class="cw-user-attach-ext">${escapeHtml(ext)}</span>
        <span class="cw-user-attach-filename">${escapeHtml(name)}</span>
      </div>
    `;
  }

  function getFileExtension(name) {
    const parts = (name || "").split(".");
    return parts.length > 1 ? parts.pop().toUpperCase() : "FILE";
  }

  function fluentIconHtml(name) {
    return `<span class="cw-fluent-icon cw-icon-${name}" aria-hidden="true"></span>`;
  }

  function userActionsHtml(includeEdit, timestamp = "") {
    const editBtn = includeEdit
      ? `<button type="button" class="cw-msg-action" data-action="edit" aria-label="Edit message" title="Edit message">${fluentIconHtml("edit")}</button>`
      : "";
    const formattedTime = formatAgentTimestamp(timestamp);
    return `
      <div class="cw-user-actions${formattedTime ? " cw-live-message-meta" : ""}">
        ${formattedTime ? `<time class="cw-live-message-timestamp" datetime="${escapeHtml(timestamp)}">${escapeHtml(formattedTime)}</time>` : ""}
        <button type="button" class="cw-msg-action" data-action="copy" aria-label="Copy message" title="Copy message">${fluentIconHtml("copy")}</button>
        ${editBtn}
      </div>
    `;
  }

  function feedbackFormHtml() {
    return `
      <div class="cw-feedback-form" hidden>
        <label class="cw-feedback-label">Tell us about your experience</label>
        <textarea class="cw-feedback-textarea" rows="2"></textarea>
        <div class="cw-feedback-form-actions">
          <button type="button" class="cw-feedback-submit">Submit</button>
          <button type="button" class="cw-feedback-cancel">Cancel</button>
        </div>
      </div>
    `;
  }

  function copilotActionsHtml(messageId) {
    return `
      <div class="cw-copilot-actions">
        <button type="button" class="cw-msg-action" data-action="copy" aria-label="Copy response" title="Copy response">${fluentIconHtml("copy")}</button>
        <span class="cw-action-divider" aria-hidden="true"></span>
        <button type="button" class="cw-msg-action cw-feedback-btn" data-action="feedback-up" data-message-id="${escapeHtml(messageId || "")}" aria-label="Good response" title="Good response" aria-pressed="false">${fluentIconHtml("thumb-like")}</button>
        <button type="button" class="cw-msg-action cw-feedback-btn" data-action="feedback-down" data-message-id="${escapeHtml(messageId || "")}" aria-label="Bad response" title="Bad response" aria-pressed="false">${fluentIconHtml("thumb-dislike")}</button>
      </div>
    `;
  }

  function bindCopyButton(btn, value) {
    btn?.addEventListener("click", () => {
      if (!value) return;
      navigator.clipboard.writeText(value).then(
        () => showToast("Copied to clipboard"),
        () => showToast("Could not copy"),
      );
    });
  }

  function bindUserMessageActions(container, text, attachments, includeEdit) {
    const copyBtn = container.querySelector(
      '.cw-user-actions [data-action="copy"]',
    );
    const editBtn = container.querySelector(
      '.cw-user-actions [data-action="edit"]',
    );
    const copyValue = (text || "").trim() || attachments?.[0]?.name || "";

    bindCopyButton(copyBtn, copyValue);

    if (includeEdit && editBtn) {
      editBtn.addEventListener("click", () => {
        if (!input || !text?.trim()) return;
        input.value = text.trim();
        input.focus();
        updateSendButton();
      });
    }
  }

  function bindCopilotMessageActions(container, text, messageId) {
    const copyBtn = container.querySelector(
      '.cw-copilot-actions [data-action="copy"]',
    );
    bindCopyButton(copyBtn, text);
    bindFeedbackButtons(container, messageId);
  }
  //debugger;
  function saveFeedback(messageId, rating, comment) {
    // Feedback always belongs to the conversation on screen. Never create a stand-in
    // conversation here: it would become an extra SharePoint item with no ConversationId.
    if (!currentConversation || !messageId) return;
    if (!currentConversation.feedback) currentConversation.feedback = {};
    currentConversation.feedback[messageId] = {
      rating,
      comment: comment || "",
      timestamp: new Date().toISOString(),
    };
    queueConversationSave(currentConversation, true);
  }

  function bindFeedbackButtons(container, messageId) {
    const upBtn = container.querySelector('[data-action="feedback-up"]');
    const downBtn = container.querySelector('[data-action="feedback-down"]');
    const form = container.querySelector(".cw-feedback-form");
    const textarea = form?.querySelector(".cw-feedback-textarea");
    const cancelBtn = form?.querySelector(".cw-feedback-cancel");
    const submitBtn = form?.querySelector(".cw-feedback-submit");

    if (!upBtn || !downBtn || !form || !textarea || !cancelBtn || !submitBtn)
      return;

    function setSelected(rating) {
      upBtn.classList.toggle("is-selected", rating === "up");
      downBtn.classList.toggle("is-selected", rating === "down");
      upBtn.setAttribute("aria-pressed", String(rating === "up"));
      downBtn.setAttribute("aria-pressed", String(rating === "down"));
    }

    function openForm(rating) {
      form.dataset.rating = rating;
      const existing = feedbackCache[messageId];
      textarea.value =
        existing && existing.rating === rating ? existing.comment || "" : "";
      form.hidden = false;
      textarea.focus();
    }

    function closeForm() {
      form.hidden = true;
    }

    // Restore existing feedback state (e.g. re-opening a saved conversation)
    const existingFeedback = currentConversation?.feedback?.[messageId];
    if (existingFeedback) {
      feedbackCache[messageId] = existingFeedback;
      setSelected(existingFeedback.rating);
    }

    upBtn.addEventListener("click", () => {
      if (!form.hidden && form.dataset.rating === "up") {
        closeForm();
        return;
      }
      openForm("up");
    });

    downBtn.addEventListener("click", () => {
      if (!form.hidden && form.dataset.rating === "down") {
        closeForm();
        return;
      }
      openForm("down");
    });

    cancelBtn.addEventListener("click", closeForm);

    submitBtn.addEventListener("click", () => {
      const rating = form.dataset.rating;
      if (!rating) return;
      const comment = textarea.value.trim();

      feedbackCache[messageId] = {
        rating,
        comment,
        timestamp: new Date().toISOString(),
      };
      setSelected(rating);
      closeForm();
      saveFeedback(messageId, rating, comment);
      showToast(
        rating === "up"
          ? "Thanks for your feedback!"
          : "Thanks, we'll use this to improve.",
      );
    });
  }

  function appendUserMessage(activity) {
    hideEmptyState();
    const wrap = document.createElement("div");
    wrap.className = "cw-user-msg";

    const text = typeof activity === "string" ? activity : activity.text || "";
    const attachments =
      typeof activity === "string" ? [] : activity.attachments || [];
    const hasText = Boolean(text && text.trim());
    const hasAttachments = attachments.length > 0;
    const includeEdit = hasText && !hasAttachments;
    const isLiveCustomerMessage =
      typeof activity === "object" &&
      activity !== null &&
      String(activity.id || "").startsWith("cm-");

    const inner = document.createElement("div");
    inner.className = "cw-user-msg-inner";

    let html = "";

    if (hasAttachments) {
      html += attachments.map((att) => renderChatAttachmentCard(att)).join("");
    }

    if (hasText) {
      html += `<div class="cw-user-bubble">${escapeHtml(text.trim())}</div>`;
    }

    if (hasText || hasAttachments) {
      html += userActionsHtml(
        includeEdit,
        isLiveCustomerMessage ? activity.timestamp : "",
      );
    }

    inner.innerHTML = html;
    wrap.appendChild(inner);
    body.appendChild(wrap);
    hydrateIcons(inner);

    bindUserMessageActions(inner, text, attachments, includeEdit);
    scrollToBottom();
  }

  function appendCopilotMessage(text, messageId) {
    hideLoading();
    hideEmptyState();
    const msg = document.createElement("article");
    msg.className = "cw-copilot-msg";
    msg.innerHTML = `
      <div class="cw-copilot-card">
        <div class="cw-copilot-text cw-markdown">${renderMarkdown(text)}</div>
      </div>
      ${text?.trim() ? copilotActionsHtml(messageId) : ""}
      ${text?.trim() ? feedbackFormHtml() : ""}
    `;
    body.appendChild(msg);
    hydrateIcons(msg);
    bindCopilotMessageActions(msg, text || "", messageId);
    scrollToMessageStart(lastUserMsgEl || msg);
  }

  function getAgentInitials(name) {
    const parts = String(name || "Support agent")
      .trim()
      .split(/\s+/)
      .filter(Boolean);
    if (!parts.length) return "SA";
    if (parts.length === 1) return Array.from(parts[0]).slice(0, 2).join("").toUpperCase();
    return `${Array.from(parts[0])[0]}${Array.from(parts[parts.length - 1])[0]}`.toUpperCase();
  }

  function getAgentAvatarColor(name) {
    let hash = 0;
    for (const character of String(name || "Support agent").trim().toLowerCase()) {
      hash = (hash * 31 + character.charCodeAt(0)) >>> 0;
    }
    return `hsl(${hash % 360} 58% 42%)`;
  }

  function formatAgentTimestamp(timestamp) {
    if (!timestamp) return "";
    const date = new Date(timestamp);
    if (Number.isNaN(date.getTime())) return "";
    return new Intl.DateTimeFormat(undefined, {
      hour: "numeric",
      minute: "2-digit",
      hour12: true,
    }).format(date);
  }

  // Live-agent replies use the assigned agent identity; no feedback thumbs.
  function appendAgentMessage(text, agentName, timestamp) {
    hideEmptyState();
    const msg = document.createElement("article");
    msg.className = "cw-copilot-msg cw-agent-msg";
    const displayName =
      currentConversation?.liveAgent?.assignedAgentName ||
      agentName ||
      "Support agent";
    const displayTime = formatAgentTimestamp(timestamp);
    msg.innerHTML = `
      <div class="cw-agent-row">
        <div class="cw-agent-avatar" style="--cw-agent-avatar-color: ${getAgentAvatarColor(displayName)}" aria-label="${escapeHtml(displayName)}">${escapeHtml(getAgentInitials(displayName))}</div>
        <div class="cw-agent-content">
          <div class="cw-copilot-card">
            <div class="cw-copilot-text cw-markdown">${escapeHtml(text || "").replace(/\n/g, "<br>")}</div>
          </div>
          <div class="cw-copilot-actions">
            <button type="button" class="cw-msg-action" data-action="copy" aria-label="Copy message" title="Copy message">${fluentIconHtml("copy")}</button>
            ${displayTime ? `<time class="cw-agent-timestamp" datetime="${escapeHtml(timestamp)}">${escapeHtml(displayTime)}</time>` : ""}
          </div>
        </div>
      </div>
    `;
    body.appendChild(msg);
    hydrateIcons(msg);
    bindCopyButton(msg.querySelector('[data-action="copy"]'), text || "");
    scrollToBottom();
  }

  function renderActivity(activity) {
    if (!activity || activity.type !== "message") return;

    const hasText = activity.text && activity.text.trim();
    const hasAttachments =
      activity.attachments && activity.attachments.length > 0;
    if (!hasText && !hasAttachments) return;

    const id =
      activity.id ||
      `${activity.text || ""}-${activity.attachments?.[0]?.name || ""}-${activity.timestamp}`;
    if (renderedMessageIds.has(id)) return;
    renderedMessageIds.add(id);

    if (activity.from && activity.from.role === "user") {
      appendUserMessage(activity);
    } else if (activity.from && activity.from.role === "agent") {
      if (hasText) {
        appendAgentMessage(
          activity.text,
          activity.from.name,
          activity.timestamp,
        );
      }
    } else if (hasText) {
      appendCopilotMessage(activity.text, activity.id || id);
    }
  }

  function getActivityPreview(activity) {
    if (activity.text && activity.text.trim()) return activity.text;
    if (activity.attachments?.length) {
      const names = activity.attachments
        .map((a) => a.name || "file")
        .join(", ");
      return `📎 ${names}`;
    }
    return "Message";
  }

  function normalizeMsgText(text) {
    return (text || "").trim().replace(/\s+/g, " ");
  }

  function isProactiveWelcome(text) {
    if (!text) return false;
    const t = text.toLowerCase();
    return (
      (t.includes("welcome") && t.includes("apps365")) ||
      t.includes("ask me anything you need") ||
      t.includes("!help to manage kb")
    );
  }

  function isDuplicateMessage(activity) {
    if (!currentConversation) return false;
    const text = normalizeMsgText(activity.text);
    return currentConversation.messages.some(
      (m) =>
        normalizeMsgText(m.text) === text &&
        m.from?.role === activity.from?.role,
    );
  }

  function shouldIgnoreBotMessage(activity) {
    if (activity.from?.role === "user") return false;
    if (isReplayingHistory) return true;
    if (isDuplicateMessage(activity)) return true;

    const text = activity.text || "";
    if (!isProactiveWelcome(text) || !currentConversation) return false;

    const hasUserMsg = currentConversation.messages.some(
      (m) => m.from?.role === "user",
    );
    const hasBotMsg = currentConversation.messages.some(
      (m) => m.from?.role !== "user",
    );
    return hasUserMsg || hasBotMsg;
  }

  function beginReplayGuard() {
    isReplayingHistory = true;
    clearTimeout(replayGuardTimer);
    replayGuardTimer = setTimeout(() => {
      isReplayingHistory = false;
    }, 2000);
  }

  function updateHeaderTitle(title, subtitle = "") {
    if (headerTitle) headerTitle.textContent = title;
    if (headerSubtitle) headerSubtitle.textContent = subtitle;
  }

  function updateHeaderForCurrentView() {
    if (!isExpanded && isSidebarOpen) {
      updateHeaderTitle("Support", "Your recent conversations");
      return;
    }
    updateHeaderTitle(assistantDisplayName);
  }

  function updateEmptyStateGreeting() {
    const greeting = body.querySelector(".cw-empty-greeting");
    if (greeting) {
      const greetingName = userName ? `Hi ${userName},` : "Hi,";
      greeting.textContent =
        `${greetingName} I'm your ${assistantDisplayName}. ` +
        "I'm here to answer using the official Apps365 KB.";
    }
  }

  function syncBrandLogos(root = document) {
    root.querySelectorAll("[data-brand-logo]").forEach((image) => {
      image.onerror = () => {
        if (
          image.getAttribute("src") !== currentBrandLogoUrl ||
          currentBrandLogoUrl === DEFAULT_BRAND_LOGO_URL
        ) {
          return;
        }
        applyBrandLogo(DEFAULT_BRAND_LOGO_URL);
      };
      image.src = currentBrandLogoUrl;
    });
  }

  function applyBrandLogo(source) {
    currentBrandLogoUrl = source || DEFAULT_BRAND_LOGO_URL;
    syncBrandLogos();
  }

  function applyBranding({ assistantName, logoUrl }) {
    if (assistantName) {
      assistantDisplayName = assistantName;
      if (sidebarBrandTitle) sidebarBrandTitle.textContent = assistantName;
      updateHeaderForCurrentView();
      updateEmptyStateGreeting();
      body
        .querySelector("#cw-loading")
        ?.setAttribute("aria-label", `${assistantName} is typing`);
    }
    if (logoUrl) applyBrandLogo(logoUrl);
  }

  // Never blocks init or chat: failures are logged and default branding stays.
  const branding = createBrandingController({
    spRequest,
    siteUrl: SHAREPOINT_SITE_URL,
    defaultLogoUrl: DEFAULT_BRAND_LOGO_URL,
    onApply: applyBranding,
    cooldownMs: BRANDING_REFRESH_COOLDOWN_MS,
  });
  const refreshBranding = (options) => branding.refresh(options);

  function showLoading() {
    isWaitingForResponse = true;
    if (input) input.disabled = true;
    if (attachBtn) attachBtn.disabled = true;

    clearTimeout(responseTimeoutTimer);
    responseTimeoutTimer = setTimeout(() => {
      if (!isWaitingForResponse) return;
      hideLoading();
      showToast(
        "The assistant is taking longer than expected. Please try again.",
      );
    }, BOT_RESPONSE_TIMEOUT_MS);

    if (body.querySelector("#cw-loading")) {
      if (sendBtn) sendBtn.disabled = true;
      return;
    }

    const el = document.createElement("article");
    el.id = "cw-loading";
    el.className = "cw-copilot-msg cw-loading-msg";
    el.setAttribute("aria-label", "Copilot is typing");
    el.innerHTML = `
      <div class="cw-copilot-card cw-loading-card">
        <div class="cw-typing-indicator" aria-hidden="true">
          <span></span><span></span><span></span>
        </div>
      </div>
    `;
    body.appendChild(el);
    scrollToBottom();

    if (sendBtn) sendBtn.disabled = true;
  }

  function hideLoading() {
    clearTimeout(responseTimeoutTimer);
    body.querySelector("#cw-loading")?.remove();
    isWaitingForResponse = false;
    if (input) input.disabled = false;
    if (attachBtn) attachBtn.disabled = false;
    updateSendButton();
  }

  function renderHistoryList(filterText = "") {
    if (!historyList) return;
    historyList.innerHTML = "";

    const filtered = conversations.filter((conv) => {
      if (!filterText) return true;
      const hay = `${conv.title} ${conv.preview}`.toLowerCase();
      return hay.includes(filterText.toLowerCase());
    });

    if (!filtered.length) {
      const empty = document.createElement("li");
      empty.className = "cw-history-empty";
      empty.textContent = filterText
        ? "No chats found"
        : "No conversations yet";
      historyList.appendChild(empty);
      return;
    }

    filtered.forEach((conv) => {
      const li = document.createElement("li");
      li.className = "cw-history-item";
      if (
        currentConversation &&
        getConversationKey(conv) === getConversationKey(currentConversation)
      ) {
        li.classList.add("active");
      }

      li.innerHTML = `
        <div class="cw-history-title">${escapeHtml(conv.title || "New chat")}</div>
        <div class="cw-history-meta">
          <span class="cw-history-preview">${escapeHtml(conv.preview || "")}</span>
          <span class="cw-history-date">${formatDate(conv.timestamp)}</span>
        </div>
      `;

      li.addEventListener("click", () => {
        loadConversation(conv);
        if (!isExpanded) closeSidebar();
      });

      historyList.appendChild(li);
    });
  }

  function updateSidebarToggleState() {                     
    const visible = isExpanded ? !isSidebarCollapsed : isSidebarOpen;
    sidebarToggleBtn?.setAttribute("aria-expanded", String(visible));
    sidebarToggleBtn?.setAttribute(
      "aria-label",
      visible ? "Hide sidebar" : "Show sidebar",
    );
  }

  function openSidebar() {
    if (isExpanded) {
      isSidebarCollapsed = false;
      widget.classList.remove("sidebar-collapsed");
    } else {
      isSidebarOpen = true;
      widget.classList.add("sidebar-open");
    }
    if (!isExpanded) updateHeaderTitle("Support", "Your recent conversations");
    else updateHeaderForCurrentView();
    updateSidebarToggleState();
  }

  function closeSidebar() {
    if (isExpanded) {
      isSidebarCollapsed = true;
      widget.classList.add("sidebar-collapsed");
    } else {
      isSidebarOpen = false;
      widget.classList.remove("sidebar-open");
    }
    updateHeaderForCurrentView();
    updateSidebarToggleState();
  }

  function toggleSidebar() {
    if (isExpanded) {
      isSidebarCollapsed = !isSidebarCollapsed;
      widget.classList.toggle("sidebar-collapsed", isSidebarCollapsed);
    } else {
      isSidebarOpen = !isSidebarOpen;
      widget.classList.toggle("sidebar-open", isSidebarOpen);
    }
    updateHeaderForCurrentView();
    updateSidebarToggleState();
  }

  function createStore() {
    return window.WebChat.createStore({}, () => (next) => (action) => {
      const isReplay = action.payload?.activity?.channelData?.isReplay;

      if (!isReplay && action.type === "DIRECT_LINE/POST_ACTIVITY") {
        const activity = action.payload.activity;
        const hasText = activity.text && activity.text.trim();
        const attachments = Array.isArray(activity.attachments)
          ? activity.attachments
          : [];
        if (!hasText && attachments.length === 0) return next(action);

        handleNewMessage({
          id: activity.id || "local-" + Date.now(),
          type: "message",
          text: activity.text || "",
          attachments,
          from: { id: userId, name: userName, role: "user" },
          timestamp: new Date().toISOString(),
        });
      }

      if (!isReplay && action.type === "DIRECT_LINE/INCOMING_ACTIVITY") {
        const activity = action.payload.activity;
        if (
          activity.type === "event" &&
          activity.name === "conversation/ratingRequest"
        ) {
          handleRatingRequest(activity.value);
        } else if (
          activity.type === "event" &&
          activity.name === "liveAgent/emailAccepted"
        ) {
          // The bot accepted an email that isn't a registered customer for live chat.
          handleBotEmailAccepted(activity.value?.email);
        } else if (
          activity.type === "event" &&
          activity.name === "conversation/emailIdentity"
        ) {
          handleConversationEmailIdentity(activity.value);
        } else if (
          activity.type === "message" &&
          activity.from &&
          activity.from.role !== "user"
        ) {
          handleNewMessage({
            id: activity.id || "bot-" + Date.now(),
            type: "message",
            text: activity.text || "",
            attachments: Array.isArray(activity.attachments)
              ? activity.attachments
              : [],
            from: {
              id: "bot",
              name: activity.from.name || "Copilot",
              role: "bot",
            },
            timestamp: activity.timestamp || new Date().toISOString(),
          });
          if (isBotEmailVerifiedReply(activity.text)) handleBotEmailVerified();
        }
      }

      return next(action);
    });
  }

  function bindConnectionStatus(dl) {
    if (!dl?.connectionStatus$?.subscribe) return;
    dl.connectionStatus$.subscribe((status) => {
      // 0 Uninitialized, 1 Connecting, 2 Online, 3 ExpiredToken, 4 FailedToConnect, 5 Ended
      if (status === 3 || status === 4) {
        if (isWaitingForResponse) hideLoading();
        showToast(
          "Connection to the assistant was lost. Please try sending your message again.",
        );
      } else if (status === 5) {
        if (isWaitingForResponse) hideLoading();
      }
    });
  }

  function ensureWebChatInitialized() {
    if (webChatInitialized) return Promise.resolve();
    if (webChatInitPromise) return webChatInitPromise;

    webChatInitPromise = Promise.resolve()
      .then(async () => {
        if (webChatInitialized) return;
        if (!window.WebChat) {
          throw new Error("BotFramework WebChat is not loaded.");
        }

        if (directLine) {
          // Re-initialising after resetDirectLineConversation(): render into a fresh host
          // node so the previous WebChat React tree is detached rather than re-rendered.
          const freshHost = webchatDiv.cloneNode(false);
          webchatDiv.replaceWith(freshHost);
          webchatDiv = freshHost;
        }
        webchatDiv.innerHTML = "";
        const tokenResponse = await fetch(
          `${API_BASE_URL}/api/chat/directline/token`,
          {
            method: "POST",
            headers: {
              Accept: "application/json",
              "Content-Type": "application/json",
            },
            body: JSON.stringify({}),
          },
        ).then(async (response) => {
          let responseBody = null;
          try {
            responseBody = await response.json();
          } catch {
            // Keep the status-based error when the response is not valid JSON.
          }

          const apiErrorMessage =
            (typeof responseBody?.message === "string" &&
              responseBody.message) ||
            (typeof responseBody?.error === "string" && responseBody.error) ||
            (typeof responseBody?.error?.message === "string" &&
              responseBody.error.message);
          if (!response.ok || !responseBody?.token) {
            throw new Error(
              apiErrorMessage ||
                (response.ok
                  ? "Direct Line token response did not contain a token."
                  : `Direct Line token request failed (${response.status}).`),
            );
          }
          return responseBody;
        });
        directLine = window.WebChat.createDirectLine({
          token: tokenResponse.token,
        });
        // directLine = window.WebChat.createDirectLine({ domain: "http://localhost:56150/v3/directline",});
        store = createStore();
        window.WebChat.renderWebChat(
          { directLine, store, username: userName },
          webchatDiv,
        );
        bindConnectionStatus(directLine);
        webChatInitialized = true;
      })
      .catch((error) => {
        webChatInitPromise = null;
        console.error(error);
        throw error;
      });

    return webChatInitPromise;
  }

  // Ends the current Direct Line conversation so the next ensureWebChatInitialized()
  // starts a new one with a new conversationId and a freshly requested token.
  function resetDirectLineConversation() {
    const previous = directLine;
    webChatInitialized = false;
    webChatInitPromise = null;
    directLineConversationClaimed = false;
    store = null;
    try {
      previous?.end?.();
    } catch (error) {
      console.warn("Unable to end previous Direct Line conversation", error);
    }
  }

  // Resolves with directLine.conversationId. It is only populated once the connection
  // reaches Online (connectionStatus$ === 2), so wait for that when it isn't set yet.
  function waitForDirectLineConversationId(timeoutMs = 20000) {
    const dl = directLine;
    if (dl?.conversationId) return Promise.resolve(dl.conversationId);
    if (!dl?.connectionStatus$?.subscribe) return Promise.resolve("");

    return new Promise((resolve) => {
      let subscription = null;
      let settled = false;
      const finish = (value) => {
        if (settled) return;
        settled = true;
        clearTimeout(timer);
        // subscribe() can emit synchronously, before `subscription` is assigned.
        Promise.resolve().then(() => subscription?.unsubscribe?.());
        resolve(value || "");
      };
      const timer = setTimeout(() => finish(dl.conversationId), timeoutMs);
      subscription = dl.connectionStatus$.subscribe((status) => {
        if (status === 2 && dl.conversationId) finish(dl.conversationId);
        else if (status === 4 || status === 5) finish(dl.conversationId);
      });
    });
  }

  // The only place a conversation record is created. It runs when currentConversation is
  // null, which only happens on first load or after startNewConversation().
  function createCurrentConversation(preview, source = nextConversationSource) {
    const conversationId = directLine?.conversationId || "";
    const conv = {
      id: conversationId || `pending-${Date.now()}`,
      conversationId,
      title: preview.slice(0, 50),
      preview,
      timestamp: Date.now(),
      messages: [],
      pageUrl: window.location.href,
      userIp: userPublicIp || "",
      userId,
      userGuid: currentUser.guid || "",
      email: currentUserEmail || "",
      source: normalizeConversationSource(source),
      feedback: {},
      liveAgent: { status: "none" },
    };
    nextConversationSource = FLOATING_WIDGET_SOURCE;

    if (!conversationId) {
      conv.conversationIdPending = waitForDirectLineConversationId().then(
        (id) => {
          if (id && !conv.conversationId) {
            conv.conversationId = id;
            conv.id = id;
          }
          delete conv.conversationIdPending;
          return conv.conversationId;
        },
      );
    }

    directLineConversationClaimed = true;
    currentConversation = conv;
    conversations.unshift(conv);
    return conv;
  }

  function handleNewMessage(activity) {
    if (activity.from.role !== "user") {
      if (!currentConversation || shouldIgnoreBotMessage(activity)) return;
    }

    if (activity.from.role === "user") {
      // This Direct Line conversation now carries user traffic; "New chat" must not reuse it.
      directLineConversationClaimed = true;
      const capturedEmail = extractEmailFromText(activity.text);
      if (capturedEmail) {
        applyUserEmailIdentity(capturedEmail, {
          persist: true,
          reloadHistory: true,
        });
      }
    }

    if (!currentConversation) {
      createCurrentConversation(getActivityPreview(activity));
    }

    currentConversation.messages.push(activity);
    currentConversation.timestamp = Date.now();
    if (activity.from.role === "user") {
      currentConversation.email =
        currentUserEmail || currentConversation.email || "";
    } else if (!currentConversation.previewSet) {
      currentConversation.preview = getActivityPreview(activity);
      currentConversation.previewSet = true;
    }
    updateHeaderForCurrentView();

    if (
      currentConversation.messages.length === 1 &&
      !body.querySelector(".cw-date-sep")
    ) {
      const dateSep = document.createElement("div");
      dateSep.className = "cw-date-sep";
      dateSep.innerHTML = "<span>Today</span>";
      hideEmptyState();
      body.insertBefore(dateSep, body.firstChild);
    }

    chatStarted = true;
    renderActivity(activity);

    if (activity.from.role === "user") {
      showLoading();
      lastUserMsgEl = body.querySelector(".cw-user-msg:last-of-type");
      clearRatingIdleTimer();
    } else {
      hideLoading();
      scheduleRatingIdle();
    }

    queueConversationSave(currentConversation, true);
    renderHistoryList(searchInput?.value || "");
  }

  async function loadConversation(conv) {
    clearRatingIdleTimer();
    if (conv !== currentConversation) clearLiveAgentEmailGate();
    if (liveSession) {
      if (
        getConversationKey(conv) ===
        getConversationKey(liveSession.conversation)
      ) {
        // Same conversation (possibly a reloaded copy): keep the live object and session.
        conv = liveSession.conversation;
      } else {
        endLiveAgentSession();
      }
    }
    hideLoading();
    currentConversation = conv;
    chatStarted = conv.messages.length > 0;
    clearMessages();
    updateHeaderForCurrentView();

    // Restore live agent session if this conversation has an active live chat
    const liveStatus = conv.liveAgent?.status;
    if ((liveStatus === "pending" || liveStatus === "assigned") && !liveSession) {
      // Small delay to ensure UI is ready, then restore the live session
      setTimeout(() => {
        void restoreLiveAgentSession(conv);
      }, 100);
    }

    if (conv.messages.length) {
      const dateSep = document.createElement("div");
      dateSep.className = "cw-date-sep";
      dateSep.innerHTML = `<span>${formatDate(conv.timestamp)}</span>`;
      body.appendChild(dateSep);
      conv.messages.forEach((activity) => renderActivity(activity));
    } else {
      showEmptyState();
    }
    if (liveSession && liveStatusEl) body.appendChild(liveStatusEl);

    beginReplayGuard();
    await ensureWebChatInitialized();

    setTimeout(() => {
      if (!store) return;
      conv.messages.forEach((activity) => {
        store.dispatch({
          type: "DIRECT_LINE/INCOMING_ACTIVITY",
          payload: {
            activity: { ...activity, channelData: { isReplay: true } },
          },
        });
      });
    }, 300);

    renderHistoryList(searchInput?.value || "");
  }

  function startNewConversation() {
    clearRatingIdleTimer();
    clearLiveAgentEmailGate();
    closeLiveAgent();
    hideLoading();
    // The one deliberate reset: the next message creates a new conversation (and a new
    // SharePoint item). It gets a fresh Direct Line conversation so its id is new too.
    currentConversation = null;
    nextConversationSource = FLOATING_WIDGET_SOURCE;
    if (directLineConversationClaimed) resetDirectLineConversation();
    resetCustomerSession();
    chatStarted = false;
    updateHeaderForCurrentView();
    showEmptyState();
    void ensureWebChatInitialized();
    renderHistoryList(searchInput?.value || "");
    if (input) {
      input.value = "";
      input.focus();
    }
    clearPendingFiles();
    updateSendButton();
  }

  async function restoreSession() {
    closeLiveAgent();
    await loadConversationsFromSharePoint();
    renderHistoryList();
    if (
      currentConversation ||
      chatStarted ||
      body.querySelector(".cw-user-msg, .cw-copilot-msg")
    ) {
      return;
    }
    if (conversations.length > 0) {
      await loadConversation(conversations[0]);
    } else {
      updateHeaderForCurrentView();
      showEmptyState();
      void ensureWebChatInitialized();
    }
  }

  function sendMessage(text, additionalChannelData = {}) {
    if (!store || !text) return;

    store.dispatch({
      type: "WEB_CHAT/SEND_MESSAGE",
      payload: {
        text,
        channelData: {
          pageUrl: window.location.href,
          userIp: userPublicIp,
          ...additionalChannelData,
        },
      },
    });
  }

  function addPendingFiles(fileList) {
    if (!fileList?.length) return;

    Array.from(fileList).forEach((file) => {
      if (file.size > MAX_FILE_SIZE) {
        showToast(
          `"${file.name}" is too large (${formatFileSize(file.size)}). Max 4 MB.`,
        );
        return;
      }

      const isImage = file.type.startsWith("image/");
      pendingFiles.push({
        id: "pf-" + Date.now() + "-" + Math.random().toString(36).slice(2, 7),
        file,
        previewUrl: isImage ? URL.createObjectURL(file) : null,
      });
    });

    if (fileInput) fileInput.value = "";
    renderFilePreviews();
    updateSendButton();
    input?.focus();
  }

  function removePendingFile(id) {
    const item = pendingFiles.find((f) => f.id === id);
    if (item?.previewUrl) URL.revokeObjectURL(item.previewUrl);
    pendingFiles = pendingFiles.filter((f) => f.id !== id);
    renderFilePreviews();
    updateSendButton();
  }

  function clearPendingFiles() {
    pendingFiles.forEach((item) => {
      if (item.previewUrl) URL.revokeObjectURL(item.previewUrl);
    });
    pendingFiles = [];
    renderFilePreviews();
    updateSendButton();
  }

  function renderFilePreviews() {
    if (!filePreviews) return;

    if (!pendingFiles.length) {
      filePreviews.hidden = true;
      filePreviews.innerHTML = "";
      composer?.classList.remove("has-files");
      return;
    }

    filePreviews.hidden = false;
    composer?.classList.add("has-files");

    filePreviews.innerHTML = pendingFiles
      .map((item) => {
        const { file, previewUrl, id } = item;
        const ext = getFileExtension(file.name);

        if (previewUrl) {
          return `
            <div class="cw-preview-card" data-id="${escapeHtml(id)}">
              <button type="button" class="cw-preview-remove" aria-label="Remove ${escapeHtml(file.name)}">&times;</button>
              <img src="${escapeHtml(previewUrl)}" alt="${escapeHtml(file.name)}" />
            </div>
          `;
        }

        return `
          <div class="cw-preview-card cw-preview-card--file" data-id="${escapeHtml(id)}">
            <button type="button" class="cw-preview-remove" aria-label="Remove ${escapeHtml(file.name)}">&times;</button>
            <span class="cw-preview-file-ext">${escapeHtml(ext)}</span>
            <span class="cw-preview-file-name">${escapeHtml(file.name)}</span>
          </div>
        `;
      })
      .join("");

    filePreviews.querySelectorAll(".cw-preview-remove").forEach((btn) => {
      btn.addEventListener("click", (e) => {
        const card = e.target.closest(".cw-preview-card");
        if (card?.dataset.id) removePendingFile(card.dataset.id);
      });
    });
  }

  async function handleSend(source = FLOATING_WIDGET_SOURCE) {
    if (liveAgentActive) {
      await handleLiveAgentSend();
      return;
    }

    // LIVE AGENT EMAIL GATE: the email goes to the bot, which checks the customer and
    // runs OTP verification. Escalation starts once it replies "Welcome back!".
    const emailGate = getActiveLiveAgentEmailGate();
    if (emailGate?.step === "email") {
      const text = input.value.trim();

      if (!text) return;

      if (!extractEmailFromText(text)) {
        appendLiveNotice("Please enter a valid email address.");
        input.focus();
        return;
      }
      if (isWaitingForResponse) {
        showToast("Please wait for the current response to finish.");
        return;
      }

      emailGate.step = "verifying";
      input.value = "";
      input.placeholder = defaultInputPlaceholder;
      // handleNewMessage picks the email up from the outgoing message.
      if (!currentConversation) {
        nextConversationSource = normalizeConversationSource(source);
      }
      sendMessage(text, { liveAgentEmailGate: true });
      updateSendButton();
      input.focus();
      return;
    }
    // ---- Direct Line (AI bot) path below: unchanged ----
    if (isWaitingForResponse) {
      showToast("Please wait for the current response to finish.");
      return;
    }
    const text = input.value.trim();
    const filesToSend = [...pendingFiles];
    if (!text && !filesToSend.length) return;

    try {
      await ensureWebChatInitialized();
    } catch {
      showToast("Chat is still loading. Please try again.");
      return;
    }

    input.value = "";
    clearPendingFiles();
    if (!currentConversation) {
      nextConversationSource = normalizeConversationSource(source);
    }

    try {
      if (filesToSend.length) {
        // One activity carries the text and the files, so the agent answers the user's
        // question about the files in the same turn. (WEB_CHAT/SEND_FILES expects
        // { files: [{ name, url, size }] }, not raw File objects, so it is not used.)
        // Direct Line uploads each blob and the agent receives it as an attachment.
        store.dispatch({
          type: "WEB_CHAT/SEND_MESSAGE",
          payload: {
            ...(text ? { text } : {}),
            attachments: filesToSend.map((item) => ({ blob: item.file })),
            channelData: {
              pageUrl: window.location.href,
              userIp: userPublicIp,
              ...(getActiveLiveAgentEmailGate()
                ? { liveAgentEmailGate: true }
                : {}),
            },
          },
        });
      } else if (text) {
        // While a live-agent email check is in progress (OTP, resend, re-entered email),
        // keep telling the bot the request came from "Talk to a live agent".
        sendMessage(
          text,
          getActiveLiveAgentEmailGate() ? { liveAgentEmailGate: true } : {},
        );
      }
    } catch {
      if (!currentConversation) {
        nextConversationSource = FLOATING_WIDGET_SOURCE;
      }
      hideLoading();
      showToast("Could not send your message. Try again.");
    }

    updateSendButton();
    input.focus();
  }

  function handleAttachClick() {
    fileInput?.click();
  }

  function updateSendButton() {
    if (!sendBtn || !input) return;
    const canSend =
      !isWaitingForResponse &&
      (input.value.trim().length > 0 || pendingFiles.length > 0);
    sendBtn.disabled = !canSend;
  }

  function toggleExpand() {
    isExpanded = !isExpanded;
    widget.classList.toggle("is-expanded", isExpanded);

    if (isExpanded) {
      if (isDragging) onDragEnd();
      isSidebarCollapsed = false;
      isSidebarOpen = true;
      widget.classList.remove("sidebar-open");
      widget.classList.remove("sidebar-collapsed");
      widget.style.left = "0";
      widget.style.top = "0";
      widget.style.right = "0";
      widget.style.bottom = "0";
      expandBtn?.setAttribute("aria-label", "Collapse chat");
    } else {
      isSidebarCollapsed = false;
      isSidebarOpen = false;
      widget.classList.remove("sidebar-collapsed");
      widget.classList.remove("sidebar-open");
      widget.style.left = "";
      widget.style.top = "";
      widget.style.right = "";
      widget.style.bottom = "";
      expandBtn?.setAttribute("aria-label", "Expand chat");
    }

    updateHeaderForCurrentView();
    updateSidebarToggleState();
  }

  function openWidget() {
    isOpen = true;
    widget.classList.add("is-visible");
    fab.classList.add("is-open");
    fab.setAttribute("aria-label", "Close chat");
    fab.setAttribute("aria-expanded", "true");
    updateHeaderForCurrentView();
    void ensureWebChatInitialized();
    if (!sessionRestored) {
      sessionRestored = true;
      void restoreSession();
    }
    setTimeout(() => input && input.focus(), 300);
  }

  function closeWidget() {
    isOpen = false;
    closeSidebar();
    widget.classList.remove("is-visible");
    fab.classList.remove("is-open");
    fab.setAttribute("aria-label", "Open chat");
    fab.setAttribute("aria-expanded", "false");
  }

  /* ================= Conversation rating ================= */

  function countRealUserMessages(conv) {
    return (conv?.messages || []).filter((m) => {
      const text = (m.text || "").trim();
      return (
        m.from?.role === "user" &&
        text &&
        text !== "Technical Support" &&
        text !== "Sales Support"
      );
    }).length;
  }

  function canOfferRating(conv) {
    return (
      Boolean(conv) &&
      !conv.rating &&
      !conv.ratingCardShown &&
      countRealUserMessages(conv) >= 2
    );
  }

  function clearRatingIdleTimer() {
    clearTimeout(ratingIdleTimer);
    ratingIdleTimer = null;
  }

  // Soft fallback: no activity after a bot reply, so offer the rating inline once.
  function scheduleRatingIdle() {
    clearRatingIdleTimer();
    const conv = currentConversation;
    if (!canOfferRating(conv)) return;
    ratingIdleTimer = setTimeout(() => {
      if (
        conv === currentConversation &&
        isOpen &&
        !liveAgentActive &&
        canOfferRating(conv)
      ) {
        showRatingCard(conv, "idle");
      }
    }, RATING_IDLE_MS);
  }

  function handleRatingRequest(value) {
    if (isReplayingHistory || liveAgentActive) return;
    showRatingCard(
      currentConversation,
      "bot",
      typeof value?.prompt === "string" ? value.prompt : "",
    );
  }

  // Hidden Direct Line event. The bot writes Rating / FeedbackComment on the item.
  function sendRatingEvent(conv, rating, comment) {
    if (!store) return false;
    const value = { rating };
    if (comment) value.comment = comment;
    if (conv.conversationId) value.conversationId = conv.conversationId;
    store.dispatch({
      type: "WEB_CHAT/SEND_EVENT",
      payload: { name: "conversation/rating", value },
    });
    return true;
  }

  function submitRating(conv, rating, comment) {
    if (!sendRatingEvent(conv, rating, comment)) {
      showToast("Could not send your rating. Please try again.");
      return false;
    }
    conv.rating = {
      value: rating,
      comment: comment || (conv.rating && conv.rating.comment) || "",
      timestamp: new Date().toISOString(),
    };
    queueConversationSave(conv, true);
    return true;
  }

  function showRatingCard(conv, reason, promptText) {
    if (
      !conv ||
      conv !== currentConversation ||
      conv.rating ||
      conv.ratingCardShown
    )
      return;
    if (body.querySelector(".cw-rating-card")) return;

    conv.ratingCardShown = true;
    queueConversationSave(conv, true); // persists ratingPrompted so it is never asked again
    clearRatingIdleTimer();
    hideEmptyState();

    const prompt =
      (promptText || "").trim() ||
      (reason === "live-ended"
        ? "How was your chat with our support team?"
        : "How was your experience today?");

    const card = document.createElement("div");
    card.className = "cw-rating-card";
    card.setAttribute("role", "group");
    card.setAttribute("aria-label", "Rate this conversation");
    card.innerHTML = `
      <div class="cw-rating-title">${escapeHtml(prompt)}</div>
      <div class="cw-rating-stars" role="radiogroup" aria-label="Star rating">
        ${[1, 2, 3, 4, 5]
          .map(
            (n) =>
              `<button type="button" class="cw-rating-star" role="radio" aria-checked="false" aria-label="${n} star${n > 1 ? "s" : ""}" data-value="${n}">&#9733;</button>`,
          )
          .join("")}
      </div>
      <div class="cw-rating-labels"><span>Poor</span><span>Excellent</span></div>
      <div class="cw-rating-comment" hidden>
        <label class="cw-rating-comment-label">What could we improve? (optional)</label>
        <textarea class="cw-rating-textarea" rows="2" maxlength="1000"></textarea>
        <div class="cw-rating-actions">
          <button type="button" class="cw-rating-submit">Send</button>
          <button type="button" class="cw-rating-skip">Skip</button>
        </div>
      </div>
    `;

    const stars = Array.from(card.querySelectorAll(".cw-rating-star"));
    const commentBox = card.querySelector(".cw-rating-comment");
    const textarea = card.querySelector(".cw-rating-textarea");
    let selected = 0;

    const paint = (n) =>
      stars.forEach((s, i) => s.classList.toggle("is-active", i < n));
    const finish = () => {
      card.innerHTML = `<div class="cw-rating-thanks">Thanks for your feedback!</div>`;
    };

    stars.forEach((star) => {
      const value = Number(star.dataset.value);
      star.addEventListener("mouseenter", () => paint(value));
      star.addEventListener("mouseleave", () => paint(selected));
      star.addEventListener("click", () => {
        if (!submitRating(conv, value)) return; // saved right away, even if no comment follows
        selected = value;
        stars.forEach((s, i) =>
          s.setAttribute("aria-checked", String(i + 1 === selected)),
        );
        paint(selected);
        commentBox.hidden = false;
        textarea.focus();
        scrollToBottom();
      });
    });

    card.querySelector(".cw-rating-submit").addEventListener("click", () => {
      const comment = textarea.value.trim();
      if (comment && !submitRating(conv, selected, comment)) return;
      finish();
    });
    card.querySelector(".cw-rating-skip").addEventListener("click", finish);

    body.appendChild(card);
    scrollToBottom();
  }

  /* ================= Live agent (Node API + Azure SignalR) ================= */

  let liveStatusEl = null;

  // Email verification before a live-agent request. The bot owns the check (known
  // customer + OTP) and keeps that state per Direct Line conversation, so ours is keyed
  // by the Direct Line conversation id too.
  //   step "email":     waiting for the user to type their email (validated locally)
  //   step "verifying": the email went to the bot; the user answers its prompts (OTP,
  //                     resend, another email) through the normal bot path
  let liveAgentEmailGate = null; // { conversationId, step }
  let verifiedBotConversationId = "";
  let acceptedNewCustomerConversationId = "";
  const defaultInputPlaceholder = input?.placeholder || "Ask anything";

  function isEmailVerifiedForLiveAgent() {
    if (!currentUserEmail) return false;
    const dlId = directLine?.conversationId;
    return !!dlId && dlId === verifiedBotConversationId;
  }

  function hasAcceptedNewCustomerEmailForLiveAgent() {
    const dlId = directLine?.conversationId;
    return !!dlId && dlId === acceptedNewCustomerConversationId && !!currentUserEmail;
  }

  function applyBotEmailIdentity(email, { verified, knownCustomer } = {}) {
    const normalized = normalizeEmail(email);
    const dlId = directLine?.conversationId;
    if (!normalized || !dlId) return;

    // Persist the candidate email for recent-conversation lookup, independently
    // of whether the bot verified it with OTP.
    applyUserEmailIdentity(normalized, { persist: true, reloadHistory: true });
    setStoredUserEmail(normalized);
    if (currentConversation) {
      currentConversation.email = normalized;
      queueConversationSave(currentConversation, true);
    }

    if (verified === true && knownCustomer === true) {
      verifiedBotConversationId = dlId;
      acceptedNewCustomerConversationId = "";
    } else if (verified === false && knownCustomer === false) {
      acceptedNewCustomerConversationId = dlId;
      verifiedBotConversationId = "";
    }
  }

  function handleConversationEmailIdentity(value) {
    if (!value || typeof value !== "object") return;
    applyBotEmailIdentity(value.email, {
      verified: value.verified === true,
      knownCustomer: value.knownCustomer === true,
    });
  }

  function getActiveLiveAgentEmailGate() {
    const dlId = directLine?.conversationId;
    if (!liveAgentEmailGate || !dlId) return null;
    return liveAgentEmailGate.conversationId === dlId ? liveAgentEmailGate : null;
  }

  function clearLiveAgentEmailGate() {
    liveAgentEmailGate = null;
    if (input) input.placeholder = defaultInputPlaceholder;
  }

  // The bot replies "Welcome back!" or "Welcome back, <name>!" once the OTP is verified.
  function isBotEmailVerifiedReply(text) {
    return /^welcome back(?:,[^!\n]{1,100})?!?$/i.test(String(text || "").trim());
  }

  // Runs when the bot clears the email for live chat: OTP verified ("Welcome back!",
  // including the bot's own 5-message gate) or a new, unregistered email accepted
  // ("liveAgent/emailAccepted" event, which carries the email). A later
  // "Talk to a live agent" in the same conversation doesn't ask again.
  function handleBotEmailAccepted(email) {
    const dlId = directLine?.conversationId;
    if (email) {
      applyBotEmailIdentity(email, { verified: false, knownCustomer: false });
    }
    if (!dlId || !currentUserEmail) return;

    if (!getActiveLiveAgentEmailGate()) return;
    clearLiveAgentEmailGate();
    void startLiveAgentEscalation();
  }

  function handleBotEmailVerified() {
    const dlId = directLine?.conversationId;
    if (!dlId || !currentUserEmail) return;
    verifiedBotConversationId = dlId;
    acceptedNewCustomerConversationId = "";

    if (!getActiveLiveAgentEmailGate()) return;
    clearLiveAgentEmailGate();
    void startLiveAgentEscalation();
  }

  async function liveApiFetch(
    path,
    {
      method = "GET",
      body: payload,
      token = customerSessionToken,
      keepalive = false,
    } = {},
  ) {
    const headers = { Accept: "application/json" };
    if (payload !== undefined) headers["Content-Type"] = "application/json";
    if (token) headers.Authorization = `Bearer ${token}`;

    const response = await fetch(`${API_BASE_URL}${path}`, {
      method,
      headers,
      body: payload !== undefined ? JSON.stringify(payload) : undefined,
      keepalive,
    });
    const data = await response.json().catch(() => null);
    if (!response.ok) {
      const error = new Error(
        data?.error || `Request failed (${response.status})`,
      );
      error.status = response.status;
      throw error;
    }
    return data;
  }

  function resetCustomerSession() {
    customerSessionToken = null;
    customerSessionConversationId = "";
    customerSessionPromise = null;
  }

  // POST /api/chat/session never refuses: every call mints a new sessionId. But the first
  // sessionId to bind/escalate is stored on the conversation's HR365CAChats item, and any
  // other session then gets 403 on escalate/message/end. So the token must survive a page
  // reload; sessionStorage keeps it for the life of the tab only.
  function readStoredCustomerSession(conversationId) {
    try {
      const stored = JSON.parse(
        sessionStorage.getItem(LIVE_SESSION_STORAGE_PREFIX + conversationId) ||
          "null",
      );
      const token =
        stored?.conversationId === conversationId
          ? stored.customerSessionToken
          : "";
      if (token && decodeJwtExpiry(token) > Date.now() + 60_000) return token;
    } catch {
      // Storage blocked or unparseable: fall through to a fresh session.
    }
    return "";
  }

  function storeCustomerSession(conversationId, token) {
    try {
      sessionStorage.setItem(
        LIVE_SESSION_STORAGE_PREFIX + conversationId,
        JSON.stringify({ conversationId, customerSessionToken: token }),
      );
    } catch {
      // Ignore storage failures; the in-memory token still works until reload.
    }
  }

  // Created lazily (first live-agent use), never on page load, so bot-only chats make no
  // calls to the live chat API. The token is tied to one conversationId.
  function ensureCustomerSession(conversationId) {
    if (!conversationId)
      return Promise.reject(new Error("conversationId is not available yet"));
    if (
      customerSessionToken &&
      customerSessionConversationId === conversationId
    ) {
      return Promise.resolve(customerSessionToken);
    }
    if (
      customerSessionPromise &&
      customerSessionPromise.conversationId === conversationId
    ) {
      return customerSessionPromise;
    }

    const storedToken = readStoredCustomerSession(conversationId);
    if (storedToken) {
      customerSessionToken = storedToken;
      customerSessionConversationId = conversationId;
      return Promise.resolve(storedToken);
    }

    const promise = liveApiFetch("/api/chat/session", {
      method: "POST",
      body: { conversationId },
      token: null,
    })
      .then(async (data) => {
        if (!data?.token)
          throw new Error("Session response did not include a token");
        customerSessionToken = data.token;
        customerSessionConversationId = conversationId;
        storeCustomerSession(conversationId, data.token);
        if (currentUserEmail || userName) await bindCustomerSession();
        return customerSessionToken;
      })
      .finally(() => {
        if (customerSessionPromise === promise) customerSessionPromise = null;
      });
    promise.conversationId = conversationId;
    customerSessionPromise = promise;
    return promise;
  }

  // Bind returns { bound: false } when the HR365CAChats item doesn't exist yet. That's
  // expected (the widget creates the item); POST /escalate claims the session then.
  // A 409 means the conversation is bound to a different session.
  async function bindCustomerSession() {
    if (!customerSessionToken) return;
    try {
      await liveApiFetch("/api/chat/bind", {
        method: "POST",
        body: {
          displayName: userName || null,
          email: currentUserEmail || null,
        },
      });
    } catch (error) {
      console.warn("Unable to bind live chat session", error);
    }
  }

  function ensureSignalRLoaded() {
    if (window.signalR?.HubConnectionBuilder)
      return Promise.resolve(window.signalR);
    if (signalRLoadPromise) return signalRLoadPromise;

    signalRLoadPromise = new Promise((resolve, reject) => {
      const script = document.createElement("script");
      script.src = SIGNALR_CDN_URL;
      script.integrity = SIGNALR_CDN_INTEGRITY;
      script.crossOrigin = "anonymous";
      script.async = true;
      script.onload = () =>
        window.signalR?.HubConnectionBuilder
          ? resolve(window.signalR)
          : reject(new Error("SignalR client failed to initialise"));
      script.onerror = () =>
        reject(new Error("Unable to load the SignalR client"));
      document.head.appendChild(script);
    }).catch((error) => {
      signalRLoadPromise = null;
      throw error;
    });
    return signalRLoadPromise;
  }

  function setLiveAgentStatus(conv, status, extra = {}) {
    if (!conv) return;
    const base = status === "pending" ? {} : conv.liveAgent || {};
    conv.liveAgent = normalizeLiveAgent({ ...base, ...extra, status });
    queueConversationSave(conv, true);
  }

  function getLastUserMessageText(conv) {
    const messages = conv?.messages || [];
    for (let i = messages.length - 1; i >= 0; i--) {
      const text =
        messages[i]?.from?.role === "user"
          ? (messages[i].text || "").trim()
          : "";
      if (text) return text;
    }
    return "";
  }

  function setHeaderLiveIndicator(visible, text = "Live agent") {
    if (endLiveBtn) endLiveBtn.hidden = !visible;
    const headerIndicator = document.querySelector(".cw-header-live-indicator");
    if (!headerIndicator) return;
    headerIndicator.hidden = !visible;
    const label = headerIndicator.querySelector(".cw-live-text");
    if (label) label.textContent = text;
  }

  // Plain in-thread status indicator (replaces the old tawk.to iframe card).
  function showLiveStatus(text) {
    if (!liveStatusEl) {
      liveStatusEl = document.createElement("div");
      liveStatusEl.className = "cw-live-agent-card";
      liveStatusEl.setAttribute("role", "status");
      liveStatusEl.innerHTML = `
        <div class="cw-live-agent-card-header">
          <span class="cw-live-dot" aria-hidden="true"></span>
          <span class="cw-live-text"></span>
        </div>
      `;
    }
    liveStatusEl.querySelector(".cw-live-text").textContent = text;
    if (!liveStatusEl.isConnected) hideEmptyState();
    // Keep the status as the latest item in the thread.
    if (body.lastElementChild !== liveStatusEl) body.appendChild(liveStatusEl);
    setHeaderLiveIndicator(true);
    scrollToBottom();
  }

  // Removes only the in-thread card; the header indicator and End button stay for the session.
  function hideLiveStatusCard() {
    liveStatusEl?.remove();
    liveStatusEl = null;
  }

  function removeLiveStatusUi() {
    hideLiveStatusCard();
    setHeaderLiveIndicator(false);
  }

  const LIVE_CONNECTED_STATUS_MS = 3000;
  const LIVE_TYPING_IDLE_MS = 3000;

  // Typing beats the session status; with neither, the card is hidden.
  function renderLiveStatus(session) {
    if (!isLiveSessionCurrent(session)) return;
    if (session.typingName) {
      showLiveStatus(`${session.typingName} is typing…`);
    } else if (session.statusText) {
      showLiveStatus(session.statusText);
    } else {
      hideLiveStatusCard();
      setHeaderLiveIndicator(true);
    }
  }

  // transient statuses (e.g. "Connected to …") disappear after a short delay.
  function setLiveStatus(session, text, { transient = false } = {}) {
    if (!isLiveSessionCurrent(session)) return;
    clearTimeout(session.statusHideTimer);
    session.statusHideTimer = null;
    session.statusText = text;
    if (transient) {
      session.statusHideTimer = setTimeout(() => {
        session.statusHideTimer = null;
        if (session.statusText !== text) return;
        session.statusText = null;
        renderLiveStatus(session);
      }, LIVE_CONNECTED_STATUS_MS);
    }
    renderLiveStatus(session);
  }

  function setAgentTyping(session, name) {
    clearTimeout(session.typingTimer);
    session.typingTimer = null;
    session.typingName = name || null;
    if (name) {
      session.typingTimer = setTimeout(() => {
        session.typingTimer = null;
        session.typingName = null;
        renderLiveStatus(session);
      }, LIVE_TYPING_IDLE_MS);
    }
    renderLiveStatus(session);
  }

  function appendLiveNotice(text) {
    const note = document.createElement("div");
    note.className = "cw-live-notice";
    note.textContent = text;
    body.appendChild(note);
    scrollToBottom();
  }

  function isLiveSessionCurrent(session) {
    return liveSession === session && !session.ended;
  }

  // Accepts both shapes the API produces: the ReceiveMessage broadcast
  // ({ id, text, createdAt, senderName }) and a stored ConversationDetails message from
  // GET /conversations/:id ({ id, role, content, timestamp, senderName }).
  function recordAgentMessage(session, message) {
    if (!isLiveSessionCurrent(session) || !message) return;
    const text = String(message.text ?? message.content ?? "");
    if (!text.trim()) return;

    const createdAt = message.createdAt || message.timestamp || "";
    // Transcripts the widget saved already carry the "agent-" prefixed id.
    const rawId = String(message.id || `${createdAt}-${text}`);
    const key = rawId.startsWith("agent-") ? rawId : `agent-${rawId}`;
    if (session.seenMessageIds.has(key)) return;
    session.seenMessageIds.add(key);

    const conv = session.conversation;
    if (conv.messages.some((m) => m.id === key)) return;
    // The agent stopped typing once the message arrives.
    if (session.typingName) setAgentTyping(session, null);
    if (conv.liveAgent?.status === "pending") {
      // A message can beat AgentJoined; treat it as the join so the "waiting" status clears.
      markAgentAssigned(session, {
        agentName: message.senderName,
        announce: false,
      });
    }
    const agentEmail = conv.liveAgent?.assignedAgentEmail || "";
    const activity = {
      id: key,
      type: "message",
      text,
      attachments: [],
      from: {
        id: agentEmail || "agent",
        name:
          conv.liveAgent?.assignedAgentName ||
          message.senderName ||
          "Support agent",
        role: "agent",
        ...(agentEmail ? { email: agentEmail } : {}),
      },
      timestamp: createdAt,
    };

    conv.messages.push(activity);
    conv.timestamp = Date.now();
    if (currentConversation === conv) renderActivity(activity);
    queueConversationSave(conv, true);
    renderHistoryList(searchInput?.value || "");
  }

  function markAgentAssigned(session, { agentName, agentEmail, announce }) {
    if (!isLiveSessionCurrent(session)) return;
    const conv = session.conversation;
    const alreadyAssigned = conv.liveAgent?.status === "assigned";
    const name = agentName || conv.liveAgent?.assignedAgentName || "";

    if (
      !alreadyAssigned ||
      (agentEmail && conv.liveAgent?.assignedAgentEmail !== agentEmail)
    ) {
      setLiveAgentStatus(conv, "assigned", {
        assignedAgentName: name || undefined,
        assignedAgentEmail:
          agentEmail || conv.liveAgent?.assignedAgentEmail || undefined,
      });
    }
    // Only on the actual join: later syncs must not re-show the "connected" status.
    if (!alreadyAssigned) {
      setLiveStatus(
        session,
        name ? `Connected to ${name}` : "Connected to a support agent",
        { transient: true },
      );
    }
    if (announce && !alreadyAssigned && currentConversation === conv) {
      appendLiveNotice(`${name || "A support agent"} joined the chat.`);
    }
  }

  // Catch-up read from the server: picks up an agent who joined before our SignalR
  // connection was up, the agent's email (AgentJoined only carries the name), and any
  // agent messages missed while reconnecting. Best-effort only.
  async function syncLiveConversation(session) {
    try {
      const data = await liveApiFetch(
        `/api/escalation/conversations/${encodeURIComponent(session.conversationId)}`,
        { token: session.token },
      );
      if (!isLiveSessionCurrent(session)) return;
      const record = data?.conversation;
      if (record?.status === "closed") {
        handleServerChatEnded(session);
        return;
      }
      if (record?.status === "claimed" && record.agent) {
        markAgentAssigned(session, {
          agentName: record.agent.agentName,
          agentEmail: record.agent.agentEmail,
          announce: true,
        });
      }
      // Stored messages have no senderType; the API saves role "agent" | "user".
      (data?.messages || [])
        .filter((m) => m.role === "agent")
        .forEach((m) => recordAgentMessage(session, m));
    } catch (error) {
      console.warn("Unable to sync live conversation", error);
    }
  }

  async function connectLiveAgent(session) {
    const signalR = await ensureSignalRLoaded();

    // The API's negotiate route is GET, so negotiate manually and hand the SignalR client
    // the service URL + access token (withUrl(API_BASE_URL) would POST /negotiate).
    const negotiate = () =>
      liveApiFetch("/api/chat/negotiate?role=customer", {
        token: session.token,
      });
    let negotiated = await negotiate();
    let accessTokenExpiresAt = decodeJwtExpiry(negotiated.accessToken);

    const connection = new signalR.HubConnectionBuilder()
      .withUrl(negotiated.url, {
        // The service token lasts 1 hour; renegotiate before a reconnect uses a stale one.
        accessTokenFactory: async () => {
          if (
            accessTokenExpiresAt &&
            accessTokenExpiresAt < Date.now() + 60_000
          ) {
            negotiated = await negotiate();
            accessTokenExpiresAt = decodeJwtExpiry(negotiated.accessToken);
          }
          return negotiated.accessToken;
        },
      })
      .withAutomaticReconnect()
      .configureLogging(signalR.LogLevel.Warning)
      .build();

    // Event names/payloads as emitted by the API (escalationController + signalrRest).
    connection.on("AgentJoined", (payload) => {
      markAgentAssigned(session, {
        agentName: payload?.agentName,
        announce: true,
      });
      void syncLiveConversation(session);
    });
    connection.on("ReceiveMessage", async (message) => {
      // The server echoes the customer's own messages to the group; those are already
      // rendered locally.
      if (message?.senderType !== "agent") return;

      const ringtone = new Audio("./chatwidget/chatRecieved.mp3");
      ringtone.volume = 0.7;
      recordAgentMessage(session, message);
      ringtone.play();
      ringtone.stop();
    });

    // Each Typing event keeps the indicator up; it clears after a quiet period
    // or as soon as the agent's message arrives.
    connection.on("Typing", (payload) => {
      if (payload?.senderType !== "agent" || !isLiveSessionCurrent(session))
        return;
      const name = session.conversation.liveAgent?.assignedAgentName || "Agent";
      setAgentTyping(session, name);
    });
    connection.on("ChatEnded", () => handleServerChatEnded(session));
    connection.onreconnecting(() => {
      setAgentTyping(session, null);
      setLiveStatus(session, "Reconnecting to live chat…");
    });
    connection.onreconnected(() => {
      if (!isLiveSessionCurrent(session)) return;
      const name = session.conversation.liveAgent?.assignedAgentName;
      if (session.conversation.liveAgent?.status === "assigned") {
        setLiveStatus(session, `Connected to ${name || "a support agent"}`, {
          transient: true,
        });
      } else {
        setLiveStatus(session, "Waiting for an agent to join…");
      }
      void syncLiveConversation(session);
    });
    connection.onclose(() => {
      setAgentTyping(session, null);
      setLiveStatus(
        session,
        "Live chat connection lost. Close and try again if the agent doesn't reply.",
      );
    });

    session.connection = connection;
    await connection.start();
  }

  function postLiveEnd(session) {
    if (!session?.conversationId || !session.token) return Promise.resolve();
    return liveApiFetch(
      `/api/escalation/escalate/${encodeURIComponent(session.conversationId)}/end`,
      {
        method: "POST",
        token: session.token,
        keepalive: true,
      },
    ).catch((error) => {
      console.warn("Unable to end live chat", error);
    });
  }

  // notifyServer is false when the server already closed the chat (ChatEnded): calling
  // /end again would run releaseChat() twice and undercount the agent's load.
  function endLiveAgentSession({ notifyServer = true } = {}) {
    const session = liveSession;
    if (!session) return;

    session.ended = true;
    liveSession = null;
    liveAgentActive = false;
    clearTimeout(session.typingTimer);
    clearTimeout(session.statusHideTimer);

    if (notifyServer && session.escalated) void postLiveEnd(session);

    const connection = session.connection;
    session.connection = null;
    if (connection) void connection.stop().catch(() => {});

    removeLiveStatusUi();
    if (session.escalated) setLiveAgentStatus(session.conversation, "closed");
  }

  function handleServerChatEnded(session) {
    if (!isLiveSessionCurrent(session)) return;
    const conv = session.conversation;
    const hadAgent = conv.liveAgent?.status === "assigned"; // read before it flips to "closed"
    if (currentConversation === conv)
      appendLiveNotice("The live chat has ended.");
    endLiveAgentSession({ notifyServer: false });
    if (hadAgent) showRatingCard(conv, "live-ended");
  }

  function showFallbackForm(conv, token, lastMessage) {
    body.querySelector(".cw-live-fallback")?.remove();
    hideEmptyState();

    const form = document.createElement("form");
    form.className = "cw-live-fallback";
    form.noValidate = true;
    form.innerHTML = `
      <div class="cw-live-fallback-title">No agents are available right now</div>
      <p class="cw-live-fallback-subtitle">Leave your details and our support team will get back to you.</p>
      <label class="cw-live-fallback-field">
        <span>Name</span>
        <input name="name" type="text" autocomplete="name" maxlength="200" />
      </label>
      <label class="cw-live-fallback-field">
        <span>Email</span>
        <input name="email" type="email" autocomplete="email" maxlength="254" required />
      </label>
      <label class="cw-live-fallback-field">
        <span>How can we help?</span>
        <textarea name="query" rows="3" maxlength="4000"></textarea>
      </label>
      <div class="cw-live-fallback-error" role="alert" hidden></div>
      <div class="cw-live-fallback-actions">
        <button type="submit" class="cw-live-fallback-submit">Submit</button>
        <button type="button" class="cw-live-fallback-cancel">Cancel</button>
      </div>
    `;

    form.elements.name.value = userName || "";
    form.elements.email.value = currentUserEmail || "";
    form.elements.query.value = lastMessage || "";

    const errorEl = form.querySelector(".cw-live-fallback-error");
    const submitBtn = form.querySelector(".cw-live-fallback-submit");
    const showError = (message) => {
      errorEl.textContent = message;
      errorEl.hidden = !message;
    };

    form
      .querySelector(".cw-live-fallback-cancel")
      .addEventListener("click", () => form.remove());
    form.addEventListener("submit", async (event) => {
      event.preventDefault();
      const name = form.elements.name.value.trim();
      const rawEmail = form.elements.email.value.trim();
      const query = form.elements.query.value.trim();
      const email = extractEmailFromText(rawEmail);

      if (!email || email !== normalizeEmail(rawEmail)) {
        showError("Please enter a valid email address.");
        form.elements.email.focus();
        return;
      }

      showError("");
      submitBtn.disabled = true;
      submitBtn.textContent = "Sending…";
      try {
        await liveApiFetch("/api/escalation/escalate/fallback-contact", {
          method: "POST",
          body: { name, email, query },
          token,
        });
        form.remove();
        if (currentConversation === conv) {
          appendLiveNotice(
            `Thanks${name ? `, ${name}` : ""}. We've received your details and will contact you at ${email}.`,
          );
        }
        setLiveAgentStatus(conv, "fallback");
        applyUserEmailIdentity(email, { persist: true, reloadHistory: true });
      } catch (error) {
        console.error("Fallback contact failed", error);
        showError("We couldn't send your details. Please try again.");
        submitBtn.disabled = false;
        submitBtn.textContent = "Submit";
      }
    });

    body.appendChild(form);
    scrollToBottom();
    form.elements[form.elements.email.value ? "query" : "email"].focus();
  }

  async function requestLiveAgentEmail() {
    // The email is sent to the bot, so Direct Line must be up and its id known.
    try {
      await ensureWebChatInitialized();
    } catch {
      showToast("Chat is still loading. Please try again.");
      return;
    }
    const conversationId =
      directLine?.conversationId || (await waitForDirectLineConversationId());
    if (!conversationId) {
      showToast("Chat is still loading. Please try again.");
      return;
    }

    if (getActiveLiveAgentEmailGate()?.step === "verifying") {
      appendLiveNotice(
        "Please complete the email verification above to connect with a live agent.",
      );
      input?.focus();
      return;
    }

    liveAgentEmailGate = { conversationId, step: "email" };
    appendLiveNotice(
      "Before I connect you with a live agent, please enter your work email address.",
    );

    if (input) {
      input.placeholder = "Enter your email address...";
      input.focus();
    }

    updateSendButton();
  }

  async function startLiveAgentEscalation() {
    // Existing customers need OTP verification. A bot-accepted new-customer
    // email is sufficient for live-agent escalation without OTP.
    if (
      !liveSession &&
      !isEmailVerifiedForLiveAgent() &&
      !hasAcceptedNewCustomerEmailForLiveAgent()
    ) {
      await requestLiveAgentEmail();
      return;
    }
    if (liveSession) {
      liveStatusEl?.scrollIntoView({ block: "nearest" });
      return;
    }
    const existingForm = body.querySelector(".cw-live-fallback");
    if (existingForm) {
      existingForm.scrollIntoView({ block: "nearest" });
      return;
    }
    if (currentConversation?.liveAgent?.status === "closed") {
      appendLiveNotice(
        "The live chat for this conversation has ended. Start a new conversation to talk to an agent again.",
      );
      return;
    }

    try {
      await ensureWebChatInitialized();
    } catch {
      showToast("Chat is still loading. Please try again.");
      return;
    }

    const conv =
      currentConversation || createCurrentConversation("Live agent request");
    const session = {
      conversation: conv,
      conversationId: "",
      token: null,
      connection: null,
      escalated: false,
      ended: false,
      seenMessageIds: new Set(),
      typingTimer: null,
      typingName: null,
      statusText: null,
      statusHideTimer: null,
    };
    liveSession = session;
    setLiveStatus(session, "Connecting you to a live agent…");

    try {
      const conversationId = conv.conversationIdPending
        ? await conv.conversationIdPending
        : conv.conversationId;
      if (!conversationId)
        throw new Error("Direct Line conversation id is not available");
      session.conversationId = conversationId;
      // escalate() creates the HR365CAChats item if it's missing; write ours first so
      // there is exactly one item per ConversationId (and bind finds it).
      if (canUseSharePointPersistence && !conv.spId) {
        queueConversationSave(conv, true);
        await conversationSaveQueue;
      }
      session.token = await ensureCustomerSession(conversationId);
      if (session.ended) return;

      const lastMessage = getLastUserMessageText(conv);
      const result = await liveApiFetch("/api/escalation/escalate", {
        method: "POST",
        // Identity travels with the escalation too: bind may have run before the
        // email was known, and the agent should see the email, not "Guest User".
        body: {
          lastMessage,
          displayName: userName || null,
          email: currentUserEmail || null,
          isAnonymous: !currentUserEmail,
        },
        token: session.token,
      });

      if (result?.status === "no_agent_available") {
        const wasEnded = session.ended;
        if (liveSession === session) liveSession = null;
        session.ended = true;
        removeLiveStatusUi();
        if (!wasEnded && currentConversation === conv) {
          showFallbackForm(conv, session.token, lastMessage);
        }
        return;
      }

      if (result?.status !== "queued") {
        throw new Error(`Unexpected escalate status: ${result?.status}`);
      }
      // "queued": the agent must still accept it (POST /join -> AgentJoined).
      session.escalated = true;
      if (session.ended) {
        // Closed while the escalate request was in flight.
        void postLiveEnd(session);
        setLiveAgentStatus(conv, "closed");
        return;
      }
      setLiveAgentStatus(conv, "pending");

      await connectLiveAgent(session);
      if (!isLiveSessionCurrent(session)) return;

      liveAgentActive = true;
      hideLoading();
      // syncLiveConversation (or an AgentJoined that already fired) may have shown
      // "Connected to …"; don't overwrite it with "waiting".
      if (session.conversation.liveAgent?.status !== "assigned") {
        setLiveStatus(session, "Waiting for an agent to join…");
      }
      await syncLiveConversation(session);
    } catch (error) {
      console.error("Live agent escalation failed", error);
      if (liveSession !== session) return;

      if (session.escalated) {
        endLiveAgentSession();
      } else {
        liveSession = null;
        session.ended = true;
        removeLiveStatusUi();
      }
      appendLiveNotice(
        error.status === 409
          ? "The live chat for this conversation has ended. Start a new conversation to talk to an agent again."
          : "We couldn't reach a live agent right now. Please try again in a moment.",
      );
    }
  }

  // Restore an existing live agent session (on page refresh or conversation switch)
  // without re-escalating. Used when conversation has liveAgent status "pending" or "assigned".
  async function restoreLiveAgentSession(conv) {
    if (liveSession) return; // Already have an active session

    try {
      await ensureWebChatInitialized();
    } catch {
      showToast("Chat is still loading. Please try again.");
      return;
    }

    const conversationId = conv.conversationId;
    if (!conversationId) {
      console.warn("Cannot restore live session: no conversationId");
      return;
    }

    const token = await ensureCustomerSession(conversationId);
    if (!token) {
      console.warn("Cannot restore live session: no customer session token");
      return;
    }

    const session = {
      conversation: conv,
      conversationId,
      token,
      connection: null,
      escalated: true, // Already escalated on server
      ended: false,
      seenMessageIds: new Set(),
      typingTimer: null,
      typingName: null,
      statusText: null,
      statusHideTimer: null,
    };

    liveSession = session;
    setLiveStatus(session, "Restoring live chat connection…");

    try {
      await connectLiveAgent(session);
      if (!isLiveSessionCurrent(session)) return;

      liveAgentActive = true;
      hideLoading();
      // syncLiveConversation will update status to "Connected to ..." or "Waiting..."
      await syncLiveConversation(session);
    } catch (error) {
      console.error("Failed to restore live agent session", error);
      if (liveSession !== session) return;

      liveSession = null;
      session.ended = true;
      removeLiveStatusUi();
      appendLiveNotice(
        "Could not restore live chat connection. Please try again.",
      );
    }
  }

  // Composer path while a live session is active. Mirrors the Direct Line path's local
  // rendering, persistence and email capture, but delivers the text to the agent.
  async function handleLiveAgentSend() {
    const session = liveSession;
    if (!session || !input) return;

    if (pendingFiles.length) {
      showToast(
        "Files can't be sent to a live agent. Please remove the attachment and describe it instead.",
      );
      return;
    }
    const text = input.value.trim();
    if (!text) return;

    const capturedEmail = extractEmailFromText(text);
    if (capturedEmail) {
      applyUserEmailIdentity(capturedEmail, {
        persist: true,
        reloadHistory: true,
      });
    }

    input.value = "";
    updateSendButton();

    const conv = session.conversation;
    const clientMessageId = `cm-${Date.now()}-${Math.random().toString(36).slice(2, 9)}`;
    const activity = {
      id: clientMessageId,
      type: "message",
      text,
      attachments: [],
      from: { id: userId, name: userName, role: "user" },
      timestamp: new Date().toISOString(),
    };

    conv.messages.push(activity);
    conv.timestamp = Date.now();
    conv.email = currentUserEmail || conv.email || "";
    renderedMessageIds.add(activity.id);
    appendUserMessage(activity);
    queueConversationSave(conv, true);
    renderHistoryList(searchInput?.value || "");

    try {
      await liveApiFetch(
        `/api/escalation/escalate/${encodeURIComponent(session.conversationId)}/message`,
        {
          method: "POST",
          body: { text, clientMessageId },
          token: session.token,
        },
      );
    } catch (error) {
      console.error("Live agent message failed", error);
      showToast(
        "Your message couldn't be delivered to the agent. Please try again.",
      );
    }
    input.focus();
  }

  function closeLiveAgent() {
    if (liveSession) endLiveAgentSession();
    removeLiveStatusUi();
  }
  // The user clicked "End live chat" in the header.
  function endLiveChatByUser() {
    const conv = liveSession?.conversation;
    const hadAgent = conv?.liveAgent?.status === "assigned";
    closeLiveAgent();
    if (conv && hadAgent) showRatingCard(conv, "live-ended");
  }

  function toggleWidget() {
    isOpen ? closeWidget() : openWidget();
  }

  function onDragStart(clientX, clientY) {
    if (isExpanded) return;
    isDragging = true;
    widget.classList.add("is-dragging");

    const rect = widget.getBoundingClientRect();
    dragOffsetX = clientX - rect.left;
    dragOffsetY = clientY - rect.top;

    widget.style.right = "auto";
    widget.style.bottom = "auto";
    widget.style.left = rect.left + "px";
    widget.style.top = rect.top + "px";
  }

  function onDragMove(clientX, clientY) {
    if (!isDragging) return;
    let left = clientX - dragOffsetX;
    let top = clientY - dragOffsetY;
    const maxLeft = window.innerWidth - widget.offsetWidth;
    const maxTop = window.innerHeight - widget.offsetHeight;
    left = Math.max(0, Math.min(left, maxLeft));
    top = Math.max(0, Math.min(top, maxTop));
    widget.style.left = left + "px";
    widget.style.top = top + "px";
  }

  function onDragEnd() {
    if (!isDragging) return;
    isDragging = false;
    widget.classList.remove("is-dragging");
  }

  function bindDragHandle(el) {
    if (!el) return;
    el.addEventListener("mousedown", (e) => {
      e.preventDefault();
      e.stopPropagation();
      onDragStart(e.clientX, e.clientY);
    });
    el.addEventListener(
      "touchstart",
      (e) => {
        const touch = e.touches[0];
        onDragStart(touch.clientX, touch.clientY);
      },
      { passive: true },
    );
  }

  fab.addEventListener("click", toggleWidget);
  expandBtn?.addEventListener("click", toggleExpand);
  endLiveBtn?.addEventListener("click", endLiveChatByUser);
  sidebarToggleBtn?.addEventListener("click", toggleSidebar);
  sidebarBackdrop?.addEventListener("click", closeSidebar);
  sendBtn?.addEventListener("click", handleSend);
  attachBtn?.addEventListener("click", handleAttachClick);
  fileInput?.addEventListener("change", () => {
    if (fileInput.files?.length) addPendingFiles(fileInput.files);
  });
  newChatBtn?.addEventListener("click", () => closeWidget());
  sidebarNewChatBtn?.addEventListener("click", () => {
    startNewConversation();

    if (isExpanded) {
      openSidebar();
    } else {
      closeSidebar();
    }
  });

  searchInput?.addEventListener("input", () =>
    renderHistoryList(searchInput.value),
  );
  quickReplyBtns.forEach((btn) => {
    btn.addEventListener("click", async () => {
      const chip = btn.dataset.chip;

      if (chip === "contact-support") {
        window.open("https://www.apps365.com/support/", "_blank", "noopener");
        return;
      }

      // if (chip === "raise-ticket") {
      //   try {
      //     await ensureWebChatInitialized();
      //   } catch {
      //     showToast("Chat is still loading. Please try again.");
      //     return;
      //   }
      //   if (!input) return;
      //   input.value = "How to raise a ticket";
      //   updateSendButton();
      //   handleSend();
      //   return;
      // }

      if (chip === "live-agent") {
        void startLiveAgentEscalation();
        return;
      }

      // if (chip === "show-tickets") {
      //   if (!input) return;
      //   try {
      //     await ensureWebChatInitialized();
      //   } catch {
      //     showToast("Chat is still loading. Please try again.");
      //     return;
      //   }
      //   input.value = "Show my tickets";
      //   updateSendButton();
      //   handleSend();
      //   return;
      // }

      // fallback for any other quick-reply button using data-question
      const question = btn.dataset.question || btn.textContent || "";
      if (!input || !question.trim()) return;
      try {
        await ensureWebChatInitialized();
      } catch {
        showToast("Chat is still loading. Please try again.");
        return;
      }
      input.value = question.trim();
      updateSendButton();
      handleSend();
    });
  });

  input?.addEventListener("input", updateSendButton);
  input?.addEventListener("keydown", (e) => {
    if (e.key === "Enter" && !e.shiftKey) {
      e.preventDefault();
      handleSend();
    }
  });

  document.addEventListener("mousemove", (e) =>
    onDragMove(e.clientX, e.clientY),
  );
  document.addEventListener("mouseup", onDragEnd);
  document.addEventListener(
    "touchmove",
    (e) => {
      if (!isDragging) return;
      const touch = e.touches[0];
      onDragMove(touch.clientX, touch.clientY);
    },
    { passive: true },
  );
  document.addEventListener("touchend", onDragEnd);

  // Tab closed / navigated away mid live chat: end it so the agent isn't left with an
  // orphaned chat. The /end fetch uses keepalive so it survives the unload. No-op otherwise.
  window.addEventListener("pagehide", () => {
    branding.cleanup({ revive: true });
    if (liveSession) endLiveAgentSession();
  });

  window.addEventListener("resize", () => {
    if (isExpanded || !widget.style.left) return;
    const left = parseInt(widget.style.left, 10) || 0;
    const top = parseInt(widget.style.top, 10) || 0;
    const maxLeft = window.innerWidth - widget.offsetWidth;
    const maxTop = window.innerHeight - widget.offsetHeight;
    widget.style.left = Math.max(0, Math.min(left, maxLeft)) + "px";
    widget.style.top = Math.max(0, Math.min(top, maxTop)) + "px";
  });

  document.addEventListener("keydown", (e) => {
    if (e.key === "Escape") {
      if (!isExpanded && isSidebarOpen) closeSidebar();
      else if (isOpen) closeWidget();
    }
  });

  //updateSendButton();
  //updateSidebarToggleState();
  //restoreSession();
  //})();

  updateSendButton();
  updateSidebarToggleState();
  void refreshBranding({ force: true });
  document.addEventListener("visibilitychange", () => {
    if (document.visibilityState === "visible") void refreshBranding();
  });
  window.addEventListener("focus", () => void refreshBranding());
  window.addEventListener("pageshow", (event) => {
    if (event.persisted) {
      branding.cleanup({ revive: true });
      void refreshBranding({ force: true });
    }
  });
  void loadConversationsFromSharePoint();
  if (window.requestIdleCallback) {
    window.requestIdleCallback(() => {
      void ensureWebChatInitialized().catch(() => {});
    });
  } else {
    setTimeout(() => {
      void ensureWebChatInitialized().catch(() => {});
    }, 1000);
  }
  // Public API lets an external page control the widget.
  window.CopilotWidget = {
    open() {
      openWidget();
    },
    close() {
      closeWidget();
    },
    isOpen() {
      return isOpen;
    },
    ask(question, source = KB_SITE_SEARCH_SOURCE) {
      if (!question || !question.trim()) return;
      openWidget();
      closeSidebar();
      setTimeout(() => {
        input.value = question;
        updateSendButton();
        handleSend(normalizeConversationSource(source));
      }, 320);
    },
  };
})();

import { hydrateIcons } from './icons.js';

(function () {
  "use strict";

  const DIRECT_LINE_SECRET = "94sSs6Vm33JKQsyFzQwwQcAMJ0oxJDY8L8H75wDwLW7463ewDmMpJQQJ99CFACrJL3JAArohAAABAZBS1xjt.3jeezJtbQlUDGbIMI3nVhGFF86M1kGOJwCDqRfYLgPkzpzv6e26oJQQJ99CFACrJL3JAArohAAABAZBS39Ve";
  const tenantId = "apps365";
  const defaultUserId = "";
  const defaultUserName = "";
  const MAX_FILE_SIZE = 4 * 1024 * 1024; // Direct Line channel limit
  const TAWK_CHAT_URL = window.TAWK_CHAT_URL || "https://tawk.to/chat/5c4f037d51410568a108fd36/1g01fv347";
  const SHAREPOINT_SITE_URL = "https://cubiclogics.sharepoint.com/sites/Apps365KBAgent";
  const SHAREPOINT_LIST_TITLE = "Apps365KBAgentPrompts";
  const SHAREPOINT_TOKEN_URL = "https://websiteplans.apps365.com/api/token/cubiclogics";
  const isLocalEnvironment = location.protocol === "file:" || /^(localhost|127\.0\.0\.1)$/i.test(location.hostname);
  const canUseSharePointPersistence = !isLocalEnvironment;
  const USER_EMAIL_STORAGE_KEY = "kb_user_email";
  const LOCAL_CONVERSATION_STORAGE_PREFIX = "cw-conversations-v1";

  function normalizeEmail(value) {
    return String(value || "").trim().toLowerCase();
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
    const email = normalizeEmail(context.userEmail || window.CW_USER_EMAIL || getStoredUserEmail());
    const login = String(context.userLoginName || window.CW_USER_LOGIN || "").trim();
    const name = String(context.userDisplayName || window.CW_USER_NAME || defaultUserName).trim() || defaultUserName;
    const id = email || login || defaultUserId;

    return {
      id,
      email,
      name,
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
  const headerSubtitle = document.getElementById("cw-header-subtitle");
  const body = document.getElementById("cw-body");
  const input = document.getElementById("cw-input");
  const newChatBtn = document.getElementById("cw-new-chat");
  const sidebarNewChatBtn = document.getElementById("cw-sidebar-new-chat");
  const expandBtn = document.getElementById("cw-expand-btn");
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
  let tawkFrame = null;
  const bodyScroll = document.querySelector(".cw-body-scroll");
  const footer = document.querySelector(".cw-footer");
  const quickReplyBtns = document.querySelectorAll(".cw-quick-reply");
  const webchatDiv = document.getElementById("webchat");

  if (!widget || !fab || !header || !webchatDiv) return;

  // Fill in every static icon span (expand, collapse, close, search, add,
  // panel-open/closed, sparkle, attach, send) now that the DOM is ready.
  hydrateIcons(document);

  let conversations = [];
  let currentConversation = null;
  let chatStarted = false;
  let directLine;
  let store;
  let webChatInitPromise = null;
  let webChatInitialized = false;
  let renderedMessageIds = new Set();
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
    .then((data) => { userPublicIp = data.ip || ""; })
    .catch(() => { userPublicIp = ""; });
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
    const email = normalizeEmail(currentUserEmail);
    //return email ? `&$filter=Email eq '${escapeODataString(email)}'` : "";
    return email ? `&$filter=tolower(Email) eq '${escapeODataString(email.toLowerCase())}'` : "";
  }

  function getLocalConversationStorageKey() {
    const scope = [tenantId, window.location.pathname || "/", currentUserEmail || "anonymous"].join(":");
    return `${LOCAL_CONVERSATION_STORAGE_PREFIX}:${scope}`;
  }

  function cloneConversationForStorage(conv, { includeContentUrl = false } = {}) {
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
              ...(includeContentUrl ? { contentUrl: att.contentUrl || "", thumbnailUrl: att.thumbnailUrl || "" } : {}),
            }))
          : [],
      })),
    };
  }

  function normalizeLocalConversationItem(item) {
    if (!item) return null;

    const messages = sanitizeStoredMessages(item.messages || []);
    const previewSource = messages[messages.length - 1] || { text: item.preview || item.title || "" };
    const preview = getActivityPreview(previewSource);
    const title = item.title || messages.find((m) => m.from?.role === "user")?.text?.trim() || preview || "New chat";

    return {
      spId: item.spId || null,
      conversationId: item.conversationId || item.id || `local-${Date.now()}`,
      title: title.slice(0, 50),
      preview,
      timestamp: normalizeConversationTimestamp(item.timestamp || item.modified || item.createdAt),
      createdAt: item.createdAt || new Date().toISOString(),
      email: item.email || currentUserEmail || "",
      pageUrl: item.pageUrl || window.location.href || "",
      userIp: item.userIp || "",
      userId: item.userId || userId || "",
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
        .map((conv) => cloneConversationForStorage(conv, { includeContentUrl: true }));
      localStorage.setItem(getLocalConversationStorageKey(), JSON.stringify(snapshot));
    } catch (error) {
      console.warn("Unable to save conversations locally", error);
    }
  }

  function decodeJwtExpiry(token) {
    try {
      const payload = JSON.parse(atob(token.split(".")[1].replace(/-/g, "+").replace(/_/g, "/")));
      return typeof payload.exp === "number" ? payload.exp * 1000 : 0;
    } catch {
      return 0;
    }
  }

  async function fetchSharePointToken() {
    if (!canUseSharePointPersistence) {
      throw new Error("SharePoint persistence is disabled in local development");
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
    sharePointTokenExpiresAt = decodeJwtExpiry(token) || Date.now() + 45 * 60 * 1000;
    return token;
  }

  async function getSharePointToken() {
    if (!canUseSharePointPersistence) {
      throw new Error("SharePoint persistence is disabled in local development");
    }

    if (sharePointToken && sharePointTokenExpiresAt > Date.now() + 60_000) {
      return sharePointToken;
    }
    return fetchSharePointToken();
  }

  async function spRequest(path, options = {}, { skipDigest = false } = {}) {
    if (!canUseSharePointPersistence) {
      throw new Error("SharePoint persistence is disabled in local development");
    }

    const token = await getSharePointToken();
    const headers = new Headers(options.headers || {});
    headers.set("Authorization", `Bearer ${token}`);

    const method = (options.method || "GET").toUpperCase();
    const hasBody = options.body !== undefined && options.body !== null;
    if (!headers.has("Accept")) headers.set("Accept", "application/json;odata=nometadata");
    if (hasBody && !headers.has("Content-Type")) headers.set("Content-Type", "application/json;odata=nometadata");

    if (!skipDigest && method !== "GET" && method !== "HEAD" && path !== "/_api/contextinfo") {
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
      { skipDigest: true }
    );

    if (!response.ok) {
      throw new Error(`Context info request failed (${response.status})`);
    }

    const data = await response.json();
    const info = data?.d?.GetContextWebInformation || data?.GetContextWebInformation || {};
    sharePointDigest = info.FormDigestValue || "";
    const timeoutSeconds = Number(info.FormDigestTimeoutSeconds || 30);
    sharePointDigestExpiresAt = Date.now() + Math.max(timeoutSeconds - 60, 1) * 1000;
    return sharePointDigest;
  }

  async function ensureSharePointListMetadata() {
    if (sharePointListEntityType) return;

    const safeTitle = SHAREPOINT_LIST_TITLE.replace(/'/g, "''");
    const response = await spRequest(`/_api/web/lists/getbytitle('${safeTitle}')?$select=ListItemEntityTypeFullName`, { method: "GET" });
    if (!response.ok) {
      throw new Error(`List metadata request failed (${response.status})`);
    }

    const data = await response.json();
    sharePointListEntityType = data.ListItemEntityTypeFullName || data.d?.ListItemEntityTypeFullName || "";
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

        const role = message.role === "assistant" ? "bot" : message.role === "bot" ? "bot" : "user";
        const text = message.content || message.text || "";
        const attachments = Array.isArray(message.attachments)
          ? message.attachments.map((att) => ({
              name: att.name || "Attachment",
              contentType: att.contentType || "",
              contentUrl: att.contentUrl || "",
              thumbnailUrl: att.thumbnailUrl || "",
            }))
          : [];

        return {
          id: message.id || `msg-${index}`,
          type: "message",
          text,
          attachments,
          from: {
            id: role === "user" ? userId : "bot",
            name: role === "user" ? userName : "Copilot",
            role,
          },
          timestamp: message.timestamp || new Date().toISOString(),
        };
      })
      .filter(Boolean);
  }

  function serializeConversation(conv, { includeContentUrl = false } = {}) {
    return {
      messages: (conv.messages || []).map((message) => ({
        role: message.from?.role === "bot" ? "assistant" : "user",
        content: message.text || "",
        attachments: Array.isArray(message.attachments)
          ? message.attachments.map((att) => ({
              name: att.name || "Attachment",
              contentType: att.contentType || "",
              ...(includeContentUrl ? { contentUrl: att.contentUrl || "", thumbnailUrl: att.thumbnailUrl || "" } : {}),
            }))
          : [],
        timestamp: message.timestamp || new Date().toISOString(),
      })),
    };
  }

  function parseSharePointConversationItem(item) {
    const rawConversation = item.Conversation || item.ConversationJSON || item.ConversationJson || "";
    let parsed = { messages: [] };
    if (rawConversation) {
      try {
        parsed = JSON.parse(rawConversation);
      } catch {
        parsed = { messages: [] };
      }
    }

    const messages = sanitizeStoredMessages(parsed.messages || []);
    const previewSource = messages[messages.length - 1] || { text: item.Title || "" };
    const preview = getActivityPreview(previewSource);
    const title = item.Title || messages.find((m) => m.from?.role === "user")?.text?.trim() || preview || "New chat";

    return {
      spId: item.Id || item.ID || null,
      conversationId: item.ConversationId || item.ConversationID || `sp-${item.Id || item.ID || Date.now()}`,
      title: title.slice(0, 50),
      preview,
      timestamp: normalizeConversationTimestamp(item.Modified || item.Created),
      createdAt: item.Created || new Date().toISOString(),
      email: item.Email || "",
      pageUrl: item.PageUrl1 || item.PageURL || "",
      userIp: item.UserIP || "",
      userId: item.UserId || "",
      messages,
    };
  }

  function buildConversationFields(conv) {
    const serialized = serializeConversation(conv);
    return {
      Title: conv.title || conv.preview || "New chat",
      Email: conv.email || currentUserEmail || "",
      Conversation: JSON.stringify(serialized),
      PageUrl1: conv.pageUrl || window.location.href || "",
      UserIP: conv.userIp || userPublicIp || "",
      ConversationId: conv.conversationId || "",
      UserId: conv.userId || userId || "",
    };
  }

  function isConversationForCurrentUser(conv) {
    const ownerEmail = String(conv.email || "").trim().toLowerCase();
    const currentEmail = String(currentUserEmail || "").trim().toLowerCase();

    if (!currentEmail || !ownerEmail) return false;
    return ownerEmail === currentEmail;
  }

  function extractEmailFromText(text) {
    const match = String(text || "").match(/\b[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}\b/i);
    return match ? normalizeEmail(match[0]) : "";
  }

  function applyUserEmailIdentity(email, { persist = true, reloadHistory = true } = {}) {
    const normalized = normalizeEmail(email);
    if (!normalized || normalized === normalizeEmail(currentUserEmail)) return false;

    currentUserEmail = normalized;
    userId = normalized;

    if (persist) {
      setStoredUserEmail(normalized);
    }

    conversationLoadPromise = null;
    if (reloadHistory) {
      void conversationSaveQueue
        .then(() => loadConversationsFromSharePoint(true))
        .then(() => {
          renderHistoryList(searchInput?.value || "");
        });
    }

    return true;
  }

  async function persistConversation(conv) {
    if (!conv) return;
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

    if (conv.spId) {
      const response = await spRequest(
        `/_api/web/lists/getbytitle('${safeTitle}')/items(${conv.spId})`,
        {
          method: "POST",
          headers: {
            Accept: "application/json;odata=verbose",
            "Content-Type": "application/json;odata=verbose",
            "If-Match": "*",
            "X-HTTP-Method": "MERGE",
          },
          body: JSON.stringify(payload),
        }
      );

      if (!response.ok) {
        throw new Error(`Conversation update failed (${response.status})`);
      }
      return;
    }

    const response = await spRequest(
      `/_api/web/lists/getbytitle('${safeTitle}')/items`,
      {
        method: "POST",
        headers: {
          Accept: "application/json;odata=verbose",
          "Content-Type": "application/json;odata=verbose",
        },
        body: JSON.stringify(payload),
      }
    );

    if (!response.ok) {
      throw new Error(`Conversation create failed (${response.status})`);
    }

    const data = await response.json();
    conv.spId = data?.d?.Id || data?.d?.ID || data?.Id || data?.ID || conv.spId || null;
    return conv;
  }

  function queueConversationSave(conv, immediate = false) {
    if (!conv) return;
    clearTimeout(conversationSaveTimer);

    if (!canUseSharePointPersistence) {
      conversationSaveTimer = setTimeout(() => {
        saveConversationsToLocalStorage();
      }, immediate ? 0 : 150);
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
            `/_api/web/lists/getbytitle('${safeTitle}')/items?$select=Id,Title,Conversation,Email,PageUrl1,UserIP,ConversationId,UserId,Created,Modified&$orderby=Modified desc&$top=25${getConversationOwnerQuery()}`,
            { method: "GET" }
          );

          if (!response.ok) {
            throw new Error(`Conversation list request failed (${response.status})`);
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
          const stillPresent = conversations.some((c) => getConversationKey(c) === key);
          if (!stillPresent) {
            conversations.unshift(currentConversation);
          }
        }

        conversationLoadStarted = true;
        renderHistoryList(searchInput?.value || "");
        return conversations;
      } catch (error) {
        if (canUseSharePointPersistence) {
          console.warn("Unable to load conversations from SharePoint, using local cache", error);
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
    return escapeHtml(text).replace(/\*\*(.+?)\*\*/g, "<strong>$1</strong>").replace(/\n/g, "<br>");
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

  function showEmptyState() {
    clearMessages();
    const empty = document.createElement("div");
    empty.className = "cw-empty-state";
    empty.innerHTML = `
      <div class="cw-assistant-avatar" aria-hidden="true">
        <img class="cw-brand-logo" src="https://ik.imagekit.io/zn4au2jftpm5/CLAILogo.svg" alt="" />
      </div>
      <div class="cw-empty-bubble">
        Hi ${escapeHtml(userName)} <span aria-hidden="true">&#128075;</span> I'm your Apps365 AI assistant. I'm here to answer using the official Apps365 KB.
      </div>
    `;
    body.appendChild(empty);
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

  function userActionsHtml(includeEdit) {
    const editBtn = includeEdit
      ? `<button type="button" class="cw-msg-action" data-action="edit" aria-label="Edit message">${fluentIconHtml("edit")}</button>`
      : "";
    return `
      <div class="cw-user-actions">
        <button type="button" class="cw-msg-action" data-action="copy" aria-label="Copy message">${fluentIconHtml("copy")}</button>
        ${editBtn}
      </div>
    `;
  }

  function copilotActionsHtml(messageId) {
    return `
      <div class="cw-copilot-actions">
        <button type="button" class="cw-msg-action" data-action="copy" aria-label="Copy response">${fluentIconHtml("copy")}</button>
        <span class="cw-action-divider" aria-hidden="true"></span>
        <button type="button" class="cw-msg-action cw-feedback-btn" data-action="feedback-up" data-message-id="${escapeHtml(messageId || "")}" aria-label="Good response" aria-pressed="false">${fluentIconHtml("thumb-like")}</button>
        <button type="button" class="cw-msg-action cw-feedback-btn" data-action="feedback-down" data-message-id="${escapeHtml(messageId || "")}" aria-label="Bad response" aria-pressed="false">${fluentIconHtml("thumb-dislike")}</button>
      </div>
    `;
  }

  function bindCopyButton(btn, value) {
    btn?.addEventListener("click", () => {
      if (!value) return;
      navigator.clipboard.writeText(value).then(
        () => showToast("Copied to clipboard"),
        () => showToast("Could not copy")
      );
    });
  }

  function bindUserMessageActions(container, text, attachments, includeEdit) {
    const copyBtn = container.querySelector('.cw-user-actions [data-action="copy"]');
    const editBtn = container.querySelector('.cw-user-actions [data-action="edit"]');
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
    const copyBtn = container.querySelector('.cw-copilot-actions [data-action="copy"]');
    bindCopyButton(copyBtn, text);

    const upBtn = container.querySelector('.cw-copilot-actions [data-action="feedback-up"]');
    const downBtn = container.querySelector('.cw-copilot-actions [data-action="feedback-down"]');
    bindFeedbackButtons(upBtn, downBtn, messageId, text);
  }

  function bindFeedbackButtons(upBtn, downBtn, messageId, answerText) {
    if (!upBtn || !downBtn) return;

    function setState(rating) {
      const isUp = rating === "up";
      const isDown = rating === "down";
      upBtn.classList.toggle("is-selected", isUp);
      downBtn.classList.toggle("is-selected", isDown);
      upBtn.setAttribute("aria-pressed", String(isUp));
      downBtn.setAttribute("aria-pressed", String(isDown));
    }

    upBtn.addEventListener("click", () => {
      const alreadyUp = upBtn.classList.contains("is-selected");
      setState(alreadyUp ? null : "up");
    });

    downBtn.addEventListener("click", () => {
      const alreadyDown = downBtn.classList.contains("is-selected");
      setState(alreadyDown ? null : "down");
    });
  }

  function appendUserMessage(activity) {
    hideEmptyState();
    const wrap = document.createElement("div");
    wrap.className = "cw-user-msg";

    const text = typeof activity === "string" ? activity : activity.text || "";
    const attachments = typeof activity === "string" ? [] : activity.attachments || [];
    const hasText = Boolean(text && text.trim());
    const hasAttachments = attachments.length > 0;
    const includeEdit = hasText && !hasAttachments;

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
      html += userActionsHtml(includeEdit);
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
    `;
    body.appendChild(msg);
    hydrateIcons(msg);
    bindCopilotMessageActions(msg, text || "", messageId);
    scrollToMessageStart(lastUserMsgEl || msg);
  }

  function renderActivity(activity) {
    if (!activity || activity.type !== "message") return;

    const hasText = activity.text && activity.text.trim();
    const hasAttachments = activity.attachments && activity.attachments.length > 0;
    if (!hasText && !hasAttachments) return;

    const id =
      activity.id ||
      `${activity.text || ""}-${activity.attachments?.[0]?.name || ""}-${activity.timestamp}`;
    if (renderedMessageIds.has(id)) return;
    renderedMessageIds.add(id);
    
    if (activity.from && activity.from.role === "user") {
      appendUserMessage(activity);
    } else if (hasText) {
      appendCopilotMessage(activity.text, activity.id || id);
    }
  }

  function getActivityPreview(activity) {
    if (activity.text && activity.text.trim()) return activity.text;
    if (activity.attachments?.length) {
      const names = activity.attachments.map((a) => a.name || "file").join(", ");
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
      (m) => normalizeMsgText(m.text) === text && m.from?.role === activity.from?.role
    );
  }

  function shouldIgnoreBotMessage(activity) {
    if (activity.from?.role === "user") return false;
    if (isReplayingHistory) return true;
    if (isDuplicateMessage(activity)) return true;

    const text = activity.text || "";
    if (!isProactiveWelcome(text) || !currentConversation) return false;

    const hasUserMsg = currentConversation.messages.some((m) => m.from?.role === "user");
    const hasBotMsg = currentConversation.messages.some((m) => m.from?.role !== "user");
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
    updateHeaderTitle("Apps365 AI Assistant");
  }

  function showLoading() {
    if (body.querySelector("#cw-loading")) return;

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
    body.querySelector("#cw-loading")?.remove();
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
      empty.textContent = filterText ? "No chats found" : "No conversations yet";
      historyList.appendChild(empty);
      return;
    }

    filtered.forEach((conv) => {
      const li = document.createElement("li");
      li.className = "cw-history-item";
      if (currentConversation && getConversationKey(conv) === getConversationKey(currentConversation)) {
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
      visible ? "Hide sidebar" : "Show sidebar"
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
        const hasAttachments = activity.attachments && activity.attachments.length > 0;
        // File uploads are handled in sendFiles() after postActivity resolves
        if (hasAttachments) return next(action);

        const hasText = activity.text && activity.text.trim();
        if (hasText) {
          handleNewMessage({
            id: activity.id || "local-" + Date.now(),
            type: "message",
            text: activity.text,
            attachments: [],
            from: { id: userId, name: userName, role: "user" },
            timestamp: new Date().toISOString(),
          });
        }
      }

      if (!isReplay && action.type === "DIRECT_LINE/INCOMING_ACTIVITY") {
        const activity = action.payload.activity;
        if (activity.type === "message" && activity.from && activity.from.role !== "user") {
          handleNewMessage({
            id: activity.id || "bot-" + Date.now(),
            type: "message",
            text: activity.text,
            from: { id: "bot", name: activity.from.name || "Copilot", role: "bot" },
            timestamp: activity.timestamp || new Date().toISOString(),
          });
        }
      }

      return next(action);
    });
  }

  function ensureWebChatInitialized() {
    if (webChatInitialized) return Promise.resolve();
    if (webChatInitPromise) return webChatInitPromise;

    webChatInitPromise = Promise.resolve().then(() => {
      if (webChatInitialized) return;
      if (!window.WebChat) {
        throw new Error("BotFramework WebChat is not loaded.");
      }

      webchatDiv.innerHTML = "";
      directLine = window.WebChat.createDirectLine({ secret: DIRECT_LINE_SECRET });
      // directLine = window.WebChat.createDirectLine({ domain: "http://localhost:56150/v3/directline",});
      store = createStore();
      window.WebChat.renderWebChat({ directLine, store, userID: userId, username: userName }, webchatDiv);
      webChatInitialized = true;
    }).catch((error) => {
      webChatInitPromise = null;
      console.error(error);
      throw error;
    });

    return webChatInitPromise;
  }

  function handleNewMessage(activity) {
    if (activity.from.role !== "user") {
      if (!currentConversation || shouldIgnoreBotMessage(activity)) return;
    }

    if (activity.from.role === "user") {
      const capturedEmail = extractEmailFromText(activity.text);
      if (capturedEmail) {
        applyUserEmailIdentity(capturedEmail, { persist: true, reloadHistory: true });
      }
    }

    if (!currentConversation) {
      const preview = getActivityPreview(activity);
      const conversationId = `conv-${Date.now()}-${Math.random().toString(36).slice(2, 7)}`;
      currentConversation = {
        id: conversationId,
        conversationId,
        title: preview.slice(0, 50),
        preview,
        timestamp: Date.now(),
        messages: [],
        pageUrl: window.location.href,
        userIp: userPublicIp || "",
        userId,
        email: currentUserEmail || "",
      };
      conversations.unshift(currentConversation);
    }

    currentConversation.messages.push(activity);
    currentConversation.preview = getActivityPreview(activity);
    currentConversation.timestamp = Date.now();
    if (activity.from.role === "user") {
      const preview = getActivityPreview(activity);
      currentConversation.title = preview.slice(0, 50);
      currentConversation.email = currentUserEmail || currentConversation.email || "";
    }
    updateHeaderForCurrentView();

    if (currentConversation.messages.length === 1 && !body.querySelector(".cw-date-sep")) {
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
    } else {
      hideLoading();
    }

    queueConversationSave(currentConversation, true);
    renderHistoryList(searchInput?.value || "");
  }

  async function loadConversation(conv) {
    hideLoading();
    currentConversation = conv;
    chatStarted = conv.messages.length > 0;
    clearMessages();
    updateHeaderForCurrentView();

    if (conv.messages.length) {
      const dateSep = document.createElement("div");
      dateSep.className = "cw-date-sep";
      dateSep.innerHTML = `<span>${formatDate(conv.timestamp)}</span>`;
      body.appendChild(dateSep);
      conv.messages.forEach((activity) => renderActivity(activity));
    } else {
      showEmptyState();
    }

    beginReplayGuard();
    await ensureWebChatInitialized();

    setTimeout(() => {
      if (!store) return;
      conv.messages.forEach((activity) => {
        store.dispatch({
          type: "DIRECT_LINE/INCOMING_ACTIVITY",
          payload: { activity: { ...activity, channelData: { isReplay: true } } },
        });
      });
    }, 300);

    renderHistoryList(searchInput?.value || "");
  }

  function startNewConversation() {
    closeLiveAgent();
    hideLoading();
    currentConversation = null;
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
    if (currentConversation || chatStarted || body.querySelector(".cw-user-msg, .cw-copilot-msg")) {
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

function sendMessage(text) {
    if (!store || !text) return;

    store.dispatch({
      type: "WEB_CHAT/SEND_MESSAGE",
      payload: {
        text,
        channelData: {
          pageUrl: window.location.href,
          userIp: userPublicIp,
        },
      },
    });
  }

  function addPendingFiles(fileList) {
    if (!fileList?.length) return;

    Array.from(fileList).forEach((file) => {
      if (file.size > MAX_FILE_SIZE) {
        showToast(`"${file.name}" is too large (${formatFileSize(file.size)}). Max 4 MB.`);
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

  function fileToDataUrl(file) {
    return new Promise((resolve, reject) => {
      const reader = new FileReader();
      reader.onload = () => resolve(String(reader.result || ""));
      reader.onerror = () => reject(reader.error || new Error("Could not read file"));
      reader.readAsDataURL(file);
    });
  }

  function getDirectLineConversationId() {
    return (
      directLine?.conversationId ||
      directLine?.conversation?.conversationId ||
      directLine?._conversationId ||
      directLine?._conversation?.conversationId ||
      ""
    );
  }

  async function uploadFilesToDirectLine(filesToSend, text) {
    const conversationId = getDirectLineConversationId();
    if (!conversationId) {
      throw new Error("Direct Line conversation is not ready");
    }

    const formData = new FormData();
    filesToSend.forEach((item) => {
      formData.append("file", item.file, item.file.name);
    });

    if (text) {
      formData.append(
        "activity",
        new Blob(
          [
            JSON.stringify({
              type: "message",
              from: { id: userId, name: userName, role: "user" },
              text,
            }),
          ],
          { type: "application/vnd.microsoft.activity" }
        )
      );
    }

    const response = await fetch(
      `https://directline.botframework.com/v3/directline/conversations/${encodeURIComponent(conversationId)}/upload?userId=${encodeURIComponent(userId)}`,
      {
        method: "POST",
        headers: {
          Authorization: `Bearer ${DIRECT_LINE_SECRET}`,
        },
        body: formData,
      }
    );

    if (!response.ok) {
      throw new Error(`Direct Line upload failed (${response.status})`);
    }

    return response.json().catch(() => ({}));
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

  function uploadActivity(activity) {
    return new Promise((resolve, reject) => {
      if (!directLine) {
        reject(new Error("not ready"));
        return;
      }
      directLine.postActivity(activity).subscribe({
        next: (id) => resolve({ ...activity, id, timestamp: new Date().toISOString() }),
        error: reject,
      });
    });
  }

  async function handleSend() {
    if (!input) return;
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

    try {
      if (filesToSend.length) {
        const attachments = await Promise.all(
          filesToSend.map(async (item) => ({
            contentType: item.file.type || "application/octet-stream",
            contentUrl: await fileToDataUrl(item.file),
            name: item.file.name,
          }))
        );

        try {
          await uploadFilesToDirectLine(filesToSend, text);
          handleNewMessage({
            id: `local-${Date.now()}`,
            type: "message",
            text,
            attachments,
            from: { id: userId, name: userName, role: "user" },
            timestamp: new Date().toISOString(),
          });
        } catch {
          const activity = await uploadActivity({
            type: "message",
            text,
            from: { id: userId, name: userName, role: "user" },
            attachments,
          });

          handleNewMessage(activity);
        }
      } else if (text) {
        sendMessage(text);
      }
    } catch {
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
    const canSend = input.value.trim().length > 0 || pendingFiles.length > 0;
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
    closeLiveAgent();
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
    closeLiveAgent();
    isOpen = false;
    closeSidebar();
    widget.classList.remove("is-visible");
    fab.classList.remove("is-open");
    fab.setAttribute("aria-label", "Open chat");
    fab.setAttribute("aria-expanded", "false");
  }

  function openLiveAgent() {
    if (document.querySelector(".cw-live-agent-card")) return;
    scrollToBottom();

    let liveCard = document.querySelector(".cw-live-agent-card");
    if (!liveCard) {
      liveCard = document.createElement("div");
      liveCard.className = "cw-live-agent-card";
      liveCard.innerHTML = `
        <div class="cw-live-agent-card-header">
          <span class="cw-live-dot" aria-hidden="true"></span>
          <span class="cw-live-text">Connected live via tawk.to</span>
          <button class="cw-live-agent-close cw-icon-btn" type="button" aria-label="Close live agent">
            <span class="cw-fluent-icon cw-icon-close" aria-hidden="true"></span>
          </button>
        </div>
        <iframe class="cw-tawk-frame" title="Live agent chat" allow="microphone"></iframe>
      `;
      body.appendChild(liveCard);
      hydrateIcons(liveCard);
      liveCard.querySelector(".cw-live-agent-close")?.addEventListener("click", closeLiveAgent);
    }

    tawkFrame = liveCard.querySelector(".cw-tawk-frame");
    if (tawkFrame) tawkFrame.src = TAWK_CHAT_URL;

    const headerIndicator = document.querySelector(".cw-header-live-indicator");
    if (headerIndicator) headerIndicator.hidden = false;

    scrollToBottom();
  }

  function closeLiveAgent() {
    const liveCard = document.querySelector(".cw-live-agent-card");
    if (liveCard) {
      const frame = liveCard.querySelector(".cw-tawk-frame");
      if (frame) frame.src = "about:blank";
      liveCard.remove();
    }

    tawkFrame = null;

    const headerIndicator = document.querySelector(".cw-header-live-indicator");
    if (headerIndicator) headerIndicator.hidden = true;
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
      { passive: true }
    );
  }

  fab.addEventListener("click", toggleWidget);
  expandBtn?.addEventListener("click", toggleExpand);
  sidebarToggleBtn?.addEventListener("click", toggleSidebar);
  sidebarBackdrop?.addEventListener("click", closeSidebar);
  sendBtn?.addEventListener("click", handleSend);
  attachBtn?.addEventListener("click", handleAttachClick);
  fileInput?.addEventListener("change", () => {
    if (fileInput.files?.length) addPendingFiles(fileInput.files);
  });
  newChatBtn?.addEventListener("click", closeWidget);
  sidebarNewChatBtn?.addEventListener("click", () => {
    startNewConversation();

    if (isExpanded) {
        openSidebar();
    } else {
        closeSidebar();
    }
});

  searchInput?.addEventListener("input", () => renderHistoryList(searchInput.value));
  quickReplyBtns.forEach((btn) => {
    btn.addEventListener("click", async () => {
      const chip = btn.dataset.chip;

      if (chip === "contact-support") {
        window.open("https://www.apps365.com/support/", "_blank", "noopener");
        return;
      }

      if (chip === "raise-ticket") {
        try {
          await ensureWebChatInitialized();
        } catch {
          showToast("Chat is still loading. Please try again.");
          return;
        }
        if (!input) return;
        input.value = "How to raise a ticket";
        updateSendButton();
        handleSend();
        return;
      }

      if (chip === "live-agent") {
        openLiveAgent();
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

  document.addEventListener("mousemove", (e) => onDragMove(e.clientX, e.clientY));
  document.addEventListener("mouseup", onDragEnd);
  document.addEventListener(
    "touchmove",
    (e) => {
      if (!isDragging) return;
      const touch = e.touches[0];
      onDragMove(touch.clientX, touch.clientY);
    },
    { passive: true }
  );
  document.addEventListener("touchend", onDragEnd);

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
    ask(question) {
      if (!question || !question.trim()) return;
      openWidget();
      closeSidebar();
      setTimeout(() => {
        input.value = question;
        updateSendButton();
        handleSend();
      }, 320); 
    },
  };
})();

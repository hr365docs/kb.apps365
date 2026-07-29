( function () {
  "use strict";

  const DIRECT_LINE_SECRET = "94sSs6Vm33JKQsyFzQwwQcAMJ0oxJDY8L8H75wDwLW7463ewDmMpJQQJ99CFACrJL3JAArohAAABAZBS1xjt.3jeezJtbQlUDGbIMI3nVhGFF86M1kGOJwCDqRfYLgPkzpzv6e26oJQQJ99CFACrJL3JAArohAAABAZBS39Ve";
  const tenantId = "apps365";
  const userId = "currentuser";
  const userName = "chats";

  if (!DIRECT_LINE_SECRET) {
    console.error("CopilotWidget: DIRECT_LINE_SECRET is missing. Check that .env is reachable at the configured path and contains DIRECT_LINE_SECRET=...");
  }



  const chatKey = `${tenantId}-${userId}`;
  const MAX_FILE_SIZE = 4 * 1024 * 1024; // Direct Line channel limit

  const widget = document.getElementById("cw-widget");
  const fab = document.getElementById("cw-fab");
  const header = document.getElementById("cw-header");
  const headerTitle = document.getElementById("cw-header-title");
  const headerSubtitle = document.getElementById("cw-header-subtitle");
  const body = document.getElementById("cw-body");
  const input = document.getElementById("cw-input");
  const newChatBtn = document.getElementById("cw-new-chat");
  const sidebarNewChatBtn = document.getElementById("cw-sidebar-new-chat");
  const moveBtn = document.getElementById("cw-move-btn");
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
  const quickReplyBtns = document.querySelectorAll(".cw-quick-reply");
  const webchatDiv = document.getElementById("webchat");

  if (!widget || !fab || !header || !webchatDiv) return;

  let conversations = JSON.parse(localStorage.getItem(chatKey)) || [];
  let currentConversation = null;
  let chatStarted = false;
  let directLine;
  let store;
  let renderedMessageIds = new Set();

  let isOpen = false;
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
  let isReplayingHistory = false;
  let replayGuardTimer = null;
  if (window.marked) {
    marked.setOptions({ breaks: true, gfm: true });
  }

  function saveConversations() {
    localStorage.setItem(chatKey, JSON.stringify(conversations));
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
      return "Yesterday";
    }
    return d.toLocaleDateString(undefined, { month: "short", day: "numeric" });
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
    const scrollEl = widget.querySelector(".cw-body-scroll");
    if (scrollEl) scrollEl.scrollTop = scrollEl.scrollHeight;
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
        Hi ${escapeHtml(userName)} <span aria-hidden="true">&#128075;</span> I'm your Apps365 AI assistant.I'm here to answer using the official Apps365 KB.
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

  function copilotActionsHtml() {
    return `
      <div class="cw-copilot-actions">
        <button type="button" class="cw-msg-action" data-action="copy" aria-label="Copy response">${fluentIconHtml("copy")}</button>
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

  function bindCopilotMessageActions(container, text) {
    const copyBtn = container.querySelector('.cw-copilot-actions [data-action="copy"]');
    bindCopyButton(copyBtn, text);
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

    bindUserMessageActions(inner, text, attachments, includeEdit);
    scrollToBottom();
  }

  function appendCopilotMessage(text) {
    hideLoading();
    hideEmptyState();
    const msg = document.createElement("article");
    msg.className = "cw-copilot-msg";
    msg.innerHTML = `
      <div class="cw-copilot-card">
        <div class="cw-copilot-text cw-markdown">${renderMarkdown(text)}</div>
      </div>
      ${text?.trim() ? copilotActionsHtml() : ""}
    `;
    body.appendChild(msg);
    bindCopilotMessageActions(msg, text || "");
    scrollToBottom();
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
      appendCopilotMessage(activity.text);
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
      if (currentConversation && conv.id === currentConversation.id) {
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
        closeSidebar();
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

  function initWebChat() {
    if (!window.WebChat) {
      console.error("BotFramework WebChat is not loaded.");
      return;
    }

    webchatDiv.innerHTML = "";
    directLine = window.WebChat.createDirectLine({ secret: DIRECT_LINE_SECRET });
    // directLine = window.WebChat.createDirectLine({ domain: "http://localhost:56150/v3/directline",});
    store = createStore();
    window.WebChat.renderWebChat({ directLine, store, userID: userId, username: userName }, webchatDiv);
  }

  function handleNewMessage(activity) {
    if (activity.from.role !== "user") {
      if (!currentConversation || shouldIgnoreBotMessage(activity)) return;
    }

    if (!currentConversation) {
      const preview = getActivityPreview(activity);
      currentConversation = {
        id: "conv-" + Date.now(),
        title: preview.slice(0, 50),
        preview,
        timestamp: Date.now(),
        messages: [],
      };
      conversations.unshift(currentConversation);
    }

    currentConversation.messages.push(activity);
    currentConversation.preview = getActivityPreview(activity);
    currentConversation.timestamp = Date.now();
    if (activity.from.role === "user") {
      const preview = getActivityPreview(activity);
      currentConversation.title = preview.slice(0, 50);
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
    } else {
      hideLoading();
    }

    saveConversations();
    renderHistoryList(searchInput?.value || "");
  }

  function loadConversation(conv) {
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
    initWebChat();

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
    hideLoading();
    currentConversation = null;
    chatStarted = false;
    updateHeaderForCurrentView();
    showEmptyState();
    initWebChat();
    renderHistoryList(searchInput?.value || "");
    if (input) {
      input.value = "";
      input.focus();
    }
    clearPendingFiles();
    updateSendButton();
  }

  function restoreSession() {
    renderHistoryList();
    if (conversations.length > 0) {
      loadConversation(conversations[0]);
    } else {
      updateHeaderForCurrentView();
      showEmptyState();
      initWebChat();
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

    input.value = "";
    clearPendingFiles();

    try {
      if (filesToSend.length) {
        const attachments = filesToSend.map((item) => ({
          contentType: item.file.type || "application/octet-stream",
          contentUrl: URL.createObjectURL(item.file),
          name: item.file.name,
        }));

        const activity = await uploadActivity({
          type: "message",
          text,
          from: { id: userId, name: userName, role: "user" },
          attachments,
        });

        handleNewMessage(activity);
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
    isOpen = true;
    widget.classList.add("is-visible");
    fab.classList.add("is-open");
    fab.setAttribute("aria-label", "Close chat");
    fab.setAttribute("aria-expanded", "true");
    updateHeaderForCurrentView();
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
    btn.addEventListener("click", () => {
      const question = btn.dataset.question || btn.textContent || "";
      if (!input || !question.trim()) return;
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
  restoreSession();

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

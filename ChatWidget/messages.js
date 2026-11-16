// Chat message rendering, empty state, loading indicator and message feedback (thumbs).
import { hydrateIcons } from "./icons.js";
import { BOT_RESPONSE_TIMEOUT_MS, DEFAULT_BRAND_LOGO_URL } from "./config.js";
import { state } from "./state.js";
import { attachBtn, body, input, sendBtn } from "./dom.js";
import { queueConversationSave } from "./conversation-store.js";
import { syncBrandLogos, updateEmptyStateGreeting } from "./branding-ui.js";
import { clearMessages, escapeHtml, fluentIconHtml, renderChatAttachmentCard, renderMarkdown, scrollToBottom, scrollToMessageStart, showToast } from "./ui-utils.js";
import { ensureWebChatInitialized } from "./directline.js";
import { sendMessage, updateSendButton } from "./composer.js";

const feedbackCache = {};
let responseTimeoutTimer = null;

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

export function showEmptyState() {
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

export function hideEmptyState() {
  body.querySelector(".cw-empty-state")?.remove();
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
  if (!state.currentConversation || !messageId) return;
  if (!state.currentConversation.feedback) state.currentConversation.feedback = {};
  state.currentConversation.feedback[messageId] = {
    rating,
    comment: comment || "",
    timestamp: new Date().toISOString(),
  };
  queueConversationSave(state.currentConversation, true);
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
  const existingFeedback = state.currentConversation?.feedback?.[messageId];
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

export function appendUserMessage(activity) {
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
      <div class="cw-agent-row">
        <div class="cw-bot-avatar" aria-hidden="true"><img class="cw-brand-logo" src="${escapeHtml(DEFAULT_BRAND_LOGO_URL)}" alt="" /></div>
        <div class="cw-agent-content">
          <div class="cw-copilot-card">
            <div class="cw-copilot-text cw-markdown">${renderMarkdown(text)}</div>
          </div>
          ${text?.trim() ? copilotActionsHtml(messageId) : ""}
          ${text?.trim() ? feedbackFormHtml() : ""}
        </div>
      </div>
    `;
  body.appendChild(msg);
  hydrateIcons(msg);
  bindCopilotMessageActions(msg, text || "", messageId);
  scrollToMessageStart(state.lastUserMsgEl || msg);
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
    state.currentConversation?.liveAgent?.assignedAgentName ||
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

export function renderActivity(activity) {
  if (!activity || activity.type !== "message") return;

  const hasText = activity.text && activity.text.trim();
  const hasAttachments =
    activity.attachments && activity.attachments.length > 0;
  if (!hasText && !hasAttachments) return;

  const id =
    activity.id ||
    `${activity.text || ""}-${activity.attachments?.[0]?.name || ""}-${activity.timestamp}`;
  if (state.renderedMessageIds.has(id)) return;
  state.renderedMessageIds.add(id);

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

export function showLoading() {
  state.isWaitingForResponse = true;
  if (input) input.disabled = true;
  if (attachBtn) attachBtn.disabled = true;

  clearTimeout(responseTimeoutTimer);
  responseTimeoutTimer = setTimeout(() => {
    if (!state.isWaitingForResponse) return;
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

export function hideLoading() {
  clearTimeout(responseTimeoutTimer);
  body.querySelector("#cw-loading")?.remove();
  state.isWaitingForResponse = false;
  if (input) input.disabled = false;
  if (attachBtn) attachBtn.disabled = false;
  updateSendButton();
}

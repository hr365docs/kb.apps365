// Message composer: input, attachments, send.
import { FLOATING_WIDGET_SOURCE, normalizeConversationSource } from "./conversation-persistence.mjs";
import { MAX_FILE_SIZE, VERIFYING_INPUT_PLACEHOLDER } from "./config.js";
import { state } from "./state.js";
import { composer, fileInput, filePreviews, input, sendBtn } from "./dom.js";
import { extractEmailFromText } from "./identity.js";
import { escapeHtml, formatFileSize, getFileExtension, showToast } from "./ui-utils.js";
import { hideLoading } from "./messages.js";
import { ensureWebChatInitialized } from "./directline.js";
import { getActiveLiveAgentEmailGate } from "./live-email-gate.js";
import { appendLiveNotice, handleLiveAgentSend } from "./live-agent.js";

export function sendMessage(text, additionalChannelData = {}) {
  if (!state.store || !text) return;

  state.store.dispatch({
    type: "WEB_CHAT/SEND_MESSAGE",
    payload: {
      text,
      channelData: {
        pageUrl: window.location.href,
        userIp: state.userPublicIp,
        ...additionalChannelData,
      },
    },
  });
}

export function addPendingFiles(fileList) {
  if (!fileList?.length) return;

  Array.from(fileList).forEach((file) => {
    if (file.size > MAX_FILE_SIZE) {
      showToast(
        `"${file.name}" is too large (${formatFileSize(file.size)}). Max 4 MB.`,
      );
      return;
    }

    const isImage = file.type.startsWith("image/");
    state.pendingFiles.push({
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
  const item = state.pendingFiles.find((f) => f.id === id);
  if (item?.previewUrl) URL.revokeObjectURL(item.previewUrl);
  state.pendingFiles = state.pendingFiles.filter((f) => f.id !== id);
  renderFilePreviews();
  updateSendButton();
}

export function clearPendingFiles() {
  state.pendingFiles.forEach((item) => {
    if (item.previewUrl) URL.revokeObjectURL(item.previewUrl);
  });
  state.pendingFiles = [];
  renderFilePreviews();
  updateSendButton();
}

function renderFilePreviews() {
  if (!filePreviews) return;

  if (!state.pendingFiles.length) {
    filePreviews.hidden = true;
    filePreviews.innerHTML = "";
    composer?.classList.remove("has-files");
    return;
  }

  filePreviews.hidden = false;
  composer?.classList.add("has-files");

  filePreviews.innerHTML = state.pendingFiles
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

export async function handleSend(source = FLOATING_WIDGET_SOURCE) {
  if (state.liveAgentActive) {
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
    if (state.isWaitingForResponse) {
      showToast("Please wait for the current response to finish.");
      return;
    }

    emailGate.step = "verifying";
    input.value = "";
    input.placeholder = VERIFYING_INPUT_PLACEHOLDER;
    // handleNewMessage picks the email up from the outgoing message.
    if (!state.currentConversation) {
      state.nextConversationSource = normalizeConversationSource(source);
    }
    sendMessage(text, { liveAgentEmailGate: true });
    updateSendButton();
    input.focus();
    return;
  }
  // ---- Direct Line (AI bot) path below: unchanged ----
  if (state.isWaitingForResponse) {
    showToast("Please wait for the current response to finish.");
    return;
  }
  const text = input.value.trim();
  const filesToSend = [...state.pendingFiles];
  if (!text && !filesToSend.length) return;

  try {
    await ensureWebChatInitialized();
  } catch {
    showToast("Chat is still loading. Please try again.");
    return;
  }

  input.value = "";
  clearPendingFiles();
  if (!state.currentConversation) {
    state.nextConversationSource = normalizeConversationSource(source);
  }

  try {
    if (filesToSend.length) {
      // One activity carries the text and the files, so the agent answers the user's
      // question about the files in the same turn. (WEB_CHAT/SEND_FILES expects
      // { files: [{ name, url, size }] }, not raw File objects, so it is not used.)
      // Direct Line uploads each blob and the agent receives it as an attachment.
      state.store.dispatch({
        type: "WEB_CHAT/SEND_MESSAGE",
        payload: {
          ...(text ? { text } : {}),
          attachments: filesToSend.map((item) => ({ blob: item.file })),
          channelData: {
            pageUrl: window.location.href,
            userIp: state.userPublicIp,
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
    if (!state.currentConversation) {
      state.nextConversationSource = FLOATING_WIDGET_SOURCE;
    }
    hideLoading();
    showToast("Could not send your message. Try again.");
  }

  updateSendButton();
  input.focus();
}

export function handleAttachClick() {
  fileInput?.click();
}

export function autoResizeInput() {
  if (!input) return;
  const min = input.classList.contains("cw-composer-input")
    ? state.isExpanded
      ? 45
      : 52
    : 0;
  input.style.height = "auto";
  const h = Math.max(min, input.scrollHeight + 2);
  input.style.height = Math.min(h, 160) + "px";
}

export function updateSendButton() {
  autoResizeInput();
  if (!sendBtn || !input) return;
  const canSend =
    !state.isWaitingForResponse &&
    (input.value.trim().length > 0 || state.pendingFiles.length > 0);
  sendBtn.disabled = !canSend;
}

// Runs once at startup (same position in the init sequence as before): makes programmatic
// input.value assignments resize the textarea.
export function initComposerInput() {
  if (input && input.tagName === "TEXTAREA") {
    const valueDesc = Object.getOwnPropertyDescriptor(
      HTMLTextAreaElement.prototype,
      "value",
    );
    Object.defineProperty(input, "value", {
      configurable: true,
      get() {
        return valueDesc.get.call(this);
      },
      set(v) {
        valueDesc.set.call(this, v);
        autoResizeInput();
      },
    });
  }
}

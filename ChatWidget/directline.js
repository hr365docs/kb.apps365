// Direct Line / WebChat lifecycle and the conversation flow built on it (new/load/restore, incoming activities).
import { FLOATING_WIDGET_SOURCE, normalizeConversationSource } from "./conversation-persistence.mjs";
import { API_BASE_URL } from "./config.js";
import { state } from "./state.js";
import { body, input, searchInput } from "./dom.js";
import { applyUserEmailIdentity, currentUser, extractEmailFromText, userName } from "./identity.js";
import { getActivityPreview, getConversationKey, loadConversations, queueConversationSave } from "./conversation-store.js";
import { resetCustomerSession } from "./customer-session.js";
import { clearMessages, formatDate, showToast } from "./ui-utils.js";
import { hideEmptyState, hideLoading, renderActivity, showEmptyState, showLoading } from "./messages.js";
import { renderHistoryList, updateHeaderForCurrentView } from "./shell.js";
import { clearPendingFiles, updateSendButton } from "./composer.js";
import { clearRatingIdleTimer, handleRatingRequest, scheduleRatingIdle } from "./rating.js";
import { clearLiveAgentEmailGate, handleBotEmailAccepted, handleBotEmailVerified, handleConversationEmailIdentity, isBotEmailVerifiedReply } from "./live-email-gate.js";
import { clearLiveOutcomeNotice, closeLiveAgent, endLiveAgentSession, restoreLiveAgentSession, startLiveAgentEscalation } from "./live-agent.js";

let chatStarted = false;
let webChatInitPromise = null;
let webChatInitialized = false;
// True once a stored conversation has taken directLine.conversationId, so "New chat"
// knows it needs a fresh Direct Line conversation (and therefore a fresh id).
let directLineConversationClaimed = false;
let replayGuardTimer = null;

function isDuplicateMessage(activity) {
  if (!state.isReplayingHistory || !state.currentConversation || !activity.id) return false;
  return state.currentConversation.messages.some((m) => m.id === activity.id);
}

function shouldIgnoreBotMessage(activity) {
  if (activity.from?.role === "user") return false;
  return isDuplicateMessage(activity);
}

function beginReplayGuard() {
  state.isReplayingHistory = true;
  clearTimeout(replayGuardTimer);
  replayGuardTimer = setTimeout(() => {
    state.isReplayingHistory = false;
  }, 2000);
}

function createStore() {
  return window.WebChat.createStore({}, () => (next) => (action) => {
    const isReplay = action.payload?.activity?.channelData?.isReplay;
    if (action.type === "DIRECT_LINE/INCOMING_ACTIVITY") {
      const activity = action.payload?.activity;
      if (
        state.currentConversation &&
        activity?.type === "message" &&
        activity.from?.role !== "user"
      ) {
        hideLoading();
      }
      if (
        activity?.type === "event" &&
        activity.name === "liveAgent/connectRequest"
      ) {
        hideLoading();
        if (
          !isReplay &&
          !state.isReplayingHistory &&
          !state.liveSession
        ) {
          state.pendingHandoffSummary = String(activity.value?.summary || "").trim();
          void startLiveAgentEscalation({
            needsVerification: activity.value?.needsVerification,
          });
        }
        return next(action);
      }
    }

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
        from: { id: state.userId, name: userName, role: "user" },
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
        activity.name === "liveAgent/emailVerified"
      ) {
        handleBotEmailVerified(activity.value?.email);
      } else if (
        activity.type === "event" &&
        activity.name === "conversation/emailIdentity"
      ) {
        handleConversationEmailIdentity(activity.value);
      } else if (
        activity.type === "event" &&
        activity.name === "liveAgent/outcome"
      ) {
        // This is an outbound-only protocol event.
      } else if (
        activity.type === "message" &&
        activity.from &&
        activity.from.role !== "user"
      ) {
        clearLiveOutcomeNotice();
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
        // Fallback only; the liveAgent/emailVerified event is the primary signal.
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
      if (state.isWaitingForResponse) hideLoading();
      showToast(
        "Connection to the assistant was lost. Please try sending your message again.",
      );
    } else if (status === 5) {
      if (state.isWaitingForResponse) hideLoading();
    }
  });
}

export function ensureWebChatInitialized() {
  if (webChatInitialized) return Promise.resolve();
  if (webChatInitPromise) return webChatInitPromise;

  webChatInitPromise = Promise.resolve()
    .then(async () => {
      if (webChatInitialized) return;
      if (!window.WebChat) {
        throw new Error("BotFramework WebChat is not loaded.");
      }

      if (state.directLine) {
        // Re-initialising after resetDirectLineConversation(): render into a fresh host
        // node so the previous WebChat React tree is detached rather than re-rendered.
        const freshHost = state.webchatDiv.cloneNode(false);
        state.webchatDiv.replaceWith(freshHost);
        state.webchatDiv = freshHost;
      }
      state.webchatDiv.innerHTML = "";
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
      state.directLine = window.WebChat.createDirectLine({
        token: tokenResponse.token,
      });
      // directLine = window.WebChat.createDirectLine({ domain: "http://localhost:56150/v3/directline",});
      state.store = createStore();
      window.WebChat.renderWebChat(
        { directLine: state.directLine, store: state.store, username: userName },
        state.webchatDiv,
      );
      bindConnectionStatus(state.directLine);
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
  const previous = state.directLine;
  webChatInitialized = false;
  webChatInitPromise = null;
  directLineConversationClaimed = false;
  state.store = null;
  try {
    previous?.end?.();
  } catch (error) {
    console.warn("Unable to end previous Direct Line conversation", error);
  }
}

// Resolves with directLine.conversationId. It is only populated once the connection
// reaches Online (connectionStatus$ === 2), so wait for that when it isn't set yet.
export function waitForDirectLineConversationId(timeoutMs = 20000) {
  const dl = state.directLine;
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
export function createCurrentConversation(preview, source = state.nextConversationSource) {
  const conversationId = state.directLine?.conversationId || "";
  const conv = {
    id: conversationId || `pending-${Date.now()}`,
    conversationId,
    title: preview.slice(0, 50),
    preview,
    timestamp: Date.now(),
    messages: [],
    pageUrl: window.location.href,
    userIp: state.userPublicIp || "",
    userId: state.userId,
    userGuid: currentUser.guid || "",
    email: state.currentUserEmail || "",
    source: normalizeConversationSource(source),
    feedback: {},
    liveAgent: { status: "none" },
  };
  state.nextConversationSource = FLOATING_WIDGET_SOURCE;

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
  state.currentConversation = conv;
  state.conversations.unshift(conv);
  return conv;
}

function handleNewMessage(activity) {
  if (activity.from.role !== "user") {
    if (!state.currentConversation || shouldIgnoreBotMessage(activity)) return;
  }

  if (activity.from.role === "user") {
    // This Direct Line conversation now carries user traffic; "New chat" must not reuse it.
    directLineConversationClaimed = true;
    const capturedEmail = extractEmailFromText(activity.text);
    if (capturedEmail) {
      // A different email than the bot accepted must not inherit that acceptance;
      // it stays cleared until the bot confirms the new one.
      if (
        state.acceptedNewCustomerConversationId &&
        capturedEmail !== state.acceptedNewCustomerEmail
      ) {
        state.acceptedNewCustomerConversationId = "";
        state.acceptedNewCustomerEmail = "";
      }
      applyUserEmailIdentity(capturedEmail, {
        persist: true,
        reloadHistory: true,
      });
    }
  }

  if (!state.currentConversation) {
    createCurrentConversation(getActivityPreview(activity));
  }

  state.currentConversation.messages.push(activity);
  state.currentConversation.timestamp = Date.now();
  if (activity.from.role === "user") {
    state.currentConversation.email =
      state.currentUserEmail || state.currentConversation.email || "";
  } else if (!state.currentConversation.previewSet) {
    state.currentConversation.preview = getActivityPreview(activity);
    state.currentConversation.previewSet = true;
  }
  updateHeaderForCurrentView();

  if (
    state.currentConversation.messages.length === 1 &&
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
    state.lastUserMsgEl = body.querySelector(".cw-user-msg:last-of-type");
    clearRatingIdleTimer();
  } else {
    hideLoading();
    clearLiveOutcomeNotice();
    scheduleRatingIdle();
  }

  queueConversationSave(state.currentConversation, true);
  renderHistoryList(searchInput?.value || "");
}

export async function loadConversation(conv) {
  clearRatingIdleTimer();
  if (conv !== state.currentConversation) {
    clearLiveAgentEmailGate();
    state.pendingHandoffSummary = "";
  }
  if (state.liveSession) {
    if (
      getConversationKey(conv) ===
      getConversationKey(state.liveSession.conversation)
    ) {
      // Same conversation (possibly a reloaded copy): keep the live object and session.
      conv = state.liveSession.conversation;
    } else {
      endLiveAgentSession();
    }
  }
  hideLoading();
  state.currentConversation = conv;
  chatStarted = conv.messages.length > 0;
  clearMessages();
  updateHeaderForCurrentView();

  // Restore live agent session if this conversation has an active live chat
  const liveStatus = conv.liveAgent?.status;
  if ((liveStatus === "pending" || liveStatus === "assigned") && !state.liveSession) {
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
  if (state.liveSession && state.liveStatusEl) body.appendChild(state.liveStatusEl);

  beginReplayGuard();
  await ensureWebChatInitialized();

  setTimeout(() => {
    if (!state.store) return;
    conv.messages.forEach((activity) => {
      state.store.dispatch({
        type: "DIRECT_LINE/INCOMING_ACTIVITY",
        payload: {
          activity: { ...activity, channelData: { isReplay: true } },
        },
      });
    });
  }, 300);

  renderHistoryList(searchInput?.value || "");
}

export function startNewConversation() {
  clearRatingIdleTimer();
  clearLiveAgentEmailGate();
  state.pendingHandoffSummary = "";
  closeLiveAgent();
  hideLoading();
  // The one deliberate reset: the next message creates a new conversation (and a new
  // SharePoint item). It gets a fresh Direct Line conversation so its id is new too.
  state.currentConversation = null;
  state.nextConversationSource = FLOATING_WIDGET_SOURCE;
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

export async function restoreSession() {
  closeLiveAgent();
  await loadConversations();
  renderHistoryList();
  if (
    state.currentConversation ||
    chatStarted ||
    body.querySelector(".cw-user-msg, .cw-copilot-msg")
  ) {
    return;
  }
  // A refresh opens a new Direct Line connection, so open the new-chat UI too instead of
  // the last conversation. Only an active live-agent chat is still resumed.
  const lastLiveStatus = state.conversations[0]?.liveAgent?.status;
  if (lastLiveStatus === "pending" || lastLiveStatus === "assigned") {
    await loadConversation(state.conversations[0]);
  } else {
    updateHeaderForCurrentView();
    showEmptyState();
    void ensureWebChatInitialized();
  }
}

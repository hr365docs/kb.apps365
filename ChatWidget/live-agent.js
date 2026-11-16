// Live-agent chat: SignalR connection, escalation, agent messages, fallback form.
import { ENABLE_FALLBACK_FORM, LIVE_CONNECTED_STATUS_MS, LIVE_OUTCOME_NOTICE, LIVE_OUTCOME_NOTICE_DELAY_MS, LIVE_TYPING_IDLE_MS, RINGTONE_URL, SIGNALR_CDN_INTEGRITY, SIGNALR_CDN_URL, canUseRemotePersistence } from "./config.js";
import { state } from "./state.js";
import { body, endLiveBtn, input, searchInput } from "./dom.js";
import { applyUserEmailIdentity, extractEmailFromText, normalizeEmail, userName } from "./identity.js";
import { normalizeLiveAgent, queueConversationSave } from "./conversation-store.js";
import { decodeJwtExpiry, ensureCustomerSession, liveApiFetch } from "./customer-session.js";
import { scrollToBottom, showToast } from "./ui-utils.js";
import { appendUserMessage, hideEmptyState, hideLoading, renderActivity } from "./messages.js";
import { renderHistoryList } from "./shell.js";
import { createCurrentConversation, ensureWebChatInitialized, waitForDirectLineConversationId } from "./directline.js";
import { updateSendButton } from "./composer.js";
import { showRatingCard } from "./rating.js";
import { getActiveLiveAgentEmailGate, hasAcceptedNewCustomerEmailForLiveAgent, isEmailVerifiedForLiveAgent } from "./live-email-gate.js";

let agentRingtone = null;
function playAgentRingtone() {
  try {
    if (!agentRingtone) {
      agentRingtone = new Audio(RINGTONE_URL);
      agentRingtone.volume = 0.7;
    }
    agentRingtone.currentTime = 0;
    const playing = agentRingtone.play();
    if (playing?.catch) playing.catch(() => {});
  } catch {
    // Sound is optional; never block message handling.
  }
}
let signalRLoadPromise = null;
let liveOutcomeNoticeTimer = null;
let liveOutcomeNoticePending = false;

export function clearLiveOutcomeNotice() {
  liveOutcomeNoticePending = false;
  clearTimeout(liveOutcomeNoticeTimer);
  liveOutcomeNoticeTimer = null;
}

function sendLiveOutcome(status) {
  if (!state.store) return false;
  state.store.dispatch({
    type: "WEB_CHAT/SEND_EVENT",
    payload: { name: "liveAgent/outcome", value: { status } },
  });
  if (status === "no_agent_available" || status === "error") {
    clearLiveOutcomeNotice();
    liveOutcomeNoticePending = true;
    const noticeConversation = state.currentConversation;
    liveOutcomeNoticeTimer = setTimeout(() => {
      liveOutcomeNoticeTimer = null;
      if (!liveOutcomeNoticePending) return;
      liveOutcomeNoticePending = false;
      if (state.currentConversation === noticeConversation) {
        appendLiveNotice(LIVE_OUTCOME_NOTICE);
      }
    }, LIVE_OUTCOME_NOTICE_DELAY_MS);
  }
  return true;
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

function getLastSubstantiveUserMessageText(conv) {
  const confirmation = /^(?:yes|yeah|yep|ok|okay|sure|right|correct|confirmed|please do|go ahead)[.!\s]*$/i;
  const messages = conv?.messages || [];
  for (let i = messages.length - 1; i >= 0; i--) {
    const text =
      messages[i]?.from?.role === "user"
        ? String(messages[i].text || "").trim()
        : "";
    if (text && !confirmation.test(text)) return text;
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
  if (!state.liveStatusEl) {
    state.liveStatusEl = document.createElement("div");
    state.liveStatusEl.className = "cw-live-agent-card";
    state.liveStatusEl.setAttribute("role", "status");
    state.liveStatusEl.innerHTML = `
        <div class="cw-live-agent-card-header">
          <span class="cw-live-dot" aria-hidden="true"></span>
          <span class="cw-live-text"></span>
        </div>
      `;
  }
  state.liveStatusEl.querySelector(".cw-live-text").textContent = text;
  if (!state.liveStatusEl.isConnected) hideEmptyState();
  // Keep the status as the latest item in the thread.
  if (body.lastElementChild !== state.liveStatusEl) body.appendChild(state.liveStatusEl);
  setHeaderLiveIndicator(true);
  scrollToBottom();
}

// Removes only the in-thread card; the header indicator and End button stay for the session.
function hideLiveStatusCard() {
  state.liveStatusEl?.remove();
  state.liveStatusEl = null;
}

function removeLiveStatusUi() {
  hideLiveStatusCard();
  setHeaderLiveIndicator(false);
}

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

export function appendLiveNotice(text) {
  const note = document.createElement("div");
  note.className = "cw-live-notice";
  note.textContent = text;
  body.appendChild(note);
  scrollToBottom();
}

function isLiveSessionCurrent(session) {
  return state.liveSession === session && !session.ended;
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
  if (state.currentConversation === conv) renderActivity(activity);
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
  if (announce && !alreadyAssigned && state.currentConversation === conv) {
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

    recordAgentMessage(session, message);
    playAgentRingtone();
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
export function endLiveAgentSession({ notifyServer = true } = {}) {
  const session = state.liveSession;
  if (!session) return;

  session.ended = true;
  state.liveSession = null;
  state.liveAgentActive = false;
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
  sendLiveOutcome("ended");
  const conv = session.conversation;
  const hadAgent = conv.liveAgent?.status === "assigned"; // read before it flips to "closed"
  if (state.currentConversation === conv)
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
  form.elements.email.value = state.currentUserEmail || "";
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
      if (state.currentConversation === conv) {
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
    state.directLine?.conversationId || (await waitForDirectLineConversationId());
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

  state.liveAgentEmailGate = { conversationId, step: "email" };
  appendLiveNotice(
    "Before I connect you with a live agent, please enter your work email address.",
  );

  if (input) {
    input.placeholder = "Enter your email address...";
    input.focus();
  }

  updateSendButton();
}

// needsVerification comes from the bot's liveAgent/connectRequest. It is only
// passed for that event; resumes after emailVerified/emailAccepted omit it.
export async function startLiveAgentEscalation({ needsVerification } = {}) {
  if (state.currentConversation?.liveAgent?.status === "closed") {
    state.pendingHandoffSummary = "";
    sendLiveOutcome("session_closed");
    appendLiveNotice(
      "The live chat for this conversation has ended. Start a new conversation to talk to an agent again.",
    );
    return;
  }

  // Existing customers need OTP verification. A bot-accepted new-customer
  // email is sufficient for live-agent escalation without OTP.
  if (
    !state.liveSession &&
    !isEmailVerifiedForLiveAgent() &&
    (needsVerification === true || !hasAcceptedNewCustomerEmailForLiveAgent())
  ) {
    await requestLiveAgentEmail();
    return;
  }
  if (state.liveSession) {
    state.liveStatusEl?.scrollIntoView({ block: "nearest" });
    return;
  }
  const existingForm = body.querySelector(".cw-live-fallback");
  if (existingForm) {
    existingForm.scrollIntoView({ block: "nearest" });
    return;
  }
  try {
    await ensureWebChatInitialized();
  } catch {
    showToast("Chat is still loading. Please try again.");
    return;
  }

  const conv =
    state.currentConversation || createCurrentConversation("Live agent request");
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
  state.liveSession = session;
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
    if (canUseRemotePersistence && !conv.spId) {
      queueConversationSave(conv, true);
      await state.conversationSaveQueue;
    }
    session.token = await ensureCustomerSession(conversationId);
    if (session.ended) return;

    const lastMessage =
      state.pendingHandoffSummary || getLastSubstantiveUserMessageText(conv);
    state.pendingHandoffSummary = "";
    const result = await liveApiFetch("/api/escalation/escalate", {
      method: "POST",
      // Identity travels with the escalation too: bind may have run before the
      // email was known, and the agent should see the email, not "Guest User".
      body: {
        lastMessage,
        displayName: userName || null,
        email: state.currentUserEmail || null,
        isAnonymous: !state.currentUserEmail,
      },
      token: session.token,
    });

    if (result?.status === "no_agent_available") {
      sendLiveOutcome("no_agent_available");
      const wasEnded = session.ended;
      if (state.liveSession === session) state.liveSession = null;
      session.ended = true;
      removeLiveStatusUi();
      if (ENABLE_FALLBACK_FORM && !wasEnded && state.currentConversation === conv) {
        showFallbackForm(conv, session.token, lastMessage);
      }
      return;
    }

    if (result?.status === "session_closed") {
      sendLiveOutcome("session_closed");
      if (state.liveSession === session) state.liveSession = null;
      session.ended = true;
      removeLiveStatusUi();
      setLiveAgentStatus(conv, "closed");
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

    state.liveAgentActive = true;
    hideLoading();
    // syncLiveConversation (or an AgentJoined that already fired) may have shown
    // "Connected to …"; don't overwrite it with "waiting".
    if (session.conversation.liveAgent?.status !== "assigned") {
      setLiveStatus(session, "Waiting for an agent to join…");
    }
    await syncLiveConversation(session);
  } catch (error) {
    console.error("Live agent escalation failed", error);
    if (state.liveSession !== session) return;

    state.pendingHandoffSummary = "";
    sendLiveOutcome(error.status === 409 ? "session_closed" : "error");

    if (session.escalated) {
      endLiveAgentSession();
    } else {
      state.liveSession = null;
      session.ended = true;
      removeLiveStatusUi();
    }
    if (error.status === 409) {
      appendLiveNotice(
        "The live chat for this conversation has ended. Start a new conversation to talk to an agent again.",
      );
    }
  }
}

// Restore an existing live agent session (on page refresh or conversation switch)
// without re-escalating. Used when conversation has liveAgent status "pending" or "assigned".
export async function restoreLiveAgentSession(conv) {
  if (state.liveSession) return; // Already have an active session

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

  state.liveSession = session;
  setLiveStatus(session, "Restoring live chat connection…");

  try {
    await connectLiveAgent(session);
    if (!isLiveSessionCurrent(session)) return;

    state.liveAgentActive = true;
    hideLoading();
    // syncLiveConversation will update status to "Connected to ..." or "Waiting..."
    await syncLiveConversation(session);
  } catch (error) {
    console.error("Failed to restore live agent session", error);
    if (state.liveSession !== session) return;

    state.liveSession = null;
    session.ended = true;
    removeLiveStatusUi();
    appendLiveNotice(
      "Could not restore live chat connection. Please try again.",
    );
  }
}

// Composer path while a live session is active. Mirrors the Direct Line path's local
// rendering, persistence and email capture, but delivers the text to the agent.
export async function handleLiveAgentSend() {
  const session = state.liveSession;
  if (!session || !input) return;

  if (state.pendingFiles.length) {
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
    from: { id: state.userId, name: userName, role: "user" },
    timestamp: new Date().toISOString(),
  };

  conv.messages.push(activity);
  conv.timestamp = Date.now();
  conv.email = state.currentUserEmail || conv.email || "";
  state.renderedMessageIds.add(activity.id);
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

export function closeLiveAgent() {
  if (state.liveSession) endLiveAgentSession();
  removeLiveStatusUi();
}
// The user clicked "End live chat" in the header.
export function endLiveChatByUser() {
  const conv = state.liveSession?.conversation;
  const hadAgent = conv?.liveAgent?.status === "assigned";
  state.pendingHandoffSummary = "";
  if (state.liveSession) sendLiveOutcome("ended");
  closeLiveAgent();
  if (conv && hadAgent) showRatingCard(conv, "live-ended");
}

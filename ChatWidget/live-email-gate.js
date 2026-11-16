// Email verification gate before a live-agent request (bot-owned OTP flow).
import { state } from "./state.js";
import { input } from "./dom.js";
import { applyUserEmailIdentity, normalizeEmail, setStoredUserEmail } from "./identity.js";
import { queueConversationSave } from "./conversation-store.js";
import { startLiveAgentEscalation } from "./live-agent.js";

let verifiedBotConversationId = "";
const defaultInputPlaceholder = input?.placeholder || "Ask anything";

export function isEmailVerifiedForLiveAgent() {
  if (!state.currentUserEmail) return false;
  const dlId = state.directLine?.conversationId;
  return !!dlId && dlId === verifiedBotConversationId;
}

export function hasAcceptedNewCustomerEmailForLiveAgent() {
  const dlId = state.directLine?.conversationId;
  return !!dlId && dlId === state.acceptedNewCustomerConversationId && !!state.currentUserEmail;
}

function applyBotEmailIdentity(email, { verified, knownCustomer } = {}) {
  const normalized = normalizeEmail(email);
  const dlId = state.directLine?.conversationId;
  if (!normalized || !dlId) return;

  // Persist the candidate email for recent-conversation lookup, independently
  // of whether the bot verified it with OTP.
  applyUserEmailIdentity(normalized, { persist: true, reloadHistory: true });
  setStoredUserEmail(normalized);
  if (state.currentConversation) {
    state.currentConversation.email = normalized;
    queueConversationSave(state.currentConversation, true);
  }

  if (verified === true && knownCustomer === true) {
    verifiedBotConversationId = dlId;
    state.acceptedNewCustomerConversationId = "";
    state.acceptedNewCustomerEmail = "";
  } else if (verified === false && knownCustomer === false) {
    state.acceptedNewCustomerConversationId = dlId;
    state.acceptedNewCustomerEmail = normalized;
    verifiedBotConversationId = "";
  }
}

export function handleConversationEmailIdentity(value) {
  if (!value || typeof value !== "object") return;
  applyBotEmailIdentity(value.email, {
    verified: value.verified === true,
    knownCustomer: value.knownCustomer === true,
  });
}

export function getActiveLiveAgentEmailGate() {
  const dlId = state.directLine?.conversationId;
  if (!state.liveAgentEmailGate || !dlId) return null;
  return state.liveAgentEmailGate.conversationId === dlId ? state.liveAgentEmailGate : null;
}

export function clearLiveAgentEmailGate() {
  state.liveAgentEmailGate = null;
  if (input) input.placeholder = defaultInputPlaceholder;
}

// The bot replies "Welcome back!" or "Welcome back, <name>!" once the OTP is verified.
export function isBotEmailVerifiedReply(text) {
  return /^welcome back(?:,[^!\n]{1,100})?!?$/i.test(String(text || "").trim());
}

// Runs when the bot clears the email for live chat: OTP verified ("Welcome back!",
// including the bot's own 5-message gate) or a new, unregistered email accepted
// ("liveAgent/emailAccepted" event, which carries the email). A later
// "Talk to a live agent" in the same conversation doesn't ask again.
export function handleBotEmailAccepted(email) {
  const dlId = state.directLine?.conversationId;
  if (email) {
    applyBotEmailIdentity(email, { verified: false, knownCustomer: false });
  }
  if (!dlId || !state.currentUserEmail) return;

  if (!getActiveLiveAgentEmailGate()) return;
  clearLiveAgentEmailGate();
  void startLiveAgentEscalation();
}

export function handleBotEmailVerified(email) {
  const dlId = state.directLine?.conversationId;
  if (!dlId) return;
  // Idempotent: the event and the "Welcome back" text can both arrive.
  const alreadyVerified = verifiedBotConversationId === dlId;
  if (email && !alreadyVerified) {
    applyBotEmailIdentity(email, { verified: true, knownCustomer: true });
  }
  if (!state.currentUserEmail) return;
  verifiedBotConversationId = dlId;
  state.acceptedNewCustomerConversationId = "";
  state.acceptedNewCustomerEmail = "";

  if (!getActiveLiveAgentEmailGate()) return;
  clearLiveAgentEmailGate();
  void startLiveAgentEscalation();
}

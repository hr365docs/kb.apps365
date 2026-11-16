// Mutable widget state that more than one module reads or writes. Other modules access it as state.<name>.
// State used by a single module lives in that module instead.
import { FLOATING_WIDGET_SOURCE } from "./conversation-persistence.mjs";
import { DEFAULT_ASSISTANT_DISPLAY_NAME } from "./branding.mjs";

export const state = {
  userId: "",
  currentUserEmail: "",
  webchatDiv: document.getElementById("webchat"),
  conversations: [],
  currentConversation: null,
  nextConversationSource: FLOATING_WIDGET_SOURCE,
  directLine: undefined,
  store: undefined,
  assistantDisplayName: DEFAULT_ASSISTANT_DISPLAY_NAME,
  customerSessionToken: null,
  customerSessionConversationId: "",
  liveAgentActive: false,
  liveSession: null,
  renderedMessageIds: new Set(),
  conversationLoadPromise: null,
  conversationSaveQueue: Promise.resolve(),
  isOpen: false,
  userPublicIp: "",
  isExpanded: false,
  isSidebarOpen: false,
  isDragging: false,
  pendingFiles: [],
  lastUserMsgEl: null,
  isReplayingHistory: false,
  isWaitingForResponse: false,
  pendingHandoffSummary: "",
  /* ================= Live agent (Node API + Azure SignalR) ================= */
  liveStatusEl: null,
  // Email verification before a live-agent request. The bot owns the check (known

  liveAgentEmailGate: null, // { conversationId, step }
  acceptedNewCustomerConversationId: "",
  acceptedNewCustomerEmail: "",
};

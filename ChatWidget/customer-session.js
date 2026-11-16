// Customer session JWT for the live-chat API (/api/chat/session, /bind) and the shared liveApiFetch helper.
import { API_BASE_URL, LIVE_SESSION_STORAGE_PREFIX } from "./config.js";
import { state } from "./state.js";
import { userName } from "./identity.js";
import { onCustomerSessionReady } from "./branding-ui.js";

let customerSessionPromise = null;

export function decodeJwtExpiry(token) {
  try {
    const payload = JSON.parse(
      atob(token.split(".")[1].replace(/-/g, "+").replace(/_/g, "/")),
    );
    return typeof payload.exp === "number" ? payload.exp * 1000 : 0;
  } catch {
    return 0;
  }
}

export async function liveApiFetch(
  path,
  {
    method = "GET",
    body: payload,
    token = state.customerSessionToken,
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

export function resetCustomerSession() {
  state.customerSessionToken = null;
  state.customerSessionConversationId = "";
  customerSessionPromise = null;
}

// POST /api/chat/session never refuses: every call mints a new sessionId. But the first
// sessionId to bind/escalate is stored on the conversation's HR365CAChats item, and any
// other session then gets 403 on escalate/message/end. So the token must survive a page
// reload; sessionStorage keeps it for the life of the tab only.
export function readStoredCustomerSession(conversationId) {
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
export function ensureCustomerSession(conversationId) {
  if (!conversationId)
    return Promise.reject(new Error("conversationId is not available yet"));
  if (
    state.customerSessionToken &&
    state.customerSessionConversationId === conversationId
  ) {
    return Promise.resolve(state.customerSessionToken);
  }
  if (
    customerSessionPromise &&
    customerSessionPromise.conversationId === conversationId
  ) {
    return customerSessionPromise;
  }

  const storedToken = readStoredCustomerSession(conversationId);
  if (storedToken) {
    state.customerSessionToken = storedToken;
    state.customerSessionConversationId = conversationId;
    onCustomerSessionReady();
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
      state.customerSessionToken = data.token;
      state.customerSessionConversationId = conversationId;
      storeCustomerSession(conversationId, data.token);
      onCustomerSessionReady();
      if (state.currentUserEmail || userName) await bindCustomerSession();
      return state.customerSessionToken;
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
export async function bindCustomerSession() {
  if (!state.customerSessionToken) return;
  try {
    await liveApiFetch("/api/chat/bind", {
      method: "POST",
      body: {
        displayName: userName || null,
        email: state.currentUserEmail || null,
      },
    });
  } catch (error) {
    console.warn("Unable to bind live chat session", error);
  }
}

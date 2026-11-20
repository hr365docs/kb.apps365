// Current user identity (email/name) and the email-capture identity switch.
import { USER_EMAIL_STORAGE_KEY, defaultUserId, defaultUserName } from "./config.js";
import { state } from "./state.js";
import { searchInput } from "./dom.js";
import { loadConversations } from "./conversation-store.js";
import { bindCustomerSession } from "./customer-session.js";
import { renderHistoryList } from "./shell.js";
import { decodeBase64WithKey, encodeBase64WithKey } from "./utilities/encdec.js";

export function normalizeEmail(value) {
  return String(value || "")
    .trim()
    .toLowerCase();
}

function getStoredUserEmail() {
  try {
    const localEmailVal=localStorage.getItem(USER_EMAIL_STORAGE_KEY);
    return normalizeEmail(decodeBase64WithKey(localEmailVal));
  } catch {
    return "";
  }
}

export function setStoredUserEmail(email) {
  const normalized = normalizeEmail(email);
  try {
    if (normalized) {
      localStorage.setItem(USER_EMAIL_STORAGE_KEY, encodeBase64WithKey(normalized));
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

export const currentUser = getCurrentUserProfile();
state.userId = currentUser.id;
state.currentUserEmail = currentUser.email;
export const userName = currentUser.name;

export function extractEmailFromText(text) {
  const match = String(text || "").match(
    /\b[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}\b/i,
  );
  return match ? normalizeEmail(match[0]) : "";
}

export function applyUserEmailIdentity(
  email,
  { persist = true, reloadHistory = true } = {},
) {
  const normalized = normalizeEmail(email);
  if (!normalized || normalized === normalizeEmail(state.currentUserEmail))
    return false;

  state.currentUserEmail = normalized;
  state.userId = normalized;

  if (persist) {
    setStoredUserEmail(normalized);
  }

  // Identity reaches the live-chat server as soon as it's known, but only if a
  // customer session already exists (bot-only chats never create one).
  if (state.customerSessionToken) {
    void bindCustomerSession();
  }

  state.conversationLoadPromise = null;
  if (reloadHistory) {
    Promise.resolve().then(() => {
      void state.conversationSaveQueue
        .then(() => loadConversations(true))
        .then(() => {
          renderHistoryList(searchInput?.value || "");
        });
    });
  }

  return true;
}

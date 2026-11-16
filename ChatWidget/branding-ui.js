// Assistant branding (name/logo) loaded through the Node API and applied to the widget DOM.
import { BRANDING_NO_SESSION, createBrandingController } from "./branding.mjs";
import { API_BASE_URL, BRANDING_REFRESH_COOLDOWN_MS, DEFAULT_BRAND_LOGO_URL, canUseRemotePersistence } from "./config.js";
import { state } from "./state.js";
import { body, sidebarBrandTitle } from "./dom.js";
import { userName } from "./identity.js";
import { getHistoryConversationId } from "./conversation-store.js";
import { decodeJwtExpiry, readStoredCustomerSession } from "./customer-session.js";
import { updateHeaderForCurrentView } from "./shell.js";

let currentBrandLogoUrl = DEFAULT_BRAND_LOGO_URL;

// Branding settings/logo are read through the Node API from HR365CASettings.
let brandingWaitingForSession = false;

function getExistingCustomerSessionToken() {
  const valid = (token) =>
    Boolean(token) && decodeJwtExpiry(token) > Date.now() + 60_000;
  if (valid(state.customerSessionToken)) return state.customerSessionToken;
  const conversationId = getHistoryConversationId();
  return conversationId ? readStoredCustomerSession(conversationId) : "";
}

async function brandingApiRequest(path, options = {}) {
  if (!canUseRemotePersistence) {
    throw new Error("Remote branding is disabled in local development");
  }
  const token = getExistingCustomerSessionToken();
  if (!token) {
    brandingWaitingForSession = true;
    const error = new Error("No customer session yet");
    error.code = BRANDING_NO_SESSION;
    throw error;
  }
  const headers = new Headers(options.headers || {});
  headers.set("Authorization", `Bearer ${token}`);
  if (!headers.has("Accept")) headers.set("Accept", "application/json");
  return fetch(`${API_BASE_URL}${path}`, {
    ...options,
    method: (options.method || "GET").toUpperCase(),
    headers,
  });
}

export function onCustomerSessionReady() {
  if (!brandingWaitingForSession) return;
  brandingWaitingForSession = false;
  void refreshBranding({ force: true });
}

export function updateEmptyStateGreeting() {
  const greeting = body.querySelector(".cw-empty-greeting");
  if (greeting) {
    const greetingName = userName ? `Hi ${userName},` : "Hi,";
    greeting.textContent =
      `${greetingName} I'm your ${state.assistantDisplayName}. ` +
      "I'm here to answer using the official Apps365 KB.";
  }
}

export function syncBrandLogos(root = document) {
  root.querySelectorAll("[data-brand-logo]").forEach((image) => {
    image.onerror = () => {
      if (
        image.getAttribute("src") !== currentBrandLogoUrl ||
        currentBrandLogoUrl === DEFAULT_BRAND_LOGO_URL
      ) {
        return;
      }
      applyBrandLogo(DEFAULT_BRAND_LOGO_URL);
    };
    image.src = currentBrandLogoUrl;
  });
}

function applyBrandLogo(source) {
  currentBrandLogoUrl = source || DEFAULT_BRAND_LOGO_URL;
  syncBrandLogos();
}

function applyBranding({ assistantName, logoUrl }) {
  if (assistantName) {
    state.assistantDisplayName = assistantName;
    if (sidebarBrandTitle) sidebarBrandTitle.textContent = assistantName;
    updateHeaderForCurrentView();
    updateEmptyStateGreeting();
    body
      .querySelector("#cw-loading")
      ?.setAttribute("aria-label", `${assistantName} is typing`);
  }
  if (logoUrl) applyBrandLogo(logoUrl);
}

// Never blocks init or chat: failures are logged and default branding stays.
export const branding = createBrandingController({
  apiRequest: brandingApiRequest,
  defaultLogoUrl: DEFAULT_BRAND_LOGO_URL,
  onApply: applyBranding,
  cooldownMs: BRANDING_REFRESH_COOLDOWN_MS,
});
export const refreshBranding = (options) => branding.refresh(options);

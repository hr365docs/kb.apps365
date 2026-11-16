// Constants and environment switches shared by every widget module. No behavior, no imports.

export const tenantId = "apps365";
// This file is an ES module, so document.currentScript is null; resolve assets next to
// the module itself (same URL as before on the root page, correct on any host page).
export const RINGTONE_URL = new URL("chatRecieved.mp3", import.meta.url).href;
export const defaultUserId = "";
export const defaultUserName = "";
export const MAX_FILE_SIZE = 4 * 1024 * 1024; // Direct Line channel limit
// Live chat API (node.js) deployed on Azure App Service.
export const API_BASE_URL =
  "https://knowledgebaseagentr-azhkdfendtachngp.westus3-01.azurewebsites.net";
export const BRANDING_REFRESH_COOLDOWN_MS = 15_000;
export const DEFAULT_BRAND_LOGO_URL =
  "https://ik.imagekit.io/zn4au2jftpm5/CLAILogo.svg";
export const ENABLE_FALLBACK_FORM = false;
export const LIVE_OUTCOME_NOTICE_DELAY_MS = 8000;
export const LIVE_OUTCOME_NOTICE =
  "No agents are available right now. Please try again in a little while.";

// sessionStorage key prefix for the customer session token (per conversationId).
export const LIVE_SESSION_STORAGE_PREFIX = "cw-live-session:";
export const SIGNALR_CDN_URL =
  "https://cdnjs.cloudflare.com/ajax/libs/microsoft-signalr/8.0.7/signalr.min.js";
export const SIGNALR_CDN_INTEGRITY =
  "sha384-mU1xC5yC2LldSW74Rj1Ax8wPiLw/28V5eh51uKJMlBbRVsOtUYd4xyzNsgIAJARB";
// The Node API is used on localhost exactly like production. ?forceSp=0 keeps a page
// local-only (localStorage); file: pages have no usable origin for CORS, so they stay
// local-only unless ?forceSp=1 is given.
const forceSpParam = new URLSearchParams(location.search).get("forceSp");
export const canUseRemotePersistence =
  forceSpParam === "0"
    ? false
    : forceSpParam === "1" || location.protocol !== "file:";
export const USER_EMAIL_STORAGE_KEY = "kb_user_email";
export const LOCAL_CONVERSATION_STORAGE_PREFIX = "cw-conversations-v1";
export const BOT_RESPONSE_TIMEOUT_MS = 30000;
export const RATING_IDLE_MS = 4 * 60 * 1000;
export const VERIFYING_INPUT_PLACEHOLDER =
  "Enter the 6-digit code, 'resend', or a different email";

export const LIVE_CONNECTED_STATUS_MS = 3000;
export const LIVE_TYPING_IDLE_MS = 3000;

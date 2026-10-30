// Branding saved by the SharePoint webpart (HR365CASettings.AllSettings) applied to the chat widget.
// Pure helpers plus a controller that takes its SharePoint access by injection so it can be tested.

export const DEFAULT_ASSISTANT_DISPLAY_NAME = "APPs 365 AI Assistant";
export const BRANDING_SETTINGS_LIST_TITLE = "HR365CASettings";

const LEGACY_DEFAULT_NAME = /^apps\s*365$/i;
const DATA_IMAGE_URL =
  /^data:image\/(?:avif|bmp|gif|jpe?g|png|svg\+xml|webp)(?:;[^,]*)?,/i;

export function formatAssistantDisplayName(value) {
  const name = String(value ?? "").trim();
  if (!name || LEGACY_DEFAULT_NAME.test(name)) {
    return DEFAULT_ASSISTANT_DISPLAY_NAME;
  }
  return /AI Assistant$/i.test(name) ? name : `${name} AI Assistant`;
}

// AllSettings is JSON stored in a Note field; anything unusable yields {}.
export function parseAllSettings(raw) {
  if (raw && typeof raw === "object" && !Array.isArray(raw)) return raw;
  if (typeof raw !== "string" || !raw.trim()) return {};
  try {
    const parsed = JSON.parse(raw);
    return parsed && typeof parsed === "object" && !Array.isArray(parsed)
      ? parsed
      : {};
  } catch {
    return {};
  }
}

// Returns { dataUrl } for legacy data:image values, { serverRelativePath } for a logo that
// belongs to the configured site, or null for anything else.
export function resolveBrandLogoUrl(value, siteUrl) {
  const rawUrl = String(value ?? "").trim();
  if (!rawUrl) return null;
  if (DATA_IMAGE_URL.test(rawUrl)) return { dataUrl: rawUrl };
  if (rawUrl.startsWith("//") || rawUrl.includes("\\")) return null;

  let site;
  let logoUrl;
  try {
    site = new URL(siteUrl);
    logoUrl = rawUrl.startsWith("/") ? new URL(rawUrl, site) : new URL(rawUrl);
  } catch {
    return null;
  }
  if (
    logoUrl.protocol !== "https:" ||
    logoUrl.username ||
    logoUrl.password ||
    logoUrl.origin !== site.origin
  ) {
    return null;
  }

  const sitePath = `${site.pathname.replace(/\/+$/, "")}/`;
  if (!logoUrl.pathname.startsWith(sitePath)) return null;
  let decodedPath;
  try {
    decodedPath = decodeURIComponent(logoUrl.pathname);
  } catch {
    return null;
  }
  if (decodedPath.split("/").includes("..")) return null;
  return { serverRelativePath: decodedPath };
}

function serverRelativeFileRequestPath(serverRelativePath) {
  const escaped = serverRelativePath.replace(/'/g, "''");
  return `/_api/web/GetFileByServerRelativeUrl('${encodeURI(escaped)}')/$value`;
}

export function createBrandingController({
  spRequest,
  siteUrl,
  defaultLogoUrl,
  onApply,
  createObjectURL = (blob) => URL.createObjectURL(blob),
  revokeObjectURL = (url) => URL.revokeObjectURL(url),
  log = console,
  now = () => Date.now(),
  cooldownMs = 15_000,
}) {
  let inFlight = null;
  let lastAttemptAt = 0;
  let objectUrl = "";
  let destroyed = false;

  function releaseObjectUrl(keep = "") {
    if (objectUrl && objectUrl !== keep) revokeObjectURL(objectUrl);
    objectUrl = keep;
  }

  async function readSettings() {
    const path =
      `/_api/web/lists/getbytitle('${BRANDING_SETTINGS_LIST_TITLE}')/items` +
      "?$select=Id,AllSettings&$orderby=Id%20asc&$top=1";
    const response = await spRequest(path, { method: "GET" });
    if (response.status === 401 || response.status === 403) {
      log.warn(
        `[branding] Access denied reading ${BRANDING_SETTINGS_LIST_TITLE} (${response.status}); ` +
          "keeping existing branding. Check that the widget token can read the settings list.",
      );
      return null;
    }
    if (!response.ok) {
      throw new Error(`Settings request failed (${response.status})`);
    }
    const data = await response.json();
    const items = Array.isArray(data?.value)
      ? data.value
      : Array.isArray(data?.d?.results)
        ? data.d.results
        : [];
    return { item: items[0] || null };
  }

  async function fetchLogoBlob(serverRelativePath) {
    const response = await spRequest(
      serverRelativeFileRequestPath(serverRelativePath),
      { method: "GET", headers: { Accept: "image/*" } },
    );
    if (!response.ok) {
      throw new Error(`Logo request failed (${response.status})`);
    }
    const contentType = String(response.headers?.get("content-type") || "")
      .split(";")[0]
      .trim()
      .toLowerCase();
    if (!contentType.startsWith("image/")) {
      throw new Error("Logo response was not an image");
    }
    const blob = await response.blob();
    return blob.type === contentType
      ? blob
      : new Blob([blob], { type: contentType });
  }

  async function run() {
    const settings = await readSettings();
    if (!settings || destroyed) return;

    const parsed = settings.item ? parseAllSettings(settings.item.AllSettings) : {};
    const assistantName = formatAssistantDisplayName(parsed.AssistantName);
    const logo = resolveBrandLogoUrl(parsed.BrandLogoUrl, siteUrl);
    const rawLogo = String(parsed.BrandLogoUrl ?? "").trim();

    let logoUrl = null; // null = leave the current logo untouched
    let nextObjectUrl = "";
    if (!rawLogo) {
      logoUrl = defaultLogoUrl;
    } else if (logo?.dataUrl) {
      logoUrl = logo.dataUrl;
    } else if (logo?.serverRelativePath) {
      try {
        nextObjectUrl = createObjectURL(
          await fetchLogoBlob(logo.serverRelativePath),
        );
        logoUrl = nextObjectUrl;
      } catch (error) {
        log.warn("[branding] Unable to load the configured logo", error);
      }
    } else {
      log.warn("[branding] Ignoring unsafe BrandLogoUrl");
    }

    if (destroyed) {
      if (nextObjectUrl) revokeObjectURL(nextObjectUrl);
      return;
    }

    onApply({ assistantName, logoUrl });
    if (logoUrl !== null) releaseObjectUrl(nextObjectUrl);
  }

  function refresh({ force = false } = {}) {
    if (inFlight) return inFlight;
    if (destroyed) return Promise.resolve();
    if (!force && now() - lastAttemptAt < cooldownMs) return Promise.resolve();

    lastAttemptAt = now();
    inFlight = run()
      .catch((error) => {
        log.warn("[branding] Unable to load assistant branding", error);
      })
      .finally(() => {
        inFlight = null;
      });
    return inFlight;
  }

  // Revokes the live object URL. Pass revive to allow refreshing again (bfcache restore).
  function cleanup({ revive = false } = {}) {
    const hadObjectUrl = Boolean(objectUrl);
    releaseObjectUrl("");
    if (hadObjectUrl) onApply({ assistantName: null, logoUrl: defaultLogoUrl });
    destroyed = !revive;
  }

  return { refresh, cleanup, getObjectUrl: () => objectUrl };
}

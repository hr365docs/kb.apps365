// UI helpers: formatting, markdown, scrolling, toast, attachment cards.
import { state } from "./state.js";
import { body, bodyScroll, widget } from "./dom.js";

export function formatDate(ts) {
  const d = new Date(ts);
  const now = new Date();
  const sameDay =
    d.getDate() === now.getDate() &&
    d.getMonth() === now.getMonth() &&
    d.getFullYear() === now.getFullYear();
  if (sameDay) return "Today";
  const yesterday = new Date(now);
  yesterday.setDate(now.getDate() - 1);
  if (
    d.getDate() === yesterday.getDate() &&
    d.getMonth() === yesterday.getMonth() &&
    d.getFullYear() === yesterday.getFullYear()
  ) {
    return `Yesterday, ${d.toLocaleTimeString([], { hour: "numeric", minute: "2-digit" })}`;
  }
  const dateOptions = { month: "short", day: "numeric" };
  if (d.getFullYear() !== now.getFullYear()) dateOptions.year = "numeric";
  return `${d.toLocaleDateString(undefined, dateOptions)}, ${d.toLocaleTimeString([], { hour: "numeric", minute: "2-digit" })}`;
}

export function escapeHtml(str) {
  const div = document.createElement("div");
  div.textContent = str;
  return div.innerHTML;
}

export function renderMarkdown(text) {
  if (!text) return "";
  if (window.marked) {
    const renderer = new marked.Renderer();
    renderer.link = function (tokenOrHref, legacyTitle, legacyText) {
      const token =
        tokenOrHref && typeof tokenOrHref === "object" ? tokenOrHref : null;
      const href = token ? token.href : tokenOrHref;
      const title = token ? token.title : legacyTitle;
      const linkText = token
        ? token.text ?? this.parser.parseInline(token.tokens || [])
        : legacyText;
      let safeHref = "#";
      try {
        const parsedHref = new URL(href || "", window.location.href);
        if (["http:", "https:", "mailto:", "tel:"].includes(parsedHref.protocol)) {
          safeHref = escapeHtml(href || "");
        }
      } catch {
        // Keep malformed or unsafe destinations inert.
      }
      const safeTitle = title ? ` title="${escapeHtml(title)}"` : "";
      return `<a href="${safeHref}"${safeTitle} target="_blank" rel="noopener">${linkText}</a>`;
    };
    return marked.parse(text, { renderer });
  }
  return escapeHtml(text)
    .replace(/\*\*(.+?)\*\*/g, "<strong>$1</strong>")
    .replace(/\n/g, "<br>");
}

export function scrollToBottom() {
  if (!bodyScroll) return;
  requestAnimationFrame(() => {
    bodyScroll.scrollTop = bodyScroll.scrollHeight;
  });
}
export function scrollToMessageStart(msgEl) {
  if (!bodyScroll || !msgEl) return;
  requestAnimationFrame(() => {
    const containerTop = bodyScroll.getBoundingClientRect().top;
    const msgTop = msgEl.getBoundingClientRect().top;
    const offset = msgTop - containerTop;
    bodyScroll.scrollTop += offset - 10;
  });
}

export function clearMessages() {
  body.innerHTML = "";
  state.renderedMessageIds.clear();
}

export function showToast(message) {
  const existing = widget.querySelector(".cw-toast");
  existing?.remove();

  const toast = document.createElement("div");
  toast.className = "cw-toast";
  toast.textContent = message;
  widget.appendChild(toast);

  requestAnimationFrame(() => toast.classList.add("is-visible"));
  setTimeout(() => {
    toast.classList.remove("is-visible");
    setTimeout(() => toast.remove(), 250);
  }, 3200);
}

export function formatFileSize(bytes) {
  if (bytes < 1024) return `${bytes} B`;
  if (bytes < 1024 * 1024) return `${(bytes / 1024).toFixed(1)} KB`;
  return `${(bytes / (1024 * 1024)).toFixed(1)} MB`;
}

function isImageAttachment(att) {
  return (att.contentType || "").startsWith("image/");
}

export function renderChatAttachmentCard(att) {
  const name = att.name || "Attachment";
  const url = att.contentUrl || att.thumbnailUrl || "";
  const ext = getFileExtension(name);

  if (isImageAttachment(att) && url) {
    return `
        <div class="cw-user-attach-card">
          <img src="${escapeHtml(url)}" alt="${escapeHtml(name)}" loading="lazy" />
        </div>
      `;
  }

  return `
      <div class="cw-user-attach-card cw-user-attach-card--file">
        <span class="cw-user-attach-ext">${escapeHtml(ext)}</span>
        <span class="cw-user-attach-filename">${escapeHtml(name)}</span>
      </div>
    `;
}

export function getFileExtension(name) {
  const parts = (name || "").split(".");
  return parts.length > 1 ? parts.pop().toUpperCase() : "FILE";
}

export function fluentIconHtml(name) {
  return `<span class="cw-fluent-icon cw-icon-${name}" aria-hidden="true"></span>`;
}

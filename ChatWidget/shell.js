// Widget shell: open/close/expand, sidebar, history list, header, dragging.
import { state } from "./state.js";
import { expandBtn, fab, headerSubtitle, headerTitle, historyList, input, sidebarToggleBtn, widget } from "./dom.js";
import { getConversationKey } from "./conversation-store.js";
import { escapeHtml, formatDate } from "./ui-utils.js";
import { ensureWebChatInitialized, loadConversation, restoreSession } from "./directline.js";
import { autoResizeInput } from "./composer.js";

let sessionRestored = false;
let isSidebarCollapsed = false;
let dragOffsetX = 0;
let dragOffsetY = 0;

function updateHeaderTitle(title, subtitle = "") {
  if (headerTitle) headerTitle.textContent = title;
  if (headerSubtitle) headerSubtitle.textContent = subtitle;
}

export function updateHeaderForCurrentView() {
  if (!state.isExpanded && state.isSidebarOpen) {
    updateHeaderTitle("Support", "Your recent conversations");
    return;
  }
  updateHeaderTitle(state.assistantDisplayName);
}

export function renderHistoryList(filterText = "") {
  if (!historyList) return;
  historyList.innerHTML = "";

  const filtered = state.conversations.filter((conv) => {
    if (!filterText) return true;
    const hay = `${conv.title} ${conv.preview}`.toLowerCase();
    return hay.includes(filterText.toLowerCase());
  });

  if (!filtered.length) {
    const empty = document.createElement("li");
    empty.className = "cw-history-empty";
    empty.textContent = filterText
      ? "No chats found"
      : "No conversations yet";
    historyList.appendChild(empty);
    return;
  }

  filtered.forEach((conv) => {
    const li = document.createElement("li");
    li.className = "cw-history-item";
    if (
      state.currentConversation &&
      getConversationKey(conv) === getConversationKey(state.currentConversation)
    ) {
      li.classList.add("active");
    }

    li.innerHTML = `
        <div class="cw-history-title">${escapeHtml(conv.title || "New chat")}</div>
        <div class="cw-history-meta">
          <span class="cw-history-preview">${escapeHtml(conv.preview || "")}</span>
          <span class="cw-history-date">${formatDate(conv.timestamp)}</span>
        </div>
      `;

    li.addEventListener("click", () => {
      loadConversation(conv);
      if (!state.isExpanded) closeSidebar();
    });

    historyList.appendChild(li);
  });
}

export function updateSidebarToggleState() {                     
  const visible = state.isExpanded ? !isSidebarCollapsed : state.isSidebarOpen;
  sidebarToggleBtn?.setAttribute("aria-expanded", String(visible));
  sidebarToggleBtn?.setAttribute(
    "aria-label",
    visible ? "Hide sidebar" : "Show sidebar",
  );
}

export function openSidebar() {
  if (state.isExpanded) {
    isSidebarCollapsed = false;
    widget.classList.remove("sidebar-collapsed");
  } else {
    state.isSidebarOpen = true;
    widget.classList.add("sidebar-open");
  }
  if (!state.isExpanded) updateHeaderTitle("Support", "Your recent conversations");
  else updateHeaderForCurrentView();
  updateSidebarToggleState();
}

export function closeSidebar() {
  if (state.isExpanded) {
    isSidebarCollapsed = true;
    widget.classList.add("sidebar-collapsed");
  } else {
    state.isSidebarOpen = false;
    widget.classList.remove("sidebar-open");
  }
  updateHeaderForCurrentView();
  updateSidebarToggleState();
}

export function toggleSidebar() {
  if (state.isExpanded) {
    isSidebarCollapsed = !isSidebarCollapsed;
    widget.classList.toggle("sidebar-collapsed", isSidebarCollapsed);
  } else {
    state.isSidebarOpen = !state.isSidebarOpen;
    widget.classList.toggle("sidebar-open", state.isSidebarOpen);
  }
  updateHeaderForCurrentView();
  updateSidebarToggleState();
}

export function toggleExpand() {
  state.isExpanded = !state.isExpanded;
  setTimeout(autoResizeInput, 0);
  widget.classList.toggle("is-expanded", state.isExpanded);

  if (state.isExpanded) {
    if (state.isDragging) onDragEnd();
    isSidebarCollapsed = false;
    state.isSidebarOpen = true;
    widget.classList.remove("sidebar-open");
    widget.classList.remove("sidebar-collapsed");
    widget.style.left = "0";
    widget.style.top = "0";
    widget.style.right = "0";
    widget.style.bottom = "0";
    expandBtn?.setAttribute("aria-label", "Collapse chat");
  } else {
    isSidebarCollapsed = false;
    state.isSidebarOpen = false;
    widget.classList.remove("sidebar-collapsed");
    widget.classList.remove("sidebar-open");
    widget.style.left = "";
    widget.style.top = "";
    widget.style.right = "";
    widget.style.bottom = "";
    expandBtn?.setAttribute("aria-label", "Expand chat");
  }

  updateHeaderForCurrentView();
  updateSidebarToggleState();
}

export function openWidget() {
  state.isOpen = true;
  widget.classList.add("is-visible");
  fab.classList.add("is-open");
  fab.setAttribute("aria-label", "Close chat");
  fab.setAttribute("aria-expanded", "true");
  updateHeaderForCurrentView();
  void ensureWebChatInitialized();
  if (!sessionRestored) {
    sessionRestored = true;
    void restoreSession();
  }
  setTimeout(() => input && input.focus(), 300);
}

export function closeWidget() {
  state.isOpen = false;
  closeSidebar();
  widget.classList.remove("is-visible");
  fab.classList.remove("is-open");
  fab.setAttribute("aria-label", "Open chat");
  fab.setAttribute("aria-expanded", "false");
}

export function toggleWidget() {
  state.isOpen ? closeWidget() : openWidget();
}

function onDragStart(clientX, clientY) {
  if (state.isExpanded) return;
  state.isDragging = true;
  widget.classList.add("is-dragging");

  const rect = widget.getBoundingClientRect();
  dragOffsetX = clientX - rect.left;
  dragOffsetY = clientY - rect.top;

  widget.style.right = "auto";
  widget.style.bottom = "auto";
  widget.style.left = rect.left + "px";
  widget.style.top = rect.top + "px";
}

export function onDragMove(clientX, clientY) {
  if (!state.isDragging) return;
  let left = clientX - dragOffsetX;
  let top = clientY - dragOffsetY;
  const maxLeft = window.innerWidth - widget.offsetWidth;
  const maxTop = window.innerHeight - widget.offsetHeight;
  left = Math.max(0, Math.min(left, maxLeft));
  top = Math.max(0, Math.min(top, maxTop));
  widget.style.left = left + "px";
  widget.style.top = top + "px";
}

export function onDragEnd() {
  if (!state.isDragging) return;
  state.isDragging = false;
  widget.classList.remove("is-dragging");
}

function bindDragHandle(el) {
  if (!el) return;
  el.addEventListener("mousedown", (e) => {
    e.preventDefault();
    e.stopPropagation();
    onDragStart(e.clientX, e.clientY);
  });
  el.addEventListener(
    "touchstart",
    (e) => {
      const touch = e.touches[0];
      onDragStart(touch.clientX, touch.clientY);
    },
    { passive: true },
  );
}

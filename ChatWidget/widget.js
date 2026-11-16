// Widget entry point. Wires the modules together and runs the startup sequence in the
// same order as the original single-file widget (icons, public-IP lookup, marked, composer,
// listeners, branding refresh, history load, idle Direct Line init).
import { hydrateIcons } from "./icons.js";
import { KB_SITE_SEARCH_SOURCE, normalizeConversationSource } from "./conversation-persistence.mjs";
import { state } from "./state.js";
import { attachBtn, endLiveBtn, expandBtn, fab, fileInput, header, input, newChatBtn, quickReplyBtns, searchInput, sendBtn, sidebarBackdrop, sidebarNewChatBtn, sidebarToggleBtn, widget } from "./dom.js";
import { loadConversations } from "./conversation-store.js";
import { branding, refreshBranding } from "./branding-ui.js";
import { showToast } from "./ui-utils.js";
import { closeSidebar, closeWidget, onDragEnd, onDragMove, openSidebar, openWidget, renderHistoryList, toggleExpand, toggleSidebar, toggleWidget, updateSidebarToggleState } from "./shell.js";
import { ensureWebChatInitialized, startNewConversation } from "./directline.js";
import { addPendingFiles, handleAttachClick, handleSend, initComposerInput, updateSendButton } from "./composer.js";
import { endLiveAgentSession, endLiveChatByUser } from "./live-agent.js";

function main() {

  if (!widget || !fab || !header || !state.webchatDiv) return;

  // Fill in every static icon span (expand, collapse, close, search, add,
  // panel-open/closed, sparkle, attach, send)
  hydrateIcons(document);
  fetch("https://api.ipify.org?format=json")
    .then((r) => r.json())
    .then((data) => {
      state.userPublicIp = data.ip || "";
    })
    .catch(() => {
      state.userPublicIp = "";
    });
  if (window.marked) {
    marked.setOptions({ breaks: true, gfm: true });
  }

  initComposerInput();

  fab.addEventListener("click", toggleWidget);
  expandBtn?.addEventListener("click", toggleExpand);
  endLiveBtn?.addEventListener("click", endLiveChatByUser);
  sidebarToggleBtn?.addEventListener("click", toggleSidebar);
  sidebarBackdrop?.addEventListener("click", closeSidebar);
  sendBtn?.addEventListener("click", handleSend);
  attachBtn?.addEventListener("click", handleAttachClick);
  fileInput?.addEventListener("change", () => {
    if (fileInput.files?.length) addPendingFiles(fileInput.files);
  });
  newChatBtn?.addEventListener("click", () => closeWidget());
  sidebarNewChatBtn?.addEventListener("click", () => {
    startNewConversation();

    if (state.isExpanded) {
      openSidebar();
    } else {
      closeSidebar();
    }
  });

  searchInput?.addEventListener("input", () =>
    renderHistoryList(searchInput.value),
  );
  quickReplyBtns.forEach((btn) => {
    btn.addEventListener("click", async () => {
      const chip = btn.dataset.chip;

      // if (chip === "raise-ticket") {
      //   try {
      //     await ensureWebChatInitialized();
      //   } catch {
      //     showToast("Chat is still loading. Please try again.");
      //     return;
      //   }
      //   if (!input) return;
      //   input.value = "How to raise a ticket";
      //   updateSendButton();
      //   handleSend();
      //   return;
      // }

      // if (chip === "show-tickets") {
      //   if (!input) return;
      //   try {
      //     await ensureWebChatInitialized();
      //   } catch {
      //     showToast("Chat is still loading. Please try again.");
      //     return;
      //   }
      //   input.value = "Show my tickets";
      //   updateSendButton();
      //   handleSend();
      //   return;
      // }

      // fallback for any other quick-reply button using data-question
      const question = btn.dataset.question || btn.textContent || "";
      if (!input || !question.trim()) return;
      try {
        await ensureWebChatInitialized();
      } catch {
        showToast("Chat is still loading. Please try again.");
        return;
      }
      input.value = question.trim();
      updateSendButton();
      handleSend();
    });
  });

  input?.addEventListener("input", updateSendButton);
  input?.addEventListener("keydown", (e) => {
    if (e.key === "Enter" && !e.shiftKey) {
      e.preventDefault();
      handleSend();
    }
  });

  document.addEventListener("mousemove", (e) =>
    onDragMove(e.clientX, e.clientY),
  );
  document.addEventListener("mouseup", onDragEnd);
  document.addEventListener(
    "touchmove",
    (e) => {
      if (!state.isDragging) return;
      const touch = e.touches[0];
      onDragMove(touch.clientX, touch.clientY);
    },
    { passive: true },
  );
  document.addEventListener("touchend", onDragEnd);

  // Tab closed / navigated away mid live chat: end it so the agent isn't left with an
  // orphaned chat. The /end fetch uses keepalive so it survives the unload. No-op otherwise.
  window.addEventListener("pagehide", () => {
    branding.cleanup({ revive: true });
    if (state.liveSession) endLiveAgentSession();
  });

  window.addEventListener("resize", () => {
    if (state.isExpanded || !widget.style.left) return;
    const left = parseInt(widget.style.left, 10) || 0;
    const top = parseInt(widget.style.top, 10) || 0;
    const maxLeft = window.innerWidth - widget.offsetWidth;
    const maxTop = window.innerHeight - widget.offsetHeight;
    widget.style.left = Math.max(0, Math.min(left, maxLeft)) + "px";
    widget.style.top = Math.max(0, Math.min(top, maxTop)) + "px";
  });

  document.addEventListener("keydown", (e) => {
    if (e.key === "Escape") {
      if (!state.isExpanded && state.isSidebarOpen) closeSidebar();
      else if (state.isOpen) closeWidget();
    }
  });

  //updateSendButton();
  //updateSidebarToggleState();
  //restoreSession();
  //})();

  updateSendButton();
  updateSidebarToggleState();
  void refreshBranding({ force: true });
  document.addEventListener("visibilitychange", () => {
    if (document.visibilityState === "visible") void refreshBranding();
  });
  window.addEventListener("focus", () => void refreshBranding());
  window.addEventListener("pageshow", (event) => {
    if (event.persisted) {
      branding.cleanup({ revive: true });
      void refreshBranding({ force: true });
    }
  });
  void loadConversations();
  if (window.requestIdleCallback) {
    window.requestIdleCallback(() => {
      void ensureWebChatInitialized().catch(() => {});
    });
  } else {
    setTimeout(() => {
      void ensureWebChatInitialized().catch(() => {});
    }, 1000);
  }
  // Public API lets an external page control the widget.
  window.CopilotWidget = {
    open() {
      openWidget();
    },
    close() {
      closeWidget();
    },
    isOpen() {
      return state.isOpen;
    },
    ask(question, source = KB_SITE_SEARCH_SOURCE) {
      if (!question || !question.trim()) return;
      openWidget();
      closeSidebar();
      setTimeout(() => {
        input.value = question;
        updateSendButton();
        handleSend(normalizeConversationSource(source));
      }, 320);
    },
  };
}

main();

// End-of-chat rating prompt and idle timer.
import { RATING_IDLE_MS } from "./config.js";
import { state } from "./state.js";
import { body } from "./dom.js";
import { queueConversationSave } from "./conversation-store.js";
import { escapeHtml, scrollToBottom, showToast } from "./ui-utils.js";
import { hideEmptyState } from "./messages.js";

let ratingIdleTimer = null;

/* ================= Conversation rating ================= */

function countRealUserMessages(conv) {
  return (conv?.messages || []).filter((m) => {
    const text = (m.text || "").trim();
    return (
      m.from?.role === "user" &&
      text &&
      text !== "Technical Support" &&
      text !== "Sales Support"
    );
  }).length;
}

function canOfferRating(conv) {
  return (
    Boolean(conv) &&
    !conv.rating &&
    !conv.ratingCardShown &&
    countRealUserMessages(conv) >= 2
  );
}

export function clearRatingIdleTimer() {
  clearTimeout(ratingIdleTimer);
  ratingIdleTimer = null;
}

// Soft fallback: no activity after a bot reply, so offer the rating inline once.
export function scheduleRatingIdle() {
  clearRatingIdleTimer();
  const conv = state.currentConversation;
  if (!canOfferRating(conv)) return;
  ratingIdleTimer = setTimeout(() => {
    if (
      conv === state.currentConversation &&
      state.isOpen &&
      !state.liveAgentActive &&
      canOfferRating(conv)
    ) {
      showRatingCard(conv, "idle");
    }
  }, RATING_IDLE_MS);
}

export function handleRatingRequest(value) {
  if (state.isReplayingHistory || state.liveAgentActive) return;
  showRatingCard(
    state.currentConversation,
    "bot",
    typeof value?.prompt === "string" ? value.prompt : "",
  );
}

// Hidden Direct Line event. The bot writes Rating / FeedbackComment on the item.
function sendRatingEvent(conv, rating, comment) {
  if (!state.store) return false;
  const value = { rating };
  if (comment) value.comment = comment;
  if (conv.conversationId) value.conversationId = conv.conversationId;
  state.store.dispatch({
    type: "WEB_CHAT/SEND_EVENT",
    payload: { name: "conversation/rating", value },
  });
  return true;
}

function submitRating(conv, rating, comment) {
  if (!sendRatingEvent(conv, rating, comment)) {
    showToast("Could not send your rating. Please try again.");
    return false;
  }
  conv.rating = {
    value: rating,
    comment: comment || (conv.rating && conv.rating.comment) || "",
    timestamp: new Date().toISOString(),
  };
  queueConversationSave(conv, true);
  return true;
}

export function showRatingCard(conv, reason, promptText) {
  if (
    !conv ||
    conv !== state.currentConversation ||
    conv.rating ||
    conv.ratingCardShown
  )
    return;
  if (body.querySelector(".cw-rating-card")) return;

  conv.ratingCardShown = true;
  queueConversationSave(conv, true); // persists ratingPrompted so it is never asked again
  clearRatingIdleTimer();
  hideEmptyState();

  const prompt =
    (promptText || "").trim() ||
    (reason === "live-ended"
      ? "How was your chat with our support team?"
      : "How was your experience today?");

  const card = document.createElement("div");
  card.className = "cw-rating-card";
  card.setAttribute("role", "group");
  card.setAttribute("aria-label", "Rate this conversation");
  card.innerHTML = `
      <div class="cw-rating-title">${escapeHtml(prompt)}</div>
      <div class="cw-rating-stars" role="radiogroup" aria-label="Star rating">
        ${[1, 2, 3, 4, 5]
          .map(
            (n) =>
              `<button type="button" class="cw-rating-star" role="radio" aria-checked="false" aria-label="${n} star${n > 1 ? "s" : ""}" data-value="${n}">&#9733;</button>`,
          )
          .join("")}
      </div>
      <div class="cw-rating-labels"><span>Poor</span><span>Excellent</span></div>
      <div class="cw-rating-comment" hidden>
        <label class="cw-rating-comment-label">What could we improve? (optional)</label>
        <textarea class="cw-rating-textarea" rows="2" maxlength="1000"></textarea>
        <div class="cw-rating-actions">
          <button type="button" class="cw-rating-submit">Send</button>
          <button type="button" class="cw-rating-skip">Skip</button>
        </div>
      </div>
    `;

  const stars = Array.from(card.querySelectorAll(".cw-rating-star"));
  const commentBox = card.querySelector(".cw-rating-comment");
  const textarea = card.querySelector(".cw-rating-textarea");
  let selected = 0;

  const paint = (n) =>
    stars.forEach((s, i) => s.classList.toggle("is-active", i < n));
  const finish = () => {
    card.innerHTML = `<div class="cw-rating-thanks">Thanks for your feedback!</div>`;
  };

  stars.forEach((star) => {
    const value = Number(star.dataset.value);
    star.addEventListener("mouseenter", () => paint(value));
    star.addEventListener("mouseleave", () => paint(selected));
    star.addEventListener("click", () => {
      if (!submitRating(conv, value)) return; // saved right away, even if no comment follows
      selected = value;
      stars.forEach((s, i) =>
        s.setAttribute("aria-checked", String(i + 1 === selected)),
      );
      paint(selected);
      commentBox.hidden = false;
      textarea.focus();
      scrollToBottom();
    });
  });

  card.querySelector(".cw-rating-submit").addEventListener("click", () => {
    const comment = textarea.value.trim();
    if (comment && !submitRating(conv, selected, comment)) return;
    finish();
  });
  card.querySelector(".cw-rating-skip").addEventListener("click", finish);

  body.appendChild(card);
  scrollToBottom();
}

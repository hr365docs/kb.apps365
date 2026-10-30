export const FLOATING_WIDGET_SOURCE = "kb-floating-widget";
export const KB_SITE_SEARCH_SOURCE = "kb-site-search";

export function normalizeConversationSource(source) {
  return source === KB_SITE_SEARCH_SOURCE || source === FLOATING_WIDGET_SOURCE
    ? source
    : FLOATING_WIDGET_SOURCE;
}

export function conversationSourceDetails(source) {
  return typeof source === "string" && source.trim() ? { source } : {};
}

export function readConversationSource(details) {
  const source = details?.source;
  return typeof source === "string" && source.trim() ? source : undefined;
}

export async function persistConversationItem(
  conversation,
  { findExisting, update, create },
) {
  if (conversation.spId) {
    await update(conversation.spId);
    return conversation;
  }

  if (!conversation.conversationId) return conversation;

  const existingId = await findExisting(conversation.conversationId);
  if (existingId) {
    conversation.spId = existingId;
    await update(existingId);
    return conversation;
  }

  const createdId = await create();
  if (createdId) conversation.spId = createdId;
  return conversation;
}
// lib/chat/shared.ts
// Client-safe chat constants. Kept separate from config.ts so the (large)
// server-only system prompt never lands in the browser bundle.

/** Display name for the website assistant. */
export const ASSISTANT_NAME = "Milo";

// lib/chat/config.ts
// Config for "Milo" — the free, self-hosted Fiixup website assistant.
// No AI API, no keys, no per-message cost. It retrieves the best-matching
// answer from the site's own FAQ / service / pricing / coverage data.

export { ASSISTANT_NAME } from "@/lib/chat/shared";

// ── Request guards (cheap to run, but still worth capping) ───────────────────
export const CHAT_RATE_LIMIT = { limit: 30, windowMs: 60_000 }; // 30 questions / min / IP
export const CHAT_MAX_BODY_BYTES = 4 * 1024;
export const CHAT_MAX_QUERY_CHARS = 500;

/**
 * Cosine-similarity floor for treating a retrieved answer as a real match.
 * Below this the bot says it doesn't know and offers the phone / booking.
 * Raise it if the bot answers too loosely; lower it if it says "I don't know"
 * to reasonable questions.
 */
export const MATCH_THRESHOLD = 0.18;

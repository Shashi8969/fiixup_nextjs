# Milo — the free Fiixup website assistant

A **completely free, self-hosted** chat widget. No AI API, no keys, no
per-message cost, no external calls. It indexes Fiixup's own FAQ / service /
pricing / coverage data and returns the best-matching answer. Anything it
isn't confident about is routed to the phone number or the booking form.

> It **retrieves** answers from your content — it does not *generate* free-form
> text like ChatGPT. Answer quality tracks how well your FAQs cover real
> questions. Add FAQs → the bot gets smarter.

## Setup

**Nothing to configure.** It works the moment the code is deployed. No env vars,
no API key, no signup.

## How "it trains itself from website data"

`lib/chat/corpus.ts` builds the knowledge base from, in order of trust:

1. **Curated FAQs** — `lib/data/faqs.ts` (`globalFAQs`), hand-written.
2. **CMS FAQs** — `faq_library` table + per-page FAQs in `seo_pages`, via the
   existing `getFaqPageCategories()`.
3. **Synthesized facts** — "How much does {category} cost?", "Do you serve
   {city}?", "Do you offer {service}?", contact/timings — generated from
   `service_categories`, `global_service_pages`, `cities`/`areas`, and
   `site_settings`.

It's wrapped in `unstable_cache` (rebuild ≤ every 6 h) and tagged with the CMS
cache tags, so **editing a FAQ or a price in the admin panel updates the bot**
on the next revalidation, or immediately on an admin "clear cache". There is no
separate training step.

## How matching works

`lib/chat/match.ts` — a dependency-free TF-IDF + cosine-similarity index built
in memory. A query is normalized (lowercase, stopwords removed, light
stemming), expanded with a domain synonym map (`jumpstart` ↔ `jump start` ↔
`battery dead` ↔ `won't start`, `puncture` ↔ `flat tyre`, `price` ↔ `cost` ↔
`charges`, …), then scored against every KB entry. Above `MATCH_THRESHOLD`
(0.18, in `lib/chat/config.ts`) it answers; below it, it says it doesn't know
and offers the phone / related links.

Tuning knobs (all in `lib/chat/config.ts` / `lib/chat/match.ts`):

| Want | Change |
|---|---|
| Bot answers too loosely | raise `MATCH_THRESHOLD` |
| Bot says "I don't know" too often | lower `MATCH_THRESHOLD`, or add FAQs |
| Match a new phrasing | add a line to `SYNONYM_GROUPS` in `match.ts` |
| Change the name | `ASSISTANT_NAME` in `lib/chat/shared.ts` |
| Change greeting / quick replies | `GREETING`, `QUICK_REPLIES` in `ChatPanel.tsx` |

## Booking

The composer has a calendar button, and "Book a mechanic" (quick reply or any
message starting with "book") opens a small inline form (name, 10-digit mobile,
city, problem). It submits through the **existing `/api/leads` pipeline** —
same DB row + team email as the contact form, tagged `form_type: "AI Assistant
(Milo)"`, `source: "ai-chat"`. The bot never confirms a slot; the team calls
back.

## Performance

- Widget renders **nothing** in the server HTML and doesn't mount until the
  browser is idle (`requestIdleCallback` / 1.5 s fallback) — zero LCP impact.
- The chat UI (`ChatPanel`) is a separate code-split chunk, fetched only on
  first open.
- The API route has no heavy dependencies. A query resolves in well under a
  millisecond after the index is warm (index rebuilds ≤ every 5 min from the
  hours-cached corpus).
- Guards: 30 questions / min / IP, same-origin check, 4 KB body cap, 500-char
  query cap.

## Files

| File | Role |
|---|---|
| `lib/chat/shared.ts` | `ASSISTANT_NAME` — the only chat constant in the browser bundle. |
| `lib/chat/config.ts` | Rate limits, body/query caps, `MATCH_THRESHOLD`. |
| `lib/chat/match.ts` | Dependency-free TF-IDF + cosine retrieval index + synonym map. |
| `lib/chat/corpus.ts` | Builds the knowledge base from curated + CMS + structured data. `unstable_cache`, CMS-tagged. |
| `app/api/chat/route.ts` | Node runtime. Rate-limit → same-origin → retrieve → JSON `{ matched, answer, related, score }`. |
| `components/chat/ChatWidget.tsx` | Idle-mounted launcher; `next/dynamic(ssr:false)` for the panel. |
| `components/chat/ChatPanel.tsx` | Chat UI + inline booking form (→ `/api/leads`). |
| `app/layout.tsx` | Renders `<ChatWidget />`. |

Analytics events (`lib/analytics.ts` `trackEvent`): `chat_opened`,
`chat_message_sent`, `chat_booking_created`.

## Adding to the bot's knowledge

Best → easiest:
1. Add real Q&A rows in the admin `faq_library` (flows in automatically).
2. Add entries to `globalFAQs` in `lib/data/faqs.ts` (code change).
3. For a whole new fact type, extend `buildCorpus()` in `lib/chat/corpus.ts`.

## Known minor polish

- On a visitor's first load the cookie-consent card and the chat panel share the
  bottom-right corner on desktop; the panel sits on top (`z-[190]` vs `z-[100]`).
  Cosmetic, gone once cookies are dismissed.
- If you later want *generative* answers, the cheapest path is Google's Gemini
  free tier (no billing required, ~1500 req/day) — that would be a swap of
  `app/api/chat/route.ts` only; the corpus and widget stay as-is.

// app/api/chat/route.ts
// ─────────────────────────────────────────────────────────────────────────────
// Free, self-hosted assistant endpoint for "Milo".
//
// No AI API, no key, no per-message cost. It builds a TF-IDF index over the
// site's own FAQ / service / pricing / coverage data (Supabase, hard-cached)
// and returns the best-matching answer. Anything below the confidence floor is
// routed to the phone number / booking form.
//
// Request:  { "query": "how much is a bike service" }
// Response: { "matched": true, "answer": "...", "related": [{question,url}], "score": 0.42 }
// ─────────────────────────────────────────────────────────────────────────────

import { NextRequest, NextResponse } from "next/server";
import {
  getClientIp,
  isSameOriginRequest,
  rateLimitRequest,
  readJsonBody,
} from "@/lib/api-security";
import { SITE_URL } from "@/lib/constants";
import { getPublicSiteSettings } from "@/lib/site-settings";
import { CHAT_MAX_BODY_BYTES, CHAT_MAX_QUERY_CHARS, CHAT_RATE_LIMIT, MATCH_THRESHOLD } from "@/lib/chat/config";
import { getChatCorpus } from "@/lib/chat/corpus";
import { KnowledgeIndex } from "@/lib/chat/match";

export const runtime = "nodejs";
export const dynamic = "force-dynamic";

const SITE_HOST = new URL(SITE_URL).host;
const ALLOWED_ORIGIN_HOSTS =
  process.env.NODE_ENV === "production"
    ? [SITE_HOST]
    : [SITE_HOST, "localhost:3000", "127.0.0.1:3000"];

// Rebuild the in-memory index at most every few minutes; the corpus underneath
// it is itself cached for hours, so this is just amortizing the TF-IDF build.
let cachedIndex: { index: KnowledgeIndex; builtAt: number } | null = null;
const INDEX_TTL_MS = 5 * 60 * 1000;

async function getIndex(): Promise<KnowledgeIndex> {
  if (cachedIndex && Date.now() - cachedIndex.builtAt < INDEX_TTL_MS) {
    return cachedIndex.index;
  }
  const corpus = await getChatCorpus();
  const index = new KnowledgeIndex(corpus);
  cachedIndex = { index, builtAt: Date.now() };
  return index;
}

export async function POST(request: NextRequest) {
  const limited = rateLimitRequest(request, "chat", CHAT_RATE_LIMIT);
  if (limited) return limited;

  if (!isSameOriginRequest(request, ALLOWED_ORIGIN_HOSTS)) {
    return NextResponse.json(
      { error: "Request origin not allowed" },
      { status: 403, headers: { "Cache-Control": "no-store" } },
    );
  }

  const parsed = await readJsonBody<{ query?: unknown }>(request, { maxBytes: CHAT_MAX_BODY_BYTES });
  if (!parsed.ok) return parsed.response;

  const query = typeof parsed.data.query === "string" ? parsed.data.query.trim().slice(0, CHAT_MAX_QUERY_CHARS) : "";
  if (!query) {
    return NextResponse.json(
      { error: "Empty question." },
      { status: 400, headers: { "Cache-Control": "no-store" } },
    );
  }

  try {
    const [index, settings] = await Promise.all([getIndex(), getPublicSiteSettings()]);
    const result = index.query(query, MATCH_THRESHOLD);
    const phone = settings.mainPhoneDisplay || settings.mainPhone;

    if (!result.matched) {
      return NextResponse.json(
        {
          matched: false,
          answer:
            `I don't have a confident answer for that one. Please call or WhatsApp us on ${phone} and the team will help right away` +
            (result.related.length ? `, or one of these might be what you're after:` : "."),
          url: null,
          related: result.related,
          score: result.score,
        },
        { headers: { "Cache-Control": "no-store" } },
      );
    }

    return NextResponse.json(
      { matched: true, answer: result.answer, url: result.url, related: result.related, score: result.score },
      { headers: { "Cache-Control": "no-store" } },
    );
  } catch (error) {
    console.error("[chat] retrieval failed", error);
    const settings = await getPublicSiteSettings().catch(() => null);
    const phone = settings?.mainPhoneDisplay || settings?.mainPhone || "";
    return NextResponse.json(
      {
        matched: false,
        answer: `Something went wrong on our side. Please call or WhatsApp us${phone ? ` on ${phone}` : ""} and we'll help right away.`,
        related: [],
      },
      { status: 500, headers: { "Cache-Control": "no-store" } },
    );
  }
}

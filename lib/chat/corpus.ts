// lib/chat/corpus.ts
// ─────────────────────────────────────────────────────────────────────────────
// Assembles the knowledge base the assistant answers from. Sources, in order of
// trust:
//   1. Curated global FAQs      (lib/data/faqs.ts — hand-written)
//   2. CMS FAQ library + page FAQs (Supabase, via getFaqPageCategories)
//   3. Synthesized facts from structured data (categories, services, cities,
//      site settings) — so common "price of X" / "do you cover Y" questions
//      have an answer even if nobody wrote a FAQ for them.
//
// Cached hard and tagged with the CMS cache tags, so editing a FAQ or price in
// the admin panel "retrains" the bot on the next revalidation (≤ 6h) or an
// immediate admin cache-clear. No training step, no API.
// ─────────────────────────────────────────────────────────────────────────────

import { unstable_cache } from "next/cache";
import { globalFAQs } from "@/lib/data/faqs";
import { getFaqPageCategories } from "@/lib/faqs";
import { getAllServiceCategories } from "@/lib/data/serviceCategory";
import { getAllGlobalServiceSlugs } from "@/lib/global-service";
import { getAllCities } from "@/lib/cities";
import { getPublicSiteSettings } from "@/lib/site-settings";
import { SITE_URL } from "@/lib/constants";
import type { KbEntry } from "@/lib/chat/match";

function clean(v: unknown) {
  return typeof v === "string" ? v.replace(/\s+/g, " ").trim() : "";
}

function slugLabel(slug: string) {
  return slug.replace(/-/g, " ").replace(/\b\w/g, (c) => c.toUpperCase());
}

/** Lowest `priceFrom` across a category's PricingData.rows, or null. */
function startingPrice(pricingSummary: unknown): number | null {
  const rows = (pricingSummary as { rows?: { priceFrom?: unknown }[] } | null)?.rows;
  if (!Array.isArray(rows)) return null;
  const nums = rows
    .map((r) => Number(r?.priceFrom))
    .filter((n) => Number.isFinite(n) && n > 0);
  return nums.length ? Math.min(...nums) : null;
}

async function buildCorpus(): Promise<KbEntry[]> {
  const [cmsCategories, categories, globalSlugs, cities, settings] = await Promise.all([
    getFaqPageCategories().catch(() => []),
    getAllServiceCategories().catch(() => []),
    getAllGlobalServiceSlugs().catch(() => [] as string[]),
    getAllCities().catch(() => []),
    getPublicSiteSettings(),
  ]);

  const out: KbEntry[] = [];
  const seen = new Set<string>();

  const add = (question: string, answer: string, url?: string | null, keywords?: string[]) => {
    const q = clean(question);
    const a = clean(answer);
    if (!q || !a) return;
    const key = q.toLowerCase().replace(/[^a-z0-9]+/g, " ").trim();
    if (seen.has(key)) return;
    seen.add(key);
    out.push({ id: `kb_${out.length}`, question: q, answer: a, url: url || null, keywords });
  };

  // 1 + 2. Curated + CMS FAQ categories (both share the {category, faqs:[{q,a}]} shape)
  for (const group of [...globalFAQs, ...cmsCategories]) {
    for (const faq of group.faqs || []) {
      add(faq.q, faq.a, null, [group.category]);
    }
  }

  // 3a. Contact / hours / payment — authoritative from site settings
  const phone = settings.mainPhoneDisplay || settings.mainPhone;
  add(
    "How do I contact Fiixup or talk to a person?",
    `Call us any time on ${phone}${settings.whatsappNumber ? `, or WhatsApp https://wa.me/${settings.whatsappNumber}` : ""}. We're available 24/7.`,
    `${SITE_URL}/contact`,
    ["phone", "number", "call", "helpline", "support", "contact", "talk", "human", "agent"],
  );
  add(
    "What are your timings / are you open now?",
    `Fiixup operates 24 hours a day, 7 days a week, all year — including holidays. Call ${phone} any time.`,
    null,
    ["timing", "hours", "open", "now", "24_7", "night", "sunday"],
  );

  // 3b. Service categories — price + "do you do X"
  for (const c of categories) {
    const title = clean(c.title);
    if (!title) continue;
    const from = startingPrice(c.pricingSummary);
    const desc = clean(c.tagline || c.description);
    const path = clean(c.link) || `/services/${c.slug}`;
    const url = `${SITE_URL}/${path.replace(/^\/+/, "")}`;
    add(
      `How much does ${title} cost? What is the price of ${title}?`,
      from
        ? `${title} starts from around ₹${from.toLocaleString("en-IN")}. It's an estimate — the exact quote depends on your vehicle and the work needed, and the technician confirms it on the spot with no hidden charges. The full price list is on the ${title} page.`
        : `Pricing for ${title} depends on your vehicle and the exact work. The full price list with starting rates is on the ${title} page, and the technician confirms the final quote after inspection — no hidden charges.`,
      url,
      ["price", "cost", "charges", title],
    );
    if (desc) {
      add(`Do you do ${title}?`, `Yes — ${desc} Book online or call to arrange a doorstep visit.`, url, [title]);
    }
  }

  // 3c. Individual services — light "do you offer X" with a link
  for (const slug of globalSlugs.slice(0, 80)) {
    const label = slugLabel(slug);
    add(
      `Do you offer ${label}?`,
      `Yes, Fiixup offers ${label} at your doorstep across our service cities. Check pricing and details on the service page, or call to book.`,
      `${SITE_URL}/services/${slug}`,
      [label, slug.replace(/-/g, " ")],
    );
  }

  // 3d. Cities & areas — coverage
  for (const city of cities) {
    const name = clean(city.name);
    if (!name) continue;
    const areas = (city.areas || [])
      .map((a: { name?: string } | string) => (typeof a === "string" ? a : a?.name))
      .filter(Boolean) as string[];
    add(
      `Do you serve ${name}?`,
      `Yes, Fiixup operates across ${name}${city.state ? `, ${city.state}` : ""} with technicians in all major zones.${
        areas.length ? ` Areas covered include ${areas.slice(0, 25).join(", ")}.` : ""
      } If your locality isn't listed it's usually still covered — call ${phone} to confirm.`,
      `${SITE_URL}/${city.slug}`,
      ["area", "coverage", name, ...areas.slice(0, 25)],
    );
  }

  // Safety-net catch-all for booking intent — always present.
  add(
    "How do I book a mechanic / service?",
    `Tap "Book a mechanic" below to send your details, or call ${phone}. Our team confirms your booking and shares a technician ETA within minutes.`,
    `${SITE_URL}/contact`,
    ["book", "booking", "appointment", "send", "mechanic", "schedule"],
  );

  return out;
}

/** Cached knowledge base. Rebuilds ≤ every 6h, or on an admin cache-clear. */
export const getChatCorpus = unstable_cache(buildCorpus, ["chat-corpus-v1"], {
  revalidate: 21_600,
  tags: ["faq-library", "seo-pages", "services", "service-categories", "site-settings"],
});

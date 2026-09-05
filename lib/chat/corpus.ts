// lib/chat/corpus.ts
// ─────────────────────────────────────────────────────────────────────────────
// Assembles the knowledge base the assistant answers from. Sources, in order of
// trust:
//   1. CMS FAQ library / verified fallback (via getFaqPageCategories)
//   2. Structured service/category/city/site-setting facts
//
// The FAQ loader now prefers curated Supabase rows and falls back only to a
// small verified code dataset, preventing stale static marketing claims from
// overriding current business policy.
// ─────────────────────────────────────────────────────────────────────────────

import { unstable_cache } from "next/cache";
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

/** Lowest positive `priceFrom` across a category's pricing rows, or null. */
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

  // 1. Curated CMS FAQ categories (or the verified fallback returned by loader).
  for (const group of cmsCategories) {
    for (const faq of group.faqs || []) {
      add(faq.q, faq.a, null, [group.category]);
    }
  }

  // 2a. Contact / hours — authoritative from site settings.
  const phone = settings.mainPhoneDisplay || settings.mainPhone;
  add(
    "How do I contact Fiixup or talk to a person?",
    `Call us any time on ${phone}${settings.whatsappNumber ? `, or WhatsApp https://wa.me/${settings.whatsappNumber}` : ""}. Fiixup provides 24/7 booking and roadside support.`,
    `${SITE_URL}/contact`,
    ["phone", "number", "call", "helpline", "support", "contact", "talk", "human", "agent"],
  );
  add(
    "What are your timings / are you open now?",
    `Fiixup provides 24/7 booking and roadside support. Call ${phone} to confirm the current service window and availability for your exact location and service.`,
    null,
    ["timing", "hours", "open", "now", "24_7", "night", "sunday"],
  );
  add(
    "How quickly can a Fiixup mechanic arrive?",
    "Fiixup uses a 20-Min Quick Arrival promise after booking confirmation for eligible doorstep and roadside requests. Exceptional traffic, weather, distance, building or parking access, and technician availability can affect arrival. Arrival time is separate from diagnosis and repair duration.",
    `${SITE_URL}/contact`,
    ["20 minute", "arrival", "eta", "quick", "mechanic arrival"],
  );

  // 2b. Service categories — starting price + service availability.
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
        ? `${title} has a starting/indicative price from around ₹${from.toLocaleString("en-IN")} for the standard scope. Final charges can vary with the vehicle, location, labour, parts or fluids, access, distance, multiple punctures, and additional work approved after inspection. Check the current service page or confirm the quote when booking.`
        : `Pricing for ${title} depends on the vehicle and actual work required. Website prices are starting/indicative where shown, and additional labour, parts, fluids, distance or repairs can change the final amount after approval.`,
      url,
      ["price", "cost", "charges", title],
    );
    if (desc) {
      add(
        `Do you do ${title}?`,
        `Yes — ${desc} Suitable work can be handled at the vehicle; workshop-only car jobs can be coordinated through a partner garage. Confirm current availability when booking.`,
        url,
        [title],
      );
    }
  }

  // 2c. Individual services — do not assume every service is doorstep-only.
  for (const slug of globalSlugs.slice(0, 80)) {
    const label = slugLabel(slug);
    add(
      `Do you offer ${label}?`,
      `Yes, Fiixup offers ${label} across supported service cities. Depending on the job, support may be doorstep, roadside, or coordinated through a partner garage. Check the service page or call to confirm current availability and the starting scope.`,
      `${SITE_URL}/services/${slug}`,
      [label, slug.replace(/-/g, " ")],
    );
  }

  // 2d. Cities & areas — service-area coverage, not fake storefront claims.
  for (const city of cities) {
    const name = clean(city.name);
    if (!name) continue;
    const areas = (city.areas || [])
      .map((a: { name?: string } | string) => (typeof a === "string" ? a : a?.name))
      .filter(Boolean) as string[];
    add(
      `Do you serve ${name}?`,
      `Yes, Fiixup has service coverage across ${name}${city.state ? `, ${city.state}` : ""}.${
        areas.length ? ` Published service areas include ${areas.slice(0, 25).join(", ")}.` : ""
      } Availability varies by exact locality, service type, traffic and current technician or recovery capacity, so call ${phone} to confirm the current window.`,
      `${SITE_URL}/${city.slug}`,
      ["area", "coverage", name, ...areas.slice(0, 25)],
    );
  }

  add(
    "How do I book a mechanic / service?",
    `Use the booking form or call ${phone}. Share your vehicle, issue and exact location. After the booking is confirmed, the 20-Min Quick Arrival promise applies to eligible doorstep and roadside requests.`,
    `${SITE_URL}/contact`,
    ["book", "booking", "appointment", "send", "mechanic", "schedule"],
  );

  add(
    "Can Fiixup take my car to a garage and bring it back?",
    "Yes. For car-service jobs that need workshop equipment, Fiixup can coordinate inspection or collection and service through partner garages. Pickup and drop can be arranged, and free pickup and drop is available on eligible services when confirmed at booking.",
    `${SITE_URL}/services/car-service-at-home`,
    ["pickup", "drop", "partner garage", "workshop", "car service"],
  );

  return out;
}

/** Cached knowledge base. Rebuilds ≤ every 6h, or on an admin cache-clear. */
export const getChatCorpus = unstable_cache(buildCorpus, ["chat-corpus-v2"], {
  revalidate: 21_600,
  tags: ["faq-library", "seo-pages", "services", "service-categories", "site-settings"],
});

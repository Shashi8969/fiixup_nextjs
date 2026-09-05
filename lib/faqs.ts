import { unstable_cache } from "next/cache";
import { supabase } from "@/lib/supabase";
import { verifiedGlobalFAQs } from "@/lib/data/verified-global-faqs";
import type { FAQ, FAQCategory } from "@/lib/models/faq.model";

type SeoPageFaq = {
  q?: string;
  a?: string;
  question?: string;
  answer?: string;
};

type SeoPageFaqRow = {
  url_path: string | null;
  page_type: string | null;
  meta_title: string | null;
  page_data: {
    serviceName?: string;
    cityName?: string;
    areaName?: string;
    faqs?: SeoPageFaq[];
  } | null;
};

type FaqLibraryRow = {
  question?: string | null;
  answer?: string | null;
  faq_type?: string | null;
  service_category?: string | null;
  service_slug?: string | null;
  city_slug?: string | null;
  area_slug?: string | null;
  is_global?: boolean | null;
  sort_order?: number | null;
};

const FAQ_PAGE_TYPES = [
  "global_service",
  "city_service",
  "city_service_page",
  "location_service",
  "area_service",
];

function cleanText(value: unknown) {
  return typeof value === "string" ? value.trim() : "";
}

function titleCaseSlug(value: string) {
  return value
    .split(/[-_\s]+/)
    .filter(Boolean)
    .map((part) => part.charAt(0).toUpperCase() + part.slice(1))
    .join(" ");
}

function normalizeQuestion(question: string) {
  return question
    .toLowerCase()
    .replace(/[^a-z0-9]+/g, " ")
    .trim();
}

function faqFromItem(item: SeoPageFaq): FAQ | null {
  const q = cleanText(item.q ?? item.question);
  const a = cleanText(item.a ?? item.answer);
  if (!q || !a) return null;
  return { q, a };
}

function categoryName(row: SeoPageFaqRow) {
  const data = row.page_data ?? {};
  const serviceName = cleanText(data.serviceName);
  const areaName = cleanText(data.areaName);
  const cityName = cleanText(data.cityName);

  if (serviceName && areaName && cityName) return `${serviceName} in ${areaName}, ${cityName}`;
  if (serviceName && cityName) return `${serviceName} in ${cityName}`;
  if (serviceName) return serviceName;

  const title = cleanText(row.meta_title).split("|")[0].split("—")[0].trim();
  return title || "Service FAQs";
}

function faqLibraryCategoryName(row: FaqLibraryRow) {
  const type = cleanText(row.faq_type);
  if (type) return titleCaseSlug(type);

  const category = cleanText(row.service_category);
  if (category) return `${titleCaseSlug(category)} FAQs`;

  const serviceSlug = cleanText(row.service_slug);
  if (serviceSlug) return `${titleCaseSlug(serviceSlug)} FAQs`;

  const citySlug = cleanText(row.city_slug);
  if (citySlug) return `${titleCaseSlug(citySlug)} FAQs`;

  return "General FAQs";
}

function pushFaq(
  categories: Map<string, FAQ[]>,
  usedQuestions: Set<string>,
  category: string,
  faq: FAQ,
  maxPerCategory = 12
) {
  const key = normalizeQuestion(faq.q);
  if (!key || usedQuestions.has(key)) return;

  const current = categories.get(category) ?? [];
  if (current.length >= maxPerCategory) return;

  usedQuestions.add(key);
  categories.set(category, [...current, faq]);
}

async function getFaqLibraryCategories(): Promise<FAQCategory[]> {
  const { data, error } = await supabase
    .from("faq_library")
    .select("question,answer,faq_type,service_category,service_slug,city_slug,area_slug,is_global,sort_order")
    .eq("is_active", true)
    .eq("is_global", true)
    .order("sort_order", { ascending: true })
    .order("created_at", { ascending: false })
    .limit(160);

  if (error || !data?.length) return [];

  const categories = new Map<string, FAQ[]>();
  const usedQuestions = new Set<string>();

  for (const row of data as FaqLibraryRow[]) {
    const q = cleanText(row.question);
    const a = cleanText(row.answer);
    if (!q || !a) continue;

    pushFaq(categories, usedQuestions, faqLibraryCategoryName(row), { q, a });
    if (categories.size >= 12 && usedQuestions.size >= 80) break;
  }

  return Array.from(categories.entries()).map(([category, faqs]) => ({ category, faqs }));
}

async function getSeoPageFaqCategories(): Promise<FAQCategory[]> {
  const { data, error } = await supabase
    .from("seo_pages")
    .select("url_path,page_type,meta_title,page_data")
    .eq("is_active", true)
    .eq("is_indexed", true)
    .in("page_type", FAQ_PAGE_TYPES)
    .order("updated_at", { ascending: false })
    .limit(80);

  if (error || !data?.length) return [];

  const usedQuestions = new Set<string>();
  const categories: FAQCategory[] = [];

  for (const row of data as SeoPageFaqRow[]) {
    const rawFaqs = Array.isArray(row.page_data?.faqs) ? row.page_data.faqs : [];
    const faqs: FAQ[] = [];

    for (const item of rawFaqs) {
      const faq = faqFromItem(item);
      if (!faq) continue;

      const key = normalizeQuestion(faq.q);
      if (!key || usedQuestions.has(key)) continue;

      usedQuestions.add(key);
      faqs.push(faq);
      if (faqs.length >= 8) break;
    }

    if (faqs.length) {
      categories.push({ category: categoryName(row), faqs });
    }

    if (categories.length >= 12) break;
  }

  return categories;
}

export const getFaqPageCategories = unstable_cache(
  async (): Promise<FAQCategory[]> => {
    // The CMS FAQ library is the primary source of truth. Only fall back to
    // per-page FAQs, then the small verified code fallback when the CMS is
    // unavailable/empty. This prevents old static marketing claims from
    // overriding curated business facts in the public FAQ and chat corpus.
    const libraryCategories = await getFaqLibraryCategories();
    if (libraryCategories.length) return libraryCategories;

    const seoPageCategories = await getSeoPageFaqCategories();
    if (seoPageCategories.length) return seoPageCategories;

    return verifiedGlobalFAQs;
  },
  ["faq-page-categories-v2"],
  { revalidate: 3600, tags: ["faq-library", "seo-pages"] }
);

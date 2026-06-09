import { supabase } from "@/lib/supabase";
import { globalFAQs } from "@/lib/data/faqs";
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

export async function getFaqPageCategories(): Promise<FAQCategory[]> {
  const { data, error } = await supabase
    .from("seo_pages")
    .select("url_path,page_type,meta_title,page_data")
    .eq("is_active", true)
    .eq("is_indexed", true)
    .in("page_type", FAQ_PAGE_TYPES)
    .order("updated_at", { ascending: false })
    .limit(80);

  if (error || !data?.length) return globalFAQs;

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

  return categories.length ? categories : globalFAQs;
}

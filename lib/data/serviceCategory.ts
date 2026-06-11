// lib/data/serviceCategory.ts
// ─────────────────────────────────────────────────────────────────────────────
// All service category data fetched from Supabase.
// Return shape is IDENTICAL to the old static array — zero component changes.
// ─────────────────────────────────────────────────────────────────────────────

import { unstable_cache } from "next/cache";
import { Car, Bike, Truck, Battery, ShipWheel, Wrench, ShieldCheck } from "lucide-react";
import type { LucideIcon } from "lucide-react";
import { supabase } from "@/lib/supabase";

// ── Icon string → Lucide component ───────────────────────────────────────────
// Stored as "Car", "Bike" etc. in Supabase → mapped back to React components
const iconMap: Record<string, LucideIcon> = {
  Car,
  Bike,
  Truck,
  Battery,
  ShipWheel,
  Wrench,
  ShieldCheck,
};

// ── Raw DB rows are cache-safe; React icon functions are mapped after cache ──
const getServiceCategoryRows = unstable_cache(
  async () => {
    const { data, error } = await supabase
      .from("service_categories")
      .select("*")
      .order("slug");

    if (error) {
      console.error("getAllServiceCategories error:", error.message);
      return [];
    }
    return data ?? [];
  },
  ["service-category-rows"],
  { revalidate: 3600, tags: ["service-categories", "services"] }
);

// ── DB row → exact shape all components expect ────────────────────────────────
function rowToCategory(row: any) {
  return {
    slug:            row.slug,
    categorySlug:    row.category_slug   ?? row.slug,
    link:            row.link            ?? `/services/${row.slug}`,
    title:           row.title           ?? "",
    tagline:         row.tagline         ?? "",
    description:     row.description     ?? "",
    icon:            iconMap[row.icon]   ?? Car,
    color:           row.color           ?? "blue",
    bgColor:         row.bg_color        ?? "bg-white",
    metaTitle:       row.meta_title      ?? "",
    metaDescription: row.meta_description ?? "",
    keywords:        row.meta_keywords   ?? "",
    benefits:        row.benefits        ?? [],
    pricingSummary:  row.pricing_summary ?? null,
    brands:          row.brands          ?? [],
    guide:           row.guide           ?? null,
    faqs:            row.faqs            ?? [],
  };
}

// ── Get all categories ────────────────────────────────────────────────────────
export async function getAllServiceCategories() {
  const rows = await getServiceCategoryRows();
  return rows.map(rowToCategory);
}

// ── Get one category by slug ──────────────────────────────────────────────────
export async function getServiceCategoryBySlug(slug: string) {
  const rows = await getServiceCategoryRows();
  const row = rows.find((item: any) => item.slug === slug);
  return row ? rowToCategory(row) : null;
}

// ── Backwards compatibility ───────────────────────────────────────────────────
// Keeps old `import { serviceCategories }` imports from breaking at build time.
// Replace those imports with: const cats = await getAllServiceCategories();
export const serviceCategories: ReturnType<typeof rowToCategory>[] = [];

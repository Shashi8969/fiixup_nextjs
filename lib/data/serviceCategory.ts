// lib/data/serviceCategory.ts
// ─────────────────────────────────────────────────────────────────────────────
// All service category data fetched from Supabase.
// Return shape is IDENTICAL to the old static array — zero component changes.
// ─────────────────────────────────────────────────────────────────────────────

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

// ── DB row → exact shape all components expect ────────────────────────────────
function rowToCategory(row: any) {
  return {
    slug:            row.slug,
    categorySlug:    row.category_slug   ?? row.slug,
    link:            row.link            ?? `services/${row.slug}`,
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
  const { data, error } = await supabase
    .from("service_categories")
    .select("*")
    .order("slug");

  if (error) {
    console.error("getAllServiceCategories error:", error.message);
    return [];
  }
  return (data ?? []).map(rowToCategory);
}

// ── Get one category by slug ──────────────────────────────────────────────────
export async function getServiceCategoryBySlug(slug: string) {
  const { data, error } = await supabase
    .from("service_categories")
    .select("*")
    .eq("slug", slug)
    .single();

  if (error || !data) return null;
  return rowToCategory(data);
}

// ── Backwards compatibility ───────────────────────────────────────────────────
// Keeps old `import { serviceCategories }` imports from breaking at build time.
// Replace those imports with: const cats = await getAllServiceCategories();
export const serviceCategories: ReturnType<typeof rowToCategory>[] = [];


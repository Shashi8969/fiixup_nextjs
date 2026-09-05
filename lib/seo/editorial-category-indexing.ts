import { supabase } from "@/lib/supabase";

/**
 * Phase-safe indexability override for city/category pages that have useful
 * editorial content but no active city-level child service cards yet.
 *
 * This is deliberately DB-controlled so we can recover low-impression pages
 * first without changing the index behavior of high-performing categories.
 */
export async function isEditorialCategoryIndexable(
  citySlug: string,
  categorySlug: string,
): Promise<boolean> {
  const { data, error } = await supabase
    .from("city_service_pages")
    .select("editorial_indexable")
    .eq("city_slug", citySlug.toLowerCase())
    .eq("category_slug", categorySlug.toLowerCase())
    .eq("is_active", true)
    .maybeSingle();

  if (error) {
    console.error("isEditorialCategoryIndexable error:", error.message);
    return false;
  }

  return data?.editorial_indexable === true;
}

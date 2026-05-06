// lib/services.ts
// ─────────────────────────────────────────────────────────────────────────────
// All service data now comes from Supabase.
// Return shape is IDENTICAL to the old static TS array — zero component changes.
// ─────────────────────────────────────────────────────────────────────────────

import { supabase } from "./supabase";
import type { ServiceData } from "./models/service.model";

// ── Raw Supabase row → ServiceData shape ─────────────────────────────────────


function rowToService(row: any): ServiceData {
  return {
    slug:             row.slug,
    category:         row.category,
    title:            row.title,
    shortTitle:       row.short_title,
    tagline:          row.tagline,
    description:      row.description,
    price:            row.price,
    duration:         row.duration,
    icon:             row.icon,
    features:         row.features ?? [],
    pricing:          row.pricing ?? undefined,
    benefits:         row.benefits ?? undefined,
    testimonials:     row.testimonials ?? undefined,
    guide:            row.guide ?? undefined,
    carBrands:        row.car_brands ?? undefined,
    bikeBrands:       row.bike_brands ?? undefined,
    relatedSlugs:     row.related_slugs ?? undefined,
    faqs:             row.faqs ?? [],
    metaTitle:        row.meta_title,
    metaDescription:  row.meta_description,
    metaKeywords:     row.meta_keywords,
  };
}

// ── Get all services ──────────────────────────────────────────────────────────
export async function getAllServices(): Promise<ServiceData[]> {
  const { data, error } = await supabase
    .from("services")
    .select("*")
    .order("category");

  if (error) {
    console.error("getAllServices error:", error.message);
    return [];
  }
  return (data ?? []).map(rowToService);
}

// ── Get service by slug ───────────────────────────────────────────────────────
export async function getServiceBySlug(slug: string): Promise<ServiceData | undefined> {
  const { data, error } = await supabase
    .from("services")
    .select("*")
    .eq("slug", slug)
    .single();

  if (error || !data) return undefined;
  return rowToService(data);
}

// ── Get services by category ──────────────────────────────────────────────────
export async function getServicesByCategory(
  category: ServiceData["category"]
): Promise<ServiceData[]> {
  const { data, error } = await supabase
    .from("services")
    .select("*")
    .eq("category", category);

  if (error) {
    console.error(`getServicesByCategory(${category}) error:`, error.message);
    return [];
  }
  return (data ?? []).map(rowToService);
}

// ── Get multiple services by slug array (for related services) ────────────────
export async function getServicesBySlugs(slugs: string[]): Promise<ServiceData[]> {
  if (!slugs?.length) return [];
  const { data, error } = await supabase
    .from("services")
    .select("*")
    .in("slug", slugs);

  if (error) return [];
  return (data ?? []).map(rowToService);
}

// ── Category-filtered exports (matching old lib/services.ts exports) ──────────
export async function getBikeServices()     { return getServicesByCategory("bike"); }
export async function getCarServices()      { return getServicesByCategory("car"); }
export async function getTowingServices()   { return getServicesByCategory("towing"); }
export async function getBatteryServices()  { return getServicesByCategory("battery"); }
export async function getPunctureServices() { return getServicesByCategory("puncture"); }
export async function getRoadsideServices() { return getServicesByCategory("roadside"); }
export async function getMechanicServices() { return getServicesByCategory("mechanic"); }

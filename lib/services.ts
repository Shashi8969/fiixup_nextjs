// lib/services.ts
// Reads from normalized tables — service_faqs, service_testimonials, service_brands
// Return shape is IDENTICAL to before — zero component changes needed

import { cache } from "react";
import { supabase } from "./supabase";
import type { ServiceData } from "./models/service.model";

// ── Raw row + normalized child data → ServiceData ─────────────────────────────
function rowToService(row: any, faqs?: any[], testimonials?: any[], brands?: any[]): ServiceData {
  // Use normalized tables if provided, fall back to JSONB columns
  const resolvedFaqs = faqs?.length
    ? faqs.map((f: any) => ({ q: f.question, a: f.answer }))
    : (row.faqs ?? []);

  const resolvedTestimonials = testimonials?.length
    ? testimonials.map((t: any) => ({
        name:     t.name,
        location: t.location ?? "",
        vehicle:  t.vehicle ?? "",
        rating:   t.rating,
        review:   t.body,
        date:     t.date_label ?? "",
        verified: t.verified ?? true,
      }))
    : (row.testimonials ?? []);

  const resolvedCarBrands = brands?.length
    ? brands.filter((b: any) => b.vehicle_type === "car").map((b: any) => ({
        name:   b.brand_name,
        models: b.models ?? [],
      }))
    : (row.car_brands ?? []);

  const resolvedBikeBrands = brands?.length
    ? brands.filter((b: any) => b.vehicle_type === "bike").map((b: any) => ({
        name:   b.brand_name,
        models: b.models ?? [],
      }))
    : (row.bike_brands ?? []);

  return {
    slug:            row.slug,
    category:        row.category,
    title:           row.title,
    shortTitle:      row.short_title,
    tagline:         row.tagline,
    description:     row.description,
    price:           row.price,
    duration:        row.duration,
    icon:            row.icon,
    features:        row.features ?? [],
    pricing:         row.pricing ?? undefined,
    benefits:        row.benefits ?? undefined,
    testimonials:    resolvedTestimonials,
    guide:           row.guide ?? undefined,
    carBrands:       resolvedCarBrands,
    bikeBrands:      resolvedBikeBrands,
    relatedSlugs:    row.related_slugs ?? undefined,
    faqs:            resolvedFaqs,
    metaTitle:       row.meta_title,
    metaDescription: row.meta_description,
    metaKeywords:    row.meta_keywords,
  };
}

// ── Get all services (list pages — no child data needed) ──────────────────────
export async function getAllServices(): Promise<ServiceData[]> {
  const { data, error } = await supabase
    .from("services")
    .select(`
      slug, category, title, short_title, tagline,
      description, price, duration, icon, features,
      pricing, benefits, guide, related_slugs,
      meta_title, meta_description, meta_keywords,
      image_url, image_alt, og_image_url
    `)
    .order("category");

  if (error) {
    console.error("getAllServices error:", error.message);
    return [];
  }
  return (data ?? []).map((row) => rowToService(row));
}

// ── Get service by slug (full data with normalized child tables) ───────────────
export const getServiceBySlug = cache(async (slug: string): Promise<ServiceData | undefined> => {
  const { data, error } = await supabase
    .from("services")
    .select(`
      id, slug, category, title, short_title, tagline,
      description, price, duration, icon, features,
      pricing, benefits, guide, related_slugs,
      meta_title, meta_description, meta_keywords,
      image_url, image_alt, og_image_url,
      car_brands, bike_brands, faqs, testimonials
    `)
    .eq("slug", slug)
    .single();

  if (error || !data) return undefined;

  // Fetch normalized child tables in parallel
  const [faqsRes, testimonialsRes, brandsRes] = await Promise.all([
    supabase
      .from("service_faqs")
      .select("question, answer, sort_order")
      .eq("service_id", data.id)
      .order("sort_order"),
    supabase
      .from("service_testimonials")
      .select("name, location, vehicle, rating, body, date_label, verified, sort_order")
      .eq("service_id", data.id)
      .order("sort_order"),
    supabase
      .from("service_brands")
      .select("brand_name, models, vehicle_type, sort_order")
      .eq("service_id", data.id)
      .order("vehicle_type, sort_order"),
  ]);

  return rowToService(
    data,
    faqsRes.data ?? [],
    testimonialsRes.data ?? [],
    brandsRes.data ?? []
  );
});

// ── Get services by category ──────────────────────────────────────────────────
export async function getServicesByCategory(
  category: ServiceData["category"]
): Promise<ServiceData[]> {
  const { data, error } = await supabase
    .from("services")
    .select(`
      slug, category, title, short_title, tagline,
      description, price, duration, icon, features,
      pricing, benefits, meta_title, meta_description,
      image_url, image_alt
    `)
    .eq("category", category)
    .order("title");

  if (error) {
    console.error(`getServicesByCategory(${category}) error:`, error.message);
    return [];
  }
  return (data ?? []).map((row) => rowToService(row));
}

// ── Get multiple services by slug array ───────────────────────────────────────
export async function getServicesBySlugs(slugs: string[]): Promise<ServiceData[]> {
  if (!slugs?.length) return [];
  const { data, error } = await supabase
    .from("services")
    .select(`
      slug, category, title, short_title, tagline,
      description, price, duration, icon, features,
      meta_title, meta_description, image_url
    `)
    .in("slug", slugs);

  if (error) return [];
  return (data ?? []).map((row) => rowToService(row));
}

// ── Category helpers (unchanged API) ─────────────────────────────────────────
export async function getBikeServices()     { return getServicesByCategory("bike"); }
export async function getCarServices()      { return getServicesByCategory("car"); }
export async function getTowingServices()   { return getServicesByCategory("towing"); }
export async function getBatteryServices()  { return getServicesByCategory("battery"); }
export async function getPunctureServices() { return getServicesByCategory("puncture"); }
export async function getRoadsideServices() { return getServicesByCategory("roadside"); }
export async function getMechanicServices() { return getServicesByCategory("mechanic"); }

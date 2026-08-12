// lib/models/database.types.ts
// Single source of truth for all database types
// Matches your exact Supabase schema + cache.ts enriched shapes

// ─── CITIES ──────────────────────────────────────────────────────────────────
export interface City {
  id: string;
  slug: string;
  name: string;
  state: string;
  phone: string;
  whatsapp: string;
  email: string;
  hero_tagline: string;
  meta_title: string;
  meta_description: string;
  meta_keywords: string;
  about_heading: string;
  about_para1: string;
  about_para2: string;
  about_bullets: { heading: string; text: string }[];
  stats_label: string;
  services_section_heading: string;
  services_section_subtext: string;
  car_services_heading: string;
  bike_services_heading: string;
  testimonials_heading: string;
  testimonials_subtext: string;
  hero_image_url: string;
  hero_image_alt: string;
  about_image_url: string;
  about_image_alt: string;
  og_image_url: string;
  created_at: string;
  updated_at: string;

  // Legacy JSONB columns — still present on DB rows
  testimonials?: CityTestimonialRaw[];
  faq_categories?: CityFaqCategoryRaw[];
  city_service_highlights?: { title: string; description: string }[];

  // Enriched by getCityBySlug in cache.ts
  areas?: Area[];
  city_testimonials?: CityTestimonial[];
  city_faqs?: CityFaq[];
}

export interface CityTestimonialRaw {
  name: string;
  area?: string;
  vehicle?: string;
  rating: number;
  text: string;
  date?: string;
}

export interface CityFaqCategoryRaw {
  category: string;
  faqs: { q: string; a: string }[];
}

export interface AreaRaw {
  slug: string;
  name: string;
  highlight?: string;
}

// ─── AREAS ───────────────────────────────────────────────────────────────────
export interface Area {
  id: number;
  city_id: string;
  city_slug: string;
  slug: string;
  name: string;
  highlight: string;
  is_active: boolean;
  sort_order: number;
  latitude: number;
  longitude: number;
  vehicles_serviced?: number;
  local_insight?: string;
  created_at: string;
  updated_at: string;

  // SEO editorial content — authored in the admin's /areas/[id] editor,
  // read directly by fn_build_area_seo_page() (not rolled up from LS rows)
  seo_intro_heading?: string;
  seo_intro_body?: string;
  seo_sections?: unknown;
  seo_conclusion?: string;
  content_blocks?: unknown[];
  schema_types?: string[];
  schema_overrides?: Record<string, unknown>;
}

// ─── SERVICE CATEGORIES ──────────────────────────────────────────────────────
export interface ServiceCategory {
  id: string;
  slug: string;
  title: string;
  description: string;
  color: string;
  bg_color: string;
  icon: string;
  link: string;
  category_slug: string;
  tagline: string;
  benefits: unknown;
  pricing_summary: unknown;
  brands: unknown;
  guide: unknown;
  faqs: unknown;
  meta_title: string;
  meta_description: string;
  meta_keywords: string;
  created_at: string;
  updated_at: string;
}

// ─── SERVICES ────────────────────────────────────────────────────────────────
export interface Service {
  id: string;
  slug: string;
  category: string;
  service_category_id?: string;
  title: string;
  short_title: string;
  tagline: string;
  description: string;
  price: string;
  price_from_int?: number;
  price_to_int?: number | null;
  duration: string;
  icon: string;
  features: string[];
  benefits: ServiceBenefit[];
  pricing: ServicePricing;
  guide: ServiceGuide | null;
  meta_title: string;
  meta_description: string;
  meta_keywords: string;
  image_url: string;
  image_alt: string;
  og_image_url: string;
  created_at: string;
  updated_at: string;

  // Legacy JSONB columns — still on DB rows
  faqs?: { q: string; a: string }[];
  testimonials?: ServiceTestimonialRaw[];
  car_brands?: { name: string; models?: string[] }[];
  bike_brands?: { name: string; models?: string[] }[];
  related_slugs?: string[];

  // Enriched by getServiceBySlug in cache.ts
  service_testimonials?: ServiceTestimonial[];
  service_faqs?: ServiceFaq[];
  service_brands?: ServiceBrand[];
  related_services?: Service[];
}

export interface ServiceBenefit {
  icon: string;
  title: string;
  body: string;
}

export interface ServicePricing {
  rows: ServicePricingRow[];
  competitors: unknown[];
  disclaimer: string;
}

export interface ServicePricingRow {
  label: string;
  priceFrom: string;
  priceTo?: string;
  note?: string;
  highlight?: boolean;
}

export interface ServiceTestimonialRaw {
  name: string;
  location?: string;
  vehicle?: string;
  rating: number;
  review: string;
  date?: string;
  verified?: boolean;
}

export interface ServiceGuide {
  title: string;
  intro: string;
  sections: { heading: string; body: string; tips?: string[] }[];
  conclusion: string;
}

// ─── LOCATION SERVICES ───────────────────────────────────────────────────────
export interface LocationService {
  id: number;
  city_id: string;
  area_id: number | null;
  keyword_id: number | null;
  service_id?: string | null;
  city_slug: string;
  city_name: string;
  area_slug: string | null;
  area_name: string | null;
  service_slug: string;
  service_name: string;
  service_category: string;
  meta_title: string;
  meta_description: string;
  meta_keywords: string;
  canonical_url: string;
  hero_heading: string;
  hero_subheading: string;
  hero_badge_text: string;
  about_heading: string;
  about_para1: string;
  about_para2: string;
  about_bullets: { heading: string; text: string }[];
  service_highlights: { title: string; description: string }[];
  why_choose_points: { icon: string; title: string; desc: string }[];
  pricing_disclaimer: string;
  process_steps: unknown[];
  schema_aggregate_rating: number;
  schema_review_count: number;
  is_active: boolean;
  is_city_level: boolean;
  hero_image_url: string;
  hero_image_alt: string;
  og_image_url: string;
  seo_intro_heading?: string;
  seo_intro_body?: string;
  seo_sections?: unknown;
  seo_conclusion?: string;
  content_blocks?: unknown[];
  page_layout?: unknown[];
  created_at: string;
  updated_at: string;

  // Legacy JSONB columns — still on DB rows
  pricing_rows?: LsPricingRowRaw[];
  testimonials?: LsTestimonialRaw[];
  faqs?: { q: string; a: string }[];
  nearby_areas?: { name: string; slug: string }[];
  related_services?: { name: string; slug: string; category: string }[];

  // Enriched by enrichLS() in cache.ts
  ls_testimonials?: LsTestimonial[];
  ls_faqs?: LsFaq[];
  ls_pricing_rows?: LsPricingRow[];
  ls_nearby_areas?: LsNearbyArea[];
  ls_related_services?: LsRelatedService[];
}

export interface LsPricingRowRaw {
  label: string;
  priceFrom: number;
  priceTo?: number;
  note?: string;
  highlight?: boolean;
}

export interface LsTestimonialRaw {
  name: string;
  area?: string;
  vehicle?: string;
  rating: number;
  text: string;
  date?: string;
}

// ─── POSTS ───────────────────────────────────────────────────────────────────
export interface Post {
  id: string;
  slug: string;
  title: string;
  excerpt: string;
  content?: unknown;       // cast: (post.content as unknown as BlogSection[])
  author: string;
  author_role: string;
  date: string;
  read_time: string;
  category: string;
  featured: boolean;
  image: string;
  image_alt: string;
  related_service: string;
  meta_title: string;
  meta_description?: string;
  meta_keywords?: string;
  service_id?: string;
  service_category_id?: string;
  created_at?: string;
  updated_at?: string;

  // Legacy JSONB — still on DB rows
  tags?: string[];

  // Enriched by post queries — joined from post_tags → tags
post_tags?: { tags: Tag | Tag[] | null }[];
}

export interface BlogSection {
  type: "paragraph" | "heading" | "list" | "image" | "quote";
  content?: string;
  items?: string[];
  level?: number;
  url?: string;
  alt?: string;
  caption?: string;
}

// ─── TAGS ────────────────────────────────────────────────────────────────────
export interface Tag {
  id: string;
  slug: string;
  name: string;
  created_at: string;
}

// ─── NORMALIZED CHILD TABLES (Phase 1 migration) ─────────────────────────────

export interface CityTestimonial {
  id: string;
  city_id: string;
  name: string;
  area: string | null;
  vehicle: string | null;
  rating: number;
  body: string;
  date_label: string | null;
  source: string;
  external_id: string | null;
  verified: boolean;
  sort_order: number;
  created_at: string;
}

export interface CityFaq {
  id: string;
  city_id: string;
  category: string | null;
  question: string;
  answer: string;
  sort_order: number;
  created_at: string;
}

export interface CityServiceHighlight {
  id: string;
  city_id: string;
  title: string;
  description: string;
  sort_order: number;
  created_at: string;
}

export interface ServiceTestimonial {
  id: string;
  service_id: string;
  name: string;
  vehicle: string | null;
  location: string | null;
  rating: number;
  body: string;
  date_label: string | null;
  source: string;
  external_id: string | null;
  verified: boolean;
  sort_order: number;
  created_at: string;
}

export interface ServiceFaq {
  id: string;
  service_id: string;
  question: string;
  answer: string;
  sort_order: number;
  created_at: string;
}

export interface ServiceBrand {
  id: string;
  service_id: string;
  brand_name: string;
  models: string[] | null;
  vehicle_type: "car" | "bike";
  sort_order: number;
  created_at: string;
}

export interface LsTestimonial {
  id: string;
  location_service_id: number;
  name: string;
  area: string | null;
  vehicle: string | null;
  rating: number;
  body: string;
  date_label: string | null;
  source: string;
  external_id: string | null;
  verified: boolean;
  sort_order: number;
  created_at: string;
}

export interface LsFaq {
  id: string;
  location_service_id: number;
  question: string;
  answer: string;
  sort_order: number;
  created_at: string;
}

export interface LsPricingRow {
  id: string;
  location_service_id: number;
  label: string;
  price_from: number;
  price_to: number | null;
  note: string | null;
  highlight: boolean;
  sort_order: number;
  created_at: string;
}

export interface LsNearbyArea {
  id: string;
  location_service_id: number;
  area_id: number | null;
  name: string;
  slug: string;
  sort_order: number;
  created_at: string;
}

export interface LsRelatedService {
  id: string;
  location_service_id: number;
  service_id: string | null;
  name: string;
  slug: string;
  category: string | null;
  sort_order: number;
  created_at: string;
}

// ─── REVIEW SOURCES ──────────────────────────────────────────────────────────
export interface ReviewSource {
  id: string;
  source: "manual" | "trustpilot" | "google";
  external_id: string | null;
  service_id: string | null;
  ls_id: number | null;
  city_id: string | null;
  author_name: string;
  rating: number;
  body: string;
  vehicle: string | null;
  location: string | null;
  verified: boolean;
  published_at: string;
  raw_data: unknown;
  created_at: string;
  updated_at: string;
}

// ─── SERVICE IMAGES ───────────────────────────────────────────────────────────
export interface ServiceImage {
  id: string;
  service_id: string | null;
  ls_id: number | null;
  post_id: string | null;
  url: string;
  alt_text: string;
  caption: string | null;
  width: number | null;
  height: number | null;
  is_hero: boolean;
  sort_order: number;
  created_at: string;
}

// ─── HELPERS ─────────────────────────────────────────────────────────────────

export function normalizeFaq(
  faq: LsFaq | ServiceFaq | CityFaq
): { q: string; a: string } {
  return { q: faq.question, a: faq.answer };
}

export interface CityFaqCategory {
  category: string;
  faqs: CityFaq[];
}

export function groupCityFaqs(faqs: CityFaq[]): CityFaqCategory[] {
  const map = new Map<string, CityFaq[]>();
  for (const faq of faqs) {
    const cat = faq.category ?? "General";
    if (!map.has(cat)) map.set(cat, []);
    map.get(cat)!.push(faq);
  }
  return Array.from(map.entries()).map(([category, faqs]) => ({
    category,
    faqs,
  }));
}

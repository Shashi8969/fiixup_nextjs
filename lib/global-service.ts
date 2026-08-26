// lib/global-service.ts
import { cache } from 'react'
import { supabase } from '@/lib/supabase'
import { normalizeImageMeta, type ImageMeta } from '@/lib/seo-pages'

// lib/global-service.ts
export interface GlobalServicePage {
  id: number;
  service_slug: string;
  service_name: string;
  service_category: string;
  meta_title: string;
  meta_description: string;
  meta_keywords: string | null;
  canonical_url: string;
  og_image_url: string | null;
  hero_heading: string;
  hero_subheading: string;
  hero_badge_text: string;
  hero_image_url: string | null;
  hero_image_alt: string | null;
  hero_image_meta: ImageMeta | null;
  about_heading: string;
  about_para1: string;
  about_para2: string;
  about_bullets: Array<{ heading: string; text: string }>;
  service_highlights: Array<{ title: string; description: string }>;
  why_choose_points: Array<{ icon: string; title: string; desc: string }>;
  pricing_rows: Array<{ label: string; price_from: number; price_to?: number; note?: string; highlight?: boolean }>;
  pricing_intro: string;
  pricing_disclaimer: string;
  testimonials: Array<{ name: string; rating: number; text: string; vehicle: string; location: string; date: string }>;
  faqs: Array<{ q: string; a: string }>;
  related_services: Array<{ name: string; slug: string; category: string }>;
  schema_aggregate_rating: number;
  schema_review_count: number;
  schema_json: object | null;
  hero_stats: Array<{ value: string; label: string }>;
  service_duration: string | '20 min';
service_availability: string | '24/7';
}

type GlobalServicePricingRow = GlobalServicePage['pricing_rows'][number]
type GlobalServiceTestimonial = GlobalServicePage['testimonials'][number]
type GlobalServiceFaq = GlobalServicePage['faqs'][number]
type GlobalServiceRelatedService = GlobalServicePage['related_services'][number]

export const getGlobalServicePage = cache(async (serviceSlug: string): Promise<GlobalServicePage | null> => {
  const { data: page, error } = await supabase
    .from('global_service_pages')
    .select('*')
    .eq('service_slug', serviceSlug.toLowerCase())
    .eq('is_active', true)
    .single()
  
  if (error || !page) return null

  const [pricingRows, testimonials, faqs, relatedServices] = await Promise.all([
    supabase
      .from('gsp_pricing_rows')
      .select('label, price_from, price_to, note, highlight')
      .eq('gsp_id', page.id)
      .order('sort_order'),
    supabase
      .from('gsp_testimonials')
      .select('name, rating, body, vehicle, location, date_label')
      .eq('gsp_id', page.id)
      .order('sort_order'),
    supabase
      .from('gsp_faqs')
      .select('question, answer')
      .eq('gsp_id', page.id)
      .order('sort_order'),
    supabase
      .from('gsp_related_services')
      .select('name, slug, category')
      .eq('gsp_id', page.id)
      .order('sort_order'),
  ])

  const childError = pricingRows.error
    ?? testimonials.error
    ?? faqs.error
    ?? relatedServices.error

  if (childError) {
    console.error('getGlobalServicePage child rows error:', childError.message)
  }

  return {
    ...(page as GlobalServicePage),
    hero_image_meta: normalizeImageMeta(page.hero_image_meta),
    schema_aggregate_rating: Number(page.schema_aggregate_rating) || 4.9,
    schema_review_count: page.schema_review_count ?? 0,
    pricing_rows: (pricingRows.data ?? page.pricing_rows ?? []) as GlobalServicePricingRow[],
    testimonials: (testimonials.data ?? []).map((row): GlobalServiceTestimonial => ({
      name: row.name,
      rating: row.rating,
      text: row.body,
      vehicle: row.vehicle ?? '',
      location: row.location ?? '',
      date: row.date_label ?? '',
    })),
    faqs: (faqs.data ?? []).map((row): GlobalServiceFaq => ({
      q: row.question,
      a: row.answer,
    })),
    related_services: (relatedServices.data ?? page.related_services ?? []) as GlobalServiceRelatedService[],
  }
})

export async function getAllGlobalServiceSlugs(): Promise<string[]> {
  const { data } = await supabase
    .from('global_service_pages')
    .select('service_slug')
    .eq('is_active', true)
  return data?.map(d => d.service_slug) ?? []
}

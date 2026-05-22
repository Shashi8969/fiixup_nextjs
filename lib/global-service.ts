// lib/global-service.ts
import { cache } from 'react'
import { supabase } from '@/lib/supabase'

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
}

// ... rest of the file remains the same

export const getGlobalServicePage = cache(async (serviceSlug: string): Promise<GlobalServicePage | null> => {
  const { data, error } = await supabase
    .from('global_service_pages')
    .select('*')
    .eq('service_slug', serviceSlug)
    .eq('is_active', true)
    .single()
  
  if (error || !data) return null
  return data as GlobalServicePage
})

export async function getAllGlobalServiceSlugs(): Promise<string[]> {
  const { data } = await supabase
    .from('global_service_pages')
    .select('service_slug')
    .eq('is_active', true)
  return data?.map(d => d.service_slug) ?? []
}
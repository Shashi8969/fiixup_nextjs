// FIIXUP.IN — lib/cache.ts

import { unstable_cache } from 'next/cache'
import { supabase } from '@/lib/supabase'
import type {
  City, Area, Service, ServiceCategory,
  LocationService, Post, Tag,
  CityTestimonial, CityFaq, CityServiceHighlight,
} from '@/lib/models/database.types'

const CACHE_TTL = 3600 // 1 hour in seconds

// ─────────────────────────────────────────────
// CITIES
// ─────────────────────────────────────────────

export const getAllCities = unstable_cache(
  async (): Promise<City[]> => {
    const { data, error } = await supabase
      .from('cities')
      .select(`
        id, slug, name, state, phone, whatsapp, email,
        hero_tagline, meta_title, meta_description, meta_keywords,
        about_heading, about_para1, about_para2, about_bullets,
        stats_label, services_section_heading, services_section_subtext,
        car_services_heading, bike_services_heading,
        testimonials_heading, testimonials_subtext,
        hero_image_url, hero_image_alt, about_image_url, about_image_alt,
        og_image_url, created_at, updated_at
      `)
      .order('name')
    if (error) { console.error('[getAllCities]', error.message); return [] }
    return (data ?? []) as City[]
  },
  ['all-cities'],
  { revalidate: CACHE_TTL, tags: ['cities'] }
)

export const getCityBySlug = unstable_cache(
  async (slug: string | undefined): Promise<City | undefined> => {
    // CRITICAL: Always guard undefined
    if (!slug) return undefined

    const { data: city, error } = await supabase
      .from('cities')
      .select(`
        id, slug, name, state, phone, whatsapp, email,
        hero_tagline, meta_title, meta_description, meta_keywords,
        about_heading, about_para1, about_para2, about_bullets,
        stats_label, services_section_heading, services_section_subtext,
        car_services_heading, bike_services_heading,
        testimonials_heading, testimonials_subtext,
        hero_image_url, hero_image_alt, about_image_url, about_image_alt,
        og_image_url, created_at, updated_at
      `)
      .eq('slug', slug.toLowerCase())
      .single()

    if (error || !city) return undefined

    // Run all related queries in PARALLEL — not sequential
    const [areas, testimonials, faqs, highlights] = await Promise.all([
      getCityAreas(city.id),
      getCityTestimonials(city.id),
      getCityFaqs(city.id),
      getCityServiceHighlights(city.id),
    ])

    return {
      ...city,
      about_bullets: (city.about_bullets ?? []) as City['about_bullets'],
      areas,
      city_testimonials: testimonials,
      city_faqs: faqs,
      city_service_highlights: highlights,
    } as City
  },
  ['city-by-slug'],
  { revalidate: CACHE_TTL, tags: ['cities'] }
)

export const getCityAreas = unstable_cache(
  async (cityId: string): Promise<Area[]> => {
    const { data, error } = await supabase
      .from('areas')
      .select('*')
      .eq('city_id', cityId)
      .eq('is_active', true)
      .order('sort_order')
    if (error) { console.error('[getCityAreas]', error.message); return [] }
    return (data ?? []) as Area[]
  },
  ['city-areas'],
  { revalidate: CACHE_TTL, tags: ['areas'] }
)

export const getCityTestimonials = unstable_cache(
  async (cityId: string): Promise<CityTestimonial[]> => {
    const { data, error } = await supabase
      .from('city_testimonials')
      .select('*')
      .eq('city_id', cityId)
      .order('sort_order')
    if (error) { console.error('[getCityTestimonials]', error.message); return [] }
    return (data ?? []) as CityTestimonial[]
  },
  ['city-testimonials'],
  { revalidate: CACHE_TTL, tags: ['cities'] }
)

export const getCityFaqs = unstable_cache(
  async (cityId: string): Promise<CityFaq[]> => {
    const { data, error } = await supabase
      .from('city_faqs')
      .select('*')
      .eq('city_id', cityId)
      .order('sort_order')
    if (error) { console.error('[getCityFaqs]', error.message); return [] }
    return (data ?? []) as CityFaq[]
  },
  ['city-faqs'],
  { revalidate: CACHE_TTL, tags: ['cities'] }
)

export const getCityServiceHighlights = unstable_cache(
  async (cityId: string): Promise<CityServiceHighlight[]> => {
    const { data, error } = await supabase
      .from('city_service_highlights')
      .select('*')
      .eq('city_id', cityId)
      .order('sort_order')
    if (error) { console.error('[getCityServiceHighlights]', error.message); return [] }
    return (data ?? []) as CityServiceHighlight[]
  },
  ['city-highlights'],
  { revalidate: CACHE_TTL, tags: ['cities'] }
)

// ─────────────────────────────────────────────
// SERVICES
// ─────────────────────────────────────────────

export const getAllServices = unstable_cache(
  async (): Promise<Service[]> => {
    const { data, error } = await supabase
      .from('services')
      .select(`
        id, slug, category, service_category_id,
        title, short_title, tagline, description,
        price, duration, icon, features,
        pricing, benefits, guide,
        meta_title, meta_description, meta_keywords,
        image_url, image_alt, og_image_url,
        created_at, updated_at
      `)
      .order('category')
    if (error) { console.error('[getAllServices]', error.message); return [] }
    return (data ?? []) as Service[]
  },
  ['all-services'],
  { revalidate: CACHE_TTL, tags: ['services'] }
)

export const getServiceBySlug = unstable_cache(
  async (slug: string): Promise<Service | undefined> => {
    const { data, error } = await supabase
      .from('services')
      .select(`
        id, slug, category, service_category_id,
        title, short_title, tagline, description,
        price, duration, icon, features,
        pricing, benefits, guide,
        meta_title, meta_description, meta_keywords,
        image_url, image_alt, og_image_url,
        created_at, updated_at
      `)
      .eq('slug', slug)
      .single()

    if (error || !data) return undefined

    // Parallel fetch all related data
    const [testimonials, faqs, brands, relations] = await Promise.all([
      supabase.from('service_testimonials').select('*').eq('service_id', data.id).order('sort_order'),
      supabase.from('service_faqs').select('*').eq('service_id', data.id).order('sort_order'),
      supabase.from('service_brands').select('*').eq('service_id', data.id).order('vehicle_type,sort_order'),
      supabase.from('service_relations')
        .select('related_service_id, services!service_relations_related_service_id_fkey(slug,title,short_title,category)')
        .eq('service_id', data.id),
    ])

    return {
      ...data,
      features:             (data.features ?? []) as string[],
      benefits:             (data.benefits ?? []) as Service['benefits'],
      service_testimonials: (testimonials.data ?? []) as Service['service_testimonials'],
      service_faqs:         (faqs.data ?? [])         as Service['service_faqs'],
      service_brands:       (brands.data ?? [])        as Service['service_brands'],
      related_services:     (relations.data ?? []).map((r: any) => r.services).filter(Boolean),
    } as Service
  },
  ['service-by-slug'],
  { revalidate: CACHE_TTL, tags: ['services'] }
)

export const getServicesByCategory = unstable_cache(
  async (category: string): Promise<Service[]> => {
    const { data, error } = await supabase
      .from('services')
      .select('id, slug, category, title, short_title, tagline, price, duration, icon, features, meta_title, image_url')
      .eq('category', category)
      .order('title')
    if (error) { console.error('[getServicesByCategory]', error.message); return [] }
    return (data ?? []) as Service[]
  },
  ['services-by-category'],
  { revalidate: CACHE_TTL, tags: ['services'] }
)

// ─────────────────────────────────────────────
// SERVICE CATEGORIES
// ─────────────────────────────────────────────

export const getAllServiceCategories = unstable_cache(
  async (): Promise<ServiceCategory[]> => {
    const { data, error } = await supabase
      .from('service_categories')
      .select('*')
      .order('title')
    if (error) { console.error('[getAllServiceCategories]', error.message); return [] }
    return (data ?? []) as ServiceCategory[]
  },
  ['all-service-categories'],
  { revalidate: CACHE_TTL, tags: ['service-categories'] }
)

// ─────────────────────────────────────────────
// LOCATION SERVICES
// ─────────────────────────────────────────────

const LS_SELECT = `
  id, city_id, area_id, keyword_id, service_id,
  service_slug, service_name, service_category,
  meta_title, meta_description, meta_keywords,
  canonical_url, hero_heading, hero_subheading, hero_badge_text,
  about_heading, about_para1, about_para2, about_bullets,
  service_highlights, why_choose_points,
  pricing_disclaimer, process_steps,
  schema_aggregate_rating, schema_review_count,
  is_active, is_city_level,
  hero_image_url, hero_image_alt, og_image_url,
  created_at, updated_at
`

export const getCityLocationService = unstable_cache(
  async (citySlug: string, serviceSlug: string): Promise<LocationService | null> => {
    const { data: city } = await supabase
      .from('cities').select('id').eq('slug', citySlug.toLowerCase()).single()
    if (!city) return null

    const { data: ls, error } = await supabase
      .from('location_services')
      .select(LS_SELECT)
      .eq('city_id', city.id)
      .eq('service_slug', serviceSlug)
      .eq('is_city_level', true)
      .eq('is_active', true)
      .single()

    if (error || !ls) return null
    return enrichLS(ls as LocationService)
  },
  ['city-location-service'],
  { revalidate: CACHE_TTL, tags: ['location-services'] }
)

export const getAreaLocationService = unstable_cache(
  async (citySlug: string, areaSlug: string, serviceSlug: string): Promise<LocationService | null> => {
    // Single query gets city + area + location service in one round trip
    const { data: city } = await supabase
      .from('cities').select('id').eq('slug', citySlug.toLowerCase()).single()
    if (!city) return null

    const { data: area } = await supabase
      .from('areas').select('id').eq('city_id', city.id).eq('slug', areaSlug).single()
    if (!area) return null

    const { data: ls, error } = await supabase
      .from('location_services')
      .select(LS_SELECT)
      .eq('city_id', city.id)
      .eq('area_id', area.id)
      .eq('service_slug', serviceSlug)
      .eq('is_active', true)
      .single()

    if (error || !ls) return null
    return enrichLS(ls as LocationService)
  },
  ['area-location-service'],
  { revalidate: CACHE_TTL, tags: ['location-services'] }
)

// ─────────────────────────────────────────────
// FIX: Dual-purpose route — one lookup not two
// Checks if areaSlug is a location service OR an area hub
// Returns type so page.tsx knows which to render
// ─────────────────────────────────────────────

export const getCityAreaPageData = unstable_cache(
  async (citySlug: string, areaSlug: string): Promise<
    | { type: 'location_service'; data: LocationService }
    | { type: 'area_hub';         data: Area | null }
    | { type: 'not_found' }
  > => {
    const { data: city } = await supabase
      .from('cities').select('id').eq('slug', citySlug.toLowerCase()).single()
    if (!city) return { type: 'not_found' }

    // Check BOTH in parallel — whichever returns data wins
    const [lsResult, areaResult] = await Promise.all([
      supabase
        .from('location_services')
        .select(LS_SELECT)
        .eq('city_id', city.id)
        .eq('service_slug', areaSlug)
        .eq('is_city_level', true)
        .eq('is_active', true)
        .maybeSingle(),
      supabase
        .from('areas')
        .select('*')
        .eq('city_id', city.id)
        .eq('slug', areaSlug)
        .eq('is_active', true)
        .maybeSingle(),
    ])

    if (lsResult.data) {
      const enriched = await enrichLS(lsResult.data as LocationService)
      return { type: 'location_service', data: enriched }
    }
    if (areaResult.data) {
      return { type: 'area_hub', data: areaResult.data as Area }
    }
    return { type: 'not_found' }
  },
  ['city-area-page-data'],
  { revalidate: CACHE_TTL, tags: ['location-services', 'areas'] }
)

async function enrichLS(ls: LocationService): Promise<LocationService> {
  // All related tables fetched in PARALLEL — not sequential
  const [testimonials, faqs, pricingRows, nearbyAreas, relatedServices] =
    await Promise.all([
      supabase.from('ls_testimonials').select('*').eq('location_service_id', ls.id).order('sort_order'),
      supabase.from('ls_faqs').select('*').eq('location_service_id', ls.id).order('sort_order'),
      supabase.from('ls_pricing_rows').select('*').eq('location_service_id', ls.id).order('sort_order'),
      supabase.from('ls_nearby_areas').select('*').eq('location_service_id', ls.id).order('sort_order'),
      supabase.from('ls_related_services').select('*').eq('location_service_id', ls.id).order('sort_order'),
    ])

  return {
    ...ls,
    about_bullets:       (ls.about_bullets      ?? []) as LocationService['about_bullets'],
    service_highlights:  (ls.service_highlights  ?? []) as LocationService['service_highlights'],
    why_choose_points:   (ls.why_choose_points   ?? []) as LocationService['why_choose_points'],
    process_steps:       (ls.process_steps       ?? []) as LocationService['process_steps'],
    ls_testimonials:     testimonials.data  ?? [],
    ls_faqs:             faqs.data          ?? [],
    ls_pricing_rows:     pricingRows.data   ?? [],
    ls_nearby_areas:     nearbyAreas.data   ?? [],
    ls_related_services: relatedServices.data ?? [],
  } as LocationService
}

export const getAllLocationServices = unstable_cache(
  async () => {
    const { data, error } = await supabase
      .from('location_services')
      .select(`
        service_slug, canonical_url, is_active, is_city_level,
        city_id, area_id,
        cities!inner(slug),
        areas(slug)
      `)
      .eq('is_active', true)
    if (error) { console.error('[getAllLocationServices]', error.message); return [] }
    return (data ?? []).map((row: any) => ({
      citySlug:     row.cities?.slug ?? '',
      areaSlug:     row.areas?.slug ?? null,
      serviceSlug:  row.service_slug,
      canonicalUrl: row.canonical_url,
    }))
  },
  ['all-location-services'],
  { revalidate: CACHE_TTL, tags: ['location-services'] }
)

// ─────────────────────────────────────────────
// POSTS
// ─────────────────────────────────────────────

export const getAllPosts = unstable_cache(
  async (): Promise<Post[]> => {
    const { data, error } = await supabase
      .from('posts')
      .select(`
        id, slug, title, excerpt, author, author_role,
        date, read_time, category, featured,
        image, image_alt, related_service,
        meta_title, meta_description, meta_keywords,
        service_id, service_category_id,
        created_at, updated_at,
        post_tags(tags(id, slug, name))
      `)
      .order('created_at', { ascending: false })
    if (error) { console.error('[getAllPosts]', error.message); return [] }
    return (data ?? []) as Post[]
  },
  ['all-posts'],
  { revalidate: CACHE_TTL, tags: ['posts'] }
)

export const getFeaturedPosts = unstable_cache(
  async (limit = 3): Promise<Post[]> => {
    const { data, error } = await supabase
      .from('posts')
      .select(`
        id, slug, title, excerpt, author, author_role,
        date, read_time, category, featured,
        image, image_alt, related_service,
        meta_title, meta_description,
        post_tags(tags(id, slug, name))
      `)
      .eq('featured', true)
      .order('created_at', { ascending: false })
      .limit(limit)
    if (error) { console.error('[getFeaturedPosts]', error.message); return [] }
    return (data ?? []) as Post[]
  },
  ['featured-posts'],
  { revalidate: CACHE_TTL, tags: ['posts'] }
)

export const getPostBySlug = unstable_cache(
  async (slug: string): Promise<Post | undefined> => {
    const { data, error } = await supabase
      .from('posts')
      .select(`
        id, slug, title, excerpt, content,
        author, author_role, date, read_time,
        category, featured, image, image_alt,
        related_service, meta_title, meta_description, meta_keywords,
        service_id, service_category_id,
        created_at, updated_at,
        post_tags(tags(id, slug, name))
      `)
      .eq('slug', slug)
      .single()
    if (error || !data) return undefined
    return data as Post
  },
  ['post-by-slug'],
  { revalidate: CACHE_TTL, tags: ['posts'] }
)

// ─────────────────────────────────────────────
// TAGS
// ─────────────────────────────────────────────

export const getAllTags = unstable_cache(
  async (): Promise<Tag[]> => {
    const { data, error } = await supabase
      .from('tags').select('*').order('name')
    if (error) return []
    return (data ?? []) as Tag[]
  },
  ['all-tags'],
  { revalidate: CACHE_TTL, tags: ['posts'] }
)

// ─────────────────────────────────────────────
// REDIRECTS (short cache — needs fast updates)
// ─────────────────────────────────────────────

export const getAllRedirects = unstable_cache(
  async () => {
    const { data, error } = await supabase
      .from('redirects')
      .select('source, destination, is_permanent')
      .eq('is_active', true)
    if (error) { console.error('[getAllRedirects]', error.message); return [] }
    return data ?? []
  },
  ['all-redirects'],
  { revalidate: 300, tags: ['redirects'] } // 5 min — matches proxy.ts cache TTL
)

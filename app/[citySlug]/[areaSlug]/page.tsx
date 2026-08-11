// app/[citySlug]/[areaSlug]/page.tsx
// Dual-purpose: city-service page OR area hub
// Both now read from seo_pages (1 query): city/area-service pages via getPageByPath,
// area hubs via getAreaHubPage (page_type='area_hub', built by fn_build_area_seo_page).
// The cities-table branch at the bottom is a last-resort fallback only.

import type { Metadata } from 'next'
import { notFound } from 'next/navigation'
import { getPageByPath } from '@/lib/seo-pages'
import { getAllCities, getCityBySlug, getAreaBySlug } from '@/lib/cities'
import { getAllCityServiceSlugs, getAreaServices } from '@/lib/locationServices'
import { getAreaHubPage } from '@/lib/areaPages'
import { areaPageSchema, locationServiceSchema, jsonLdString } from '@/lib/schema'
import { LocationServicePage } from '@/components/location-service/LocationServicePage'
import { AreaHero } from '@/components/city/AreaHero'
import { CityAbout } from '@/components/city/CityAbout'
import { CityContact } from '@/components/city/CityContact'
import { CityFAQ } from '@/components/city/CityFAQ'
import { AreaServices } from '@/components/city/AreaServices'
import { AreaAbout } from '@/components/city/AreaAbout'
import { AreaSeoContent } from '@/components/city/AreaSeoContent'
import { AreaFAQ } from '@/components/city/AreaFAQ'
import { AreaTestimonials } from '@/components/city/AreaTestimonials'
import { AreaRelatedPosts } from '@/components/city/AreaRelatedPosts'
import { AreaContact } from '@/components/city/AreaContact'
import { SITE_URL } from '@/lib/constants'
import { JsonLd } from '@/components/seo/JsonLd'
import { metadataFromSeoPage, metadataFromBasicSeo } from '@/lib/seo/metadata'

export const revalidate = 3600
export const dynamicParams = true

type Params = Promise<{ citySlug: string; areaSlug: string }>

export async function generateStaticParams() {
  const cities = await getAllCities()
  const params: { citySlug: string; areaSlug: string }[] = []

  for (const city of cities) {
    // Area hubs
    city.areas?.forEach((area: any) => {
      params.push({
        citySlug: city.slug,
        areaSlug: typeof area === 'string'
          ? area.toLowerCase().replace(/ /g, '-')
          : area.slug,
      })
    })
    // City-level service pages
    const serviceSlugs = await getAllCityServiceSlugs(city.slug)
    for (const serviceSlug of serviceSlugs) {
      params.push({ citySlug: city.slug, areaSlug: serviceSlug })
    }
  }
  return params
}

export async function generateMetadata({ params }: { params: Params }): Promise<Metadata> {
  const { citySlug, areaSlug } = await params

  // Try seo_pages first (city-level service). This keeps metadata, canonical, OG,
  // Twitter and robots/noindex signals consistent with the CMS cache.
  // page_type check matters: getPageByPath matches by url_path alone, and an
  // area_hub row lives at this same url_path — it must fall through to the
  // area-hub branch below, not be treated as a service page.
  const page = await getPageByPath(`/${citySlug}/${areaSlug}`)
  if (page && page.page_type !== 'area_hub') return metadataFromSeoPage(page, `/${citySlug}/${areaSlug}`)

  // Area hub (real per-area content, see fn_build_area_seo_page)
  const areaHub = await getAreaHubPage(citySlug, areaSlug)
  if (areaHub) {
    return metadataFromBasicSeo({
      title: areaHub.seo.meta_title,
      description: areaHub.seo.meta_description,
      canonical: areaHub.seo.canonical_url,
      path: `/${citySlug}/${areaSlug}`,
      ogImage: areaHub.seo.og_image_url,
      ogImageAlt: areaHub.seo.meta_title,
      index: areaHub.seo.is_indexed,
    })
  }

  // Last-resort fallback: area hub metadata
  const city = await getCityBySlug(citySlug)
  if (!city) return {}

  const area = city.areas?.find((a: any) =>
    typeof a === 'string'
      ? a.toLowerCase().replace(/ /g, '-') === areaSlug
      : a.slug === areaSlug
  )
  if (!area) return {}

  const areaName = typeof area === 'string' ? area : area.name
  const title = `24/7 Doorstep Car & Bike Repair in ${areaName}, ${city.name}`
  const description = `Professional mechanic at your doorstep in ${areaName}. Emergency car breakdown and bike service in ${city.name}.`

  return metadataFromBasicSeo({
    title,
    description,
    canonical: `${SITE_URL}/${city.slug}/${areaSlug}`,
    path: `/${city.slug}/${areaSlug}`,
    ogImageAlt: title,
  })
}

export default async function CityAreaPage({ params }: { params: Params }) {
  const { citySlug, areaSlug } = await params

  // Try seo_pages first — city-level service page (1 query)
  // page_type check matters: an area_hub row lives at this same url_path and
  // must fall through to the area-hub branch below, not be parsed as LS data.
  const page = await getPageByPath(`/${citySlug}/${areaSlug}`)
  if (page && page.page_type !== 'area_hub') {
    const data = page.page_data
    // Defense in depth: fn_build_ls_seo_page() always populates schema_json
    // on save, but if a row somehow slips through with it null, fall back
    // to a live-generated equivalent instead of shipping zero structured data.
    const fallbackSchema = page.schema_json ?? locationServiceSchema({
      serviceName:     data.serviceName,
      serviceSlug:     data.serviceSlug,
      serviceCategory: data.serviceCategory,
      canonicalUrl:    page.canonical_url,
      heroHeading:     data.heroHeading,
      aboutPara1:      data.aboutPara1,
      cityName:        data.cityName,
      citySlug:        data.citySlug,
      cityState:       data.city?.state,
      pricingRows:     data.pricingRows ?? [],
      faqs:            data.faqs ?? [],
      nearbyAreas:     data.nearbyAreas ?? [],
      cityLat:         data.city?.latitude,
      cityLng:         data.city?.longitude,
      cityPhone:       data.city?.phone,
      cityEmail:       data.city?.email,
      cityPostalCode:  data.city?.postalCode,
    })
    return (
      <>
        <JsonLd data={fallbackSchema} />
        <LocationServicePage
          data={{
            id:                    0,
            citySlug:              data.citySlug,
            cityName:              data.cityName,
            areaSlug:              data.areaSlug,
            areaName:              data.areaName,
            isCityLevel:           data.isCityLevel,
            serviceSlug:           data.serviceSlug,
            serviceName:           data.serviceName,
            serviceCategory:       data.serviceCategory,
            metaTitle:             page.meta_title,
            metaDescription:       page.meta_description,
            metaKeywords:          page.meta_keywords ?? '',
            canonicalUrl:          page.canonical_url,
            heroHeading:           data.heroHeading,
            heroSubheading:        data.heroSubheading,
            heroBadgeText:         data.heroBadgeText,
            aboutHeading:          data.aboutHeading,
            aboutPara1:            data.aboutPara1,
            aboutPara2:            data.aboutPara2,
            aboutBullets:          data.aboutBullets ?? [],
            serviceHighlights:     data.serviceHighlights ?? [],
            whyChoosePoints:       data.whyChoosePoints ?? [],
            pricingRows:           data.pricingRows ?? [],
            pricingDisclaimer:     data.pricingDisclaimer,
            testimonials:          data.testimonials ?? [],
            faqs:                  data.faqs ?? [],
            nearbyAreas:           data.nearbyAreas ?? [],
            relatedServices:       data.relatedServices ?? [],
            seoIntroHeading:       data.seoIntroHeading,
            seoIntroBody:          data.seoIntroBody,
            seoSections:           data.seoSections ?? [],
            seoConclusion:         data.seoConclusion,
            contentBlocks:         data.contentBlocks ?? [],
            heroImageUrl:          data.heroImageUrl,
            heroImageAlt:          data.heroImageAlt,
            pageLayout:            data.pageLayout ?? [],
            schemaAggregateRating: data.schemaAggregateRating,
            schemaReviewCount:     data.schemaReviewCount,
            displayLocation:       data.displayLocation,
            locationHeading:       data.locationHeading,
          }}
          city={{
            slug:     data.city.slug,
            name:     data.city.name,
            phone:    data.city.phone,
            whatsapp: data.city.whatsapp,
          } as any}
          breadcrumbs={page.breadcrumbs_json ?? []}
        />
      </>
    )
  }

  // Area hub (real per-area content, rolled up from location_services/ls_faqs/
  // ls_testimonials by fn_build_area_seo_page — see lib/areaPages.ts)
  const areaHub = await getAreaHubPage(citySlug, areaSlug)
  if (areaHub) {
    const { data } = areaHub
    const schemas = areaPageSchema({
      cityName:  data.cityName,
      citySlug:  data.citySlug,
      cityState: data.cityState ?? 'India',
      cityPhone: data.cityPhone,
      cityEmail: data.cityEmail ?? '',
      cityLat:   data.latitude ?? 0,
      cityLng:   data.longitude ?? 0,
      areaName:  data.areaName,
      areaSlug:  data.areaSlug,
      faqs:      data.faqs,
    })

    return (
      <>
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: jsonLdString(schemas) }}
        />
        <AreaHero
          city={{ name: data.cityName, phone: data.cityPhone, whatsapp: data.cityWhatsapp } as any}
          areaName={data.areaName}
        />
        <AreaServices
          citySlug={citySlug}
          areaSlug={areaSlug}
          areaName={data.areaName}
          services={await getAreaServices(citySlug, areaSlug)}
        />
        <AreaAbout data={data} />
        <AreaTestimonials data={data} />
        <AreaSeoContent data={data} />
        <AreaFAQ data={data} />
        <AreaRelatedPosts data={data} />
        <AreaContact data={data} />
      </>
    )
  }

  // Last-resort fallback (only reached if fn_build_area_seo_page hasn't run yet
  // for this area — e.g. a brand-new area before its first save/trigger fires)
  const city = await getCityBySlug(citySlug)
  if (!city) return notFound()

  const area = city.areas?.find((a: any) =>
    typeof a === 'string'
      ? a.toLowerCase().replace(/ /g, '-') === areaSlug
      : a.slug === areaSlug
  )
  if (!area) return notFound()

  const areaName     = typeof area === 'string' ? area : area.name
  const areaHighlight = typeof area === 'string' ? '' : (area as any).highlight ?? ''
  const allFaqs      = city.faqCategories?.flatMap((cat: any) => cat.faqs) ?? []
  const areaRow      = await getAreaBySlug(citySlug, areaSlug)
  const areaServices = await getAreaServices(citySlug, areaSlug)

  const areaCity = {
    ...city,
    name:         areaName,
    heroTagline:  `Expert Mechanics in ${areaName}`,
    aboutHeading: `Trusted Doorstep Auto Repair in ${areaName}`,
    aboutPara1:   areaHighlight || `Fiixup provides 24/7 doorstep car and bike repair in ${areaName}, ${city.name}.`,
  }

  const schemas = areaPageSchema({
    cityName:   city.name,
    citySlug,
    cityState:  (city as any).state ?? 'India',
    cityPhone:  city.phone ?? '',
    cityEmail:  city.email ?? '',
    cityLat:    areaRow?.latitude ? Number(areaRow.latitude) : 0,
    cityLng:    areaRow?.longitude ? Number(areaRow.longitude) : 0,
    areaName,
    areaSlug,
    faqs:        allFaqs,
  })

  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: jsonLdString(schemas) }}
      />
      <AreaHero city={city} areaName={areaName} />
      <AreaServices
        citySlug={citySlug}
        areaSlug={areaSlug}
        areaName={areaName}
        services={areaServices}
      />
      <CityAbout city={areaCity} />
      <CityFAQ city={city} />
      <CityContact city={city} />
    </>
  )
}

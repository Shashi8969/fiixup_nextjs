// app/[citySlug]/[areaSlug]/[serviceSlug]/page.tsx
// Reads from seo_pages — ONE Supabase query per render
// generateMetadata + Page component share the same cached result

import type { Metadata } from 'next'
import { notFound } from 'next/navigation'
import { getPageByPath, getAllActiveUrlPaths } from '@/lib/seo-pages'
import { LocationServicePage } from '@/components/location-service/LocationServicePage'
import { JsonLd } from '@/components/seo/JsonLd'
import { locationServiceSchema } from '@/lib/schema'
import { metadataFromSeoPage } from '@/lib/seo/metadata'

export const revalidate = 3600
export const dynamicParams = true

type Params = Promise<{ citySlug: string; areaSlug: string; serviceSlug: string }>

// ONE query at build time — replaces the old N+1 city loop
export async function generateStaticParams() {
  const paths = await getAllActiveUrlPaths('area_service')
  return paths.flatMap((p) => {
    const parts = p.split('/').filter(Boolean)
    if (parts.length !== 3) return []

    const [citySlug, areaSlug, serviceSlug] = parts
    if (!citySlug || !areaSlug || !serviceSlug) return []

    return [{ citySlug, areaSlug, serviceSlug }]
  })
}

// generateMetadata — React.cache means NO extra DB call
export async function generateMetadata({ params }: { params: Params }): Promise<Metadata> {
  const { citySlug, areaSlug, serviceSlug } = await params
  const page = await getPageByPath(`/${citySlug}/${areaSlug}/${serviceSlug}`)
  if (!page) return {}

  return metadataFromSeoPage(page, `/${citySlug}/${areaSlug}/${serviceSlug}`)
}

// Page — same cached result, zero extra DB query
export default async function AreaServicePage({ params }: { params: Params }) {
  const { citySlug, areaSlug, serviceSlug } = await params
  const page = await getPageByPath(`/${citySlug}/${areaSlug}/${serviceSlug}`)
  if (!page) return notFound()

  const data = page.page_data

  // Defense in depth: fn_build_ls_seo_page() always populates schema_json on
  // save, but if a row somehow slips through with it null, fall back to a
  // live-generated equivalent instead of shipping zero structured data.
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
    areaName:        data.areaName,
    areaSlug:        data.areaSlug,
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
      {/* Schema precomputed in PostgreSQL; live fallback only if that's ever null */}
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
          seoIntroHeading:       data.seoIntroHeading,
          seoIntroBody:          data.seoIntroBody,
          seoSections:           data.seoSections ?? [],
          seoConclusion:         data.seoConclusion,
          contentBlocks:         data.contentBlocks ?? [],
          heroImageUrl:          data.heroImageUrl,
          heroImageAlt:          data.heroImageAlt,
          heroImageMeta:         data.heroImageMeta,
          pageLayout:            data.pageLayout ?? [],
          testimonials:          data.testimonials ?? [],
          faqs:                  data.faqs ?? [],
          nearbyAreas:           data.nearbyAreas ?? [],
          relatedServices:       data.relatedServices ?? [],
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

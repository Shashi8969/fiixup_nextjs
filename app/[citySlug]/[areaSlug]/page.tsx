// app/[citySlug]/[areaSlug]/page.tsx
// Dual-purpose: city-service page OR area hub
// City-service pages now read from seo_pages (1 query)
// Area hub pages still read from cities table (unchanged)

import type { Metadata } from 'next'
import { notFound } from 'next/navigation'
import { getPageByPath } from '@/lib/seo-pages'
import { getAllCities, getCityBySlug } from '@/lib/cities'
import { getAllCityServiceSlugs } from '@/lib/locationServices'
import { areaPageSchema, CITY_DATA, type CityKey } from '@/lib/schema'
import { LocationServicePage } from '@/components/location-service/LocationServicePage'
import { CityHero } from '@/components/city/CityHero'
import { CityAbout } from '@/components/city/CityAbout'
import { CityContact } from '@/components/city/CityContact'
import { CityFAQ } from '@/components/city/CityFAQ'
import { CityServices } from '@/components/city/CityServices'
import { SITE_URL } from '@/lib/constants'

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

  // Try seo_pages first (city-level service)
  const page = await getPageByPath(`/${citySlug}/${areaSlug}`)
  if (page) {
    return {
      title:       page.meta_title,
      description: page.meta_description,
      keywords:    page.meta_keywords ?? undefined,
      alternates:  { canonical: page.canonical_url },
      openGraph: {
        title:       page.meta_title,
        description: page.meta_description,
        url:         page.canonical_url,
        type:        'website',
        images: [{ url: `${SITE_URL}/assets/og-image.webp`, width: 1200, height: 630 }],
      },
    }
  }

  // Fallback: area hub metadata
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

  return {
    title,
    description,
    alternates: { canonical: `${SITE_URL}/${city.slug}/${areaSlug}` },
    openGraph: { title, description, url: `${SITE_URL}/${city.slug}/${areaSlug}`, type: 'website' },
  }
}

export default async function CityAreaPage({ params }: { params: Params }) {
  const { citySlug, areaSlug } = await params

  // Try seo_pages first — city-level service page (1 query)
  const page = await getPageByPath(`/${citySlug}/${areaSlug}`)
  if (page) {
    const data = page.page_data
    return (
      <>
        {page.schema_json && (
          <script
            type="application/ld+json"
            dangerouslySetInnerHTML={{ __html: JSON.stringify(page.schema_json) }}
          />
        )}
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

  // Fallback: area hub page (unchanged behaviour)
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
  const cityGeo      = CITY_DATA[citySlug as CityKey]

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
    cityLat:    cityGeo?.lat ?? 0,
    cityLng:    cityGeo?.lng ?? 0,
    areaName,
    areaSlug,
    reviewCount: 300,
    faqs:        allFaqs,
  })

  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(schemas) }}
      />
      <CityHero city={areaCity} />
      <div className="bg-blue-600 py-4 text-white text-center font-medium">
        📍 Now Serving: {areaName} and surrounding blocks
      </div>
      <CityServices city={city} areaName={areaName} />
      <CityAbout city={areaCity} />
      <CityFAQ city={city} />
      <CityContact city={city} />
    </>
  )
}

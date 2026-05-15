//app/[citySlug]/[areaSlug]/[serviceSlug]/page.tsx
import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { getAllCities, getCityBySlug } from "@/lib/cities";
import { getAreaLocationService, getAllAreaServiceParams, getServiceKeywords } from "@/lib/locationServices";
import { locationServiceSchema, CITY_DATA, type CityKey } from "@/lib/schema";
import { LocationServicePage } from "@/components/location-service/LocationServicePage";

export const revalidate = 3600;
export const dynamicParams = true;

export async function generateStaticParams() {
  const cities = await getAllCities();
  const params: { citySlug: string; areaSlug: string; serviceSlug: string }[] = [];

  for (const city of cities) {
    const combos = await getAllAreaServiceParams(city.slug);
    for (const { areaSlug, serviceSlug } of combos) {
      params.push({ citySlug: city.slug, areaSlug, serviceSlug });
    }
  }
  return params;
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ citySlug: string; areaSlug: string; serviceSlug: string }>;
}): Promise<Metadata> {
  const { citySlug, areaSlug, serviceSlug } = await params;
  const locationService = await getAreaLocationService(citySlug, areaSlug, serviceSlug);
  if (!locationService) return {};
  return {
    title: locationService.metaTitle,
    description: locationService.metaDescription,
    keywords: locationService.metaKeywords,
    alternates: { canonical: locationService.canonicalUrl },
    openGraph: {
      title: locationService.metaTitle,
      description: locationService.metaDescription,
      url: locationService.canonicalUrl,
      type: "website",
    },
  };
}

export default async function AreaServicePage({
  params,
}: {
  params: Promise<{ citySlug: string; areaSlug: string; serviceSlug: string }>;
}) {
  const { citySlug, areaSlug, serviceSlug } = await params;

  const locationService = await getAreaLocationService(citySlug, areaSlug, serviceSlug);
  if (!locationService) return notFound();

  const city = await getCityBySlug(citySlug);
  if (!city) return notFound();

  const allKeywords = await getServiceKeywords();

  // Pull geo data from CITY_DATA for accurate coordinates
  const cityGeo = CITY_DATA[citySlug as CityKey];

  const schema = locationServiceSchema({
    serviceName:     locationService.serviceName,
    serviceSlug:     locationService.serviceSlug,
    serviceCategory: locationService.serviceCategory,
    canonicalUrl:    locationService.canonicalUrl,
    heroHeading:     locationService.heroHeading,
    aboutPara1:      locationService.aboutPara1,
    cityName:        locationService.cityName,
    citySlug:        locationService.citySlug,
    cityState:       cityGeo?.state,
    areaName:        locationService.areaName,
    areaSlug:        locationService.areaSlug,
    pricingRows:     locationService.pricingRows,
    testimonials:    locationService.testimonials?.map((t) => ({
      name: t.name, rating: t.rating, text: t.text, date: t.date, vehicle: t.vehicle,
    })),
    faqs:            locationService.faqs,
    reviewCount:     locationService.schemaAggregateRating ?? locationService.schemaReviewCount,
    ratingValue:     locationService.schemaAggregateRating,
    nearbyAreas:     locationService.nearbyAreas,
    cityLat:         cityGeo?.lat,
    cityLng:         cityGeo?.lng,
    cityPhone:       cityGeo?.phone,
    cityEmail:       cityGeo?.email,
    cityPostalCode:  cityGeo?.postalCode,
  });

  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(schema) }}
      />
      <LocationServicePage
        data={locationService}
        city={city}
        allKeywords={allKeywords}
        breadcrumbs={[
          { name: "Home", url: "/" },
          { name: city.name, url: `/${city.slug}` },
          { name: locationService.areaName ?? "", url: `/${city.slug}/${areaSlug}` },
          { name: locationService.serviceName, url: locationService.canonicalUrl },
        ]}
      />
    </>
  );
}

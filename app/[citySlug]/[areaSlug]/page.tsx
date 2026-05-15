//app/[citySlug]/[areaSlug]/page.tsx
import { notFound } from "next/navigation";
import type { Metadata } from "next";
import { getAllCities, getCityBySlug } from "@/lib/cities";
import { SITE_URL } from "@/lib/constants";
import { localBusinessSchema, breadcrumbSchema, faqSchema } from "@/lib/schema";
import { CityHero } from "@/components/city/CityHero";
import { CityAbout } from "@/components/city/CityAbout";
import { CityContact } from "@/components/city/CityContact";
import { CityFAQ } from "@/components/city/CityFAQ";
import { CityServices } from "@/components/city/CityServices";
import { getCityLocationService, getAllCityServiceSlugs, getServiceKeywords } from "@/lib/locationServices";
import { LocationServicePage } from "@/components/location-service/LocationServicePage";

export const revalidate = 3600;
export const dynamicParams = true;

export async function generateStaticParams() {
  const cities = await getAllCities();
  const params: { citySlug: string; areaSlug: string }[] = [];

  for (const city of cities) {
    city.areas.forEach((area: any) => {
      params.push({
        citySlug: city.slug,
        areaSlug: typeof area === "string" ? area.toLowerCase().replace(/ /g, "-") : area.slug,
      });
    });

    const serviceSlugs = await getAllCityServiceSlugs(city.slug);
    for (const serviceSlug of serviceSlugs) {
      params.push({ citySlug: city.slug, areaSlug: serviceSlug });
    }
  }

  return params;
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ citySlug: string; areaSlug: string }>;
}): Promise<Metadata> {
  const { citySlug, areaSlug } = await params;

  const locationService = await getCityLocationService(citySlug, areaSlug);
  if (locationService) {
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

  const city = await getCityBySlug(citySlug);
  if (!city) return {};

  const area = city.areas.find((a: any) =>
    typeof a === "string" ? a.toLowerCase().replace(/ /g, "-") === areaSlug : a.slug === areaSlug
  );
  if (!area) return {};

  const areaName = typeof area === "string" ? area : area.name;
  const title = `24/7 Doorstep Car & Bike Repair in ${areaName}, ${city.name}`;
  const description = `Professional mechanic at your doorstep in ${areaName}. Emergency car breakdown and bike service in ${city.name}. Certified technicians, fast arrival across ${areaName}.`;

  return {
    title,
    description,
    alternates: { canonical: `${SITE_URL}/${city.slug}/${areaSlug}` },
    openGraph: { title, description, url: `${SITE_URL}/${city.slug}/${areaSlug}`, type: "website" },
  };
}

export default async function CitySlugPage({
  params,
}: {
  params: Promise<{ citySlug: string; areaSlug: string }>;
}) {
  const { citySlug, areaSlug } = await params;

  // near-me service page: /bangalore/car-mechanic-near-me
  const locationService = await getCityLocationService(citySlug, areaSlug);
  if (locationService) {
    const city = await getCityBySlug(citySlug);
    if (!city) return notFound();
    const allKeywords = await getServiceKeywords();
    return (
      <LocationServicePage
        data={locationService}
        city={city}
        allKeywords={allKeywords}
        breadcrumbs={[
          { name: "Home", url: "/" },
          { name: city.name, url: `/${city.slug}` },
          { name: locationService.serviceName, url: locationService.canonicalUrl },
        ]}
      />
    );
  }

  // area hub page: /bangalore/hsr-layout
  const city = await getCityBySlug(citySlug);
  if (!city) return notFound();

  const area = city.areas.find((a: any) =>
    typeof a === "string" ? a.toLowerCase().replace(/ /g, "-") === areaSlug : a.slug === areaSlug
  );
  if (!area) return notFound();

  const areaName = typeof area === "string" ? area : area.name;
  const areaHighlight = typeof area === "string" ? "" : (area as any).highlight ?? "";

  const areaSpecificCityData = {
    ...city,
    name: areaName,
    heroTagline: `Expert Mechanics in ${areaName}`,
    aboutHeading: `Trusted Doorstep Auto Repair in ${areaName}`,
    aboutPara1:
      areaHighlight ||
      `Fiixup provides 24/7 doorstep car and bike repair services specifically for residents and commuters in ${areaName}, ${city.name}.`,
  };

  const allFaqs = city.faqCategories.flatMap((cat: any) => cat.faqs);

  const schemas = [
    localBusinessSchema({
      name:        `${areaName}, ${city.name}`,
      slug:        `${citySlug}/${areaSlug}`,
      state:       (city as any).state ?? "India",
      postalCode:  "000000",
      lat:         0,
      lng:         0,
      phone:       city.phone ?? "",
      email:       city.email ?? "",
      reviewCount: 300,
      areas:       [areaName],
    }),
    breadcrumbSchema([
      { name: "Home", url: "/" },
      { name: city.name, url: `/${city.slug}` },
      { name: areaName, url: `/${city.slug}/${areaSlug}` },
    ]),
    faqSchema(allFaqs),
  ];

  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(schemas) }}
      />
      <CityHero city={areaSpecificCityData} />
      <div className="bg-blue-600 py-4 text-white text-center font-medium">
        📍 Now Serving: {areaName} and surrounding blocks
      </div>
      <CityServices city={city} areaName={areaName} />
      <CityAbout city={areaSpecificCityData} />
      <CityFAQ city={city} />
      <CityContact city={city} />
    </>
  );
}

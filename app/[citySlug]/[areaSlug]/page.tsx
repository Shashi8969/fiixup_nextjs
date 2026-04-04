// app/[citySlug]/[areaSlug]/page.tsx
import { notFound } from "next/navigation";
import type { Metadata } from "next";
import cities, { getCityBySlug } from "@/lib/cities";
import { SITE_URL } from "@/lib/constants";
import { localBusinessSchema, breadcrumbSchema, faqSchema } from "@/lib/schema";
import { CityHero } from "@/components/city/CityHero";
import { CityAbout } from "@/components/city/CityAbout";
import { CityContact } from "@/components/city/CityContact";
import { CityFAQ } from "@/components/city/CityFAQ";
import { CityServices } from "@/components/city/CityServices";

/**
 * Helper to find area details from the city data
 */
function getAreaData(citySlug: string, areaSlug: string) {
  const city = cities.find((c) => c.slug === citySlug);
  if (!city) return null;

  const area = city.areas.find((a: any) =>
    typeof a === "string"
      ? a.toLowerCase().replace(/ /g, "-") === areaSlug
      : a.slug === areaSlug
  );

  if (!area) return null;

  return {
    city,
    areaName: typeof area === "string" ? area : area.name,
    areaHighlight: typeof area === "string" ? "" : area.highlight,
    areaSlug: typeof area === "string" ? area.toLowerCase().replace(/ /g, "-") : area.slug,
  };
}

/**
 * SSG: Pre-builds all neighborhood pages for all cities
 */
export async function generateStaticParams() {
  const params: { citySlug: string; areaSlug: string }[] = [];

  cities.forEach((city) => {
    city.areas.forEach((area: any) => {
      const areaSlug =
        typeof area === "string"
          ? area.toLowerCase().replace(/ /g, "-")
          : area.slug;
      params.push({ citySlug: city.slug, areaSlug });
    });
  });

  return params;
}

/**
 * Dynamic SEO Metadata for neighborhoods
 */
export async function generateMetadata({
  params,
}: {
  params: Promise<{ citySlug: string; areaSlug: string }>;
}): Promise<Metadata> {
  const { citySlug, areaSlug } = await params;
  const data = getAreaData(citySlug, areaSlug);
  if (!data) return {};

  const title = `24/7 Doorstep Car & Bike Repair in ${data.areaName}, ${data.city.name} `;
  const description = `Professional mechanic at your doorstep in ${data.areaName}. Emergency car breakdown and bike service in ${data.city.name}. Certified technicians, fast arrival across ${data.areaName}.`;

  return {
    title,
    description,
    alternates: { canonical: `${SITE_URL}/${data.city.slug}/${data.areaSlug}` },
    openGraph: {
      title,
      description,
      url: `${SITE_URL}/${data.city.slug}/${data.areaSlug}`,
      type: "website",
    },
  };
}

export default async function AreaPage({
  params,
}: {
  params: Promise<{ citySlug: string; areaSlug: string }>;
}) {
  const { citySlug, areaSlug } = await params;
  const data = getAreaData(citySlug, areaSlug);

  if (!data) notFound();

  const { city, areaName, areaHighlight } = data;

  // Localized data for UI components
  const areaSpecificCityData = {
    ...city,
    name: areaName, // Overrides city name in Hero
    heroTagline: `Expert Mechanics in ${areaName}`,
    aboutHeading: `Trusted Doorstep Auto Repair in ${areaName}`,
    aboutPara1:
      areaHighlight ||
      `Fiixup provides 24/7 doorstep car and bike repair services specifically for residents and commuters in ${areaName}, ${city.name}.`,
  };

  // Extract all FAQs for the city to include in schema
  const allFaqs = city.faqCategories.flatMap((cat) => cat.faqs);

  const schemas = [
    localBusinessSchema({
      cityName: `${areaName}, ${city.name}`,
      phone: city.phone,
      slug: `${city.slug}/${areaSlug}`,
      areas: [areaName],
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
      {/* SEO Schemas */}
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(schemas) }}
      />

      {/* Hero Section localized to Area */}
      <CityHero city={areaSpecificCityData} />

      {/* Local trust bar */}
      <div className="bg-blue-600 py-4 text-white text-center font-medium">
        📍 Now Serving: {areaName} and surrounding blocks
      </div>

      {/* Category Grid Section (localized with areaName) */}
      <CityServices city={city} areaName={areaName} />

      {/* Localized About Section */}
      <CityAbout city={areaSpecificCityData} />

      {/* Localized FAQ Section */}
      <CityFAQ city={city} />

      {/* Contact Form */}
      <CityContact city={city} />
    </>
  );
}
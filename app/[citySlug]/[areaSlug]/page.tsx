// app/[citySlug]/[areaSlug]/page.tsx
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

export const revalidate = 3600;

export async function generateStaticParams() {
  const cities = await getAllCities();
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

export async function generateMetadata({
  params,
}: {
  params: Promise<{ citySlug: string; areaSlug: string }>;
}): Promise<Metadata> {
  const { citySlug, areaSlug } = await params;
  const city = await getCityBySlug(citySlug);
  if (!city) return {};

  const area = city.areas.find((a: any) =>
    typeof a === "string"
      ? a.toLowerCase().replace(/ /g, "-") === areaSlug
      : a.slug === areaSlug
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

export default async function AreaPage({
  params,
}: {
  params: Promise<{ citySlug: string; areaSlug: string }>;
}) {
  const { citySlug, areaSlug } = await params;
  const city = await getCityBySlug(citySlug);
  if (!city) notFound();

  const area = city.areas.find((a: any) =>
    typeof a === "string"
      ? a.toLowerCase().replace(/ /g, "-") === areaSlug
      : a.slug === areaSlug
  );
  if (!area) notFound();

  const areaName = typeof area === "string" ? area : area.name;
  const areaHighlight = typeof area === "string" ? "" : area.highlight ?? "";

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

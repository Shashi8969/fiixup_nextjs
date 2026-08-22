// app/brands/page.tsx
export const revalidate = 3600;

import type { Metadata } from "next";
import Link from "next/link";
import Image from "next/image";
import { Phone, Car, Bike } from "lucide-react";
import { getAllBrandPages } from "@/lib/data/brandPages";
import { TrustStrip } from "@/components/ui/TrustStrip";
import HowItWorks from "@/components/ui/HowItWorks";
import WhyChooseDoorstep from "@/components/ui/WhyChooseDoorstep";
import { getStaticPageSEO } from "@/lib/data/seo";
import { brandsListingSchema, jsonLdString } from "@/lib/schema";
import { MAIN_PHONE, MAIN_PHONE_DISPLAY } from "@/lib/constants";
import { metadataFromBasicSeo } from "@/lib/seo/metadata";

const seo = getStaticPageSEO("brands")!;

export const metadata: Metadata = metadataFromBasicSeo({
  title: seo.title,
  description: seo.description,
  keywords: seo.keywords,
  canonical: seo.canonical,
  path: "/brands",
  ogImageAlt: seo.ogTitle ?? seo.title,
});

function BrandTile({ slug, brandName, logoUrl, logoAlt }: { slug: string; brandName: string; logoUrl: string | null; logoAlt: string | null }) {
  return (
    <Link
      href={`/brands/${slug}`}
      className="group flex flex-col items-center gap-3 rounded-2xl border border-gray-100 bg-white p-6 text-center shadow-sm transition-all hover:-translate-y-1 hover:border-blue-200 hover:shadow-lg"
    >
      {logoUrl && (
        <div className="flex h-16 w-full items-center justify-center">
          <Image
            src={logoUrl}
            alt={logoAlt || `${brandName} logo`}
            width={120}
            height={56}
            className="max-h-14 w-auto object-contain grayscale transition group-hover:grayscale-0"
          />
        </div>
      )}
      <span className="font-bold text-gray-900 group-hover:text-blue-600">{brandName}</span>
    </Link>
  );
}

export default async function BrandsPage() {
  const brands = await getAllBrandPages();
  const carBrands = brands.filter((b) => b.vehicleType === "car");
  const bikeBrands = brands.filter((b) => b.vehicleType === "bike");

  const schema = brandsListingSchema(
    brands.map((b) => ({ name: b.brandName, slug: b.slug, vehicleType: b.vehicleType }))
  );

  return (
    <>
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: jsonLdString(schema) }} />

      <section className="bg-gradient-to-br from-blue-50 to-blue-100 py-16">
        <div className="container mx-auto px-4 text-center">
          <h1 className="text-4xl md:text-5xl font-bold text-gray-900 mb-4">
            Every Major Car &amp; Bike Brand, Serviced at Your Door
          </h1>
          <p className="text-lg text-gray-700 max-w-2xl mx-auto mb-8">
            Our certified mechanics are trained on {brands.length} car and bike brands sold in India —
            from routine service to brand-specific repairs, at your home or office.
          </p>
          <div className="flex flex-wrap gap-4 justify-center">
            <Link
              href="/contact#contact-form"
              className="bg-blue-600 text-white px-8 py-3 rounded-lg hover:bg-blue-700 transition-colors font-semibold"
            >
              Book a Service
            </Link>
            <a
              href={`tel:${MAIN_PHONE}`}
              className="bg-red-600 text-white px-8 py-3 rounded-lg hover:bg-red-700 transition-colors font-semibold flex items-center gap-2"
            >
              <Phone className="w-4 h-4" /> {MAIN_PHONE_DISPLAY}
            </a>
          </div>
        </div>
      </section>

      <TrustStrip />

      {carBrands.length > 0 && (
        <section className="py-16 bg-white">
          <div className="container mx-auto px-4">
            <h2 className="text-2xl md:text-3xl font-bold flex items-center gap-2 mb-8">
              <Car className="w-7 h-7 text-blue-700" /> Car Brands We Service
            </h2>
            <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-6 gap-5">
              {carBrands.map((b) => (
                <BrandTile key={b.slug} slug={b.slug} brandName={b.brandName} logoUrl={b.logoUrl} logoAlt={b.logoAlt} />
              ))}
            </div>
          </div>
        </section>
      )}

      {bikeBrands.length > 0 && (
        <section className="py-16 bg-gray-50">
          <div className="container mx-auto px-4">
            <h2 className="text-2xl md:text-3xl font-bold flex items-center gap-2 mb-8">
              <Bike className="w-7 h-7 text-red-700" /> Bike Brands We Service
            </h2>
            <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-6 gap-5">
              {bikeBrands.map((b) => (
                <BrandTile key={b.slug} slug={b.slug} brandName={b.brandName} logoUrl={b.logoUrl} logoAlt={b.logoAlt} />
              ))}
            </div>
          </div>
        </section>
      )}

      <section className="py-16 bg-white">
        <div className="container mx-auto px-4">
          <h2 className="text-2xl md:text-3xl font-bold text-center mb-12">How It Works</h2>
          <HowItWorks />
        </div>
      </section>

      <WhyChooseDoorstep />

      <section className="py-16 bg-blue-600 text-white text-center">
        <div className="container mx-auto px-4">
          <h2 className="text-3xl font-bold mb-4">Don&apos;t See Your Brand?</h2>
          <p className="text-white mb-8 text-lg">
            We service every major car and bike brand in India. Call us and we&apos;ll confirm — no obligation.
          </p>
          <div className="flex flex-wrap gap-4 justify-center">
            <Link
              href="/contact#contact-form"
              className="bg-white text-blue-600 px-8 py-3 rounded-lg font-bold hover:bg-blue-50 transition-colors"
            >
              Book Service Now
            </Link>
            <a
              href={`tel:${MAIN_PHONE}`}
              className="bg-red-600 text-white px-8 py-3 rounded-lg font-bold hover:bg-red-700 transition-colors flex items-center gap-2"
            >
              <Phone className="w-4 h-4" /> {MAIN_PHONE_DISPLAY}
            </a>
          </div>
        </div>
      </section>
    </>
  );
}

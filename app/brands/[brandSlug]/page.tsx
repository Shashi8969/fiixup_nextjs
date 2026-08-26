// app/brands/[brandSlug]/page.tsx
// Brand landing page — fully data-driven from Supabase `brand_pages`,
// mirroring app/services/[serviceSlug]/page.tsx's architecture.

import type { Metadata } from "next";
import { notFound } from "next/navigation";
import Link from "next/link";
import Image from "next/image";
import { Phone, CheckCircle2, ChevronRight, Clock } from "lucide-react";

import { iconMap } from "@/lib/icons";
import {
  getAllBrandPages,
  getBrandPageBySlug,
  getServicesForBrand,
  getRelatedBrands,
} from "@/lib/data/brandPages";
import { SITE_URL, MAIN_PHONE, MAIN_PHONE_DISPLAY } from "@/lib/constants";
import { brandPageSchema, jsonLdString } from "@/lib/schema";
import { metadataFromBasicSeo } from "@/lib/seo/metadata";
import { TrustStrip } from "@/components/ui/TrustStrip";
import HowItWorks from "@/components/ui/HowItWorks";
import WhyChooseDoorstep from "@/components/ui/WhyChooseDoorstep";
import { Testimonials } from "@/components/Testimonials";
import ServiceFAQ from "@/components/service/ServiceFAQ";
import BookingCTA from "@/components/ui/BookingCTA";

export const revalidate = 3600;

export async function generateStaticParams() {
  const brands = await getAllBrandPages();
  return brands.map((b) => ({ brandSlug: b.slug }));
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ brandSlug: string }>;
}): Promise<Metadata> {
  const { brandSlug } = await params;
  const brand = await getBrandPageBySlug(brandSlug);
  if (!brand) return {};

  const canonical = `${SITE_URL}/brands/${brand.slug}`;
  return metadataFromBasicSeo({
    title: brand.metaTitle,
    description: brand.metaDescription,
    keywords: brand.metaKeywords ?? undefined,
    canonical,
    path: `/brands/${brand.slug}`,
    ogImageAlt: brand.metaTitle,
  });
}

export default async function BrandPage({
  params,
}: {
  params: Promise<{ brandSlug: string }>;
}) {
  const { brandSlug } = await params;
  const brand = await getBrandPageBySlug(brandSlug);
  if (!brand) return notFound();

  const isCar = brand.vehicleType === "car";
  const accentBlue = isCar ? "text-blue-600" : "text-red-600";
  const bgAccent = isCar ? "bg-blue-600" : "bg-red-600";
  const bgLight = isCar ? "bg-blue-50" : "bg-red-50";
  const borderAccent = isCar ? "border-blue-200" : "border-red-200";

  const [services, relatedBrands] = await Promise.all([
    getServicesForBrand(brand.brandName, brand.vehicleType),
    getRelatedBrands(brand.vehicleType, brand.slug),
  ]);

  const schema = brandPageSchema({
    brandName:   brand.brandName,
    vehicleType: brand.vehicleType,
    slug:        brand.slug,
    description: brand.description,
    services:    services.map((s) => ({ name: s.shortTitle, slug: s.slug, description: s.tagline })),
    faqs:        brand.faqs,
    image:       brand.logoUrl,
  });

  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: jsonLdString(brand.schemaJson ?? schema) }}
      />

      {/* HERO */}
      <section className={`py-16 bg-gradient-to-br ${isCar ? "from-blue-50 to-blue-100" : "from-red-50 to-red-100"}`}>
        <div className="container mx-auto px-4">
          <div className="flex flex-col items-center text-center gap-6">
            {brand.logoUrl ? (
              <div className="flex h-20 items-center justify-center rounded-2xl bg-white px-8 shadow-sm">
                <Image
                  src={brand.logoUrl}
                  alt={brand.logoAlt || `${brand.brandName} logo`}
                  title={brand.logoTitle || undefined}
                  width={160}
                  height={64}
                  className="max-h-14 w-auto object-contain"
                  priority
                />
              </div>
            ) : null}
            <h1 className="text-4xl md:text-5xl font-bold text-gray-900 max-w-3xl">{brand.heroHeading}</h1>
            <p className="text-lg text-gray-700 max-w-2xl">{brand.heroSubheading}</p>
            <div className="flex flex-wrap gap-4 justify-center">
              <Link
                href="/contact#contact-form"
                className={`${bgAccent} text-white px-8 py-3 rounded-lg hover:opacity-90 transition-opacity font-semibold`}
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
        </div>
      </section>

      <TrustStrip variant="text" />

      {/* ABOUT */}
      {brand.description && (
        <section className="py-16 bg-white">
          <div className="container mx-auto px-4 max-w-3xl">
            <h2 className="text-2xl font-bold mb-4 text-gray-900">
              Doorstep {brand.brandName} {isCar ? "Car" : "Bike"} Repair
            </h2>
            <p className="text-gray-700 text-lg leading-relaxed">{brand.description}</p>
          </div>
        </section>
      )}

      {/* MODELS */}
      {brand.models.length > 0 && (
        <section className={`py-16 ${bgLight}`}>
          <div className="container mx-auto px-4">
            <h2 className="text-2xl md:text-3xl font-bold mb-2 text-center text-gray-900">
              {brand.brandName} Models We Service
            </h2>
            <p className="text-gray-600 text-center mb-8">
              Our mechanics carry genuine-equivalent parts and diagnostic tools for every {brand.brandName} model below.
            </p>
            <div className="flex flex-wrap justify-center gap-3 max-w-4xl mx-auto">
              {brand.models.map((model) => (
                <span
                  key={model}
                  className={`inline-flex items-center gap-2 rounded-full bg-white border ${borderAccent} px-5 py-2.5 text-sm font-semibold text-gray-800 shadow-sm`}
                >
                  <CheckCircle2 className={`w-4 h-4 ${accentBlue}`} aria-hidden="true" />
                  {model}
                </span>
              ))}
            </div>
          </div>
        </section>
      )}

      {/* COMMON ISSUES */}
      {brand.commonIssues.length > 0 && (
        <section className="py-16 bg-white">
          <div className="container mx-auto px-4 max-w-4xl">
            <h2 className="text-2xl md:text-3xl font-bold mb-8 text-center text-gray-900">
              Common {brand.brandName} Issues We Fix
            </h2>
            <div className="grid sm:grid-cols-2 gap-6">
              {brand.commonIssues.map((item) => (
                <div key={item.issue} className="rounded-2xl border border-gray-100 bg-gray-50 p-6">
                  <h3 className="font-bold text-gray-900 mb-2">{item.issue}</h3>
                  <p className="text-gray-600 text-sm leading-relaxed">{item.description}</p>
                </div>
              ))}
            </div>
          </div>
        </section>
      )}

      {/* SERVICES OFFERED — live from service_brands, never goes stale */}
      {services.length > 0 && (
        <section className="py-16 bg-gray-50">
          <div className="container mx-auto px-4">
            <h2 className="text-2xl md:text-3xl font-bold mb-8 text-center text-gray-900">
              {brand.brandName} Services Available
            </h2>
            <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6">
              {services.map((s) => {
                const Icon = iconMap[s.icon] || iconMap.default;
                return (
                  <Link
                    key={s.slug}
                    href={`/services/${s.slug}`}
                    className="group bg-white p-6 border border-gray-200 rounded-2xl hover:shadow-lg hover:border-gray-300 transition-all"
                  >
                    <Icon className={`w-9 h-9 ${accentBlue} mb-3`} aria-hidden="true" />
                    <h3 className="font-bold mb-1 text-gray-900">{s.shortTitle}</h3>
                    <p className="text-sm text-gray-500 mb-4">{s.tagline}</p>
                    <div className="flex items-center justify-between">
                      <span className={`text-sm font-bold ${accentBlue}`}>
                        {s.price.includes("₹") ? s.price : `From ₹${s.price}`}
                      </span>
                      <span className="flex items-center gap-1 text-xs text-gray-500">
                        <Clock className="w-3.5 h-3.5" /> {s.duration}
                      </span>
                    </div>
                  </Link>
                );
              })}
            </div>
          </div>
        </section>
      )}

      {/* SEO CONTENT SECTIONS */}
      {brand.sections.length > 0 && (
        <section className="py-16 bg-white">
          <div className="container mx-auto px-4 max-w-3xl space-y-10">
            {brand.sections.map((section) => (
              <div key={section.heading}>
                <h2 className="text-xl md:text-2xl font-bold mb-3 text-gray-900">{section.heading}</h2>
                <p className="text-gray-700 leading-relaxed">{section.body}</p>
              </div>
            ))}
          </div>
        </section>
      )}

      <section className="py-16 bg-gray-50">
        <div className="container mx-auto px-4">
          <h2 className="text-2xl md:text-3xl font-bold text-center mb-12">
            How Doorstep {brand.brandName} {isCar ? "Car" : "Bike"} Repair Works
          </h2>
          <HowItWorks />
        </div>
      </section>

      <Testimonials />

      {brand.faqs.length > 0 && (
        <section className="py-16 bg-white">
          <div className="container mx-auto px-4 max-w-3xl">
            <h2 className="text-2xl md:text-3xl font-bold text-center mb-2">
              {brand.brandName} — Frequently Asked Questions
            </h2>
            <p className="text-gray-500 text-center mb-10">
              Common questions about our doorstep {brand.brandName} {isCar ? "car" : "bike"} service.
            </p>
            <ServiceFAQ faqs={brand.faqs} />
          </div>
        </section>
      )}

      <WhyChooseDoorstep />

      {relatedBrands.length > 0 && (
        <section className="py-16 bg-gray-50">
          <div className="container mx-auto px-4">
            <h2 className="text-2xl font-bold mb-8">
              Other {isCar ? "Car" : "Bike"} Brands We Service
            </h2>
            <div className="flex flex-wrap gap-4">
              {relatedBrands.map((b) => (
                <Link
                  key={b.slug}
                  href={`/brands/${b.slug}`}
                  className="group inline-flex items-center gap-2 rounded-full border border-gray-200 bg-white px-5 py-2.5 text-sm font-semibold text-gray-800 transition hover:border-blue-300 hover:bg-blue-50 hover:text-blue-700"
                >
                  {b.brandName}
                  <ChevronRight className="h-3.5 w-3.5 -translate-x-1 opacity-0 transition group-hover:translate-x-0 group-hover:opacity-100" aria-hidden="true" />
                </Link>
              ))}
            </div>
          </div>
        </section>
      )}

      <BookingCTA serviceTitle={`${brand.brandName} ${isCar ? "Car" : "Bike"} Service`} bgAccent={bgAccent} />
    </>
  );
}

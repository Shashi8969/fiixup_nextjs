import type { Metadata } from "next";
import Link from "next/link";
import { MapPin, ArrowRight } from "lucide-react";
import { Contact } from "@/components/Contact";
import { getStaticPageSEO } from "@/lib/data/seo";
import { contactPageSchema, jsonLdString } from "@/lib/schema";
import { getPublicSiteSettings } from "@/lib/site-settings";
import { getAllCities } from "@/lib/cities";
import { PageHero } from "@/components/ui/PageHero";
export const revalidate = 3600; // refreshes every 1 hour


const seo = getStaticPageSEO("contact")!;

export const metadata: Metadata = {
  title: seo.title,
  description: seo.description,
  keywords: seo.keywords,
  alternates: { canonical: seo.canonical },
  openGraph: {
    title: seo.ogTitle ?? seo.title,
    description: seo.ogDescription ?? seo.description,
    url: seo.canonical,
  },
};

export default async function ContactPage() {
  const [siteSettings, cities] = await Promise.all([
    getPublicSiteSettings(),
    getAllCities(),
  ]);

  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: jsonLdString(
            contactPageSchema({
              phone: siteSettings.mainPhone,
              email: siteSettings.mainEmail,
              emergencyPhone: siteSettings.emergencyPhone || undefined,
              address: siteSettings.addressStreet
                ? {
                    street: siteSettings.addressStreet,
                    locality: siteSettings.addressLocality,
                    region: siteSettings.addressRegion,
                    postalCode: siteSettings.addressPostalCode,
                    country: siteSettings.addressCountry,
                  }
                : undefined,
            })
          ),
        }}
      />
      <PageHero
        heading="Contact Us"
        subtext="Available 24/7 across India. Reach out for emergency service or schedule your appointment."
      />
      <Contact siteSettings={siteSettings} />

      {cities.length > 0 && (
        <section className="bg-gray-50 py-14">
          <div className="container mx-auto px-4 text-center">
            <h2 className="mb-2 text-xl font-bold text-gray-900">Not sure if we&apos;re in your area?</h2>
            <p className="mb-8 text-gray-600">Explore doorstep service details for your city.</p>
            <div className="flex flex-wrap justify-center gap-3">
              {cities.map((city) => (
                <Link
                  key={city.slug}
                  href={`/${city.slug}`}
                  className="group inline-flex items-center gap-2 rounded-full border border-gray-200 bg-white px-5 py-2.5 font-medium text-gray-700 shadow-sm transition-all hover:-translate-y-0.5 hover:border-blue-200 hover:text-blue-600 hover:shadow-md"
                >
                  <MapPin className="h-4 w-4 text-blue-600" />
                  {city.name}
                  <ArrowRight className="h-3.5 w-3.5 -translate-x-1 opacity-0 transition-all group-hover:translate-x-0 group-hover:opacity-100" />
                </Link>
              ))}
            </div>
          </div>
        </section>
      )}
    </>
  );
}

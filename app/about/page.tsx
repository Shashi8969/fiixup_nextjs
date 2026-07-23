// app/about/page.tsx
import type { Metadata } from "next";
import Link from "next/link";
import { CheckCircle } from "lucide-react";
import { About } from "@/components/About";
import { Testimonials } from "@/components/Testimonials";
import { mvvItems, differentiators } from "@/lib/data/about";
import { getStaticPageSEO } from "@/lib/data/seo";
import { aboutPageSchema, jsonLdString } from "@/lib/schema";
import { getPublicSiteSettings } from "@/lib/site-settings";
import { PageHero } from "@/components/ui/PageHero";
import { SectionHeader } from "@/components/ui/SectionHeader";

const seo = getStaticPageSEO("about")!;
export const revalidate = 3600; // refreshes every 1 hour

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

export default async function AboutPage() {
  const siteSettings = await getPublicSiteSettings();

  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: jsonLdString(
            aboutPageSchema({
              phone: siteSettings.mainPhone,
              email: siteSettings.mainEmail,
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
        heading="About Fiixup"
        subtext="Revolutionizing auto care with 24/7 doorstep service across India"
      />

      <About />

      {/* Our Story */}
      <section className="py-20 bg-white">
        <div className="container mx-auto px-4 max-w-4xl">
          <SectionHeader heading="Our Story" />
          <div className="space-y-6 text-lg text-gray-700">
            <p>Fiixup was born from a simple observation: vehicle owners waste countless hours visiting garages, waiting for service, and dealing with unexpected repair bills. We knew there had to be a better way.</p>
            <p>Founded in 2020, we started with a vision to bring professional auto repair services directly to people&apos;s doorsteps. What began as a small team of passionate mechanics has grown into India&apos;s most trusted doorstep auto service provider.</p>
            <p>Today, we serve over 10,000 happy customers across Bengaluru, Chennai, Hyderabad and Mumbai — providing 24/7 service for both cars and bikes.</p>
          </div>

          <div className="grid md:grid-cols-3 gap-8 mt-14">
            {mvvItems.map(({ Icon, title, text }) => (
              <div key={title} className="text-center">
                <div className="w-16 h-16 bg-blue-100 rounded-full flex items-center justify-center mx-auto mb-4">
                  <Icon className="w-8 h-8 text-blue-600" />
                </div>
                <h3 className="font-semibold text-xl mb-2 text-gray-900">{title}</h3>
                <p className="text-gray-600">{text}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* What Sets Us Apart */}
      <section className="py-20 bg-gray-50">
        <div className="container mx-auto px-4 max-w-4xl">
          <SectionHeader heading="What Sets Us Apart" />
          <div className="grid md:grid-cols-2 gap-8">
            {differentiators.map(({ title, text }) => (
              <div key={title} className="flex gap-4">
                <CheckCircle className="w-6 h-6 text-green-600 flex-shrink-0 mt-1" />
                <div>
                  <h3 className="font-semibold text-xl mb-2 text-gray-900">{title}</h3>
                  <p className="text-gray-600">{text}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Team */}
      <section className="py-20 bg-white">
        <div className="container mx-auto px-4 max-w-4xl text-center">
          <SectionHeader heading="Our Team" />
          <p className="text-lg text-gray-700 mb-12">
            Fiixup is powered by 50+ certified technicians, support staff, and auto care experts — each carefully selected and passionate about exceptional service.
          </p>
          <div className="bg-blue-50 p-8 rounded-xl">
            <p className="text-xl font-semibold mb-4 text-gray-900">Join Our Team</p>
            <p className="text-gray-700 mb-6">We&apos;re always looking for skilled technicians who share our commitment to quality.</p>
            <Link
              href="/contact"
              className="inline-block bg-blue-600 text-white px-8 py-3 rounded-lg hover:bg-blue-700 transition-colors font-semibold"
            >
              View Career Opportunities
            </Link>
          </div>
        </div>
      </section>

      <Testimonials />
    </>
  );
}

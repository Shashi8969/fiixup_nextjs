// app/about/page.tsx
import type { Metadata } from "next";
import { CheckCircle, Phone } from "lucide-react";
import Link from "next/link";
import { Testimonials } from "@/components/Testimonials";
import { TeamSection } from "@/components/about/TeamSection";
import { CmsImage } from "@/components/ui/CmsImage";
import HowItWorks from "@/components/ui/HowItWorks";
import { aboutContent, stats, mvvItems, differentiators } from "@/lib/data/about";
import { getStaticPageSEO } from "@/lib/data/seo";
import { aboutPageSchema, jsonLdString } from "@/lib/schema";
import { getPublicSiteSettings } from "@/lib/site-settings";
import { getTeamMembers } from "@/lib/team";
import { MAIN_PHONE, MAIN_PHONE_DISPLAY } from "@/lib/constants";
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
  const [siteSettings, teamMembers] = await Promise.all([
    getPublicSiteSettings(),
    getTeamMembers(),
  ]);

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

      {/* Our Story */}
      <section className="bg-white py-20">
        <div className="container mx-auto px-4">
          <div className="mx-auto grid max-w-5xl items-center gap-12 md:grid-cols-2">
            <div>
              <h2 className="mb-6 text-3xl font-bold text-gray-900 md:text-4xl">Our Story</h2>
              <div className="space-y-5 text-lg text-gray-700">
                <p>{aboutContent.description1}</p>
                <p>Founded in 2020, we started with a vision to bring professional auto repair services directly to people&apos;s doorsteps. What began as a small team of passionate mechanics has grown into India&apos;s most trusted doorstep auto service provider.</p>
                <p>Today, we serve over 10,000 happy customers across Bengaluru, Chennai, Hyderabad and Mumbai — providing 24/7 service for both cars and bikes.</p>
              </div>
            </div>
            <CmsImage
              src="https://vpnztzzsyzgesnpihxsu.supabase.co/storage/v1/object/public/images/general/about-us-fiixup-1779454912831.webp"
              alt={aboutContent.imageAlt}
              title="About Fiixup doorstep car and bike service"
              ratio="about"
              fit="contain"
              sizes="(max-width: 768px) 100vw, 50vw"
              className="shadow-xl"
            />
          </div>
        </div>
      </section>

      {/* Trust stats */}
      <section className="bg-blue-600 py-14">
        <div className="container mx-auto px-4">
          <div className="grid grid-cols-2 gap-6 md:grid-cols-4">
            {stats.map((stat) => (
              <div key={stat.label} className="text-center text-white">
                <stat.icon className="mx-auto mb-2 h-8 w-8 text-blue-200" />
                <p className="text-2xl font-bold sm:text-4xl">{stat.value}</p>
                <p className="mt-1 text-sm text-blue-100 sm:text-base">{stat.label}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Mission, Vision, Values */}
      <section className="bg-gray-50 py-20">
        <div className="container mx-auto max-w-5xl px-4">
          <SectionHeader heading="Our Mission &amp; Values" />
          <div className="grid gap-8 md:grid-cols-3">
            {mvvItems.map(({ Icon, title, text }) => (
              <div key={title} className="rounded-2xl bg-white p-6 text-center shadow-sm">
                <div className="mx-auto mb-4 flex h-16 w-16 items-center justify-center rounded-full bg-blue-100">
                  <Icon className="h-8 w-8 text-blue-600" />
                </div>
                <h3 className="mb-2 text-xl font-semibold text-gray-900">{title}</h3>
                <p className="text-gray-600">{text}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* What Sets Us Apart */}
      <section className="py-20 bg-white">
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

      {/* How It Works */}
      <section className="bg-gray-50 py-20">
        <div className="container mx-auto px-4">
          <SectionHeader heading={aboutContent.sections.howItWorks} />
          <HowItWorks />
        </div>
      </section>

      <TeamSection members={teamMembers} />

      <Testimonials />

      {/* Closing CTA */}
      <section className="bg-white py-16">
        <div className="container mx-auto px-4 text-center">
          <h2 className="mb-3 text-2xl font-bold text-gray-900 md:text-3xl">
            Ready for hassle-free vehicle care?
          </h2>
          <p className="mx-auto mb-8 max-w-xl text-gray-600">
            Book a certified mechanic to your doorstep in minutes — transparent pricing, genuine parts, 30-day warranty.
          </p>
          <div className="flex flex-wrap items-center justify-center gap-4">
            <Link
              href="/contact"
              className="inline-block rounded-full bg-blue-600 px-8 py-3 font-semibold text-white shadow-lg transition-all hover:-translate-y-0.5 hover:bg-blue-700 hover:shadow-blue-200"
            >
              Book Service Now
            </Link>
            <a
              href={`tel:${MAIN_PHONE}`}
              className="inline-flex items-center gap-2 rounded-full border border-gray-200 px-8 py-3 font-semibold text-gray-700 transition-colors hover:border-blue-200 hover:text-blue-600"
            >
              <Phone className="h-4 w-4" />
              {MAIN_PHONE_DISPLAY}
            </a>
          </div>
        </div>
      </section>
    </>
  );
}

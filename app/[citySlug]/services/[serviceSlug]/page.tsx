// app/[citySlug]/services/page.tsx
// ─────────────────────────────────────────────────────────────────────────────
// City-level services index — renders all service categories for a given city.
// URL: /bengaluru/services, /chennai/services, etc.
// ─────────────────────────────────────────────────────────────────────────────
import { notFound } from "next/navigation";
import type { Metadata } from "next";
import Link from "next/link";
import { Phone } from "lucide-react";

import cities, { getCityBySlug } from "@/lib/cities";
import { serviceCategories } from "@/lib/data/serviceCategory";
import { serviceThemes, type ThemeColor } from "@/lib/theme";
import { SITE_URL, MAIN_PHONE, MAIN_PHONE_DISPLAY } from "@/lib/constants";
import { TrustStrip } from "@/components/ui/TrustStrip";
import HowItWorks from "@/components/ui/HowItWorks";

// Pre-render all city/services pages at build time
export function generateStaticParams() {
  return cities.map((city) => ({ citySlug: city.slug }));
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ citySlug: string }>;
}): Promise<Metadata> {
  const { citySlug } = await params;
  const city = getCityBySlug(citySlug);
  if (!city) return {};

  return {
    title: `All Car & Bike Services in ${city.name} | Doorstep Repair | Fiixup`,
    description: `Browse all doorstep car and bike repair services available in ${city.name}. Certified technicians, 24/7 availability across ${city.areas
      .slice(0, 3)
      .map((a) => (typeof a === "string" ? a : a.name))
      .join(", ")} & more.`,
    alternates: { canonical: `${SITE_URL}/${city.slug}/services` },
    openGraph: {
      title: `All Services in ${city.name} | Fiixup`,
      description: `Doorstep car & bike repair in ${city.name} — 24/7 service across all areas.`,
      url: `${SITE_URL}/${city.slug}/services`,
    },
  };
}

export default async function CityServicesPage({
  params,
}: {
  params: Promise<{ citySlug: string }>;
}) {
  const { citySlug } = await params;
  const city = getCityBySlug(citySlug);
  if (!city) notFound();

  return (
    <>
      {/* HERO */}
      <section className="bg-gradient-to-br from-blue-50 to-blue-100 py-16">
        <div className="container mx-auto px-4 text-center">
          {/* Breadcrumb */}
          <nav className="text-sm text-gray-500 mb-6 flex justify-center gap-1">
            <Link href="/" className="hover:underline">Home</Link>
            <span>/</span>
            <Link href={`/${city.slug}`} className="hover:underline">{city.name}</Link>
            <span>/</span>
            <span className="text-gray-700 font-medium">Services</span>
          </nav>

          <h1 className="text-4xl md:text-5xl font-bold text-gray-900 mb-4">
            Doorstep Car &amp; Bike Services in {city.name}
          </h1>
          <p className="text-lg text-gray-700 max-w-2xl mx-auto mb-8">
            Certified technicians come to your home or office across {city.name} — 24/7,
            for all makes and models.
          </p>
          <div className="flex flex-wrap gap-4 justify-center">
            <Link
              href="/contact#contact-form"
              className="bg-blue-600 text-white px-8 py-3 rounded-lg hover:bg-blue-700 transition-colors font-semibold"
            >
              Book a Service in {city.name}
            </Link>
            <a
              href={`tel:${city.phone.replace(/\s/g, "")}`}
              className="bg-red-600 text-white px-8 py-3 rounded-lg hover:bg-red-700 transition-colors font-semibold flex items-center gap-2"
            >
              <Phone className="w-4 h-4" /> {city.phone}
            </a>
          </div>
        </div>
      </section>

      <TrustStrip />

      {/* SERVICE CATEGORY GRID */}
      <section className="py-16 bg-white">
        <div className="container mx-auto px-4">
          <h2 className="text-2xl md:text-3xl font-bold text-center mb-3">
            All Services Available in {city.name}
          </h2>
          <p className="text-gray-600 text-center mb-12 max-w-xl mx-auto">
            Select a service category to see all available options, pricing, and booking.
          </p>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
            {serviceCategories.map((cat) => {
              const theme = serviceThemes[cat.color as ThemeColor] || serviceThemes.blue;
              const CategoryIcon = cat.icon;

              return (
                <Link
                  key={cat.slug}
                  href={`/${city.slug}/services/${cat.slug}`}
                  className={`group relative p-8 rounded-2xl bg-white border border-gray-100 transition-all duration-300 flex flex-col hover:shadow-2xl hover:-translate-y-1 ${theme.hoverBorder}`}
                >
                  <div
                    className={`mb-6 inline-flex w-fit p-4 rounded-xl border border-gray-50 bg-gray-50/50 group-hover:bg-white transition-all duration-300 ${theme.hoverIconBg}`}
                  >
                    <CategoryIcon className={`w-10 h-10 ${theme.iconText}`} />
                  </div>

                  <h3 className="text-xl font-bold text-gray-900 mb-2">
                    {cat.title} in {city.name}
                  </h3>

                  <p className="text-gray-500 text-sm leading-relaxed mb-6 flex-1">
                    {cat.description.replace(
                      "at your doorstep",
                      `at your doorstep in ${city.name}`
                    )}
                  </p>

                  <span
                    className={`mt-4 text-sm font-semibold flex items-center gap-1 opacity-0 group-hover:opacity-100 transition-opacity ${theme.linkText}`}
                  >
                    Explore {cat.title} →
                  </span>
                </Link>
              );
            })}
          </div>
        </div>
      </section>

      {/* HOW IT WORKS */}
      <section className="py-16 bg-gray-50">
        <div className="container mx-auto px-4">
          <h2 className="text-2xl md:text-3xl font-bold text-center mb-12">How It Works</h2>
          <HowItWorks />
        </div>
      </section>

      {/* BOTTOM CTA */}
      <section className="py-16 bg-blue-600 text-white text-center">
        <div className="container mx-auto px-4">
          <h2 className="text-3xl font-bold mb-4">
            Need Help Choosing a Service in {city.name}?
          </h2>
          <p className="text-white mb-8 text-lg">
            Call us and describe the problem — our team will guide you to the right service,
            with no obligation.
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

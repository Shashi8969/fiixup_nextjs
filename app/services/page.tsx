import type { Metadata } from "next";
import Link from "next/link";
import { Phone } from "lucide-react";
import { iconMap } from "@/lib/icons";
import { serviceCategories } from "@/lib/data/serviceCategory";
import { ServiceCardPrice } from "@/components/ui/ServiceCardPrice";
import { TrustStrip } from "@/components/ui/TrustStrip";
import HowItWorks from "@/components/ui/HowItWorks";
import WhyChooseDoorstep from "@/components/ui/WhyChooseDoorstep";
import { getStaticPageSEO } from "@/lib/data/seo";
import { MAIN_PHONE, MAIN_PHONE_DISPLAY } from "@/lib/constants";

const seo = getStaticPageSEO("services")!;

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

export default function ServicesPage() {
  return (
    <>
      {/* HERO */}
      <section className="bg-gradient-to-br from-blue-50 to-blue-100 py-16">
        <div className="container mx-auto px-4 text-center">
          <h1 className="text-4xl md:text-5xl font-bold text-gray-900 mb-4">
            Doorstep Car &amp; Bike Repair Services
          </h1>
          <p className="text-lg text-gray-700 max-w-2xl mx-auto mb-8">
            From routine oil changes to emergency repairs — our certified technicians come
            to your home or office across Bengaluru, Chennai, Hyderabad &amp; Mumbai, 24/7.
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

      {/* SERVICE CATEGORY SECTIONS */}
      {serviceCategories.map((category) => (
        <section key={category.slug} className={`py-8 ${category.bgColor}`}>
          <div className="container mx-auto px-4">
            <h2 className="text-2xl md:text-3xl font-bold flex items-center gap-2 mb-3">
              <category.icon className={`w-7 h-7 text-${category.color}-700`} />
              {category.title}
            </h2>
            <p className="text-gray-600 mb-8">{category.description}</p>
            <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6">
              {category.data.map((s) => (
                <ServiceCardPrice
                  key={s.slug}
                  slug={s.slug}
                  title={s.shortTitle}
                  tagline={s.tagline}
                  price={s.price}
                  duration={s.duration}
                  accentColor={category.color}
                  icon={iconMap[s.icon]}
                />
              ))}
            </div>
          </div>
        </section>
      ))}

      <section className="py-16 bg-gray-50">
        <div className="container mx-auto px-4">
          <h2 className="text-2xl md:text-3xl font-bold text-center mb-12">How It Works</h2>
          <HowItWorks />
        </div>
      </section>

      <WhyChooseDoorstep />

      {/* BOTTOM CTA */}
      <section className="py-16 bg-blue-600 text-white text-center">
        <div className="container mx-auto px-4">
          <h2 className="text-3xl font-bold mb-4">Not Sure What You Need?</h2>
          <p className="text-white mb-8 text-lg">
            Call us and describe the problem — we&apos;ll tell you exactly what service you need, with no obligation.
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

<<<<<<< HEAD
// app/services/page.tsx
import type { Metadata } from "next";
import Link from "next/link";
import { iconMap } from "@/lib/icons";
import {
  Phone, CheckCircle, Clock, Shield, Award, 
} from "lucide-react";
import { serviceCategories } from "@/lib/data/serviceCategory";
import { SITE_URL } from "@/lib/constants";
import { ServiceCardPrice } from "@/components/ui/ServiceCardPrice";
import HowItWorks from "@/components/ui/HowItWorks";
import WhyChooseDoorstep from "@/components/ui/WhyChooseDoorstep";

export const metadata: Metadata = {
  title: "All Car & Bike Doorstep Repair Services | Fiixup",
  description: "Browse all Fiixup doorstep auto repair services — car repair, bike service, oil change, AC service, brake repair & more. 24/7 across Bengaluru, Chennai, Hyderabad & Mumbai.",
  alternates: { canonical: `${SITE_URL}/services` },
  openGraph: {
    title: "All Car & Bike Doorstep Repair Services | Fiixup",
    description: "24/7 doorstep car and bike repair across Bengaluru, Chennai, Hyderabad & Mumbai.",
    url: `${SITE_URL}/services`,
  },
};


const trustItems = [
  { icon: Clock, label: "24/7 Service", sub: "Emergency & regular" },
  { icon: Award, label: "Certified Techs", sub: "Trained professionals" },
  { icon: Shield, label: "30-Day Warranty", sub: "On all repairs" },
  { icon: CheckCircle, label: "Transparent Pricing", sub: "No hidden charges" },
];

=======
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

>>>>>>> 8dcb818 (reconect github)
export default function ServicesPage() {
  return (
    <>
      {/* HERO */}
      <section className="bg-gradient-to-br from-blue-50 to-blue-100 py-16">
        <div className="container mx-auto px-4 text-center">
          <h1 className="text-4xl md:text-5xl font-bold text-gray-900 mb-4">
<<<<<<< HEAD
            Doorstep Car & Bike Repair Services
          </h1>
          <p className="text-lg text-gray-700 max-w-2xl mx-auto mb-8">
            From routine oil changes to emergency repairs — our certified technicians come
            to your home or office across Bengaluru, Chennai, Hyderabad & Mumbai, 24/7.
          </p>
          <div className="flex flex-wrap gap-4 justify-center">
            <Link href="/contact#contact-form" className="bg-blue-600 text-white px-8 py-3 rounded-lg hover:bg-blue-700 transition-colors font-semibold">
              Book a Service
            </Link>
            <a href="tel:+918197459732" className="bg-red-600 text-white px-8 py-3 rounded-lg hover:bg-red-700 transition-colors font-semibold flex items-center gap-2">
              <Phone className="w-4 h-4" /> Call Now
=======
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
>>>>>>> 8dcb818 (reconect github)
            </a>
          </div>
        </div>
      </section>

<<<<<<< HEAD
      {/* TRUST STRIP */}
      <section className="bg-white border-b border-gray-100 py-4">
        <div className="container mx-auto px-4">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4 text-center">
            {trustItems.map(({ icon: Icon, label, sub }) => (
              <div key={label} className="flex flex-col items-center gap-1">
                <Icon className="w-6 h-6 text-green-700 mb-1" />
                {/* Fix: text-green-600 → text-green-700 on white (matches theme.ts update) */}
                <p className="font-bold text-gray-900 text-sm">{label}</p>
                {/* Fix: text-gray-500 at xs size is borderline — bumped to text-gray-600 */}
                <p className="text-xs text-gray-600">{sub}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* SERVICE CATEGORY SECTIONS */}
      {serviceCategories.map((category, index) => (
        <section key={index} className={`py-8 ${category.bgColor}`}>
          <div className="container mx-auto px-4">
            {/*
              Fix: heading order issue.
              This page uses h1 (hero) → h2 (category titles) which is correct.
              The audit flagged an h4 "CAR SERVICES" inside a component (likely
              WhyChooseDoorstep or HowItWorks). The category headings here are
              already h2 — correct. Check child components for stray h4s that
              should be h3.
            */}
            <h2 className="text-2xl md:text-3xl font-bold flex items-center gap-2 mb-3">
              <category.icon className={`w-7 h-7 text-${category.color}-700`} />
              {/* Fix: icon color uses -700 to match updated theme.ts */}
              {category.title}
            </h2>
            <p className="text-gray-600 mb-8">
              {category.description}
            </p>
=======
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
>>>>>>> 8dcb818 (reconect github)
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

<<<<<<< HEAD
      <section className="py-8 bg-gray-50">
=======
      <section className="py-16 bg-gray-50">
>>>>>>> 8dcb818 (reconect github)
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
<<<<<<< HEAD
          {/*
            Fix 1: text-blue-100 on bg-blue-600 = ~1.7:1 contrast (FAIL).
            Changed to text-white = 4.6:1 on blue-600 (PASS ✅).
          */}
          <p className="text-white mb-8 text-lg">
            Call us and describe the problem — we'll tell you exactly what service you need, with no obligation.
          </p>
          <div className="flex flex-wrap gap-4 justify-center">
            <Link href="/contact#contact-form" className="bg-white text-blue-600 px-8 py-3 rounded-lg font-bold hover:bg-blue-50 transition-colors">
              Book Service Now
            </Link>
            {/*
              Fix 2: bg-red-500 on white text = ~3.9:1 (FAIL for AA).
              Changed to bg-red-600 = ~5.0:1 (PASS ✅).
              hover state was already bg-red-600, so this makes default match hover.
            */}
            <a href="tel:+918197459732" className="bg-red-600 text-white px-8 py-3 rounded-lg font-bold hover:bg-red-700 transition-colors flex items-center gap-2">
              <Phone className="w-4 h-4" /> +91 81974 59732
=======
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
>>>>>>> 8dcb818 (reconect github)
            </a>
          </div>
        </div>
      </section>
    </>
  );
}

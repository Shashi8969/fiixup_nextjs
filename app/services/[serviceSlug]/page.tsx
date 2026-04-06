"use client";

import { use } from "react";
import { notFound } from "next/navigation";

import CityCoverage from "@/components/service/ServiceCities";
import FAQ from "@/components/service/ServiceFAQ";
import Hero from "@/components/service/ServiceHero";
import TrustStrip from "@/components/service/ServiceTrustStrip";
import { Testimonials } from "@/components/Testimonials";
import BookingCTA from "@/components/ui/BookingCTA";
import HowItWorks from "@/components/ui/HowItWorks";

import { iconMap } from "@/lib/icons";
import { getServiceBySlug, carServices, bikeServices } from "@/lib/services";

// ✅ add missing brand lists
const carBrands = ['Maruti','Hyundai','Tata','Honda','Toyota','Kia','MG','Mahindra','Volkswagen','Skoda'];
const bikeBrands = ['Honda','Bajaj','TVS','Royal Enfield','Yamaha','Hero','Suzuki','KTM'];

export default function Page({
  params,
}: {
  params: Promise<{ serviceSlug: string }>;
}) {
  const { serviceSlug } = use(params);

  // ✅ FIXED
  const service = getServiceBySlug(serviceSlug ?? "");

  if (!service) return notFound();

  const Icon = iconMap[service.icon];
  const isCar = service.category === "car";

  // ✅ SAME LOGIC (unchanged)
  const accentBlue = isCar ? "text-blue-600" : "text-red-600";
  const bgAccent = isCar ? "bg-blue-600" : "bg-red-600";
  const borderAccent = isCar ? "border-blue-300" : "border-red-300";
  const bgLight = isCar ? "bg-blue-50" : "bg-red-50";

  // ✅ FIXED
  const brands = isCar ? carBrands : bikeBrands;

  const related = (isCar ? carServices : bikeServices)
    .filter((s) => s.slug !== service.slug)
    .slice(0, 3);

  return (
    <>
      {/* HERO */}
      <Hero
        service={service}
        Icon={Icon}
        isCar={isCar}
        bgAccent={bgAccent}
        accentBlue={accentBlue}
        bgLight={bgLight}
      />

      {/* TRUST STRIP */}
      <TrustStrip />

      {/* DESCRIPTION + INCLUDED */}
      <section className="py-16 bg-white">
        <div className="container mx-auto px-4 grid md:grid-cols-2 gap-12">
          
          {/* LEFT */}
          <div>
            <h2 className="text-2xl font-bold mb-4">About This Service</h2>
            <p className="text-gray-700 text-lg mb-8">
              {service.description}
            </p>

            <h3 className="font-bold mb-3">
              {isCar ? "Car Brands We Service" : "Bike Brands We Service"}
            </h3>

            <div className="flex flex-wrap gap-2">
              {brands.map((b) => (
                <span key={b} className="bg-gray-100 px-3 py-1 rounded-full">
                  {b}
                </span>
              ))}
            </div>
          </div>

          {/* RIGHT */}
          <div className={`${bgLight} rounded-2xl p-8`}>
            <h2 className="text-2xl font-bold mb-6">What's Included</h2>
            <ul className="space-y-4">
              {service.features.map((f) => (
                <li key={f} className="flex items-start gap-3">
                  <span className="text-green-600">✔</span>
                  <span>{f}</span>
                </li>
              ))}
            </ul>
          </div>
        </div>
      </section>

      {/* HOW IT WORKS */}
      <section className="py-16 bg-gray-50">
        <div className="container mx-auto px-4">
          <h2 className="text-2xl md:text-3xl font-bold text-center mb-12">
            How Doorstep {service.shortTitle} Works
          </h2>
          <HowItWorks />
        </div>
      </section>

      {/* CITY COVERAGE */}
      <CityCoverage
        service={service}
        borderAccent={borderAccent}
        accentBlue={accentBlue}
      />

      {/* TESTIMONIALS */}
      <Testimonials />

      {/* FAQ */}
      <section className="py-16 bg-white">
        <div className="container mx-auto px-4 max-w-3xl">
          <h2 className="text-2xl md:text-3xl font-bold text-center mb-2">
            {service.shortTitle} — Frequently Asked Questions
          </h2>

          <p className="text-gray-500 text-center mb-10">
            Common questions about our doorstep{" "}
            {service.shortTitle.toLowerCase()} service.
          </p>

          <FAQ faqs={service.faqs} />
        </div>
      </section>

      {/* RELATED SERVICES */}
      <section className="py-16 bg-gray-50">
        <div className="container mx-auto px-4">
          <h2 className="text-2xl font-bold mb-8">
            Other {isCar ? "Car" : "Bike"} Services You May Need
          </h2>

          <div className="grid sm:grid-cols-3 gap-6">
            {related.map((s) => {
const RelIcon = iconMap[s.icon] || iconMap["default"];

if (!RelIcon) {
    console.error("Missing icon for:", s.icon);
    return null; // prevents crash
  }

              return (
                <a
                  key={s.slug}
                  href={`/services/${s.slug}`}
                  className="bg-white p-6 border rounded-xl hover:shadow-lg transition-all"
                >
                  <RelIcon className={`w-10 h-10 ${accentBlue} mb-3`} />
                  <h3 className="font-bold mb-1">{s.shortTitle}</h3>
                  <p className="text-sm text-gray-500 mb-3">
                    {s.tagline}
                  </p>
                  <p className={`text-sm font-bold ${accentBlue}`}>
                    From {s.price}
                  </p>
                </a>
              );
            })}
          </div>
        </div>
      </section>

      {/* CTA */}
      <BookingCTA
        serviceTitle={service.shortTitle}
        bgAccent={bgAccent}
      />
    </>
  );
}
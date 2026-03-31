"use client";

import { useState } from "react";
import Link from "next/link";
import {
  CheckCircle, Phone, ChevronDown, ChevronUp,
  ArrowLeft, Clock, Shield, Award, MapPin,
  Wrench, Car, Gauge, Droplet, Wind, Battery,
  Settings, Bike, Zap, Cog, CircuitBoard,
  type LucideIcon,
} from "lucide-react";
import { ServiceData } from "@/lib/models/service.model";
import type { CityData } from "@/lib/models/city.model";
import { carServices, bikeServices } from "@/lib/services";

const iconMap: Record<string, LucideIcon> = {
  Wrench, Car, Gauge, Droplet, Wind, Battery,
  Settings, Shield, Bike, Zap, Cog, CircuitBoard,
};

const carBrands  = ['Maruti','Hyundai','Tata','Honda','Toyota','Kia','MG','Mahindra','Volkswagen','Skoda'];
const bikeBrands = ['Honda','Bajaj','TVS','Royal Enfield','Yamaha','Hero','Suzuki','KTM'];

export function CityServiceDetail({
  service,
  city,
}: {
  service: ServiceData;
  city: CityData;
}) {
  const [openFaq, setOpenFaq] = useState<number | null>(null);

  const Icon         = iconMap[service.icon] ?? Wrench;
  const isCar        = service.category === 'car';
  const accentBlue   = isCar ? 'text-blue-600'  : 'text-red-600';
  const bgAccent     = isCar ? 'bg-blue-600'     : 'bg-red-600';
  const borderAccent = isCar ? 'border-blue-300' : 'border-red-300';
  const bgLight      = isCar ? 'bg-blue-50'      : 'bg-red-50';
  const brands       = isCar ? carBrands : bikeBrands;

  const related = (isCar ? carServices : bikeServices)
    .filter((s) => s.slug !== service.slug)
    .slice(0, 3);

  return (
    <>
      {/* ── HERO ── */}
      <section className={`${bgLight} py-6 border-b border-gray-200`}>
        <div className="container mx-auto px-4">
          <nav className="flex items-center gap-2 text-sm text-gray-500 mb-6 flex-wrap">
            <Link href="/" className="hover:text-blue-600 transition-colors">Home</Link>
            <span>/</span>
            <Link href={`/${city.slug}`} className="hover:text-blue-600 transition-colors">{city.name}</Link>
            <span>/</span>
            <span className="text-gray-900 font-medium">{service.shortTitle} in {city.name}</span>
          </nav>

          <div className="grid md:grid-cols-2 gap-12 items-center">
            <div>
              <span className={`inline-block ${bgAccent} text-white text-xs font-bold px-3 py-1 rounded-full uppercase tracking-wide mb-4`}>
                {isCar ? '🚗 Car Service' : '🏍️ Bike Service'} — {city.name}
              </span>
              <h1 className="text-3xl md:text-4xl font-bold text-gray-900 mb-3 leading-tight">
                {service.shortTitle} in {city.name}
              </h1>
              <p className="text-lg text-gray-600 mb-2">{service.tagline}</p>
              <p className="text-sm text-blue-700 bg-blue-50 border border-blue-200 rounded-lg px-4 py-2 mb-6">
                Serving {city.areas.slice(0, 4).join(', ')} & all areas across {city.name}
              </p>
              <div className="flex flex-wrap gap-6 mb-8">
                <div>
                  <p className={`text-2xl font-bold ${accentBlue}`}>Starting {service.price}</p>
                  <p className="text-xs text-gray-500 mt-0.5">Transparent pricing</p>
                </div>
                <div className="w-px bg-gray-200" />
                <div>
                  <p className="text-2xl font-bold text-gray-900">{service.duration}</p>
                  <p className="text-xs text-gray-500 mt-0.5">Estimated time</p>
                </div>
                <div className="w-px bg-gray-200" />
                <div>
                  <p className="text-2xl font-bold text-green-600">24/7</p>
                  <p className="text-xs text-gray-500 mt-0.5">Available</p>
                </div>
              </div>
              <div className="flex flex-wrap gap-3">
                <Link href={`/${city.slug}#contact`} className={`${bgAccent} text-white px-8 py-3 rounded-lg font-bold hover:opacity-90 transition-opacity`}>
                  Book in {city.name}
                </Link>
                <a href={`tel:${city.phone}`} className="bg-white border-2 border-gray-200 text-gray-800 px-6 py-3 rounded-lg font-bold hover:border-blue-400 transition-colors flex items-center gap-2">
                  <Phone className="w-4 h-4" /> {city.phone}
                </a>
              </div>
            </div>
            <div className="hidden md:flex justify-center">
              <div className="bg-white rounded-3xl shadow-xl p-16">
                <Icon className={`w-36 h-36 ${accentBlue}`} />
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* ── TRUST STRIP ── */}
      <section className="bg-white border-b border-gray-100 py-5">
        <div className="container mx-auto px-4">
          <div className="flex flex-wrap justify-center gap-8">
            {[
              { icon: Award,       label: 'Certified Technicians'    },
              { icon: Shield,      label: '30-Day Warranty'          },
              { icon: Clock,       label: '24/7 Available'           },
              { icon: CheckCircle, label: 'Transparent Pricing'      },
              { icon: MapPin,      label: `Doorstep in ${city.name}` },
            ].map(({ icon: I, label }) => (
              <div key={label} className="flex items-center gap-2">
                <I className="w-5 h-5 text-green-600" />
                <span className="text-sm font-semibold text-gray-700">{label}</span>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ── DESCRIPTION + INCLUDED ── */}
      <section className="py-16 bg-white">
        <div className="container mx-auto px-4">
          <div className="grid md:grid-cols-2 gap-12">
            <div>
              <h2 className="text-2xl font-bold mb-4">{service.shortTitle} in {city.name}</h2>
              <p className="text-gray-700 leading-relaxed text-lg mb-4">{service.description}</p>
              <p className="text-gray-600 leading-relaxed mb-8">
                Our certified technicians cover all areas of {city.name} including {city.areas.join(', ')} — reaching you within 30–60 minutes.
              </p>
              <h3 className="font-bold text-gray-900 mb-3">{isCar ? 'Car Brands We Service' : 'Bike Brands We Service'}</h3>
              <div className="flex flex-wrap gap-2">
                {brands.map((b) => (
                  <span key={b} className="bg-gray-100 text-gray-700 text-sm font-medium px-3 py-1 rounded-full">{b}</span>
                ))}
                <span className="bg-gray-100 text-gray-500 text-sm px-3 py-1 rounded-full">+ more</span>
              </div>
            </div>
            <div className={`${bgLight} rounded-2xl p-8`}>
              <h2 className="text-2xl font-bold mb-6">What's Included</h2>
              <ul className="space-y-4">
                {service.features.map((f) => (
                  <li key={f} className="flex items-start gap-3">
                    <CheckCircle className="w-5 h-5 text-green-600 mt-0.5 flex-shrink-0" />
                    <span className="text-gray-800 font-medium">{f}</span>
                  </li>
                ))}
              </ul>
            </div>
          </div>
        </div>
      </section>

      {/* ── HOW IT WORKS ── */}
      <section className="py-16 bg-gray-50">
        <div className="container mx-auto px-4">
          <h2 className="text-2xl md:text-3xl font-bold text-center mb-12">
            How Doorstep {service.shortTitle} Works in {city.name}
          </h2>
          <div className="grid sm:grid-cols-2 md:grid-cols-4 gap-8 max-w-4xl mx-auto">
            {[
              { step: '1', title: 'Book Online or Call',       desc: `Call ${city.phone} or fill the form. Takes under 60 seconds.` },
              { step: '2', title: 'We Confirm & Dispatch',     desc: `We dispatch the nearest ${city.name} technician to your location.` },
              { step: '3', title: 'Tech Arrives at Your Door', desc: 'Certified technician arrives with tools & parts within the hour.' },
              { step: '4', title: 'Drive Away Happy',          desc: 'Service complete. 30-day warranty and digital receipt provided.' },
            ].map(({ step, title, desc }) => (
              <div key={step} className="text-center">
                <div className={`w-14 h-14 ${bgAccent} text-white rounded-full flex items-center justify-center mx-auto mb-4 text-2xl font-bold shadow-lg`}>{step}</div>
                <h3 className="font-bold text-gray-900 mb-2">{title}</h3>
                <p className="text-gray-600 text-sm">{desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ── CITY AREAS ── */}
      <section className="py-14 bg-white">
        <div className="container mx-auto px-4">
          <h2 className="text-2xl font-bold text-center mb-8">{service.shortTitle} Available Across {city.name}</h2>
          <div className="flex flex-wrap gap-3 justify-center">
            {city.areas.map((area) => (
              <span key={area} className={`flex items-center gap-2 border-2 ${borderAccent} ${accentBlue} font-semibold px-5 py-2 rounded-full text-sm`}>
                <MapPin className="w-4 h-4" />{service.shortTitle} in {area}
              </span>
            ))}
          </div>
        </div>
      </section>

      {/* ── TESTIMONIALS ── */}
      <section className="py-16 bg-blue-50">
        <div className="container mx-auto px-4">
          <h2 className="text-2xl md:text-3xl font-bold text-center mb-10">What {city.name} Customers Say</h2>
          <div className="grid sm:grid-cols-3 gap-6 max-w-4xl mx-auto">
            {city.testimonials.slice(0, 3).map((review, i) => (
              <div key={i} className="bg-white rounded-xl p-6 shadow-sm">
                <div className="flex gap-0.5 mb-3">
                  {[...Array(review.rating)].map((_, j) => (
                    <span key={j} className="text-yellow-400 text-sm">★</span>
                  ))}
                </div>
                <p className="text-gray-700 text-sm mb-4">"{review.text}"</p>
                <div className="border-t pt-3">
                  <p className="font-semibold text-gray-900 text-sm">{review.name}</p>
                  <p className="text-blue-600 text-xs flex items-center gap-1 mt-0.5">
                    <MapPin className="w-3 h-3" />{review.area}
                  </p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ── FAQ ── */}
      <section className="py-16 bg-white">
        <div className="container mx-auto px-4 max-w-3xl">
          <h2 className="text-2xl md:text-3xl font-bold mb-2 text-center">{service.shortTitle} in {city.name} — FAQs</h2>
          <p className="text-gray-500 text-center mb-10">Common questions about our {service.shortTitle.toLowerCase()} service in {city.name}.</p>
          <div className="space-y-4">
            {service.faqs.map((faq, i) => (
              <div key={i} className="border border-gray-200 rounded-xl overflow-hidden">
                <button onClick={() => setOpenFaq(openFaq === i ? null : i)}
                  className="w-full flex items-center justify-between p-5 text-left font-semibold text-gray-900 hover:bg-gray-50 transition-colors">
                  <span>{faq.q}</span>
                  {openFaq === i
                    ? <ChevronUp className="w-5 h-5 text-blue-600 flex-shrink-0" />
                    : <ChevronDown className="w-5 h-5 text-gray-400 flex-shrink-0" />}
                </button>
                {openFaq === i && (
                  <div className="px-5 pb-5 pt-3 text-gray-600 leading-relaxed border-t border-gray-100">{faq.a}</div>
                )}
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ── RELATED SERVICES ── */}
      <section className="py-16 bg-gray-50">
        <div className="container mx-auto px-4">
          <h2 className="text-2xl font-bold mb-8">Other {isCar ? 'Car' : 'Bike'} Services in {city.name}</h2>
          <div className="grid sm:grid-cols-3 gap-6">
            {related.map((s) => {
              const RelIcon = iconMap[s.icon] ?? Wrench;
              return (
                <Link key={s.slug} href={`/${city.slug}/services/${s.slug}`}
                  className="bg-white p-6 border border-gray-200 rounded-xl hover:shadow-lg transition-all group">
                  <RelIcon className={`w-10 h-10 ${accentBlue} mb-3`} />
                  <h3 className={`font-bold text-gray-900 group-hover:${accentBlue} transition-colors mb-1`}>
                    {s.shortTitle} in {city.name}
                  </h3>
                  <p className="text-sm text-gray-500 mb-3">{s.tagline}</p>
                  <p className={`text-sm font-bold ${accentBlue}`}>From {s.price}</p>
                </Link>
              );
            })}
          </div>
          <div className="mt-8 text-center">
            <Link href={`/${city.slug}`} className="inline-flex items-center gap-2 text-blue-600 font-semibold hover:gap-3 transition-all">
              <ArrowLeft className="w-4 h-4" /> Back to {city.name} Services
            </Link>
          </div>
        </div>
      </section>

      {/* ── BOTTOM CTA ── */}
      <section className={`py-16 ${bgAccent} text-white text-center`}>
        <div className="container mx-auto px-4">
          <h2 className="text-3xl font-bold mb-3">Book {service.shortTitle} in {city.name} Now</h2>
          <p className="text-white/80 mb-8 text-lg">
            Certified technicians available 24/7 across {city.areas.slice(0, 3).join(', ')} & all of {city.name}.
          </p>
          <div className="flex flex-wrap gap-4 justify-center">
            <Link href={`/${city.slug}#contact`} className="bg-white text-gray-900 px-8 py-3 rounded-lg font-bold hover:bg-gray-100 transition-colors">
              Book Service Now
            </Link>
            <a href={`tel:${city.phone}`} className="bg-black/20 text-white border border-white/30 px-8 py-3 rounded-lg font-bold hover:bg-black/30 transition-colors flex items-center gap-2">
              <Phone className="w-4 h-4" /> {city.phone}
            </a>
          </div>
        </div>
      </section>
    </>
  );
}
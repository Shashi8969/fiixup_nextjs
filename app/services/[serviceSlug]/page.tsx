// app/services/[serviceSlug]/page.tsx
"use client";

import { use, useState } from "react";
import { notFound } from "next/navigation";
import Link from "next/link";
import {
  CheckCircle, Phone, ChevronDown, ChevronUp,
  ArrowLeft, Clock, Shield, Award, Star, MapPin,
  Wrench, Car, Gauge, Droplet, Wind, Battery,
  Settings, Bike, Zap, Cog, CircuitBoard,
  type LucideIcon,
} from "lucide-react";
import { getServiceBySlug, carServices, bikeServices } from "@/lib/services";
import { serviceSchema, breadcrumbSchema } from "@/lib/schema";
import { Testimonials } from "@/components/Testimonials";
import type { Metadata } from "next";
import { SITE_URL } from "@/lib/constants";
import HowItWorks from "@/components/ui/HowItWorks";



const iconMap: Record<string, LucideIcon> = {
  Wrench, Car, Gauge, Droplet, Wind, Battery,
  Settings, Shield, Bike, Zap, Cog, CircuitBoard,
};

const carBrands  = ['Maruti','Hyundai','Tata','Honda','Toyota','Kia','MG','Mahindra','Volkswagen','Skoda'];
const bikeBrands = ['Honda','Bajaj','TVS','Royal Enfield','Yamaha','Hero','Suzuki','KTM'];
const serviceCities = ['Bengaluru','Chennai','Hyderabad','Mumbai'];




export default function ServiceDetailPage({ params }: { params: Promise<{ serviceSlug: string }>}) {
  const { serviceSlug } = use(params);
  const service = getServiceBySlug(serviceSlug ?? '');
  const [openFaq, setOpenFaq] = useState<number | null>(null);


  if (!service) notFound();
  

  const Icon       = iconMap[service.icon] ?? Wrench;
  const isCar      = service.category === 'car';
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
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify([
          serviceSchema({ name: service.title, description: service.description, slug: service.slug, price: service.price }),
          breadcrumbSchema([
            { name: 'Home', url: '/' },
            { name: 'Services', url: '/services' },
            { name: service.shortTitle, url: `/services/${service.slug}` },
          ]),
      
        ]) }}
      />

      {/* ── HERO ── */}
      <section className={`${bgLight} py-6 border-b border-gray-200`}>
        <div className="container mx-auto px-4">
          <nav className="flex items-center gap-2 text-sm text-gray-500 mb-6">
            <Link href="/" className="hover:text-blue-600 transition-colors">Home</Link>
            <span>/</span>
            <Link href="/services" className="hover:text-blue-600 transition-colors">Services</Link>
            <span>/</span>
            <span className="text-gray-900 font-medium">{service.shortTitle}</span>
          </nav>
          <div className="grid md:grid-cols-2 gap-12 items-center">
            <div>
              <span className={`inline-block ${bgAccent} text-white text-xs font-bold px-3 py-1 rounded-full uppercase tracking-wide mb-4`}>
                {isCar ? '🚗 Car Service' : '🏍️ Bike Service'}
              </span>
              <h1 className="text-3xl md:text-4xl font-bold text-gray-900 mb-3 leading-tight">{service.title}</h1>
              <p className="text-lg text-gray-600 mb-6">{service.tagline}</p>
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
                <Link href="/contact#contact-form" className={`${bgAccent} text-white px-8 py-3 rounded-lg font-bold hover:opacity-90 transition-opacity`}>
                  Book This Service
                </Link>
                <a href="tel:+918197459732" className="bg-white border-2 border-gray-200 text-gray-800 px-6 py-3 rounded-lg font-bold hover:border-blue-400 transition-colors flex items-center gap-2">
                  <Phone className="w-4 h-4" /> Call Now
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
              { icon: Award,       label: 'Certified Technicians' },
              { icon: Shield,      label: '30-Day Warranty'       },
              { icon: Clock,       label: '24/7 Available'        },
              { icon: CheckCircle, label: 'Transparent Pricing'   },
              { icon: MapPin,      label: 'Doorstep Service'      },
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
              <h2 className="text-2xl font-bold mb-4">About This Service</h2>
              <p className="text-gray-700 leading-relaxed text-lg mb-8">{service.description}</p>
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
          <h2 className="text-2xl md:text-3xl font-bold text-center mb-12">How Doorstep {service.shortTitle} Works</h2>
          <HowItWorks/>
        </div>
      </section>

      {/* ── CITY COVERAGE ── */}
      <section className="py-14 bg-white">
        <div className="container mx-auto px-4">
          <h2 className="text-2xl font-bold text-center mb-8">{service.shortTitle} Available Across India</h2>
          <div className="flex flex-wrap gap-4 justify-center">
            {serviceCities.map((city) => (
              <Link key={city} href={`/${city.toLowerCase()}`}
                className={`flex items-center gap-2 border-2 ${borderAccent} ${accentBlue} font-semibold px-6 py-3 rounded-full transition-all text-sm hover:opacity-80`}>
                <MapPin className="w-4 h-4" />
                {service.shortTitle} in {city}
              </Link>
            ))}
          </div>
        </div>
      </section>

      {/* ── TESTIMONIALS — reusing existing component ── */}
      <Testimonials />

      {/* ── FAQ ── */}
      <section className="py-16 bg-white">
        <div className="container mx-auto px-4 max-w-3xl">
          <h2 className="text-2xl md:text-3xl font-bold mb-2 text-center">{service.shortTitle} — Frequently Asked Questions</h2>
          <p className="text-gray-500 text-center mb-10">Common questions about our doorstep {service.shortTitle.toLowerCase()} service.</p>
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
          <h2 className="text-2xl font-bold mb-8">Other {isCar ? 'Car' : 'Bike'} Services You May Need</h2>
          <div className="grid sm:grid-cols-3 gap-6">
            {related.map((s) => {
              const RelIcon = iconMap[s.icon] ?? Wrench;
              return (
                <Link key={s.slug} href={`/services/${s.slug}`}
                  className="bg-white p-6 border border-gray-200 rounded-xl hover:shadow-lg transition-all group">
                  <RelIcon className={`w-10 h-10 ${accentBlue} mb-3`} />
                  <h3 className={`font-bold text-gray-900 group-hover:${accentBlue} transition-colors mb-1`}>{s.shortTitle}</h3>
                  <p className="text-sm text-gray-500 mb-3">{s.tagline}</p>
                  <p className={`text-sm font-bold ${accentBlue}`}>From {s.price}</p>
                </Link>
              );
            })}
          </div>
          <div className="mt-8 text-center">
            <Link href="/services" className="inline-flex items-center gap-2 text-blue-600 font-semibold hover:gap-3 transition-all">
              <ArrowLeft className="w-4 h-4" /> View All Services
            </Link>
          </div>
        </div>
      </section>

      {/* ── BOTTOM CTA ── */}
      <section className={`py-16 ${bgAccent} text-white text-center`}>
        <div className="container mx-auto px-4">
          <h2 className="text-3xl font-bold mb-3">Ready to Book {service.shortTitle}?</h2>
          <p className="text-white/80 mb-8 text-lg">Certified technicians available 24/7 across Bengaluru, Chennai, Hyderabad & Mumbai.</p>
          <div className="flex flex-wrap gap-4 justify-center">
            <Link href="/contact#contact-form" className="bg-white text-gray-900 px-8 py-3 rounded-lg font-bold hover:bg-gray-100 transition-colors">
              Book Service Now
            </Link>
            <a href="tel:+918197459732" className="bg-black/20 text-white border border-white/30 px-8 py-3 rounded-lg font-bold hover:bg-black/30 transition-colors flex items-center gap-2">
              <Phone className="w-4 h-4" /> +91 81974 59732
            </a>
          </div>
        </div>
      </section>
    </>
  );
}

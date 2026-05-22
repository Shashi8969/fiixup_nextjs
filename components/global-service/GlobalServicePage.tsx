// components/global-service/GlobalServicePage.tsx
// SERVER COMPONENT — no "use client"

import Link from "next/link";
import Image from "next/image";
import {
  Phone, Star, CheckCircle, Clock, 
  Shield, IndianRupee, ArrowRight
} from "lucide-react";
import { FAQAccordion } from "@/components/ui/FAQAccordion";
import { MAIN_PHONE_DISPLAY, WHATSAPP_NUMBER } from "@/lib/constants";
import type { GlobalServicePage as GlobalServicePageType } from "@/lib/global-service";

// ─── Theme config (same as LocationServicePage) ─────────────────────────────
const CATEGORY_THEME: Record<string, {
  bgAccent: string; btnHover: string; bgLight: string;
  accentText: string; borderClr: string; heroImage: string; badge: string;
}> = {
  car: {
    bgAccent: "bg-blue-600", btnHover: "hover:bg-blue-700", bgLight: "bg-blue-50",
    accentText: "text-blue-600", borderClr: "border-blue-200",
    heroImage: "/assets/Car_mechanic_700x1049.webp", badge: "🚗 Car Service",
  },
  bike: {
    bgAccent: "bg-red-600", btnHover: "hover:bg-red-700", bgLight: "bg-red-50",
    accentText: "text-red-600", borderClr: "border-red-200",
    heroImage: "/assets/bike-mechanic-in-bangalore.webp", badge: "🏍️ Bike Service",
  },
  roadside: {
    bgAccent: "bg-red-700", btnHover: "hover:bg-red-800", bgLight: "bg-red-50",
    accentText: "text-red-700", borderClr: "border-red-200",
    heroImage: "/assets/car-emergency.webp", badge: "🆘 Roadside Assistance",
  },
  towing: {
    bgAccent: "bg-amber-600", btnHover: "hover:bg-amber-700", bgLight: "bg-amber-50",
    accentText: "text-amber-600", borderClr: "border-amber-200",
    heroImage: "/assets/Car_mechanic_700x1049.webp", badge: "🚛 Towing Service",
  },
  electrical: {
    bgAccent: "bg-purple-600", btnHover: "hover:bg-purple-700", bgLight: "bg-purple-50",
    accentText: "text-purple-600", borderClr: "border-purple-200",
    heroImage: "/assets/Car_mechanic_700x1049.webp", badge: "⚡ Electrical Repair",
  },
  battery: {
    bgAccent: "bg-yellow-600", btnHover: "hover:bg-yellow-700", bgLight: "bg-yellow-50",
    accentText: "text-yellow-600", borderClr: "border-yellow-200",
    heroImage: "/assets/Car_mechanic_700x1049.webp", badge: "🔋 Battery Service",
  },
  puncture: {
    bgAccent: "bg-orange-600", btnHover: "hover:bg-orange-700", bgLight: "bg-orange-50",
    accentText: "text-orange-600", borderClr: "border-orange-200",
    heroImage: "/assets/Car_mechanic_700x1049.webp", badge: "🔧 Puncture Repair",
  },
  mechanic: {
    bgAccent: "bg-slate-700", btnHover: "hover:bg-slate-800", bgLight: "bg-slate-50",
    accentText: "text-slate-700", borderClr: "border-slate-200",
    heroImage: "/assets/Car_mechanic_700x1049.webp", badge: "🔩 Mechanic Service",
  },
};

const DEFAULT_THEME = {
  bgAccent: "bg-blue-600", btnHover: "hover:bg-blue-700", bgLight: "bg-blue-50",
  accentText: "text-blue-600", borderClr: "border-blue-200",
  heroImage: "/assets/Car_mechanic_700x1049.webp", badge: "🔧 Vehicle Service",
};

const iconMap: Record<string, React.ElementType> = {
  Clock, Shield, IndianRupee, Star, Phone, CheckCircle,
};

// ─── Props ───────────────────────────────────────────────────────────────────
interface Props {
  data: GlobalServicePageType;
}

// ─── Component (Server) ─────────────────────────────────────────────────────
export function GlobalServicePage({ data }: Props) {
  const theme = CATEGORY_THEME[data.service_category] ?? DEFAULT_THEME;
  const { bgAccent, btnHover, bgLight, accentText, borderClr, heroImage } = theme;

  return (
    <>
      {/* HERO */}
      <section className={`${bgLight} py-12 border-b border-gray-200`}>
        <div className="container mx-auto px-4">
          <div className="grid md:grid-cols-2 gap-12 items-center">
            <div>
              <span className={`inline-block ${bgAccent} text-white text-xs font-bold px-3 py-1 rounded-full uppercase tracking-wide mb-4`}>
                {theme.badge}
              </span>
              <h1 className="text-3xl md:text-4xl font-bold text-gray-900 mb-3 leading-tight">
                {data.hero_heading}
              </h1>
              <p className="text-lg text-gray-600 mb-2">{data.hero_subheading}</p>
              {data.hero_badge_text && (
                <p className={`text-sm ${accentText} ${bgLight} border ${borderClr} rounded-lg px-4 py-2 mb-6`}>
                  📍 {data.hero_badge_text}
                </p>
              )}

              {/* Stats */}
              <div className="flex flex-wrap gap-6 mb-8">
                <div>
                  <p className={`text-2xl font-bold ${accentText}`}>24/7</p>
                  <p className="text-xs text-gray-500 mt-0.5">Always Available</p>
                </div>
                <div className="w-px bg-gray-200" />
                <div>
                  <p className="text-2xl font-bold text-gray-900">60 min</p>
                  <p className="text-xs text-gray-500 mt-0.5">Avg. Arrival</p>
                </div>
                <div className="w-px bg-gray-200" />
                <div>
                  <p className="text-2xl font-bold text-green-600">30-Day</p>
                  <p className="text-xs text-gray-500 mt-0.5">Warranty</p>
                </div>
              </div>

              {/* CTAs */}
              <div className="flex flex-wrap gap-3">
                <Link
                  href="#contact"
                  className={`${bgAccent} ${btnHover} text-white px-8 py-3 rounded-lg font-bold transition-colors`}
                >
                  Book {data.service_name} Now
                </Link>
                <a
                  href={`tel:${MAIN_PHONE_DISPLAY}`}
                  className="bg-white border-2 border-gray-200 text-gray-800 px-6 py-3 rounded-lg font-bold hover:border-blue-400 transition-colors flex items-center gap-2"
                >
                  <Phone className="w-4 h-4" /> {MAIN_PHONE_DISPLAY}
                </a>
                <a
                  href={`https://wa.me/${WHATSAPP_NUMBER}?text=Hi, I need ${data.service_name} service`}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="bg-green-600 hover:bg-green-700 text-white px-5 py-3 rounded-lg font-bold transition-colors"
                >
                  💬 WhatsApp
                </a>
              </div>
            </div>

            {/* Hero Image */}
            <div className="hidden md:block relative">
              <div className="rounded-2xl overflow-hidden shadow-xl h-[420px] w-full relative">
                <Image
                  src={data.hero_image_url || heroImage}
                  alt={`${data.service_name} service`}
                  fill
                  className="object-cover"
                  priority
                  sizes="50vw"
                />
              </div>
              {(data.schema_aggregate_rating > 0) && (
                <div className="absolute -bottom-4 -left-4 bg-yellow-400 text-gray-900 p-4 rounded-xl shadow-lg">
                  <p className="text-2xl font-bold">{data.schema_aggregate_rating}/5</p>
                  <p className="text-xs font-semibold">{data.schema_review_count}+ Reviews</p>
                </div>
              )}
            </div>
          </div>
        </div>
      </section>

      {/* TRUST STRIP */}
      <section className="bg-white border-b border-gray-100 py-5">
        <div className="container mx-auto px-4">
          <div className="flex flex-wrap justify-center gap-8">
            {[
              { icon: Shield, label: "Certified Technicians" },
              { icon: CheckCircle, label: "30-Day Warranty" },
              { icon: Clock, label: "24/7 Available" },
              { icon: IndianRupee, label: "Transparent Pricing" },
              { icon: Phone, label: "Free Quote" },
            ].map(({ icon: I, label }) => (
              <div key={label} className="flex items-center gap-2">
                <I className="w-5 h-5 text-green-600" />
                <span className="text-sm font-semibold text-gray-700">{label}</span>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ABOUT SECTION */}
      <section className="py-16 bg-white">
        <div className="container mx-auto px-4">
          <div className="grid md:grid-cols-2 gap-12">
            <div>
              <h2 className="text-2xl font-bold mb-4">{data.about_heading || `About ${data.service_name}`}</h2>
              <p className="text-gray-700 leading-relaxed text-lg mb-4">{data.about_para1}</p>
              <p className="text-gray-600 leading-relaxed mb-8">{data.about_para2}</p>
              {data.about_bullets?.length > 0 && (
                <ul className="space-y-4">
                  {data.about_bullets.map((b) => (
                    <li key={b.heading} className="flex gap-3">
                      <div className="w-2 h-2 bg-blue-600 rounded-full mt-2 flex-shrink-0" />
                      <div>
                        <h3 className="font-semibold text-gray-900 mb-1">{b.heading}</h3>
                        <p className="text-gray-600 text-sm">{b.text}</p>
                      </div>
                    </li>
                  ))}
                </ul>
              )}
            </div>
            <div className={`${bgLight} rounded-2xl p-8 space-y-5`}>
              {data.service_highlights?.map((h) => (
                <div key={h.title} className={`bg-white border ${borderClr} rounded-xl p-5`}>
                  <h3 className="font-bold text-gray-900 mb-2">{h.title}</h3>
                  <p className="text-gray-600 text-sm leading-relaxed">{h.description}</p>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* WHY CHOOSE */}
      {data.why_choose_points?.length > 0 && (
        <section className="py-16 bg-gray-50">
          <div className="container mx-auto px-4">
            <h2 className="text-2xl md:text-3xl font-bold text-center mb-12">
              Why Choose Fiixup for {data.service_name}?
            </h2>
            <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-6">
              {data.why_choose_points.map((p) => {
                const I = iconMap[p.icon] ?? CheckCircle;
                return (
                  <div key={p.title} className="bg-white rounded-2xl p-6 shadow-sm border border-gray-100">
                    <div className={`${bgLight} w-12 h-12 rounded-xl flex items-center justify-center mb-4`}>
                      <I className={`w-6 h-6 ${accentText}`} />
                    </div>
                    <h3 className="font-bold text-gray-900 mb-2">{p.title}</h3>
                    <p className="text-gray-600 text-sm leading-relaxed">{p.desc}</p>
                  </div>
                );
              })}
            </div>
          </div>
        </section>
      )}

      {/* PRICING */}
      {data.pricing_rows?.length > 0 && (
        <section className="py-16 bg-white">
          <div className="container mx-auto px-4">
            <h2 className="text-2xl md:text-3xl font-bold text-center mb-3">
              {data.service_name} Pricing
            </h2>
            <p className="text-gray-600 text-center mb-10">
              {data.pricing_intro || "Transparent pricing — quoted before work begins."}
            </p>
            <div className="max-w-3xl mx-auto">
              <div className="bg-white rounded-2xl shadow-sm border border-gray-100 overflow-hidden">
                <div className="bg-gray-900 text-white grid grid-cols-3 px-6 py-3 text-sm font-semibold">
                  <span>Service</span>
                  <span className="text-center">Price</span>
                  <span className="text-right">Note</span>
                </div>
                {data.pricing_rows.map((row, i) => (
                  <div
                    key={row.label}
                    className={`grid grid-cols-3 px-6 py-4 text-sm ${i % 2 === 0 ? "bg-white" : "bg-gray-50"}`}
                  >
                    <span className="font-medium text-gray-900">{row.label}</span>
                    <span className="text-center font-semibold text-gray-800">
                      ₹{row.price_from.toLocaleString("en-IN")}
                      {row.price_to ? `–₹${row.price_to.toLocaleString("en-IN")}` : "+"}
                    </span>
                    <span className="text-right text-gray-500">{row.note ?? "—"}</span>
                  </div>
                ))}
              </div>
              {data.pricing_disclaimer && (
                <p className="text-xs text-gray-500 mt-3 text-center">{data.pricing_disclaimer}</p>
              )}
              <div className="mt-6 text-center">
                <Link
                  href="#contact"
                  className={`${bgAccent} ${btnHover} text-white px-8 py-3 rounded-lg font-semibold transition-colors inline-block`}
                >
                  Get Free Quote
                </Link>
              </div>
            </div>
          </div>
        </section>
      )}

      {/* TESTIMONIALS */}
      {data.testimonials?.length > 0 && (
        <section className="py-16 bg-blue-50">
          <div className="container mx-auto px-4">
            <h2 className="text-2xl md:text-3xl font-bold text-center mb-10">
              What Our Customers Say
            </h2>
            <div className="grid sm:grid-cols-3 gap-6 max-w-4xl mx-auto">
              {data.testimonials.slice(0, 3).map((t, i) => (
                <div key={i} className="bg-white rounded-xl p-6 shadow-sm">
                  <div className="flex gap-0.5 mb-3">
                    {Array.from({ length: t.rating }).map((_, j) => (
                      <span key={j} className="text-yellow-400 text-sm">★</span>
                    ))}
                  </div>
                  <p className="text-gray-700 text-sm mb-4">&quot;{t.text}&quot;</p>
                  <div className="border-t pt-3">
                    <p className="font-semibold text-gray-900 text-sm">{t.name}</p>
                    <p className="text-xs text-gray-500 mt-0.5">{t.vehicle}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </section>
      )}

      {/* FAQ */}
      {data.faqs?.length > 0 && (
        <section className="py-16 bg-white">
          <div className="container mx-auto px-4 max-w-3xl">
            <h2 className="text-2xl md:text-3xl font-bold mb-2 text-center">
              {data.service_name} — FAQs
            </h2>
            <p className="text-gray-500 text-center mb-10">
              Common questions about our {data.service_name} service.
            </p>
            <FAQAccordion faqs={data.faqs} accentText={accentText} />
          </div>
        </section>
      )}

      {/* RELATED SERVICES */}
      {data.related_services?.length > 0 && (
        <section className="py-16 bg-gray-50">
          <div className="container mx-auto px-4">
            <h2 className="text-2xl font-bold mb-8">Other Services We Offer</h2>
            <div className="grid sm:grid-cols-3 gap-6">
              {data.related_services.map((s) => (
                <Link
                  key={s.slug}
                  href={`/${s.slug}`}
                  className="bg-white p-6 border border-gray-200 rounded-xl hover:shadow-lg transition-all group"
                >
                  <h3 className={`font-bold text-gray-900 group-hover:${accentText} transition-colors mb-1`}>
                    {s.name}
                  </h3>
                  <p className={`text-sm font-bold ${accentText} flex items-center gap-1 mt-3`}>
                    View Details <ArrowRight className="w-3 h-3" />
                  </p>
                </Link>
              ))}
            </div>
          </div>
        </section>
      )}

      {/* BOTTOM CTA */}
      <section className={`py-16 ${bgAccent} text-white text-center`}>
        <div className="container mx-auto px-4">
          <h2 className="text-3xl font-bold mb-3">
            Book {data.service_name} Service Now
          </h2>
          <p className="text-white/80 mb-8 text-lg">
            Certified technicians available 24/7 at your doorstep.
          </p>
          <div className="flex flex-wrap gap-4 justify-center">
            <Link
              href="#contact"
              className="bg-white text-gray-900 px-8 py-3 rounded-lg font-bold hover:bg-gray-100 transition-colors"
            >
              Book Service Now
            </Link>
            <a
              href={`tel:${MAIN_PHONE_DISPLAY}`}
              className="bg-black/20 text-white border border-white/30 px-8 py-3 rounded-lg font-bold hover:bg-black/30 transition-colors flex items-center gap-2"
            >
              <Phone className="w-4 h-4" /> {MAIN_PHONE_DISPLAY}
            </a>
          </div>
        </div>
      </section>
    </>
  );
}
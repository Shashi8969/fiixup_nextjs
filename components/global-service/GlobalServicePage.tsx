// components/global-service/GlobalServicePage.tsx
// SERVER COMPONENT — no "use client"

import Link from "next/link";
import Image from "next/image";
import {
  Phone,
  Star,
  CheckCircle,
  Clock,
  Shield,
  IndianRupee,
  ArrowRight,
  MapPin,
  Wrench,
  Sparkles,
} from "lucide-react";
import { FAQAccordion } from "@/components/ui/FAQAccordion";
import { MAIN_PHONE_DISPLAY, WHATSAPP_NUMBER } from "@/lib/constants";
import type { GlobalServicePage as GlobalServicePageType } from "@/lib/global-service";

type ExtendedGlobalServicePage = GlobalServicePageType & {
  process_steps?: Array<{ step?: number; title: string; text?: string; description?: string }>;
  seo_intro_heading?: string | null;
  seo_intro_body?: string | null;
  seo_sections?: Array<{ heading: string; body: string }> | null;
  seo_conclusion?: string | null;
  nearby_areas?: string[] | null;
  hero_image_alt?: string | null;
};

const CATEGORY_THEME: Record<string, {
  bgAccent: string;
  btnHover: string;
  bgLight: string;
  accentText: string;
  borderClr: string;
  ringClr: string;
  heroImage: string;
  badge: string;
}> = {
  car: {
    bgAccent: "bg-blue-600", btnHover: "hover:bg-blue-700", bgLight: "bg-blue-50",
    accentText: "text-blue-600", borderClr: "border-blue-200", ringClr: "ring-blue-100",
    heroImage: "/assets/Car_mechanic_700x1049.webp", badge: "🚗 Car Service",
  },
  bike: {
    bgAccent: "bg-red-600", btnHover: "hover:bg-red-700", bgLight: "bg-red-50",
    accentText: "text-red-600", borderClr: "border-red-200", ringClr: "ring-red-100",
    heroImage: "/assets/bike-mechanic-in-bangalore.webp", badge: "🏍️ Bike Service",
  },
  roadside: {
    bgAccent: "bg-red-700", btnHover: "hover:bg-red-800", bgLight: "bg-red-50",
    accentText: "text-red-700", borderClr: "border-red-200", ringClr: "ring-red-100",
    heroImage: "/assets/car-emergency.webp", badge: "🆘 Roadside Assistance",
  },
  towing: {
    bgAccent: "bg-amber-600", btnHover: "hover:bg-amber-700", bgLight: "bg-amber-50",
    accentText: "text-amber-600", borderClr: "border-amber-200", ringClr: "ring-amber-100",
    heroImage: "/assets/car-emergency.webp", badge: "🚛 Towing Service",
  },
  electrical: {
    bgAccent: "bg-purple-600", btnHover: "hover:bg-purple-700", bgLight: "bg-purple-50",
    accentText: "text-purple-600", borderClr: "border-purple-200", ringClr: "ring-purple-100",
    heroImage: "/assets/Car_mechanic_700x1049.webp", badge: "⚡ Electrical Repair",
  },
  battery: {
    bgAccent: "bg-yellow-600", btnHover: "hover:bg-yellow-700", bgLight: "bg-yellow-50",
    accentText: "text-yellow-600", borderClr: "border-yellow-200", ringClr: "ring-yellow-100",
    heroImage: "/assets/Car_mechanic_700x1049.webp", badge: "🔋 Battery Service",
  },
  puncture: {
    bgAccent: "bg-orange-600", btnHover: "hover:bg-orange-700", bgLight: "bg-orange-50",
    accentText: "text-orange-600", borderClr: "border-orange-200", ringClr: "ring-orange-100",
    heroImage: "/assets/Car_mechanic_700x1049.webp", badge: "🔧 Puncture Repair",
  },
  mechanic: {
    bgAccent: "bg-slate-700", btnHover: "hover:bg-slate-800", bgLight: "bg-slate-50",
    accentText: "text-slate-700", borderClr: "border-slate-200", ringClr: "ring-slate-100",
    heroImage: "/assets/Car_mechanic_700x1049.webp", badge: "🔩 Mechanic Service",
  },
};

const DEFAULT_THEME = {
  bgAccent: "bg-blue-600", btnHover: "hover:bg-blue-700", bgLight: "bg-blue-50",
  accentText: "text-blue-600", borderClr: "border-blue-200", ringClr: "ring-blue-100",
  heroImage: "/assets/Car_mechanic_700x1049.webp", badge: "🔧 Vehicle Service",
};

const iconMap: Record<string, React.ElementType> = {
  Clock, Shield, IndianRupee, Star, Phone, CheckCircle, Wrench, Sparkles, MapPin,
};

interface Props {
  data: ExtendedGlobalServicePage;
}

export function GlobalServicePage({ data }: Props) {
  const theme = CATEGORY_THEME[data.service_category] ?? DEFAULT_THEME;
  const { bgAccent, btnHover, bgLight, accentText, borderClr, ringClr, heroImage } = theme;

  const processSteps = data.process_steps ?? [];
  const seoSections = data.seo_sections ?? [];
  const nearbyAreas = data.nearby_areas ?? [];

  return (
    <>
      {/* HERO */}
<section className={`${bgLight} relative overflow-hidden border-b border-gray-200`}>
  <div className="absolute inset-0 bg-gradient-to-br from-white via-transparent to-black/5" />

  <div className="container relative mx-auto px-4 py-10 md:py-16">

    {/* Breadcrumb */}
    <nav className="flex items-center gap-2 text-sm text-gray-500 mb-6">
      <Link href="/">Home</Link>
      <span>/</span>
      <Link href="/services">Services</Link>
      <span>/</span>
      <span className="text-gray-900 font-medium">
        {data.service_name}
      </span>
    </nav>

    <div className="grid lg:grid-cols-2 gap-12 items-center">

      {/* LEFT */}
      <div>

        <span className={`inline-flex items-center gap-2 ${bgAccent} text-white text-xs font-bold px-4 py-2 rounded-full uppercase tracking-wide mb-5 shadow-lg`}>
          {theme.badge}
        </span>

        <h1 className="text-4xl md:text-5xl font-black leading-tight text-gray-900 mb-5">
          {data.hero_heading}
        </h1>

        <p className="text-lg md:text-xl text-gray-600 leading-relaxed mb-6 max-w-2xl">
          {data.hero_subheading}
        </p>

        {data.hero_badge_text && (
          <div className={`inline-flex items-center gap-2 ${bgLight} border ${borderClr} rounded-xl px-4 py-3 mb-8`}>
            <span className="text-lg">📍</span>
            <span className={`font-semibold ${accentText}`}>
              {data.hero_badge_text}
            </span>
          </div>
        )}

        {/* STATS */}
<div className="flex flex-wrap gap-6 mb-8">

  {/* STARTING PRICE */}
  <div>
    <p className={`text-2xl font-bold ${accentText}`}>
      Starting ₹
      {data.pricing_rows?.[0]?.price_from?.toLocaleString("en-IN") || "499"}
    </p>

    <p className="text-sm text-gray-600 font-medium">
      Transparent pricing
    </p>
  </div>

  <div className="w-px bg-gray-200" />

  {/* DURATION */}
  <div>
    <p className="text-2xl font-bold text-gray-900">
      {data.service_duration || "20 Min"}
    </p>

    <p className="text-xs text-gray-500">
      Estimated time
    </p>
  </div>

  <div className="w-px bg-gray-200" />

  {/* AVAILABILITY */}
  <div>
    <p className="text-2xl font-bold text-green-600">
      {data.service_availability || "24/7"}
    </p>

    <p className="text-xs text-gray-500">
      Available
    </p>
  </div>

</div>

        {/* CTA */}
        <div className="flex flex-wrap gap-4">

          <Link
            href="#contact"
            className={`${bgAccent} ${btnHover} text-white px-8 py-4 rounded-xl font-bold shadow-lg transition-all hover:scale-[1.02]`}
          >
            Book Service Now
          </Link>

          <a
            href={`tel:${MAIN_PHONE_DISPLAY}`}
            className="bg-white border border-gray-200 text-gray-900 px-7 py-4 rounded-xl font-bold flex items-center gap-2 hover:shadow-md transition-all"
          >
            <Phone className="w-5 h-5" />
            {MAIN_PHONE_DISPLAY}
          </a>

        </div>

      </div>

      {/* RIGHT */}
      <div className="relative hidden lg:block">

        <div className="relative rounded-[32px] overflow-hidden shadow-2xl border border-white/40 bg-white">

          <div className="absolute top-5 left-5 z-20 bg-white/90 backdrop-blur-md rounded-2xl px-4 py-3 shadow-lg">
            <div className="flex items-center gap-2">
              <Star className="w-5 h-5 text-yellow-500 fill-yellow-500" />
              <div>
                <p className="font-black text-gray-900">
                  {data.schema_aggregate_rating}/5
                </p>
                <p className="text-xs text-gray-500">
                  {data.schema_review_count}+ Reviews
                </p>
              </div>
            </div>
          </div>

          <Image
            src={data.hero_image_url || heroImage}
            alt={data.hero_image_alt || data.service_name}
            title={data.hero_image_meta?.title || undefined}
            width={900}
            height={700}
            priority
            className="w-full h-[520px] object-cover"
            style={{ objectPosition: `${data.hero_image_meta?.focalX ?? 50}% ${data.hero_image_meta?.focalY ?? 50}%` }}
          />

        </div>

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

      {/* ABOUT + HIGHLIGHTS */}
      <section className="py-16 bg-white">
        <div className="container mx-auto px-4">
          <div className="grid md:grid-cols-2 gap-12 items-start">
            <div>
              <p className={`text-sm font-bold uppercase tracking-wide ${accentText} mb-2`}>About This Service</p>
              <h2 className="text-3xl font-extrabold mb-5 text-gray-950">{data.about_heading || `About ${data.service_name}`}</h2>
              <p className="text-gray-700 leading-relaxed text-lg mb-4">{data.about_para1}</p>
              <p className="text-gray-600 leading-relaxed mb-8">{data.about_para2}</p>
              {data.about_bullets?.length > 0 && (
                <ul className="space-y-4">
                  {data.about_bullets.map((b) => (
                    <li key={b.heading} className="flex gap-3">
                      <CheckCircle className={`w-5 h-5 ${accentText} mt-0.5 flex-shrink-0`} />
                      <div>
                        <h3 className="font-bold text-gray-900 mb-1">{b.heading}</h3>
                        <p className="text-gray-600 text-sm leading-relaxed">{b.text}</p>
                      </div>
                    </li>
                  ))}
                </ul>
              )}
            </div>
            <div className={`${bgLight} rounded-3xl p-6 md:p-8 grid gap-4`}>
              {data.service_highlights?.map((h) => (
                <div key={h.title} className={`bg-white border ${borderClr} rounded-2xl p-5 shadow-sm`}>
                  <h3 className="font-bold text-gray-950 mb-2">{h.title}</h3>
                  <p className="text-gray-600 text-sm leading-relaxed">{h.description}</p>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* PROCESS STEPS */}
      {processSteps.length > 0 && (
        <section className="py-16 bg-gray-50">
          <div className="container mx-auto px-4">
            <div className="text-center max-w-2xl mx-auto mb-12">
              <p className={`text-sm font-bold uppercase tracking-wide ${accentText} mb-2`}>Simple Process</p>
              <h2 className="text-3xl md:text-4xl font-extrabold text-gray-950">How {data.service_name} Works</h2>
              <p className="text-gray-600 mt-3">Book online or call Fiixup. We confirm the issue, assign support, and help you safely.</p>
            </div>
            <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-6">
              {processSteps.map((step, i) => (
                <div key={`${step.title}-${i}`} className="relative bg-white rounded-3xl p-6 border border-gray-100 shadow-sm">
                  <div className={`${bgAccent} text-white w-11 h-11 rounded-2xl flex items-center justify-center font-extrabold mb-5 shadow-sm`}>
                    {step.step ?? i + 1}
                  </div>
                  <h3 className="font-extrabold text-gray-950 mb-2">{step.title}</h3>
                  <p className="text-gray-600 text-sm leading-relaxed">{step.text || step.description}</p>
                </div>
              ))}
            </div>
          </div>
        </section>
      )}

      {/* WHY CHOOSE */}
      {data.why_choose_points?.length > 0 && (
        <section className="py-16 bg-white">
          <div className="container mx-auto px-4">
            <div className="text-center max-w-2xl mx-auto mb-12">
              <p className={`text-sm font-bold uppercase tracking-wide ${accentText} mb-2`}>Why Fiixup</p>
              <h2 className="text-3xl md:text-4xl font-extrabold text-gray-950">Why Choose Fiixup for {data.service_name}?</h2>
            </div>
            <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-6">
              {data.why_choose_points.map((p) => {
                const I = iconMap[p.icon] ?? CheckCircle;
                return (
                  <div key={p.title} className="bg-white rounded-3xl p-6 shadow-sm border border-gray-100 hover:shadow-lg transition-shadow">
                    <div className={`${bgLight} w-12 h-12 rounded-2xl flex items-center justify-center mb-4`}>
                      <I className={`w-6 h-6 ${accentText}`} />
                    </div>
                    <h3 className="font-extrabold text-gray-950 mb-2">{p.title}</h3>
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
        <section className="py-16 bg-gray-50">
          <div className="container mx-auto px-4">
            <div className="text-center max-w-2xl mx-auto mb-10">
              <p className={`text-sm font-bold uppercase tracking-wide ${accentText} mb-2`}>Pricing</p>
              <h2 className="text-3xl md:text-4xl font-extrabold text-gray-950">{data.service_name} Pricing</h2>
              <p className="text-gray-600 mt-3">{data.pricing_intro || "Transparent pricing — quoted before work begins."}</p>
            </div>
            <div className="max-w-4xl mx-auto bg-white rounded-3xl shadow-sm border border-gray-100 overflow-hidden">
              <div className="bg-gray-950 text-white grid grid-cols-3 px-6 py-4 text-sm font-bold">
                <span>Service</span><span className="text-center">Price</span><span className="text-right">Note</span>
              </div>
              {data.pricing_rows.map((row, i) => (
                <div key={row.label} className={`grid grid-cols-3 px-6 py-5 text-sm ${i % 2 === 0 ? "bg-white" : "bg-gray-50"}`}>
                  <span className="font-bold text-gray-950">{row.label}</span>
                  <span className="text-center font-extrabold text-gray-900">
                    ₹{row.price_from.toLocaleString("en-IN")}{row.price_to ? `–₹${row.price_to.toLocaleString("en-IN")}` : "+"}
                  </span>
                  <span className="text-right text-gray-500">{row.note ?? "—"}</span>
                </div>
              ))}
            </div>
            {data.pricing_disclaimer && <p className="text-xs text-gray-500 mt-4 text-center">{data.pricing_disclaimer}</p>}
          </div>
        </section>
      )}

      {/* NEARBY AREAS */}
      {nearbyAreas.length > 0 && (
        <section className="py-16 bg-white">
          <div className="container mx-auto px-4">
            <div className="max-w-3xl mx-auto text-center mb-10">
              <p className={`text-sm font-bold uppercase tracking-wide ${accentText} mb-2`}>Service Areas</p>
              <h2 className="text-3xl md:text-4xl font-extrabold text-gray-950">Nearby Areas We Serve</h2>
              <p className="text-gray-600 mt-3">Fiixup service support is available across major localities based on technician availability.</p>
            </div>
            <div className="flex flex-wrap justify-center gap-3 max-w-5xl mx-auto">
              {nearbyAreas.map((area) => (
                <span key={area} className={`inline-flex items-center gap-2 bg-white border ${borderClr} rounded-full px-4 py-2 text-sm font-semibold text-gray-700 shadow-sm`}>
                  <MapPin className={`w-4 h-4 ${accentText}`} /> {area}
                </span>
              ))}
            </div>
          </div>
        </section>
      )}

      {/* SEO CONTENT */}
      {(data.seo_intro_heading || data.seo_intro_body || seoSections.length > 0 || data.seo_conclusion) && (
        <section className="py-16 bg-gray-50">
          <div className="container mx-auto px-4">
            <article className="max-w-4xl mx-auto bg-white rounded-3xl border border-gray-100 shadow-sm p-6 md:p-10">
              {data.seo_intro_heading && <h2 className="text-3xl md:text-4xl font-extrabold text-gray-950 mb-4">{data.seo_intro_heading}</h2>}
              {data.seo_intro_body && <p className="text-gray-700 text-lg leading-relaxed mb-8">{data.seo_intro_body}</p>}
              {seoSections.length > 0 && (
                <div className="space-y-8">
                  {seoSections.map((section) => (
                    <div key={section.heading}>
                      <h3 className="text-2xl font-extrabold text-gray-950 mb-3">{section.heading}</h3>
                      <p className="text-gray-650 text-gray-700 leading-relaxed">{section.body}</p>
                    </div>
                  ))}
                </div>
              )}
              {data.seo_conclusion && (
                <div className={`${bgLight} border ${borderClr} rounded-2xl p-5 mt-8`}>
                  <p className="text-gray-800 leading-relaxed font-medium">{data.seo_conclusion}</p>
                </div>
              )}
            </article>
          </div>
        </section>
      )}

      {/* TESTIMONIALS */}
      {data.testimonials?.length > 0 && (
        <section className="py-16 bg-white">
          <div className="container mx-auto px-4">
            <h2 className="text-3xl md:text-4xl font-extrabold text-center mb-10 text-gray-950">What Our Customers Say</h2>
            <div className="grid sm:grid-cols-3 gap-6 max-w-5xl mx-auto">
              {data.testimonials.slice(0, 3).map((t, i) => (
                <div key={i} className="bg-white rounded-3xl p-6 shadow-sm border border-gray-100">
                  <div className="flex gap-0.5 mb-3">{Array.from({ length: t.rating }).map((_, j) => <span key={j} className="text-yellow-400 text-sm">★</span>)}</div>
                  <p className="text-gray-700 text-sm mb-4 leading-relaxed">&quot;{t.text}&quot;</p>
                  <div className="border-t pt-3">
                    <p className="font-bold text-gray-950 text-sm">{t.name}</p>
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
        <section className="py-16 bg-gray-50">
          <div className="container mx-auto px-4 max-w-3xl">
            <h2 className="text-3xl md:text-4xl font-extrabold mb-2 text-center text-gray-950">{data.service_name} — FAQs</h2>
            <p className="text-gray-500 text-center mb-10">Common questions about our {data.service_name} service.</p>
            <FAQAccordion faqs={data.faqs} accentText={accentText} />
          </div>
        </section>
      )}

      {/* RELATED SERVICES */}
      {data.related_services?.length > 0 && (
        <section className="py-16 bg-white">
          <div className="container mx-auto px-4">
            <h2 className="text-3xl font-extrabold mb-8 text-gray-950">Other Services We Offer</h2>
            <div className="grid sm:grid-cols-3 gap-6">
              {data.related_services.map((s) => (
                <Link key={s.slug} href={`/${s.slug}`} className="bg-white p-6 border border-gray-200 rounded-3xl hover:shadow-lg transition-all group">
                  <h3 className="font-extrabold text-gray-950 mb-1">{s.name}</h3>
                  <p className={`text-sm font-bold ${accentText} flex items-center gap-1 mt-3`}>View Details <ArrowRight className="w-3 h-3" /></p>
                </Link>
              ))}
            </div>
          </div>
        </section>
      )}

      {/* BOTTOM CTA */}
      <section id="contact" className={`py-16 ${bgAccent} text-white text-center`}>
        <div className="container mx-auto px-4">
          <h2 className="text-3xl md:text-4xl font-extrabold mb-3">Book {data.service_name} Now</h2>
          <p className="text-white/85 mb-8 text-lg">Certified technicians available at your doorstep.</p>
          <div className="flex flex-wrap gap-4 justify-center">
            <a href={`tel:${MAIN_PHONE_DISPLAY}`} className="bg-white text-gray-950 px-8 py-3 rounded-xl font-bold hover:bg-gray-100 transition-colors flex items-center gap-2">
              <Phone className="w-4 h-4" /> Call {MAIN_PHONE_DISPLAY}
            </a>
            <a href={`https://wa.me/${WHATSAPP_NUMBER}?text=Hi, I need ${data.service_name} service`} target="_blank" rel="noopener noreferrer" className="bg-black/20 text-white border border-white/30 px-8 py-3 rounded-xl font-bold hover:bg-black/30 transition-colors">
              WhatsApp Now
            </a>
          </div>
        </div>
      </section>
    </>
  );
}

function Stat({ value, label, accentText }: { value: string; label: string; accentText: string }) {
  return (
    <div className="bg-white rounded-2xl p-4 border border-gray-100 shadow-sm">
      <p className={`text-2xl font-extrabold ${accentText}`}>{value}</p>
      <p className="text-xs text-gray-500 mt-1 font-semibold">{label}</p>
    </div>
  );
}

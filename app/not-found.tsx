// app/not-found.tsx
// ─────────────────────────────────────────────────────────────────────────────
// Best-in-class 404 page — designed to retain every visitor who lands here.
// - Shows top services immediately so they can self-navigate
// - Clear CTA to call or book
// - Helpful search suggestions for common 404 URLs
// - Matches Fiixup brand perfectly
// ─────────────────────────────────────────────────────────────────────────────

import Link from "next/link";
import {
  Phone, MessageCircle, Wrench, Bike, Car, Battery, Truck,
  MapPin, ArrowRight, Home, Search, Zap, Shield, Clock, ChevronRight
} from "lucide-react";
import {
  MAIN_PHONE,
  MAIN_PHONE_DISPLAY,
  WHATSAPP_NUMBER,
} from "@/lib/constants";

export const revalidate = 3600; // refreshes every 1 hour

// ── Quick-access services shown on 404 page ───────────────────────────────────
const TOP_SERVICES = [
  { icon: Bike,    label: "Bike Service at Home",     href: "/services/bike-service-at-home",        tag: "From ₹349",  color: "red"    },
  { icon: Car,     label: "Car Service at Home",      href: "/services/car-service-at-home",         tag: "From ₹999",  color: "blue"   },
  { icon: Zap,     label: "Battery Jump Start",       href: "/services/car-battery-jumpstart-near-me",tag: "From ₹399", color: "green"  },
  { icon: Truck,   label: "Towing Service",           href: "/services/car-towing-service-near-me",  tag: "From ₹499",  color: "amber"  },
  { icon: Wrench,  label: "Puncture Repair",          href: "/services/car-puncture-repair-near-me", tag: "From ₹199",  color: "orange" },
  { icon: Battery, label: "Roadside Assistance",      href: "/services/roadside-assistance-near-me", tag: "From ₹299",  color: "purple" },
];

// ── Helpful links for common 404 paths ───────────────────────────────────────
const QUICK_LINKS = [
  { label: "All Services",       href: "/services"         },
  { label: "Bengaluru",          href: "/bangalore"        },
  { label: "Chennai",            href: "/chennai"          },
  { label: "Book a Service",     href: "/contact"          },
  { label: "Bike Services",      href: "/services/bike"    },
  { label: "Car Services",       href: "/services/car"     },
  { label: "Blog",               href: "/blog"             },
  { label: "About Us",           href: "/about"            },
];

const COLOR_MAP: Record<string, { bg: string; text: string; border: string; dot: string }> = {
  red:    { bg: "bg-red-50",    text: "text-red-600",    border: "border-red-200",    dot: "bg-red-500"    },
  blue:   { bg: "bg-blue-50",   text: "text-blue-600",   border: "border-blue-200",   dot: "bg-blue-500"   },
  green:  { bg: "bg-green-50",  text: "text-green-600",  border: "border-green-200",  dot: "bg-green-500"  },
  amber:  { bg: "bg-amber-50",  text: "text-amber-600",  border: "border-amber-200",  dot: "bg-amber-500"  },
  orange: { bg: "bg-orange-50", text: "text-orange-600", border: "border-orange-200", dot: "bg-orange-500" },
  purple: { bg: "bg-purple-50", text: "text-purple-600", border: "border-purple-200", dot: "bg-purple-500" },
};

export default function NotFound() {
  return (
    <main className="min-h-screen bg-gray-50">

      {/* ── Hero Section ──────────────────────────────────────────────────── */}
      <section className="relative bg-white border-b border-gray-100 overflow-hidden">

        {/* Decorative background grid */}
        <div
          className="absolute inset-0 opacity-[0.03]"
          style={{
            backgroundImage: "linear-gradient(#000 1px, transparent 1px), linear-gradient(90deg, #000 1px, transparent 1px)",
            backgroundSize: "40px 40px",
          }}
        />

        {/* Decorative blobs */}
        <div className="absolute top-0 right-0 w-[500px] h-[500px] bg-blue-50 rounded-full blur-3xl opacity-60 -translate-y-1/2 translate-x-1/4 pointer-events-none" />
        <div className="absolute bottom-0 left-0 w-[400px] h-[400px] bg-red-50 rounded-full blur-3xl opacity-60 translate-y-1/2 -translate-x-1/4 pointer-events-none" />

        <div className="relative container mx-auto px-4 py-16 md:py-20">
          <div className="max-w-3xl mx-auto text-center">

            {/* 404 badge */}
            <div className="inline-flex items-center gap-2 bg-red-50 border border-red-200 rounded-full px-4 py-1.5 mb-6">
              <span className="w-2 h-2 rounded-full bg-red-500 animate-pulse" />
              <span className="text-red-700 text-sm font-bold tracking-wide">Error 404 — Page Not Found</span>
            </div>

            {/* Main heading */}
            <h1 className="text-5xl md:text-7xl font-black text-gray-900 mb-2 tracking-tight leading-none">
              Oops!
            </h1>
            <p className="text-xl md:text-2xl font-bold text-gray-700 mb-4">
              Looks like this page broke down.
            </p>
            <p className="text-gray-500 text-base md:text-lg max-w-xl mx-auto mb-10 leading-relaxed">
              The page you&apos;re looking for doesn&apos;t exist or has moved. But don&apos;t worry —
              our mechanics are still on standby 24/7. Let us help you get where you need to go.
            </p>

            {/* Primary CTAs */}
            <div className="flex flex-wrap gap-3 justify-center mb-10">
              <a
                href={`tel:${MAIN_PHONE}`}
                className="inline-flex items-center gap-2.5 bg-red-600 hover:bg-red-700 text-white font-bold px-6 py-3.5 rounded-xl transition-all shadow-lg shadow-red-100 hover:shadow-red-200 hover:-translate-y-0.5 text-sm md:text-base"
              >
                <Phone className="w-4 h-4" />
                Call {MAIN_PHONE_DISPLAY}
              </a>

              <a
                href={`https://wa.me/${WHATSAPP_NUMBER}?text=Hi%20Fiixup%2C%20I%20need%20help%20with%20my%20vehicle`}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-2.5 bg-green-600 hover:bg-green-700 text-white font-bold px-6 py-3.5 rounded-xl transition-all shadow-lg shadow-green-100 hover:shadow-green-200 hover:-translate-y-0.5 text-sm md:text-base"
              >
                <MessageCircle className="w-4 h-4" />
                WhatsApp Us
              </a>

              <Link
                href="/"
                className="inline-flex items-center gap-2.5 bg-white hover:bg-gray-50 text-gray-900 font-bold px-6 py-3.5 rounded-xl transition-all shadow-sm border border-gray-200 hover:border-gray-300 hover:-translate-y-0.5 text-sm md:text-base"
              >
                <Home className="w-4 h-4" />
                Go Home
              </Link>
            </div>

            {/* Trust strip */}
            <div className="flex flex-wrap items-center justify-center gap-x-6 gap-y-2 text-sm text-gray-500">
              <span className="flex items-center gap-1.5">
                <Clock className="w-4 h-4 text-blue-500" />
                Available 24/7
              </span>
              <span className="flex items-center gap-1.5">
                <MapPin className="w-4 h-4 text-red-500" />
                Bengaluru · Chennai · Hyderabad · Mumbai
              </span>
              <span className="flex items-center gap-1.5">
                <Shield className="w-4 h-4 text-green-500" />
                30-day warranty on all repairs
              </span>
            </div>

          </div>
        </div>
      </section>

      {/* ── Top Services Grid ─────────────────────────────────────────────── */}
      <section className="py-12 md:py-16 bg-gray-50">
        <div className="container mx-auto px-4">

          <div className="text-center mb-8">
            <p className="text-xs font-bold tracking-widest uppercase text-gray-400 mb-2">
              Don&apos;t Leave Yet
            </p>
            <h2 className="text-2xl md:text-3xl font-bold text-gray-900">
              Our Most Popular Services
            </h2>
            <p className="text-gray-500 mt-2 text-sm md:text-base">
              Certified mechanics at your doorstep — home, office, or roadside.
            </p>
          </div>

          <div className="grid grid-cols-2 md:grid-cols-3 gap-3 md:gap-4 max-w-3xl mx-auto">
            {TOP_SERVICES.map((service) => {
              const c = COLOR_MAP[service.color];
              const Icon = service.icon;
              return (
                <Link
                  key={service.href}
                  href={service.href}
                  className={`group relative bg-white rounded-2xl border ${c.border} p-4 md:p-5 hover:shadow-lg hover:-translate-y-0.5 transition-all duration-200 overflow-hidden`}
                >
                  {/* Background tint on hover */}
                  <div className={`absolute inset-0 ${c.bg} opacity-0 group-hover:opacity-100 transition-opacity duration-200`} />

                  <div className="relative">
                    {/* Icon */}
                    <div className={`w-10 h-10 rounded-xl ${c.bg} flex items-center justify-center mb-3`}>
                      <Icon className={`w-5 h-5 ${c.text}`} />
                    </div>

                    {/* Label */}
                    <p className="font-bold text-gray-900 text-sm leading-tight mb-1.5 group-hover:text-gray-900">
                      {service.label}
                    </p>

                    {/* Price + arrow */}
                    <div className="flex items-center justify-between">
                      <span className={`text-xs font-bold ${c.text}`}>{service.tag}</span>
                      <ArrowRight className={`w-3.5 h-3.5 ${c.text} opacity-0 group-hover:opacity-100 group-hover:translate-x-0.5 transition-all duration-200`} />
                    </div>
                  </div>
                </Link>
              );
            })}
          </div>

          {/* View all services */}
          <div className="text-center mt-8">
            <Link
              href="/services"
              className="inline-flex items-center gap-2 text-blue-600 font-bold hover:text-blue-700 hover:gap-3 transition-all text-sm md:text-base"
            >
              View all services <ArrowRight className="w-4 h-4" />
            </Link>
          </div>

        </div>
      </section>

      {/* ── Quick Links + Contact Split ───────────────────────────────────── */}
      <section className="py-12 bg-white border-t border-gray-100">
        <div className="container mx-auto px-4">
          <div className="max-w-4xl mx-auto grid md:grid-cols-2 gap-8 md:gap-12">

            {/* Left — Quick navigation links */}
            <div>
              <div className="flex items-center gap-2 mb-5">
                <Search className="w-4 h-4 text-gray-400" />
                <h3 className="font-bold text-gray-900 text-base">Looking for something specific?</h3>
              </div>
              <div className="grid grid-cols-2 gap-2">
                {QUICK_LINKS.map((link) => (
                  <Link
                    key={link.href}
                    href={link.href}
                    className="flex items-center gap-2 text-sm text-gray-600 hover:text-blue-600 font-medium py-2 px-3 rounded-lg hover:bg-blue-50 transition-all group"
                  >
                    <ChevronRight className="w-3.5 h-3.5 text-gray-300 group-hover:text-blue-500 transition-colors flex-shrink-0" />
                    {link.label}
                  </Link>
                ))}
              </div>
            </div>

            {/* Right — Contact card */}
            <div className="bg-gray-900 rounded-2xl p-6 md:p-8 text-white">
              <div className="flex items-center gap-2 mb-1">
                <span className="w-2 h-2 rounded-full bg-green-400 animate-pulse" />
                <span className="text-green-400 text-xs font-bold uppercase tracking-wider">Live — Available Now</span>
              </div>

              <h3 className="text-xl font-bold mb-1 mt-3">Talk to us directly</h3>
              <p className="text-gray-400 text-sm mb-6 leading-relaxed">
                Can&apos;t find the page you need? Our team is available 24/7 to help you book a service, 
                get a quote, or answer any question.
              </p>

              {/* Phone */}
              <a
                href={`tel:${MAIN_PHONE}`}
                className="flex items-center gap-3 bg-white/10 hover:bg-white/20 border border-white/10 hover:border-white/20 rounded-xl px-4 py-3.5 mb-3 transition-all group"
              >
                <div className="w-9 h-9 rounded-lg bg-red-600 flex items-center justify-center flex-shrink-0">
                  <Phone className="w-4 h-4 text-white" />
                </div>
                <div>
                  <p className="text-xs text-gray-400 leading-none mb-0.5">Call us anytime</p>
                  <p className="font-bold text-white text-sm">{MAIN_PHONE_DISPLAY}</p>
                </div>
                <ArrowRight className="w-4 h-4 text-gray-500 group-hover:text-white group-hover:translate-x-0.5 transition-all ml-auto" />
              </a>

              {/* WhatsApp */}
              <a
                href={`https://wa.me/${WHATSAPP_NUMBER}?text=Hi%20Fiixup%2C%20I%20need%20help%20with%20my%20vehicle`}
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-center gap-3 bg-white/10 hover:bg-white/20 border border-white/10 hover:border-white/20 rounded-xl px-4 py-3.5 mb-5 transition-all group"
              >
                <div className="w-9 h-9 rounded-lg bg-green-600 flex items-center justify-center flex-shrink-0">
                  <MessageCircle className="w-4 h-4 text-white" />
                </div>
                <div>
                  <p className="text-xs text-gray-400 leading-none mb-0.5">WhatsApp us</p>
                  <p className="font-bold text-white text-sm">Chat on WhatsApp</p>
                </div>
                <ArrowRight className="w-4 h-4 text-gray-500 group-hover:text-white group-hover:translate-x-0.5 transition-all ml-auto" />
              </a>

              {/* Book online */}
              <Link
                href="/contact#contact-form"
                className="flex items-center justify-center gap-2 bg-blue-600 hover:bg-blue-700 text-white font-bold rounded-xl px-4 py-3.5 transition-all text-sm w-full"
              >
                Book a Service Online
                <ArrowRight className="w-4 h-4" />
              </Link>

              {/* Cities */}
              <p className="text-xs text-gray-500 text-center mt-4">
                Serving Bengaluru · Chennai · Hyderabad · Mumbai
              </p>
            </div>

          </div>
        </div>
      </section>

      {/* ── Bottom reassurance banner ─────────────────────────────────────── */}
      <section className="py-10 bg-blue-600">
        <div className="container mx-auto px-4">
          <div className="flex flex-col md:flex-row items-center justify-between gap-6 max-w-4xl mx-auto">
            <div className="text-center md:text-left">
              <p className="text-white font-bold text-lg md:text-xl">
                Still need help? We&apos;re one call away.
              </p>
              <p className="text-blue-200 text-sm mt-1">
                Certified mechanics at your door in 30–60 minutes. Available 24/7, 365 days.
              </p>
            </div>
            <div className="flex flex-wrap gap-3 justify-center">
              <a
                href={`tel:${MAIN_PHONE}`}
                className="inline-flex items-center gap-2 bg-white text-blue-700 font-bold px-6 py-3 rounded-xl hover:bg-blue-50 transition-colors shadow-lg text-sm"
              >
                <Phone className="w-4 h-4" />
                {MAIN_PHONE_DISPLAY}
              </a>
              <Link
                href="/services"
                className="inline-flex items-center gap-2 bg-blue-700 hover:bg-blue-800 text-white font-bold px-6 py-3 rounded-xl transition-colors border border-blue-500 text-sm"
              >
                Browse Services
                <ArrowRight className="w-4 h-4" />
              </Link>
            </div>
          </div>
        </div>
      </section>

    </main>
  );
}

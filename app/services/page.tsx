// app/services/page.tsx
import type { Metadata } from "next";
import Link from "next/link";
import {
  Phone, CheckCircle, Clock, Shield, Award, ArrowRight, Car, Bike,
  Wrench, Gauge, Droplet, Wind, Battery, Settings, Zap, Cog, CircuitBoard,
  type LucideIcon,
} from "lucide-react";
import { serviceCategories } from "@/lib/data/serviceCategory";
import { SITE_URL } from "@/lib/constants";
import { ServiceCard } from "@/components/ui/ServiceCard";

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

// Icon map — resolves string names from lib/services.ts to real Lucide components
const iconMap: Record<string, LucideIcon> = {
  Wrench, Car, Gauge, Droplet, Wind, Battery,
  Settings, Shield, Bike, Zap, Cog, CircuitBoard,
};

const trustItems = [
  { icon: Clock,       label: "24/7 Service",        sub: "Emergency & regular"   },
  { icon: Award,       label: "Certified Techs",     sub: "Trained professionals" },
  { icon: Shield,      label: "30-Day Warranty",     sub: "On all repairs"        },
  { icon: CheckCircle, label: "Transparent Pricing", sub: "No hidden charges"     },
];

const howItWorks = [
  { n: "1", title: "Book Service",     desc: "Call us or book online. Choose your time and location."  },
  { n: "2", title: "We Come to You",   desc: "Technician arrives at your doorstep with tools & parts." },
  { n: "3", title: "Expert Service",   desc: "Professional diagnosis & repair done at your location."  },
  { n: "4", title: "Drive Away Happy", desc: "30-day warranty, digital receipt, and peace of mind."    },
];

const whyDoorstep = [
  { title: "Save Time",             desc: "No driving to a garage, waiting for hours, and driving back. We come to you while you work or relax." },
  { title: "Avoid Traffic",         desc: "Why waste time in traffic when we can service your vehicle at your home or office?"                    },
  { title: "Complete Transparency", desc: "Watch the work being done. Understand exactly what's being fixed and why — no surprises."              },
  { title: "Emergency Ready",       desc: "Breakdown on the road? We provide 24/7 emergency service anywhere across our cities."                  },
  { title: "Cost Effective",        desc: "Lower overhead means better prices for you without compromising on quality or parts."                  },
  { title: "Safe & Secure",         desc: "Your vehicle stays with you. No need to leave it at an unfamiliar garage."                            },
];

export default function ServicesPage() {
  return (
    <>
      {/* HERO */}
      <section className="bg-gradient-to-br from-blue-50 to-blue-100 py-16">
        <div className="container mx-auto px-4 text-center">
          <h1 className="text-4xl md:text-5xl font-bold text-gray-900 mb-4">
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
            </a>
          </div>
        </div>
      </section>

      {/* TRUST STRIP */}
      <section className="bg-white border-b border-gray-100 py-6">
        <div className="container mx-auto px-4">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-6 text-center">
            {trustItems.map(({ icon: Icon, label, sub }) => (
              <div key={label} className="flex flex-col items-center gap-1">
                <Icon className="w-6 h-6 text-green-600 mb-1" />
                <p className="font-bold text-gray-900 text-sm">{label}</p>
                <p className="text-xs text-gray-500">{sub}</p>
              </div>
            ))}
          </div>
        </div>
      </section>
{serviceCategories.map((category, index) => (
  <section key={index} className={`py-16 ${category.bgColor}`}>
    <div className="container mx-auto px-4">
      <h2 className="text-2xl md:text-3xl font-bold flex items-center gap-2 mb-3">
        <category.icon className={`w-7 h-7 text-${category.color}-600`} />
        {category.title}
      </h2>
      <p className="text-gray-600 mb-8">
        {category.description}
      </p>
      
      <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6">
        {category.data.map((s) => (
          <ServiceCard
            key={s.slug}
            slug={s.slug}
            iconName={s.icon}
            title={s.shortTitle}
            tagline={s.tagline}
            price={s.price}
            duration={s.duration}
            accentColor={category.color}
          />
        ))}
      </div>
    </div>
  </section>
))}

      {/* HOW IT WORKS */}
      <section className="py-16 bg-white">
        <div className="container mx-auto px-4 max-w-4xl">
          <h2 className="text-3xl font-bold text-center mb-12">How It Works</h2>
          <div className="grid sm:grid-cols-2 md:grid-cols-4 gap-8">
            {howItWorks.map(({ n, title, desc }) => (
              <div key={n} className="text-center">
                <div className="w-16 h-16 bg-blue-600 text-white rounded-full flex items-center justify-center mx-auto mb-4 text-2xl font-bold shadow-md">
                  {n}
                </div>
                <h3 className="font-bold text-lg mb-2">{title}</h3>
                <p className="text-gray-600 text-sm">{desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* WHY DOORSTEP */}
      <section className="py-16 bg-gray-50">
        <div className="container mx-auto px-4 max-w-4xl">
          <h2 className="text-3xl font-bold text-center mb-12">Why Choose Doorstep Service?</h2>
          <div className="grid md:grid-cols-2 gap-8">
            {whyDoorstep.map(({ title, desc }) => (
              <div key={title} className="flex gap-4">
                <CheckCircle className="w-6 h-6 text-green-600 flex-shrink-0 mt-1" />
                <div>
                  <h3 className="font-bold text-lg mb-1">{title}</h3>
                  <p className="text-gray-600">{desc}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* BOTTOM CTA */}
      <section className="py-16 bg-blue-600 text-white text-center">
        <div className="container mx-auto px-4">
          <h2 className="text-3xl font-bold mb-4">Not Sure What You Need?</h2>
          <p className="text-blue-100 mb-8 text-lg">
            Call us and describe the problem — we'll tell you exactly what service you need, with no obligation.
          </p>
          <div className="flex flex-wrap gap-4 justify-center">
            <Link href="/contact#contact-form" className="bg-white text-blue-600 px-8 py-3 rounded-lg font-bold hover:bg-blue-50 transition-colors">
              Book Service Now
            </Link>
            <a href="tel:+918197459732" className="bg-red-500 text-white px-8 py-3 rounded-lg font-bold hover:bg-red-600 transition-colors flex items-center gap-2">
              <Phone className="w-4 h-4" /> +91 81974 59732
            </a>
          </div>
        </div>
      </section>
    </>
  );
}

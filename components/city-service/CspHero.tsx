// ══════════════════════════════════════════════════════════════════════════════
// CITY-SERVICE-CATEGORY PAGE COMPONENTS
// All for app/[citySlug]/services/[serviceSlug]/page.tsx
// Split each block below into its own file as indicated.
// ══════════════════════════════════════════════════════════════════════════════

// ─────────────────────────────────────────────────────────────────────────────
// FILE: components/city-service/CspHero.tsx
// ─────────────────────────────────────────────────────────────────────────────
// "use client" for WhatsApp link generation only

import Link from 'next/link';
import { MapPin, Shield, Clock, Zap } from 'lucide-react';
import type { CityServiceCategoryPageData } from '@/lib/cityPages';
import { WHATSAPP_NUMBER } from '@/lib/constants';

const COLOR_MAP: Record<string, { gradient: string; btn: string; badge: string }> = {
  blue:   { gradient: 'from-blue-50 to-blue-100',     btn: 'bg-blue-600 hover:bg-blue-700',     badge: 'bg-blue-100 text-blue-800'   },
  red:    { gradient: 'from-red-50 to-red-100',       btn: 'bg-red-600 hover:bg-red-700',       badge: 'bg-red-100 text-red-800'     },
  amber:  { gradient: 'from-amber-50 to-amber-100',   btn: 'bg-amber-600 hover:bg-amber-700',   badge: 'bg-amber-100 text-amber-800' },
  green:  { gradient: 'from-green-50 to-green-100',   btn: 'bg-green-600 hover:bg-green-700',   badge: 'bg-green-100 text-green-800' },
  orange: { gradient: 'from-orange-50 to-orange-100', btn: 'bg-orange-600 hover:bg-orange-700', badge: 'bg-orange-100 text-orange-800'},
  purple: { gradient: 'from-purple-50 to-purple-100', btn: 'bg-purple-600 hover:bg-purple-700', badge: 'bg-purple-100 text-purple-800'},
  teal:   { gradient: 'from-teal-50 to-teal-100',     btn: 'bg-teal-600 hover:bg-teal-700',     badge: 'bg-teal-100 text-teal-800'   },
};

export function CspHero({ data, cityPhone }: { data: CityServiceCategoryPageData; cityPhone: string }) {
  const theme = COLOR_MAP[data.categoryColor] ?? COLOR_MAP.blue;
  const waMsg = encodeURIComponent(`Hi, I need ${data.categoryTitle} in ${data.cityName}`);

  return (
    <section className={`bg-gradient-to-br ${theme.gradient} py-14 md:py-20`}>
      <div className="container mx-auto px-4">
        <div className="max-w-3xl mx-auto text-center">

          {/* Badge */}
          <div className="inline-flex items-center gap-2 mb-5">
            {data.heroBadgeText && (
              <span className={`px-4 py-1.5 rounded-full text-xs font-bold uppercase tracking-widest ${theme.badge}`}>
                {data.heroBadgeText}
              </span>
            )}
            <span className="inline-flex items-center gap-1 text-gray-600 text-sm">
              <MapPin className="w-3.5 h-3.5" aria-hidden="true" />
              {data.cityName}
            </span>
          </div>

          {/* H1 — unique per city+category */}
          <h1 className="text-4xl md:text-5xl lg:text-6xl font-extrabold text-gray-900 leading-tight mb-5">
            {data.heroHeading}
          </h1>

          <p className="text-lg md:text-xl text-gray-600 mb-8 max-w-2xl mx-auto leading-relaxed">
            {data.heroSubheading}
          </p>

          {/* CTA buttons */}
          <div className="flex flex-wrap gap-4 justify-center mb-8">
            <Link
              href="/contact#contact-form"
              className={`${theme.btn} text-white px-8 py-3.5 rounded-xl font-bold shadow-lg transition-all hover:-translate-y-0.5 text-base`}
            >
              Book {data.categoryTitle} Now
            </Link>
            <a
              href={`tel:${cityPhone}`}
              className="bg-white border-2 border-gray-900 text-gray-900 px-8 py-3.5 rounded-xl font-bold hover:bg-gray-900 hover:text-white transition-all text-base"
            >
              Call {cityPhone}
            </a>
            <a
              href={`https://wa.me/${WHATSAPP_NUMBER}?text=${waMsg}`}
              target="_blank"
              rel="noopener noreferrer"
              className="bg-green-500 text-white px-6 py-3.5 rounded-xl font-bold hover:bg-green-600 transition-all text-base"
            >
              WhatsApp
            </a>
          </div>

          {/* Trust micro-badges */}
          <div className="flex flex-wrap justify-center gap-5 text-sm text-gray-500">
            {[
              { icon: Shield, text: '30-day warranty' },
              { icon: Clock,  text: '30–60 min response' },
              { icon: Zap,    text: 'No hidden charges' },
            ].map(({ icon: Icon, text }) => (
              <span key={text} className="flex items-center gap-1.5">
                <Icon className="w-4 h-4 text-blue-500" aria-hidden="true" />
                {text}
              </span>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}

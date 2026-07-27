// ─────────────────────────────────────────────────────────────────────────────
// FILE: components/city-service/CspCTA.tsx
// Final CTA banner
// ─────────────────────────────────────────────────────────────────────────────

import Link from 'next/link';
import { Phone } from 'lucide-react';
import type { CityServiceCategoryPageData } from '@/lib/cityPages';

export function CspCTA({ data }: { data: CityServiceCategoryPageData }) {
  return (
    <section className="py-16 bg-gradient-to-br from-blue-700 to-blue-900 text-white text-center">
      <div className="container mx-auto px-4 max-w-2xl">
        <h2 className="text-3xl md:text-4xl font-extrabold mb-4">
          Ready to Book {data.categoryTitle} in {data.cityName}?
        </h2>
        <p className="text-blue-200 text-lg mb-8">
          Certified technicians arrive in 20 minutes. Upfront pricing, no hidden charges.
        </p>
        <div className="flex flex-wrap gap-4 justify-center">
          <Link
            href="/contact#contact-form"
            className="bg-yellow-400 text-gray-900 px-10 py-4 rounded-xl font-extrabold hover:bg-yellow-300 transition-colors text-lg shadow-xl"
          >
            Book Now — It&apos;s Free
          </Link>
          <a
            href={`tel:${data.cityPhone}`}
            className="bg-white/10 border border-white/30 text-white px-8 py-4 rounded-xl font-bold hover:bg-white/20 transition-colors flex items-center gap-2 text-base"
          >
            <Phone className="w-5 h-5" aria-hidden="true" />
            {data.cityPhone}
          </a>
        </div>
        <div className="mt-8 flex justify-center gap-6 text-sm text-blue-300">
          {['30-day warranty', 'Verified mechanics', 'Doorstep service', 'Transparent pricing'].map((t) => (
            <span key={t} className="flex items-center gap-1.5">
              <span className="w-1.5 h-1.5 rounded-full bg-green-400 inline-block" aria-hidden="true" />
              {t}
            </span>
          ))}
        </div>
      </div>
    </section>
  );
}


// ─────────────────────────────────────────────────────────────────────────────
// FILE: components/city-service/CspTestimonials.tsx
// ─────────────────────────────────────────────────────────────────────────────

import { Star } from 'lucide-react';
import type { CityServiceCategoryPageData } from '@/lib/cityPages';

export function CspTestimonials({ data }: { data: CityServiceCategoryPageData }) {
  const testimonials = data.testimonials ?? [];
  if (testimonials.length === 0) return null;

  return (
    <section className="py-16 bg-gray-50">
      <div className="container mx-auto px-4">
        <div className="text-center mb-10">
          <h2 className="text-3xl font-extrabold text-gray-900 mb-3">
            Customer Reviews — {data.categoryTitle} in {data.cityName}
          </h2>
        </div>
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
          {testimonials.map((t, i) => (
            <div key={i} className="bg-white rounded-2xl p-6 shadow-sm border border-gray-100 flex flex-col">
              <div className="flex gap-1 mb-4" aria-label={`${t.rating} out of 5 stars`}>
                {Array.from({ length: 5 }, (_, si) => (
                  <Star key={si} className={`w-4 h-4 ${si < t.rating ? 'fill-yellow-400 text-yellow-400' : 'text-gray-200 fill-gray-200'}`} aria-hidden="true" />
                ))}
              </div>
              <p className="text-gray-700 text-sm leading-relaxed flex-1 mb-5">&ldquo;{t.body}&rdquo;</p>
              <div className="flex items-center gap-3 pt-4 border-t border-gray-100">
                <div className="w-9 h-9 rounded-full bg-blue-100 flex items-center justify-center flex-shrink-0">
                  <span className="text-blue-700 font-bold text-xs">{t.name.charAt(0)}</span>
                </div>
                <div className="min-w-0">
                  <p className="font-bold text-gray-900 text-sm truncate">{t.name}</p>
                  <p className="text-xs text-gray-400 truncate">
                    {[t.area, t.vehicle].filter(Boolean).join(' · ') || data.cityName}
                  </p>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
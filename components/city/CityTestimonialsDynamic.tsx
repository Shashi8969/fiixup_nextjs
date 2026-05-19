// =====================================================================
// FILE: components/city/CityTestimonialsDynamic.tsx
// =====================================================================

import { Star } from 'lucide-react';
import type { CityHubPageData } from '@/lib/cityPages';

export function CityTestimonialsDynamic({ data }: { data: CityHubPageData }) {
  const testimonials = data.testimonials ?? [];
  if (testimonials.length === 0) return null;

  return (
    <section id="testimonials" className="py-16 bg-gray-50">
      <div className="container mx-auto px-4">
        <div className="text-center mb-12">
          <span className="inline-block text-blue-600 text-sm font-semibold uppercase tracking-widest mb-3">
            Customer Reviews
          </span>
          <h2 className="text-3xl md:text-4xl font-extrabold text-gray-900 mb-3">
            {data.testimonialsHeading ?? `What ${data.cityName} Customers Say`}
          </h2>
          {data.testimonialsSubtext && (
            <p className="text-gray-500 max-w-xl mx-auto">{data.testimonialsSubtext}</p>
          )}
        </div>

        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
          {testimonials.map((t, i) => (
            <div key={i} className="bg-white rounded-2xl p-6 shadow-sm border border-gray-100 hover:shadow-md transition-shadow flex flex-col">
              {/* Stars */}
              <div className="flex gap-1 mb-4" aria-label={`${t.rating} out of 5 stars`}>
                {Array.from({ length: 5 }, (_, si) => (
                  <Star
                    key={si}
                    className={`w-4 h-4 ${si < t.rating ? 'fill-yellow-400 text-yellow-400' : 'text-gray-200 fill-gray-200'}`}
                    aria-hidden="true"
                  />
                ))}
              </div>

              {/* Body */}
              <p className="text-gray-700 leading-relaxed flex-1 mb-5 text-sm">
                &ldquo;{t.body}&rdquo;
              </p>

              {/* Reviewer info */}
              <div className="flex items-center gap-3 pt-4 border-t border-gray-100">
                <div className="w-10 h-10 rounded-full bg-blue-100 flex items-center justify-center flex-shrink-0">
                  <span className="text-blue-700 font-bold text-sm" aria-hidden="true">
                    {t.name.charAt(0).toUpperCase()}
                  </span>
                </div>
                <div className="min-w-0">
                  <p className="font-bold text-gray-900 text-sm truncate">{t.name}</p>
                  <p className="text-xs text-gray-500 truncate">
                    {[t.area, t.vehicle].filter(Boolean).join(' · ') || data.cityName}
                  </p>
                </div>
                {t.date_label && (
                  <span className="ml-auto text-xs text-gray-400 flex-shrink-0">{t.date_label}</span>
                )}
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

import { Star } from 'lucide-react';
import type { AreaHubPageData } from '@/lib/areaPages';
import { Reveal } from '@/components/ui/Reveal';

export function AreaTestimonials({ data, heading }: { data: AreaHubPageData; heading?: string | null }) {
  const testimonials = data.testimonials ?? [];
  if (testimonials.length === 0) return null;

  return (
    <section id="testimonials" className="bg-white py-16">
      <div className="container mx-auto px-4">
        <div className="mb-12 text-center">
          <span className="mb-3 inline-block text-sm font-semibold uppercase tracking-widest text-blue-600">
            Customer reviews
          </span>
          <h2 className="mb-3 text-3xl font-extrabold text-gray-900 md:text-4xl">
            {heading?.trim() || `What ${data.areaName} customers say`}
          </h2>
        </div>

        <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
          {testimonials.map((t, i) => (
            <Reveal key={i} delay={Math.min(i, 6) * 0.06}>
              <div className="flex h-full flex-col rounded-2xl border border-gray-100 bg-gray-50 p-6 transition duration-200 hover:-translate-y-1 hover:border-gray-200 hover:shadow-lg">
                <div className="mb-4 flex gap-1" aria-label={`${t.rating} out of 5 stars`}>
                  {Array.from({ length: 5 }, (_, si) => (
                    <Star
                      key={si}
                      className={`h-4 w-4 ${si < t.rating ? 'fill-amber-400 text-amber-400' : 'fill-gray-200 text-gray-200'}`}
                      aria-hidden="true"
                    />
                  ))}
                </div>

                <p className="mb-5 flex-1 text-sm leading-relaxed text-gray-700">&ldquo;{t.text}&rdquo;</p>

                <div className="flex items-center gap-3 border-t border-gray-200 pt-4">
                  <div className="flex h-10 w-10 flex-shrink-0 items-center justify-center rounded-full bg-gradient-to-br from-blue-500 to-blue-700 text-white">
                    <span className="text-sm font-bold" aria-hidden="true">
                      {t.name.charAt(0).toUpperCase()}
                    </span>
                  </div>
                  <div className="min-w-0">
                    <p className="truncate text-sm font-bold text-gray-900">{t.name}</p>
                    <p className="truncate text-xs text-gray-500">
                      {[t.area, t.vehicle].filter(Boolean).join(' · ') || data.areaName}
                    </p>
                  </div>
                  {t.date && <span className="ml-auto flex-shrink-0 text-xs text-gray-400">{t.date}</span>}
                </div>
              </div>
            </Reveal>
          ))}
        </div>
      </div>
    </section>
  );
}

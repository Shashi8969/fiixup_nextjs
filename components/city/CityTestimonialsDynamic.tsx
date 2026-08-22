// =====================================================================
// FILE: components/city/CityTestimonialsDynamic.tsx
// =====================================================================

import type { CityHubPageData } from '@/lib/cityPages';
import { Marquee } from '@/components/ui/Marquee';
import { TestimonialCard } from '@/components/ui/TestimonialCard';

export function CityTestimonialsDynamic({ data }: { data: CityHubPageData }) {
  const testimonials = data.testimonials ?? [];
  if (testimonials.length === 0) return null;

  return (
    <section id="testimonials" className="py-16 bg-gray-50 overflow-hidden">
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
      </div>

      {/* Same auto-scrolling marquee pattern as the homepage — a row this
          long (6-10 reviews per city) reads better as a continuous strip
          you can watch or hover-pause than as a static grid stacking many
          rows deep down the page. */}
      <Marquee durationSeconds={Math.max(30, testimonials.length * 7)}>
        {testimonials.map((t, i) => (
          <div key={`${t.name}-${i}`} className="w-[320px] shrink-0 sm:w-[360px]">
            <TestimonialCard
              name={t.name}
              rating={t.rating}
              text={t.body}
              date={t.date_label}
              vehicle={t.vehicle}
              area={t.area || data.cityName}
              sourceLabel={t.verified ? 'Verified Customer Review' : undefined}
            />
          </div>
        ))}
      </Marquee>
    </section>
  );
}

// components/service/ServiceTestimonials.tsx
// ─────────────────────────────────────────────────────────────────────────────
// Service-specific testimonials with vehicle, location, and verified badge.
// Falls back to global testimonials if service has none.
// ─────────────────────────────────────────────────────────────────────────────

import type { ServiceTestimonial } from "@/lib/models/service.model";
import { globalTestimonials } from "@/lib/data/testimonials";
import { Star, BadgeCheck } from "lucide-react";

interface Props {
  testimonials?: ServiceTestimonial[];
  serviceTitle: string;
}

export default function ServiceTestimonials({ testimonials, serviceTitle }: Props) {
  // Map global testimonials to ServiceTestimonial shape as fallback
  const displayItems: ServiceTestimonial[] =
    testimonials && testimonials.length > 0
      ? testimonials
      : globalTestimonials.map((t) => ({
          name: t.name,
          location: t.area,
          vehicle: t.vehicle,
          rating: t.rating,
          review: t.text,
          date: t.date,
          verified: true,
        }));

  return (
    <section className="py-16 bg-gray-50">
      <div className="container mx-auto px-4">
        <div className="text-center mb-10">
          <span className="inline-block text-xs font-bold tracking-widest uppercase text-gray-500 mb-2">
            Real Customer Reviews
          </span>
          <h2 className="text-2xl md:text-3xl font-bold text-gray-900 mb-3">
            What Customers Say About Our {serviceTitle}
          </h2>
          <div className="flex items-center justify-center gap-2 mt-3">
            <div className="flex">
              {[1,2,3,4,5].map((s) => (
                <Star key={s} className="w-5 h-5 fill-amber-400 text-amber-400" />
              ))}
            </div>
            <span className="font-bold text-gray-900">4.9</span>
            <span className="text-gray-500 text-sm">/ 5 — 10,000+ services completed</span>
          </div>
        </div>

        <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {displayItems.map((t, i) => (
            <div
              key={i}
              className="bg-white rounded-2xl border border-gray-200 p-6 shadow-sm hover:shadow-md transition-shadow"
            >
              {/* Stars */}
              <div className="flex gap-0.5 mb-3">
                {Array.from({ length: t.rating }).map((_, si) => (
                  <Star key={si} className="w-4 h-4 fill-amber-400 text-amber-400" />
                ))}
              </div>

              {/* Review */}
              <p className="text-gray-700 text-sm leading-relaxed mb-4">"{t.review}"</p>

              {/* Reviewer info */}
              <div className="border-t border-gray-100 pt-4 flex items-start justify-between gap-2">
                <div>
                  <div className="flex items-center gap-1.5">
                    <p className="font-bold text-gray-900 text-sm">{t.name}</p>
                    {t.verified && (
                      <BadgeCheck className="w-3.5 h-3.5 text-blue-500" />
                    )}
                  </div>
                  <p className="text-xs text-gray-500 mt-0.5">{t.location}</p>
                  <p className="text-xs text-gray-400">{t.vehicle}</p>
                </div>
                <span className="text-xs text-gray-400 flex-shrink-0 mt-0.5">{t.date}</span>
              </div>
            </div>
          ))}
        </div>

        {/* Bottom CTA */}
        <div className="text-center mt-10">
          <p className="text-sm text-gray-500 mb-4">
            Join 10,000+ satisfied customers across Bengaluru & Chennai
          </p>
          <a
            href="tel:+918197459732"
            className="inline-flex items-center gap-2 bg-red-600 text-white font-bold px-7 py-3.5 rounded-xl hover:bg-red-700 transition-colors shadow-lg shadow-red-100"
          >
            Book Your Service Now
          </a>
        </div>
      </div>
    </section>
  );
}

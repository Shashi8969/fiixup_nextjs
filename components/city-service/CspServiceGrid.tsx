
// ─────────────────────────────────────────────────────────────────────────────
// FILE: components/city-service/CspServiceGrid.tsx
// Grid of all services in this category for this city
// Each card → /{city}/{service-slug} (the location_service page)
// ─────────────────────────────────────────────────────────────────────────────

import Link from 'next/link';
import { Wrench } from 'lucide-react';
import type { CityServiceCategoryPageData } from '@/lib/cityPages';
import { iconMap } from '@/lib/icons';

export function CspServiceGrid({ data }: { data: CityServiceCategoryPageData }) {
  const services = data.services ?? [];
  if (services.length === 0) return null;

  return (
    <section className="py-16 bg-white">
      <div className="container mx-auto px-4">
        <div className="text-center mb-10">
          <h2 className="text-3xl md:text-4xl font-extrabold text-gray-900 mb-3">
            All {data.categoryTitle} in {data.cityName}
          </h2>
          <p className="text-gray-500 max-w-xl mx-auto">{data.categoryDescription}</p>
        </div>

        <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-5">
          {services.map((s) => {
            const Icon = iconMap[s.icon] ?? Wrench;
            return (
              <Link
                key={s.slug}
                href={`/${data.citySlug}/${s.slug}`}
                className="group bg-white border border-gray-200 hover:border-blue-300 rounded-2xl p-6 hover:shadow-xl transition-all hover:-translate-y-1"
              >
                <div className="flex items-start gap-4">
                  <div className="bg-blue-50 group-hover:bg-blue-100 rounded-xl p-3 flex-shrink-0 transition-colors">
                    <Icon className="w-7 h-7 text-blue-600" aria-hidden="true" />
                  </div>
                  <div className="min-w-0">
                    <h3 className="font-bold text-gray-900 mb-1 group-hover:text-blue-700 transition-colors">
                      {s.title} in {data.cityName}
                    </h3>
                    <p className="text-sm text-gray-500 mb-3 line-clamp-2">{s.tagline}</p>
                    <div className="flex items-center justify-between">
                      <span className="text-blue-600 font-bold text-sm">From {s.price}</span>
                      {s.duration && (
                        <span className="text-xs text-gray-400 bg-gray-100 px-2 py-0.5 rounded-full">{s.duration}</span>
                      )}
                    </div>
                  </div>
                </div>
              </Link>
            );
          })}
        </div>
      </div>
    </section>
  );
}


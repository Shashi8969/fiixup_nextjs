
// ─────────────────────────────────────────────────────────────────────────────
// FILE: components/city-service/CspWhyChoose.tsx
// ─────────────────────────────────────────────────────────────────────────────

import type { CityServiceCategoryPageData } from '@/lib/cityPages';
import { iconMap } from '@/lib/icons';
import { Star } from 'lucide-react';

export function CspWhyChoose({ data }: { data: CityServiceCategoryPageData }) {
  const points = data.whyChoosePoints ?? [];
  if (points.length === 0) return null;

  return (
    <section className="py-16 bg-gray-50">
      <div className="container mx-auto px-4">
        <div className="text-center mb-10">
          <h2 className="text-3xl font-extrabold text-gray-900 mb-3">
            Why Choose Fiixup for {data.categoryTitle} in {data.cityName}?
          </h2>
        </div>
        <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6 max-w-5xl mx-auto">
          {points.map((p, i) => {
            const Icon = iconMap[p.icon] ?? Star;
            return (
              <div key={i} className="bg-white rounded-2xl p-6 border border-gray-100 hover:shadow-md transition-shadow">
                <div className="bg-blue-50 w-12 h-12 rounded-xl flex items-center justify-center mb-4">
                  <Icon className="w-6 h-6 text-blue-600" aria-hidden="true" />
                </div>
                <h3 className="font-bold text-gray-900 mb-2">{p.title}</h3>
                <p className="text-gray-500 text-sm leading-relaxed">{p.desc}</p>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
}

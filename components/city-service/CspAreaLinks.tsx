// ─────────────────────────────────────────────────────────────────────────────
// FILE: components/city-service/CspAreaLinks.tsx
// Internal links to area-level service pages
// ─────────────────────────────────────────────────────────────────────────────

import Link from 'next/link';
import { MapPin } from 'lucide-react';
import type { CityServiceCategoryPageData } from '@/lib/cityPages';

export function CspAreaLinks({ data }: { data: CityServiceCategoryPageData }) {
  const areas = data.areas ?? [];
  if (areas.length === 0) return null;

  return (
    <section className="py-12 bg-white">
      <div className="container mx-auto px-4">
        <h2 className="text-2xl font-extrabold text-gray-900 mb-2">
          {data.categoryTitle} Near You in {data.cityName}
        </h2>
        <p className="text-gray-500 mb-6 text-sm">
          We provide doorstep {data.categoryTitle.toLowerCase()} across all major areas:
        </p>
        <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-2">
          {areas.map((area) => (
            <Link
              key={area.slug}
              href={`/${data.citySlug}/${area.slug}`}
              className="flex items-center gap-1.5 text-sm text-blue-600 hover:text-blue-800 hover:underline py-1"
            >
              <MapPin className="w-3 h-3 flex-shrink-0" aria-hidden="true" />
              {area.name}
            </Link>
          ))}
        </div>
      </div>
    </section>
  );
}


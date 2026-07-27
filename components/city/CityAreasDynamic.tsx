
// =====================================================================
// FILE: components/city/CityAreasDynamic.tsx
// =====================================================================

import Link from 'next/link';
import { MapPin } from 'lucide-react';
import type { CityHubPageData } from '@/lib/cityPages';
import { filterValidItemsByPath, getPublicPathList } from '@/lib/public-links';

// Matches the areaServed cap in cityHubSchema() (lib/schema.ts) — cities with
// 50+ areas were rendering every single one as a card with no limit.
const AREAS_DISPLAY_LIMIT = 20;

export async function CityAreasDynamic({ data }: { data: CityHubPageData }) {
  const activePaths = await getPublicPathList();
  const areas = filterValidItemsByPath(
    data.areas ?? [],
    (area) => `/${data.citySlug}/${area.slug}`,
    activePaths,
    `${data.citySlug} city area grid`,
    (area) => area.name
  ).slice(0, AREAS_DISPLAY_LIMIT);
  if (areas.length === 0) return null;

  return (
    <section id="areas" className="py-16 bg-gray-50">
      <div className="container mx-auto px-4">
        <div className="text-center mb-10">
          <span className="inline-block text-blue-600 text-sm font-semibold uppercase tracking-widest mb-3">
            Coverage Map
          </span>
          <h2 className="text-3xl md:text-4xl font-extrabold text-gray-900 mb-3">
            Doorstep Service Across {data.cityName}
          </h2>
          <p className="text-gray-500 max-w-xl mx-auto">
            We cover all major areas in {data.cityName}. Click your area to see service options near you.
          </p>
        </div>

        <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-3">
          {areas.map((area) => (
            <Link
              key={area.slug}
              href={`/${data.citySlug}/${area.slug}`}
              className="group flex items-center gap-2 bg-white border border-gray-200 hover:border-blue-400 hover:bg-blue-50 rounded-xl px-4 py-3 transition-all text-sm font-medium text-gray-700 hover:text-blue-700"
            >
              <MapPin className="w-3.5 h-3.5 text-gray-400 group-hover:text-blue-500 flex-shrink-0 transition-colors" aria-hidden="true" />
              <span className="truncate">{area.name}</span>
            </Link>
          ))}
        </div>
      </div>
    </section>
  );
}

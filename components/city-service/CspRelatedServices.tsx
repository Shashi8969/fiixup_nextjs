
// ─────────────────────────────────────────────────────────────────────────────
// FILE: components/city-service/CspRelatedServices.tsx
// ─────────────────────────────────────────────────────────────────────────────

import Link from 'next/link';
import type { CityServiceCategoryPageData } from '@/lib/cityPages';
import { filterValidItemsByPath, getPublicPathList } from '@/lib/public-links';

export async function CspRelatedServices({ data }: { data: CityServiceCategoryPageData }) {
  const activePaths = await getPublicPathList();
  const related = filterValidItemsByPath(
    data.relatedServices ?? [],
    (service) => `/${data.citySlug}/services/${service.slug}`,
    activePaths,
    `${data.citySlug}/${data.categorySlug} related services`,
    (service) => service.name
  );
  if (related.length === 0) return null;

  return (
    <section className="py-12 bg-gray-50">
      <div className="container mx-auto px-4">
        <h2 className="text-2xl font-extrabold text-gray-900 mb-6">
          Other Vehicle Services in {data.cityName}
        </h2>
        <div className="flex flex-wrap gap-3">
          {related.map((s) => (
            <Link
              key={s.slug}
              href={`/${data.citySlug}/services/${s.slug}`}
              className="bg-white border border-gray-200 hover:border-blue-300 text-gray-700 hover:text-blue-700 px-4 py-2 rounded-full text-sm font-semibold transition-all hover:shadow-sm"
            >
              {s.name}
            </Link>
          ))}
        </div>
      </div>
    </section>
  );
}



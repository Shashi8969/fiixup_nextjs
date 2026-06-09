// ─────────────────────────────────────────────────────────────────────────────
// FILE: components/city-service/CspServiceGrid.tsx
// Grid of all services in this category for this city.
// Each card → /{city}/{service-slug} (city-level location_service page)
// ─────────────────────────────────────────────────────────────────────────────

import type { CityServiceCategoryPageData } from '@/lib/cityPages';
import { CityServiceCard } from '@/components/ui/CityServiceCard';

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
          {services.map((s) => (
            <CityServiceCard
              key={s.slug}
              citySlug={data.citySlug}
              cityName={data.cityName}
              serviceSlug={s.slug}
              serviceName={s.title}
              serviceCategory={s.category}
              tagline={s.tagline}
              priceLabel={s.price}
              duration={s.duration}
              icon={s.icon}
              variant="compact"
            />
          ))}
        </div>
      </div>
    </section>
  );
}

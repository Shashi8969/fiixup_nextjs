
// =====================================================================
// FILE: components/city/CityServicesDynamic.tsx
// =====================================================================
// This is a Server Component — no "use client" needed

import Link from 'next/link';
import type { CityHubPageData } from '@/lib/cityPages';
import { getAllServiceCategories } from '@/lib/data/serviceCategory';

// SERVICE ICON MAP — maps DB color strings to Tailwind classes
const THEME: Record<string, { border: string; iconBg: string; iconText: string; badge: string }> = {
  blue:   { border: 'hover:border-blue-300',   iconBg: 'bg-blue-50',   iconText: 'text-blue-600',   badge: 'bg-blue-100 text-blue-700' },
  red:    { border: 'hover:border-red-300',     iconBg: 'bg-red-50',    iconText: 'text-red-600',    badge: 'bg-red-100 text-red-700'   },
  amber:  { border: 'hover:border-amber-300',   iconBg: 'bg-amber-50',  iconText: 'text-amber-600',  badge: 'bg-amber-100 text-amber-700' },
  green:  { border: 'hover:border-green-300',   iconBg: 'bg-green-50',  iconText: 'text-green-600',  badge: 'bg-green-100 text-green-700' },
  orange: { border: 'hover:border-orange-300',  iconBg: 'bg-orange-50', iconText: 'text-orange-600', badge: 'bg-orange-100 text-orange-700' },
  purple: { border: 'hover:border-purple-300',  iconBg: 'bg-purple-50', iconText: 'text-purple-600', badge: 'bg-purple-100 text-purple-700' },
  teal:   { border: 'hover:border-teal-300',    iconBg: 'bg-teal-50',   iconText: 'text-teal-600',   badge: 'bg-teal-100 text-teal-700'   },
};

export async function CityServicesDynamic({ data }: { data: CityHubPageData }) {
  // Fetch service categories (cached at module level in prod)
  const categories = await getAllServiceCategories();

  return (
    <section id="service-categories" className="py-16 bg-white">
      <div className="container mx-auto px-4">

        {/* Section header — city-specific from DB */}
        <div className="text-center mb-12">
          <span className="inline-block text-blue-600 text-sm font-semibold uppercase tracking-widest mb-3">
            All Vehicle Services
          </span>
          <h2 className="text-3xl md:text-5xl font-extrabold text-gray-900 mb-4">
            {data.servicesSectionHeading ?? `Vehicle Services in ${data.cityName}`}
          </h2>
          <p className="text-lg text-gray-500 max-w-2xl mx-auto">
            {data.servicesSectionSubtext ?? `Certified technicians at your doorstep across ${data.cityName}. Quality repairs for all makes and models.`}
          </p>
        </div>

        {/* Category cards — each links to /{city}/services/{cat} */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-5">
          {categories.map((cat) => {
            const theme = THEME[cat.color] ?? THEME.blue;
            return (
              <Link
                key={cat.slug}
                href={`/${data.citySlug}/services/${cat.slug}`}
                className={`group p-7 rounded-2xl bg-white border border-gray-100 flex flex-col transition-all duration-200 hover:shadow-xl hover:-translate-y-1 ${theme.border}`}
              >
                {/* Icon */}
                <div className={`mb-5 inline-flex w-fit p-3 rounded-xl ${theme.iconBg} group-hover:scale-110 transition-transform duration-200`}>
                  <cat.icon className={`w-8 h-8 ${theme.iconText}`} aria-hidden="true" />
                </div>

                {/* SEO H3 — city-specific */}
                <h3 className="text-lg font-bold text-gray-900 mb-2">
                  {cat.title} in {data.cityName}
                </h3>

                <p className="text-gray-500 text-sm leading-relaxed flex-1 mb-5">
                  {cat.description}
                </p>

                <span className={`inline-flex items-center gap-1 text-xs font-bold px-3 py-1.5 rounded-full w-fit ${theme.badge}`}>
                  Explore →
                </span>
              </Link>
            );
          })}
        </div>

        {/* CTA — links to /[city]/services overview page if it exists */}
        <div className="text-center mt-10">
          <Link
            href={`/${data.citySlug}/services`}
            className="inline-flex items-center gap-2 bg-blue-600 text-white px-8 py-3.5 rounded-full font-bold hover:bg-blue-700 transition-all shadow-lg shadow-blue-100 hover:-translate-y-0.5"
          >
            Browse All {data.cityName} Services →
          </Link>
        </div>
      </div>
    </section>
  );
}

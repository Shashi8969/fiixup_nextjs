import { serviceCategories } from "@/lib/data/serviceCategory";
import { serviceThemes, type ThemeColor } from "@/lib/theme";
import Link from "next/link";
import type { CityData } from "@/lib/models/city.model";

export function CityServices({ city, areaName }: { city: CityData; areaName?: string }) {
  const displayLocation = areaName || city.name;

  return (
    <section id="service-categories" className="py-12 bg-white">
      <div className="container mx-auto px-4">
        {/* Localized Header */}
        <div className="text-center mb-16">
          <h2 className="text-3xl md:text-5xl font-extrabold mb-4 text-gray-900">
            Professional Vehicle Services in {displayLocation}
          </h2>
          <p className="text-lg text-gray-600 max-w-2xl mx-auto">
            Certified technicians at your doorstep in {displayLocation}. We provide high-quality 
            maintenance and repair for all makes and models across {city.name}.
          </p>
        </div>

        {/* Localized Category Cards */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
          {serviceCategories.slice(0, 8).map((cat) => {
            const theme = serviceThemes[cat.color as ThemeColor] || serviceThemes.blue;

            return (
              <Link 
                key={cat.title} 
                href={`/${city.slug}/services/${cat.slug}`}
                className={`group relative p-8 rounded-2xl bg-white border border-gray-100 transition-all duration-300 flex flex-col hover:shadow-2xl hover:-translate-y-1 ${theme.hoverBorder}`}
              >
                <div className={`mb-6 inline-flex w-fit p-4 rounded-xl border border-gray-50 bg-gray-50/50 group-hover:bg-white transition-all duration-300 ${theme.hoverIconBg}`}>
                  <cat.icon className={`w-10 h-10 ${theme.iconText}`} />
                </div>
                
                {/* SEO Optimized H3 */}
                <h3 className="text-xl font-bold text-gray-900 mb-2">
                  {cat.title} in {displayLocation}
                </h3>
                
                <p className="text-gray-500 text-sm leading-relaxed mb-6 flex-1">
                  {cat.description.replace("at your doorstep", `at your doorstep in ${displayLocation}`)}
                </p>

                <span className={`mt-4 text-sm font-semibold flex items-center gap-1 opacity-0 group-hover:opacity-100 transition-opacity ${theme.linkText}`}>
                  Explore {cat.title} →
                </span>
              </Link>
            );
          })}
        </div>

        <div className="text-center mt-12">
          <Link
            href={`/${city.slug}/services`}
            className="inline-block bg-blue-600 text-white px-8 py-3 rounded-full font-semibold hover:bg-blue-700 transition-all shadow-lg hover:shadow-blue-200 transform hover:-translate-y-0.5"
          >
            Browse All Services in {displayLocation}
          </Link>
        </div>
      </div>
    </section>
  );
}
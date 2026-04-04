import Link from "next/link";
import { MapPin, ArrowRight } from "lucide-react";


export function CityAreas({ city }: { city: any }) {
  if (!city.areas || city.areas.length === 0) return null;

  return (
    <section className="py-12 bg-gray-50">
      <div className="container mx-auto px-4">

        <div className="text-center mb-10">
          <h2 className="text-3xl font-bold text-gray-900">
            Areas We Serve in {city.name}
          </h2>
          <p className="text-gray-600 mt-2">
            Doorstep mechanic service available across all major locations in {city.name}.
          </p>
        </div>

        <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {city.areas.map((area: any) => (
            <Link
              key={area.slug}
              href={`/${city.slug}/${area.slug}`}
              className="group p-5 border rounded-xl bg-white hover:shadow-lg hover:border-blue-300 transition"
            >
              <div className="flex justify-between items-center mb-2">
                <div className="flex items-center gap-2">
                  <MapPin className="w-5 h-5 text-blue-600" />
                  <h3 className="font-semibold text-gray-900 group-hover:text-blue-600">
                    {area.name}
                  </h3>
                </div>
                <ArrowRight className="w-4 h-4 text-gray-400 group-hover:text-blue-600 group-hover:translate-x-1 transition" />
              </div>

              <p className="text-sm text-gray-500">
                {area.highlight}
              </p>
            </Link>
          ))}
        </div>

        {/* SEO booster */}
        <p className="text-center text-sm text-gray-500 mt-8">
          We also serve nearby areas across {city.name} including multiple localities for fast roadside assistance.
        </p>

      </div>
    </section>
  );
}
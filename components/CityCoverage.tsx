import Link from "next/link";
import { MapPin, ArrowRight } from "lucide-react";

const coverageCities = [
  { name: "Bengaluru", slug: "bengaluru", areas: "Koramangala · Whitefield · Indiranagar", highlight: "Pothole & monsoon damage specialists" },
  { name: "Chennai",   slug: "chennai",   areas: "Anna Nagar · T. Nagar · OMR",           highlight: "Coastal corrosion & AC experts" },
  { name: "Hyderabad", slug: "hyderabad", areas: "Hitech City · Gachibowli · Banjara Hills",highlight: "Summer heat & ORR breakdown service" },
  { name: "Mumbai",    slug: "mumbai",    areas: "Andheri · Bandra · Powai · Thane",       highlight: "Monsoon waterlogging rescue 24/7" },
];

export function CityCoverage() {
  return (
    <section className="py-12 bg-white">
      <div className="container mx-auto px-4">
        <div className="text-center mb-12">
          <h2 className="text-3xl md:text-4xl font-bold mb-4 text-gray-900">
            Doorstep Auto Repair — Now in 4 Cities
          </h2>
          <p className="text-lg text-gray-600 max-w-2xl mx-auto">
            Fiixup operates across India's major cities. Click your city for local service details,
            pricing, and coverage areas.
          </p>
        </div>

        <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {coverageCities.map((city) => (
            <Link
              key={city.slug}
              href={`/${city.slug}`}
              className="group p-6 border border-gray-200 rounded-xl hover:shadow-lg hover:border-blue-300 transition-all"
            >
              <div className="flex items-center justify-between mb-3">
                <div className="flex items-center gap-2">
                  <MapPin className="w-5 h-5 text-blue-600" />
                  <h3 className="font-bold text-gray-900 text-lg group-hover:text-blue-600 transition-colors">
                    {city.name}
                  </h3>
                </div>
                <ArrowRight className="w-4 h-4 text-gray-300 group-hover:text-blue-600 group-hover:translate-x-1 transition-all" />
              </div>
              <p className="text-sm text-gray-500 mb-3">{city.areas}</p>
              <span className="inline-block bg-blue-50 text-blue-700 text-xs font-semibold px-3 py-1 rounded-full">
                {city.highlight}
              </span>
            </Link>
          ))}
        </div>

        <p className="text-center text-gray-500 text-sm mt-8">
          More cities coming soon — Delhi, Pune, Kolkata & more 🚀
        </p>
      </div>
    </section>
  );
}

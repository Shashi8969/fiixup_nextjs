import Link from "next/link";
import { MapPin, ArrowRight } from "lucide-react";

const coverageCities = [
  {
    name: "Bengaluru",
    slug: "bangalore",
    areas: "HSR Layout · Koramangala · Whitefield · Indiranagar",
    highlight: "24/7 car & bike mechanic support across traffic-heavy areas"
  },

  {
    name: "Chennai",
    slug: "chennai",
    areas: "Anna Nagar · T Nagar · OMR · Velachery",
    highlight: "Doorstep repair service for daily commuters & breakdowns"
  },

  {
    name: "Hyderabad",
    slug: "hyderabad",
    areas: "Hitech City · Gachibowli · Banjara Hills",
    highlight: "Emergency roadside mechanic service across major city zones"
  },

  {
    name: "Mumbai",
    slug: "mumbai",
    areas: "Andheri · Bandra · Powai · Thane",
    highlight: "Fast mechanic response for roadside & parking breakdowns"
  },
];

export function CityCoverage() {
  return (
    <section className="py-12 bg-white">
      <div className="container mx-auto px-4">

        <div className="text-center mb-12">

          <h2 className="text-3xl md:text-4xl font-bold mb-4 text-gray-900">
            Doorstep Car & Bike Mechanic Services Across Major Indian Cities
          </h2>

          <p className="text-lg text-gray-600 max-w-3xl mx-auto">
            Book nearby car and bike mechanics for doorstep repair, emergency breakdown help,
            battery replacement, puncture repair, oil change, and roadside assistance across
            Bengaluru, Chennai, Hyderabad, and Mumbai.
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

              <p className="text-sm text-gray-500 mb-3">
                {city.areas}
              </p>

              <span className="inline-block bg-blue-50 text-blue-700 text-xs font-semibold px-3 py-1 rounded-full">
                {city.highlight}
              </span>

            </Link>
          ))}
        </div>

        <p className="text-center text-gray-500 text-sm mt-8">
          Expanding soon to Delhi, Pune, Kolkata, Ahmedabad, and more Indian cities
        </p>

      </div>
    </section>
  );
}
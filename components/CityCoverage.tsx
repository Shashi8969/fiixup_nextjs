import Link from "next/link";
import { MapPin, ArrowRight, Navigation } from "lucide-react";
import type { HomeCityCoverageData } from "@/lib/homepage";

const fallbackCoverageCities = [
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

const CARD_ACCENTS = [
  "from-blue-500 to-blue-600",
  "from-red-500 to-red-600",
  "from-amber-500 to-orange-600",
  "from-teal-500 to-emerald-600",
];

// Original, abstract line-art marks — one per city's general character (garden
// city, coastline, arch-and-minaret skyline, gateway-by-the-sea). Not a
// reproduction of any specific monument, photo, or logo — safe to use freely,
// unlike a real landmark illustration or a trademarked civic emblem would be.
function CityGlyph({ slug, className }: { slug: string; className?: string }) {
  const common = {
    className,
    viewBox: "0 0 24 24",
    fill: "none",
    stroke: "currentColor",
    strokeWidth: 1.8,
    strokeLinecap: "round" as const,
    strokeLinejoin: "round" as const,
    "aria-hidden": true,
  };

  switch (slug) {
    case "bangalore":
      // Garden City — a simple leaf
      return (
        <svg {...common}>
          <path d="M12 21c-4.5-2-7.5-6.2-7.5-11A7.5 7.5 0 0 1 19 10c0 4.8-3 9-7 11z" />
          <path d="M12 10.5v8.5" />
        </svg>
      );
    case "chennai":
      // Coastal city — sun over waves
      return (
        <svg {...common}>
          <circle cx="12" cy="7.5" r="2.6" />
          <path d="M3.5 14.5c2-1.8 4-1.8 6 0s4 1.8 6 0 4-1.8 6 0" />
          <path d="M3.5 18.5c2-1.8 4-1.8 6 0s4 1.8 6 0 4-1.8 6 0" />
        </svg>
      );
    case "hyderabad":
      // Skyline of arches and minarets
      return (
        <svg {...common}>
          <path d="M5 21V11a7 7 0 0 1 14 0v10" />
          <path d="M4 21h16" />
          <path d="M8.5 21v-7M12 21v-9M15.5 21v-7" />
        </svg>
      );
    case "mumbai":
      // A grand gateway arch by the sea
      return (
        <svg {...common}>
          <path d="M7 21V10.5a5 5 0 0 1 10 0V21" />
          <path d="M3.5 21h17" />
          <path d="M3.5 17c1.7-1.2 3.3-1.2 5 0s3.3 1.2 5 0 3.3-1.2 5 0" />
        </svg>
      );
    default:
      return <MapPin className={className} aria-hidden="true" />;
  }
}

type CityCoverageProps = Partial<HomeCityCoverageData>;

export function CityCoverage({
  heading = "Doorstep Car & Bike Mechanic Services Across Major Indian Cities",
  subtext = "Book nearby car and bike mechanics for doorstep repair, emergency breakdown help, battery replacement, puncture repair, oil change, and roadside assistance across Bengaluru, Chennai, Hyderabad, and Mumbai.",
  expansionText = "Expanding soon to Delhi, Pune, Kolkata, Ahmedabad, and more Indian cities",
  cities = fallbackCoverageCities,
}: CityCoverageProps = {}) {
  if (!cities.length) return null;

  return (
    <section className="relative overflow-hidden bg-gradient-to-b from-white to-gray-50 py-16">
      {/* Subtle dotted map backdrop */}
      <div
        className="pointer-events-none absolute inset-0 opacity-[0.04]"
        style={{ backgroundImage: "radial-gradient(circle, #2563eb 1.5px, transparent 1.5px)", backgroundSize: "28px 28px" }}
        aria-hidden="true"
      />

      <div className="container relative mx-auto px-4">
        <div className="mb-12 text-center">
          <span className="mb-3 inline-flex items-center gap-1.5 rounded-full bg-blue-50 px-4 py-1.5 text-sm font-semibold text-blue-700">
            <Navigation className="h-3.5 w-3.5" aria-hidden="true" />
            Live in {cities.length} Cities
          </span>
          <h2 className="mb-4 text-3xl font-extrabold text-gray-900 md:text-4xl">
            {heading}
          </h2>
          <p className="mx-auto max-w-3xl text-lg text-gray-600">
            {subtext}
          </p>
        </div>

        <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-4">
          {cities.map((city, index) => (
            <Link
              key={city.slug}
              href={`/${city.slug}`}
              className="group relative flex flex-col overflow-hidden rounded-2xl border border-gray-100 bg-white p-6 shadow-[0_2px_10px_rgba(15,23,42,0.05)] transition-all duration-300 hover:-translate-y-1.5 hover:border-transparent hover:shadow-[0_20px_48px_rgba(15,23,42,0.14)]"
            >
              <div
                className={`absolute inset-x-0 top-0 h-1 bg-gradient-to-r ${CARD_ACCENTS[index % CARD_ACCENTS.length]}`}
                aria-hidden="true"
              />

              <div
                className={`mb-4 flex h-12 w-12 items-center justify-center rounded-xl bg-gradient-to-br text-white shadow-sm ${CARD_ACCENTS[index % CARD_ACCENTS.length]}`}
              >
                <CityGlyph slug={city.slug} className="h-6 w-6" />
              </div>

              <h3 className="mb-2 text-xl font-bold text-gray-900 transition-colors group-hover:text-blue-600">
                {city.name}
              </h3>

              <p className="mb-4 flex-1 text-sm leading-relaxed text-gray-500">
                {city.areas}
              </p>

              <span className="mb-4 inline-block w-fit rounded-full bg-blue-50 px-3 py-1 text-xs font-semibold text-blue-700">
                {city.highlight}
              </span>

              <div className="flex items-center gap-1.5 text-sm font-bold text-gray-400 transition-all group-hover:gap-2.5 group-hover:text-blue-600">
                Explore {city.name}
                <ArrowRight className="h-4 w-4" aria-hidden="true" />
              </div>
            </Link>
          ))}
        </div>

        <p className="mt-10 text-center text-sm text-gray-500">
          {expansionText}
        </p>
      </div>
    </section>
  );
}

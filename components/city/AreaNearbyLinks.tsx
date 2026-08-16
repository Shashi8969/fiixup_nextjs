import Link from 'next/link';
import { MapPin, ArrowRight } from 'lucide-react';
import { Reveal } from '@/components/ui/Reveal';
import type { SmartAreaLink } from '@/lib/smart-internal-links';

export function AreaNearbyLinks({
  areaName,
  cityName,
  nearbyAreas,
}: {
  areaName: string;
  cityName: string;
  nearbyAreas: SmartAreaLink[];
}) {
  if (nearbyAreas.length === 0) return null;

  return (
    <section className="border-t border-gray-100 bg-white py-14">
      <div className="container mx-auto px-4">
        <div className="mb-8 text-center">
          <span className="mb-3 inline-block text-sm font-semibold uppercase tracking-widest text-blue-600">
            Nearby coverage
          </span>
          <h2 className="text-2xl font-extrabold text-gray-900 md:text-3xl">
            Doorstep mechanics near {areaName}, {cityName}
          </h2>
        </div>
        <div className="mx-auto flex max-w-4xl flex-wrap justify-center gap-3">
          {nearbyAreas.map((area, i) => (
            <Reveal key={area.slug} delay={Math.min(i, 6) * 0.05}>
              <Link
                href={area.href}
                className="group inline-flex items-center gap-2 rounded-full border border-gray-200 bg-gray-50 px-5 py-2.5 text-sm font-semibold text-gray-800 transition hover:border-blue-300 hover:bg-blue-50 hover:text-blue-700"
              >
                <MapPin className="h-3.5 w-3.5 text-blue-600" aria-hidden="true" />
                {area.name}
                <ArrowRight className="h-3.5 w-3.5 -translate-x-1 opacity-0 transition group-hover:translate-x-0 group-hover:opacity-100" aria-hidden="true" />
              </Link>
            </Reveal>
          ))}
        </div>
      </div>
    </section>
  );
}

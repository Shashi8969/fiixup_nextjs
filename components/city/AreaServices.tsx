import Link from "next/link";
import { ArrowRight, Bike, Car, CircleDot, LifeBuoy, Truck, Wrench } from "lucide-react";
import type { AreaServiceListItem } from "@/lib/locationServices";
import { Reveal } from "@/components/ui/Reveal";

type AreaServicesProps = {
  citySlug: string;
  areaSlug: string;
  areaName: string;
  services: AreaServiceListItem[];
  heading?: string | null;
};

// Card titles shown side-by-side in a grid read as keyword stuffing when every
// one of them repeats "Near Me" (Bike Garage Near Me, Bike Mechanic Near Me...).
// The individual service page itself keeps "Near Me" in its own H1/title, where
// it's a legitimate match for that page's actual target search — this only
// trims the directory-listing label shown here.
function directoryLabel(serviceName: string) {
  return serviceName.replace(/\s+near me$/i, "").trim();
}

function ServiceIcon({ slug }: { slug: string }) {
  const className = "h-6 w-6";
  if (slug.includes("towing")) return <Truck className={className} aria-hidden="true" />;
  if (slug.includes("puncture")) return <CircleDot className={className} aria-hidden="true" />;
  if (slug.includes("roadside") || slug.includes("breakdown")) return <LifeBuoy className={className} aria-hidden="true" />;
  if (slug.includes("bike")) return <Bike className={className} aria-hidden="true" />;
  if (slug.includes("car")) return <Car className={className} aria-hidden="true" />;
  return <Wrench className={className} aria-hidden="true" />;
}

// Cycled per card, not tied to service meaning — matches the site's blue/red/
// amber/green trust palette without hand-mapping a color to every category.
const ICON_TINTS = [
  "bg-blue-50 text-blue-600 group-hover:bg-blue-600",
  "bg-red-50 text-red-600 group-hover:bg-red-600",
  "bg-amber-50 text-amber-600 group-hover:bg-amber-600",
  "bg-green-50 text-green-600 group-hover:bg-green-600",
];

export function AreaServices({ citySlug, areaSlug, areaName, services, heading }: AreaServicesProps) {
  if (!services.length) return null;

  return (
    <section id="area-services" aria-labelledby="area-services-heading" className="bg-white py-14 md:py-16">
      <div className="container mx-auto px-4">
        <div className="mx-auto mb-10 max-w-2xl text-center">
          <span className="mb-3 inline-block text-sm font-semibold uppercase tracking-widest text-blue-600">
            Available here
          </span>
          <h2 id="area-services-heading" className="text-3xl font-black text-slate-950 md:text-4xl">
            {heading?.trim() || `Services available in ${areaName}`}
          </h2>
          <p className="mt-3 text-base leading-7 text-slate-600">
            Pulled live from the service catalog for this area — add a service anywhere in the admin and it appears here automatically.
          </p>
        </div>

        <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
          {services.map((service, i) => {
            const href = `/${citySlug}/${areaSlug}/${service.serviceSlug}`;
            const tint = ICON_TINTS[i % ICON_TINTS.length];
            return (
              <Reveal key={service.id} delay={Math.min(i, 6) * 0.06}>
                <Link
                  href={href}
                  className="group flex min-h-36 items-start gap-4 rounded-2xl border border-slate-200 bg-white p-5 shadow-sm transition duration-200 hover:-translate-y-1 hover:border-slate-300 hover:shadow-lg focus:outline-none focus-visible:ring-2 focus-visible:ring-blue-600 focus-visible:ring-offset-2"
                >
                  <span className={`inline-flex h-12 w-12 shrink-0 items-center justify-center rounded-xl transition-colors group-hover:text-white ${tint}`}>
                    <ServiceIcon slug={service.serviceSlug} />
                  </span>
                  <span className="min-w-0 flex-1">
                    <span className="block text-lg font-bold leading-6 text-slate-950">{directoryLabel(service.serviceName)}</span>
                    {service.heroSubheading ? (
                      <span className="mt-2 line-clamp-2 block text-sm leading-6 text-slate-600">{service.heroSubheading}</span>
                    ) : null}
                    <span className="mt-3 inline-flex items-center gap-1.5 text-xs font-bold text-green-600">
                      <span className="h-1.5 w-1.5 rounded-full bg-green-500" aria-hidden="true" />
                      Available now
                    </span>
                    <span className="mt-2 flex items-center gap-1 text-sm font-bold text-blue-600 opacity-0 transition-opacity group-hover:opacity-100">
                      View service <ArrowRight className="h-4 w-4 transition group-hover:translate-x-1" aria-hidden="true" />
                    </span>
                  </span>
                </Link>
              </Reveal>
            );
          })}
        </div>
      </div>
    </section>
  );
}

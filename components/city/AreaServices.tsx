import Link from "next/link";
import { ArrowRight, Bike, Car, CircleDot, LifeBuoy, Truck, Wrench } from "lucide-react";
import type { AreaServiceListItem } from "@/lib/locationServices";

type AreaServicesProps = {
  citySlug: string;
  areaSlug: string;
  areaName: string;
  services: AreaServiceListItem[];
};

function ServiceIcon({ slug }: { slug: string }) {
  const className = "h-6 w-6";
  if (slug.includes("towing")) return <Truck className={className} aria-hidden="true" />;
  if (slug.includes("puncture")) return <CircleDot className={className} aria-hidden="true" />;
  if (slug.includes("roadside") || slug.includes("breakdown")) return <LifeBuoy className={className} aria-hidden="true" />;
  if (slug.includes("bike")) return <Bike className={className} aria-hidden="true" />;
  if (slug.includes("car")) return <Car className={className} aria-hidden="true" />;
  return <Wrench className={className} aria-hidden="true" />;
}

export function AreaServices({ citySlug, areaSlug, areaName, services }: AreaServicesProps) {
  if (!services.length) return null;

  return (
    <section id="area-services" aria-labelledby="area-services-heading" className="bg-white py-12 md:py-16">
      <div className="container mx-auto px-4">
        <div className="mx-auto mb-8 max-w-2xl text-center">
          <h2 id="area-services-heading" className="text-3xl font-black text-slate-950 md:text-4xl">
            Services Available in {areaName}
          </h2>
          <p className="mt-3 text-base leading-7 text-slate-600">
            These service pages are matched to {areaName} from our live service database. Open a service to view local details, pricing information and booking options.
          </p>
        </div>

        <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
          {services.map((service) => {
            const href = `/${citySlug}/${areaSlug}/${service.serviceSlug}`;
            return (
              <Link
                key={service.id}
                href={href}
                className="group flex min-h-36 items-start gap-4 rounded-2xl border border-slate-200 bg-white p-5 shadow-sm transition hover:-translate-y-0.5 hover:border-orange-300 hover:shadow-lg focus:outline-none focus-visible:ring-2 focus-visible:ring-orange-600 focus-visible:ring-offset-2"
              >
                <span className="inline-flex h-12 w-12 shrink-0 items-center justify-center rounded-full bg-orange-50 text-orange-600 transition group-hover:bg-orange-600 group-hover:text-white">
                  <ServiceIcon slug={service.serviceSlug} />
                </span>
                <span className="min-w-0 flex-1">
                  <span className="block text-lg font-bold leading-6 text-slate-950">{service.serviceName}</span>
                  {service.heroSubheading ? (
                    <span className="mt-2 line-clamp-2 block text-sm leading-6 text-slate-600">{service.heroSubheading}</span>
                  ) : null}
                  <span className="mt-3 inline-flex items-center gap-1 text-sm font-bold text-orange-600">
                    View service <ArrowRight className="h-4 w-4 transition group-hover:translate-x-1" aria-hidden="true" />
                  </span>
                </span>
              </Link>
            );
          })}
        </div>
      </div>
    </section>
  );
}

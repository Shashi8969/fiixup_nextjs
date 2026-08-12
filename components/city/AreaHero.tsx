import { Clock3, IndianRupee, MapPin, MessageCircle, Phone, ShieldCheck, Wrench } from "lucide-react";
import type { CityData } from "@/lib/models/city.model";
import { AreaDispatchPanel } from "./AreaDispatchPanel";
import { computeRatingSummary } from "@/lib/areaPages";
import { Reveal } from "@/components/ui/Reveal";

type AreaHeroProps = {
  city: CityData;
  areaName: string;
  /** areas.hero_heading / hero_subheading — admin-editable, falls back to a generated line when empty */
  heroHeading?: string | null;
  heroSubheading?: string | null;
  testimonials?: { rating: number }[];
};

function digitsOnly(value?: string) {
  return (value ?? "").replace(/\D/g, "");
}

export function AreaHero({ city, areaName, heroHeading, heroSubheading, testimonials = [] }: AreaHeroProps) {
  const phone = city.phone ?? "+91 8197459732";
  const whatsapp = digitsOnly((city as any).whatsapp || phone);
  const rating = computeRatingSummary(testimonials);

  return (
    <section className="relative isolate overflow-hidden border-b border-gray-100 bg-gradient-to-br from-blue-50 via-white to-white">
      <div
        aria-hidden="true"
        className="pointer-events-none absolute inset-0 opacity-[0.035]"
        style={{ backgroundImage: "radial-gradient(circle, #2563eb 1px, transparent 1px)", backgroundSize: "32px 32px" }}
      />

      <div className="container relative mx-auto grid gap-10 px-4 py-10 md:py-16 lg:grid-cols-[1.08fr_0.92fr] lg:items-center lg:gap-14 lg:py-20">
        <div className="max-w-2xl">
          <div className="mb-4 inline-flex items-center gap-2 rounded-full bg-red-600 px-4 py-2 text-xs font-bold uppercase tracking-wide text-white shadow-sm shadow-red-200">
            <MapPin className="h-4 w-4" aria-hidden="true" />
            {areaName}, {city.name}
          </div>

          <h1 className="max-w-xl text-4xl font-black leading-[1.08] text-slate-950 sm:text-5xl lg:text-[3.25rem]">
            {heroHeading?.trim() || (
              <>
                Car &amp; bike repair, right at your door in <span className="text-blue-600">{areaName}</span>
              </>
            )}
          </h1>

          <p className="mt-5 max-w-xl text-base leading-7 text-slate-600 sm:text-lg">
            {heroSubheading?.trim() ||
              `Book in 30 seconds. A certified technician arrives at your home or office in ${areaName} — no towing, no workshop queue, upfront pricing before any work starts.`}
          </p>

          <div className="mt-6 flex flex-wrap items-center gap-3 rounded-2xl border border-blue-200 bg-blue-50/70 px-4 py-3.5">
            <ShieldCheck className="h-5 w-5 shrink-0 text-green-600" aria-hidden="true" />
            <p className="text-[15px] text-slate-800">
              <span className="font-extrabold text-blue-700">Mechanic at your door in ~20 minutes.</span>{" "}
              <span className="ml-1 inline-flex items-center rounded-full bg-amber-100 px-2.5 py-0.5 font-mono text-xs font-extrabold text-amber-800">
                From ₹450
              </span>{" "}
              <span className="ml-1 inline-flex items-center rounded-full bg-green-100 px-2.5 py-0.5 font-mono text-xs font-extrabold text-green-700">
                30-day warranty
              </span>
            </p>
          </div>

          <div className="mt-6 flex flex-wrap gap-3">
            <a
              href={`tel:${phone}`}
              className="inline-flex min-h-12 items-center justify-center gap-2 rounded-xl bg-red-600 px-6 py-3 font-bold text-white shadow-lg shadow-red-200 transition hover:bg-red-700 focus:outline-none focus-visible:ring-2 focus-visible:ring-red-600 focus-visible:ring-offset-2"
            >
              <Phone className="h-5 w-5" aria-hidden="true" />
              Call {phone}
            </a>
            <a
              href={`https://wa.me/${whatsapp}?text=${encodeURIComponent(`I need vehicle service in ${areaName}, ${city.name}.`)}`}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex min-h-12 items-center justify-center gap-2 rounded-xl border border-slate-300 bg-white px-6 py-3 font-bold text-slate-900 shadow-sm transition hover:border-green-500 hover:text-green-700 focus:outline-none focus-visible:ring-2 focus-visible:ring-green-600 focus-visible:ring-offset-2"
            >
              <MessageCircle className="h-5 w-5" aria-hidden="true" />
              WhatsApp Us
            </a>
          </div>

          <div className="mt-8 grid grid-cols-2 gap-x-4 gap-y-4 border-t border-gray-200 pt-6 sm:grid-cols-4">
            {[
              { icon: Clock3, title: "Fast response", text: "Area-based dispatch" },
              { icon: ShieldCheck, title: "30-day", text: "Repair warranty" },
              { icon: Wrench, title: "Skilled", text: "Technicians" },
              { icon: IndianRupee, title: "Upfront", text: "Pricing" },
            ].map(({ icon: Icon, title, text }) => (
              <div
                key={title}
                className="flex min-w-0 items-start gap-2 border-gray-200 sm:border-r sm:pr-3 sm:last:border-r-0"
              >
                <Icon className="mt-0.5 h-5 w-5 shrink-0 text-blue-600" aria-hidden="true" />
                <div>
                  <p className="text-sm font-bold text-slate-950">{title}</p>
                  <p className="text-xs leading-5 text-slate-500">{text}</p>
                </div>
              </div>
            ))}
          </div>
        </div>

        <Reveal>
          <AreaDispatchPanel areaName={areaName} rating={rating} />
        </Reveal>
      </div>
    </section>
  );
}

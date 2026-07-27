import Image from "next/image";
import { BadgeCheck, Clock3, IndianRupee, MapPin, MessageCircle, Phone, ShieldCheck, Wrench } from "lucide-react";
import type { CityData } from "@/lib/models/city.model";

type AreaHeroProps = {
  city: CityData;
  areaName: string;
};

function digitsOnly(value?: string) {
  return (value ?? "").replace(/\D/g, "");
}

export function AreaHero({ city, areaName }: AreaHeroProps) {
  const phone = city.phone ?? "+91 8197459732";
  const whatsapp = digitsOnly((city as any).whatsapp || phone);

  return (
    <section className="relative isolate overflow-hidden bg-[#fff8f4]">
      <Image
        src="/assets/Car_mechanic_700x1049.webp"
        alt={`Doorstep car and bike mechanic serving ${areaName}, ${city.name}`}
        fill
        priority
        sizes="100vw"
        className="object-cover object-[70%_center]"
      />
      <div className="absolute inset-0 bg-gradient-to-r from-white via-white/95 to-white/30 md:via-white/85" />

      <div className="container relative mx-auto px-4 py-10 md:py-16 lg:py-20">
        <div className="max-w-2xl">
          <div className="mb-4 inline-flex items-center gap-2 rounded-full bg-orange-600 px-4 py-2 text-xs font-bold uppercase tracking-wide text-white shadow-sm">
            <MapPin className="h-4 w-4" aria-hidden="true" />
            {areaName}, {city.name}
          </div>

          <h1 className="max-w-xl text-4xl font-black leading-[1.08] text-slate-950 sm:text-5xl lg:text-6xl">
            Car &amp; Bike Services at Your Doorstep in <span className="text-orange-600">{areaName}</span>
          </h1>

          <p className="mt-5 max-w-xl text-base leading-7 text-slate-700 sm:text-lg">
            Book doorstep vehicle repair, breakdown support, towing and puncture assistance in {areaName}. Choose a service below and connect directly with Fiixup.
          </p>
          <br />
{/* QUICK BOOKING HIGHLIGHT */}
<div className="relative overflow-hidden rounded-2xl border border-orange-300 bg-gradient-to-r from-orange-50 via-white to-amber-50 p-[1px] shadow-[0_10px_30px_rgba(249,115,22,0.16)]">
  <div className="relative rounded-[15px] bg-white/85 px-4 py-4 backdrop-blur-sm sm:px-5">
    {/* Decorative glow */}
    <div
      aria-hidden="true"
      className="absolute -right-8 -top-8 h-24 w-24 rounded-full bg-orange-200/40 blur-2xl"
    />

    <p className="relative text-center text-[15px] font-semibold leading-6 text-slate-800 sm:text-left sm:text-base">
      <span className="font-extrabold text-orange-600">
        Book in 30 seconds.
      </span>{" "}
      Mechanic at your doorstep in{" "}
      <span className="font-extrabold text-slate-950">
        20 minutes.
      </span>{" "}
      <span className="inline-flex items-center rounded-full border border-orange-200 bg-orange-100 px-2.5 py-0.5 font-extrabold text-orange-700">
        From ₹450
      </span>{" "}
      <span className="inline-flex items-center rounded-full border border-emerald-200 bg-emerald-50 px-2.5 py-0.5 font-bold text-emerald-700">
        30-day warranty
      </span>
    </p>
  </div>
</div>



          <div className="mt-5 grid gap-3 sm:grid-cols-2">
            <a
              href={`tel:${phone}`}
              className="inline-flex min-h-12 items-center justify-center gap-2 rounded-xl bg-orange-600 px-6 py-3 font-bold text-white shadow-lg transition hover:bg-orange-700 focus:outline-none focus-visible:ring-2 focus-visible:ring-orange-600 focus-visible:ring-offset-2"
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
             <div className="mt-7 grid grid-cols-2 gap-3 rounded-2xl border border-white/80 bg-white/90 p-4 shadow-xl backdrop-blur md:grid-cols-4">
            {[
              { icon: Clock3, title: "Fast response", text: "Area-based dispatch" },
              { icon: ShieldCheck, title: "30-Day", text: "Repair warranty" },
              { icon: Wrench, title: "Skilled", text: "Technicians" },
              { icon: IndianRupee, title: "Upfront", text: "Pricing" },
            ].map(({ icon: Icon, title, text }) => (
              <div key={title} className="flex min-w-0 items-start gap-2 border-slate-200 md:border-r md:last:border-r-0">
                <Icon className="mt-0.5 h-5 w-5 shrink-0 text-orange-600" aria-hidden="true" />
                <div>
                  <p className="text-sm font-bold text-slate-950">{title}</p>
                  <p className="text-xs leading-5 text-slate-600">{text}</p>
                </div>
              </div>
            ))}
          </div>
       
        </div>
      </div>
    </section>
  );
}

import { Clock, Award, Shield, CheckCircle } from "lucide-react";
import { TRUST_BADGES } from "@/lib/constants";

const iconItems = [
  { icon: Clock,       label: "20-Min Quick Arrival", sub: "After booking confirmation*" },
  { icon: Award,       label: "Flexible Service",     sub: "Doorstep, roadside or partner garage" },
  { icon: Shield,      label: "30-Day Warranty",      sub: "On eligible repairs" },
  { icon: CheckCircle, label: "Clear Pricing",         sub: "Starting price; extra work approved first" },
];

interface TrustStripProps {
  /** "icons" shows icon + label + sub-label. "text" shows the text badge list. */
  variant?: "icons" | "text";
}

export function TrustStrip({ variant = "icons" }: TrustStripProps) {
  if (variant === "text") {
    return (
      <section className="bg-white border-b border-gray-100 py-5">
        <div className="container mx-auto px-4">
          <div className="flex flex-wrap justify-center gap-8">
            {TRUST_BADGES.map((item) => (
              <span key={item} className="text-sm font-semibold text-gray-700">
                {item}
              </span>
            ))}
          </div>
          <p className="mt-3 text-center text-[11px] leading-4 text-gray-400">
            *Eligible doorstep/roadside bookings. Exceptional traffic, weather, distance, access, or technician availability can affect arrival.
          </p>
        </div>
      </section>
    );
  }

  return (
    <section className="bg-white border-b border-gray-100 py-4">
      <div className="container mx-auto px-4">
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4 text-center">
          {iconItems.map(({ icon: Icon, label, sub }) => (
            <div key={label} className="flex flex-col items-center gap-1">
              <Icon className="w-6 h-6 text-green-700 mb-1" />
              <p className="font-bold text-gray-900 text-sm">{label}</p>
              <p className="text-xs text-gray-600">{sub}</p>
            </div>
          ))}
        </div>
        <p className="mt-3 text-center text-[11px] leading-4 text-gray-400">
          *Eligible doorstep/roadside bookings. Exceptional traffic, weather, distance, access, or technician availability can affect arrival.
        </p>
      </div>
    </section>
  );
}

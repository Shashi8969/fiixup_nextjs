import { Clock, Award, Shield, CheckCircle, Truck, MapPin } from "lucide-react";
import {
  ARRIVAL_PROMISE_NOTE_SHORT,
  TOWING_ARRIVAL_PROMISE_NOTE_SHORT,
  TOWING_TRUST_BADGES,
  TRUST_BADGES,
} from "@/lib/constants";

const iconItems = [
  { icon: Clock,       label: "20-Min Quick Arrival*", sub: "Target arrival after mechanic dispatch" },
  { icon: Award,       label: "Flexible Service",     sub: "Doorstep, roadside or partner garage" },
  { icon: Shield,      label: "30-Day Warranty",      sub: "On eligible repairs" },
  { icon: CheckCircle, label: "Clear Pricing",         sub: "Starting price; extra work approved first" },
];

const towingIconItems = [
  { icon: Clock,       label: "20-Min Quick Arrival*", sub: "Target after recovery-vehicle dispatch" },
  { icon: Truck,       label: "Suitable Recovery",     sub: "Method matched to vehicle and access" },
  { icon: MapPin,      label: "Destination Choice",    sub: "Garage, dealership, home, or another location" },
  { icon: CheckCircle, label: "Price Confirmed",       sub: "Towing charge confirmed before dispatch" },
];

interface TrustStripProps {
  /** "icons" shows icon + label + sub-label. "text" shows the text badge list. */
  variant?: "icons" | "text";
  context?: "service" | "towing";
}

export function TrustStrip({ variant = "icons", context = "service" }: TrustStripProps) {
  const isTowing = context === "towing";
  const badges = isTowing ? TOWING_TRUST_BADGES : TRUST_BADGES;
  const items = isTowing ? towingIconItems : iconItems;
  const arrivalNote = isTowing ? TOWING_ARRIVAL_PROMISE_NOTE_SHORT : ARRIVAL_PROMISE_NOTE_SHORT;

  if (variant === "text") {
    return (
      <section className="bg-white border-b border-gray-100 py-5">
        <div className="container mx-auto px-4">
          <div className="flex flex-wrap justify-center gap-8">
            {badges.map((item) => (
              <span key={item} className="text-sm font-semibold text-gray-700">
                {item}
              </span>
            ))}
          </div>
          <p className="mt-3 text-center text-[11px] leading-4 text-gray-400">
            {arrivalNote}
          </p>
        </div>
      </section>
    );
  }

  return (
    <section className="bg-white border-b border-gray-100 py-4">
      <div className="container mx-auto px-4">
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4 text-center">
          {items.map(({ icon: Icon, label, sub }) => (
            <div key={label} className="flex flex-col items-center gap-1">
              <Icon className="w-6 h-6 text-green-700 mb-1" />
              <p className="font-bold text-gray-900 text-sm">{label}</p>
              <p className="text-xs text-gray-600">{sub}</p>
            </div>
          ))}
        </div>
        <p className="mt-3 text-center text-[11px] leading-4 text-gray-400">
          {arrivalNote}
        </p>
      </div>
    </section>
  );
}

import { Clock, Award, Shield, CheckCircle } from "lucide-react";
import { TRUST_BADGES } from "@/lib/constants";

const iconItems = [
  { icon: Clock,        label: "24/7 Service",        sub: "Emergency & regular"   },
  { icon: Award,        label: "Certified Techs",      sub: "Trained professionals" },
  { icon: Shield,       label: "30-Day Warranty",      sub: "On all repairs"        },
  { icon: CheckCircle,  label: "Transparent Pricing",  sub: "No hidden charges"     },
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
      </div>
    </section>
  );
}

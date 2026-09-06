import { CheckCircle2, ShieldCheck, Star, Users, Wrench } from "lucide-react";
import { Marquee } from "@/components/ui/Marquee";
import { computeRatingSummary } from "@/lib/areaPages";

type AreaTrustMarqueeProps = {
  areaName: string;
  statsCustomers?: string | null;
  testimonials?: { rating: number }[];
  servicesCount: number;
};

/**
 * Trust band between Hero and Services.
 * Only show claims backed by an explicit area field, verified testimonial rollup,
 * a real service count, or the site's centrally scoped service terms.
 */
export function AreaTrustMarquee({ areaName, statsCustomers, testimonials = [], servicesCount }: AreaTrustMarqueeProps) {
  const rating = computeRatingSummary(testimonials);

  const items: { icon: React.ElementType; label: React.ReactNode }[] = [];

  if (statsCustomers?.trim()) {
    items.push({ icon: Users, label: <><b className="text-white">{statsCustomers}</b>&nbsp;{areaName} customers served</> });
  }
  if (rating) {
    items.push({ icon: Star, label: <><b className="text-white">{rating.average}★</b>&nbsp;average from verified area reviews</> });
  }

  items.push({ icon: ShieldCheck, label: <><b className="text-white">30-day</b>&nbsp;warranty on eligible repairs</> });
  items.push({ icon: CheckCircle2, label: "Starting price shown — extra work approved first" });

  if (servicesCount > 0) {
    items.push({ icon: Wrench, label: <><b className="text-white">{servicesCount}</b>&nbsp;services currently listed in this area</> });
  } else {
    items.push({ icon: Wrench, label: "Doorstep, roadside or partner-garage support where available" });
  }

  return (
    <div className="overflow-hidden bg-slate-950 py-3">
      <Marquee durationSeconds={30}>
        {items.map((item, i) => (
          <span key={i} className="flex shrink-0 items-center gap-2 whitespace-nowrap text-sm font-semibold text-blue-100">
            <item.icon className="h-4 w-4 shrink-0 text-blue-400" aria-hidden="true" />
            {item.label}
          </span>
        ))}
      </Marquee>
    </div>
  );
}

import {
  Car, Bike, CircleDot, LifeBuoy, Wrench, type LucideIcon,
} from "lucide-react";

// Posts without a featured image (currently ~half the live posts) fall back
// to this instead of every card silently reusing the same stock photo.
function iconForCategory(category: string): LucideIcon {
  const c = category.toLowerCase();
  if (c.includes("bike") || c.includes("motorcycle")) return Bike;
  if (c.includes("car")) return Car;
  if (c.includes("tyre") || c.includes("tire")) return CircleDot;
  if (c.includes("roadside") || c.includes("emergency")) return LifeBuoy;
  return Wrench;
}

export function CategoryPlaceholder({
  category, className = "",
}: {
  readonly category: string;
  readonly className?: string;
}) {
  const Icon = iconForCategory(category);
  return (
    <div
      className={`relative aspect-[4/3] w-full overflow-hidden rounded-2xl bg-gradient-to-br from-brand-ink to-[#0f2a63] ${className}`}
      aria-hidden="true"
    >
      <Icon className="absolute -bottom-5 -right-5 h-28 w-28 text-white/10" strokeWidth={1.25} />
      <Icon className="absolute left-5 top-5 h-7 w-7 text-white/70" strokeWidth={1.5} />
    </div>
  );
}

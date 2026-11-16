import { Car, Bike, CircleDot, LifeBuoy, Wrench } from "lucide-react";

// Posts without a featured image (currently ~half the live posts) fall back
// to this instead of every card silently reusing the same stock photo.
function CategoryIcon({
  category,
  className,
  strokeWidth,
}: {
  category: string;
  className: string;
  strokeWidth: number;
}) {
  const c = category.toLowerCase();
  if (c.includes("bike") || c.includes("motorcycle")) return <Bike className={className} strokeWidth={strokeWidth} />;
  if (c.includes("car")) return <Car className={className} strokeWidth={strokeWidth} />;
  if (c.includes("tyre") || c.includes("tire")) return <CircleDot className={className} strokeWidth={strokeWidth} />;
  if (c.includes("roadside") || c.includes("emergency")) return <LifeBuoy className={className} strokeWidth={strokeWidth} />;
  return <Wrench className={className} strokeWidth={strokeWidth} />;
}

export function CategoryPlaceholder({
  category, className = "",
}: {
  readonly category: string;
  readonly className?: string;
}) {
  return (
    <div
      className={`relative aspect-[4/3] w-full overflow-hidden rounded-2xl bg-gradient-to-br from-brand-ink to-[#0f2a63] ${className}`}
      aria-hidden="true"
    >
      <CategoryIcon category={category} className="absolute -bottom-5 -right-5 h-28 w-28 text-white/10" strokeWidth={1.25} />
      <CategoryIcon category={category} className="absolute left-5 top-5 h-7 w-7 text-white/70" strokeWidth={1.5} />
    </div>
  );
}

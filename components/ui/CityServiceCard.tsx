import Link from "next/link";
import { ArrowRight, Clock, Star, Wrench } from "lucide-react";
import type { LucideIcon } from "lucide-react";
import { iconMap } from "@/lib/icons";
import { getCityServiceHref } from "@/lib/routes";

type PricingRow = {
  priceFrom?: number | string | null;
};

type CityServiceCardProps = {
  citySlug: string;
  cityName: string;
  serviceSlug: string;
  serviceName: string;
  serviceCategory?: string | null;
  tagline?: string | null;
  pricingRows?: PricingRow[] | null;
  priceLabel?: string | null;
  duration?: string | null;
  rating?: number | null;
  reviewCount?: number | null;
  icon?: string | LucideIcon | null;
  categoryIcon?: LucideIcon | null;
  theme?: {
    iconBg?: string;
    iconText?: string;
    border?: string;
    linkText?: string;
  };
  variant?: "detailed" | "compact" | "index";
};

function formatPrice(pricingRows?: PricingRow[] | null, fallback?: string | null) {
  if (fallback) return fallback;

  const first = pricingRows?.[0]?.priceFrom;
  if (typeof first === "number" && Number.isFinite(first)) {
    return `₹${first.toLocaleString("en-IN")}`;
  }

  if (typeof first === "string" && first.trim()) {
    return first.includes("₹") ? first : `₹${first}`;
  }

  return "Call for quote";
}

function resolveIcon(
  icon?: string | LucideIcon | null,
  serviceCategory?: string | null,
  categoryIcon?: LucideIcon | null
): LucideIcon {
  if (typeof icon === "string") return iconMap[icon] ?? iconMap[serviceCategory ?? ""] ?? categoryIcon ?? Wrench;
  if (icon) return icon;
  return iconMap[serviceCategory ?? ""] ?? categoryIcon ?? Wrench;
}

export function CityServiceCard({
  citySlug,
  cityName,
  serviceSlug,
  serviceName,
  serviceCategory,
  tagline,
  pricingRows,
  priceLabel,
  duration,
  rating = 4.9,
  reviewCount = 150,
  icon,
  categoryIcon,
  theme,
  variant = "detailed",
}: CityServiceCardProps) {
  const Icon = resolveIcon(icon, serviceCategory, categoryIcon);
  const href = getCityServiceHref(citySlug, serviceSlug);
  const iconBg = theme?.iconBg ?? "bg-blue-50";
  const iconText = theme?.iconText ?? "text-blue-600";
  const border = theme?.border ?? "hover:border-blue-200";
  const linkText = theme?.linkText ?? "text-blue-600";
  const displayPrice = formatPrice(pricingRows, priceLabel);
  const displayDuration = duration || "30–60 min";
  const displayRating = typeof rating === "number" && Number.isFinite(rating) ? rating : 4.9;
  const displayReviews = typeof reviewCount === "number" && Number.isFinite(reviewCount) ? reviewCount : 150;

  if (variant === "index") {
    return (
      <Link
        href={href}
        className={`group bg-white border border-gray-100 ${border} rounded-xl p-5 flex flex-col transition-all hover:shadow-lg hover:-translate-y-0.5`}
      >
        <div className={`mb-3 p-2 rounded-lg ${iconBg} w-fit group-hover:scale-105 transition-transform`}>
          <Icon className={`w-5 h-5 ${iconText}`} aria-hidden="true" />
        </div>

        <h3 className="font-bold text-gray-900 text-sm leading-snug mb-2 group-hover:text-blue-700 transition-colors">
          {serviceName}
        </h3>

        <p className="text-gray-500 text-xs leading-relaxed flex-1 mb-4 line-clamp-2">
          {tagline}
        </p>

        <div className="pt-3 border-t border-gray-100 space-y-2">
          <div className="flex items-center gap-1">
            <div className="flex">
              {[1, 2, 3, 4, 5].map((s) => (
                <Star
                  key={s}
                  className={`w-3 h-3 ${
                    s <= Math.round(displayRating)
                      ? "fill-yellow-400 text-yellow-400"
                      : "fill-gray-200 text-gray-200"
                  }`}
                  aria-hidden="true"
                />
              ))}
            </div>
            <span className="text-xs text-gray-400">
              {displayRating.toFixed(1)} ({displayReviews}+)
            </span>
          </div>

          <div className="flex items-center justify-between">
            {displayPrice !== "Call for quote" ? (
              <div>
                <p className="text-[10px] text-gray-400 font-semibold uppercase tracking-wider leading-none mb-0.5">
                  Starting from
                </p>
                <p className={`text-sm font-extrabold ${iconText}`}>{displayPrice}</p>
              </div>
            ) : (
              <p className={`text-xs font-semibold ${linkText}`}>Get quote</p>
            )}
            <span
              className={`text-xs font-bold ${linkText} flex items-center gap-0.5 opacity-0 group-hover:opacity-100 transition-opacity`}
            >
              Book
              <ArrowRight className="w-3 h-3" aria-hidden="true" />
            </span>
          </div>
        </div>
      </Link>
    );
  }

  if (variant === "compact") {
    return (
      <Link
        href={href}
        className="group bg-white border border-gray-200 hover:border-blue-300 rounded-2xl p-6 hover:shadow-xl transition-all hover:-translate-y-1"
      >
        <div className="flex items-start gap-4">
          <div className="bg-blue-50 group-hover:bg-blue-100 rounded-xl p-3 flex-shrink-0 transition-colors">
            <Icon className="w-7 h-7 text-blue-600" aria-hidden="true" />
          </div>
          <div className="min-w-0">
            <h3 className="font-bold text-gray-900 mb-1 group-hover:text-blue-700 transition-colors">
              {serviceName} in {cityName}
            </h3>
            <p className="text-sm text-gray-500 mb-3 line-clamp-2">{tagline}</p>
            <div className="flex items-center justify-between">
              <span className="text-blue-600 font-bold text-sm">From {displayPrice}</span>
              {displayDuration && (
                <span className="text-xs text-gray-400 bg-gray-100 px-2 py-0.5 rounded-full">{displayDuration}</span>
              )}
            </div>
          </div>
        </div>
      </Link>
    );
  }

  return (
    <Link
      href={href}
      className="group relative bg-white border border-gray-100 hover:border-blue-200 rounded-2xl p-6 flex flex-col transition-all hover:shadow-xl hover:-translate-y-1"
    >
      <div className="flex items-start gap-4 mb-4">
        <div className={`flex-shrink-0 p-2.5 rounded-xl ${iconBg} group-hover:scale-110 transition-transform`}>
          <Icon className={`w-5 h-5 ${iconText}`} aria-hidden="true" />
        </div>
        <h3 className="font-bold text-gray-900 text-sm leading-snug group-hover:text-blue-700 transition-colors">
          {serviceName}
        </h3>
      </div>

      <p className="text-gray-500 text-sm leading-relaxed flex-1 mb-5 line-clamp-2">
        {tagline}
      </p>

      <div className="flex items-center gap-1.5 mb-4">
        <div className="flex">
          {[1, 2, 3, 4, 5].map((s) => (
            <Star
              key={s}
              className={`w-3 h-3 ${
                s <= Math.round(displayRating)
                  ? "fill-yellow-400 text-yellow-400"
                  : "fill-gray-200 text-gray-200"
              }`}
              aria-hidden="true"
            />
          ))}
        </div>
        <span className="text-xs text-gray-400">
          {displayRating.toFixed(1)} ({displayReviews}+ reviews)
        </span>
      </div>

      <div className="pt-4 border-t border-gray-100 flex items-center justify-between">
        <div>
          <p className="text-[10px] uppercase tracking-widest text-gray-400 font-bold leading-none mb-0.5">
            Starting from
          </p>
          <p className={`text-base font-extrabold ${iconText}`}>{displayPrice}</p>
        </div>
        <div className="flex items-center gap-1.5 text-gray-400 text-xs font-medium">
          <Clock className="w-3.5 h-3.5" aria-hidden="true" />
          {displayDuration}
        </div>
      </div>

      <div
        aria-hidden="true"
        className={`absolute bottom-4 right-5 flex items-center gap-1 text-xs font-bold opacity-0 translate-x-2 group-hover:opacity-100 group-hover:translate-x-0 transition-all duration-200 ${iconText}`}
      >
        Book Now <ArrowRight className="w-3.5 h-3.5" />
      </div>
    </Link>
  );
}

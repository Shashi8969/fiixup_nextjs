import { Star, Quote } from "lucide-react";
import type { TestimonialCardProps } from "@/lib/models/testimonial.model";

function initials(name: string) {
  return name
    .trim()
    .split(/\s+/)
    .slice(0, 2)
    .map((word) => word[0]?.toUpperCase() ?? "")
    .join("") || "F";
}

export function TestimonialCard({ name, rating, text, date, vehicle, area, sourceLabel }: Readonly<TestimonialCardProps>) {
  return (
    <div className="relative flex h-full w-full flex-col rounded-2xl border border-gray-100 bg-white p-6 shadow-[0_2px_10px_rgba(15,23,42,0.05)] transition-all duration-300 hover:-translate-y-1 hover:border-blue-100 hover:shadow-[0_18px_44px_rgba(15,23,42,0.10)]">
      <Quote className="absolute top-5 right-5 h-10 w-10 text-blue-50" aria-hidden="true" fill="currentColor" />
      <div className="mb-4 flex gap-0.5">
        {Array.from({ length: rating }, (_, i) => (
          <Star key={i} className="h-4 w-4 fill-yellow-400 text-yellow-400" />
        ))}
      </div>
      {/* line-clamp keeps card heights even in a horizontal row and stops a
          400-character review from dwarfing its neighbours — full text
          stays in the DOM (not display:none), so nothing is lost for SEO
          or for anyone who wants to read the whole thing. */}
      <p className="mb-6 flex-1 text-[15px] leading-relaxed text-gray-700 line-clamp-6">&ldquo;{text}&rdquo;</p>
      <div className="flex items-center gap-3 border-t border-gray-100 pt-4">
        <div className="flex h-10 w-10 flex-shrink-0 items-center justify-center rounded-full bg-gradient-to-br from-blue-600 to-blue-400 text-sm font-bold text-white">
          {initials(name)}
        </div>
        <div className="min-w-0 flex-1">
          <p className="truncate font-semibold text-gray-900">{name}</p>
          <p className="truncate text-xs text-gray-500">
            {[area, vehicle, date].filter(Boolean).join(" · ")}
          </p>
        </div>
        {sourceLabel && (
          <span className="flex-shrink-0 whitespace-nowrap rounded-full bg-green-50 px-2 py-1 text-[10px] font-semibold text-green-700">
            ✓ {sourceLabel.replace(/^Verified /, "")}
          </span>
        )}
      </div>
    </div>
  );
}

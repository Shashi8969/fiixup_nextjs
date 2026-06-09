import { Star } from "lucide-react";
import type { TestimonialCardProps } from "@/lib/models/testimonial.model";

export function TestimonialCard({ name, rating, text, date, vehicle, area, sourceLabel }: Readonly<TestimonialCardProps>) {
  return (
    <div className="bg-white rounded-xl p-6 shadow-sm border border-gray-100 flex flex-col">
      <div className="flex gap-0.5 mb-3">
        {Array.from({ length: rating }, (_, i) => (
          <Star key={i} className="w-4 h-4 fill-yellow-400 text-yellow-400" />
        ))}
      </div>
      <p className="text-gray-700 text-sm leading-relaxed flex-1 mb-4">&ldquo;{text}&rdquo;</p>
      <div>
        <p className="font-semibold text-gray-900">{name}</p>
        {area && <p className="text-xs text-gray-500">{area}</p>}
        <p className="text-xs text-gray-600 mt-1">{vehicle} · {date}</p>
        {sourceLabel && (
          <p className="text-[11px] text-green-700 font-semibold mt-2">
            {sourceLabel}
          </p>
        )}
      </div>
    </div>
  );
}

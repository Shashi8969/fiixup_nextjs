import Link from "next/link";
import { serviceThemes, type ThemeColor } from "@/lib/theme";

interface ServiceCardProps {
  cat: any; // This is the category object from your array
  displayLocation?: string; // Optional: for city/area pages
}

export function ServiceCard({ cat, displayLocation }: ServiceCardProps) {  // Keep your exact theme logic
  const theme = serviceThemes[cat.color as ThemeColor] || serviceThemes.blue;
  const title = displayLocation ? `${cat.title} in ${displayLocation}` : cat.title;

  return (
    <Link 
      href={cat.link}
      className={`group relative p-8 rounded-2xl bg-white border border-gray-100 transition-all duration-300 flex flex-col hover:shadow-2xl hover:-translate-y-1 ${theme.hoverBorder}`}
    >
      <div className={`mb-6 inline-flex w-fit p-4 rounded-xl border border-gray-50 bg-gray-50/50 group-hover:bg-white transition-all duration-300 ${theme.hoverIconBg}`}>
        <cat.icon className={`w-10 h-10 ${theme.iconText}`} />
      </div>
      
      <h3 className="text-xl font-bold text-gray-900 mb-2">{title}</h3>
      <p className="text-gray-600 text-sm leading-relaxed mb-6 flex-1">
        {displayLocation 
          ? cat.description.replace("at your doorstep", `at your doorstep in ${displayLocation}`)
          : cat.description}
      </p>

      <span aria-hidden="true" className={`mt-4 text-sm font-semibold flex items-center gap-1 opacity-0 group-hover:opacity-100 transition-opacity ${theme.linkText}`}>
        Explore {cat.title} →
      </span>
    </Link>
  );
}
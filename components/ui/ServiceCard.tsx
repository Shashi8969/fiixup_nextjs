import Link from "next/link";
import { serviceThemes, type ThemeColor } from "@/lib/theme";
import { asAbsolutePath, getGlobalServiceHref } from "@/lib/routes";

interface ServiceCardProps {
  cat: any; // This is the category object from your array
  displayLocation?: string; // Optional: for city/area pages
}

export function ServiceCard({ cat, displayLocation }: ServiceCardProps) {  // Keep your exact theme logic
  const theme = serviceThemes[cat.color as ThemeColor] || serviceThemes.blue;
  const title = displayLocation ? `${cat.title} in ${displayLocation}` : cat.title;

  const targetHref = cat.link ? asAbsolutePath(cat.link) : getGlobalServiceHref(cat.slug || "");

  return (
    <Link
      href={targetHref}
      className={`group relative flex flex-col rounded-xl border border-gray-100 bg-white p-4 transition-all duration-300 hover:-translate-y-1 hover:shadow-2xl sm:rounded-2xl sm:p-8 ${theme.hoverBorder}`}
    >
      <div className={`mb-3 inline-flex w-fit rounded-lg border border-gray-50 bg-gray-50/50 p-2.5 transition-all duration-300 group-hover:bg-white sm:mb-6 sm:rounded-xl sm:p-4 ${theme.hoverIconBg}`}>
        <cat.icon className={`h-6 w-6 sm:h-10 sm:w-10 ${theme.iconText}`} />
      </div>

      <h3 className="mb-1.5 text-sm font-bold text-gray-900 sm:mb-2 sm:text-xl">{title}</h3>
      <p className="mb-3 line-clamp-3 flex-1 text-xs leading-relaxed text-gray-600 sm:mb-6 sm:line-clamp-none sm:text-sm">
        {displayLocation
          ? cat.description.replace("at your doorstep", `at your doorstep in ${displayLocation}`)
          : cat.description}
      </p>

      <span aria-hidden="true" className={`mt-2 flex items-center gap-1 text-xs font-semibold sm:mt-4 sm:text-sm sm:opacity-0 sm:group-hover:opacity-100 sm:transition-opacity ${theme.linkText}`}>
        Explore {cat.title} →
      </span>
    </Link>
  );
}
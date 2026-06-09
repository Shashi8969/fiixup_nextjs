import Link from "next/link";
import { serviceThemes, type ThemeColor } from "@/lib/theme";
import { Clock, ChevronRight, Wrench } from "lucide-react";

interface ServiceCardPriceProps {
  slug: string;
  href?: string;
  title: string;
  tagline: string;
  price: string;
  duration: string;
  accentColor: string;
  icon: any; 
}

export function ServiceCardPrice({
  slug, href, title, tagline, price, duration, accentColor, icon: Icon
}: ServiceCardPriceProps) {
  const theme = serviceThemes[accentColor as ThemeColor] || serviceThemes.blue;

  return (
    <Link 
      href={href ?? `/services/${slug}`}
      className="group relative p-8 rounded-3xl bg-white transition-all duration-500 flex flex-col border border-gray-100 shadow-sm hover:shadow-xl hover:border-transparent hover:-translate-y-1.5"
    >
      {/* 1. Subtle Icon - No heavy boxes, just clean glyphs */}
      <div className={`mb-6 transition-transform duration-500 group-hover:scale-110 ${theme.iconText}`}>
        {Icon ? <Icon className="w-12 h-12" /> : <Wrench className="w-12 h-12" />}
      </div>
      
      {/* 2. Typography - High contrast for readability */}
      <div className="flex-1">
        <h3 className="text-2xl font-bold text-gray-900 mb-2 tracking-tight">
          {title}
        </h3>
        <p className="text-gray-600 text-sm leading-relaxed mb-8">
          {tagline}
        </p>
      </div>

      {/* 3. The Info Row - Clean and Horizontal */}
      <div className="pt-6 border-t border-gray-50 flex items-center justify-between">
        <div className="flex flex-col">
          <span className="text-[10px] uppercase tracking-widest text-gray-500 font-bold">Starting from</span>
          <span className={`text-lg font-extrabold ${theme.iconText}`}>
            {price.includes('₹') ? price : `₹${price}`}
          </span>
        </div>
        
        <div className="flex items-center gap-1.5 text-gray-600 font-medium text-sm">
          <Clock className="w-4 h-4" />
          <span>{duration}</span>
        </div>
      </div>

      {/* 4. Hover Reveal - Only shows when user is interested */}
      <div aria-hidden="true" className={`absolute bottom-4 right-8 flex items-center gap-1 text-sm font-bold opacity-0 translate-x-4 group-hover:opacity-100 group-hover:translate-x-0 transition-all duration-300 ${theme.linkText}`}>
        Book Now <ChevronRight className="w-4 h-4" />
      </div>
    </Link>
  );
}
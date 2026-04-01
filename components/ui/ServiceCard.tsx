// components/ui/ServiceCard.tsx
import Link from "next/link";
// components/ui/ServiceCard.tsx
import { iconMap } from "@/lib/services";
import { LucideIcon } from "lucide-react";

interface ServiceCardProps {
  slug: string;
  iconName: string;
  title: string;
  tagline: string;
  price: string;      // Added to match your map
  duration: string;   // Added to match your map
  accentColor: string; // Changed from 'category' to match your prop name
}

export function ServiceCard({ 
  slug, 
  iconName, 
  title, 
  tagline, 
  price, 
  duration, 
  accentColor 
}: ServiceCardProps) {
  // Resolve icon from the central map
  const Icon = iconMap[iconName] || iconMap["Wrench"];
  
  // Dynamic tailwind classes based on the color string passed from the category
  const themeText = `text-${accentColor}-600`;
  const themeBorder = `hover:border-${accentColor}-300`;

  return (
    <Link href={`/services/${slug}`} className={`group p-6 border rounded-xl ${themeBorder} transition-all`}>
      <Icon className={`w-12 h-12 ${themeText} mb-4`} />
      <h3 className="text-xl font-bold">{title}</h3>
      <p className="text-gray-600 mb-4">{tagline}</p>
      <div className="flex justify-between items-center border-t pt-4">
        <span className={`font-bold ${themeText}`}>From {price}</span>
        <span className="text-sm text-gray-400">{duration}</span>
      </div>
    </Link>
  );
}
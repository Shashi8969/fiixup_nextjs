// components/service/CityCoverage.tsx

import Link from "next/link";
import { MapPin } from "lucide-react";
import { CITIES_LIST } from "@/lib/constants";

export default function CityCoverage({ service, borderAccent, accentBlue }: any) {
  return (
    <section className="py-14 bg-white">
      <div className="container mx-auto px-4">
        <div className="flex flex-wrap gap-4 justify-center">
          {CITIES_LIST.map((city) => (
            <Link
              key={city}
              href={`/${city.toLowerCase()}`}
              className={`flex items-center gap-2 border-2 ${borderAccent} ${accentBlue} px-6 py-3 rounded-full`}
            >
              <MapPin className="w-4 h-4" />
              {service.shortTitle} in {city}
            </Link>
          ))}
        </div>
      </div>
    </section>
  );
}
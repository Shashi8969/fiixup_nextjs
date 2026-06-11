"use client";

import { useMemo } from "react";
import { usePathname } from "next/navigation";
import { Car, Bike, MapPin } from "lucide-react";
import { DynamicInternalLink } from "@/components/DynamicInternalLink";
import type { FooterNavigationGroups, NavigationLink } from "@/lib/navigation-types";
import { selectScopedNavigationLinks } from "@/lib/navigation-scopes";

function pickLinks(links: NavigationLink[], pathname: string, area: NavigationLink["nav_area"]) {
  const scoped = selectScopedNavigationLinks(links, pathname, area);
  return scoped.length ? scoped : links.filter((link) => (link.scope_type ?? "global") === "global");
}

type Props = {
  footerLinks: FooterNavigationGroups;
  validPaths?: string[];
};

export function FooterNavigationColumns({ footerLinks, validPaths }: Props) {
  const pathname = usePathname();

  const groups = useMemo(() => ({
    carServices: pickLinks(footerLinks.carServices, pathname, "footer_car_services"),
    bikeServices: pickLinks(footerLinks.bikeServices, pathname, "footer_bike_services"),
    cities: pickLinks(footerLinks.cities, pathname, "footer_cities"),
    quickLinks: pickLinks(footerLinks.quickLinks, pathname, "footer_quick_links"),
  }), [footerLinks, pathname]);

  return (
    <div className="grid grid-cols-2 md:grid-cols-4 gap-8">
      <div>
        <div className="flex items-center gap-2 mb-5">
          <Car className="w-4 h-4 text-blue-400 flex-shrink-0" />
          <h3 className="text-white font-bold text-sm uppercase tracking-widest">Car Services</h3>
        </div>
        <ul className="space-y-3">
          {groups.carServices.map((s) => (
            <li key={`${s.href}-${s.label}`}>
              <DynamicInternalLink href={s.href} validPaths={validPaths} className="text-sm text-gray-400 hover:text-white transition-colors">
                {s.label}
              </DynamicInternalLink>
            </li>
          ))}
        </ul>
      </div>

      <div>
        <div className="flex items-center gap-2 mb-5">
          <Bike className="w-4 h-4 text-red-400 flex-shrink-0" />
          <h3 className="text-white font-bold text-sm uppercase tracking-widest">Bike Services</h3>
        </div>
        <ul className="space-y-3">
          {groups.bikeServices.map((s) => (
            <li key={`${s.href}-${s.label}`}>
              <DynamicInternalLink href={s.href} validPaths={validPaths} className="text-sm text-gray-400 hover:text-white transition-colors">
                {s.label}
              </DynamicInternalLink>
            </li>
          ))}
        </ul>
      </div>

      <div>
        <div className="flex items-center gap-2 mb-5">
          <MapPin className="w-4 h-4 text-green-400 flex-shrink-0" />
          <h3 className="text-white font-bold text-sm uppercase tracking-widest">Cities</h3>
        </div>
        <ul className="space-y-3">
          {groups.cities.map((c) => (
            <li key={`${c.href}-${c.label}`}>
              <DynamicInternalLink href={c.href} validPaths={validPaths} className="text-sm text-gray-400 hover:text-white transition-colors">
                {c.label}
              </DynamicInternalLink>
            </li>
          ))}
        </ul>
      </div>

      <div>
        <h3 className="text-white font-bold text-sm uppercase tracking-widest mb-5">Quick Links</h3>
        <ul className="space-y-3">
          {groups.quickLinks.map((l) => (
            <li key={`${l.href}-${l.label}`}>
              <DynamicInternalLink href={l.href} validPaths={validPaths} className="text-sm text-gray-400 hover:text-white transition-colors">
                {l.label}
              </DynamicInternalLink>
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
}

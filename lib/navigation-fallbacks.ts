import type { FooterNavigationGroups, NavigationLink } from "@/lib/navigation-types";
import { cities, carServices, bikeServices, quickLinks } from "@/lib/data/site";

export const fallbackHeaderLinks: NavigationLink[] = [
  { label: "Home", href: "/", nav_area: "header", sort_order: 1, is_active: true },
  { label: "Services", href: "/services", nav_area: "header", sort_order: 2, is_active: true },
  { label: "About", href: "/about", nav_area: "header", sort_order: 3, is_active: true },
  { label: "Blog", href: "/blog", nav_area: "header", sort_order: 4, is_active: true },
  { label: "FAQ", href: "/faq", nav_area: "header", sort_order: 5, is_active: true },
  { label: "Contact", href: "/contact", nav_area: "header", sort_order: 6, is_active: true },
];

export const fallbackFooterGroups: FooterNavigationGroups = {
  carServices: carServices.map((service, index) => ({
    label: service.label,
    href: service.href ?? `/services/${service.slug}`,
    nav_area: "footer_car_services",
    sort_order: index + 1,
    is_active: true,
  })),
  bikeServices: bikeServices.map((service, index) => ({
    label: service.label,
    href: service.href ?? `/services/${service.slug}`,
    nav_area: "footer_bike_services",
    sort_order: index + 1,
    is_active: true,
  })),
  cities: cities.map((city, index) => ({
    label: `Fiixup ${city.name}`,
    href: `/${city.slug}`,
    nav_area: "footer_cities",
    sort_order: index + 1,
    is_active: true,
  })),
  quickLinks: quickLinks.map((link, index) => ({
    label: link.label,
    href: link.href,
    nav_area: "footer_quick_links",
    sort_order: index + 1,
    is_active: true,
  })),
};

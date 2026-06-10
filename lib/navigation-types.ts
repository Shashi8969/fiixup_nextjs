export type NavigationArea =
  | "header"
  | "footer_car_services"
  | "footer_bike_services"
  | "footer_cities"
  | "footer_quick_links";

export type NavigationLink = {
  id?: string | number;
  label: string;
  href: string;
  nav_area: NavigationArea;
  sort_order?: number | null;
  opens_new_tab?: boolean | null;
  is_active?: boolean | null;
};

export type FooterNavigationGroups = {
  carServices: NavigationLink[];
  bikeServices: NavigationLink[];
  cities: NavigationLink[];
  quickLinks: NavigationLink[];
};

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
  scope_type?: "global" | "city" | "area" | "path" | string | null;
  scope_city_slug?: string | null;
  scope_area_slug?: string | null;
  scope_path?: string | null;
  link_mode?: "manual" | "db_page" | string | null;
  target_type?: string | null;
  target_id?: string | number | null;
};

export type FooterNavigationGroups = {
  carServices: NavigationLink[];
  bikeServices: NavigationLink[];
  cities: NavigationLink[];
  quickLinks: NavigationLink[];
};

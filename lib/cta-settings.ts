import { unstable_cache } from "next/cache";
import { supabase } from "@/lib/supabase";
import type { PageType } from "@/lib/pageType";

export type CtaVisibility = {
  call: { desktop: boolean; mobile: boolean };
  whatsapp: { desktop: boolean; mobile: boolean };
};

export type CtaVisibilitySettings = Record<PageType, CtaVisibility>;

const PAGE_TYPES: PageType[] = [
  "home",
  "city",
  "area",
  "location_service",
  "city_service",
  "global_service",
  "blog",
  "brand",
  "static",
];

function defaultSettings(): CtaVisibilitySettings {
  return Object.fromEntries(
    PAGE_TYPES.map((pageType) => [
      pageType,
      { call: { desktop: true, mobile: true }, whatsapp: { desktop: true, mobile: true } },
    ])
  ) as CtaVisibilitySettings;
}

export const getCtaVisibilitySettings = unstable_cache(
  async (): Promise<CtaVisibilitySettings> => {
    const settings = defaultSettings();
    try {
      const { data, error } = await supabase
        .from("cta_visibility_settings")
        .select("page_type,button_type,show_desktop,show_mobile");

      if (error || !data) return settings;

      for (const row of data as Array<Record<string, unknown>>) {
        const pageType = String(row.page_type ?? "") as PageType;
        const buttonType = String(row.button_type ?? "");
        if (!(pageType in settings)) continue;
        if (buttonType !== "call" && buttonType !== "whatsapp") continue;

        settings[pageType][buttonType] = {
          desktop: Boolean(row.show_desktop),
          mobile: Boolean(row.show_mobile),
        };
      }

      return settings;
    } catch {
      return settings;
    }
  },
  ["cta-visibility-settings"],
  { revalidate: 3600, tags: ["cta-settings"] }
);

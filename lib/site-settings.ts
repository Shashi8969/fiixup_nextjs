import { unstable_cache } from "next/cache";
import { supabase } from "@/lib/supabase";
import {
  MAIN_EMAIL,
  MAIN_PHONE,
  MAIN_PHONE_DISPLAY,
  SITE_NAME,
  SITE_URL,
  WHATSAPP_NUMBER,
} from "@/lib/constants";

export type PublicSiteSettings = {
  siteName: string;
  siteUrl: string;
  mainPhone: string;
  mainPhoneDisplay: string;
  mainEmail: string;
  whatsappNumber: string;
  footerDescription: string;
  serviceAreaText: string;
  quickModalAvailableText: string;
  floatingWhatsAppMessage: string;
  emergencyPhone: string;
  addressStreet: string;
  addressLocality: string;
  addressRegion: string;
  addressPostalCode: string;
  addressCountry: string;
  /** Next/Image `quality` (1-100), admin-controlled via the "Image Quality" setting. */
  imageQuality: number;
};

const IMAGE_QUALITY_BY_MODE: Record<string, number> = {
  high: 90,
  balanced: 75,
  fast: 50,
};
const DEFAULT_IMAGE_QUALITY = 75;

export const fallbackSiteSettings: PublicSiteSettings = {
  siteName: SITE_NAME,
  siteUrl: SITE_URL,
  mainPhone: MAIN_PHONE,
  mainPhoneDisplay: MAIN_PHONE_DISPLAY,
  mainEmail: MAIN_EMAIL,
  whatsappNumber: WHATSAPP_NUMBER,
  footerDescription:
    "India's 24/7 doorstep car & bike repair service. Certified technicians at your home or office.",
  serviceAreaText: "Available 24/7 · Bengaluru · Chennai · Hyderabad · Mumbai",
  quickModalAvailableText: "Available 24/7 across Bengaluru, Chennai, Hyderabad & Mumbai",
  floatingWhatsAppMessage: "Hi Fiixup, I need roadside assistance for my vehicle.",
  emergencyPhone: "",
  addressStreet: "",
  addressLocality: "",
  addressRegion: "",
  addressPostalCode: "",
  addressCountry: "IN",
  imageQuality: DEFAULT_IMAGE_QUALITY,
};

const SETTING_MAP: Record<string, Exclude<keyof PublicSiteSettings, "imageQuality">> = {
  site_name: "siteName",
  site_url: "siteUrl",
  main_phone: "mainPhone",
  main_phone_display: "mainPhoneDisplay",
  main_email: "mainEmail",
  whatsapp_number: "whatsappNumber",
  footer_description: "footerDescription",
  service_area_text: "serviceAreaText",
  quick_modal_available_text: "quickModalAvailableText",
  floating_whatsapp_message: "floatingWhatsAppMessage",
  phone: "emergencyPhone",
  address_street: "addressStreet",
  address_locality: "addressLocality",
  address_region: "addressRegion",
  address_postal_code: "addressPostalCode",
  address_country: "addressCountry",
};

function clean(value: unknown) {
  return String(value ?? "").trim();
}

export const getPublicSiteSettings = unstable_cache(
  async (): Promise<PublicSiteSettings> => {
    try {
      const { data, error } = await supabase
        .from("site_settings")
        .select("key,value,is_public")
        .eq("is_public", true);

      if (error || !data) return fallbackSiteSettings;

      const settings: PublicSiteSettings = { ...fallbackSiteSettings };

      for (const row of data as Array<Record<string, unknown>>) {
        const rawKey = clean(row.key);
        const value = clean(row.value);
        if (!value) continue;

        if (rawKey === "image_quality_mode") {
          settings.imageQuality = IMAGE_QUALITY_BY_MODE[value.toLowerCase()] ?? DEFAULT_IMAGE_QUALITY;
          continue;
        }

        const settingKey = SETTING_MAP[rawKey];
        if (settingKey) {
          settings[settingKey] = value;
        }
      }

      return settings;
    } catch {
      return fallbackSiteSettings;
    }
  },
  ["public-site-settings"],
  { revalidate: 3600, tags: ["site-settings"] }
);

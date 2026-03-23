export const SITE_URL             = "https://fiixup.in";
export const SITE_NAME            = "Fiixup";
export const MAIN_PHONE           = "+918722777367";
export const MAIN_PHONE_DISPLAY   = "+91 87227 77367";
export const MAIN_EMAIL           = "support@fiixup.com";
export const WHATSAPP_NUMBER      = "918197459732";
export const DEFAULT_OG_IMAGE     = `${SITE_URL}/assets/og-image.webp`;
export const DEFAULT_KEYWORDS     =
  "doorstep car repair India, bike repair at home, mobile mechanic, 24/7 auto repair, car service Bengaluru, bike repair Chennai, mechanic Hyderabad, car repair Mumbai";

export const CITIES_LIST = ["Bengaluru", "Chennai", "Hyderabad", "Mumbai"] as const;
export type CityName = (typeof CITIES_LIST)[number];

export const TRUST_BADGES = [
  "✅ Technician arrives in 30–60 minutes",
  "✅ Upfront pricing — no hidden charges",
  "✅ 30-day warranty on all repairs",
  "✅ Certified & background-verified technicians",
] as const;

export const HOW_IT_WORKS_STEPS = [
  { n: "1", title: "Book in 60 Seconds",  desc: "Call, WhatsApp, or fill the form. Pick your time and location." },
  { n: "2", title: "We Dispatch Fast",     desc: "We confirm and dispatch the nearest certified technician to you." },
  { n: "3", title: "Repair at Your Door",  desc: "Technician arrives with all tools & parts. Full transparency." },
  { n: "4", title: "Back on the Road",     desc: "Service done with a 30-day warranty. Digital receipt provided." },
] as const;

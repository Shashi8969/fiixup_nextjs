export const SITE_URL             = "https://fiixup.in";
export const SITE_NAME            = "Fiixup";
export const MAIN_PHONE           = "+918197459732";
export const MAIN_PHONE_DISPLAY   = "+91 8197459732";
export const MAIN_EMAIL           = "support@fiixup.in";
export const WHATSAPP_NUMBER      = "918197459732";
export const DEFAULT_OG_IMAGE     = `${SITE_URL}/assets/og-image.webp`;
export const DEFAULT_KEYWORDS     =
  "doorstep car repair India, bike repair at home, mobile mechanic, 24/7 auto repair, car service Bengaluru, bike repair Chennai, mechanic Hyderabad, car repair Mumbai, emergency car service, doorstep bike service, auto repair at home, mobile car mechanic, on-demand car repair, home bike service, certified technicians, quick car repair, reliable auto service, affordable car repair, professional bike repair, emergency roadside assistance, car maintenance at home, bike maintenance at home, car repair near me, bike repair near me, auto repair near me, mobile car service, mobile bike service, car repair on demand, bike repair on demand, car breakdown service, bike breakdown service, car repair at your doorstep, bike repair at your doorstep,  car repair in your area, bike repair in your area, car service at home, bike service at home, car repair without towing, bike repair without towing, car repair with warranty, bike repair with warranty, car repair with certified technicians, bike repair with certified technicians, car repair with upfront pricing, bike repair with upfront pricing, car repair with transparent pricing, bike repair with transparent pricing, car repair with fast response time, bike repair with fast response time, car repair with convenient scheduling, bike repair with convenient scheduling, car repair with quality parts, bike repair with quality parts, car repair with professional service, bike repair with professional service, car repair with customer satisfaction, bike repair with customer satisfaction, car repair with emergency support, bike repair with emergency support, car repair with reliable service, bike repair with reliable service, car repair with trusted technicians, bike repair with trusted technicians, car repair with experienced mechanics, bike repair with experienced mechanics, car repair with on-site service, bike repair with on-site service, car repair with mobile service, bike repair with mobile service, car repair with home service, bike repair with home service, car repair with doorstep service, bike repair with doorstep service, car repair with 24/7 availability, bike repair with 24/7 availability, car repair with quick turnaround time, bike repair with quick turnaround time, car repair with affordable pricing, bike repair with affordable pricing, car repair with convenient payment options, bike repair with convenient payment options, car repair with flexible scheduling, bike repair with flexible scheduling, car repair with reliable support, bike repair with reliable support, car repair with trusted service providers, bike repair with trusted service providers";

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

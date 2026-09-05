export const SITE_URL             = "https://fiixup.in";
export const SITE_NAME            = "Fiixup";
export const MAIN_PHONE           = "+918197459732";
export const MAIN_PHONE_DISPLAY   = "+91 8197459732";
export const MAIN_EMAIL           = "support@fiixup.in";
export const WHATSAPP_NUMBER      = "918197459732";
export const DEFAULT_OG_IMAGE     = `${SITE_URL}/assets/og-image.webp`;

/**
 * Compact site-wide topic vocabulary derived from Fiixup's 3-month GSC query demand.
 * Google Search ignores the meta-keywords tag, so this is only a fallback for
 * metadata/internal consumers. Real SEO targeting must remain page-specific in
 * titles, headings, body copy, internal links, structured data, and descriptions.
 */
export const DEFAULT_KEYWORDS =
  "car mechanic near me, mechanic near me, mechanic shop near me, 24 hrs car mechanic near me, mobile mechanic near me, doorstep car mechanic near me, bike mechanic near me, bike mechanic near me 24 hours, bike garage near me, bike repair near me, bike service near me, bike service at doorstep, car jump start near me, car battery jump start near me, jump start car near me, towing service near me, car towing service near me, roadside assistance near me, car breakdown service near me, puncture service at home, puncture repair at home, car puncture repair at home, bike puncture repair at home, tyre puncture at home, car service at home, doorstep car repair, doorstep bike repair, car pickup and drop service, partner garage car service, car mechanic Bangalore, car mechanic Chennai, car mechanic Hyderabad, car mechanic Mumbai";

export const CITIES_LIST = ["Bengaluru", "Chennai", "Hyderabad", "Mumbai"] as const;
export type CityName = (typeof CITIES_LIST)[number];

/**
 * Verified Fiixup service-language rules.
 * Keep these centralized so pages do not drift into conflicting promises.
 */
export const ARRIVAL_PROMISE = "20-Min Quick Arrival after booking confirmation";
export const ARRIVAL_PROMISE_NOTE =
  "Applies to eligible doorstep and roadside bookings. Exceptional traffic, weather, distance, building/parking access, or technician availability can affect arrival.";

export const PRICE_DISCLAIMER_SHORT =
  "Prices shown are starting/indicative prices. Final charges may vary if the job needs extra labour, parts, fluids, additional repairs, multiple punctures, towing/pickup distance, or other work approved after inspection.";

export const PRICE_DISCLAIMER_LONG =
  "Prices shown on Fiixup are starting/indicative prices for the standard service scope, not a fixed final quotation. Final charges may vary by vehicle, location, labour required, parts or fluids used, access conditions, towing or pickup/drop distance, multiple punctures, and additional faults or repairs found during inspection. Extra paid work should be explained and approved before it proceeds.";

export const PICKUP_DROP_PROMISE =
  "For car-service jobs that need workshop equipment, Fiixup can coordinate inspection/collection and service through partner garages. Free pickup and drop is available on eligible services and should be confirmed at booking.";

export const TRUST_BADGES = [
  "✅ 20-Min Quick Arrival after booking confirmation*",
  "✅ Starting price shown — extra work approved first",
  "✅ 30-day warranty on eligible repairs",
  "✅ Doorstep, roadside & partner-garage support",
] as const;

export const HOW_IT_WORKS_STEPS = [
  { n: "1", title: "Book & Confirm", desc: "Call, WhatsApp, or use the booking form. Share your vehicle, issue, location, and preferred time." },
  { n: "2", title: "20-Min Quick Arrival", desc: "After booking confirmation, the quick-arrival promise applies to eligible doorstep and roadside visits." },
  { n: "3", title: "Repair or Pickup", desc: "Suitable jobs are handled at your location. Workshop-only car jobs can be moved to a partner garage, with free pickup and drop on eligible services." },
  { n: "4", title: "Approve & Complete", desc: "Starting prices cover the standard scope. Any extra labour, parts, or additional repair should be explained before paid work proceeds. Warranty applies to eligible repairs." },
] as const;

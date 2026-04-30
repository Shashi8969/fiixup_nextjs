import type { PageSEO } from "./types";
import { SITE_URL } from "@/lib/constants";

export const serviceCategoriesSEO: PageSEO[] = [
  {
    id: "category_car",
    label: "Service Category — Car",
    route: "/services/car",
    title: "Doorstep Car Repair & Service | All Makes & Models | Fiixup",
    description:
      "Professional car repair and maintenance at your doorstep. Oil change, brake service, AC repair, engine diagnostics & more. Certified mechanics in Bengaluru, Chennai, Hyderabad & Mumbai.",
    keywords:
      "car service at home, doorstep car repair, car oil change at home, car brake service near me, car AC repair at home, car engine diagnostics doorstep",
    ogTitle: "Car Services | Fiixup Doorstep Repair",
    ogDescription:
      "From oil changes to engine diagnostics — all car repair services at your doorstep. Starting ₹249.",
    canonical: `${SITE_URL}/services/car`,
  },
  {
    id: "category_bike",
    label: "Service Category — Bike",
    route: "/services/bike",
    title: "Doorstep Bike Service & Repair | All Brands | Fiixup",
    description:
      "Complete two-wheeler servicing at your home or office. Oil change, brake repair, chain service, engine repair for Honda, Bajaj, TVS, Royal Enfield, Yamaha & all brands.",
    keywords:
      "bike service at home, doorstep bike repair, two wheeler service near me, motorcycle service at home, scooter service doorstep, Royal Enfield service at home",
    ogTitle: "Bike Services | Fiixup Doorstep Repair",
    ogDescription:
      "All bike brands serviced at your doorstep. Starting ₹249. Certified mechanics.",
    canonical: `${SITE_URL}/services/bike`,
  },
  {
    id: "category_towing",
    label: "Service Category — Towing",
    route: "/services/towing",
    title: "24/7 Towing Service Near Me | Car & Bike Towing | Fiixup",
    description:
      "Emergency towing and vehicle recovery available 24/7. Fast response car and bike towing across Bengaluru, Chennai, Hyderabad & Mumbai. Call now for immediate assistance.",
    keywords:
      "car towing near me, bike towing service, 24/7 towing India, vehicle recovery service, emergency tow truck, towing near me",
    ogTitle: "Towing Services | Fiixup 24/7 Emergency Towing",
    ogDescription:
      "Fast vehicle towing 24/7. Car & bike recovery across all major cities.",
    canonical: `${SITE_URL}/services/towing`,
  },
  {
    id: "category_battery",
    label: "Service Category — Battery",
    route: "/services/battery",
    title: "Car & Bike Battery Service | Jump Start & Replacement | Fiixup",
    description:
      "Dead battery? Get a jump start or battery replacement at your doorstep in 30 minutes. Certified technicians for all car and bike battery services across Bengaluru, Chennai, Hyderabad & Mumbai.",
    keywords:
      "car battery jumpstart near me, bike battery service, car battery replacement at home, dead car battery help, jump start car near me",
    ogTitle: "Battery Services | Fiixup Jump Start & Replacement",
    ogDescription:
      "Jump start or battery replacement in 30 minutes. All vehicles, all cities. 24/7.",
    canonical: `${SITE_URL}/services/battery`,
  },
  {
    id: "category_puncture",
    label: "Service Category — Puncture",
    route: "/services/puncture",
    title: "Doorstep Puncture Repair | Car & Bike Tyre Fix | Fiixup",
    description:
      "Fast puncture repair at your location for cars and bikes. Tyre replacement, balancing and pressure checks by certified technicians. Available 24/7 across Bengaluru, Chennai, Hyderabad & Mumbai.",
    keywords:
      "puncture repair near me, flat tyre repair at home, car puncture service, bike tyre repair doorstep, tyre replacement at home",
    ogTitle: "Puncture Repair Services | Fiixup",
    ogDescription:
      "Fix a flat tyre without moving your vehicle. 24/7 doorstep puncture repair.",
    canonical: `${SITE_URL}/services/puncture`,
  },
  {
    id: "category_roadside",
    label: "Service Category — Roadside Assistance",
    route: "/services/roadside",
    title: "24/7 Roadside Assistance Near Me | Breakdown Help | Fiixup",
    description:
      "Stranded on the road? Fiixup's 24/7 roadside assistance covers breakdowns, flat tyres, battery jump starts, and emergency repairs. Fast response across Bengaluru, Chennai, Hyderabad & Mumbai.",
    keywords:
      "roadside assistance near me, car breakdown help, emergency vehicle repair India, 24/7 breakdown service, stuck on road help",
    ogTitle: "Roadside Assistance | Fiixup 24/7 Emergency Help",
    ogDescription:
      "Stuck on the road? Our team reaches you fast. Breakdowns, flat tyres, battery & more.",
    canonical: `${SITE_URL}/services/roadside`,
  },
  {
    id: "category_mechanic",
    label: "Service Category — Mechanic",
    route: "/services/mechanic",
    title: "Mobile Mechanic Near Me | On-Site Vehicle Repairs | Fiixup",
    description:
      "Book a certified mobile mechanic at your home, office, or anywhere your vehicle is. Full diagnostic and repair services for cars and bikes across Bengaluru, Chennai, Hyderabad & Mumbai.",
    keywords:
      "mobile mechanic near me, mechanic at home, on-site car repair, doorstep mechanic service, certified mobile mechanic India",
    ogTitle: "Mechanic Services | Fiixup Mobile Mechanic",
    ogDescription:
      "Certified mechanics come to you. Cars, bikes, all brands, all repairs. 24/7.",
    canonical: `${SITE_URL}/services/mechanic`,
  },
];

/** Lookup by category slug (e.g. "car", "bike") */
export function getCategorySEO(slug: string): PageSEO | undefined {
  return serviceCategoriesSEO.find((c) => c.id === `category_${slug}`);
}

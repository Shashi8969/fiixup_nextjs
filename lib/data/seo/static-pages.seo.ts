import type { PageSEO } from "./types";
import { SITE_URL } from "@/lib/constants";

export const staticPagesSEO: PageSEO[] = [
  {
    id: "home",
    label: "Homepage",
    route: "/",
    title: "24/7 Doorstep Car & Bike Repair India | Mechanic Near Me | Fiixup",
    description:
      "Book doorstep car and bike repair across Bengaluru, Chennai, Hyderabad & Mumbai. Certified mechanics at your home or office 24/7. Oil change, battery, puncture, towing & more.",
    keywords:
      "doorstep car repair, bike service at home, mechanic near me, 24/7 roadside assistance, car battery jumpstart, on-site vehicle repair, car repair at home, bike repair at home, mobile mechanic near me, car service Bengaluru, bike repair Chennai, mechanic Hyderabad, car repair Mumbai, best car mechanic near me, garage near me",
    ogTitle: "Fiixup — India's #1 Doorstep Car & Bike Repair",
    ogDescription:
      "Certified mechanics come to your home or office 24/7. All services from ₹249. Bengaluru, Chennai, Hyderabad & Mumbai.",
    canonical: SITE_URL,
  },
  {
    id: "about",
    label: "About Us",
    route: "/about",
    title: "About Fiixup | India's Trusted Doorstep Auto Repair Service",
    description:
      "Fiixup was built to make vehicle repair hassle-free. 50+ certified technicians cover Bengaluru, Chennai, Hyderabad & Mumbai — bringing professional auto repair to your doorstep 24/7.",
    keywords:
      "about fiixup, doorstep auto repair company, mobile mechanic India, certified vehicle technicians, transparent car service pricing",
    ogTitle: "About Fiixup — Doorstep Auto Repair Across India",
    ogDescription:
      "50+ certified technicians. 24/7 service. 4 cities. Transparent pricing with a 30-day warranty on every repair.",
    canonical: `${SITE_URL}/about`,
  },
  {
    id: "blog",
    label: "Blog",
    route: "/blog",
    title: "Car & Bike Maintenance Blog | Tips, Guides & Advice | Fiixup",
    description:
      "Expert car and bike maintenance tips, how-to guides, and service advice from Fiixup's certified technicians. Keep your vehicle running longer and avoid expensive breakdowns.",
    keywords:
      "car maintenance tips, bike service guide, vehicle repair advice, how to service car, bike oil change guide, car battery maintenance, two-wheeler tips",
    ogTitle: "Fiixup Blog — Car & Bike Maintenance Tips",
    ogDescription:
      "Practical guides and expert tips from certified mechanics. Read now.",
    canonical: `${SITE_URL}/blog`,
  },
  {
    id: "contact",
    label: "Contact Us",
    route: "/contact",
    title: "Contact Fiixup | Book Doorstep Car & Bike Repair 24/7",
    description:
      "Book a doorstep car or bike repair with Fiixup. Call +91 8197459732 or fill the form. Available 24/7 across Bengaluru, Chennai, Hyderabad & Mumbai.",
    keywords:
      "contact fiixup, book car service at home, doorstep mechanic booking, car repair booking India, emergency bike repair near me",
    ogTitle: "Contact Fiixup — Book Your Doorstep Service Now",
    ogDescription:
      "Call or message us to book a certified mechanic at your location. Available 24/7.",
    canonical: `${SITE_URL}/contact`,
  },
  {
    id: "faq",
    label: "FAQ",
    route: "/faq",
    title: "Fiixup Help & FAQs | Booking, Pricing, Repairs & Roadside Safety",
    description:
      "Practical answers about booking Fiixup, diagnosis, doorstep repair limits, pricing, breakdown safety, batteries, punctures, towing and service-area coverage.",
    keywords:
      "fiixup faq, doorstep mechanic booking, roadside breakdown questions, car repair pricing, battery jump start questions, towing service questions, puncture repair help",
    ogTitle: "Fiixup Help & Frequently Asked Questions",
    ogDescription:
      "Clear answers about booking, diagnosis, pricing, roadside safety, batteries, punctures, towing and Fiixup service areas.",
    canonical: `${SITE_URL}/faq`,
  },
  {
    id: "gallery",
    label: "Gallery",
    route: "/gallery",
    title: "Our Work Gallery | Real Car & Bike Repair Jobs | Fiixup",
    description:
      "See real doorstep car and bike repair jobs completed by Fiixup's certified technicians — before/after photos, service visits, and roadside assistance across India.",
    keywords:
      "fiixup gallery, car repair photos, bike service photos, doorstep mechanic work, real repair jobs India",
    ogTitle: "Fiixup Gallery — Real Completed Repair Jobs",
    ogDescription:
      "A look at real doorstep car and bike repairs completed by our certified technicians.",
    canonical: `${SITE_URL}/gallery`,
  },
  {
    id: "services",
    label: "Services Hub",
    route: "/services",
    title: "All Doorstep Car & Bike Repair Services | Fiixup",
    description:
      "Browse Fiixup's complete range of doorstep auto repair services — car service, bike repair, oil change, battery replacement, puncture fix, towing & more. All cities. All vehicle brands.",
    keywords:
      "doorstep car repair services, bike repair at home, oil change at home, car battery replacement, puncture repair near me, car towing service, roadside assistance, mobile mechanic",
    ogTitle: "Fiixup Services — Complete Doorstep Auto Repair",
    ogDescription:
      "Car repair, bike service, battery, puncture, towing & more. 24/7 across Bengaluru, Chennai, Hyderabad & Mumbai.",
    canonical: `${SITE_URL}/services`,
  },
  {
    id: "brands",
    label: "Brands Hub",
    route: "/brands",
    title: "Car & Bike Brands We Service | Doorstep Repair | Fiixup",
    description:
      "Doorstep repair and service for every major car and bike brand sold in India — Maruti Suzuki, Hyundai, Tata, Honda, Royal Enfield, Bajaj & more. Certified mechanics, upfront pricing, 30-day warranty.",
    keywords:
      "car brand service center at home, bike brand doorstep repair, maruti suzuki service at home, honda car service, royal enfield doorstep mechanic, all brand car repair India",
    ogTitle: "Fiixup — Every Major Car & Bike Brand Serviced at Your Doorstep",
    ogDescription:
      "Certified mechanics trained on every major brand. Book doorstep service in Bengaluru, Chennai, Hyderabad & Mumbai.",
    canonical: `${SITE_URL}/brands`,
  },
];

/** Convenience lookup by page id */
export function getStaticPageSEO(id: string): PageSEO | undefined {
  return staticPagesSEO.find((p) => p.id === id);
}

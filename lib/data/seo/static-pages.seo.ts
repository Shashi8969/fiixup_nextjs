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
      "Book a doorstep car or bike repair with Fiixup. Call +91 81974 59732 or fill the form. Available 24/7 across Bengaluru, Chennai, Hyderabad & Mumbai.",
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
    title: "FAQs | Doorstep Car & Bike Repair Questions Answered | Fiixup",
    description:
      "Answers to your top questions about Fiixup's doorstep auto repair — pricing, booking process, service warranty, coverage areas, mechanic qualifications and more.",
    keywords:
      "fiixup faq, doorstep car repair questions, mobile mechanic cost India, car service warranty, doorstep repair booking process",
    ogTitle: "Frequently Asked Questions | Fiixup",
    ogDescription:
      "Everything you need to know about booking, pricing, warranty, and service areas.",
    canonical: `${SITE_URL}/faq`,
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
];

/** Convenience lookup by page id */
export function getStaticPageSEO(id: string): PageSEO | undefined {
  return staticPagesSEO.find((p) => p.id === id);
}

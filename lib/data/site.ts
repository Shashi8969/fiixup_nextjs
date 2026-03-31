// lib/data/site.ts — Global site-wide content (soft-coded, no hardcoded text in components)

export const siteMeta = {
  name: "Fiixup",
  tagline: "India's Trusted 24/7 Doorstep Car & Bike Repair Service",
  description:
    "India's trusted 24/7 doorstep car and bike repair service. Certified mechanics at your home or office in Bengaluru, Chennai, Hyderabad & Mumbai. Honest pricing. Book now.",
  url: "https://fiixup.in",
  phone: "+918722777367",
  phoneDisplay: "+91 87227 77367",
  email: "support@fiixup.com",
  whatsapp: "918197459732",
  ogImage: "https://fiixup.in/assets/og-image.webp",
  defaultKeywords:
    "doorstep car repair India, bike repair at home, mobile mechanic, 24/7 auto repair, car service Bengaluru, bike repair Chennai, mechanic Hyderabad, car repair Mumbai",
  twitterHandle: "@fiixup",
  locale: "en_IN",
  rating: { value: "4.9", count: "10000", best: "5" },
} as const;

export const siteNav = [
  { href: "/",         label: "Home"     },
  { href: "/services", label: "Services" },
  { href: "/about",    label: "About"    },
  { href: "/blog",     label: "Blog"     },
  { href: "/faq",      label: "FAQ"      },
  { href: "/contact",  label: "Contact"  },
] as const;

export const trustBadges = [
  "✅ Technician arrives in 30–60 minutes",
  "✅ Upfront pricing — no hidden charges",
  "✅ 30-day warranty on all repairs",
  "✅ Certified & background-verified technicians",
] as const;

export const howItWorksSteps = [
  {
    n: "1",
    title: "Book in 60 Seconds",
    desc: "Call, WhatsApp, or fill the form. Pick your time and location.",
  },
  {
    n: "2",
    title: "We Dispatch Fast",
    desc: "We confirm and dispatch the nearest certified technician to you.",
  },
  {
    n: "3",
    title: "Repair at Your Door",
    desc: "Technician arrives with all tools & parts. Full transparency.",
  },
  {
    n: "4",
    title: "Back on the Road",
    desc: "Service done with a 30-day warranty. Digital receipt provided.",
  },
] as const;

export const cities = ["Bengaluru", "Chennai", "Hyderabad", "Mumbai"] as const;
export type CityName = (typeof cities)[number];

export const citySlugs = ["bengaluru", "chennai", "hyderabad", "mumbai"] as const;
export type CitySlug = (typeof citySlugs)[number];

export const socialLinks = {
  facebook:  "https://facebook.com/fiixup",
  instagram: "https://instagram.com/fiixup",
  twitter:   "https://twitter.com/fiixup",
  linkedin:  "https://linkedin.com/company/fiixup",
} as const;

export const footerLinks = {
  services: [
    { label: "Car General Repair",     href: "/services/car-general-repair"     },
    { label: "Car Brake Service",       href: "/services/car-brake-service"       },
    { label: "Car Oil Change",          href: "/services/car-oil-change"          },
    { label: "Car AC Service",          href: "/services/car-ac-service"          },
    { label: "Car Tyre Service",        href: "/services/car-tyre-service"        },
    { label: "Bike General Service",    href: "/services/bike-general-service"    },
    { label: "Bike Engine Repair",      href: "/services/bike-engine-repair"      },
    { label: "Bike Brake & Clutch",     href: "/services/bike-brake-clutch"       },
  ],
  company: [
    { label: "About Fiixup",  href: "/about"   },
    { label: "Blog",          href: "/blog"    },
    { label: "FAQ",           href: "/faq"     },
    { label: "Contact Us",    href: "/contact" },
  ],
  cities: [
    { label: "Bengaluru",  href: "/bengaluru"  },
    { label: "Chennai",    href: "/chennai"    },
    { label: "Hyderabad",  href: "/hyderabad"  },
    { label: "Mumbai",     href: "/mumbai"     },
  ],
} as const;

export const footerTagline =
  "India's trusted 24/7 doorstep car and bike repair service. Certified mechanics. Honest pricing. Always available.";

export const copyrightText = (year: number) =>
  `© ${year} Fiixup. All rights reserved.`;

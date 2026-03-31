// lib/data/site.ts
import { Facebook, Twitter, Instagram } from "lucide-react";

const cities = [
  { name: "Bengaluru", slug: "bengaluru" },
  { name: "Chennai",   slug: "chennai"   },
  { name: "Hyderabad", slug: "hyderabad" },
  { name: "Mumbai",    slug: "mumbai"    },
];

const carServices = [
  { label: "General Car Repair",   slug: "car-general-repair"    },
  { label: "Brake Service",        slug: "car-brake-service"      },
  { label: "Oil Change",           slug: "car-oil-change"         },
  { label: "Engine Diagnostics",   slug: "car-engine-diagnostics" },
  { label: "AC Service",           slug: "car-ac-service"         },
  { label: "Battery & Electrical", slug: "car-battery-electrical" },
];

const bikeServices = [
  { label: "Bike General Service", slug: "bike-general-service"    },
  { label: "Engine Repair",        slug: "bike-engine-repair"      },
  { label: "Electrical Works",     slug: "bike-electrical-repair"  },
  { label: "Brake & Clutch",       slug: "bike-brake-clutch"       },
  { label: "Parts Replacement",    slug: "bike-parts-replacement"  },
  { label: "Regular Maintenance",  slug: "bike-regular-maintenance"},
];

const quickLinks = [
  { label: "About Us",     href: "/about"    },
  { label: "All Services", href: "/services" },
  { label: "Blog",         href: "/blog"     },
  { label: "FAQ",          href: "/faq"      },
  { label: "Contact",      href: "/contact"  },
];

const socials = [
  { href: "https://facebook.com/fiixup",  label: "Facebook",  Icon: Facebook, hover: "hover:bg-blue-600" },
  { href: "https://twitter.com/fiixup",   label: "Twitter",   Icon: Twitter,  hover: "hover:bg-sky-500"  },
  { href: "https://instagram.com/fiixup", label: "Instagram", Icon: Instagram,hover: "hover:bg-pink-600" },
];

export { cities, carServices, bikeServices, quickLinks, socials };
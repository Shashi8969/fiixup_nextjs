// lib/data/site.ts
import { Facebook, Twitter, Instagram } from "lucide-react";

const cities = [
  { name: "Bengaluru", slug: "bangalore" },
  { name: "Chennai",   slug: "chennai"   },
  { name: "Hyderabad", slug: "hyderabad" },
  { name: "Mumbai",    slug: "mumbai"    },
];

const carServices = [
  { label: "General Car Repair",   slug: "car-general-repair"    },
  { label: "Brake Service",        slug: "car-brake-service"      },
  { label: "Oil Change",           slug: "car-oil-change-at-home" },
  { label: "Engine Diagnostics",   slug: "car-engine-diagnostics" },
  { label: "AC Service",           slug: "car-ac-service-repair"  },
  { label: "Car Battery Jump Start", slug: "car-battery-jumpstart-near-me" },
];

const bikeServices = [
  { label: "Bike General Service", slug: "bike-service-at-home"    },
  { label: "Engine Repair",        slug: "bike-engine-repair"      },
  { label: "Electrical Works",     slug: "bike-electrical-repair"  },
  { label: "Brake & Clutch",       slug: "bike-brake-clutch-repair"},
  { label: "Bike Jump Start",    slug: "bike-battery-jumpstart-near-me"  },
  { label: "Regular Maintenance",  slug: "bike-regular-maintenance-plan"},
];

const quickLinks = [
  { label: "About Us",     href: "/about"    },
  { label: "All Services", href: "/services" },
  { label: "Blog",         href: "/blog"     },
  { label: "FAQ",          href: "/faq"      },
  { label: "Contact",      href: "/contact"  },
];

const socials = [
  { href: "https://www.facebook.com/fiixup1/",  label: "Facebook",  Icon: Facebook, hover: "hover:bg-blue-600" },
  // { href: "https://twitter.com/fiixup",   label: "Twitter",   Icon: Twitter,  hover: "hover:bg-sky-500"  },
  { href: "https://www.instagram.com/fiixup_in/", label: "Instagram", Icon: Instagram,hover: "hover:bg-pink-600" },
];

export { cities, carServices, bikeServices, quickLinks, socials };
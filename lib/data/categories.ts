// lib/categories.ts
import { Bike, Car, Wind, Battery, Target, Cog, Palette, Zap } from "lucide-react";

export const serviceCategories = [
  { 
    title: "Bike Service", 
    desc: "Regular maintenance, oil change, tune-up", 
    icon: Bike, 
    link: "/services?cat=bike" 
  },
  { 
    title: "Car Service", 
    desc: "Periodic service, engine care, inspections", 
    icon: Car, 
    link: "/services?cat=car" 
  },
  { 
    title: "Car AC Repair", 
    desc: "Car AC gas refill, compressor, cooling fix", 
    icon: Wind, 
    link: "/services/car-ac-service" 
  },
  { 
    title: "Battery", 
    desc: "Jump start, replacement, testing", 
    icon: Battery, 
    link: "/services/car-battery-electrical" 
  },
  { 
    title: "Tyre & Wheel", 
    desc: "Puncture, replacement, alignment", 
    icon: Target, 
    link: "/services/puncture-repair" 
  },
  { 
    title: "Engine Repair", 
    desc: "Diagnostics, overhaul, performance", 
    icon: Cog, 
    link: "/services/car-engine-diagnostics" 
  },
  { 
    title: "Denting & Painting", 
    desc: "Scratch removal, body work, polish", 
    icon: Palette, 
    link: "/contact" 
  },
  { 
    title: "EV Service", 
    desc: "Electric bike & scooter service from ₹999", 
    icon: Zap, 
    link: "/services" 
  },
];
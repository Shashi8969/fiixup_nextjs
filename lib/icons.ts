// lib/icons.ts
import {
  Wrench,
  Bike,
  Battery,
  Truck,
  Car,
  Settings,
  Droplets,
  Wind,
  ShieldAlert,
  Search,
  MapPin,
  Clock,
  Phone,
  CheckCircle,
  Award,
  Shield,
  Tag
} from "lucide-react";
import type { LucideIcon } from "lucide-react";

/**
 * iconMap connects the string names in your serviceCategory data
 * to the actual Lucide React components.
 */
export const iconMap: Record<string, LucideIcon> = {
  Wrench,
  Bike,
  Battery,
  Truck,
  Car,
  Settings,
  Droplets,
  Wind,
  ShieldAlert,
  Search,
  MapPin,
  Clock,
  Phone,
  CheckCircle,
  Award,
  Shield,
  Tag,
  default: Wrench, // fallback icon
};

// Also export them individually so you can import them directly if needed
export const icons = { 
  Wrench, Bike, Battery, Truck, Car, 
  Settings, Droplets, Wind, ShieldAlert,
  Clock, Tag, Phone
};
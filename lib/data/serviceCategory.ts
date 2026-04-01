import { Car, Bike, Truck, Battery, ShipWheel } from "lucide-react";
import { carServices, bikeServices, towingServices, batteryServices, punctureServices, roadsideServices, mechanicServices,  } from "../services";
export const serviceCategories = [
  {
    title: "Car Services",
    description: "Professional car repair & maintenance at your doorstep. All makes & models covered.",
    data: carServices,
    icon: Car,
    link: "/services?cat=car",
    color: "blue",
    bgColor: "bg-white"
  },
  {
    title: "Bike Services",
    description: "Complete two-wheeler servicing & repair at your home or office. All brands covered.",
    data: bikeServices,
    icon: Bike,
    link: "/services?cat=bike",
    color: "red",
    bgColor: "bg-gray-50"
  },
  {
    title: "Towing Services",
    description: "24/7 emergency towing and vehicle recovery services whenever you need them.",
    data: towingServices,
    icon: Truck, 
    link: "/services?cat=towing",
    color: "amber",
    bgColor: "bg-white"
  },
  {
    title: "Battery Services",
    description: "Expert battery testing, replacement, and maintenance services for all vehicles.",
    data: batteryServices,
    icon: Battery, // You can choose a different icon for battery services
    link: "/services?cat=battery",
    color: "green",
    bgColor: "bg-gray-50"
  },
  {
    title: "Puncture Services",
    description: "Quick and reliable puncture repair services for bikes and cars at your doorstep.",
    data: punctureServices,
    icon: ShipWheel,
    link: "/services?cat=puncture",
    color: "orange",
    bgColor: "bg-white"
  },
  {
    title: "Roadside Assistance",
    description: "24/7 roadside assistance for breakdowns, flat tires, lockouts, and more.",
    data: roadsideServices,
    icon: Truck, // You can choose a different icon for roadside assistance
    link: "/services?cat=roadside",
    color: "purple",
    bgColor: "bg-gray-50"
  },
  {
    title: "Mechanic Services",
    description: "Skilled mechanics for all your vehicle repair and maintenance needs at home.",
    data: mechanicServices,
    icon: Car, // You can choose a different icon for mechanic services
    link: "/services?cat=mechanic",
    color: "teal",
    bgColor: "bg-white"
  }
];


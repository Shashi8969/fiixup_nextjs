import Link from "next/link";
import { Wrench, Car, Gauge, Droplet, Wind, Battery, Settings, Shield, Bike, Zap, Cog, CircuitBoard } from "lucide-react";
import type { CityData } from "@/lib/cities";

const carServices = [
  { icon: Wrench,   title: "General Car Repairs",  slug: "car-general-repair",    description: "Comprehensive diagnostic and repair services for all car makes and models." },
  { icon: Car,      title: "Brake Service",         slug: "car-brake-service",      description: "Complete brake inspection, pad replacement, and rotor resurfacing." },
  { icon: Droplet,  title: "Oil Changes",           slug: "car-oil-change",         description: "Fast and affordable oil changes with full fluid level inspection." },
  { icon: Gauge,    title: "Engine Diagnostics",    slug: "car-engine-diagnostics", description: "Advanced computer diagnostics to identify and fix engine issues." },
  { icon: Wind,     title: "AC Service",            slug: "car-ac-service",         description: "Air conditioning repair, recharge, and maintenance services." },
  { icon: Battery,  title: "Battery & Electrical",  slug: "car-battery-electrical", description: "Battery testing, replacement, and electrical system repairs." },
];

const bikeServices = [
  { icon: Bike,         title: "Bike General Service", slug: "bike-general-service",    description: "Complete bike servicing including chain cleaning, oil change, and tune-up." },
  { icon: Cog,          title: "Engine Repair",        slug: "bike-engine-repair",      description: "Expert motorcycle engine diagnosis and repair services." },
  { icon: Zap,          title: "Electrical Works",     slug: "bike-electrical-repair",  description: "Battery, wiring, headlight, and indicator repair services." },
  { icon: CircuitBoard, title: "Parts Replacement",    slug: "bike-parts-replacement",  description: "Genuine and aftermarket parts replacement for all bike models." },
  { icon: Settings,     title: "Brake & Clutch",       slug: "bike-brake-clutch",       description: "Brake pad replacement, clutch adjustment, and repairs." },
  { icon: Shield,       title: "Regular Maintenance",  slug: "bike-regular-maintenance",description: "Scheduled maintenance to keep your bike running smoothly." },
];

export function CityServices({ city }: { city: CityData }) {
  return (
    <section id="services" className="py-20 bg-white">
      <div className="container mx-auto px-4">

        <div className="text-center mb-16">
          <h2 className="text-3xl md:text-4xl font-bold mb-4 text-gray-900">{city.servicesSectionHeading}</h2>
          <p className="text-lg text-gray-600 max-w-2xl mx-auto">{city.servicesSectionSubtext}</p>
        </div>

        {/* Car Services */}
        <div className="mb-12">
          <h3 className="text-2xl font-bold mb-6 flex items-center gap-2 text-gray-900">
            <Car className="w-6 h-6 text-blue-600" />
            {city.carServicesHeading}
          </h3>
          <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {carServices.map((service) => (
              <Link
                key={service.slug}
                href={`/${city.slug}/services/${service.slug}`}
                className="p-6 border border-gray-200 rounded-xl hover:shadow-lg transition-all hover:border-blue-300 group"
              >
                <service.icon className="w-12 h-12 text-blue-600 mb-4" />
                <h4 className="text-lg font-semibold mb-2 text-gray-900 group-hover:text-blue-600 transition-colors">
                  {service.title} in {city.name}
                </h4>
                <p className="text-gray-600 text-sm">{service.description}</p>
                <span className="mt-3 inline-block text-blue-600 text-sm font-semibold">View details →</span>
              </Link>
            ))}
          </div>
        </div>

        {/* Bike Services */}
        <div>
          <h3 className="text-2xl font-bold mb-6 flex items-center gap-2 text-gray-900">
            <Bike className="w-6 h-6 text-red-600" />
            {city.bikeServicesHeading}
          </h3>
          <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {bikeServices.map((service) => (
              <Link
                key={service.slug}
                href={`/services/${service.slug}`}
                className="p-6 border border-gray-200 rounded-xl hover:shadow-lg transition-all hover:border-red-300 group"
              >
                <service.icon className="w-12 h-12 text-red-600 mb-4" />
                <h4 className="text-lg font-semibold mb-2 text-gray-900 group-hover:text-red-600 transition-colors">
                  {service.title} in {city.name}
                </h4>
                <p className="text-gray-600 text-sm">{service.description}</p>
                <span className="mt-3 inline-block text-red-600 text-sm font-semibold">View details →</span>
              </Link>
            ))}
          </div>
        </div>

      </div>
    </section>
  );
}

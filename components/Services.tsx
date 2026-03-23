import Link from "next/link";
import {
  Wrench, Car, Gauge, Droplet, Wind, Battery,
  Settings, Shield, Bike, Zap, Cog, CircuitBoard, ArrowRight,
} from "lucide-react";

const carServices = [
  { icon: Wrench,   title: "General Car Repairs",  slug: "car-general-repair",    description: "Comprehensive diagnostic and repair for all car makes and models at your doorstep." },
  { icon: Car,      title: "Brake Service",         slug: "car-brake-service",      description: "Brake pad replacement, disc inspection, and fluid change — done safely at your location." },
  { icon: Droplet,  title: "Oil Change",            slug: "car-oil-change",         description: "Fast doorstep engine oil and filter change. Correct grade for your specific model." },
  { icon: Gauge,    title: "Engine Diagnostics",    slug: "car-engine-diagnostics", description: "OBD2 scan and engine fault diagnosis. Check engine light? We identify it instantly." },
  { icon: Wind,     title: "AC Service",            slug: "car-ac-service",         description: "AC gas recharge, compressor check, and full cooling system service at your home." },
  { icon: Battery,  title: "Battery & Electrical",  slug: "car-battery-electrical", description: "Dead battery, wiring faults, headlights — all fixed at your doorstep 24/7." },
];

const bikeServices = [
  { icon: Bike,         title: "Bike General Service", slug: "bike-general-service",    description: "Full two-wheeler service — oil change, chain, brakes, air filter, and tune-up." },
  { icon: Cog,          title: "Engine Repair",        slug: "bike-engine-repair",      description: "Motorcycle engine diagnosis and repair for all brands including Royal Enfield and KTM." },
  { icon: Zap,          title: "Electrical Works",     slug: "bike-electrical-repair",  description: "Battery replacement, headlight, indicator, and wiring repair at your location." },
  { icon: CircuitBoard, title: "Parts Replacement",    slug: "bike-parts-replacement",  description: "Genuine OEM and aftermarket parts sourced and fitted at your doorstep." },
  { icon: Settings,     title: "Brake & Clutch",       slug: "bike-brake-clutch",       description: "Disc brake service, brake pad replacement, and clutch adjustment or repair." },
  { icon: Shield,       title: "Regular Maintenance",  slug: "bike-regular-maintenance",description: "Scheduled maintenance plans to keep your bike running efficiently all year." },
];

export function Services() {
  return (
    <section id="services" className="py-12 bg-white">
      <div className="container mx-auto px-4">

        <div className="text-center mb-16">
          <h2 className="text-3xl md:text-4xl font-bold mb-4">
            Doorstep Car & Bike Repair Services
          </h2>
          <p className="text-lg text-gray-600 max-w-2xl mx-auto">
            From routine oil changes to emergency engine repairs — our certified
            technicians handle it all at your home or office, across India.
          </p>
        </div>

        {/* Car Services */}
        <div className="mb-14">
          <h3 className="text-2xl font-bold mb-6 flex items-center gap-2">
            <Car className="w-6 h-6 text-blue-600" />
            Car Repair Services
          </h3>
          <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {carServices.map((service) => (
              <Link
                key={service.slug}
                href={`/services/${service.slug}`}
                className="group p-6 border border-gray-200 rounded-xl hover:shadow-lg hover:border-blue-300 transition-all flex flex-col"
              >
                <div className="flex items-start justify-between mb-4">
                  <service.icon className="w-12 h-12 text-blue-600" />
                  <ArrowRight className="w-5 h-5 text-gray-300 group-hover:text-blue-600 group-hover:translate-x-1 transition-all" />
                </div>
                <h3 className="text-xl font-semibold mb-2 group-hover:text-blue-600 transition-colors">
                  {service.title}
                </h3>
                <p className="text-gray-600 text-sm flex-1">{service.description}</p>
                <span className="mt-4 text-blue-600 text-sm font-semibold">View details →</span>
              </Link>
            ))}
          </div>
        </div>

        {/* Bike Services */}
        <div>
          <h3 className="text-2xl font-bold mb-6 flex items-center gap-2">
            <Bike className="w-6 h-6 text-red-600" />
            Bike Repair Services
          </h3>
          <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {bikeServices.map((service) => (
              <Link
                key={service.slug}
                href={`/services/${service.slug}`}
                className="group p-6 border border-gray-200 rounded-xl hover:shadow-lg hover:border-red-300 transition-all flex flex-col"
              >
                <div className="flex items-start justify-between mb-4">
                  <service.icon className="w-12 h-12 text-red-600" />
                  <ArrowRight className="w-5 h-5 text-gray-300 group-hover:text-red-600 group-hover:translate-x-1 transition-all" />
                </div>
                <h3 className="text-xl font-semibold mb-2 group-hover:text-red-600 transition-colors">
                  {service.title}
                </h3>
                <p className="text-gray-600 text-sm flex-1">{service.description}</p>
                <span className="mt-4 text-red-600 text-sm font-semibold">View details →</span>
              </Link>
            ))}
          </div>
        </div>

        <div className="text-center mt-12">
          <Link
            href="/services"
            className="inline-block bg-blue-600 text-white px-8 py-3 rounded-lg hover:bg-blue-700 transition-colors font-semibold"
          >
            View All Services & Pricing
          </Link>
        </div>

      </div>
    </section>
  );
}
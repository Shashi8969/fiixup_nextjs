// components/Services.tsx
import Link from "next/link";
import { ArrowRight, Car, Bike, LucideIcon, Wrench, Gauge, Droplet, Wind, Battery, Settings, Shield, Zap, Cog, CircuitBoard } from "lucide-react";
import { carServices, bikeServices } from "@/lib/services"; //

// Mapping string names from the data to Lucide components
const iconMap: Record<string, LucideIcon> = {
  Wrench, Car, Gauge, Droplet, Wind, Battery,
  Settings, Shield, Bike, Zap, Cog, CircuitBoard,
};

interface MiniCardProps {
  slug: string;
  iconName: string;
  title: string;
  description: string;
  accent: "blue" | "red";
}

function MiniServiceCard({ slug, iconName, title, description, accent }: MiniCardProps) {
  const Icon = iconMap[iconName] ?? Wrench;
  const colorClass = accent === "blue" ? "text-blue-600" : "text-red-600";
  const borderClass = accent === "blue" ? "hover:border-blue-300" : "hover:border-red-300";
  const hoverText = accent === "blue" ? "group-hover:text-blue-600" : "group-hover:text-red-600";

  return (
    <Link
      href={`/services/${slug}`}
      className={`group p-6 border border-gray-200 rounded-xl hover:shadow-lg ${borderClass} transition-all flex flex-col bg-white`}
    >
      <div className="flex items-start justify-between mb-4">
        <Icon className={`w-12 h-12 ${colorClass}`} />
        <ArrowRight className={`w-5 h-5 text-gray-300 ${hoverText} group-hover:translate-x-1 transition-all`} />
      </div>
      <h3 className={`text-xl font-semibold mb-2 ${hoverText} transition-colors`}>
        {title}
      </h3>
      <p className="text-gray-600 text-sm flex-1">{description}</p>
      <span className={`mt-4 ${colorClass} text-sm font-semibold`}>View details →</span>
    </Link>
  );
}

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
            technicians handle it all at your home or office.
          </p>
        </div>

        {/* Car Services - Sourced from lib/services.ts */}
        <div className="mb-14">
          <h3 className="text-2xl font-bold mb-6 flex items-center gap-2">
            <Car className="w-6 h-6 text-blue-600" />
            Car Repair Services
          </h3>
          <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {carServices.slice(0, 6).map((service) => (
              <MiniServiceCard
                key={service.slug}
                slug={service.slug}
                iconName={service.icon}
                title={service.shortTitle}
                description={service.tagline}
                accent="blue"
              />
            ))}
          </div>
        </div>

        {/* Bike Services - Sourced from lib/services.ts */}
        <div>
          <h3 className="text-2xl font-bold mb-6 flex items-center gap-2">
            <Bike className="w-6 h-6 text-red-600" />
            Bike Repair Services
          </h3>
          <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {bikeServices.slice(0, 6).map((service) => (
              <MiniServiceCard
                key={service.slug}
                slug={service.slug}
                iconName={service.icon}
                title={service.shortTitle}
                description={service.tagline}
                accent="red"
              />
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
// components/Services.tsx
<<<<<<< HEAD
import { serviceCategories } from "@/lib/data/serviceCategory";
=======
import { serviceCategories } from "@/lib/data/serviceCategory"; // Verified path
>>>>>>> 8dcb818 (reconect github)
import { ServiceCard } from "@/components/ui/ServiceCard";
import Link from "next/link";

export function Services() {
  return (
    <section id="services" className="py-12 bg-white">
      <div className="container mx-auto px-4">
        <div className="text-center mb-16">
          <h2 className="text-3xl md:text-5xl font-extrabold mb-4 text-gray-900">
            Professional Vehicle Services
          </h2>
          <p className="text-lg text-gray-700 max-w-2xl mx-auto">
            Certified technicians at your doorstep. We provide high-quality maintenance 
            and repair for all makes and models.
          </p>
        </div>

<<<<<<< HEAD
<div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
  {serviceCategories.slice(0, 8).map((cat) => (
    <ServiceCard 
      key={cat.title} 
      cat={cat} // Pass the whole object here
    />
  ))}
</div>
=======
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
          {/* slice(0, 8) ensures we don't overflow the UI if you add 20 categories[cite: 17] */}
          {serviceCategories.slice(0, 8).map((cat) => (
            <ServiceCard 
              key={cat.slug || cat.title} // Use slug as key for better stability[cite: 8]
              cat={cat} 
            />
          ))}
        </div>

>>>>>>> 8dcb818 (reconect github)
        <div className="text-center mt-12">
          <Link
            href="/services"
            className="inline-block bg-blue-600 text-white px-8 py-3 rounded-full font-semibold hover:bg-blue-700 transition-all shadow-lg hover:shadow-blue-200 transform hover:-translate-y-0.5"
          >
            Browse All Services
          </Link>
        </div>
      </div>
    </section>
  );
}
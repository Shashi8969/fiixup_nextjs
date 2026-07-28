// components/Services.tsx
import { getAllServiceCategories } from "@/lib/data/serviceCategory";
import { ServiceCard } from "@/components/ui/ServiceCard";
import Link from "next/link";
import type { HomeServicesData } from "@/lib/homepage";

type ServicesProps = Partial<Omit<HomeServicesData, "categories">> & {
  categories?: any[];
};

export async function Services({
  heading = "Professional Vehicle Services",
  subtext = "Certified technicians at your doorstep. We provide high-quality maintenance and repair for all makes and models.",
  ctaLabel = "Browse All Services",
  ctaHref = "/services",
  maxItems = 8,
  categories,
}: ServicesProps = {}) {
  const serviceCategories = categories?.length ? categories : await getAllServiceCategories();

  if (!serviceCategories.length) return null;

  return (
    <section id="services" className="py-12 bg-white">
      <div className="container mx-auto px-4">
        <div className="text-center mb-16">
          <h2 className="text-3xl md:text-5xl font-extrabold mb-4 text-gray-900">
            {heading}
          </h2>
          <p className="text-lg text-gray-700 max-w-2xl mx-auto">
            {subtext}
          </p>
        </div>

        <div className="grid grid-cols-2 gap-3 sm:grid-cols-2 sm:gap-6 lg:grid-cols-3 xl:grid-cols-4">
          {serviceCategories.slice(0, maxItems).map((cat) => (
            <ServiceCard
              key={cat.slug || cat.title}
              cat={cat}
            />
          ))}
        </div>

        <div className="text-center mt-12">
          <Link
            href={ctaHref}
            className="inline-block bg-blue-600 text-white px-8 py-3 rounded-full font-semibold hover:bg-blue-700 transition-all shadow-lg hover:shadow-blue-200 transform hover:-translate-y-0.5"
          >
            {ctaLabel}
          </Link>
        </div>
      </div>
    </section>
  );
}

// app/services/ServiceList.tsx
"use client";

import { useSearchParams } from "next/navigation";
import { serviceCategories } from "@/lib/data/serviceCategory";
import { iconMap } from "@/lib/icons";
import { ServiceCardPrice } from "@/components/ui/ServiceCardPrice";

export default function ServiceList() {
  const searchParams = useSearchParams();
  const cat = searchParams.get("cat");

  const filteredCategories = cat
    ? serviceCategories.filter(c => c.slug === cat)
    : serviceCategories;

  return (
    <>
      {filteredCategories.map((category, index) => (
        <section key={index} className={`py-8 ${category.bgColor}`}>
          <div className="container mx-auto px-4">
            <h2 className="text-2xl md:text-3xl font-bold flex items-center gap-2 mb-3">
              <category.icon className={`w-7 h-7 text-${category.color}-700`} />
              {category.title}
            </h2>
            <p className="text-gray-600 mb-8">{category.description}</p>
            <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6">
              {category.data.map((s) => (
                <ServiceCardPrice
                  key={s.slug}
                  slug={s.slug}
                  title={s.shortTitle}
                  tagline={s.tagline}
                  price={s.price}
                  duration={s.duration}
                  accentColor={category.color}
                  icon={iconMap[s.icon]}
                />
              ))}
            </div>
          </div>
        </section>
      ))}
    </>
  );
}

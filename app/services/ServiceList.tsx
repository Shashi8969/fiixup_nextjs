// app/services/ServiceList.tsx
// ─────────────────────────────────────────────────────────────────────────────
// Client component — cannot call Supabase directly ("use client").
// Receives pre-fetched categories as a prop from the server page.
// ─────────────────────────────────────────────────────────────────────────────
"use client";

import { useSearchParams } from "next/navigation";
import { iconMap } from "@/lib/icons";
import { ServiceCardPrice } from "@/components/ui/ServiceCardPrice";

type Category = {
  slug: string;
  title: string;
  description: string;
  color: string;
  bgColor: string;
  icon: React.ElementType;
  categorySlug: string;
};

type Service = {
  slug: string;
  shortTitle: string;
  tagline: string;
  price: string;
  duration: string;
  icon: string;
  category: string;
};

interface Props {
  categories: Category[];
  services: Service[];
}

export default function ServiceList({ categories, services }: Props) {
  const searchParams = useSearchParams();
  const cat = searchParams.get("cat");

  const filteredCategories = cat
    ? categories.filter((c) => c.slug === cat)
    : categories;

  return (
    <>
      {filteredCategories.map((category, index) => {
        const categoryServices = services.filter(
          (s) => s.category === category.categorySlug
        );
        if (categoryServices.length === 0) return null;

        return (
          <section key={index} className={`py-8 ${category.bgColor}`}>
            <div className="container mx-auto px-4">
              <h2 className="text-2xl md:text-3xl font-bold flex items-center gap-2 mb-3">
                <category.icon className={`w-7 h-7 text-${category.color}-700`} />
                {category.title}
              </h2>
              <p className="text-gray-600 mb-8">{category.description}</p>
              <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6">
                {categoryServices.map((s) => (
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
        );
      })}
    </>
  );
}

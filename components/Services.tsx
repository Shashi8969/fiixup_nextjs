// app/services/page.tsx
import { serviceCategories } from "@/lib/data/serviceCategory";
import { ServiceCardPrice } from "@/components/ui/ServiceCardPrice";
import { iconMap } from "@/lib/icons"; // Ensure your iconMap is imported

export default async function ServicesPage({
  searchParams,
}: {
  searchParams: Promise<{ cat?: string }>;
}) {
  // 1. Await the params to get the category (e.g., 'bike' or 'car')
  const { cat } = await searchParams;

  const filteredCategories = cat
    ? serviceCategories.filter((category) => category.color === cat)
    : serviceCategories;

  return (
    <main className="min-h-screen bg-white py-16">
      <div className="container mx-auto px-4">
        {/* Dynamic Header */}
        <div className="mb-12">
          <h1 className="text-4xl font-black text-gray-900 capitalize">
            {cat ? `${cat} Doorstep Services` : "All Doorstep Services"}
          </h1>
          <p className="text-gray-500 mt-2">
            Professional repair and maintenance at your location.
          </p>
        </div>

        {filteredCategories.map((category) => (
          <section key={category.title} className="mb-16 last:mb-0">
            <h2 className="text-2xl font-bold mb-8 flex items-center gap-2">
              <category.icon className="w-6 h-6 text-blue-600" />
              {category.title}
            </h2>
            
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
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
          </section>
        ))}
      </div>
    </main>
  );
}
import { Star } from "lucide-react";
import type { CityData } from "@/lib/models/city.model";
import { globalStats } from "@/lib/data/testimonials";
import { getBrandReviews, getReviewsByIds } from "@/lib/reviews";
import { TestimonialCard } from "@/components/ui/TestimonialCard";
import { SectionHeader } from "@/components/ui/SectionHeader";

export async function Testimonials({ reviewIds }: { reviewIds?: string[] } = {}) {
  const testimonials = reviewIds?.length
    ? await getReviewsByIds(reviewIds)
    : await getBrandReviews(4);

  return (
    <section id="testimonials" className="py-12 bg-blue-50">
      <div className="container mx-auto px-4">

        <SectionHeader
          heading="Vehicle Owners Across India Use Fiixup for Doorstep Car & Bike Repair"
          subtext="Customers book Fiixup for emergency breakdown support, doorstep car servicing, bike repair, battery replacement, puncture repair, and roadside mechanic assistance across Bengaluru, Chennai, Hyderabad, and Mumbai."
        />

        {testimonials.length > 0 && (
          <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-8">
            {testimonials.map((t) => (
              <TestimonialCard key={`${t.name}-${t.text.slice(0, 24)}`} {...t} />
            ))}
          </div>
        )}

        <div className="mt-12 bg-white rounded-xl p-6 flex flex-wrap items-center justify-center gap-10 shadow-sm max-w-3xl mx-auto">

          {globalStats.map(({ value, label, isRating }) => (

            <div key={label} className="text-center">

              <p className="text-4xl font-bold text-gray-900">
                {value}
              </p>

              {isRating && (
                <div className="flex gap-0.5 justify-center my-1">
                  {Array.from({ length: 5 }, (_, i) => (
                    <Star
                      key={i}
                      className="w-4 h-4 fill-yellow-400 text-yellow-400"
                    />
                  ))}
                </div>
              )}

              <p className="text-sm text-gray-500">
                {label}
              </p>

            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

export function CityTestimonials({ city }: { readonly city: CityData }) {

  const cityStats = [
    {
      value: "4.9/5",
      label: `Average Customer Rating in ${city.name}`
    },

    {
      value: "1,200+",
      label: `Verified Service Reviews from ${city.name}`
    },

    {
      value: "98%",
      label: "Customers Recommend Fiixup to Others"
    },

    {
      value: "10,000+",
      label: `Cars & Bikes Serviced in ${city.name}`
    },
  ];

  return (
    <section id="testimonials" className="py-20 bg-blue-50">

      <div className="container mx-auto px-4">

        <SectionHeader
          heading={`Doorstep Mechanic Reviews from ${city.name} Customers`}
          subtext={`See why vehicle owners in ${city.name} choose Fiixup for bike repair, car servicing, roadside breakdown support, battery replacement, puncture repair, and emergency mechanic services.`}
        />

        <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-8">

          {city.testimonials.map((t) => (
            <TestimonialCard
              key={`${t.name}-${t.date}`}
              {...t}
            />
          ))}

        </div>

        <div className="mt-12 bg-white rounded-xl p-6 flex flex-wrap items-center justify-center gap-10 shadow-sm max-w-3xl mx-auto">

          {cityStats.map(({ value, label }) => (

            <div key={label} className="text-center">

              <p className="text-4xl font-bold text-gray-900">
                {value}
              </p>

              <p className="text-sm text-gray-500 mt-1">
                {label}
              </p>

            </div>

          ))}

        </div>

      </div>
    </section>
  );
}
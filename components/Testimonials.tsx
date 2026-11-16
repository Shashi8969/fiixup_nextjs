import type { CityData } from "@/lib/models/city.model";
import { getBrandReviews, getReviewsByIds } from "@/lib/reviews";
import { TestimonialCard } from "@/components/ui/TestimonialCard";
import { SectionHeader } from "@/components/ui/SectionHeader";
import { Marquee } from "@/components/ui/Marquee";

export async function Testimonials({ reviewIds, heading }: { reviewIds?: string[]; heading?: string } = {}) {
  const testimonials = reviewIds?.length
    ? await getReviewsByIds(reviewIds)
    : await getBrandReviews(8);

  return (
    <section id="testimonials" className="py-12 bg-blue-50 overflow-hidden">
      <div className="container mx-auto px-4">

        <SectionHeader
          heading={heading ?? "Vehicle Owners Across India Use Fiixup for Doorstep Car & Bike Repair"}
          subtext="Customers book Fiixup for emergency breakdown support, doorstep car servicing, bike repair, battery replacement, puncture repair, and roadside mechanic assistance across Bengaluru, Chennai, Hyderabad, and Mumbai."
        />
      </div>

      {testimonials.length > 0 && (
        <Marquee durationSeconds={Math.max(30, testimonials.length * 7)}>
          {testimonials.map((t) => (
            <div key={`${t.name}-${t.text.slice(0, 24)}`} className="w-[320px] shrink-0 sm:w-[360px]">
              <TestimonialCard {...t} />
            </div>
          ))}
        </Marquee>
      )}

    </section>
  );
}

export function CityTestimonials({ city }: { readonly city: CityData }) {
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

      </div>
    </section>
  );
}

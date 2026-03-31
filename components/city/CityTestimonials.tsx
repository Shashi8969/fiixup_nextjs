import { CityTestimonials as CityTestimonialsSection } from "@/components/Testimonials";
import type { CityData } from "@/lib/models/city.model";

// Re-export the city variant from the shared Testimonials file
export function CityTestimonials({ city }: { city: CityData }) {
  return <CityTestimonialsSection city={city} />;
}

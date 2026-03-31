import { Star } from "lucide-react";
import type { CityData } from "@/lib/models/city.model";

interface TestimonialCardProps {
  name: string;
  rating: number;
  text: string;
  date: string;
  vehicle: string;
  area?: string;
  showArea?: boolean;
}

function TestimonialCard({ name, rating, text, date, vehicle, area }: TestimonialCardProps) {
  return (
    <div className="bg-white rounded-xl p-6 shadow-sm border border-gray-100 flex flex-col">
      <div className="flex gap-0.5 mb-3">
        {[...Array(rating)].map((_, i) => (
          <Star key={i} className="w-4 h-4 fill-yellow-400 text-yellow-400" />
        ))}
      </div>
      <p className="text-gray-700 text-sm leading-relaxed flex-1 mb-4">"{text}"</p>
      <div>
        <p className="font-semibold text-gray-900">{name}</p>
        {area && <p className="text-xs text-gray-500">{area}</p>}
        <p className="text-xs text-gray-600 mt-1">{vehicle} · {date}</p>
      </div>
    </div>
  );
}

const globalTestimonials = [
  { name: "Rajesh Kumar", rating: 5, text: "Amazing service! My car broke down near Koramangala and Fiixup arrived within 25 minutes. Fixed on the spot. Highly recommended!", date: "March 2026", vehicle: "Car Owner", area: "Bengaluru" },
  { name: "Priya Sharma",  rating: 5, text: "Best doorstep bike service I've used. They came to my office in Chennai for regular servicing. Professional work and honest pricing.", date: "February 2026", vehicle: "Bike Owner", area: "Chennai" },
  { name: "Arjun Reddy",  rating: 5, text: "Called at 2 AM in Hyderabad for an emergency — they were there in 30 minutes and got my car running. True 24/7 service!", date: "March 2026", vehicle: "Car Owner", area: "Hyderabad" },
  { name: "Sneha Desai",  rating: 5, text: "My Activa got waterlogged in Mumbai rains. Fiixup came immediately and saved the engine. Couldn't be more grateful!", date: "January 2026", vehicle: "Bike Owner", area: "Mumbai" },
];

const globalStats = [
  { value: "4.9",     label: "Average Rating", isRating: true },
  { value: "10,000+", label: "Vehicles Serviced" },
  { value: "98%",     label: "Would Recommend" },
  { value: "4",       label: "Cities Covered" },
];

// Global testimonials (used on homepage & about page)
export function Testimonials() {
  return (
    <section id="testimonials" className="py-12 bg-blue-50">
      <div className="container mx-auto px-4">
        <div className="text-center mb-12">
          <h2 className="text-3xl md:text-4xl font-bold mb-4 text-gray-900">
            Trusted by Customers Across India
          </h2>
          <p className="text-lg text-gray-600 max-w-2xl mx-auto">
            From Bengaluru to Mumbai — thousands of car and bike owners rely on Fiixup for fast,
            professional doorstep repair service.
          </p>
        </div>

        <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-8">
          {globalTestimonials.map((t) => (
            <TestimonialCard key={t.name} {...t} showArea />
          ))}
        </div>

        <div className="mt-12 bg-white rounded-xl p-6 flex flex-wrap items-center justify-center gap-10 shadow-sm max-w-3xl mx-auto">
          {globalStats.map(({ value, label, isRating }) => (
            <div key={label} className="text-center">
              <p className="text-4xl font-bold text-gray-900">{value}</p>
              {isRating && (
                <div className="flex gap-0.5 justify-center my-1">
                  {[...Array(5)].map((_, i) => (
                    <Star key={i} className="w-4 h-4 fill-yellow-400 text-yellow-400" />
                  ))}
                </div>
              )}
              <p className="text-sm text-gray-500">{label}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

// City-specific testimonials (used on city pages)
export function CityTestimonials({ city }: { city: CityData }) {
  const cityStats = [
    { value: "4.9/5",   label: "Average Rating" },
    { value: "1,200+",  label: `Reviews in ${city.name}` },
    { value: "98%",     label: "Would Recommend" },
    { value: "10,000+", label: `Vehicles Serviced in ${city.name}` },
  ];

  return (
    <section id="testimonials" className="py-20 bg-blue-50">
      <div className="container mx-auto px-4">
        <div className="text-center mb-12">
          <h2 className="text-3xl md:text-4xl font-bold mb-4 text-gray-900">
            {city.testimonialsHeading}
          </h2>
          <p className="text-lg text-gray-600 max-w-2xl mx-auto">{city.testimonialsSubtext}</p>
        </div>

        <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-8">
          {city.testimonials.map((t, i) => (
            <TestimonialCard key={i} {...t} />
          ))}
        </div>

        <div className="mt-12 bg-white rounded-xl p-6 flex flex-wrap items-center justify-center gap-10 shadow-sm max-w-3xl mx-auto">
          {cityStats.map(({ value, label }) => (
            <div key={label} className="text-center">
              <p className="text-4xl font-bold text-gray-900">{value}</p>
              <p className="text-sm text-gray-500 mt-1">{label}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

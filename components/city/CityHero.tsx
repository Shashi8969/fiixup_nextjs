import Link from "next/link";
import Image from "next/image";
import { CheckCircle, MapPin } from "lucide-react";
import type { CityData } from "@/lib/models/city.model";

export function CityHero({ city }: { city: CityData }) {
  return (
    <section className="relative bg-gradient-to-br from-blue-50 to-blue-100 py-12 overflow-hidden">
      <div className="container mx-auto px-4">
        <div className="grid md:grid-cols-2 gap-12 items-center">

          {/* Left */}
          <div className="space-y-6">
            <div className="inline-flex items-center gap-2 bg-red-600 text-white px-4 py-2 rounded-full text-sm font-semibold">
              <MapPin className="w-4 h-4" />
              {city.heroTagline}
            </div>

            <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold text-gray-900 leading-tight">
              24/7 Doorstep Auto Repair Service in {city.name}
            </h1>

            <p className="text-lg text-gray-700">
              Professional car and bike repair at your doorstep in {city.name}, {city.state}.
              Quality service, honest pricing, and reliable repairs anywhere in {city.name}, anytime.
            </p>

            <div className="space-y-3">
              {[
                `24/7 Emergency Service Available in ${city.name}`,
                `Doorstep Service Across ${city.name} — ${city.areas.slice(0, 3).join(", ")} & more`,
                "Both Car & Bike Service",
                "Certified & Background-Verified Technicians",
              ].map((point) => (
                <div key={point} className="flex items-center gap-2">
                  <CheckCircle className="w-5 h-5 text-green-600 flex-shrink-0" />
                  <span className="text-gray-800">{point}</span>
                </div>
              ))}
            </div>

            <div className="flex flex-wrap gap-4 pt-4">
              <Link href={`/${city.slug}#contact`} className="bg-blue-600 text-white px-8 py-3 rounded-lg hover:bg-blue-700 transition-colors font-semibold">
                Book Service Now
              </Link>
              <a href={`tel:${city.phone}`} className="bg-red-600 text-white px-8 py-3 rounded-lg hover:bg-red-700 transition-colors font-semibold">
                Call Now — {city.phone}
              </a>
            </div>
          </div>

          {/* Right */}
          <div className="relative">
            <div className="rounded-2xl overflow-hidden shadow-2xl h-[500px] w-full relative">
              <Image
                src="/assets/Car_mechanic_700x1049.webp"
                alt={`Professional mechanic performing doorstep car repair in ${city.name}`}
                fill
                className="object-cover"
                priority
                sizes="(max-width: 768px) 100vw, 50vw"
              />
            </div>

            <div className="absolute inset-0 flex items-center justify-center">
              <div className="bg-white bg-opacity-90 p-6 rounded-xl shadow-xl w-[90%] max-w-sm backdrop-blur-sm">
                <h2 className="text-lg font-bold text-gray-900 mb-1">
                  Repair at Your Doorstep in {city.name}
                </h2>
                <p className="text-xs text-gray-500 mb-4">We call back in under 2 minutes</p>
                <label htmlFor={`mobile-${city.slug}`} className="block text-sm font-medium text-gray-700 mb-1">
                  Mobile Number
                </label>
                <input
                  type="tel"
                  id={`mobile-${city.slug}`}
                  placeholder={city.phone}
                  className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-600 mb-4"
                />
                <Link href={`/${city.slug}#contact`} className="block w-full bg-blue-600 text-white py-2.5 rounded-lg font-semibold hover:bg-blue-700 transition-colors text-center">
                  Request Service
                </Link>
              </div>
            </div>

            <div className="absolute -bottom-6 -left-6 bg-yellow-400 text-gray-900 p-5 rounded-xl shadow-lg">
              <p className="text-3xl font-bold">20+</p>
              <p className="text-xs font-semibold">Years Experience</p>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

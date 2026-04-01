import Link from "next/link";
import Image from "next/image";
import { CheckCircle, MapPin, Star } from "lucide-react";
import { MAIN_PHONE } from "@/lib/constants";
import { features, avatars } from "@/lib/data/homepageData";

export function Hero() {
  return (
    <section className="relative bg-gradient-to-br from-blue-50 to-blue-100 py-12 overflow-hidden">
      <div className="container mx-auto px-4">
        <div className="grid md:grid-cols-2 gap-12 items-center">

          {/* Left */}
          <div className="space-y-6">
            <div className="inline-flex items-center gap-2 bg-red-600 text-white px-4 py-2 rounded-full text-sm font-semibold">
              <MapPin className="w-4 h-4" />
              Bengaluru · Chennai · Hyderabad · Mumbai
            </div>

            <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold text-gray-900 leading-tight">
              24/7 Doorstep Car & Bike Repair Service
            </h1>

            <p className="text-lg text-gray-700">
              Professional car and bike repair at your doorstep — anywhere in India.
              Certified technicians, honest pricing, and reliable repairs at your home or office, anytime.
            </p>

            <div className="space-y-3">
              {features.map((point) => (
                <div key={point} className="flex items-center gap-2">
                  <CheckCircle className="w-5 h-5 text-green-600 flex-shrink-0" />
                  <span className="text-gray-800">{point}</span>
                </div>
              ))}
            </div>

            <div className="flex items-center gap-4 pt-2">
              <div className="flex -space-x-2">
                {avatars.map((initials) => (
                  <div key={initials} className="w-9 h-9 rounded-full bg-blue-600 border-2 border-white flex items-center justify-center text-white text-xs font-bold">
                    {initials}
                  </div>
                ))}
              </div>
              <div>
                <div className="flex gap-0.5">
                  {[...Array(5)].map((_, i) => <Star key={i} className="w-4 h-4 fill-yellow-400 text-yellow-400" />)}
                </div>
                <p className="text-sm text-gray-600 font-medium">10,000+ happy customers across India</p>
              </div>
            </div>

            <div className="flex flex-wrap gap-4 pt-2">
              <Link href="/contact#contact-form" className="bg-blue-600 text-white px-8 py-3 rounded-lg hover:bg-blue-700 transition-colors font-semibold">
                Book Service Now
              </Link>
              <a href={`tel:${MAIN_PHONE}`} className="bg-red-600 text-white px-8 py-3 rounded-lg hover:bg-red-700 transition-colors font-semibold">
                Call Now — Free
              </a>
            </div>
          </div>

          {/* Right */}
          <div className="relative">
            <div className="relative rounded-2xl overflow-hidden shadow-2xl h-[500px] w-full">
              <Image
                src="/assets/Car_mechanic_700x1049.webp"
                alt="Certified mechanic performing doorstep car repair in India"
                fill
                className="object-cover"
                priority
                sizes="(max-width: 768px) 100vw, 50vw"
              />
            </div>

            {/* Quick booking form overlay */}
            <div className="absolute inset-0 flex items-center justify-center">
              <div className="bg-white bg-opacity-90 p-6 rounded-xl shadow-xl w-[90%] max-w-sm backdrop-blur-sm">
                <h2 className="text-lg font-bold text-gray-900 mb-1">Book Doorstep Repair</h2>
                <p className="text-xs text-gray-500 mb-4">We call back in under 2 minutes</p>

                <label htmlFor="mobile" className="block text-sm font-medium text-gray-700 mb-1">Mobile Number</label>
                <input
                  type="tel"
                  id="mobile"
                  name="mobile"
                  placeholder="+91 98765 43210"
                  className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-600 mb-3"
                />

                <label htmlFor="city-select" className="block text-sm font-medium text-gray-700 mb-1">Your City</label>
                <select id="city-select" name="city" className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-600 mb-4">
                  <option value="">Select your city</option>
                  <option>Bengaluru</option>
                  <option>Chennai</option>
                  <option>Hyderabad</option>
                  <option>Mumbai</option>
                </select>

                <Link href="/contact" className="block w-full bg-blue-600 text-white py-2.5 rounded-lg font-semibold hover:bg-blue-700 transition-colors text-center">
                  Request Service Now
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

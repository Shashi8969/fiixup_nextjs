// components/service/Hero.tsx

import Link from "next/link";
import { Phone } from "lucide-react";

export default function Hero({
  service,
  Icon,
  // ADDED: Accept category data
  categoryTitle,
  CategoryIcon,
  bgAccent,
  accentBlue,
  bgLight
}: any) {
  return (
    <section className={`${bgLight} py-6 border-b border-gray-300`}>
      <div className="container mx-auto px-4">
        
        {/* Breadcrumb */}
        <nav className="flex items-center gap-2 text-sm text-gray-500 mb-6">
          <Link href="/">Home</Link>
          <span>/</span>
          <Link href="/services">Services</Link>
          <span>/</span>
          <span className="text-gray-900 font-medium">
            {service.shortTitle}
          </span>
        </nav>

        <div className="grid md:grid-cols-2 gap-12 items-center">
          <div>
            <span className={`inline-block ${bgAccent} text-white text-xs font-bold px-3 py-1 rounded-full uppercase tracking-wide mb-4`}>
{categoryTitle || (service.category === 'car' ? 'Car Service' : 'Bike Service')}            
</span>

            <h1 className="text-3xl md:text-4xl font-bold text-gray-900 mb-3">
              {service.title}
            </h1>

            <p className="text-lg text-gray-600 mb-6">
              {service.tagline}
            </p>

            {/* Pricing row (UNCHANGED) */}
            <div className="flex flex-wrap gap-6 mb-8">
              <div>
                <p className={`text-2xl font-bold ${accentBlue}`}>
                  Starting {service.price}
                </p>
                <p className="text-sm text-gray-600 font-medium">Transparent pricing</p>
              </div>
              <div className="w-px bg-gray-200" />
              <div>
                <p className="text-2xl font-bold text-gray-900">
                  {service.duration}
                </p>
                <p className="text-xs text-gray-500">Estimated time</p>
              </div>
              <div className="w-px bg-gray-200" />
              <div>
                <p className="text-2xl font-bold text-green-600">24/7</p>
                <p className="text-xs text-gray-500">Available</p>
              </div>
            </div>

            <div className="flex flex-wrap gap-3">
              <Link href="/contact#contact-form" className={`${bgAccent} text-white px-8 py-3 rounded-lg font-bold`}>
                Book This Service
              </Link>

              <a href="tel:+918197459732" className="bg-white border-2 border-gray-200 text-gray-800 px-6 py-3 rounded-lg font-bold flex items-center gap-2">
                <Phone className="w-4 h-4" /> Call Now
              </a>
            </div>
          </div>

          <div className="hidden md:flex justify-center">
            <div className="bg-white rounded-3xl shadow-xl p-16">
              {Icon && <Icon className={`w-36 h-36 ${accentBlue}`} />}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

// =====================================================================
// FILE: components/city/CityAboutDynamic.tsx
// =====================================================================

import Image from 'next/image';
import { Users, Clock, ThumbsUp, Award } from 'lucide-react';
import type { CityHubPageData } from '@/lib/cityPages';

export function CityAboutDynamic({ data }: { data: CityHubPageData }) {
  const iconMap = { Users, Clock, ThumbsUp, Award };

  const highlights = data.serviceHighlights ?? [];

  return (
    <section id="about" className="py-20 bg-white">
      <div className="container mx-auto px-4">
        <div className="grid lg:grid-cols-2 gap-16 items-center mb-16">

          {/* Text */}
          <div className="order-2 lg:order-1">
            <span className="inline-block text-blue-600 text-sm font-semibold uppercase tracking-widest mb-3">
              About Fiixup in {data.cityName}
            </span>
            <h2 className="text-3xl md:text-4xl font-extrabold text-gray-900 mb-6 leading-tight">
              {data.aboutHeading ?? `Why {data.cityName} Trusts Fiixup`}
            </h2>
            {data.aboutPara1 && (
              <p className="text-lg text-gray-600 mb-5 leading-relaxed">{data.aboutPara1}</p>
            )}
            {data.aboutPara2 && (
              <p className="text-lg text-gray-600 mb-8 leading-relaxed">{data.aboutPara2}</p>
            )}

            {/* Bullets */}
            {(data.aboutBullets ?? []).length > 0 && (
              <ul className="space-y-4">
                {data.aboutBullets.map((b, i) => (
                  <li key={i} className="flex items-start gap-3">
                    <div className="w-2 h-2 bg-blue-600 rounded-full mt-2.5 flex-shrink-0" aria-hidden="true" />
                    <div>
                      <p className="font-bold text-gray-900 mb-0.5">{b.heading}</p>
                      <p className="text-gray-500 text-sm leading-relaxed">{b.text}</p>
                    </div>
                  </li>
                ))}
              </ul>
            )}
          </div>

          {/* Image */}
          <div className="order-1 lg:order-2">
            <div className="rounded-2xl overflow-hidden shadow-xl h-[400px] relative">
              <Image
                src={data.aboutImageUrl ?? '/assets/carservice.webp'}
                alt={data.aboutImageAlt ?? `Auto repair service in ${data.cityName}`}
                fill
                className="object-cover"
                sizes="(max-width: 768px) 100vw, 50vw"
              />
            </div>
          </div>
        </div>

        {/* Stats grid */}
        <div className="grid grid-cols-2 lg:grid-cols-4 gap-5 mb-12">
          {[
            { icon: Users,    value: data.statsCustomers ?? '10,000+',    label: 'Happy Customers' },
            { icon: Clock,    value: '24/7',                              label: 'Service Available' },
            { icon: ThumbsUp, value: data.statsSatisfaction ?? '98%',     label: 'Customer Satisfaction' },
            { icon: Award,    value: data.statsCoverage ?? `${(data.areas ?? []).length}+ Areas`, label: data.statsLabel ?? `${data.cityName} Coverage` },
          ].map((stat, i) => (
            <div key={i} className="bg-gray-50 border border-gray-100 rounded-2xl p-6 text-center hover:shadow-md transition-shadow">
              <stat.icon className="w-9 h-9 text-blue-600 mx-auto mb-3" aria-hidden="true" />
              <p className="text-3xl font-extrabold text-gray-900 mb-1">{stat.value}</p>
              <p className="text-sm text-gray-500 font-medium">{stat.label}</p>
            </div>
          ))}
        </div>

        {/* City-specific service highlights */}
        {highlights.length > 0 && (
          <div className="grid md:grid-cols-2 gap-5">
            {highlights.map((h, i) => (
              <div key={i} className="bg-blue-50 border border-blue-100 rounded-2xl p-6">
                <h3 className="font-bold text-blue-900 text-lg mb-2">{h.title}</h3>
                <p className="text-blue-800 text-sm leading-relaxed">{h.description}</p>
              </div>
            ))}
          </div>
        )}
      </div>
    </section>
  );
}

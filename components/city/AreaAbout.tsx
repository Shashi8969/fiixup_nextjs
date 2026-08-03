import Image from 'next/image';
import { Users, Clock, ThumbsUp, MapPin } from 'lucide-react';
import type { AreaHubPageData } from '@/lib/areaPages';

export function AreaAbout({ data }: { data: AreaHubPageData }) {
  return (
    <section id="about" className="py-20 bg-white">
      <div className="container mx-auto px-4">
        <div className="grid lg:grid-cols-2 gap-16 items-center mb-16">
          <div className="order-2 lg:order-1">
            <span className="inline-block text-blue-600 text-sm font-semibold uppercase tracking-widest mb-3">
              About Fiixup in {data.areaName}
            </span>
            <h2 className="text-3xl md:text-4xl font-extrabold text-gray-900 mb-6 leading-tight">
              {data.aboutHeading}
            </h2>
            {data.aboutPara1 && (
              <p className="text-lg text-gray-600 mb-5 leading-relaxed">{data.aboutPara1}</p>
            )}
            {data.aboutPara2 && (
              <p className="text-lg text-gray-600 mb-5 leading-relaxed">{data.aboutPara2}</p>
            )}
            {data.localInsight && (
              <p className="text-base text-gray-500 mb-8 leading-relaxed border-l-2 border-blue-200 pl-4">
                {data.localInsight}
              </p>
            )}

            {data.trustPoints.length > 0 && (
              <ul className="space-y-3">
                {data.trustPoints.map((point, i) => (
                  <li key={i} className="flex items-start gap-3">
                    <div className="w-2 h-2 bg-blue-600 rounded-full mt-2.5 flex-shrink-0" aria-hidden="true" />
                    <p className="text-gray-700">{point}</p>
                  </li>
                ))}
              </ul>
            )}
          </div>

          <div className="order-1 lg:order-2">
            <div className="rounded-2xl overflow-hidden shadow-xl h-[400px] relative">
              <Image
                src="/assets/carservice.webp"
                alt={`Doorstep auto repair in ${data.areaName}, ${data.cityName}`}
                fill
                className="object-cover"
                sizes="(max-width: 768px) 100vw, 50vw"
              />
            </div>
          </div>
        </div>

        <div className="grid grid-cols-2 lg:grid-cols-4 gap-5">
          {[
            { icon: Users, value: data.statsCustomers ?? `${data.cityName} customers`, label: 'Happy Customers' },
            { icon: Clock, value: '24/7', label: 'Service Available' },
            { icon: ThumbsUp, value: data.statsSatisfaction ?? '—', label: 'Customer Satisfaction' },
            { icon: MapPin, value: data.statsCoverage ?? data.cityName, label: `${data.cityName} Coverage` },
          ].map((stat, i) => (
            <div key={i} className="bg-gray-50 border border-gray-100 rounded-2xl p-6 text-center hover:shadow-md transition-shadow">
              <stat.icon className="w-9 h-9 text-blue-600 mx-auto mb-3" aria-hidden="true" />
              <p className="text-3xl font-extrabold text-gray-900 mb-1">{stat.value}</p>
              <p className="text-sm text-gray-500 font-medium">{stat.label}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

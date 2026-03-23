import Image from "next/image";
import { Award, Users, ThumbsUp, Clock } from "lucide-react";
import type { CityData } from "@/lib/cities";

export function CityAbout({ city }: { city: CityData }) {
  const stats = [
    { icon: Users,    value: "10,000+", label: "Happy Customers"      },
    { icon: Clock,    value: "24/7",    label: "Service Available"     },
    { icon: ThumbsUp, value: "98%",     label: "Customer Satisfaction" },
    { icon: Award,    value: "100%",    label: city.statsLabel         },
  ];

  return (
    <section id="about" className="py-20 bg-gray-50">
      <div className="container mx-auto px-4">

        <div className="grid md:grid-cols-2 gap-12 items-center mb-16">
          <div className="order-2 md:order-1">
            <h2 className="text-3xl md:text-4xl font-bold mb-6 text-gray-900">{city.aboutHeading}</h2>
            <p className="text-lg text-gray-700 mb-6">{city.aboutPara1}</p>
            <p className="text-lg text-gray-700 mb-6">{city.aboutPara2}</p>
            <div className="space-y-4">
              {city.aboutBullets.map((bullet) => (
                <div key={bullet.heading} className="flex items-start gap-3">
                  <div className="w-2 h-2 bg-blue-600 rounded-full mt-2 flex-shrink-0" />
                  <div>
                    <h4 className="font-semibold mb-1 text-gray-900">{bullet.heading}</h4>
                    <p className="text-gray-600">{bullet.text}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>

          <div className="order-1 md:order-2">
            <div className="rounded-2xl overflow-hidden shadow-xl relative h-[380px]">
              <Image
                src="/assets/carservice.webp"
                alt={`Auto repair service in ${city.name}`}
                fill
                className="object-cover"
                sizes="(max-width: 768px) 100vw, 50vw"
              />
            </div>
          </div>
        </div>

        {/* Stats */}
        <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-8">
          {stats.map((stat) => (
            <div key={stat.label} className="bg-white p-6 rounded-xl shadow-md text-center">
              <stat.icon className="w-10 h-10 text-blue-600 mx-auto mb-3" />
              <p className="text-3xl font-bold text-gray-900 mb-1">{stat.value}</p>
              <p className="text-gray-600">{stat.label}</p>
            </div>
          ))}
        </div>

        {/* City-specific highlights */}
        <div className="grid md:grid-cols-2 gap-6 mt-12">
          {city.cityServiceHighlights.map((highlight) => (
            <div key={highlight.title} className="bg-blue-50 border border-blue-100 rounded-xl p-6">
              <h3 className="font-bold text-lg text-blue-900 mb-2">{highlight.title}</h3>
              <p className="text-blue-800 text-sm leading-relaxed">{highlight.description}</p>
            </div>
          ))}
        </div>

      </div>
    </section>
  );
}

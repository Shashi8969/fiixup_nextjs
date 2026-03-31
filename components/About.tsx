import Image from "next/image";
import { CheckCircle } from "lucide-react";
import { aboutContent, stats, highlights, steps } from "@/lib/data/about";

export function About() {
  return (
    <section id="about" className="py-12 bg-gray-50">
      <div className="container mx-auto px-4">

        <div className="grid md:grid-cols-2 gap-12 items-center mb-16">

          {/* Left — content */}
          <div className="order-2 md:order-1">
            <h2 className="text-3xl md:text-4xl font-bold mb-6 text-gray-900">
              {aboutContent.title}
            </h2>
            <p className="text-lg text-gray-700 mb-4">
              {aboutContent.description1}
            </p>
            <p className="text-lg text-gray-700 mb-8">
              {aboutContent.description2}
            </p>
            <div className="space-y-5">
              {highlights.map((item) => (
                <div key={item.heading} className="flex items-start gap-3">
                  <CheckCircle className="w-5 h-5 text-green-600 mt-1 flex-shrink-0" />
                  <div>
                    <h3 className="font-semibold mb-1 text-gray-900">{item.heading}</h3>
                    <p className="text-gray-600 text-sm">{item.text}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Right — image */}
          <div className="order-1 md:order-2">
            <div className="rounded-2xl overflow-hidden shadow-xl relative h-[420px]">
              <Image
                src="/assets/carservice.webp"
                alt={aboutContent.imageAlt}
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

        {/* How it works */}
        <div className="mt-16">
          <h3 className="text-2xl font-bold text-center mb-10 text-gray-900">
            {aboutContent.sections.howItWorks}
          </h3>
          <div className="grid sm:grid-cols-2 md:grid-cols-4 gap-8">
            {steps.map(({ n, title, desc }) => (
              <div key={n} className="text-center">
                <div className="w-14 h-14 bg-blue-600 text-white rounded-full flex items-center justify-center mx-auto mb-4 text-2xl font-bold shadow-md">
                  {n}
                </div>
                <h4 className="font-bold text-gray-900 mb-2">{title}</h4>
                <p className="text-gray-600 text-sm">{desc}</p>
              </div>
            ))}
          </div>
        </div>

      </div>
    </section>
  );
}
import Link from "next/link";
import Image from "next/image";
import { CheckCircle, MapPin, Star } from "lucide-react";
import { MAIN_PHONE } from "@/lib/constants";
import type { HomeHeroData } from "@/lib/homepage";
import { HeroBookingForm } from "@/components/HeroBookingForm";

type HeroProps = {
  data: HomeHeroData;
  mainPhone?: string;
};

export function Hero({ data, mainPhone = MAIN_PHONE }: HeroProps) {
  return (
    <section className="relative bg-gradient-to-br from-blue-50 to-blue-100 py-12 overflow-hidden">
      <div className="container mx-auto px-4">
        <div className="grid md:grid-cols-2 gap-12 items-center">

          {/* Lead with the page promise on mobile; the booking form follows it. */}
          <div className="order-1 space-y-6">
            <div className="inline-flex items-center gap-2 bg-red-600 text-white px-4 py-2 rounded-full text-sm font-semibold">
              <MapPin className="w-4 h-4" />
              {data.badgeText}
            </div>

            <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold text-gray-900 leading-tight">
              {data.heading}
            </h1>

            <p className="text-lg text-gray-700">
              {data.subheading}
            </p>

            <div className="space-y-3">
              {data.features.map((point) => (
                <div key={point} className="flex items-center gap-2">
                  <CheckCircle className="w-5 h-5 text-green-600 flex-shrink-0" />
                  <span className="text-gray-800">{point}</span>
                </div>
              ))}
            </div>

            <div className="flex items-center gap-4 pt-2">
              <div className="flex -space-x-2">
                {data.avatars.map((initials) => (
                  <div key={initials} className="w-9 h-9 rounded-full bg-blue-600 border-2 border-white flex items-center justify-center text-white text-xs font-bold">
                    {initials}
                  </div>
                ))}
              </div>
              <div>
                <div className="flex gap-0.5">
                  {[...Array(5)].map((_, i) => (
                    <Star key={i} className="w-4 h-4 fill-yellow-400 text-yellow-400" />
                  ))}
                </div>
                <p className="text-sm text-gray-600 font-medium">
                  {data.reviewText}
                </p>
              </div>
            </div>

            <div className="flex flex-wrap gap-4 pt-2">
              <Link href={data.primaryCtaHref} className="bg-blue-600 text-white px-8 py-3 rounded-lg hover:bg-blue-700 transition-colors font-semibold">
                {data.primaryCtaLabel}
              </Link>
              <a href={`tel:${mainPhone}`} className="bg-red-600 text-white px-8 py-3 rounded-lg hover:bg-red-700 transition-colors font-semibold">
                {data.secondaryCtaLabel}
              </a>
            </div>
          </div>

          {/* RIGHT — image + booking form */}
          <div className="order-2 relative">
            <div className="relative rounded-2xl overflow-hidden shadow-2xl h-[500px] w-full">
              <Image
                src={data.imageUrl}
                alt={data.imageAlt}
                fill
                className="object-cover"
                priority
                fetchPriority="high"
                sizes="(max-width: 768px) 100vw, 50vw"
              />
            </div>

            <HeroBookingForm data={data} />

            {/* ✅ YOUR BADGE (UNCHANGED POSITION) */}
            <div className="absolute -bottom-6 left-4 md:-left-6 bg-yellow-400 text-gray-900 p-4 sm:p-5 rounded-xl shadow-lg">
              <p className="text-3xl font-bold">{data.experienceValue}</p>
              <p className="text-xs font-semibold">{data.experienceLabel}</p>
            </div>

          </div>
        </div>
      </div>
    </section>
  );
}

"use client";
import Link from "next/link";
import Image from "next/image";
import { CheckCircle, MapPin, Star } from "lucide-react";
import { MAIN_PHONE } from "@/lib/constants";
import { useState } from "react";
import { submitLead } from "@/lib/send-lead";
import type { HomeHeroData } from "@/lib/homepage";

type HeroProps = {
  data: HomeHeroData;
  mainPhone?: string;
};

export function Hero({ data, mainPhone = MAIN_PHONE }: HeroProps) {

  // ✅ State (correct place)
  const [isSuccess, setIsSuccess] = useState(false);

  // ✅ Submit handler
  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    const form = e.currentTarget;
    const formData = new FormData(form);

    const now = new Date().toLocaleString("en-IN", {
      dateStyle: "medium",
      timeStyle: "short",
    });

    formData.set("request_time", now);
    formData.set("form_type", "Hero Quick Booking");
    formData.set("name", "Not provided");
    formData.set("vehicle", "Not specified");
    formData.set("service", "Quick Booking");
    formData.set("message", "User submitted from Hero section");

    try {
      await submitLead(formData);
      setIsSuccess(true);
      form.reset();
      setTimeout(() => setIsSuccess(false), 4000);
    } catch (err) {
      console.error(err);
      alert("Failed. Call us instead.");
    }
  };

  return (
    <section className="relative bg-gradient-to-br from-blue-50 to-blue-100 py-12 overflow-hidden">
      <div className="container mx-auto px-4">
        <div className="grid md:grid-cols-2 gap-12 items-center">

          {/* LEFT */}
          <div className="space-y-6">
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

          {/* RIGHT */}
          <div className="relative">
            <div className="relative rounded-2xl overflow-hidden shadow-2xl h-[560px] sm:h-[520px] md:h-[500px] w-full">
              <Image
                src={data.imageUrl}
                alt={data.imageAlt}
                fill
                className="object-cover"
                priority
                sizes="(max-width: 768px) 100vw, 50vw"
              />
            </div>

            {/* FORM OVERLAY */}
            <div className="absolute inset-0 flex items-center justify-center px-4">
              <div className="w-full max-w-sm">
                {!isSuccess ? (
                  <div className="bg-white/90 p-5 sm:p-6 rounded-xl shadow-xl backdrop-blur-sm">
                    <h2 className="text-lg sm:text-xl font-bold text-gray-900 mb-2 leading-snug">
                      {data.formTitle}
                    </h2>

                    <p className="text-xs sm:text-sm text-gray-600 mb-4 leading-relaxed">
                      {data.formSubtitle}
                    </p>

                    <form onSubmit={handleSubmit} className="space-y-3">
                      <div>
                        <label className="block text-sm font-medium text-gray-700 mb-1">
                          Mobile Number
                        </label>
                        <input
                          type="tel"
                          name="phone"
                          required
                          placeholder="+91 98765 43210"
                          className="w-full px-3 py-2.5 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-600 bg-white text-gray-900"
                        />
                      </div>

                      <div>
                        <label
                          htmlFor="city"
                          className="block text-sm font-medium text-gray-700 mb-1"
                        >
                          Your City
                        </label>

                        <select
                          id="city"
                          name="city"
                          required
                          defaultValue=""
                          className="w-full px-3 py-2.5 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-600 bg-white text-gray-900"
                        >
                          <option value="" disabled>Select your city</option>
                          {data.cityOptions.map((city) => (
                            <option key={city} value={city}>{city}</option>
                          ))}
                        </select>
                      </div>

                      <input type="hidden" name="request_time" />
                      <input type="hidden" name="form_type" value="Hero Quick Booking" />

                      <button
                        type="submit"
                        className="w-full bg-blue-600 text-white py-3 rounded-lg font-semibold hover:bg-blue-700 transition-colors"
                      >
                        Request Service Now
                      </button>
                    </form>
                  </div>
                ) : (
                  <div className="bg-white/90 p-6 rounded-xl shadow-xl backdrop-blur-sm min-h-[260px] flex flex-col items-center justify-center text-center">
                    <div className="text-4xl mb-2">✅</div>

                    <h3 className="text-lg font-bold text-green-700">
                      {data.successTitle}
                    </h3>

                    <p className="text-sm text-gray-600 mt-1">
                      {data.successText}
                    </p>
                  </div>
                )}
              </div>
            </div>

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

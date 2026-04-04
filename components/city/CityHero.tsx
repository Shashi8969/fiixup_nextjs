"use client";

import Link from "next/link";
import Image from "next/image";
import { CheckCircle, MapPin } from "lucide-react";
import { useState } from "react";
import type { CityData } from "@/lib/models/city.model";

export function CityHero({ city }: { city: CityData }) {
  const [phone, setPhone] = useState("");
  const [loading, setLoading] = useState(false);
  const [success, setSuccess] = useState(false);
  const [showError, setShowError] = useState(false); // Added missing state

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setLoading(true);

    const now = new Date().toLocaleString("en-IN", {
      dateStyle: "medium",
      timeStyle: "short",
    });

    const templateParams = {
      phone,
      city: city.name,
      form_type: "City Hero Form",
      request_time: now,
      name: "Not provided",
      service: "Callback Request",
    };

    import("@emailjs/browser").then((emailjs) => {
      emailjs.default
        .send(
          process.env.NEXT_PUBLIC_EMAILJS_SERVICE_ID!,
          process.env.NEXT_PUBLIC_EMAILJS_TEMPLATE_ID_CONTACT!,
          templateParams,
          process.env.NEXT_PUBLIC_EMAILJS_PUBLIC_KEY!
        )
        .then(() => {
          setSuccess(true);
          setPhone("");
          setLoading(false);
          setTimeout(() => setSuccess(false), 4000);
        })
        .catch(() => {
          setLoading(false);
          setShowError(true);
          alert("Failed. Please call instead.");
        });
    });
  };

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
                // SEO FIX: Handle both String and Object areas safely
                `Doorstep Service Across ${city.name} — ${city.areas.slice(0, 3).map((a: any) => typeof a === 'string' ? a : a.name).join(", ")} & more`,
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
              <Link
                href={`/${city.slug}#contact`}
                className="bg-blue-600 text-white px-8 py-3 rounded-lg hover:bg-blue-700 transition-colors font-semibold"
              >
                Book Service Now
              </Link>

              <a
                href={`tel:${city.phone}`}
                className="bg-red-600 text-white px-8 py-3 rounded-lg hover:bg-red-700 transition-colors font-semibold"
              >
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

            {/* FORM CARD */}
            <div className="absolute inset-0 flex items-center justify-center">
              <div className="bg-white bg-opacity-90 p-6 rounded-xl shadow-xl w-[90%] max-w-sm backdrop-blur-sm">

                {!success ? (
                  <>
                    <h2 className="text-lg font-bold text-gray-900 mb-1">
                      Repair at Your Doorstep in {city.name}
                    </h2>

                    <p className="text-xs text-gray-500 mb-4">
                      We call back in under 2 minutes
                    </p>

                    <form onSubmit={handleSubmit}>
                      <label className="block text-sm font-medium text-gray-700 mb-1">
                        Mobile Number
                      </label>

                      <input
                        type="tel"
                        value={phone}
                        onChange={(e) => setPhone(e.target.value)}
                        placeholder={city.phone}
                        required
                        className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-600 mb-4"
                      />

                      <p className="text-xs text-green-600 mb-2">
                        ⚡ 92% users get callback within 120 seconds
                      </p>

                      <button
                        type="submit"
                        disabled={loading}
                        className="w-full bg-blue-600 text-white py-2.5 rounded-lg font-semibold hover:bg-blue-700 transition-colors"
                      >
                        {loading ? "Sending..." : "Get Call in 2 Minutes"}
                      </button>
                    </form>
                  </>
                ) : (
                  <div className="text-center py-6">
                    <div className="text-3xl mb-2">✅</div>
                    <h3 className="font-bold text-green-700">
                      Request Sent!
                    </h3>
                    <p className="text-sm text-gray-600 mt-1">
                      Our team will call you shortly 🚀
                    </p>
                  </div>
                )}

              </div>
            </div>

            {/* EXPERIENCE BADGE */}
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
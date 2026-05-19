"use client";

import Link from "next/link";
import Image from "next/image";
import { CheckCircle, MapPin, Shield, Clock, Zap, Star } from "lucide-react";
import { useState } from "react";
import type { CityHubPageData } from "@/lib/cityPages";

// ── Defaults (used when DB columns are empty) ─────────────────────────────────
const DEFAULT_BULLETS = (cityName: string, areaNames: string[]) => [
  `24/7 Emergency Service Available in ${cityName}`,
  `Doorstep Service Across ${cityName} — ${areaNames.slice(0, 2).join(", ")} & more`,
  "Both Car & Bike Service",
  "Experienced & Background-Verified Technicians",
];

const DEFAULT_STATS = (data: CityHubPageData) => [
  { value: data.statsCustomers    ?? "5,000+", label: "Happy Customers"   },
  { value: "24/7",                             label: "Service Available" },
  { value: data.statsSatisfaction ?? "98%",    label: "Satisfaction Rate" },
  {
    value: data.statsCoverage ?? `${data.areas?.length ?? 50}+ Areas`,
    label: data.statsLabel    ?? "City Coverage",
  },
];

// ── Component ─────────────────────────────────────────────────────────────────
export function CityHeroDynamic({ data }: { data: CityHubPageData }) {
  const [phone,   setPhone]   = useState("");
  const [loading, setLoading] = useState(false);
  const [success, setSuccess] = useState(false);

  const areaNames = (data.areas ?? []).map((a) => a.name);

  const bullets = (data.heroBullets as string[] | undefined)?.length
    ? (data.heroBullets as string[])
    : DEFAULT_BULLETS(data.cityName, areaNames);

  const stats = (
    data.heroStats as { value: string; label: string }[] | undefined
  )?.length
    ? (data.heroStats as { value: string; label: string }[])
    : DEFAULT_STATS(data);

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setLoading(true);

    const now = new Date().toLocaleString("en-IN", {
      dateStyle: "medium",
      timeStyle: "short",
    });

    import("@emailjs/browser").then((emailjs) => {
      emailjs.default
        .send(
          process.env.NEXT_PUBLIC_EMAILJS_SERVICE_ID!,
          process.env.NEXT_PUBLIC_EMAILJS_TEMPLATE_ID_CONTACT!,
          {
            phone,
            city:         data.cityName,
            form_type:    "City Hero Form",
            request_time: now,
            name:         "Not provided",
            service:      "Callback Request",
          },
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
          alert("Failed. Please call instead.");
        });
    });
  };

  return (
    <section className="relative bg-gradient-to-br from-blue-50 to-blue-100 py-12 overflow-hidden">
      <div className="container mx-auto px-4">
        <div className="grid md:grid-cols-2 gap-12 items-center">

          {/* ── LEFT COLUMN ─────────────────────────────────── */}
          <div className="space-y-6">

            {/* City badge */}
            <div className="inline-flex items-center gap-2 bg-red-600 text-white px-4 py-2 rounded-full text-sm font-semibold">
              <MapPin className="w-4 h-4 flex-shrink-0" aria-hidden="true" />
              {data.heroTagline ?? `Now Serving ${data.cityName}`}
            </div>

            {/* H1 — unique per city, from DB */}
            <h1 className="text-4xl md:text-5xl font-bold text-gray-900 leading-tight">
              {data.heroHeading ??
                `24/7 Doorstep Auto Repair Service in ${data.cityName}`}
            </h1>

            {/* Sub-copy — city-specific from DB */}
            <p className="text-lg text-gray-700">
              {data.aboutPara1 ??
                `Professional car and bike repair at your doorstep in ${data.cityName}. Quality service, honest pricing, and reliable repairs anywhere in ${data.cityName}, anytime.`}
            </p>

            {/* Bullet checklist — from DB heroBullets */}
            <div className="space-y-3">
              {bullets.map((point, i) => (
                <div key={i} className="flex items-center gap-2">
                  <CheckCircle
                    className="w-5 h-5 text-green-600 flex-shrink-0"
                    aria-hidden="true"
                  />
                  <span className="text-gray-800">{point}</span>
                </div>
              ))}
            </div>

            {/* CTA buttons */}
            <div className="flex flex-wrap gap-4 pt-4">
              <Link
                href={`/${data.citySlug}#contact`}
                className="bg-blue-600 text-white px-8 py-3 rounded-lg hover:bg-blue-700 transition-colors font-semibold"
              >
                Book Service Now
              </Link>
              <a
                href={`tel:${data.cityPhone}`}
                className="bg-red-600 text-white px-8 py-3 rounded-lg hover:bg-red-700 transition-colors font-semibold"
              >
                Call Now {data.cityPhone}
              </a>
            </div>

            {/* Trust strip */}
            <div className="flex flex-wrap gap-5 text-sm text-gray-500">
              <span className="flex items-center gap-1.5">
                <Shield className="w-4 h-4 text-blue-500" aria-hidden="true" />
                30-day warranty
              </span>
              <span className="flex items-center gap-1.5">
                <Clock className="w-4 h-4 text-blue-500" aria-hidden="true" />
                30–60 min response
              </span>
              <span className="flex items-center gap-1.5">
                <Zap className="w-4 h-4 text-blue-500" aria-hidden="true" />
                No hidden charges
              </span>
            </div>
          </div>

          {/* ── RIGHT COLUMN ─────────────────────────────────── */}
          <div className="relative">

            {/* Tall image card — identical to original */}
            <div className="rounded-2xl overflow-hidden shadow-2xl h-[500px] w-full relative">
              <Image
                src={data.heroImageUrl ?? "/assets/Car_mechanic_700x1049.webp"}
                alt={
                  data.heroImageAlt ??
                  `Professional mechanic performing doorstep car repair in ${data.cityName}`
                }
                fill
                className="object-cover"
                priority
                sizes="(max-width: 768px) 100vw, 50vw"
              />
            </div>

            {/* Floating form card — centred over image, identical to original */}
            <div className="absolute inset-0 flex items-center justify-center">
              <div className="bg-white bg-opacity-90 p-6 rounded-xl shadow-xl w-[90%] max-w-sm backdrop-blur-sm">
                {!success ? (
                  <>
                    <h2 className="text-lg font-bold text-gray-900 mb-1">
                      Repair at Your Doorstep in {data.cityName}
                    </h2>
                    <p className="text-xs text-gray-500 mb-4">
                      We call back in under 2 minutes
                    </p>

                    <form onSubmit={handleSubmit}>
                      <label
                        htmlFor="hero-phone"
                        className="block text-sm font-medium text-gray-700 mb-1"
                      >
                        Mobile Number
                      </label>
                      <input
                        id="hero-phone"
                        type="tel"
                        value={phone}
                        onChange={(e) => setPhone(e.target.value)}
                        placeholder={data.cityPhone ?? "e.g. 98765 43210"}
                        required
                        pattern="[6-9]\d{9}"
                        maxLength={10}
                        className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-600 mb-4"
                      />

                      <p className="text-xs text-green-600 mb-2 flex items-center gap-1">
                        <Star
                          className="w-3 h-3 text-yellow-400 fill-yellow-400"
                          aria-hidden="true"
                        />
                        92% users get callback within 120 seconds
                      </p>

                      <button
                        type="submit"
                        disabled={loading}
                        className="w-full bg-blue-600 text-white py-2.5 rounded-lg font-semibold hover:bg-blue-700 transition-colors disabled:opacity-60"
                      >
                        {loading ? "Sending..." : "Get Call in 2 Minutes"}
                      </button>
                    </form>
                  </>
                ) : (
                  <div className="text-center py-6">
                    <div className="text-3xl mb-2">✅</div>
                    <h3 className="font-bold text-green-700">Request Sent!</h3>
                    <p className="text-sm text-gray-600 mt-1">
                      Our team will call you shortly 🚀
                    </p>
                  </div>
                )}
              </div>
            </div>

            {/* Experience badge — bottom-left, identical to original */}
            <div className="absolute -bottom-6 -left-6 bg-yellow-400 text-gray-900 p-5 rounded-xl shadow-lg">
              <p className="text-3xl font-bold">20+</p>
              <p className="text-xs font-semibold">Years Experience</p>
            </div>
          </div>

        </div>

        {/* ── STATS BAR ── */}
        <div className="mt-16 grid grid-cols-2 lg:grid-cols-4 gap-4">
          {stats.map((s, i) => (
            <div
              key={i}
              className="bg-white rounded-xl p-4 text-center shadow-sm border border-gray-100 hover:shadow-md transition-shadow"
            >
              <p className="text-2xl md:text-3xl font-extrabold text-blue-700">
                {s.value}
              </p>
              <p className="text-xs md:text-sm text-gray-500 mt-1 font-medium">
                {s.label}
              </p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

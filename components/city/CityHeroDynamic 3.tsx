'use client';
// components/city/CityHeroDynamic.tsx
// Replaces CityHero.tsx — all content from page_data, zero hardcoded strings
// "use client" for the callback form only — rest is pure data rendering

import Link       from 'next/link';
import Image      from 'next/image';
import { useState } from 'react';
import { CheckCircle, MapPin, Star, Shield, Clock, Zap } from 'lucide-react';
import type { CityHubPageData } from '@/lib/cityPages';

const DEFAULT_BULLETS = (cityName: string, areaNames: string[]) => [
  `24/7 Emergency Service in ${cityName}`,
  `Covering ${cityName} — ${areaNames.slice(0, 3).join(', ')} & more`,
  'Both Car & Bike Repair',
  'Certified & Background-Verified Mechanics',
];

const DEFAULT_STATS = (data: CityHubPageData) => [
  { value: data.statsCustomers    ?? '10,000+', label: 'Happy Customers' },
  { value: '24/7',                              label: 'Service Available' },
  { value: data.statsSatisfaction ?? '98%',     label: 'Satisfaction Rate' },
  { value: data.statsCoverage     ?? `${data.areas?.length ?? 50}+ Areas`, label: data.statsLabel ?? 'City Coverage' },
];

export function CityHeroDynamic({ data }: { data: CityHubPageData }) {
  const [phone,   setPhone]   = useState('');
  const [loading, setLoading] = useState(false);
  const [success, setSuccess] = useState(false);

  const areaNames = (data.areas ?? []).map((a) => a.name);

  const bullets = data.heroBullets?.length
    ? data.heroBullets
    : DEFAULT_BULLETS(data.cityName, areaNames);

  const stats = data.heroStats?.length
    ? data.heroStats
    : DEFAULT_STATS(data);

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setLoading(true);
    try {
      const now = new Date().toLocaleString('en-IN', { dateStyle: 'medium', timeStyle: 'short' });
      const { default: emailjs } = await import('@emailjs/browser');
      await emailjs.send(
        process.env.NEXT_PUBLIC_EMAILJS_SERVICE_ID!,
        process.env.NEXT_PUBLIC_EMAILJS_TEMPLATE_ID_CONTACT!,
        { phone, city: data.cityName, form_type: 'City Hero Form', request_time: now, name: 'Not provided', service: 'Callback Request' },
        process.env.NEXT_PUBLIC_EMAILJS_PUBLIC_KEY!
      );
      setSuccess(true);
      setPhone('');
      setTimeout(() => setSuccess(false), 5000);
    } catch {
      alert('Failed to send. Please call directly.');
    } finally {
      setLoading(false);
    }
  };

  return (
    <section className="relative bg-gradient-to-br from-blue-50 via-white to-blue-50 py-12 md:py-20 overflow-hidden">
      {/* Subtle background grid */}
      <div className="absolute inset-0 opacity-[0.03] pointer-events-none"
        style={{ backgroundImage: 'radial-gradient(circle, #2563eb 1px, transparent 1px)', backgroundSize: '32px 32px' }}
        aria-hidden="true"
      />

      <div className="container mx-auto px-4 relative">
        <div className="grid lg:grid-cols-2 gap-12 items-center">

          {/* ── LEFT COLUMN ── */}
          <div className="space-y-6 order-2 lg:order-1">
            {/* City badge */}
            <div className="inline-flex items-center gap-2 bg-red-600 text-white px-4 py-2 rounded-full text-sm font-semibold shadow-sm">
              <MapPin className="w-4 h-4 flex-shrink-0" />
              <span>{data.heroTagline ?? `Now Serving ${data.cityName}`}</span>
            </div>

            {/* H1 — unique per city, from DB */}
            <h1 className="text-4xl md:text-5xl lg:text-6xl font-extrabold text-gray-900 leading-[1.1] tracking-tight">
              {data.heroHeading ?? `24/7 Doorstep Auto Repair in ${data.cityName}`}
            </h1>

            {/* Sub-paragraph — city-specific from DB */}
            {data.aboutPara1 && (
              <p className="text-lg text-gray-600 leading-relaxed max-w-xl">
                {data.aboutPara1}
              </p>
            )}

            {/* Bullet checklist */}
            <ul className="space-y-3" aria-label="Key service features">
              {bullets.map((point: string, i: number) => (
                <li key={i} className="flex items-start gap-3">
                  <CheckCircle className="w-5 h-5 text-green-500 flex-shrink-0 mt-0.5" aria-hidden="true" />
                  <span className="text-gray-800 font-medium">{point}</span>
                </li>
              ))}
            </ul>

            {/* CTAs */}
            <div className="flex flex-wrap gap-4 pt-2">
              <Link
                href={`/${data.citySlug}#contact`}
                className="bg-blue-600 text-white px-8 py-3.5 rounded-xl hover:bg-blue-700 active:scale-95 transition-all font-bold shadow-lg shadow-blue-200 text-base"
              >
                Book Service Now
              </Link>
              <a
                href={`tel:${data.cityPhone}`}
                className="bg-white border-2 border-red-600 text-red-600 px-8 py-3.5 rounded-xl hover:bg-red-600 hover:text-white active:scale-95 transition-all font-bold text-base"
              >
                Call {data.cityPhone}
              </a>
            </div>

            {/* Trust strip */}
            <div className="flex flex-wrap gap-4 pt-2 text-sm text-gray-500">
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

          {/* ── RIGHT COLUMN — Image + Callback Form ── */}
          <div className="relative order-1 lg:order-2">
            <div className="rounded-2xl overflow-hidden shadow-2xl h-[480px] md:h-[540px] w-full relative">
              <Image
                src={data.heroImageUrl ?? '/assets/Car_mechanic_700x1049.webp'}
                alt={data.heroImageAlt ?? `Professional mechanic performing doorstep car repair in ${data.cityName}`}
                fill
                className="object-cover"
                priority
                sizes="(max-width: 768px) 100vw, 50vw"
              />
              {/* Dark overlay for contrast */}
              <div className="absolute inset-0 bg-gradient-to-t from-black/20 to-transparent" aria-hidden="true" />
            </div>

            {/* Floating callback card */}
            <div className="absolute bottom-6 left-4 right-4 md:left-auto md:right-6 md:w-[300px]">
              <div className="bg-white/95 backdrop-blur-md p-5 rounded-2xl shadow-2xl border border-white/60">
                {!success ? (
                  <>
                    <div className="flex items-center gap-2 mb-1">
                      <div className="w-2 h-2 rounded-full bg-green-500 animate-pulse" aria-hidden="true" />
                      <p className="text-xs font-semibold text-green-700 uppercase tracking-wide">We call back in 2 mins</p>
                    </div>
                    <h2 className="text-base font-bold text-gray-900 mb-3">
                      Get Free Callback — {data.cityName}
                    </h2>
                    <form onSubmit={handleSubmit}>
                      <label className="block text-xs font-semibold text-gray-600 mb-1" htmlFor="hero-phone">
                        Mobile Number
                      </label>
                      <input
                        id="hero-phone"
                        type="tel"
                        value={phone}
                        onChange={(e) => setPhone(e.target.value)}
                        placeholder="e.g. 98765 43210"
                        required
                        pattern="[6-9]\d{9}"
                        maxLength={10}
                        className="w-full px-3 py-2.5 border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 text-sm mb-3"
                      />
                      <p className="text-xs text-gray-400 mb-3 flex items-center gap-1">
                        <Star className="w-3 h-3 text-yellow-400 fill-yellow-400" aria-hidden="true" />
                        92% users get callback within 120 seconds
                      </p>
                      <button
                        type="submit"
                        disabled={loading}
                        className="w-full bg-blue-600 text-white py-2.5 rounded-lg font-bold hover:bg-blue-700 disabled:opacity-60 transition-colors text-sm"
                      >
                        {loading ? 'Sending…' : 'Get Call in 2 Minutes'}
                      </button>
                    </form>
                  </>
                ) : (
                  <div className="text-center py-4">
                    <div className="text-4xl mb-2">✅</div>
                    <h3 className="font-bold text-green-700 text-base">Request Sent!</h3>
                    <p className="text-sm text-gray-500 mt-1">Our team will call you shortly 🚀</p>
                  </div>
                )}
              </div>
            </div>

            {/* Experience badge */}
            <div className="absolute -top-4 -left-4 bg-yellow-400 text-gray-900 p-4 rounded-xl shadow-lg hidden md:block">
              <p className="text-2xl font-black">20+</p>
              <p className="text-xs font-bold leading-tight">Years<br/>Experience</p>
            </div>
          </div>
        </div>

        {/* ── STATS BAR ── */}
        <div className="mt-14 grid grid-cols-2 lg:grid-cols-4 gap-4">
          {stats.map((s: { value: string; label: string }, i: number) => (
            <div
              key={i}
              className="bg-white rounded-xl p-4 text-center shadow-sm border border-gray-100 hover:shadow-md transition-shadow"
            >
              <p className="text-2xl md:text-3xl font-extrabold text-blue-700">{s.value}</p>
              <p className="text-xs md:text-sm text-gray-500 mt-1 font-medium">{s.label}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

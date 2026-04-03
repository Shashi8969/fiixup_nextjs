"use client";

import { useRef, useState } from "react";
import emailjs from "@emailjs/browser";
import { MapPin, Phone, Mail, Clock } from "lucide-react";
import type { CityData } from "@/lib/models/city.model";
import { MAIN_EMAIL, TRUST_BADGES } from "@/lib/constants";

const serviceOptions = [
  "General Car Repair", "Brake Service", "Oil Change", "Engine Diagnostics",
  "AC Service", "Battery & Electrical", "Bike General Service", "Engine Repair",
  "Electrical Works", "Parts Replacement", "Brake & Clutch", "Regular Maintenance",
  "Emergency / Breakdown", "Towing Service", "Other",
];

export function CityContact({ city }: { city: CityData }) {
  const form = useRef<HTMLFormElement>(null);
  const [showError, setShowError] = useState(false);
  const [loading, setLoading] = useState(false);
  const [showSuccess, setShowSuccess] = useState(false);

  const sendEmail = (e: React.FormEvent) => {
    e.preventDefault();
    if (!form.current) return;

    const now = new Date().toLocaleString("en-IN", {
      dateStyle: "medium",
      timeStyle: "short",
    });

    const input = form.current.querySelector(
      'input[name="request_time"]'
    ) as HTMLInputElement;

    if (input) input.value = now;

    setLoading(true);
    emailjs
      .sendForm(
        process.env.NEXT_PUBLIC_EMAILJS_SERVICE_ID!,
        process.env.NEXT_PUBLIC_EMAILJS_TEMPLATE_ID_CONTACT!,
        form.current,
        process.env.NEXT_PUBLIC_EMAILJS_PUBLIC_KEY!
      )
      .then(() => {
        setLoading(false);
        setShowSuccess(true);
        form.current?.reset();
        setTimeout(() => setShowSuccess(false), 4000);
      })
      .catch(() => {
        setLoading(false);
        setShowError(true);
        setTimeout(() => setShowError(false), 4000);
      });
  };

  return (
    <section id="contact" className="py-20 bg-white">
      <div className="container mx-auto px-4">
        <div className="text-center mb-16">
          <h2 className="text-3xl md:text-4xl font-bold mb-4 text-gray-900">
            Book Doorstep Service in {city.name}
          </h2>
          <p className="text-lg text-gray-600 max-w-2xl mx-auto">
            Available 24/7 across {city.name}. Call us or book online — we respond within 2 minutes.
          </p>
        </div>

        <div className="grid md:grid-cols-2 gap-12 max-w-5xl mx-auto">

          {/* Info */}
          <div className="space-y-6">
            <div className="flex items-start gap-4">
              <div className="bg-blue-100 p-3 rounded-lg flex-shrink-0"><MapPin className="w-6 h-6 text-blue-600" /></div>
              <div>
                <h3 className="font-semibold mb-1 text-gray-900">Service Area in {city.name}</h3>
                <p className="text-gray-600">{city.areas.join(", ")} & all areas citywide</p>
              </div>
            </div>
            <div className="flex items-start gap-4">
              <div className="bg-blue-100 p-3 rounded-lg flex-shrink-0"><Phone className="w-6 h-6 text-blue-600" /></div>
              <div>
                <h3 className="font-semibold mb-1 text-gray-900">Phone (24/7 {city.name})</h3>
                <a href={`tel:${city.phone}`} className="text-blue-600 font-semibold hover:underline">{city.phone}</a>
              </div>
            </div>
            <div className="flex items-start gap-4">
              <div className="bg-blue-100 p-3 rounded-lg flex-shrink-0"><Mail className="w-6 h-6 text-blue-600" /></div>
              <div>
                <h3 className="font-semibold mb-1 text-gray-900">Email</h3>
                <a href={`mailto:${city.email}`} className="text-blue-600 hover:underline">{city.email}</a>
              </div>
            </div>
            <div className="flex items-start gap-4">
              <div className="bg-blue-100 p-3 rounded-lg flex-shrink-0"><Clock className="w-6 h-6 text-blue-600" /></div>
              <div>
                <h3 className="font-semibold mb-1 text-gray-900">Service Hours</h3>
                <p className="text-gray-600">24/7 — All days including holidays<br />Emergency & scheduled bookings</p>
              </div>
            </div>
            <div className="bg-blue-50 rounded-xl p-5 space-y-2">
              {TRUST_BADGES.map((badge) => (
                <p key={badge} className="text-sm text-gray-700 font-medium">{badge}</p>
              ))}
            </div>
          </div>

          {/* Form */}
          <div className="bg-gray-50 p-8 rounded-xl">
            <h3 className="text-xl font-semibold mb-6 text-gray-900">Book Service in {city.name}</h3>

            {showSuccess && (
              <div className="mb-4 bg-green-50 border border-green-200 text-green-800 rounded-lg p-4 text-sm font-medium">
                ✅ Booking received! We'll call you back within 2 minutes.
              </div>
            )}
            {showError && (
              <div className="mb-4 bg-red-50 border border-red-200 text-red-800 rounded-lg p-4 text-sm font-medium">
                ❌ Something went wrong. Please call {city.phone} directly.
              </div>
            )}

            <form ref={form} onSubmit={sendEmail} className="space-y-4">
              <input type="hidden" name="city_name" value={city.name} />

              {[
                { label: "Name", name: "name", type: "text", placeholder: "Your name" },
                { label: "Phone", name: "phone", type: "tel", placeholder: city.phone },
              ].map(({ label, name, type, placeholder }) => (
                <div key={name}>
                  <label className="block text-sm font-medium mb-1 text-gray-700">{label}</label>
                  <input type={type} name={name} required placeholder={placeholder}
                    className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-600 focus:outline-none" />
                </div>
              ))}

              <div>
                <label className="block text-sm font-medium mb-1 text-gray-700">Vehicle Type</label>
                <select name="vehicle" required className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-600 focus:outline-none">
                  <option value="">Select vehicle type</option>
                  <option>Car</option>
                  <option>Bike</option>
                </select>
              </div>

              <div>
                <label className="block text-sm font-medium mb-1 text-gray-700">Service Needed</label>
                <select name="service" required className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-600 focus:outline-none">
                  <option value="">Select a service</option>
                  {serviceOptions.map((s) => <option key={s}>{s}</option>)}
                </select>
              </div>
              <input type="hidden" name="city" value={city.name} />
              <input type="hidden" name="form_type" value={`${city.name} Contact Form`} />
              <input type="hidden" name="request_time" />
              <input type="hidden" name="source" value="City Contact Page" />
              <div>
                <label className="block text-sm font-medium mb-1 text-gray-700">Message (optional)</label>
                <textarea name="message" rows={3} placeholder="Describe the issue or your location..."
                  className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-600 focus:outline-none resize-none" />
              </div>

              <button type="submit" disabled={loading}
                className="w-full bg-blue-600 text-white py-3 rounded-lg font-semibold hover:bg-blue-700 transition-colors disabled:opacity-60">
                {loading ? "Sending..." : `Book Service in ${city.name}`}
              </button>
            </form>
          </div>
        </div>
      </div>
    </section>
  );
}

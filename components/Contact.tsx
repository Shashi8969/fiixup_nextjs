"use client";

import React, { useRef, useState } from "react";
import emailjs from "@emailjs/browser";
import { MapPin, Phone, Mail, Clock } from "lucide-react";
import { MAIN_PHONE, MAIN_PHONE_DISPLAY, MAIN_EMAIL, CITIES_LIST, TRUST_BADGES } from "@/lib/constants";
import { SERVICE_OPTIONS } from "@/lib/data/serviceOptions";
import { SectionHeader } from "@/components/ui/SectionHeader";

emailjs.init(process.env.NEXT_PUBLIC_EMAILJS_PUBLIC_KEY!);

function useEmailForm() {
  const form = useRef<HTMLFormElement>(null);
  const [loading, setLoading] = useState(false);
  const [showSuccess, setShowSuccess] = useState(false);
  const [showError, setShowError] = useState(false);

  const sendEmail = (e: React.FormEvent) => {
    e.preventDefault();
    if (!form.current) return;
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

  return { form, loading, showSuccess, showError, sendEmail };
}

interface ContactInfoItem {
  Icon: React.ElementType;
  title: string;
  content: string;
  href?: string;
}

const contactInfo: ContactInfoItem[] = [
  { Icon: MapPin, title: "Cities We Serve",  content: `${CITIES_LIST.join(" · ")}\nMore cities coming soon!` },
  { Icon: Phone,  title: "Phone (24/7)",     content: MAIN_PHONE_DISPLAY, href: `tel:${MAIN_PHONE}`       },
  { Icon: Mail,   title: "Email",            content: MAIN_EMAIL,         href: `mailto:${MAIN_EMAIL}`    },
  { Icon: Clock,  title: "Service Hours",    content: "24/7 — All days including holidays\nEmergency & scheduled bookings" },
];

export function Contact() {
  const { form, loading, showSuccess, showError, sendEmail } = useEmailForm();

  return (
    <section id="contact" className="py-20 bg-white">
      <div className="container mx-auto px-4">
        <SectionHeader
          heading="Book Your Doorstep Auto Repair"
          subtext={`Available 24/7 across ${CITIES_LIST.join(", ")} & more. Book online or call us — we respond within 2 minutes.`}
        />

        <div className="grid md:grid-cols-2 gap-12 max-w-5xl mx-auto">

          {/* Contact Info */}
          <div className="space-y-6">
            {contactInfo.map(({ Icon, title, content, href }) => (
              <div key={title} className="flex items-start gap-4">
                <div className="bg-blue-100 p-3 rounded-lg flex-shrink-0">
                  <Icon className="w-6 h-6 text-blue-600" />
                </div>
                <div>
                  <h3 className="font-semibold mb-1 text-gray-900">{title}</h3>
                  {href ? (
                    <a href={href} className="text-blue-600 font-semibold hover:underline">{content}</a>
                  ) : (
                    <p className="text-gray-600 whitespace-pre-line">{content}</p>
                  )}
                </div>
              </div>
            ))}

            <div className="bg-blue-50 rounded-xl p-5 space-y-2">
              {TRUST_BADGES.map((badge) => (
                <p key={badge} className="text-sm text-gray-700 font-medium">{badge}</p>
              ))}
            </div>
          </div>

          {/* Booking Form */}
          <div className="bg-gray-50 p-8 rounded-xl" id="contact-form">
            <h3 className="text-xl font-semibold mb-6 text-gray-900">Book Doorstep Service</h3>

            {showSuccess && (
              <div className="mb-4 bg-green-50 border border-green-200 text-green-800 rounded-lg p-4 text-sm font-medium">
                ✅ Booking received! We&apos;ll call you back within 2 minutes.
              </div>
            )}
            {showError && (
              <div className="mb-4 bg-red-50 border border-red-200 text-red-800 rounded-lg p-4 text-sm font-medium">
                ❌ Something went wrong. Please call us at {MAIN_PHONE_DISPLAY}.
              </div>
            )}

            <form ref={form} onSubmit={sendEmail} className="space-y-4">
              <input type="hidden" name="form_type" value="Contact Form For Booking" />
              <input type="hidden" name="request_time" value={new Date().toLocaleString("en-IN", { dateStyle: "medium", timeStyle: "short" })} />

              {[
                { id: "contact-name",  label: "Name",    name: "name",  type: "text",  placeholder: "Your name",         autoComplete: "name" },
                { id: "contact-phone", label: "Phone",   name: "phone", type: "tel",   placeholder: "+91 81974 59732",   autoComplete: "tel"  },
              ].map(({ id, label, name, type, placeholder, autoComplete }) => (
                <div key={id}>
                  <label htmlFor={id} className="block text-sm font-medium mb-1 text-gray-700">{label}</label>
                  <input
                    id={id} name={name} type={type} required
                    placeholder={placeholder} autoComplete={autoComplete}
                    className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-600 focus:outline-none"
                  />
                </div>
              ))}

              <div>
                <label htmlFor="contact-city" className="block text-sm font-medium mb-1 text-gray-700">Your City</label>
                <select id="contact-city" name="city" required defaultValue="" autoComplete="address-level2"
                  className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-600 focus:outline-none"
                >
                  <option value="" disabled>Select your city</option>
                  {CITIES_LIST.map((c) => <option key={c} value={c}>{c}</option>)}
                </select>
              </div>

              <div>
                <label htmlFor="contact-vehicle" className="block text-sm font-medium mb-1 text-gray-700">Vehicle Type</label>
                <select id="contact-vehicle" name="vehicle" required autoComplete="off"
                  className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-600 focus:outline-none"
                >
                  <option value="">Select vehicle type</option>
                  <option>Car</option>
                  <option>Bike</option>
                </select>
              </div>

              <div>
                <label htmlFor="contact-service" className="block text-sm font-medium mb-1 text-gray-700">Service Needed</label>
                <select id="contact-service" name="service" required autoComplete="off"
                  className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-600 focus:outline-none"
                >
                  <option value="">Select a service</option>
                  {SERVICE_OPTIONS.map((s) => <option key={s}>{s}</option>)}
                </select>
              </div>

              <div>
                <label htmlFor="contact-message" className="block text-sm font-medium mb-1 text-gray-700">Message (optional)</label>
                <textarea
                  id="contact-message" name="message" rows={3}
                  placeholder="Describe the issue..." autoComplete="off"
                  className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-600 focus:outline-none resize-none"
                />
              </div>

              <button
                type="submit" disabled={loading}
                className="w-full bg-blue-600 text-white py-3 rounded-lg font-semibold hover:bg-blue-700 transition-colors disabled:opacity-60 disabled:cursor-not-allowed"
              >
                {loading ? "Sending…" : "Book Service Now"}
              </button>
            </form>
          </div>
        </div>
      </div>
    </section>
  );
}

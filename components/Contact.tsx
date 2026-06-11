"use client";

import React, { useRef, useState } from "react";
import { submitLead } from "@/lib/send-lead";
import { MapPin, Phone, Mail, Clock } from "lucide-react";

import {
  MAIN_PHONE,
  MAIN_PHONE_DISPLAY,
  MAIN_EMAIL,
  CITIES_LIST,
  TRUST_BADGES
} from "@/lib/constants";
import type { HomeContactData } from "@/lib/homepage";
import type { PublicSiteSettings } from "@/lib/site-settings";

import { SERVICE_OPTIONS } from "@/lib/data/serviceOptions";
import { SectionHeader } from "@/components/ui/SectionHeader";


function useEmailForm() {

  const form = useRef<HTMLFormElement>(null);

  const [loading, setLoading] = useState(false);
  const [showSuccess, setShowSuccess] = useState(false);
  const [showError, setShowError] = useState(false);

  const sendEmail = async (e: React.FormEvent) => {

    e.preventDefault();

    if (!form.current) return;

    setLoading(true);

    const requestTime = new Date().toLocaleString("en-IN", {
      dateStyle: "medium",
      timeStyle: "short",
    });

    const formData = new FormData(form.current);

    formData.set("request_time", requestTime);

    try {
      await submitLead(formData);

      setShowSuccess(true);
      form.current?.reset();
      setTimeout(() => setShowSuccess(false), 4000);
    } catch {
      setShowError(true);
      setTimeout(() => setShowError(false), 4000);
    } finally {
      setLoading(false);
    }
  };

  return {
    form,
    loading,
    showSuccess,
    showError,
    sendEmail
  };
}

interface ContactInfoItem {
  Icon: React.ElementType;
  title: string;
  content: string;
  href?: string;
}

function buildContactInfo(data: HomeContactData | undefined, siteSettings: Pick<PublicSiteSettings, "mainPhone" | "mainPhoneDisplay" | "mainEmail"> | undefined): ContactInfoItem[] {
  const cities = data?.cities?.length ? data.cities : [...CITIES_LIST];
  const mainPhone = siteSettings?.mainPhone || MAIN_PHONE;
  const mainPhoneDisplay = siteSettings?.mainPhoneDisplay || MAIN_PHONE_DISPLAY;
  const mainEmail = siteSettings?.mainEmail || MAIN_EMAIL;

  return [
    {
      Icon: MapPin,
      title: "Cities We Serve",
      content: `${cities.join(" · ")}
Doorstep mechanic support expanding to more cities soon`
    },
    {
      Icon: Phone,
      title: "24/7 Booking Support",
      content: mainPhoneDisplay,
      href: `tel:${mainPhone}`
    },
    {
      Icon: Mail,
      title: "Customer Support Email",
      content: mainEmail,
      href: `mailto:${mainEmail}`
    },
    {
      Icon: Clock,
      title: "Available Anytime",
      content:
        "24/7 support for emergency breakdowns, roadside assistance, puncture repair, battery problems, and scheduled vehicle servicing"
    },
  ];
}

type ContactProps = {
  data?: HomeContactData;
  siteSettings?: Pick<PublicSiteSettings, "mainPhone" | "mainPhoneDisplay" | "mainEmail">;
};

export function Contact({ data, siteSettings }: ContactProps = {}) {

  const {
    form,
    loading,
    showSuccess,
    showError,
    sendEmail
  } = useEmailForm();

  const cities = data?.cities?.length ? data.cities : [...CITIES_LIST];
  const contactInfo = buildContactInfo(data, siteSettings);
  const trustBadges = data?.trustBadges?.length ? data.trustBadges : [...TRUST_BADGES];
  const heading = data?.heading || "Book a Nearby Car or Bike Mechanic at Your Location";
  const subtext = data?.subtext || `Need help with a dead battery, puncture, engine issue, oil change, brake problem, or vehicle not starting? Fiixup provides doorstep car and bike repair services across ${cities.join(", ")}. Mechanics arrive at your home, office, apartment parking, or roadside location for quick repair and servicing support.`;
  const formTitle = data?.formTitle || "Request Doorstep Repair or Vehicle Service";
  const formSubtitle = data?.formSubtitle || "Share your vehicle issue and our nearby mechanic team will contact you shortly for booking confirmation and assistance.";
  const successText = data?.successText || "✅ Booking request received successfully. Our team will contact you shortly.";
  const errorText = data?.errorText || `❌ Unable to send your request right now. Please call us directly at ${siteSettings?.mainPhoneDisplay || MAIN_PHONE_DISPLAY}.`;

  return (

    <section id="contact" className="py-20 bg-white">

      <div className="container mx-auto px-4">

        <SectionHeader
          heading={heading}
          subtext={subtext}
        />

        <div className="grid md:grid-cols-2 gap-12 max-w-5xl mx-auto">

          {/* LEFT SIDE */}

          <div className="space-y-6">

            {contactInfo.map(({ Icon, title, content, href }) => (

              <div
                key={title}
                className="flex items-start gap-4"
              >

                <div className="bg-blue-100 p-3 rounded-lg flex-shrink-0">

                  <Icon className="w-6 h-6 text-blue-600" />

                </div>

                <div>

                  <h3 className="font-semibold mb-1 text-gray-900">
                    {title}
                  </h3>

                  {href ? (

                    <a
                      href={href}
                      className="text-blue-600 font-semibold hover:underline"
                    >
                      {content}
                    </a>

                  ) : (

                    <p className="text-gray-600 whitespace-pre-line">
                      {content}
                    </p>

                  )}

                </div>

              </div>
            ))}

            {/* TRUST BADGES */}

            <div className="bg-blue-50 rounded-xl p-5 space-y-3">

              {trustBadges.map((badge) => (

                <p
                  key={badge}
                  className="text-sm text-gray-700 font-medium"
                >
                  {badge}
                </p>

              ))}

            </div>

          </div>

          {/* FORM */}

          <div
            className="bg-gray-50 p-8 rounded-xl"
            id="contact-form"
          >

            <h3 className="text-xl font-semibold mb-2 text-gray-900">
              {formTitle}
            </h3>

            <p className="text-sm text-gray-600 mb-6">
              {formSubtitle}
            </p>

            {showSuccess && (

              <div className="mb-4 bg-green-50 border border-green-200 text-green-800 rounded-lg p-4 text-sm font-medium">

                {successText}

              </div>

            )}

            {showError && (

              <div className="mb-4 bg-red-50 border border-red-200 text-red-800 rounded-lg p-4 text-sm font-medium">

                {errorText}

              </div>

            )}

            <form
              ref={form}
              onSubmit={sendEmail}
              className="space-y-4"
            >

              <input
                type="hidden"
                name="form_type"
                value="Doorstep Mechanic Booking Form"
              />

              <input
                type="hidden"
                name="request_time"
                value=""
              />

              {[
                {
                  id: "contact-name",
                  label: "Your Name",
                  name: "name",
                  type: "text",
                  placeholder: "Enter your name",
                  autoComplete: "name"
                },

                {
                  id: "contact-phone",
                  label: "Mobile Number",
                  name: "phone",
                  type: "tel",
                  placeholder: "+91 98765 43210",
                  autoComplete: "tel"
                },

              ].map(({
                id,
                label,
                name,
                type,
                placeholder,
                autoComplete
              }) => (

                <div key={id}>

                  <label
                    htmlFor={id}
                    className="block text-sm font-medium mb-1 text-gray-700"
                  >
                    {label}
                  </label>

                  <input
                    id={id}
                    name={name}
                    type={type}
                    required
                    placeholder={placeholder}
                    autoComplete={autoComplete}
                    className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-600 focus:outline-none"
                  />

                </div>
              ))}

              {/* CITY */}

              <div>

                <label
                  htmlFor="contact-city"
                  className="block text-sm font-medium mb-1 text-gray-700"
                >
                  Select Your City
                </label>

                <select
                  id="contact-city"
                  name="city"
                  required
                  defaultValue=""
                  autoComplete="address-level2"
                  className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-600 focus:outline-none"
                >

                  <option value="" disabled>
                    Choose your city
                  </option>

                  {cities.map((c) => (
                    <option key={c} value={c}>
                      {c}
                    </option>
                  ))}

                </select>

              </div>

              {/* VEHICLE */}

              <div>

                <label
                  htmlFor="contact-vehicle"
                  className="block text-sm font-medium mb-1 text-gray-700"
                >
                  Vehicle Type
                </label>

                <select
                  id="contact-vehicle"
                  name="vehicle"
                  required
                  autoComplete="off"
                  className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-600 focus:outline-none"
                >

                  <option value="">
                    Select vehicle type
                  </option>

                  <option>
                    Car
                  </option>

                  <option>
                    Bike
                  </option>

                </select>

              </div>

              {/* SERVICE */}

              <div>

                <label
                  htmlFor="contact-service"
                  className="block text-sm font-medium mb-1 text-gray-700"
                >
                  Service Required
                </label>

                <select
                  id="contact-service"
                  name="service"
                  required
                  autoComplete="off"
                  className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-600 focus:outline-none"
                >

                  <option value="">
                    Select repair or service
                  </option>

                  {SERVICE_OPTIONS.map((s) => (
                    <option key={s}>
                      {s}
                    </option>
                  ))}

                </select>

              </div>

              {/* MESSAGE */}

              <div>

                <label
                  htmlFor="contact-message"
                  className="block text-sm font-medium mb-1 text-gray-700"
                >
                  Describe the Vehicle Problem
                </label>

                <textarea
                  id="contact-message"
                  name="message"
                  rows={3}
                  placeholder="Example: Car battery dead, bike not starting, puncture issue, brake problem..."
                  autoComplete="off"
                  className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-600 focus:outline-none resize-none"
                />

              </div>

              {/* BUTTON */}

              <button
                type="submit"
                disabled={loading}
                className="w-full bg-blue-600 text-white py-3 rounded-lg font-semibold hover:bg-blue-700 transition-colors disabled:opacity-60 disabled:cursor-not-allowed"
              >

                {loading
                  ? "Sending Request..."
                  : "Request Mechanic Now"}

              </button>

            </form>

          </div>

        </div>

      </div>

    </section>
  );
}
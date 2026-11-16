"use client";

import type { FormEvent } from "react";
import { ARRIVAL_PROMISE_NOTE_SHORT } from "@/lib/constants";
import { SERVICE_OPTIONS } from "@/lib/data/serviceOptions";
import { useLeadForm } from "@/lib/hooks/useLeadForm";
import type { HomeHeroData } from "@/lib/homepage";

type HeroBookingData = Pick<
  HomeHeroData,
  | "formTitle"
  | "formSubtitle"
  | "cityOptions"
  | "successTitle"
  | "successText"
>;

export function HeroBookingForm({ data }: { data: HeroBookingData }) {
  const { isSuccess, successMessage, submit } = useLeadForm({
    fallbackSuccessMessage: data.successText,
  });

  const handleSubmit = async (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();

    const form = event.currentTarget;
    const formData = new FormData(form);

    formData.set("name", "Not provided");
    formData.set("vehicle", "Not specified");
    if (!formData.get("service")) formData.set("service", "Quick Booking");
    formData.set("message", "User submitted from Hero section");

    const result = await submit(formData, "Hero Quick Booking");
    if (result.ok) form.reset();
    else alert("Failed. Call us instead.");
  };

  return (
    <div className="absolute inset-0 flex items-center justify-center px-4">
      <div className="w-full max-w-sm">
        {!isSuccess ? (
          <div className="rounded-xl bg-white/90 p-5 shadow-xl backdrop-blur-sm sm:p-6">
            <h2 className="mb-2 text-lg font-bold leading-snug text-gray-900 sm:text-xl">
              {data.formTitle}
            </h2>

            <p className="mb-4 text-xs leading-relaxed text-gray-600 sm:text-sm">
              {data.formSubtitle}
            </p>

            <p className="-mt-2 mb-4 text-[11px] leading-4 text-gray-500">
              {ARRIVAL_PROMISE_NOTE_SHORT}
            </p>

            <form onSubmit={handleSubmit} className="space-y-3">
              <input
                type="text"
                name="website"
                tabIndex={-1}
                autoComplete="off"
                aria-hidden="true"
                style={{ position: "absolute", left: "-9999px", top: 0, width: 1, height: 1, overflow: "hidden" }}
              />

              <div>
                <label className="mb-1 block text-sm font-medium text-gray-700">
                  Mobile Number
                </label>
                <input
                  type="tel"
                  name="phone"
                  required
                  placeholder="+91 98765 43210"
                  className="w-full rounded-lg border border-gray-300 bg-white px-3 py-2.5 text-gray-900 focus:ring-2 focus:ring-blue-600"
                />
              </div>

              <div>
                <label htmlFor="city" className="mb-1 block text-sm font-medium text-gray-700">
                  Your City
                </label>
                <select
                  id="city"
                  name="city"
                  required
                  defaultValue=""
                  className="w-full rounded-lg border border-gray-300 bg-white px-3 py-2.5 text-gray-900 focus:ring-2 focus:ring-blue-600"
                >
                  <option value="" disabled>Select your city</option>
                  {data.cityOptions.map((city) => (
                    <option key={city} value={city}>{city}</option>
                  ))}
                </select>
              </div>

              <div>
                <label htmlFor="hero-service" className="mb-1 block text-sm font-medium text-gray-700">
                  Service Required
                </label>
                <select
                  id="hero-service"
                  name="service"
                  defaultValue=""
                  className="w-full rounded-lg border border-gray-300 bg-white px-3 py-2.5 text-gray-900 focus:ring-2 focus:ring-blue-600"
                >
                  <option value="">Quick Booking</option>
                  {SERVICE_OPTIONS.slice(0, 12).map((service) => (
                    <option key={service} value={service}>{service}</option>
                  ))}
                </select>
              </div>

              <input type="hidden" name="request_time" />
              <input type="hidden" name="form_type" value="Hero Quick Booking" />

              <button
                type="submit"
                className="w-full rounded-lg bg-blue-600 py-3 font-semibold text-white transition-colors hover:bg-blue-700"
              >
                Request Service Now
              </button>
            </form>
          </div>
        ) : (
          <div className="flex min-h-[260px] flex-col items-center justify-center rounded-xl bg-white/90 p-6 text-center shadow-xl backdrop-blur-sm">
            <div className="mb-2 text-4xl">✅</div>
            <h3 className="text-lg font-bold text-green-700">{data.successTitle}</h3>
            <p className="mt-1 text-sm text-gray-600">
              {successMessage || data.successText}
            </p>
          </div>
        )}
      </div>
    </div>
  );
}
"use client";
import Link from "next/link";
import Image from "next/image";
import { CheckCircle, MapPin, Star } from "lucide-react";
import { MAIN_PHONE } from "@/lib/constants";
import { features, avatars } from "@/lib/data/homepageData";
import { useState } from "react";
import { submitLead } from "@/lib/send-lead";

export function Hero() {

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
              Bengaluru · Chennai · Hyderabad · Mumbai
            </div>

            <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold text-gray-900 leading-tight">
  Trusted Doorstep Car & Bike Mechanic Service in Bangalore, Chennai, Hyderabad & Mumbai
</h1>

            <p className="text-lg text-gray-700">
  Stuck with a bike that won’t start? Car battery dead in your apartment parking? 
  Our local mechanics come directly to your home, office, or roadside location for fast car and bike repair services. 
  Available 24/7 for breakdown help, emergency repairs, periodic servicing, battery jumpstart, puncture repair, oil change, and more.
</p>

            <div className="space-y-3">
              {features.map((point) => (
                <div key={point} className="flex items-center gap-2">
                  <CheckCircle className="w-5 h-5 text-green-600 flex-shrink-0" />
                  <span className="text-gray-800">{point}</span>
                </div>
              ))}
            </div>

            <div className="flex items-center gap-4 pt-2">
              <div className="flex -space-x-2">
                {avatars.map((initials) => (
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
  Drivers across Bangalore, Chennai, Hyderabad & Mumbai trust us for quick and reliable doorstep repairs
</p>
              </div>
            </div>

            <div className="flex flex-wrap gap-4 pt-2">
              <Link href="/contact#contact-form" className="bg-blue-600 text-white px-8 py-3 rounded-lg hover:bg-blue-700 transition-colors font-semibold">
                Book Service Now
              </Link>
              <a href={`tel:${MAIN_PHONE}`} className="bg-red-600 text-white px-8 py-3 rounded-lg hover:bg-red-700 transition-colors font-semibold">
                Call Now — Free
              </a>
            </div>
          </div>

          {/* RIGHT */}
          <div className="relative">
            <div className="relative rounded-2xl overflow-hidden shadow-2xl h-[500px] w-full">
              <Image
                src="/assets/Car_mechanic_700x1049.webp"
                alt="Certified mechanic performing doorstep car repair in India"
                fill
                className="object-cover"
                priority
                sizes="(max-width: 768px) 100vw, 50vw"
              />
            </div>

            {/* FORM OVERLAY */}
            <div className="absolute inset-0 flex items-center justify-center">

              {/* FLIP WRAPPER (ONLY THIS PART CHANGED) */}
              <div className="w-[90%] max-w-sm h-[320px] [perspective:1000px]">
                <div
                  className={`relative w-full h-full transition-transform duration-700 [transform-style:preserve-3d] ${isSuccess ? "[transform:rotateY(180deg)]" : ""
                    }`}
                >

                  {/* FRONT */}
                  <div className="absolute w-full h-full [backface-visibility:hidden]">
                    <div className="bg-white bg-opacity-90 p-6 rounded-xl shadow-xl backdrop-blur-sm h-full">

                      <h2 className="text-lg font-bold text-gray-900 mb-1">
Get a Mechanic at Your Location                      </h2>

                      <p className="text-xs text-gray-500 mb-4">
Tell us your issue — our nearby mechanic team will contact you shortly                      </p>

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
                            className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-600"
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
                            className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-600"
                          >
                            <option value="" disabled>Select your city</option>
                            <option value="Bengaluru">Bengaluru</option>
                            <option value="Chennai">Chennai</option>
                            <option value="Hyderabad">Hyderabad</option>
                            <option value="Mumbai">Mumbai</option>
                          </select>
                        </div>

                        <input type="hidden" name="request_time" />
                        <input type="hidden" name="form_type" value="Hero Quick Booking" />

                        <button
                          type="submit"
                          className="w-full bg-blue-600 text-white py-2.5 rounded-lg font-semibold hover:bg-blue-700 transition-colors"
                        >
                          Request Service Now
                        </button>
                      </form>
                    </div>
                  </div>

                  {/* BACK (MATCHED STYLE) */}
                  <div className="absolute w-full h-full [backface-visibility:hidden] [transform:rotateY(180deg)]">
                    <div className="bg-white bg-opacity-90 p-6 rounded-xl shadow-xl backdrop-blur-sm h-full flex flex-col items-center justify-center text-center">

                      <div className="text-4xl mb-2">✅</div>

                      <h3 className="text-lg font-bold text-green-700">
                        Request Sent!
                      </h3>

                      <p className="text-sm text-gray-600 mt-1">
                        Our team will call you within 2 minutes 🚀
                      </p>

                    </div>
                  </div>

                </div>
              </div>
            </div>

            {/* ✅ YOUR BADGE (UNCHANGED POSITION) */}
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
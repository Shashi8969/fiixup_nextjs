"use client";

import { useState, useEffect } from "react";
import { X, Phone } from "lucide-react";

export function QuickServiceModal() {
  const [isOpen, setIsOpen] = useState(false);
  const [phoneNumber, setPhoneNumber] = useState("");

  useEffect(() => {
    const timer = setTimeout(() => {
      const hasSeenModal = sessionStorage.getItem("hasSeenQuickServiceModal");
      if (!hasSeenModal) {
        setIsOpen(true);
      }
    }, 2000);
    return () => clearTimeout(timer);
  }, []);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    console.log("Phone number submitted:", phoneNumber);
    sessionStorage.setItem("hasSeenQuickServiceModal", "true");
    setIsOpen(false);
  };

  const handleClose = () => {
    sessionStorage.setItem("hasSeenQuickServiceModal", "true");
    setIsOpen(false);
  };

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 backdrop-blur-md bg-black/30 flex items-center justify-center z-[100] p-4">
      <div className="bg-white rounded-2xl max-w-md w-full p-8 relative animate-in fade-in zoom-in duration-300">
        <button
          onClick={handleClose}
          className="absolute top-4 right-4 text-gray-400 hover:text-gray-600 transition-colors"
          aria-label="Close modal"
        >
          <X className="w-6 h-6" />
        </button>

        <div className="text-center mb-6">
          <div className="w-16 h-16 bg-blue-100 rounded-full flex items-center justify-center mx-auto mb-4">
            <Phone className="w-8 h-8 text-blue-600" />
          </div>
          <h2 className="text-2xl font-bold mb-2">Need Quick Service?</h2>
          <p className="text-gray-600">
            Share your mobile number and our team will call you back within 1 minute!
          </p>
        </div>

        <form onSubmit={handleSubmit} className="space-y-4">
          <div>
            <label htmlFor="quick-phone" className="block text-sm font-medium mb-2">
              Mobile Number
            </label>
            <input
              type="tel"
              id="quick-phone"
              value={phoneNumber}
              onChange={(e) => setPhoneNumber(e.target.value)}
              placeholder="+91 87227 77367"
              autoComplete="tel"
              className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-600 focus:border-transparent"
              required
            />
          </div>

          <button
            type="submit"
            className="w-full bg-blue-600 text-white py-3 rounded-lg hover:bg-blue-700 transition-colors font-semibold"
          >
            Request Callback
          </button>

          <button
            type="button"
            onClick={handleClose}
            className="w-full text-gray-600 py-2 hover:text-gray-800 transition-colors text-sm"
          >
            Maybe Later
          </button>
        </form>

        <p className="text-xs text-gray-500 text-center mt-4">
          Available 24/7 across Bengaluru, Chennai, Hyderabad & Mumbai
        </p>
      </div>
    </div>
  );
}

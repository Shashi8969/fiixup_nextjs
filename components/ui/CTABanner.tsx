import Link from "next/link";
import { Phone, MessageCircle } from "lucide-react";
import { MAIN_PHONE, MAIN_PHONE_DISPLAY, WHATSAPP_NUMBER } from "@/lib/constants";

interface CTABannerProps {
  heading?: string;
  subtext?: string;
  /** Primary action label */
  callLabel?: string;
  /** Secondary action label */
  waLabel?: string;
  /** Variant styling */
  variant?: "blue" | "dark" | "gradient";
}

const defaultProps = {
  heading: "Need a Mechanic Right Now?",
  subtext: "24/7 doorstep service — we arrive in 30–60 minutes.",
  callLabel: "Call Now",
  waLabel: "WhatsApp Us",
  variant: "blue",
} satisfies CTABannerProps;

const variantClasses: Record<NonNullable<CTABannerProps["variant"]>, string> = {
  blue:     "bg-blue-600 text-white",
  dark:     "bg-gray-950 text-white",
  gradient: "bg-gradient-to-r from-blue-700 to-blue-500 text-white",
};

export function CTABanner({
  heading = defaultProps.heading,
  subtext = defaultProps.subtext,
  callLabel = defaultProps.callLabel,
  waLabel = defaultProps.waLabel,
  variant = defaultProps.variant,
}: CTABannerProps) {
  const waMessage = encodeURIComponent("Hi Fiixup! I need doorstep vehicle repair.");

  return (
    <section className={`py-14 ${variantClasses[variant]}`}>
      <div className="container mx-auto px-4 text-center">
        <h2 className="text-3xl md:text-4xl font-bold mb-3">{heading}</h2>
        <p className="text-lg opacity-90 mb-8">{subtext}</p>
        <div className="flex flex-col sm:flex-row gap-4 justify-center">
          <a
            href={`tel:${MAIN_PHONE}`}
            className="inline-flex items-center justify-center gap-2 bg-white text-blue-700 font-bold px-8 py-4 rounded-xl hover:bg-blue-50 transition shadow-lg text-lg"
          >
            <Phone className="w-5 h-5" />
            {callLabel}: {MAIN_PHONE_DISPLAY}
          </a>
          <a
            href={`https://wa.me/${WHATSAPP_NUMBER}?text=${waMessage}`}
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center justify-center gap-2 bg-green-500 text-white font-bold px-8 py-4 rounded-xl hover:bg-green-600 transition shadow-lg text-lg"
          >
            <MessageCircle className="w-5 h-5" />
            {waLabel}
          </a>
        </div>
      </div>
    </section>
  );
}

/**
 * Compact inline CTA (inside service/city pages, sidebars etc.)
 */
interface InlineCTAProps {
  heading?: string;
  bookHref?: string;
  bookLabel?: string;
}

export function InlineCTA({
  heading = "Ready to Book?",
  bookHref = "/contact",
  bookLabel = "Schedule Service",
}: InlineCTAProps) {
  return (
    <div className="bg-blue-50 border border-blue-100 rounded-2xl p-6 text-center">
      <h3 className="text-xl font-bold text-gray-900 mb-2">{heading}</h3>
      <p className="text-gray-600 text-sm mb-4">
        24/7 doorstep service — arrive in 30–60 min.
      </p>
      <div className="flex flex-col sm:flex-row gap-3 justify-center">
        <a
          href={`tel:${MAIN_PHONE}`}
          className="inline-flex items-center justify-center gap-2 bg-blue-600 text-white font-semibold px-6 py-3 rounded-lg hover:bg-blue-700 transition"
        >
          <Phone className="w-4 h-4" />
          {MAIN_PHONE_DISPLAY}
        </a>
        <Link
          href={bookHref}
          className="inline-flex items-center justify-center gap-2 border border-blue-600 text-blue-600 font-semibold px-6 py-3 rounded-lg hover:bg-blue-50 transition"
        >
          {bookLabel}
        </Link>
      </div>
    </div>
  );
}

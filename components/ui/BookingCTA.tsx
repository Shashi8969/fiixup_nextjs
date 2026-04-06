// components/ui/BookingCTA.tsx
import Link from "next/link";
import { Phone } from "lucide-react"; // adjust import if using another icon lib

interface BookingSectionProps {
  serviceTitle: string;
  bgAccent?: string;
  phoneNumber?: string;
}

export default function BookingSection({
  serviceTitle,
  bgAccent = "bg-blue-600",
  phoneNumber = "+918197459732",
}: BookingSectionProps) {
  return (
    <section className={`py-16 ${bgAccent} text-white text-center`}>
      <div className="container mx-auto px-4">
        <h2 className="text-3xl font-bold mb-3">
          Ready to Book {serviceTitle}?
        </h2>
        <p className="text-white/80 mb-8 text-lg">
          Certified technicians available 24/7 across Bengaluru, Chennai, Hyderabad & Mumbai.
        </p>
        <div className="flex flex-wrap gap-4 justify-center">
          <Link
            href="/contact#contact-form"
            className="bg-white text-gray-900 px-8 py-3 rounded-lg font-bold hover:bg-gray-100 transition-colors"
          >
            Book Service Now
          </Link>
          <a
            href={`tel:${phoneNumber}`}
            className="bg-black/20 text-white border border-white/30 px-8 py-3 rounded-lg font-bold hover:bg-black/30 transition-colors flex items-center gap-2"
          >
            <Phone className="w-4 h-4" /> {phoneNumber}
          </a>
        </div>
      </div>
    </section>
  );
}
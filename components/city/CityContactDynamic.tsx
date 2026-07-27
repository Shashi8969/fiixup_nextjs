// =====================================================================
// FILE: components/city/CityContactDynamic.tsx
// =====================================================================

import Link from 'next/link';
import { Phone, MessageCircle, MapPin, Mail } from 'lucide-react';
import type { CityHubPageData } from '@/lib/cityPages';
import { WHATSAPP_NUMBER } from '@/lib/constants';

export function CityContactDynamic({ data }: { data: CityHubPageData }) {
  return (
    <section id="contact" className="py-16 bg-gradient-to-br from-blue-700 to-blue-900 text-white">
      <div className="container mx-auto px-4">
        <div className="grid lg:grid-cols-2 gap-12 items-center">

          {/* Left — headline + contact options */}
          <div>
            <h2 className="text-3xl md:text-4xl font-extrabold mb-4 leading-tight">
              Book Your Doorstep Repair in {data.cityName}
            </h2>
            <p className="text-blue-200 text-lg mb-8">
              Certified mechanics arrive in 20 minutes. No workshop visit needed.
            </p>

            <div className="space-y-4">
              <a
                href={`tel:${data.cityPhone}`}
                className="flex items-center gap-4 bg-white/10 hover:bg-white/20 border border-white/20 rounded-xl px-5 py-4 transition-colors group"
              >
                <Phone className="w-6 h-6 text-yellow-400 flex-shrink-0 group-hover:scale-110 transition-transform" aria-hidden="true" />
                <div>
                  <p className="text-xs text-blue-300 mb-0.5 uppercase tracking-wide font-semibold">Call Now</p>
                  <p className="font-bold text-lg">{data.cityPhone}</p>
                </div>
              </a>

              <a
                href={`https://wa.me/${data.cityWhatsapp ?? WHATSAPP_NUMBER}?text=Hi, I need vehicle repair in ${data.cityName}`}
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-center gap-4 bg-green-500/90 hover:bg-green-500 border border-green-400 rounded-xl px-5 py-4 transition-colors group"
              >
                <MessageCircle className="w-6 h-6 flex-shrink-0 group-hover:scale-110 transition-transform" aria-hidden="true" />
                <div>
                  <p className="text-xs text-green-200 mb-0.5 uppercase tracking-wide font-semibold">WhatsApp</p>
                  <p className="font-bold text-lg">Chat with Us</p>
                </div>
              </a>

              {data.cityEmail && (
                <a
                  href={`mailto:${data.cityEmail}`}
                  className="flex items-center gap-4 bg-white/10 hover:bg-white/20 border border-white/20 rounded-xl px-5 py-4 transition-colors"
                >
                  <Mail className="w-6 h-6 text-blue-300 flex-shrink-0" aria-hidden="true" />
                  <div>
                    <p className="text-xs text-blue-300 mb-0.5 uppercase tracking-wide font-semibold">Email</p>
                    <p className="font-bold">{data.cityEmail}</p>
                  </div>
                </a>
              )}

              {(data.addressLine1 ?? data.addressLine2) && (
                <div className="flex items-center gap-4 bg-white/5 border border-white/10 rounded-xl px-5 py-4">
                  <MapPin className="w-6 h-6 text-blue-300 flex-shrink-0" aria-hidden="true" />
                  <div>
                    <p className="text-xs text-blue-300 mb-0.5 uppercase tracking-wide font-semibold">Address</p>
                    <p className="font-medium text-sm">{data.addressLine1}</p>
                    {data.addressLine2 && <p className="text-sm text-blue-200">{data.addressLine2}</p>}
                  </div>
                </div>
              )}
            </div>
          </div>

          {/* Right — book form link */}
          <div className="bg-white/10 border border-white/20 rounded-2xl p-8 backdrop-blur-sm">
            <h3 className="text-xl font-bold mb-2">Book Online — It Takes 30 Seconds</h3>
            <p className="text-blue-200 text-sm mb-6">Fill our quick form and we&apos;ll confirm your booking within minutes.</p>
            <Link
              href="/contact#contact-form"
              className="block w-full bg-yellow-400 text-gray-900 text-center font-bold py-4 rounded-xl hover:bg-yellow-300 transition-colors text-lg shadow-lg shadow-yellow-500/20"
            >
              Book Service Now
            </Link>

            <div className="mt-6 pt-6 border-t border-white/20 grid grid-cols-2 gap-3 text-sm text-blue-200">
              {['20-min response', 'Upfront pricing', '30-day warranty', 'Verified mechanics'].map((t) => (
                <div key={t} className="flex items-center gap-2">
                  <span className="w-1.5 h-1.5 rounded-full bg-green-400 flex-shrink-0" aria-hidden="true" />
                  <span>{t}</span>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

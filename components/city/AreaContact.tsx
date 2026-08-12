import Link from 'next/link';
import { Phone, MessageCircle, Mail } from 'lucide-react';
import type { AreaHubPageData } from '@/lib/areaPages';
import { WHATSAPP_NUMBER } from '@/lib/constants';
import { Reveal } from '@/components/ui/Reveal';

export function AreaContact({ data }: { data: AreaHubPageData }) {
  return (
    <section id="contact" className="relative overflow-hidden bg-gradient-to-br from-blue-800 via-blue-950 to-slate-950 text-white">
      <div
        aria-hidden="true"
        className="pointer-events-none absolute inset-0"
        style={{ background: 'radial-gradient(650px 320px at 90% 0%, rgba(92,141,255,.25), transparent 60%)' }}
      />
      <div className="container relative mx-auto px-4 py-16">
        <div className="grid items-center gap-12 lg:grid-cols-2">
          <Reveal>
            <div>
              <h2 className="mb-4 text-3xl font-extrabold leading-tight md:text-4xl">
                Book your doorstep repair in {data.areaName}
              </h2>
              <p className="mb-8 text-lg text-blue-200">
                Certified mechanics arrive in around 20 minutes. No workshop visit needed.
              </p>

              <div className="space-y-4">
                <a
                  href={`tel:${data.cityPhone}`}
                  className="group flex items-center gap-4 rounded-xl border border-white/20 bg-white/10 px-5 py-4 transition-colors hover:bg-white/20"
                >
                  <Phone className="h-6 w-6 flex-shrink-0 text-amber-300 transition-transform group-hover:scale-110" aria-hidden="true" />
                  <div>
                    <p className="mb-0.5 text-xs font-semibold uppercase tracking-wide text-blue-300">Call Now</p>
                    <p className="text-lg font-bold">{data.cityPhone}</p>
                  </div>
                </a>

                <a
                  href={`https://wa.me/${data.cityWhatsapp || WHATSAPP_NUMBER}?text=${encodeURIComponent(`Hi, I need vehicle repair in ${data.areaName}, ${data.cityName}`)}`}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="group flex items-center gap-4 rounded-xl border border-green-400 bg-green-500/90 px-5 py-4 transition-colors hover:bg-green-500"
                >
                  <MessageCircle className="h-6 w-6 flex-shrink-0 transition-transform group-hover:scale-110" aria-hidden="true" />
                  <div>
                    <p className="mb-0.5 text-xs font-semibold uppercase tracking-wide text-green-200">WhatsApp</p>
                    <p className="text-lg font-bold">Chat with Us</p>
                  </div>
                </a>

                {data.cityEmail && (
                  <a
                    href={`mailto:${data.cityEmail}`}
                    className="flex items-center gap-4 rounded-xl border border-white/20 bg-white/10 px-5 py-4 transition-colors hover:bg-white/20"
                  >
                    <Mail className="h-6 w-6 flex-shrink-0 text-blue-300" aria-hidden="true" />
                    <div>
                      <p className="mb-0.5 text-xs font-semibold uppercase tracking-wide text-blue-300">Email</p>
                      <p className="font-bold">{data.cityEmail}</p>
                    </div>
                  </a>
                )}
              </div>
            </div>
          </Reveal>

          <Reveal delay={0.1}>
            <div className="rounded-2xl border border-white/20 bg-white/10 p-8 backdrop-blur-sm">
              <h3 className="mb-2 text-xl font-bold">Book online — it takes 30 seconds</h3>
              <p className="mb-6 text-sm text-blue-200">Fill our quick form and we&apos;ll confirm your booking within minutes.</p>
              <Link
                href="/contact#contact-form"
                className="block w-full rounded-xl bg-amber-400 py-4 text-center text-lg font-bold text-slate-900 shadow-lg shadow-amber-500/20 transition-colors hover:bg-amber-300"
              >
                Book Service Now
              </Link>

              <div className="mt-6 grid grid-cols-2 gap-3 border-t border-white/20 pt-6 text-sm text-blue-200">
                {['20-min response', 'Upfront pricing', '30-day warranty', 'Verified mechanics'].map((t) => (
                  <div key={t} className="flex items-center gap-2">
                    <span className="h-1.5 w-1.5 flex-shrink-0 rounded-full bg-green-400" aria-hidden="true" />
                    <span>{t}</span>
                  </div>
                ))}
              </div>
            </div>
          </Reveal>
        </div>
      </div>
    </section>
  );
}

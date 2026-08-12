import { Clock, MapPin, ThumbsUp, Users } from 'lucide-react';
import type { AreaHubPageData } from '@/lib/areaPages';
import { CountUp } from '@/components/ui/CountUp';
import { Reveal } from '@/components/ui/Reveal';

// Stat fields are free-text (admin-editable, e.g. "2,300+" or "10,000+ Bangalore
// customers") — only animate with CountUp when the string is a clean number +
// optional suffix; anything else renders as static text rather than mangling it.
function parseStatNumber(raw: string): { value: number; suffix: string } | null {
  const match = raw.trim().match(/^([\d,]+)(.*)$/);
  if (!match) return null;
  const value = Number(match[1].replace(/,/g, ''));
  if (!Number.isFinite(value) || value <= 0) return null;
  return { value, suffix: match[2] };
}

export function AreaAbout({ data }: { data: AreaHubPageData }) {
  const customers = data.statsCustomers ? parseStatNumber(data.statsCustomers) : null;
  const satisfaction = data.statsSatisfaction ? parseStatNumber(data.statsSatisfaction) : null;

  return (
    <section id="about" className="bg-white py-16 md:py-20">
      <div className="container mx-auto px-4">
        <div className="grid items-start gap-12 lg:grid-cols-[1.1fr_0.9fr] lg:gap-14">
          <div>
            <span className="mb-3 inline-block text-sm font-semibold uppercase tracking-widest text-blue-600">
              About this area
            </span>
            <h2 className="mb-5 text-3xl font-extrabold leading-tight text-gray-900 md:text-4xl">
              {data.aboutHeading}
            </h2>
            {data.aboutPara1 && (
              <p className="mb-4 text-lg leading-relaxed text-gray-600">{data.aboutPara1}</p>
            )}
            {data.aboutPara2 && (
              <p className="mb-4 text-lg leading-relaxed text-gray-600">{data.aboutPara2}</p>
            )}
            {data.localInsight && (
              <Reveal className="mt-2 rounded-xl border-l-[3px] border-blue-600 bg-blue-50 px-4 py-3.5 text-[15px] leading-relaxed text-blue-900">
                <span className="font-bold">Local note: </span>
                {data.localInsight}
              </Reveal>
            )}

            {data.trustPoints.length > 0 && (
              <ul className="mt-6 space-y-3">
                {data.trustPoints.map((point, i) => (
                  <li key={i} className="flex items-start gap-3">
                    <div className="mt-2.5 h-2 w-2 flex-shrink-0 rounded-full bg-blue-600" aria-hidden="true" />
                    <p className="text-gray-700">{point}</p>
                  </li>
                ))}
              </ul>
            )}
          </div>

          <Reveal>
            <div className="rounded-2xl border border-gray-100 bg-white p-5 shadow-sm">
              <div className="grid grid-cols-2 gap-4">
                <div className="rounded-xl bg-blue-50 p-5 text-left">
                  <Users className="mb-2 h-6 w-6 text-blue-600" aria-hidden="true" />
                  <p className="font-mono text-[28px] font-extrabold leading-none text-blue-700">
                    {customers ? <CountUp value={customers.value} suffix={customers.suffix} /> : (data.statsCustomers ?? `${data.cityName} customers`)}
                  </p>
                  <p className="mt-1.5 text-xs font-semibold text-gray-500">Customers served</p>
                </div>
                <div className="rounded-xl bg-gray-50 p-5 text-left">
                  <ThumbsUp className="mb-2 h-6 w-6 text-gray-700" aria-hidden="true" />
                  <p className="font-mono text-[28px] font-extrabold leading-none text-gray-900">
                    {satisfaction ? <CountUp value={satisfaction.value} suffix={satisfaction.suffix} /> : (data.statsSatisfaction ?? '—')}
                  </p>
                  <p className="mt-1.5 text-xs font-semibold text-gray-500">Satisfaction rate</p>
                </div>
                <div className="rounded-xl bg-gray-50 p-5 text-left">
                  <Clock className="mb-2 h-6 w-6 text-gray-700" aria-hidden="true" />
                  <p className="font-mono text-[28px] font-extrabold leading-none text-gray-900">
                    24<span className="text-base">/7</span>
                  </p>
                  <p className="mt-1.5 text-xs font-semibold text-gray-500">Service available</p>
                </div>
                <div className="rounded-xl bg-gray-50 p-5 text-left">
                  <MapPin className="mb-2 h-6 w-6 text-gray-700" aria-hidden="true" />
                  <p className="truncate text-lg font-extrabold leading-none text-gray-900">
                    {data.statsCoverage ?? data.areaName}
                  </p>
                  <p className="mt-1.5 text-xs font-semibold text-gray-500">Full coverage</p>
                </div>
              </div>
            </div>
          </Reveal>
        </div>
      </div>
    </section>
  );
}

// app/about/page.tsx
import type { Metadata } from "next";
import { CheckCircle, Phone, ChevronRight, Star, ShieldCheck, Clock3 } from "lucide-react";
import Link from "next/link";
import { Testimonials } from "@/components/Testimonials";
import { TeamSection } from "@/components/about/TeamSection";
import { AnimatedCounter } from "@/components/about/AnimatedCounter";
import { StoryTimeline } from "@/components/about/StoryTimeline";
import { CmsImage } from "@/components/ui/CmsImage";
import { Reveal } from "@/components/ui/Reveal";
import { FAQAccordion } from "@/components/ui/FAQAccordion";
import HowItWorks from "@/components/ui/HowItWorks";
import { aboutContent, stats, mvvItems, differentiators, timeline, aboutFaqs } from "@/lib/data/about";
import { getStaticPageSEO } from "@/lib/data/seo";
import { aboutPageSchema, jsonLdString } from "@/lib/schema";
import { getTeamMembers } from "@/lib/team";
import { MAIN_PHONE, MAIN_PHONE_DISPLAY } from "@/lib/constants";
import { metadataFromBasicSeo } from "@/lib/seo/metadata";
import { SectionHeader } from "@/components/ui/SectionHeader";

const seo = getStaticPageSEO("about")!;
export const revalidate = 3600; // refreshes every 1 hour

export const metadata: Metadata = metadataFromBasicSeo({
  title: seo.title,
  description: seo.description,
  keywords: seo.keywords,
  canonical: seo.canonical,
  path: "/about",
  ogImageAlt: seo.ogTitle ?? seo.title,
});

export default async function AboutPage() {
  const teamMembers = await getTeamMembers();

  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: jsonLdString(aboutPageSchema({ faqs: aboutFaqs })),
        }}
      />

      {/* ── HERO ─────────────────────────────────────────────────────────── */}
      <section className="relative overflow-hidden bg-gradient-to-br from-blue-50 via-white to-blue-100 py-20">
        {/* Decorative blurred gradient blobs — cosmetic only, CSS keyframes,
            disabled entirely under prefers-reduced-motion. */}
        <div aria-hidden="true" className="pointer-events-none absolute inset-0 overflow-hidden">
          <div className="absolute -left-16 -top-16 h-72 w-72 animate-blob rounded-full bg-blue-300/40 blur-3xl motion-reduce:animate-none" />
          <div
            className="absolute -right-10 top-1/3 h-80 w-80 animate-blob rounded-full bg-red-200/40 blur-3xl motion-reduce:animate-none"
            style={{ animationDelay: "-5s" }}
          />
          <div
            className="absolute bottom-0 left-1/3 h-64 w-64 animate-blob rounded-full bg-blue-200/50 blur-3xl motion-reduce:animate-none"
            style={{ animationDelay: "-10s" }}
          />
        </div>

        <div className="container relative mx-auto max-w-3xl px-4 text-center">
          <nav aria-label="Breadcrumb" className="mb-6 flex items-center justify-center gap-2 text-sm text-gray-500">
            <Link href="/" className="hover:text-blue-600 transition-colors">Home</Link>
            <ChevronRight className="h-3 w-3" aria-hidden="true" />
            <span className="font-medium text-gray-900">About</span>
          </nav>

          <Reveal>
            <h1 className="mb-4 text-4xl font-bold text-gray-900 md:text-5xl">About Fiixup</h1>
            <p className="text-xl text-gray-700">
              Revolutionizing auto care with 24/7 doorstep service across India
            </p>
          </Reveal>

          <Reveal delay={0.1}>
            <div className="mt-8 flex flex-wrap items-center justify-center gap-x-6 gap-y-3 text-sm font-semibold text-gray-700">
              <span className="flex items-center gap-1.5">
                <Star className="h-4 w-4 fill-amber-400 text-amber-400" aria-hidden="true" />
                4.9/5 average rating
              </span>
              <span className="flex items-center gap-1.5">
                <ShieldCheck className="h-4 w-4 text-blue-600" aria-hidden="true" />
                Certified &amp; verified technicians
              </span>
              <span className="flex items-center gap-1.5">
                <Clock3 className="h-4 w-4 text-blue-600" aria-hidden="true" />
                20-min doorstep arrival
              </span>
            </div>
          </Reveal>

          <Reveal delay={0.2}>
            <div className="mt-8 flex flex-wrap justify-center gap-4">
              <Link
                href="/contact"
                className="inline-block rounded-full bg-blue-600 px-8 py-3 font-semibold text-white shadow-lg transition-all hover:-translate-y-0.5 hover:bg-blue-700 hover:shadow-blue-200"
              >
                Book Service Now
              </Link>
              <a
                href={`tel:${MAIN_PHONE}`}
                className="inline-flex items-center gap-2 rounded-full border border-gray-200 bg-white px-8 py-3 font-semibold text-gray-700 transition-colors hover:border-blue-200 hover:text-blue-600"
              >
                <Phone className="h-4 w-4" aria-hidden="true" />
                {MAIN_PHONE_DISPLAY}
              </a>
            </div>
          </Reveal>
        </div>
      </section>

      {/* ── OUR STORY ────────────────────────────────────────────────────── */}
      <section className="bg-white py-20">
        <div className="container mx-auto px-4">
          <div className="mx-auto grid max-w-5xl items-center gap-12 md:grid-cols-2">
            <Reveal>
              <h2 className="mb-6 text-3xl font-bold text-gray-900 md:text-4xl">Our Story</h2>
              <div className="space-y-5 text-lg text-gray-700">
                <p>{aboutContent.description1}</p>
                <p>
                  Founded in 2020, we started with a vision to bring professional auto repair
                  services directly to people&apos;s doorsteps. What began as a small team of
                  passionate mechanics has grown into India&apos;s most trusted doorstep auto
                  service provider.
                </p>
                <p>
                  Today, we serve over 10,000 happy customers across{" "}
                  <Link href="/bangalore" className="font-medium text-blue-600 hover:underline">Bengaluru</Link>,{" "}
                  <Link href="/chennai" className="font-medium text-blue-600 hover:underline">Chennai</Link>,{" "}
                  <Link href="/hyderabad" className="font-medium text-blue-600 hover:underline">Hyderabad</Link> and{" "}
                  <Link href="/mumbai" className="font-medium text-blue-600 hover:underline">Mumbai</Link> —
                  providing 24/7 service for both cars and bikes.
                </p>
              </div>
            </Reveal>
            <Reveal delay={0.1}>
              <CmsImage
                src="https://vpnztzzsyzgesnpihxsu.supabase.co/storage/v1/object/public/images/general/about-us-fiixup-1779454912831.webp"
                alt={aboutContent.imageAlt}
                title="About Fiixup doorstep car and bike service"
                ratio="about"
                fit="contain"
                sizes="(max-width: 768px) 100vw, 50vw"
                className="shadow-xl"
              />
            </Reveal>
          </div>

          {/* Our Journey — founding timeline */}
          <div className="mx-auto mt-20 max-w-2xl">
            <Reveal>
              <h2 className="mb-10 text-center text-2xl font-bold text-gray-900 md:text-3xl">
                Our Journey
              </h2>
            </Reveal>
            <StoryTimeline milestones={timeline} />
          </div>
        </div>
      </section>

      {/* ── TRUST STATS ──────────────────────────────────────────────────── */}
      <section className="bg-blue-600 py-14">
        <div className="container mx-auto px-4">
          <div className="grid grid-cols-2 gap-6 md:grid-cols-4">
            {stats.map((stat, i) => (
              <Reveal key={stat.label} delay={i * 0.08} className="text-center text-white">
                <stat.icon className="mx-auto mb-2 h-8 w-8 text-blue-200" aria-hidden="true" />
                <p className="text-2xl font-bold sm:text-4xl">
                  <AnimatedCounter value={stat.value} />
                </p>
                <p className="mt-1 text-sm text-blue-100 sm:text-base">{stat.label}</p>
              </Reveal>
            ))}
          </div>
        </div>
      </section>

      {/* ── MISSION, VISION, VALUES ──────────────────────────────────────── */}
      <section className="bg-gray-50 py-20">
        <div className="container mx-auto max-w-5xl px-4">
          <SectionHeader heading="Our Mission &amp; Values" />
          <div className="grid gap-8 md:grid-cols-3">
            {mvvItems.map(({ Icon, title, text }, i) => (
              <Reveal key={title} delay={i * 0.1}>
                <div className="h-full rounded-2xl bg-white p-6 text-center shadow-sm transition-all duration-300 hover:-translate-y-1 hover:shadow-lg">
                  <div className="mx-auto mb-4 flex h-16 w-16 items-center justify-center rounded-full bg-blue-100">
                    <Icon className="h-8 w-8 text-blue-600" aria-hidden="true" />
                  </div>
                  <h3 className="mb-2 text-xl font-semibold text-gray-900">{title}</h3>
                  <p className="text-gray-600">{text}</p>
                </div>
              </Reveal>
            ))}
          </div>
        </div>
      </section>

      {/* ── WHAT SETS US APART ───────────────────────────────────────────── */}
      <section className="py-20 bg-white">
        <div className="container mx-auto px-4 max-w-4xl">
          <SectionHeader heading="What Sets Us Apart" />
          <div className="grid md:grid-cols-2 gap-8">
            {differentiators.map(({ Icon, title, text }, i) => (
              <Reveal key={title} delay={Math.min(i, 5) * 0.06} className="flex gap-4">
                <div className="flex h-11 w-11 flex-shrink-0 items-center justify-center rounded-xl bg-blue-100">
                  {Icon ? <Icon className="w-5 h-5 text-blue-600" aria-hidden="true" /> : <CheckCircle className="w-5 h-5 text-green-600" aria-hidden="true" />}
                </div>
                <div>
                  <h3 className="font-semibold text-xl mb-2 text-gray-900">{title}</h3>
                  <p className="text-gray-600">{text}</p>
                </div>
              </Reveal>
            ))}
          </div>
        </div>
      </section>

      {/* ── HOW IT WORKS ─────────────────────────────────────────────────── */}
      <section className="bg-gray-50 py-20">
        <div className="container mx-auto px-4">
          <SectionHeader heading={aboutContent.sections.howItWorks} />
          <HowItWorks />
        </div>
      </section>

      <TeamSection members={teamMembers} />

      <Testimonials />

      {/* ── FAQ ──────────────────────────────────────────────────────────── */}
      <section className="bg-gray-50 py-20">
        <div className="container mx-auto max-w-3xl px-4">
          <SectionHeader
            heading="Frequently Asked Questions"
            subtext="Common questions about Fiixup's doorstep car and bike repair service."
          />
          <Reveal>
            <FAQAccordion faqs={aboutFaqs.map((f) => ({ q: f.question, a: f.answer }))} />
          </Reveal>
        </div>
      </section>

      {/* ── CLOSING CTA ──────────────────────────────────────────────────── */}
      <section className="bg-white py-16">
        <div className="container mx-auto px-4 text-center">
          <h2 className="mb-3 text-2xl font-bold text-gray-900 md:text-3xl">
            Ready for hassle-free vehicle care?
          </h2>
          <p className="mx-auto mb-8 max-w-xl text-gray-600">
            Book a certified mechanic to your doorstep in minutes — transparent pricing, genuine parts, 30-day warranty.
          </p>
          <div className="flex flex-wrap items-center justify-center gap-4">
            <Link
              href="/contact"
              className="inline-block rounded-full bg-blue-600 px-8 py-3 font-semibold text-white shadow-lg transition-all hover:-translate-y-0.5 hover:bg-blue-700 hover:shadow-blue-200"
            >
              Book Service Now
            </Link>
            <a
              href={`tel:${MAIN_PHONE}`}
              className="inline-flex items-center gap-2 rounded-full border border-gray-200 px-8 py-3 font-semibold text-gray-700 transition-colors hover:border-blue-200 hover:text-blue-600"
            >
              <Phone className="h-4 w-4" />
              {MAIN_PHONE_DISPLAY}
            </a>
          </div>
        </div>
      </section>
    </>
  );
}

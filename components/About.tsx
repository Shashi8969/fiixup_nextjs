import { CheckCircle } from "lucide-react";
import { aboutContent, stats as fallbackStats, highlights as fallbackHighlights } from "@/lib/data/about";
import HowItWorks from "@/components/ui/HowItWorks";
import { SectionHeader } from "@/components/ui/SectionHeader";
import { CmsImage } from "@/components/ui/CmsImage";
import type { HomeAboutData } from "@/lib/homepage";

type AboutProps = {
  data?: HomeAboutData;
};

export function About({ data }: AboutProps = {}) {
  const content = data ?? {
    title: aboutContent.title,
    description1: aboutContent.description1,
    description2: aboutContent.description2,
    imageUrl: "https://vpnztzzsyzgesnpihxsu.supabase.co/storage/v1/object/public/images/general/about-us-fiixup-1779454912831.webp",
    imageAlt: aboutContent.imageAlt,
    imageTitle: "About Fiixup doorstep car and bike service",
    highlights: fallbackHighlights,
    stats: fallbackStats.map(({ value, label }) => ({ value, label })),
    howItWorksHeading: aboutContent.sections.howItWorks,
  };

  return (
    <section id="about" className="py-12 bg-gray-50">
      <div className="container mx-auto px-4">

        <div className="grid md:grid-cols-2 gap-12 items-center mb-16">
          <div className="order-2 md:order-1">
            <h2 className="text-3xl md:text-4xl font-bold mb-6 text-gray-900">
              {content.title}
            </h2>
            <p className="text-lg text-gray-700 mb-4">{content.description1}</p>
            <p className="text-lg text-gray-700 mb-8">{content.description2}</p>
            <div className="space-y-5">
              {content.highlights.map((item) => (
                <div key={item.heading} className="flex items-start gap-3">
                  <CheckCircle className="w-5 h-5 text-green-600 mt-1 flex-shrink-0" />
                  <div>
                    <h3 className="font-semibold mb-1 text-gray-900">{item.heading}</h3>
                    <p className="text-gray-600 text-sm">{item.text}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>

          <div className="order-1 md:order-2">
            <CmsImage
              src={content.imageUrl}
              alt={content.imageAlt}
              title={content.imageTitle}
              ratio="about"
              fit="contain"
              sizes="(max-width: 768px) 100vw, 50vw"
              className="shadow-xl"
            />
          </div>
        </div>

        {/* Stats */}
        <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-8">
          {content.stats.map((stat, index) => {
            const Icon = fallbackStats[index]?.icon ?? CheckCircle;
            return (
              <div key={stat.label} className="bg-white p-6 rounded-xl shadow-md text-center">
                <Icon className="w-10 h-10 text-blue-600 mx-auto mb-3" />
                <p className="text-3xl font-bold text-gray-900 mb-1">{stat.value}</p>
                <p className="text-gray-600">{stat.label}</p>
              </div>
            );
          })}
        </div>

        {/* How It Works */}
        <div className="mt-16">
          <SectionHeader heading={content.howItWorksHeading} className="mb-10" />
          <HowItWorks />
        </div>

      </div>
    </section>
  );
}

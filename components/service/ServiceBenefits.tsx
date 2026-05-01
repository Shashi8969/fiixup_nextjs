// components/service/ServiceBenefits.tsx
import { iconMap } from "@/lib/icons";
import { serviceThemes, type ThemeColor } from "@/lib/theme";
import * as LucideIcons from "lucide-react";

interface Benefit {
  icon: string;
  title: string;
  body: string;
}

interface Props {
  benefits: Benefit[];
  serviceTitle: string;
  accentColor?: ThemeColor;
}


export default function ServiceBenefits({ benefits, serviceTitle, accentColor = "red" }: Props) {
  const c = serviceThemes[accentColor];

  return (
    <section className="py-16 bg-gray-50">
      <div className="container mx-auto px-4">
        <div className="text-center mb-12">
          <span className="inline-block text-xs font-bold tracking-widest uppercase text-gray-500 mb-2">
            Why Fiixup
          </span>
          <h2 className="text-2xl md:text-3xl font-bold text-gray-900">
            Why Choose Fiixup for {serviceTitle}?
          </h2>
        </div>

        <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {benefits.map((b, i) => {
            const Icon = iconMap[b.icon] || iconMap["Wrench"];
            return (
              <div
                key={i}
                className="bg-white rounded-2xl border border-gray-200 p-6 text-center hover:shadow-md hover:border-gray-300 transition-all"
              >
                <div className={`w-14 h-14 rounded-2xl ${c.iconBg} flex items-center justify-center mx-auto mb-4`}>
                  <Icon className={`w-7 h-7 ${c.iconText}`} />
                </div>
                <h3 className="font-bold text-gray-900 mb-2">{b.title}</h3>
                <p className="text-gray-500 text-sm leading-relaxed">{b.body}</p>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
}

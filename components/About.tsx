import Image from "next/image";
import { Award, Users, ThumbsUp, Clock, CheckCircle } from "lucide-react";

const stats = [
  { icon: Users,    value: "10,000+", label: "Happy Customers"       },
  { icon: Clock,    value: "24/7",    label: "Always Available"       },
  { icon: ThumbsUp, value: "98%",     label: "Customer Satisfaction"  },
  { icon: Award,    value: "4",       label: "Cities & Growing"       },
];

const highlights = [
  { heading: "24/7 Doorstep Service",    text: "We come to you anytime — at your home, office, or roadside. Emergency breakdown at midnight? We're just a call away." },
  { heading: "Certified Technicians",    text: "Every Fiixup technician is trained, certified, and has a minimum of 3 years of hands-on experience in car and bike repair." },
  { heading: "Transparent Pricing",      text: "We provide detailed estimates before starting any work. No hidden charges, no surprises — just honest, upfront pricing." },
  { heading: "30-Day Repair Warranty",   text: "All repairs come with a 30-day service warranty. If the same issue recurs, we fix it free — no questions asked." },
];

const steps = [
  { n: "1", title: "Book in 60 Seconds",  desc: "Call, WhatsApp, or fill the form. Pick your time and location." },
  { n: "2", title: "We Dispatch Fast",     desc: "We confirm and dispatch the nearest certified technician to you." },
  { n: "3", title: "Repair at Your Door",  desc: "Technician arrives with all tools & parts. You watch — full transparency." },
  { n: "4", title: "Back on the Road",     desc: "Service done with a 30-day warranty. Digital receipt provided." },
];

export function About() {
  return (
    <section id="about" className="py-12 bg-gray-50">
      <div className="container mx-auto px-4">

        <div className="grid md:grid-cols-2 gap-12 items-center mb-16">

          {/* Left — content */}
          <div className="order-2 md:order-1">
            <h2 className="text-3xl md:text-4xl font-bold mb-6 text-gray-900">
              India's Trusted Doorstep Auto Repair Service
            </h2>
            <p className="text-lg text-gray-700 mb-4">
              Fiixup brings the workshop to your doorstep. We're India's growing 24/7 mobile
              auto repair service for both cars and bikes — operating across Bengaluru, Chennai,
              Hyderabad, and Mumbai, with more cities coming soon.
            </p>
            <p className="text-lg text-gray-700 mb-8">
              No more wasting hours in traffic to reach a garage. Our certified technicians
              arrive at your location with professional-grade tools, genuine parts, and the
              expertise to get your vehicle back on the road — fast.
            </p>
            <div className="space-y-5">
              {highlights.map((item) => (
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

          {/* Right — image */}
          <div className="order-1 md:order-2">
            <div className="rounded-2xl overflow-hidden shadow-xl relative h-[420px]">
              <Image
                src="/assets/carservice.webp"
                alt="Fiixup certified technician performing doorstep car repair"
                fill
                className="object-cover"
                sizes="(max-width: 768px) 100vw, 50vw"
              />
            </div>
          </div>
        </div>

        {/* Stats */}
        <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-8">
          {stats.map((stat) => (
            <div key={stat.label} className="bg-white p-6 rounded-xl shadow-md text-center">
              <stat.icon className="w-10 h-10 text-blue-600 mx-auto mb-3" />
              <p className="text-3xl font-bold text-gray-900 mb-1">{stat.value}</p>
              <p className="text-gray-600">{stat.label}</p>
            </div>
          ))}
        </div>

        {/* How it works */}
        <div className="mt-16">
          <h3 className="text-2xl font-bold text-center mb-10 text-gray-900">How Fiixup Works</h3>
          <div className="grid sm:grid-cols-2 md:grid-cols-4 gap-8">
            {steps.map(({ n, title, desc }) => (
              <div key={n} className="text-center">
                <div className="w-14 h-14 bg-blue-600 text-white rounded-full flex items-center justify-center mx-auto mb-4 text-2xl font-bold shadow-md">
                  {n}
                </div>
                <h4 className="font-bold text-gray-900 mb-2">{title}</h4>
                <p className="text-gray-600 text-sm">{desc}</p>
              </div>
            ))}
          </div>
        </div>

      </div>
    </section>
  );
}

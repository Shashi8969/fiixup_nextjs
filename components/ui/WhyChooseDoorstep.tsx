import { CheckCircle } from "lucide-react";
const whyDoorstep = [
  { title: "Save Time", desc: "No driving to a garage, waiting for hours, and driving back. We come to you while you work or relax." },
  { title: "Avoid Traffic", desc: "Why waste time in traffic when we can service your vehicle at your home or office?" },
  { title: "Complete Transparency", desc: "Watch the work being done. Understand exactly what's being fixed and why — no surprises." },
  { title: "Emergency Ready", desc: "Breakdown on the road? We provide 24/7 emergency service anywhere across our cities." },
  { title: "Cost Effective", desc: "Lower overhead means better prices for you without compromising on quality or parts." },
  { title: "Safe & Secure", desc: "Your vehicle stays with you. No need to leave it at an unfamiliar garage." },
];

export default function WhyChooseDoorstep() {
  return (
    <section className="py-16 bg-gray-50">
      <div className="container mx-auto px-4 max-w-4xl">
        <h2 className="text-3xl font-bold text-center mb-12">Why Choose Doorstep Service?</h2>
        <div className="grid md:grid-cols-2 gap-8">
          {whyDoorstep.map(({ title, desc }) => (
            <div key={title} className="flex gap-4">
              <CheckCircle className="w-6 h-6 text-green-600 flex-shrink-0 mt-1" />
              <div>
                <h3 className="font-bold text-lg mb-1">{title}</h3>
                <p className="text-gray-600">{desc}</p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );

}

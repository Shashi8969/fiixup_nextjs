
const howItWorks = [
  { n: "1", title: "Book Service",     desc: "Call us or book online. Choose your time and location."  },
  { n: "2", title: "We Come to You",   desc: "Technician arrives at your doorstep with tools & parts." },
  { n: "3", title: "Expert Service",   desc: "Professional diagnosis & repair done at your location."  },
  { n: "4", title: "Drive Away Happy", desc: "30-day warranty, digital receipt, and peace of mind."    },
];

{/* HOW IT WORKS */}
export default function HowItWorks() {
return (
      <section className="py-16 bg-white">
        <div className="container mx-auto px-4 max-w-4xl">
          <h2 className="text-3xl font-bold text-center mb-12">How It Works</h2>
          <div className="grid sm:grid-cols-2 md:grid-cols-4 gap-8">
            {howItWorks.map(({ n, title, desc }) => (
              <div key={n} className="text-center">
                <div className="w-16 h-16 bg-blue-600 text-white rounded-full flex items-center justify-center mx-auto mb-4 text-2xl font-bold shadow-md">
                  {n}
                </div>
                <h3 className="font-bold text-lg mb-2">{title}</h3>
                <p className="text-gray-600 text-sm">{desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>
);
}

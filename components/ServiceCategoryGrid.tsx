// components/ServiceCategoryGrid.tsx
import Link from 'next/link';
import { serviceCategories } from '@/lib/data/categories';

export function ServiceCategoryGrid() {
  return (
    <section className="py-16 bg-white">
      <div className="container mx-auto px-4">
        <div className="text-center mb-12">
          <p className="text-blue-600 font-bold uppercase tracking-widest text-sm mb-2">Our Services</p>
          <h2 className="text-4xl md:text-5xl font-extrabold text-gray-900">What We Fix</h2>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {serviceCategories.map((cat, index) => (
            <Link 
              key={index} 
              href={cat.link}
              className="group p-8 border border-gray-100 rounded-3xl transition-all duration-300 hover:shadow-xl hover:border-blue-100 flex flex-col items-center text-center bg-white"
            >
              <div className="mb-4 p-4 rounded-2xl bg-gray-50 group-hover:bg-blue-50 transition-colors">
                <cat.icon className="w-10 h-10 text-blue-500" />
              </div>
              <h3 className="text-xl font-bold text-gray-900 mb-2">{cat.title}</h3>
              <p className="text-gray-500 text-sm leading-relaxed">{cat.desc}</p>
            </Link>
          ))}
        </div>

        <div className="mt-12 text-center">
          <Link 
            href="/services" 
            className="inline-block bg-red-500 hover:bg-red-600 text-white font-bold py-4 px-10 rounded-full shadow-lg shadow-red-200 transition-all transform hover:-translate-y-1"
          >
            Browse All Services
          </Link>
        </div>
      </div>
    </section>
  );
}
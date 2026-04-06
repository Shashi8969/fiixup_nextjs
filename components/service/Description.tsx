// components/service/Description.tsx

export default function Description({ service, brands }: any) {
  return (
    <div>
      <h2 className="text-2xl font-bold mb-4">About This Service</h2>
      <p className="text-gray-700 text-lg mb-8">
        {service.description}
      </p>

      <h3 className="font-bold mb-3">Brands We Service</h3>

      <div className="flex flex-wrap gap-2">
        {brands.map((b: string) => (
          <span key={b} className="bg-gray-100 px-3 py-1 rounded-full">
            {b}
          </span>
        ))}
      </div>
    </div>
  );
}
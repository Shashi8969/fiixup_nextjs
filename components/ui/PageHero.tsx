interface PageHeroProps {
  heading: string;
  subtext?: string;
  gradient?: string;
}

export function PageHero({
  heading,
  subtext,
  gradient = "from-blue-50 to-blue-100",
}: PageHeroProps) {
  return (
    <section className={`bg-gradient-to-br ${gradient} py-16`}>
      <div className="container mx-auto px-4 text-center max-w-3xl">
        <h1 className="text-4xl md:text-5xl font-bold mb-4 text-gray-900">{heading}</h1>
        {subtext && <p className="text-xl text-gray-700">{subtext}</p>}
      </div>
    </section>
  );
}

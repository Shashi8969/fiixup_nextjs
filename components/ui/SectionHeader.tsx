interface SectionHeaderProps {
  readonly heading: string;
  readonly subtext?: string;
  readonly className?: string;
}

export function SectionHeader({ heading, subtext, className = "" }: SectionHeaderProps) {
  return (
    <div className={`text-center mb-12 ${className}`}>
      <h2 className="text-3xl md:text-4xl font-bold mb-4 text-gray-900">{heading}</h2>
      {subtext && <p className="text-lg text-gray-600 max-w-2xl mx-auto">{subtext}</p>}
    </div>
  );
}

import { blogDisplayFont } from "@/components/blog/fonts";

interface BlogIndexHeroProps {
  readonly heading: string;
  readonly subtext?: string;
}

export function BlogIndexHero({ heading, subtext }: BlogIndexHeroProps) {
  return (
    <section className="border-b border-gray-200 bg-brand-paper">
      <div className="container mx-auto max-w-3xl px-4 py-16 md:py-20">
        <span className="text-xs font-semibold uppercase tracking-[0.2em] text-brand-crimson">
          Blog
        </span>
        <h1
          className={`${blogDisplayFont.className} mt-3 text-4xl font-semibold leading-tight text-gray-900 md:text-5xl`}
        >
          {heading}
        </h1>
        {subtext && (
          <p className="mt-4 max-w-xl text-lg leading-relaxed text-gray-600">
            {subtext}
          </p>
        )}
      </div>
    </section>
  );
}

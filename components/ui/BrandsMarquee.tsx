import Image from "next/image";
import { Marquee } from "@/components/ui/Marquee";

type Brand = { name: string; logo: string };

// Local, build-time-optimized logos (resized + WebP, ~3-5KB each) — these are
// static brand marks that never change, so there's no need to round-trip
// through Supabase Storage for them (was costing ~320KB + a 1h cache TTL on
// every visit). See /public/assets/brands.
const BRANDS: Brand[] = [
  { name: "Hero", logo: "/assets/brands/hero.webp" },
  { name: "Bajaj", logo: "/assets/brands/bajaj.webp" },
  { name: "TVS", logo: "/assets/brands/tvs.webp" },
  { name: "KTM", logo: "/assets/brands/ktm.webp" },
  { name: "Royal Enfield", logo: "/assets/brands/royal-enfield.webp" },
  { name: "Yamaha", logo: "/assets/brands/yamaha.webp" },
  { name: "Honda", logo: "/assets/brands/honda.webp" },
  { name: "Suzuki", logo: "/assets/brands/suzuki.webp" },
  { name: "Mahindra", logo: "/assets/brands/mahindra.webp" },
  { name: "Tata", logo: "/assets/brands/tata.webp" },
  { name: "Harley-davidson", logo: "/assets/brands/harley-davidson.webp" },
  { name: "Hyundai", logo: "/assets/brands/hyundai.webp" },
  { name: "Renault", logo: "/assets/brands/renault.webp" },
  { name: "Mercedes", logo: "/assets/brands/mercedes.webp" },
  { name: "KIA", logo: "/assets/brands/kia.webp" },
  { name: "Ford", logo: "/assets/brands/ford.webp" },
  { name: "BMW", logo: "/assets/brands/bmw.webp" },
  { name: "Jawa", logo: "/assets/brands/jawa.webp" },
  { name: "MG", logo: "/assets/brands/mg.webp" },
];

// Deterministic shuffle (fixed seed) — random-looking order without a
// different result on every request/hydration, since there's no client
// boundary here to keep a random pick in sync.
function seededShuffle<T>(items: T[], seed: number): T[] {
  const result = [...items];
  let s = seed;
  for (let i = result.length - 1; i > 0; i--) {
    s = (s * 9301 + 49297) % 233280;
    const j = Math.floor((s / 233280) * (i + 1));
    [result[i], result[j]] = [result[j], result[i]];
  }
  return result;
}

function BrandChip({ brand, size = "md" }: { brand: Brand; size?: "md" | "lg" }) {
  const dims = size === "lg" ? "h-20 w-40 sm:w-48" : "h-16 w-32 sm:w-40";

  return (
    <div
      className={`group flex ${dims} shrink-0 items-center justify-center rounded-2xl border border-gray-100 bg-white px-4 text-center shadow-sm transition-all hover:-translate-y-1 hover:shadow-lg`}
    >
      <Image
        src={brand.logo}
        alt={brand.name}
        width={132}
        height={63}
        className="h-9 w-auto object-contain grayscale transition-all duration-300 group-hover:grayscale-0"
      />
    </div>
  );
}

export function BrandsMarquee() {
  const shuffled = seededShuffle(BRANDS, 42);
  const third = Math.ceil(shuffled.length / 3);
  const ROW_TOP = shuffled.slice(0, third);
  const ROW_CENTER = shuffled.slice(third, third * 2);
  const ROW_BOTTOM = shuffled.slice(third * 2);

  return (
    <section className="overflow-hidden bg-gray-50 py-14">
      <div className="container mx-auto mb-10 px-4 text-center">
        <span className="mb-2 inline-block text-sm font-semibold uppercase tracking-widest text-blue-600">
          Multi-Brand Expertise
        </span>
        <h2 className="text-2xl font-extrabold text-gray-900 md:text-3xl">
          We Service Every Major Car &amp; Bike Brand
        </h2>
        <p className="mx-auto mt-2 max-w-xl text-gray-500">
          Certified technicians trained across all popular Indian and international vehicle brands — genuine parts, no guesswork.
        </p>
      </div>

      {/* Three independent rows, brands shuffled and mixed (no car/bike split),
          each at a different speed/direction/offset so it reads as a loose
          scattered field rather than neat aligned lines. */}
      <div className="space-y-5">
        <div className="pl-10 sm:pl-24">
          <Marquee direction="left" durationSeconds={24}>
            {ROW_TOP.map((brand, i) => (
              <BrandChip key={`${brand.name}-top-${i}`} brand={brand} />
            ))}
          </Marquee>
        </div>

        <div>
          <Marquee direction="right" durationSeconds={32}>
            {ROW_CENTER.map((brand, i) => (
              <BrandChip key={`${brand.name}-center-${i}`} brand={brand} size="lg" />
            ))}
          </Marquee>
        </div>

        <div className="pl-4 sm:pl-16">
          <Marquee direction="left" durationSeconds={27}>
            {ROW_BOTTOM.map((brand, i) => (
              <BrandChip key={`${brand.name}-bottom-${i}`} brand={brand} />
            ))}
          </Marquee>
        </div>
      </div>
    </section>
  );
}

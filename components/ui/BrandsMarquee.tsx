import { Marquee } from "@/components/ui/Marquee";
import { getBrandLogos } from "@/lib/brandLogos";

type Brand = { name: string; logo?: string };

// Fallback only — used if the brand_logos table in Supabase is empty or
// unreachable. Primary source is always the DB (see lib/brandLogos.ts),
// managed from the admin panel's Brand Logos page.
const FALLBACK_BRANDS: Brand[] = [
  { name: "Maruti Suzuki" }, { name: "Hero" }, { name: "Hyundai" },
  { name: "Honda" }, { name: "TVS" }, { name: "Tata" },
  { name: "Bajaj" }, { name: "Toyota" }, { name: "Yamaha" },
  { name: "Kia" }, { name: "Royal Enfield" }, { name: "Mahindra" },
  { name: "Suzuki" }, { name: "Volkswagen" }, { name: "KTM" },
  { name: "Skoda" }, { name: "Ola Electric" }, { name: "Renault" },
  { name: "Ather" }, { name: "Nissan" }, { name: "MG" }, { name: "Honda" },
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
  const textSize = size === "lg" ? "text-lg" : "text-sm sm:text-base";

  return (
    <div
      className={`group flex ${dims} shrink-0 items-center justify-center rounded-2xl border border-gray-100 bg-white px-4 text-center shadow-sm transition-all hover:-translate-y-1 hover:shadow-lg`}
    >
      {brand.logo ? (
        // eslint-disable-next-line @next/next/no-img-element -- small decorative logo, not a Next/Image-worthy content image
        <img
          src={brand.logo}
          alt={brand.name}
          className="max-h-9 w-auto grayscale transition-all duration-300 group-hover:grayscale-0"
        />
      ) : (
        <span className={`${textSize} font-bold tracking-tight text-gray-500 transition-colors group-hover:text-gray-900`}>
          {brand.name}
        </span>
      )}
    </div>
  );
}

export async function BrandsMarquee() {
  const dbBrands = await getBrandLogos();
  const brands: Brand[] = dbBrands.length
    ? dbBrands.map((b) => ({ name: b.name, logo: b.logoUrl ?? undefined }))
    : FALLBACK_BRANDS;

  const shuffled = seededShuffle(brands, 42);
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

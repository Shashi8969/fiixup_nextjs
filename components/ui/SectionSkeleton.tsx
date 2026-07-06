// components/ui/SectionSkeleton.tsx
// Suspense fallback for homepage sections that fetch from Supabase
// (Testimonials, Blog) — shown briefly while the DB call resolves.

type SectionSkeletonProps = {
  rows?: number;
};

export function SectionSkeleton({ rows = 3 }: SectionSkeletonProps) {
  return (
    <section className="py-12 bg-white" aria-hidden="true">
      <div className="container mx-auto px-4 animate-pulse">
        <div className="h-8 w-2/3 max-w-md bg-gray-200 rounded-lg mx-auto mb-4" />
        <div className="h-4 w-1/2 max-w-sm bg-gray-100 rounded-lg mx-auto mb-12" />

        <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-8">
          {Array.from({ length: rows }).map((_, i) => (
            <div key={i} className="rounded-xl border border-gray-100 overflow-hidden">
              <div className="aspect-[4/3] bg-gray-200" />
              <div className="p-6 space-y-3">
                <div className="h-4 w-3/4 bg-gray-200 rounded" />
                <div className="h-3 w-full bg-gray-100 rounded" />
                <div className="h-3 w-5/6 bg-gray-100 rounded" />
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
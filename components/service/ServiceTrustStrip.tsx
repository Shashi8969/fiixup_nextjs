<<<<<<< HEAD
// components/service/TrustStrip.tsx

import { TRUST_BADGES } from "@/lib/constants";

export default function TrustStrip() {
  return (
    <section className="bg-white border-b border-gray-100 py-5">
      <div className="container mx-auto px-4">
        <div className="flex flex-wrap justify-center gap-8">
          {TRUST_BADGES.map((item) => (
            <div key={item} className="text-sm font-semibold text-gray-700">
              {item}
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
=======
import { TrustStrip } from "@/components/ui/TrustStrip";

export default function ServiceTrustStrip() {
  return <TrustStrip variant="text" />;
}
>>>>>>> 8dcb818 (reconect github)

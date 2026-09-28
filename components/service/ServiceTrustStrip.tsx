import { TrustStrip } from "@/components/ui/TrustStrip";

export default function ServiceTrustStrip({ context = "service" }: { context?: "service" | "towing" }) {
  return <TrustStrip variant="text" context={context} />;
}

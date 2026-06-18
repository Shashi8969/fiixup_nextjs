"use client";

import Link from "next/link";
import type { ReactNode } from "react";
import { usePathname } from "next/navigation";
import {
  getCityServiceCategoryHref,
  getCityServiceHref,
  getCityServicesHref,
  getCitySlugFromPathname,
  normalizePublicRoute,
} from "@/lib/routes";

type DynamicInternalLinkProps = {
  href: string;
  targetType?: string | null;
  className?: string;
  children: ReactNode;
};

function isExternalHref(href: string) {
  return /^(https?:|tel:|mailto:|#)/i.test(href);
}

function resolveContextHref(href: string, pathname: string, targetType?: string | null) {
  const safeHref = normalizePublicRoute(href);
  if (isExternalHref(safeHref)) return safeHref;

  const citySlug = getCitySlugFromPathname(pathname);
  if (!citySlug) return safeHref;

  if (safeHref === "/services") return getCityServicesHref(citySlug);

  const parts = safeHref.split("/").filter(Boolean);
  if (parts[0] !== "services" || !parts[1]) return safeHref;

  const target = String(targetType ?? "").toLowerCase();
  if (target.includes("category")) {
    return getCityServiceCategoryHref(citySlug, parts[1]);
  }
  if (target.includes("service")) {
    return getCityServiceHref(citySlug, parts[1]);
  }

  // Manual links are already validated in admin and are rendered exactly as saved.
  return safeHref;
}

export function DynamicInternalLink({ href, targetType, className, children }: DynamicInternalLinkProps) {
  const pathname = usePathname();
  const safeHref = resolveContextHref(href, pathname, targetType);

  if (isExternalHref(safeHref)) {
    const isHttp = /^https?:/i.test(safeHref);
    return (
      <a
        href={safeHref}
        className={className}
        target={isHttp ? "_blank" : undefined}
        rel={isHttp ? "noopener noreferrer" : undefined}
      >
        {children}
      </a>
    );
  }

  return (
    <Link href={safeHref} className={className}>
      {children}
    </Link>
  );
}

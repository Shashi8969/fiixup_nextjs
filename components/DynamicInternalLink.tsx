"use client";

import Link from "next/link";
import type { ReactNode } from "react";
import { usePathname } from "next/navigation";
import { getContextAwareHref } from "@/lib/routes";

type DynamicInternalLinkProps = {
  href: string;
  className?: string;
  children: ReactNode;
  validPaths?: string[];
};

function isExternalHref(href: string) {
  return /^(https?:|tel:|mailto:|#)/i.test(href);
}

export function DynamicInternalLink({ href, className, children, validPaths }: DynamicInternalLinkProps) {
  const pathname = usePathname();
  const safeHref = getContextAwareHref(href, pathname, validPaths);

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

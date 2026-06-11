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

export function DynamicInternalLink({ href, className, children, validPaths }: DynamicInternalLinkProps) {
  const pathname = usePathname();
  const safeHref = getContextAwareHref(href, pathname, validPaths);

  return (
    <Link href={safeHref} className={className}>
      {children}
    </Link>
  );
}

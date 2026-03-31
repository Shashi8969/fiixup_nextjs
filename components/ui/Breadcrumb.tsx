"use client";

import Link from "next/link";
import { ChevronRight, Home } from "lucide-react";
import { SITE_URL } from "@/lib/constants";

export interface BreadcrumbItem {
  label: string;
  href?: string; // Omit for last (current) item
}

interface BreadcrumbProps {
  items: BreadcrumbItem[];
  /** Render JSON-LD BreadcrumbList schema */
  withSchema?: boolean;
}

/**
 * SEO-friendly breadcrumb nav with optional JSON-LD schema.
 * Usage:
 *   <Breadcrumb items={[
 *     { label: "Services", href: "/services" },
 *     { label: "Car Brake Service" },
 *   ]} withSchema />
 */
export function Breadcrumb({ items, withSchema = true }: BreadcrumbProps) {
  const allItems = [{ label: "Home", href: "/" }, ...items];

  const schema = withSchema
    ? {
        "@context": "https://schema.org",
        "@type": "BreadcrumbList",
        itemListElement: allItems.map((item, index) => ({
          "@type": "ListItem",
          position: index + 1,
          name: item.label,
          item: item.href
            ? `${SITE_URL}${item.href}`
            : undefined,
        })),
      }
    : null;

  return (
    <>
      {schema && (
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(schema) }}
        />
      )}
      <nav aria-label="Breadcrumb" className="py-3">
        <ol
          className="flex flex-wrap items-center gap-1 text-sm text-gray-500"
          itemScope
          itemType="https://schema.org/BreadcrumbList"
        >
          {allItems.map((item, index) => {
            const isLast = index === allItems.length - 1;
            return (
              <li
                key={`${item.label}-${index}`}
                className="flex items-center gap-1"
                itemProp="itemListElement"
                itemScope
                itemType="https://schema.org/ListItem"
              >
                {index === 0 && (
                  <Home className="w-3.5 h-3.5 text-gray-400" aria-hidden="true" />
                )}
                {!isLast && item.href ? (
                  <Link
                    href={item.href}
                    className="hover:text-blue-600 transition-colors"
                    itemProp="item"
                  >
                    <span itemProp="name">{item.label}</span>
                  </Link>
                ) : (
                  <span
                    className={isLast ? "text-gray-900 font-medium" : ""}
                    itemProp="name"
                    aria-current={isLast ? "page" : undefined}
                  >
                    {item.label}
                  </span>
                )}
                {!isLast && (
                  <ChevronRight className="w-3.5 h-3.5 text-gray-300 flex-shrink-0" aria-hidden="true" />
                )}
                <meta itemProp="position" content={String(index + 1)} />
              </li>
            );
          })}
        </ol>
      </nav>
    </>
  );
}

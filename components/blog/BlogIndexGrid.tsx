"use client";

import { useMemo, useState } from "react";
import type { BlogPost } from "@/lib/models/blog.model";
import { BlogIndexCard } from "@/components/blog/BlogIndexCard";
import { formatCategoryLabel } from "@/components/blog/format";

const ALL = "All";

function pillClass(isActive: boolean) {
  return `shrink-0 rounded-full border px-4 py-2 text-sm font-medium transition-colors ${
    isActive
      ? "border-brand-ink bg-brand-ink text-white"
      : "border-gray-200 bg-white text-gray-600 hover:border-brand-ink/40 hover:text-brand-ink"
  }`;
}

// Posts are already fetched server-side and passed in whole — filtering
// here is a client-side show/hide, so every post (and its link) is still
// present in the server-rendered HTML on first load, with "All" active.
export function BlogIndexGrid({ posts }: { readonly posts: BlogPost[] }) {
  const categories = useMemo(() => {
    const counts = new Map<string, number>();
    for (const post of posts) counts.set(post.category, (counts.get(post.category) ?? 0) + 1);
    return Array.from(counts.entries())
      .map(([value, count]) => ({ value, count, label: formatCategoryLabel(value) }))
      .sort((a, b) => b.count - a.count || a.label.localeCompare(b.label));
  }, [posts]);

  const [active, setActive] = useState<string>(ALL);
  const filtered = active === ALL ? posts : posts.filter((p) => p.category === active);

  return (
    <section className="bg-white py-14 md:py-16">
      <div className="container mx-auto px-4">
        <div className="mb-3 flex gap-2 overflow-x-auto pb-1 [-ms-overflow-style:none] [scrollbar-width:none] [&::-webkit-scrollbar]:hidden">
          <button
            type="button"
            onClick={() => setActive(ALL)}
            aria-pressed={active === ALL}
            className={pillClass(active === ALL)}
          >
            All <span className="ml-1 text-xs opacity-70">{posts.length}</span>
          </button>
          {categories.map((c) => (
            <button
              key={c.value}
              type="button"
              onClick={() => setActive(c.value)}
              aria-pressed={active === c.value}
              className={pillClass(active === c.value)}
            >
              {c.label} <span className="ml-1 text-xs opacity-70">{c.count}</span>
            </button>
          ))}
        </div>

        <p aria-live="polite" className="mb-8 text-sm text-gray-500">
          {active === ALL
            ? `${posts.length} article${posts.length === 1 ? "" : "s"}`
            : `Showing ${filtered.length} of ${posts.length} articles in ${formatCategoryLabel(active)}`}
        </p>

        {filtered.length > 0 ? (
          <div className="grid gap-8 sm:grid-cols-2 lg:grid-cols-3">
            {filtered.map((post, i) => (
              <BlogIndexCard
                key={post.id}
                id={post.id}
                title={post.title}
                excerpt={post.excerpt}
                image={post.image}
                imageAlt={post.imageAlt}
                date={post.date}
                category={post.category}
                readTime={String(post.readTime)}
                author={post.author}
                priority={i === 0}
              />
            ))}
          </div>
        ) : (
          <p className="py-16 text-center text-gray-500">No articles in this category yet.</p>
        )}
      </div>
    </section>
  );
}

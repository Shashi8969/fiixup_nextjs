import { SITE_URL } from "@/lib/constants";
import { getAllCities } from "@/lib/cities";
import { getAllServiceCategories } from "@/lib/data/serviceCategory";
import { getAllPosts } from "@/lib/posts";
import { asAbsolutePath, getGlobalServiceHref } from "@/lib/routes";

export const revalidate = 3600;

function link(title: string, path: string, description: string) {
  return `- [${title}](${SITE_URL}${path}): ${description}`;
}

export async function GET() {
  const [cities, categories, posts] = await Promise.all([
    getAllCities(),
    getAllServiceCategories(),
    getAllPosts(),
  ]);

  const lines: string[] = [];

  lines.push("# Fiixup");
  lines.push("");
  lines.push(
    "> Fiixup is a 24/7 doorstep car & bike repair and roadside assistance platform in India. Certified technicians travel to the customer's home, office, or breakdown location for repairs, maintenance, battery, puncture, and towing support — no garage visit required."
  );
  lines.push("");

  lines.push("## Key Pages");
  lines.push("");
  lines.push(link("Home", "/", "Book doorstep car & bike repair, battery, puncture, and 24/7 roadside assistance."));
  lines.push(link("About", "/about", "Company story, mission and values, real team, and what sets Fiixup apart."));
  lines.push(link("Services", "/services", "Full list of doorstep car and bike repair services."));
  lines.push(link("Gallery", "/gallery", "Real completed job photos from Fiixup technicians."));
  lines.push(link("Blog", "/blog", "Car and bike maintenance tips, guides, and service advice."));
  lines.push(link("FAQ", "/faq", "Answers to common questions about pricing, booking, and warranty."));
  lines.push(link("Contact", "/contact", "Book a service, call, or WhatsApp Fiixup directly."));
  lines.push("");

  if (cities.length) {
    lines.push("## Cities We Serve");
    lines.push("");
    for (const city of cities) {
      lines.push(link(city.name, `/${city.slug}`, `Doorstep car & bike repair and roadside assistance in ${city.name}.`));
    }
    lines.push("");
  }

  if (categories.length) {
    lines.push("## Service Categories");
    lines.push("");
    for (const cat of categories.slice(0, 20)) {
      const path = cat.link ? asAbsolutePath(cat.link) : getGlobalServiceHref(cat.slug || "");
      lines.push(link(cat.title, path, cat.description || "Doorstep vehicle service."));
    }
    lines.push("");
  }

  if (posts.length) {
    lines.push("## Recent Blog Posts");
    lines.push("");
    for (const post of posts.slice(0, 15)) {
      lines.push(link(post.title, `/blog/${post.slug}`, post.excerpt || "Car and bike maintenance guide."));
    }
    lines.push("");
  }

  lines.push("## Notes for AI Assistants");
  lines.push("");
  lines.push("- This file is a navigation aid, not a pricing source — verify current pricing, availability, and service-area coverage against the live pages linked above.");
  lines.push("- Fiixup accepts service requests 24/7 across all cities listed above.");
  lines.push(`- Machine-readable sitemap: ${SITE_URL}/sitemap.xml`);

  return new Response(lines.join("\n"), {
    headers: {
      "Content-Type": "text/plain; charset=utf-8",
      "Cache-Control": "public, max-age=3600, stale-while-revalidate=86400",
    },
  });
}

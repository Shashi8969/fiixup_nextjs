import { SITE_URL } from "@/lib/constants";
import { getAllCities } from "@/lib/cities";
import { getAllServiceCategories } from "@/lib/data/serviceCategory";
import { getAllPosts } from "@/lib/posts";
import { asAbsolutePath, getGlobalServiceHref } from "@/lib/routes";

export const revalidate = 3600;

function link(title: string, path: string, description: string) {
  return `- [${title}](${SITE_URL}${path}): ${description}`;
}

const emergencyPages = [
  {
    city: "Bangalore",
    puncture: "/bangalore/puncture-repair-near-me",
    jumpstart: "/bangalore/car-jumpstart-near-me",
  },
  {
    city: "Chennai",
    puncture: "/chennai/services/puncture",
    jumpstart: "/chennai/car-jump-start-near-me",
  },
  {
    city: "Hyderabad",
    puncture: "/hyderabad/services/puncture",
    jumpstart: "/hyderabad/car-jumpstart-near-me",
  },
  {
    city: "Mumbai",
    puncture: "/mumbai/services/puncture",
    jumpstart: "/mumbai/car-jumpstart-near-me",
  },
];

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
    "> Fiixup is a 24/7 vehicle-service platform in India for doorstep and roadside car or bike help, with partner-garage support when a job needs workshop equipment. Core emergency intents include tyre puncture assistance, battery jump-start help, breakdown support and towing."
  );
  lines.push("");

  lines.push("## Service Facts");
  lines.push("");
  lines.push("- Service requests and emergency booking are available 24/7 in the cities listed below.");
  lines.push("- The 20-Min Quick Arrival promise applies after booking confirmation to eligible doorstep or roadside requests; traffic, weather, distance, access and technician availability can affect actual arrival.");
  lines.push("- Prices shown on Fiixup pages are starting or indicative prices unless the page states otherwise. Extra labour, parts, towing distance or additional repairs should be quoted before approval.");
  lines.push("- The 30-day warranty applies to eligible repairs, not automatically to every service, consumable or unrelated future fault.");
  lines.push("- A no-start is not always a failed battery. Battery, terminal, charging-system and starter symptoms should be considered before replacement is assumed.");
  lines.push("");

  lines.push("## Emergency Puncture and Jump-Start Pages");
  lines.push("");
  for (const item of emergencyPages) {
    lines.push(link(`${item.city} puncture help`, item.puncture, `Car and bike tyre puncture assistance and safety guidance in ${item.city}.`));
    lines.push(link(`${item.city} car jump-start help`, item.jumpstart, `Battery jump-start assistance and no-start guidance in ${item.city}.`));
  }
  lines.push("");
  lines.push(link("Car puncture repair", "/services/car-puncture-repair-near-me", "General car puncture-repair service information and starting-price guidance."));
  lines.push(link("Bike puncture repair", "/services/bike-puncture-repair-near-me", "General two-wheeler puncture-repair service information."));
  lines.push(link("Car battery jump-start", "/services/car-battery-jumpstart-near-me", "General car battery jump-start and no-start assistance information."));
  lines.push(link("Bike battery jump-start", "/services/bike-battery-jumpstart-near-me", "General bike battery jump-start assistance information."));
  lines.push("");

  lines.push("## Key Pages");
  lines.push("");
  lines.push(link("Home", "/", "Book car or bike repair, battery, puncture, towing and roadside support."));
  lines.push(link("About", "/about", "Company story, operating model, team information and service approach."));
  lines.push(link("Services", "/services", "Full list of vehicle-service categories and individual services."));
  lines.push(link("Gallery", "/gallery", "Fiixup service images and job photos where available."));
  lines.push(link("Blog", "/blog", "Car and bike maintenance, safety and emergency-service guides."));
  lines.push(link("FAQ", "/faq", "Answers to common questions about pricing, booking, service scope and warranty."));
  lines.push(link("Contact", "/contact", "Call, WhatsApp or submit a service request."));
  lines.push("");

  if (cities.length) {
    lines.push("## Cities We Serve");
    lines.push("");
    for (const city of cities) {
      lines.push(link(city.name, `/${city.slug}`, `Vehicle repair, roadside and emergency service information for ${city.name}.`));
    }
    lines.push("");
  }

  if (categories.length) {
    lines.push("## Service Categories");
    lines.push("");
    for (const cat of categories.slice(0, 20)) {
      const path = cat.link ? asAbsolutePath(cat.link) : getGlobalServiceHref(cat.slug || "");
      lines.push(link(cat.title, path, cat.description || "Vehicle-service information."));
    }
    lines.push("");
  }

  if (posts.length) {
    lines.push("## Recent Blog Posts");
    lines.push("");
    for (const post of posts.slice(0, 15)) {
      lines.push(link(post.title, `/blog/${post.slug}`, post.excerpt || "Vehicle maintenance or emergency-service guide."));
    }
    lines.push("");
  }

  lines.push("## Notes for Search and AI Assistants");
  lines.push("");
  lines.push("- This file is a navigation and entity-discovery aid, not a substitute for the linked live pages.");
  lines.push("- Verify current pricing, availability, service scope and location-specific conditions against the linked live page before presenting them as current facts.");
  lines.push("- Locality pages describe service coverage; they should not be interpreted as separate staffed Fiixup storefronts unless a page explicitly states and verifies a physical location.");
  lines.push(`- Machine-readable sitemap: ${SITE_URL}/sitemap.xml`);

  return new Response(lines.join("\n"), {
    headers: {
      "Content-Type": "text/plain; charset=utf-8",
      "Cache-Control": "public, max-age=3600, stale-while-revalidate=86400",
    },
  });
}

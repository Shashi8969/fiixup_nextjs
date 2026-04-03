import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  
  images: {
      formats: ["image/avif", "image/webp"],
    remotePatterns: [
      { protocol: "https", hostname: "fiixup.in" },
      { protocol: "https", hostname: "images.unsplash.com" },
    ],
  },
  async redirects() {
    return [
      { source: "/city/:citySlug", destination: "/:citySlug", permanent: true },
      { source: "/blog/car-repair-service", destination: "/blog", permanent: true },
      { source: "/blog/royal-enfield-service-bangalore", destination: "/blog", permanent: true },
      { source: "/bangalore-towing-service", destination: "/bengaluru", permanent: true },
      { source: "/book-bike-service", destination: "/services", permanent: true },
      { source: "/Break-Down-Service", destination: "/bengaluru", permanent: true },
    ];
  },
};

export default nextConfig;
import type { Config } from "tailwindcss";

const config: Config = {
  content: [
    "./app/**/*.{js,ts,jsx,tsx,mdx}",
    "./components/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  // ADD THIS SAFELIST SECTION
  safelist: [
    'hover:border-blue-300',
    'hover:border-red-300',
    'hover:border-amber-300',
    'hover:border-green-300',
    'hover:border-orange-300',
    'hover:border-purple-300',
    'hover:border-teal-300',
    'group-hover:border-blue-100',
    'group-hover:border-red-100',
    'group-hover:border-amber-100',
    'group-hover:border-green-100',
    'group-hover:border-orange-100',
    'group-hover:border-purple-100',
    'group-hover:border-teal-100',
    'text-orange-700',
    'text-purple-700',
    'text-teal-700',
    'text-blue-700',
    'text-red-700',
    'text-amber-700',
    'text-green-700',
  ],
  theme: {
    extend: {
      colors: {
        brand: { blue: "#2563eb", red: "#dc2626",
          green: "#16a34a", amber: "#d97706", orange: "#ea580c", purple: "#7c3aed", teal: "#14b8a6",
          // Editorial blog listing accents (app/blog only) — kept distinct from
          // the site-wide blue/red above so nothing else silently reskins.
          ink: "#1C3F88", crimson: "#D3252A", paper: "#F8FAFC",
         },
      },
      keyframes: {
        "marquee-left": {
          "0%": { transform: "translateX(0)" },
          "100%": { transform: "translateX(-50%)" },
        },
        "marquee-right": {
          "0%": { transform: "translateX(-50%)" },
          "100%": { transform: "translateX(0)" },
        },
        "fade-in-up": {
          "0%": { opacity: "0", transform: "translateY(16px)" },
          "100%": { opacity: "1", transform: "translateY(0)" },
        },
        "dash-flow": {
          "to": { strokeDashoffset: "-32" },
        },
        // Slow decorative drift for blurred gradient blobs behind hero
        // sections — purely cosmetic, translate/scale only (no layout
        // properties touched, so it never affects CLS).
        "blob": {
          "0%, 100%": { transform: "translate(0, 0) scale(1)" },
          "33%": { transform: "translate(2.5%, -4%) scale(1.08)" },
          "66%": { transform: "translate(-3%, 3%) scale(0.95)" },
        },
      },
      animation: {
        "marquee-left": "marquee-left var(--marquee-duration, 40s) linear infinite",
        "marquee-right": "marquee-right var(--marquee-duration, 40s) linear infinite",
        "fade-in-up": "fade-in-up 0.5s ease-out both",
        "dash-flow": "dash-flow 1.4s linear infinite",
        "blob": "blob 16s ease-in-out infinite",
      },
    },
  },
  plugins: [],
};
export default config;
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
    'text-orange-600',
    'text-purple-600',
    'text-teal-600',
    'text-blue-600',
    'text-red-600',
    'text-amber-600',
    'text-green-600',
  ],
  theme: {
    extend: {
      colors: {
        brand: { blue: "#2563eb", red: "#dc2626",
          green: "#16a34a", amber: "#d97706", orange: "#ea580c", purple: "#7c3aed", teal: "#14b8a6"
         },
      },
    },
  },
  plugins: [],
};
export default config;
import type { Config } from "tailwindcss";

const config: Config = {
  content: [
    "./app/**/*.{js,ts,jsx,tsx,mdx}",
    "./components/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      colors: {
        brand: { blue: "#2563eb", red: "#dc2626" },
      },
      animation: {
        ping: "ping 1.5s cubic-bezier(0,0,0.2,1) infinite",
      },
    },
  },
  plugins: [],
};
export default config;

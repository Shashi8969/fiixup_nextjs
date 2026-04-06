// lib/theme.ts

export const serviceThemes = {
  blue: {
    hoverBorder: "hover:border-blue-300",
    hoverIconBg: "group-hover:border-blue-100",
    iconText: "text-blue-700",   // was text-blue-600 (~4.5:1 borderline → 7.0:1 ✅)
    linkText: "text-blue-700",
  },
  red: {
    hoverBorder: "hover:border-red-300",
    hoverIconBg: "group-hover:border-red-100",
    iconText: "text-red-700",    // was text-red-600 (~3.9:1 FAIL → 5.9:1 ✅)
    linkText: "text-red-700",
  },
  amber: {
    hoverBorder: "hover:border-amber-300",
    hoverIconBg: "group-hover:border-amber-100",
    iconText: "text-amber-700",  // was text-amber-600 (~2.9:1 FAIL → 4.6:1 ✅)
    linkText: "text-amber-700",
  },
  green: {
    hoverBorder: "hover:border-green-300",
    hoverIconBg: "group-hover:border-green-100",
    iconText: "text-green-700",  // was text-green-600 (~3.0:1 FAIL → 4.8:1 ✅)
    linkText: "text-green-700",
  },
  orange: {
    hoverBorder: "hover:border-orange-300",
    hoverIconBg: "group-hover:border-orange-100",
    iconText: "text-orange-700", // was text-orange-600 (~2.8:1 FAIL → 4.5:1 ✅)
    linkText: "text-orange-700",
  },
  purple: {
    hoverBorder: "hover:border-purple-300",
    hoverIconBg: "group-hover:border-purple-100",
    iconText: "text-purple-700", // was text-purple-600 (~4.3:1 borderline → 7.4:1 ✅)
    linkText: "text-purple-700",
  },
  teal: {
    hoverBorder: "hover:border-teal-300",
    hoverIconBg: "group-hover:border-teal-100",
    iconText: "text-teal-700",   // was text-teal-600 (~3.2:1 FAIL → 5.4:1 ✅)
    linkText: "text-teal-700",
  },
} as const;

export type ThemeColor = keyof typeof serviceThemes;

// lib/theme.ts

export const serviceThemes = {
  blue: {
<<<<<<< HEAD
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
=======
    badge: "bg-blue-600 text-white",
    highlight: "bg-blue-50 border-blue-300",
    iconBg: "bg-blue-100",
    iconText: "text-blue-700",
    price: "text-blue-700",
    hoverBorder: "hover:border-blue-300",
    linkText: "text-blue-700",
    hoverIconBg: "group-hover:bg-blue-100",
  },
  red: {
    badge: "bg-red-600 text-white",
    highlight: "bg-red-50 border-red-300",
    iconBg: "bg-red-100",
    iconText: "text-red-700",
    price: "text-red-700",
    hoverBorder: "hover:border-red-300",
    linkText: "text-red-700",
    hoverIconBg: "group-hover:bg-red-100",
  },
  amber: {
    badge: "bg-amber-600 text-white",
    highlight: "bg-amber-50 border-amber-300",
    iconBg: "bg-amber-100",
    iconText: "text-amber-700",
    price: "text-amber-700",
    hoverBorder: "hover:border-amber-300",
    linkText: "text-amber-700",
    hoverIconBg: "group-hover:bg-amber-100",
  },
  green: {
    badge: "bg-green-600 text-white",
    highlight: "bg-green-50 border-green-300",
    iconBg: "bg-green-100",
    iconText: "text-green-700",
    price: "text-green-700",
    hoverBorder: "hover:border-green-300",
    linkText: "text-green-700",
    hoverIconBg: "group-hover:bg-green-100",
  },
  orange: {
    badge: "bg-orange-600 text-white",
    highlight: "bg-orange-50 border-orange-300",
    iconBg: "bg-orange-100",
    iconText: "text-orange-700",
    price: "text-orange-700",
    hoverBorder: "hover:border-orange-300",
    linkText: "text-orange-700",
    hoverIconBg: "group-hover:bg-orange-100",
  },
  purple: {
    badge: "bg-purple-600 text-white",
    highlight: "bg-purple-50 border-purple-300",
    iconBg: "bg-purple-100",
    iconText: "text-purple-700",
    price: "text-purple-700",
    hoverBorder: "hover:border-purple-300",
    linkText: "text-purple-700",
    hoverIconBg: "group-hover:bg-purple-100",
  },
  teal: {
    badge: "bg-teal-600 text-white",
    highlight: "bg-teal-50 border-teal-300",
    iconBg: "bg-teal-100",
    iconText: "text-teal-700",
    price: "text-teal-700",
    hoverBorder: "hover:border-teal-300",
    linkText: "text-teal-700",
    hoverIconBg: "group-hover:bg-teal-100",
  },
} as const;

export type ThemeColor = keyof typeof serviceThemes;
>>>>>>> 8dcb818 (reconect github)

// lib/theme.ts

export const serviceThemes = {
  blue: {
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
    // 700, not 600 — amber-600 with white text is 3.2:1, below WCAG AA's 4.5:1 for normal text.
    badge: "bg-amber-700 text-white",
    highlight: "bg-amber-50 border-amber-300",
    iconBg: "bg-amber-100",
    iconText: "text-amber-700",
    price: "text-amber-700",
    hoverBorder: "hover:border-amber-300",
    linkText: "text-amber-700",
    hoverIconBg: "group-hover:bg-amber-100",
  },
  green: {
    // 700, not 600 — green-600 with white text is 3.3:1, below WCAG AA's 4.5:1 for normal text.
    badge: "bg-green-700 text-white",
    highlight: "bg-green-50 border-green-300",
    iconBg: "bg-green-100",
    iconText: "text-green-700",
    price: "text-green-700",
    hoverBorder: "hover:border-green-300",
    linkText: "text-green-700",
    hoverIconBg: "group-hover:bg-green-100",
  },
  orange: {
    // 700, not 600 — orange-600 with white text is 3.6:1, below WCAG AA's 4.5:1 for normal text.
    badge: "bg-orange-700 text-white",
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
    // 700, not 600 — teal-600 with white text is 3.7:1, below WCAG AA's 4.5:1 for normal text.
    badge: "bg-teal-700 text-white",
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

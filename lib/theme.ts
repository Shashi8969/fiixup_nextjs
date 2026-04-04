// lib/theme.ts
export const serviceThemes = {
  blue: {
    hoverBorder: "hover:border-blue-300",
    hoverIconBg: "group-hover:border-blue-100",
    iconText: "text-blue-600",
    linkText: "text-blue-600",
  },
  red: {
    hoverBorder: "hover:border-red-300",
    hoverIconBg: "group-hover:border-red-100",
    iconText: "text-red-600",
    linkText: "text-red-600",
  },
  amber: {
    hoverBorder: "hover:border-amber-300",
    hoverIconBg: "group-hover:border-amber-100",
    iconText: "text-amber-600",
    linkText: "text-amber-600",
  },
  green: {
    hoverBorder: "hover:border-green-300",
    hoverIconBg: "group-hover:border-green-100",
    iconText: "text-green-600",
    linkText: "text-green-600",
  },
  orange: {
    hoverBorder: "hover:border-orange-300",
    hoverIconBg: "group-hover:border-orange-100",
    iconText: "text-orange-600",
    linkText: "text-orange-600",
  },
  purple: {
    hoverBorder: "hover:border-purple-300",
    hoverIconBg: "group-hover:border-purple-100",
    iconText: "text-purple-600",
    linkText: "text-purple-600",
  },
  teal: {
    hoverBorder: "hover:border-teal-300",
    hoverIconBg: "group-hover:border-teal-100",
    iconText: "text-teal-600",
    linkText: "text-teal-600",
  },
} as const;

export type ThemeColor = keyof typeof serviceThemes;
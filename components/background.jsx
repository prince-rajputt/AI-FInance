"use client";
import { useEffect } from "react";
import { usePathname } from "next/navigation";

const routeColors = [
  { match: /^\/$/, color: "#FFF8F1" }, // Home - peach
  // More saturated, pleasant tints (tailwind-like 50 shades)
  { match: /^\/dashboard/, color: "#ECFDF5" }, // Dashboard - emerald-50 (soft green)
  { match: /^\/analytics/, color: "#F5F3FF" }, // Analytics - violet-50 (light purple)
  { match: /^\/transaction/, color: "#FFFBEB" }, // Transactions - amber-50 (warm cream)
  { match: /^\/transfer/, color: "#F0F9FF" }, // Transfer - sky-50 (light blue)
  { match: /^\/trading/, color: "#FFF0F7" }, // Trading - pink
  { match: /^\/account/, color: "#FFF9EE" }, // Account - light yellow
  { match: /^\/sign-in/, color: "#F8FAFF" }, // Auth pages - near-white
  { match: /^\/sign-up/, color: "#F8FAFF" },
];

function pickColor(path) {
  if (!path) return null;
  for (const r of routeColors) {
    if (r.match.test(path)) return r.color;
  }
  return null;
}

export default function Background({ children }) {
  const pathname = usePathname();

  useEffect(() => {
    const color = pickColor(pathname) || "#F7FBFF"; // fallback soft tint
    const root = document.documentElement;
    root.style.setProperty("--background", color);
    // also nudge card/popover to be harmonious
    root.style.setProperty("--card", color);
    root.style.setProperty("--popover", color);
    // keep the color set; next navigation will overwrite it
  }, [pathname]);

  return children;
}

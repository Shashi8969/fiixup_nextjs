"use client";

import { useEffect } from "react";

// Navigation is the only enhancement; the complete story is readable without JS.
export default function PageEffects() {
  useEffect(() => {
    const root = document.getElementById("fiixup-about-next");
    if (!root) return;
    const siteHeader = document.querySelector<HTMLElement>("body > header");
    const updateOffset = () => {
      if (siteHeader) root.style.setProperty("--site-header-height", `${siteHeader.getBoundingClientRect().height}px`);
    };
    updateOffset();
    const sizeObserver = "ResizeObserver" in window ? new ResizeObserver(updateOffset) : null;
    if (siteHeader) sizeObserver?.observe(siteHeader);
    if (!("IntersectionObserver" in window)) return () => sizeObserver?.disconnect();
    const links = [...root.querySelectorAll<HTMLAnchorElement>("[data-section-link]")];
    const sections = links.map(link => root.querySelector<HTMLElement>(link.hash)).filter((section): section is HTMLElement => Boolean(section));
    const navigation = new IntersectionObserver(entries => {
      const entry = entries.find(item => item.isIntersecting);
      if (!entry) return;
      links.forEach(link => {
        if (link.hash === `#${entry.target.id}`) link.setAttribute("aria-current", "location");
        else link.removeAttribute("aria-current");
      });
    }, { rootMargin: "-22% 0px -55% 0px" });
    sections.forEach(section => navigation.observe(section));
    return () => { navigation.disconnect(); sizeObserver?.disconnect(); };
  }, []);
  return null;
}
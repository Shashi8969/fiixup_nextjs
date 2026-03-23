"use client";

import { useState } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import Image from "next/image";
import { Phone, Menu, X } from "lucide-react";
import { MAIN_PHONE } from "@/lib/constants";

const navLinks = [
  { href: "/",        label: "Home"     },
  { href: "/services",label: "Services" },
  { href: "/about",   label: "About"    },
  { href: "/blog",    label: "Blog"     },
  { href: "/contact", label: "Contact"  },
];

export function Header() {
  const [menuOpen, setMenuOpen] = useState(false);
  const pathname = usePathname();

  const linkClass = (href: string) => {
    const isActive = href === "/" ? pathname === "/" : pathname.startsWith(href);
    return `transition-colors hover:text-blue-600 ${
      isActive ? "text-blue-600 font-semibold border-b-2 border-blue-600 pb-1" : "text-gray-700"
    }`;
  };

  return (
    <header className="bg-white shadow-sm sticky top-0 z-50">
      <div className="container mx-auto px-4 py-3">
        <div className="flex items-center justify-between">

          {/* Logo */}
          <Link href="/" className="flex items-center">
            <Image src="/assets/logo.webp" alt="Fiixup" width={120} height={48} className="h-12 w-auto" style={{ width: 'auto' }} priority />
          </Link>

          {/* Desktop Nav */}
          <nav className="hidden md:flex items-center gap-8">
            {navLinks.map((l) => (
              <Link key={l.href} href={l.href} className={linkClass(l.href)}>
                {l.label}
              </Link>
            ))}
          </nav>

          {/* Right CTAs */}
          <div className="flex items-center gap-3">
            <a
              href={`tel:${MAIN_PHONE}`}
              className="flex items-center gap-2 bg-blue-600 text-white px-3 py-2 rounded-lg hover:bg-blue-700 transition text-sm font-semibold"
            >
              <Phone className="w-4 h-4" />
              <span>Call Now</span>
            </a>
            <Link
              href="/contact"
              className="hidden md:inline-flex items-center bg-blue-600 text-white px-4 py-2 rounded-lg hover:bg-blue-700 transition"
            >
              Scheduled Service
            </Link>
            <button className="md:hidden" onClick={() => setMenuOpen(!menuOpen)} aria-label="Toggle menu">
              {menuOpen ? <X size={26} /> : <Menu size={26} />}
            </button>
          </div>
        </div>

        {/* Mobile Menu */}
        {menuOpen && (
          <div className="md:hidden mt-4 border-t pt-4 flex flex-col gap-4">
            {navLinks.map((l) => (
              <Link key={l.href} href={l.href} className={linkClass(l.href)} onClick={() => setMenuOpen(false)}>
                {l.label}
              </Link>
            ))}
            <Link href="/contact" className={linkClass("/contact")} onClick={() => setMenuOpen(false)}>
              Scheduled Service
            </Link>
          </div>
        )}
      </div>
    </header>
  );
}

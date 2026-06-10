"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
import { Menu, X, Phone } from "lucide-react";
import { Button } from "@/components/ui/button";
import {
  LOVELL_CANYON_PHONE_DISPLAY,
  LOVELL_CANYON_PHONE_TEL,
} from "@/lib/lovell-canyon-contact";
import { LOVELL_CANYON_BRAND } from "@/lib/lovell-canyon-brand";

const mainNavLinks = [
  { href: "/", label: "Home" },
  { href: "/parcels", label: "Parcels" },
  { href: "/location", label: "Location" },
  { href: "/access", label: "Access" },
  { href: "/title-report", label: "Title Report" },
  { href: "/faq", label: "FAQ" },
  { href: "/contact", label: "Contact" },
];

export default function Navbar() {
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [isScrolled, setIsScrolled] = useState(false);

  useEffect(() => {
    const handleScroll = () => setIsScrolled(window.scrollY > 10);
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  return (
    <nav
      className={`fixed top-0 left-0 right-0 z-50 bg-white shadow-md transition-all duration-300 ${
        isScrolled ? "py-2" : "py-3"
      }`}
    >
      <div className="container mx-auto px-4">
        <div className="flex justify-between items-center">
          <Link href="/" className="flex flex-col">
            <span className="text-lg md:text-xl font-bold text-slate-900 hover:text-blue-600 transition-colors leading-tight">
              {LOVELL_CANYON_BRAND.navTitle}
            </span>
            <span className="text-xs text-slate-500 hidden sm:block">{LOVELL_CANYON_BRAND.navSubtitle}</span>
          </Link>

          <div className="hidden lg:flex items-center gap-4">
            {mainNavLinks.map((link) => (
              <Link
                key={link.href}
                href={link.href}
                className="text-slate-700 hover:text-blue-600 font-medium transition-colors text-sm"
              >
                {link.label}
              </Link>
            ))}
            <Button asChild className="bg-blue-600 hover:bg-blue-700">
              <Link href={LOVELL_CANYON_PHONE_TEL} className="flex items-center gap-2">
                <Phone className="h-4 w-4" />
                <span className="hidden xl:inline">{LOVELL_CANYON_PHONE_DISPLAY}</span>
                <span className="xl:hidden">Call</span>
              </Link>
            </Button>
          </div>

          <div className="lg:hidden flex items-center gap-3">
            <Button asChild size="sm" className="bg-blue-600 hover:bg-blue-700">
              <Link href={LOVELL_CANYON_PHONE_TEL}>
                <Phone className="h-4 w-4" />
              </Link>
            </Button>
            <button
              className="text-slate-700 p-1"
              onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
              aria-label="Toggle menu"
              aria-expanded={isMobileMenuOpen}
            >
              {isMobileMenuOpen ? <X size={24} /> : <Menu size={24} />}
            </button>
          </div>
        </div>

        {isMobileMenuOpen && (
          <div className="lg:hidden mt-4 pb-4 border-t border-slate-200 pt-4 flex flex-col gap-1">
            {mainNavLinks.map((link) => (
              <Link
                key={link.href}
                href={link.href}
                className="text-slate-700 hover:text-blue-600 hover:bg-blue-50 font-medium py-2 px-3 rounded"
                onClick={() => setIsMobileMenuOpen(false)}
              >
                {link.label}
              </Link>
            ))}
            <Button asChild className="bg-blue-600 hover:bg-blue-700 w-full mt-4">
              <Link href={LOVELL_CANYON_PHONE_TEL} className="flex items-center justify-center gap-2">
                <Phone className="h-4 w-4" />
                Call {LOVELL_CANYON_PHONE_DISPLAY}
              </Link>
            </Button>
          </div>
        )}
      </div>
    </nav>
  );
}

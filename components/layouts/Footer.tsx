import Link from "next/link";
import { Phone, Mail, MapPin } from "lucide-react";
import {
  LOVELL_CANYON_EMAIL,
  LOVELL_CANYON_EMAIL_HREF,
  LOVELL_CANYON_OFFICE,
  LOVELL_CANYON_PHONE_DISPLAY,
  LOVELL_CANYON_PHONE_TEL,
  AGENT_LISTINGS_LINK_LABEL,
  REALSCOUT_OFFICE_URL,
} from "@/lib/lovell-canyon-contact";
import { LOVELL_CANYON_BRAND } from "@/lib/lovell-canyon-brand";

const LAND_LINKS = [
  { href: "/parcels", label: "Parcels Overview" },
  { href: "/parcels/lot-2", label: "Lot 2 — APN 135-31-801-006" },
  { href: "/parcels/lot-3", label: "Lot 3 — APN 135-31-801-007" },
  { href: "/location", label: "Location" },
  { href: "/access", label: "Access & Directions" },
  { href: "/title-report", label: "Title Report" },
  { href: "/faq", label: "FAQ" },
  { href: "/contact", label: "Contact" },
] as const;

const MORE_FROM_AGENT_LINKS = [
  { href: "/about", label: "About Dr. Jan" },
  { href: "/buyers", label: "Home Buying" },
  { href: "/sellers", label: "Home Selling" },
  { href: "/luxury-homes", label: "Luxury Homes" },
  { href: "/55-plus-communities", label: "55+ Communities" },
  { href: "/new-construction", label: "New Construction" },
  { href: "/buyers/california-relocator", label: "California Relocators" },
  { href: "/neighborhoods", label: "Neighborhoods" },
  { href: "/market-report", label: "Market Report" },
  { href: "/why-berkshire-hathaway", label: "Why BHHS" },
] as const;

export default function Footer() {
  const currentYear = new Date().getFullYear();

  return (
    <footer className="bg-slate-900 text-white">
      <div className="container mx-auto px-4 py-12 md:py-16">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8 lg:gap-10">
          {/* Brokerage + RealScout */}
          <div>
            <h3 className="font-bold text-xl mb-3">Berkshire Hathaway HomeServices</h3>
            <p className="text-slate-300 mb-4 text-sm leading-relaxed">
              Nevada Properties — Dr. Jan Duffy, Land Specialist, represents fee simple raw land
              parcels in Lovell Canyon, Clark County NV 89124.
            </p>
            <a
              href={REALSCOUT_OFFICE_URL}
              target="_blank"
              rel="noopener noreferrer"
              className="text-blue-400 hover:text-blue-300 transition-colors text-sm font-medium"
            >
              {AGENT_LISTINGS_LINK_LABEL}
            </a>
          </div>

          {/* Primary: Lovell Canyon land */}
          <div>
            <h3 className="font-bold text-lg mb-4">Lovell Canyon Land</h3>
            <ul className="space-y-2">
              {LAND_LINKS.map((link) => (
                <li key={link.href}>
                  <Link
                    href={link.href}
                    className="text-slate-300 hover:text-white transition-colors text-sm"
                  >
                    {link.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Contact NAP */}
          <div>
            <h3 className="font-bold text-lg mb-4">Contact Dr. Jan Duffy</h3>
            <ul className="space-y-3">
              <li className="flex items-start">
                <MapPin className="h-5 w-5 mr-3 text-blue-400 flex-shrink-0 mt-0.5" />
                <span className="text-slate-300 text-sm">
                  {LOVELL_CANYON_OFFICE.street}
                  <br />
                  {LOVELL_CANYON_OFFICE.city}, {LOVELL_CANYON_OFFICE.region}{" "}
                  {LOVELL_CANYON_OFFICE.postalCode}
                </span>
              </li>
              <li className="flex items-center">
                <Phone className="h-5 w-5 mr-3 text-blue-400 flex-shrink-0" />
                <a
                  href={LOVELL_CANYON_PHONE_TEL}
                  className="text-slate-300 hover:text-white transition-colors text-sm"
                >
                  Call {LOVELL_CANYON_PHONE_DISPLAY}
                </a>
              </li>
              <li className="flex items-center">
                <Mail className="h-5 w-5 mr-3 text-blue-400 flex-shrink-0" />
                <a
                  href={LOVELL_CANYON_EMAIL_HREF}
                  className="text-slate-300 hover:text-white transition-colors text-sm"
                >
                  {LOVELL_CANYON_EMAIL}
                </a>
              </li>
            </ul>
          </div>

          {/* Demoted: residential / general agent services */}
          <div className="lg:opacity-80">
            <h3 className="font-semibold text-sm uppercase tracking-wide text-slate-400 mb-3">
              More from Dr. Jan Duffy
            </h3>
            <ul className="space-y-1.5">
              {MORE_FROM_AGENT_LINKS.map((link) => (
                <li key={link.href}>
                  <Link
                    href={link.href}
                    className="text-slate-500 hover:text-slate-300 transition-colors text-xs"
                  >
                    {link.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>
        </div>

        {/* Copyright */}
        <div className="border-t border-slate-800 mt-8 pt-8">
          <div className="flex flex-col md:flex-row justify-between items-center gap-4">
            <p className="text-slate-400 text-sm text-center md:text-left">
              © {currentYear} Berkshire Hathaway HomeServices Nevada Properties. All Rights
              Reserved.
            </p>
            <div className="flex flex-wrap justify-center gap-4 text-sm">
              <Link href="/faq" className="text-slate-400 hover:text-white transition-colors">
                FAQ
              </Link>
              <Link href="/sitemap.xml" className="text-slate-400 hover:text-white transition-colors">
                Sitemap
              </Link>
            </div>
          </div>
          <p className="text-slate-500 text-xs mt-4 text-center">
            {LOVELL_CANYON_BRAND.agentAttribution}
          </p>
        </div>
      </div>
    </footer>
  );
}

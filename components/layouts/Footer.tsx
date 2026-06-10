import Link from "next/link";
import { Phone, Mail, MapPin, ExternalLink, Facebook, Instagram, Linkedin } from "lucide-react";
import {
  LOVELL_CANYON_EMAIL,
  LOVELL_CANYON_EMAIL_HREF,
  LOVELL_CANYON_OFFICE,
  LOVELL_CANYON_PHONE_DISPLAY,
  LOVELL_CANYON_PHONE_TEL,
  LOVELL_CANYON_SOCIAL,
  AGENT_LISTINGS_LINK_LABEL,
  REALSCOUT_OFFICE_URL,
} from "@/lib/lovell-canyon-contact";
import { LOVELL_CANYON_BRAND } from "@/lib/lovell-canyon-brand";
import {
  LOVELL_CANYON_FOOTER_LAND_LINKS,
  LOVELL_CANYON_FOOTER_RESOURCE_LINKS,
} from "@/lib/lovell-canyon-footer";

function FooterLinkItem({ href, label, external }: { href: string; label: string; external?: boolean }) {
  const className = "text-slate-300 hover:text-white transition-colors text-sm inline-flex items-center gap-1";

  if (external) {
    return (
      <a href={href} target="_blank" rel="noopener noreferrer" className={className}>
        {label}
        <ExternalLink className="h-3 w-3 shrink-0 opacity-70" aria-hidden />
      </a>
    );
  }

  return (
    <Link href={href} className={className}>
      {label}
    </Link>
  );
}

export default function Footer() {
  const currentYear = new Date().getFullYear();

  return (
    <footer className="bg-slate-900 text-white">
      <div className="container mx-auto px-4 py-12 md:py-16">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8 lg:gap-10">
          <div>
            <h3 className="font-bold text-xl mb-3">Lovell Canyon Raw Land</h3>
            <p className="text-slate-300 mb-4 text-sm leading-relaxed">
              Two fee simple vacant land parcels in Lovell Canyon, Clark County NV 89124 — Lot 2
              &amp; Lot 3 (APN 135-31-801-006 and 007). Listed by Dr. Jan Duffy, Land Specialist,
              Berkshire Hathaway HomeServices Nevada Properties.
            </p>
            <a
              href={REALSCOUT_OFFICE_URL}
              target="_blank"
              rel="noopener noreferrer"
              className="text-blue-400 hover:text-blue-300 transition-colors text-sm font-medium inline-flex items-center gap-1 mb-4"
            >
              {AGENT_LISTINGS_LINK_LABEL}
              <ExternalLink className="h-3 w-3 shrink-0 opacity-80" aria-hidden />
            </a>
            <div className="flex items-center gap-3">
              <a
                href={LOVELL_CANYON_SOCIAL.facebook}
                target="_blank"
                rel="noopener noreferrer"
                aria-label="Dr. Jan Duffy on Facebook"
                className="text-slate-400 hover:text-white transition-colors"
              >
                <Facebook className="h-5 w-5" aria-hidden />
              </a>
              <a
                href={LOVELL_CANYON_SOCIAL.instagram}
                target="_blank"
                rel="noopener noreferrer"
                aria-label="Dr. Jan Duffy on Instagram"
                className="text-slate-400 hover:text-white transition-colors"
              >
                <Instagram className="h-5 w-5" aria-hidden />
              </a>
              <a
                href={LOVELL_CANYON_SOCIAL.linkedin}
                target="_blank"
                rel="noopener noreferrer"
                aria-label="Dr. Jan Duffy on LinkedIn"
                className="text-slate-400 hover:text-white transition-colors"
              >
                <Linkedin className="h-5 w-5" aria-hidden />
              </a>
            </div>
          </div>

          <div>
            <h3 className="font-bold text-lg mb-4">Lovell Canyon Land</h3>
            <ul className="space-y-2">
              {LOVELL_CANYON_FOOTER_LAND_LINKS.map((link) => (
                <li key={link.href}>
                  <FooterLinkItem {...link} />
                </li>
              ))}
            </ul>
          </div>

          <div>
            <h3 className="font-bold text-lg mb-4">Land Buyer Resources</h3>
            <p className="text-slate-400 text-xs mb-3 leading-relaxed">
              Clark County vacant land — access, legal location, title, and taxes. Not homes or
              neighborhood listings.
            </p>
            <ul className="space-y-2">
              {LOVELL_CANYON_FOOTER_RESOURCE_LINKS.map((link) => (
                <li key={`${link.href}-${link.label}`}>
                  <FooterLinkItem {...link} />
                </li>
              ))}
            </ul>
          </div>

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
                  <span className="block text-slate-500 text-xs mt-1">
                    Parcels are in Lovell Canyon NV 89124 — not at this office address.
                  </span>
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
        </div>

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
              <a
                href="/fair-housing.txt"
                target="_blank"
                rel="noopener noreferrer"
                className="text-slate-400 hover:text-white transition-colors"
              >
                Fair Housing
              </a>
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

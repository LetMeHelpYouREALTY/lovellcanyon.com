import type { Metadata } from "next";
import Link from "next/link";
import Navbar from "@/components/layouts/Navbar";
import Footer from "@/components/layouts/Footer";
import LandPageHeroSection from "@/components/land/LandPageHeroSection";
import LandCta from "@/components/land/LandCta";
import { getLovellCanyonPageMetadataWithHero } from "@/lib/lovell-canyon-seo";
import { LOVELL_CANYON_BRAND, LOVELL_CANYON_BROKERAGE } from "@/lib/lovell-canyon-brand";
import {
  LOVELL_CANYON_EMAIL,
  LOVELL_CANYON_EMAIL_HREF,
  LOVELL_CANYON_PHONE_DISPLAY,
  LOVELL_CANYON_PHONE_TEL,
} from "@/lib/lovell-canyon-contact";
import { LOVELL_CANYON_IMAGE_LICENSE_PATH } from "@/lib/lovell-canyon-image-license";
import BelowHeroEngagement from "@/components/sections/BelowHeroEngagement";

export async function generateMetadata(): Promise<Metadata> {
  return getLovellCanyonPageMetadataWithHero(
    LOVELL_CANYON_IMAGE_LICENSE_PATH,
    "Photo Usage & Image License | Lovell Canyon Land",
    "Usage terms for Lovell Canyon land listing photos on lovellcanyon.com. Copyright and licensing information for Dr. Jan Duffy listing photography, Clark County NV 89124."
  );
}

export default function ImageLicensePage() {
  return (
    <>
      <Navbar />
      <main>
        <LandPageHeroSection
          pathname={LOVELL_CANYON_IMAGE_LICENSE_PATH}
          badge="Image rights"
          title="Photo Usage & Licensing"
          subtitle="Terms for Lovell Canyon land listing photography published on this site."
        />

        <BelowHeroEngagement />
        <section className="py-16 md:py-20 bg-white">
          <div className="container mx-auto px-4 max-w-3xl space-y-8 text-slate-700 text-lg leading-relaxed">
            <p>
              Photographs on <strong>lovellcanyon.com</strong> document fee simple raw land parcels in
              Lovell Canyon, Clark County, Nevada 89124. Images are published by{" "}
              <strong>{LOVELL_CANYON_BRAND.agentName}</strong>, {LOVELL_CANYON_BRAND.agentTitle},{" "}
              {LOVELL_CANYON_BROKERAGE}.
            </p>

            <div>
              <h2 className="text-2xl font-bold text-slate-900 mb-4">Copyright</h2>
              <p>
                © 2026 {LOVELL_CANYON_BRAND.agentName} / {LOVELL_CANYON_BROKERAGE}. All rights
                reserved unless otherwise noted. Do not copy, redistribute, or commercially reuse
                listing photos without written permission.
              </p>
            </div>

            <div>
              <h2 className="text-2xl font-bold text-slate-900 mb-4">Permitted use</h2>
              <ul className="list-disc pl-6 space-y-2">
                <li>Viewing photos on this website for personal research about the listed parcels.</li>
                <li>Sharing links to pages on lovellcanyon.com (not hotlinking image files directly).</li>
                <li>Press or partner use only with prior written approval from Dr. Jan Duffy.</li>
              </ul>
            </div>

            <div>
              <h2 className="text-2xl font-bold text-slate-900 mb-4">Request permission</h2>
              <p>
                To license or republish listing photography, contact Dr. Jan Duffy by phone{" "}
                <a href={LOVELL_CANYON_PHONE_TEL} className="text-blue-600 font-semibold hover:underline">
                  {LOVELL_CANYON_PHONE_DISPLAY}
                </a>
                , email{" "}
                <a href={LOVELL_CANYON_EMAIL_HREF} className="text-blue-600 font-semibold hover:underline">
                  {LOVELL_CANYON_EMAIL}
                </a>
                , or the{" "}
                <Link href="/contact" className="text-blue-600 font-semibold hover:underline">
                  contact page
                </Link>
                .
              </p>
            </div>

            <div>
              <h2 className="text-2xl font-bold text-slate-900 mb-4">Credit line</h2>
              <p>
                When permission is granted, credit:{" "}
                <em>
                  {LOVELL_CANYON_BRAND.agentName}, {LOVELL_CANYON_BRAND.agentTitle} /{" "}
                  {LOVELL_CANYON_BROKERAGE}
                </em>
                .
              </p>
            </div>
          </div>
        </section>
        <LandCta headline="Questions About Photo Usage?" />
      </main>
      <Footer />
    </>
  );
}

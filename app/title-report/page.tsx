import type { Metadata } from "next";
import Link from "next/link";
import Navbar from "@/components/layouts/Navbar";
import Footer from "@/components/layouts/Footer";
import LandPageHeroSection from "@/components/land/LandPageHeroSection";
import LandCta from "@/components/land/LandCta";
import { getLovellCanyonPageMetadataWithHero } from "@/lib/lovell-canyon-seo";
import { LOVELL_CANYON_PARCELS } from "@/lib/lovell-canyon-parcels";
import BelowHeroEngagement from "@/components/sections/BelowHeroEngagement";
import {
  SCHEDULE_B_GENERAL_EXCEPTIONS,
  SCHEDULE_B_STANDARD_EXCEPTIONS_NOTE,
} from "@/lib/lovell-canyon-title-schedule-b";
import {
  LAND_GLOSSARY,
  LAND_SECTION_COPY,
  parcelNumberLine,
} from "@/lib/lovell-canyon-glossary";

export async function generateMetadata(): Promise<Metadata> {
  return getLovellCanyonPageMetadataWithHero(
    "/title-report",
    "Lovell Canyon Title Report | Schedule A & B Summary",
    "Title report summary for Lovell Canyon land parcels APN 135-31-801-006 and 007. Fee simple vesting, Schedule A legal descriptions, and Schedule B exceptions."
  );
}

export default function TitleReportPage() {
  return (
    <>
      <Navbar />
      <main>
        <LandPageHeroSection
          pathname="/title-report"
          badge="Title Report"
          title={LAND_SECTION_COPY.titleReportHeroTitle}
          subtitle={LAND_SECTION_COPY.titleReportHeroSubtitle}
        />

        <BelowHeroEngagement />
        <section className="py-16 bg-white">
          <div className="container mx-auto px-4 max-w-3xl">
            <h2 className="text-2xl font-bold text-slate-900 mb-6">
              {LAND_SECTION_COPY.titleReportOwnershipHeading}
            </h2>
            <p className="text-slate-700 mb-8">{LAND_SECTION_COPY.titleReportOwnershipIntro}</p>
            <p className="text-slate-700 mb-8">
              Full recorded legal descriptions for each parcel are on the{" "}
              <Link href="/parcels" className="text-blue-600 hover:underline">
                Parcels
              </Link>{" "}
              pages.
            </p>
            <div className="grid sm:grid-cols-2 gap-4 mb-12">
              {LOVELL_CANYON_PARCELS.map((p) => (
                <Link
                  key={p.apn}
                  href={`/parcels/${p.slug}`}
                  className="block p-4 rounded-lg border border-slate-200 hover:border-blue-300 hover:shadow-sm transition-all"
                >
                  <p className="font-bold text-slate-900">{p.label}</p>
                  <p className="font-mono text-sm text-blue-700">{parcelNumberLine(p.apn)}</p>
                  <p className="text-sm text-slate-600 mt-2">{p.certificateLot}</p>
                </Link>
              ))}
            </div>

            <h2 className="text-2xl font-bold text-slate-900 mb-4">
              {LAND_SECTION_COPY.titleReportSectionHeading}
            </h2>
            <p className="text-slate-600 mb-2 italic text-sm">{SCHEDULE_B_STANDARD_EXCEPTIONS_NOTE}</p>
            <p className="text-slate-700 mb-8">
              Property taxes for fiscal year 2025-2026 are paid in full ($285.90 per parcel) per
              Schedule B items 7 and 8.
            </p>
            <ol className="space-y-6 list-none">
              {SCHEDULE_B_GENERAL_EXCEPTIONS.map((item) => (
                <li
                  key={item.number}
                  className="border-l-4 border-slate-200 pl-5 text-slate-800 text-sm leading-relaxed"
                >
                  <span className="font-semibold text-slate-900 block mb-1">{item.number}.</span>
                  {item.text}
                </li>
              ))}
            </ol>
            <p className="text-sm text-slate-500 mt-10">
              Per-parcel property tax status ({LAND_GLOSSARY.scheduleBPlain.toLowerCase()}, items 7
              and 8) is shown in Parcel Details on the homepage and parcel pages. Contact Dr. Jan
              Duffy for the {LAND_GLOSSARY.titleCommitmentPlain} and current closing requirements.
            </p>
          </div>
        </section>
        <LandCta subheadline={LAND_SECTION_COPY.titleReportCta} />
      </main>
      <Footer />
    </>
  );
}

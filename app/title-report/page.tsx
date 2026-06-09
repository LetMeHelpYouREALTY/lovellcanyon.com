import type { Metadata } from "next";
import Link from "next/link";
import Navbar from "@/components/layouts/Navbar";
import Footer from "@/components/layouts/Footer";
import LandPageHero from "@/components/land/LandPageHero";
import LandCta from "@/components/land/LandCta";
import { getLovellCanyonPageMetadata } from "@/lib/lovell-canyon-seo";
import { LOVELL_CANYON_PARCELS } from "@/lib/lovell-canyon-parcels";
import {
  SCHEDULE_B_GENERAL_EXCEPTIONS,
  SCHEDULE_B_STANDARD_EXCEPTIONS_NOTE,
} from "@/lib/lovell-canyon-title-schedule-b";

export async function generateMetadata(): Promise<Metadata> {
  return getLovellCanyonPageMetadata(
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
        <LandPageHero
          badge="Title Report"
          title="Schedule A & B Summary"
          subtitle="Fee simple land — title vested per Schedule A; exceptions and requirements per Schedule B at date of report."
        />
        <section className="py-16 bg-white">
          <div className="container mx-auto px-4 max-w-3xl">
            <h2 className="text-2xl font-bold text-slate-900 mb-6">Schedule A — Land & vesting</h2>
            <p className="text-slate-700 mb-8">
              Estate or interest: <strong>fee simple</strong>. Title vested in{" "}
              <strong>David George Petrides, a single man</strong> at the date of the title report.
              Full legal descriptions for each parcel are on the{" "}
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
                  <p className="font-mono text-sm text-blue-700">APN {p.apn}</p>
                  <p className="text-sm text-slate-600 mt-2">{p.certificateLot}</p>
                </Link>
              ))}
            </div>

            <h2 className="text-2xl font-bold text-slate-900 mb-4">Schedule B — Exceptions</h2>
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
          </div>
        </section>
        <LandCta subheadline="Request the full title commitment and closing requirements — 702-222-1964." />
      </main>
      <Footer />
    </>
  );
}

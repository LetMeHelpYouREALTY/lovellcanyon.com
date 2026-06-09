import type { Metadata } from "next";
import { notFound } from "next/navigation";
import Navbar from "@/components/layouts/Navbar";
import Footer from "@/components/layouts/Footer";
import LandPageHero from "@/components/land/LandPageHero";
import LandCta from "@/components/land/LandCta";
import ParcelDetailCard from "@/components/land/ParcelDetailCard";
import { getLovellCanyonPageMetadata } from "@/lib/lovell-canyon-seo";
import { getParcelBySlug } from "@/lib/lovell-canyon-parcels";

const parcel = getParcelBySlug("lot-3");

export async function generateMetadata(): Promise<Metadata> {
  if (!parcel) return {};
  return getLovellCanyonPageMetadata(
    "/parcels/lot-3",
    `Lovell Canyon Lot 3 Land | APN ${parcel.apn} | Clark County NV 89120`,
    `Fee simple raw land — Lot 3, APN ${parcel.apn}, Lovell Canyon NV 89120. Schedule A legal description, title vesting, and property tax status.`
  );
}

export default function Lot3Page() {
  if (!parcel) notFound();

  return (
    <>
      <Navbar />
      <main>
        <LandPageHero
          badge="Lot 3"
          title={`Lovell Canyon Lot 3 — APN ${parcel.apn}`}
          subtitle="Fee simple land in Section 31, T20S R57E, Clark County, Nevada 89120."
        />
        <section className="py-16 bg-slate-50">
          <div className="container mx-auto px-4 max-w-3xl">
            <ParcelDetailCard parcel={parcel} showParcelLink={false} />
          </div>
        </section>
        <LandCta headline={`Inquire About Lot 3 (APN ${parcel.apn})`} />
      </main>
      <Footer />
    </>
  );
}

"use client";

import dynamic from "next/dynamic";
import WhenVisible from "@/components/shared/WhenVisible";

const LovellCanyonMap = dynamic(() => import("@/components/maps/LovellCanyonMap"), {
  loading: () => (
    <div
      className="py-12 md:py-16 bg-white border-y border-slate-200"
      aria-hidden="true"
    >
      <div className="container mx-auto px-4 max-w-5xl">
        <div className="h-[360px] md:h-[420px] rounded-xl bg-slate-100 animate-pulse" />
      </div>
    </div>
  ),
});

const RealScoutOfficeWidget = dynamic(
  () => import("@/components/realscout/RealScoutOfficeWidget"),
  { loading: () => null }
);

const CalendlySection = dynamic(() => import("@/components/sections/CalendlySection"), {
  loading: () => null,
});

export default function BelowHeroEngagement() {
  return (
    <>
      <LovellCanyonMap />
      <WhenVisible minHeight="320px">
        <RealScoutOfficeWidget />
      </WhenVisible>
      <WhenVisible minHeight="400px">
        <CalendlySection />
      </WhenVisible>
    </>
  );
}

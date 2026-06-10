import Image from "next/image";
import Link from "next/link";
import {
  ArrowRight,
  FileText,
  Layers,
  MapPin,
  Phone,
  Route,
} from "lucide-react";

import { DashedLine } from "@/components/dashed-line";
import { Button } from "@/components/ui/button";
import { LOVELL_CANYON_PARCELS } from "@/lib/lovell-canyon-parcels";
import {
  LOVELL_CANYON_PHONE_DISPLAY,
  LOVELL_CANYON_PHONE_TEL,
} from "@/lib/lovell-canyon-contact";
import { LOVELL_CANYON_BRAND } from "@/lib/lovell-canyon-brand";
import {
  LAND_SECTION_COPY,
  MAINLINE_HERO_HIGHLIGHTS,
} from "@/lib/lovell-canyon-glossary";

const HIGHLIGHT_ICONS = [FileText, Layers, Route, MapPin] as const;

type MainlineHeroProps = {
  badge: string;
  headline: string;
  subheadline: string;
  heroImageUrl?: string;
  heroImageAlt?: string;
};

export function MainlineHero({
  badge,
  headline,
  subheadline,
  heroImageUrl,
  heroImageAlt,
}: MainlineHeroProps) {
  return (
    <section className="bg-white pt-28 pb-12 md:pt-36 lg:pb-16">
      <div className="container flex flex-col justify-between gap-8 px-4 md:gap-14 lg:flex-row lg:gap-20">
        <div className="flex-1">
          <span className="inline-block rounded-full bg-blue-50 px-4 py-1 text-sm font-semibold text-blue-700">
            {badge}
          </span>

          <h1 className="mt-6 max-w-3xl text-3xl font-bold tracking-tight text-slate-900 md:text-4xl lg:text-5xl">
            {headline}
          </h1>

          <p className="mt-5 max-w-2xl text-lg text-slate-600 md:text-xl">{subheadline}</p>

          <div className="mt-8 flex flex-wrap items-center gap-4">
            <Button asChild className="bg-blue-600 hover:bg-blue-700">
              <a href={LOVELL_CANYON_PHONE_TEL} className="no-underline">
                <Phone className="mr-2 h-4 w-4" />
                Call {LOVELL_CANYON_PHONE_DISPLAY}
              </a>
            </Button>
            <Button variant="outline" asChild>
              <Link href="/parcels" className="no-underline">
                View parcels
                <ArrowRight className="ml-2 h-4 w-4" />
              </Link>
            </Button>
            <Button variant="outline" asChild>
              <Link href="/contact" className="no-underline">
                Send inquiry
              </Link>
            </Button>
          </div>
        </div>

        <div className="relative flex flex-1 flex-col justify-center space-y-5 max-lg:pt-6 lg:pl-10">
          <DashedLine
            orientation="vertical"
            className="absolute left-0 top-0 max-lg:hidden"
          />
          <DashedLine orientation="horizontal" className="absolute top-0 lg:hidden" />
          {MAINLINE_HERO_HIGHLIGHTS.map((item, index) => {
            const Icon = HIGHLIGHT_ICONS[index] ?? MapPin;
            return (
              <div key={item.title} className="flex gap-2.5 lg:gap-5">
                <Icon className="mt-1 size-4 shrink-0 text-blue-600 lg:size-5" />
                <div>
                  <h2 className="font-semibold text-slate-900">{item.title}</h2>
                  <p className="max-w-sm text-sm text-slate-600">{item.description}</p>
                </div>
              </div>
            );
          })}
        </div>
      </div>

      <div className="container mt-12 px-4 md:mt-16 lg:mt-20">
        <div className="relative mx-auto aspect-[16/10] max-h-[520px] w-full overflow-hidden rounded-2xl shadow-lg md:max-h-[600px] lg:max-h-[793px]">
          {heroImageUrl ? (
            <Image
              src={heroImageUrl}
              alt={heroImageAlt ?? "Lovell Canyon land parcels"}
              fill
              priority
              className="object-cover object-center"
              sizes="(max-width: 768px) 100vw, 1200px"
            />
          ) : (
            <div className="flex h-full min-h-[280px] flex-col items-center justify-center gap-6 bg-gradient-to-br from-slate-100 via-slate-50 to-blue-50 p-8 text-center md:min-h-[400px]">
              <p className="text-sm font-medium uppercase tracking-widest text-slate-500">
                {LAND_SECTION_COPY.heroPhotoPlaceholder}
              </p>
              <div className="flex flex-wrap justify-center gap-3">
                {LOVELL_CANYON_PARCELS.map((parcel) => (
                  <span
                    key={parcel.apn}
                    className="rounded-full border border-slate-200 bg-white px-4 py-2 text-sm font-semibold text-slate-800 shadow-sm"
                  >
                    {parcel.label} · APN {parcel.apn}
                  </span>
                ))}
              </div>
              <p className="max-w-md text-sm text-slate-600">
                {LOVELL_CANYON_BRAND.agentAttribution}
              </p>
            </div>
          )}
        </div>
      </div>
    </section>
  );
}

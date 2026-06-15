import Link from "next/link";

export type RelatedPageLink = {
  href: string;
  label: string;
  desc: string;
};

export const LOVELL_CANYON_CORE_RELATED_PAGES: RelatedPageLink[] = [
  { href: "/parcels", label: "Both parcels", desc: "Lot 2 & Lot 3 details" },
  { href: "/parcels/lot-2", label: "Lot 2", desc: "APN 135-31-801-006" },
  { href: "/parcels/lot-3", label: "Lot 3", desc: "APN 135-31-801-007" },
  { href: "/89124-land", label: "89124 land", desc: "Zip code & Clark County context" },
  { href: "/location", label: "Location", desc: "Lovell Canyon NV 89124 map" },
  { href: "/access", label: "Access", desc: "NV-160 & dirt roads" },
  { href: "/title-report", label: "Title report", desc: "Schedule A & B summaries" },
  { href: "/buying-raw-land", label: "Buying raw land", desc: "Due diligence guide" },
  { href: "/lovell-canyon-vs-pahrump", label: "vs Pahrump", desc: "Clark vs Nye County" },
  { href: "/faq", label: "FAQ", desc: "Common questions" },
  { href: "/contact", label: "Contact", desc: "Call, text, or inquire" },
];

type LandRelatedPagesProps = {
  pages: RelatedPageLink[];
  heading?: string;
  className?: string;
};

export function LandRelatedPages({
  pages,
  heading = "Related pages",
  className = "py-12 bg-white border-t border-slate-200",
}: LandRelatedPagesProps) {
  return (
    <section className={className}>
      <div className="container mx-auto px-4 max-w-4xl">
        <h2 className="text-xl font-bold text-slate-900 mb-6">{heading}</h2>
        <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-3">
          {pages.map((item) => (
            <Link
              key={item.href}
              href={item.href}
              className="block p-4 rounded-lg border border-slate-200 hover:border-blue-300 hover:shadow-sm transition-all"
            >
              <p className="font-semibold text-slate-900">{item.label}</p>
              <p className="text-sm text-slate-600 mt-1">{item.desc}</p>
            </Link>
          ))}
        </div>
      </div>
    </section>
  );
}

/** Inline text links for prose sections — comma-separated with middots. */
export function LandRelatedPagesInline({ pages }: { pages: RelatedPageLink[] }) {
  return (
    <p className="text-slate-700">
      {pages.map((item, index) => (
        <span key={item.href}>
          {index > 0 && " · "}
          <Link href={item.href} className="text-blue-600 font-semibold hover:underline">
            {item.label}
          </Link>
        </span>
      ))}
    </p>
  );
}

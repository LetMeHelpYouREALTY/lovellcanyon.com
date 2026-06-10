import type { LovellCanyonParcelSpecs } from "@/lib/lovell-canyon-parcels";

type ParcelVerifiedSpecsProps = {
  specs: LovellCanyonParcelSpecs;
};

const SPEC_FIELDS: Array<{
  key: keyof LovellCanyonParcelSpecs;
  label: string;
}> = [
  { key: "acreage", label: "Acreage" },
  { key: "price", label: "Price" },
  { key: "lotDimensions", label: "Lot dimensions" },
  { key: "zoning", label: "Zoning" },
  { key: "water", label: "Water" },
  { key: "power", label: "Power" },
  { key: "septic", label: "Septic" },
  { key: "roadMaintenance", label: "Road maintenance" },
  { key: "hoa", label: "HOA" },
];

export function ParcelVerifiedSpecs({ specs }: ParcelVerifiedSpecsProps) {
  const entries = SPEC_FIELDS.filter(({ key }) => specs[key]);

  if (entries.length === 0) return null;

  return (
    <dl className="space-y-4 mb-6">
      <div className="border-b border-slate-200 pb-2">
        <dt className="text-sm font-semibold text-slate-500 uppercase tracking-wide">
          Verified parcel specifications
        </dt>
      </div>
      {entries.map(({ key, label }) => (
        <div key={key} className="border-b border-slate-100 pb-3">
          <dt className="text-slate-600 font-medium mb-1">{label}</dt>
          <dd className="text-slate-900">{specs[key]}</dd>
        </div>
      ))}
    </dl>
  );
}

export function hasVerifiedSpecs(specs?: LovellCanyonParcelSpecs): boolean {
  if (!specs) return false;
  return SPEC_FIELDS.some(({ key }) => Boolean(specs[key]));
}

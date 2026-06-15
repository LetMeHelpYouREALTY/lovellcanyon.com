import { Clock } from "lucide-react";
import { LOVELL_CANYON_BUSINESS_HOURS_ROWS } from "@/lib/lovell-canyon-gbp-hours";

type BusinessHoursProps = {
  variant?: "card" | "inline";
  className?: string;
};

export default function BusinessHours({ variant = "card", className = "" }: BusinessHoursProps) {
  if (variant === "inline") {
    return (
      <ul className={`space-y-1 text-sm text-slate-300 ${className}`}>
        {LOVELL_CANYON_BUSINESS_HOURS_ROWS.map((row) => (
          <li key={row.day}>
            <span className="text-slate-400">{row.day}:</span> {row.hours}
          </li>
        ))}
      </ul>
    );
  }

  return (
    <div className={`bg-slate-50 rounded-lg p-6 ${className}`}>
      <div className="flex items-center gap-2 mb-4">
        <Clock className="h-5 w-5 text-blue-600" aria-hidden />
        <h2 className="font-bold text-slate-900">Business hours</h2>
      </div>
      <ul className="grid grid-cols-1 sm:grid-cols-2 gap-2 text-sm text-slate-700">
        {LOVELL_CANYON_BUSINESS_HOURS_ROWS.map((row) => (
          <li key={row.day}>
            <span className="font-medium text-slate-900">{row.day}:</span> {row.hours}
          </li>
        ))}
      </ul>
    </div>
  );
}

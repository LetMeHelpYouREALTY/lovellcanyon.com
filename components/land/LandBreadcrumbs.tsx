import Link from "next/link";
import type { BreadcrumbItem } from "@/lib/lovell-canyon-breadcrumbs";

type LandBreadcrumbsProps = {
  items: BreadcrumbItem[];
};

export function LandBreadcrumbs({ items }: LandBreadcrumbsProps) {
  if (items.length <= 1) return null;

  return (
    <nav aria-label="Breadcrumb" className="bg-slate-50 border-b border-slate-200">
      <div className="container mx-auto px-4 py-3 max-w-5xl">
        <ol className="flex flex-wrap items-center gap-1 text-sm text-slate-600">
          {items.map((item, index) => {
            const isLast = index === items.length - 1;
            return (
              <li key={item.path} className="flex items-center gap-1">
                {index > 0 && <span aria-hidden="true">/</span>}
                {isLast ? (
                  <span className="text-slate-900 font-medium">{item.name}</span>
                ) : (
                  <Link href={item.path} className="text-blue-600 hover:underline">
                    {item.name}
                  </Link>
                )}
              </li>
            );
          })}
        </ol>
      </div>
    </nav>
  );
}

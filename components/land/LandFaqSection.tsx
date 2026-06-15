import Link from "next/link";
import type { LandFaq } from "@/lib/lovell-canyon-faq";

type LandFaqSectionProps = {
  faqs: LandFaq[];
  heading?: string;
  intro?: string;
  /** When set, shows a link to the full FAQ page below the list. */
  viewAllHref?: string;
  viewAllLabel?: string;
  className?: string;
};

export function LandFaqSection({
  faqs,
  heading = "Frequently asked questions",
  intro,
  viewAllHref,
  viewAllLabel = "View all FAQ",
  className = "py-16 md:py-20 bg-slate-50",
}: LandFaqSectionProps) {
  return (
    <section className={className}>
      <div className="container mx-auto px-4 max-w-3xl">
        <h2 className="text-2xl md:text-3xl font-bold text-slate-900 mb-4">{heading}</h2>
        {intro && <p className="text-slate-600 mb-8 leading-relaxed">{intro}</p>}
        <dl className="space-y-6">
          {faqs.map((faq) => (
            <div key={faq.question} className="bg-white rounded-lg border border-slate-200 p-6">
              <dt className="text-lg font-bold text-slate-900 mb-3">{faq.question}</dt>
              <dd className="text-slate-700 leading-relaxed">{faq.answer}</dd>
            </div>
          ))}
        </dl>
        {viewAllHref && (
          <p className="mt-8 text-center">
            <Link href={viewAllHref} className="text-blue-600 font-semibold hover:underline">
              {viewAllLabel}
            </Link>
          </p>
        )}
      </div>
    </section>
  );
}

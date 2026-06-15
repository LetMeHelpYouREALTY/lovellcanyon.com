/** Business hours — must match Google Business Profile exactly. */

export const LOVELL_CANYON_GBP_HOURS = {
  monday: { opens: "09:00", closes: "18:00", display: "9am – 6pm" },
  tuesday: { opens: "09:00", closes: "18:00", display: "9am – 6pm" },
  wednesday: { opens: "09:00", closes: "18:00", display: "9am – 6pm" },
  thursday: { opens: "09:00", closes: "18:00", display: "9am – 6pm" },
  friday: { opens: "09:00", closes: "18:00", display: "9am – 6pm" },
  saturday: { opens: "10:00", closes: "16:00", display: "10am – 4pm" },
  sunday: { display: "By appointment", byAppointment: true as const },
} as const;

export const LOVELL_CANYON_BUSINESS_HOURS_ROWS = [
  { day: "Monday", hours: LOVELL_CANYON_GBP_HOURS.monday.display },
  { day: "Tuesday", hours: LOVELL_CANYON_GBP_HOURS.tuesday.display },
  { day: "Wednesday", hours: LOVELL_CANYON_GBP_HOURS.wednesday.display },
  { day: "Thursday", hours: LOVELL_CANYON_GBP_HOURS.thursday.display },
  { day: "Friday", hours: LOVELL_CANYON_GBP_HOURS.friday.display },
  { day: "Saturday", hours: LOVELL_CANYON_GBP_HOURS.saturday.display },
  { day: "Sunday", hours: LOVELL_CANYON_GBP_HOURS.sunday.display },
] as const;

export function getLovellCanyonOpeningHoursSchema() {
  return [
    { "@type": "OpeningHoursSpecification" as const, dayOfWeek: "Monday", opens: "09:00", closes: "18:00" },
    { "@type": "OpeningHoursSpecification" as const, dayOfWeek: "Tuesday", opens: "09:00", closes: "18:00" },
    { "@type": "OpeningHoursSpecification" as const, dayOfWeek: "Wednesday", opens: "09:00", closes: "18:00" },
    { "@type": "OpeningHoursSpecification" as const, dayOfWeek: "Thursday", opens: "09:00", closes: "18:00" },
    { "@type": "OpeningHoursSpecification" as const, dayOfWeek: "Friday", opens: "09:00", closes: "18:00" },
    { "@type": "OpeningHoursSpecification" as const, dayOfWeek: "Saturday", opens: "10:00", closes: "16:00" },
  ];
}

/** Compact single-line summary for footers and meta copy. */
export const LOVELL_CANYON_HOURS_SUMMARY =
  "Mon–Fri 9am–6pm, Sat 10am–4pm, Sun by appointment";

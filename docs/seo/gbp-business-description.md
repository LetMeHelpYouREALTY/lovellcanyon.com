# GBP business description — Lovell Canyon Land

Paste into Google Business Profile → **Edit profile** → **Business description** → **From the business**.

Source: `lib/lovell-canyon-gbp.ts` → `lovellCanyonGbpBusinessDescription`

---

## Primary copy-paste (587 / 750 characters, ASCII-only)

Use this version first. It removes characters that often trigger GBP **Invalid value**:

- No em dashes (`—`)
- No license string with dots (`S.0197614.LLC` looks like a URL to Google)
- No APN numbers with dashes (`135-31-801-006` can look like a phone pattern)
- No `REALTOR`, phone, email, or website URLs
- Plain hyphens and commas only

```
Dr Jan Duffy, Land Specialist with Berkshire Hathaway HomeServices Nevada Properties, helps buyers with raw land in Lovell Canyon, Clark County, Nevada 89124. Two fee simple vacant parcels are listed in the Spring Mountains west of Las Vegas, reached from Highway 160 and Lovell Canyon Road. Services include land buyer representation, parcel consultations, due diligence, title and legal description review, Clark County assessor research, access guidance, site visits, and closing support for off-grid raw land. Office at 9406 W Lake Mead Boulevard, Suite 100, Las Vegas, Nevada 89134.
```

---

## Fallback (387 chars) — if primary still fails

```
Land Specialist with Berkshire Hathaway HomeServices Nevada Properties. Raw land in Lovell Canyon, Clark County, Nevada 89124. Two fee simple vacant parcels west of Las Vegas in the Spring Mountains. Buyer representation, consultations, due diligence, site visits, and closing guidance. Office at 9406 W Lake Mead Boulevard, Suite 100, Las Vegas, Nevada 89134.
```

---

## If you still see "Invalid value"

1. **Verify the profile first** — unverified listings often reject description edits.
2. **Paste from plain text** — not Word or email (hidden characters).
3. **Try the fallback** (shorter) above.
4. **Remove one sentence at a time** to find the trigger, then add back.
5. **License** belongs in other profile fields, not dotted strings in the description.
6. **Phone / website / email** go in dedicated GBP fields only.

Put license `S.0197614.LLC`, phone `(702) 842-9736`, and website in their own GBP fields.

---

## First ~250 characters (search preview)

```
Dr Jan Duffy, Land Specialist with Berkshire Hathaway HomeServices Nevada Properties, helps buyers with raw land in Lovell Canyon, Clark County, Nevada 89124. Two fee simple vacant parcels are listed in the Spring Mountains west of Las Vegas, reached from
```

---

Last updated: June 2026

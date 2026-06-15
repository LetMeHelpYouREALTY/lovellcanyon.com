# GBP NAP audit — Lovell Canyon land (lovellcanyon.com)

Update [Google Business Profile](https://business.google.com) to match this site. Office address stays **89134**; parcel geography is **89124**.

## Physical office NAP (must match exactly)

| Field | Value |
|-------|--------|
| **Business name** | Lovell Canyon Land \| Dr. Jan Duffy · Land Specialist |
| **Street** | 9406 W Lake Mead Blvd, Suite 100 |
| **City** | Las Vegas |
| **State** | NV |
| **ZIP** | **89134** |
| **Phone** | (702) 842-9736 *(CallAction tracking — forwards to agent direct line; see [callaction-lovell-canyon.md](../integrations/callaction-lovell-canyon.md))* |
| **Website** | https://www.lovellcanyon.com |
| **Email** | DrDuffySells@lovellcanyon.com |
| **Hours** | Mon–Fri 9am–6pm, Sat 10am–4pm, Sun by appointment |

## Parcel geography (service area — not office ZIP)

| Field | Value |
|-------|--------|
| **Area name** | Lovell Canyon |
| **County** | Clark County |
| **Parcel ZIP** | **89124** |
| **Legal** | Section 31, T20S R57E |
| **APNs** | 135-31-801-006 (Lot 2), 135-31-801-007 (Lot 3) |

### Do not use in GBP description or service area as primary text

- ZIP **89120** (East Las Vegas — wrong)
- **89048 / 89004** (Pahrump / Nye County — wrong county)
- **"Near Pahrump"** as headline positioning

### Correct positioning

> Lovell Canyon raw land, Clark County NV **89124**, Spring Mountains west of Las Vegas (~40–45 min via NV-160). Turnoff is before Nye County.

## GBP business description (copy-paste, ≤750 chars)

Full guide with character count and preview: **[gbp-business-description.md](./gbp-business-description.md)**

```
Lovell Canyon Land — Dr. Jan Duffy, Land Specialist and REALTOR with Berkshire Hathaway HomeServices Nevada Properties, represents two fee simple raw land parcels in Clark County NV 89124. Lot 2 (APN 135-31-801-006) and Lot 3 (APN 135-31-801-007) are in Section 31 T20S R57E, Spring Mountains west of Las Vegas, accessed via NV-160 and Lovell Canyon Road. This is Clark County land — not Pahrump or Nye County. Services include vacant land buyer representation, parcel consultations, due diligence on title and legal descriptions, Clark County assessor research, access guidance, site visits, and closing support for off-grid raw land. Nevada License S.0197614.LLC. Office: 9406 W Lake Mead Blvd Ste 100, Las Vegas NV 89134.
```

## Service areas to add in GBP

- Lovell Canyon, NV 89124
- Clark County, NV
- Spring Mountains, NV
- Las Vegas, NV (brokerage service radius)

## Suggested GBP Q&A (pre-answer in profile)

1. **What ZIP code are the Lovell Canyon land parcels in?** → 89124, Clark County (not 89120 or Pahrump 89048).
2. **What APNs are listed?** → 135-31-801-006 (Lot 2) and 135-31-801-007 (Lot 3).
3. **Is Lovell Canyon near Pahrump?** → No — Clark County Spring Mountains; NV-160 turnoff is before Nye County.

## Site reference page

Internal mirror of GBP fields: `/google-business` (uses `lib/lovell-canyon-gbp.ts`).

**Verification workflow:** [gbp-verification-checklist.md](./gbp-verification-checklist.md)

**Edit profile (field-by-field):** [gbp-edit-profile-guide.md](./gbp-edit-profile-guide.md)

## Monthly check

- [ ] GBP description still says 89124 / Lovell Canyon (not Pahrump or 89120)
- [ ] Phone matches `(702) 842-9736` sitewide (CallAction tracking — **not** forward destination 222-1964)
- [ ] Website link points to https://www.lovellcanyon.com
- [ ] Hours match office listing
- [ ] New GBP posts mention land parcels with correct APNs when promoting this listing

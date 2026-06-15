# Google Business Profile — verification checklist (lovellcanyon.com)

Use this checklist when claiming or verifying the GBP listing for Dr. Jan Duffy / Lovell Canyon land.

**Related docs:** [gbp-nap-audit.md](./gbp-nap-audit.md) · [gsc-indexing-request.md](./gsc-indexing-request.md)

**CallAction:** Tracking **842-9736** → forwards to **222-1964**. See [callaction-lovell-canyon.md](../integrations/callaction-lovell-canyon.md).

---

## Phase 1 — Before you start in GBP

### Website must match (verify after deploy)

- [ ] **Phone** `(702) 842-9736` in footer, contact page, and JSON-LD on every indexable page
- [ ] **Email** `DrDuffySells@lovellcanyon.com` visible sitewide
- [ ] **Office address** 9406 W Lake Mead Blvd, Suite 100, Las Vegas, NV **89134** in footer + `/contact`
- [ ] **Business hours** visible in footer + `/contact` (Mon–Fri 9–6, Sat 10–4, Sun by appointment)
- [ ] **Office map embed** on `/contact` with Call, Directions, View on Google Maps
- [ ] **RealEstateAgent schema** includes office address, office geo, `openingHoursSpecification`, `hasMap`
- [ ] **`public/.well-known/brand-facts.json`** phone matches `(702) 842-9736`
- [ ] **`public/llms.txt`** NAP matches GBP fields

### Google Search Console (required for website verification method)

1. [ ] Add property: `https://www.lovellcanyon.com` (URL prefix or domain)
2. [ ] Choose **HTML tag** verification
3. [ ] Copy the `content=` value from the meta tag
4. [ ] Set in **Vercel → Production**:
   ```
   GOOGLE_SITE_VERIFICATION=<paste content value>
   ```
5. [ ] Redeploy production
6. [ ] Click **Verify** in GSC
7. [ ] Submit sitemap: `https://www.lovellcanyon.com/sitemap.xml`

---

## Phase 2 — GBP dashboard fields (copy from site)

Open [Google Business Profile](https://business.google.com) and paste from **[gbp-nap-audit.md](./gbp-nap-audit.md)** or internal reference **`/google-business`**.

| Field | Value |
|-------|--------|
| Business name | Lovell Canyon Land \| Dr. Jan Duffy · Land Specialist |
| Category (primary) | Real Estate Agent |
| Categories (secondary) | Real Estate Consultant, Real Estate Agency |
| Address | 9406 W Lake Mead Blvd, Suite 100, Las Vegas, NV 89134 |
| Phone | (702) 842-9736 *(CallAction — do not use 222-1964 in GBP)* |
| Website | https://www.lovellcanyon.com |
| Hours | Mon–Fri 9am–6pm, Sat 10am–4pm, Sun by appointment |

### Business description (≤750 chars)

Copy from `lib/lovell-canyon-gbp.ts` → `lovellCanyonGbpShortDescription` or `/google-business`.

### Service areas (add in GBP)

- Lovell Canyon, NV 89124
- Clark County, NV
- Spring Mountains, NV
- Las Vegas, NV

### Do NOT put in GBP primary description

- ZIP 89120 (East Las Vegas)
- Pahrump / Nye County 89048
- “Near Pahrump” as headline

---

## Phase 3 — Verification methods

Google may offer one or more of these:

| Method | What to do |
|--------|------------|
| **Postcard** | Mailed to **89134 office address** — enter PIN when received (5–14 days) |
| **Phone / SMS** | Use `(702) 842-9736` if offered |
| **Email** | Use `DrDuffySells@lovellcanyon.com` if offered |
| **Video verification** | Show office signage, license, and matching website NAP on screen |
| **Search Console** | Works after `GOOGLE_SITE_VERIFICATION` is live (Phase 1) |

---

## Phase 4 — After verification

### Optional env vars (enable review/profile buttons on `/contact`)

Set in Vercel Production after you have the GBP Place ID:

```
NEXT_PUBLIC_GBP_PLACE_ID=<Google Place ID>
```

Or explicit URLs:

```
NEXT_PUBLIC_GBP_PROFILE_URL=https://www.google.com/maps/place/...
NEXT_PUBLIC_GBP_REVIEWS_URL=https://search.google.com/local/writereview?placeid=...
```

Redeploy — **View Google Reviews** and **Google Business Profile** buttons appear on the office map section.

### Post-verification tasks

- [ ] Add pre-answered Q&A from `lovellCanyonGbpFaqs` in GBP dashboard
- [ ] Upload office + land photos (parcel area, access road, legal description docs)
- [ ] Request indexing in GSC for `/` and `/contact` ([gsc-indexing-request.md](./gsc-indexing-request.md))
- [ ] Validate schema: [Rich Results Test](https://search.google.com/test/rich-results) on `/` and `/contact`
- [ ] Confirm GBP pin is at **office** (89134), not parcel center (89124)

---

## Monthly maintenance

See checkboxes in [gbp-nap-audit.md](./gbp-nap-audit.md#monthly-check).

---

Last updated: June 2026

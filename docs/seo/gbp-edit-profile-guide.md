# Edit Google Business Profile — Lovell Canyon (field-by-field)

Use this when you **Edit profile** in [Google Business Profile](https://business.google.com) or Google Search / Maps.

**Must match site:** [gbp-nap-audit.md](./gbp-nap-audit.md) · **Verify first:** [gbp-verification-checklist.md](./gbp-verification-checklist.md) · **Phone routing:** [callaction-lovell-canyon.md](../integrations/callaction-lovell-canyon.md)

Sign in with the Google Account linked to the profile. After edits, Google may review before changes go live.

---

## How to open Edit profile

**Google Search (desktop):** Search your business name → your profile → **Edit profile** → **Save**

**Google Maps (mobile):** Maps app → **Business** (bottom right) → **Edit profile** → **Save**

**Web:** [business.google.com](https://business.google.com) → select location → **Edit profile**

---

## Business name

```
Lovell Canyon Land | Dr. Jan Duffy · Land Specialist
```

Use exactly as on site branding and JSON-LD schema. Put brokerage name in description and office address, not in the business name field. Avoid extra keywords (e.g. “land for sale”) in the name.

---

## Category

| Type | Value |
|------|--------|
| **Primary** | Real Estate Agent |
| **Additional** (up to 9) | Real Estate Consultant, Real Estate Agency |

Do not add unrelated categories (e.g. “Land surveyor” unless accurate).

---

## Address and map pin

**Physical office (GBP storefront pin):**

| Field | Value |
|-------|--------|
| Street | 9406 W Lake Mead Blvd, Suite 100 |
| City | Las Vegas |
| State | NV |
| ZIP | **89134** |

- Drag the pin to the **office building**, not Lovell Canyon parcel center.
- Parcels are in **89124** — use **Service area** for that, not the street address.

---

## Service area

Add (do not replace office address with these):

- Lovell Canyon, NV 89124
- Clark County, NV
- Spring Mountains, NV
- Las Vegas, NV

---

## Hours

| Day | Hours |
|-----|--------|
| Monday – Friday | 9:00 AM – 6:00 PM |
| Saturday | 10:00 AM – 4:00 PM |
| Sunday | Closed *(or “By appointment” if GBP offers it)* |

Must match site footer and `/contact`.

---

## Phone number

```
(702) 842-9736
```

- This is the **CallAction tracking number** (public NAP).
- **Do not** enter `(702) 222-1964` — that is the private forward destination only.

Google may call/text this number to confirm info — you should still reach Jan via CallAction forward.

---

## Website

```
https://www.lovellcanyon.com
```

- Include `https://`
- Ensure GSC verified and sitemap submitted
- Site NAP must match this profile

**Optional appointment link** (if GBP shows booking URL field):

```
https://calendly.com/drjanduffy/showing
```

---

## Social media links

One link per platform (if available in your region):

| Platform | URL |
|----------|-----|
| Facebook | https://www.facebook.com/drjanduffy |
| Instagram | https://www.instagram.com/drjanduffy |
| LinkedIn | https://www.linkedin.com/in/drjanduffy |

---

## Business description (≤750 characters, no URLs)

Copy from **[gbp-business-description.md](./gbp-business-description.md)** or paste below:

```
Dr Jan Duffy, Land Specialist with Berkshire Hathaway HomeServices Nevada Properties, helps buyers with raw land in Lovell Canyon, Clark County, Nevada 89124. Two fee simple vacant parcels are listed in the Spring Mountains west of Las Vegas, reached from Highway 160 and Lovell Canyon Road. Services include land buyer representation, parcel consultations, due diligence, title and legal description review, Clark County assessor research, access guidance, site visits, and closing support for off-grid raw land. Office at 9406 W Lake Mead Boulevard, Suite 100, Las Vegas, Nevada 89134.
```

If GBP shows **Invalid value**, use the shorter fallback in [gbp-business-description.md](./gbp-business-description.md).

---

## Services (if available)

1. **Lovell Canyon Raw Land Sales** — Fee simple vacant land, Lot 2 & Lot 3, APN 135-31-801-006 and 007  
2. **Vacant Land Buyer Representation** — Due diligence, access, title, closing for Clark County land  
3. **Land Parcel Consultations** — Site visits, legal location, Schedule A/B title review  
4. **Off-Grid Land Guidance** — Utilities, zoning, assessor research for raw parcels  

---

## Q&A (pre-answer in profile)

1. **What ZIP code are the Lovell Canyon land parcels in?**  
   89124, Clark County (not 89120 or Pahrump 89048).

2. **What APNs are for sale in Lovell Canyon?**  
   Lot 2: 135-31-801-006. Lot 3: 135-31-801-007. Section 31, T20S R57E.

3. **How do I reach the parcels from Las Vegas?**  
   NV-160 west past Mountain Springs, north on Lovell Canyon Rd (~11–12 miles), then local roads. 4WD may be needed.

4. **Is Lovell Canyon near Pahrump?**  
   No. Clark County Spring Mountains west of Las Vegas; NV-160 turnoff is before Nye County.

5. **How do I contact Dr. Jan Duffy?**  
   Call or text (702) 842-9736, email DrDuffySells@lovellcanyon.com, or schedule at calendly.com/drjanduffy/showing.

---

## Photos and videos

Upload when possible:

- **Exterior:** BHHS office / suite signage at 9406 W Lake Mead Blvd  
- **Interior:** Office or professional headshot of Dr. Jan Duffy  
- **Land:** Lovell Canyon access road, Spring Mountains views, parcel area *(not mislabeled as office)*  
- **Branding:** Berkshire Hathaway HomeServices Nevada Properties  

Caption land photos with “Lovell Canyon NV 89124” — not “office location.”

---

## Collected info (Google automated messages)

Google may call, text, or WhatsApp the **verified phone** to confirm details.

**Edit profile → Collected info:**

- Review each item; confirm if accurate or **Delete** if wrong  
- Wrong collected info can override your edits if left unchecked  
- Deleting collected info does not remove fields you set manually  

If Google asks about phone/address/hours, answer using the values in this doc.

---

## After you save

1. Check **edit status** in GBP (pending review vs live)  
2. Compare live profile to [lovellcanyon.com/contact](https://www.lovellcanyon.com/contact) NAP  
3. Request indexing in GSC for `/` and `/contact`  
4. [Rich Results Test](https://search.google.com/test/rich-results) on homepage  

---

## Do not

| Wrong | Why |
|-------|-----|
| Phone `(702) 222-1964` on profile | Private forward only; breaks CallAction tracking |
| Address ZIP **89124** as office | Parcels are 89124; office is **89134** |
| “Near Pahrump” in name/description | Wrong positioning; Nye County confusion |
| Website heyberkshire.com for this listing | Use **lovellcanyon.com** for this land profile |
| URLs inside description field | GBP guidelines prohibit URLs in description |

---

Last updated: June 2026

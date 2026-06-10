# Google Search Console — indexing requests (lovellcanyon.com)

After material content changes (ZIP 89124, gallery photos, parcel copy), request re-indexing for these URLs in [Google Search Console](https://search.google.com/search-console):

| Priority | URL |
|----------|-----|
| 1 | https://www.lovellcanyon.com/ |
| 2 | https://www.lovellcanyon.com/location |
| 3 | https://www.lovellcanyon.com/parcels/lot-2 |
| 4 | https://www.lovellcanyon.com/parcels/lot-3 |
| 5 | https://www.lovellcanyon.com/parcels |
| 6 | https://www.lovellcanyon.com/access |
| 7 | https://www.lovellcanyon.com/contact |

## Steps

1. Open GSC → **URL inspection**
2. Paste each URL above → **Request indexing**
3. Confirm sitemap is submitted: `https://www.lovellcanyon.com/sitemap.xml`
4. Validate structured data: [Rich Results Test](https://search.google.com/test/rich-results) on `/` and `/parcels/lot-2`

## GBP NAP alignment

Parcel location ZIP on site and schema: **89124** (Clark County, Lovell Canyon — not 89120 East Las Vegas, not Pahrump 89048).

Update Google Business Profile service area / description to match:

- **Area:** Lovell Canyon, Spring Mountains, Clark County NV 89124
- **Do not use:** "near Pahrump" as primary positioning

Office NAP (brokerage): 9406 W Lake Mead Blvd, Suite 100, Las Vegas, NV 89134 — parcels are not at this address.

## Assessor verification (APNs)

| Lot | APN | Clark County inquiry |
|-----|-----|----------------------|
| Lot 2 | 135-31-801-006 | https://trweb.co.clark.nv.us/search_public1.asp |
| Lot 3 | 135-31-801-007 | https://trweb.co.clark.nv.us/search_public1.asp |

GIS map: https://maps.clarkcountynv.gov/assessor/

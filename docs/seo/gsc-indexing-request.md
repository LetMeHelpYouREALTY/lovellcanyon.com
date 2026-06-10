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

See **[gbp-nap-audit.md](./gbp-nap-audit.md)** for copy-paste GBP fields and the ≤750-character business description.

- Parcel ZIP: **89124** (not 89120 or Pahrump 89048)
- Office ZIP: **89134** (brokerage — not parcel location)
- Site reference: `/google-business` and `lib/lovell-canyon-gbp.ts`

## Assessor verification (APNs)

| Lot | APN | Clark County inquiry |
|-----|-----|----------------------|
| Lot 2 | 135-31-801-006 | https://trweb.co.clark.nv.us/search_public1.asp |
| Lot 3 | 135-31-801-007 | https://trweb.co.clark.nv.us/search_public1.asp |

GIS map: https://maps.clarkcountynv.gov/assessor/

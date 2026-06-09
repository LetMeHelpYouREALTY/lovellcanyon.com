# Lovell Canyon page heroes

Per-route hero images for SEO, Open Graph, and `ImageObject` / `primaryImageOfPage` schema.

## Registry

Paths and alt text are defined in `lib/lovell-canyon-hero-images.ts`.

| File | Route | Visual intent (Parallel research) |
|------|-------|----------------------------------|
| `home.jpg` | `/` | Canyon vista, Spring Mountains, raw parcels |
| `parcels.jpg` | `/parcels` | Two-parcel overview, vacant scrubland |
| `lot-2.jpg` | `/parcels/lot-2` | Single Lot 2 ground-level parcel |
| `lot-3.jpg` | `/parcels/lot-3` | Single Lot 3 alternate parcel view |
| `location.jpg` | `/location` | Valley panorama, Wilson/Sexton ridges ([Las Vegas Area Trails](https://lasvegasareatrails.com/lovell-canyon-trail-la-madre-mountains-wilderness-nevada)) |
| `access.jpg` | `/access` | Paved Lovell Canyon Rd from NV-160 ([Bird and Hike](https://www.birdandhike.com/Hike/Red_Rocks/Roads_RR/LovellCynRd/_LovCynRd.htm)) |
| `title-report.jpg` | `/title-report` | Documentary land vista for title context |
| `faq.jpg` | `/faq` | Woodland opening to parcels, trailhead feel |
| `contact.jpg` | `/contact` | Warm golden-hour land consultation setting |

## Production (preferred)

Upload to R2 bucket `listing-photos`:

```
lovell-canyon/heroes/home.jpg
lovell-canyon/heroes/parcels.jpg
… (same filenames as local)
```

`getLovellCanyonPageHero()` prefers R2 when the object exists, then falls back to these local paths.

## Optimization

Source files may be large before upload. Target **≤200 KB** per hero (WebP or quality-78 JPEG) via [Squoosh](https://squoosh.app) or Cloudflare `/cdn-cgi/image/` when transformations are enabled.

Dimensions: **1600×900** (16:9) per registry.

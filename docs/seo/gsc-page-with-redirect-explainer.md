# GSC "Page with redirect" — lovellcanyon.com (verified 7/13/26)

## What Search Console is showing

Google Search Console → **Indexing → Pages → "Page with redirect"** lists 3 URLs as
excluded from the index:

- `http://www.lovellcanyon.com/`
- `http://lovellcanyon.com/`
- `https://lovellcanyon.com/`

A "Validate Fix" run against this issue was started 6/15/26 and marked **Failed** on 6/30/26.

## Verdict: this is expected, healthy behavior — not a bug

The canonical host for this site is `https://www.lovellcanyon.com` (see
`lib/site-url.ts`, `docs/seo/gsc-indexing-request.md`). All three flagged URLs are
non-canonical variants (http, non-www, or both) whose *only* job is to redirect to the
canonical URL. Google's Page Indexing report intentionally classifies redirecting URLs
this way — it is not asking you to make them indexable. Per current (2026) guidance,
`www` vs. non-www and `http` vs. `https` canonicalization redirects are supposed to
show up under "Page with redirect" forever; that's the report doing its job, not a
defect. "Validation Failed" here does not mean the redirect is broken — it means the
non-canonical URL still isn't indexed on its own, which is exactly what we want. There's
nothing to "validate" away.

## What was verified live (7/13/26)

```
http://www.lovellcanyon.com/  → 308 → https://www.lovellcanyon.com/          (1 hop, 200)
https://lovellcanyon.com/     → 308 → https://www.lovellcanyon.com/          (1 hop, 200)
http://lovellcanyon.com/      → 308 → https://lovellcanyon.com/ → 308 → https://www.lovellcanyon.com/  (2 hops, 200)
```

- Final destination returns `200`, self-referencing `<link rel="canonical" href="https://www.lovellcanyon.com">`,
  and `<meta name="robots" content="index, follow">`.
- `robots.txt` declares `Host: www.lovellcanyon.com` and points to the canonical sitemap.
- `sitemap.xml` lists only canonical `https://www.lovellcanyon.com/...` URLs.
- No internal links, sitemap entries, or structured data reference the non-canonical host.

The `http://lovellcanyon.com/` case is a 2-hop chain: Vercel's platform-level HTTP→HTTPS
upgrade fires first, then the app-level apex→`www` redirect in `next.config.js`
(`redirects()`) fires second. Two hops is not a problem for Googlebot (chains are only a
concern past ~5 hops), but it can be collapsed to a single hop by adding a **domain-level
redirect** for the apex `lovellcanyon.com` → `https://www.lovellcanyon.com` directly in
**Vercel Project Settings → Domains** (this happens before the app runs, so it bypasses
the extra HTTPS-upgrade hop). This is an infrastructure change outside this repo's code
and requires Vercel dashboard/CLI access.

## Action items

- [x] Confirmed redirects, canonical tag, robots meta, robots.txt, and sitemap are all
      correctly pointed at `https://www.lovellcanyon.com`.
- [x] Fixed a stray non-canonical reference in `public/.well-known/security.txt`
      (`Canonical:`/`Policy:` fields pointed at apex `lovellcanyon.com` instead of `www`).
- [ ] Optional infra cleanup: add a Vercel domain-level redirect for the apex host to
      collapse the `http://lovellcanyon.com/` case from 2 hops to 1 (cosmetic only).
- [ ] No further GSC action needed. Do not keep re-running "Validate Fix" on this issue —
      it will keep reporting the same (correct) state.

# Contributing to lovellcanyon.com

Dr. Jan Duffy — Lovell Canyon land listing site (Next.js 14 App Router, Vercel).

## Development Setup

### Prerequisites

- Node.js 20+
- pnpm (recommended) or npm

### Getting Started

```bash
git clone https://github.com/LetMeHelpYouREALTY/lovellcanyon.com.git
cd lovellcanyon.com
pnpm install
pnpm dev
```

## Project Structure

```
lovellcanyon.com/
├── app/                    # Next.js App Router pages
├── components/
│   ├── land/              # Lovell Canyon land UI
│   ├── layouts/           # Navbar, Footer
│   ├── realscout/         # RealScout MLS widgets
│   └── sections/          # Shared page sections
├── lib/
│   ├── lovell-canyon-*    # Site-specific SEO, schema, media, geo
│   └── ...
├── public/images/         # Static assets (heroes, logos)
└── docs/GIT_WORKFLOW.md   # Branching, commits, PR hygiene
```

## Git Workflow

**Full guide:** [docs/GIT_WORKFLOW.md](./docs/GIT_WORKFLOW.md)

### Branch naming

- `feature/description` — new features
- `fix/description` — bug fixes
- `content/description` — SEO / copy / images
- `chore/description` — tooling, CI, git

### Commit messages (Conventional Commits)

```text
feat(lovell-canyon): add parcel hero ImageObject schema
content(seo): update homepage title for Land Specialist branding
chore(git): add stale branch cleanup workflow
```

Optional local commit template:

```bash
git config commit.template .gitmessage
```

### Pull requests

1. Branch from `main`, keep PRs atomic (one logical change)
2. Run `pnpm validate` before opening
3. Fill out the PR template (pages affected, SEO checklist)
4. Merge via PR — `main` deploys to production on Vercel

## Code Standards

- TypeScript strict mode; explicit prop types
- Server Components by default; `"use client"` only when needed
- Tailwind CSS; mobile-first
- Lovell Canyon NAP/schema must match GBP — see `lib/lovell-canyon-brand.ts`

## Widget Integration

- **RealScout** — script in root layout; widgets via `dangerouslySetInnerHTML`
- **Calendly** — `afterInteractive` in layout

## Testing & Deploy

```bash
pnpm type-check
pnpm lint
pnpm validate          # type-check + lint + format check
vercel build           # production build (preferred over pnpm build)
```

- Push to `main` → Vercel production
- Feature branches → Vercel preview URLs

## Need Help?

- Git hygiene: `pwsh scripts/git/status-summary.ps1`
- Cursor rules: `.cursor/rules/`
- Site config: `lib/lovell-canyon-brand.ts`, `lib/lovell-canyon-seo.ts`

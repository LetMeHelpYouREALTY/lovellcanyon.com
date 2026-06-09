# Git Workflow — lovellcanyon.com

Based on [GitHub repository best practices](https://docs.github.com/en/repositories/creating-and-managing-repositories/best-practices-for-repositories), [Conventional Commits](https://www.conventionalcommits.org/), and team-scale git hygiene (2025–2026).

## Branch strategy

| Branch | Purpose |
|--------|---------|
| `main` | Production — auto-deploys to Vercel |
| `feature/*` | New features or multi-file UI work |
| `fix/*` | Bug fixes |
| `content/*` | Copy, SEO, metadata, images |
| `chore/*` | Tooling, CI, git hygiene, deps |
| `deps/*` | Manual dependency work (Dependabot uses its own branches) |

**Rules**

- Branch from latest `main`: `git pull origin main` before `git checkout -b feature/my-change`
- Prefer **PRs between branches in this repo** over forks ([GitHub guidance](https://docs.github.com/en/repositories/creating-and-managing-repositories/best-practices-for-repositories))
- Keep PRs **atomic** — one logical change per PR (target ≤200 lines / ≤8 files when possible)
- Rebase feature branches on `main` weekly to reduce merge conflicts
- Delete branch after merge (enable **Automatically delete head branches** in GitHub repo settings)

## Conventional Commits

Format:

```text
<type>(<scope>): <imperative description>

[optional body]

[optional footer: Fixes #123]
```

### Types

| Type | When |
|------|------|
| `feat` | New user-facing behavior |
| `fix` | Bug fix |
| `content` | Copy, SEO text, metadata, images |
| `refactor` | Code change, no behavior change |
| `chore` | Tooling, CI, git, docs |
| `deps` | Dependency updates |
| `ci` | GitHub Actions only |

### Scopes (this repo)

| Scope | Area |
|-------|------|
| `lovell-canyon` | Land listing pages, parcels, geo, schema |
| `seo` | Metadata, sitemap, robots, JSON-LD |
| `realscout` | MLS / RealScout widgets |
| `engagement` | Below-hero CTAs, Calendly, maps |
| `pages` | Generic marketing pages |
| `ci` | Workflows, Dependabot |
| `git` | Git workflow, ignore rules, branch cleanup |

### Examples

```text
feat(lovell-canyon): add page hero metadata with R2 fallback
content(seo): update homepage OG title for Land Specialist branding
fix(realscout): load office widget script once in layout
chore(git): add stale branch cleanup workflow
deps(npm): bump next to 14.2.35
```

Use the commit template: `git commit` (reads `.gitmessage` when configured locally).

## Atomic commits & staging

1. **One concern per commit** — branding, heroes, and CI should not share a commit
2. **Stage intentionally** — `git add -p` for mixed files; avoid `git add .` on large repos
3. **Verify before commit** — `pnpm type-check && pnpm lint`
4. **Never commit** — `.env*`, secrets, `.vercel`, local agent caches

### Staging patterns for this repo

```bash
# Lovell Canyon land work only
git add app/access app/contact app/faq app/location app/page.tsx app/parcels app/title-report
git add lib/lovell-canyon-* components/land/

# Git / CI only
git add docs/GIT_WORKFLOW.md .gitignore .gitmessage .github/workflows/stale-branches.yml
```

## Pull requests

1. Push branch: `git push -u origin HEAD`
2. Open PR with the template — fill **Pages Affected** and **SEO Checklist**
3. Title = Conventional Commit format (becomes squash-merge message if squashing)
4. CI runs build, lint, tests, PR size, SEO checks
5. Merge when green; delete branch

## Stale branch hygiene

- **Merged PR branches** — deleted automatically if repo setting enabled
- **Unmerged stale branches** — `.github/workflows/stale-branches.yml` runs weekly
- **Dependabot branches** — merge or close PRs promptly; grouped minor/patch updates reduce branch noise
- **Local cleanup** — `git fetch --prune` and `git worktree prune`

## Git worktree (optional, parallel tasks)

Use when you have uncommitted work but need a hotfix on `main`:

```bash
git worktree add ../lovellcanyon-hotfix -b fix/urgent-metadata main
# work in ../lovellcanyon-hotfix
git worktree remove ../lovellcanyon-hotfix   # when done
git worktree prune
```

Keep worktrees as **sibling directories** (`../lovellcanyon-feature-x`) or under `worktrees/` (gitignored).

## Large media

- Optimize images before commit (<200 KB for heroes when possible)
- Prefer R2 for listing photos (`lib/lovell-canyon-media.ts`)
- Enable Git LFS in `.gitattributes` only if large binaries must live in git

## Quick reference

```bash
git status --short
git diff --stat
git log -5 --oneline
git fetch --prune
pnpm validate
```

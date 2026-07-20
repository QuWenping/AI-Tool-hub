# URL Structure Decision (P0-14)

**Date**: 2026-07-20
**Status**: Decided
**Owner**: QuQu / Claude

## Decision

After auditing the existing 2092-page build and inbound traffic patterns, we keep the
**current singular/plural mix** and lock it as the canonical URL structure. No mass
redirects in Sprint 4 — the cost/risk outweighs the SEO benefit at this stage.

### Canonical URL table

| Intent | URL pattern | Example | Notes |
|---|---|---|---|
| Tool detail | `/tool/{slug}/` | `/tool/chatgpt/` | **Keep singular `/tool/`**. Already live for 299 tools, indexed, internally linked from homepage Finder / Stack Builder / Solutions. Changing to `/tools/` would force 299 redirects and break every internal link. |
| Tool alternatives | `/alternatives/{slug}/` | `/alternatives/chatgpt/` | Keep. |
| Category ranking | `/best/{category}/` | `/best/writing/` | Keep. Distinct from a future `/category/{slug}/` (P1-17) which will be a structural taxonomy page, not a ranking. |
| Comparison (A vs B) | `/vs/{slug}/` | `/vs/chatgpt-vs-claude/` | **Keep `/vs/`**. 103 pages already live and indexed. `/compare/` would add a second comparison namespace with no incremental SEO value. |
| Solutions / industry | `/solutions/{slug}/` | `/solutions/ai-for-architects/` | Keep. |
| Blog | `/blog/{slug}/` | `/blog/...` | Keep. |
| Prompts | `/prompts/{slug}/` | `/prompts/...` | Keep. |
| Workflows | `/workflows/{slug}/` | `/workflows/...` | Keep. |
| Templates | `/templates/{slug}/` | `/templates/...` | Keep. |
| Free online tools | `/tools/{slug}/` (e.g. `/tools/token-calculator/`) | — | The only legitimate use of plural `/tools/` is for **browser-side utility pages**, not the tool directory. This avoids collision with `/tool/{slug}/`. |
| Chinese mirror | `/zh{path}/` | `/zh/tool/chatgpt/` | Keep mirror scheme. |
| Tutorials (future, P1-18) | `/tutorials/{slug}/` | — | Reserved. |
| Category taxonomy (future, P1-17) | `/category/{slug}/` | `/category/ai-writing/` | Reserved, distinct from `/best/`. |

## Rationale

1. **No SEO debt created.** Every existing URL stays valid; zero redirects needed.
2. **Singular `/tool/` is intentional.** It reads as "the page for *this* tool" and is already
   the single most internally-linked pattern (Finder, Stack Builder, Solutions, alternatives,
   matchups all point to `/tool/{slug}/`).
3. **`/vs/` over `/compare/`.** Shorter, already indexed, and `vs` is the exact query users
   type ("chatgpt vs claude"). `/compare/` is reserved as a possible future interactive
   comparator *app* (P1-7), not the static comparison article namespace.
4. **`/tools/` (plural) is reserved for free online utility pages** so it never collides with
   the tool directory. If a future utility needs a path, it goes under `/tools/`.

## Enforcement

- All new pages MUST follow this table. Add a CI check (`scripts/check-url-structure.mjs`)
  in a later sprint that fails the build if a page is added outside these patterns.
- Sitemap (`gen-sitemap.mjs`) already reflects this structure — no change needed.
- `canonical` meta in `BaseLayout.astro` already emits the correct self-canonical URL.

## Rejected alternatives

- **Migrate `/tool/` → `/tools/`**: rejected. 299 redirects + breaks every internal link for
  zero ranking benefit (Google treats singular/plural as equivalent intent).
- **Migrate `/vs/` → `/compare/`**: rejected. Same reason; `/vs/` matches user query phrasing.
- **Introduce `/compare/` as a second comparison namespace alongside `/vs/`**: rejected.
  One namespace only, to avoid content duplication and canonical confusion.

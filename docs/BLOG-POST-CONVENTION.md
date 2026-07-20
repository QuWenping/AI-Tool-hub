# New Blog Post Convention (P0-3 round 2)

**Audience**: Claude (content ops) + anyone writing new blog/SEO article pages.
**Goal**: keep formatting uniform while Codex cleans legacy posts in parallel.

## Rule: new blog posts MUST use `BlogPostLayout.astro`

Do NOT hand-write `<div class="article" style="...">`, `<header class="article-header">`,
inline styles, or JSON-LD scripts. The layout handles all of that.

### Minimal template

```astro
---
import BlogPostLayout from "../../layouts/BlogPostLayout.astro";
import TLDR from "../../components/ui/TLDR.astro";
// import Chart, ScreenshotGallery, etc. as needed
---
<BlogPostLayout
  title="Agnes AI Review (2026): Free Text, Image & Video API"
  description="We tested all three Agnes AI modalities. Here is our honest review."
  keywords="agnes-ai, free-api, ai-tools"
  eyebrow="Review"
  date="2026-07-14"
  readTime="8 min read"
  author="AI Tool Hub Editorial"
  reviewer="Lin Chen"
  tags={["agnes-ai", "free-api", "ai-tools"]}
  slug="agnes-ai-review-free-omni-modal-api-2026"
  category="Review"
>
  <p>Lede paragraph (optional — already shown as .lede in header, so use this only if you want a second intro).</p>

  <TLDR items={[
    "Key insight 1",
    "Key insight 2",
    "Key insight 3",
    "Key insight 4"
  ]} />

  <h2>What is Agnes AI?</h2>
  <p>Body content. Use plain &lt;h2&gt;, &lt;p&gt;, &lt;ul&gt;, &lt;table&gt; — the layout's <code>.article-body</code> scope applies the spec typography (H2 42 / body 20 / line-height 1.85) automatically.</p>

  <img src="/images/blog/<slug>/hero.webp" alt="..." loading="lazy" decoding="async" />
</BlogPostLayout>
```

## Props reference

| Prop | Required | Notes |
|---|---|---|
| `title` | ✅ | SEO title (BaseLayout appends ` \| AI Tool Hub`) |
| `description` | ✅ | meta description + rendered as `.lede` |
| `slug` | ✅ | used for canonical URL, JSON-LD, Feedback, RelatedPosts |
| `category` | ✅ | used by RelatedPosts matching (e.g. "Review", "Tutorial") |
| `eyebrow` | recommended | small label above H1 |
| `date` / `readTime` / `author` | recommended | meta row |
| `reviewer` | optional | "Reviewed by" line |
| `tags` | optional | string[] — tags section + RelatedPosts matching |
| `keywords` | optional | defaults to tags joined |
| `lang` | optional | "en" (default) / "zh" |
| `breadcrumb` | optional | override last crumb text (defaults to title) |
| `showEngagement` | optional | default true → Feedback + RelatedPosts + Comments |

## Body content rules (inside the default slot)

1. **No inline styles.** Use semantic elements (`h2`, `h3`, `p`, `ul`, `ol`, `table`, `blockquote`). Typography is handled by `.article-body` CSS.
2. **Images**: `<img src=... alt=... loading="lazy" decoding="async" />`. Put large/hero images inside the slot; the layout's CSS sizes them. For screenshot galleries use `ScreenshotGallery` (gives Lightbox).
3. **Components available**: `TLDR`, `Chart`, `ScreenshotGallery`, `ProsCons`, `ComparisonTable`, `AdSlot`, `Accordion`, etc. (see `src/components/ui/`).
4. **No `<BaseLayout>` / `<BlogJsonLd>` / breadcrumbs / `<header class="article-header">`** — the layout does all of it. Writing them again causes duplicates.
5. **H1 is rendered by the layout** (from `title`). Do NOT add another `<h1>` in the body. Start the body with `<h2>` or a `<p>`.

## What the layout gives you automatically

- 760px article column (`.article`)
- Breadcrumbs (Home › Blog › {title})
- Article header: eyebrow + H1 (spec size) + lede + meta row
- `.article-body` prose typography (H2 42 / H3 32 / body 20, responsive)
- Article + Breadcrumb + FAQ JSON-LD (via `BlogJsonLd`)
- Optional Tags section
- Optional Feedback + RelatedPosts + Comments (engagement)

## File ownership (avoid merge conflicts)

- **Content side (Claude)**: `src/data/*.json` (tool-editorial, tools, matchups, categories, solutions, posts) + NEW blog post `.astro` files written with `BlogPostLayout`.
- **Engineering side (Codex)**: `src/layouts/**`, `src/components/**`, `src/styles/**`, `public/css/**`, `public/js/**`, and cleaning the 33 LEGACY blog `.astro` files.
- Do not edit the other side's files without a ⚠️ heads-up.

## Migration note (for Codex)

Legacy posts currently use two patterns:
- `.article` + `.article-body` (13 review posts) — already at spec typography via CSS.
- `.legal-page blog-post` + `.blog-content` (33 how-to / best-of / vs posts) — at spec via `.legal-page` CSS; to be migrated to `BlogPostLayout` for full uniformity.

Migration of a legacy post = move its frontmatter `post = {...}` into `BlogPostLayout` props, move its body into the default slot, delete the old `<div class="article">`/`<article class="legal-page blog-post">` wrapper, breadcrumbs, header, and `BlogJsonLd` call (layout handles them).

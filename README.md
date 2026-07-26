# AI Tool Hub

The Best AI Tools Review — 程序化 SEO 驱动的 AI 工具评测与对比站。

## Tech Stack

- **Framework**: [Astro v4](https://astro.build/) (hybrid mode — static pre-rendering + SSR for API routes)
- **Content**: Content Collections (`blog` + `tools`)
- **Language**: TypeScript
- **i18n**: EN / ZH (custom implementation via `src/i18n/`)

## Site Scale

| Metric | Count |
|---|---|
| Static HTML pages | 452 |
| Blog posts (EN+ZH) | 35 posts → 70 pages |
| Tool detail pages (EN+ZH) | 49 tools → 98 pages |
| Alternatives pages | 49 |
| VS comparison pages | 13 |
| Solutions pages | 28 |
| Best collection pages | 7 |
| My Library (favorites) | localStorage-based |
| RSS Feed | `/rss.xml` |
| Sitemap | `/sitemap-index.xml` |

## Architecture

### Content Collections

- **blog** — 35 `.md` files in `src/content/blog/`
- **tools** — 299 `.yaml` files in `src/content/tools/`

### i18n

Unified translation files in `src/i18n/`:

- `en.json` — English translations
- `zh.json` — Chinese translations

Pages are duplicated under `src/pages/zh/` with `pageLang` hardcoded to `"zh"`. EN pages use `Astro.currentLocale || "en"`.

### Hybrid Rendering

Most pages are pre-rendered at build time (SSG). API routes (RSS, sitemap) use SSR via Astro's `output: "hybrid"`.

### My Library

Tool detail pages include a SaveButton component that persists favorites to `localStorage`.

## Local Development

```bash
npm install
npm run dev        # http://localhost:4321
npm run build      # output in dist/
```

## Deployment

Deployed on **Vercel** with automatic deployments from the connected GitHub repository.

- Build command: `npm run build`
- Output directory: `dist`

## Directory Structure

```
src/
├── pages/           Astro pages (EN + zh/)
│   ├── alternatives/[slug].astro
│   ├── best/[slug].astro
│   ├── blog/[slug].astro
│   ├── category/[slug].astro
│   ├── solutions/[slug].astro
│   ├── tool/[slug].astro
│   ├── vs/[slug].astro
│   ├── tools/*.astro      12 standalone tool pages
│   └── zh/                Chinese mirror
├── content/
│   ├── blog/              35 .md posts
│   └── tools/             299 .yaml tool definitions
├── data/                  categories, solutions, matchups, etc.
├── components/            UI + business components
├── layouts/               BaseLayout, BlogPostLayout
├── i18n/                  en.json + zh.json
└── utils/                 i18n helpers
```

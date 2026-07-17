# AI Tool Hub v2 (Programmatic SEO Rebuild)

> 2026-07-05 rewrite. 旧站 → 新站的迁移目标.

## 站点结构

```
dist/  (Astro build output)
├── index.html                          (1 个首页)
├── about.html
├── contact.html / privacy.html / terms.html
├── best/<slug>/index.html              (20 分类页)
├── tool/<slug>/index.html              (12 工具详情页, codewords 已剔除)
├── alternatives/<slug>/index.html      (12 替代品页)
└── vs/<slug>/index.html                (15 对比页)
```

**总计 60+ 静态 HTML 页** (从原来的 7 个 → 60+).

## 部署

### A. 本地构建

```bash
npm install
npm run build      # 输出在 dist/
```

### B. 部署到 Vercel (推荐, 保留现有)

```bash
# 已经在 Vercel 部署的 ai-tool-hub-self 项目
# 直接连这个 GitHub 仓 + build command = npm run build
# 保留 vercel.json 配置
```

### C. 部署到 Cloudflare Pages (可选, 更快)

```bash
# Cloudflare Pages → Connect to Git
# Build command: npm run build
# Output dir: dist
# Node version: 20
```

## 数据

- `public/js/main.js` — 13 个 AI 工具双语数据 (从原站保留)
- `src/data/categories.json` — 20 个分类 + 工具映射
- `src/data/matchups.json` — 15 组对比

**注意**: `codewords` 已从所有 tool / best / alternatives 页面剔除, 只保留在 main.js 里以备后用 (或彻底删除).

## 后续

1. 在 Cloudflare Pages / Vercel 部署
2. 重新提交 sitemap 到 GSC
3. 等待 Google 重新索引
4. 1-2 周后重新申请 AdSense

## 仍未完成 (留给你)

- [ ] 替换 `codewords` 的推广 (已从所有页面剔除, 但 main.js 数据还在)
- [ ] 加 1-2 篇 blog 文章
- [ ] 买真域名 (bestaitoolsreview.com 之类)
- [ ] 加 Google Analytics / Plausible

## 最近更新
- 修复结构化数据：确保 BlogJsonLd 组件在标题或描述为空时提供后备值，避免 BreadcrumbList 中的 name 缺失，解决 Google Search Console 警告。

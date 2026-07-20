---
title: AI Tool Hub 全球化开发任务计划
tags:
  - ai-tool-hub
  - roadmap
  - planning
updated: 2026-07-19
maintainers:
  - QuQu
status: active
---

# 🧭 AI Tool Hub 全球化开发任务计划

> **说明**：本文件是主索引，任务状态用 `- [ ]` / `- [x]` 复选框标记，Obsidian 内可直接点击勾选。
> **多人协作**：修改任务状态时请在末尾追加 `@name 2026-MM-DD`，例如 `- [x] 任务 A @QuQu 2026-07-19`。
> **AI 分工**：
> - **Claude → [[AI-Tool-Hub-内容更新计划]]**：Reviews / Comparisons / Topic Clusters / 内链 / 外链 / 编辑元数据 / Newsletter
> - **Codex → 本文件其它所有代码类任务**：Design System / 组件 / 页面模板 / Supabase / Agent Pipeline / 性能 / 安全
>
> **配套文档**：
> - [[AI-Tool-Hub-完整规划|完整规划详情（Design System / SEO / Agent Pipeline）]]
> - [[AI-Tool-Hub-现状对比|计划 vs 现状对比表]]
> - [[AI-Tool-Hub-内容更新计划|内容运营（Claude 主导）]]

---

## 📚 文档来源

- `目标不是做一个漂亮的网站.txt`
- `网站方向.txt`
- `网站内容.txt`
- `增加用户停留时间方案.txt`
- `真正有机会做到全球头部的网站.txt`
- `针对你的 AI Tool Hub 全球 AI 工具网站，SEO 不应该.txt`

---

## 🎯 产品愿景

- **不做漂亮博客，做全球 AI Tools 平台**
- **对标**：Vercel、Linear、Anthropic、Stripe、Cursor、Perplexity、Futurepedia、Product Hunt、Notion
- **三阶段升级**：
  1. AI 工具目录（Directory）
  2. AI 决策平台（AI Decision Engine）
  3. AI 生产力操作系统（AI Productivity OS）
- **六大核心板块**：工具数据库 / 评测对比 / Prompt Library / Workflow Library / 免费在线工具 / 行业解决方案

---

# 🔴 P0 优先级 — 最高（1–2 个月）

## Design System 基础

- [ ] P0-3 组件化重构现存页面（消除 100+ 页面 inline style / hard-coded 颜色） ⚙️ 博客块完成（46 篇统一，~380 个 page-level inline style 清零）；非博客 cosmetic 块完成（29 文件 / 140 个，round 3 step 1）；剩余：34 个含结构性 inline style 的非博客文件（11 个交互式 tools/*.astro + about/team/contact/newsletter/submit-*/best-ai-agents/prompts·templates·workflows 动态模板及 zh 镜像）需逐个把结构性 style 转成 class；组件级 inline style（Feedback/Chart）另算 @Codex 2026-07-20
- [ ] P0-7 Lighthouse 全站达标（Performance ≥95、SEO 100）
- [x] P0-8 图片规范（WebP/AVIF + Lightbox + Lazy Load） @Codex 2026-07-20
- [x] P0-9 Grid System 统一（Article 760 / TOC 280 / Sidebar 320） @Codex 2026-07-20
- [x] P0-10 Typography 全站统一（H1 64 / H2 42 / 正文 20） @Codex 2026-07-20

## AI 决策平台核心

- [x] P0-1 AI Tool Finder 后端算法接入（首页 UI 已完成） @Claude 2026-07-19
- [x] P0-2 AI Stack Builder（首页最大按钮 + Step1-3 选择器 + 输出组合） @Claude 2026-07-19

## Tool Detail 页面

- [x] P0-4 Tool Detail 补全（模板基础：Quick Facts / TestStatus / FeatureTable / FAQ / SEO 标准化） @Claude 2026-07-20
- [ ] P0-5 Real Test 模块（真人测试数据 + Before/After 截图）
- [ ] P0-6 工具评分系统升级（Performance / Ease / Value / ROI 多维度）
- [x] P0-12 Tool Detail H1 / Title / Meta 格式规范化（`X Review 2026: Features, Pricing, Alternatives`） @Claude 2026-07-20

## SEO 内容启动

- [ ] P0-11 首批 50 个 SEO 页面上线（10 工具 + 5 vs + 5 场景 + 4 趋势 + 26 补齐） ⚙️ 归 Claude 内容运营
- [x] P0-13 tools.json 增加 `industry_tags` 字段（Architecture / Engineering / Construction / BIM / Industrial + 教育 / 营销 / 软件） @Claude 2026-07-20
- [x] P0-14 URL 结构规范化决策（`/tools/{slug}` vs `/tool/{slug}`；`/compare/A-vs-B` vs `/vs/{slug}`） @Codex 2026-07-20
- [x] P0-15 场景页新增 5 篇（Architects / Engineers / Construction / Small Business / Students） @Claude 2026-07-20

---

# 🟠 P1 优先级 — 次高（3–6 个月）

## 数据规模化

- [ ] P1-1 工具数据库扩展 299 → 5000+
- [ ] P1-2 每天更新自动化（Github / PH / HN / HuggingFace / X 抓取 + AI 生成）
- [ ] P1-5 Prompt Library 639 → 10000+
- [ ] P1-14 迁移到 Supabase 数据库（ai_tools / categories / features / pricing / reviews / research）
- [ ] P1-15 建立 seo_keywords + seo_clusters 关键词库
- [ ] P1-16 90 天内容目标：500 工具 + 300 SEO 文章

## SEO 内容矩阵

- [ ] P1-3 比较页面全覆盖（热门 A vs B 组合自动生成）
- [ ] P1-4 Best AI XX 排行榜专题扩充（Coding / Video / Music / Agents / OCR / Design / Chatbot / Image / Resume / Meeting）
- [ ] P1-17 独立 Category 层级页（`/category/ai-writing` 等，与 `/best/` 区分）
- [ ] P1-18 `/tutorials` 目录聚合教程
- [ ] P1-19 Comparison 模板补全（Overview / Feature / Pricing / Quality / Speed / Best For / Winner）

## 决策平台深化

- [ ] P1-6 AI Tool Score™ 评分算法（30% User + 25% Capability + 20% Price + 15% Growth + 10% Trust）
- [ ] P1-7 交互式比较器（用户动态选两个工具生成 Winner）
- [ ] P1-8 案例库（Industry → Use Case → Tools）
- [ ] P1-9 实时 Trending 排行（每日 / 每周更新）
- [ ] P1-10 Newsletter 升级为 AI Weekly Intelligence（5 工具 + 3 Workflow + 1 Case + 1 Prompt）

## 停留时间与用户资产

- [ ] P1-11 视频 / GIF 内容（30/60/90 秒 + 关键操作 GIF）
- [ ] P1-12 用户账号系统 + 收藏 / My AI Library
- [ ] P1-13 页面 inline style / hard-coded 颜色全部消除

---

# 🟡 P2 优先级 — 差异化壁垒（6–12 个月）

## Benchmark 与 Agent 目录

- [ ] P2-1 AI Benchmark 实验室（Coding / Image / Video 独立页 + 100 工具真实测试）
- [ ] P2-2 AI Agent Directory（Research / Coding / Marketing / Business / Engineering Agent 分类）

## 行业垂直 & Marketplace

- [ ] P2-3 行业 AI 解决方案（Architecture / Engineering / Manufacturing Stack）
- [ ] P2-4 Workflow Marketplace（付费工作流上架）

## Agent Pipeline（内容工厂）

- [ ] P2-12 Agent Pipeline W1-W6（Keyword Discovery → Cluster → Research → Outline → Writer → Comparison）
- [ ] P2-13 Agent Pipeline W7-W9（Use Case Agent / Image Prompt / Internal Link）
- [ ] P2-14 SEO Audit Agent（100 分制评分）+ 自动重写循环
- [ ] P2-15 Publisher Agent（Next.js ISR + Sitemap + Search Console Ping）
- [ ] P2-16 Update Agent（>180 天旧内容自动刷新）
- [ ] P2-17 image_prompts + assets 表 + Flux / Imagen 图片生成流水线
- [ ] P2-18 每日运行时间表落地（00 关键词 / 01 研究 / 03 写作 / 05 评分 / 06 发布）

## 用户增长

- [ ] P2-5 免费在线工具扩展（图片放大 / 背景去除 / SEO 标题 / 正则 / Prompt 优化器 等）
- [ ] P2-6 UGC（用户上传 Prompt / Workflow / 评分 / 评论）
- [ ] P2-7 AI Radar（每日 Trending + New Launch + Price Change + Funding）
- [ ] P2-8 游戏化（AI Productivity Score 分享）
- [ ] P2-9 中文站 /zh/ 全路由覆盖
- [ ] P2-10 Author Schema + 独立作者页
- [ ] P2-11 页面性能持续优化到 Lighthouse ≥95 全站

---

# 🟢 P3 优先级 — 长期护城河（12+ 个月）

## 商业化

- [ ] P3-1 AI Tool 数据 API（$49 / 月给开发者）
- [ ] P3-2 Premium Membership（付费会员）
- [ ] P3-3 AI Consulting / AI Transformation 企业服务
- [ ] P3-4 Custom Agent 定制

## 生态与内容矩阵

- [ ] P3-5 YouTube / TikTok / 小红书视频矩阵
- [ ] P3-6 评分社区（类 Product Hunt 每日榜）
- [ ] P3-7 用户 My AI Stack 公开分享页（`u/{name}` 百万 UGC 页面）
- [ ] P3-8 移动端 App / PWA

## 基础设施成熟

- [ ] P3-9 n8n + LangGraph 混合架构完整落地
- [ ] P3-10 crawl_logs / publish_logs 完整数据观察

---

# ✅ 已完成里程碑（记录 & 归档）

- [x] **Sprint 6（2026-07-21）P0-3 round 3 step 1：非博客 cosmetic inline style 清理** @Codex 2026-07-21
  - 审计全部非博客 .astro 页面：805 个 inline style / 63 文件；按是否含结构性（display/grid/flex/position）拆分
  - 29 个 cosmetic-only 文件批量剥离 140 个 inline style：methodology(76)、case-studies、glossary、sponsor、press-kit、alternatives/[slug]、use-case-for-*(4)、deep-dive-*(9)、index、9 个 zh 镜像页
  - 34 个含结构性 inline style 的文件（含 11 个交互式 tools/*.astro）留下一节点逐个把结构性 style 转 class
  - Playwright 12 路由 × 2 视角 = 24 检查全绿（200、0 page error、无溢出）；构建 2142 页；门禁全绿；已推送
- [x] **Sprint 6（2026-07-21）P0-3 round 2 step 2+3：博客全量统一到 BlogPostLayout / 去 inline style** @Codex 2026-07-21
  - step 2：批量迁移 31 篇 `.legal-page blog-post` 到 `BlogPostLayout`（best-ai-* 11 / how-to-* 13 / vs 5 / meetily / apple-speechanalyzer）；3 篇特殊处理（apple 无 BlogJsonLd+div meta、2 篇带 scoped `<style>`）；全部移除 `<section class=blog-content>` 包装与死 scoped style；剥离全部 inline style（审计确认 0 结构性 inline style，244 个全为装饰性）
  - step 3：12 篇 `.article` 博客剥离 136 个 inline style；agnes 2 个结构性 grid style 转 `.grid-2`/`.grid-stack` class
  - CSS 溢出修复（惠及全博客）：`.audience-tags` flex-wrap + `.audience-tag` overflow-wrap；`.article-body table` 响应式横向滚动；`.article-body pre/code` overflow；`.article img` max-width:100%（修 hero 图在 .article 非 article-body 区的移动端溢出）；`.article-body .callout`、`.grid-stack` 全局类
  - 结果：0 篇 `.legal-page blog-post` 残留；46 篇博客全部统一布局 + 页面级 inline style 清零
  - Playwright 验证 13 篇迁移博客 + 12 篇 .article 博客 × 2 视口 = 50 检查全绿（200、0 page error、无溢出、单一 H1、无 legacy 包装）；构建 2142 页；门禁全绿；已推送 origin/main
- [x] **Sprint 6（2026-07-21）P0-3 round 2 step 1：BlogPostLayout + 新博文规范 + 参考迁移** @Codex 2026-07-21
  - 新建 `src/layouts/BlogPostLayout.astro`：封装 `.article`(760) + `.article-header`(eyebrow/h1/lede/meta) + `.article-body`(prose) + 面包屑 + JSON-LD(BlogJsonLd) + 可选 Tags/Feedback/RelatedPosts/Comments；props 覆盖 title/description/slug/category/eyebrow/date/readTime/author/reviewer/tags/keywords/lang/breadcrumb/showEngagement
  - 新建 `docs/BLOG-POST-CONVENTION.md`：规定**新博文必须用 BlogPostLayout**，附 props 参考、正文规则、文件归属（Claude=内容数据+新博文，Codex=layouts/components/CSS+legacy 清理）——让 Claude 内容更新可与 Codex 重构并行、无格式漂移
  - 参考迁移：`how-to-use-ai-for-data-analysis-2026.astro` 从 `<article class=legal-page blog-post>` + inline style 迁移到 BlogPostLayout，验证布局端到端（单一 H1、.article-body prose、engagement 组件、无重复 JSON-LD）
  - CSS：`.article-footer`；`.article-body/.legal-page/.blog-content img { max-width:100% }`（修复博客内联图片固有宽度导致的移动端溢出）
  - 升级 `pre-deploy-check.mjs` 为并行协作感知：Claude 的内容数据 WIP（tool-editorial.json 等）不再阻塞 Codex 工程推送，仅工程文件未提交才阻塞
  - Playwright 验证迁移后博文 @1440/390：200、0 console error、无溢出、H1 64/38、H2 42/26、单一 H1、无 legacy 包装、engagement 在位；构建 2142 页；门禁全绿；已推送 origin/main
- [x] **Sprint 5（2026-07-20）P0-3 round 1：best/vs/blog 模板套用 article-grid+prose + 站点 header 作用域修复** @Codex 2026-07-20
  - `vs/[slug].astro`（103 页）：套 `.article-grid`（760+280 TOC，5 项）+ 新 `ArticleToc.astro` 组件；移除 hero/at-a-glance/This Page Answers 的 inline style → `.vs-hero` / `.detail-section`
  - `best/[slug].astro`（~11 页）：套 `.article-grid`（760+280 TOC，7 项）+ 7 个 h2 补 id；inline updated-badge → `.updated-badge` class
  - `blog`（46 篇）：CSS 升级 `.article-header h1` / `.article-body h2/h3` / `.lede` 到规范尺寸（自动覆盖所有 .article 博客）；11 篇移除冗余 inline `max-width:760px`
  - **根因修复**：`BaseLayout` `<header>` → `<header class="site-header">`，`public/css/style.css` 把 `header{}` / `header .container` / `header .nav-links` 全部作用域到 `.site-header`——之前全局 `header{display:flex;height:64px;position:sticky}` 误伤所有内容 `<header>`（`.cat-hero`/`.article-header`/`.tool-detail-header`/`.vs-hero`），导致内容头被压成 64px+sticky，并在 best/blog 移动端横向溢出。修复后内容头恢复 auto 高度 + static，站点导航保持 64px sticky
  - Playwright 验证 7 路由 × 2 视口（home/tool/vs/best/blog-howto/blog-article/solutions @1440/390）：全 200、0 console error、无横向溢出；站点导航 64px sticky、内容头 static auto-height
  - 构建 2142 页；pre-deploy-check 全绿；已推送 origin/main（Vercel 自动上线）
- [x] **P0-14 URL 结构规范化决策** — `docs/URL-STRUCTURE.md`：保留 `/tool/{slug}/`、`/vs/{slug}/`、`/best/{cat}/`；`/tools/`（复数）留给免费在线工具；不做大规模 301 迁移 @Codex 2026-07-20
- [x] **P0-9 + P0-10 Article Grid + Prose Typography 系统** — `global.css` 新增 `.article-grid`（760 文章 + 280 sticky TOC + 可选 320 sidebar）与 `.prose` 响应式排版（H1 64 / H2 42 / H3 32 / 正文 20，clamp 响应式）；`tool/[slug].astro` 重构为参考实现（760+280 双栏 + 16 项自动 TOC）；`.tool-detail-header h1`、`.lede`、`.detail-section h2/p/li` 升级到规范尺寸 @Codex 2026-07-20
- [x] **P0-8 图片 Lightbox + Lazy Load** — `public/js/lightbox.js`（无依赖、渐进增强、Esc/方向键、上一张/下一张、caption、计数）+ `.lb-overlay` 样式；`ScreenshotGallery.astro` 加 `data-lightbox`；`BaseLayout` 引入脚本；截图 `<img>` 已 `loading=lazy` + `decoding=async` @Codex 2026-07-20
- [x] **P0-13 industry_tags 分类体系落地** — 11 项分类 + 43 款工具打标 + `industry-taxonomy.json` @Claude 2026-07-20
- [x] **P0-15 五个行业场景页上线** — Architects / Engineers / Construction / Small Business / Students（每页 9-11 工具 + 10 FAQ + 完整 JSON-LD） @Claude 2026-07-20
- [x] **P0-4 Tool Detail 模板重构（基础）** — Quick Facts / TestStatus / FeatureTable / ToolFAQ / SEO Schema 全部到位，17 家旗舰工具补齐编辑元数据 @Claude 2026-07-20
- [x] **P0-12 Tool Detail H1 / Title / Meta 规范化** — 标题重复的 `| AI Tool Hub` 已修复，reviewed vs catalogued 双模板 @Claude 2026-07-20
- [x] **P0-1 AI Tool Finder（确定性客户端 MVP）** @Claude 2026-07-19
- [x] **P0-2 AI Stack Builder（3 步选择 → 3 工具推荐 + 成本/节省估算 + 分享/重置）** @Claude 2026-07-19
- [x] 首页按 UI/index.html 参考稿重构 @QuQu 2026-07-19
- [x] 亮 / 暗主题统一（全站 11 路由 body 背景色验证通过） @QuQu 2026-07-19
- [x] 底层 Design Token（tokens.css）+ 兼容映射
- [x] 修复首页乱码 / 断链 / 假路由问题 @QuQu 2026-07-19
- [x] 修复所有其他页面在白色主题下的显示问题 @QuQu 2026-07-19
- [x] 组件库骨架（40+ 组件：Hero、ToolCard、ProsCons、TLDR、Verdict、Comparison、AdSlot 等）
- [x] Sitemap 自动生成（@astrojs/sitemap + gen-sitemap.mjs）
- [x] 基础 SEO Schema（Article / Breadcrumb / FAQ / Software / Review）
- [x] hreflang（en / zh）配置
- [x] 商业模式 P1（AdSense + Affiliate CTA 组件）
- [x] Newsletter 系统组件
- [x] 299 AI 工具数据 + 639 Prompt + 46 篇博客 + 103 组比较页
- [x] 11 个免费在线工具（Token 计算器 / OCR / PDF 转 MD / AI 检测 / JSON / Markdown 等）

---

## 🚪 阶段收尾上线门禁（每个 Sprint 必跑）

> **规则**：每完成一个阶段任务，先跑 `scripts/pre-deploy-check.mjs`；**通过则 `git push origin main`**（Vercel 自动构建上线 thebestaitoolsreview.com），**不通过则按报告修复后重跑**。详见 `docs/DEPLOYMENT-CHECKLIST.md`。

**通过标准（全部满足才推送）**：
1. `npm run build` 退出码 0（当前 ~2142 页）
2. Playwright 冒烟 4 类核心路由 × 2 视口（1440/390）全 200、无 console error、无横向溢出
3. Git 工作树无未提交的跟踪改动
4. 本地领先 `origin/main`（有内容可推）且不落后
5. `origin` 远程可达

**不阻塞但关注**：`npx astro check` 有 ~115 个历史遗留 TS 类型告警（JSON 联合类型导致），Vercel 用 `astro build` 不做完整 TS 检查，故不阻塞；新代码不应新增，长期清理归 P0-3。

**冒烟路由**：`/`、`/tool/chatgpt/`、`/vs/chatgpt-vs-claude/`、`/solutions/ai-for-architecture/`

**首次执行（Sprint 4，2026-07-20）**：✅ 构建 + 冒烟 + Git 状态全绿；❌ `git push` 被 GitHub 拒绝（403，凭据 `quwenping88` 无权 / keyring token 失效）—— 需用户在本机执行 `gh auth login -h github.com` 或更新 PAT 后重推。代码与构建均已就绪，仅本地凭据问题待解。

---

# 🤝 多人协作规则

## 更新任务状态

1. Obsidian 内直接点击复选框 `[ ]` → `[x]`
2. **必须**在任务末尾追加签名：`@yourname YYYY-MM-DD`
3. 已完成的任务请移动到本文档底部 `✅ 已完成里程碑` 区块
4. 有争议或需要讨论的任务，请标记 `⚠️` 并追加评论：`⚠️ 需讨论：xxx @name`

## 添加新任务

1. 在对应优先级下方新增 `- [ ] Pn-XX 任务名`
2. 与既有编号连续（不要重编号）
3. 涉及大改动请更新 [[AI-Tool-Hub-完整规划]]

## 每周同步

- **周一**：Review P0 列表，确认当周计划
- **周五**：更新 [[AI-Tool-Hub-现状对比]] 中的完成状态

## 分工建议

- **Claude（内容运营）**：全权负责 [[AI-Tool-Hub-内容更新计划]] — Reviews / Comparisons / Topic Clusters / 内链 / 外链 / 编辑元数据 / Newsletter / 稳态产线
- **Codex（工程实施）**：全权负责本文件里其它所有代码类任务 — Design System / 组件 / 页面模板 / Supabase / Agent Pipeline / 性能 / 安全 / DevOps
- **前端 / UI**：P0-3、P0-4、P0-7~P0-10、P1-7、P1-13
- **内容运营**：P0-11、P0-15、P1-4、P1-10（走内容更新计划的排期与规范）
- **后端 / 数据**：P0-1、P0-2、P0-13、P1-14、P1-15
- **自动化 / Agent**：P1-2、P2-12~P2-18
- **行业内容**：P0-15、P2-3

**协作接口**：
- 内容运营发现模板缺陷或字段需扩展 → 在 [[AI-Tool-Hub-任务计划]] 加 `- [ ] Pn-XX` 交给 Codex
- Codex 发布新模板/新字段 → 在 [[AI-Tool-Hub-内容更新计划]] 顶部 "📈 周报" 区留一条 changelog 通知 Claude
- 争议或跨界任务 → 标 `⚠️` + 具名 `@Claude` 或 `@Codex` 触发协商

---

# 📊 进度总览（手动更新）

```dataview
TABLE WITHOUT ID
  "P0" AS 优先级,
  "1-2 个月" AS 目标周期,
  "0/15" AS 完成进度
FROM ""
LIMIT 0
```

**当前状态**（2026-07-20）：
- P0：10/15
- P1：0/19
- P2：0/18
- P3：0/10
- **总计**：10/62 已明确任务
- **已完成**：19 项基础里程碑（含 Sprint 1 的 P0-1/P0-2、Sprint 2 的 P0-4/P0-12、Sprint 3 的 P0-13/P0-15）

> **Sprint 3 备注**：P0-13 落地为**分类体系 + 精选工具打标（43/299）**，全站 5000 工具的标签化仍归 P1-1/P1-14；P0-15 交付 Architects / Engineers / Construction / Small Business / Students 五页面向工作流意图（不与 `/best/` 排名意图重复）。

---

# 🔗 相关链接

- [[AI-Tool-Hub-完整规划]] — 全部原始规划细节
- [[AI-Tool-Hub-现状对比]] — 每项任务的现状盘点
- 项目仓库：`C:\Users\QuQu\AI-Tool-hub-main`
- 生产站点：`https://thebestaitoolsreview.com`

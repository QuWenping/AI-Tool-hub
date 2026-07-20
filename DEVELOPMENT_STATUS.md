---
title: AI Tool Hub 计划 vs 现状对比表
tags:
  - ai-tool-hub
  - status
  - inventory
updated: 2026-07-19
maintainers:
  - QuQu
status: active
related:
  - "[[AI-Tool-Hub-任务计划]]"
  - "[[AI-Tool-Hub-完整规划]]"
---

# AI Tool Hub 计划 vs 现状对比表

> **文档说明**：本文件用于盘点每一项计划的当前状态。建议每周五更新一次；日常任务勾选请到 [[AI-Tool-Hub-任务计划]]，完整规划参考 [[AI-Tool-Hub-完整规划]]。

**基于开发计划**：[[AI-Tool-Hub-完整规划]]（含 SEO 自动化生产系统）
**盘点日期**：2026-07-20

## 🚀 最近里程碑

- **Sprint 6 step 8（round 3 step 5）**：team(20→0)+contact(15→0) 去 inline style；新增 form 类 + 增强 cta-primary；Playwright 6 全绿；已推送

- **Sprint 6（2026-07-21）step 7（round 3 step 4）**：静态结构性页 best-ai-agents/about/zh-solutions 去 inline style + zh-solutions 防御化
  - best/ai-agents(39→0)、about(21→0，team 卡片转 class)、zh/solutions(23→0) 全部 0 inline style
  - ⚠️ 跨界：Claude solutions.json 新条目 mechanical-engineers 缺 tools/sections 字段致构建崩溃；zh/solutions 模板已防御化（不完整条目降级渲染，不再整站失败）
  - Playwright 8 检查全绿；构建 2162 页；门禁全绿；已推送
- **Sprint 6（2026-07-21）step 6（round 3 step 3）**：listing index 页去 inline style
  - prompts/templates/workflows 三个 index 页全部 inline style → listing 工具类（.page-container/.list-card/.card-grid/.card-head/.tool-pill/.prompt-preview 等）
  - 3 页各 0 inline style；Playwright 6 检查全绿（cards 639/19/25）；构建 2142 页；门禁全绿；已推送
- **Sprint 6（2026-07-21）step 5（round 3 step 2）**：动态内容模板去 inline style
  - prompts/templates/workflows [slug] 3 模板全部 inline style → 工具类，惠及 683 生成页
  - 新增公共工具类：.code-card/.copy-btn/.prompt-code、.tag-row/.tag-pill(+diff-*)/.tag-chip/.meta-text、.info-card(+amber/blue)/.qa-box、.step-list/.step-item/.step-icon、.back-link
  - 3 模板各 0 inline style；Playwright 6 检查全绿；构建 2142 页；门禁全绿；已推送
- **Sprint 6（2026-07-21）side**：全站占位邮箱 `*@ai-tool-hub.example` 替换为真实邮箱 `quwenping2020@163.com`（contact + 8 页，0 占位残留）
- **Sprint 6（2026-07-21）step 4（round 3 step 1）**：P0-3 非博客 cosmetic inline style 清理
  - 审计非博客页面：805 inline style / 63 文件；29 个 cosmetic-only 文件批量剥离 140 个（methodology 76、deep-dive-* 9、use-case-for-* 4、zh 镜像 9 等）
  - 34 个含结构性 inline style 的文件（含 11 交互式 tools/*.astro）待下一节点逐个转 class
  - Playwright 24 检查全绿；构建 2142 页；门禁全绿；已推送
- **Sprint 6（2026-07-21）step 2+3**：P0-3 博客块全量统一
  - step 2：31 篇 `.legal-page blog-post` 批量迁移到 `BlogPostLayout`（去包装/死 scoped style/全部 inline style，244 个装饰性 style 属性清零）
  - step 3：12 篇 `.article` 博客剥离 136 个 inline style；agnes 2 个结构性 grid 转 `.grid-2`/`.grid-stack`
  - CSS 溢出修复（惠及全博客）：audience-tags flex-wrap、article-body table 响应式滚动、pre/code overflow、`.article img` max-width:100%、`.article-body .callout`、`.grid-stack`
  - 结果：0 篇 `.legal-page blog-post` 残留；46 篇博客全部统一布局 + 页面级 inline style 清零
  - Playwright 50 检查全绿；构建 2142 页；门禁全绿；已推送
- **Sprint 6（2026-07-21）**：P0-3 round 2 step 1 — BlogPostLayout + 新博文规范 + 参考迁移
  - 新建 `src/layouts/BlogPostLayout.astro`（canonical 博客布局：.article+.article-header+.article-body+面包屑+JSON-LD+可选 engagement）
  - 新建 `docs/BLOG-POST-CONVENTION.md`：新博文必须用 BlogPostLayout；文件归属（Claude=内容数据+新博文，Codex=layouts/components/CSS+legacy 清理）→ 内容与工程可并行无漂移
  - 参考迁移 `how-to-use-ai-for-data-analysis-2026.astro` 到 BlogPostLayout；CSS 加 `.article-footer` + 博客图片 `max-width:100%`（修移动端溢出）
  - `pre-deploy-check.mjs` 升级为并行协作感知：内容数据 WIP 不阻塞工程推送
  - 验证迁移后博文 @1440/390 全绿；构建 2142 页；门禁全绿；已推送
- **Sprint 5（2026-07-20）**：P0-3 round 1 — best/vs/blog 套用 article-grid+prose + 站点 header 作用域修复
  - `vs/[slug].astro`（103 页）：`.article-grid`（760+280 TOC，5 项）+ `ArticleToc.astro`；移除 hero/at-a-glance/This Page Answers inline style
  - `best/[slug].astro`（~11 页）：`.article-grid`（760+280 TOC，7 项）+ 7 个 h2 补 id；inline badge → `.updated-badge`
  - `blog`（46 篇）：CSS 升级 `.article-header h1` / `.article-body h2/h3` / `.lede` 到规范尺寸；11 篇移除冗余 inline `max-width:760px`
  - **根因修复**：`<header>` → `<header class="site-header">`，`style.css` 把 `header{}` 等规则作用域到 `.site-header`，修复全局 header 规则误伤内容 `<header>`（导致内容头被压 64px+sticky、best/blog 移动端溢出）
  - 新组件 `src/components/ui/ArticleToc.astro`（可复用 sticky TOC）
  - Playwright 7 路由 × 2 视口全绿；构建 2142 页；pre-deploy-check 全绿；已推送上线
- **Sprint 4（2026-07-20）**：P0-8 / P0-9 / P0-10 / P0-14 — Design System 统一 + 图片 Lightbox
  - 新增 `docs/URL-STRUCTURE.md`：URL 结构规范化决策（保留 `/tool/`、`/vs/`、`/best/`；`/tools/` 留给免费在线工具；不做大规模 301）
  - `src/styles/global.css` 新增 `.article-grid`（760 文章 + 280 sticky TOC + 可选 320 sidebar）与 `.prose` 响应式排版（H1 64 / H2 42 / H3 32 / 正文 20，clamp）
  - `src/pages/tool/[slug].astro` 重构为参考实现：`.article-grid` 双栏 + 16 项自动 TOC（所有 h2 补 id，TOC 链接全部命中锚点）
  - `public/css/style.css`：`.tool-detail-header h1`、`.lede`、`.detail-section h2/p/li` 升级到规范尺寸（H1 clamp→64、H2 clamp→42、正文 20、行高 1.85）
  - 新增 `public/js/lightbox.js`（无依赖、渐进增强、Esc/方向键、上一张/下一张、caption、计数）+ `.lb-overlay` 样式；`ScreenshotGallery.astro` 加 `data-lightbox`；`BaseLayout` 引入脚本
  - 新增 `scripts/verify-sprint4.mjs` Playwright 校验脚本
  - 验证 `/tool/chatgpt/`：article-main 760px + article-toc 280px、H1 64 / H2 42 / lede 20、16 TOC 链接全部命中、1440/390 无溢出、无控制台错误、移动端 TOC 隐藏 + H1 38px、Lightbox 点击截图弹出 overlay 正确
  - 构建通过：2142 页
- **Sprint 3（2026-07-20）**：P0-13 industry_tags + P0-15 五个行业场景页上线
  - 新增 `src/data/industry-taxonomy.json`（11 项分类）
  - `tools.json` 43 款工具补齐 `industry_tags`（数据完整性 100% 通过校验）
  - `solutions.json` 全部 18 条记录迁移到 toolIds/stackRoles/industryTags/recommendedToolIds 模型
  - 新增 3 页目标 solution：ai-for-engineers / ai-for-small-business / ai-for-students，各 9–11 工具 + 10 FAQ
  - 升级 ai-for-architecture / ai-for-construction 为完整 schema
  - 新组件：`IndustryToolCard`、`IndustryStack`、`SolutionSection`、`WorkflowCard`
  - 重写 `src/pages/solutions/[slug].astro` 和 `src/pages/solutions/index.astro`（含筛选 chips）
  - SEO：Title `Best AI Tools for {Industry} in 2026: Stack, Workflows & Use Cases`；Article + Breadcrumb + ItemList + FAQPage JSON-LD
  - Playwright 验证 7 条路由：单一 `| AI Tool Hub` 后缀、`/tool/{id}/` 全部可跳转、10 FAQ、390-1440 无溢出、无控制台错误

- **Sprint 2（2026-07-20）**：P0-4 Tool Detail 模板基础 + P0-12 SEO 标准化上线
  - 新增 `src/data/tool-editorial.json`（17 家旗舰工具编辑元数据）
  - 新增组件：`QuickFacts.astro`、`FeatureTable.astro`、`TestStatus.astro`、`ToolFAQ.astro`；重写 `ScreenshotGallery.astro`
  - 重写 `src/pages/tool/[slug].astro` 为清晰 17 段结构；WebP 优先去重；恢复 reviewed vs catalogued 双模板
  - SEO：单一 `| AI Tool Hub` 后缀、Title `X Review 2026: Features, Pricing, Alternatives & Use Cases`、meta ≤ 160 字符、SoftwareApplication + Breadcrumb + Review(限于 reviewed) + FAQ(限于有数据) Schema
  - 通过 Playwright 验证：ChatGPT / Cursor / Midjourney / ElevenLabs / AgentGPT（catalogued）四类页面均通过；390/768/1024/1440 无溢出、无控制台错误
  - **保持不完成**：P0-5 Real Test（无真实 benchmark 数据）、P0-6 多维评分（无 Performance/Ease/Value/ROI 分维分数）

- **Sprint 1（2026-07-19）**：P0-1 AI Tool Finder + P0-2 AI Stack Builder 已上线为**确定性客户端 MVP**
  - 新文件：`src/data/stack-recommendations.json`（30 工具目录）、`public/js/stack-builder.js`
  - 30 工具全部映射到真实 `/tool/<slug>/`；64 种 role×goal×budget 组合均返回 3 款互补工具
  - 支持：URL 参数持久化（`?role=&goal=&budget=`）、localStorage 恢复、复制分享链接、重置、双语标签、亮/暗主题、桌面 / 平板 / 手机三档响应式
  - 通过 Playwright 验证：搜索、分类筛选、主题切换、导航跳转、无控制台错误、body 无溢出（1440/1280/390px）

## 数据规模现状
| 数据 | 现有数量 | 计划目标 | 差距 |
|---|---|---|---|
| AI 工具 | 299 | 5000+ | 缺 4700+ |
| Prompt | 639 | 10000+ | 缺 9300+ |
| 比较页（vs） | 103 | 热门组合覆盖 | 部分 |
| Workflow | 25 | 完整 Marketplace | 大量缺口 |
| Template | 19 | 完整覆盖 | 大量缺口 |
| Blog 文章 | 46+ | 每天更新 | 需自动化 |

## 一、Design System & 基础设施

| # | 项目 | 状态 | 说明 |
|---|---|---|---|
| 1.1 | Design Token（tokens.css） | ✅ 已完成 | 颜色/字体/间距/阴影/圆角齐全 |
| 1.2 | 亮/暗主题统一 | ✅ 已完成 | body.light-theme + data-theme 已同步 |
| 1.3 | Grid System（1320/760/280/320） | ✅ 系统已建 | Sprint 4：`.article-grid`（760+280+可选320）落地，tool 详情页为参考实现；其余页面待逐页迁移 |
| 1.4 | Typography（H1 64、H2 42、正文 20） | ✅ 系统已建 | Sprint 4：`.prose` 响应式排版 + tool 详情页 H1/H2/正文 已达规范；其余页面待套用 |
| 1.5 | 响应式断点（1280/1024/768） | ✅ 已完成 | 首页 + 全局导航折叠已实现 |
| 1.6 | 组件库（40+ 组件） | ⚠️ 部分 | 已有 25 个（Hero、ToolCard、ProsCons、TLDR、Verdict、Comparison、AdSlot 等），缺 AI Stack Builder、Finder、Benchmark、Radar 等业务组件 |
| 1.7 | 图片规范（WebP/AVIF + LazyLoad） | ⚠️ 部分 | Sprint 4：Lightbox + LazyLoad 已落地；WebP 优先读取已在 tool 页（同 basename 优先 avif/webp）；AVIF 批量转换管道仍缺 |
| 1.8 | 动效规范（150ms/250ms） | ✅ 已完成 | 首页 CSS 已按规范 |
| 1.9 | Lighthouse ≥95 达标 | ❌ 未测试 | 尚未运行完整评估 |
| 1.10 | 组件化（禁止页面内写死样式） | ⚠️ 进行中 | 博客块完成（46 篇全部统一：32 篇 BlogPostLayout + 12 篇 .article 去 inline style，~380 个 page-level inline style 清零）；best/vs/blog 动态模板 + 站点 header 作用域已修。剩余：~13 篇 .article 可选迁 BlogPostLayout、组件级 inline style（Feedback/Chart 等）、prompts/workflows/templates/solutions/alternatives/zh 等非博客页面 |

## 二、页面模板

| # | 项目 | 状态 | 说明 |
|---|---|---|---|
| 2.1 | 首页（Hero + 价值主张 + Finder 预览 + Featured + Benchmark） | ✅ 已完成 | 按 UI 参考稿重构完成 |
| 2.2 | Tool Detail（14 段完整结构） | ✅ 基础完成 | Sprint 2（2026-07-20）：17 段清晰结构 + Quick Facts / TestStatus / FeatureTable / ToolFAQ 组件；Real Test 与多维评分待数据 |
| 2.3 | 排行榜页（Best AI XX） | ⚠️ 部分 | 有 [slug].astro 模板但缺 Filter/排序（Rating/Latest/Popular/Free/Paid） |
| 2.4 | 比较页（A vs B） | ⚠️ 部分 | 有 vs/[slug].astro，103 组已生成，未支持横向滚动表格 |
| 2.5 | Alternatives 页 | ✅ 已完成 | alternatives/[slug].astro 存在 |
| 2.6 | Blog / Article | ✅ 已完成 | 46+ 文章 + [slug].astro 模板 |
| 2.7 | Prompt Library | ⚠️ 部分 | 639 条数据 + [slug].astro，但缺一键复制/收藏/评分 |
| 2.8 | Workflow Library | ⚠️ 部分 | 只有 25 条，缺 Marketplace 付费能力 |
| 2.9 | Templates | ⚠️ 部分 | 只有 19 条 |
| 2.10 | Deep Dive（大工具） | ✅ 已完成 | ChatGPT/Claude/Cursor 等 9 篇 |
| 2.11 | Use Case 页 | ✅ 已完成 | 4 个（Designer/Developer/Marketer/Writer） |
| 2.12 | Solutions | ✅ 基础完成 | Sprint 3（2026-07-20）：18 条记录迁移到 toolIds/stackRoles/industryTags 模型；5 页目标场景（Architects/Engineers/Construction/Small Business/Students）10 FAQ 齐全 |
| 2.13 | 免费在线工具 | ⚠️ 部分 | 已有 11 个（Token 计算/OCR/PDF 转 MD/AI 检测/JSON/Markdown 等），缺 SEO 标题生成器、正则生成器、图片放大等 |
| 2.14 | 中文站 /zh/ | ⚠️ 部分 | 有基础镜像，未完整覆盖所有路由 |

## 三、SEO / AEO / GEO

| # | 项目 | 状态 | 说明 |
|---|---|---|---|
| 3.1 | Article Schema | ✅ 已完成 | ArticleSchema.astro |
| 3.2 | Breadcrumb Schema | ✅ 已完成 | BreadcrumbSchema.astro |
| 3.3 | FAQ Schema | ✅ 已完成 | FAQSchema.astro |
| 3.4 | Software / Review Schema | ✅ 已完成 | tool/[slug].astro 已内联 |
| 3.5 | Author Schema | ⚠️ 部分 | Review 中已含 author，但独立 Person 页缺 |
| 3.6 | hreflang（en/zh） | ✅ 已完成 | BaseLayout 已配置 |
| 3.7 | Sitemap 生成 | ✅ 已完成 | @astrojs/sitemap + gen-sitemap.mjs |
| 3.8 | TL;DR 组件（3 行） | ✅ 已完成 | TLDR.astro |
| 3.9 | Key Takeaways | ⚠️ 部分 | TLDR 兼用，未单独组件 |
| 3.10 | Verdict 组件 | ✅ 已完成 | Verdict.astro |
| 3.11 | Tested Version / Updated Date | ⚠️ 部分 | 只有 "Last updated: July 2026" 文字，无结构化字段 |
| 3.12 | 原创 Benchmark 数据 | ❌ 未完成 | tool/[slug].astro 中 realTestData 为空对象 |

## 四、流量策略（十五层）

| 层 | 项目 | 状态 | 说明 |
|---|---|---|---|
| 1 | 工具数据库 | ⚠️ 部分 | 299/5000 |
| 2 | 关键词覆盖 | ⚠️ 部分 | 已有 Best AI XX + vs + 免费 XX，但覆盖<30% |
| 3 | 每天更新 | ❌ 未完成 | 有 content-queue 目录但无自动抓取管道 |
| 4 | 比较页面 | ⚠️ 部分 | 103 组，热门组合未全 |
| 5 | 排行榜（Best AI XX） | ⚠️ 部分 | best/[slug] 存在，专题不全 |
| 6 | Prompt Library | ⚠️ 部分 | 639/10000 |
| 7 | 模板 | ⚠️ 部分 | 19 条，缺 Resume/Excel/PPT/合同/PRD 等 |
| 8 | 教程 | ⚠️ 部分 | 已有 how-to-* 文章 15+ 篇 |
| 9 | 工具导航（行业） | ⚠️ 部分 | 有 categories.json，缺行业分类（Architecture/Engineering/Manufacturing） |
| 10 | 用户 UGC（评分/评论） | ❌ 未完成 | 无登录、评分、评论体系 |
| 11 | 免费在线工具 | ⚠️ 部分 | 11 个，计划中还应扩展 |
| 12 | AI Agent 专区 | ⚠️ 部分 | best/ai-agents.astro 存在，但无独立 Agent Directory |
| 13 | Newsletter | ⚠️ 部分 | Newsletter.astro 组件存在，无 AI Weekly Intelligence 内容 |
| 14 | YouTube 视频 | ❌ 未完成 | VideoBlock 组件已建，无实际视频内容 |
| 15 | AEO/GEO 优化 | ⚠️ 部分 | TL;DR/FAQ/Table 已有，缺 Tested Version 等元字段 |

## 五、停留时间提升（十八项）

| # | 项目 | 状态 | 说明 |
|---|---|---|---|
| 5.1 | 首屏 5 秒决定停留 | ✅ 已完成 | 首页 Hero 已按数据故事化 |
| 5.2 | **AI Tool Finder** ⭐⭐⭐⭐⭐ | ✅ 已完成 | Sprint 1（2026-07-19）：确定性推荐算法接入，3 步选择 → 3 工具输出，URL/localStorage 持久化 |
| 5.3 | 工具评分系统（多维度） | ⚠️ 部分 | tool/[slug].astro 有单一 rating，无 Performance/Ease/Value/ROI 分维度 |
| 5.4 | 真人测试模块 | ❌ 未完成 | realTestData 对象为空 |
| 5.5 | 交互式比较（动态选工具） | ❌ 未完成 | vs 页面是静态生成，无实时比较器 |
| 5.6 | 页面内导航（In this guide） | ⚠️ 部分 | TOC.astro 组件存在 |
| 5.7 | 收藏系统 | ❌ 未完成 | 无用户系统 |
| 5.8 | **AI Stack Builder** ⭐⭐⭐⭐⭐ | ✅ 已完成 | Sprint 1（2026-07-19）：30 工具目录 + 评分算法 + 双语输出 + 成本/节省估算 + 分享链接 + 重置 |
| 5.9 | 工具关联推荐 | ⚠️ 部分 | RelatedArticles/RelatedPosts 组件已建，Tool Detail 有 Alternatives |
| 5.10 | 案例库（Industry → Use Case → Tools） | ❌ 未完成 | case-studies.astro 是空模板 |
| 5.11 | 视频/GIF 演示 | ❌ 未完成 | VideoBlock 组件存在，无内容 |
| 5.12 | **AI Tool Benchmark** ⭐⭐⭐⭐ | ⚠️ 部分 | 首页有静态 Benchmark 表格 + Chart.astro 组件，无独立 Benchmark 实验室 |
| 5.13 | 实时排行榜（Trending） | ❌ 未完成 | 首页有静态 Featured，无每日/每周 Trending 更新 |
| 5.14 | Newsletter 订阅 | ✅ 已完成 | Newsletter 组件 + 页面已建 |
| 5.15 | 社区元素（评分/评论） | ⚠️ 部分 | Comments.astro 组件存在但未启用 |
| 5.16 | 游戏化（AI Productivity Score） | ❌ 未完成 | 完全未开发 |
| 5.17 | Feedback 组件（Was this helpful?） | ⚠️ 部分 | Feedback.astro 存在 |
| 5.18 | Toast / 交互反馈 | ✅ 已完成 | Toast.astro 组件 |

## 六、战略升级（十五项）

| # | 项目 | 状态 | 说明 |
|---|---|---|---|
| 6.1 | 从"搜索"升级为"描述需求" | ❌ 未完成 | 需要 AI Consultant |
| 6.2 | Find My AI Stack（首页最大按钮） | ✅ 已完成 | Sprint 1（2026-07-19）：3 步（角色/目标/预算）→ 真实 3 工具推荐；深度个性化归 P1-6 Score™ |
| 6.3 | AI Tool Score™ 算法 | ❌ 未完成 | 只有静态 toolRatings 手工评分 |
| 6.4 | AI Agent 分类目录 | ❌ 未完成 | 只有 best/ai-agents 一篇 |
| 6.5 | 行业 AI 解决方案（Architecture/Engineering/Manufacturing） | ❌ 未完成 | solutions/ 缺行业垂直内容 |
| 6.6 | Workflow Marketplace（付费） | ❌ 未完成 | 无支付/账号体系 |
| 6.7 | 用户 UGC（My AI Stack 分享链接） | ❌ 未完成 | 无 |
| 6.8 | AI Tool 数据 API | ❌ 未完成 | 无 |
| 6.9 | 每日 AI Radar（首页 Trending） | ❌ 未完成 | 无 |
| 6.10 | AI Benchmark 实验室 | ❌ 未完成 | 静态数据 |
| 6.11 | My AI Library（收藏体系） | ❌ 未完成 | 无用户系统 |
| 6.12 | 评分社区（类 PH） | ❌ 未完成 | 无 |
| 6.13 | 商业模式 P1（Affiliate + Ads） | ✅ 已完成 | AdSense + Affiliate CTA 组件 |
| 6.14 | 商业模式 P2（Membership + Marketplace） | ❌ 未完成 | 需账号系统 |
| 6.15 | 商业模式 P3（企业服务） | ❌ 未完成 | 长期 |

## 七、SEO 五层内容矩阵

| # | 层级 | 项目 | 状态 | 说明 |
|---|---|---|---|---|
| 7.1 | L1 | 工具数据库页面模板（`/tools/{slug}`） | ⚠️ 部分 | 现路由是 `/tool/{slug}`（单数）非计划的 `/tools/`；模板已含 Overview/Pros/Cons/Alternatives；缺 Feature 表格 + Best For 章节 |
| 7.2 | L1 | H1 格式（`X Review 2026: Features, Pricing, Alternatives & Use Cases`） | ✅ 已完成 | Sprint 2：reviewed 走 Review 模式，catalogued 走 Overview 模式，`| AI Tool Hub` 单次追加 |
| 7.3 | L1 | 5000+ 工具 | ⚠️ 部分 | 299/5000 |
| 7.4 | L2 | 分类矩阵页（`/category`） | ❌ 未完成 | 现只有 `/best/{slug}`，缺独立 category 层 |
| 7.5 | L2 | AI Agents 分类专区 | ❌ 未完成 | 仅有单篇 best/ai-agents |
| 7.6 | L3 | 场景 Use Case 页（`/use-cases`） | ⚠️ 部分 | 仅有 4 篇 use-case-for-* |
| 7.7 | L3 | 行业场景（Architects/Engineers/Construction） | ✅ 已完成 | Sprint 3（2026-07-20）：5 页目标场景（Architects/Engineers/Construction/Small Business/Students）+ 15 个既有行业方案页数据升级 |
| 7.8 | L4 | 对比页 `/compare`（A vs B） | ⚠️ 部分 | 路由为 `/vs/{slug}`，103 组数据；未按计划 URL 结构 |
| 7.9 | L5 | 教程 `/tutorials` | ⚠️ 部分 | 现散在 blog how-to-*，未聚合为教程栏目 |
| 7.10 | ALL | 页面 Title 格式规范 | ❌ 未完成 | 未统一 `Best XX 2026 \| Top XX Compared` |
| 7.11 | ALL | Meta Description 150 字符标准 | ❌ 未完成 | 未审计 |
| 7.12 | 差异化 | `industry_tags` 字段 | ✅ 已完成 | Sprint 3（2026-07-20）：11 项分类 taxonomy + 43 款精选工具打标；全量 5000 工具打标归 P1 |
| 7.13 | 首批 | 50 个 SEO 页面上线 | ⚠️ 部分 | 10 工具页已有（ChatGPT/Claude/Gemini 等），5 对比页部分覆盖，5 场景页部分，4 趋势页 1 篇 |

## 八、SEO 自动化生产系统（Supabase + Agent Pipeline）

| # | 项目 | 状态 | 说明 |
|---|---|---|---|
| 8.1 | Supabase 后端数据库 | ❌ 未完成 | 现所有内容存 JSON 静态文件 |
| 8.2 | `ai_tools` 表（含 industry_tags） | ❌ 未完成 | 需迁移 tools.json |
| 8.3 | `tool_categories` / `features` / `pricing` / `reviews` / `research` 表 | ❌ 未完成 | 无数据库 |
| 8.4 | `seo_keywords` + `seo_clusters` | ❌ 未完成 | 无关键词管理 |
| 8.5 | `seo_pages` / `seo_outline` / `seo_articles` | ❌ 未完成 | 无 |
| 8.6 | `compare_pages` / `use_case_pages` | ❌ 未完成 | 无 |
| 8.7 | `faq` / `internal_links` / `assets` / `image_prompts` | ❌ 未完成 | 无 |
| 8.8 | `agent_tasks` / `publish_logs` / `crawl_logs` | ❌ 未完成 | 无 |
| 8.9 | n8n 编排层 | ❌ 未完成 | 无 |
| 8.10 | LangGraph AI 协作层 | ❌ 未完成 | 无 |
| 8.11 | Workflow 1：Keyword Discovery（Google Trends/Reddit/PH/HN） | ❌ 未完成 | content-queue 目录有雏形 trends-*.json |
| 8.12 | Workflow 2：Keyword Cluster | ❌ 未完成 | 无 |
| 8.13 | Workflow 3：Research Agent | ❌ 未完成 | 无 |
| 8.14 | Workflow 4：SEO Outline Agent | ❌ 未完成 | 无 |
| 8.15 | Workflow 5：SEO Writer Agent | ❌ 未完成 | 已有 draft-posts JSON 雏形 |
| 8.16 | Workflow 6：Comparison Agent（自动组合工具对） | ❌ 未完成 | matchups.json 手工维护 |
| 8.17 | Workflow 7：Use Case Agent（Best AI for Industry） | ❌ 未完成 | 无 |
| 8.18 | Workflow 8：Image Prompt Agent | ❌ 未完成 | 无 |
| 8.19 | Workflow 9：Internal Link Agent | ❌ 未完成 | 无 |
| 8.20 | Workflow 10：SEO Audit Agent（100 分制评分） | ❌ 未完成 | 无 |
| 8.21 | Workflow 11：Publisher Agent（ISR + Sitemap + Search Console Ping） | ⚠️ 部分 | 只有静态 sitemap，无自动 ping |
| 8.22 | Workflow 12：内容更新 Agent（>180 天刷新） | ❌ 未完成 | 无 |
| 8.23 | 每日运行时间表（00/01/03/05/06 时刻） | ❌ 未完成 | 无 Cron |

---

# 未完成项按优先级排序

## 🔴 P0 — 最高优先级（1–2 个月，立即启动）

| # | 任务 | 影响 | 依赖 |
|---|---|---|---|
| P0-1 | **AI Tool Finder** 后端算法接入（首页已有 UI） | 停留时间 + 转化 | tools.json 结构 |
| P0-2 | **AI Stack Builder**（首页最大按钮 + Step1-3 选择器 + 输出组合） | 核心差异化 | tools.json |
| P0-3 | **组件化重构现存页面**（消除 100+ 页面 inline style / hard-coded 颜色） | 视觉一致性 + 可扩展 | 组件库 |
| P0-4 | Tool Detail 补全（Quick Facts、Real Test、Pricing、Video） | SEO + 转化 | 数据补齐 |
| P0-5 | Real Test 模块（真人测试数据 + Before/After 截图） | 差异化 + AEO | 内容采集 |
| P0-6 | 工具评分系统升级（Performance/Ease/Value/ROI 多维度） | AEO + 停留 | 数据填充 |
| P0-7 | Lighthouse 全站达标（Performance ≥95、SEO 100） | 排名 | 性能优化 |
| P0-8 | 图片规范（WebP/AVIF + Lightbox + Lazy Load） | 性能 + 停留 | 图片管道 |
| P0-9 | Grid System 统一（Article 760/TOC 280/Sidebar 320） | 阅读体验 | 布局重构 |
| P0-10 | Typography 全站统一（H1 64/H2 42/正文 20） | 阅读体验 | 全局 CSS |
| **P0-11** | **首批 50 个 SEO 页面上线**（10 工具 + 5 vs + 5 场景 + 4 趋势 + 26 补齐） | 90 天 500 页面基础 | 内容运营 |
| **P0-12** | **Tool Detail H1 / Title / Meta 格式规范化**（`X Review 2026: Features, Pricing, Alternatives`） | 排名 | 模板改造 |
| **P0-13** | **tools.json 增加 `industry_tags` 字段**（Architecture / Engineering / Construction / BIM / Industrial） | 差异化 SEO | 数据升级 |
| **P0-14** | **URL 结构规范化决策**（`/tools/{slug}` vs `/tool/{slug}`；`/compare/A-vs-B` vs `/vs/{slug}`） | SEO | 路由决策 |
| **P0-15** | **场景页新增 5 篇**（Architects / Engineers / Construction / Small Business / Students） | 转化 + 差异化 | 内容 |

## 🟠 P1 — 次高优先级（3–6 个月）

| # | 任务 | 影响 | 依赖 |
|---|---|---|---|
| P1-1 | **工具数据库扩展 299 → 5000+** | 流量长尾 | 自动抓取管道 |
| P1-2 | **每天更新自动化**（Github/PH/HN/HuggingFace/X 抓取 + AI 生成） | 流量 + AEO | 后端服务 |
| P1-3 | **比较页面全覆盖**（热门 A vs B 组合自动生成） | 流量最大 | 数据 + 模板 |
| P1-4 | **Best AI XX 排行榜专题扩充**（Coding/Video/Music/Agents/OCR/Design/Chatbot/Image/Resume/Meeting） | 流量核心 | 内容 |
| P1-5 | Prompt Library 639 → 10000+ | 流量长尾 | 数据采集 |
| P1-6 | **AI Tool Score™ 评分算法**（30% User + 25% Capability + 20% Price + 15% Growth + 10% Trust） | 品牌 + AEO | 算法实现 |
| P1-7 | **交互式比较器**（用户动态选两个工具生成 Winner） | 停留时间 | 前端组件 |
| P1-8 | 案例库（Industry → Use Case → Tools） | 差异化 | 内容 |
| P1-9 | 实时 Trending 排行（每日/每周更新） | 复访率 | 数据源 |
| P1-10 | Newsletter 升级为 AI Weekly Intelligence（5 工具 + 3 Workflow + 1 Case + 1 Prompt） | 沉淀用户 | 内容运营 |
| P1-11 | 视频/GIF 内容（30/60/90 秒 + 关键操作 GIF） | 停留 + YouTube 引流 | 内容制作 |
| P1-12 | 用户账号系统 + 收藏/My AI Library | 复访 + UGC 基础 | 后端 |
| P1-13 | 页面 inline style / hard-coded 颜色全部消除 | 一致性 | 重构 |
| **P1-14** | **迁移到 Supabase 数据库**（ai_tools / categories / features / pricing / reviews / research） | 自动化基础 | 后端架构 |
| **P1-15** | **建立 seo_keywords + seo_clusters 关键词库** | 内容生产基础 | Supabase |
| **P1-16** | **90 天内容目标：500 工具 + 300 SEO 文章** | Google 识别为工具数据库 | 自动化 |
| **P1-17** | **独立 Category 层级页**（`/category/ai-writing` 等，与 `/best/` 区分） | 结构化 SEO | 模板 |
| **P1-18** | **`/tutorials` 目录聚合教程** | 长尾流量 | 结构 |
| **P1-19** | **Comparison 模板补全**（Overview / Feature / Pricing / Quality / Speed / Best For / Winner） | AEO 引用 | 模板 |

## 🟡 P2 — 差异化壁垒（6–12 个月）

| # | 任务 | 影响 | 依赖 |
|---|---|---|---|
| P2-1 | **AI Benchmark 实验室**（Coding/Image/Video 独立页 + 100 工具真实测试） | 权威性 | 测试基础设施 |
| P2-2 | **AI Agent Directory**（Research/Coding/Marketing/Business/Engineering Agent 分类） | 未来流量 | 数据 |
| P2-3 | **行业 AI 解决方案**（Architecture/Engineering/Manufacturing Stack） | 差异化护城河 | 行业内容 |
| P2-4 | **Workflow Marketplace**（付费工作流上架） | 商业化 | 支付系统 |
| P2-5 | 免费在线工具扩展（图片放大、背景去除、SEO 标题、正则、Prompt 优化器等） | 外链 + 流量 | 前端工具 |
| P2-6 | UGC（用户上传 Prompt/Workflow/评分/评论） | 内容规模 | 审核系统 |
| P2-7 | AI Radar（每日 Trending + New Launch + Price Change + Funding） | 复访 | 数据抓取 |
| P2-8 | 游戏化（AI Productivity Score 分享） | 传播 | 前端交互 |
| P2-9 | 中文站 /zh/ 全路由覆盖 | 中文市场 | 翻译 |
| P2-10 | Author Schema + 独立作者页 | E-E-A-T | 内容 |
| P2-11 | 页面性能持续优化到 Lighthouse ≥95 全站 | 排名 | 工程 |
| **P2-12** | **Agent Pipeline W1-W6**（Keyword Discovery → Cluster → Research → Outline → Writer → Comparison） | 每天自动 20 页 | n8n + LangGraph |
| **P2-13** | **Agent Pipeline W7-W9**（Use Case Agent / Image Prompt / Internal Link） | 内容完整性 | Pipeline |
| **P2-14** | **SEO Audit Agent（100 分制评分）+ 自动重写循环** | 质量门槛 | Pipeline |
| **P2-15** | **Publisher Agent**（Next.js ISR + Sitemap + Search Console Ping） | 发布自动化 | 集成 |
| **P2-16** | **Update Agent**（>180 天旧内容自动刷新） | Google Fresh Content | Pipeline |
| **P2-17** | **image_prompts + assets 表 + Flux/Imagen 图片生成流水线** | 图片供给 | 图片 API |
| **P2-18** | **每日运行时间表落地**（00 关键词 / 01 研究 / 03 写作 / 05 评分 / 06 发布） | 稳定产出 | Cron |

## 🟢 P3 — 长期护城河（12+ 个月）

| # | 任务 | 影响 | 依赖 |
|---|---|---|---|
| P3-1 | AI Tool 数据 API（$49/月给开发者） | 商业化 | API 设计 |
| P3-2 | Premium Membership（付费会员） | 商业化 | 账号 + 支付 |
| P3-3 | AI Consulting / AI Transformation 企业服务 | 高客单价 | 团队能力 |
| P3-4 | Custom Agent 定制 | 企业服务 | 交付能力 |
| P3-5 | YouTube / TikTok / 小红书视频矩阵 | 引流 | 视频运营 |
| P3-6 | 评分社区（类 Product Hunt 每日榜） | 社区 | 运营 |
| P3-7 | 用户 My AI Stack 公开分享页（`u/{name}` 百万 UGC 页面） | 长尾 SEO | 用户增长 |
| P3-8 | 移动端 App / PWA | 用户资产 | 全栈 |
| **P3-9** | **n8n + LangGraph 混合架构完整落地** | 规模化 | 全栈能力 |
| **P3-10** | **crawl_logs / publish_logs 完整数据观察** | 运营洞察 | 监控 |

---

## 关键结论

**已完成核心（约 25%）**：Design Token、亮暗主题、Sitemap、基础 Schema、组件库骨架（40+ 组件）、299 工具、639 Prompt、46+ 博客、11 个在线小工具、首页参考稿重构、Newsletter、AdSense。

**未完成的 Top 5 阻塞项**：
1. AI Stack Builder（战略核心，直接决定"AI 决策平台"定位）
2. 工具数据库扩展到 5000（流量基础）
3. Real Test / Benchmark 数据（AEO 引用 + 差异化）
4. 每天自动更新管道（Github/PH/HN 抓取）
5. 组件化重构消除全站 inline style（可扩展性基础）

**关键 SEO 阻塞项（新增）**：
- Supabase 数据库迁移（自动化生产的地基）
- Agent Pipeline（Keyword → Research → Writer → Audit → Publisher）
- 首批 50 SEO 页面 + 90 天 500 工具 + 300 文章目标
- `industry_tags` 差异化字段 + 行业场景页（Architects / Engineers / Construction）
- URL 结构规范化决策（`/tools/` vs `/tool/`；`/compare/` vs `/vs/`）

**建议下一步**：先做 P0-2（AI Stack Builder 完整实现）+ P0-3（组件化重构）+ P0-4/5（Tool Detail 补全 Real Test），这三件事解锁后续 5000 工具批量生成的可复用模板。之后立即开始 P1-14（Supabase 迁移）+ P2-12（Agent Pipeline W1-W6），进入内容工厂阶段。

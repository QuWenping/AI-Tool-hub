---
title: AI Tool Hub 全球化开发任务计划（完整规划）
tags:
  - ai-tool-hub
  - roadmap
  - design-system
  - seo
updated: 2026-07-19
maintainers:
  - QuQu
status: reference
related:
  - "[[AI-Tool-Hub-任务计划]]"
  - "[[AI-Tool-Hub-现状对比]]"
---

# AI Tool Hub 全球化开发任务计划

> **文档说明**：本文件是完整规划参考稿，用于查询详细内容；日常任务勾选请到 [[AI-Tool-Hub-任务计划]]，现状盘点见 [[AI-Tool-Hub-现状对比]]。

**文档来源：** `目标不是做一个漂亮的网站.txt`、`网站方向.txt`、`网站内容.txt`、`增加用户停留时间方案.txt`、`真正有机会做到全球头部的网站.txt`、`针对你的 AI Tool Hub 全球 AI 工具网站，SEO 不应该.txt`

## 一、产品愿景与战略定位

### 1.1 核心目标
- **不做漂亮博客，做全球 AI Tools 平台**：对标 Futurepedia、There's An AI For That、Toolify，但体验更好
- **三阶段升级路径**：
  1. AI 工具目录（Directory）
  2. AI 决策平台（AI Decision Engine）
  3. AI 生产力操作系统（AI Productivity OS）
- **对标产品**：Vercel、Linear、Anthropic、Stripe、Cursor、Perplexity、Futurepedia、Product Hunt、Notion

### 1.2 六大核心板块
1. AI 工具数据库（5000+ 工具）
2. 真实评测与横向对比
3. Prompt Library（可直接复制使用）
4. Workflow Library（n8n、Dify、ComfyUI、MCP 等）
5. 免费在线 AI 小工具
6. 行业解决方案（建筑、工业、教育、营销等）

### 1.3 五个设计原则
1. **Premium（高级感）** — 专业、可信、现代；避免博客风格、WordPress 模板感、内容农场
2. **Readability（极致阅读体验）** — 支持连续阅读 15 分钟不累
3. **Trust（可信）** — 作者、更新时间、测试时间、数据来源、真实截图
4. **Conversion（高转化）** — 每屏 CTA + Affiliate + 相关推荐，但不骚扰
5. **AI Friendly** — 便于 ChatGPT / Gemini / Claude / Perplexity 理解

### 1.4 五个核心目标
每个组件必须同时满足：视觉一致性、SEO、AI 搜索优化（AEO/GEO）、Affiliate 转化、移动端体验

---

## 二、Design System 与基础设施

### 2.1 Design Token（颜色、字体、间距、阴影、圆角）
- **颜色**：背景 `#FFFFFF`、正文 `#111827`、次级文字 `#6B7280`、Border `#E5E7EB`、Brand 统一
- **字体**：英文 Inter、中文 Noto Sans SC、Fallback system-ui
- **字号**：
  - H1 Desktop 64px / Mobile 38px，字重 800，行高 1.1
  - H2 42px / 700，H3 32px，H4 26px
  - 正文 20px，行高 1.85（禁止 16px）

### 2.2 Grid System
- 最大内容宽度：1320px
- 正文：760px
- 目录（TOC）：280px
- 侧边栏：320px
- 布局：Sidebar | Article | TOC；移动端单列

### 2.3 响应式断点
- Desktop ≥1280px
- Laptop 1024–1279px
- Tablet 768–1023px
- Mobile <768px
- 移动端要求：H1 38–40px、正文 18px、CTA 全宽、TOC 折叠为抽屉、对比表横向滑动

### 2.4 动效
- Hover 150ms、页面 250ms
- 禁止复杂动画、闪烁

### 2.5 图片规范
- 每篇至少 10 张，格式 WebP / AVIF、Lazy Load
- 类型：Hero、Dashboard、Workflow、Result、Mobile、Pricing、Comparison、Screenshot、GIF、Diagram
- 图片不超过 900px 宽
- Hero Image：16:9、1200px 宽、圆角 20px、轻阴影、支持 Lightbox

### 2.6 组件库（禁止页面内写死样式）
**基础组件**：
- Button（Primary / Secondary / Ghost）
- Badge、Tag、Chip、Tooltip、Accordion、Tabs、Modal、Breadcrumb、Pagination

**内容组件**：
- Hero、Author Card、Tool Card、Feature Card、Pricing Card
- Comparison Table、Screenshot Gallery、Video Block
- FAQ Block、Pros & Cons、TL;DR、Key Takeaways
- Related Articles、Newsletter CTA、Affiliate CTA、Advertisement Slot

### 2.7 页面性能（Lighthouse 目标）
| 指标 | 目标 |
|---|---|
| Performance | ≥95 |
| Accessibility | ≥95 |
| Best Practices | 100 |
| SEO | 100 |

**技术要求**：图片 WebP/AVIF、Lazy Load、Code Splitting、SSR、预加载关键字体、关键 CSS 内联、CDN 缓存

---

## 三、页面与内容模板

### 3.1 通用文章模板（Editorial System）
1. Hero（标题、摘要、作者、日期、CTA）
2. TL;DR（3–5 条要点）
3. 快速结论（Who should use it?）
4. 产品概览
5. 实测结果（截图 + 数据）
6. 功能拆解
7. 优缺点
8. 价格分析
9. 与竞品对比
10. 替代方案
11. 常见问题
12. 最终评分（Verdict）
13. 相关文章
14. Newsletter / Affiliate CTA

### 3.2 Tool Detail 页面顺序
1. Hero
2. Quick Facts
3. Overview
4. Screenshots
5. Real Test
6. Features
7. Pricing
8. Pros
9. Cons
10. Comparison
11. Alternatives
12. FAQ
13. Related

### 3.3 高停留时间页面结构
Hero → 快速结论卡片 → 评分 → 视频/GIF → 目录 → 真实测试 → 工具列表 → 交互比较 → 案例 → FAQ → 相关推荐 → AI Stack Builder → Newsletter

### 3.4 排行榜页面
- 顶部 Hero → Filter → Grid
- 支持排序：Rating / Latest / Popular / Free / Paid

### 3.5 各组件规范
- **Hero**：高度 720px，Top 96px、Bottom 72px 留白
- **Metadata**：`👤 Author • 📅 Date • ⏱ Reading Time • Updated`（禁止换行）
- **Tool Card**：360×220，包含 Logo/Name/Category/Rating/Pricing/Tags/CTA、Hover 动效
- **Comparison**：Card + Table、横向滚动
- **Pros & Cons**：`✅ Pros / ❌ Cons`，每项一句话
- **CTA**：52px 高、240px 宽、品牌色、Hover 轻微放大
- **Affiliate Button**：`Try Free / Visit Website / Get Started` + Affiliate Link 标注
- **FAQ**：每篇至少 10 个、Accordion、支持 FAQ Schema
- **TOC**：桌面右侧固定 280px、Scroll Spy、当前高亮、可折叠

### 3.6 广告位放置
建议位置：Hero 下方（Banner）、第一部分正文后、Comparison 后、文末相关推荐前
**避免**：段落中间插广告

### 3.7 内容比例
- 图文 40% + 截图 30% + 对比表格 15% + 视频 10% + FAQ 5%
- 每篇 8–15 张图，覆盖：Logo、首页、工作界面、核心功能、输出效果、手机端、价格页面、官方示例
- GIF 覆盖关键操作流程（如上传 PDF → AI 读取 → 生成报告）
- 视频 30/60/90 秒短视频，来源：官方 Youtube、Demo、自录（OBS、Screen Studio、Cap）

---

## 四、SEO / AEO / GEO 优化

### 4.1 SEO 每篇必备
H1、H2、TL;DR、Summary、FAQ、Table、Image Alt、Breadcrumb、Review Schema、Software Schema、Article Schema、Author Schema

### 4.2 AEO / GEO（AI 搜索优化）
每篇必备：
- 3 行 TL;DR
- Key Takeaways
- Comparison Table
- FAQs
- Structured Data
- Updated Date、Tested Version、Verdict

**AEO 内容要点**：
- 每篇回答一个明确问题，不堆砌关键词
- 增加 FAQ、对比表、优缺点总结
- 发布原创测试数据、Benchmark、真实案例
- 建立作者信息、更新时间、引用来源
- 让内容易于 AI 理解和引用

### 4.3 AI 引用友好的数据格式
真实数据格式示例：
```
Prompt: ...
耗时: 8秒
Token: 1200
费用: $0.03
准确率: 94%
截图: ...
```

---

## 五、流量策略（十五层）

### 5.1 流量来源多元化
Google SEO、ChatGPT 引用、社交媒体、Newsletter、YouTube/TikTok

### 5.2 第一层：AI 工具数据库（5000+ 工具）
每个工具页面包含：介绍、价格、模型、支持平台、支持 API、是否免费、中文支持、更新时间、优缺点、适合谁、替代品、同类产品、真实评分、更新历史

### 5.3 第二层：关键词覆盖（专题）
- ChatGPT vs Claude、Cursor vs Windsurf、Midjourney 替代
- 免费 AI PPT / 视频 / Logo / 去背景 / OCR
- AI Agent / Coding / Voice / Music / Avatar / PDF
- 每个都是专题（如 Best AI Coding Tools → Cursor、Windsurf、Claude Code、Cline、Roo Code、Continue、Aider、Codeium）

### 5.4 第三层：每天更新
自动抓取源：Github、Product Hunt、HuggingFace、X (Twitter)、官方 Blog、Release Notes → AI 自动生成（一天 100 篇）

### 5.5 第四层：比较页面（流量最大）
- 格式：A vs B
- 案例：Cursor vs Windsurf、Claude vs GPT-5、Bolt vs Lovable、Gemini vs ChatGPT、Notion AI vs Coda AI
- 1000 工具理论有 1000² ≈ 100 万比较页面（生成热门组合）

### 5.6 第五层：排行榜（Best AI XX）
Top AI Tools、Best AI Coding / Video / Music / Agents / OCR / Design / Chatbot / Image / Resume / Meeting

### 5.7 第六层：Prompt 库（10000+）
ChatGPT / Claude / Midjourney / Flux / Cursor / Gemini Prompt

### 5.8 第七层：模板
Resume、Excel、PPT、合同、报告、PRD、需求文档、UI Prompt、ComfyUI Workflow

### 5.9 第八层：教程
How to use Cursor / Claude、How to install Ollama、How to deploy DeepSeek、ComfyUI / n8n / Dify 教程

### 5.10 第九层：工具导航（行业）
Coding、Video、Image、Music、Marketing、Agent、Education、Architecture、Engineering

### 5.11 第十层：用户 UGC
评分、评论、上传 Prompt、上传案例、上传 Workflow、分享经验

### 5.12 第十一层：免费在线工具（最重要）
Token 计算器、Prompt 优化器、图片放大、背景去除、OCR、PDF 转 Markdown、AI 检测、SEO 标题生成、正则生成器、JSON 格式化、Markdown 编辑器

### 5.13 第十二层：AI Agent 专区（未来流量）
AI Agent、MCP、A2A、Browser Use、n8n、Dify、Flowise、CrewAI、LangGraph

### 5.14 第十三层：Newsletter
- AI Daily / 5 分钟 AI 新闻 / 今日 AI 工具 / 今日 AI Prompt
- 升级版：AI Weekly Intelligence（5 个新工具 + 3 个 Workflow + 1 个 Business Case + 1 个 Prompt）

### 5.15 第十四层：YouTube
Cursor Review / Claude Tutorial / Bolt Tutorial，文章 + 视频双收录

### 5.16 第十五层：AI 搜索优化（SEO + AEO + GEO）
同时被 Google / ChatGPT / Perplexity / Gemini / Claude 引用

---

## 六、用户停留时间提升方案（十八项）

### 6.1 首屏 5 秒决定停留
5 秒内回答：这是什么？对我有什么价值？为什么相信你？

**改造示例**：
```
10 Best AI Tools for Small Business in 2026
Tested on a real 8-person team.
22 hours/week saved. $385/month total cost.
[View Ranking] [Compare Tools]
```

### 6.2 AI Tool Finder（强烈推荐 ⭐⭐⭐⭐⭐）
用户选择：Generate Images / Write Content / Code / Marketing / Business Automation / Research
输出：Your Best AI Stack（ChatGPT + Claude + Notion AI + Zapier AI）

### 6.3 工具评分系统（多维度）
```
AI Tool Score
★★★★★ 9.4
Performance 9.6 / Ease of Use 9.5 / Value 9.2 / Business ROI 9.7
```

### 6.4 真人测试（最大差异化）
展示：Before / After 数据、原始结果截图、AI 输出截图、时间统计

### 6.5 交互式比较
用户动态选择两个工具 → 生成 Winner 结论（Writing / Coding / Reasoning / Price）

### 6.6 页面内导航
文章顶部加入 In this guide 索引，用户点击跳转

### 6.7 收藏系统
`❤️ Save this tool` → My AI Stack（账号资产）

### 6.8 AI Stack Builder（第二优先级 ⭐⭐⭐⭐⭐）
输入：身份、团队规模、预算、需求 → 生成推荐 AI 组合
可保存、分享、复制

### 6.9 工具之间关联（类似 Amazon）
"People who viewed Cursor also viewed: Windsurf、Claude Code、GitHub Copilot、Replit"

### 6.10 案例库（AI Use Case Library）
Industry → Use Case → Tools 组合，让用户找解决方案而非工具

### 6.11 视频 / GIF 演示
展示"过程"而非"介绍"

### 6.12 AI Tool Benchmark（第三优先级 ⭐⭐⭐⭐）
真实测试：速度、价格、效果
示例：Image Generation Benchmark（Midjourney 8s / Flux 12s / DALL-E 15s）

### 6.13 实时排行榜
🔥 Trending AI Tools（Claude / Cursor / Lovable / Perplexity / Runway）

### 6.14 Newsletter 订阅
"Get the AI tools that actually matter. No hype. 5 minutes/week."

### 6.15 社区元素
Community Rating（⭐ 4.8, 1250 users tested）、Comments

### 6.16 游戏化
完成 Find your AI Stack → 完成度 → AI Productivity Score

### 6.17 三个最值得开发的功能
1. **AI Tool Finder**（增加停留、增加转化、形成数据资产）
2. **AI Stack Builder**（输入身份 + 团队 + 预算 + 需求 → 生成组合）
3. **AI Tool Benchmark**（速度 / 价格 / 效果）

### 6.18 最终目标
不让用户觉得"我来看了一篇文章"，而是"我在这个网站找到了我的 AI 工作方案"

---

## 七、战略升级方向（十五项）

### 7.1 从"搜索工具"升级为"描述需求"
用户输入公司/团队/预算/需求 → AI 生成完整工作团队推荐

### 7.2 AI Consultant / Find My AI Stack（首页最大按钮）
- Step 1 选择身份：Founder / Marketing / Designer / Developer / Student / Engineer / Enterprise
- Step 2 选择任务：Save time / Automate / Create content / Write code / Analyze data
- Step 3 预算：Free / <$50 / $50-200 / Enterprise
- 输出：Your AI Team（含角色、时间节省预估）

### 7.3 AI Tool Score™（评分算法）
- 30% User Rating + 25% Capability + 20% Price Value + 15% Growth + 10% Trust
- 输出：Score 94/100，Rank #1 Coding AI

### 7.4 AI Agent 分类（未来最大流量入口）
- Research Agent（Perplexity、Genspark）
- Coding Agent（Cursor、Claude Code、Devin）
- Marketing Agent（Jasper、Copy.ai）
- Business Agent（Zapier AI、Make AI）
- **Engineering Agent（差异化优势）**：CAD Agent、BIM Agent、Documentation Agent、Project Management Agent

### 7.5 行业 AI 解决方案（最大差异化）
- **Architecture AI Stack**：Concept Design（Midjourney）、Rendering（Stable Diffusion）、BIM（Autodesk AI）、Documentation（ChatGPT）、Project（Notion AI）
- **Engineering AI Stack**：Drawing Review、Tender Document、Cost Estimation、Project Management、Knowledge Base
- **Manufacturing AI Stack**：Digital Twin、SCADA、Maintenance、Quality Control

### 7.6 AI Workflow Marketplace（比工具目录更赚钱）
示例：Construction Bid AI Workflow $99（上传合同 PDF → AI 读取 → 生成项目计划 / 成本分析 / 风险清单）

### 7.7 用户 UGC（My AI Stack）
用户分享链接（如 `ai-tool-hub.com/u/john-ai-stack`）→ 百万用户页面

### 7.8 AI Tool 数据 API（商业化方向）
`GET /tools`、`GET /categories`、`GET /reviews`，售价 $49/月给 SaaS / 博客 / AI 应用开发者

### 7.9 每日 AI Radar（首页）
🔥 Trending / New Launch / Price Change / Funding News / Model Update（类似 Product Hunt + AI）

### 7.10 AI Benchmark 实验室
- AI Coding Benchmark：100 工具、任务（Create React App / Fix Bug / Generate API / Refactor）、评分（Accuracy / Speed / Cost）
- AI Image Benchmark：Architecture Rendering / Product Design / Character（结合 ComfyUI 背景）

### 7.11 用户收藏体系（My AI Library）
收藏工具 / Prompt / Workflow / 文章

### 7.12 评分社区（类 Product Hunt）
用户评价：Ease / Value / Performance / Recommend

### 7.13 商业模式三阶段
- **第一阶段**：流量（SEO + AI Search + Social）→ 收入（Affiliate + Ads）
- **第二阶段**：产品（Premium Membership + AI Stack Builder + Workflow Library）
- **第三阶段**：企业（AI Consulting + AI Transformation + Custom Agent）

### 7.14 护城河（四个）
1. **数据**：10000 工具评分、真实测试数据、用户评价
2. **工作流**：AI 解决方案库
3. **行业知识**：建筑、工业、设计、制造
4. **用户资产**：收藏、Stack、Workflow

### 7.15 最终产品形态
```
AI TOOL HUB
    │
AI ENGINE
    │
    ├── Tool DB
    ├── Workflow DB
    └── Knowledge DB
    │
AI Consultant
    │
Personal AI Stack
    │
Marketplace
```

---

## 八、开发实施优先级建议

### P0（最高优先级，1–2 个月）
1. Design System / Token / 组件库落地
2. AI Tool Finder（多步选择器）
3. AI Stack Builder（身份 + 预算 + 需求 → 推荐组合）
4. 工具数据库结构化（5000 工具字段模型）
5. Tool Detail 页面模板（Hero → Quick Facts → Screenshots → Real Test → Comparison → FAQ）
6. SEO + AEO Schema（Review / Software / Article / Author / FAQ / Breadcrumb）
7. Lighthouse 达标（Performance ≥95、SEO 100）

### P1（次高优先级，3–6 个月）
1. 比较页面（A vs B 自动生成）
2. Best AI XX 排行榜模板
3. 真人测试模块（Before / After + 截图 + 数据）
4. Prompt Library（10000+）
5. AI Tool Score™ 评分算法
6. Newsletter 系统（AI Weekly Intelligence）
7. 每日自动内容抓取管道（Github / Product Hunt / HuggingFace / X / Blog / Release Notes）

### P2（差异化壁垒，6–12 个月）
1. AI Benchmark 实验室（Coding / Image / Video）
2. AI Agent 专区
3. 行业 AI 解决方案（Architecture / Engineering / Manufacturing）
4. Workflow Marketplace（付费工作流）
5. 免费在线小工具（Token 计算器、OCR、PDF 转 Markdown 等）
6. UGC / 收藏 / My AI Stack

### P3（长期护城河，12+ 个月）
1. AI Tool 数据 API
2. Premium Membership
3. AI Consulting / AI Transformation 企业服务
4. Custom Agent 定制服务
5. YouTube / TikTok 视频内容矩阵
6. 评分社区（类 Product Hunt）

---

## 九、Codex 执行要求

- **不要**在现有页面上做局部 CSS 调整
- **必须**基于统一 Design System 重构整个网站
- **必须**通过组件组合生成页面，不允许页面内写死样式
- **每个组件**必须同时满足：视觉一致性、SEO、AEO/GEO、Affiliate 转化、移动端体验
- 未来新增工具 / 文章 / 专题页面，只需填充数据即可生成，不需重新设计
- 目标：可扩展的全球 AI 工具平台设计系统，支撑数千工具页面 + 数万篇内容 + 统一品牌 + 长期增长

---

## 十、SEO 内容矩阵与自动化生产系统

### 10.1 SEO 总体架构（内容飞轮）
```
AI Tool Hub
│
├── AI Tools（工具库）
├── Categories（分类）
├── Use Cases（使用场景）
├── Comparisons（工具对比）
├── Reviews（深度评测）
├── Tutorials（教程）
└── Blog（趋势内容）
```
**SEO 飞轮**：搜索用户 → 工具页面 → 比较文章 → 点击工具 → 收藏/注册 → 回访

### 10.2 五层 SEO 结构（按流量价值）

#### 第一层：AI 工具数据库（护城河 & 核心流量）
- **URL 结构**：`/tools/chatgpt`、`/tools/midjourney`、`/tools/runway`、`/tools/claude`、`/tools/perplexity`
- **H1 格式**：`ChatGPT Review 2026: Features, Pricing, Alternatives & Use Cases`
- **页面模板**：
  1. 工具简介（100 字）— 是什么、谁开发、用途
  2. 核心功能表格（Feature + 描述 + ★★★★★ 评分）
  3. Pricing（Free / Plus / Team / Enterprise）
  4. Best For（Students / Developers / Designers / Marketers / Business）
  5. Alternatives（互相传递权重的关键内链）

#### 第二层：分类 SEO 矩阵（`/category`）
重点分类及目标关键词：
- **AI Writing Tools**：`best AI writing tools`、`AI writing assistant`、`AI copywriting tools`
- **AI Image Generator**：`best AI image generator`、`AI art generator`、`text to image AI`
- **AI Video Generator**：`AI video generator`、`text to video AI`、`AI animation tools`
- **AI Coding Tools**：`AI coding assistant`、`AI programming tools`、`Copilot alternatives`
- **AI Agents**（未来最大流量）：`AI agent tools`、`autonomous AI agents`、`AI automation tools`

#### 第三层：场景 SEO（`/use-cases`，转化最高）
不要写"ChatGPT 是什么"，要写"用 AI 解决什么问题"。
关键场景：
- **设计**：Best AI Tools for Architects 2026 → `AI architecture tools`、`AI rendering tools`、`AI BIM assistant`
- **工程（差异化优势）**：Best AI Tools for Construction Industry → AI CAD / AI BIM / AI Project Management / AI Document Review
- **企业**：Best AI Tools for Small Business
- **学生**：Best AI Tools for Students

#### 第四层：对比 SEO（`/compare`，商业价值最高）
Google 大量搜索 "A vs B"：
- ChatGPT vs Claude、Claude vs ChatGPT
- Midjourney vs DALL-E
- Cursor vs GitHub Copilot
- Runway vs Pika

**模板结构**：Tool A vs Tool B → Features / Pricing / Quality / Speed / Best for / Winner

#### 第五层：教程 SEO（`/tutorials`，长尾流量）
- ChatGPT 教程：How to use ChatGPT for coding / How to create images with ChatGPT / How to automate tasks
- Midjourney 教程：Midjourney prompt guide / How to create AI art

### 10.3 90 天内容计划

**第 1 个月（基础库）— 100 个工具页面**
| 类别 | 数量 |
|---|---|
| AI Chat | 15 |
| Image | 20 |
| Video | 15 |
| Coding | 15 |
| Writing | 15 |
| Business | 20 |

**第 2 个月（SEO 文章）— 100 篇**
- 40% 对比、30% 场景、20% 教程、10% 新闻

**第 3 个月（规模化）**
- 工具：500+
- 文章：300+

### 10.4 第一批建议上线的 50 个 SEO 页面

**工具页（10 篇）**：ChatGPT、Claude、Gemini、Perplexity、Midjourney、Runway、Cursor、GitHub Copilot、Canva AI、Leonardo AI

**对比页（5 篇）**：ChatGPT vs Claude、Claude vs Gemini、Midjourney vs DALL-E、Cursor vs Copilot、Runway vs Pika

**场景页（5 篇）**：Best AI Tools for Designers / Architects / Engineers / Students / Business

**趋势页（4 篇）**：Best AI Agents 2026、Best AI Automation Tools、Best Free AI Tools、Best Open Source AI Tools

### 10.5 页面 SEO 标准

**Title 格式**：`Best AI Writing Tools 2026 | Top AI Writers Compared`
**Meta Description**：150 字符
**Schema**：SoftwareApplication + Review + FAQ + Breadcrumb
**图片**：每篇至少 3 张（工具截图 / 流程图 / 对比图）

### 10.6 差异化方向：AI Tool Hub for Professionals

避免做普通 AI 工具导航站，聚焦：
```
AI Tools + 行业应用 + Agent 工作流
```
**目标用户**：Architects、Engineers、Designers、Developers、Businesses、Creators

**建议数据库字段增加 `industry_tags`**：
```json
["Architecture", "Engineering", "Construction", "BIM", "Industrial Design"]
```

### 10.7 90 天流量目标
**500 工具页 + 300 SEO 文章**，让 Google 识别为 AI 工具领域数据库，而非普通博客。

---

## 十一、SEO 自动化生产系统（Supabase + Agent Pipeline）

### 11.1 目标
输入一个 AI 工具名称 → 自动研究 → 生成 SEO 页面 → 生成图片 → 审核 → 发布 → 持续更新

### 11.2 技术架构
```
Frontend
├── Next.js 15
├── Tailwind CSS
├── shadcn/ui

Backend
├── Supabase (PostgreSQL + Storage + Auth)

AI Layer
├── OpenAI API
├── Claude API
├── Gemini API
├── Perplexity API

Automation
├── n8n
├── LangGraph
├── CrewAI

Deployment
└── Vercel
```

### 11.3 Supabase 数据库表结构

**核心表**：
- `ai_tools` — 工具主表（name / slug / logo_url / website_url / developer / description / category_id / launch_date / country / status / industry_tags / created_at）
- `tool_categories` — 分类（AI Writing / Image / Video / Coding / Agent / Marketing / Design）
- `tool_features` — 功能（tool_id / feature_name / description / rating）
- `tool_pricing` — 价格（plan_name / price / billing_cycle / features / is_free）
- `tool_reviews` — 评测
- `tool_research` — 研究采集数据

**SEO 表**：
- `seo_pages`（page_type: tool/category/compare/use_case/article）
- `seo_keywords`（keyword / search_volume / difficulty / intent / cluster / priority / status / source）
- `seo_clusters`（cluster_name / keywords[] / primary_keyword / secondary_keywords）
- `seo_outline`（title / sections）— JSON 结构
- `seo_articles`（title / outline / content / author_agent / word_count / seo_score / quality_score / publish_status）— 内容存 JSON（h1 / intro / sections / faq）
- `compare_pages`（tool_a / tool_b / winner / comparison_json）
- `use_case_pages`
- `faq`（page_id / question / answer / schema_enabled）
- `internal_links`
- `assets`（type / url / prompt / model / related_page）
- `image_prompts`
- `agent_tasks`（task_type / input / output / agent_name / status）
- `publish_logs`
- `crawl_logs`

**ER 关系**：
```
categories → ai_tools
ai_tools → pricing / features / reviews
seo_pages → keywords / faq / assets
agent_tasks
```

### 11.4 Agent Pipeline（12 个自动化 Workflow）

```
Keyword Agent → Research Agent → Tool Analysis → SEO Outline
→ SEO Writer → Fact Check → Image Agent → SEO Score
→ Publisher → Update Agent
```

**Workflow 1：关键词发现（Keyword Discovery）**
- 每天凌晨 Cron 触发
- 数据源：Google Trends / Reddit / Product Hunt / Hacker News / OpenAI Release Notes / AI News
- LLM 总结热点 → 去重 → 写入 `seo_keywords`

**Workflow 2：关键词聚类（Keyword Cluster）**
- 将相似关键词（如 `chatgpt alternative`、`best chatgpt alternative`、`chatgpt competitors`）合并为 Cluster
- 所有文章围绕 Cluster 生产

**Workflow 3：Research Agent**
- 输入工具名 → 抓取官网、Github、Documentation、Pricing、Features、Release Notes、Reviews、Reddit
- 输出结构化 JSON（features / pricing / pros / cons）→ 写入 `tool_research`

**Workflow 4：SEO Outline Agent**
- 输入关键词 → 生成 H1 / Introduction / Top 10 / Comparison Table / Pros / Cons / FAQ / Summary
- 写入 `seo_outline`

**Workflow 5：SEO Writer Agent**
- 输入 Outline + Research → 输出完整 Markdown + Meta Title / Description / OG Description / Excerpt
- Markdown + JSON 双格式存储

**Workflow 6：Comparison Agent**
- 自动组合 ChatGPT × Claude × Gemini × Perplexity → 生成 vs 页面
- 结构：Overview / Feature Comparison / Pricing / Performance / Winner

**Workflow 7：Use Case Agent**
- 输入行业 → 生成 Best AI Tools for {Industry}
- 输出：Top10 / Workflow / Pros / FAQ / CTA
- 目标行业：Lawyers / Students / Architects / Designers / Engineers / Construction

**Workflow 8：Image Prompt Agent**
- 不直接生成图片，生成 Prompt（Hero / Feature / Workflow Diagram / Comparison）
- 存 `image_prompts`，后续用 Flux / Imagen / GPT Image 统一生成

**Workflow 9：Internal Link Agent**
- 自动计算 Related Tools / Related Articles / Alternatives / Categories
- 形成 SEO 蜘蛛网

**Workflow 10：SEO Audit Agent**
- 检查项：Title Length / Meta / Keyword Density / Heading / Images / Alt / Schema / Links / FAQ / Readability
- **评分规则（100 分制）**：Title 10 + Keyword 20 + Content 20 + Internal Links 20 + FAQ 10 + Images 10 + Schema 10
- Score < 85 → 进入 Rewrite Agent；≥ 85 → 进入 Publisher

**Workflow 11：Publisher Agent**
- Draft → Publish → Next.js ISR → Sitemap → RSS → Search Console Ping
- 状态机：draft / published / archived

**Workflow 12：内容更新 Agent**
- 每天扫描发布 > 180 天的旧内容 → Re-Research → Rewrite → Republish
- 保证 Google Fresh Content 信号

### 11.5 每日自动运行时间表

| 时间 | 任务 | 产出 |
|---|---|---|
| 00:00 | Keyword Agent | 100 关键词 |
| 01:00 | Research Agent | 20 工具 |
| 03:00 | Writer Agent | 20 页面 |
| 05:00 | SEO Audit Agent | 评分 |
| 06:00 | Publisher Agent | 上线 |

### 11.6 每个 Agent 的固定 System Prompt

| Agent | 职责 | 输入 | 输出 |
|---|---|---|---|
| Keyword Agent | 挖掘关键词 | 新闻、趋势 | SEO 关键词 |
| Research Agent | 收集事实 | 工具名称 | JSON 资料 |
| Outline Agent | 生成结构 | Keyword + Research | 文章大纲 |
| Writer Agent | 撰写内容 | 大纲 | Markdown + JSON |
| Comparison Agent | 对比分析 | 两个工具 | 对比页面 |
| FAQ Agent | 常见问题 | 页面内容 | FAQ JSON |
| Link Agent | 内链推荐 | 当前页面 | Related Links |
| Image Prompt Agent | 图片提示词 | 页面内容 | Prompt |
| Audit Agent | SEO 评分 | 页面 | Score + 建议 |
| Publisher Agent | 发布 | 页面 | 已发布状态 |
| Update Agent | 内容刷新 | 旧页面 | 新版本 |

### 11.7 混合架构建议（n8n + LangGraph）

```
n8n（编排层）
├── 定时任务
├── API 调用
├── 数据库
└── 发布流程

LangGraph（AI 协作层）
├── 多 Agent 协作
├── 失败重试
└── 人工审批节点

Supabase（唯一数据源）
Next.js CMS（渲染层）
```

### 11.8 MVP 开发顺序

**第 1 阶段（7 天）**：Supabase 数据库 + 工具列表 + 工具详情页 + SEO Meta → 100 工具上线
**第 2 阶段（15 天）**：Keyword Agent + Writer Agent + 自动生成 → 每天 10 页
**第 3 阶段（30 天）**：Compare Agent + Image Agent + SEO 评分 Agent → 1000 SEO 页面

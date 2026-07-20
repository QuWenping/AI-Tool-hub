---
title: AI Tool Hub 内容更新计划（Content Ops）
tags:
  - ai-tool-hub
  - content
  - seo
updated: 2026-07-20
maintainers:
  - QuQu
status: active
related:
  - "[[AI-Tool-Hub-任务计划]]"
  - "[[AI-Tool-Hub-完整规划]]"
  - "[[AI-Tool-Hub-现状对比]]"
source: "C:/Users/QuQu/Downloads/AI-Tool-Hub项目blog内容.txt"
---

# 📝 AI Tool Hub 内容更新计划

> **主责**：**Claude**（AI 内容运营）— 负责本文件的全部执行、周报与勾选。
> **配合方**：Codex（工程实施，负责模板/组件/后端；不接手内容任务）。
> **接口**：内容侧发现模板/字段问题时，在 [[AI-Tool-Hub-任务计划]] 加 `- [ ] Pn-XX @Codex`；Codex 上线新字段/新模板后在本文件"📈 周报"区加 changelog。
>
> **说明**：本计划**只**处理内容产出（Reviews / Comparisons / Topic Clusters / Internal Links / Backlinks），不涉及代码模板。Design System、Tool Detail 模板、Solution 模板已在 Sprint 1–3 完成，任何工具、评测、对比、专题现在都可以**填数据即上线**。
>
> **母计划**：[[AI-Tool-Hub-任务计划]] / [[AI-Tool-Hub-完整规划]] / [[AI-Tool-Hub-现状对比]]。本文件覆盖 P0-11、P1-1、P1-3、P1-4、P1-16 的执行细节。

---

## 🎯 核心目标（来自源文档）

> Google 喜欢每天都有新内容、每周几十篇、半年几百篇。现在几十篇是不够的。

**6 个月内容硬指标**：
- 工具评测（Reviews）：≥ **200 篇**深度评测
- 对比文章（A vs B）：≥ **60 篇**头对头对比
- 专题集群（Topic Clusters）：**8 组**主题，每组 ≥ 15 篇内链集群
- 每篇文章：≥ **10-20** 条 Internal Link
- 首批高质量外链（Reddit / HN / X / PH / Medium）：≥ **30** 条

---

## 📊 现状盘点（2026-07-20）

| 内容资产 | 现有量 | 6 月目标 | 缺口 | 备注 |
|---|---|---|---|---|
| 工具评测（Reviewed，深度）| **17** | 200+ | **-183** | 已有编辑元数据 |
| 工具目录页（Catalogued，模板已就位）| 282 | — | 已上线 | 模板显示 "Pending review" 徽章 |
| 对比页数据（matchups.json）| 103 | — | 已有 slug | 需要转化为**文章级别**的 vs 页面 |
| 对比文章（长文完整版）| **~4** | 60+ | **-56** | ChatGPT vs Claude 等已存在 |
| 博客文章 | 44 | 100+ | **-56** | 30 篇 how-to / best / vs 已有 |
| 行业方案页（Solutions）| 18 | 25+ | -7 | Sprint 3 已完成 5 目标页 |
| Prompt Library | 639 | 10000+ | 大量缺口 | 归 P1-5，不在本计划内 |

**结论**：优先补的是 **Reviews**（-183 篇）和 **对比长文**（-56 篇）。工具目录页已有模板托底（catalogued 状态），先补 review 层可立即提升信任度和 Rich Result。

---

## 🚀 6 阶段推进（12 周）

### 阶段 1 — Review 主力批（Week 1-2，交付 20 篇）

**目标**：从 17 → 37 篇深度评测。选高流量、竞争可控的工具。

**候选清单（按流量优先级排序）**：

| # | Tool ID | 类别 | 说明 |
|---|---|---|---|
| 1 | `deepseek` | text | 高热，中国用户密集搜索 |
| 2 | `windsurf` | code | Cursor 直接对手，vs 关键词大 |
| 3 | `cline` | code | 开源 Cursor 替代 |
| 4 | `codeium` | code | 免费 Copilot 替代 |
| 5 | `bolt` | code | 全栈 AI 代码 |
| 6 | `v0` | code | Vercel UI 生成 |
| 7 | `lovable` | code | 无代码 App |
| 8 | `replit` | code | 学生首选 |
| 9 | `aider` | code | 终端 Agent |
| 10 | `flux` | image | 照片级图像新王 |
| 11 | `ideogram` | image | 图像文字专家 |
| 12 | `krea` | image | 实时生成 |
| 13 | `canva-ai` | image | 非设计师首选 |
| 14 | `pika` | video | 短视频领先 |
| 15 | `luma` | video | Dream Machine 强 |
| 16 | `kling` | video | 中国 Sora 对手 |
| 17 | `hailuo` | video | 免费视频代表 |
| 18 | `fireflies` | audio | 销售会议主力 |
| 19 | `otter` | audio | 学生会议记录首选 |
| 20 | `gamma` | productivity | AI PPT 龙头 |

**执行方式**：为每个工具在 `src/data/tool-editorial.json` 添加 `reviewed:true` + `updatedAt` + `testedVersion` + `score` + `pricingSummary` + `quickFacts` + `faq (10 items)` + 编辑评论。**代码零改动，页面自动切换到 "Editorially reviewed" 模式**。

**Definition of Done（每篇）**：
- ✅ `tool-editorial.json` 补齐 8 个字段
- ✅ 10 条 FAQ（数据支撑，非编造）
- ✅ 至少 3 张 WebP 截图（`public/images/tools/{id}/`）
- ✅ 与其它工具的 3 条 alternatives + 3 条 comparisons 链接自然渲染
- ✅ Playwright 快速验证：单一 title 后缀、10 FAQ、无溢出、无控制台错误

---

### 阶段 2 — 高价值对比长文（Week 3-4，交付 20 篇）

**目标**：把 103 个 matchups 里的高流量组合升级成**长文级 vs 页面**。

**必做 20 组（按搜索量排序）**：

| 优先级 | vs 组合 | slug |
|---|---|---|
| 🔥 P0 | Cursor vs Windsurf | `cursor-vs-windsurf` |
| 🔥 P0 | Cursor vs Claude Code | `cursor-vs-claude-code` |
| 🔥 P0 | Cursor vs GitHub Copilot | 已有，补深度 |
| 🔥 P0 | ChatGPT vs Claude | 已有，补深度 |
| 🔥 P0 | Claude vs Gemini | 已有 |
| 🔥 P0 | Midjourney vs DALL-E 3 | `midjourney-vs-dalle3` |
| 🔥 P0 | Midjourney vs Flux | `midjourney-vs-flux` |
| 🔥 P0 | Bolt vs Lovable | `bolt-vs-lovable` |
| ⭐ P1 | Sora vs Runway | 已有 |
| ⭐ P1 | Sora vs Kling | `sora-vs-kling` |
| ⭐ P1 | Runway vs Pika | `runway-vs-pika` |
| ⭐ P1 | Perplexity vs ChatGPT | 已有 |
| ⭐ P1 | Notion AI vs Coda AI | `notion-ai-vs-coda-ai` |
| ⭐ P1 | ElevenLabs vs PlayHT | `elevenlabs-vs-play-ht` |
| ⭐ P1 | Fireflies vs Otter | `fireflies-vs-otter` |
| ⭐ P1 | Cursor vs Aider | `cursor-vs-aider` |
| ⭐ P1 | Windsurf vs Cline | `windsurf-vs-cline` |
| ⭐ P1 | Replit vs Bolt | `replit-vs-bolt` |
| ⭐ P1 | Ideogram vs Midjourney | `ideogram-vs-midjourney` |
| ⭐ P1 | v0 vs Lovable | `v0-vs-lovable` |

**每篇结构（AEO 友好）**：
1. Hero + TL;DR（3 行结论：Winner for X / Winner for Y / When to pick each）
2. Quick verdict 表格（10-15 维度）
3. 价格对比
4. Pros/Cons 双列
5. 3 类真实使用场景 → 各推 1 个 winner
6. FAQ（≥ 5 条）
7. Related：两工具的独立 review 页 + 同类别 alternatives + 同 tag 的其它 vs 页

---

### 阶段 3 — 专题集群搭建（Week 5-6，交付 3 个主题）

**目标**：建立 3 个 Topic Cluster，每组包含 1 个 Pillar 页 + ≥ 10 篇 Cluster 页。

#### Cluster 1：AI Coding（最高优先级）
```
Pillar: /best/developers/ 或 /solutions/ai-for-developers/
  ↓ Cluster pages
  - /tool/cursor/  (P1)
  - /tool/windsurf/  (P1)
  - /tool/github-copilot/
  - /tool/cline/  (P1)
  - /tool/aider/  (P1)
  - /tool/codeium/  (P1)
  - /tool/replit/  (P1)
  - /tool/bolt/  (P1)
  - /tool/v0/  (P1)
  - /tool/lovable/  (P1)
  - /vs/cursor-vs-windsurf/  (P2)
  - /vs/cursor-vs-claude-code/  (P2)
  - /vs/bolt-vs-lovable/  (P2)
```

#### Cluster 2：AI Image（Midjourney / Flux / SD）
```
Pillar: /best/image/
  ↓ Cluster pages
  - /tool/midjourney/
  - /tool/stable-diffusion/
  - /tool/flux/  (P1)
  - /tool/ideogram/  (P1)
  - /tool/krea/  (P1)
  - /tool/leonardo/
  - /tool/canva-ai/  (P1)
  - /vs/midjourney-vs-dalle3/  (P2)
  - /vs/midjourney-vs-flux/  (P2)
  - /vs/ideogram-vs-midjourney/  (P2)
```

#### Cluster 3：AI Video（Sora / Runway / Kling）
```
Pillar: /best/video/
  ↓ Cluster pages
  - /tool/sora/
  - /tool/runway/
  - /tool/pika/  (P1)
  - /tool/luma/  (P1)
  - /tool/kling/  (P1)
  - /tool/hailuo/  (P1)
  - /vs/sora-vs-runway/
  - /vs/sora-vs-kling/  (P2)
  - /vs/runway-vs-pika/  (P2)
```

**Cluster 页内链契约**：
- Pillar 必须链接所有 Cluster 页
- Cluster 页必须回链 Pillar + 同 cluster 内 ≥ 3 个相关页
- Cluster 内每两个工具至少有 1 条 vs 链接

---

### 阶段 4 — Internal Link 强化（Week 7，全站补链）

**目标**：所有已有 44 篇 blog + 17 篇 review + 6 篇 solution 达到 **10-20 条 internal link/页**。

**内链矩阵**（每页至少覆盖 5 类）：

| 内链类型 | 位置 | 现状 | 需补齐 |
|---|---|---|---|
| Tool → Alternatives | Tool Detail 末尾 | ✅ 已有 6 张卡 | — |
| Tool → Head-to-Head vs | Tool Detail | ✅ 已有 4 组 | 增加到 6 组 |
| Tool → Related Categories | Tool Detail | ✅ 已有 4 组 | — |
| Solution → 推荐工具 stack | Solution 页 | ✅ 已有 | — |
| Solution → 相关 Solution | Solution 页 | ✅ 已有 | — |
| Blog → 相关工具 | Blog 文章 | ⚠️ 部分 | **必须补** 3-5 条 `/tool/<id>/` |
| Blog → 相关 Blog | Blog 底部 | ⚠️ 部分 | 已有 RelatedPosts 组件，接入数据 |
| Blog → Solution | Blog 中 | ❌ 缺 | **必须补** |
| Vs 页 → 两工具 review | Vs 页 | ✅ 已有 | — |
| Vs 页 → 同 cluster 其它 vs | Vs 页 | ❌ 缺 | **必须补** 3 条 |
| Best 排行榜 → 每个 tool review | Best 页 | ✅ 已有 | — |
| Home → Featured | 首页 | ✅ 已有 6 张 | — |

**执行**：写一个 `scripts/link-audit.mjs` 扫全站 dist，统计每页内链数，输出低于 10 的清单。手动或 AI 补齐。

---

### 阶段 5 — 外链启动（Week 8-10，30 条起）

**渠道分配**：

| 渠道 | 目标数 | 内容策略 | 频次 |
|---|---|---|---|
| Reddit | 10 | `r/artificial`, `r/ChatGPT`, `r/ClaudeAI`, `r/singularity`, `r/localllama` 分享**具体对比数据**（不是链接堆） | 每周 1 条，长期账号 |
| Hacker News | 3 | Show HN：**免费在线工具**（Token 计算器、AI Detector 等）+ Benchmark 数据 | 有质感的原创再投 |
| X / Twitter | 10 | 每周发 1 条 vs 对比、1 条榜单，附截图 | 稳定日更 |
| Product Hunt | 2 | 发布 AI Stack Builder + AI Tool Finder 交互功能 | 有 launch 节奏 |
| Medium / dev.to | 5 | 长文交叉发布（不重复 canonical，用 rel=canonical 指回主站） | Review 与 how-to 类 |

**避坑**：绝不做 fiverr 外链、评论垃圾链、PBN。所有外链都必须有真实价值内容支撑，否则会招惩罚。

---

### 阶段 6 — 日更内容工厂（Week 11-12+ 持续）

**目标**：进入稳态每周 15-25 篇产出。分两条产线：

#### 产线 A：编辑 Review（人力，每周 5 篇）
- 每周挑 5 个未 review 工具
- 每篇约 2-3 小时（含截图）
- 累积 24 周 = 120 篇 → 加上阶段 1 的 20 篇 = **140 篇**

#### 产线 B：AI 辅助生成（Agent Pipeline 上线前的过渡方案）
- **每天** 1 篇 vs / 1 篇 how-to（人工审校后发布）
- **每周**：3 篇 vs + 3 篇 how-to + 2 篇趋势快报
- 累积 12 周 = 96 篇

**质量红线**：
- 不发编造 benchmark 数字
- 不用 vendor marketing copy
- 每篇必须有真实使用截图或引用
- Review 与 Solution 保留 `updatedAt` 元数据

---

## 📋 交付清单（复选框 + 签名规则）

### Week 1-2：Review 主力批

- [ ] R1-01 `deepseek` review
- [ ] R1-02 `windsurf` review
- [ ] R1-03 `cline` review
- [ ] R1-04 `codeium` review
- [ ] R1-05 `bolt` review
- [ ] R1-06 `v0` review
- [ ] R1-07 `lovable` review
- [ ] R1-08 `replit` review
- [ ] R1-09 `aider` review
- [ ] R1-10 `flux` review
- [ ] R1-11 `ideogram` review
- [ ] R1-12 `krea` review
- [ ] R1-13 `canva-ai` review
- [ ] R1-14 `pika` review
- [ ] R1-15 `luma` review
- [ ] R1-16 `kling` review
- [ ] R1-17 `hailuo` review
- [ ] R1-18 `fireflies` review
- [ ] R1-19 `otter` review
- [ ] R1-20 `gamma` review

### Week 3-4：Comparison 长文

- [ ] V-01 Cursor vs Windsurf
- [ ] V-02 Cursor vs Claude Code
- [ ] V-03 Cursor vs GitHub Copilot（升级已有）
- [ ] V-04 ChatGPT vs Claude（升级已有）
- [ ] V-05 Claude vs Gemini（升级已有）
- [ ] V-06 Midjourney vs DALL-E 3
- [ ] V-07 Midjourney vs Flux
- [ ] V-08 Bolt vs Lovable
- [ ] V-09 Sora vs Runway（升级已有）
- [ ] V-10 Sora vs Kling
- [ ] V-11 Runway vs Pika
- [ ] V-12 Perplexity vs ChatGPT（升级已有）
- [ ] V-13 Notion AI vs Coda AI
- [ ] V-14 ElevenLabs vs PlayHT
- [ ] V-15 Fireflies vs Otter
- [ ] V-16 Cursor vs Aider
- [ ] V-17 Windsurf vs Cline
- [ ] V-18 Replit vs Bolt
- [ ] V-19 Ideogram vs Midjourney
- [ ] V-20 v0 vs Lovable

### Week 5-6：Topic Cluster 3 组

- [ ] TC-01 AI Coding cluster（1 Pillar + 10 Cluster 页 + 3 vs 页）
- [ ] TC-02 AI Image cluster（1 Pillar + 7 Cluster 页 + 3 vs 页）
- [ ] TC-03 AI Video cluster（1 Pillar + 6 Cluster 页 + 3 vs 页）

### Week 7：Internal Link 全站补链

- [ ] IL-01 `scripts/link-audit.mjs` 上线并 CI 化
- [ ] IL-02 44 篇 blog 每篇达到 ≥ 10 内链
- [ ] IL-03 6 篇 Solution 每篇达到 ≥ 15 内链
- [ ] IL-04 20 篇 vs 长文每篇达到 ≥ 12 内链
- [ ] IL-05 首页 Trending / Editorial log 挂钩最新 review

### Week 8-10：外链首批 30 条

- [ ] BL-01 Reddit ×10（r/ChatGPT、r/ClaudeAI、r/localllama 等）
- [ ] BL-02 Hacker News ×3（Show HN）
- [ ] BL-03 X 长期账号 ×10 帖
- [ ] BL-04 Product Hunt ×2（Stack Builder + Tool Finder）
- [ ] BL-05 Medium / dev.to 交叉发布 ×5

### Week 11-12+：稳态产线

- [ ] OPS-01 编辑 Review 每周 5 篇（累计到 140+）
- [ ] OPS-02 AI 辅助 vs / how-to 每周 8 篇（累计到 96+）
- [ ] OPS-03 每周五发一封 AI Weekly Intelligence Newsletter
- [ ] OPS-04 每月发布内容进度 Report

---

## 🔗 工具编辑元数据模板（复制即填）

```json
"<tool-id>": {
  "reviewed": true,
  "updatedAt": "2026-MM-DD",
  "testedVersion": "<产品版本或日期>",
  "score": <编辑评分 0-10>,
  "quickFacts": {
    "freeTier": <true|false>,
    "hasApi": <true|false>,
    "platforms": ["Web", "iOS", "Android", "Desktop", "API"]
  },
  "pricingSummary": {
    "en": "<一句话价格摘要>",
    "zh": "<中文摘要>"
  },
  "faq": [
    { "q_en": "?", "q_zh": "？", "a_en": "", "a_zh": "" }
    /* ≥ 10 条 */
  ]
}
```

只填 `tool-editorial.json` 一处，页面立刻从 "AI-catalogued, pending review" 切到 "Editorially reviewed"。

---

## 🤝 协作规则

1. 每完成一项：勾选 `- [x]`，末尾追加 `@name YYYY-MM-DD`
2. 完成的 Review 请同步把 tool-editorial.json PR 与截图 PR 合并到 main
3. 每周五在本文件底部追加 "📈 周报" 一段：本周产出数、当前累计、下周计划
4. 争议内容标 `⚠️`（例如某工具 pricing 不确定）
5. 涉及模板改动请回主计划 [[AI-Tool-Hub-任务计划]]，不要在本文件加代码任务

---

## 📈 周报（追加区）

<!-- 每周五在这里追加，最新在上 -->

### Week 0 · 2026-07-20（基线）
- Reviews：17 / 200
- Comparisons 长文：~4 / 60
- Blog：44 / 100
- Topic Clusters：0 / 8
- Internal links audit：未运行
- Backlinks：0 / 30
- 备注：模板已就位，等待内容运营团队接手 Week 1 R1-01 → R1-20。

---

## 🔗 相关链接

- 主任务板：[[AI-Tool-Hub-任务计划]]
- 完整规划：[[AI-Tool-Hub-完整规划]]
- 现状对比：[[AI-Tool-Hub-现状对比]]
- 项目代码：`C:\Users\QuQu\AI-Tool-hub-main`
- 编辑元数据文件：`src/data/tool-editorial.json`
- 内链稽核脚本（待建）：`scripts/link-audit.mjs`

---
AIGC:
    Label: "1"
    ContentProducer: 001191440300708461136T1XGW3
    ProduceID: d49fe9e58e84b114ae630734f70cf3ca_e364f17e870711f1b66e525400e6dd8f
    ReservedCode1: VavDxoWqwKKPaXQrb8XJN0E6aDn4ddGMKbVEoIKHQs95QnMP2hEHPl3DVUBso4uEPXGiRS+282BWqgBPqysh0j65A9HTcAl8E115LDIfGue5pEfWxjulE/ViXZ6Trkkes0PxmHEACO8uAMz1ujs08o02op4H3eM8mHFZjFcR6STPBRwQXSeBQW+W2RE=
    ContentPropagator: 001191440300708461136T1XGW3
    PropagateID: d49fe9e58e84b114ae630734f70cf3ca_e364f17e870711f1b66e525400e6dd8f
    ReservedCode2: VavDxoWqwKKPaXQrb8XJN0E6aDn4ddGMKbVEoIKHQs95QnMP2hEHPl3DVUBso4uEPXGiRS+282BWqgBPqysh0j65A9HTcAl8E115LDIfGue5pEfWxjulE/ViXZ6Trkkes0PxmHEACO8uAMz1ujs08o02op4H3eM8mHFZjFcR6STPBRwQXSeBQW+W2RE=
---

# AI Tool Hub — 文章生成规范 v2.0

> 适用：所有 AI 工具对比 / 评测 / 教程文章。基于 AdSense 审核 + Google Helpful Content + E-E-A-T 三重标准制定。
> 本规范是 v1.0 的升级版，新增图片证据、Sources 三栏表格、实体一致性等硬性要求。

---

## 一、红线（违反即拒稿）

### 1.1 禁止虚构测试体验
- ❌ "We tested for 30 days" / "After generating 75 images..."
- ✅ "Based on available features and user feedback" / "Our workflow evaluation covered five scenarios..."
- **规则**：所有测试声称必须有明确方法论支撑，不能出现无法验证的具体数字

### 1.2 禁止绝对化语言
- ❌ Winner / Best / Dominates / Game-changing / wins decisively / without question
- ✅ Better Choice / Excels in / Strong / performed better / stronger option for

### 1.3 禁止硬编码版本号
- ❌ GPT-5 / 128K context / 4 images per prompt / 2048×2048
- ✅ current-generation models / large context window / multiple image variations / varies by plan
- **例外**：Testing Methodology 中可写测试时使用的具体版本（如 "Midjourney v7, July 2026"），但功能规格类数据必须泛化

### 1.4 禁止实体不一致
- ❌ 标题写 "ChatGPT Image Generation"，正文/结论写 "DALL-E"
- ✅ 全文产品名称与标题保持一致

### 1.5 禁止虚构引用
- ❌ Sources 只有文字描述无链接
- ✅ 每条引用必须有可点击的官方 URL 或社区链接

---

## 二、每篇文章必须包含的段落

### 2.1 Testing Methodology（必选）
- 测试对象（产品名 + 版本 + 时间）
- 测试环境（平台 / 订阅级别 / 默认设置）
- 测试方法（场景数量 / prompt 设计思路）
- **格式示例**：
  > Test setup: Midjourney v7 (July 2026, via Discord and Web Alpha) and ChatGPT image generation (via ChatGPT Plus, July 2026) were evaluated with default settings and no post-processing. We used structured prompt sets across five common AI image creation scenarios.

### 2.2 Final Verdict（必选）
- 分场景结论，不设统一的 Winner/Loser
- 语言限定：使用 "Based on our evaluation" / "In our testing" / "for users prioritizing..."
- 必须与标题实体一致

### 2.3 Sources（必选，三栏表格格式）

```html
<table>
<thead><tr><th width="40%">Official Documentation</th><th width="35%">Community Discussion</th><th width="25%">Methodology Note</th></tr></thead>
<tbody><tr>
<td valign="top"><ul>
<li><a href="真实URL" target="_blank" rel="nofollow">产品名称 Official Documentation</a></li>
<li>...</li>
</ul></td>
<td valign="top"><ul>
<li><a href="真实URL" target="_blank" rel="nofollow">社区名称</a></li>
<li>...</li>
</ul></td>
<td valign="top"><p>本评测的测试方法、时间、环境简述</p></td>
</tr></tbody>
</table>
```

- 每列至少 2 条
- 链接必须真实可访问，使用 `target="_blank" rel="nofollow"`

### 2.4 Affiliate Disclosure（必选）
- 文章末尾或首个 H2 之后
- 格式：`*Disclaimer: This article contains affiliate links. We may earn a commission if you purchase through these links, at no extra cost to you.*`

### 2.5 How We Evaluated / Who Should Choose Which（必选，对比类文章）
- 评测维度说明（至少 5 个维度）
- 分用户画像推荐（至少 3 种用户类型）

---

## 三、结构模板

```
# [Product A] vs [Product B] (Year)

## At a Glance (表格摘要)
| 维度 | A | B |
|------|---|---|
| ... |   |   |

## Testing Methodology

## Head-to-Head Comparison

### 1. [场景一]
### 2. [场景二]
### 3. [场景三]
### 4. [场景四]
### 5. [场景五]

## Feature Comparison Table (HTML 表格)

## Pricing & Value

## How We Evaluated
- 评测维度 1
- 评测维度 2
- ...

## Who Should Choose Which
- **选 A 如果你**：...
- **选 B 如果你**：...
- **两者结合如果你**：...

## Final Verdict
(分场景结论，不设统一 Winner)

## Sources (三栏表格)

## Affiliate Disclosure
```

---

## 四、配图规范

### 4.1 每篇配图 5-8 张
- Hero 主视觉：1200×630
- 能力矩阵图 / 功能对比图
- 工作流程图或界面截图（必须真实，禁止 AI 生成假冒产品截图）
- 优缺点总结卡

### 4.2 对比评测类额外要求
- 至少 3 组 side-by-side 输出对比（同 prompt → A 输出 vs B 输出）
- 每组标注 prompt 原文

---

## 五、元数据规范

### 5.1 desc_en
- 120-160 字符
- 禁止实验暗示（"we tested" / "we found" / "our results show"）
- **模板**：`Compare [Product A] and [Product B] across [N] key scenarios — [dimension 1], [dimension 2], and [dimension 3]. Find the right tool for your workflow.`

### 5.2 author_slug
- 统一使用 `"lin-chen"`
- 确保 `src/data/authors.json` 中对应条目存在

### 5.3 read_time
- 按 200 words/min 计算
- 取整到最接近的分钟数

---

## 六、AdSense 合规对照

| 政策 | 要求 | 检查项 |
|------|------|--------|
| Thin Content | 每篇 >1500 words | 提交前验证 |
| AI Mass Content | 必须有真实截图 + 作者观点 + 独特分析 | 配图数 ≥5，有 Testing Methodology |
| Misleading | 标题/正文/结论实体一致 | grep 检查 |
| Affiliate Bias | Disclosure 存在 + 结论不偏向佣金产品 | 检查 Final Verdict 限定语 |

---

## 七、提交前检查清单

- [ ] 全文实体一致（标题 = 正文 = 结论 = Sources）
- [ ] 无绝对化语言（Winner/Best/Dominates）
- [ ] 无硬编码规格数字（tokens/分辨率/张数）
- [ ] Testing Methodology 完整（对象/时间/环境/方法）
- [ ] Final Verdict 限定语到位（"Based on our evaluation"）
- [ ] Sources 三栏表格 + 6 条以上可点击链接
- [ ] desc_en 无实验暗示 + 120-160 字符
- [ ] read_time 按 200wpm 重算
- [ ] author_slug 指向已存在的作者档案
- [ ] Affiliate Disclosure 存在
- [ ] 配图 ≥5 张（对比类 ≥3 组 side-by-side）
*（内容由AI生成，仅供参考）*

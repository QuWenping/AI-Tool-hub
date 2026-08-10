---
title_en: 'How to Write Prompts for Midjourney in 2026 — The Ultimate Guide'
title_zh: '2026 年 Midjourney 提示词编写终极指南'
desc_en: 'Master Midjourney prompt writing with this comprehensive guide covering structure, parameters, style references, and pro techniques for stunning AI art.'
desc_zh: '通过本指南掌握 Midjourney 提示词编写，涵盖结构、参数、风格参考和专业技巧。'
category: Guides
category_zh: 指南
author: AI Tool Hub Research Team
date: '2026-07-16'
tags:
  - midjourney
  - prompts
  - ai-art
faq:
  - q: What is the best Midjourney prompt structure?
    a: Use this formula: [Subject] + [Style/Medium] + [Lighting] + [Composition] + [Parameters]. Example: "A cyberpunk samurai, digital painting style, neon lighting, portrait composition --ar 16:9 --v 7"
  - q: How do I get consistent characters in Midjourney?
    a: Use the --cref (character reference) parameter with a URL to your reference image. Combine with --cw (character weight) to control how much of the reference to preserve.
---

## Midjourney Prompt Structure

The best Midjourney prompts follow a formula:

**Subject + Style/Medium + Lighting + Composition + Parameters**

### Example Breakdown

**Basic:** "a warrior"

**Better:** "a cyberpunk samurai warrior"

**Best:** "a cyberpunk samurai warrior, digital painting style, neon blue and pink lighting, portrait composition, detailed armor, rain effect --ar 16:9 --v 7 --s 750"

## Key Parameters

| Parameter | Purpose | Example |
|-----------|---------|---------|
| --ar | Aspect ratio | --ar 16:9 |
| --v | Model version | --v 7 |
| --s | Stylize (0-1000) | --s 750 |
| --c | Chaos (0-100) | --c 50 |
| --no | Negative prompt | --no text, watermark |
| --cref | Character reference | --cref [URL] |
| --iw | Image weight | --iw 2 |

## Style Keywords

- **Photorealistic:** "photorealistic, 8k, detailed skin texture, natural lighting"
- **Illustration:** "digital art, trending on ArtStation, vibrant colors"
- **Cinematic:** "cinematic lighting, film grain, anamorphic lens, depth of field"
- **Minimalist:** "minimalist, clean lines, negative space, flat design"

## Pro Tips

1. Use image prompts with --iw for composition control
2. Chain prompts with the Remix mode for iterative refinement
3. Keep a prompt library of your best-performing combinations
4. Test the same subject with different style keywords to find your aesthetic

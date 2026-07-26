#!/usr/bin/env python3
"""Add Chinese translations to categories.json, matchups.json, stack-recommendations.json"""

import json

# ==================== categories.json ====================
category_zh = {
    "text": {
        "title_zh": "2026 年最佳 AI 写作工具",
        "desc_zh": "AI 写作助手，用于对话交互、内容起草、编辑和头脑风暴。"
    },
    "image": {
        "title_zh": "2026 年最佳 AI 图像生成器",
        "desc_zh": "面向设计师、艺术家和创作者的文本到图像 AI 模型。"
    },
    "code": {
        "title_zh": "2026 年最佳 AI 编程助手",
        "desc_zh": "代码补全、重构和结对编程 AI 工具。"
    },
    "video": {
        "title_zh": "2026 年最佳 AI 视频生成器",
        "desc_zh": "面向视频创作者和营销人员的文本到视频 AI 工具。"
    },
    "audio": {
        "title_zh": "2026 年最佳 AI 音频工具",
        "desc_zh": "AI 语音生成、播客制作和音乐创作工具。"
    },
    "productivity": {
        "title_zh": "2026 年最佳 AI 效率工具",
        "desc_zh": "用于笔记记录、智能搜索和任务自动化的 AI 工具。"
    }
}

path = r"C:\Users\qiura\Projects\active\AIToolHub\src\data\categories.json"
with open(path, "r", encoding="utf-8") as f:
    data = json.load(f)
for cat in data:
    zh = category_zh.get(cat["slug"], {})
    if "title_zh" in zh:
        cat["title_zh"] = zh["title_zh"]
    if "desc_zh" in zh:
        cat["desc_zh"] = zh["desc_zh"]
with open(path, "w", encoding="utf-8") as f:
    json.dump(data, f, ensure_ascii=False, indent=2)
print("categories.json updated with zh translations")

# ==================== matchups.json ====================
matchup_zh = {
    "cursor-vs-windsurf": "Cursor vs Windsurf（2026）：哪个 AI 代码编辑器更胜一筹？",
    "cursor-vs-claude-code": "Cursor vs Claude Code（2026）：IDE 智能体 vs 对话智能体",
    "cursor-vs-github-copilot-2026": "Cursor vs GitHub Copilot（2026）：权威对比",
    "cursor-vs-aider": "Cursor vs Aider（2026）：GUI 编辑器 vs CLI 智能体",
    "windsurf-vs-cline": "Windsurf vs Cline（2026）：哪个 AI 编程智能体适合你？",
    "replit-vs-bolt": "Replit vs Bolt（2026）：浏览器端 AI 开发对比",
    "v0-vs-lovable": "v0 vs Lovable（2026）：AI 前端构建器对决",
    "midjourney-vs-dalle3": "Midjourney vs DALL·E 3（2026）：哪个 AI 图像生成器更强？",
    "midjourney-vs-flux": "Midjourney vs Flux（2026）：艺术美感 vs 照片写实",
    "ideogram-vs-midjourney": "Ideogram vs Midjourney（2026）：图中文字 vs 纯艺术",
    "sora-vs-runway": "Sora vs Runway（2026）：OpenAI 新秀 vs 老牌劲旅",
    "sora-vs-kling": "Sora vs Kling（2026）：质量标杆 vs 性价比之王",
    "runway-vs-pika": "Runway vs Pika（2026）：专业制作 vs 社交短视频"
}

path = r"C:\Users\qiura\Projects\active\AIToolHub\src\data\matchups.json"
with open(path, "r", encoding="utf-8") as f:
    data = json.load(f)
for m in data:
    if m["slug"] in matchup_zh:
        m["title_zh"] = matchup_zh[m["slug"]]
with open(path, "w", encoding="utf-8") as f:
    json.dump(data, f, ensure_ascii=False, indent=2)
print("matchups.json updated with title_zh")

# ==================== stack-recommendations.json ====================
stack_role_zh = {
    "chatgpt": "通用智能助手",
    "claude": "写作与研究",
    "gemini": "多模态助手",
    "cursor": "AI 原生编程",
    "github-copilot": "IDE 自动补全",
    "windsurf": "智能体编程",
    "midjourney": "图像生成",
    "canva-ai": "设计平台",
    "stable-diffusion": "开源图像生成",
    "elevenlabs": "AI 语音合成",
    "perplexity": "AI 研究引擎",
    "notion-ai": "AI 工作空间",
    "make-com": "工作流自动化",
    "n8n": "开源自动化",
    "fireflies": "会议智能分析",
    "jasper": "营销文案",
    "suno": "AI 音乐生成",
    "descript": "音视频编辑器",
    "runway": "AI 视频制作",
    "v0": "AI UI 生成器",
    "lovable": "无代码应用构建器",
    "bolt": "全栈 AI 编程",
    "copy-ai": "AI 文案撰写",
    "quillbot": "改写与润色",
    "dify": "AI 应用构建器",
    "grammarly-ai": "AI 写作助手",
    "photoroom": "AI 照片编辑器",
    "deepseek": "推理与编程",
    "replit": "浏览器 IDE + AI",
    "zapier": "无代码自动化"
}

path = r"C:\Users\qiura\Projects\active\AIToolHub\src\data\stack-recommendations.json"
with open(path, "r", encoding="utf-8") as f:
    data = json.load(f)
for tool in data["tools"]:
    tid = tool["toolId"]
    if tid in stack_role_zh:
        tool["stackRole"]["zh"] = stack_role_zh[tid]
with open(path, "w", encoding="utf-8") as f:
    json.dump(data, f, ensure_ascii=False, indent=2)
print("stack-recommendations.json updated with stackRole.zh")

print("\nAll small files updated successfully!")

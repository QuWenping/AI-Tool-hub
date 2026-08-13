// ============================================================
// SEO V2 Phase 2 — 主题集群配置（Topic Clusters）
// 来源：《TheBestAIToolsReview SEO V2 行动计划》第 5 章
// ============================================================

export interface SeoCluster {
  id: string;
  name: string;
  hubPath: string;          // 集群 Hub/Pillar 页（en）
  description: string;
  members: string[];        // 集群成员路径（en）
}

export const seoClusters: SeoCluster[] = [
  {
    id: "ai-engineering",
    name: "AI Engineering",
    hubPath: "/solutions/ai-for-bim/",
    description:
      "AI Engineering 核心护城河集群：BIM / Model Checking / QA / Civil / Structural / Mechanical / Electrical / HVAC / Architecture / Construction / Drawing Review / Engineering Copilot。",
    members: [
      "/solutions/ai-for-bim/",
      "/solutions/ai-for-architecture/",
      "/solutions/ai-for-structural-engineers/",
      "/solutions/ai-for-electrical-engineers/",
      "/use-cases/bim-ai-tools/",
      "/use-cases/architecture-ai-tools/",
      "/use-cases/construction-ai-tools/",
      "/use-cases/engineering-ai-tools/",
      "/best/ai-for-architects/",
      "/alternatives/vercel-sdk/",
      "/blog/how-to-build-an-ai-agent-2026/",
    ],
  },
  {
    id: "ai-reviews",
    name: "AI Reviews",
    hubPath: "/tools/",
    description: "深度评测集群：Agnes AI / Meetily / 各工具 Review 页。",
    members: [
      "/blog/agnes-ai-review-free-omni-modal-api-2026/",
      "/blog/meetily-review-best-local-ai-meeting-assistant-2026/",
      "/blog/apple-speechanalyzer-vs-whisper-2026/",
      "/tool/agnes-ai/",
    ],
  },
  {
    id: "ai-video",
    name: "AI Video",
    hubPath: "/best/video/",
    description: "AI 视频生成集群：best-of 页 + 工具页。",
    members: [
      "/blog/best-ai-video-generators-2026/",
      "/best/video/",
      "/tool/gen-2-ai/",
    ],
  },
  {
    id: "ai-image",
    name: "AI Image",
    hubPath: "/best/image/",
    description: "AI 图像生成集群。",
    members: [
      "/blog/best-ai-image-generators-compared-2026/",
      "/best/image/",
      "/tool/hotpot-ai/",
      "/blog/best-ai-tools-for-designers-2026/",
    ],
  },
  {
    id: "ai-tools",
    name: "AI Tools（通用工具评测）",
    hubPath: "/tools/",
    description: "通用工具评测页集群：SoftwareApplication schema 全覆盖。",
    members: [
      "/tool/lens-ai/",
      "/tool/height-ai/",
      "/tool/shell-genie/",
      "/tool/twipu-ai/",
      "/tool/asana-ai/",
      "/tool/connected-papers/",
      "/tool/assembly-ai/",
      "/tool/codemod-ai/",
      "/tool/gen-2-ai/",
      "/tool/zotero-ai/",
      "/tool/contentbot/",
      "/tool/copysmith/",
      "/tool/agnes-ai/",
      "/tool/harpa-ai/",
      "/tool/perplexity/",
      "/tool/hotpot-ai/",
      "/tool/veracode/",
      "/alternatives/maxai/",
      "/alternatives/scenarios-ai/",
      "/alternatives/vercel-sdk/",
    ],
  },
  {
    id: "ai-tutorials",
    name: "AI Tutorials（How-To 集群）",
    hubPath: "/blog/",
    description: "步骤型教程集群：HowTo schema + FAQPage。",
    members: [
      "/blog/how-to-use-claude-for-long-documents-2026/",
      "/blog/how-to-use-elevenlabs-for-podcasts-2026/",
      "/blog/how-to-write-prompts-for-midjourney-2026/",
      "/blog/how-to-use-ai-for-sales-2026/",
    ],
  },
  {
    id: "ai-hardware",
    name: "AI Hardware",
    hubPath: "/blog/",
    description: "AI 硬件/终端设备集群。",
    members: ["/blog/bonsai-27b-on-device-ai-phone-2026/"],
  },
  {
    id: "ai-finance",
    name: "AI Finance",
    hubPath: "/solutions/ai-for-finance/",
    description: "AI 金融分析集群。",
    members: ["/solutions/ai-for-finance/", "/best/productivity/"],
  },
  {
    id: "ai-writing",
    name: "AI Writing",
    hubPath: "/best/text/",
    description: "AI 写作集群。",
    members: ["/best/content-writing/", "/best/text/", "/tool/contentbot/", "/tool/copysmith/"],
  },
  {
    id: "ai-design",
    name: "AI Design",
    hubPath: "/best/designers/",
    description: "AI 设计集群。",
    members: ["/blog/best-ai-tools-for-designers-2026/", "/best/designers/"],
  },
  {
    id: "ai-audio",
    name: "AI Audio",
    hubPath: "/best/audio/",
    description: "AI 音频/语音集群。",
    members: ["/vs/elevenlabs-vs-chatgpt/", "/best/audio/", "/tool/elevenlabs/"],
  },
  {
    id: "ai-business",
    name: "AI Business",
    hubPath: "/best/small-business/",
    description: "AI 商业应用集群（小企业/销售/营销）。",
    members: [
      "/blog/best-ai-tools-for-small-business-2026/",
      "/blog/how-to-use-ai-for-sales-2026/",
      "/best/small-business/",
      "/best/ai-for-sales-teams/",
    ],
  },
  {
    id: "comfyui-workflows",
    name: "ComfyUI Workflows",
    hubPath: "/workflows/",
    description: "ComfyUI 工作流集群：LoRA / Video / 对比页。",
    members: [
      "/workflows/comfyui-video-frame-interpolation/",
      "/workflows/comfyui-lora-training/",
      "/blog/comfyui-vs-automatic1111-2026/",
      "/tool/comfyui/",
    ],
  },
  {
    id: "workflow-automation",
    name: "Workflow Automation",
    hubPath: "/workflows/",
    description: "工作流自动化集群（n8n / Make）。",
    members: ["/workflows/n8n-rss-to-blog-post/", "/vs/n8n-vs-make/", "/tool/n8n/", "/tool/make-com/"],
  },
  {
    id: "business-templates",
    name: "Business Templates",
    hubPath: "/templates/",
    description: "商务模板集群。",
    members: ["/templates/qbr-template/", "/templates/pitch-deck/", "/templates/prd-template/"],
  },
  {
    id: "ai-prompts",
    name: "AI Prompts",
    hubPath: "/prompts/",
    description: "提示词模板集群。",
    members: ["/prompts/cursor-dark-mode/", "/prompts/midjourney-book-cover/"],
  },
];

export const seoClusterIndex: Record<string, SeoCluster> = Object.fromEntries(
  seoClusters.map(c => [c.id, c])
);

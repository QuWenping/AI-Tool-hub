// ============================================================
// SEO V2 Phase 2 — 重定向配置（Redirects）
// 统一管理全站 301 策略：旧 URL → 新 URL / 规范 URL。
// 来源：《TheBestAIToolsReview SEO V2 行动计划》第 2.4 节 + Phase 1 审计
// 注意：vercel.json 承担平台层 301（含 www、无扩展名补尾斜杠）；
//       此处为代码层登记与复核清单，供模板/脚本引用。
// ============================================================

export interface SeoRedirect {
  from: string;
  to: string;
  statusCode: 301 | 308;
  note?: string;
}

export const seoRedirects: SeoRedirect[] = [
  // ---- 已由 astro.config.mjs redirects + vercel.json 双保险（无需改动） ----
  { from: "/tool/[...slug]", to: "/tools/[...slug]", statusCode: 301, note: "已配置（astro + vercel 双保险）" },
  { from: "/zh/tool/[...slug]", to: "/zh/tools/[...slug]", statusCode: 301, note: "已配置（astro + vercel 双保险）" },

  // ---- www → non-www（vercel.json 需包含 host 匹配规则） ----
  { from: "https://www.thebestaitoolsreview.com/:path*", to: "https://thebestaitoolsreview.com/:path*", statusCode: 301, note: "平台层：vercel.json has host 规则" },

  // ---- 无扩展名路径补尾斜杠（vercel.json 已配置） ----
  { from: "/:path((?!.*\\.)[^?#]+[^/])", to: "/:path/", statusCode: 301, note: "已配置（vercel.json）" },

  // ---- 软重定向页明确化：deep-dive-claude → 深度评测正文 ----
  {
    from: "/deep-dive-claude/",
    to: "/blog/claude-vs-gemini-vs-chatgpt-2026/",
    statusCode: 301,
    note: "P1-11：由 meta-refresh 软重定向改为明确 301（vercel.json + astro redirects）",
  },
  {
    from: "/zh/deep-dive-claude/",
    to: "/zh/blog/claude-vs-gemini-vs-chatgpt-2026/",
    statusCode: 301,
    note: "zh 版 deep-dive-claude 同步 301",
  },

  // ---- 内容重叠 301（Phase 2 建议：solutions vs use-cases 重复内容） ----
  // 说明：按审计 §5.2，bim/architecture/engineering/construction 4 组存在
  // solutions ↔ use-cases 内容重叠。当前阶段不强制 301，而是明确分工；
  // 若后续决定合并，可在此启用以下规则。
  // { from: "/solutions/ai-for-bim/", to: "/use-cases/bim-ai-tools/", statusCode: 301, note: "待定：与 §5.2 分工方案冲突，默认不启用" },
];

// 供 sitemap filter 使用的「不收录路径」集合（软重定向页不应进 sitemap）
export const sitemapExcludePaths: string[] = [
  "/deep-dive-claude/",
  "/zh/deep-dive-claude/",
  // prompts 软重定向页（7 个，en + zh 版本）
  "/prompts/any-cicd/",
  "/prompts/any-etl-spec2/",
  "/prompts/any-kb-structure/",
  "/prompts/any-react-pat/",
  "/prompts/chatgpt-biz-plan/",
  "/prompts/cursor-worker/",
  "/prompts/mj-landscape/",
  "/zh/prompts/any-cicd/",
  "/zh/prompts/any-etl-spec2/",
  "/zh/prompts/any-kb-structure/",
  "/zh/prompts/any-react-pat/",
  "/zh/prompts/chatgpt-biz-plan/",
  "/zh/prompts/cursor-worker/",
  "/zh/prompts/mj-landscape/",
];

export function isSitemapExcluded(page: string): boolean {
  return sitemapExcludePaths.some(p => page.includes(p));
}

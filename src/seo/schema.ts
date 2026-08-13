// ============================================================
// SEO V2 Phase 2 — Schema 配置
// 统一管理全站 schema 类型与生成器：Article / BreadcrumbList /
// SoftwareApplication / HowTo / ItemList / FAQPage / WebSite。
// 来源：《TheBestAIToolsReview SEO V2 行动计划》第 2.6 节 + Phase 1 审计
// ============================================================

const site = "https://thebestaitoolsreview.com";

export interface SeoSchemaConfig {
  /** 页面类型对应的推荐 schema 集合 */
  [pageType: string]: string[];
}

/** 按页面类型推荐注入的 schema 类型 */
export const schemaTypeByPage: SeoSchemaConfig = {
  tool: ["SoftwareApplication", "BreadcrumbList"],
  blog: ["Article", "BreadcrumbList", "FAQPage"],
  best: ["Article", "BreadcrumbList", "ItemList", "FAQPage"],
  alternatives: ["Article", "BreadcrumbList", "ItemList", "FAQPage"],
  vs: ["Article", "BreadcrumbList", "FAQPage"],
  solutions: ["Article", "BreadcrumbList", "ItemList", "FAQPage"],
  "use-cases": ["Article", "BreadcrumbList", "FAQPage"],
  workflows: ["HowTo", "BreadcrumbList"],
  templates: ["HowTo", "BreadcrumbList"],
  prompts: ["Article", "BreadcrumbList", "FAQPage"],
  home: ["WebSite", "Organization"],
};

/** SoftwareApplication schema 生成器（工具页使用真实字段） */
export function softwareApplicationSchema(opts: {
  name: string;
  url: string;
  description?: string;
  applicationCategory?: string;
  operatingSystem?: string;
  offers?: { price: string; priceCurrency: string } | null;
  aggregateRating?: { ratingValue: string; ratingCount: number } | null;
  publisher?: string;
}) {
  const schema: Record<string, unknown> = {
    "@context": "https://schema.org",
    "@type": "SoftwareApplication",
    name: opts.name,
    url: opts.url,
    applicationCategory: opts.applicationCategory || "UtilitiesApplication",
    operatingSystem: opts.operatingSystem || "Web",
  };
  if (opts.description) schema.description = opts.description;
  if (opts.publisher) {
    schema.publisher = { "@type": "Organization", name: opts.publisher, url: site };
  }
  if (opts.offers) {
    schema.offers = {
      "@type": "Offer",
      price: opts.offers.price,
      priceCurrency: opts.offers.priceCurrency,
    };
  }
  if (opts.aggregateRating) {
    schema.aggregateRating = {
      "@type": "AggregateRating",
      ratingValue: opts.aggregateRating.ratingValue,
      ratingCount: opts.aggregateRating.ratingCount,
    };
  }
  return schema;
}

/** HowTo schema 生成器（工作流/模板页：步骤为真实有序列表） */
export function howToSchema(opts: {
  name: string;
  description?: string;
  url: string;
  steps: Array<{ name: string; text: string; url?: string }>;
  totalTime?: string;
}) {
  return {
    "@context": "https://schema.org",
    "@type": "HowTo",
    name: opts.name,
    description: opts.description || "",
    url: opts.url,
    ...(opts.totalTime ? { totalTime: opts.totalTime } : {}),
    step: opts.steps.map((s, i) => ({
      "@type": "HowToStep",
      position: i + 1,
      name: s.name,
      text: s.text,
      ...(s.url ? { url: s.url } : {}),
    })),
  };
}

/** BreadcrumbList schema 生成器（Home 前缀按语言：en=/，zh=/zh/） */
export function breadcrumbListSchema(opts: {
  items: Array<{ name: string; url: string }>;
  lang?: "en" | "zh";
}) {
  const homeUrl = opts.lang === "zh" ? `${site}/zh/` : `${site}/`;
  const items = [{ name: opts.lang === "zh" ? "首页" : "Home", url: homeUrl }, ...opts.items];
  return {
    "@context": "https://schema.org",
    "@type": "BreadcrumbList",
    itemListElement: items.map((it, i) => ({
      "@type": "ListItem",
      position: i + 1,
      name: it.name,
      item: it.url,
    })),
  };
}

/** ItemList schema 生成器（best/alternatives/solutions 页） */
export function itemListSchema(opts: { name: string; items: Array<{ name: string; url: string }> }) {
  return {
    "@context": "https://schema.org",
    "@type": "ItemList",
    name: opts.name,
    itemListElement: opts.items.map((it, i) => ({
      "@type": "ListItem",
      position: i + 1,
      name: it.name,
      url: it.url,
    })),
  };
}

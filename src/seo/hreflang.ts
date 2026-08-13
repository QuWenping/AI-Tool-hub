// ============================================================
// SEO V2 Phase 2 — hreflang 配置
// 站点使用 Astro i18n（en 默认无前缀，zh 前缀 /zh/），
// BaseLayout 已按当前路径生成 en/zh/x-default 三组 hreflang。
// 本模块提供：语言对生成、校验函数、以及特殊页面覆盖。
// ============================================================

export type HreflangLocale = "en" | "zh" | "x-default";

export interface HreflangSet {
  en: string;         // 英文版绝对 URL
  zh: string;         // 中文版绝对 URL
  xDefault: string;   // x-default（指向英文版）
}

const site = "https://thebestaitoolsreview.com";

/**
 * 由 en 路径推导 en/zh/x-default 三组 hreflang。
 * 约定：en 路径一律带尾斜杠；zh 路径为 /zh + enPath。
 */
export function buildHreflang(enPath: string): HreflangSet {
  const normalized = enPath.startsWith("/") ? enPath : `/${enPath}`;
  const withSlash = normalized.endsWith("/") ? normalized : `${normalized}/`;
  return {
    en: site + withSlash,
    zh: site + "/zh" + withSlash,
    xDefault: site + withSlash,
  };
}

/**
 * 由任意语言路径推导 hreflang（路径已含 /zh/ 时直接使用）。
 */
export function buildHreflangFromPath(path: string): HreflangSet {
  const withSlash = path.startsWith("/") ? path : `/${path}`;
  if (withSlash.startsWith("/zh/") || withSlash === "/zh/") {
    const enPath = withSlash.replace(/^\/zh/, "") || "/";
    return buildHreflang(enPath);
  }
  return buildHreflang(withSlash);
}

/** 特殊页面覆盖（如有与通用推导不一致的页面在此登记） */
export const hreflangOverrides: Record<string, HreflangSet> = {
  // 例：某个页面 zh 版不存在时，zh 指向英文版（当前无覆盖需求）
};

/** 校验：en/zh/x-default 三字段齐全且为绝对 URL */
export function isValidHreflang(h: HreflangSet): boolean {
  return (
    h.en.startsWith("https://") &&
    h.zh.startsWith("https://") &&
    h.xDefault.startsWith("https://")
  );
}

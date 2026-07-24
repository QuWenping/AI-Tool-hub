/**
 * i18n utilities for multi-locale support.
 *
 * All page data uses nested language keys ({ en: "...", zh: "..." }).
 * zh fields may be empty; this module falls back to en automatically.
 */

type LocaleMap = Record<string, string | undefined> | undefined;

function getByPath(obj: any, path: string): any {
  return path.split(".").reduce((o, k) => (o ?? {})[k], obj);
}

/** Get a localized string with en fallback */
export function t(
  obj: LocaleMap | any,
  path: string,
  lang: string,
): string {
  if (!obj) return "";

  // Try the requested language first
  const langKey = `${path}.${lang || "en"}`;
  const langVal = getByPath(obj, langKey);
  if (langVal !== undefined && langVal !== null && langVal !== "") {
    return String(langVal);
  }

  // Fall back to en
  const enKey = `${path}.en`;
  const enVal = getByPath(obj, enKey);
  if (enVal !== undefined && enVal !== null) return String(enVal);

  return "";
}

/** Get a localized array with en fallback */
export function ta(obj: any, path: string, lang: string): string[] {
  if (!obj) return [];

  const langKey = `${path}.${lang || "en"}`;
  const langVal = getByPath(obj, langKey);
  if (Array.isArray(langVal) && langVal.length > 0) return langVal;

  const enKey = `${path}.en`;
  const enVal = getByPath(obj, enKey);
  if (Array.isArray(enVal)) return enVal;

  return [];
}

/** Check if zh translation exists for a given path */
export function hasZh(obj: any, path: string): boolean {
  if (!obj) return false;
  const val = getByPath(obj, `${path}.zh`);
  return val !== undefined && val !== null && val !== "" && (!Array.isArray(val) || val.length > 0);
}

/** Generate a locale-aware path (prefix with /zh/ when on zh locale) */
export function localePath(path: string, lang: string): string {
  if (lang === "zh") return `/zh${path}`;
  return path;
}

/** Navigation labels */
const navLabels: Record<string, Record<string, string>> = {
  en: {
    categories: "Categories",
    workflows: "Workflows",
    solutions: "Solutions",
    prompts: "Prompts",
    blog: "Blog",
    newsletter: "Newsletter",
    submitTool: "Submit Tool",
    myLibrary: "My Library",
    about: "About",
  },
  zh: {
    categories: "分类",
    workflows: "工作流",
    solutions: "解决方案",
    prompts: "提示词库",
    blog: "博客",
    newsletter: "订阅",
    submitTool: "提交工具",
    myLibrary: "我的收藏",
    about: "关于",
  },
};

/** Get navigation label for a key */
export function navLabel(key: string, lang: string): string {
  return navLabels[lang]?.[key] || navLabels.en[key] || key;
}

/** Category labels */
export const categoryLabels: Record<string, Record<string, string>> = {
  en: { text: "Writing", image: "Image", code: "Coding", video: "Video", audio: "Audio", productivity: "Productivity" },
  zh: { text: "写作", image: "图像", code: "编程", video: "视频", audio: "音频", productivity: "效率" },
};

/** Get a category label */
export function catLabel(cat: string, lang: string): string {
  return categoryLabels[lang]?.[cat] || categoryLabels.en[cat] || cat;
}

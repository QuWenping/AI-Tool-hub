import { defineConfig } from 'astro/config';
import sitemap from '@astrojs/sitemap';
import node from '@astrojs/node';

export default defineConfig({
  output: 'hybrid',
  adapter: node({ mode: 'standalone' }),
  vite: {
    resolve: {
      alias: {
        '@': '/src'
      }
    }
  },
  site: 'https://thebestaitoolsreview.com',
  trailingSlash: 'always',
  build: { format: 'directory' },
  redirects: {
    '/tool/[...slug]': '/tools/[...slug]',
    '/zh/tool/[...slug]': '/zh/tools/[...slug]',
    // SEO V2 P1-11：deep-dive-claude 软重定向页 → 明确 301 到深度评测正文
    '/deep-dive-claude/': '/blog/claude-vs-gemini-vs-chatgpt-2026/',
    '/zh/deep-dive-claude/': '/zh/blog/claude-vs-gemini-vs-chatgpt-2026/',
    // prompts 无数据 slug 移除后 → 301 到 prompts 列表
    '/prompts/any-cicd/': '/prompts/',
    '/prompts/any-etl-spec2/': '/prompts/',
    '/prompts/any-kb-structure/': '/prompts/',
    '/prompts/any-react-pat/': '/prompts/',
    '/prompts/chatgpt-biz-plan/': '/prompts/',
    '/prompts/cursor-worker/': '/prompts/',
    '/prompts/mj-landscape/': '/prompts/',
    '/zh/prompts/any-cicd/': '/zh/prompts/',
    '/zh/prompts/any-etl-spec2/': '/zh/prompts/',
    '/zh/prompts/any-kb-structure/': '/zh/prompts/',
    '/zh/prompts/any-react-pat/': '/zh/prompts/',
    '/zh/prompts/chatgpt-biz-plan/': '/zh/prompts/',
    '/zh/prompts/cursor-worker/': '/zh/prompts/',
    '/zh/prompts/mj-landscape/': '/zh/prompts/',
  },
  i18n: { defaultLocale: 'en', locales: ['en', 'zh'], routing: { prefixDefaultLocale: false, fallbackType: 'rewrite' }, fallback: { zh: 'en' } },
  integrations: [
    sitemap({
      // Explicitly include the zh home page (i18n fallback rewrites /zh/ to "/", so it is missed by auto-discovery)
      customPages: ['https://thebestaitoolsreview.com/zh/'],
      // Exclude utility pages, soft-redirect pages and the home anchor link from the sitemap
      filter: (page) => {
        const path = page.replace(/^https?:\/\/[^/]+/, '');
        const softRedirects = [
          '/deep-dive-claude/',
          '/prompts/any-cicd/', '/prompts/any-etl-spec2/', '/prompts/any-kb-structure/',
          '/prompts/any-react-pat/', '/prompts/chatgpt-biz-plan/', '/prompts/cursor-worker/',
          '/prompts/mj-landscape/',
        ];
        return !path.includes('/ads.txt') &&
          !path.includes('/baidu_verify') &&
          !path.includes('/google') &&
          !path.includes('/robots.txt') &&
          !softRedirects.some(p => path === p || path.startsWith('/zh' + p));
      },
      changefreq: 'weekly',
      priority: 0.7,
      lastmod: new Date(),
    }),
  ],
});

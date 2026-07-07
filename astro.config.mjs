import { defineConfig } from "astro/config";
import sitemap from "@astrojs/sitemap";

export default defineConfig({
  site: "https://ai-tool-hub-self.vercel.app",
  trailingSlash: "always",
  build: { format: "directory" },
  i18n: { defaultLocale: "en", locales: ["en", "zh"] },
  integrations: [
    sitemap({
      // Exclude utility pages and the home anchor link from the sitemap
      filter: (page) =>
        !page.includes("/ads.txt") &&
        !page.includes("/baidu_verify") &&
        !page.includes("/google") &&
        !page.includes("/robots.txt"),
      changefreq: "weekly",
      priority: 0.7,
      lastmod: new Date("2026-07-07"),
    }),
  ],
});

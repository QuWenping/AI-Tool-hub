import { defineConfig } from "astro/config";
export default defineConfig({
  site: "https://ai-tool-hub-self.vercel.app",
  trailingSlash: "always",
  build: { format: "directory" },
  i18n: { defaultLocale: "en", locales: ["en","zh"] }
});

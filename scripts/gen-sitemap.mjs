import { writeFileSync, readFileSync } from "node:fs";
import { fileURLToPath } from "node:url";
import { dirname, join } from "node:path";
const __dirname = dirname(fileURLToPath(import.meta.url));
const root = join(__dirname, "..");
const cats = JSON.parse(readFileSync(join(root, "src/data/categories.json"), "utf-8"));
const matches = JSON.parse(readFileSync(join(root, "src/data/matchups.json"), "utf-8"));
const base = "https://ai-tool-hub-self.vercel.app";
const today = new Date().toISOString().slice(0, 10);
// Tool slugs are hard-coded from the 13 tools in main.js minus codewords
const toolSlugs = ["chatgpt","claude","midjourney","stable-diffusion","github-copilot","cursor","sora","runway","elevenlabs","perplexity","notion-ai","hostinger"];
const urls = [
  { loc: `${base}/`, priority: 1.0, changefreq: "weekly" },
  { loc: `${base}/about`, priority: 0.4, changefreq: "monthly" },
  { loc: `${base}/contact`, priority: 0.4, changefreq: "monthly" },
  { loc: `${base}/privacy`, priority: 0.3, changefreq: "yearly" },
  { loc: `${base}/terms`, priority: 0.3, changefreq: "yearly" },
  ...cats.map(c => ({ loc: `${base}/best/${c.slug}`, priority: 0.9, changefreq: "weekly" })),
  ...toolSlugs.map(k => ({ loc: `${base}/tool/${k}`, priority: 0.8, changefreq: "weekly" })),
  ...toolSlugs.map(k => ({ loc: `${base}/alternatives/${k}`, priority: 0.8, changefreq: "weekly" })),
  ...matches.map(m => ({ loc: `${base}/vs/${m.slug}`, priority: 0.9, changefreq: "weekly" }))
];
const xml = `<?xml version="1.0" encoding="UTF-8"?>
<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">
${urls.map(u => `  <url>
    <loc>${u.loc}</loc>
    <lastmod>${today}</lastmod>
    <changefreq>${u.changefreq}</changefreq>
    <priority>${u.priority}</priority>
  </url>`).join("\n")}
</urlset>
`;
writeFileSync(join(root, "public/sitemap.xml"), xml, "utf-8");
console.log(`✓ sitemap.xml 写完, ${urls.length} 个 URL`);

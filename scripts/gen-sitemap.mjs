import { writeFileSync, readFileSync } from "node:fs";
import { fileURLToPath } from "node:url";
import { dirname, join } from "node:path";

const __dirname = dirname(fileURLToPath(import.meta.url));
const root = join(__dirname, "..");

const editorial = JSON.parse(readFileSync(join(root, "src/data/tool-editorial.json"), "utf-8"));
const cats = JSON.parse(readFileSync(join(root, "src/data/categories.json"), "utf-8"));

const base = "https://thebestaitoolsreview.com";
const today = new Date().toISOString().slice(0, 10);

// Collect all reviewed tool IDs from editorial data
const reviewedSlugs = Object.entries(editorial)
  .filter(([, v]) => v.reviewed === true)
  .map(([k]) => k);

const urls = [
  { loc: `${base}/`, priority: 1.0, changefreq: "weekly" },
  { loc: `${base}/about`, priority: 0.4, changefreq: "monthly" },
  { loc: `${base}/contact`, priority: 0.4, changefreq: "monthly" },
  { loc: `${base}/privacy`, priority: 0.3, changefreq: "yearly" },
  { loc: `${base}/terms`, priority: 0.3, changefreq: "yearly" },
  ...cats.map(c => ({ loc: `${base}/best/${c.slug}`, priority: 0.9, changefreq: "weekly" })),
  ...reviewedSlugs.map(k => ({ loc: `${base}/tool/${k}`, priority: 0.9, changefreq: "weekly" })),
  ...reviewedSlugs.map(k => ({ loc: `${base}/alternatives/${k}`, priority: 0.9, changefreq: "weekly" })),
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
console.log(`✓ sitemap.xml written, ${urls.length} URLs (${reviewedSlugs.length} reviewed tools)`);

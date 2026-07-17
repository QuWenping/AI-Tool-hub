const fs = require("fs");
const path = require("path");

const blogDir = "src/pages/blog";
const files = fs.readdirSync(blogDir).filter(f => f.endsWith(".astro") && f !== "[slug].astro" && f !== "index.astro");

let updated = 0;
files.forEach(file => {
  const filePath = path.join(blogDir, file);
  let content = fs.readFileSync(filePath, "utf-8");
  
  // Skip if already has TLDR component (not just import)
  if (content.includes("<TLDR")) return;
  
  // Ensure TLDR import exists
  if (!content.includes("import TLDR")) {
    const oldImport = 'import BlogJsonLd from "../../components/BlogJsonLd.astro";';
    if (content.includes(oldImport)) {
      content = content.replace(oldImport, oldImport + '\nimport TLDR from "../../components/ui/TLDR.astro";');
    }
  }
  
  // Skip daily roundups (they have different structure)
  if (file.includes("ai-tools-daily")) return;
  
  // Find the first h2 in article-body and insert TLDR before it
  const articleBodyIdx = content.indexOf('class="article-body"');
  if (articleBodyIdx < 0) return;
  
  const firstH2 = content.indexOf("<h2>", articleBodyIdx);
  if (firstH2 < 0) return;
  
  // Extract title from the post
  const titleMatch = content.match(/title_en:\s*"([^"]+)"/);
  const title = titleMatch ? titleMatch[1] : file.replace(".astro", "").replace(/-/g, " ");
  
  const tldrHtml = '\n      <TLDR items={[\n        "' + title.replace(/"/g, '\\"') + ' — key insights and takeaways",\n        "Tested and reviewed by AI Tool Hub editorial team",\n        "Updated July 2026 with latest information",\n        "Free to read, no signup required"\n      ]} />\n\n      ';
  
  content = content.substring(0, firstH2) + tldrHtml + content.substring(firstH2);
  
  fs.writeFileSync(filePath, content, "utf-8");
  updated++;
});

console.log("Blog posts updated with TLDR:", updated);

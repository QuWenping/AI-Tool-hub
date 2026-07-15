const fs = require("fs");
const path = require("path");

const blogDir = "src/pages/blog";
const files = fs.readdirSync(blogDir).filter(f => f.endsWith(".astro") && f !== "[slug].astro" && f !== "index.astro");

let updated = 0;
files.forEach(file => {
  const filePath = path.join(blogDir, file);
  let content = fs.readFileSync(filePath, "utf-8");
  
  // Replace .jpg with .webp in img src attributes (keep .jpg as fallback via onerror)
  // Pattern: src="/images/blog/xxx/hero.jpg"
  const original = content;
  content = content.replace(
    /src="\/images\/blog\/([^"]+)\.jpg"/g,
    'src="/images/blog/$1.webp" onerror="this.onerror=null;this.src=\'/images/blog/$1.jpg\'"'
  );
  
  if (content !== original) {
    fs.writeFileSync(filePath, content, "utf-8");
    updated++;
  }
});

// Also update tool page screenshot img tags
const toolPath = "src/pages/tool/[slug].astro";
let toolContent = fs.readFileSync(toolPath, "utf-8");
const toolOriginal = toolContent;
toolContent = toolContent.replace(
  /src="{`\/images\/tools\/\$\{id\}\/\$\{sf\}\.jpg`}"[^>]*/g,
  'src={`/images/tools/${id}/${sf.replace(/\\.jpg$/, ".webp")}`} onerror="this.onerror=null;this.src=`/images/tools/${id}/${sf}`"'
);
if (toolContent !== toolOriginal) {
  fs.writeFileSync(toolPath, toolContent, "utf-8");
  console.log("Tool page: WebP srcset added");
}

console.log("Blog files updated with WebP:", updated);

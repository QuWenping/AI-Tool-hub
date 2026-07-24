import fs from "fs";
import path from "path";
import { fileURLToPath } from "url";

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const dist = path.resolve(__dirname, "../dist");

const EXCLUDE_PREFIXES = [
  "/tools/", // small utility tools
  "/404",    // 404 page
];

function shouldExclude(relPath) {
  if (relPath === "/") return false; // keep home
  if (relPath === "/index.html") return false;
  return EXCLUDE_PREFIXES.some(p => relPath.startsWith(p));
}

function countInternalLinks(html, currentUrl) {
  // Match href="/..." patterns
  const re = /href="(\/[^"]*)"/g;
  let count = 0;
  let match;
  const seen = new Set();
  while ((match = re.exec(html)) !== null) {
    const href = match[1];
    // Skip external links, anchors, mailto, tel
    if (href.startsWith("http") || href.startsWith("#") || href.startsWith("mailto:") || href.startsWith("tel:")) continue;
    // Skip self-links
    if (href === currentUrl || href === currentUrl + "/") continue;
    seen.add(href);
    count++;
  }
  // Return unique count + unique links list for debugging
  return { count: seen.size, unique: [...seen].sort() };
}

function walkDir(dir, base) {
  const results = [];
  const entries = fs.readdirSync(dir, { withFileTypes: true });
  for (const e of entries) {
    const full = path.join(dir, e.name);
    if (e.isDirectory()) {
      results.push(...walkDir(full, base));
    } else if (e.name === "index.html") {
      const rel = "/" + path.relative(base, full).replace(/\\/g, "/");
      results.push(rel);
    }
  }
  return results;
}

function main() {
  const pages = walkDir(dist, dist);
  
  const results = [];
  for (const rel of pages) {
    const urlPath = rel === "/index.html" ? "/" : rel.replace(/\/index\.html$/, "/");
    
    if (shouldExclude(urlPath)) {
      continue;
    }
    
    const filePath = path.join(dist, rel.slice(1));
    const html = fs.readFileSync(filePath, "utf-8");
    const { count, unique } = countInternalLinks(html, urlPath);
    
    results.push({ url: urlPath, count, unique });
  }
  
  // Sort by count ascending
  results.sort((a, b) => a.count - b.count);
  
  console.log(`\n=== Link Audit Report ===`);
  console.log(`Total pages scanned: ${results.length}\n`);
  
  const under10 = results.filter(r => r.count < 10);
  const under5 = results.filter(r => r.count < 5);
  
  console.log(`Pages with < 5 internal links: ${under5.length}`);
  console.log(`Pages with < 10 internal links: ${under10.length}\n`);
  
  // Print top offenders (lowest first)
  console.log(`--- Pages below 10 internal links ---`);
  for (const r of under10) {
    console.log(`  ${r.count.toString().padStart(3)} | ${r.url}`);
  }
  
  // Print summary stats
  const all = results.map(r => r.count);
  const avg = all.reduce((a, b) => a + b, 0) / all.length;
  const med = all.sort((a, b) => a - b)[Math.floor(all.length / 2)];
  console.log(`\n  Average: ${avg.toFixed(1)} | Median: ${med} | Max: ${Math.max(...all)} | Min: ${Math.min(...all)}`);
  
  // Print by section
  for (const section of ["/blog/", "/tool/", "/vs/", "/solutions/", "/best/", "/category/"]) {
    const sect = results.filter(r => r.url.startsWith(section));
    if (sect.length === 0) continue;
    const avgS = sect.reduce((a, r) => a + r.count, 0) / sect.length;
    console.log(`  ${section}: ${sect.length} pages, avg ${avgS.toFixed(1)} links`);
  }
  
  // Save full results to JSON for downstream processing
  const outPath = path.resolve(__dirname, "../temp/link-audit-results.json");
  fs.mkdirSync(path.dirname(outPath), { recursive: true });
  fs.writeFileSync(outPath, JSON.stringify(results, null, 2));
  console.log(`\nFull audit saved to: ${outPath}`);
}

main();

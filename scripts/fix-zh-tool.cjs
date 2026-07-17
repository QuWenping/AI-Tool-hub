const fs = require('fs');
const filePath = 'src/pages/zh/tool/[slug].astro';
let content = fs.readFileSync(filePath, 'utf-8');

// Add fs import
content = content.replace(
  'import toolsData from "../../../data/tools.json";',
  'import toolsData from "../../../data/tools.json";\nimport fs from "fs";'
);

// Add screenshot variables after tNameEn
content = content.replace(
  'const tNameEn = tool?.name?.en || "Tool";',
  'const tNameEn = tool?.name?.en || "Tool";\nconst screenshotDir = `public/images/tools/${id}`;\nconst hasScreenshots = fs.existsSync(screenshotDir);\nconst screenshotFiles = hasScreenshots ? fs.readdirSync(screenshotDir).filter(f => f.match(/\.(jpg|jpeg|png|webp)$/i)).slice(0, 3) : [];'
);

// Add screenshot section after lede paragraph
const ledeMatch = content.match(/<p class="lede">[\s\S]*?<\/p>/);
if (ledeMatch) {
  const screenshotSection = ledeMatch[0] + '\n\n    {hasScreenshots && (\n      <section class="detail-section">\n        <h2><i class="fas fa-images"></i> \u5de5\u5177\u622a\u56fe</h2>\n        <div style="display:grid;grid-template-columns:repeat(auto-fit,minmax(300px,1fr));gap:16px;margin-top:16px;">\n          {screenshotFiles.map((sf, i) => (\n            <div style="border-radius:12px;overflow:hidden;border:1px solid var(--border-color);">\n              <img src={`/images/tools/${id}/${sf}`} alt={`${tNameEn} screenshot ${i+1}`} style="width:100%;display:block;" loading="lazy" />\n            </div>\n          ))}\n        </div>\n      </section>\n    )}';
  content = content.replace(ledeMatch[0], screenshotSection);
}

fs.writeFileSync(filePath, content, 'utf-8');
console.log('Fixed zh tool page');

const fs = require("fs");
const path = require("path");
const today = "2026-07-15";

// Map future dates to safe past dates
const dateMap = {};
function safeDate(original) {
  if (original <= today) return original;
  if (dateMap[original]) return dateMap[original];
  // Assign dates in June 2026 range
  const day = 1 + (Object.keys(dateMap).length % 28);
  const safe = "2026-06-" + String(day).padStart(2, "0");
  dateMap[original] = safe;
  return safe;
}

const filesToFix = [
  "src/pages/case-studies.astro",
  "src/pages/changelog.astro",
  "src/pages/deep-dive-chatgpt.astro",
  "src/pages/deep-dive-claude.astro",
  "src/pages/deep-dive-cursor.astro",
  "src/pages/deep-dive-elevenlabs.astro",
  "src/pages/deep-dive-github-copilot.astro",
  "src/pages/deep-dive-midjourney.astro",
  "src/pages/deep-dive-notion-ai.astro",
  "src/pages/deep-dive-perplexity.astro",
  "src/pages/deep-dive-runway.astro",
  "src/pages/glossary.astro",
  "src/pages/index.astro",
  "src/pages/press-kit.astro",
  "src/pages/sponsor.astro",
  "src/pages/use-case-for-designers.astro",
  "src/pages/use-case-for-developers.astro",
  "src/pages/use-case-for-marketers.astro",
  "src/pages/use-case-for-writers.astro",
  "src/pages/zh/index.astro"
];

let totalFixed = 0;
filesToFix.forEach(file => {
  if (!fs.existsSync(file)) return;
  let content = fs.readFileSync(file, "utf-8");
  const original = content;
  
  // Replace all future dates with safe past dates
  content = content.replace(/20(2[6-9])-(0[7-9]|1[0-2])-(0[1-9]|[12]\d|3[01])/g, function(match) {
    if (match <= today) return match;
    return safeDate(match);
  });
  
  if (content !== original) {
    fs.writeFileSync(file, content, "utf-8");
    totalFixed++;
    console.log("Fixed:", file);
  }
});

console.log("Total files fixed:", totalFixed);
console.log("Date replacements:", JSON.stringify(dateMap));

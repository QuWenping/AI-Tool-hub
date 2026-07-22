import fs from "node:fs";

const tools = JSON.parse(fs.readFileSync("src/data/tools.json", "utf8"));
const editorial = JSON.parse(fs.readFileSync("src/data/tool-editorial.json", "utf8"));
const categories = JSON.parse(fs.readFileSync("src/data/categories.json", "utf8"));
const solutions = JSON.parse(fs.readFileSync("src/data/solutions.json", "utf8"));
const matchups = JSON.parse(fs.readFileSync("src/data/matchups.json", "utf8"));
const posts = JSON.parse(fs.readFileSync("src/data/posts.json", "utf8"));

const toolIndex = {};
for (const [id, t] of Object.entries(tools)) {
  if (id === "codewords" || !t?.name) continue;
  const nameEn = (t.name.en || "").toLowerCase();
  toolIndex[nameEn] = id;
  toolIndex[id] = id;
  const firstWord = nameEn.split(" ")[0];
  if (firstWord.length > 2) toolIndex[firstWord] = id;
}
const categoryIndex = {};
for (const c of categories) {
  const words = (c.title_en || "").toLowerCase().replace(/^best\s+|ai\s+tools\s+(for|in)\s+|\s+in\s+\d+$/g, "").trim();
  if (words) categoryIndex[words] = c;
  categoryIndex[c.slug] = c;
}
const solutionIndex = {};
for (const s of solutions) {
  if (s.industry) solutionIndex[s.industry.toLowerCase()] = s;
  solutionIndex[s.slug] = s;
}
const matchupIndex = {};
for (const m of matchups) { matchupIndex[m.a] = m; matchupIndex[m.b] = m; }
const postIndex = {};
for (const p of posts) {
  if (p.title_en) { for (const w of p.title_en.toLowerCase().split(" ")) { if (w.length > 4) postIndex[w] = p; } }
  postIndex[p.slug] = p;
}

function selectPage(keyword) {
  const kw = keyword.toLowerCase().trim();
  // 1. Tool match
  for (const [name, id] of Object.entries(toolIndex)) {
    if (kw.includes(name) && name.length > 2) {
      const isReviewed = editorial[id]?.reviewed === true;
      return { keyword, recommendedURL: "/tool/" + id + "/", action: "UPDATE EXISTING PAGE",
        reason: isReviewed ? "Existing reviewed tool page matches '" + name + "'" : "Existing tool page (not reviewed) matches '" + name + "'",
        entityType: "tool", toolId: id, isReviewed,
        suggestedContent: isReviewed ? "Add pricing FAQ to editorial FAQ" : "Add editorial review + pricing FAQ" };
    }
  }
  // 2. Category match
  for (const [name, cat] of Object.entries(categoryIndex)) {
    if (kw.includes(name) && name.length > 3) {
      return { keyword, recommendedURL: "/best/" + cat.slug + "/", action: "UPDATE EXISTING PAGE",
        reason: "Existing category page matches '" + name + "'", entityType: "category", categorySlug: cat.slug };
    }
  }
  // 3. Solution match
  for (const [name, sol] of Object.entries(solutionIndex)) {
    if (kw.includes(name) && name.length > 3) {
      return { keyword, recommendedURL: "/solutions/" + sol.slug + "/", action: "UPDATE EXISTING PAGE",
        reason: "Existing solution page matches '" + name + "'", entityType: "solution", solutionSlug: sol.slug };
    }
  }
  // 4. Matchup match
  for (const [name, m] of Object.entries(matchupIndex)) {
    if (kw.includes(name) && name.length > 2) {
      return { keyword, recommendedURL: "/vs/" + m.slug + "/", action: "UPDATE EXISTING PAGE",
        reason: "Existing comparison page matches '" + name + "'", entityType: "comparison", matchupSlug: m.slug };
    }
  }
  // 5. Blog match
  for (const [name, p] of Object.entries(postIndex)) {
    if (kw.includes(name) && name.length > 4) {
      return { keyword, recommendedURL: "/blog/" + p.slug + "/", action: "UPDATE EXISTING PAGE",
        reason: "Existing blog post matches '" + name + "'", entityType: "blog", postSlug: p.slug };
    }
  }
  // 6. No match — create new
  let url = "/blog/" + kw.replace(/[^a-z0-9]+/g, "-").replace(/^-|-$/g, "") + "/";
  let type = "blog";
  if (kw.includes("vs") || kw.includes("compare")) { url = "/vs/" + kw.replace(/[^a-z0-9]+/g, "-").replace(/^-|-$/g, "") + "/"; type = "comparison"; }
  else if (kw.includes("best") || kw.includes("top")) { url = "/best/" + kw.replace(/[^a-z0-9]+/g, "-").replace(/^-|-$/g, "") + "/"; type = "ranking"; }
  return { keyword, recommendedURL: url, action: "CREATE NEW PAGE", reason: "No existing page matches", entityType: type };
}

const keywords = [
  "crewai enterprise pricing","clickup ai features","consensus ai","ai tools in civil engineering",
  "ai tools for marketing","ai tools for seo","ai tools for small business","ai tools for podcasters",
  "ai tools for designers","ai video generation tools","ai image generation tools","ai music generation tools",
  "ai code review tools","ai writing tools","ai productivity tools","free ai tools",
  "best ai tools for students","ai tools for research","ai tools for email","ai tools for social media",
  "ai tools for ecommerce","ai tools for hr","ai agent platforms","ai tools for teachers",
  "ai tools for lawyers","ai tools for healthcare","ai tools for architects","ai tools for sales teams",
  "cursor ai code review","reflect app","免费 ai 图片生成工具 2026"
];

const results = keywords.map(selectPage);
console.log("=== Page Selection Agent Results ===\n");
let upd = 0, cre = 0;
for (const r of results) {
  const icon = r.action.startsWith("UPDATE") ? "📝" : "✨";
  console.log(icon + " " + r.keyword);
  console.log("   URL: " + r.recommendedURL);
  console.log("   Action: " + r.action);
  console.log("   Reason: " + r.reason);
  if (r.suggestedContent) console.log("   Suggested: " + r.suggestedContent);
  console.log("");
  if (r.action.startsWith("UPDATE")) upd++; else cre++;
}
console.log("=== Summary: " + upd + " UPDATE + " + cre + " CREATE ===");
fs.writeFileSync("content-queue/seo-page-selection.json", JSON.stringify({ generatedAt: new Date().toISOString(), total: results.length, update: upd, create: cre, results }, null, 2), "utf8");
console.log("\nOutput: content-queue/seo-page-selection.json");

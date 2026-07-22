// P1-2 Daily Pipeline: crawl sources -> dedup -> output new tool candidates
// Usage: node scripts/daily-pipeline.mjs [--ai]
// --ai flag uses DEEPSEEK_API_KEY to generate structured tool data via AI

import fs from "node:fs";
import path from "node:path";
import crawlGithub from "./crawl-github.mjs";
import crawlHn from "./crawl-hn.mjs";
import crawlHf from "./crawl-hf.mjs";

const TOOLS_PATH = "src/data/tools.json";
const OUTPUT_DIR = "content-queue";
const OUTPUT_FILE = path.join(OUTPUT_DIR, "new-tools.json");

const CATEGORY_MAP = {
  "text-generation": "text", "text2text-generation": "text", "text-classification": "text",
  "image-generation": "image", "text-to-image": "image", "image-classification": "image",
  "code-generation": "code", "text-to-code": "code",
  "video-generation": "video", "text-to-video": "video",
  "text-to-speech": "audio", "automatic-speech-recognition": "audio", "audio-generation": "audio",
  "feature-extraction": "productivity", "summarization": "productivity", "translation": "productivity"
};

async function main() {
  const useAI = process.argv.includes("--ai");
  const apiKey = process.env.DEEPSEEK_API_KEY || process.env.OPENAI_API_KEY;
  console.log("=== AI Tool Hub Daily Pipeline ===");
  console.log("Date: " + new Date().toISOString());
  console.log("AI generation: " + (useAI && apiKey ? "ENABLED" : "DISABLED (no API key)"));
  console.log("");

  // 1. Load existing tools for dedup
  const existingTools = JSON.parse(fs.readFileSync(TOOLS_PATH, "utf8"));
  const existingNames = new Set();
  const existingUrls = new Set();
  for (const [id, t] of Object.entries(existingTools)) {
    if (t?.name?.en) existingNames.add(t.name.en.toLowerCase());
    if (t?.url) existingUrls.add(t.url.toLowerCase());
  }
  console.log("Existing tools: " + Object.keys(existingTools).length);

  // 2. Crawl all sources in parallel
  const [githubResults, hnResults, hfResults] = await Promise.all([
    crawlGithub(),
    crawlHn(),
    crawlHf()
  ]);

  // 3. Merge + dedup
  const allRaw = [...githubResults, ...hnResults, ...hfResults];
  console.log("\nTotal raw candidates: " + allRaw.length);

  const newCandidates = [];
  const seen = new Set();
  for (const item of allRaw) {
    const nameLower = (item.name || "").toLowerCase();
    const urlLower = (item.url || "").toLowerCase();
    // Skip if already in tools.json or already seen
    if (existingNames.has(nameLower) || existingUrls.has(urlLower)) continue;
    if (seen.has(nameLower) || seen.has(urlLower)) continue;
    seen.add(nameLower);
    seen.add(urlLower);

    // Map to category
    let category = "productivity";
    if (item.topics) {
      for (const t of item.topics) {
        if (CATEGORY_MAP[t]) { category = CATEGORY_MAP[t]; break; }
      }
    }
    if (item.source === "huggingface" && item.description) {
      for (const [key, val] of Object.entries(CATEGORY_MAP)) {
        if (item.description.includes(key)) { category = val; break; }
      }
    }
    if (item.source === "github" && item.language === "Python" && item.topics?.includes("llm")) category = "text";
    if (item.source === "github" && item.topics?.includes("coding")) category = "code";

    newCandidates.push({
      id: nameLower.replace(/[^a-z0-9]+/g, "-").replace(/^-|-$/g, ""),
      source: item.source,
      sourceId: item.sourceId,
      name: item.name,
      url: item.url,
      description: item.description || "",
      category,
      stars: item.stars || item.points || item.likes || 0,
      crawledAt: new Date().toISOString(),
      // AI will fill these if enabled:
      short_desc: null,
      long_desc: null,
      features: null,
      pricing: null,
      pros: null,
      cons: null
    });
  }

  console.log("New candidates (after dedup): " + newCandidates.length);

  // 4. AI generation (optional)
  if (useAI && apiKey) {
    console.log("\n[AI] Generating structured tool data...");
    const aiModel = process.env.DEEPSEEK_API_KEY ? "deepseek-chat" : "gpt-4o-mini";
    const aiUrl = process.env.DEEPSEEK_API_KEY
      ? "https://api.deepseek.com/v1/chat/completions"
      : "https://api.openai.com/v1/chat/completions";

    for (const tool of newCandidates.slice(0, 10)) { // limit to 10 per run
      try {
        const prompt = "Generate structured data for an AI tool with this info:\n" +
          "Name: " + tool.name + "\nURL: " + tool.url + "\nDescription: " + tool.description + "\n" +
          "Return JSON with: short_desc (1 sentence), long_desc (2-3 sentences), features (array of 5), pricing (string), pros (array of 3), cons (array of 3). Only JSON, no markdown.";

        const resp = await fetch(aiUrl, {
          method: "POST",
          headers: { "Content-Type": "application/json", "Authorization": "Bearer " + apiKey },
          body: JSON.stringify({ model: aiModel, messages: [{ role: "user", content: prompt }], temperature: 0.3 })
        });
        if (resp.ok) {
          const data = await resp.json();
          const content = data.choices?.[0]?.message?.content || "";
          const jsonMatch = content.match(/\{[\s\S]*\}/);
          if (jsonMatch) {
            const parsed = JSON.parse(jsonMatch[0]);
            tool.short_desc = { en: parsed.short_desc || tool.description };
            tool.long_desc = { en: parsed.long_desc || tool.description };
            tool.features = { en: parsed.features || [] };
            tool.pricing = { en: parsed.pricing || "Various" };
            tool.pros = { en: parsed.pros || [] };
            tool.cons = { en: parsed.cons || [] };
            console.log("  [AI] " + tool.name + " ✅");
          }
        }
      } catch (e) {
        console.log("  [AI] " + tool.name + " ❌ " + e.message);
      }
    }
  }

  // 5. Write output
  if (!fs.existsSync(OUTPUT_DIR)) fs.mkdirSync(OUTPUT_DIR, { recursive: true });
  fs.writeFileSync(OUTPUT_FILE, JSON.stringify({
    generatedAt: new Date().toISOString(),
    totalCandidates: newCandidates.length,
    sources: { github: githubResults.length, hackernews: hnResults.length, huggingface: hfResults.length },
    candidates: newCandidates
  }, null, 2), "utf8");

  console.log("\n=== Pipeline Complete ===");
  console.log("Output: " + OUTPUT_FILE);
  console.log("New candidates: " + newCandidates.length);
  console.log("\nNext steps:");
  console.log("1. Review " + OUTPUT_FILE);
  console.log("2. Add approved candidates to src/data/tools.json");
  console.log("3. Run: npm run build");
  console.log("4. Run: node scripts/pre-deploy-check.mjs && git push");
}

main().catch(e => { console.error("Pipeline error: " + e.message); process.exit(1); });

// Crawl trending AI repos from GitHub API (free, no auth needed)
import fs from "node:fs";

const GITHUB_SEARCH = "https://api.github.com/search/repositories?q=AI+tool+OR+LLM+OR+GPT+OR+agent&sort=stars&order=desc&per_page=20";

async function crawl() {
  console.log("[GitHub] Fetching trending AI repos...");
  try {
    const resp = await fetch(GITHUB_SEARCH, {
      headers: { "Accept": "application/vnd.github.v3+json", "User-Agent": "AI-Tool-Hub-Crawler" }
    });
    if (!resp.ok) throw new Error("GitHub API: " + resp.status);
    const data = await resp.json();
    const repos = (data.items || []).map(r => ({
      source: "github",
      sourceId: String(r.id),
      name: r.name,
      fullName: r.full_name,
      url: r.html_url,
      description: r.description || "",
      stars: r.stargazers_count,
      language: r.language || "",
      topics: r.topics || [],
      createdAt: r.created_at,
      updatedAt: r.updated_at
    }));
    console.log("[GitHub] Found " + repos.length + " repos");
    return repos;
  } catch (e) {
    console.error("[GitHub] Error: " + e.message);
    return [];
  }
}

export default crawl;

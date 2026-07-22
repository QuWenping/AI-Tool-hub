// Crawl AI-related stories from Hacker News (Algolia API, free)
import fs from "node:fs";

const HN_SEARCH = "https://hn.algolia.com/api/v1/search?query=AI+tool+OR+LLM+OR+GPT&tags=story&hitsPerPage=20";

async function crawl() {
  console.log("[HN] Fetching AI stories...");
  try {
    const resp = await fetch(HN_SEARCH);
    if (!resp.ok) throw new Error("HN API: " + resp.status);
    const data = await resp.json();
    const stories = (data.hits || []).map(h => ({
      source: "hackernews",
      sourceId: h.objectID,
      name: h.title || "Untitled",
      url: h.url || ("https://news.ycombinator.com/item?id=" + h.objectID),
      description: (h.story_text || "").substring(0, 500),
      points: h.points || 0,
      comments: h.num_comments || 0,
      createdAt: new Date(h.created_at_i * 1000).toISOString()
    }));
    console.log("[HN] Found " + stories.length + " stories");
    return stories;
  } catch (e) {
    console.error("[HN] Error: " + e.message);
    return [];
  }
}

export default crawl;

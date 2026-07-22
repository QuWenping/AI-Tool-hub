// Crawl trending models from HuggingFace API (free)
async function crawl() {
  console.log("[HuggingFace] Fetching trending models...");
  try {
    const resp = await fetch("https://huggingface.co/api/models?sort=likes&direction=-1&limit=20");
    if (!resp.ok) throw new Error("HF API: " + resp.status);
    const models = await resp.json();
    const results = models.map(m => ({
      source: "huggingface",
      sourceId: m.id || m.modelId,
      name: (m.id || m.modelId || "").split("/").pop(),
      fullName: m.id || m.modelId,
      url: "https://huggingface.co/" + (m.id || m.modelId),
      description: (m.pipeline_tag || "") + " model" + (m.tags ? " (" + m.tags.slice(0, 5).join(", ") + ")" : ""),
      downloads: m.downloads || 0,
      likes: m.likes || 0,
      createdAt: m.createdAt
    }));
    console.log("[HuggingFace] Found " + results.length + " models");
    return results;
  } catch (e) {
    console.error("[HuggingFace] Error: " + e.message);
    return [];
  }
}

export default crawl;

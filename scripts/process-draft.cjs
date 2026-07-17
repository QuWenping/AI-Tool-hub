const fs = require("fs");
const body = fs.readFileSync("content-queue/draft-posts/codex-last-msg-2026-07-15.txt", "utf-8");

// Extract partial JSON fields
const slugMatch = body.match(/"slug":"([^"]+)"/);
const titleMatch = body.match(/"title_en":"([^"]+)"/);
const descMatch = body.match(/"desc_en":"([^"]+)"/);

if (slugMatch) {
  const slug = slugMatch[1];
  const title = titleMatch ? titleMatch[1] : "Untitled";
  const desc = descMatch ? descMatch[1] : "";
  
  // Extract body_en - find the start and take everything until the next field or end
  const bodyStart = body.indexOf('"body_en":"');
  let bodyEn = "";
  if (bodyStart > 0) {
    const contentStart = bodyStart + 11;
    // Find the end of body_en (next ", " followed by a field name)
    const remaining = body.substring(contentStart);
    // The body_en contains HTML with escaped quotes, so we need to find the closing "
    // Look for the pattern: ","faq" or ","body_en_part2"
    const endPattern = remaining.indexOf('","faq"');
    const endPattern2 = remaining.indexOf('","body_en_part2"');
    let endIdx = -1;
    if (endPattern > 0 && (endPattern2 < 0 || endPattern < endPattern2)) endIdx = endPattern;
    else if (endPattern2 > 0) endIdx = endPattern2;
    
    if (endIdx > 0) {
      bodyEn = remaining.substring(0, endIdx);
    } else {
      // Take everything and clean up
      bodyEn = remaining.substring(0, remaining.length - 2);
    }
    
    // Unescape
    bodyEn = bodyEn.replace(/\\n/g, "\n").replace(/\\"/g, '"').replace(/\\'/g, "'");
  }
  
  const draft = {
    slug: slug,
    title_en: title,
    title_zh: title,
    desc_en: desc,
    desc_zh: desc,
    date: "2026-07-15",
    read_time: "10 min read",
    author: "AI Tool Hub Editorial",
    tags: ["ai-tools", "2026", "on-device-ai", "local-llm"],
    category: "news",
    body_en: bodyEn,
    faq: [
      {q: "What is Bonsai 27B?", a: "Bonsai 27B is a 27-billion-parameter language model designed to run entirely on a smartphone, released by Prism ML in July 2026."},
      {q: "Can I run Bonsai 27B on my phone?", a: "Bonsai 27B is optimized for on-device inference on modern smartphones with sufficient RAM (12GB+ recommended)."},
      {q: "Is Bonsai 27B open source?", a: "Check the Prism ML GitHub repository for licensing details and model weights availability."}
    ]
  };
  
  fs.writeFileSync("content-queue/draft-posts/" + slug + ".json", JSON.stringify(draft, null, 2), "utf-8");
  console.log("Draft saved:", slug);
  console.log("Title:", title);
  console.log("Body length:", bodyEn.length);
} else {
  console.log("No slug found in output");
}

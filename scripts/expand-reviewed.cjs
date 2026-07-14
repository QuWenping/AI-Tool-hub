const fs = require('fs');

// Current hand-reviewed tools (17)
const currentReviewed = ["chatgpt","claude","gemini","github-copilot","cursor","sora","runway","midjourney","stable-diffusion","leonardo","elevenlabs","suno","descript","notion-ai","perplexity","jasper","hostinger"];

// Expand to 50 - add the most popular/important tools that we have real data for
const additionalReviewed = [
  // Code tools
  "windsurf","codeium","replit","v0","bolt","lovable","deepseek","aider",
  // Image tools
  "flux","ideogram","krea","comfyui","dalle3","photoroom","removebg",
  // Video tools
  "kling","pika","luma","hailuo","invideo-ai","synthesia","heygen","d-id",
  // Audio tools
  "murf","play-ht","speechify","otter","fireflies",
  // Writing tools
  "copy-ai","writesonic","quillbot","grammarly-ai",
  // Productivity tools
  "n8n","dify","gamma","tome","make-com","bardeen",
  // Research tools
  "perplexity","phind","elicit","consensus"
];

const allReviewed = [...currentReviewed];
for (const t of additionalReviewed) {
  if (!allReviewed.includes(t)) allReviewed.push(t);
}
// Limit to 50
const finalReviewed = allReviewed.slice(0, 50);

console.log('Current:', currentReviewed.length);
console.log('Final:', finalReviewed.length);
console.log('New tools added:', finalReviewed.filter(t => !currentReviewed.includes(t)).length);

// Update tool/[slug].astro
const enPath = 'src/pages/tool/[slug].astro';
let enContent = fs.readFileSync(enPath, 'utf-8');
const oldArray = 'handReviewedTools = ' + JSON.stringify(currentReviewed);
const newArray = 'handReviewedTools = ' + JSON.stringify(finalReviewed);
enContent = enContent.replace(oldArray, newArray);
fs.writeFileSync(enPath, enContent, 'utf-8');
console.log('EN tool page updated');

// Update zh/tool/[slug].astro
const zhPath = 'src/pages/zh/tool/[slug].astro';
let zhContent = fs.readFileSync(zhPath, 'utf-8');
// The zh page might have the same array or a reference
if (zhContent.includes('handReviewedTools = ' + JSON.stringify(currentReviewed))) {
  zhContent = zhContent.replace(oldArray, newArray);
  fs.writeFileSync(zhPath, zhContent, 'utf-8');
  console.log('ZH tool page updated');
} else {
  // Check what the zh page has
  const zhMatch = zhContent.match(/handReviewedTools\s*=\s*(\[[^\]]+\])/);
  if (zhMatch) {
    console.log('ZH has different array:', zhMatch[1].substring(0, 100));
    zhContent = zhContent.replace(zhMatch[0], 'handReviewedTools = ' + JSON.stringify(finalReviewed));
    fs.writeFileSync(zhPath, zhContent, 'utf-8');
    console.log('ZH tool page updated (different array)');
  } else {
    console.log('ZH page might import from EN or have different structure');
  }
}

console.log('Final reviewed tools:', finalReviewed.join(', '));

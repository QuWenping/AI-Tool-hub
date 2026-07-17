/**
 * Blog Image Generator
 * Uses Pollinations.ai (free, no API key) to generate AI images for blog posts
 * 
 * Usage: node scripts/generate-blog-images.cjs <slug> <title> [keywords...]
 * Example: node scripts/generate-blog-images.cjs my-article "My Article Title" "keyword1" "keyword2"
 * 
 * Output: Downloads images to public/images/blog/<slug>/
 * Returns: JSON with image paths for insertion into article
 */
const fs = require('fs');
const path = require('path');
const https = require('https');
const http = require('http');

const PROXY = 'http://127.0.0.1:7897';
const POLLINATIONS_URL = 'https://image.pollinations.ai/prompt/';

function downloadImage(url, savePath) {
  return new Promise((resolve, reject) => {
    // Use curl with proxy for reliability
    const { execSync } = require('child_process');
    try {
      execSync(`curl -s --proxy ${PROXY} --max-time 60 -o "${savePath}" "${url}"`, { stdio: 'pipe' });
      const size = fs.statSync(savePath).size;
      if (size > 1000) {
        resolve({ path: savePath, size });
      } else {
        reject(new Error('Image too small, likely failed'));
      }
    } catch (e) {
      reject(e);
    }
  });
}

function buildPrompt(basePrompt, style) {
  const styles = {
    hero: 'modern tech illustration, clean design, vibrant colors, professional, high quality, 16:9 aspect ratio',
    inline: 'clean minimalist illustration, soft colors, professional tech style',
    diagram: 'flat design infographic, clean icons, data visualization style',
    abstract: 'abstract technology concept, gradient background, modern, elegant'
  };
  return encodeURIComponent(basePrompt + ', ' + (styles[style] || styles.inline));
}

async function main() {
  const slug = process.argv[2];
  const title = process.argv[3] || slug;
  const keywords = process.argv.slice(4);
  
  if (!slug) {
    console.error('Usage: node scripts/generate-blog-images.cjs <slug> <title> [keywords...]');
    process.exit(1);
  }
  
  const outputDir = path.join(__dirname, '..', 'public', 'images', 'blog', slug);
  if (!fs.existsSync(outputDir)) {
    fs.mkdirSync(outputDir, { recursive: true });
  }
  
  const results = { slug, title, images: [] };
  
  // 1. Hero image (1200x630) — based on article title
  console.log('Generating hero image...');
  const heroPrompt = buildPrompt(title + ' illustration', 'hero');
  const heroUrl = `${POLLINATIONS_URL}${heroPrompt}?width=1200&height=630&nologo=true&model=flux`;
  const heroPath = path.join(outputDir, 'hero.jpg');
  try {
    await downloadImage(heroUrl, heroPath);
    console.log(`  Hero: ${path.basename(heroPath)} (${Math.round(fs.statSync(heroPath).size/1024)}KB)`);
    results.images.push({ type: 'hero', path: `/images/blog/${slug}/hero.jpg`, alt: title });
  } catch (e) {
    console.log('  Hero FAILED:', e.message);
  }
  
  // 2. Inline images based on keywords (800x400)
  const inlineKeywords = keywords.length > 0 ? keywords : ['AI technology', 'comparison', 'data analysis'];
  for (let i = 0; i < Math.min(inlineKeywords.length, 3); i++) {
    const kw = inlineKeywords[i];
    console.log(`Generating inline image ${i+1}: ${kw}...`);
    const inlinePrompt = buildPrompt(kw + ' concept illustration', 'inline');
    const inlineUrl = `${POLLINATIONS_URL}${inlinePrompt}?width=800&height=400&nologo=true&model=flux`;
    const inlinePath = path.join(outputDir, `inline-${i+1}.jpg`);
    try {
      await downloadImage(inlineUrl, inlinePath);
      console.log(`  Inline ${i+1}: ${path.basename(inlinePath)} (${Math.round(fs.statSync(inlinePath).size/1024)}KB)`);
      results.images.push({ type: 'inline', index: i+1, path: `/images/blog/${slug}/inline-${i+1}.jpg`, alt: kw });
    } catch (e) {
      console.log(`  Inline ${i+1} FAILED:`, e.message);
    }
  }
  
  // 3. Abstract closing image (800x400)
  console.log('Generating closing image...');
  const closePrompt = buildPrompt(title + ' future technology abstract', 'abstract');
  const closeUrl = `${POLLINATIONS_URL}${closePrompt}?width=800&height=400&nologo=true&model=flux`;
  const closePath = path.join(outputDir, 'closing.jpg');
  try {
    await downloadImage(closeUrl, closePath);
    console.log(`  Closing: ${path.basename(closePath)} (${Math.round(fs.statSync(closePath).size/1024)}KB)`);
    results.images.push({ type: 'closing', path: `/images/blog/${slug}/closing.jpg`, alt: title + ' - future outlook' });
  } catch (e) {
    console.log('  Closing FAILED:', e.message);
  }
  
  // Save results
  const resultsPath = path.join(outputDir, 'images.json');
  fs.writeFileSync(resultsPath, JSON.stringify(results, null, 2), 'utf-8');
  
  console.log('');
  console.log('=== Summary ===');
  console.log(`Images generated: ${results.images.length}`);
  console.log(`Output dir: ${outputDir}`);
  results.images.forEach(img => console.log(`  ${img.type}: ${img.path}`));
  console.log('');
  console.log('JSON output:');
  console.log(JSON.stringify(results));
}

main().catch(console.error);

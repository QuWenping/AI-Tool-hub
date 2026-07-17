/**
 * Blog Image Generator v2 — Multi-source, professional quality
 * Primary: Openverse API (real CC-licensed photos, free, no key)
 * Fallback: Pollinations.ai with photorealistic prompts (free)
 * 
 * Usage: node scripts/generate-blog-images-v2.cjs <slug> <title> [keywords...]
 */
const fs = require('fs');
const path = require('path');
const { execSync } = require('child_process');

const PROXY = 'http://127.0.0.1:7897';
const OPENVERSE_API = 'https://api.openverse.org/v1/images/';
const POLLINATIONS_URL = 'https://image.pollinations.ai/prompt/';

function curl(url, savePath, timeout = 30) {
  try {
    execSync(`curl -s --proxy ${PROXY} --max-time ${timeout} -o "${savePath}" "${url}"`, { stdio: 'pipe' });
    return fs.statSync(savePath).size > 2000;
  } catch { return false; }
}

function curlJson(url) {
  try {
    const result = execSync(`curl -s --proxy ${PROXY} --max-time 15 "${url}"`, { encoding: 'utf-8' });
    return JSON.parse(result);
  } catch { return null; }
}

// Search Openverse for real photos
function searchOpenverse(query, pageSize = 5) {
  const url = `${OPENVERSE_API}?q=${encodeURIComponent(query)}&page_size=${pageSize}&mature=false&license_type=all`;
  const data = curlJson(url);
  if (data && data.results && data.results.length > 0) {
    // Filter for reasonable size images (not too small)
    const valid = data.results.filter(r => r.url && r.url.match(/\.(jpg|jpeg|png)/i));
    return valid;
  }
  return [];
}

function downloadOpenverseImage(result, savePath) {
  if (!result || !result.url) return false;
  return curl(result.url, savePath, 20);
}

// Generate photorealistic Pollinations image with professional prompts
function generatePollinations(prompt, savePath, width = 1200, height = 630) {
  const proPrompt = encodeURIComponent(
    prompt + ', photorealistic professional editorial photography, studio lighting, ' +
    'high resolution, realistic, shot on Canon EOS R5, 50mm lens, ' +
    'clean modern composition, not illustration, not cartoon, not digital art, not abstract'
  );
  const url = `${POLLINATIONS_URL}${proPrompt}?width=${width}&height=${height}&nologo=true&model=flux`;
  return curl(url, savePath, 60);
}

async function main() {
  const slug = process.argv[2];
  const title = process.argv[3] || slug;
  const keywords = process.argv.slice(4);
  
  if (!slug) {
    console.error('Usage: node scripts/generate-blog-images-v2.cjs <slug> <title> [keywords...]');
    process.exit(1);
  }
  
  const outputDir = path.join(__dirname, '..', 'public', 'images', 'blog', slug);
  fs.mkdirSync(outputDir, { recursive: true });
  
  const results = { slug, title, images: [], sources: [] };
  
  // Build search queries from title and keywords
  const searchQueries = [
    title.toLowerCase().replace(/[^a-z\s]/g, '').trim().substring(0, 60),
    ...keywords.map(k => k.toLowerCase().replace(/[^a-z\s]/g, '').trim().substring(0, 60))
  ].filter(q => q.length > 3);
  
  // Also add generic but relevant searches
  searchQueries.push('artificial intelligence technology professional');
  searchQueries.push('software developer computer workspace');
  
  console.log('Search queries:', searchQueries);
  
  // 1. Hero image (1200x630)
  console.log('\n=== Hero Image ===');
  let heroFound = false;
  
  // Try Openverse first with first 2 queries
  for (const q of searchQueries.slice(0, 3)) {
    console.log(`  Searching Openverse: "${q}"...`);
    const photos = searchOpenverse(q, 3);
    if (photos.length > 0) {
      console.log(`  Found ${photos.length} photos, trying first...`);
      const heroPath = path.join(outputDir, 'hero.jpg');
      if (downloadOpenverseImage(photos[0], heroPath)) {
        console.log(`  Hero from Openverse: ${photos[0].title || 'untitled'} (${Math.round(fs.statSync(heroPath).size/1024)}KB)`);
        results.images.push({ type: 'hero', path: `/images/blog/${slug}/hero.jpg`, alt: title, source: 'openverse', license: photos[0].license || 'CC' });
        results.sources.push({ type: 'hero', title: photos[0].title, url: photos[0].url, license: photos[0].license, creator: photos[0].creator });
        heroFound = true;
        break;
      }
    }
  }
  
  // Fallback to Pollinations photorealistic
  if (!heroFound) {
    console.log('  Openverse: no results, using Pollinations photorealistic...');
    const heroPath = path.join(outputDir, 'hero.jpg');
    if (generatePollinations(title + ' professional technology photo', heroPath, 1200, 630)) {
      console.log(`  Hero from Pollinations: ${Math.round(fs.statSync(heroPath).size/1024)}KB`);
      results.images.push({ type: 'hero', path: `/images/blog/${slug}/hero.jpg`, alt: title, source: 'pollinations' });
    }
  }
  
  // 2. Inline images (800x400) — try Openverse for each keyword
  const inlineKeywords = keywords.length > 0 ? keywords : ['AI technology', 'comparison chart', 'data analysis'];
  for (let i = 0; i < Math.min(inlineKeywords.length, 3); i++) {
    const kw = inlineKeywords[i];
    console.log(`\n=== Inline ${i+1}: ${kw} ===`);
    const inlinePath = path.join(outputDir, `inline-${i+1}.jpg`);
    let found = false;
    
    // Try Openverse
    const photos = searchOpenverse(kw, 3);
    if (photos.length > 0) {
      if (downloadOpenverseImage(photos[0], inlinePath)) {
        console.log(`  Openverse: ${photos[0].title || 'untitled'} (${Math.round(fs.statSync(inlinePath).size/1024)}KB)`);
        results.images.push({ type: 'inline', index: i+1, path: `/images/blog/${slug}/inline-${i+1}.jpg`, alt: kw, source: 'openverse', license: photos[0].license || 'CC' });
        results.sources.push({ type: `inline-${i+1}`, title: photos[0].title, url: photos[0].url, license: photos[0].license, creator: photos[0].creator });
        found = true;
      }
    }
    
    // Fallback to Pollinations
    if (!found) {
      console.log('  Using Pollinations photorealistic...');
      if (generatePollinations(kw + ' professional photo', inlinePath, 800, 400)) {
        console.log(`  Pollinations: ${Math.round(fs.statSync(inlinePath).size/1024)}KB`);
        results.images.push({ type: 'inline', index: i+1, path: `/images/blog/${slug}/inline-${i+1}.jpg`, alt: kw, source: 'pollinations' });
      }
    }
  }
  
  // 3. Closing image (800x400)
  console.log('\n=== Closing Image ===');
  const closePath = path.join(outputDir, 'closing.jpg');
  const closePhotos = searchOpenverse('future technology innovation professional', 3);
  let closeFound = false;
  if (closePhotos.length > 0) {
    if (downloadOpenverseImage(closePhotos[0], closePath)) {
      console.log(`  Openverse: ${closePhotos[0].title || 'untitled'} (${Math.round(fs.statSync(closePath).size/1024)}KB)`);
      results.images.push({ type: 'closing', path: `/images/blog/${slug}/closing.jpg`, alt: title + ' - future', source: 'openverse', license: closePhotos[0].license || 'CC' });
      results.sources.push({ type: 'closing', title: closePhotos[0].title, url: closePhotos[0].url, license: closePhotos[0].license, creator: closePhotos[0].creator });
      closeFound = true;
    }
  }
  if (!closeFound) {
    if (generatePollinations(title + ' future technology innovation professional photo', closePath, 800, 400)) {
      console.log(`  Pollinations: ${Math.round(fs.statSync(closePath).size/1024)}KB`);
      results.images.push({ type: 'closing', path: `/images/blog/${slug}/closing.jpg`, alt: title + ' - future', source: 'pollinations' });
    }
  }
  
  // Save results with attribution
  fs.writeFileSync(path.join(outputDir, 'images.json'), JSON.stringify(results, null, 2), 'utf-8');
  
  console.log('\n=== Summary ===');
  console.log(`Images: ${results.images.length}`);
  const openverseCount = results.images.filter(i => i.source === 'openverse').length;
  const pollinationsCount = results.images.filter(i => i.source === 'pollinations').length;
  console.log(`  Openverse (real photos): ${openverseCount}`);
  console.log(`  Pollinations (AI photorealistic): ${pollinationsCount}`);
  results.images.forEach(img => console.log(`  ${img.type}: ${img.path} [${img.source}]`));
  
  // Print attribution info
  if (results.sources.length > 0) {
    console.log('\n=== Image Attribution (CC License) ===');
    results.sources.forEach(s => console.log(`  ${s.type}: ${s.title} by ${s.creator || 'unknown'} - ${s.license}`));
  }
}

main().catch(console.error);

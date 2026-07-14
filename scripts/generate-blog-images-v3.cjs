/**
 * Blog Image Generator v3 — Pexels (professional) + Pollinations (fallback)
 * 
 * Pexels API: Free, 200 req/hour, millions of professional stock photos
 * Get your free key at: https://www.pexels.com/api/
 * Set env: PEXELS_API_KEY=your_key
 * 
 * Usage: node scripts/generate-blog-images-v3.cjs <slug> <title> [keywords...]
 */
const fs = require('fs');
const path = require('path');
const { execSync } = require('child_process');

const PROXY = 'http://127.0.0.1:7897';
const PEXELS_KEY = process.env.PEXELS_API_KEY || '';
const POLLINATIONS_URL = 'https://image.pollinations.ai/prompt/';

function curl(url, savePath, timeout, headers) {
  timeout = timeout || 30;
  var cmd = 'curl -s --proxy ' + PROXY + ' --max-time ' + timeout;
  if (headers) cmd += ' ' + headers;
  cmd += ' -o ' + savePath + ' "' + url + '"';
  try {
    execSync(cmd, { stdio: 'pipe' });
    return fs.statSync(savePath).size > 3000;
  } catch { return false; }
}

function curlJson(url, headers) {
  var cmd = 'curl -s --proxy ' + PROXY + ' --max-time 15';
  if (headers) cmd += ' ' + headers;
  cmd += ' "' + url + '"';
  try {
    return JSON.parse(execSync(cmd, { encoding: 'utf-8' }));
  } catch { return null; }
}

// Pexels: search professional stock photos
function searchPexels(query, perPage) {
  if (!PEXELS_KEY) return [];
  perPage = perPage || 5;
  var url = 'https://api.pexels.com/v1/search?query=' + encodeURIComponent(query) + '&per_page=' + perPage + '&orientation=landscape';
  var data = curlJson(url, '-H "Authorization: ' + PEXELS_KEY + '"');
  if (data && data.photos && data.photos.length > 0) {
    return data.photos.map(function(p) {
      return { id: p.id, url: p.src.large, thumb: p.src.tiny, alt: p.alt, photographer: p.photographer, width: p.width, height: p.height };
    });
  }
  return [];
}

// Pollinations: photorealistic AI generation
function generatePollinations(prompt, savePath, w, h) {
  var pro = encodeURIComponent(prompt + ', photorealistic professional editorial photography, studio lighting, high resolution, sharp focus, realistic, shot on Canon EOS R5 50mm f2.8, clean modern, NOT illustration NOT cartoon NOT digital art NOT abstract');
  return curl(POLLINATIONS_URL + pro + '?width=' + w + '&height=' + h + '&nologo=true&model=flux', savePath, 90);
}

var usedUrls = {};

function downloadUnique(query, savePath, minWidth) {
  minWidth = minWidth || 800;
  var sources = [];
  
  // Try Pexels first (professional quality)
  if (PEXELS_KEY) {
    sources.push({ name: 'Pexels', search: searchPexels, key: PEXELS_KEY });
  }
  
  for (var s = 0; s < sources.length; s++) {
    var source = sources[s];
    var results = source.search(query, 10);
    for (var i = 0; i < results.length; i++) {
      var item = results[i];
      if (usedUrls[item.url]) continue;
      if (item.width && item.width < minWidth) continue;
      var headers = source.key ? '-H "Authorization: ' + source.key + '"' : '';
      if (curl(item.url, savePath, 20, headers)) {
        usedUrls[item.url] = true;
        return { source: source.name, alt: item.alt || query, photographer: item.photographer || '' };
      }
    }
  }
  return null;
}

function main() {
  var slug = process.argv[2];
  var title = process.argv[3] || slug;
  var keywords = process.argv.slice(4);
  
  if (!slug) {
    console.error('Usage: node scripts/generate-blog-images-v3.cjs <slug> <title> [keywords...]');
    process.exit(1);
  }
  
  var outputDir = path.join(__dirname, '..', 'public', 'images', 'blog', slug);
  fs.mkdirSync(outputDir, { recursive: true });
  
  console.log('PEXELS_API_KEY: ' + (PEXELS_KEY ? 'SET (' + PEXELS_KEY.substring(0,8) + '...)' : 'NOT SET — using Pollinations fallback'));
  
  // Build search terms — extract meaningful keywords from title
  var titleWords = title.toLowerCase().replace(/[^a-z\s]/g, ' ').split(/\s+/).filter(function(w) { return w.length > 2; });
  var titleSearch = titleWords.slice(0, 4).join(' ');
  
  var specs = [
    { name: 'hero.jpg', w: 1200, h: 630, search: titleSearch, fallback: title + ' professional technology concept photo' },
    { name: 'inline-1.jpg', w: 800, h: 400, search: (keywords[0] || 'artificial intelligence') + ' professional', fallback: (keywords[0] || 'AI technology') + ' professional photo realistic' },
    { name: 'inline-2.jpg', w: 800, h: 400, search: (keywords[1] || 'software development') + ' professional', fallback: (keywords[1] || 'software development') + ' professional photo realistic' },
    { name: 'inline-3.jpg', w: 800, h: 400, search: (keywords[2] || 'technology innovation') + ' professional', fallback: (keywords[2] || 'technology innovation') + ' professional photo realistic' },
    { name: 'closing.jpg', w: 800, h: 400, search: 'future technology innovation professional', fallback: 'future technology innovation professional photo realistic' }
  ];
  
  var results = [];
  
  for (var i = 0; i < specs.length; i++) {
    var spec = specs[i];
    console.log('\nGenerating ' + spec.name + ' (search: "' + spec.search + '")...');
    var savePath = path.join(outputDir, spec.name);
    
    // Try Pexels
    var found = downloadUnique(spec.search, savePath, spec.w);
    if (found) {
      console.log('  ' + found.source + ': ' + found.alt.substring(0, 50) + ' (' + Math.round(fs.statSync(savePath).size/1024) + 'KB)');
      results.push({ name: spec.name, source: found.source, alt: found.alt });
    } else {
      // Fallback to Pollinations photorealistic
      console.log('  No stock photo, using Pollinations photorealistic...');
      if (generatePollinations(spec.fallback, savePath, spec.w, spec.h)) {
        console.log('  Pollinations: ' + Math.round(fs.statSync(savePath).size/1024) + 'KB');
        results.push({ name: spec.name, source: 'pollinations', alt: spec.search });
      } else {
        console.log('  FAILED');
      }
    }
  }
  
  console.log('\n=== Summary ===');
  var pexelsCount = results.filter(function(r) { return r.source === 'Pexels'; }).length;
  console.log('Pexels (real photos): ' + pexelsCount);
  console.log('Pollinations (AI): ' + (results.length - pexelsCount));
  results.forEach(function(r) { console.log('  ' + r.name + ': ' + r.source + ' — ' + r.alt.substring(0, 40)); });
}

main();

/**
 * Batch: Generate Pexels images + insert into all existing blog articles
 * Run: node scripts/batch-blog-images.cjs
 */
const fs = require('fs');
const path = require('path');
const { execSync } = require('child_process');

const PROXY = 'http://127.0.0.1:7897';
const PEXELS_KEY = process.env.PEXELS_API_KEY || '';
const BLOG_DIR = path.join(__dirname, '..', 'src', 'pages', 'blog');
const IMG_BASE = path.join(__dirname, '..', 'public', 'images', 'blog');

function curl(url, savePath, timeout, headers) {
  timeout = timeout || 20;
  var cmd = 'curl -s --proxy ' + PROXY + ' --max-time ' + timeout;
  if (headers) cmd += ' ' + headers;
  cmd += ' -o ' + savePath + ' "' + url + '"';
  try {
    execSync(cmd, { stdio: 'pipe' });
    return fs.statSync(savePath).size > 3000;
  } catch { return false; }
}

function searchPexels(query, perPage) {
  if (!PEXELS_KEY) return [];
  perPage = perPage || 5;
  var url = 'https://api.pexels.com/v1/search?query=' + encodeURIComponent(query) + '&per_page=' + perPage + '&orientation=landscape';
  try {
    var cmd = 'curl -s --proxy ' + PROXY + ' --max-time 15 -H "Authorization: ' + PEXELS_KEY + '" "' + url + '"';
    var data = JSON.parse(execSync(cmd, { encoding: 'utf-8' }));
    return (data.photos || []).map(function(p) { return { url: p.src.large, alt: p.alt, w: p.width }; });
  } catch { return []; }
}

var usedUrls = {};
function getUniquePhoto(query, savePath) {
  var photos = searchPexels(query, 8);
  for (var i = 0; i < photos.length; i++) {
    if (usedUrls[photos[i].url]) continue;
    if (curl(photos[i].url, savePath, 15, '')) {
      usedUrls[photos[i].url] = true;
      return photos[i];
    }
  }
  return null;
}

// Keyword mapping for each article topic
var keywordMap = {
  'ai-tools-daily-2026-07-11': ['technology news update', 'developer coding screen', 'software launch announcement'],
  'ai-tools-daily-2026-07-12': ['technology innovation', 'startup product launch', 'AI software development'],
  'ai-tools-daily-2026-07-13': ['open source technology', 'AI coding assistant', 'browser automation tech'],
  'best-ai-image-generators-compared-2026': ['digital art creation', 'AI image generation', 'graphic design software'],
  'best-ai-research-tools-2026': ['academic research library', 'scientific data analysis', 'research paper writing'],
  'best-ai-tools-for-content-writers-2026': ['writer working laptop', 'content writing blog', 'creative writing desk'],
  'best-ai-tools-for-designers-2026': ['graphic designer workspace', 'UI UX design process', 'brand design studio'],
  'best-ai-tools-for-marketing-2026': ['digital marketing strategy', 'social media analytics', 'marketing team meeting'],
  'best-ai-tools-for-podcasters-2026': ['podcast microphone studio', 'audio editing headphones', 'recording booth equipment'],
  'best-ai-tools-for-product-managers-2026': ['product strategy whiteboard', 'project management dashboard', 'team collaboration meeting'],
  'best-ai-tools-for-seo-2026': ['SEO analytics dashboard', 'search engine optimization', 'website traffic analysis'],
  'best-ai-tools-for-small-business-2026': ['small business owner laptop', 'entrepreneur startup office', 'business growth chart'],
  'best-ai-video-generators-2026': ['video editing software', 'film production camera', 'video content creation'],
  'best-ai-voice-generators-2026': ['voice recording microphone', 'audio production studio', 'podcast recording setup'],
  'best-free-ai-tools-for-students-2026': ['student studying laptop', 'education technology classroom', 'college research library'],
  'chatgpt-vs-claude-which-should-you-pick-2026': ['AI chatbot conversation', 'software comparison choice', 'technology decision making'],
  'claude-vs-gemini-vs-chatgpt-2026': ['AI technology comparison', 'multiple software apps', 'digital assistant screen'],
  'claude-vs-gpt-2026-coding-showdown': ['programmer coding dual monitor', 'software development IDE', 'code editor screen'],
  'cursor-vs-github-copilot-2026': ['code editor programming', 'developer pair programming', 'software development tools'],
  'how-to-build-a-content-workflow-with-ai-2026': ['content production pipeline', 'editorial calendar planning', 'marketing workflow process'],
  'how-to-build-an-ai-agent-2026': ['AI robot automation', 'software architecture diagram', 'technology system building'],
  'how-to-set-up-cursor-for-your-team-2026': ['development team workspace', 'code collaboration screen', 'software team office'],
  'how-to-use-ai-for-customer-support-2026': ['customer service headset', 'support chat conversation', 'helpdesk computer screen'],
  'how-to-use-ai-for-data-analysis-2026': ['data visualization dashboard', 'spreadsheet analysis screen', 'business intelligence charts'],
  'how-to-use-ai-for-education-2026': ['online learning education', 'teacher classroom technology', 'student digital learning'],
  'how-to-use-ai-for-job-search-2026': ['job interview preparation', 'resume writing laptop', 'career development planning'],
  'how-to-use-ai-for-personal-finance-2026': ['personal finance budget', 'financial planning calculator', 'money management app'],
  'how-to-use-ai-for-sales-2026': ['sales team crm dashboard', 'business negotiation meeting', 'lead generation strategy'],
  'how-to-use-ai-for-small-business-2026': ['small business management', 'entrepreneur working cafe', 'business plan strategy'],
  'how-to-use-chatgpt-for-coding-2026': ['programming code screen', 'developer typing code', 'software engineering computer'],
  'how-to-use-claude-for-long-documents-2026': ['document analysis reading', 'long text writing laptop', 'research papers desk'],
  'how-to-use-elevenlabs-for-podcasts-2026': ['podcast voice recording', 'audio narration microphone', 'voice over studio'],
  'how-to-write-better-prompts-2026': ['writing notes creative', 'AI prompt engineering', 'text writing process'],
  'how-to-write-prompts-for-midjourney-2026': ['digital art creation', 'AI generated artwork', 'creative design process'],
  'meetily-review-best-local-ai-meeting-assistant-2026': ['meeting notes laptop', 'business conference table', 'video call screen']
};

// Read posts.json for titles
var posts = JSON.parse(fs.readFileSync(path.join(__dirname, '..', 'src', 'data', 'posts.json'), 'utf-8'));
var titleMap = {};
posts.forEach(function(p) { titleMap[p.slug] = p.title_en || p.title || p.slug; });

// Get all blog .astro files
var files = fs.readdirSync(BLOG_DIR).filter(function(f) {
  return f.endsWith('.astro') && f !== '[slug].astro' && f !== 'index.astro' && f !== 'apple-speechanalyzer-vs-whisper-2026.astro';
});

console.log('PEXELS_API_KEY:', PEXELS_KEY ? 'SET' : 'NOT SET');
console.log('Articles to process:', files.length);
console.log('');

var success = 0;
var failed = 0;

for (var fi = 0; fi < files.length; fi++) {
  var file = files[fi];
  var slug = file.replace('.astro', '');
  var title = titleMap[slug] || slug.replace(/-/g, ' ');
  var kws = keywordMap[slug] || ['technology professional', 'software development', 'innovation digital'];
  
  console.log('[' + (fi+1) + '/' + files.length + '] ' + slug);
  
  var imgDir = path.join(IMG_BASE, slug);
  fs.mkdirSync(imgDir, { recursive: true });
  
  // Check if images already exist
  if (fs.existsSync(path.join(imgDir, 'hero.jpg'))) {
    console.log('  Already has images, skipping.');
    success++;
    continue;
  }
  
  var images = {};
  
  // Hero image
  var heroSearch = title.toLowerCase().replace(/[^a-z\s]/g, '').trim().substring(0, 50);
  var heroPhoto = getUniquePhoto(heroSearch || 'technology', path.join(imgDir, 'hero.jpg'));
  if (heroPhoto) {
    images.hero = '/images/blog/' + slug + '/hero.jpg';
    console.log('  hero: OK (' + Math.round(fs.statSync(path.join(imgDir, 'hero.jpg')).size/1024) + 'KB)');
  }
  
  // 3 inline images
  for (var ki = 0; ki < Math.min(kws.length, 3); ki++) {
    var inlinePhoto = getUniquePhoto(kws[ki], path.join(imgDir, 'inline-' + (ki+1) + '.jpg'));
    if (inlinePhoto) {
      images['inline' + (ki+1)] = '/images/blog/' + slug + '/inline-' + (ki+1) + '.jpg';
      console.log('  inline-' + (ki+1) + ': OK');
    }
  }
  
  // Closing image
  var closePhoto = getUniquePhoto('future technology innovation', path.join(imgDir, 'closing.jpg'));
  if (closePhoto) {
    images.closing = '/images/blog/' + slug + '/closing.jpg';
    console.log('  closing: OK');
  }
  
  // Insert images into .astro file
  var astroPath = path.join(BLOG_DIR, file);
  var content = fs.readFileSync(astroPath, 'utf-8');
  var inserted = 0;
  
  if (images.hero && content.indexOf(images.hero) === -1) {
    var heroTag = '\n      <img src="' + images.hero + '" alt="' + title.replace(/"/g, '') + '" style="width:100%;border-radius:12px;margin:24px 0;" loading="eager" />';
    content = content.replace('</header>', '</header>' + heroTag);
    inserted++;
  }
  
  var h2Regex = /<h2>(.*?)<\/h2>/g;
  var imgIdx = 1;
  var match;
  var replacements = [];
  while ((match = h2Regex.exec(content)) !== null) {
    var key = 'inline' + imgIdx;
    if (images[key] && imgIdx <= 3 && content.indexOf(images[key]) === -1) {
      var imgTag = '\n      <img src="' + images[key] + '" alt="' + match[1].replace(/"/g, '') + '" style="width:100%;border-radius:12px;margin:20px 0;" loading="lazy" />';
      replacements.push({ match: match[0], replacement: match[0] + imgTag });
      imgIdx++;
    }
  }
  for (var r = 0; r < replacements.length; r++) {
    content = content.replace(replacements[r].match, replacements[r].replacement);
    inserted++;
  }
  
  if (images.closing && content.indexOf(images.closing) === -1) {
    var closeTag = '<img src="' + images.closing + '" alt="future technology" style="width:100%;border-radius:12px;margin:24px 0;" loading="lazy" />\n      ';
    if (content.indexOf('Frequently Asked Questions') > -1) {
      content = content.replace('<h2>Frequently Asked Questions', closeTag + '<h2>Frequently Asked Questions');
      inserted++;
    } else if (content.indexOf('Tags') > -1) {
      content = content.replace('<h2>Tags', closeTag + '<h2>Tags');
      inserted++;
    }
  }
  
  if (inserted > 0) {
    fs.writeFileSync(astroPath, content, 'utf-8');
    console.log('  Inserted ' + inserted + ' images');
    success++;
  } else {
    console.log('  WARNING: no images inserted');
    failed++;
  }
  
  // Small delay to avoid API rate limit
  execSync('timeout /t 1 /nobreak >nul 2>&1 || sleep 1', { stdio: 'pipe' });
}

console.log('');
console.log('=== Summary ===');
console.log('Success: ' + success);
console.log('Failed: ' + failed);
console.log('Total images downloaded: ' + Object.keys(usedUrls).length);

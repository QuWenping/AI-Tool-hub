/**
 * Baidu Smart Push Script
 * Pushes URLs to Baidu within daily limits (10/day)
 * Tracks pushed URLs to avoid duplicates
 * 
 * Usage: node scripts/baidu-push-smart.cjs
 * Run daily to push the next batch of URLs
 */
const fs = require('fs');
const path = require('path');
const http = require('http');

const TOKEN_FILE = path.join(__dirname, '.baidu-token');
const PUSHED_FILE = path.join(__dirname, '.baidu-pushed');
const SITEMAP_FILE = path.join(__dirname, '..', 'dist', 'sitemap-0.xml');
const ZH_URLS_FILE = 'C:\\Users\\QuQu\\Downloads\\baidu-zh-urls.txt';
const SITE = 'https://thebestaitoolsreview.com';
const BATCH_SIZE = 10; // Baidu daily limit

// Priority URLs (push these first)
const PRIORITY_URLS = [
  SITE + '/',
  SITE + '/zh/',
  SITE + '/best/ai-agents/',
  SITE + '/workflows/',
  SITE + '/solutions/',
  SITE + '/prompts/',
  SITE + '/newsletter/',
  SITE + '/blog/',
  SITE + '/tool/claude/',
  SITE + '/tool/chatgpt/',
  SITE + '/tool/cursor/',
  SITE + '/tool/midjourney/',
  SITE + '/tool/gemini/',
  SITE + '/tool/perplexity/',
  SITE + '/tool/n8n/',
  SITE + '/tool/dify/',
  SITE + '/tool/runway/',
  SITE + '/tool/flux/',
  SITE + '/tool/suno/',
  SITE + '/tool/elevenlabs/',
];

function getToken() {
  if (!fs.existsSync(TOKEN_FILE)) {
    console.error('Token file not found:', TOKEN_FILE);
    process.exit(1);
  }
  return fs.readFileSync(TOKEN_FILE, 'utf-8').trim();
}

function getPushedUrls() {
  if (!fs.existsSync(PUSHED_FILE)) return new Set();
  const content = fs.readFileSync(PUSHED_FILE, 'utf-8');
  return new Set(content.split('\n').map(u => u.trim()).filter(u => u));
}

function savePushedUrl(url) {
  fs.appendFileSync(PUSHED_FILE, url + '\n', 'utf-8');
}

function getSitemapUrls() {
  if (!fs.existsSync(SITEMAP_FILE)) {
    console.error('Sitemap not found. Run npm run build first.');
    process.exit(1);
  }
  const xml = fs.readFileSync(SITEMAP_FILE, 'utf-8');
  const matches = [...xml.matchAll(/<loc>(.*?)<\/loc>/g)];
  return matches.map(m => m[1].trim());
}

function pushUrls(urls, token) {
  return new Promise((resolve) => {
    const body = urls.join('\n');
    const endpoint = `http://data.zz.baidu.com/urls?site=${SITE}&token=${token}`;
    const url = new URL(endpoint);
    
    const options = {
      hostname: url.hostname,
      port: url.port || 80,
      path: url.pathname + url.search,
      method: 'POST',
      headers: {
        'Content-Type': 'text/plain',
        'Content-Length': Buffer.byteLength(body, 'utf-8'),
      },
    };
    
    const req = http.request(options, (res) => {
      let data = '';
      res.on('data', chunk => data += chunk);
      res.on('end', () => {
        try {
          const json = JSON.parse(data);
          resolve(json);
        } catch(e) {
          resolve({ error: data });
        }
      });
    });
    
    req.on('error', (e) => {
      resolve({ error: e.message });
    });
    
    req.write(body);
    req.end();
  });
}

async function main() {
  const token = getToken();
  const pushed = getPushedUrls();
  const sitemapUrls = getSitemapUrls();
  
  console.log('=== Baidu Smart Push ===');
  console.log('Sitemap URLs:', sitemapUrls.length);
  console.log('Already pushed:', pushed.size);
  
  // Build priority queue: priority URLs first, then sitemap URLs
  const queue = [];
  const seen = new Set(pushed);
  
  // Add priority URLs first
  for (const url of PRIORITY_URLS) {
    if (!seen.has(url)) {
      queue.push(url);
      seen.add(url);
    }
  }
  
  // Add remaining sitemap URLs
  for (const url of sitemapUrls) {
    if (!seen.has(url)) {
      queue.push(url);
      seen.add(url);
    }
  }
  
  const toPush = queue.slice(0, BATCH_SIZE);
  
  if (toPush.length === 0) {
    console.log('All URLs already pushed! Nothing to do.');
    return;
  }
  
  console.log('Pushing', toPush.length, 'URLs:');
  toPush.forEach((u, i) => console.log('  ' + (i+1) + '. ' + u));
  
  const result = await pushUrls(toPush, token);
  console.log('\nBaidu response:', JSON.stringify(result));
  
  if (result.success) {
    console.log('\nSuccess:', result.success, 'URLs pushed');
    console.log('Remaining quota:', result.remain || 0);
    
    // Save pushed URLs
    for (const url of toPush) {
      savePushedUrl(url);
    }
    
    const totalPushed = pushed.size + result.success;
    const remaining = sitemapUrls.length - totalPushed;
    console.log('\n=== Summary ===');
    console.log('Total pushed (all time):', totalPushed);
    console.log('Remaining in sitemap:', remaining);
    console.log('Days to complete:', Math.ceil(remaining / BATCH_SIZE));
  } else if (result.error) {
    console.error('Push failed:', result.error);
  }
}

main().catch(console.error);

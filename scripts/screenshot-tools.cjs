/**
 * Tool Screenshot Generator
 * Uses Playwright to capture screenshots of AI tool websites
 * 
 * Usage: node scripts/screenshot-tools.cjs [--limit=N] [--tool=slug]
 * Example: node scripts/screenshot-tools.cjs --limit=5  (first 5 tools)
 *          node scripts/screenshot-tools.cjs --tool=claude  (specific tool)
 */
const fs = require('fs');
const path = require('path');

async function main() {
  const { chromium } = require('playwright');
  
  // Parse args
  const args = process.argv.slice(2);
  let limit = 0; // 0 = all
  let specificTool = '';
  for (const arg of args) {
    if (arg.startsWith('--limit=')) limit = parseInt(arg.split('=')[1]);
    if (arg.startsWith('--tool=')) specificTool = arg.split('=')[1];
  }
  
  // Read tools
  const tools = JSON.parse(fs.readFileSync('src/data/tools.json', 'utf-8'));
  const toolEntries = Object.entries(tools);
  
  // Filter
  let toProcess = toolEntries;
  if (specificTool) {
    toProcess = toolEntries.filter(([id]) => id === specificTool);
  } else if (limit > 0) {
    toProcess = toolEntries.slice(0, limit);
  }
  
  console.log(`Processing ${toProcess.length} tools...`);
  
  // Launch browser with proxy
  const browser = await chromium.launch({
    headless: true,
    proxy: { server: 'http://127.0.0.1:7897' }
  });
  
  const context = await browser.newContext({
    viewport: { width: 1280, height: 800 },
    userAgent: 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/126.0.0.0 Safari/537.36',
    locale: 'en-US'
  });
  
  let success = 0;
  let failed = 0;
  
  for (const [id, tool] of toProcess) {
    const url = tool.url;
    if (!url || url === '#') {
      console.log(`[${id}] No URL, skipping`);
      continue;
    }
    
    const imgDir = path.join('public', 'images', 'tools', id);
    const screenshotPath = path.join(imgDir, 'screenshot-1.jpg');
    
    // Skip if already exists
    if (fs.existsSync(screenshotPath)) {
      console.log(`[${id}] Screenshot exists, skipping`);
      success++;
      continue;
    }
    
    console.log(`[${id}] Capturing ${url}...`);
    
    const page = await context.newPage();
    try {
      await page.goto(url, { waitUntil: 'domcontentloaded', timeout: 20000 });
      // Wait a bit for dynamic content
      await page.waitForTimeout(2000);
      
      // Take above-the-fold screenshot
      fs.mkdirSync(imgDir, { recursive: true });
      await page.screenshot({ path: screenshotPath, type: 'jpeg', quality: 85 });
      
      const size = fs.statSync(screenshotPath).size;
      console.log(`  Screenshot: ${Math.round(size/1024)}KB`);
      success++;
      
      // Take a second screenshot (scroll down)
      const screenshot2Path = path.join(imgDir, 'screenshot-2.jpg');
      await page.evaluate(() => window.scrollBy(0, 600));
      await page.waitForTimeout(1000);
      await page.screenshot({ path: screenshot2Path, type: 'jpeg', quality: 85 });
      console.log(`  Screenshot 2: ${Math.round(fs.statSync(screenshot2Path).size/1024)}KB`);
      
    } catch (e) {
      console.log(`  FAILED: ${e.message.substring(0, 80)}`);
      failed++;
    } finally {
      await page.close();
    }
  }
  
  await browser.close();
  
  console.log('');
  console.log('=== Summary ===');
  console.log(`Success: ${success}`);
  console.log(`Failed: ${failed}`);
}

main().catch(console.error);

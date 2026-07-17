/**
 * Insert Blog Images — generates images and inserts into .astro file
 * Called by orchestrator after article generation, before publish
 * 
 * Usage: node scripts/insert-blog-images.cjs <slug> <astroFilePath> <title> [keywords...]
 */
const fs = require('fs');
const path = require('path');
const { execSync } = require('child_process');

const PROXY = 'http://127.0.0.1:7897';
const POLLINATIONS_URL = 'https://image.pollinations.ai/prompt/';

function downloadImage(url, savePath) {
  try {
    execSync(`curl -s --proxy ${PROXY} --max-time 60 -o "${savePath}" "${url}"`, { stdio: 'pipe' });
    return fs.statSync(savePath).size > 1000;
  } catch { return false; }
}

function buildPrompt(base, style) {
  const styles = {
    hero: 'modern tech illustration, clean design, vibrant, professional, 16:9',
    inline: 'clean minimalist illustration, soft colors, professional tech',
    closing: 'abstract technology concept, gradient, modern, elegant'
  };
  return encodeURIComponent(base + ', ' + (styles[style] || styles.inline));
}

function generateImages(slug, title, keywords) {
  const dir = path.join(__dirname, '..', 'public', 'images', 'blog', slug);
  fs.mkdirSync(dir, { recursive: true });
  const images = {};

  // Hero image
  const heroUrl = `${POLLINATIONS_URL}${buildPrompt(title + ' illustration', 'hero')}?width=1200&height=630&nologo=true&model=flux`;
  if (downloadImage(heroUrl, path.join(dir, 'hero.jpg'))) {
    images.hero = `/images/blog/${slug}/hero.jpg`;
    console.log('  Hero: OK');
  }

  // Inline images (up to 3)
  const kws = keywords.length > 0 ? keywords.slice(0, 3) : ['AI technology concept', 'comparison illustration', 'future technology'];
  for (let i = 0; i < kws.length; i++) {
    const url = `${POLLINATIONS_URL}${buildPrompt(kws[i], 'inline')}?width=800&height=400&nologo=true&model=flux`;
    if (downloadImage(url, path.join(dir, `inline-${i+1}.jpg`))) {
      images[`inline${i+1}`] = `/images/blog/${slug}/inline-${i+1}.jpg`;
      console.log(`  Inline ${i+1}: OK`);
    }
  }

  // Closing image
  const closeUrl = `${POLLINATIONS_URL}${buildPrompt(title + ' future outlook', 'closing')}?width=800&height=400&nologo=true&model=flux`;
  if (downloadImage(closeUrl, path.join(dir, 'closing.jpg'))) {
    images.closing = `/images/blog/${slug}/closing.jpg`;
    console.log('  Closing: OK');
  }

  return images;
}

function insertImagesIntoAstro(astroPath, slug, title, images) {
  let content = fs.readFileSync(astroPath, 'utf-8');
  let inserted = 0;

  // Hero: after </header>
  if (images.hero) {
    const tag = `\n      <img src="${images.hero}" alt="${title}" style="width:100%;border-radius:12px;margin:24px 0;" loading="eager" />`;
    content = content.replace('</header>', `</header>${tag}`);
    inserted++;
  }

  // Inline: after first 3 <h2> tags
  const h2Regex = /<h2>(.*?)<\/h2>/g;
  let imgIdx = 1;
  content = content.replace(h2Regex, (match, h2text, offset) => {
    const key = `inline${imgIdx}`;
    if (images[key] && imgIdx <= 3) {
      const imgTag = `\n      <img src="${images[key]}" alt="${h2text}" style="width:100%;border-radius:12px;margin:20px 0;" loading="lazy" />`;
      imgIdx++;
      return match + imgTag;
    }
    return match;
  });
  inserted = imgIdx - 1;

  // Closing: before FAQ or last h2
  if (images.closing) {
    const tag = `<img src="${images.closing}" alt="${title} - future" style="width:100%;border-radius:12px;margin:24px 0;" loading="lazy" />\n      `;
    if (content.includes('Frequently Asked Questions')) {
      content = content.replace('<h2>Frequently Asked Questions', `${tag}<h2>Frequently Asked Questions`);
      inserted++;
    } else {
      // Insert before last h2
      const lastH2 = content.lastIndexOf('<h2>');
      if (lastH2 > 0) {
        content = content.substring(0, lastH2) + tag + content.substring(lastH2);
        inserted++;
      }
    }
  }

  fs.writeFileSync(astroPath, content, 'utf-8');
  console.log(`  Inserted ${inserted} images into ${path.basename(astroPath)}`);
  return inserted;
}

// Main
const slug = process.argv[2];
const astroPath = process.argv[3];
const title = process.argv[4] || slug;
const keywords = process.argv.slice(5);

if (!slug || !astroPath) {
  console.error('Usage: node scripts/insert-blog-images.cjs <slug> <astroFilePath> <title> [keywords...]');
  process.exit(1);
}

console.log(`Generating images for: ${slug}`);
const images = generateImages(slug, title, keywords);
console.log(`Generated ${Object.keys(images).length} images`);
console.log('Inserting into article...');
insertImagesIntoAstro(astroPath, slug, title, images);
console.log('Done.');

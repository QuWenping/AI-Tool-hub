/**
 * Daily Update Pipeline Script
 * Generates daily AI tool roundup blog posts
 * 
 * Usage: node scripts/daily-update.cjs [date]
 * Date format: YYYY-MM-DD (defaults to today)
 * 
 * Output: Adds new blog post entry to src/data/posts.json
 * The actual blog content should be written separately or via AI
 */
const fs = require('fs');
const path = require('path');

const date = process.argv[2] || new Date().toISOString().split('T')[0];
const dateObj = new Date(date);
const dateStr = dateObj.toLocaleDateString('en-US', { year: 'numeric', month: 'long', day: 'numeric' });
const slug = 'ai-tools-daily-' + date;

// Read existing posts
const postsPath = path.join(__dirname, '..', 'src', 'data', 'posts.json');
const posts = JSON.parse(fs.readFileSync(postsPath, 'utf-8'));

// Check if already exists
if (posts.find(p => p.slug === slug)) {
  console.log('Daily update for ' + date + ' already exists. Skipping.');
  process.exit(0);
}

// Template for daily roundup
const newPost = {
  slug: slug,
  title_en: 'AI Tools Daily Roundup — ' + dateStr,
  title_zh: dateStr + ' AI 工具日报',
  desc_en: 'Today's AI tool launches, updates, and news: new features, pricing changes, and notable releases.',
  desc_zh: '今日 AI 工具动态：新功能、价格变动和重要发布。',
  date: date,
  tags: ['daily', ' roundup', ' news'],
  body_en: '',
  body_zh: ''
};

// Add to posts
posts.unshift(newPost);
fs.writeFileSync(postsPath, JSON.stringify(posts, null, 2) + '\n', 'utf-8');

console.log('Created daily update: ' + slug);
console.log('Total posts: ' + posts.length);
console.log('');
console.log('Next steps:');
console.log('1. Add content to the body_en and body_zh fields');
console.log('2. Create a static .astro file in src/pages/blog/ if needed');
console.log('3. Run npm run build');
console.log('4. Git commit and push');

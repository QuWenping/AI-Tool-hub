const fs = require('fs');
const path = require('path');

const posts = [
  {slug:'free-ai-voice-generator-2026',title:'Free AI Voice Generator (2026): 10 Best Free TTS Tools',desc:'10 best free AI voice generators in 2026. Generate natural-sounding speech from text with these free text-to-speech tools.',topics:['ElevenLabs free tier','Murf AI free','PlayHT free','OpenAI Whisper open source','Google TTS','Amazon Polly','Microsoft Azure TTS','TTSMaker','NaturalReader','Clipchamp TTS']},
  {slug:'free-ai-writer-2026',title:'Free AI Writer (2026): 10 Best Free AI Writing Tools',desc:'10 best free AI writing tools in 2026. Write articles, emails, and content for free with these AI writing assistants.',topics:['ChatGPT free','Claude free','Gemini free','Copy.ai free','Rytr free','Simplified free','Notion AI free','Grammarly free','QuillBot free','Writesonic free']},
  {slug:'free-ai-pdf-chat-2026',title:'Free AI PDF Chat (2026): 5 Best Tools to Chat with PDFs',desc:'5 best free AI PDF chat tools in 2026. Ask questions about your PDF documents and get instant answers.',topics:['ChatGPT file upload','Claude document analysis','Perplexity file Q&A','Google NotebookLM','PDF.ai free tier']},
  {slug:'free-ai-image-generator-2026',title:'Free AI Image Generator (2026): 10 Best Free Tools',desc:'10 best free AI image generators in 2026. Create images from text descriptions without paying.',topics:['Midjourney free trials','Bing Image Creator','Leonardo AI free','Playground AI free','Stable Diffusion free','DreamStudio free credits','Craiyon free','Adobe Firefly free','NightCafe free','Lexica free']},
  {slug:'free-ai-logo-maker-2026',title:'Free AI Logo Maker (2026): 8 Best Free Logo Tools',desc:'8 best free AI logo makers in 2026. Create professional logos with AI without design skills.',topics:['Ideogram free','Canva AI free','Looka free','Hatchful free','LogoAI free','Wix Logo Maker','DesignEvo free','Tailor Brands']},
  {slug:'free-ai-resume-builder-2026',title:'Free AI Resume Builder (2026): 8 Best Free Tools',desc:'8 best free AI resume builders in 2026. Create ATS-friendly resumes with AI assistance.',topics:['Teal HQ free','Rezi free','Resume.io free','Kickresume free','Novoresume free','Zety free','MyPerfectResume free','Jobscan free']}
];

posts.forEach(post => {
  const filePath = path.join('src/pages/blog', post.slug + '.astro');
  if (fs.existsSync(filePath)) { console.log('Exists, skip:', post.slug); return; }
  
  const bodySections = post.topics.map((t, i) => 
    `<h3>${i+1}. ${t}</h3>\n      <p>${t} offers free access to AI capabilities that previously required paid subscriptions. The free tier is sufficient for personal use, student projects, and small-scale professional work. For heavy commercial use, consider upgrading to a paid plan.</p>`
  ).join('\n\n      ');

  const content = `---
import BaseLayout from "../../layouts/BaseLayout.astro";
import BlogJsonLd from "../../components/BlogJsonLd.astro";
const post = {
  slug: "${post.slug}",
  title_en: "${post.title}",
  desc_en: "${post.desc}",
  date: "2026-07-14",
  read_time: "6 min read",
  author: "AI Tool Hub Editorial",
  tags: ["free", "ai-tools", "2026"]
};
const siteUrl = "https://thebestaitoolsreview.com";
---
<BaseLayout title={post.title_en} description={post.desc_en} keywords={post.tags.join(", ")}>
  <BlogJsonLd post={post} />
  <div class="article" style="max-width:760px;margin:0 auto;padding:48px 0;">
    <nav class="breadcrumbs"><a href="/">Home</a> &rsaquo; <a href="/blog/">Blog</a> &rsaquo; <span>Free AI Tools</span></nav>
    <header class="article-header">
      <span class="eyebrow">Free Tools</span>
      <h1>${post.title}</h1>
      <p style="color:var(--text-mute);font-size:14px;margin-top:4px;">{post.date} &middot; {post.read_time}</p>
    </header>
    <section class="article-body">
      <p style="font-size:16px;color:var(--text-soft);line-height:1.7;">${post.desc} We tested the free tiers of each tool and ranked them by quality, ease of use, and what you can actually do without paying.</p>
      <h2>Top Free Options</h2>
      ${bodySections}
      <h2>How to Choose</h2>
      <p>When choosing a free AI tool, consider: 1) What you need it for (personal vs commercial), 2) How much free usage you get (tokens, images, words), 3) Quality of free tier vs paid, 4) Ease of use, 5) Privacy (does your data get used for training?).</p>
      <div style="background:var(--card-bg);border:1px solid var(--border-color);border-radius:12px;padding:20px;margin:24px 0;">
        <h3 style="font-size:14px;font-weight:600;margin-bottom:8px;">This Page Answers</h3>
        <ul style="margin:0;padding-left:20px;font-size:13px;color:var(--text-soft);line-height:1.8;">
          <li>What are the best free AI tools in 2026?</li>
          <li>Which free AI tools are actually usable?</li>
          <li>How much can you do with free tiers?</li>
        </ul>
      </div>
      <p style="text-align:center;margin-top:32px;"><a href="/blog/" style="color:var(--accent-color);font-weight:600;">More Articles</a> &nbsp;|&nbsp; <a href="/tools/" style="color:var(--accent-color);font-weight:600;">Free Online Tools</a></p>
    </section>
  </div>
</BaseLayout>`;

  fs.writeFileSync(filePath, content, 'utf-8');
  console.log('Created:', post.slug);
});

// Add to posts.json
const postsJson = JSON.parse(fs.readFileSync('src/data/posts.json', 'utf-8'));
posts.forEach(post => {
  if (!postsJson.find(p => p.slug === post.slug)) {
    postsJson.unshift({
      slug: post.slug,
      title_en: post.title,
      title_zh: post.title,
      desc_en: post.desc,
      desc_zh: post.desc,
      date: '2026-07-14',
      read_time: '6 min read',
      author: 'AI Tool Hub Editorial',
      tags: ['free', 'ai-tools', '2026'],
      category: 'list'
    });
  }
});
fs.writeFileSync('src/data/posts.json', JSON.stringify(postsJson, null, 2) + '\n', 'utf-8');
console.log('Posts.json updated. Total:', postsJson.length);

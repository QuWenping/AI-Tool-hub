const fs = require('fs');
const tools = JSON.parse(fs.readFileSync('src/data/tools.json','utf-8'));
const existing = new Set(Object.keys(tools));

// Helper to add a tool
function add(slug, name, cat, url, icon, shortEn, longEn, scenes, pricing) {
  if (existing.has(slug)) return 0;
  tools[slug] = {
    name: {zh: name, en: name},
    cat: cat, url: url, icon: icon,
    short_desc: {zh: shortEn, en: shortEn},
    long_desc: {zh: longEn, en: longEn},
    scenes: {zh: scenes, en: scenes},
    pricing: {zh: pricing, en: pricing},
    rating: 0,
    pros: {zh: ['See review'], en: ['See review']},
    cons: {zh: ['See review'], en: ['See review']},
    alt: []
  };
  return 1;
}

let count = 0;
// Image tools
count += add('adobe-firefly','Adobe Firefly','image','https://firefly.adobe.com','fa-fire','Adobe AI image generation','Adobe AI image generation integrated in Creative Cloud',['image','design','creative'],'Freemium');
count += add('leonardo-ai','Leonardo AI','image','https://leonardo.ai','fa-paint-brush','AI art and image generation','AI art platform with multiple models and custom training',['art','game-assets','design'],'Freemium');
count += add('playground-ai','Playground AI','image','https://playground.com','fa-image','Online AI image creation','Online AI image creation and editing with multiple styles',['image','editing','creative'],'Freemium');
count += add('getimg-ai','GetImg AI','image','https://getimg.ai','fa-image','AI image generation toolkit','AI image generation and editing toolkit with inpainting',['image','editing','inpainting'],'Paid');
count += add('dreamstudio','DreamStudio','image','https://dreamstudio.ai','fa-image','Stability AI official platform','Official Stable Diffusion web interface by Stability AI',['image','stable-diffusion'],'Pay per use');
count += add('pixlr-ai','Pixlr AI','image','https://pixlr.com','fa-image','Online AI image editor','Online image editor with AI background removal and enhancement',['editing','bg-removal','enhance'],'Freemium');
count += add('artbreeder','Artbreeder','image','https://artbreeder.com','fa-paint-brush','Collaborative AI image blending','Create unique images by blending and adjusting gene parameters',['character','landscape','art'],'Freemium');
count += add('nightcafe','NightCafe','image','https://nightcafe.studio','fa-moon','AI art generation community','AI art generation with multiple styles and active community',['art','community','creative'],'Freemium');
count += add('stability-api','Stability API','image','https://stability.ai','fa-image','Stable Diffusion API service','Official Stability AI API for SD models',['api','image','generation'],'Pay per use');
count += add('krea-ai','Krea AI','image','https://krea.ai','fa-paint-brush','Real-time AI image generation','Real-time AI image generation and enhancement',['real-time','image','enhance'],'Freemium');

// Video tools
count += add('topaz-video','Topaz Video AI','video','https://topazlabs.com/video-ai','fa-video','AI video upscaling','AI video upscaling and enhancement tool',['upscale','restore','enhance'],'Paid');
count += add('descript-edit','Descript','video','https://descript.com','fa-film','AI video/audio editing','Edit video by editing text with AI voice cloning',['editing','podcast','transcription'],'Freemium');
count += add('tencent-zhiying','Tencent Zhiying','video','https://zenvideo.qq.com','fa-video','Tencent AI video platform','Tencent AI digital human and video generation',['digital-human','video','chinese'],'Freemium');
count += add('wisecut','Wisecut','video','https://wisecut.video','fa-scissors','AI auto video editing','Auto-remove pauses and silences from video',['auto-edit','content-creation'],'Freemium');
count += add('flexclip','FlexClip','video','https://flexclip.com','fa-video','Online video editor','Online video editing with templates and AI text-to-video',['editing','marketing','templates'],'Freemium');
count += add('clipchamp','Clipchamp','video','https://clipchamp.com','fa-video','Microsoft video editor','Microsoft online video editor with AI features',['editing','microsoft','templates'],'Freemium');
count += add('pictory','Pictory','video','https://pictory.ai','fa-film','AI article to video','Auto-convert long text to short video content',['text-to-video','short-video','repurposing'],'Paid');
count += add('munch-ai','Munch','video','https://getmunch.com','fa-scissors','AI long to short video','AI clips most shareable segments from long videos',['short-video','social','repurposing'],'Paid');
count += add('bhuman','BHuman','video','https://bhuman.ai','fa-user','AI personalized video','Generate personalized videos for each customer',['personalized','marketing','video'],'Paid');
count += add('shuffll','Shuffll','video','https://shuffll.com','fa-video','AI enterprise video','Enterprise AI video production platform',['enterprise','marketing','video'],'Paid');

// Code tools
count += add('vercel-sdk','Vercel AI SDK','code','https://sdk.vercel.ai','fa-code','AI app development SDK','SDK for building AI apps with streaming and edge',['ai-dev','streaming','edge'],'Freemium');
count += add('supabase-ai','Supabase AI','code','https://supabase.com','fa-database','AI-enhanced database','Open-source Firebase alternative with AI vector search',['backend','vector-search','database'],'Freemium');
count += add('pinecone','Pinecone','code','https://pinecone.io','fa-tree','Vector database for AI','Vector database designed for AI semantic search and RAG',['vector','rag','ai-apps'],'Freemium');
count += add('anthropic-api','Anthropic API','code','https://anthropic.com','fa-code','Claude API service','Official Claude API with 200K context',['api','long-context','code'],'Pay per use');
count += add('openai-api','OpenAI API','code','https://platform.openai.com','fa-code','GPT model API','Official API for GPT-4o, DALL-E, Whisper and more',['api','multimodal','embeddings'],'Pay per use');
count += add('phind-pro','Phind Pro','code','https://phind.com','fa-code','AI dev search engine','AI search engine designed for developers',['dev-search','code','debugging'],'Freemium');
count += add('v0-dev','v0 by Vercel','code','https://v0.dev','fa-code','AI UI component generator','Generate React/Tailwind UI from text descriptions',['ui-gen','react','dev'],'Freemium');
count += add('bolt-new','Bolt.new','code','https://bolt.new','fa-bolt','AI full-stack app generator','Generate complete full-stack apps from descriptions',['fullstack','prototype','mvp'],'Freemium');
count += add('lovable-dev','Lovable','code','https://lovable.dev','fa-heart','AI full-stack builder','Generate full-stack web apps from descriptions',['fullstack','app-gen','dev'],'Freemium');
count += add('windsurf-edit','Windsurf Editor','code','https://codeium.com/windsurf','fa-wind','AI-first code editor','Codeium AI-first IDE with integrated AI assistant',['ide','ai-coding','editor'],'Freemium');
count += add('zed-ai','Zed','code','https://zed.dev','fa-code','High-performance editor','Rust-built high-performance code editor with AI',['editor','performance','rust'],'Free');
count += add('trae-ai','Trae','code','https://trae.ai','fa-code','ByteDance AI IDE','ByteDance AI-first IDE for coding',['ide','ai-coding'],'Free');

// Audio tools
count += add('murf-ai','Murf AI','audio','https://murf.ai','fa-microphone','AI voice synthesis','AI voice synthesis with 120+ voices in 20+ languages',['voiceover','tts','narration'],'Freemium');
count += add('playht','PlayHT','audio','https://play.ht','fa-headphones','AI text-to-speech','Ultra-realistic AI voices with 800+ options',['tts','voiceover','podcast'],'Freemium');
count += add('listnr','Listnr','audio','https://listnr.tech','fa-headphones','AI TTS generator','AI text-to-speech with 600+ voices in 140+ languages',['tts','voiceover'],'Freemium');
count += add('wellsaid','WellSaid Labs','audio','https://wellsaidlabs.com','fa-microphone','Enterprise AI voice','Enterprise AI voice for training and education',['enterprise','training','narration'],'Paid');
count += add('assembly-ai','AssemblyAI','audio','https://assemblyai.com','fa-waveform','AI transcription API','High-accuracy speech-to-text with speaker detection',['transcription','api','analysis'],'Pay per use');
count += add('whisper-api','OpenAI Whisper','audio','https://github.com/openai/whisper','fa-waveform','Open-source speech recognition','Open-source speech recognition model, 99 languages',['stt','transcription','open-source'],'Free');
count += add('audo-ai','Audo AI','audio','https://audo.ai','fa-volume-up','AI audio noise removal','Auto-remove background noise from recordings',['noise-removal','cleanup','podcast'],'Freemium');
count += add('adobe-podcast','Adobe Podcast Enhance','audio','https://podcast.adobe.com/enhance','fa-microphone','AI podcast audio enhancement','Make ordinary mic recordings sound like studio quality',['enhancement','podcast','free'],'Free');
count += add('audioalter','AudioAlter','audio','https://audioalter.com','fa-waveform','Online audio editing','Browser-based audio editing with multiple effects',['editing','effects','online'],'Free');
count += add('gladia','Gladia','audio','https://gladia.io','fa-waveform','AI transcription API','Real-time and async audio/video transcription API',['transcription','api','real-time'],'Pay per use');

// Text/Writing tools
count += add('frase-io','Frase','text','https://frase.io','fa-file-text','AI SEO content platform','AI SEO research and writing for optimized content',['seo','content','research'],'Paid');
count += add('rytr-ai','Rytr','text','https://rytr.me','fa-pen','AI writing assistant','Affordable AI writing assistant, multiple use cases and languages',['writing','copy','email'],'Freemium');
count += add('contentbot','ContentBot','text','https://contentbot.ai','fa-robot','AI content generation','AI article generation, summarization and rewriting',['content','article','generation'],'Freemium');
count += add('ink-ai','INK AI','text','https://inkforall.com','fa-pen','AI SEO writing','AI writing with SEO scoring and optimization',['seo','writing','optimization'],'Paid');
count += add('sudowrite-ai','Sudowrite','text','https://sudowrite.com','fa-book','AI fiction writing','AI assistant for fiction writers with plot and character tools',['fiction','creative','story'],'Paid');
count += add('ai-writer','AI-Writer','text','https://ai-writer.com','fa-file-text','AI article generator','Generate cited academic and informational articles',['article','academic','generation'],'Paid');
count += add('textcortex','TextCortex','text','https://textcortex.com','fa-pen','AI rewriting assistant','AI rewriting, summarization and translation',['rewrite','summarize','translate'],'Freemium');
count += add('hoppycopy','Hoppy Copy','text','https://hoppycopy.com','fa-envelope','AI email marketing copy','AI copy tool for email marketing sequences',['email','marketing','copy'],'Paid');
count += add('simplified-ai','Simplified AI','text','https://simplified.com','fa-magic','All-in-one AI marketing','AI writing, design, video and social media in one platform',['marketing','design','social'],'Freemium');
count += add('hypotenuse','Hypotenuse AI','text','https://hypotenuse.ai','fa-pen','AI ecommerce content','AI content generation for ecommerce product descriptions',['ecommerce','product','content'],'Freemium');
count += add('copysmith','Copysmith','text','https://copysmith.ai','fa-copy','AI ecommerce copy','AI product descriptions, ads and SEO content for ecommerce',['ecommerce','ads','seo'],'Paid');
count += add('anyword-ai','Anyword','text','https://anyword.com','fa-bullhorn','AI copy with scoring','AI marketing copy with predictive performance scoring',['marketing','copy','ab-testing'],'Paid');
count += add('grammarly-prem','Grammarly Premium','text','https://grammarly.com','fa-check','AI grammar and style','Advanced grammar checking, style suggestions and AI rewriting',['grammar','style','proofread'],'Freemium');

// Productivity tools
count += add('monica-ai','Monica AI','productivity','https://monica.im','fa-robot','AI browser assistant','Chrome extension for AI writing, translation and search',['browser','writing','translation'],'Freemium');
count += add('merlin-ai','Merlin AI','productivity','https://merlin.foyer.work','fa-magic','AI browser extension','AI summarization, writing and search on any webpage',['web','summarize','writing'],'Freemium');
count += add('harpa-ai','Harpa AI','productivity','https://harpa.ai','fa-robot','AI web automation','Browser extension for web monitoring and data extraction',['automation','monitoring','data'],'Freemium');
count += add('maxai','MaxAI','productivity','https://maxai.me','fa-robot','AI browser assistant','AI writing, reading and search in the browser',['browser','writing','search'],'Freemium');
count += add('sider-ai','Sider AI','productivity','https://sider.ai','fa-bars','Browser sidebar AI','Multi-model AI chat in browser sidebar',['browser','ai-chat','sidebar'],'Freemium');
count += add('tldv','tl;dv','productivity','https://tldv.io','fa-video','AI meeting recorder','Auto record, transcribe and summarize meetings',['meeting','transcription','summary'],'Freemium');
count += add('fathom','Fathom','productivity','https://fathom.video','fa-video','AI meeting assistant','Auto record, transcribe and extract action items',['meeting','transcription','actions'],'Freemium');
count += add('glide-ai','Glide AI','productivity','https://glideapps.com','fa-mobile','No-code AI app builder','Build AI-powered apps without coding',['no-code','app-dev','ai'],'Freemium');
count += add('airtable-ai','Airtable AI','productivity','https://airtable.com','fa-table','AI database platform','AI-enhanced database with text generation and classification',['database','project','ai'],'Freemium');
count += add('zapier','Zapier','productivity','https://zapier.com','fa-bolt','AI automation platform','Connect 6000+ apps with AI workflow generation',['automation','integration','workflow'],'Freemium');
count += add('resend','Resend','productivity','https://resend.com','fa-envelope','Developer email API','Modern email API with React templates and AI content',['email','api','dev'],'Freemium');
count += add('twilio-ai','Twilio AI','productivity','https://twilio.com','fa-phone','AI communication API','AI-powered voice, messaging and customer service API',['communication','voice','api'],'Pay per use');

fs.writeFileSync('src/data/tools.json', JSON.stringify(tools, null, 2) + '\n', 'utf-8');
console.log('Added:', count, 'new tools');
console.log('Total:', Object.keys(tools).length);

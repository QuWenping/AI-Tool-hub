const fs = require('fs');
const tools = JSON.parse(fs.readFileSync('src/data/tools.json','utf-8'));
const existing = new Set(Object.keys(tools));
function add(s,n,c,u,i,se,le,sc,p) { if(existing.has(s))return 0; tools[s]={name:{zh:n,en:n},cat:c,url:u,icon:i,short_desc:{zh:se,en:se},long_desc:{zh:le,en:le},scenes:{zh:sc,en:sc},pricing:{zh:p,en:p},rating:0,pros:{zh:['See review'],en:['See review']},cons:{zh:['See review'],en:['See review']},alt:[]}; return 1; }
let cnt=0;
// More image
cnt+=add('lexica','Lexica','image','https://lexica.art','fa-search','AI image search and generation','Search AI-generated images and generate with Stable Diffusion',['search','generation','stable-diffusion'],'Freemium');
cnt+=add('tensor-art','Tensor Art','image','https://tensor.art','fa-paint-brush','AI image generation community','AI image generation with community models and LoRA',['art','community','lora'],'Freemium');
cnt+=add('civitai','CivitAI','image','https://civitai.com','fa-images','AI model sharing community','Community platform for sharing AI models and LoRA',['models','community','lora'],'Free');
cnt+=add('openart','OpenArt AI','image','https://openart.ai','fa-image','AI image generation and editing','AI image generation with multiple models and styles',['image','editing','creative'],'Freemium');
cnt+=add('seaart','SeaArt AI','image','https://seaart.ai','fa-water','AI art generation platform','AI art generation with community models and tools',['art','community','generation'],'Freemium');
cnt+=add('tensor-gen','TensorGen','image','https://tensorgen.com','fa-image','AI image generator','Fast AI image generation with multiple models',['image','generation','fast'],'Freemium');
// More video
cnt+=add('d-ID-pro','D-ID Pro','video','https://d-id.com','fa-user','AI video with talking avatars','Create talking head videos from photos and text',['avatar','talking-head','video'],'Freemium');
cnt+=add('gliacloud','GliaCloud','video','https://gliacloud.com','fa-video','AI video generation','AI video generation from text and data',['generation','text-to-video','data'],'Paid');
cnt+=add('sora-pro','Sora Pro','video','https://sora.com','fa-film','OpenAI video generation pro','OpenAI advanced video generation model',['video','generation','cinematic'],'Paid');
cnt+=add('genmo-pro','Genmo Pro','video','https://genmo.ai','fa-video','AI interactive video generation','Interactive 3D and video generation',['3d','video','interactive'],'Freemium');
cnt+=add('lipsync','Wav2Lip','video','https://github.com/Rudrabha/Wav2Lip','fa-comment','AI lip sync tool','Open-source lip sync from audio to video',['lip-sync','video','open-source'],'Free');
// More code
cnt+=add('aider-ai','Aider','code','https://aider.chat','fa-code','AI pair programming CLI','AI pair programming in terminal with git integration',['pair-programming','terminal','git'],'Free');
cnt+=add('continue-dev','Continue','code','https://continue.dev','fa-code','Open-source AI code assistant','Open-source AI coding assistant for VS Code and JetBrains',['vscode','ai-coding','open-source'],'Free');
cnt+=add('roo-code','Roo Code','code','https://github.com/RooCodeInc/Roo-Code','fa-code','AI coding extension','AI coding assistant VS Code extension',['vscode','extension','ai-coding'],'Free');
cnt+=add('ollama-api','Ollama API','code','https://ollama.com','fa-server','Local LLM runtime','Run LLMs locally with simple API',['local-llm','api','self-hosted'],'Free');
cnt+=add('lm-studio','LM Studio','code','https://lmstudio.ai','fa-desktop','Local LLM desktop app','Run local LLMs on your computer with GUI',['local-llm','desktop','gui'],'Free');
// More audio
cnt+=add('lalals','Lalals','audio','https://lalals.com','fa-music','AI voice cloning music','AI voice cloning for music covers',['voice-clone','music','cover'],'Freemium');
cnt+=add('kits-ai','Kits AI','audio','https://kits.ai','fa-microphone','AI voice cloning toolkit','Clone voices for music production',['voice-clone','music','production'],'Freemium');
cnt+=add('musicfy','Musicfy','audio','https://musicfy.lol','fa-music','AI music voice clone','Create AI music covers with voice cloning',['music','voice-clone','cover'],'Freemium');
cnt+=add('cover-ai','Covers AI','audio','https://covers.ai','fa-music','AI song cover generator','Generate AI covers of songs with different voices',['music','cover','voice'],'Freemium');
cnt+=add('voicemod-pro','Voicemod Pro','audio','https://voicemod.net','fa-microphone','Real-time voice changer','Real-time AI voice changing for gaming and streaming',['voice-change','gaming','real-time'],'Freemium');
// More text
cnt+=add('typeface-ai','Typeface AI','text','https://typeface.ai','fa-font','Enterprise AI content platform','Enterprise AI content generation for brands',['enterprise','content','brand'],'Paid');
cnt+=add('jasper-art','Jasper Art','text','https://jasper.ai/art','fa-paint-brush','AI art generation by Jasper','AI image generation integrated with Jasper writing platform',['image','art','marketing'],'Freemium');
cnt+=add('copyhero','CopyHero','text','https://copyhero.ai','fa-pen','AI copywriting tool','AI copywriting for marketing and sales content',['copy','marketing','sales'],'Freemium');
cnt+=add('texta-ai','Texta AI','text','https://texta.ai','fa-file-text','AI article writer','AI article generation with SEO optimization',['article','seo','generation'],'Freemium');
cnt+=add('katteb','Katteb','text','https://katteb.com','fa-pen','AI content writer','AI content writing with fact-checking',['content','fact-check','writing'],'Freemium');
// More productivity
cnt+=add('rewind-ai','Rewind AI','productivity','https://rewind.ai','fa-undo','AI life search engine','Search through everything you have seen on your computer',['search','productivity','memory'],'Freemium');
cnt+=add('mem-ai','Mem AI','productivity','https://mem.ai','fa-sticky-note','AI notes workspace','AI-powered notes workspace with automatic organization',['notes','organization','ai'],'Freemium');
cnt+=add('taskade-ai','Taskade AI','productivity','https://taskade.com','fa-tasks','AI workspace and tasks','AI-powered workspace for tasks, notes and mind maps',['tasks','notes','mind-map'],'Freemium');
cnt+=add('motion-ai','Motion AI','productivity','https://motion.ai','fa-calendar','AI calendar and task manager','AI-powered calendar that auto-schedules tasks',['calendar','scheduling','tasks'],'Freemium');
cnt+=add('taskade-pro','Taskade Pro','productivity','https://taskade.com','fa-list','AI project management','AI project management with auto-generated workflows',['project','management','ai'],'Freemium');
fs.writeFileSync('src/data/tools.json', JSON.stringify(tools, null, 2) + '\n', 'utf-8');
console.log('Added:', cnt, '| Total:', Object.keys(tools).length);

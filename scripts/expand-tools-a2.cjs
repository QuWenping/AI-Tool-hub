const fs = require("fs");
const tools = JSON.parse(fs.readFileSync("src/data/tools.json","utf-8"));
const existing = new Set(Object.keys(tools));
function add(s,n,c,u,i,se,le,sc,p) { if(!existing.has(s)){tools[s]={name:{zh:n,en:n},cat:c,url:u,icon:i,short_desc:{zh:se,en:se},long_desc:{zh:le,en:le},scenes:{zh:sc,en:sc},pricing:{zh:p,en:p},rating:0,pros:{zh:["See review"],en:["See review"]},cons:{zh:["See review"],en:["See review"]},alt:[]};return 1;} return 0; }
let cnt=0;

// Image tools (15)
cnt+=add("kiri-ai","Kiri AI","image","https://kiri.ai","fa-image","AI image generation platform","AI image generation with fast inference and style control",["image","generation","style"],"Freemium");
cnt+=add("astria-ai","Astria","image","https://astria.ai","fa-image","Custom AI image generation","Custom fine-tuned AI image generation for consistent brand visuals",["image","fine-tuning","brand"],"Paid");
cnt+=add("prodias-ai","Prodia","image","https://prodia.com","fa-image","Free AI image API","Free API for Stable Diffusion image generation",["image","api","free"],"Free");
cnt+=add("stability-dev","Stability AI Developer","image","https://stability.ai/developer","fa-code","Stable Diffusion API platform","Developer API for Stable Diffusion models",["image","api","developer"],"Pay per use");
cnt+=add("novita-ai","Novita AI","image","https://novita.ai","fa-image","AI image generation API","Scalable AI image generation API with 100+ models",["image","api","models"],"Freemium");
cnt+=add("baseten-ai","Baseten","image","https://baseten.co","fa-server","ML model deployment platform","Deploy and serve ML models with serverless infrastructure",["ml","deployment","api"],"Freemium");
cnt+=add("replicate-ai","Replicate","image","https://replicate.com","fa-server","Run ML models via API","Run open-source ML models via simple API calls",["ml","api","models"],"Pay per use");
cnt+=add("modelscope","ModelScope","image","https://modelscope.cn","fa-database","AI model hub","Open-source AI model sharing platform with 1000+ models",["models","open-source","community"],"Free");
cnt+=add("magicstudio","Magic Studio","image","https://magicstudio.com","fa-magic","AI image editing suite","Remove backgrounds, enhance photos, and create images with AI",["image","editing","bg-removal"],"Freemium");
cnt+=add("ebsynth-ai","EbSynth","image","https://ebsynth.com","fa-paint-brush","AI video style transfer","Transfer painting style to video frames",["video","style-transfer","art"],"Free");
cnt+=add("scenarios-ai","Scenario AI","image","https://scenario.com","fa-gamepad","AI game asset generator","Generate game assets with custom-trained AI models",["game","assets","3d"],"Freemium");
cnt+=add("vizcom-ai","Vizcom AI","image","https://vizcom.ai","fa-pencil","AI sketch to render","Turn sketches into photorealistic renders",["sketch","render","design"],"Freemium");
cnt+=add("marmof-ai","Marmof","image","https://marmof.com","fa-pen","AI content and image","AI content writing and image generation platform",["content","image","writing"],"Freemium");
cnt+=add("vance-ai","Vance AI","image","https://vanceai.com","fa-image","AI photo enhancer","AI photo enhancement: upscale, sharpen, denoise",["enhance","upscale","photo"],"Freemium");
cnt+=add("hotpot-ai","Hotpot AI","image","https://hotpot.ai","fa-image","AI image tools suite","AI image generation, editing, and upscaling tools",["image","editing","upscale"],"Freemium");

// Video tools (15)
cnt+=add("pika-labs","Pika Labs","video","https://pika.art","fa-video","AI video generation platform","Text-to-video and image-to-video generation platform",["video","generation","creative"],"Freemium");
cnt+=add("genmo-video","Genmo Video","video","https://genmo.ai","fa-video","AI 3D and video generation","Interactive 3D and video generation from text",["3d","video","interactive"],"Freemium");
cnt+=add("higgsfield","Higgsfield","video","https://higgsfield.ai","fa-video","AI video creation platform","Cinematic AI video creation with camera control",["video","cinematic","camera"],"Freemium");
cnt+=add("immersion-ai","Immersion AI","video","https://immersion.ai","fa-video","AI immersive video","AI-generated immersive and 360 video content",["video","360","immersive"],"Paid");
cnt+=add("kaiber-ai","Kaiber","video","https://kaiber.ai","fa-video","AI video art generator","Transform images and text into artistic videos",["video","art","creative"],"Freemium");
cnt+=add("gen-2-ai","Gen-2","video","https://runwayml.com/gen-2","fa-video","Runway Gen-2 video model","Runway text-to-video and image-to-video model",["video","generation","ai"],"Freemium");
cnt+=add("polish-video","Polish Video AI","video","https://polish.ai","fa-video","AI video polish","Enhance video quality with AI upscaling and denoising",["video","enhance","upscale"],"Freemium");
cnt+=add("viz-ai","Viz AI","video","https://viz.ai","fa-video","AI video analytics","AI-powered video analysis and content recognition",["video","analytics","recognition"],"Paid");
cnt+=add("morph-ai","Morph Studio","video","https://morphstudio.com","fa-video","AI video generation workflow","Build video generation workflows with AI",["video","workflow","generation"],"Freemium");
cnt+=add("dramatron","Dramatron","video","https://dramatron.com","fa-film","AI screenwriting assistant","AI co-writer for screenplays and video scripts",["script","screenplay","writing"],"Freemium");
cnt+=add("bigmp4-video","BigMP4","video","https://bigmp4.com","fa-video","AI video upscale","AI-powered video upscaling and enhancement",["video","upscale","enhance"],"Freemium");
cnt+=add("wz-ai","WZ AI","video","https://wz.ai","fa-video","AI video editor","AI-powered video editing with auto-cut and effects",["video","editing","auto-cut"],"Freemium");
cnt+=add("coupert-video","Coupert Video","video","https://coupert.com","fa-video","AI product video maker","Create product demo videos with AI",["video","product","demo"],"Freemium");
cnt+=add("shorts-ai","Shorts AI","video","https://shorts.ai","fa-video","AI short video generator","Generate vertical short-form videos with AI",["video","short-form","social"],"Freemium");
cnt+=add("twipu-ai","Twipu","video","https://twipu.com","fa-video","AI video subtitles","Auto-generate video subtitles in multiple languages",["video","subtitles","translation"],"Freemium");

// Audio tools (10)
cnt+=add("ai-voice","AI Voice","audio","https://aivoice.com","fa-microphone","AI voice generator","Natural AI voice generation for content creators",["voice","tts","narration"],"Freemium");
cnt+=add("ttsmaker","TTSMaker","audio","https://ttsmaker.com","fa-microphone","Free online TTS","Free text-to-speech with multiple languages and voices",["tts","free","online"],"Free");
cnt+=add("naturalreader","NaturalReader","audio","https://naturalreader.com","fa-book","AI text to speech","Natural-sounding TTS for reading and accessibility",["tts","reading","accessibility"],"Freemium");
cnt+=add("clipchamp-tts","Clipchamp TTS","audio","https://clipchamp.com","fa-microphone","Microsoft AI voice","Free AI voice generation in Microsoft Clipchamp",["tts","free","microsoft"],"Free");
cnt+=add("uberduck","Uberduck","audio","https://uberduck.ai","fa-music","AI voice and rap","AI voice generation for music and rap",["voice","music","rap"],"Freemium");
cnt+=add("lovo-ai","LOVO AI","audio","https://lovo.ai","fa-microphone","AI voiceover platform","Professional AI voiceover with 500+ voices",["voice","voiceover","commercial"],"Freemium");
cnt+=add("voice123","Voice123 AI","audio","https://voice123.com","fa-microphone","AI voice casting","AI-powered voice talent matching platform",["voice","casting","talent"],"Freemium");
cnt+=add("typecast","Typecast","audio","https://typecast.ai","fa-microphone","AI voice acting","AI voice acting for characters and narration",["voice","character","acting"],"Freemium");
cnt+=add("descript-lyrics","Descript Lyrics","audio","https://descript.com","fa-music","AI lyrics transcription","Auto-transcribe and edit song lyrics",["music","lyrics","transcription"],"Freemium");
cnt+=add("songdonkey","SongDonkey","audio","https://songdonkey.ai","fa-music","AI music stems splitter","Split songs into vocals, drums, bass with AI",["music","stems","split"],"Freemium");

// Code tools (15)
cnt+=add("sourcegraph","Sourcegraph Cody","code","https://sourcegraph.com","fa-code","AI code search and intelligence","AI-powered code search and understanding across repositories",["code-search","intelligence","enterprise"],"Freemium");
cnt+=add("sourcery-ai","Sourcery","code","https://sourcery.ai","fa-code","AI code refactoring","Automatic code refactoring suggestions for Python",["refactor","python","quality"],"Free");
cnt+=add("deepcode-ai","DeepCode","code","https://deepcode.ai","fa-code","AI code review","AI-powered code review and bug detection",["review","bugs","security"],"Free");
cnt+=add("snyk-ai","Snyk Code","code","https://snyk.io","fa-shield","AI security scanning","AI-powered vulnerability detection in code",["security","vulnerabilities","scan"],"Freemium");
cnt+=add("veracode","Veracode","code","https://veracode.com","fa-shield","Application security","AI-enhanced application security testing",["security","appsec","testing"],"Paid");
cnt+=add("sonarqube","SonarQube","code","https://sonarqube.org","fa-code","Code quality platform","Continuous code quality and security analysis",["quality","security","ci-cd"],"Free");
cnt+=add("codiga-ai","Codiga","code","https://codiga.io","fa-code","AI code assistant","Code analysis and snippets for code review",["analysis","snippets","review"],"Freemium");
cnt+=add("qodo-ai","Qodo","code","https://qodo.ai","fa-code","AI code testing","AI-powered test generation and code analysis",["testing","analysis","generation"],"Freemium");
cnt+=add("sweep-ai","Sweep AI","code","https://sweep.dev","fa-code","AI GitHub assistant","AI that turns issues into pull requests",["github","pr","automation"],"Freemium");
cnt+=add("codemod-ai","Codemod","code","https://codemod.com","fa-code","AI code migration","Automated codebase migration and refactoring",["migration","refactor","automation"],"Freemium");
cnt+=add("bloop-ai","Bloop AI","code","https://bloop.ai","fa-search","AI code search","Natural language code search across your codebase",["search","natural-language","codebase"],"Freemium");
cnt+=add("mutable-ai","Mutable AI","code","https://mutable.ai","fa-code","AI codebase editing","AI-powered codebase modification and feature addition",["editing","features","automation"],"Freemium");
cnt+=add("devika-ai","Devika","code","https://devika.ai","fa-code","AI software engineer","Open-source AI software engineer agent",["agent","engineering","open-source"],"Free");
cnt+=add("gorilla-cli","Gorilla CLI","code","https://github.com/gorilla-llm/gorilla-cli","fa-terminal","AI terminal assistant","Natural language command line interface",["cli","terminal","assistant"],"Free");
cnt+=add("shell-genie","Shell Genie","code","https://shellgenie.com","fa-terminal","AI shell commands","Generate shell commands from natural language",["shell","commands","terminal"],"Free");

// Text/Writing tools (15)
cnt+=add("hypotenuse-prod","Hypotenuse Product","text","https://hypotenuse.ai","fa-pen","AI product descriptions","Batch product description generation for ecommerce",["ecommerce","product","batch"],"Freemium");
cnt+=add("texta-copilot","Texta Copilot","text","https://texta.ai","fa-pen","AI writing copilot","AI writing assistant for articles and marketing",["writing","marketing","articles"],"Freemium");
cnt+=add("ai-text","AI Text","text","https://aitext.com","fa-pen","AI text generator","Free AI text generation for various use cases",["text","free","generation"],"Free");
cnt+=add("writely-ai","Writely AI","text","https://writelyai.com","fa-pen","AI essay writer","AI-powered essay and academic writing assistant",["essay","academic","writing"],"Freemium");
cnt+=add("textify","Textify","text","https://textify.com","fa-pen","AI text simplifier","Simplify and summarize complex text with AI",["simplify","summarize","text"],"Freemium");
cnt+=add("text-blaze","Text Blaze","text","https://blaze.today","fa-pen","AI text expansion","Create text snippets and templates with AI",["snippets","templates","productivity"],"Free");
cnt+=add("magickpen","MagickPen","text","https://magickpen.com","fa-pen","AI writing tool","AI-powered writing assistant for all content types",["writing","content","assistant"],"Freemium");
cnt+=add("easy-ai","Easy AI","text","https://easy-ai.com","fa-pen","Simple AI writer","Simple AI writing for social media and blogs",["social","blog","simple"],"Freemium");
cnt+=add("koala-writer","Koala Writer","text","https://koala.sh","fa-pen","AI blog writer","AI article writer optimized for SEO",["blog","seo","articles"],"Paid");
cnt+=add("atonce-ai","AtOnce","text","https://atonce.com","fa-pen","AI content generator","AI content generation for marketing teams",["content","marketing","team"],"Freemium");
cnt+=add("txt-ai","Txt AI","text","https://txt.ai","fa-pen","AI text processing","AI-powered text search and processing",["search","processing","nlp"],"Freemium");
cnt+=add("type-ai","Type AI","text","https://type.ai","fa-pen","AI typing assistant","AI typing and writing enhancement in any app",["typing","writing","enhancement"],"Freemium");
cnt+=add("pen-ai","Pen AI","text","https://pen.ai","fa-pen","AI pen writing","AI writing assistant focused on long-form content",["long-form","writing","content"],"Freemium");
cnt+=add("inkforall-pro","INK Pro","text","https://inkforall.com","fa-pen","AI SEO writing pro","Professional AI SEO writing with content scoring",["seo","writing","scoring"],"Paid");
cnt+=add("smodin-ai","Smodin","text","https://smodin.ai","fa-pen","AI writing and homework","AI writing assistant for students and professionals",["writing","homework","student"],"Freemium");

// Productivity tools (14)
cnt+=add("motion-pro","Motion Pro","productivity","https://motion.ai","fa-calendar","AI calendar pro","AI-powered calendar with smart scheduling",["calendar","scheduling","ai"],"Paid");
cnt+=add("reclaim-ai","Reclaim AI","productivity","https://reclaim.ai","fa-calendar","AI schedule optimizer","AI that protects your time and optimizes your calendar",["calendar","time-management","scheduling"],"Freemium");
cnt+=add("clockwise-ai","Clockwise","productivity","https://clockwise.com","fa-clock","AI meeting scheduler","AI meeting scheduler that protects focus time",["meetings","scheduling","focus"],"Freemium");
cnt+=add("trevor-ai","Trevor AI","productivity","https://trevor.ai","fa-tasks","AI task planner","AI task planning and time blocking",["tasks","planning","time-blocking"],"Freemium");
cnt+=add("akiflow","Akiflow","productivity","https://akiflow.com","fa-inbox","AI inbox manager","AI-powered inbox and task consolidation",["inbox","tasks","consolidation"],"Freemium");
cnt+=add("sunsama","Sunsama","productivity","https://sunsama.com","fa-sun","AI daily planner","AI-assisted daily planning and review",["planning","daily","review"],"Paid");
cnt+=add("taskade-pro","Taskade Pro","productivity","https://taskade.com","fa-project-diagram","AI project workspace","AI-powered project management and collaboration",["project","management","ai"],"Freemium");
cnt+=add("height-ai","Height","productivity","https://height.app","fa-tasks","AI project management","AI-powered project management with automation",["project","automation","tasks"],"Freemium");
cnt+=add("-clickup-ai","ClickUp AI","productivity","https://clickup.com","fa-tasks","AI productivity platform","AI-powered project management and productivity",["project","productivity","ai"],"Freemium");
cnt+=add("asana-ai","Asana AI","productivity","https://asana.com","fa-tasks","AI work management","AI-powered work management and project tracking",["project","tracking","management"],"Freemium");
cnt+=add("monday-ai","Monday AI","productivity","https://monday.com","fa-tasks","AI project platform","AI-enhanced project management platform",["project","management","platform"],"Freemium");
cnt+=add("notion-calendar","Notion Calendar","productivity","https://notion.so/calendar","fa-calendar","AI calendar by Notion","Calendar integrated with Notion workspace",["calendar","notion","integration"],"Free");
cnt+=add("reflect-notes","Reflect","productivity","https://reflect.app","fa-sticky-note","AI notes app","AI-powered note-taking and knowledge management",["notes","knowledge","ai"],"Paid");
cnt+=add("bear-notes","Bear AI","productivity","https://bear.app","fa-paw","AI markdown notes","Markdown notes with AI assistance",["notes","markdown","ai"],"Freemium");

// Research tools (10)
cnt+=add("consensus-pro","Consensus Pro","research","https://consensus.app","fa-search","AI research search pro","AI-powered academic search with consensus scoring",["academic","search","consensus"],"Paid");
cnt+=add("scite-ai","Scite","research","https://scite.ai","fa-search","AI citation analysis","AI-powered citation analysis for research",["citations","analysis","academic"],"Paid");
cnt+=add("inciteful","Inciteful","research","https://inciteful.xyz","fa-search","AI literature network","AI-powered literature network analysis",["literature","network","analysis"],"Free");
cnt+=add("scholarcy","Scholarcy","research","https://scholarcy.com","fa-book","AI paper summarizer","AI that summarizes research papers into flashcards",["summarize","papers","flashcards"],"Freemium");
cnt+=add("paperpile","Paperpile","research","https://paperpile.com","fa-book","AI reference manager","AI-enhanced reference management for researchers",["references","management","academic"],"Freemium");
cnt+=add("zotero-ai","Zotero AI","research","https://zotero.org","fa-book","AI research assistant","AI-enhanced Zotero for research management",["references","research","management"],"Free");
cnt+=add("researchrabbit","Research Rabbit","research","https://researchrabbit.ai","fa-search","AI paper discovery","AI-powered paper discovery and citation mapping",["discovery","papers","citations"],"Free");
cnt+=add("connected-papers","Connected Papers","research","https://connectedpapers.com","fa-project-diagram","AI paper graph","Visual graph of related academic papers",["papers","graph","visual"],"Free");
cnt+=add("lens-ai","Lens AI","research","https://lens.org","fa-search","AI scholarly search","AI-powered scholarly search and patent analysis",["scholarly","patents","search"],"Free");
cnt+=add("sciencedirect","ScienceDirect AI","research","https://sciencedirect.com","fa-book","AI scientific search","AI-enhanced scientific literature search",["scientific","literature","search"],"Paid");

fs.writeFileSync("src/data/tools.json", JSON.stringify(tools, null, 2) + "\n", "utf-8");
console.log("Added:", cnt, "| Total tools:", Object.keys(tools).length);

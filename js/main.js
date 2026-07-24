const tools = {
    "codewords": {
        name: { en: "CodeWords" },
        cat: "code",
        url: "https://codewords.agemo.ai/r/CMOMWBZK?utm_source=copy_link&utm_medium=referral&utm_campaign=user_invite&utm_content=CMOMWBZK&ref=cmomwbzkh0000c6dtjz0fcu8e",
        icon: "fa-terminal",
        featured: true,
        short_desc: { en: "AI-powered collaborative coding and code generation platform" },
        long_desc: {
           
            en: "CodeWords is an AI-powered collaborative coding platform featuring intelligent code completion, natural language to code generation, and code review & optimization. It deeply integrates large language models to understand project context and provide precise programming suggestions."
        },
        scenes: {
           
            en: ["Rapid boilerplate generation", "Code refactoring & optimization", "Natural language to code", "Team collaborative coding"]
        },
        pros: {
           
            en: ["Context-aware intelligent completion", "Supports multiple programming languages", "Earn extra credits by inviting friends"]
        },
        cons: {
           
            en: ["New platform with building ecosystem", "Some advanced features require subscription", "Limited understanding of complex projects"]
        },
        example: {
           
            en: "Example: 'Write a Python function using asyncio to concurrently download multiple images with error retry logic.'"
        },
        target_audience: {
           
            en: ["Developers", "Programming beginners", "Tech teams", "Full-stack engineers"]
        },
        features: {
           
            en: ["AI code completion", "Natural language code generation", "Code review suggestions", "Multi-language support"]
        },
        use_cases: {
           
            en: ["Generate full function from a sentence", "Auto-detect potential bugs in code", "Refactor legacy code to modern syntax", "Quickly understand unfamiliar codebases"]
        }
    },
    "chatgpt": {
        name: { en: "ChatGPT" },
        cat: "text",
        url: "https://chatgpt.com",
        icon: "fa-comment-dots",
        short_desc: { en: "General AI assistant by OpenAI" },
        long_desc: {
           
            en: "ChatGPT is a conversational AI based on Large Language Models (LLM). It can not only engage in natural conversations but also handle complex logical reasoning, write code, and create various literary works. Through continuous RLHF, it has reached industry-leading levels in understanding human intent."
        },
        scenes: {
           
            en: ["Drafting emails/reports", "Coding bug debugging", "Language translation", "Creative brainstorming"]
        },
        pros: {
           
            en: ["Extremely versatile for almost any task", "Supports text, image, and voice input", "Huge ecosystem of plugins and integrations"]
        },
        cons: {
           
            en: ["Occasional hallucinations on niche topics", "Requires internet for most features", "Can be verbose in responses"]
        },
        example: {
           
            en: "Example: 'Please help me refactor this complex Python code into a more readable version and explain the choices for each step.'"
        },
        target_audience: {
           
            en: ["Marketers", "Students", "Developers", "Writers"]
        },
        features: {
           
            en: ["Natural language conversation", "Multi-modal input", "Code generation", "Web browsing"]
        },
        use_cases: {
           
            en: ["Write a marketing email in 30 seconds", "Debug a Python script with explanations", "Translate a document while preserving tone", "Brainstorm 10 blog post ideas"]
        }
    },
    "claude": {
        name: { en: "Claude" },
        cat: "text",
        url: "https://claude.ai",
        icon: "fa-feather-alt",
        short_desc: { en: "Long-context AI assistant by Anthropic" },
        long_desc: {
           
            en: "Claude, developed by Anthropic, is renowned for its extremely long context window (200K tokens) and excellent document analysis capabilities. It excels at writing, editing, and summarizing long-form content, with a strong focus on safety."
        },
        scenes: {
           
            en: ["Whole book analysis", "Legal contract review", "Technical whitepaper writing", "Long-form multilingual translation"]
        },
        pros: {
           
            en: ["Unmatched long-context handling", "More natural and coherent writing style", "Strong safety and refusal behaviors"]
        },
        cons: {
           
            en: ["Limited availability in some regions", "No native real-time web search", "Free tier has strict rate limits"]
        },
        example: {
           
            en: "Example: 'Please read this 50-page business plan, summarize the core model and risks, and give 3 optimization suggestions.'"
        },
        target_audience: {
           
            en: ["Researchers", "Lawyers", "Students", "Technical writers"]
        },
        features: {
           
            en: ["200K context window", "Document upload analysis", "Constitutional AI safety", "Artifact preview"]
        },
        use_cases: {
           
            en: ["Analyze a 100-page legal contract for risks", "Summarize a full book into key takeaways", "Write a technical whitepaper from scratch", "Compare two long research papers side by side"]
        }
    },
    "midjourney": {
        name: { en: "Midjourney" },
        cat: "image",
        url: "https://midjourney.com",
        icon: "fa-palette",
        short_desc: { en: "Top-tier AI artistic image generator" },
        long_desc: {
           
            en: "Midjourney is the AI drawing tool with the highest aesthetic ceiling on the market. With its unique training dataset, it can generate images with a strong sense of art and fine lighting. Whether it's photorealistic photography or abstract art, it provides professional-grade outputs."
        },
        scenes: {
           
            en: ["Commercial poster design", "Concept art creation", "Product rendering", "Social media illustration"]
        },
        pros: {
           
            en: ["Best-in-class artistic quality", "Stunning lighting and composition", "Active community for inspiration"]
        },
        cons: {
           
            en: ["Operates inside Discord only", "No free trial anymore", "Less control over exact anatomy"]
        },
        example: {
           
            en: "Example: 'Cyberpunk city street, neon lights, 8k, hyper-realistic, cinematic lighting --ar 16:9'"
        },
        target_audience: {
           
            en: ["Digital artists", "Game designers", "Marketers", "Content creators"]
        },
        features: {
           
            en: ["Text-to-image generation", "Style tuning and blending", "Upscaling and variations", "Inpainting and outpainting"]
        },
        use_cases: {
           
            en: ["Generate a cinematic movie poster", "Create concept art for a video game character", "Design Instagram-worthy product visuals", "Produce abstract art for print-on-demand"]
        }
    },
    "stable-diffusion": {
        name: { en: "Stable Diffusion" },
        cat: "image",
        url: "https://stability.ai",
        icon: "fa-image",
        short_desc: { en: "Open-source image generation model for local deployment" },
        long_desc: {
           
            en: "Stable Diffusion is the most popular open-source image generation model. Unlike closed-source commercial tools, it can run locally for free and has a massive community with countless fine-tuned models (LoRA/ControlNet) for every style."
        },
        scenes: {
           
            en: ["Privacy-sensitive local creation", "Anime character design", "E-commerce product batch generation", "Architectural interior renders"]
        },
        pros: {
           
            en: ["Completely free and open-source", "Runs offline for full privacy", "Massive ecosystem of models and extensions"]
        },
        cons: {
           
            en: ["Steep learning curve for beginners", "Requires powerful GPU for good speed", "Output consistency lower than commercial tools"]
        },
        example: {
           
            en: "Example: 'masterpiece, best quality, 1girl, standing in a sunflower field, golden hour, soft lighting, highly detailed'"
        },
        target_audience: {
           
            en: ["Indie developers", "Privacy-conscious users", "Anime fans", "AI researchers"]
        },
        features: {
           
            en: ["Local deployment", "LoRA fine-tuning", "ControlNet structure control", "Inpainting and img2img"]
        },
        use_cases: {
           
            en: ["Generate anime characters with consistent outfits", "Create product mockups without sending data to cloud", "Restore old photos using inpainting", "Train a personal art style model"]
        }
    },
    "github-copilot": {
        name: { en: "GitHub Copilot" },
        cat: "code",
        url: "https://github.com/features/copilot",
        icon: "fa-code",
        short_desc: { en: "AI pair programmer embedded in your IDE" },
        long_desc: {
           
            en: "Developed by GitHub and OpenAI, Copilot is deeply integrated into VS Code, JetBrains, and other major IDEs. It provides real-time whole-line or whole-function suggestions as you code, dramatically improving productivity across dozens of languages."
        },
        scenes: {
           
            en: ["Boilerplate code generation", "Unit test auto-writing", "Unfamiliar API usage examples", "Auto-generating code comments"]
        },
        pros: {
           
            en: ["Deep IDE integration", "Supports 30+ programming languages", "Speeds up repetitive coding tasks dramatically"]
        },
        cons: {
           
            en: ["Monthly subscription cost", "Can suggest insecure code patterns", "Occasionally produces irrelevant suggestions"]
        },
        example: {
           
            en: "Example: Type the comment '// Write a recursive function to calculate Fibonacci' and Copilot auto-generates the full implementation."
        },
        target_audience: {
           
            en: ["Software developers", "Data scientists", "DevOps engineers", "Students"]
        },
        features: {
           
            en: ["Real-time code suggestions", "Whole-function generation", "Chat interface in IDE", "Multi-language support"]
        },
        use_cases: {
           
            en: ["Auto-complete a REST API endpoint", "Generate unit tests for existing functions", "Explain legacy code in plain English", "Convert Python code to JavaScript"]
        }
    },
    "cursor": {
        name: { en: "Cursor" },
        cat: "code",
        url: "https://cursor.sh",
        icon: "fa-terminal",
        short_desc: { en: "AI-native code editor built on VS Code" },
        long_desc: {
           
            en: "Cursor is a VS Code fork with built-in GPT-4-level AI. Beyond code completion, it can edit entire files, refactor projects, and auto-generate commit messages via natural language commands."
        },
        scenes: {
           
            en: ["One-click whole-file refactoring", "Natural language code search across projects", "Auto bug diagnosis and fixing", "Cross-file code migration"]
        },
        pros: {
           
            en: ["Understands entire codebase context", "Most natural AI editing experience", "Blazing fast command palette"]
        },
        cons: {
           
            en: ["Heavy reliance on internet connection", "Limited free quota", "Indexing large projects can be slow"]
        },
        example: {
           
            en: "Example: Select code and type 'Convert this callback to async/await with error handling' and Cursor rewrites it in place."
        },
        target_audience: {
           
            en: ["Full-stack developers", "Startup founders", "Freelancers", "AI enthusiasts"]
        },
        features: {
           
            en: ["AI-powered code editing", "Natural language refactoring", "Codebase-wide search", "Auto-commit message generation"]
        },
        use_cases: {
           
            en: ["Refactor a 500-line file in one command", "Find all usages of a deprecated API across the project", "Fix a bug by describing the symptoms", "Generate a README from the project structure"]
        }
    },
    "sora": {
        name: { en: "Sora" },
        cat: "video",
        url: "https://openai.com/sora",
        icon: "fa-video",
        short_desc: { en: "OpenAI's text-to-video generation model" },
        long_desc: {
           
            en: "Sora is OpenAI's revolutionary video generation model that creates up to 60 seconds of high-quality video from text prompts. Its ability to simulate physics, camera motion, and character consistency is groundbreaking, hailed as the 'ChatGPT moment' for video."
        },
        scenes: {
           
            en: ["Ad creative pre-visualization", "Movie storyboard prototyping", "Social media short video generation", "Product demo motion showcase"]
        },
        pros: {
           
            en: ["Unprecedented video length and consistency", "Realistic physics understanding", "Cinematic output quality"]
        },
        cons: {
           
            en: ["Not widely available yet", "Slow generation speed", "Complex physics interactions can glitch"]
        },
        example: {
           
            en: "Example: 'A stylish woman walks down a neon-lit Tokyo street, wet reflective pavement, cinematic, 35mm film style'"
        },
        target_audience: {
           
            en: ["Filmmakers", "Advertisers", "Social media managers", "Game developers"]
        },
        features: {
           
            en: ["Text-to-video up to 60s", "Physics simulation", "Camera motion control", "Character consistency"]
        },
        use_cases: {
           
            en: ["Create a movie trailer from a script", "Generate social media ads with product placement", "Prototype a cinematic scene before filming", "Build immersive game cutscenes"]
        }
    },
    "runway": {
        name: { en: "Runway" },
        cat: "video",
        url: "https://runwayml.com",
        icon: "fa-film",
        short_desc: { en: "All-in-one AI video creation and editing platform" },
        long_desc: {
           
            en: "Runway is an AI magic toolbox for creatives. Beyond text/image-to-video (Gen-2), it offers video matting, frame interpolation, infinite canvas expansion, and face replacement — a powerhouse for independent filmmakers and designers."
        },
        scenes: {
           
            en: ["One-click background removal/replacement", "Old video frame interpolation to 60fps", "Static image to motion shot", "Video style transfer"]
        },
        pros: {
           
            en: ["Full video production pipeline in browser", "No high-end hardware needed", "Intuitive interface for non-experts"]
        },
        cons: {
           
            en: ["Gen-2 clips limited to 4 seconds", "High-res export requires paid plan", "Sometimes artifacts in motion"]
        },
        example: {
           
            en: "Example: Upload a landscape photo, type 'Drone slowly flying forward, slight downward tilt' to generate a cinematic aerial shot."
        },
        target_audience: {
           
            en: ["Video editors", "Content creators", "Designers", "Indie filmmakers"]
        },
        features: {
           
            en: ["Gen-2 text/image-to-video", "Green screen removal", "Frame interpolation", "Infinite image expansion"]
        },
        use_cases: {
           
            en: ["Remove background from a video without a green screen", "Turn a static photo into a moving drone shot", "Upscale old footage to 60fps", "Apply artistic style transfer to a video clip"]
        }
    },
    "elevenlabs": {
        name: { en: "ElevenLabs" },
        cat: "audio",
        url: "https://try.elevenlabs.io/j50wgji2obha",
        icon: "fa-microphone-alt",
        featured: true,
        short_desc: { en: "The most realistic AI voice synthesis and cloning" },
        long_desc: {
           
            en: "ElevenLabs offers near-indistinguishable text-to-speech (TTS). It supports 29 languages, clones any voice with just seconds of sample audio, and provides fine control over emotion, intonation, and pauses — the top choice for podcasts, audiobooks, and game dubbing."
        },
        scenes: {
           
            en: ["Audiobook batch production", "Video multilingual auto-dubbing", "Game character voice generation", "VTuber real-time voice"]
        },
        pros: {
           
            en: ["Most realistic TTS on the market", "Voice cloning quality is astonishing", "Excellent multilingual coverage"]
        },
        cons: {
           
            en: ["Expensive character-based pricing", "Chinese prosody occasionally less natural", "Ethical concerns around deepfake voices"]
        },
        example: {
           
            en: "Example: Input a novel line, choose 'gentle with a touch of melancholy' style, and generate narration indistinguishable from a human actor."
        },
        target_audience: {
           
            en: ["Podcasters", "Audiobook producers", "Game developers", "YouTubers"]
        },
        features: {
           
            en: ["Voice cloning from seconds of audio", "29-language support", "Emotion and intonation control", "Real-time streaming API"]
        },
        use_cases: {
           
            en: ["Clone your voice to narrate a 10-hour audiobook", "Dub a video into 5 languages with the same voice", "Create unique character voices for a game", "Generate a podcast intro with a celebrity voice style"]
        }
    },
    "perplexity": {
        name: { en: "Perplexity" },
        cat: "productivity",
        url: "https://perplexity.ai",
        icon: "fa-search",
        short_desc: { en: "AI-powered real-time search engine" },
        long_desc: {
           
            en: "Perplexity combines LLMs with real-time web search to directly answer complex questions like a research assistant, citing sources for every claim. It revolutionizes the traditional search experience of 'links instead of answers'."
        },
        scenes: {
           
            en: ["Academic paper quick research", "Real-time news tracking", "Product purchase decision comparison", "Deep technical concept explanation"]
        },
        pros: {
           
            en: ["Answers are accurate and verifiable", "No information lag due to real-time search", "Clean, ad-free interface"]
        },
        cons: {
           
            en: ["Less deep analysis than dedicated LLMs", "Can miss nuances in complex multi-step reasoning", "Free tier has limited Pro searches"]
        },
        example: {
           
            en: "Example: 'Compare Tesla and BYD's Q4 2024 financial reports, listing respective strengths and risks.'"
        },
        target_audience: {
           
            en: ["Researchers", "Journalists", "Students", "Investors"]
        },
        features: {
           
            en: ["Real-time web search", "Source citation for every answer", "Follow-up questions", "Pro search with Copilot"]
        },
        use_cases: {
           
            en: ["Research the latest AI regulations in the EU", "Compare two smartphone models with up-to-date prices", "Summarize a breaking news story with verified sources", "Find academic papers on a niche scientific topic"]
        }
    },
    "notion-ai": {
        name: { en: "Notion AI" },
        cat: "productivity",
        url: "https://notion.so/product/ai",
        icon: "fa-sticky-note",
        short_desc: { en: "Smart writing and knowledge management inside your workflow" },
        long_desc: {
           
            en: "Notion AI is built directly into Notion, helping you continue writing notes, summarize meetings, extract action items, translate documents, and even auto-generate reports from databases. It seamlessly embeds AI into every step of daily collaboration and knowledge building."
        },
        scenes: {
           
            en: ["Auto-extract to-dos from meeting notes", "Turn scattered notes into structured articles", "Instant multilingual document translation", "Batch analysis and summarization of database content"]
        },
        pros: {
           
            en: ["Deeply integrated with note-taking workflow", "No app switching required", "Excellent for team collaboration"]
        },
        cons: {
           
            en: ["AI features require extra payment", "Slower generation for very long documents", "Locked into the Notion ecosystem"]
        },
        example: {
           
            en: "Example: Select messy meeting notes and type 'Organize into a clear summary and extract all Action Items'."
        },
        target_audience: {
           
            en: ["Project managers", "Teams", "Writers", "Knowledge workers"]
        },
        features: {
           
            en: ["Inline AI writing assistant", "Meeting notes summarization", "Database auto-fill", "Multi-language translation"]
        },
        use_cases: {
           
            en: ["Turn messy meeting notes into action items", "Write a project proposal from a bullet list", "Translate a document into Japanese instantly", "Generate a weekly report from a task database"]
        }
    },
    "hostinger": {
        name: { en: "Hostinger" },
        cat: "productivity",
        url: "https://www.hostinger.com?REFERRALCODE=5YF251676FDR",
        icon: "fa-server",
        hidden: true,
        short_desc: { en: "High-performance web hosting and website builder" },
        long_desc: {
           
            en: "Hostinger is a globally recognized web hosting provider offering shared hosting, VPS, cloud hosting, and domain registration. Known for exceptional value, reliable servers, and the user-friendly hPanel control panel, it's ideal for individual webmasters, developers, and small businesses."
        },
        scenes: {
           
            en: ["Building personal blogs and portfolio sites", "Deploying AI tool directories", "Small business website hosting", "E-commerce independent stores"]
        },
        pros: {
           
            en: ["Extremely competitive pricing, beginner-friendly", "Clean and intuitive hPanel control panel", "Global data centers with fast access speeds"]
        },
        cons: {
           
            en: ["Low-tier plans have limited resources", "Some advanced features require plan upgrades", "Chinese customer support is relatively limited"]
        },
        example: {
           
            en: "Example: After purchasing the Business plan, install WordPress with one click and launch a professional blog or e-commerce site within 10 minutes."
        },
        target_audience: {
           
            en: ["Individual webmasters", "Developers", "Small business owners", "Cross-border e-commerce sellers"]
        },
        features: {
           
            en: ["One-click WordPress installation", "Free SSL certificate and CDN", "hPanel visual control panel", "Daily automatic backups"]
        },
        use_cases: {
           
            en: ["Quickly build a blog with WordPress", "Deploy standalone landing pages for AI projects", "Set up a cross-border e-commerce WooCommerce store", "Host multiple subdomain projects"]
        }
    }
};

const i18n = {
    en: {
        nav_home: "Home", nav_submit: "Submit Tool", nav_about: "About",
        ad_sponsored: "Sponsored", ad_top_text: "Ad space available | Contact us for premium AI brand partnerships.", ad_learn_more: "Contact Us",
        hero_title: "Find the Best AI Tools for Any Task",
        hero_subtitle: "Curated AI tools for writing, coding, design & business",
        cta_browse: "Browse Tools",
        cta_start_free: "Start Free",
        cat_all: "All", cat_text: "Writing", cat_image: "Images", cat_code: "Coding", cat_video: "Video", cat_audio: "Audio", cat_prod: "Business",
        ad_promo: "Promo", ad_mid_text: "📢 Want to showcase your AI product here? Contact us for partnership details.", ad_try_now: "Contact Us",
        footer_text: "© 2026 AI Tool Hub. Designed for Productivity.",
        category_labels: { text: "Writing", image: "Image", code: "Code", video: "Video", audio: "Audio", productivity: "Business" },
        detail_intro: "Introduction", detail_scenes: "Use Cases", detail_pros: "Pros", detail_cons: "Cons", detail_example: "Example Output", detail_use_btn: "Use Now", detail_back: "Back to Home",
        detail_audience: "Target Audience", detail_features: "Key Features", detail_use_cases: "Use Cases",
        value_title: "Why AI Tool Hub?",
        value_item1: "Curated", value_item1_desc: "No spam. Each tool is manually tested for quality.",
        value_item2: "Deep Reviews", value_item2_desc: "More than links; providing real-world analysis and pros/cons.",
        value_item3: "Real-time", value_item3_desc: "Catch the latest dynamics in AI and keep updated instantly.",
        rec_title: "Recommended this Week", rec_desc: "Top AI tools selected by community heat and utility.",
        footer_privacy: "Privacy Policy", footer_terms: "Terms of Service", footer_contact: "Contact Us"
    }
};

// AFFILIATE CONFIG: replace '#' with your actual referral links
const affiliateUrls = {
    digitalocean: 'https://m.do.co/c/24cff868d546',
    vultr: 'https://www.vultr.com/?ref=9897939',
    linode: '#',       // https://www.linode.com/lp/refer/?r=YOUR_CODE
    elevenlabs: 'https://try.elevenlabs.io/j50wgji2obha',   // ElevenLabs referral link
    notion: 'https://notion.so/product/ai' // replace with affiliate link when approved
};

// GLOBAL STATE
let currentLang = localStorage.getItem('lang') || 'en';
let currentTheme = localStorage.getItem('theme') || 'dark';

// Helper for Detail Page
function getToolById(id) {
    return tools[id] || null;
}

// UI UPDATE LOGIC
function updateText() {
    document.querySelectorAll('[data-i18n]').forEach(el => {
        const key = el.dataset.i18n;
        if (i18n[currentLang] && i18n[currentLang][key]) {
            el.textContent = i18n[currentLang][key];
        }
    });
    document.querySelectorAll('[data-i18n-placeholder]').forEach(el => {
        const key = el.dataset.i18nPlaceholder;
        if (i18n[currentLang] && i18n[currentLang][key]) {
            el.placeholder = i18n[currentLang][key];
        }
    });
}

function applyTheme(theme) {
    const themeIcon = document.getElementById('theme-icon');
    if (theme === 'light') {
        document.body.classList.add('light-theme');
        if (themeIcon) themeIcon.className = 'fas fa-sun';
    } else {
        document.body.classList.remove('light-theme');
        if (themeIcon) themeIcon.className = 'fas fa-moon';
    }
}

function renderTools(filterCat = 'all', searchTerm = '') {
    const toolGrid = document.getElementById('tool-grid');
    if (!toolGrid) return;

    toolGrid.innerHTML = '';
    const filtered = Object.entries(tools).filter(([id, t]) => {
        if (t.hidden) return false;
        const matchCat = filterCat === 'all' || t.cat === filterCat;
        const matchSearch = t.name[currentLang].toLowerCase().includes(searchTerm.toLowerCase()) ||
                            t.short_desc[currentLang].toLowerCase().includes(searchTerm.toLowerCase());
        return matchCat && matchSearch;
    });

    // Featured tools with referral links go first
    filtered.sort((a, b) => (b[1].featured ? 1 : 0) - (a[1].featured ? 1 : 0));

    filtered.forEach(([id, t]) => {
        const card = document.createElement('a');
        card.href = `tool.html?id=${id}`;
        card.target = '_blank';
        card.className = 'tool-card';
        const featuredBadge = t.featured ? `<span style="position:absolute;top:14px;right:14px;padding:3px 10px;border-radius:6px;background:var(--accent-color);color:#fff;font-size:11px;font-weight:600;">${'Featured'}</span>` : '';
        card.innerHTML = `
            ${featuredBadge}
            <div class="tool-icon"><i class="fas ${t.icon}"></i></div>
            <h3>${t.name[currentLang]}</h3>
            <p>${t.short_desc[currentLang]}</p>
            <div class="tool-tag">${i18n[currentLang].category_labels[t.cat] || t.cat}</div>
        `;
        toolGrid.appendChild(card);
    });

    if (filtered.length === 0) {
        toolGrid.innerHTML = `<p style="grid-column: 1/-1; text-align: center; color: var(--text-mute);">${'No AI tools found...'}</p>`;
    }
}

function scrollToToolsAndFilter(cat) {
    const toolGrid = document.getElementById('tool-grid');
    const catBtns = document.querySelectorAll('.cat-btn');
    if (toolGrid) {
        toolGrid.scrollIntoView({ behavior: 'smooth', block: 'start' });
    }
    catBtns.forEach(btn => {
        btn.classList.toggle('active', btn.dataset.category === cat);
    });
    renderTools(cat);
}

// EVENT LISTENERS
function initEvents() {
    const langSelect = document.getElementById('lang-select');
    const themeToggle = document.getElementById('theme-toggle');
    const searchInput = document.getElementById('search-input');
    const catBtns = document.querySelectorAll('.cat-btn');

    if (langSelect) {
        langSelect.value = currentLang;
        langSelect.addEventListener('change', (e) => {
            currentLang = e.target.value;
            localStorage.setItem('lang', currentLang);
            updateText();
            renderTools(document.querySelector('.cat-btn.active')?.dataset.category || 'all');
            if (window.location.pathname.includes('tool.html')) location.reload();
        });
    }

    if (themeToggle) {
        themeToggle.addEventListener('click', () => {
            currentTheme = currentTheme === 'dark' ? 'light' : 'dark';
            localStorage.setItem('theme', currentTheme);
            applyTheme(currentTheme);
        });
    }

    if (searchInput) {
        searchInput.addEventListener('input', (e) => {
            const term = e.target.value;
            const activeCat = document.querySelector('.cat-btn.active')?.dataset.category || 'all';
            renderTools(activeCat, term);
        });
    }

    catBtns.forEach(btn => {
        btn.addEventListener('click', () => {
            catBtns.forEach(b => b.classList.remove('active'));
            btn.classList.add('active');
            renderTools(btn.dataset.category);
        });
    });

    // Category hero cards click handler
    document.querySelectorAll('.cat-hero-card').forEach(card => {
        card.addEventListener('click', () => {
            const cat = card.dataset.category;
            if (cat) scrollToToolsAndFilter(cat);
        });
    });

    // Hero CTA scroll
    const browseBtn = document.getElementById('cta-browse');
    if (browseBtn) {
        browseBtn.addEventListener('click', (e) => {
            e.preventDefault();
            const toolGrid = document.getElementById('tool-grid');
            if (toolGrid) toolGrid.scrollIntoView({ behavior: 'smooth', block: 'start' });
        });
    }
}

// GLOBAL INITIALIZATION
window.addEventListener('DOMContentLoaded', () => {
    applyTheme(currentTheme);
    updateText();
    initEvents();

    // Only render tools if we are on the homepage
    if (document.getElementById('tool-grid')) {
        renderTools();

        // Special logic for Recommended section on Homepage
        const recGrid = document.getElementById('rec-grid');
        if (recGrid) {
            const recommendedIds = ['codewords', 'elevenlabs', 'chatgpt', 'claude', 'midjourney'];
            recommendedIds.forEach(id => {
                const tool = getToolById(id);
                if (tool) {
                    const card = document.createElement('a');
                    card.href = `tool.html?id=${id}`;
                    card.className = 'tool-card rec-card';
                    const prosList = tool.pros[currentLang].slice(0, 2).map(p => `<li><i class="fas fa-check"></i> ${p}</li>`).join('');
                    const sceneTags = tool.scenes[currentLang].slice(0, 2).map(s => `<span class="scene-tag">${s}</span>`).join('');
                    const recFeaturedBadge = tool.featured ? `<span style="position:absolute;top:14px;right:14px;padding:3px 10px;border-radius:6px;background:var(--accent-color);color:#fff;font-size:11px;font-weight:600;">${'Featured'}</span>` : '';
                    card.innerHTML = `
                        ${recFeaturedBadge}
                        <div class="tool-icon"><i class="fas ${tool.icon}"></i></div>
                        <h3>${tool.name[currentLang]}</h3>
                        <p class="rec-desc">${tool.short_desc[currentLang]}</p>
                        <ul class="rec-pros">${prosList}</ul>
                        <div class="rec-scenes">${sceneTags}</div>
                        <div class="tool-tag">${i18n[currentLang].category_labels[tool.cat] || tool.cat}</div>
                    `;
                    recGrid.appendChild(card);
                }
            });
        }
    }
});

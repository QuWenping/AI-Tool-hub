const tools = {
    "chatgpt": {
        name: { zh: "ChatGPT", en: "ChatGPT" },
        cat: "text",
        url: "https://chatgpt.com",
        icon: "fa-comment-dots",
        short_desc: { zh: "由 OpenAI 开发的通用 AI 助手", en: "General AI assistant by OpenAI" },
        long_desc: {
            zh: "ChatGPT 是一个基于大语言模型 (LLM) 的对话式 AI。它不仅能进行自然流畅的对话，还能处理复杂的逻辑推理、编写代码以及创作各类文学作品。通过不断的 RLHF (人类反馈强化学习)，它在理解人类意图方面达到了行业领先水平。",
            en: "ChatGPT is a conversational AI based on Large Language Models (LLM). It can not only engage in natural conversations but also handle complex logical reasoning, write code, and create various literary works. Through continuous RLHF, it has reached industry-leading levels in understanding human intent."
        },
        scenes: {
            zh: ["快速草拟邮件/报告", "编程 Bug 调试", "语言翻译与润色", "头脑风暴创意"],
            en: ["Drafting emails/reports", "Coding bug debugging", "Language translation", "Creative brainstorming"]
        },
        pros: {
            zh: ["几乎所有任务都能胜任", "支持文本、图像和语音输入", "插件和集成生态庞大"],
            en: ["Extremely versatile for almost any task", "Supports text, image, and voice input", "Huge ecosystem of plugins and integrations"]
        },
        cons: {
            zh: ["小众话题偶尔出现幻觉", "大部分功能需要联网", "回答有时会过于冗长"],
            en: ["Occasional hallucinations on niche topics", "Requires internet for most features", "Can be verbose in responses"]
        },
        example: {
            zh: "示例：'请帮我将这段复杂的 Python 代码重构为更具可读性的版本，并解释每一步的选择。'",
            en: "Example: 'Please help me refactor this complex Python code into a more readable version and explain the choices for each step.'"
        },
        target_audience: {
            zh: ["营销人员", "学生", "开发者", "写作者"],
            en: ["Marketers", "Students", "Developers", "Writers"]
        },
        features: {
            zh: ["自然语言对话", "多模态输入", "代码生成", "联网搜索"],
            en: ["Natural language conversation", "Multi-modal input", "Code generation", "Web browsing"]
        },
        use_cases: {
            zh: ["30秒内写一封营销邮件", "调试 Python 脚本并给出解释", "翻译文档并保持语气一致", "头脑风暴 10 个博客选题"],
            en: ["Write a marketing email in 30 seconds", "Debug a Python script with explanations", "Translate a document while preserving tone", "Brainstorm 10 blog post ideas"]
        }
    },
    "claude": {
        name: { zh: "Claude", en: "Claude" },
        cat: "text",
        url: "https://claude.ai",
        icon: "fa-feather-alt",
        short_desc: { zh: "Anthropic 出品的长文本处理专家", en: "Long-context AI assistant by Anthropic" },
        long_desc: {
            zh: "Claude 由 Anthropic 开发，以极长的上下文窗口（支持 200K tokens）和出色的文档分析能力著称。它在编写、编辑、总结长篇内容方面表现尤为突出，且安全性设计更为严谨。",
            en: "Claude, developed by Anthropic, is renowned for its extremely long context window (200K tokens) and excellent document analysis capabilities. It excels at writing, editing, and summarizing long-form content, with a strong focus on safety."
        },
        scenes: {
            zh: ["整本书籍内容分析", "法律合同审查", "技术白皮书撰写", "多语言长文翻译"],
            en: ["Whole book analysis", "Legal contract review", "Technical whitepaper writing", "Long-form multilingual translation"]
        },
        pros: {
            zh: ["长文本处理能力顶尖", "写作风格更自然连贯", "安全性和拒绝机制强大"],
            en: ["Unmatched long-context handling", "More natural and coherent writing style", "Strong safety and refusal behaviors"]
        },
        cons: {
            zh: ["部分地区访问受限", "没有原生实时联网搜索", "免费版速率限制较严"],
            en: ["Limited availability in some regions", "No native real-time web search", "Free tier has strict rate limits"]
        },
        example: {
            zh: "示例：'请阅读这份 50 页的商业计划书，总结核心商业模式、风险点，并给出 3 条优化建议。'",
            en: "Example: 'Please read this 50-page business plan, summarize the core model and risks, and give 3 optimization suggestions.'"
        },
        target_audience: {
            zh: ["研究人员", "律师", "学生", "技术文档写作者"],
            en: ["Researchers", "Lawyers", "Students", "Technical writers"]
        },
        features: {
            zh: ["200K 超长上下文", "文档上传分析", "Constitutional AI 安全架构", "Artifact 预览"],
            en: ["200K context window", "Document upload analysis", "Constitutional AI safety", "Artifact preview"]
        },
        use_cases: {
            zh: ["分析一份 100 页法律合同的风险点", "将整本书总结为关键要点", "从零撰写技术白皮书", "并排对比两篇长篇研究论文"],
            en: ["Analyze a 100-page legal contract for risks", "Summarize a full book into key takeaways", "Write a technical whitepaper from scratch", "Compare two long research papers side by side"]
        }
    },
    "midjourney": {
        name: { zh: "Midjourney", en: "Midjourney" },
        cat: "image",
        url: "https://midjourney.com",
        icon: "fa-palette",
        short_desc: { zh: "顶级的 AI 艺术图像生成器", en: "Top-tier AI artistic image generator" },
        long_desc: {
            zh: "Midjourney 是目前市场上审美上限最高的 AI 绘图工具。它通过独特的训练数据集，能够生成极具艺术感、光影处理极其细腻的图像。无论是超写实摄影还是抽象艺术，它都能提供专业级的输出成果。",
            en: "Midjourney is the AI drawing tool with the highest aesthetic ceiling on the market. With its unique training dataset, it can generate images with a strong sense of art and fine lighting. Whether it's photorealistic photography or abstract art, it provides professional-grade outputs."
        },
        scenes: {
            zh: ["商业海报设计", "概念艺术绘制", "产品渲染图生成", "社交媒体插图"],
            en: ["Commercial poster design", "Concept art creation", "Product rendering", "Social media illustration"]
        },
        pros: {
            zh: ["艺术质量业界顶尖", "光影和构图惊艳", "社区活跃，灵感丰富"],
            en: ["Best-in-class artistic quality", "Stunning lighting and composition", "Active community for inspiration"]
        },
        cons: {
            zh: ["仅在 Discord 内运行", "不再提供免费试用", "对人体解剖精确度控制有限"],
            en: ["Operates inside Discord only", "No free trial anymore", "Less control over exact anatomy"]
        },
        example: {
            zh: "示例：'Cyberpunk city street, neon lights, 8k, hyper-realistic, cinematic lighting --ar 16:9'",
            en: "Example: 'Cyberpunk city street, neon lights, 8k, hyper-realistic, cinematic lighting --ar 16:9'"
        },
        target_audience: {
            zh: ["数字艺术家", "游戏设计师", "营销人员", "内容创作者"],
            en: ["Digital artists", "Game designers", "Marketers", "Content creators"]
        },
        features: {
            zh: ["文本生成图像", "风格调优与融合", "放大与变体生成", "局部重绘与扩展"],
            en: ["Text-to-image generation", "Style tuning and blending", "Upscaling and variations", "Inpainting and outpainting"]
        },
        use_cases: {
            zh: ["生成电影级海报", "为游戏角色绘制概念艺术", "设计适合 Instagram 的产品视觉", "为按需印刷制作抽象艺术"],
            en: ["Generate a cinematic movie poster", "Create concept art for a video game character", "Design Instagram-worthy product visuals", "Produce abstract art for print-on-demand"]
        }
    },
    "stable-diffusion": {
        name: { zh: "Stable Diffusion", en: "Stable Diffusion" },
        cat: "image",
        url: "https://stability.ai",
        icon: "fa-image",
        short_desc: { zh: "开源可本地部署的图像生成模型", en: "Open-source image generation model for local deployment" },
        long_desc: {
            zh: "Stable Diffusion 是目前最流行的开源图像生成模型。与商业闭源工具不同，它可以在本地显卡上免费运行，拥有庞大的社区生态和海量微调模型 (LoRA/ControlNet)，满足从二次元到写实的各类需求。",
            en: "Stable Diffusion is the most popular open-source image generation model. Unlike closed-source commercial tools, it can run locally for free and has a massive community with countless fine-tuned models (LoRA/ControlNet) for every style."
        },
        scenes: {
            zh: ["本地隐私敏感创作", "动漫/二次元角色设计", "电商产品图批量生成", "建筑室内效果图"],
            en: ["Privacy-sensitive local creation", "Anime character design", "E-commerce product batch generation", "Architectural interior renders"]
        },
        pros: {
            zh: ["完全免费开源", "离线运行保护隐私", "模型和扩展生态极其丰富"],
            en: ["Completely free and open-source", "Runs offline for full privacy", "Massive ecosystem of models and extensions"]
        },
        cons: {
            zh: ["新手学习曲线陡峭", "需要高性能显卡才能获得良好速度", "出图一致性不如商业工具"],
            en: ["Steep learning curve for beginners", "Requires powerful GPU for good speed", "Output consistency lower than commercial tools"]
        },
        example: {
            zh: "示例：'masterpiece, best quality, 1girl, standing in a sunflower field, golden hour, soft lighting, highly detailed'",
            en: "Example: 'masterpiece, best quality, 1girl, standing in a sunflower field, golden hour, soft lighting, highly detailed'"
        },
        target_audience: {
            zh: ["独立开发者", "注重隐私的用户", "动漫爱好者", "AI 研究人员"],
            en: ["Indie developers", "Privacy-conscious users", "Anime fans", "AI researchers"]
        },
        features: {
            zh: ["本地部署", "LoRA 微调", "ControlNet 结构控制", "局部重绘与图生图"],
            en: ["Local deployment", "LoRA fine-tuning", "ControlNet structure control", "Inpainting and img2img"]
        },
        use_cases: {
            zh: ["生成服装一致的动漫角色", "不将数据发送到云端即可制作产品样机", "使用局部重绘修复老照片", "训练个人艺术风格模型"],
            en: ["Generate anime characters with consistent outfits", "Create product mockups without sending data to cloud", "Restore old photos using inpainting", "Train a personal art style model"]
        }
    },
    "github-copilot": {
        name: { zh: "GitHub Copilot", en: "GitHub Copilot" },
        cat: "code",
        url: "https://github.com/features/copilot",
        icon: "fa-code",
        short_desc: { zh: "AI 结对编程助手，无缝嵌入 IDE", en: "AI pair programmer embedded in your IDE" },
        long_desc: {
            zh: "GitHub Copilot 由 GitHub 与 OpenAI 联合开发，深度集成于 VS Code、JetBrains 等主流 IDE。它能在你编写代码时实时提供整行或整段的智能补全建议，大幅提升开发效率，支持数十种编程语言。",
            en: "Developed by GitHub and OpenAI, Copilot is deeply integrated into VS Code, JetBrains, and other major IDEs. It provides real-time whole-line or whole-function suggestions as you code, dramatically improving productivity across dozens of languages."
        },
        scenes: {
            zh: ["重复样板代码快速生成", "单元测试自动编写", "不熟悉的 API 调用示例", "代码注释自动生成"],
            en: ["Boilerplate code generation", "Unit test auto-writing", "Unfamiliar API usage examples", "Auto-generating code comments"]
        },
        pros: {
            zh: ["与 IDE 深度集成", "支持 30 多种编程语言", "极大加速重复性编码任务"],
            en: ["Deep IDE integration", "Supports 30+ programming languages", "Speeds up repetitive coding tasks dramatically"]
        },
        cons: {
            zh: ["按月订阅费用", "可能建议不安全的代码模式", "偶尔给出不相关的建议"],
            en: ["Monthly subscription cost", "Can suggest insecure code patterns", "Occasionally produces irrelevant suggestions"]
        },
        example: {
            zh: "示例：输入注释 '// 写一个递归函数计算斐波那契数列'，Copilot 会自动生成完整函数实现。",
            en: "Example: Type the comment '// Write a recursive function to calculate Fibonacci' and Copilot auto-generates the full implementation."
        },
        target_audience: {
            zh: ["软件开发人员", "数据科学家", "DevOps 工程师", "学生"],
            en: ["Software developers", "Data scientists", "DevOps engineers", "Students"]
        },
        features: {
            zh: ["实时代码建议", "整函数生成", "IDE 内聊天界面", "多语言支持"],
            en: ["Real-time code suggestions", "Whole-function generation", "Chat interface in IDE", "Multi-language support"]
        },
        use_cases: {
            zh: ["自动补全 REST API 端点", "为现有函数生成单元测试", "用通俗英语解释遗留代码", "将 Python 代码转为 JavaScript"],
            en: ["Auto-complete a REST API endpoint", "Generate unit tests for existing functions", "Explain legacy code in plain English", "Convert Python code to JavaScript"]
        }
    },
    "cursor": {
        name: { zh: "Cursor", en: "Cursor" },
        cat: "code",
        url: "https://cursor.sh",
        icon: "fa-terminal",
        short_desc: { zh: "基于 VS Code 的 AI 原生代码编辑器", en: "AI-native code editor built on VS Code" },
        long_desc: {
            zh: "Cursor 是一款基于 VS Code 分支构建的编辑器，内置了 GPT-4 级别的 AI 能力。它不仅能补全代码，还能通过自然语言指令直接编辑整个文件、重构项目、自动生成 Commit Message，是程序员的全能 AI 助手。",
            en: "Cursor is a VS Code fork with built-in GPT-4-level AI. Beyond code completion, it can edit entire files, refactor projects, and auto-generate commit messages via natural language commands."
        },
        scenes: {
            zh: [" entire 代码文件一键重构", "自然语言查找项目内代码", "Bug 自动诊断与修复", "跨文件代码迁移"],
            en: ["One-click whole-file refactoring", "Natural language code search across projects", "Auto bug diagnosis and fixing", "Cross-file code migration"]
        },
        pros: {
            zh: ["理解整个代码库上下文", "最自然的 AI 编辑体验", "命令面板极快"],
            en: ["Understands entire codebase context", "Most natural AI editing experience", "Blazing fast command palette"]
        },
        cons: {
            zh: ["严重依赖网络连接", "免费额度有限", "索引大型项目可能较慢"],
            en: ["Heavy reliance on internet connection", "Limited free quota", "Indexing large projects can be slow"]
        },
        example: {
            zh: "示例：选中一段代码，输入 '把这段回调改成 async/await 形式并加上错误处理'，Cursor 会原地重写。",
            en: "Example: Select code and type 'Convert this callback to async/await with error handling' and Cursor rewrites it in place."
        },
        target_audience: {
            zh: ["全栈开发者", "创业创始人", "自由职业者", "AI 爱好者"],
            en: ["Full-stack developers", "Startup founders", "Freelancers", "AI enthusiasts"]
        },
        features: {
            zh: ["AI 驱动代码编辑", "自然语言重构", "全代码库搜索", "自动生成提交信息"],
            en: ["AI-powered code editing", "Natural language refactoring", "Codebase-wide search", "Auto-commit message generation"]
        },
        use_cases: {
            zh: ["一条命令重构 500 行文件", "在整个项目中查找废弃 API 的所有用法", "通过描述症状修复 Bug", "根据项目结构生成 README"],
            en: ["Refactor a 500-line file in one command", "Find all usages of a deprecated API across the project", "Fix a bug by describing the symptoms", "Generate a README from the project structure"]
        }
    },
    "sora": {
        name: { zh: "Sora", en: "Sora" },
        cat: "video",
        url: "https://openai.com/sora",
        icon: "fa-video",
        short_desc: { zh: "OpenAI 推出的文本生成视频模型", en: "OpenAI's text-to-video generation model" },
        long_desc: {
            zh: "Sora 是 OpenAI 发布的革命性视频生成模型，能够根据文本描述直接生成长达 60 秒的高质量视频。它在物理世界模拟、镜头运动和角色一致性方面展现了惊人的能力，被誉为视频领域的 'ChatGPT 时刻'。",
            en: "Sora is OpenAI's revolutionary video generation model that creates up to 60 seconds of high-quality video from text prompts. Its ability to simulate physics, camera motion, and character consistency is groundbreaking, hailed as the 'ChatGPT moment' for video."
        },
        scenes: {
            zh: ["广告创意视频预演", "电影分镜快速原型", "社交媒体短视频生成", "产品演示动态展示"],
            en: ["Ad creative pre-visualization", "Movie storyboard prototyping", "Social media short video generation", "Product demo motion showcase"]
        },
        pros: {
            zh: ["视频时长和一致性前所未有", "对物理规律理解逼真", "画面电影感强"],
            en: ["Unprecedented video length and consistency", "Realistic physics understanding", "Cinematic output quality"]
        },
        cons: {
            zh: ["尚未全面开放", "生成速度较慢", "复杂物理交互可能出错"],
            en: ["Not widely available yet", "Slow generation speed", "Complex physics interactions can glitch"]
        },
        example: {
            zh: "示例：'一位时尚的女士走在东京的霓虹灯街道上，地面潮湿反光，画面充满电影感，35mm 胶片风格'",
            en: "Example: 'A stylish woman walks down a neon-lit Tokyo street, wet reflective pavement, cinematic, 35mm film style'"
        },
        target_audience: {
            zh: ["电影制作人", "广告创意人员", "社交媒体运营", "游戏开发者"],
            en: ["Filmmakers", "Advertisers", "Social media managers", "Game developers"]
        },
        features: {
            zh: ["文本生成视频最长 60 秒", "物理世界模拟", "镜头运动控制", "角色一致性"],
            en: ["Text-to-video up to 60s", "Physics simulation", "Camera motion control", "Character consistency"]
        },
        use_cases: {
            zh: ["根据剧本创作电影预告片", "生成带产品植入的社交媒体广告", "拍摄前快速原型化电影场景", "构建沉浸式游戏过场动画"],
            en: ["Create a movie trailer from a script", "Generate social media ads with product placement", "Prototype a cinematic scene before filming", "Build immersive game cutscenes"]
        }
    },
    "runway": {
        name: { zh: "Runway", en: "Runway" },
        cat: "video",
        url: "https://runwayml.com",
        icon: "fa-film",
        short_desc: { zh: "全能型 AI 视频创作与编辑平台", en: "All-in-one AI video creation and editing platform" },
        long_desc: {
            zh: "Runway 是一套面向创意工作者的 AI 魔法工具箱。除了文本/图像生成视频 (Gen-2)，它还提供视频抠像、慢动作补帧、无限画面扩展、面部表情替换等功能，是独立 filmmaker 和设计师的利器。",
            en: "Runway is an AI magic toolbox for creatives. Beyond text/image-to-video (Gen-2), it offers video matting, frame interpolation, infinite canvas expansion, and face replacement — a powerhouse for independent filmmakers and designers."
        },
        scenes: {
            zh: ["视频背景一键抠除替换", "老视频补帧至 60fps", "静态图片转动态镜头", "视频风格迁移"],
            en: ["One-click background removal/replacement", "Old video frame interpolation to 60fps", "Static image to motion shot", "Video style transfer"]
        },
        pros: {
            zh: ["浏览器内覆盖完整视频制作流程", "无需高端硬件", "对非专业人士界面直观"],
            en: ["Full video production pipeline in browser", "No high-end hardware needed", "Intuitive interface for non-experts"]
        },
        cons: {
            zh: ["Gen-2 片段限制 4 秒", "高分辨率导出需要付费", "运动中偶尔出现伪影"],
            en: ["Gen-2 clips limited to 4 seconds", "High-res export requires paid plan", "Sometimes artifacts in motion"]
        },
        example: {
            zh: "示例：上传一张风景照，输入 '无人机缓慢向前飞行，镜头微微下摇'，生成电影级航拍镜头。",
            en: "Example: Upload a landscape photo, type 'Drone slowly flying forward, slight downward tilt' to generate a cinematic aerial shot."
        },
        target_audience: {
            zh: ["视频编辑师", "内容创作者", "设计师", "独立电影人"],
            en: ["Video editors", "Content creators", "Designers", "Indie filmmakers"]
        },
        features: {
            zh: ["Gen-2 文本/图像生成视频", "绿幕抠除", "帧插值补帧", "无限图像扩展"],
            en: ["Gen-2 text/image-to-video", "Green screen removal", "Frame interpolation", "Infinite image expansion"]
        },
        use_cases: {
            zh: ["无需绿幕即可移除视频背景", "将静态照片转为移动的航拍镜头", "将旧素材补帧至 60fps", "对视频片段进行艺术风格迁移"],
            en: ["Remove background from a video without a green screen", "Turn a static photo into a moving drone shot", "Upscale old footage to 60fps", "Apply artistic style transfer to a video clip"]
        }
    },
    "elevenlabs": {
        name: { zh: "ElevenLabs", en: "ElevenLabs" },
        cat: "audio",
        url: "https://elevenlabs.io",
        icon: "fa-microphone-alt",
        short_desc: { zh: "业界最逼真的 AI 语音合成与克隆", en: "The most realistic AI voice synthesis and cloning" },
        long_desc: {
            zh: "ElevenLabs 提供近乎以假乱真的文本转语音 (TTS) 服务。它支持 29 种语言，能够克隆任意人的声音仅需几秒样本，并提供精细的情感、语调和停顿控制，是播客、有声书和游戏配音的首选。",
            en: "ElevenLabs offers near-indistinguishable text-to-speech (TTS). It supports 29 languages, clones any voice with just seconds of sample audio, and provides fine control over emotion, intonation, and pauses — the top choice for podcasts, audiobooks, and game dubbing."
        },
        scenes: {
            zh: ["有声书批量制作", "视频多语言自动配音", "游戏角色语音生成", "虚拟主播实时语音"],
            en: ["Audiobook batch production", "Video multilingual auto-dubbing", "Game character voice generation", "VTuber real-time voice"]
        },
        pros: {
            zh: ["市场上最逼真的 TTS", "声音克隆效果惊人", "多语言覆盖优秀"],
            en: ["Most realistic TTS on the market", "Voice cloning quality is astonishing", "Excellent multilingual coverage"]
        },
        cons: {
            zh: ["按字符计费较贵", "中文韵律偶尔不够自然", "深度伪造声音存在伦理争议"],
            en: ["Expensive character-based pricing", "Chinese prosody occasionally less natural", "Ethical concerns around deepfake voices"]
        },
        example: {
            zh: "示例：输入一段小说台词，选择 '温柔而略带忧伤' 的风格，生成如真人演播般的语音。",
            en: "Example: Input a novel line, choose 'gentle with a touch of melancholy' style, and generate narration indistinguishable from a human actor."
        },
        target_audience: {
            zh: ["播客主", "有声书制作人", "游戏开发者", "YouTube 创作者"],
            en: ["Podcasters", "Audiobook producers", "Game developers", "YouTubers"]
        },
        features: {
            zh: ["仅需几秒音频即可克隆声音", "支持 29 种语言", "情感与语调精细控制", "实时流式 API"],
            en: ["Voice cloning from seconds of audio", "29-language support", "Emotion and intonation control", "Real-time streaming API"]
        },
        use_cases: {
            zh: ["克隆自己的声音朗读 10 小时有声书", "用同一声音将视频配音成 5 种语言", "为游戏创建独特角色声音", "用名人风格生成播客片头"],
            en: ["Clone your voice to narrate a 10-hour audiobook", "Dub a video into 5 languages with the same voice", "Create unique character voices for a game", "Generate a podcast intro with a celebrity voice style"]
        }
    },
    "perplexity": {
        name: { zh: "Perplexity", en: "Perplexity" },
        cat: "productivity",
        url: "https://perplexity.ai",
        icon: "fa-search",
        short_desc: { zh: "AI 驱动的实时联网搜索引擎", en: "AI-powered real-time search engine" },
        long_desc: {
            zh: "Perplexity 将大语言模型与实时网络搜索相结合，能够像研究助理一样直接回答复杂问题，并为每一条信息标注来源链接。它彻底改变了传统搜索引擎 '给链接不给答案' 的体验，是知识工作者的高效利器。",
            en: "Perplexity combines LLMs with real-time web search to directly answer complex questions like a research assistant, citing sources for every claim. It revolutionizes the traditional search experience of 'links instead of answers'."
        },
        scenes: {
            zh: ["学术论文快速调研", "实时新闻事件追踪", "产品购买决策对比", "技术概念深度解释"],
            en: ["Academic paper quick research", "Real-time news tracking", "Product purchase decision comparison", "Deep technical concept explanation"]
        },
        pros: {
            zh: ["回答准确且可验证", "实时搜索无信息滞后", "界面简洁无广告"],
            en: ["Answers are accurate and verifiable", "No information lag due to real-time search", "Clean, ad-free interface"]
        },
        cons: {
            zh: ["深度分析不如专用大模型", "复杂多步推理可能遗漏细节", "免费版 Pro 搜索次数有限"],
            en: ["Less deep analysis than dedicated LLMs", "Can miss nuances in complex multi-step reasoning", "Free tier has limited Pro searches"]
        },
        example: {
            zh: "示例：'对比分析 2024 年 Q4 特斯拉与比亚迪的财报数据，列出各自的优势和隐患。'",
            en: "Example: 'Compare Tesla and BYD's Q4 2024 financial reports, listing respective strengths and risks.'"
        },
        target_audience: {
            zh: ["研究人员", "记者", "学生", "投资人"],
            en: ["Researchers", "Journalists", "Students", "Investors"]
        },
        features: {
            zh: ["实时联网搜索", "每条回答标注来源", "追问功能", "Copilot 深度搜索"],
            en: ["Real-time web search", "Source citation for every answer", "Follow-up questions", "Pro search with Copilot"]
        },
        use_cases: {
            zh: ["研究欧盟最新 AI 法规", "对比两款手机的最新价格", "用可信来源总结突发新闻", "查找小众科学主题的学术论文"],
            en: ["Research the latest AI regulations in the EU", "Compare two smartphone models with up-to-date prices", "Summarize a breaking news story with verified sources", "Find academic papers on a niche scientific topic"]
        }
    },
    "notion-ai": {
        name: { zh: "Notion AI", en: "Notion AI" },
        cat: "productivity",
        url: "https://notion.so/product/ai",
        icon: "fa-sticky-note",
        short_desc: { zh: "嵌入工作流的智能写作与知识管理助手", en: "Smart writing and knowledge management inside your workflow" },
        long_desc: {
            zh: "Notion AI 直接集成在知识管理工具 Notion 中，能够帮你续写笔记、总结会议记录、提取行动项、翻译文档，甚至基于数据库自动生成报告。它将 AI 能力无缝嵌入到日常协作与知识沉淀的每一个环节。",
            en: "Notion AI is built directly into Notion, helping you continue writing notes, summarize meetings, extract action items, translate documents, and even auto-generate reports from databases. It seamlessly embeds AI into every step of daily collaboration and knowledge building."
        },
        scenes: {
            zh: ["会议记录自动提炼待办", "零散笔记整理成结构化文章", "多语言文档即时翻译", "数据库内容批量分析总结"],
            en: ["Auto-extract to-dos from meeting notes", "Turn scattered notes into structured articles", "Instant multilingual document translation", "Batch analysis and summarization of database content"]
        },
        pros: {
            zh: ["与笔记工作流深度融合", "无需切换应用", "团队协作极其便利"],
            en: ["Deeply integrated with note-taking workflow", "No app switching required", "Excellent for team collaboration"]
        },
        cons: {
            zh: ["AI 功能需额外付费", "超长文档生成速度较慢", "锁定在 Notion 生态内"],
            en: ["AI features require extra payment", "Slower generation for very long documents", "Locked into the Notion ecosystem"]
        },
        example: {
            zh: "示例：选中一段凌乱的会议速记，输入 '整理成条理清晰的会议纪要，并提取所有 Action Items'。",
            en: "Example: Select messy meeting notes and type 'Organize into a clear summary and extract all Action Items'."
        },
        target_audience: {
            zh: ["项目经理", "团队", "写作者", "知识工作者"],
            en: ["Project managers", "Teams", "Writers", "Knowledge workers"]
        },
        features: {
            zh: ["行内 AI 写作助手", "会议记录自动总结", "数据库自动填充", "多语言翻译"],
            en: ["Inline AI writing assistant", "Meeting notes summarization", "Database auto-fill", "Multi-language translation"]
        },
        use_cases: {
            zh: ["将凌乱的会议记录转为行动项", "根据 bullet list 撰写项目提案", "即时将文档翻译成日语", "从任务数据库生成周报"],
            en: ["Turn messy meeting notes into action items", "Write a project proposal from a bullet list", "Translate a document into Japanese instantly", "Generate a weekly report from a task database"]
        }
    }
};

const i18n = {
    zh: {
        nav_home: "首页", nav_submit: "提交工具", nav_about: "关于",
        ad_sponsored: "赞助", ad_top_text: "广告位招租 | 欢迎顶级 AI 工具品牌合作，请联系洽谈。", ad_learn_more: "联系我们",
        hero_title: "发现最适合任何任务的 AI 工具",
        hero_subtitle: "为写作、编程、图像与商业精选的 AI 工具集",
        cta_browse: "浏览工具",
        cta_start_free: "免费开始",
        cat_all: "全部", cat_text: "文本创作", cat_image: "图像生成", cat_code: "编程助手", cat_video: "视频制作", cat_audio: "音频处理", cat_prod: "商业效率",
        ad_promo: "推广", ad_mid_text: "📢 想要在这里展示你的 AI 产品？联系我们获取合作方案。", ad_try_now: "联系我们",
        footer_text: "© 2026 AI Tool Hub. Designed for Productivity.",
        category_labels: { text: "文本", image: "图像", code: "编程", video: "视频", audio: "音频", productivity: "商业" },
        detail_intro: "工具介绍", detail_scenes: "使用场景", detail_pros: "优点", detail_cons: "缺点", detail_example: "示例输出", detail_use_btn: "立即去使用", detail_back: "返回首页",
        detail_audience: "适用人群", detail_features: "功能亮点", detail_use_cases: "使用案例",
        value_title: "为什么选择 AI Tool Hub?",
        value_item1: "精挑细选", value_item1_desc: "拒绝垃圾信息，每款工具均经过人工实测。",
        value_item2: "深度评测", value_item2_desc: "不只是链接，提供真实的场景分析与优缺点对比。",
        value_item3: "实时更新", value_item3_desc: "捕捉 AI 领域最前沿的动态，第一时间同步更新。",
        rec_title: "本周推荐工具", rec_desc: "根据社区热度和实用度筛选出的顶尖AI神器",
        footer_privacy: "隐私政策", footer_terms: "服务条款", footer_contact: "联系我们"
    },
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

// GLOBAL STATE
let currentLang = localStorage.getItem('lang') || 'zh';
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
        const matchCat = filterCat === 'all' || t.cat === filterCat;
        const matchSearch = t.name[currentLang].toLowerCase().includes(searchTerm.toLowerCase()) ||
                            t.short_desc[currentLang].toLowerCase().includes(searchTerm.toLowerCase());
        return matchCat && matchSearch;
    });

    filtered.forEach(([id, t]) => {
        const card = document.createElement('a');
        card.href = `tool.html?id=${id}`;
        card.target = '_blank';
        card.className = 'tool-card';
        card.innerHTML = `
            <div class="tool-icon"><i class="fas ${t.icon}"></i></div>
            <h3>${t.name[currentLang]}</h3>
            <p>${t.short_desc[currentLang]}</p>
            <div class="tool-tag">${i18n[currentLang].category_labels[t.cat] || t.cat}</div>
        `;
        toolGrid.appendChild(card);
    });

    if (filtered.length === 0) {
        toolGrid.innerHTML = `<p style="grid-column: 1/-1; text-align: center; color: var(--text-mute);">${currentLang === 'zh' ? '暂时没有找到相关的 AI 工具...' : 'No AI tools found...'}</p>`;
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
            const recommendedIds = ['chatgpt', 'claude', 'midjourney'];
            recommendedIds.forEach(id => {
                const tool = getToolById(id);
                if (tool) {
                    const card = document.createElement('a');
                    card.href = `tool.html?id=${id}`;
                    card.className = 'tool-card rec-card';
                    const prosList = tool.pros[currentLang].slice(0, 2).map(p => `<li><i class="fas fa-check"></i> ${p}</li>`).join('');
                    const sceneTags = tool.scenes[currentLang].slice(0, 2).map(s => `<span class="scene-tag">${s}</span>`).join('');
                    card.innerHTML = `
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

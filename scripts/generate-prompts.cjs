const fs = require('fs');
const path = 'src/data/prompts.json';
const existing = JSON.parse(fs.readFileSync(path, 'utf-8'));
const existingSlugs = new Set(existing.map(p => p.slug));

const newPrompts = [
  {
    slug: "chatgpt-seo-article",
    title: "ChatGPT SEO Article Writer Prompt",
    category: "Writing",
    tool: "ChatGPT",
    tags: ["seo", "article", "content"],
    prompt: "Write a 1500-word SEO-optimized article about [TOPIC]. Target keyword: [KEYWORD]. Include: H1, H2, H3 headings, a meta description under 160 chars, FAQ section with 5 questions, and a conclusion with CTA. Tone: professional yet accessible. Avoid fluff and AI cliches."
  },
  {
    slug: "claude-meeting-notes",
    title: "Claude Meeting Notes Summary",
    category: "Productivity",
    tool: "Claude",
    tags: ["meeting", "notes", "summary"],
    prompt: "Convert the following meeting transcript into structured notes with: 1) Attendees, 2) Key decisions, 3) Action items (with owner + deadline), 4) Parking lot items, 5) Next meeting agenda. Keep it concise.\n\n[PASTE TRANSCRIPT HERE]"
  },
  {
    slug: "midjourney-logo-design",
    title: "Midjourney Logo Design Prompt",
    category: "Image",
    tool: "Midjourney",
    tags: ["logo", "branding", "design"],
    prompt: "minimalist logo design for [BRAND NAME], [DESCRIBE INDUSTRY], geometric shapes, negative space, vector style, flat design, single color on white background, professional brand identity --no text --ar 1:1 --v 6"
  },
  {
    slug: "cursor-architect-patterns",
    title: "Cursor Architecture Patterns Prompt",
    category: "Coding",
    tool: "Cursor",
    tags: ["architecture", "design-patterns", "refactoring"],
    prompt: "Analyze this codebase architecture and suggest: 1) Current pattern identification, 2) Coupling issues, 3) Recommended design patterns to apply, 4) Step-by-step refactoring plan with code examples for each step.\n\n[PASTE CODEBASE STRUCTURE OR KEY FILES]"
  },
  {
    slug: "perplexity-fact-check",
    title: "Perplexity Fact-Check Prompt",
    category: "Research",
    tool: "Perplexity",
    tags: ["fact-check", "verification", "research"],
    prompt: "Fact-check the following claims. For each claim, provide: 1) Verdict (True/False/Partially True/Unverified), 2) Evidence with sources, 3) Context missing from the original claim. Be rigorous and cite primary sources.\n\n[PASTE CLAIMS HERE]"
  },
  {
    slug: "suno-background-music",
    title: "Suno Background Music Prompt",
    category: "Music",
    tool: "Suno",
    tags: ["background", "ambient", "instrumental"],
    prompt: "instrumental background music, [lo-fi / ambient / corporate / cinematic], [DESCRIBE MOOD], soft dynamics, 120 BPM, no vocals, 3 minutes, suitable for [podcast / video / presentation] intro"
  },
  {
    slug: "elevenlabs-multilingual",
    title: "ElevenLabs Multilingual Narration",
    category: "Audio",
    tool: "ElevenLabs",
    tags: ["multilingual", "voiceover", "dubbing"],
    prompt: "Create a narration script in [TARGET LANGUAGE] for a 2-minute product demo video. Translate the following English script naturally (not literally), adapting idioms and tone for local audience. Include pause markers [PAUSE] and emphasis markers *like this*.\n\n[PASTE ENGLISH SCRIPT]"
  },
  {
    slug: "flux-styled-photo",
    title: "Flux Styled Photography Prompt",
    category: "Image",
    tool: "Flux",
    tags: ["photography", "styled", "commercial"],
    prompt: "professional [PRODUCT TYPE] product photography, [BACKGROUND DESCRIPTION], soft studio lighting from upper left, slight reflections, shot on Phase One IQ4, 80mm lens, f/8, high-key retouching, commercial advertising style"
  },
  {
    slug: "gamma-pitch-deck",
    title: "Gamma Pitch Deck Prompt",
    category: "Productivity",
    tool: "Gamma",
    tags: ["pitch", "presentation", "startup"],
    prompt: "Create a 12-slide startup pitch deck for [COMPANY DESCRIPTION]. Slides: 1) Title, 2) Problem, 3) Solution, 4) Market Size (TAM/SAM/SOM), 5) Product Demo, 6) Business Model, 7) Traction, 8) Competition, 9) Team, 10) Financials, 11) Ask, 12) Contact. Each slide: 1 key message + 3 bullet points max."
  },
  {
    slug: "chatgpt-sql-query",
    title: "ChatGPT SQL Query Builder",
    category: "Data",
    tool: "ChatGPT",
    tags: ["sql", "database", "query"],
    prompt: "Write an optimized SQL query for: [DESCRIBE WHAT YOU NEED]. Schema: [PASTE TABLE STRUCTURE OR DDL]. Requirements: 1) Use proper indexes, 2) Avoid SELECT *, 3) Add comments explaining each clause, 4) Provide an alternative using a CTE or window function if applicable, 5) Note potential performance issues."
  },
  {
    slug: "ideogram-typography",
    title: "Ideogram Typography Poster",
    category: "Image",
    tool: "Ideogram",
    tags: ["typography", "poster", "text-art"],
    prompt: "typographic poster design, large bold text reading \"[YOUR TEXT HERE]\", [DESCRIBE THEME], letterform as visual element, high contrast, modern Swiss design influence, [COLOR PALETTE], print-ready"
  },
  {
    slug: "kling-product-video",
    title: "Kling Product Demo Video Prompt",
    category: "Video",
    tool: "Kling",
    tags: ["product", "demo", "commercial"],
    prompt: "5-second product demo video: [PRODUCT NAME] on a clean surface, camera slowly orbits around the product, soft studio lighting, shallow depth of field, [BACKGROUND COLOR] backdrop, product details visible, professional commercial quality"
  },
  {
    slug: "claude-api-documentation",
    title: "Claude API Documentation Writer",
    category: "Writing",
    tool: "Claude",
    tags: ["api", "documentation", "technical"],
    prompt: "Write developer-friendly API documentation for the following endpoint. Include: 1) Brief description, 2) HTTP method + path, 3) Request parameters table (name, type, required, description), 4) Request example (curl + JSON body), 5) Response schema, 6) Error codes, 7) Rate limiting notes. Use OpenAPI 3.0 style.\n\n[PASTE ENDPOINT INFO]"
  },
  {
    slug: "gemini-market-analysis",
    title: "Gemini Market Analysis Prompt",
    category: "Business",
    tool: "Gemini",
    tags: ["market", "analysis", "strategy"],
    prompt: "Analyze the [INDUSTRY] market for [GEOGRAPHY]. Provide: 1) Market size and growth rate, 2) Top 5 competitors with strengths/weaknesses, 3) Key trends (next 12-24 months), 4) Customer pain points, 5) Regulatory considerations, 6) Recommended go-to-market strategy for a new entrant. Cite sources where possible."
  },
  {
    slug: "chatgpt-competitor-analysis",
    title: "ChatGPT Competitor Analysis Prompt",
    category: "Business",
    tool: "ChatGPT",
    tags: ["competitor", "analysis", "strategy"],
    prompt: "Conduct a competitive analysis for [YOUR PRODUCT] vs [COMPETITOR 1], [COMPETITOR 2], [COMPETITOR 3]. Create: 1) Feature comparison table, 2) Pricing comparison, 3) SWOT for each, 4) Positioning map axes suggestion, 5) 3 differentiation strategies, 6) Quick-win action items."
  },
  {
    slug: "midjourney-architecture",
    title: "Midjourney Architecture Visualization",
    category: "Image",
    tool: "Midjourney",
    tags: ["architecture", "render", "visualization"],
    prompt: "architectural visualization of [BUILDING TYPE], [ARCHITECTURAL STYLE], integrated with landscape, golden hour lighting, realistic materials, people for scale, shot from [EYE LEVEL / AERIAL / WORM EYE], professional architectural rendering --ar 16:9 --v 6"
  },
  {
    slug: "cursor-test-generation",
    title: "Cursor Test Generation Prompt",
    category: "Coding",
    tool: "Cursor",
    tags: ["testing", "unit-test", "automation"],
    prompt: "Generate comprehensive unit tests for the following function/module. Use [JEST / VITEST / PYTEST / appropriate framework]. Cover: 1) Happy path, 2) Edge cases (empty input, boundary values, null), 3) Error cases, 4) Performance edge cases if relevant. Include test descriptions that explain the WHY, not just the WHAT.\n\n[PASTE CODE]"
  },
  {
    slug: "perplexity-literature-review",
    title: "Perplexity Literature Review",
    category: "Research",
    tool: "Perplexity",
    tags: ["literature", "review", "academic"],
    prompt: "Conduct a literature review on [TOPIC]. Provide: 1) Key findings from the last 5 years, 2) Consensus vs debated points, 3) Methodology trends, 4) Research gaps, 5) Recommended next steps for someone entering this field. Cite at least 10 peer-reviewed sources with DOIs."
  },
  {
    slug: "suno-jingle",
    title: "Suno Brand Jingle Prompt",
    category: "Music",
    tool: "Suno",
    tags: ["jingle", "brand", "advertising"],
    prompt: "catchy 15-second brand jingle for [BRAND NAME] in [GENRE STYLE], upbeat, memorable melody, subtle brand mention, suitable for radio and social media ads, [INSTRUMENTATION PREFERENCE]"
  },
  {
    slug: "elevenlabs-character-voice",
    title: "ElevenLabs Character Voice Prompt",
    category: "Audio",
    tool: "ElevenLabs",
    tags: ["character", "voice-acting", "game"],
    prompt: "Write a 30-second character voiceover script for a [DESCRIBE CHARACTER: age, personality, setting]. Include voice direction notes: tone, pace, emotional beats, breathing pauses. The character is [SCENE CONTEXT]. End with a hook for the next scene.\n\nUse [BRACKET] for direction notes."
  },
  {
    slug: "flux-illustration",
    title: "Flux Illustration Style Prompt",
    category: "Image",
    tool: "Flux",
    tags: ["illustration", "art", "editorial"],
    prompt: "editorial illustration for an article about [TOPIC], [ART STYLE: flat / isometric / line-art / watercolor / collage], [COLOR MOOD], metaphorical composition, no text, suitable for web article header, 16:9 aspect ratio"
  },
  {
    slug: "gamma-course-lesson",
    title: "Gamma Course Lesson Prompt",
    category: "Productivity",
    tool: "Gamma",
    tags: ["education", "lesson", "course"],
    prompt: "Create a 15-slide interactive lesson on [TOPIC] for [AUDIENCE LEVEL: beginner / intermediate / advanced]. Structure: 1) Hook/attention grabber, 2) Learning objectives, 3) Core content (8-10 slides with one concept each), 4) Check for understanding (2 quiz slides), 5) Summary, 6) Further resources. Include speaker notes for each slide."
  },
  {
    slug: "chatgpt-email-sequence",
    title: "ChatGPT Email Sequence Prompt",
    category: "Business",
    tool: "ChatGPT",
    tags: ["email", "sequence", "marketing"],
    prompt: "Write a 5-email onboarding sequence for [PRODUCT/SERVICE]. Email 1: Welcome + quick win. Email 2: Core feature deep-dive. Email 3: Case study / social proof. Email 4: Advanced tip. Email 5: Conversion/push to action. For each: subject line (under 50 chars), preview text, body (under 150 words), CTA. Tone: [FRIENDLY / PROFESSIONAL / CASUAL]."
  },
  {
    slug: "claude-technical-spec",
    title: "Claude Technical Spec Writer",
    category: "Writing",
    tool: "Claude",
    tags: ["spec", "technical", "documentation"],
    prompt: "Write a technical specification document for [FEATURE/SYSTEM]. Include: 1) Overview and goals, 2) User stories (As a... I want... So that...), 3) Functional requirements (numbered, testable), 4) Non-functional requirements (performance, security, scalability), 5) Data model, 6) API changes, 7) Testing strategy, 8) Rollout plan, 9) Open questions. Be specific, not generic."
  },
  {
    slug: "midjourney-character-sheet",
    title: "Midjourney Character Sheet Prompt",
    category: "Image",
    tool: "Midjourney",
    tags: ["character", "concept-art", "game-design"],
    prompt: "character design sheet for [CHARACTER DESCRIPTION], multiple views (front, side, back, 3/4), full body turnaround, neutral pose, [STYLE: anime / realistic / stylized], clean reference background, character turnaround sheet, concept art --ar 16:9 --v 6"
  },
  {
    slug: "cursor-code-review-strict",
    title: "Cursor Strict Code Review Prompt",
    category: "Coding",
    tool: "Cursor",
    tags: ["review", "quality", "best-practices"],
    prompt: "Perform a strict code review on the following code. Check for: 1) SOLID violations, 2) Security vulnerabilities (OWASP top 10), 3) Performance bottlenecks, 4) Error handling gaps, 5) Testability issues, 6) Naming conventions, 7) Dead code. Rate severity: CRITICAL / HIGH / MEDIUM / LOW. Provide fixed code for CRITICAL issues.\n\n[PASTE CODE]"
  },
  {
    slug: "gemini-data-insights",
    title: "Gemini Data Insights Prompt",
    category: "Data",
    tool: "Gemini",
    tags: ["data", "insights", "analysis"],
    prompt: "Analyze the following data and provide actionable insights. Structure your response as: 1) Executive summary (3 sentences max), 2) Key metrics with context, 3) Trends and anomalies, 4) Root cause hypotheses, 5) 3 recommended actions with expected impact. Be specific to the data, not generic.\n\n[PASTE DATA / CSV / TABLE]"
  },
  {
    slug: "perplexity-deep-dive",
    title: "Perplexity Deep Dive Research",
    category: "Research",
    tool: "Perplexity",
    tags: ["research", "deep-dive", "comprehensive"],
    prompt: "Conduct a deep-dive research report on [TOPIC/COMPANY/TECHNOLOGY]. Cover: 1) Background and history, 2) Current state, 3) Key players/stakeholders, 4) Technology/methodology overview, 5) Strengths and limitations, 6) Future outlook (12-36 months), 7) Resources for further learning. Prioritize primary sources over secondary commentary."
  },
  {
    slug: "kling-text-animation",
    title: "Kling Text Animation Video Prompt",
    category: "Video",
    tool: "Kling",
    tags: ["animation", "text", "motion-graphics"],
    prompt: "kinetic typography animation, text reading \"[YOUR MESSAGE]\", [COLOR SCHEME] background, smooth motion transitions, professional motion graphics style, 5 seconds, suitable for social media intro/outro, dynamic camera movement"
  },
  {
    slug: "chatgpt-prompt-chain",
    title: "ChatGPT Prompt Chaining Strategy",
    category: "AI",
    tool: "ChatGPT",
    tags: ["prompt-chaining", "workflow", "strategy"],
    prompt: "Design a 5-step prompt chain for [TASK DESCRIPTION]. For each step, provide: 1) The prompt itself, 2) What input it expects from the previous step, 3) What output it produces for the next step, 4) Quality check criteria. Ensure the chain builds progressively and each step output is verifiable before proceeding."
  }
];

const filtered = newPrompts.filter(p => !existingSlugs.has(p.slug));
const combined = [...existing, ...filtered];

console.log('Existing:', existing.length);
console.log('New unique:', filtered.length);
console.log('Total:', combined.length);

fs.writeFileSync(path, JSON.stringify(combined, null, 2) + '\n', 'utf-8');
console.log('prompts.json updated successfully');

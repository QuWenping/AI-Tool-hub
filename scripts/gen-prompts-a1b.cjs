const fs = require("fs");
const existing = JSON.parse(fs.readFileSync("src/data/prompts.json","utf-8"));
const existingSlugs = new Set(existing.map(p => p.slug));
const p = [];
function a(s,t,c,t2,tg,pr) { if(!existingSlugs.has(s)) p.push({slug:s,title:t,category:c,tool:t2,tags:tg,prompt:pr}); }

// Education (20)
a("chatgpt-lesson-plan","ChatGPT Lesson Plan","Writing","ChatGPT",["education"],"Lesson plan for [SUBJECT] [GRADE]: objective, warm-up, main activity, group work, assessment, homework, materials. Duration: [MIN].");
a("chatgpt-rubric-mk","ChatGPT Rubric Maker","Writing","ChatGPT",["education"],"Rubric for [ASSIGNMENT]: 5 criteria scored 1-4 with descriptions. Content, organization, creativity, mechanics, effort. Assignment: [DESCRIBE].");
a("chatgpt-quiz","ChatGPT Quiz Generator","Writing","ChatGPT",["education"],"Quiz on [TOPIC]: 5 MC, 3 T/F, 2 short answer, 1 essay. Answer key with explanations. Level: [DESCRIBE].");
a("chatgpt-flashcard","ChatGPT Flashcard Set","Writing","ChatGPT",["education"],"20 flashcards for [TOPIC]: front (question), back (answer). Organized easy/medium/hard. Q/A pairs.");
a("chatgpt-paren-teacher","ChatGPT Parent Teacher Email","Writing","ChatGPT",["education"],"Parent-teacher email: positive opening, observations, concern (data-based), suggested action, meeting invitation. Collaborative tone. Situation: [DESCRIBE].");
a("chatgpt-study-guide","ChatGPT Study Guide","Writing","ChatGPT",["education"],"Study guide for [EXAM]: key concepts (10), formulas/terms, practice questions (5), common mistakes (3), 7-day schedule. Level: [DESCRIBE].");
a("chatgpt-diff-instruction","ChatGPT Differentiated Instruction","Writing","ChatGPT",["education"],"Differentiated lesson for [TOPIC]: 3 versions (below/at/above grade): objectives, materials, activities, assessment.");
a("chatgpt-iep","ChatGPT IEP Goals","Writing","ChatGPT",["education"],"IEP goals for [NEED]: 3 measurable annual goals, each with objective, measurement, quarterly benchmarks, mastery criteria. Need: [DESCRIBE].");
a("chatgpt-grant-edu","ChatGPT Education Grant","Writing","ChatGPT",["education","grant"],"Education grant for [PROGRAM]: need, description, objectives (SMART), activities, budget, evaluation, sustainability. Amount: $[X].");
a("chatgpt-pd","ChatGPT Professional Development","Writing","ChatGPT",["education"],"PD plan for [TEACHERS]: topic, objectives, agenda (half-day), materials, activities, assessment, follow-up. Topic: [DESCRIBE].");
a("chatgpt-syllabus","ChatGPT Course Syllabus","Writing","ChatGPT",["education"],"Syllabus for [COURSE]: description, objectives, materials, 15-week schedule, grading, attendance, integrity. Course: [DESCRIBE].");
a("chatgpt-sub-plans","ChatGPT Substitute Plans","Writing","ChatGPT",["education"],"Sub plans for [GRADE/SUBJECT]: schedule, 3 lesson activities, behavior expectations, contacts, early finishers, materials. Duration: [N] days.");
a("chatgpt-reading-edu","ChatGPT Curated Reading List","Research","ChatGPT",["education"],"10 books for [GRADE/TOPIC]: title, author, level, summary, why recommended, discussion questions. Theme: [DESCRIBE].");
a("chatgpt-lab-report","ChatGPT Lab Report Helper","Writing","ChatGPT",["education","science"],"Lab report for [EXPERIMENT]: hypothesis, materials, procedure, data table, analysis, conclusion, error discussion, future work.");
a("chatgpt-project-rub","ChatGPT Project Rubric","Writing","ChatGPT",["education"],"Project rubric: 6 criteria (content/creativity/presentation/research/collaboration/timeliness), each 1-4 with descriptors. Project: [DESCRIBE].");
a("claude-essay-fb","Claude Essay Feedback","Writing","Claude",["education"],"Essay feedback: thesis clarity, argument structure, evidence, mechanics, originality. Specific suggestions. Score A-F.\n\n[PASTE ESSAY]");
a("claude-research-q","Claude Research Question","Research","Claude",["academic"],"Refine research question: specific enough? answerable? novel? significant? 3 alternative formulations. Question: [DESCRIBE].");
a("claude-citation","Claude Citation Check","Research","Claude",["academic"],"Check citations: format (APA/MLA/Chicago), missing info, DOI accuracy, in-text match, reference list completeness.\n\n[PASTE]");
a("claude-peer-review","Claude Peer Review","Research","Claude",["academic"],"Peer review: summary, strengths (3), weaknesses (3), minor issues, recommendation (accept/revise/reject), specific comments.\n\n[PASTE ABSTRACT]");
a("claude-syllabus-d","Claude Detailed Syllabus","Writing","Claude",["education"],"Syllabus for [COURSE]: outcomes (5), weekly topics (15), readings, assignments, grading rubric, policies, accommodations. Course: [DESCRIBE].");

// Business (20)
a("any-mvp-spec","AI MVP Spec","Business","Any",["mvp"],"MVP spec for [PRODUCT]: core problem, minimum features (3-5), what to exclude, success criteria, 4-week timeline, tech stack, validation metrics.");
a("any-gtm","AI Go-to-Market Strategy","Business","Any",["gtm"],"GTM for [PRODUCT]: target segment, positioning, pricing, channels (3), 12-week timeline, marketing, sales process, metrics.");
a("any-unit-eco","AI Unit Economics","Business","Any",["finance"],"Unit economics: revenue/user, CAC, LTV, gross margin, payback, contribution margin, break-even, sensitivity. Product: [DESCRIBE].");
a("any-churn-pred","AI Churn Prediction","Business","Any",["churn"],"Churn framework: definition, predictors (10), data sources, model, alert thresholds, intervention playbook, measurement.");
a("any-nps","AI NPS Analysis","Business","Any",["nps"],"NPS: score breakdown, themes by segment, detractor root causes, promoter drivers, action plan, follow-up survey.");
a("any-segment","AI Customer Segmentation","Business","Any",["segmentation"],"Segmentation: criteria, 4-6 segments, each (size/value/needs/channels), target segment, strategy per segment.");
a("any-vendor-rfp","AI Vendor RFP","Business","Any",["vendor"],"RFP for [CATEGORY]: requirements (must/should/could), evaluation criteria + weights, timeline, budget, contract terms, submission format.");
a("any-sla","AI SLA Template","Business","Any",["sla"],"SLA for [SERVICE]: description, uptime target, response times (by severity), escalation, reporting, credits/penalties, exclusions.");
a("any-dr","AI Disaster Recovery","Business","Any",["disaster"],"DR plan: RTO/RPO, backup strategy, failover, data recovery, communication, testing schedule, roles + contacts. System: [DESCRIBE].");
a("any-cloud-mig","AI Cloud Migration","Coding","Any",["cloud"],"Cloud migration: current state, target architecture, strategy (lift/shift/refactor), phased timeline, risks, cost comparison, rollback.");
a("any-react-pat","AI React Patterns","Coding","Any",["react"],"React patterns for [USE CASE]: which pattern (compound/hooks/render props/context), why, code example, trade-offs, when NOT to use.");
a("any-async-js","AI Async JavaScript","Coding","Any",["javascript"],"Async patterns: promises vs async/await, error handling, parallel, rate limiting, cancellation, retry. Scenario: [DESCRIBE].");
a("any-python-bp","AI Python Best Practices","Coding","Any",["python"],"Python best practices: type hints, error handling, logging, testing, performance, documentation, packaging. Task: [DESCRIBE].");
a("any-sql-schema","AI SQL Schema Design","Coding","Any",["sql"],"SQL schema for [APP]: tables + columns, relationships, indexes, constraints, views, stored procedures, migration. App: [DESCRIBE].");
a("any-testing-strat","AI Testing Strategy","Coding","Any",["testing"],"Testing strategy: unit (framework, coverage), integration, E2E, manual, CI integration, flaky test handling. Project: [DESCRIBE].");
a("any-review-checklist","AI Code Review Checklist","Coding","Any",["code-review"],"Code review checklist: functionality, design, complexity, tests, naming, comments, security, performance. Project: [DESCRIBE].");
a("any-git-strat","AI Git Strategy","Coding","Any",["git"],"Git strategy: branching model (GitHub Flow/Trunk/GitFlow), PR process, review requirements, merge rules, release, hotfix. Team: [N].");
a("any-deploy-strat","AI Deployment Strategy","Coding","Any",["deployment"],"Deployment: blue-green, canary, rolling, feature flags, rollback, health checks, traffic splitting, monitoring. App: [DESCRIBE].");
a("any-tech-debt","AI Technical Debt","Coding","Any",["tech-debt"],"Tech debt: categories (code/arch/test/deps), each item (impact/effort/risk), prioritize, 90-day plan, prevention.");
a("any-load-test","AI Load Testing","Coding","Any",["load-testing"],"Load testing: scenarios (normal/peak/spike), user journeys, concurrent users, ramp-up, duration, metrics, tools, pass criteria.");

// Productivity (10)
a("any-project-charter","AI Project Charter","Productivity","Any",["project"],"Project charter: name, description, goals (3), scope (in/out), timeline, budget, roles, stakeholders, risks, success criteria.");
a("any-wbs","AI Work Breakdown","Productivity","Any",["wbs"],"WBS for [PROJECT]: phases with tasks. Each: ID, name, duration, dependencies, owner, deliverable. Critical path + milestones.");
a("any-risk-reg","AI Risk Register","Productivity","Any",["risk"],"Risk register: 10 risks, each: description, probability (1-5), impact (1-5), score, mitigation, owner, status, trigger. Table format.");
a("any-comms-plan","AI Comms Plan","Productivity","Any",["communications"],"Comms plan: stakeholders + info needs, message matrix, channels, frequency, owner, escalation, feedback mechanism.");
a("any-lessons","AI Lessons Learned","Productivity","Any",["lessons"],"Lessons learned: what went well (5), improvements (5), insights (3), action items, knowledge transfer, process improvements.");
a("any-decision-log","AI Decision Log","Productivity","Any",["decisions"],"Decision log: date, decision, context, options, rationale, decided by, reversible?, review date. Table format.");
a("any-timezone-plan","AI Time Zone Planner","Productivity","Any",["timezone"],"Meeting across time zones: participants + locations, converter, best overlap windows, rotation, async alternative, recording policy.");
a("any-kickoff","AI Project Kickoff","Productivity","Any",["kickoff"],"Kickoff agenda: welcome+intros (10m), project overview (15m), goals+scope (15m), roles (10m), timeline (10m), Q&A (20m).");
a("any-impact-effort","AI Impact Effort Matrix","Productivity","Any",["matrix"],"Impact/effort: list tasks, score impact (1-5), score effort (1-5), plot matrix, quick wins, big bets, fill-ins, time sinks.");
a("any-runbook","AI Runbook Template","Productivity","Any",["runbook"],"Runbook for [PROCESS]: overview, prerequisites, step-by-step, common issues + fixes, escalation, verification, rollback.");

// AI (10)
a("any-llm-eval","AI LLM Evaluation","AI","Any",["llm"],"Evaluate LLM for [USE CASE]: benchmarks, cost/1M tokens, latency, context window, fine-tuning, safety, recommendation.");
a("any-prompt-test","AI Prompt Testing","AI","Any",["prompt"],"Test prompt: clarity, completeness, bias, edge cases, 10 test inputs, scoring rubric. Prompt: [PASTE].");
a("any-rag-eval","AI RAG Evaluation","AI","Any",["rag"],"Evaluate RAG: retrieval accuracy, faithfulness, answer relevance, context recall, context precision, latency.");
a("any-agent-orch","AI Agent Orchestration","AI","Any",["agent"],"Agent orchestration: roles (3), task distribution, communication, state management, error recovery, human checkpoints, output format.");
a("any-embedding","AI Embedding Strategy","AI","Any",["embedding"],"Embedding strategy: model, dimension, chunk size, index type (HNSW/IVF), query (hybrid), re-ranking, cost. Use case: [DESCRIBE].");
a("any-finetune-data","AI Fine-Tuning Data Prep","AI","Any",["fine-tuning"],"Data prep for fine-tuning: format, cleaning, splits, balance, augmentation, quality criteria, size. Model: [DESCRIBE].");
a("any-inference-opt","AI Inference Optimization","AI","Any",["inference"],"Optimize inference: quantization (INT8/INT4), distillation, batching, caching, speculative decoding, hardware, cost vs latency.");
a("any-safety-cls","AI Safety Classifier","AI","Any",["safety"],"Safety classifier: categories (toxicity/PII/harmful/legal), training data, model choice, threshold, human review, monitoring.");
a("any-conversation-fl","AI Conversation Flow","AI","Any",["conversation"],"Conversation flow: intent map, slot filling, context management, fallback, escalation, error recovery, analytics. Chatbot: [DESCRIBE].");
a("any-token-opt","AI Token Optimization","AI","Any",["token"],"Token optimization: prompt compression, context pruning, caching, model routing, batch API, streaming, cost estimate.");

// Video/Audio/Image (10)
a("any-yt-script","AI YouTube Script","Video","Any",["youtube"],"YouTube script [TOPIC] [MIN] min: hook (15s), intro (30s), content sections with timestamps, B-roll, sponsored segment, outro+CTA.");
a("any-tiktok-script","AI TikTok Script","Video","Any",["tiktok"],"TikTok 30-sec script [TOPIC]: hook (3s), value, twist, CTA. Visual cues + text overlay. Trending audio suggestion.");
a("any-podcast-plan","AI Podcast Plan","Audio","Any",["podcast"],"Podcast plan: concept, 10 episodes, format (interview/solo/panel), length, guest wishlist, equipment, distribution, monetization.");
a("any-thumbnail","AI Thumbnail Concept","Image","Any",["thumbnail"],"YouTube thumbnail [TOPIC]: visual idea, text (5 words), color scheme, expression, background, layout, 3 variations.");
a("any-instagram-grid","AI Instagram Grid Plan","Image","Any",["instagram"],"Instagram grid [BRAND]: aesthetic, 9-post cycle, mix (quotes/product/lifestyle/UGC/edu), color rotation, caption + hashtag strategy.");
a("any-video-edit","AI Video Edit Plan","Video","Any",["video-editing"],"Video edit plan for [RAW FOOTAGE]: 1) Cut list (what to keep/remove), 2) Sequence, 3) Transitions, 4) Music, 5) Color, 6) Text, 7) Export specs.");
a("any-podcast-edit","AI Podcast Edit Guide","Audio","Any",["podcast-edit"],"Podcast edit guide: 1) Noise removal, 2) Volume leveling, 3) Cut filler words, 4) Add intro/outro, 5) Music, 6) Export, 7. Show notes.");
a("any-color-theory","AI Color Theory Guide","Image","Any",["color","theory"],"Color theory for [PROJECT]: 1) Color wheel basics, 2) Scheme (mono/analogous/complementary/triadic), 3) 60-30-10 rule, 4) Psychology, 5. Accessibility.");
a("any-logo-concept","AI Logo Concept","Image","Any",["logo"],"Logo concept for [BRAND]: 5 ideas, each: style (wordmark/symbol/combination), color, meaning, scalability, applications. Brand: [DESCRIBE].");
a("any-brand-guidelines","AI Brand Guidelines","Image","Any",["branding"],"Brand guidelines: logo usage, color palette (with hex), typography, imagery style, tone of voice, do/dont examples. Brand: [DESCRIBE].");

// More writing (10)
a("any-ghost-write","AI Ghost Writing","Writing","Any",["ghost-writing"],"Ghost write in [AUTHOR] voice: 1) Analyze their style (sentence length, vocabulary, tone), 2) Write [CONTENT TYPE] matching their voice, 3) Notes on adaptation. Sample:\n\n[PASTE]");
a("any-script-edit","AI Script Editing","Writing","Any",["script"],"Edit this script: 1) Tighten dialogue (cut unnecessary), 2) Improve pacing, 3) Fix plot holes, 4) Enhance character voice, 5) Add stage directions. Script:\n\n[PASTE]");
a("any-press-kit","AI Press Kit","Business","Any",["press-kit"],"Press kit for [COMPANY]: 1) Company overview, 2) Fact sheet, 3) Bios, 4) Logo + brand assets, 5) Product screenshots, 6) Press releases, 7. Contact. Company: [DESCRIBE].");
a("any-faq-page-gen","AI FAQ Page Generator","Writing","Any",["faq"],"FAQ page for [TOPIC]: 15 Q&As from simple to advanced. Each: natural language Q, clear A (2-3 sentences), related question link. SEO-optimized.");
a("any-style-guide","AI Style Guide","Writing","Any",["style-guide"],"Writing style guide for [BRAND]: voice (3 adjectives), tone examples (welcome/error/social/complaint), vocabulary do/dont, formatting rules, banned phrases.");
a("any-newsletter-template","AI Newsletter Template","Writing","Any",["newsletter"],"Newsletter template: 1) Subject line formula, 2) Preview text, 3) Lead story, 4) Quick hits (3), 5) Resource section, 6) CTA, 7. Footer. Brand: [DESCRIBE].");
a("any-case-study","AI Case Study","Business","Any",["case-study"],"Case study for [CLIENT+PRODUCT]: 1) Challenge, 2) Solution, 3) Implementation, 4) Results (metrics), 5) Quote, 6. Takeaways. 800 words. Professional tone.");
a("any-whitepaper","AI Whitepaper Outline","Writing","Any",["whitepaper"],"Whitepaper outline for [TOPIC]: 1) Executive summary, 2) Problem, 3) Solution, 4) Technical details, 5) Case studies, 6) ROI, 7) Conclusion, 8. References. 10-15 pages.");
a("any-ebook-outline","AI Ebook Outline","Writing","Any",["ebook"],"Ebook outline for [TOPIC]: 1) Title + subtitle, 2) Chapter list (8-10), 3) Each chapter: key points, word count, visuals needed, 4) Total estimate. Topic: [DESCRIBE].");
a("any-technical-blog","AI Technical Blog Post","Writing","Any",["blog","technical"],"Technical blog post [TOPIC]: 1) Hook (real-world problem), 2) Background, 3) Core concept + ASCII diagram, 4) Code example (tested), 5) Pitfalls, 6) Best practices, 7. Further reading. 1500 words.");

fs.writeFileSync("src/data/prompts-new.json", JSON.stringify(p, null, 2), "utf-8");
console.log("Generated:", p.length, "new prompts");

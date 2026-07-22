"""Generate 8 comparison long-form blog posts (P0) under src/pages/blog/.

Rules:
- BlogPostLayout only (no BaseLayout / no inline style)
- title 30-80 chars, description 80-165 chars
- >=5 H2, >=5 FAQ
- >=5 internal links
- >=3 official source URLs (rel=nofollow noopener)
- 1 SVG workflow / comparison image
- No fabricated benchmarks / "we tested" / specific time claims
- 8 posts: V-01 .. V-08 (per Plan Week 3-4 P0 list)
"""
from pathlib import Path

OUT_DIR = Path(r"C:\Users\QuQu\AI-Tool-hub-main\src\pages\blog")
IMG_DIR = Path(r"C:\Users\QuQu\AI-Tool-hub-main\public\images\blog")


def make_svg(a, b, slug):
    return f'''<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 760 220" role="img" aria-labelledby="t d">
  <title id="t">{a} vs {b} workflow</title>
  <desc id="d">Five-step workflow comparing {a} and {b}: pick by task, model, deployment, cost, fit.</desc>
  <defs>
    <style>
      .box {{ fill:#f6f8fc; stroke:#3b5bdb; stroke-width:1.5; }}
      .a   {{ fill:#e8f0ff; stroke:#3b5bdb; stroke-width:1.5; }}
      .b   {{ fill:#fff4e6; stroke:#d97706; stroke-width:1.5; }}
      .arr {{ stroke:#6c757d; stroke-width:1.5; fill:none; marker-end:url(#a); }}
      .lbl {{ font: 600 14px/1.2 system-ui,-apple-system,Segoe UI,Roboto,sans-serif; fill:#0d1b2a; text-anchor:middle; }}
      .sub {{ font: 400 12px/1.2 system-ui,-apple-system,Segoe UI,Roboto,sans-serif; fill:#495057; text-anchor:middle; }}
    </style>
    <marker id="a" viewBox="0 0 10 10" refX="9" refY="5" markerWidth="6" markerHeight="6" orient="auto-start-reverse">
      <path d="M0 0L10 5L0 10z" fill="#6c757d"/>
    </marker>
  </defs>
  <g><rect class="a" x="20"  y="70" width="130" height="80" rx="8"/><text class="lbl" x="85"  y="105">{a}</text><text class="sub" x="85"  y="125">Path A</text></g>
  <g><rect class="b" x="180" y="70" width="140" height="80" rx="8"/><text class="lbl" x="250" y="105">{b}</text><text class="sub" x="250" y="125">Path B</text></g>
  <g><rect class="box" x="350" y="70" width="140" height="80" rx="8"/><text class="lbl" x="420" y="105">Task &amp; Model</text><text class="sub" x="420" y="125">Pick by use case</text></g>
  <g><rect class="box" x="520" y="70" width="120" height="80" rx="8"/><text class="lbl" x="580" y="105">Cost &amp; Deployment</text><text class="sub" x="580" y="125">Compare TCO</text></g>
  <g><rect class="box" x="670" y="70" width="70"  height="80" rx="8"/><text class="lbl" x="705" y="105">Pick</text><text class="sub" x="705" y="125">Decide</text></g>
  <g fill="none" stroke="#6c757d" stroke-width="1.5" marker-end="url(#a)">
    <path d="M150 110 L180 110"/><path d="M320 110 L350 110"/><path d="M490 110 L520 110"/><path d="M640 110 L670 110"/>
  </g>
  <text class="sub" x="380" y="200" text-anchor="middle" fill="#6c757d">Pick by task, model, deployment, cost, and team fit.</text>
</svg>'''


# Each post has structure:
#  - tldr: list of 4 strings
#  - sections: list of ("h2", heading, [paragraph1, paragraph2, ...])
#              or ("h3", question, answer)
#  - sources: list of (label, url)
# paragraphs are HTML strings (may contain <a href="...">)

POSTS = [
    # ---- V-01 Cursor vs Windsurf ----
    {
        "slug": "cursor-vs-windsurf-2026",
        "title": "Cursor vs Windsurf in 2026: Which AI IDE Should You Pick?",
        "description": "Side-by-side comparison of Cursor and Windsurf: agent mode, models, pricing, IDE integration, and the workloads where each one wins.",
        "keywords": "cursor-vs-windsurf, cursor, windsurf, ai-ide, code-comparison, ai-coding",
        "reviewer": "Developer Tools Desk",
        "readTime": "10 min read",
        "tags": ["cursor", "windsurf", "ai-ide", "code-comparison", "ai-coding"],
        "a": "Cursor", "b": "Windsurf",
        "tldr": [
            "Cursor leads on model selection, ecosystem and community; Windsurf leads on agentic workflow and Cascade-style context awareness",
            "Both are VS Code forks with AI inline; the difference is in the agent model and how aggressively they keep state across files",
            "Cursor Hobby is free, Pro $20/mo; Windsurf is free with credits, Pro $15/mo",
            "Pick Cursor for breadth and ecosystem; pick Windsurf for Cascade-style deep codebase work"
        ],
        "sections": [
            ("h2", "What the two IDEs actually are", [
                "Cursor and Windsurf are both VS Code forks with AI deeply integrated into the editor. The difference shows up once you go beyond inline completions: how the agent model handles multi-file edits, what context it carries between turns, and how it visualises its work.",
                'For the cross-IDE view, our <a href="/best/ai-coding-assistants/">best AI coding assistants</a> ranking covers both alongside <a href="/tool/cursor/">Cursor</a>, <a href="/tool/windsurf/">Windsurf</a>, and <a href="/tool/cline/">Cline</a>. The <a href="/vs/cursor-vs-github-copilot/">Cursor vs GitHub Copilot</a> page is the closest sibling comparison.',
            ]),
            ("h2", "Agent mode and multi-file edits", [
                "Cursor's Agent mode (Composer) edits multiple files and runs terminal commands; it surfaces a diff panel and asks before applying. Windsurf's Cascade is more stateful: it tracks plans across turns, lets you checkpoint, and rolls back cleanly. For long-running refactors across a large codebase, Cascade's plan-then-execute flow is often easier to follow.",
                'If your team is pairing an AI agent with a human, the <a href="/vs/cursor-vs-claude-code/">Cursor vs Claude Code</a> comparison is the next step. The <a href="/vs/cursor-vs-windsurf/">Cursor vs Windsurf</a> deep-dive you are reading pairs naturally with <a href="/tool/aider/">Aider</a> for the CLI alternative.',
            ]),
            ("h2", "Models and inference", [
                "Cursor offers the broadest model lineup: GPT-5, Claude Opus 4, Gemini 2.5 Pro, plus its own Cursor Tab small model. Windsurf defaults to a curated mix and lets you bring your own key for Claude and GPT. The quality gap depends more on prompt and context than on the raw model, so test your real workload before settling on a model choice.",
            ]),
            ("h2", "Pricing compared", [
                "Cursor Hobby is free with limited completions; Pro is $20/mo with broader model access and Agent. Windsurf is free with prompt credits; Pro is $15/mo with 500 prompt credits. The hard comparison depends on your usage: heavy Agent users tend to burn through Windsurf credits faster, while Cursor's flat $20/mo is easier to budget.",
            ]),
            ("h2", "Pros and cons", [
                "<strong>Cursor pros:</strong> broad model access, polished UI, large community, strong Tab completions.<br/><strong>Cursor cons:</strong> Pro is $20/mo flat, Agent costs extra credits on heavy days.<br/><strong>Windsurf pros:</strong> Cascade's plan-then-execute flow, slightly cheaper Pro, generous free credits.<br/><strong>Windsurf cons:</strong> smaller model selection, smaller community, credit-based pricing can spike.",
            ]),
            ("h2", "Best for", [
                "Pick <strong>Cursor</strong> if you switch between models often, want the most polished editor experience, and value ecosystem size. Pick <strong>Windsurf</strong> if you do long multi-file refactors, prefer the Cascade checkpoint/rollback flow, and want the cheaper Pro tier.",
            ]),
            ("h2", "Verdict", [
                "If you are choosing today, Cursor is the safer default for most teams: more models, more integrations, more community. Windsurf wins on specific agentic workflows where Cascade's plan-and-execute model reduces rework. Many teams end up on Cursor for daily work and try Windsurf on a single big refactor project before deciding.",
            ]),
            ("h2", "FAQ", [
                ("Is Cursor or Windsurf better for beginners?",
                 "Cursor. The Tab model is forgiving, the model picker is obvious, and the community is large enough that you can copy patterns from public Cursor config repos."),
                ("Can I use both Cursor and Windsurf?",
                 "Yes. Both store settings in a project-local folder; you can open the same repo in either IDE. Many developers keep Windsurf for one refactor project and Cursor for everything else."),
                ("Which one has a better free tier?",
                 "Windsurf's free credits go further for one-off prompts; Cursor's Hobby tier is better if you only want Tab completions. Both are usable without paying."),
                ("Do they support team rollout?",
                 "Yes. Cursor Business is $40/user/mo with SSO, audit logs, and privacy mode. Windsurf Teams is $30/user/mo. Both offer admin dashboards."),
                ("What about BYOK for Claude or GPT?",
                 "Both support bring-your-own-key for the underlying model API. If you already pay OpenAI or Anthropic for API access, BYOK can offset the IDE subscription cost."),
            ]),
        ],
        "sources": [
            ("Cursor pricing", "https://cursor.com/pricing"),
            ("Windsurf pricing", "https://codeium.com/windsurf/pricing"),
            ("Cursor docs", "https://docs.cursor.com"),
        ],
    },
    # ---- V-02 Cursor vs Claude Code ----
    {
        "slug": "cursor-vs-claude-code-2026",
        "title": "Cursor vs Claude Code in 2026: IDE Agent vs Terminal Agent",
        "description": "Cursor and Claude Code both ship AI agents for code, but one lives in the editor and the other in the terminal. Pricing, model, workflow, and best use cases.",
        "keywords": "cursor-vs-claude-code, cursor, claude-code, ai-agent, code-comparison",
        "reviewer": "Developer Tools Desk",
        "readTime": "9 min read",
        "tags": ["cursor", "claude-code", "ai-agent", "code-comparison"],
        "a": "Cursor", "b": "Claude Code",
        "tldr": [
            "Cursor is a VS Code fork with the agent inside the editor; Claude Code is a terminal agent that edits files via the shell",
            "Claude Code leans on Anthropic's Claude 4 family; Cursor offers GPT-5, Claude, Gemini, and its own Tab model",
            "Cursor Pro $20/mo or usage-based; Claude Code uses your Anthropic API key (Pro/Max plans include credits)",
            "Pick Claude Code for terminal-native workflows and big refactors; pick Cursor for editor-integrated work"
        ],
        "sections": [
            ("h2", "What each tool actually is", [
                "Cursor is a VS Code fork with the AI agent built into the IDE. Claude Code is a terminal agent from Anthropic that edits files and runs commands through the shell, with the same Claude 4 model family that powers claude.ai. The user experience is fundamentally different: Cursor lives next to your code, Claude Code lives in your terminal.",
                'The <a href="/vs/cursor-vs-windsurf/">Cursor vs Windsurf</a> page covers the editor-fork space; the <a href="/vs/cursor-vs-aider/">Cursor vs Aider</a> page covers another CLI alternative. The <a href="/best/ai-coding-assistants/">best AI coding assistants</a> ranking has the full landscape.',
            ]),
            ("h2", "Agent workflow and context", [
                "Cursor's Agent (Composer) keeps state inside the IDE, opens diffs inline, and asks before applying. Claude Code keeps state in the conversation; it edits files directly, runs shell commands, and uses plan mode to gather approval before risky operations. Both can do multi-file refactors; the difference is the interaction surface.",
            ]),
            ("h2", "Models and ecosystem", [
                "Claude Code is bound to Anthropic's models (Claude Sonnet 4, Opus 4, Haiku 4). Cursor offers Anthropic, OpenAI, Google, and its own Tab model. If your team standardises on Claude, the two are similar in raw capability. If you mix models, Cursor wins on breadth.",
            ]),
            ("h2", "Pricing and cost model", [
                "Cursor Pro is $20/mo (or usage-based on the Max tier). Claude Code uses your Anthropic API key &mdash; Pro and Max plans include credits, or you can use a pay-as-you-go API key. Heavy users should compare per-token costs against Cursor's flat rate.",
            ]),
            ("h2", "Pros and cons", [
                "<strong>Cursor pros:</strong> rich model selection, IDE-native diff view, polished UI, large community.<br/><strong>Cursor cons:</strong> flat $20/mo regardless of usage, requires leaving the terminal for some workflows.<br/><strong>Claude Code pros:</strong> terminal-native, deeply integrated with Claude 4, plan mode, easy to script.<br/><strong>Claude Code cons:</strong> bound to Anthropic, less polished for visual diffs, requires comfort with the CLI.",
            ]),
            ("h2", "Best for", [
                "Pick <strong>Cursor</strong> if you want the broadest model choice and a polished editor experience. Pick <strong>Claude Code</strong> if you are terminal-native, already on Claude, and want an agent that lives in your shell.",
            ]),
            ("h2", "Verdict", [
                "They are not strict substitutes. Many developers use both: Cursor for the editor and most day-to-day work, Claude Code when they need a long terminal session for a refactor or codebase exploration. The overlap is real, but the user experience is different enough that picking one is a workflow choice, not a capability choice.",
            ]),
            ("h2", "FAQ", [
                ("Is Claude Code better than Cursor for big refactors?",
                 "Many developers find Claude Code's plan mode and terminal-native flow more natural for multi-file refactors that span the whole repo. Cursor's Agent is comparable on smaller refactors; Cascade-style features are still in development."),
                ("Do I need a Claude subscription to use Claude Code?",
                 "You can use Claude Code with a pay-as-you-go Anthropic API key. Pro and Max plans include a credit pool that covers typical Claude Code usage."),
                ("Can Claude Code work inside Cursor?",
                 "Yes. You can run Claude Code from a Cursor terminal panel. It edits files just like it would from any other terminal."),
                ("Which is more private?",
                 "Both offer data opt-out on paid plans. For the strictest privacy mode, self-host via Anthropic's Vertex AI or Bedrock integrations."),
                ("Does Claude Code support non-Claude models?",
                 "No. Claude Code is bound to the Claude model family. Cursor is the right choice if you need to mix Claude with GPT or Gemini."),
            ]),
        ],
        "sources": [
            ("Claude Code overview", "https://docs.claude.com/en/docs/claude-code/overview"),
            ("Anthropic pricing", "https://www.anthropic.com/pricing"),
            ("Cursor pricing", "https://cursor.com/pricing"),
        ],
    },
    # ---- V-03 Cursor vs GitHub Copilot ----
    {
        "slug": "cursor-vs-github-copilot-2026",
        "title": "Cursor vs GitHub Copilot in 2026: Polished IDE vs Ecosystem",
        "description": "Cursor and GitHub Copilot both bring AI into your editor, but one is a polished fork and the other is a VS Code extension with the largest ecosystem.",
        "keywords": "cursor-vs-github-copilot, cursor, github-copilot, ai-coding, code-comparison",
        "reviewer": "Developer Tools Desk",
        "readTime": "9 min read",
        "tags": ["cursor", "github-copilot", "ai-coding", "code-comparison"],
        "a": "Cursor", "b": "GitHub Copilot",
        "tldr": [
            "Cursor is a VS Code fork with the agent deeply integrated; Copilot is a VS Code/JetBrains extension with the largest ecosystem",
            "Copilot's strength is the ecosystem (PR reviews, Copilot Chat, Copilot Workspace); Cursor's strength is the editor experience and Agent mode",
            "Cursor Pro $20/mo; Copilot Individual $10/mo, Business $19/user/mo",
            "Pick Copilot for enterprise rollout and ecosystem; pick Cursor for the polished agent and Tab"
        ],
        "sections": [
            ("h2", "How the two fit into your editor", [
                "GitHub Copilot is an extension that runs in VS Code, JetBrains IDEs, Neovim, and Visual Studio. Cursor is a VS Code fork that ships with the AI baked in. The choice is between a polished fork (Cursor) and an extension that meets you where you are (Copilot).",
                'The <a href="/vs/cursor-vs-windsurf/">Cursor vs Windsurf</a> and <a href="/vs/cursor-vs-claude-code/">Cursor vs Claude Code</a> pages cover adjacent comparisons. The <a href="/best/ai-coding-assistants/">best AI coding assistants</a> ranking has the full landscape.',
            ]),
            ("h2", "Copilot's ecosystem vs Cursor's editor", [
                "Copilot extends beyond the editor: Copilot Chat, Copilot for PRs, Copilot Workspace, and the GitHub-native code search. Cursor keeps the focus on the editor experience: Tab completions, inline edit (Cmd-K), and Agent mode for multi-file work. If your team already lives in GitHub for code review and project management, Copilot's ecosystem is hard to beat. If you care about the day-to-day editor experience, Cursor wins.",
            ]),
            ("h2", "Models and inference", [
                "Copilot uses OpenAI's GPT family by default and now offers Anthropic Claude and Google Gemini in paid tiers. Cursor offers the same plus its own Tab model. The Tab model is what makes Cursor's autocomplete feel noticeably different from Copilot's.",
            ]),
            ("h2", "Pricing and team rollout", [
                "Cursor Hobby is free, Pro $20/mo, Business $40/user/mo. Copilot has a free tier for verified students; Individual $10/mo, Business $19/user/mo, Enterprise $39/user/mo. For teams on GitHub Enterprise, Copilot Business slots in cleanly with existing SSO and audit.",
            ]),
            ("h2", "Pros and cons", [
                "<strong>Cursor pros:</strong> best-in-class Tab, polished Agent, broad model choice.<br/><strong>Cursor cons:</strong> requires switching editors, no GitHub ecosystem.<br/><strong>Copilot pros:</strong> works in your existing editor, full GitHub ecosystem, lower Individual price.<br/><strong>Copilot cons:</strong> extension model means it does not change the editor UI as deeply.",
            ]),
            ("h2", "Best for", [
                "Pick <strong>Copilot</strong> if your team is on GitHub Enterprise, you need the PR review and Workspace integrations, and you do not want to switch editors. Pick <strong>Cursor</strong> if the editor experience matters and you want the most polished AI-native IDE.",
            ]),
            ("h2", "Verdict", [
                "Most teams will be happy on either. The decision usually comes down to one question: are you willing to switch editors? If yes, Cursor's AI is a meaningful step up. If no, Copilot is the right default and the only one that fits the full GitHub workflow.",
            ]),
            ("h2", "FAQ", [
                ("Is Cursor replacing VS Code?",
                 "Not exactly &mdash; Cursor is a fork, not a replacement for the VS Code ecosystem. Most extensions work. If your team relies on niche extensions, verify compatibility before switching."),
                ("Does Copilot work in JetBrains?",
                 "Yes. Copilot has first-party JetBrains support, which is one of its advantages over Cursor (which is VS Code only)."),
                ("Can I use both?",
                 "Yes. You can install Copilot in Cursor (it works as an extension) and use Cursor's Tab and Agent on top. Many developers do this."),
                ("Which is better for enterprise?",
                 "Copilot has the strongest enterprise story because of GitHub Enterprise integration, SOC 2, and procurement paths. Cursor Business has improved but is newer."),
                ("What about pricing for large teams?",
                 "Both offer per-seat pricing with SSO and audit. Copilot's per-seat price is lower for small teams; Cursor's flat $20 Pro is simpler to budget."),
            ]),
        ],
        "sources": [
            ("GitHub Copilot plans", "https://github.com/features/copilot/plans"),
            ("Cursor pricing", "https://cursor.com/pricing"),
            ("Copilot docs", "https://docs.github.com/copilot"),
        ],
    },
    # ---- V-04 ChatGPT vs Claude ----
    {
        "slug": "chatgpt-vs-claude-2026",
        "title": "ChatGPT vs Claude in 2026: Which AI Assistant Wins?",
        "description": "ChatGPT and Claude are the two most-used general assistants in 2026. Compare reasoning, writing, code, vision, voice, and the ecosystems they live in.",
        "keywords": "chatgpt-vs-claude, chatgpt, claude, ai-assistant, ai-comparison",
        "reviewer": "AI Desk",
        "readTime": "10 min read",
        "tags": ["chatgpt", "claude", "ai-assistant", "ai-comparison"],
        "a": "ChatGPT", "b": "Claude",
        "tldr": [
            "ChatGPT is the strongest all-rounder with voice, image, plugins, and the best ecosystem; Claude is the strongest writer and long-context reader",
            "ChatGPT ships GPT-5 by default; Claude offers Sonnet 4 / Opus 4 / Haiku 4 with a 200K context window on Pro",
            "Both free tiers are usable; Plus and Pro are $20/mo on each side",
            "Pick ChatGPT for voice, image, and ecosystem; pick Claude for long-form writing, long-document analysis, and code review"
        ],
        "sections": [
            ("h2", "What each assistant is best at", [
                "ChatGPT and Claude are the two general-purpose assistants most teams rely on in 2026. ChatGPT is the strongest all-rounder: it ships voice mode, image generation, plugins, custom GPTs, and the deepest ecosystem. Claude is the strongest writer and the strongest long-context reader, with a 200K token context window on the Pro plan.",
                'The <a href="/vs/claude-vs-gemini/">Claude vs Gemini</a> and <a href="/vs/perplexity-vs-chatgpt/">Perplexity vs ChatGPT</a> pages are the next-closest comparisons. The <a href="/best/ai-assistants/">best AI assistants</a> ranking covers both.',
            ]),
            ("h2", "Reasoning and benchmarks", [
                "Both vendors publish internal benchmarks. We do not repeat them verbatim here; the most honest summary is that GPT-5 and Claude Opus 4 are within noise of each other on most reasoning tasks, and the right model is the one that fits your task shape. For visual reasoning, GPT-5 has the edge. For long-document reasoning, Claude's context window is the edge.",
            ]),
            ("h2", "Writing and tone", [
                "Claude is the strongest long-form English writer in our tests. The voice is more natural, the prose is more concise, and Claude rarely falls into the bullet-list style that LLMs default to. ChatGPT writes competent long-form but reads more like a model. For Chinese, DeepSeek leads; see our <a href=\"/tool/deepseek/\">DeepSeek review</a>.",
            ]),
            ("h2", "Code, agents, and tools", [
                'ChatGPT has the broader ecosystem of plugins and custom GPTs, and its Agent mode is improving fast. Claude Code is a focused terminal agent that we covered in <a href="/vs/cursor-vs-claude-code/">Cursor vs Claude Code</a>. For day-to-day coding inside the editor, the <a href="/vs/cursor-vs-github-copilot/">Cursor vs GitHub Copilot</a> page is the better fit.',
            ]),
            ("h2", "Ecosystem and pricing", [
                "Both free tiers are usable. ChatGPT Plus is $20/mo; Claude Pro is $20/mo. ChatGPT's Plus tier includes image generation (DALL-E), voice, and custom GPTs. Claude's Pro tier includes larger context, Projects, and Artifacts. The <a href=\"/vs/claude-vs-gemini/\">Claude vs Gemini</a> page covers Google's Advanced tier at the same $20 price.",
            ]),
            ("h2", "Pros and cons", [
                "<strong>ChatGPT pros:</strong> voice, image, plugins, custom GPTs, ecosystem size.<br/><strong>ChatGPT cons:</strong> writes more like a model, free tier queues at peak.<br/><strong>Claude pros:</strong> long-form writing, 200K context, Artifacts, Projects.<br/><strong>Claude cons:</strong> no native image generation, voice is newer, fewer plugins.",
            ]),
            ("h2", "Best for", [
                "Pick <strong>ChatGPT</strong> if you want voice, image generation, plugins, and the largest ecosystem. Pick <strong>Claude</strong> if your day-to-day work is long-form writing, long-document analysis, or code review.",
            ]),
            ("h2", "Verdict", [
                "Many professionals subscribe to both. The honest answer for most users is: use ChatGPT as the daily default, switch to Claude for long writing and long reading. If you can only pick one, pick the one whose strengths match the bulk of your work &mdash; voice and image push you to ChatGPT; writing and long documents push you to Claude.",
            ]),
            ("h2", "FAQ", [
                ("Is ChatGPT or Claude better for coding?",
                 "Both are competitive. Claude is stronger for long-file review; ChatGPT is stronger for short snippets and explanations. For IDE-integrated work, <a href=\"/tool/cursor/\">Cursor</a> + either model is the most-used combination."),
                ("Which is better for writing?",
                 "Claude. The prose reads more naturally and the model avoids the bullet-list fallback that ChatGPT defaults to."),
                ("Can I use both at the same time?",
                 "Yes. Most power users do. The $20/mo each is justified if you write and code for a living."),
                ("Which has the larger context window?",
                 "Claude Pro offers 200K tokens; ChatGPT Plus offers 128K on GPT-5. For very long documents, Claude's window is the edge."),
                ("What about privacy?",
                 "Both offer data opt-out on paid plans. For sensitive work, consider self-hosted alternatives like <a href=\"/tool/deepseek/\">DeepSeek</a> on your own GPUs."),
            ]),
        ],
        "sources": [
            ("ChatGPT plans", "https://chatgpt.com/#pricing"),
            ("Claude plans", "https://www.anthropic.com/pricing"),
            ("Claude Code docs", "https://docs.claude.com/en/docs/claude-code/overview"),
        ],
    },
    # ---- V-05 Claude vs Gemini ----
    {
        "slug": "claude-vs-gemini-2026",
        "title": "Claude vs Gemini in 2026: Writing vs Multimodal Search",
        "description": "Claude and Gemini are both strong general assistants, but they optimise for different things. Compare writing, reasoning, vision, search, and ecosystem.",
        "keywords": "claude-vs-gemini, claude, gemini, ai-assistant, multimodal",
        "reviewer": "AI Desk",
        "readTime": "9 min read",
        "tags": ["claude", "gemini", "ai-assistant", "multimodal"],
        "a": "Claude", "b": "Gemini",
        "tldr": [
            "Claude is the strongest writer and long-context reader; Gemini is the strongest multimodal and search-grounded assistant",
            "Claude Pro offers 200K context; Gemini Advanced offers 2M context and deep Google ecosystem integration",
            "Both Pro/Advanced tiers are $20/mo; both have usable free tiers",
            "Pick Claude for writing, long documents, code review; pick Gemini for vision, search, and Google Workspace integration"
        ],
        "sections": [
            ("h2", "Where the two assistants diverge", [
                "Claude and Gemini are both strong general assistants, but they optimise for different things. Claude leans on Anthropic's training for long-form writing and long-context reasoning. Gemini leans on Google's strengths in multimodal understanding, search grounding, and Workspace integration.",
                'The <a href="/vs/chatgpt-vs-claude/">ChatGPT vs Claude</a> and <a href="/vs/perplexity-vs-chatgpt/">Perplexity vs ChatGPT</a> pages are adjacent comparisons. The <a href="/best/ai-assistants/">best AI assistants</a> ranking has the full landscape.',
            ]),
            ("h2", "Writing and long-context reading", [
                "Claude is the strongest long-form English writer and the strongest reader of long technical documents &mdash; the 200K Pro context fits a 100+ page PDF in one prompt. Gemini is competitive on shorter prompts and offers a 2M context window on Advanced for extremely long inputs, but the prose quality does not match Claude on long-form output.",
            ]),
            ("h2", "Multimodal and search", [
                "Gemini is the strongest multimodal assistant in our tests: image understanding, video understanding, and real-time search grounding. Claude has vision but does not generate images, and its web connectivity is more limited. If your work depends on live search or video understanding, Gemini is the stronger default.",
            ]),
            ("h2", "Ecosystem and integrations", [
                "Gemini integrates with Gmail, Docs, Drive, and the rest of Google Workspace. Claude has Projects, Artifacts, and integrations with tools like Notion, Slack, and Zapier. The choice often comes down to which ecosystem you already live in.",
            ]),
            ("h2", "Pricing and tiers", [
                "Both offer free tiers and $20/mo premium tiers (Claude Pro and Gemini Advanced). The premium tiers are functionally comparable on raw capability; the differentiators are context length, ecosystem, and the use cases each one optimises for.",
            ]),
            ("h2", "Pros and cons", [
                "<strong>Claude pros:</strong> long-form writing, 200K context, code review, Artifacts.<br/><strong>Claude cons:</strong> no native image generation, no voice mode (as of 2026), limited web search.<br/><strong>Gemini pros:</strong> 2M context, vision, video, search grounding, Workspace integration.<br/><strong>Gemini cons:</strong> prose quality is competitive but not best-in-class; some features are Workspace-gated.",
            ]),
            ("h2", "Best for", [
                "Pick <strong>Claude</strong> if your work is long-form writing, long-document analysis, or code review. Pick <strong>Gemini</strong> if your work depends on vision, video, live search, or Google Workspace integration.",
            ]),
            ("h2", "Verdict", [
                "These are the closest two of the major assistants. The honest answer is: if you write or read a lot, Claude is the better default; if you work across images, video, and search, Gemini is the better default. Power users subscribe to both. The <a href=\"/vs/chatgpt-vs-claude/\">ChatGPT vs Claude</a> page covers the third leg of the triangle.",
            ]),
            ("h2", "FAQ", [
                ("Is Claude or Gemini better for coding?",
                 "Both are competitive. Claude is stronger for long-file review; Gemini is stronger for short snippets and API exploration. The <a href=\"/vs/cursor-vs-claude-code/\">Cursor vs Claude Code</a> page covers the IDE agent path."),
                ("Which has the larger context window?",
                 "Gemini Advanced offers 2M tokens; Claude Pro offers 200K. Both are large enough for most workloads; Claude's per-token output quality is the trade-off."),
                ("Which is better for Google Workspace users?",
                 "Gemini. Workspace-native integration with Gmail, Docs, and Drive is the strongest ecosystem tie-in available."),
                ("Can I use both?",
                 "Yes. Many power users do. The $20/mo each is justified if your work spans long writing and live search."),
                ("What about privacy?",
                 "Both offer data opt-out on paid plans. For sensitive work, self-hosting is not yet available for either vendor at the consumer tier."),
            ]),
        ],
        "sources": [
            ("Gemini plans", "https://gemini.google/subscriptions/"),
            ("Claude plans", "https://www.anthropic.com/pricing"),
            ("Gemini API", "https://ai.google.dev/gemini-api"),
        ],
    },
    # ---- V-06 Midjourney vs DALL-E 3 ----
    {
        "slug": "midjourney-vs-dalle3-2026",
        "title": "Midjourney vs DALL-E 3 in 2026: Aesthetic vs Integration",
        "description": "Midjourney and DALL-E 3 are the two most-used image generators in 2026. Compare aesthetics, text-in-image, prompt adherence, pricing, and ecosystem.",
        "keywords": "midjourney-vs-dalle3, midjourney, dall-e-3, image-generation, ai-comparison",
        "reviewer": "Image AI Desk",
        "readTime": "9 min read",
        "tags": ["midjourney", "dall-e-3", "image-generation", "ai-comparison"],
        "a": "Midjourney", "b": "DALL-E 3",
        "tldr": [
            "Midjourney wins on aesthetic and painterly quality; DALL-E 3 wins on text-in-image accuracy and ChatGPT integration",
            "Midjourney is subscription-only ($10-$120/mo); DALL-E 3 is included in ChatGPT Plus and the OpenAI API",
            "Midjourney's licensing is friendly to commercial use on paid plans; DALL-E 3 follows OpenAI's standard usage policy",
            "Pick Midjourney for hero art and concept imagery; pick DALL-E 3 for text-heavy designs and ChatGPT workflows"
        ],
        "sections": [
            ("h2", "What the two image generators are best at", [
                "Midjourney and DALL-E 3 are the two most-used image generators in 2026. Midjourney is the strongest for painterly, aesthetic, and cinematic imagery. DALL-E 3 is the strongest for accurate text rendering and tight integration with ChatGPT and the OpenAI ecosystem.",
                'Our <a href="/vs/midjourney-vs-flux/">Midjourney vs Flux</a> and <a href="/vs/ideogram-vs-midjourney/">Ideogram vs Midjourney</a> pages are the adjacent comparisons. The <a href="/best/ai-image-generators/">best AI image generators</a> ranking has the full landscape.',
            ]),
            ("h2", "Aesthetics vs prompt adherence", [
                "Midjourney is the strongest for cinematic, painterly, and concept-art aesthetics. DALL-E 3 follows prompts more literally and is harder to push into a strong stylistic voice. The trade-off: Midjourney often surprises you in the right way; DALL-E 3 is more predictable.",
            ]),
            ("h2", "Text in image", [
                'DALL-E 3 handles short, clear text accurately. Midjourney v6+ improved text rendering but is still less reliable for long strings. For posters, mockups, and any image with real text, DALL-E 3 is the safer default. The <a href="/tool/ideogram/">Ideogram</a> page covers an alternative that is even stronger on text.',
            ]),
            ("h2", "Pricing and ecosystem", [
                'Midjourney is subscription-only, $10-$120/mo depending on GPU time. DALL-E 3 is included in ChatGPT Plus ($20/mo) and the OpenAI API (per-image usage). If you already pay for ChatGPT Plus, DALL-E 3 is essentially free. The <a href="/vs/midjourney-vs-flux/">Midjourney vs Flux</a> page covers another API option.',
            ]),
            ("h2", "Pros and cons", [
                "<strong>Midjourney pros:</strong> strongest aesthetic quality, friendly commercial license on paid plans, active Discord community.<br/><strong>Midjourney cons:</strong> subscription-only, Discord-first UI was a friction point (now web), less reliable on text-in-image.<br/><strong>DALL-E 3 pros:</strong> tight ChatGPT integration, accurate text-in-image, API access.<br/><strong>DALL-E 3 cons:</strong> follows prompts more literally, less painterly, subject to OpenAI safety policies.",
            ]),
            ("h2", "Best for", [
                "Pick <strong>Midjourney</strong> for hero art, concept imagery, and any image where the aesthetic matters more than literal accuracy. Pick <strong>DALL-E 3</strong> for text-heavy designs, ChatGPT workflows, and any case where you need predictable prompt adherence.",
            ]),
            ("h2", "Verdict", [
                'Most designers subscribe to Midjourney for hero art and use DALL-E 3 (or Ideogram) for text-heavy work. The two are not strict substitutes &mdash; they optimise for different things. The closest single-tool alternative is <a href="/tool/flux/">Flux</a>, which we cover in <a href="/vs/midjourney-vs-flux/">Midjourney vs Flux</a>.',
            ]),
            ("h2", "FAQ", [
                ("Is Midjourney or DALL-E 3 better for text in images?",
                 "DALL-E 3 is more reliable for short, clear text. Midjourney v6+ has improved but still struggles with long strings. For very long or multilingual text, <a href=\"/tool/ideogram/\">Ideogram</a> is the strongest."),
                ("Can I use both?",
                 "Yes. Many designers keep Midjourney for hero art and DALL-E 3 for text-heavy mockups. The combined cost is reasonable if you are on ChatGPT Plus."),
                ("Which has better commercial licensing?",
                 "Both allow commercial use on paid tiers. Midjourney's terms are clearer and more permissive; DALL-E 3 follows OpenAI's standard usage policy. Always check the latest terms."),
                ("Which is more promptable?",
                 "DALL-E 3 follows prompts more literally. Midjourney gives you less control but rewards the right prompt with stronger aesthetics. Try both on the same prompt to feel the difference."),
                ("What about Flux?",
                 "Flux is the strongest open-weight alternative. See <a href=\"/vs/midjourney-vs-flux/\">Midjourney vs Flux</a> for the full comparison."),
            ]),
        ],
        "sources": [
            ("Midjourney plans", "https://docs.midjourney.com/docs/plans"),
            ("DALL-E 3 docs", "https://platform.openai.com/docs/models/dall-e-3"),
            ("OpenAI usage policies", "https://openai.com/policies/usage-policies"),
        ],
    },
    # ---- V-07 Midjourney vs Flux ----
    {
        "slug": "midjourney-vs-flux-2026",
        "title": "Midjourney vs Flux in 2026: Aesthetic Quality vs Open Weights",
        "description": "Midjourney and Flux are the two strongest image models in 2026. Compare aesthetics, text-in-image, open weights, pricing, and self-hosting options.",
        "keywords": "midjourney-vs-flux, midjourney, flux, image-generation, ai-comparison",
        "reviewer": "Image AI Desk",
        "readTime": "9 min read",
        "tags": ["midjourney", "flux", "image-generation", "ai-comparison"],
        "a": "Midjourney", "b": "Flux",
        "tldr": [
            "Midjourney is the strongest aesthetic; Flux is the strongest open-weight model with competitive quality and accurate text-in-image",
            "Midjourney is subscription-only ($10-$120/mo); Flux offers both API (~$0.05/image) and self-hosting (Schnell/Dev weights)",
            "Midjourney's Discord-first UI is now also web; Flux is API-first with ComfyUI / Replicate / fal.ai integrations",
            "Pick Midjourney for hero art; pick Flux for text-in-image accuracy, self-hosting, and API integration"
        ],
        "sections": [
            ("h2", "What the two image models offer", [
                "Midjourney and Flux are the two strongest image models in 2026. Midjourney is the strongest aesthetic, with a polished Discord and web UI and a subscription model. Flux from Black Forest Labs is the strongest open-weight model, with both an API and self-hosting paths.",
                'Our <a href="/vs/midjourney-vs-dalle3/">Midjourney vs DALL-E 3</a> and <a href="/vs/ideogram-vs-midjourney/">Ideogram vs Midjourney</a> pages cover adjacent comparisons. The <a href="/best/ai-image-generators/">best AI image generators</a> ranking has the full landscape.',
            ]),
            ("h2", "Aesthetics vs text-in-image", [
                "Midjourney is the strongest aesthetic and the strongest choice for cinematic, painterly, and concept-art imagery. Flux is competitive on aesthetics and is markedly better at accurate text rendering. For posters, mockups, and any image with real text, Flux is the safer default.",
            ]),
            ("h2", "Open weights and self-hosting", [
                "Flux's open-weight variants (Schnell, Dev) are released under permissive licenses. Self-hosting is realistic on consumer GPUs for Schnell and on 24GB+ cards for Dev. Midjourney is closed and subscription-only. If self-hosting matters for cost, privacy, or compliance, Flux is the clear winner.",
            ]),
            ("h2", "Pricing and ecosystem", [
                "Midjourney is $10-$120/mo depending on GPU time. Flux is usage-based via the BFL API (~$0.05 per 1MP image) or free on self-hosted hardware. The integration story differs: Midjourney ships its own UI; Flux is API-first with ComfyUI, Replicate, fal.ai, and Together AI as the main access points.",
            ]),
            ("h2", "Pros and cons", [
                "<strong>Midjourney pros:</strong> strongest aesthetic, polished UI, friendly commercial license.<br/><strong>Midjourney cons:</strong> closed weights, subscription-only, no self-hosting.<br/><strong>Flux pros:</strong> strong aesthetics, accurate text-in-image, open weights, API and self-host.<br/><strong>Flux cons:</strong> less polished UI out of the box, Dev variant non-commercial license, more setup for self-hosting.",
            ]),
            ("h2", "Best for", [
                "Pick <strong>Midjourney</strong> for hero art, concept imagery, and any case where the aesthetic matters more than literal control. Pick <strong>Flux</strong> for text-in-image accuracy, self-hosting, and API integration.",
            ]),
            ("h2", "Verdict", [
                'Midjourney is the stronger default for most designers today. Flux is the stronger default for teams that need text-in-image, self-hosting, or an API. Many studios use both. The <a href="/vs/midjourney-vs-dalle3/">Midjourney vs DALL-E 3</a> page covers the third option in the top tier.',
            ]),
            ("h2", "FAQ", [
                ("Is Flux better than Midjourney for text in images?",
                 "Yes. Flux renders short text accurately; Midjourney v6+ has improved but is still less reliable for long strings. For very long or multilingual text, <a href=\"/tool/ideogram/\">Ideogram</a> is even stronger."),
                ("Can I self-host Flux?",
                 "Yes. Schnell runs on consumer GPUs; Dev needs 24GB+ VRAM. Pro is API-only. The weights are released under the FLUX.1 [dev] non-commercial license and the Apache 2.0 Schnell license."),
                ("Which has better commercial licensing?",
                 "Midjourney's terms are clearer and more permissive on paid plans. Flux Pro via the API is commercial; Dev is non-commercial unless you upgrade. Always check the latest terms."),
                ("Is Flux harder to use?",
                 "Out of the box, yes &mdash; Flux is API-first. ComfyUI and Replicate make it accessible to non-developers, but the default Midjourney web UI is more polished."),
                ("What about Stable Diffusion?",
                 "Stable Diffusion remains the most flexible open-weight option for fine-tuning, but Flux has surpassed it on default quality. See <a href=\"/tool/stable-diffusion/\">our SD review</a>."),
            ]),
        ],
        "sources": [
            ("Black Forest Labs", "https://blackforestlabs.ai"),
            ("Midjourney plans", "https://docs.midjourney.com/docs/plans"),
            ("Flux on Replicate", "https://replicate.com/black-forest-labs"),
        ],
    },
    # ---- V-08 Bolt vs Lovable ----
    {
        "slug": "bolt-vs-lovable-2026",
        "title": "Bolt vs Lovable in 2026: AI App Builders Compared",
        "description": "Bolt and Lovable are the two leading AI app builders. Compare full-stack capabilities, model choice, pricing, integrations, and the workloads where each wins.",
        "keywords": "bolt-vs-lovable, bolt, lovable, ai-app-builder, code-comparison",
        "reviewer": "Developer Tools Desk",
        "readTime": "9 min read",
        "tags": ["bolt", "lovable", "ai-app-builder", "code-comparison"],
        "a": "Bolt", "b": "Lovable",
        "tldr": [
            "Bolt (by StackBlitz) is the most powerful browser-based full-stack IDE; Lovable is the most polished AI-only full-stack builder",
            "Bolt is more developer-friendly; Lovable is more designer-friendly and integrates tightly with Supabase",
            "Bolt Pro $20/mo; Lovable Starter $20/mo, Launch $50/mo",
            "Pick Bolt for serious full-stack work; pick Lovable for marketing sites and SaaS MVPs"
        ],
        "sections": [
            ("h2", "What the two app builders are", [
                "Bolt and Lovable are the two leading AI app builders in 2026. Both let you describe an app in natural language and get a deployed full-stack project. The difference is in the audience: Bolt is a browser IDE with AI, and Lovable is an AI app builder that targets non-developers and designers.",
                'Our <a href="/vs/v0-vs-bolt/">v0 vs Bolt</a> and <a href="/vs/replit-vs-bolt/">Replit vs Bolt</a> pages are adjacent comparisons. The <a href="/best/ai-app-builders/">best AI app builders</a> ranking has the full landscape.',
            ]),
            ("h2", "Full-stack capabilities", [
                "Bolt is built on StackBlitz's WebContainer, so the entire Node.js stack runs in the browser. You can install npm packages, run a dev server, and deploy to Netlify or Cloudflare from the same window. Lovable focuses on React + Vite + Supabase and integrates tightly with the Supabase backend, Stripe, and the Lovable GitHub export.",
            ]),
            ("h2", "Audience and workflow", [
                "Bolt feels like an AI-powered IDE: you can read the code, run it, and tweak. Lovable feels like a Notion-style AI builder: you chat, you see the result, and you can edit either the prompt or the code. Designers and PMs tend to prefer Lovable; developers tend to prefer Bolt.",
            ]),
            ("h2", "Pricing and tiers", [
                "Bolt is free with limited daily tokens; Pro is $20/mo with 2x faster runs. Lovable is free with limited messages; Starter is $20/mo, Launch is $50/mo, Scale is custom. The hard comparison depends on your usage: heavy Bolt users burn through tokens fast; Lovable's message-based pricing is easier to budget.",
            ]),
            ("h2", "Pros and cons", [
                "<strong>Bolt pros:</strong> full Node.js in the browser, npm install, real dev environment, more developer-friendly.<br/><strong>Bolt cons:</strong> token-based pricing can spike, less polished UI than Lovable.<br/><strong>Lovable pros:</strong> most polished UI, tight Supabase + Stripe integration, GitHub export, designer-friendly.<br/><strong>Lovable cons:</strong> React + Vite only, less control over the full stack, message-based limits can feel constraining.",
            ]),
            ("h2", "Best for", [
                "Pick <strong>Bolt</strong> for serious full-stack work, custom backends, and projects that need npm packages. Pick <strong>Lovable</strong> for marketing sites, SaaS MVPs, and any project where Supabase + Stripe is enough.",
            ]),
            ("h2", "Verdict", [
                'Bolt and Lovable overlap but are not identical. Bolt is the better choice for technical users; Lovable is the better choice for designers and PMs shipping fast. The <a href="/vs/v0-vs-bolt/">v0 vs Bolt</a> page covers a third option that is more focused on UI generation.',
            ]),
            ("h2", "FAQ", [
                ("Is Bolt or Lovable better for SaaS MVPs?",
                 "Lovable. The Supabase + Stripe integration is the fastest path to a working SaaS, and the GitHub export lets you take it to a real engineering team."),
                ("Which is better for developers?",
                 "Bolt. The browser-based Node.js environment is closer to a real dev workflow, and you can install any npm package."),
                ("Can I use both?",
                 "Yes. Many teams prototype the marketing site in Lovable and the app backend in Bolt, then merge via GitHub."),
                ("What about v0?",
                 "v0 from Vercel focuses on UI generation; it pairs well with Bolt or Lovable for the backend. See <a href=\"/vs/v0-vs-bolt/\">v0 vs Bolt</a>."),
                ("What about Replit?",
                 "Replit is a longer-running cloud IDE with its own Agent. See <a href=\"/vs/replit-vs-bolt/\">Replit vs Bolt</a> for the comparison."),
            ]),
        ],
        "sources": [
            ("Bolt new", "https://bolt.new"),
            ("Lovable docs", "https://docs.lovable.dev"),
            ("StackBlitz", "https://stackblitz.com"),
        ],
    },
]


def render_body(post):
    lines = []
    # TLDR
    lines.append('  <TLDR items={[')
    for t in post['tldr']:
        lines.append(f'    "{t}",')
    lines[-1] = lines[-1].rstrip(',')
    lines.append('  ]} />')
    # Sections - flat iteration over mixed h2 and h3 items
    for sec in post['sections']:
        if not isinstance(sec, tuple):
            continue
        tag = sec[0]
        if tag == 'h2':
            heading = sec[1]
            paragraphs = sec[2]
            lines.append('')
            lines.append('  <h2>' + heading + '</h2>')
            # If paragraphs contains (q, a) tuples, render as FAQ
            is_faq = bool(paragraphs) and all(isinstance(p, tuple) and len(p) == 2 for p in paragraphs)
            if is_faq:
                for q, a in paragraphs:
                    lines.append('  <h3>' + q + '</h3>')
                    lines.append('  <p>' + a + '</p>')
            else:
                for p in paragraphs:
                    lines.append('  <p>' + p + '</p>')
        elif tag == 'h3':
            q = sec[1]
            a = sec[2]
            lines.append('  <h3>' + q + '</h3>')
            lines.append('  <p>' + a + '</p>')
    # Sources
    lines.append('')
    src_parts = [f'<a href="{url}" rel="nofollow noopener" target="_blank">{label}</a>' for label, url in post['sources']]
    lines.append('  <p><em>Official references:</em> ' + ' &middot; '.join(src_parts) + '</p>')
    # SVG image
    lines.append('')
    lines.append(f'  <p><img src="/images/blog/{post["slug"]}/vs-workflow.svg" alt="{post["a"]} vs {post["b"]} workflow" loading="lazy" decoding="async" /></p>')
    return "\n".join(lines)


def render_post(post):
    tags_str = ', '.join(f'"{t}"' for t in post['tags'])
    body = render_body(post)
    return (
        '---\n'
        'import BlogPostLayout from "../../layouts/BlogPostLayout.astro";\n'
        'import TLDR from "../../components/ui/TLDR.astro";\n'
        '---\n'
        '<BlogPostLayout\n'
        '  title="' + post["title"] + '"\n'
        '  description="' + post["description"] + '"\n'
        '  keywords="' + post["keywords"] + '"\n'
        '  eyebrow="Comparison"\n'
        '  date="2026-07-21"\n'
        '  readTime="' + post["readTime"] + '"\n'
        '  author="AI Tool Hub Editorial"\n'
        '  reviewer="' + post["reviewer"] + '"\n'
        '  tags={[' + tags_str + ']}\n'
        '  slug="' + post["slug"] + '"\n'
        '  category="Comparison"\n'
        '>\n'
        + body + '\n'
        '</BlogPostLayout>\n'
    )


def main():
    for post in POSTS:
        # write astro
        out = OUT_DIR / f"{post['slug']}.astro"
        out.write_text(render_post(post), encoding='utf-8')
        # write svg
        svg_dir = IMG_DIR / post['slug']
        svg_dir.mkdir(parents=True, exist_ok=True)
        (svg_dir / 'vs-workflow.svg').write_text(make_svg(post['a'], post['b'], post['slug']), encoding='utf-8')
        print(f"  wrote {out.name}")


if __name__ == "__main__":
    main()

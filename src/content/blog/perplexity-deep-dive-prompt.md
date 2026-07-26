---
title_en: "Perplexity Deep Dive Prompt"
desc_en: "AI prompt template for Perplexity Deep Dive Prompt"
category: "Prompts"
author: "AI Tool Hub"
date: "2026-07-14"
category_zh: "提示词"
title_zh: "Perplexity 深度研究提示词"
desc_zh: "Perplexity 深度研究提示词的AI提示词模板"
tags: ["prompts", "ai"]
---




Perplexity's Deep Dive mode transforms the search engine into a research assistant capable of synthesizing information across dozens of sources, identifying consensus and controversy, and producing structured reports. The quality of the output depends heavily on how you structure your query — a well-crafted prompt can save hours of manual source comparison.

## What is Perplexity Deep Dive?

Deep Dive is Perplexity's advanced research mode that performs multi-step reasoning across a larger set of sources. Unlike standard search (which retrieves and summarizes a handful of pages), Deep Dive iteratively searches, reads, cross-references, and synthesizes information before producing a comprehensive answer.

**Key capabilities:**
- Multi-step research with source triangulation
- Academic paper search across Semantic Scholar and arXiv
- Structured report generation with citations
- Temporal analysis (trends over time)
- Comparative analysis across competing viewpoints

## Prompt Template

```
[RESEARCH QUESTION]
<Your primary research question in one clear sentence>

[SCOPE]
- Time period: <e.g., 2020-2026>
- Geography: <e.g., global / US / EU>
- Source types: <academic papers / industry reports / news / all>
- Depth: <overview / detailed analysis / exhaustive>

[ANGLES TO EXPLORE]
- <Angle 1: e.g., technical feasibility>
- <Angle 2: e.g., market adoption>
- <Angle 3: e.g., regulatory landscape>

[FORMAT]
<structured report / comparison table / timeline / pros and cons>

[SPECIAL INSTRUCTIONS]
- Prioritize: <peer-reviewed / recent / from authoritative sources>
- Flag: <conflicting findings / methodological concerns / outdated data>
```

## How to Use

### Academic Research

For literature reviews and academic research, structure your prompt to prioritize peer-reviewed sources and identify research gaps.

**Example:**
```
[RESEARCH QUESTION]
What is the current state of research on retrieval-augmented generation (RAG) for reducing LLM hallucinations?

[SCOPE]
- Time period: 2023-2026
- Source types: academic papers
- Depth: detailed analysis

[ANGLES TO EXPLORE]
- Chunking strategies and their impact on retrieval quality
- Hybrid search (dense + sparse) vs pure vector search
- Evaluation metrics used across studies
- Open problems and research gaps

[FORMAT]
Structured report with sub-sections per angle, including a summary table of key papers

[SPECIAL INSTRUCTIONS]
- Prioritize papers with empirical results over theoretical proposals
- Flag papers with small sample sizes or narrow datasets
```

### Market Research

For competitive analysis and market research, focus on recency and source diversity.

**Example:**
```
[RESEARCH QUESTION]
How has the AI code assistant market evolved from Q1 2025 to Q2 2026, and who are the top 5 players by market share?

[SCOPE]
- Time period: 2025-2026
- Geography: global
- Source types: industry reports, news, company announcements
- Depth: detailed analysis

[ANGLES TO EXPLORE]
- Market share shifts between GitHub Copilot, Cursor, Windsurf, and newcomers
- Pricing strategy changes across competitors
- Feature differentiation (agent mode, multi-file editing, security scanning)
- Enterprise adoption trends

[FORMAT]
Comparison table with market share estimates, pricing tiers, and key differentiators, followed by narrative analysis

[SPECIAL INSTRUCTIONS]
- Flag estimates vs confirmed data
- Note when sources are company-authored (potential bias)
```

### Technical Deep Dive

For understanding technical systems, specify the level of detail and ask for architectural comparisons.

```
[RESEARCH QUESTION]
Compare the inference optimization techniques used in vLLM, TensorRT-LLM, and llama.cpp — which is best for production serving of a 70B model on 4×A100 GPUs?

[SCOPE]
- Time period: 2024-2026
- Source types: documentation, benchmarks, technical blog posts
- Depth: exhaustive

[ANGLES TO EXPLORE]
- Memory efficiency (KV cache management, quantization)
- Throughput (tokens/second) at various batch sizes
- Latency (time-to-first-token, inter-token latency)
- Ease of deployment and operational overhead
- Compatibility with popular model architectures

[FORMAT]
Comparison table with quantitative benchmarks where available, followed by scenario-based recommendation

[SPECIAL INSTRUCTIONS]
- Prioritize independent benchmarks over vendor-published numbers
- Note hardware differences between benchmarks
```

## Example Output

**Query:** "What are the most effective prompting techniques for code generation as of 2026?"

**Perplexity Deep Dive response structure:**

The output includes a synthesized report covering:

1. **Chain-of-Thought (CoT) prompting for code** — with citations to papers showing 23-47% improvement on complex algorithmic tasks
2. **Retrieval-Augmented Code Generation (RACG)** — using repository context to ground suggestions
3. **Test-Driven Prompting** — asking the model to write tests first, then implementation
4. **Multi-turn refinement** — iterative prompting with compiler feedback loops
5. **A summary table** comparing technique, best use case, and average improvement across 12 studies

Each claim is backed by inline citations to specific papers on arXiv, ACL Anthology, and conference proceedings.

## Best Practices

1. **Use the template for any question that has more than one dimension.** The structured format forces you to think about what you actually need to know.
2. **Always specify time period.** Without it, Deep Dive may surface outdated research or miss recent developments.
3. **Ask for conflicting evidence.** Adding "flag conflicting findings" to your prompt produces more balanced, nuanced answers.
4. **Iterate with follow-up questions.** Deep Dive's strength is multi-turn research. Start broad, then drill into specific angles.
5. **Verify critical citations manually.** While Deep Dive cites sources, always check primary sources for claims you plan to act on.
6. **Use "structured report" as the format.** This triggers Deep Dive to organize information hierarchically rather than producing a wall of text.

## Related AI Tools

- [Perplexity](https://perplexity.ai) — AI-powered research engine with Deep Dive mode
- [ChatGPT](https://chat.openai.com) — Deep Research mode for comprehensive reports
- [Claude](https://claude.ai) — Long-context analysis across multiple documents
- [Gemini](https://gemini.google.com) — Deep Research with Google's search integration

## FAQ

**Q: How is Deep Dive different from Perplexity's standard search?**
Standard search retrieves and summarizes a few sources in one pass. Deep Dive performs iterative searching — reading, cross-referencing, and re-searching based on what it finds — across a much larger source set.

**Q: How many sources does Deep Dive use?**
Typically 20-50 sources per query, compared to 5-10 for standard search. The exact number depends on query complexity and source availability.

**Q: Does Deep Dive work for non-English research?**
Yes, but source availability varies by language. For research in Chinese, Japanese, or other non-English languages, specify the language preference in your prompt.

**Q: Can Deep Dive access paywalled academic papers?**
Deep Dive accesses publicly available abstracts and preprints. For full-text access to paywalled papers, use your institutional access and verify findings directly.

**Q: How long does a Deep Dive query take?**
Typically 30 seconds to 2 minutes, depending on complexity. The trade-off for deeper research is longer wait times compared to instant standard search.
*（内容由AI生成，仅供参考）*

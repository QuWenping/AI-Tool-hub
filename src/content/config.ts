import { defineCollection, z } from 'astro:content';

const blogCollection = defineCollection({
  type: 'content',
  schema: z.object({
    title_en: z.string(),
    title_zh: z.string().optional(),
    desc_en: z.string(),
    desc_zh: z.string().optional(),
    category: z.string(),
    category_zh: z.string().optional(),
    author: z.string(),
    author_slug: z.string().optional(),
    date: z.string(),
    tags: z.array(z.string()).default([]),
    read_time: z.string().optional(),
    image: z.string().optional(),
    content_zh: z.string().optional(),
    related_tools: z.array(z.string()).default([]),
    related_solution: z.string().optional(),
    related_posts: z.array(z.string()).default([]),
    faq: z.array(z.object({
      q: z.string(),
      a: z.string()
    })).default([]),
  }),
});

const toolsCollection = defineCollection({
  type: 'data',
  schema: z.object({
    // --- Basic info ---
    name: z.object({
      en: z.string(),
      zh: z.string().optional(),
    }),
    short_desc: z.object({
      en: z.string(),
      zh: z.string().optional(),
    }),
    long_desc: z.object({
      en: z.string(),
      zh: z.string().optional(),
    }),
    cat: z.string(),
    url: z.string(),
    icon: z.string().default('fa-robot'),
    hidden: z.boolean().optional(),

    // --- Catalog data (from tools.json) ---
    scenes: z.object({
      en: z.array(z.string()).default([]),
      zh: z.array(z.string()).default([]),
    }).optional(),
    pros: z.object({
      en: z.array(z.string()).default([]),
      zh: z.array(z.string()).default([]),
    }).optional(),
    cons: z.object({
      en: z.array(z.string()).default([]),
      zh: z.array(z.string()).default([]),
    }).optional(),
    example: z.object({
      en: z.string(),
      zh: z.string().optional(),
    }).optional(),
    target_audience: z.object({
      en: z.array(z.string()).default([]),
      zh: z.array(z.string()).default([]),
    }).optional(),
    use_cases: z.object({
      en: z.array(z.string()).default([]),
      zh: z.array(z.string()).default([]),
    }).optional(),
    features: z.object({
      en: z.array(z.string()).default([]),
      zh: z.array(z.string()).default([]),
    }).optional(),
    pricing: z.union([
      z.string(),
      z.object({ en: z.string(), zh: z.string().optional() }),
    ]).optional(),

    // --- Editorial data (from tool-editorial.json) ---
    reviewed: z.boolean().optional(),
    updatedAt: z.string().optional(),
    testedVersion: z.string().optional(),
    score: z.number().optional(),
    overall_score: z.number().optional(),
    quickFacts: z.object({
      freeTier: z.boolean().optional(),
      hasApi: z.boolean().optional(),
      platforms: z.array(z.string()).default([]),
    }).optional(),
    pricingSummary: z.object({ en: z.string() }).optional(),
    faq: z.array(z.object({
      q_en: z.string(),
      a_en: z.string(),
    })).default([]),
    scoreBreakdown: z.object({
      user: z.number(),
      capability: z.number(),
      price: z.number(),
      growth: z.number(),
      trust: z.number(),
    }).optional(),
    editorialIntro: z.string().optional(),
    editorialVerdict: z.object({
      best: z.string(),
      avoid: z.string(),
    }).optional(),
    realTest: z.any().optional(),
  }),
});

export const collections = { blog: blogCollection, tools: toolsCollection };

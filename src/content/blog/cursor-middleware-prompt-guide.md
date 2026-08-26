---
noindex: true
title_en: "Cursor Middleware Prompt Guide"
desc_en: "AI prompt template for Cursor Middleware Prompt Guide"
category: "Prompts"
author: "AI Tool Hub"
date: "2026-07-14"
category_zh: "提示词"
title_zh: "Cursor 中间件提示词指南"
desc_zh: "Cursor 中间件提示词指南的AI提示词模板"
tags: ["prompts", "ai"]
---




Cursor Middleware is a powerful feature that lets you intercept, modify, and route prompts before they reach the AI model. It acts as a programmable layer between your code and the LLM, giving you fine-grained control over context injection, prompt formatting, and response processing.

## What is Cursor Middleware?

Cursor Middleware is a configuration system built into Cursor IDE that allows developers to define rules for how prompts are constructed when interacting with AI features like Chat, Composer, and Agent mode. Instead of manually copying context or repeating instructions, middleware automates these steps.

**Key capabilities:**
- Inject project-specific context (coding conventions, file structure, tech stack)
- Transform prompts based on file type or directory
- Enforce code style and formatting rules
- Route prompts to different models based on task complexity
- Prepend or append system-level instructions

## Prompt Template

Here is a production-ready middleware configuration template you can adapt for your project:

```json
{
  "middleware": {
    "rules": [
      {
        "name": "project-context",
        "match": { "glob": "src/**/*.{ts,tsx}" },
        "action": "prepend",
        "content": "You are working on a Next.js 14 project with TypeScript. Follow these conventions:\n- Use server components by default\n- Path aliases: @/ maps to src/\n- Strict mode enabled\n- Prefer async/await over raw promises\n- All API routes require authentication middleware"
      },
      {
        "name": "code-style",
        "match": { "glob": "**/*.{ts,tsx,js,jsx}" },
        "action": "append",
        "content": "Code style rules:\n- Use 2-space indentation\n- Single quotes for strings\n- Trailing commas in multiline\n- Named exports preferred over default exports\n- Max line length: 100 characters"
      },
      {
        "name": "test-generation",
        "match": { "prompt_contains": ["test", "spec", "unit test"] },
        "action": "prepend",
        "content": "Generate tests using Vitest with the following pattern:\n- Describe block with component/function name\n- Test edge cases: empty state, loading, error, success\n- Use Testing Library for React components\n- Mock external API calls with MSW"
      },
      {
        "name": "complex-task-routing",
        "match": { "prompt_length_gt": 500 },
        "action": "route",
        "model": "claude-3-opus"
      }
    ],
    "global_context": "Project: E-commerce Dashboard\nTech stack: Next.js 14, TypeScript, Tailwind CSS, Prisma, PostgreSQL\nTeam size: 3 developers\nDeployment: Vercel"
  }
}
```

## How to Use

### Step 1: Locate the Middleware Configuration

In Cursor, open Settings (`Cmd+,` on macOS, `Ctrl+,` on Windows) and navigate to the **Rules** or **Middleware** section. You can also create a `.cursorrules` file in your project root.

### Step 2: Define Your Rules

Each rule consists of three parts:

| Component | Description | Example |
|-----------|-------------|---------|
| **match** | Condition that triggers the rule | `glob: "src/api/**/*.ts"` or `prompt_contains: ["migration"]` |
| **action** | What to do with the matched prompt | `prepend`, `append`, `replace`, `route` |
| **content** | The instruction or context to inject | Coding conventions, API docs, style rules |

### Step 3: Test and Iterate

Start with one or two rules and test them on real tasks. Middleware rules compound — a single prompt can trigger multiple rules, so keep them focused and avoid conflicting instructions.

### Step 4: Version Control Your Rules

Check your `.cursorrules` file into version control. This ensures every team member benefits from the same prompt engineering, and new hires get context-aware AI assistance from day one.

## Example Output

**Without middleware**, asking Cursor Agent to "create an API endpoint for user registration" generates generic code that may not follow your stack:

```typescript
// Generic output — no auth, no validation, no project conventions
app.post('/register', async (req, res) => {
  const user = await db.users.create(req.body);
  res.json(user);
});
```

**With middleware**, the same prompt produces context-aware code:

```typescript
// Generated with project context + code style rules applied
import { NextRequest, NextResponse } from 'next/server';
import { hashPassword } from '@/lib/auth';
import { registerSchema } from '@/lib/validations';
import { prisma } from '@/lib/prisma';

export async function POST(request: NextRequest) {
  const body = await request.json();
  const validated = registerSchema.parse(body);

  const existingUser = await prisma.user.findUnique({
    where: { email: validated.email },
  });

  if (existingUser) {
    return NextResponse.json(
      { error: 'Email already registered' },
      { status: 409 },
    );
  }

  const hashedPassword = await hashPassword(validated.password);
  const user = await prisma.user.create({
    data: {
      email: validated.email,
      passwordHash: hashedPassword,
      name: validated.name,
    },
    select: { id: true, email: true, name: true, createdAt: true },
  });

  return NextResponse.json({ user }, { status: 201 });
}
```

## Best Practices

1. **Keep rules focused** — Each rule should do one thing. Avoid monolithic context blocks that dilute relevance.
2. **Use glob patterns wisely** — Match by file path when context is directory-specific (e.g., API rules for `src/api/`).
3. **Prefer `prepend` for context, `append` for formatting** — System-level instructions work best at the top; style rules work best at the bottom.
4. **Test rule combinations** — Multiple matching rules can produce conflicting instructions. Test edge cases.
5. **Update rules with your codebase** — As your tech stack evolves, update middleware to reflect current conventions.
6. **Use `prompt_contains` for task-specific rules** — Match on keywords like "migration", "test", or "refactor" to inject domain-specific guidance only when relevant.

## Related AI Tools

- [Cursor](https://cursor.com) — AI-first IDE with middleware support
- [GitHub Copilot](https://github.com/features/copilot) — Inline completions with custom instructions
- [Windsurf](https://codeium.com/windsurf) — Cascade mode with project-aware context
- [Claude Code](https://claude.ai) — Terminal-based agent with system prompts

## FAQ

**Q: Does Cursor Middleware work with all models?**
Yes. Middleware processes prompts before they reach the model, so it works with GPT-4, Claude, and any other model configured in Cursor.

**Q: Can I use environment variables in middleware rules?**
Not directly in the JSON config, but you can reference project files that contain dynamic content. For secrets, use Cursor's built-in secret management.

**Q: How does middleware differ from `.cursorrules`?**
`.cursorrules` is the file format for defining middleware rules. They are the same thing — `.cursorrules` is the where, middleware is the what.

**Q: Will middleware rules slow down prompt processing?**
The overhead is negligible (milliseconds). Rule matching uses simple glob and string matching, not regex or heavy computation.

**Q: Can I share middleware rules across a team?**
Yes. Check `.cursorrules` into Git and every team member gets the same rules. This is one of the strongest use cases for middleware.
*（内容由AI生成，仅供参考）*

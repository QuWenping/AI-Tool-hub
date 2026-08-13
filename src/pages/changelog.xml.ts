import type { APIRoute } from "astro";

export const GET: APIRoute = async () => {
  const baseUrl = "https://thebestaitoolsreview.com";
  const entries = [
    { date: "2026-07-24", title: "Added editorial guidelines, methodology, team, advertise, and changelog pages", desc: "5 new long-form pages documenting our editorial process. 21 articles + 5 trust pages." },
    { date: "2026-07-22", title: "Added 6 how-to tutorials and contact rewrite", desc: "ChatGPT coding, Claude long docs, Midjourney prompts, Cursor team setup, ElevenLabs podcasts, content workflow." },
    { date: "2026-07-15", title: "Added 7 articles, 5 tools, 5 matchups", desc: "Site now has 15 articles, 16 tools, 19 matchups." },
    { date: "2026-07-05", title: "Initial 3-article launch", desc: "First public launch of AI Tool Hub." }
  ];
  const items = entries.map(e => `
    <item>
      <title>${e.title}</title>
      <description><![CDATA[${e.desc}]]></description>
      <pubDate>${new Date(e.date).toUTCString()}</pubDate>
      <guid isPermaLink="false">${baseUrl}/changelog#${e.date}</guid>
      <link>${baseUrl}/changelog</link>
    </item>`).join("");

  const xml = `<?xml version="1.0" encoding="UTF-8"?>
<rss version="2.0" xmlns:atom="http://www.w3.org/2005/Atom">
  <channel>
    <title>AI Tool Hub Changelog</title>
    <description>Every update, new tool, new article, and score change on AI Tool Hub.</description>
    <link>${baseUrl}/changelog</link>
    <atom:link href="${baseUrl}/changelog.xml" rel="self" type="application/rss+xml" />
    <language>en-us</language>
    <lastBuildDate>${new Date().toUTCString()}</lastBuildDate>${items}
  </channel>
</rss>`;

  return new Response(xml, {
    headers: { "Content-Type": "application/xml; charset=utf-8" }
  });
};

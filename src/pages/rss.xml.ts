import rss from '@astrojs/rss';
import { getCollection } from 'astro:content';

export async function GET(context) {
  const posts = await getCollection('blog');
  const sortedPosts = posts
    .sort((a, b) => new Date(b.data.date).getTime() - new Date(a.data.date).getTime());

  return rss({
    title: 'The Best AI Tools Review',
    description: 'In-depth AI tool reviews, comparisons, and guides to help you choose the right AI tools for your workflow.',
    site: context.site,
    items: sortedPosts.map((post) => ({
      title: post.data.title_en,
      description: post.data.desc_en,
      pubDate: new Date(post.data.date),
      link: `/blog/${post.slug}/`,
    })),
    customData: `<language>en-us</language>`,
  });
}

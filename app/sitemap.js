import { sanityFetch } from '../sanity/lib/client';
import { postSlugsQuery } from '../sanity/lib/queries';
import { siteUrl } from '../sanity/env';

export const revalidate = 3600;

export default async function sitemap() {
  const posts = await sanityFetch(postSlugsQuery, {}, []);
  return [
    { url: siteUrl, changeFrequency: 'monthly', priority: 1 },
    { url: `${siteUrl}/blog`, changeFrequency: 'weekly', priority: 0.8 },
    ...posts.map(p => ({ url: `${siteUrl}/blog/${p.slug}`, lastModified: p._updatedAt, changeFrequency: 'monthly', priority: 0.6 })),
  ];
}

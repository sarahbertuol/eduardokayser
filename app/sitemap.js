import { sanityFetch } from '../sanity/lib/client';
import { postSlugsQuery } from '../sanity/lib/queries';
import { SITE_URL, servicePages } from '../lib/site';

export const revalidate = 3600;

export default async function sitemap() {
  const posts = await sanityFetch(postSlugsQuery, {}, []);
  return [
    { url: SITE_URL, changeFrequency: 'monthly', priority: 1 },
    ...servicePages.map(p => ({ url: `${SITE_URL}/${p.slug}`, changeFrequency: 'monthly', priority: 0.8 })),
    { url: `${SITE_URL}/blog`, changeFrequency: 'weekly', priority: 0.8 },
    { url: `${SITE_URL}/politica-de-privacidade`, changeFrequency: 'yearly', priority: 0.3 },
    ...posts.map(p => ({ url: `${SITE_URL}/blog/${p.slug}`, lastModified: p._updatedAt, changeFrequency: 'monthly', priority: 0.6 })),
  ];
}

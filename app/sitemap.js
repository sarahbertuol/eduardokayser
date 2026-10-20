import { SITE_URL, servicePages } from '../lib/site';

export default function sitemap() {
  const lastModified = new Date();
  return [
    { url: SITE_URL, lastModified, changeFrequency: 'monthly', priority: 1 },
    ...servicePages.map(p => ({ url: `${SITE_URL}/${p.slug}`, lastModified, changeFrequency: 'monthly', priority: 0.8 }))
  ];
}

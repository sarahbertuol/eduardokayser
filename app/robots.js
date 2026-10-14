import { siteUrl } from '../sanity/env';

export default function robots() {
  return {
    rules: { userAgent: '*', allow: '/', disallow: ['/studio', '/api/'] },
    sitemap: `${siteUrl}/sitemap.xml`,
  };
}

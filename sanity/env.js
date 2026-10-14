export const projectId = process.env.NEXT_PUBLIC_SANITY_PROJECT_ID || '5bp2stpt';
export const dataset = process.env.NEXT_PUBLIC_SANITY_DATASET || 'production';
export const apiVersion = process.env.NEXT_PUBLIC_SANITY_API_VERSION || '2024-10-01';
export const siteUrl = (process.env.NEXT_PUBLIC_SITE_URL || 'https://eduardokayser.com.br').replace(/\/$/, '');

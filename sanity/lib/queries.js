import { groq } from 'next-sanity';

const visible = `_type == "post" && defined(slug.current) && publishedAt <= now()`;

const card = `
  _id,
  title,
  "slug": slug.current,
  excerpt,
  publishedAt,
  coverImage,
  "categories": categories[]->{ title, "slug": slug.current }
`;

export const latestPostsQuery = groq`*[${visible}] | order(publishedAt desc)[0...$limit]{ ${card} }`;

export const postsPageQuery = groq`{
  "posts": *[${visible} && ($category == "" || $category in categories[]->slug.current)] | order(publishedAt desc)[$start...$end]{ ${card} },
  "total": count(*[${visible} && ($category == "" || $category in categories[]->slug.current)])
}`;

export const categoriesQuery = groq`*[_type == "category" && count(*[${visible} && references(^._id)]) > 0] | order(title asc){ title, "slug": slug.current }`;

export const postBySlugQuery = groq`*[${visible} && slug.current == $slug][0]{
  ${card},
  body,
  seoTitle,
  seoDescription,
  ogImage,
  _updatedAt,
  "related": *[${visible} && slug.current != $slug && count(categories[@._ref in ^.^.categories[]._ref]) > 0] | order(publishedAt desc)[0...2]{ ${card} }
}`;

export const postSlugsQuery = groq`*[${visible}]{ "slug": slug.current, _updatedAt }`;

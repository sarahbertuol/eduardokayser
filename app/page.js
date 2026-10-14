import HomeClient from '../components/HomeClient';
import { sanityFetch } from '../sanity/lib/client';
import { latestPostsQuery } from '../sanity/lib/queries';

export const revalidate = 60;

export default async function Home() {
  const posts = await sanityFetch(latestPostsQuery, { limit: 2 }, []);
  return <HomeClient posts={posts} />;
}

import Link from 'next/link';
import Image from 'next/image';
import { notFound } from 'next/navigation';
import SiteShell from '../../../components/SiteShell';
import PostBody from '../../../components/PostBody';
import PostCard, { formatDate } from '../../../components/PostCard';
import { sx } from '../../../lib/sx';
import { sanityFetch } from '../../../sanity/lib/client';
import { urlFor } from '../../../sanity/lib/image';
import { postBySlugQuery, postSlugsQuery } from '../../../sanity/lib/queries';
import { siteUrl } from '../../../sanity/env';

export const dynamicParams = true;
export const revalidate = 300;

export async function generateStaticParams() {
  const slugs = await sanityFetch(postSlugsQuery, {}, []);
  return slugs.map(s => ({ slug: s.slug }));
}

const getPost = slug => sanityFetch(postBySlugQuery, { slug }, null);

export async function generateMetadata({ params }) {
  const post = await getPost(params.slug);
  if (!post) return { title: 'Artigo não encontrado | Eduardo Kayser' };
  const title = post.seoTitle || `${post.title} | Eduardo Kayser`;
  const description = post.seoDescription || post.excerpt;
  const share = post.ogImage?.asset ? post.ogImage : post.coverImage;
  const images = share?.asset ? [{ url: urlFor(share).width(1200).height(630).url(), width: 1200, height: 630 }] : [];
  return {
    title,
    description,
    alternates: { canonical: `/blog/${post.slug}` },
    openGraph: { title, description, type: 'article', publishedTime: post.publishedAt, modifiedTime: post._updatedAt, authors: ['Eduardo Kayser'], images },
    twitter: { card: 'summary_large_image', title, description, images: images.map(i => i.url) },
  };
}

export default async function PostPage({ params }) {
  const post = await getPost(params.slug);
  if (!post) notFound();

  const cover = post.coverImage?.asset ? urlFor(post.coverImage).width(1600).height(900).url() : null;
  const jsonLd = {
    '@context': 'https://schema.org',
    '@type': 'BlogPosting',
    headline: post.title,
    description: post.seoDescription || post.excerpt,
    datePublished: post.publishedAt,
    dateModified: post._updatedAt,
    author: { '@type': 'Person', name: 'Eduardo Kayser', url: siteUrl },
    mainEntityOfPage: `${siteUrl}/blog/${post.slug}`,
    ...(cover ? { image: cover } : {}),
  };

  return (
    <SiteShell>
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd).replace(/</g, '\\u003c') }} />
      <article style={sx('padding:64px clamp(20px,5vw,64px) 88px;')}>
        <div style={sx('max-width:760px;margin:0 auto;')}>
          <Link href="/blog" style={sx('font-size:14px;font-weight:600;color:var(--accent);display:inline-flex;align-items:center;gap:6px;margin-bottom:32px;')}><i className="ti ti-arrow-left"></i> Todos os artigos</Link>
          <div style={sx('display:flex;align-items:center;gap:12px;flex-wrap:wrap;margin-bottom:20px;')}>
            {post.categories?.map(c => (
              <Link key={c.slug} href={`/blog?categoria=${c.slug}`} style={sx('font-size:12px;font-weight:700;letter-spacing:0.04em;text-transform:uppercase;color:var(--accent-strong);background:var(--bg-alt);border-radius:999px;padding:6px 14px;')}>{c.title}</Link>
            ))}
            <time dateTime={post.publishedAt} style={sx('font-size:14px;color:var(--muted);')}>{formatDate(post.publishedAt)}</time>
          </div>
          <h1 style={sx("font-family:'Space Grotesk',sans-serif;font-size:clamp(30px,4.2vw,46px);font-weight:700;line-height:1.15;margin:0 0 20px;")}>{post.title}</h1>
          <p style={sx('font-size:19px;color:var(--muted);line-height:1.6;margin:0 0 40px;')}>{post.excerpt}</p>
        </div>

        {cover && (
          <div style={sx('position:relative;max-width:1080px;margin:0 auto 56px;aspect-ratio:16/9;border-radius:14px;overflow:hidden;background:var(--bg-alt);')}>
            <Image src={cover} alt={post.coverImage.alt || post.title} fill priority sizes="(max-width: 1120px) 100vw, 1080px" style={{ objectFit: 'cover' }} />
          </div>
        )}

        <div style={sx('max-width:720px;margin:0 auto;')}>
          {post.body && <PostBody value={post.body} />}

          <div style={sx('margin-top:64px;padding:32px;border-radius:14px;background:var(--bg-alt);text-align:center;')}>
            <h2 style={sx("font-family:'Space Grotesk',sans-serif;font-size:24px;font-weight:700;margin:0 0 12px;")}>Quer aplicar isso na sua realidade?</h2>
            <p style={sx('font-size:15px;color:var(--muted);line-height:1.6;margin:0 0 24px;')}>Converse com o Eduardo e descubra como o Método LUCIDEZ pode ajudar você ou sua organização.</p>
            <a href="https://wa.me/5551991019459" target="_blank" rel="noreferrer" style={sx('border-radius:999px;padding:14px 26px;background:var(--accent);color:var(--on-accent);font-size:15px;font-weight:600;display:inline-flex;align-items:center;gap:8px;')}><i className="ti ti-brand-whatsapp"></i>Falar no WhatsApp</a>
          </div>
        </div>

        {post.related?.length > 0 && (
          <div style={sx('max-width:1180px;margin:88px auto 0;')}>
            <h2 style={sx("font-family:'Space Grotesk',sans-serif;font-size:clamp(24px,3vw,30px);font-weight:700;margin:0 0 32px;text-align:center;")}>Leia também</h2>
            <div className="posts-grid" style={sx('gap:24px;')}>
              {post.related.map(p => <PostCard key={p._id} post={p} />)}
            </div>
          </div>
        )}
      </article>
    </SiteShell>
  );
}

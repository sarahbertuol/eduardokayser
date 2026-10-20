import Link from 'next/link';
import Image from 'next/image';
import { sx } from '../lib/sx';
import { urlFor } from '../sanity/lib/image';
import ImagePlaceholder from './ImagePlaceholder';

export function formatDate(date) {
  return new Date(date).toLocaleDateString('pt-BR', { day: '2-digit', month: 'long', year: 'numeric', timeZone: 'America/Sao_Paulo' });
}

export default function PostCard({ post }) {
  const tag = post.categories?.[0]?.title;
  return (
    <Link href={`/blog/${post.slug}`} className="post-card" style={sx('display:flex;flex-direction:column;background:var(--surface);border:1px solid var(--line);border-radius:12px;overflow:hidden;color:var(--ink);text-decoration:none;')}>
      <div style={sx('position:relative;width:100%;aspect-ratio:16/9;background:var(--bg-alt);')}>
        {post.coverImage?.asset ? (
          <Image
            src={urlFor(post.coverImage).width(960).height(540).url()}
            alt={post.coverImage.alt || post.title}
            fill
            sizes="(max-width: 640px) 100vw, 50vw"
            style={{ objectFit: 'cover' }}
          />
        ) : (
          <ImagePlaceholder label="Imagem do post" />
        )}
      </div>
      <div style={sx('padding:28px;display:flex;flex-direction:column;flex:1;')}>
        <div style={sx('display:flex;align-items:center;gap:12px;flex-wrap:wrap;margin-bottom:16px;')}>
          {tag && <span style={sx('display:inline-block;font-size:12px;font-weight:700;letter-spacing:0.04em;text-transform:uppercase;color:var(--accent-strong);background:var(--bg-alt);border-radius:999px;padding:6px 14px;')}>{tag}</span>}
          <span style={sx('font-size:13px;color:var(--muted);')}>{formatDate(post.publishedAt)}</span>
        </div>
        <h3 style={sx("font-family:'Space Grotesk',sans-serif;font-size:20px;font-weight:600;margin:0 0 10px;line-height:1.3;")}>{post.title}</h3>
        <p style={sx('font-size:15px;color:var(--muted);margin:0 0 20px;line-height:1.5;flex:1;')}>{post.excerpt}</p>
        <span style={sx('font-size:14px;font-weight:600;color:var(--accent);display:inline-flex;align-items:center;gap:6px;')}>Ler artigo <i className="ti ti-arrow-right"></i></span>
      </div>
    </Link>
  );
}

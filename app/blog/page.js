import Link from 'next/link';
import SiteShell from '../../components/SiteShell';
import PostCard from '../../components/PostCard';
import { sx } from '../../lib/sx';
import { sanityFetch } from '../../sanity/lib/client';
import { postsPageQuery, categoriesQuery } from '../../sanity/lib/queries';

const PER_PAGE = 8;

export const metadata = {
  title: 'Blog | Eduardo Kayser',
  description: 'Artigos de Eduardo Kayser sobre liderança, gestão de pessoas e o Método LUCIDEZ.',
  alternates: { canonical: '/blog' },
  openGraph: { title: 'Blog | Eduardo Kayser', description: 'Artigos sobre liderança, gestão de pessoas e o Método LUCIDEZ.', type: 'website' },
};

function pageHref(category, page) {
  const params = new URLSearchParams();
  if (category) params.set('categoria', category);
  if (page > 1) params.set('pagina', String(page));
  const qs = params.toString();
  return qs ? `/blog?${qs}` : '/blog';
}

export default async function BlogPage({ searchParams }) {
  const category = typeof searchParams?.categoria === 'string' ? searchParams.categoria : '';
  const page = Math.max(1, parseInt(searchParams?.pagina, 10) || 1);
  const start = (page - 1) * PER_PAGE;

  const [data, categories] = await Promise.all([
    sanityFetch(postsPageQuery, { category, start, end: start + PER_PAGE }, { posts: [], total: 0 }),
    sanityFetch(categoriesQuery, {}, []),
  ]);
  const { posts, total } = data;
  const totalPages = Math.max(1, Math.ceil(total / PER_PAGE));

  const chip = active => sx(`border-radius:999px;padding:10px 20px;font-size:14px;font-weight:600;white-space:nowrap;${active ? 'border:1px solid var(--accent);background:var(--accent);color:var(--on-accent);' : 'border:1px solid var(--line);background:var(--surface);color:var(--ink);'}`);

  return (
    <SiteShell>
      <section style={sx('padding:88px clamp(20px,5vw,64px) 104px;')}>
        <div style={sx('max-width:1180px;margin:0 auto;')}>
          <div style={sx('max-width:640px;margin:0 auto 48px;text-align:center;')}>
            <div style={sx('font-size:13px;letter-spacing:0.08em;text-transform:uppercase;color:var(--accent);font-weight:700;margin-bottom:12px;')}>Blog</div>
            <h1 style={sx("font-family:'Space Grotesk',sans-serif;font-size:clamp(32px,4.2vw,46px);font-weight:700;margin:0 0 16px;")}>Conteúdos</h1>
            <p style={sx('font-size:16px;color:var(--muted);line-height:1.6;margin:0;')}>Reflexões e ferramentas práticas sobre liderança, gestão de pessoas e crescimento com lucidez.</p>
          </div>

          {categories.length > 0 && (
            <div style={sx('display:flex;gap:10px;justify-content:center;flex-wrap:wrap;margin-bottom:48px;')}>
              <Link href="/blog" style={chip(!category)}>Todos</Link>
              {categories.map(c => (
                <Link key={c.slug} href={pageHref(c.slug, 1)} style={chip(category === c.slug)}>{c.title}</Link>
              ))}
            </div>
          )}

          {posts.length > 0 ? (
            <div className="posts-grid" style={sx('gap:24px;')}>
              {posts.map(p => <PostCard key={p._id} post={p} />)}
            </div>
          ) : (
            <p style={sx('text-align:center;color:var(--muted);font-size:16px;padding:48px 0;')}>Nenhum artigo publicado ainda. Volte em breve!</p>
          )}

          {totalPages > 1 && (
            <div style={sx('display:flex;gap:12px;justify-content:center;align-items:center;margin-top:56px;')}>
              {page > 1 && <Link href={pageHref(category, page - 1)} style={chip(false)}><i className="ti ti-arrow-left"></i> Anteriores</Link>}
              <span style={sx('font-size:14px;color:var(--muted);')}>Página {page} de {totalPages}</span>
              {page < totalPages && <Link href={pageHref(category, page + 1)} style={chip(false)}>Próximos <i className="ti ti-arrow-right"></i></Link>}
            </div>
          )}
        </div>
      </section>
    </SiteShell>
  );
}

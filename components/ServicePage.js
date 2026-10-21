import Link from 'next/link';
import { sx } from '../lib/sx';
import { SITE_URL, servicePages, waLink } from '../lib/site';
import SiteShell from './SiteShell';
import TrackedLink from './TrackedLink';

export default function ServicePage({ slug, label, h1, intro, items, numbered = false, footnote, description }) {
  const url = `${SITE_URL}/${slug}`;
  const other = servicePages.find(p => p.slug !== slug);
  const jsonLd = {
    '@context': 'https://schema.org',
    '@graph': [
      {
        '@type': 'Service',
        '@id': `${url}#service`,
        name: label,
        description,
        url,
        inLanguage: 'pt-BR',
        provider: { '@id': `${SITE_URL}/#organization` },
        areaServed: 'BR',
        hasOfferCatalog: {
          '@type': 'OfferCatalog',
          name: label,
          itemListElement: items.map(name => ({ '@type': 'Offer', itemOffered: { '@type': 'Service', name } }))
        }
      },
      {
        '@type': 'BreadcrumbList',
        itemListElement: [
          { '@type': 'ListItem', position: 1, name: 'Início', item: SITE_URL },
          { '@type': 'ListItem', position: 2, name: label, item: url }
        ]
      }
    ]
  };
  const secondaryBtn = sx('border-radius:999px;padding:16px 28px;background:var(--surface);border:1px solid var(--line);color:var(--ink);font-size:15px;font-weight:600;display:inline-flex;align-items:center;gap:8px;');

  return (
    <SiteShell origin={slug}>
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }} />
      <section style={sx('padding:72px clamp(20px,5vw,64px) 104px;')}>
        <div style={sx('max-width:1180px;margin:0 auto;')}>
          <nav aria-label="Breadcrumb" style={sx('font-size:14px;color:var(--muted);margin-bottom:40px;text-align:center;')}>
            <Link href="/" style={sx('color:var(--muted);')}>Início</Link> <span aria-hidden="true">›</span> <span aria-current="page">{label}</span>
          </nav>

          <div style={sx('max-width:720px;margin:0 auto 64px;text-align:center;')}>
            <div style={sx('font-size:13px;letter-spacing:0.08em;text-transform:uppercase;color:var(--accent);font-weight:700;margin-bottom:12px;')}>{label}</div>
            <h1 style={sx("font-family:'Space Grotesk',sans-serif;font-size:clamp(28px,4vw,42px);font-weight:700;line-height:1.2;margin:0 0 20px;")}>{h1}</h1>
            <p style={sx('font-size:16px;color:var(--muted);line-height:1.6;margin:0;')}>{intro}</p>
          </div>

          {numbered ? (
            <div style={sx('display:flex;flex-direction:column;max-width:820px;margin:0 auto 40px;')}>
              {items.map((item, i) => (
                <div key={i} style={sx('display:flex;gap:24px;align-items:flex-start;padding:20px 0;border-bottom:1px solid var(--line);')}>
                  <div style={sx("font-family:'Space Grotesk',sans-serif;font-size:20px;font-weight:700;color:var(--accent);flex-shrink:0;width:36px;")}>{String(i + 1).padStart(2, '0')}</div>
                  <div style={sx('font-size:16px;line-height:1.5;padding-top:2px;')}>{item}</div>
                </div>
              ))}
            </div>
          ) : (
            <div className="solucoes-cards" style={sx('gap:20px;max-width:1000px;margin:0 auto 40px;')}>
              {items.map((item, i) => (
                <div key={i} className="solucao-card" style={sx('background:var(--surface);border:1px solid var(--line);border-radius:14px;padding:22px 24px;display:flex;align-items:center;gap:16px;')}>
                  <div style={sx('width:44px;height:44px;border-radius:999px;background:var(--bg-alt);display:flex;align-items:center;justify-content:center;flex-shrink:0;')}>
                    <i className="ti ti-check" style={sx('color:var(--accent);font-size:20px;')}></i>
                  </div>
                  <div style={sx('font-size:18px;font-weight:600;line-height:1.3;')}>{item}</div>
                </div>
              ))}
            </div>
          )}

          {footnote && <p style={sx('font-size:14px;color:var(--muted);font-style:italic;text-align:center;max-width:720px;margin:0 auto 40px;')}>{footnote}</p>}

          <div style={sx('display:flex;gap:16px;flex-wrap:wrap;justify-content:center;margin-top:56px;')}>
            <TrackedLink href={waLink(slug)} event="generate_lead" params={{ method: 'whatsapp', origin: slug }} target="_blank" rel="noreferrer" style={sx('border-radius:999px;padding:16px 28px;background:var(--accent);color:var(--on-accent);font-size:15px;font-weight:600;display:inline-flex;align-items:center;gap:8px;')}><i className="ti ti-brand-whatsapp"></i>Quero conversar sobre isso</TrackedLink>
            <Link href={`/${other.slug}`} style={secondaryBtn}>Conheça {other.label} <i className="ti ti-arrow-right"></i></Link>
            <Link href="/#parceiros" style={secondaryBtn}>Parceiros do ecossistema <i className="ti ti-arrow-right"></i></Link>
          </div>
        </div>
      </section>
    </SiteShell>
  );
}

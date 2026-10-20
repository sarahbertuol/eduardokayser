import { sx } from '../lib/sx';
import { SITE_URL, SITE_NAME, servicePages, waLink } from '../lib/site';
import TrackedLink from './TrackedLink';

const lightVars = {
  '--bg': '#F3F5F9', '--bg-alt': '#E7EBF2', '--surface': '#FBFCFE', '--ink': '#0E1B3D',
  '--muted': '#586181', '--line': '#D7DCE6', '--accent': '#2F5FDE', '--on-accent': '#FFFFFF',
  background: 'var(--bg)', color: 'var(--ink)', fontFamily: "'Public Sans',sans-serif", minHeight: '100vh'
};

export default function ServicePage({ slug, label, h1, intro, items, footnote, description }) {
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

  return (
    <div style={lightVars}>
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }} />
      <header style={sx('padding:20px clamp(16px,3vw,48px);border-bottom:1px solid var(--line);display:flex;justify-content:space-between;align-items:center;gap:16px;flex-wrap:wrap;')}>
        <a href="/" style={sx("font-family:'Space Grotesk',sans-serif;font-weight:700;font-size:20px;color:var(--ink);")}>EDUARDO KAYSER</a>
        <TrackedLink href={waLink(slug)} event="generate_lead" params={{ method: 'whatsapp', origin: slug }} style={sx('border-radius:999px;padding:10px 18px;background:var(--accent);color:var(--on-accent);font-size:13px;font-weight:600;')}>Falar no WhatsApp</TrackedLink>
      </header>

      <main style={sx('max-width:860px;margin:0 auto;padding:56px clamp(20px,5vw,64px) 96px;')}>
        <nav aria-label="Breadcrumb" style={sx('font-size:14px;color:var(--muted);margin-bottom:32px;')}>
          <a href="/" style={sx('color:var(--muted);')}>Início</a> <span aria-hidden="true">›</span> <span aria-current="page">{label}</span>
        </nav>
        <div style={sx('font-size:13px;letter-spacing:0.08em;text-transform:uppercase;color:var(--accent);font-weight:700;margin-bottom:12px;')}>{SITE_NAME}</div>
        <h1 style={sx("font-family:'Space Grotesk',sans-serif;font-size:clamp(28px,4vw,42px);font-weight:700;line-height:1.2;margin:0 0 20px;")}>{h1}</h1>
        <p style={sx('font-size:18px;color:var(--muted);line-height:1.6;margin:0 0 40px;')}>{intro}</p>
        <ul style={sx('margin:0 0 32px;padding:0;list-style:none;display:flex;flex-direction:column;gap:12px;')}>
          {items.map((item, i) => (
            <li key={i} style={sx('background:var(--surface);border:1px solid var(--line);border-radius:12px;padding:16px 20px;font-size:16px;line-height:1.5;')}>{item}</li>
          ))}
        </ul>
        {footnote && <p style={sx('font-size:14px;color:var(--muted);font-style:italic;margin:0 0 40px;')}>{footnote}</p>}
        <div style={sx('display:flex;gap:16px;flex-wrap:wrap;margin-top:40px;')}>
          <TrackedLink href={waLink(slug)} event="generate_lead" params={{ method: 'whatsapp', origin: slug }} style={sx('border-radius:999px;padding:16px 28px;background:var(--accent);color:var(--on-accent);font-size:15px;font-weight:600;')}>Quero conversar sobre isso</TrackedLink>
          <a href={`/${other.slug}`} style={sx('border-radius:999px;padding:16px 28px;background:var(--surface);border:1px solid var(--line);color:var(--ink);font-size:15px;font-weight:600;')}>Conheça {other.label}</a>
          <a href="/#parceiros" style={sx('border-radius:999px;padding:16px 28px;background:var(--surface);border:1px solid var(--line);color:var(--ink);font-size:15px;font-weight:600;')}>Parceiros do ecossistema</a>
        </div>
      </main>
    </div>
  );
}

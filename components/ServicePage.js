import Link from 'next/link';
import { sx } from '../lib/sx';
import { SITE_URL, servicePages } from '../lib/site';
import { lucidezOrganizacoes, ofertasProfissionais } from '../lib/data';
import SiteShell from './SiteShell';
import PainelEmpresas from './PainelEmpresas';
import PainelProfissionais from './PainelProfissionais';
import ProposalButton from './ProposalButton';

export default function ServicePage({ slug, label, panel, description }) {
  const url = `${SITE_URL}/${slug}`;
  const other = servicePages.find(p => p.slug !== slug);
  const items = panel === 'empresas' ? lucidezOrganizacoes.problemas.map(p => p.titulo) : ofertasProfissionais.map(o => o.titulo);
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

          {panel === 'empresas' ? <PainelEmpresas asH1 /> : <PainelProfissionais asH1 />}

          <div style={sx('display:flex;gap:16px;flex-wrap:wrap;justify-content:center;margin-top:72px;')}>
            <ProposalButton params={{ perfil: panel === 'empresas' ? '' : 'profissional' }} origin={slug}>Solicitar proposta</ProposalButton>
            <Link href={`/${other.slug}`} style={secondaryBtn}>{other.label} <i className="ti ti-arrow-right"></i></Link>
            <Link href="/#parceiros" style={secondaryBtn}>Parceiros do ecossistema <i className="ti ti-arrow-right"></i></Link>
          </div>
        </div>
      </section>
    </SiteShell>
  );
}

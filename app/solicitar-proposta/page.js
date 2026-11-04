import SiteShell from '../../components/SiteShell';
import ProposalForm from '../../components/ProposalForm';
import { sx } from '../../lib/sx';

export const metadata = {
  title: 'Solicitar proposta | Ecossistema LUCIDEZ',
  description: 'Conte qual desafio sua empresa ou sua carreira precisa resolver e receba uma proposta de Eduardo Kayser e do Ecossistema LUCIDEZ.',
  alternates: { canonical: '/solicitar-proposta' },
  robots: { index: false, follow: true }
};

const param = (searchParams, key) => (typeof searchParams?.[key] === 'string' ? searchParams[key].slice(0, 120) : '');

export default function SolicitarPropostaPage({ searchParams }) {
  return (
    <SiteShell origin="proposta">
      <section style={sx('padding:72px clamp(20px,5vw,64px) 104px;')}>
        <div style={sx('max-width:820px;margin:0 auto;')}>
          <div style={sx('font-size:13px;letter-spacing:0.08em;text-transform:uppercase;color:var(--accent);font-weight:700;margin-bottom:12px;')}>Proposta</div>
          <h1 style={sx("font-family:'Space Grotesk',sans-serif;font-size:clamp(28px,4vw,40px);font-weight:700;line-height:1.2;margin:0 0 16px;")}>Solicite sua proposta</h1>
          <p style={sx('font-size:16px;color:var(--muted);line-height:1.65;margin:0 0 40px;')}>Conte um pouco sobre o seu contexto e o que você precisa. Eduardo Kayser analisa as informações e retorna com o próximo passo.</p>
          <ProposalForm servico={param(searchParams, 'servico')} perfil={param(searchParams, 'perfil')} parceiro={param(searchParams, 'parceiro')} />
        </div>
      </section>
    </SiteShell>
  );
}

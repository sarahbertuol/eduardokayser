import SiteShell from '../../components/SiteShell';
import { sx } from '../../lib/sx';

export const metadata = {
  title: 'Política de Privacidade e Cookies | Ecossistema LUCIDEZ',
  description: 'Como o site do Ecossistema LUCIDEZ trata dados pessoais e utiliza cookies, em conformidade com a Lei Geral de Proteção de Dados (LGPD).',
  alternates: { canonical: '/politica-de-privacidade' }
};

const h2 = sx("font-family:'Space Grotesk',sans-serif;font-size:22px;font-weight:700;margin:40px 0 12px;");
const p = sx('font-size:16px;line-height:1.7;color:var(--muted);margin:0 0 14px;text-align:justify;');
const li = sx('font-size:16px;line-height:1.7;color:var(--muted);margin-bottom:8px;text-align:justify;');
const th = sx('text-align:left;font-size:13px;font-weight:700;padding:10px 12px;border-bottom:1px solid var(--line);white-space:nowrap;');
const td = sx('font-size:14px;line-height:1.5;color:var(--muted);padding:10px 12px;border-bottom:1px solid var(--line);vertical-align:top;');

export default function PoliticaPage() {
  return (
    <SiteShell origin="politica">
      <section style={sx('padding:72px clamp(20px,5vw,64px) 104px;')}>
        <div style={sx('max-width:780px;margin:0 auto;')}>
          <div style={sx('font-size:13px;letter-spacing:0.08em;text-transform:uppercase;color:var(--accent);font-weight:700;margin-bottom:12px;')}>Privacidade</div>
          <h1 style={sx("font-family:'Space Grotesk',sans-serif;font-size:clamp(28px,4vw,40px);font-weight:700;line-height:1.2;margin:0 0 12px;")}>Política de Privacidade e Cookies</h1>
          <p style={sx('font-size:14px;color:var(--muted);margin:0 0 32px;')}>Última atualização: 21 de outubro de 2026</p>

          <p style={p}>Esta política explica, de forma simples, como o site do <strong>Ecossistema LUCIDEZ</strong>, conduzido por Eduardo Kayser, trata dados pessoais e utiliza cookies, em conformidade com a Lei Geral de Proteção de Dados (Lei nº 13.709/2018, a LGPD).</p>

          <h2 style={h2}>1. Quem é o responsável</h2>
          <p style={p}>O controlador dos dados tratados neste site é Eduardo Kayser, responsável pelo Ecossistema LUCIDEZ. Para falar sobre privacidade ou exercer seus direitos, entre em contato pelo WhatsApp <a href="https://wa.me/5551991019459" style={sx('color:var(--accent);font-weight:600;')}>(51) 99101-9459</a>.</p>

          <h2 style={h2}>2. Quais dados são tratados</h2>
          <ul style={sx('margin:0 0 14px;padding-left:22px;')}>
            <li style={li}><strong>Dados de navegação:</strong> como endereço IP, tipo de navegador, páginas acessadas e data/hora. São registrados de forma técnica pela hospedagem do site (Vercel) para segurança e funcionamento.</li>
            <li style={li}><strong>Preferências do site:</strong> a escolha entre tema claro ou escuro, guardada no seu próprio navegador.</li>
            <li style={li}><strong>Estatísticas de uso (apenas com o seu consentimento):</strong> informações agregadas sobre páginas visitadas e cliques em botões, coletadas pelo Google Analytics.</li>
            <li style={li}><strong>Contato:</strong> ao clicar em “Falar no WhatsApp” ou “Agendar”, você é levado a serviços de terceiros (WhatsApp e Google Agenda). Os dados que você informar lá, como nome e telefone, são tratados para responder ao seu contato e conforme as políticas desses serviços. Este site não possui formulários próprios de cadastro.</li>
          </ul>

          <h2 style={h2}>3. Para que usamos e em que base legal</h2>
          <ul style={sx('margin:0 0 14px;padding-left:22px;')}>
            <li style={li}><strong>Funcionamento, segurança e lembrar suas preferências:</strong> legítimo interesse e execução do serviço solicitado (art. 7º, V e IX, da LGPD).</li>
            <li style={li}><strong>Estatísticas de uso:</strong> seu consentimento (art. 7º, I, da LGPD). Sem a sua autorização, esses cookies não são carregados.</li>
            <li style={li}><strong>Responder contatos e agendamentos:</strong> atendimento a pedido seu (art. 7º, V, da LGPD).</li>
          </ul>

          <h2 style={h2}>4. Cookies e armazenamento no navegador</h2>
          <div style={sx('overflow-x:auto;margin-bottom:20px;border:1px solid var(--line);border-radius:12px;background:var(--surface);')}>
            <table style={sx('width:100%;border-collapse:collapse;min-width:620px;')}>
              <thead>
                <tr><th style={th}>Nome</th><th style={th}>Categoria</th><th style={th}>Finalidade</th><th style={th}>Duração</th></tr>
              </thead>
              <tbody>
                <tr><td style={td}>ek-theme</td><td style={td}>Necessário (preferência)</td><td style={td}>Lembra o tema claro ou escuro escolhido por você.</td><td style={td}>Até você limpar os dados do navegador</td></tr>
                <tr><td style={td}>_ga, _ga_*</td><td style={td}>Estatísticas (Google Analytics)</td><td style={td}>Distinguem visitantes e medem o uso do site de forma agregada. Só são criados se você aceitar.</td><td style={td}>Até 2 anos</td></tr>
              </tbody>
            </table>
          </div>
          <p style={p}>Você pode apagar ou bloquear cookies a qualquer momento nas configurações do seu navegador, sem prejuízo ao uso do site.</p>

          <h2 style={h2}>5. Recursos de terceiros</h2>
          <p style={p}>Para exibir o site, carregamos fontes do Google Fonts, ícones do jsDelivr e imagens de artigos da Sanity. Ao carregar esses recursos, esses provedores podem receber dados técnicos da sua conexão, como o endereço IP. Links para Instagram, LinkedIn, YouTube, WhatsApp e Google Agenda levam a serviços externos, com políticas de privacidade próprias.</p>

          <h2 style={h2}>6. Compartilhamento e transferência internacional</h2>
          <p style={p}>Não vendemos dados pessoais. Os dados podem ser tratados por fornecedores necessários à operação do site (hospedagem, análise de uso, conteúdo), alguns com servidores fora do Brasil. Nesses casos, buscamos provedores que adotam salvaguardas compatíveis com a LGPD.</p>

          <h2 style={h2}>7. Por quanto tempo guardamos os dados</h2>
          <p style={p}>Mantemos os dados apenas pelo tempo necessário para as finalidades descritas, ou pelo prazo exigido por lei.</p>

          <h2 style={h2}>8. Seus direitos</h2>
          <p style={p}>Nos termos do art. 18 da LGPD, você pode solicitar: confirmação de que tratamos seus dados; acesso; correção; anonimização, bloqueio ou eliminação de dados desnecessários; portabilidade; informação sobre compartilhamento; e a revogação do consentimento, a qualquer momento e de forma gratuita. Para exercer seus direitos, fale conosco pelo contato da seção 1. Você também pode apresentar reclamação à Autoridade Nacional de Proteção de Dados (ANPD), em <a href="https://www.gov.br/anpd" target="_blank" rel="noreferrer" style={sx('color:var(--accent);font-weight:600;')}>gov.br/anpd</a>.</p>

          <h2 style={h2}>9. Atualizações desta política</h2>
          <p style={p}>Podemos atualizar esta política para refletir mudanças no site ou na legislação. A data da última atualização aparece no topo desta página.</p>
        </div>
      </section>
    </SiteShell>
  );
}

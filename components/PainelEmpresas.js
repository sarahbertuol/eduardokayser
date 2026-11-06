'use client';
import { Fragment } from 'react';
import { sx } from '../lib/sx';
import { AGENDA_URL } from '../lib/site';
import { track } from '../lib/track';
import { lucidezOrganizacoes as emp, comoAtuamos, pdl } from '../lib/data';
import InView from './InView';
import ProposalButton from './ProposalButton';

const eyebrow = sx('font-size:13px;letter-spacing:0.08em;text-transform:uppercase;color:var(--accent);font-weight:700;margin-bottom:12px;');
const h2Style = sx("font-family:'Space Grotesk',sans-serif;font-size:clamp(26px,3.2vw,34px);font-weight:700;line-height:1.2;margin:0 0 20px;");
const h3Style = sx("font-family:'Space Grotesk',sans-serif;font-size:clamp(22px,2.6vw,28px);font-weight:700;line-height:1.25;margin:0 0 16px;");
const lead = sx('font-size:16px;color:var(--muted);line-height:1.65;margin:0 0 14px;');
const band = sx('background:var(--bg-alt);border-radius:20px;padding:clamp(28px,5vw,56px);margin-top:72px;');

export default function PainelEmpresas({ asH1 = false }) {
  const Title = asH1 ? 'h1' : 'h2';

  return (
    <div>
      <div style={sx('max-width:760px;margin:0 auto 56px;text-align:center;')}>
        <Title style={h2Style}>{emp.titulo}</Title>
        <p style={sx('font-size:16px;color:var(--muted);line-height:1.65;margin:0;')}>{emp.intro}</p>
      </div>

      <h3 style={sx("font-family:'Space Grotesk',sans-serif;font-size:clamp(22px,2.6vw,28px);font-weight:700;text-align:center;margin:0 0 32px;")}>{emp.problemasTitulo}</h3>
      <div className="empresas-problemas" style={sx('gap:20px;')}>
        {emp.problemas.map((p, i) => (
          <div key={p.titulo} className="solucao-card" style={sx('background:var(--surface);border:1px solid var(--line);border-radius:14px;padding:26px 26px 28px;display:flex;flex-direction:column;gap:12px;')}>
            <div style={sx("font-family:'Space Grotesk',sans-serif;font-size:14px;font-weight:700;color:var(--accent);")}>{String(i + 1).padStart(2, '0')}</div>
            <div style={sx('font-size:17px;font-weight:700;line-height:1.3;')}>{p.titulo}</div>
            <p style={sx('font-size:14px;color:var(--muted);line-height:1.6;margin:0;text-align:justify;')}>{p.texto}</p>
          </div>
        ))}
      </div>

      <div style={sx('text-align:center;margin-top:56px;')}>
        <h3 style={sx("font-family:'Space Grotesk',sans-serif;font-size:clamp(20px,2.4vw,24px);font-weight:700;margin:0 0 20px;")}>{emp.atuarTitulo}</h3>
        <div className="atuar-chips" style={sx('display:flex;flex-wrap:wrap;gap:12px;justify-content:center;')}>
          {emp.atuar.map((a, i) => (
            <Fragment key={a}>
              <span className="atuar-chip" style={sx('border:1px solid var(--line);background:var(--surface);border-radius:999px;padding:10px 20px;font-size:14px;font-weight:600;')}>{a}</span>
              {(i === 2 || i === 3) && <span className="atuar-break" aria-hidden="true"></span>}
            </Fragment>
          ))}
        </div>
      </div>

      <div style={sx('margin-top:64px;border:1px solid var(--line);background:var(--surface);border-radius:20px;padding:clamp(28px,5vw,48px);text-align:center;')}>
        <h3 style={h3Style}>{emp.cta.titulo}</h3>
        <p style={sx('font-size:16px;color:var(--muted);line-height:1.65;margin:0 auto 28px;max-width:640px;')}>{emp.cta.texto}</p>
        <div style={sx('display:flex;gap:14px;justify-content:center;flex-wrap:wrap;')}>
          <ProposalButton params={{}} origin="empresas-cta">Solicitar proposta</ProposalButton>
          <a href={AGENDA_URL} onClick={() => track('generate_lead', { method: 'agenda', origin: 'empresas-cta' })} target="_blank" rel="noreferrer" style={sx('border-radius:999px;padding:16px 28px;background:var(--surface);border:1px solid var(--line);color:var(--ink);font-size:15px;font-weight:600;display:inline-flex;align-items:center;justify-content:center;gap:8px;text-align:center;')}><i className="ti ti-calendar-event"></i>Agendar uma conversa estratégica</a>
        </div>
      </div>

      <section id="como-atuamos" style={band}>
        <div style={sx('max-width:760px;margin:0 auto 48px;text-align:center;')}>
          <div style={eyebrow}>{comoAtuamos.chapeu}</div>
          <h3 style={h3Style}>{comoAtuamos.titulo}</h3>
          {comoAtuamos.paragrafos.map((p, i) => <p key={i} style={sx('font-size:16px;color:var(--muted);line-height:1.65;margin:0 0 14px;')}>{p}</p>)}
        </div>
        <p style={sx("font-family:'Space Grotesk',sans-serif;font-size:18px;font-weight:600;text-align:center;margin:0 0 36px;")}>{comoAtuamos.passosTitulo}</p>
        <InView className="steps-track">
          <div className="steps-line"></div>
          <div className="steps-progress"></div>
          <div className="pdl-steps" style={sx('gap:20px;')}>
            {comoAtuamos.passos.map((step, i) => (
              <div key={step.n} style={sx('text-align:center;position:relative;z-index:2;')}>
                <div className={i === comoAtuamos.passos.length - 1 ? 'step-circle-last' : ''} style={sx('width:40px;height:40px;border-radius:999px;background:var(--accent);color:var(--on-accent);display:flex;align-items:center;justify-content:center;font-weight:700;margin:0 auto 14px;')}>{step.n}</div>
                <div style={sx('font-size:15px;font-weight:700;margin-bottom:8px;')}>{step.label}</div>
                <p style={sx('font-size:13px;color:var(--muted);line-height:1.55;margin:0;')}>{step.texto}</p>
              </div>
            ))}
          </div>
        </InView>
        <div style={sx('text-align:center;margin-top:48px;')}>
          <p style={sx('font-size:16px;font-weight:600;margin:0 0 6px;')}>{comoAtuamos.nota.titulo}</p>
          <p style={sx('font-size:15px;color:var(--muted);line-height:1.6;margin:0 0 28px;')}>{comoAtuamos.nota.texto}</p>
          <ProposalButton params={{}} origin="como-atuamos">{comoAtuamos.cta}</ProposalButton>
        </div>
      </section>

      <section id="pdl" style={band}>
        <div style={sx('max-width:760px;margin:0 auto 40px;text-align:center;')}>
          <div style={sx('font-size:clamp(14px,1.6vw,17px);letter-spacing:0.06em;text-transform:uppercase;color:var(--accent);font-weight:700;margin-bottom:14px;')}>{pdl.chapeu}</div>
          <h3 style={h3Style}>{pdl.titulo}</h3>
          <p style={sx("font-family:'Space Grotesk',sans-serif;font-size:19px;font-weight:600;margin:24px 0 16px;")}>{pdl.apresentacao.titulo}</p>
          {pdl.apresentacao.paragrafos.map((p, i) => <p key={i} style={lead}>{p}</p>)}
        </div>

        <p style={sx('font-size:17px;font-weight:600;text-align:center;margin:0 0 24px;')}>{pdl.apresentacao.beneficiosTitulo}</p>
        <div className="pdl-beneficios" style={sx('gap:18px;max-width:900px;margin:0 auto;')}>
          {pdl.apresentacao.beneficios.map(b => (
            <div key={b.titulo} style={sx('background:var(--surface);border:1px solid var(--line);border-radius:14px;padding:22px 24px;')}>
              <div style={sx('display:flex;gap:10px;align-items:flex-start;font-size:16px;font-weight:700;line-height:1.35;margin-bottom:8px;')}><i className="ti ti-check" style={sx('color:var(--accent);flex-shrink:0;margin-top:3px;')}></i>{b.titulo}</div>
              <p style={sx('font-size:14px;color:var(--muted);line-height:1.55;margin:0;')}>{b.texto}</p>
            </div>
          ))}
        </div>

        <div style={sx('max-width:640px;margin:56px auto 28px;text-align:center;')}>
          <p style={sx('font-size:16px;font-weight:600;margin:0;')}>{pdl.subtitulo}</p>
        </div>
        <div className="pdl-indicadores" style={sx('gap:24px;margin-bottom:20px;')}>
          {pdl.indicadores.map((ind, i) => (
            <div key={i} style={sx('background:var(--surface);border:1px solid var(--line);border-radius:12px;padding:28px;text-align:center;')}>
              <div style={sx("font-family:'Space Grotesk',sans-serif;font-size:32px;font-weight:700;color:var(--accent);margin-bottom:8px;")}>{ind.valor}</div>
              <div style={sx('font-size:14px;color:var(--muted);')}>{ind.label}</div>
            </div>
          ))}
        </div>
        <div style={sx('display:flex;flex-wrap:wrap;gap:12px 32px;justify-content:center;')}>
          {pdl.indicadoresQualitativos.map((q, i) => (
            <div key={i} style={sx('font-size:15px;font-weight:600;display:flex;gap:8px;align-items:center;')}><i className="ti ti-trending-up" style={sx('color:var(--accent);')}></i>{q}</div>
          ))}
        </div>
        <div style={sx('text-align:center;margin-top:44px;')}>
          <ProposalButton params={{}} origin="pdl">{pdl.apresentacao.cta}</ProposalButton>
        </div>
      </section>
    </div>
  );
}

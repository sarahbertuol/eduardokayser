'use client';
import { useState } from 'react';
import { sx } from '../lib/sx';
import { lucidezProfissional, ofertasProfissionais } from '../lib/data';
import ProposalButton from './ProposalButton';

export default function PainelProfissionais({ asH1 = false }) {
  const [open, setOpen] = useState(null);
  const Title = asH1 ? 'h1' : 'h2';

  return (
    <div>
      <div style={sx('max-width:720px;margin:0 auto 56px;text-align:center;')}>
        <Title style={sx("font-family:'Space Grotesk',sans-serif;font-size:clamp(26px,3.2vw,34px);font-weight:700;line-height:1.2;margin:0 0 20px;")}>{lucidezProfissional.titulo}</Title>
        <p style={sx('font-size:16px;color:var(--muted);line-height:1.6;margin:0;')}>{lucidezProfissional.chapeu}</p>
      </div>

      <div className="solucoes-cards" style={sx('gap:20px;max-width:1000px;margin:0 auto;align-items:start;')}>
        {ofertasProfissionais.map((o, i) => {
          const isOpen = open === i;
          return (
            <div key={o.titulo} className="solucao-card" style={sx('background:var(--surface);border:1px solid var(--line);border-radius:14px;')}>
              <button
                type="button"
                aria-expanded={isOpen}
                aria-controls={`oferta-${i}`}
                onClick={() => setOpen(isOpen ? null : i)}
                style={sx('width:100%;display:flex;align-items:center;gap:16px;padding:22px 24px;background:none;border:none;color:var(--ink);cursor:pointer;text-align:left;font-family:inherit;')}
              >
                <span style={sx('width:44px;height:44px;border-radius:999px;background:var(--bg-alt);display:flex;align-items:center;justify-content:center;flex-shrink:0;')}>
                  <i className="ti ti-check" style={sx('color:var(--accent);font-size:20px;')}></i>
                </span>
                <span style={sx('font-size:18px;font-weight:600;line-height:1.3;flex:1;')}>{o.titulo}</span>
                <i className={isOpen ? 'ti ti-chevron-up' : 'ti ti-chevron-down'} style={sx('color:var(--muted);font-size:18px;flex-shrink:0;')}></i>
              </button>
              {isOpen && (
                <div id={`oferta-${i}`} className="oferta-body" style={sx('padding:0 24px 24px;')}>
                  <p style={sx('font-size:15px;color:var(--muted);line-height:1.65;margin:0 0 20px;text-align:justify;')}>{o.texto}</p>
                  <ProposalButton variant="small" params={{ servico: o.titulo, perfil: 'profissional' }} origin={`oferta-${o.titulo}`}>Solicitar proposta</ProposalButton>
                </div>
              )}
            </div>
          );
        })}
      </div>
    </div>
  );
}

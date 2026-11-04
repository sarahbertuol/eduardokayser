'use client';
import Link from 'next/link';
import { sx } from '../lib/sx';
import { waLink, AGENDA_URL, METODO_URL } from '../lib/site';
import { track } from '../lib/track';

const muted = sx('font-size:14px;color:var(--muted);');

export default function SiteFooter({ origin = 'site', bordered = false }) {
  return (
    <footer style={sx(`padding:48px clamp(20px,5vw,64px);display:flex;justify-content:space-between;align-items:center;flex-wrap:wrap;gap:20px;${bordered ? 'border-top:1px solid var(--line);' : ''}`)}>
      <div style={sx('display:flex;align-items:center;gap:24px;flex-wrap:wrap;')}>
        <div style={sx("font-family:'Space Grotesk',sans-serif;font-weight:700;font-size:17px;")}>Ecossistema LUCIDEZ | Eduardo Kayser</div>
        <Link href="/lucidez-organizacoes" style={muted}>Para empresas</Link>
        <Link href="/lucidez-profissional" style={muted}>Para profissionais</Link>
        <Link href={METODO_URL} style={muted}>Método LUCIDEZ</Link>
        <Link href="/#parceiros" style={muted}>Ecossistema de parceiros</Link>
        <Link href="/blog" style={muted}>Blog</Link>
        <Link href="/#cta-final" style={muted}>Contato</Link>
        <a href={AGENDA_URL} onClick={() => track('generate_lead', { method: 'agenda', origin: `rodape-${origin}` })} target="_blank" rel="noreferrer" style={muted}>Agendar reunião</a>
        <Link href="/politica-de-privacidade" style={muted}>Política de Privacidade</Link>
      </div>
      <div style={sx('display:flex;gap:18px;align-items:center;')}>
        <a href="https://instagram.com/soueduardokayser" aria-label="Instagram" style={sx('color:var(--muted);font-size:19px;')}><i className="ti ti-brand-instagram"></i></a>
        <a href="https://linkedin.com/in/eduardokayser" aria-label="LinkedIn" style={sx('color:var(--muted);font-size:19px;')}><i className="ti ti-brand-linkedin"></i></a>
        <a href="https://youtube.com/@soueduardokayser" aria-label="YouTube" style={sx('color:var(--muted);font-size:19px;')}><i className="ti ti-brand-youtube"></i></a>
        <a href={waLink()} onClick={() => track('generate_lead', { method: 'whatsapp', origin: `rodape-${origin}` })} aria-label="WhatsApp" style={sx('color:var(--muted);font-size:19px;')}><i className="ti ti-brand-whatsapp"></i></a>
      </div>
    </footer>
  );
}

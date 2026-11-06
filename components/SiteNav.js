'use client';
import { useState } from 'react';
import Link from 'next/link';
import { sx } from '../lib/sx';
import { AGENDA_URL, METODO_URL } from '../lib/site';
import { track } from '../lib/track';

const linkStyle = sx('font-size:15px;color:var(--ink);font-weight:500;white-space:nowrap;');

export default function SiteNav({ isDark, toggleTheme, origin = 'site', onTab }) {
  const [menuOpen, setMenuOpen] = useState(false);
  const close = () => setMenuOpen(false);
  const tabHref = tab => (onTab ? '/#lucidez' : tab === 'empresas' ? '/lucidez-organizacoes' : '/lucidez-profissional');
  const pickTab = tab => () => { if (onTab) onTab(tab); close(); };

  return (
    <nav style={sx('position:sticky;top:0;z-index:50;display:flex;align-items:center;gap:12px;padding:16px clamp(16px,3vw,48px);background:var(--bg);border-bottom:1px solid var(--line);')}>
      <Link href="/" onClick={close} style={sx("font-family:'Space Grotesk',sans-serif;white-space:nowrap;flex-shrink:0;line-height:1.25;color:var(--ink);text-decoration:none;font-size:15px;")}>
        <div style={sx('font-weight:700;')}>EDUARDO KAYSER</div>
        <div className="nav-brand-sub" style={sx('font-weight:500;color:var(--muted);')}>Ecossistema de Gestão Lucidez</div>
      </Link>

      <div className={menuOpen ? 'nav-links open' : 'nav-links'} style={sx('gap:20px;align-items:center;justify-content:center;flex:1;min-width:0;')}>
        <div className="nav-dropdown">
          <Link href="/#sobre-ecossistema" onClick={close} style={linkStyle}>Sobre <i className="ti ti-chevron-down nav-caret"></i></Link>
          <div className="nav-dropdown-menu">
            <Link href="/#sobre-ecossistema" onClick={close} style={linkStyle}>Sobre o Ecossistema</Link>
            <Link href="/#sobre-eduardo" onClick={close} style={linkStyle}>Sobre Eduardo Kayser</Link>
          </div>
        </div>
        <Link href={tabHref('empresas')} onClick={pickTab('empresas')} style={linkStyle}>Para empresas</Link>
        <Link href={tabHref('profissional')} onClick={pickTab('profissional')} style={linkStyle}>Para profissionais</Link>
        <Link href={METODO_URL} onClick={close} style={linkStyle}>Método LUCIDEZ</Link>
        <Link href="/#parceiros" onClick={close} style={linkStyle}>Parceiros</Link>
        <Link href="/blog" onClick={close} style={linkStyle}>Blog</Link>
        <Link href="/#cta-final" onClick={close} style={linkStyle}>Contato</Link>
      </div>

      <div style={sx('display:flex;align-items:center;gap:8px;flex-shrink:0;margin-left:auto;')}>
        <button onClick={toggleTheme} aria-label="Alternar tema" style={sx('width:36px;height:36px;border-radius:999px;border:1px solid var(--line);background:var(--surface);color:var(--ink);display:flex;align-items:center;justify-content:center;cursor:pointer;font-size:16px;flex-shrink:0;')}>
          <i className={isDark ? 'ti ti-sun' : 'ti ti-moon'}></i>
        </button>
        <a href={AGENDA_URL} onClick={() => track('generate_lead', { method: 'agenda', origin: `navbar-${origin}` })} target="_blank" rel="noreferrer" className="nav-cta" style={sx('border-radius:999px;padding:10px 18px;background:var(--accent);color:var(--on-accent);font-size:13px;font-weight:600;white-space:nowrap;flex-shrink:0;')}>Agendar diagnóstico</a>
        <button
          onClick={() => setMenuOpen(o => !o)}
          aria-label="Abrir menu"
          className="nav-toggle"
          style={sx('width:36px;height:36px;border-radius:999px;border:1px solid var(--line);background:var(--surface);color:var(--ink);align-items:center;justify-content:center;cursor:pointer;font-size:18px;flex-shrink:0;')}
        >
          <i className={menuOpen ? 'ti ti-x' : 'ti ti-menu-2'}></i>
        </button>
      </div>
    </nav>
  );
}

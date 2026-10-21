'use client';
import { useState } from 'react';
import Link from 'next/link';
import { sx } from '../lib/sx';
import { themeVars, useTheme } from '../lib/theme';
import { waLink, AGENDA_URL } from '../lib/site';
import { track } from '../lib/track';
import RevealOnScroll from './RevealOnScroll';

const navLink = sx('font-size:15px;color:var(--ink);font-weight:500;white-space:nowrap;');

export default function SiteShell({ children, origin = 'blog' }) {
  const [theme, toggleTheme] = useTheme();
  const [menuOpen, setMenuOpen] = useState(false);
  const isDark = theme === 'dark';
  const close = () => setMenuOpen(false);

  return (
    <div style={themeVars(theme)}>
      <RevealOnScroll />
      <a href={waLink()} onClick={() => track('generate_lead', { method: 'whatsapp', origin: `botao-flutuante-${origin}` })} target="_blank" rel="noreferrer" aria-label="Falar no WhatsApp" style={sx('position:fixed;bottom:24px;right:24px;z-index:60;width:60px;height:60px;border-radius:999px;background:#25D366;color:#FFFFFF;display:flex;align-items:center;justify-content:center;font-size:30px;box-shadow:0 10px 28px rgba(0,0,0,0.25);')}>
        <i className="ti ti-brand-whatsapp"></i>
      </a>

      <nav style={sx('position:sticky;top:0;z-index:50;display:flex;align-items:center;gap:12px;padding:16px clamp(16px,3vw,48px);background:var(--bg);border-bottom:1px solid var(--line);')}>
        <Link href="/" style={sx("font-family:'Space Grotesk',sans-serif;white-space:nowrap;flex-shrink:0;line-height:1.2;color:var(--ink);text-decoration:none;")}>
          <div style={sx('font-weight:700;font-size:20px;')}>EDUARDO KAYSER</div>
          <div className="nav-brand-sub" style={sx('font-weight:500;font-size:12px;color:var(--muted);letter-spacing:0.01em;')}>Ecossistema de Gestão Lucidez</div>
        </Link>
        <div className={menuOpen ? 'nav-links open' : 'nav-links'} style={sx('gap:20px;align-items:center;justify-content:center;flex:1;min-width:0;')}>
          <Link href="/#sobre-ecossistema" onClick={close} style={navLink}>Sobre</Link>
          <Link href="/lucidez-profissional" onClick={close} style={navLink}>Profissional</Link>
          <Link href="/lucidez-organizacoes" onClick={close} style={navLink}>Organizações</Link>
          <Link href="/#como-funciona" onClick={close} style={navLink}>Método</Link>
          <Link href="/#parceiros" onClick={close} style={navLink}>Parceiros</Link>
          <Link href="/blog" onClick={close} style={navLink}>Blog</Link>
        </div>
        <div style={sx('display:flex;align-items:center;gap:8px;flex-shrink:0;')}>
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

      <main>{children}</main>

      <footer style={sx('padding:48px clamp(20px,5vw,64px);display:flex;justify-content:space-between;align-items:center;flex-wrap:wrap;gap:20px;border-top:1px solid var(--line);')}>
        <div style={sx('display:flex;align-items:center;gap:24px;flex-wrap:wrap;')}>
          <div style={sx("font-family:'Space Grotesk',sans-serif;font-weight:700;font-size:17px;")}>Ecossistema LUCIDEZ — Eduardo Kayser</div>
          <Link href="/#parceiros" style={sx('font-size:14px;color:var(--muted);')}>Ecossistema de parceiros</Link>
          <Link href="/blog" style={sx('font-size:14px;color:var(--muted);')}>Blog</Link>
        </div>
        <div style={sx('display:flex;gap:18px;align-items:center;')}>
          <a href="https://instagram.com/soueduardokayser" aria-label="Instagram" style={sx('color:var(--muted);font-size:19px;')}><i className="ti ti-brand-instagram"></i></a>
          <a href="https://linkedin.com/in/eduardokayser" aria-label="LinkedIn" style={sx('color:var(--muted);font-size:19px;')}><i className="ti ti-brand-linkedin"></i></a>
          <a href="https://youtube.com/@soueduardokayser" aria-label="YouTube" style={sx('color:var(--muted);font-size:19px;')}><i className="ti ti-brand-youtube"></i></a>
          <a href={waLink()} onClick={() => track('generate_lead', { method: 'whatsapp', origin: `rodape-${origin}` })} aria-label="WhatsApp" style={sx('color:var(--muted);font-size:19px;')}><i className="ti ti-brand-whatsapp"></i></a>
        </div>
      </footer>
    </div>
  );
}

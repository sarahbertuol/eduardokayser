'use client';
import { sx } from '../lib/sx';
import { themeVars, useTheme } from '../lib/theme';
import { waLink } from '../lib/site';
import { track } from '../lib/track';
import RevealOnScroll from './RevealOnScroll';
import SiteNav from './SiteNav';
import SiteFooter from './SiteFooter';

export default function SiteShell({ children, origin = 'blog' }) {
  const [theme, toggleTheme] = useTheme();

  return (
    <div style={themeVars(theme)} data-theme={theme}>
      <RevealOnScroll />
      <a href={waLink()} onClick={() => track('generate_lead', { method: 'whatsapp', origin: `botao-flutuante-${origin}` })} target="_blank" rel="noreferrer" aria-label="Falar no WhatsApp" style={sx('position:fixed;bottom:24px;right:24px;z-index:60;width:60px;height:60px;border-radius:999px;background:#25D366;color:#FFFFFF;display:flex;align-items:center;justify-content:center;font-size:30px;box-shadow:0 10px 28px rgba(0,0,0,0.25);')}>
        <i className="ti ti-brand-whatsapp"></i>
      </a>

      <SiteNav isDark={theme === 'dark'} toggleTheme={toggleTheme} origin={origin} />

      <main>{children}</main>

      <SiteFooter origin={origin} bordered />
    </div>
  );
}

'use client';
import { useEffect, useState } from 'react';
import Link from 'next/link';
import { sx } from '../lib/sx';
import { GA_ID } from '../lib/site';
import { readConsent, writeConsent, OPEN_PREFS_EVENT } from '../lib/consent';

function loadAnalytics() {
  if (!GA_ID || window.__gaLoaded) return;
  window.__gaLoaded = true;
  window[`ga-disable-${GA_ID}`] = false;
  window.dataLayer = window.dataLayer || [];
  window.gtag = function () { window.dataLayer.push(arguments); };
  window.gtag('js', new Date());
  window.gtag('config', GA_ID);
  const s = document.createElement('script');
  s.async = true;
  s.src = `https://www.googletagmanager.com/gtag/js?id=${GA_ID}`;
  document.head.appendChild(s);
}

function disableAnalytics() {
  if (GA_ID) window[`ga-disable-${GA_ID}`] = true;
  document.cookie.split(';').forEach(c => {
    const name = c.split('=')[0].trim();
    if (!name.startsWith('_ga')) return;
    const host = window.location.hostname;
    [host, `.${host}`, `.${host.replace(/^www\./, '')}`].forEach(domain => {
      document.cookie = `${name}=; expires=Thu, 01 Jan 1970 00:00:00 GMT; path=/; domain=${domain}`;
    });
    document.cookie = `${name}=; expires=Thu, 01 Jan 1970 00:00:00 GMT; path=/`;
  });
}

const choiceBtn = sx('flex:1 1 150px;border-radius:999px;padding:12px 18px;font-size:14px;font-weight:600;cursor:pointer;');
const acceptBtn = { ...choiceBtn, border: '1px solid var(--accent)', background: 'var(--accent)', color: 'var(--on-accent)' };
const rejectBtn = { ...choiceBtn, border: '1px solid var(--accent)', background: 'var(--surface)', color: 'var(--accent)' };

export default function CookieConsent() {
  const [ready, setReady] = useState(false);
  const [consent, setConsent] = useState(null);
  const [panelOpen, setPanelOpen] = useState(false);
  const [analytics, setAnalytics] = useState(false);

  useEffect(() => {
    const saved = readConsent();
    setConsent(saved);
    setAnalytics(saved ? saved.analytics : false);
    if (saved?.analytics) loadAnalytics();
    setReady(true);
    const openPrefs = () => {
      const current = readConsent();
      setAnalytics(current ? current.analytics : false);
      setPanelOpen(true);
      setConsent(null);
    };
    window.addEventListener(OPEN_PREFS_EVENT, openPrefs);
    return () => window.removeEventListener(OPEN_PREFS_EVENT, openPrefs);
  }, []);

  const decide = allowAnalytics => {
    const previous = readConsent();
    setConsent(writeConsent(allowAnalytics));
    setPanelOpen(false);
    if (allowAnalytics) {
      loadAnalytics();
    } else {
      disableAnalytics();
      if (previous?.analytics && window.__gaLoaded) window.location.reload();
    }
  };

  if (!ready || consent) return null;

  return (
    <div role="dialog" aria-modal="false" aria-labelledby="cookie-title" style={sx('position:fixed;left:16px;right:16px;bottom:16px;z-index:80;max-width:560px;background:var(--surface);color:var(--ink);border:1px solid var(--line);border-radius:16px;padding:22px 24px;box-shadow:0 18px 48px rgba(0,0,0,0.22);')}>
      <div id="cookie-title" style={sx("font-family:'Space Grotesk',sans-serif;font-size:17px;font-weight:700;margin-bottom:8px;")}>Sua privacidade importa</div>

      {!panelOpen ? (
        <>
          <p style={sx('font-size:14px;line-height:1.55;color:var(--muted);margin:0 0 16px;')}>
            Usamos armazenamento essencial para o site funcionar e, <strong style={sx('color:var(--ink);')}>somente com a sua autorização</strong>, cookies de estatísticas para entender como o site é usado. Você pode aceitar, rejeitar ou escolher o que permitir. Saiba mais na nossa <Link href="/politica-de-privacidade" style={sx('color:var(--accent);font-weight:600;text-decoration:underline;')}>Política de Privacidade</Link>.
          </p>
          <div style={sx('display:flex;gap:10px;flex-wrap:wrap;')}>
            <button type="button" onClick={() => decide(false)} style={rejectBtn}>Rejeitar não essenciais</button>
            <button type="button" onClick={() => decide(true)} style={acceptBtn}>Aceitar todos</button>
          </div>
          <button type="button" onClick={() => setPanelOpen(true)} style={sx('display:block;margin:14px auto 0;background:none;border:none;color:var(--accent);font-size:14px;font-weight:600;cursor:pointer;text-decoration:underline;padding:4px;')}>Personalizar</button>
        </>
      ) : (
        <>
          <p style={sx('font-size:14px;line-height:1.55;color:var(--muted);margin:0 0 14px;')}>Escolha quais categorias você autoriza. Você pode mudar de ideia a qualquer momento em “Preferências de cookies”, no rodapé.</p>
          <div style={sx('display:flex;flex-direction:column;gap:10px;margin-bottom:16px;')}>
            <label style={sx('display:flex;gap:12px;align-items:flex-start;border:1px solid var(--line);border-radius:12px;padding:12px 14px;')}>
              <input type="checkbox" checked disabled style={sx('width:18px;height:18px;margin-top:2px;accent-color:var(--accent);flex-shrink:0;')} />
              <span style={sx('font-size:14px;line-height:1.5;')}><strong>Necessários</strong> <span style={sx('color:var(--muted);')}>(sempre ativos)</span><br /><span style={sx('color:var(--muted);')}>Guardam o tema claro/escuro e as suas escolhas de cookies. Não identificam você.</span></span>
            </label>
            <label style={sx('display:flex;gap:12px;align-items:flex-start;border:1px solid var(--line);border-radius:12px;padding:12px 14px;cursor:pointer;')}>
              <input type="checkbox" checked={analytics} onChange={e => setAnalytics(e.target.checked)} style={sx('width:18px;height:18px;margin-top:2px;accent-color:var(--accent);flex-shrink:0;cursor:pointer;')} />
              <span style={sx('font-size:14px;line-height:1.5;')}><strong>Estatísticas</strong><br /><span style={sx('color:var(--muted);')}>Google Analytics: mostram quais páginas e botões são mais usados, de forma agregada, para melhorarmos o site.</span></span>
            </label>
          </div>
          <div style={sx('display:flex;gap:10px;flex-wrap:wrap;')}>
            <button type="button" onClick={() => setPanelOpen(false)} style={rejectBtn}>Voltar</button>
            <button type="button" onClick={() => decide(analytics)} style={acceptBtn}>Salvar minhas escolhas</button>
          </div>
        </>
      )}
    </div>
  );
}

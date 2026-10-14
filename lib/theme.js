'use client';
import { useEffect, useState } from 'react';

const palettes = {
  dark: {
    bg: '#0B1526', bgAlt: '#101D34', surface: '#13203B', ink: '#EEF1F7',
    muted: '#9FAAC4', line: '#243252', accent: '#5B8CFF', accentRgb: '91,140,255', onAccent: '#FFFFFF', accentStrong: '#BFD3FF'
  },
  light: {
    bg: '#F3F5F9', bgAlt: '#E7EBF2', surface: '#FBFCFE', ink: '#0E1B3D',
    muted: '#586181', line: '#D7DCE6', accent: '#2F5FDE', accentRgb: '47,95,222', onAccent: '#FFFFFF', accentStrong: '#1B3A8A'
  }
};

export function themeVars(theme) {
  const c = palettes[theme] || palettes.light;
  return {
    '--bg': c.bg, '--bg-alt': c.bgAlt, '--surface': c.surface, '--ink': c.ink,
    '--muted': c.muted, '--line': c.line, '--accent': c.accent, '--accent-rgb': c.accentRgb, '--on-accent': c.onAccent,
    '--accent-strong': c.accentStrong,
    background: 'var(--bg)', color: 'var(--ink)', fontFamily: "'Public Sans',sans-serif",
    minHeight: '100vh', transition: 'background .25s,color .25s'
  };
}

// Tema claro/escuro lembrado entre páginas (home ↔ blog)
export function useTheme() {
  const [theme, setTheme] = useState('light');
  useEffect(() => {
    try {
      const saved = localStorage.getItem('ek-theme');
      if (saved === 'dark' || saved === 'light') setTheme(saved);
    } catch {}
  }, []);
  const toggleTheme = () => setTheme(t => {
    const next = t === 'light' ? 'dark' : 'light';
    try { localStorage.setItem('ek-theme', next); } catch {}
    return next;
  });
  return [theme, toggleTheme];
}

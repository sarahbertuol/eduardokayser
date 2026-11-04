'use client';
import Link from 'next/link';
import { sx } from '../lib/sx';
import { propostaHref } from '../lib/site';
import { track } from '../lib/track';

const variants = {
  primary: 'border-radius:999px;padding:16px 28px;background:var(--accent);color:var(--on-accent);font-size:15px;font-weight:600;display:inline-flex;align-items:center;justify-content:center;gap:8px;text-align:center;',
  small: 'border-radius:999px;padding:12px 22px;background:var(--accent);color:var(--on-accent);font-size:14px;font-weight:600;display:inline-flex;align-items:center;justify-content:center;gap:8px;text-align:center;',
  ghost: 'border-radius:999px;padding:16px 28px;background:var(--surface);border:1px solid var(--line);color:var(--ink);font-size:15px;font-weight:600;display:inline-flex;align-items:center;justify-content:center;gap:8px;text-align:center;'
};

export default function ProposalButton({ children = 'Solicitar proposta', variant = 'primary', params, origin, icon = true }) {
  return (
    <Link
      href={propostaHref(params)}
      onClick={() => track('cta_click', { action: 'solicitar_proposta', origin })}
      style={sx(variants[variant])}
    >
      {children}
      {icon && <i className="ti ti-arrow-right"></i>}
    </Link>
  );
}

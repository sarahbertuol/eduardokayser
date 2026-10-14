import Link from 'next/link';
import SiteShell from '../../../components/SiteShell';
import { sx } from '../../../lib/sx';

export default function PostNotFound() {
  return (
    <SiteShell>
      <section style={sx('padding:120px clamp(20px,5vw,64px);text-align:center;')}>
        <h1 style={sx("font-family:'Space Grotesk',sans-serif;font-size:clamp(28px,4vw,40px);font-weight:700;margin:0 0 16px;")}>Artigo não encontrado</h1>
        <p style={sx('font-size:16px;color:var(--muted);margin:0 0 32px;')}>Ele pode ter sido removido ou o endereço mudou.</p>
        <Link href="/blog" style={sx('border-radius:999px;padding:14px 26px;background:var(--accent);color:var(--on-accent);font-size:15px;font-weight:600;')}>Ver todos os artigos</Link>
      </section>
    </SiteShell>
  );
}

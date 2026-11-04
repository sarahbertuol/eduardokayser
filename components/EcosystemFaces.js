import Link from 'next/link';
import { sx } from '../lib/sx';
import RealPhoto from './RealPhoto';
import { parceiros } from '../lib/data';

const pessoas = [
  { id: 'eduardo', name: 'Eduardo Kayser', photo: '/eduardo/hero.jpg', pos: 'center 20%' },
  ...parceiros.filter(p => p.photo).map(p => ({ id: p.id, name: p.name, photo: p.photo, pos: p.photoPosition || 'top' }))
];

export default function EcosystemFaces() {
  return (
    <Link href="/#parceiros" aria-label="Conheça os parceiros do Ecossistema LUCIDEZ" style={sx('display:flex;flex-direction:column;align-items:center;gap:10px;margin-top:18px;padding:14px 18px;border:1px solid var(--line);background:var(--surface);border-radius:16px;color:var(--ink);')}>
      <div style={sx('display:flex;align-items:center;')}>
        {pessoas.map((p, i) => (
          <div key={p.id} title={p.name} style={sx(`width:46px;height:46px;border-radius:999px;overflow:hidden;border:3px solid var(--surface);background:var(--bg-alt);flex-shrink:0;${i ? 'margin-left:-12px;' : ''}`)}>
            <RealPhoto src={p.photo} alt={p.name} objectPosition={p.pos} sizes="48px" />
          </div>
        ))}
      </div>
      <div style={sx('font-size:13px;font-weight:600;text-align:center;line-height:1.4;')}>Eduardo Kayser e os parceiros do Ecossistema LUCIDEZ</div>
    </Link>
  );
}

'use client';
import { useRef, useState } from 'react';
import Image from 'next/image';
import { sx } from '../lib/sx';
import Link from 'next/link';
import { themeVars, useTheme } from '../lib/theme';
import ImagePlaceholder from './ImagePlaceholder';
import RealPhoto from './RealPhoto';
import CountUp from './CountUp';
import PostCard from './PostCard';
import RevealOnScroll from './RevealOnScroll';
import SiteNav from './SiteNav';
import SiteFooter from './SiteFooter';
import PainelEmpresas from './PainelEmpresas';
import PainelProfissionais from './PainelProfissionais';
import ProposalButton from './ProposalButton';
import EcosystemFaces from './EcosystemFaces';
import { waLink, AGENDA_URL } from '../lib/site';
import { track } from '../lib/track';
import {
  depoimentos as allDepoimentos, resultados, marcas,
  parceiros, heroContent, sobreEcossistema, sobreEduardo
} from '../lib/data';

const noise = "url('data:image/svg+xml,%3Csvg xmlns=%22http://www.w3.org/2000/svg%22 width=%22200%22 height=%22200%22%3E%3Cfilter id=%22n%22%3E%3CfeTurbulence type=%22fractalNoise%22 baseFrequency=%220.9%22 numOctaves=%222%22 stitchTiles=%22stitch%22/%3E%3C/filter%3E%3Crect width=%22100%25%22 height=%22100%25%22 filter=%22url(%23n)%22 opacity=%220.09%22/%3E%3C/svg%3E')";

const galeria = [
  { type: 'image', src: '/galeria/foto-1.jpg', ratio: 0.563 },
  { type: 'image', src: '/galeria/foto-2.jpg', ratio: 0.75 },
  { type: 'image', src: '/galeria/foto-3.jpg', ratio: 0.563 },
  { type: 'image', src: '/galeria/foto-4.jpg', ratio: 1.777 },
  { type: 'image', src: '/galeria/foto-5.jpg', ratio: 1.777 },
  { type: 'image', src: '/galeria/foto-6.jpg', ratio: 1.333 },
  { type: 'image', src: '/galeria/foto-7.jpg', ratio: 1.875 },
  { type: 'video', src: '/galeria/video-1.mp4', ratio: 0.558 }
];

const tabBtn = active => sx(`border-radius:999px;padding:14px 28px;font-size:14px;font-weight:600;cursor:pointer;${active ? 'border:1px solid var(--accent);background:var(--accent);color:var(--on-accent);' : 'border:1px solid var(--line);background:var(--surface);color:var(--ink);'}`);

export default function HomeClient({ posts = [] }) {
  const [theme, toggleTheme] = useTheme();
  const [testimonialPage, setTestimonialPage] = useState(0);
  const [partnerPage, setPartnerPage] = useState(0);
  const [lucidezTab, setLucidezTab] = useState('empresas');
  const galleryRef = useRef(null);

  const isDark = theme === 'dark';
  const rootVars = themeVars(theme);

  const totalPages = Math.ceil(allDepoimentos.length / 3);
  const depoimentos = allDepoimentos.slice(testimonialPage * 3, testimonialPage * 3 + 3);
  const prevTestimonials = () => setTestimonialPage(p => (p - 1 + totalPages) % totalPages);
  const nextTestimonials = () => setTestimonialPage(p => (p + 1) % totalPages);

  const totalPartnerPages = Math.ceil(parceiros.length / 3);
  const partnersPageItems = parceiros.slice(partnerPage * 3, partnerPage * 3 + 3);
  const prevPartners = () => setPartnerPage(p => (p - 1 + totalPartnerPages) % totalPartnerPages);
  const nextPartners = () => setPartnerPage(p => (p + 1) % totalPartnerPages);

  const scrollGallery = dir => {
    const el = galleryRef.current;
    if (!el) return;
    const max = el.scrollWidth - el.clientWidth;
    if (dir > 0 && el.scrollLeft >= max - 4) el.scrollTo({ left: 0, behavior: 'smooth' });
    else if (dir < 0 && el.scrollLeft <= 4) el.scrollTo({ left: max, behavior: 'smooth' });
    else el.scrollBy({ left: dir * el.clientWidth * 0.8, behavior: 'smooth' });
  };

  return (
    <div style={rootVars} data-theme={theme}>
      <RevealOnScroll />
      <a href={waLink()} onClick={() => track('generate_lead', { method: 'whatsapp', origin: 'botao-flutuante' })} target="_blank" rel="noreferrer" aria-label="Falar no WhatsApp" style={sx('position:fixed;bottom:24px;right:24px;z-index:60;width:60px;height:60px;border-radius:999px;background:#25D366;color:#FFFFFF;display:flex;align-items:center;justify-content:center;font-size:30px;box-shadow:0 10px 28px rgba(0,0,0,0.25);')}>
        <i className="ti ti-brand-whatsapp"></i>
      </a>

      <SiteNav isDark={isDark} toggleTheme={toggleTheme} origin="home" onTab={setLucidezTab} />

      <header className="hero-grid" style={sx('padding:96px clamp(20px,5vw,64px) 80px;gap:56px;align-items:center;max-width:1280px;margin:0 auto;')}>
        <div>
          <h1 className="hero-in" style={sx("--d:0.1s;font-family:'Space Grotesk',sans-serif;font-size:clamp(34px,4.6vw,52px);font-weight:700;line-height:1.15;margin:0 0 24px;")}>{heroContent.headline}</h1>
          <p className="hero-in" style={sx('--d:0.3s;font-size:18px;color:var(--muted);line-height:1.6;margin:0 0 36px;max-width:560px;text-align:justify;')}>{heroContent.subheadline}</p>
          <div className="hero-in" style={sx('--d:0.5s;display:flex;gap:16px;flex-wrap:wrap;')}>
            <ProposalButton params={{}} origin="hero">Solicitar proposta</ProposalButton>
            <a href="#lucidez" onClick={() => setLucidezTab('empresas')} style={sx('border-radius:999px;padding:16px 28px;background:var(--surface);border:1px solid var(--line);color:var(--ink);font-size:15px;font-weight:600;display:inline-flex;align-items:center;gap:8px;')}>Quero transformar minha organização <i className="ti ti-arrow-right"></i></a>
            <a href="#lucidez" onClick={() => setLucidezTab('profissional')} style={sx('border-radius:999px;padding:16px 28px;background:var(--surface);border:1px solid var(--line);color:var(--ink);font-size:15px;font-weight:600;display:inline-flex;align-items:center;gap:8px;')}>Quero crescer profissionalmente <i className="ti ti-arrow-right"></i></a>
          </div>
        </div>
        <div>
          <div className="hero-photo" style={sx('width:100%;aspect-ratio:4/5;border-radius:12px;overflow:hidden;')}>
            <RealPhoto src="/eduardo/hero.jpg" alt="Eduardo Kayser" priority />
          </div>
          <EcosystemFaces />
        </div>
      </header>

      <section id="introducao" style={sx('padding:72px clamp(20px,5vw,64px);')}>
        <div style={sx('max-width:1180px;margin:0 auto;')}>
          <div style={sx('font-size:13px;letter-spacing:0.06em;text-transform:uppercase;color:var(--muted);font-weight:700;text-align:center;margin-bottom:32px;')}>Empresas e pessoas impactadas</div>
          <div className="marquee-wrap" style={sx('margin-bottom:64px;')}>
            <div className="marquee-track">
              {[...marcas, ...marcas].map((m, i) => (
                <div key={i} style={{ flexShrink: 0, width: m.w || 180, height: m.h || 72, margin: '0 24px' }}>
                  <RealPhoto src={`/marcas/${isDark ? 'dark' : 'light'}/${m.file}`} alt={m.name} fit="contain" loading="eager" />
                </div>
              ))}
            </div>
          </div>
          <div className="stats-grid" style={sx('gap:24px;text-align:center;')}>
            <div><div style={sx("font-family:'Space Grotesk',sans-serif;font-size:clamp(28px,6vw,44px);font-weight:700;color:var(--accent);")}><CountUp to={25} prefix="+" /></div><div style={sx('font-size:15px;color:var(--muted);margin-top:8px;')}>anos de experiência</div></div>
            <div><div style={sx("font-family:'Space Grotesk',sans-serif;font-size:clamp(28px,6vw,44px);font-weight:700;color:var(--accent);")}><CountUp to={1200} prefix="+" /></div><div style={sx('font-size:15px;color:var(--muted);margin-top:8px;')}>líderes treinados</div></div>
            <div><div style={sx("font-family:'Space Grotesk',sans-serif;font-size:clamp(28px,6vw,44px);font-weight:700;color:var(--accent);")}><CountUp to={17} /></div><div style={sx('font-size:15px;color:var(--muted);margin-top:8px;')}>prêmios nacionais</div></div>
          </div>
        </div>
      </section>

      <section id="lucidez" style={sx('padding:104px clamp(20px,5vw,64px);')}>
        <div style={sx('max-width:1180px;margin:0 auto;')}>
          <div style={sx('display:flex;justify-content:center;gap:12px;margin-bottom:56px;flex-wrap:wrap;')}>
            <button onClick={() => setLucidezTab('empresas')} style={tabBtn(lucidezTab === 'empresas')}>PARA EMPRESAS</button>
            <button onClick={() => setLucidezTab('profissional')} style={tabBtn(lucidezTab === 'profissional')}>PARA PROFISSIONAIS</button>
          </div>

          {lucidezTab === 'empresas' ? <PainelEmpresas /> : <PainelProfissionais />}
        </div>
      </section>

      <section id="sobre-eduardo" style={sx('padding:104px clamp(20px,5vw,64px);background:var(--bg-alt);')}>
        <div className="about-grid" style={sx('max-width:1180px;margin:0 auto;gap:56px;align-items:start;')}>
          <div>
            <div className="about-photo" style={sx('width:100%;aspect-ratio:1/1;border-radius:12px;overflow:hidden;')}>
              <RealPhoto src="/eduardo/sobre.jpg" alt="Eduardo Kayser" />
            </div>
            <ul style={sx('margin:32px 0 28px;padding:0;list-style:none;display:flex;flex-direction:column;gap:12px;')}>
              {sobreEduardo.destaques.map((d, i) => (
                <li key={i} style={sx('font-size:15px;line-height:1.5;display:flex;gap:10px;')}><i className="ti ti-check" style={sx('color:var(--accent);flex-shrink:0;margin-top:3px;')}></i>{d}</li>
              ))}
            </ul>
            <a href="#resultados" style={sx('border-radius:999px;padding:14px 26px;background:var(--accent);color:var(--on-accent);font-size:15px;font-weight:600;display:inline-flex;align-items:center;gap:8px;')}>Conheça meus resultados <i className="ti ti-arrow-right"></i></a>
          </div>
          <div>
            <div style={sx('font-size:13px;letter-spacing:0.08em;text-transform:uppercase;color:var(--accent);font-weight:700;margin-bottom:12px;')}>Eduardo Kayser</div>
            <h2 style={sx("font-family:'Space Grotesk',sans-serif;font-size:clamp(26px,3.2vw,34px);font-weight:700;margin:0 0 20px;")}>{sobreEduardo.titulo}</h2>
            {sobreEduardo.paragrafos.map((p, i) => (
              <p key={i} style={sx('font-size:15px;color:var(--muted);line-height:1.65;margin:0 0 14px;text-align:justify;')}>{p}</p>
            ))}
            <div style={sx('margin-top:36px;')}>
              <div style={sx('font-size:13px;letter-spacing:0.08em;text-transform:uppercase;color:var(--muted);font-weight:700;margin-bottom:16px;')}>Formação e credenciais</div>
              <Image
                className="credenciais-img"
                src="/eduardo/credenciais.png"
                width={1586}
                height={248}
                sizes="(max-width: 980px) 90vw, 600px"
                alt="Instituições de formação e credenciais de Eduardo Kayser: Feevale, Unisinos, Fundação Dom Cabral, HSM University, Amana-Key, IBGC, ISE Business School, Middlesex University London, AoEC, EMCC, ICF, Falconi, IBC Coaching e Harvard University"
                style={{ width: '100%', height: 'auto' }}
              />
            </div>
          </div>
        </div>

        <div style={sx('max-width:1180px;margin:80px auto 0;')}>
          <div style={sx('display:flex;align-items:stretch;gap:16px;')}>
            <button className="gallery-arrow" onClick={() => scrollGallery(-1)} aria-label="Fotos anteriores da galeria" style={sx('flex-shrink:0;width:40px;height:40px;align-self:center;border-radius:999px;border:1px solid var(--line);background:var(--surface);color:var(--ink);cursor:pointer;font-size:16px;display:flex;align-items:center;justify-content:center;')}><i className="ti ti-chevron-left"></i></button>
            <div ref={galleryRef} className="gallery-strip">
              {galeria.map((g, i) => (
                <div key={g.src} className="gallery-item" style={{ aspectRatio: g.ratio }}>
                  {g.type === 'image' ? (
                    <RealPhoto src={g.src} alt={`Eduardo Kayser, foto ${i + 1}`} />
                  ) : (
                    <video src={g.src} controls muted playsInline preload="metadata" style={{ width: '100%', height: '100%', objectFit: 'cover', display: 'block', background: '#000' }} />
                  )}
                </div>
              ))}
            </div>
            <button className="gallery-arrow" onClick={() => scrollGallery(1)} aria-label="Próximas fotos da galeria" style={sx('flex-shrink:0;width:40px;height:40px;align-self:center;border-radius:999px;border:1px solid var(--line);background:var(--surface);color:var(--ink);cursor:pointer;font-size:16px;display:flex;align-items:center;justify-content:center;')}><i className="ti ti-chevron-right"></i></button>
          </div>
        </div>
      </section>

      <section id="sobre-ecossistema" style={sx('padding:104px clamp(20px,5vw,64px);')}>
        <div style={sx('max-width:820px;margin:0 auto;text-align:center;')}>
          <h2 style={sx("font-family:'Space Grotesk',sans-serif;font-size:clamp(26px,3.2vw,34px);font-weight:700;margin:0 0 24px;")}>{sobreEcossistema.titulo}</h2>
          <p style={sx('font-size:17px;color:var(--muted);line-height:1.7;margin:0 auto;max-width:680px;')}>{sobreEcossistema.intro}</p>
        </div>
        <div style={sx('max-width:900px;margin:56px auto 0;text-align:center;')}>
          <p style={sx("font-family:'Space Grotesk',sans-serif;font-size:18px;font-weight:600;margin:0 0 24px;")}>{sobreEcossistema.subtitulo}</p>
          <div className="lucidez-list" style={sx('gap:14px 32px;text-align:left;')}>
            {sobreEcossistema.jornada.map((j, i) => (
              <div key={i} style={sx('background:var(--surface);border:1px solid var(--line);border-radius:12px;padding:16px 18px;font-size:15px;display:flex;gap:10px;align-items:center;')}><i className="ti ti-check" style={sx('color:var(--accent);flex-shrink:0;')}></i>{j}</div>
            ))}
          </div>
          <p style={sx('font-size:15px;color:var(--muted);font-weight:600;line-height:1.6;margin:40px 0 0;')}>{sobreEcossistema.fechamento}</p>
        </div>
      </section>

      <section id="parceiros" style={sx('padding:104px clamp(20px,5vw,64px);background:var(--bg-alt);')}>
        <div style={sx('max-width:1180px;margin:0 auto;')}>
          <div style={sx('max-width:680px;margin:0 auto 72px;text-align:center;')}>
            <div style={sx('font-size:13px;letter-spacing:0.08em;text-transform:uppercase;color:var(--accent);font-weight:700;margin-bottom:12px;')}>Ecossistema</div>
            <h2 style={sx("font-family:'Space Grotesk',sans-serif;font-size:clamp(28px,3.5vw,38px);font-weight:700;margin:0 0 16px;")}>Uma rede de parceiros para impulsionar empresas e profissionais de forma integral</h2>
            <p style={sx('font-size:16px;color:var(--muted);line-height:1.6;margin:0;')}>Além de todo o conhecimento e experiência do Eduardo Kayser, ele conecta empresas e profissionais a parceiros especializados que integram o Ecossistema LUCIDEZ.</p>
          </div>
          <div style={sx('display:flex;align-items:stretch;gap:16px;')}>
            <button onClick={prevPartners} aria-label="Parceiros anteriores" style={sx('flex-shrink:0;width:44px;height:44px;align-self:center;border-radius:999px;border:1px solid var(--line);background:var(--surface);color:var(--ink);cursor:pointer;font-size:18px;display:flex;align-items:center;justify-content:center;')}><i className="ti ti-chevron-left"></i></button>
            <div className={partnersPageItems.length === 1 ? 'partners-grid partners-single' : 'partners-grid'} style={sx('flex:1;gap:24px;min-width:0;')}>
              {partnersPageItems.map(p => (
                <div key={p.id} style={sx('background:var(--surface);border:1px solid var(--line);border-radius:12px;padding:28px;text-align:center;display:flex;flex-direction:column;')}>
                  <div style={sx('width:140px;height:140px;margin:0 auto 24px;border-radius:999px;overflow:hidden;flex-shrink:0;')}>
                    {p.photo ? <RealPhoto src={p.photo} alt={p.name} objectPosition={p.photoPosition || 'top'} /> : <ImagePlaceholder label="Foto do parceiro" shape="circle" />}
                  </div>
                  <div style={sx("font-family:'Space Grotesk',sans-serif;font-size:16px;font-weight:600;margin-bottom:6px;")}>{p.name}</div>
                  <div style={sx('font-size:13px;color:var(--accent-strong);font-weight:600;margin-bottom:14px;')}>{p.area}</div>
                  <div style={sx('display:flex;gap:10px;justify-content:center;margin-bottom:18px;')}>
                    {[
                      { key: 'instagram', icon: 'ti-brand-instagram', label: 'Instagram', always: true },
                      { key: 'linkedin', icon: 'ti-brand-linkedin', label: 'LinkedIn' },
                      { key: 'website', icon: 'ti-world', label: 'Site' }
                    ].filter(s => s.always || p[s.key]).map(s => p[s.key] ? (
                      <a key={s.key} href={p[s.key]} target="_blank" rel="noreferrer" aria-label={`${s.label} de ${p.name}`} onClick={() => track(`click_${s.key}`, { partner: p.id })} style={sx('width:36px;height:36px;border-radius:999px;border:1px solid var(--line);background:var(--bg-alt);color:var(--accent);display:flex;align-items:center;justify-content:center;font-size:18px;')}><i className={`ti ${s.icon}`}></i></a>
                    ) : (
                      <span key={s.key} aria-hidden="true" style={sx('width:36px;height:36px;border-radius:999px;border:1px solid var(--line);background:var(--bg-alt);color:var(--muted);opacity:0.6;display:flex;align-items:center;justify-content:center;font-size:18px;')}><i className={`ti ${s.icon}`}></i></span>
                    ))}
                  </div>
                  <div style={sx('display:flex;flex-direction:column;gap:8px;text-align:left;flex:1;')}>
                    {p.bio.map((b, i) => (
                      <p key={i} style={sx('font-size:13px;color:var(--muted);line-height:1.5;margin:0;text-align:justify;')}>{b}</p>
                    ))}
                  </div>
                  <div style={sx('padding-top:24px;')}>
                    <ProposalButton variant="small" params={{ parceiro: p.name }} origin={`parceiro-${p.id}`}>Solicitar proposta</ProposalButton>
                  </div>
                </div>
              ))}
            </div>
            <button onClick={nextPartners} aria-label="Próximos parceiros" style={sx('flex-shrink:0;width:44px;height:44px;align-self:center;border-radius:999px;border:1px solid var(--line);background:var(--surface);color:var(--ink);cursor:pointer;font-size:18px;display:flex;align-items:center;justify-content:center;')}><i className="ti ti-chevron-right"></i></button>
          </div>
          <div style={sx('display:flex;gap:8px;justify-content:center;margin-top:32px;')}>
            {Array.from({ length: totalPartnerPages }, (_, i) => (
              <button key={i} onClick={() => setPartnerPage(i)} aria-label="Ir para página de parceiros" style={{ ...sx('width:9px;height:9px;padding:0;border-radius:999px;border:none;cursor:pointer;background:var(--accent);'), opacity: i === partnerPage ? 1 : 0.3 }}></button>
            ))}
          </div>
        </div>
      </section>

      <section id="resultados" style={sx('padding:104px clamp(20px,5vw,64px);')}>
        <div style={sx('max-width:1180px;margin:0 auto;')}>
          <h2 style={sx("font-family:'Space Grotesk',sans-serif;font-size:clamp(28px,3.5vw,38px);font-weight:700;margin:0 0 48px;text-align:center;")}>Cases e resultados que transformam</h2>
          <div className="results-grid" style={sx('gap:24px;')}>
            {resultados.map((r, i) => (
              <div key={i} style={sx('background:var(--surface);border:1px solid var(--line);border-radius:12px;padding:32px;')}>
                <div style={sx("font-family:'Space Grotesk',sans-serif;font-size:36px;font-weight:700;color:var(--accent);margin-bottom:10px;")}>{r.n}</div>
                {r.titulo && <div style={sx('font-size:15px;font-weight:700;margin-bottom:6px;')}>{r.titulo}</div>}
                <div style={sx('font-size:15px;color:var(--muted);line-height:1.55;')}>{r.label}</div>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section id="depoimentos" style={sx('padding:104px clamp(20px,5vw,64px);background:var(--bg-alt);')}>
        <div style={sx('max-width:1180px;margin:0 auto;')}>
          <h2 style={sx("font-family:'Space Grotesk',sans-serif;font-size:clamp(28px,3.5vw,38px);font-weight:700;margin:0 0 48px;text-align:center;")}>Depoimentos</h2>
          <div style={sx('display:flex;align-items:stretch;gap:16px;')}>
            <button onClick={prevTestimonials} aria-label="Depoimentos anteriores" style={sx('flex-shrink:0;width:44px;height:44px;align-self:center;border-radius:999px;border:1px solid var(--line);background:var(--surface);color:var(--ink);cursor:pointer;font-size:18px;display:flex;align-items:center;justify-content:center;')}><i className="ti ti-chevron-left"></i></button>
            <div className="testimonials-grid" style={sx('flex:1;gap:24px;min-width:0;')}>
              {depoimentos.map((d, i) => (
                <div key={i} style={sx('background:var(--surface);border:1px solid var(--line);border-radius:12px;padding:32px;display:flex;flex-direction:column;gap:20px;min-height:280px;')}>
                  <i className="ti ti-quote" style={sx('font-size:24px;color:var(--accent);')}></i>
                  <p style={sx('font-size:15px;line-height:1.5;color:var(--muted);font-style:italic;margin:0;flex:1;overflow:hidden;text-align:justify;padding-right:3px;')}>{d.text}</p>
                  <div style={sx('font-size:14px;font-weight:600;color:var(--muted);border-top:1px solid var(--line);padding-top:16px;')}>{d.who}</div>
                </div>
              ))}
            </div>
            <button onClick={nextTestimonials} aria-label="Próximos depoimentos" style={sx('flex-shrink:0;width:44px;height:44px;align-self:center;border-radius:999px;border:1px solid var(--line);background:var(--surface);color:var(--ink);cursor:pointer;font-size:18px;display:flex;align-items:center;justify-content:center;')}><i className="ti ti-chevron-right"></i></button>
          </div>
          <div style={sx('display:flex;gap:8px;justify-content:center;margin-top:28px;')}>
            {Array.from({ length: totalPages }, (_, i) => (
              <button key={i} onClick={() => setTestimonialPage(i)} aria-label="Ir para página de depoimentos" style={{ ...sx('width:9px;height:9px;padding:0;border-radius:999px;border:none;cursor:pointer;background:var(--accent);'), opacity: i === testimonialPage ? 1 : 0.3 }}></button>
            ))}
          </div>
        </div>
      </section>

      <section style={sx('padding:104px clamp(20px,5vw,64px);text-align:center;')}>
        <div style={sx('max-width:560px;margin:0 auto;')}>
          <h2 style={sx("font-family:'Space Grotesk',sans-serif;font-size:clamp(28px,3.5vw,38px);font-weight:700;margin:0 0 16px;")}>Agende uma reunião comigo</h2>
          <p style={sx('font-size:16px;color:var(--muted);line-height:1.6;margin:0 0 32px;')}>Escolha o melhor horário na minha agenda e vamos conversar sobre o seu contexto.</p>
          <a href={AGENDA_URL} onClick={() => track('generate_lead', { method: 'agenda', origin: 'secao-agenda' })} target="_blank" rel="noreferrer" style={sx('border-radius:999px;padding:17px 32px;background:var(--accent);color:var(--on-accent);font-size:16px;font-weight:600;display:inline-flex;align-items:center;gap:8px;')}><i className="ti ti-calendar-event"></i>Agendar no Google Agenda</a>
        </div>
      </section>

      <section id="conteudos" style={sx('padding:104px clamp(20px,5vw,64px);background:var(--bg-alt);')}>
        <div style={sx('max-width:1180px;margin:0 auto;')}>
          <h2 style={sx("font-family:'Space Grotesk',sans-serif;font-size:clamp(28px,3.5vw,38px);font-weight:700;margin:0 0 48px;text-align:center;")}>Conteúdos</h2>
          {posts.length > 0 ? (
            <div className="posts-grid" style={sx('gap:24px;')}>
              {posts.map(p => <PostCard key={p._id} post={p} />)}
            </div>
          ) : (
            <p style={sx('font-size:16px;color:var(--muted);text-align:center;margin:0;')}>Novos artigos em breve.</p>
          )}
          <div style={sx('text-align:center;margin-top:48px;')}>
            <Link href="/blog" style={sx('border-radius:999px;padding:14px 26px;background:var(--surface);border:1px solid var(--line);color:var(--ink);font-size:15px;font-weight:600;display:inline-flex;align-items:center;gap:8px;')}>Ver todos os artigos <i className="ti ti-arrow-right"></i></Link>
          </div>
        </div>
      </section>

      <section id="cta-final" style={{ ...sx('padding:96px clamp(20px,5vw,64px);text-align:center;'), backgroundColor: '#0B1730', backgroundImage: noise, backgroundBlendMode: 'overlay' }}>
        <div style={sx('max-width:640px;margin:0 auto;')}>
          <h2 style={sx("font-family:'Space Grotesk',sans-serif;font-size:clamp(28px,4vw,42px);font-weight:700;color:#FFFFFF;margin:0 0 36px;")}>Vamos construir o seu próximo case?</h2>
          <div style={sx('display:flex;gap:16px;justify-content:center;flex-wrap:wrap;')}>
            <a href={waLink()} onClick={() => track('generate_lead', { method: 'whatsapp', origin: 'cta-final' })} style={sx('border-radius:999px;padding:16px 30px;background:var(--accent);color:var(--on-accent);font-size:16px;font-weight:600;display:inline-flex;align-items:center;gap:8px;')}><i className="ti ti-brand-whatsapp"></i>Falar no WhatsApp</a>
            <a href="https://linkedin.com/in/eduardokayser" onClick={() => track('click_linkedin', { origin: 'cta-final' })} style={sx('border-radius:999px;padding:16px 30px;background:transparent;border:1px solid rgba(255,255,255,0.3);color:#FFFFFF;font-size:16px;font-weight:600;display:inline-flex;align-items:center;gap:8px;')}><i className="ti ti-brand-linkedin"></i>Conectar no LinkedIn</a>
          </div>
        </div>
      </section>

      <SiteFooter origin="home" />
    </div>
  );
}

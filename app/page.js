'use client';
import { useState } from 'react';
import { sx } from '../lib/sx';
import ImagePlaceholder from '../components/ImagePlaceholder';
import RealPhoto from '../components/RealPhoto';
import CountUp from '../components/CountUp';
import InView from '../components/InView';
import {
  depoimentos as allDepoimentos, formacaoList, resultados, posts, marcas,
  parceiros, comoFunciona, pdl, heroContent, lucidezProfissional, lucidezOrganizacoes,
  sobreEcossistema, sobreEduardo
} from '../lib/data';

const noise = "url('data:image/svg+xml,%3Csvg xmlns=%22http://www.w3.org/2000/svg%22 width=%22200%22 height=%22200%22%3E%3Cfilter id=%22n%22%3E%3CfeTurbulence type=%22fractalNoise%22 baseFrequency=%220.9%22 numOctaves=%222%22 stitchTiles=%22stitch%22/%3E%3C/filter%3E%3Crect width=%22100%25%22 height=%22100%25%22 filter=%22url(%23n)%22 opacity=%220.09%22/%3E%3C/svg%3E')";

export default function Home() {
  const [theme, setTheme] = useState('light');
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [testimonialPage, setTestimonialPage] = useState(0);
  const [partnerPage, setPartnerPage] = useState(0);

  const isDark = theme === 'dark';
  const c = isDark ? {
    bg: '#0B1526', bgAlt: '#101D34', surface: '#13203B', ink: '#EEF1F7',
    muted: '#9FAAC4', line: '#243252', accent: '#5B8CFF', accentRgb: '91,140,255', onAccent: '#FFFFFF', accentStrong: '#BFD3FF'
  } : {
    bg: '#F3F5F9', bgAlt: '#E7EBF2', surface: '#FBFCFE', ink: '#0E1B3D',
    muted: '#586181', line: '#D7DCE6', accent: '#2F5FDE', accentRgb: '47,95,222', onAccent: '#FFFFFF', accentStrong: '#1B3A8A'
  };

  const rootVars = {
    '--bg': c.bg, '--bg-alt': c.bgAlt, '--surface': c.surface, '--ink': c.ink,
    '--muted': c.muted, '--line': c.line, '--accent': c.accent, '--accent-rgb': c.accentRgb, '--on-accent': c.onAccent,
    '--accent-strong': c.accentStrong,
    background: 'var(--bg)', color: 'var(--ink)', fontFamily: "'Public Sans',sans-serif",
    minHeight: '100vh', transition: 'background .25s,color .25s'
  };

  const toggleTheme = () => setTheme(t => t === 'light' ? 'dark' : 'light');

  const totalPages = Math.ceil(allDepoimentos.length / 3);
  const depoimentos = allDepoimentos.slice(testimonialPage * 3, testimonialPage * 3 + 3);
  const prevTestimonials = () => setTestimonialPage(p => (p - 1 + totalPages) % totalPages);
  const nextTestimonials = () => setTestimonialPage(p => (p + 1) % totalPages);

  const totalPartnerPages = Math.ceil(parceiros.length / 3);
  const partnersPageItems = parceiros.slice(partnerPage * 3, partnerPage * 3 + 3);
  const prevPartners = () => setPartnerPage(p => (p - 1 + totalPartnerPages) % totalPartnerPages);
  const nextPartners = () => setPartnerPage(p => (p + 1) % totalPartnerPages);

  return (
    <div style={rootVars}>
      <a href="https://wa.me/5551991019459" target="_blank" rel="noreferrer" aria-label="Falar no WhatsApp" style={sx('position:fixed;bottom:24px;right:24px;z-index:60;width:60px;height:60px;border-radius:999px;background:#25D366;color:#FFFFFF;display:flex;align-items:center;justify-content:center;font-size:30px;box-shadow:0 10px 28px rgba(0,0,0,0.25);')}>
        <i className="ti ti-brand-whatsapp"></i>
      </a>

      <nav style={sx('position:sticky;top:0;z-index:50;display:flex;align-items:center;gap:12px;padding:16px clamp(16px,3vw,48px);background:var(--bg);border-bottom:1px solid var(--line);')}>
        <div style={sx("font-family:'Space Grotesk',sans-serif;font-weight:700;font-size:18px;white-space:nowrap;flex-shrink:0;")}>LUCIDEZ</div>
        <div className={mobileMenuOpen ? 'nav-links open' : 'nav-links'} style={sx('gap:16px;align-items:center;justify-content:center;flex:1;min-width:0;')}>
          <a href="#sobre-ecossistema" onClick={() => setMobileMenuOpen(false)} style={sx('font-size:13px;color:var(--ink);font-weight:500;white-space:nowrap;')}>Sobre</a>
          <a href="#lucidez-profissional" onClick={() => setMobileMenuOpen(false)} style={sx('font-size:13px;color:var(--ink);font-weight:500;white-space:nowrap;')}>Profissional</a>
          <a href="#lucidez-organizacoes" onClick={() => setMobileMenuOpen(false)} style={sx('font-size:13px;color:var(--ink);font-weight:500;white-space:nowrap;')}>Organizações</a>
          <a href="#como-funciona" onClick={() => setMobileMenuOpen(false)} style={sx('font-size:13px;color:var(--ink);font-weight:500;white-space:nowrap;')}>Método</a>
          <a href="#parceiros" onClick={() => setMobileMenuOpen(false)} style={sx('font-size:13px;color:var(--ink);font-weight:500;white-space:nowrap;')}>Parceiros</a>
        </div>
        <div style={sx('display:flex;align-items:center;gap:8px;flex-shrink:0;')}>
          <button onClick={toggleTheme} aria-label="Alternar tema" style={sx('width:36px;height:36px;border-radius:999px;border:1px solid var(--line);background:var(--surface);color:var(--ink);display:flex;align-items:center;justify-content:center;cursor:pointer;font-size:16px;flex-shrink:0;')}>
            <i className={isDark ? 'ti ti-sun' : 'ti ti-moon'}></i>
          </button>
          <a href="#cta-final" style={sx('border-radius:999px;padding:10px 18px;background:var(--accent);color:var(--on-accent);font-size:13px;font-weight:600;white-space:nowrap;flex-shrink:0;')}>Agendar diagnóstico</a>
          <button
            onClick={() => setMobileMenuOpen(o => !o)}
            aria-label="Abrir menu"
            className="nav-toggle"
            style={sx('width:36px;height:36px;border-radius:999px;border:1px solid var(--line);background:var(--surface);color:var(--ink);align-items:center;justify-content:center;cursor:pointer;font-size:18px;flex-shrink:0;')}
          >
            <i className={mobileMenuOpen ? 'ti ti-x' : 'ti ti-menu-2'}></i>
          </button>
        </div>
      </nav>

      <header className="hero-grid" style={sx('padding:96px clamp(20px,5vw,64px) 80px;gap:56px;align-items:center;max-width:1280px;margin:0 auto;')}>
        <div>
          <h1 style={sx("font-family:'Space Grotesk',sans-serif;font-size:clamp(34px,4.6vw,52px);font-weight:700;line-height:1.15;margin:0 0 24px;")}>{heroContent.headline}</h1>
          <p style={sx('font-size:18px;color:var(--muted);line-height:1.6;margin:0 0 36px;max-width:560px;')}>{heroContent.subheadline}</p>
          <div style={sx('display:flex;gap:16px;flex-wrap:wrap;')}>
            <a href="#lucidez-profissional" style={sx('border-radius:999px;padding:16px 28px;background:var(--accent);color:var(--on-accent);font-size:15px;font-weight:600;display:inline-flex;align-items:center;gap:8px;')}>Quero crescer profissionalmente <i className="ti ti-arrow-right"></i></a>
            <a href="#lucidez-organizacoes" style={sx('border-radius:999px;padding:16px 28px;background:var(--surface);border:1px solid var(--line);color:var(--ink);font-size:15px;font-weight:600;display:inline-flex;align-items:center;gap:8px;')}>Quero transformar minha organização <i className="ti ti-arrow-right"></i></a>
          </div>
        </div>
        <div style={sx('width:100%;aspect-ratio:4/5;border-radius:12px;overflow:hidden;')}>
          <RealPhoto src="/eduardo/hero.jpg" alt="Eduardo Kayser" priority />
        </div>
      </header>

      <section style={sx('padding:72px clamp(20px,5vw,64px);')}>
        <div className="stats-grid" style={sx('max-width:1180px;margin:0 auto;gap:24px;text-align:center;')}>
          <div><div style={sx("font-family:'Space Grotesk',sans-serif;font-size:clamp(28px,6vw,44px);font-weight:700;color:var(--accent);")}><CountUp to={25} suffix="+" /></div><div style={sx('font-size:15px;color:var(--muted);margin-top:8px;')}>anos de experiência</div></div>
          <div><div style={sx("font-family:'Space Grotesk',sans-serif;font-size:clamp(28px,6vw,44px);font-weight:700;color:var(--accent);")}><CountUp to={1200} suffix="+" /></div><div style={sx('font-size:15px;color:var(--muted);margin-top:8px;')}>líderes treinados</div></div>
          <div><div style={sx("font-family:'Space Grotesk',sans-serif;font-size:clamp(28px,6vw,44px);font-weight:700;color:var(--accent);")}><CountUp to={17} /></div><div style={sx('font-size:15px;color:var(--muted);margin-top:8px;')}>prêmios nacionais</div></div>
        </div>
      </section>

      <section id="lucidez-profissional" style={sx('padding:104px clamp(20px,5vw,64px);background:var(--bg-alt);')}>
        <div style={sx('max-width:1180px;margin:0 auto;')}>
          <div style={sx('max-width:720px;margin:0 auto 64px;text-align:center;')}>
            <div style={sx('font-size:13px;letter-spacing:0.08em;text-transform:uppercase;color:var(--accent);font-weight:700;margin-bottom:16px;')}>Lucidez Profissional</div>
            <p style={sx('font-size:16px;color:var(--muted);line-height:1.6;margin:0 0 20px;')}>{lucidezProfissional.chapeu}</p>
            <h2 style={sx("font-family:'Space Grotesk',sans-serif;font-size:clamp(26px,3.2vw,34px);font-weight:700;margin:0 0 16px;")}>{lucidezProfissional.titulo}</h2>
            <p style={sx('font-size:16px;color:var(--muted);line-height:1.6;margin:0;')}>{lucidezProfissional.texto}</p>
          </div>
          <div className="solucoes-cards" style={sx('gap:20px;max-width:1000px;margin:0 auto;')}>
            {lucidezProfissional.solucoes.map((s, i) => (
              <div key={i} className="solucao-card" style={sx('background:var(--surface);border:1px solid var(--line);border-radius:14px;padding:22px 24px;display:flex;align-items:center;gap:16px;')}>
                <div style={sx('width:44px;height:44px;border-radius:999px;background:var(--bg-alt);display:flex;align-items:center;justify-content:center;flex-shrink:0;')}>
                  <i className="ti ti-check" style={sx('color:var(--accent);font-size:20px;')}></i>
                </div>
                <div style={sx('font-size:18px;font-weight:600;line-height:1.3;')}>{s}</div>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section id="lucidez-organizacoes" style={sx('padding:104px clamp(20px,5vw,64px);')}>
        <div style={sx('max-width:1180px;margin:0 auto;')}>
          <div style={sx('max-width:720px;margin:0 auto 64px;text-align:center;')}>
            <div style={sx('font-size:13px;letter-spacing:0.08em;text-transform:uppercase;color:var(--accent);font-weight:700;margin-bottom:16px;')}>Lucidez Organizações</div>
            <h2 style={sx("font-family:'Space Grotesk',sans-serif;font-size:clamp(26px,3.2vw,34px);font-weight:700;margin:0 0 16px;")}>{lucidezOrganizacoes.titulo}</h2>
            <p style={sx('font-size:16px;color:var(--muted);line-height:1.6;margin:0;')}>{lucidezOrganizacoes.texto}</p>
          </div>
          <div style={sx('display:flex;flex-direction:column;max-width:820px;margin:0 auto 40px;')}>
            {lucidezOrganizacoes.frentes.map((f, i) => (
              <div key={i} style={sx('display:flex;gap:24px;align-items:flex-start;padding:20px 0;border-bottom:1px solid var(--line);')}>
                <div style={sx("font-family:'Space Grotesk',sans-serif;font-size:20px;font-weight:700;color:var(--accent);flex-shrink:0;width:36px;")}>{String(i + 1).padStart(2, '0')}</div>
                <div style={sx('font-size:16px;line-height:1.5;padding-top:2px;')}>{f}</div>
              </div>
            ))}
          </div>
          <p style={sx('font-size:14px;color:var(--muted);font-style:italic;text-align:center;max-width:720px;margin:0 auto;')}>{lucidezOrganizacoes.rodape}</p>
        </div>
      </section>

      <section id="sobre-eduardo" style={sx('padding:104px clamp(20px,5vw,64px);background:var(--bg-alt);')}>
        <div className="about-grid" style={sx('max-width:1180px;margin:0 auto;gap:56px;align-items:center;')}>
          <div style={sx('width:100%;aspect-ratio:1/1;border-radius:12px;overflow:hidden;')}>
            <RealPhoto src="/eduardo/sobre.jpg" alt="Eduardo Kayser" />
          </div>
          <div>
            <div style={sx('font-size:13px;letter-spacing:0.08em;text-transform:uppercase;color:var(--accent);font-weight:700;margin-bottom:12px;')}>Eduardo Kayser</div>
            <h2 style={sx("font-family:'Space Grotesk',sans-serif;font-size:clamp(26px,3.2vw,34px);font-weight:700;margin:0 0 20px;")}>{sobreEduardo.titulo}</h2>
            {sobreEduardo.paragrafos.map((p, i) => (
              <p key={i} style={sx('font-size:15px;color:var(--muted);line-height:1.65;margin:0 0 14px;')}>{p}</p>
            ))}
            <ul style={sx('margin:20px 0 28px;padding:0;list-style:none;display:flex;flex-direction:column;gap:12px;')}>
              {sobreEduardo.destaques.map((d, i) => (
                <li key={i} style={sx('font-size:15px;line-height:1.5;display:flex;gap:10px;')}><i className="ti ti-check" style={sx('color:var(--accent);flex-shrink:0;margin-top:3px;')}></i>{d}</li>
              ))}
            </ul>
            <a href="#resultados" style={sx('border-radius:999px;padding:14px 26px;background:var(--accent);color:var(--on-accent);font-size:15px;font-weight:600;display:inline-flex;align-items:center;gap:8px;')}>Conheça minha trajetória <i className="ti ti-arrow-right"></i></a>
          </div>
        </div>
      </section>

      <section id="como-funciona" style={sx('padding:104px clamp(20px,5vw,64px);')}>
        <div style={sx('max-width:1180px;margin:0 auto;')}>
          <div style={sx('max-width:640px;margin:0 auto 72px;text-align:center;')}>
            <div style={sx('font-size:13px;letter-spacing:0.08em;text-transform:uppercase;color:var(--accent);font-weight:700;margin-bottom:12px;')}>Meu trabalho</div>
            <h2 style={sx("font-family:'Space Grotesk',sans-serif;font-size:clamp(28px,3.5vw,38px);font-weight:700;margin:0 0 16px;")}>Como o método funciona</h2>
            <p style={sx('font-size:16px;color:var(--muted);line-height:1.6;margin:0;')}>Empresas não crescem por acaso. Crescem quando existe um sistema de gestão.</p>
          </div>
          <InView className="steps-track">
            <div className="steps-line"></div>
            <div className="steps-progress"></div>
            <div className="pdl-steps" style={sx('gap:16px;')}>
              {comoFunciona.map((step, i) => (
                <div key={step.n} style={sx('text-align:center;position:relative;z-index:2;')}>
                  <div className={i === comoFunciona.length - 1 ? 'step-circle-last' : ''} style={sx('width:40px;height:40px;border-radius:999px;background:var(--accent);color:var(--on-accent);display:flex;align-items:center;justify-content:center;font-weight:700;margin:0 auto 12px;')}>{step.n}</div>
                  <div style={sx('font-size:14px;font-weight:600;')}>{step.label}</div>
                </div>
              ))}
            </div>
          </InView>

          <div style={sx('margin-top:64px;')}>
            <div style={sx('max-width:640px;margin:0 auto 32px;text-align:center;')}>
              <div style={sx('font-size:13px;letter-spacing:0.08em;text-transform:uppercase;color:var(--accent);font-weight:700;margin-bottom:12px;')}>PDL</div>
              <h3 style={sx("font-family:'Space Grotesk',sans-serif;font-size:clamp(24px,3vw,30px);font-weight:700;margin:0 0 16px;")}>{pdl.titulo}</h3>
              <p style={sx('font-size:16px;color:var(--muted);line-height:1.6;margin:0 0 8px;')}>{pdl.texto}</p>
              <p style={sx("font-size:16px;font-weight:600;margin:16px 0 0;")}>{pdl.subtitulo}</p>
            </div>
            <div className="results-grid" style={sx('gap:24px;margin-bottom:20px;')}>
              {pdl.indicadores.map((ind, i) => (
                <div key={i} style={sx('background:var(--surface);border:1px solid var(--line);border-radius:12px;padding:28px;text-align:center;')}>
                  <div style={sx("font-family:'Space Grotesk',sans-serif;font-size:32px;font-weight:700;color:var(--accent);margin-bottom:8px;")}>{ind.valor}</div>
                  <div style={sx('font-size:14px;color:var(--muted);')}>{ind.label}</div>
                </div>
              ))}
            </div>
            <div style={sx('display:flex;flex-wrap:wrap;gap:12px 32px;justify-content:center;')}>
              {pdl.indicadoresQualitativos.map((q, i) => (
                <div key={i} style={sx('font-size:15px;font-weight:600;display:flex;gap:8px;align-items:center;')}><i className="ti ti-trending-up" style={sx('color:var(--accent);')}></i>{q}</div>
              ))}
            </div>
          </div>
        </div>
      </section>

      <section id="sobre-ecossistema" style={sx('padding:104px clamp(20px,5vw,64px);background:var(--bg-alt);')}>
        <div style={sx('max-width:900px;margin:0 auto;')}>
          <h2 style={sx("font-family:'Space Grotesk',sans-serif;font-size:clamp(26px,3.2vw,34px);font-weight:700;margin:0 0 40px;text-align:center;")}>{sobreEcossistema.titulo}</h2>
          {sobreEcossistema.paragrafos.map((p, i) => (
            <p key={i} style={sx('font-size:16px;color:var(--muted);line-height:1.7;margin:0 0 24px;')}>{p}</p>
          ))}
          <div style={sx('margin-top:48px;text-align:center;')}>
            <p style={sx("font-family:'Space Grotesk',sans-serif;font-size:18px;font-weight:600;margin:0 0 24px;")}>{sobreEcossistema.subtitulo}</p>
            <div className="lucidez-list" style={sx('gap:14px 32px;text-align:left;')}>
              {sobreEcossistema.jornada.map((j, i) => (
                <div key={i} style={sx('font-size:16px;display:flex;gap:10px;align-items:center;')}><i className="ti ti-check" style={sx('color:var(--accent);flex-shrink:0;')}></i>{j}</div>
              ))}
            </div>
          </div>
          <p style={sx('font-size:16px;font-weight:600;line-height:1.7;margin:48px 0 0;text-align:center;')}>{sobreEcossistema.fechamento}</p>
        </div>
      </section>

      <section id="parceiros" style={sx('padding:104px clamp(20px,5vw,64px);')}>
        <div style={sx('max-width:1180px;margin:0 auto;')}>
          <div style={sx('max-width:640px;margin:0 auto 72px;text-align:center;')}>
            <div style={sx('font-size:13px;letter-spacing:0.08em;text-transform:uppercase;color:var(--accent);font-weight:700;margin-bottom:12px;')}>Ecossistema</div>
            <h2 style={sx("font-family:'Space Grotesk',sans-serif;font-size:clamp(28px,3.5vw,38px);font-weight:700;margin:0 0 16px;")}>Uma rede de parceiros para apoiar líderes de forma integral</h2>
            <p style={sx('font-size:16px;color:var(--muted);line-height:1.6;margin:0;')}>Além da consultoria estratégica, Eduardo conecta empresas e líderes a profissionais especializados que integram o Ecossistema LUCIDEZ.</p>
          </div>
          <div style={sx('display:flex;align-items:stretch;gap:16px;')}>
            <button onClick={prevPartners} aria-label="Parceiros anteriores" style={sx('flex-shrink:0;width:44px;height:44px;align-self:center;border-radius:999px;border:1px solid var(--line);background:var(--surface);color:var(--ink);cursor:pointer;font-size:18px;display:flex;align-items:center;justify-content:center;')}><i className="ti ti-chevron-left"></i></button>
            <div className="partners-grid" style={sx('flex:1;gap:24px;min-width:0;')}>
              {partnersPageItems.map(p => (
                <div key={p.id} style={sx('background:var(--surface);border:1px solid var(--line);border-radius:12px;padding:28px;text-align:center;')}>
                  <div style={sx('width:140px;height:140px;margin:0 auto 24px;border-radius:999px;overflow:hidden;')}>
                    {p.photo ? <RealPhoto src={p.photo} alt={p.name} /> : <ImagePlaceholder label="Foto do parceiro" shape="circle" />}
                  </div>
                  <div style={sx("font-family:'Space Grotesk',sans-serif;font-size:16px;font-weight:600;margin-bottom:6px;")}>{p.name}</div>
                  <div style={sx('font-size:13px;color:var(--accent-strong);font-weight:600;margin-bottom:14px;')}>{p.area}</div>
                  <div style={sx('display:flex;flex-direction:column;gap:8px;text-align:left;')}>
                    {p.bio.map((b, i) => (
                      <p key={i} style={sx('font-size:13px;color:var(--muted);line-height:1.5;margin:0;')}>{b}</p>
                    ))}
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

      <section style={sx('padding:72px clamp(20px,5vw,64px);background:var(--bg-alt);')}>
        <div style={sx('max-width:1180px;margin:0 auto;')}>
          <div style={sx('font-size:13px;letter-spacing:0.06em;text-transform:uppercase;color:var(--muted);font-weight:700;text-align:center;margin-bottom:32px;')}>Formação e afiliações</div>
          <div style={sx('display:flex;flex-wrap:wrap;gap:32px 48px;justify-content:center;align-items:center;')}>
            {formacaoList.map((item, i) => (
              <div key={i} style={sx('width:120px;height:48px;')}>
                <ImagePlaceholder label={item} shape="rect" />
              </div>
            ))}
          </div>
        </div>
      </section>

      <section id="resultados" style={sx('padding:104px clamp(20px,5vw,64px);')}>
        <div style={sx('max-width:1180px;margin:0 auto;')}>
          <h2 style={sx("font-family:'Space Grotesk',sans-serif;font-size:clamp(28px,3.5vw,38px);font-weight:700;margin:0 0 48px;text-align:center;")}>Resultados que transformam</h2>
          <div className="results-grid" style={sx('gap:24px;')}>
            {resultados.map((r, i) => (
              <div key={i} style={sx('background:var(--surface);border:1px solid var(--line);border-radius:12px;padding:32px;')}>
                <div style={sx("font-family:'Space Grotesk',sans-serif;font-size:36px;font-weight:700;color:var(--accent);margin-bottom:10px;")}>{r.n}</div>
                <div style={sx('font-size:15px;color:var(--muted);')}>{r.label}</div>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section style={sx('padding:104px clamp(20px,5vw,64px);background:var(--bg-alt);')}>
        <div style={sx('max-width:1180px;margin:0 auto;')}>
          <div style={sx('font-size:13px;letter-spacing:0.06em;text-transform:uppercase;color:var(--muted);font-weight:700;text-align:center;margin-bottom:24px;')}>Marcas que confiam no Eduardo Kayser</div>
          <div className="marquee-wrap" style={sx('margin-bottom:56px;')}>
            <div className="marquee-track">
              {[...marcas, ...marcas].map((m, i) => (
                <div key={i} style={sx('flex-shrink:0;width:140px;height:56px;margin:0 20px;')}>
                  <RealPhoto src={`/marcas/${m.file}`} alt={m.name} fit="contain" />
                </div>
              ))}
            </div>
          </div>
          <h2 style={sx("font-family:'Space Grotesk',sans-serif;font-size:clamp(28px,3.5vw,38px);font-weight:700;margin:0 0 48px;text-align:center;")}>O que dizem sobre o trabalho</h2>
          <div style={sx('display:flex;align-items:stretch;gap:16px;')}>
            <button onClick={prevTestimonials} aria-label="Depoimentos anteriores" style={sx('flex-shrink:0;width:44px;height:44px;align-self:center;border-radius:999px;border:1px solid var(--line);background:var(--surface);color:var(--ink);cursor:pointer;font-size:18px;display:flex;align-items:center;justify-content:center;')}><i className="ti ti-chevron-left"></i></button>
            <div className="testimonials-grid" style={sx('flex:1;gap:24px;min-width:0;')}>
              {depoimentos.map((d, i) => (
                <div key={i} style={sx('background:var(--surface);border:1px solid var(--line);border-radius:12px;padding:32px;display:flex;flex-direction:column;gap:20px;min-height:280px;')}>
                  <i className="ti ti-quote" style={sx('font-size:24px;color:var(--accent);')}></i>
                  <p style={sx('font-size:15px;line-height:1.5;color:var(--muted);font-style:italic;margin:0;flex:1;overflow:hidden;')}>{d.text}</p>
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
          <a href="https://calendar.google.com/calendar/appointments/schedules/EDUARDO-KAYSER" target="_blank" rel="noreferrer" style={sx('border-radius:999px;padding:17px 32px;background:var(--accent);color:var(--on-accent);font-size:16px;font-weight:600;display:inline-flex;align-items:center;gap:8px;')}><i className="ti ti-calendar-event"></i>Agendar no Google Agenda</a>
        </div>
      </section>

      <section id="conteudos" style={sx('padding:104px clamp(20px,5vw,64px);background:var(--bg-alt);')}>
        <div style={sx('max-width:1180px;margin:0 auto;')}>
          <h2 style={sx("font-family:'Space Grotesk',sans-serif;font-size:clamp(28px,3.5vw,38px);font-weight:700;margin:0 0 48px;text-align:center;")}>Conteúdos</h2>
          <div className="posts-grid" style={sx('gap:24px;')}>
            {posts.map(p => (
              <div key={p.id} style={sx('background:var(--surface);border:1px solid var(--line);border-radius:12px;overflow:hidden;')}>
                <div style={sx('width:100%;aspect-ratio:16/9;')}>
                  <ImagePlaceholder label={p.imgLabel} shape="rect" />
                </div>
                <div style={sx('padding:28px;')}>
                  <div style={sx('display:inline-block;font-size:12px;font-weight:700;letter-spacing:0.04em;text-transform:uppercase;color:var(--accent-strong);background:var(--bg-alt);border-radius:999px;padding:6px 14px;margin-bottom:16px;')}>{p.tag}</div>
                  <h3 style={sx("font-family:'Space Grotesk',sans-serif;font-size:20px;font-weight:600;margin:0 0 10px;")}>{p.title}</h3>
                  <p style={sx('font-size:15px;color:var(--muted);margin:0;line-height:1.5;')}>{p.excerpt}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section id="cta-final" style={{ ...sx('padding:96px clamp(20px,5vw,64px);text-align:center;'), backgroundColor: '#0B1730', backgroundImage: noise, backgroundBlendMode: 'overlay' }}>
        <div style={sx('max-width:640px;margin:0 auto;')}>
          <h2 style={sx("font-family:'Space Grotesk',sans-serif;font-size:clamp(28px,4vw,42px);font-weight:700;color:#FFFFFF;margin:0 0 36px;")}>Vamos construir o seu próximo case?</h2>
          <div style={sx('display:flex;gap:16px;justify-content:center;flex-wrap:wrap;')}>
            <a href="https://wa.me/5551991019459" style={sx('border-radius:999px;padding:16px 30px;background:var(--accent);color:var(--on-accent);font-size:16px;font-weight:600;display:inline-flex;align-items:center;gap:8px;')}><i className="ti ti-brand-whatsapp"></i>Falar no WhatsApp</a>
            <a href="https://linkedin.com/in/eduardokayser" style={sx('border-radius:999px;padding:16px 30px;background:transparent;border:1px solid rgba(255,255,255,0.3);color:#FFFFFF;font-size:16px;font-weight:600;display:inline-flex;align-items:center;gap:8px;')}><i className="ti ti-brand-linkedin"></i>Conectar no LinkedIn</a>
          </div>
        </div>
      </section>

      <footer style={sx('padding:48px clamp(20px,5vw,64px);display:flex;justify-content:space-between;align-items:center;flex-wrap:wrap;gap:20px;')}>
        <div style={sx('display:flex;align-items:center;gap:24px;flex-wrap:wrap;')}>
          <div style={sx("font-family:'Space Grotesk',sans-serif;font-weight:700;font-size:17px;")}>Ecossistema LUCIDEZ — Eduardo Kayser</div>
          <a href="#parceiros" style={sx('font-size:14px;color:var(--muted);')}>Ecossistema de parceiros</a>
        </div>
        <div style={sx('display:flex;gap:18px;align-items:center;')}>
          <a href="https://instagram.com/soueduardokayser" style={sx('color:var(--muted);font-size:19px;')}><i className="ti ti-brand-instagram"></i></a>
          <a href="https://linkedin.com/in/eduardokayser" style={sx('color:var(--muted);font-size:19px;')}><i className="ti ti-brand-linkedin"></i></a>
          <a href="https://youtube.com/@soueduardokayser" style={sx('color:var(--muted);font-size:19px;')}><i className="ti ti-brand-youtube"></i></a>
          <a href="https://wa.me/5551991019459" style={sx('color:var(--muted);font-size:19px;')}><i className="ti ti-brand-whatsapp"></i></a>
        </div>
      </footer>
    </div>
  );
}

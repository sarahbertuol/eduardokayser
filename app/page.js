'use client';
import { useState } from 'react';
import { sx } from '../lib/sx';
import ImagePlaceholder from '../components/ImagePlaceholder';
import CountUp from '../components/CountUp';
import InView from '../components/InView';
import {
  depoimentos as allDepoimentos, formacaoList, resultados, posts, marcas,
  parceiros, doresEmpresas, doresPessoas, comoFunciona, solucoes, pdlFeatures
} from '../lib/data';

const noise = "url('data:image/svg+xml,%3Csvg xmlns=%22http://www.w3.org/2000/svg%22 width=%22200%22 height=%22200%22%3E%3Cfilter id=%22n%22%3E%3CfeTurbulence type=%22fractalNoise%22 baseFrequency=%220.9%22 numOctaves=%222%22 stitchTiles=%22stitch%22/%3E%3C/filter%3E%3Crect width=%22100%25%22 height=%22100%25%22 filter=%22url(%23n)%22 opacity=%220.09%22/%3E%3C/svg%3E')";

export default function Home() {
  const [theme, setTheme] = useState('light');
  const [audience, setAudience] = useState(null);
  const [preloaderOpen, setPreloaderOpen] = useState(true);
  const [audienceTagVisible, setAudienceTagVisible] = useState(false);
  const [testimonialPage, setTestimonialPage] = useState(0);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

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

  const showPJDores = audience !== 'profissional';
  const showPFDores = audience !== 'empresa';
  const doresGridClass = showPJDores && showPFDores ? 'dores-grid dores-two' : 'dores-grid dores-one';
  const audienceLabel = audience === 'empresa' ? 'empresas' : audience === 'profissional' ? 'você' : '';

  const chooseAudience = (aud) => { setAudience(aud); setPreloaderOpen(false); setAudienceTagVisible(true); };
  const toggleTheme = () => setTheme(t => t === 'light' ? 'dark' : 'light');

  const totalPages = Math.ceil(allDepoimentos.length / 3);
  const depoimentos = allDepoimentos.slice(testimonialPage * 3, testimonialPage * 3 + 3);
  const prevTestimonials = () => setTestimonialPage(p => (p - 1 + totalPages) % totalPages);
  const nextTestimonials = () => setTestimonialPage(p => (p + 1) % totalPages);

  return (
    <div style={rootVars}>
      {preloaderOpen && (
        <div style={sx('position:fixed;inset:0;z-index:100;background:var(--bg);display:flex;align-items:center;justify-content:center;padding:24px;')}>
          <div style={sx('max-width:560px;width:100%;text-align:center;display:flex;flex-direction:column;align-items:center;gap:28px;')}>
            <div style={sx("font-family:'Space Grotesk',sans-serif;font-weight:700;font-size:20px;color:var(--ink);line-height:1.4;")}>Eduardo Kayser - Desenvolvimento de Lideranças</div>
            <h1 style={sx("font-family:'Space Grotesk',sans-serif;font-size:clamp(28px,4vw,40px);font-weight:700;margin:0;line-height:1.25;")}>Você é uma empresa ou um profissional?</h1>
            <div style={sx('display:flex;gap:16px;flex-wrap:wrap;justify-content:center;')}>
              <button onClick={() => chooseAudience('empresa')} style={sx("border:none;border-radius:999px;padding:16px 32px;background:var(--accent);color:var(--on-accent);font-size:17px;font-weight:600;font-family:'Public Sans',sans-serif;cursor:pointer;")}>Sou empresa</button>
              <button onClick={() => chooseAudience('profissional')} style={sx("border:1px solid var(--line);border-radius:999px;padding:16px 32px;background:var(--surface);color:var(--ink);font-size:17px;font-weight:600;font-family:'Public Sans',sans-serif;cursor:pointer;")}>Sou pessoa física</button>
            </div>
          </div>
        </div>
      )}

      <a href="https://wa.me/5551991019459" target="_blank" rel="noreferrer" aria-label="Falar no WhatsApp" style={sx('position:fixed;bottom:24px;right:24px;z-index:60;width:60px;height:60px;border-radius:999px;background:#25D366;color:#FFFFFF;display:flex;align-items:center;justify-content:center;font-size:30px;box-shadow:0 10px 28px rgba(0,0,0,0.25);')}>
        <i className="ti ti-brand-whatsapp"></i>
      </a>

      <nav style={sx('position:sticky;top:0;z-index:50;display:flex;align-items:center;gap:12px;padding:16px clamp(16px,3vw,48px);background:var(--bg);border-bottom:1px solid var(--line);')}>
        <div style={sx("font-family:'Space Grotesk',sans-serif;font-weight:700;font-size:18px;white-space:nowrap;flex-shrink:0;")}>Eduardo Kayser</div>
        <div className={mobileMenuOpen ? 'nav-links open' : 'nav-links'} style={sx('gap:16px;align-items:center;justify-content:center;flex:1;min-width:0;')}>
          <a href="#sobre" onClick={() => setMobileMenuOpen(false)} style={sx('font-size:13px;color:var(--ink);font-weight:500;white-space:nowrap;')}>Sobre</a>
          <a href="#empresas" onClick={() => setMobileMenuOpen(false)} style={sx('font-size:13px;color:var(--ink);font-weight:500;white-space:nowrap;')}>Para Empresas</a>
          <a href="#pf" onClick={() => setMobileMenuOpen(false)} style={sx('font-size:13px;color:var(--ink);font-weight:500;white-space:nowrap;')}>Para Pessoa Física</a>
          <a href="#como-funciona" onClick={() => setMobileMenuOpen(false)} style={sx('font-size:13px;color:var(--ink);font-weight:500;white-space:nowrap;')}>O Método</a>
          <a href="#resultados" onClick={() => setMobileMenuOpen(false)} style={sx('font-size:13px;color:var(--ink);font-weight:500;white-space:nowrap;')}>Cases</a>
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

      {audienceTagVisible && (
        <div style={sx('position:fixed;top:72px;right:16px;left:16px;z-index:40;max-width:260px;margin-left:auto;background:var(--surface);border:1px solid var(--line);border-radius:999px;padding:6px 6px 6px 14px;display:flex;align-items:center;justify-content:space-between;gap:8px;font-size:12px;color:var(--muted);box-shadow:0 8px 20px rgba(0,0,0,0.12);')}>
          <span style={sx('white-space:nowrap;')}>Conteúdo para {audienceLabel}</span>
          <button onClick={() => setPreloaderOpen(true)} style={sx('border:none;background:var(--bg-alt);color:var(--ink);border-radius:999px;padding:5px 10px;font-size:11px;font-weight:600;cursor:pointer;flex-shrink:0;')}>trocar</button>
        </div>
      )}

      <header className="hero-grid" style={sx('padding:96px clamp(20px,5vw,64px) 80px;gap:56px;align-items:center;max-width:1280px;margin:0 auto;')}>
        <div>
          <h1 style={sx("font-family:'Space Grotesk',sans-serif;font-size:clamp(38px,5vw,58px);font-weight:700;line-height:1.12;margin:0 0 24px;")}>Liderança lúcida começa com decisões claras.</h1>
          <p style={sx('font-size:19px;color:var(--muted);line-height:1.6;margin:0 0 36px;max-width:520px;')}>Método LUCIDEZ para líderes e empresas crescerem com clareza, sem sacrificar a saúde.</p>
          <div style={sx('display:flex;align-items:flex-start;')}>
            <a href="#dores" style={sx('border-radius:999px;padding:17px 30px;background:var(--accent);color:var(--on-accent);font-size:16px;font-weight:600;display:inline-flex;align-items:center;gap:8px;')}>{audience === 'empresa' ? 'Este método é para minha empresa?' : 'Este método é para mim?'} <i className="ti ti-arrow-right"></i></a>
          </div>
        </div>
        <div style={sx('width:100%;aspect-ratio:4/5;border-radius:12px;overflow:hidden;')}>
          <ImagePlaceholder label="Foto do Eduardo Kayser (alta resolução)" shape="rounded" radius={12} />
        </div>
      </header>

      <section style={sx('padding:56px clamp(20px,5vw,64px);')}>
        <div className="stats-grid" style={sx('max-width:1180px;margin:0 auto;gap:24px;text-align:center;')}>
          <div><div style={sx("font-family:'Space Grotesk',sans-serif;font-size:clamp(28px,6vw,44px);font-weight:700;color:var(--accent);")}><CountUp to={25} suffix="+" active={!preloaderOpen} /></div><div style={sx('font-size:15px;color:var(--muted);margin-top:8px;')}>anos de experiência</div></div>
          <div><div style={sx("font-family:'Space Grotesk',sans-serif;font-size:clamp(28px,6vw,44px);font-weight:700;color:var(--accent);")}><CountUp to={1200} suffix="+" active={!preloaderOpen} /></div><div style={sx('font-size:15px;color:var(--muted);margin-top:8px;')}>líderes treinados</div></div>
          <div><div style={sx("font-family:'Space Grotesk',sans-serif;font-size:clamp(28px,6vw,44px);font-weight:700;color:var(--accent);")}><CountUp to={17} active={!preloaderOpen} /></div><div style={sx('font-size:15px;color:var(--muted);margin-top:8px;')}>prêmios nacionais</div></div>
        </div>
      </section>

      <section id="dores" style={sx('padding:80px clamp(20px,5vw,64px);background:var(--bg-alt);')}>
        <div style={sx('max-width:1180px;margin:0 auto;')}>
          <div style={sx('max-width:600px;margin:0 auto 56px;text-align:center;')}>
            <div style={sx('font-size:13px;letter-spacing:0.08em;text-transform:uppercase;color:var(--accent);font-weight:700;margin-bottom:12px;')}>O ponto de partida</div>
            <h2 style={sx("font-family:'Space Grotesk',sans-serif;font-size:clamp(28px,3.5vw,38px);font-weight:700;margin:0;")}>Qual a sua dor?</h2>
          </div>
          <div className={doresGridClass} style={sx('gap:28px;')}>
            {showPJDores && (
              <div id="empresas" style={sx('background:var(--surface);border:1px solid var(--line);border-radius:12px;padding:36px;')}>
                <div style={sx('font-size:13px;letter-spacing:0.06em;text-transform:uppercase;color:var(--muted);font-weight:700;margin-bottom:12px;')}>Para empresas</div>
                <p style={sx('font-size:18px;font-weight:600;line-height:1.4;margin:0 0 20px;')}>Posso ajudar sua empresa se hoje vocês vivem situações como:</p>
                <ul className="dores-list" style={sx('margin:0;padding:0;list-style:none;')}>
                  {doresEmpresas.map((d, i) => (
                    <li key={i} style={sx('font-size:16px;line-height:1.5;display:flex;gap:12px;')}>
                      <i className="ti ti-point-filled" style={sx('color:var(--accent);flex-shrink:0;margin-top:5px;')}></i>{d}
                    </li>
                  ))}
                </ul>
              </div>
            )}
            {showPFDores && (
              <div id="pf" style={sx('background:var(--surface);border:1px solid var(--line);border-radius:12px;padding:36px;')}>
                <div style={sx('font-size:13px;letter-spacing:0.06em;text-transform:uppercase;color:var(--muted);font-weight:700;margin-bottom:12px;')}>Para você</div>
                <p style={sx('font-size:18px;font-weight:600;line-height:1.4;margin:0 0 20px;')}>Posso te ajudar se hoje você vive situações como:</p>
                <ul className="dores-list" style={sx('margin:0;padding:0;list-style:none;')}>
                  {doresPessoas.map((d, i) => (
                    <li key={i} style={sx('font-size:16px;line-height:1.5;display:flex;gap:12px;')}>
                      <i className="ti ti-point-filled" style={sx('color:var(--accent);flex-shrink:0;margin-top:5px;')}></i>{d}
                    </li>
                  ))}
                </ul>
              </div>
            )}
          </div>
        </div>
      </section>

      <section id="como-funciona" style={sx('padding:80px clamp(20px,5vw,64px);')}>
        <div style={sx('max-width:1180px;margin:0 auto;')}>
          <div style={sx('max-width:640px;margin:0 auto 56px;text-align:center;')}>
            <div style={sx('font-size:13px;letter-spacing:0.08em;text-transform:uppercase;color:var(--accent);font-weight:700;margin-bottom:12px;')}>Meu trabalho</div>
            <h2 style={sx("font-family:'Space Grotesk',sans-serif;font-size:clamp(28px,3.5vw,38px);font-weight:700;margin:0 0 16px;")}>Como o método funciona</h2>
            <p style={sx('font-size:16px;color:var(--muted);line-height:1.6;margin:0;')}>Empresas não crescem por acaso. Crescem quando existe um sistema de gestão.</p>
          </div>
          <InView className="steps-track" active={!preloaderOpen}>
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

          <div style={sx('margin-top:64px;display:grid;grid-template-columns:1fr;gap:24px;')}>
            <div style={sx('max-width:640px;margin:0 auto;text-align:center;')}>
              <div style={sx('font-size:13px;letter-spacing:0.08em;text-transform:uppercase;color:var(--accent);font-weight:700;margin-bottom:12px;')}>PDL</div>
              <h3 style={sx("font-family:'Space Grotesk',sans-serif;font-size:clamp(24px,3vw,30px);font-weight:700;margin:0 0 16px;")}>Programa de Desenvolvimento de Lideranças</h3>
              <p style={sx('font-size:16px;color:var(--muted);line-height:1.6;margin:0 0 24px;')}>Modelo autoral que impacta resultados e desenvolve líderes capazes de gerar crescimento sustentável, sem sacrificar sua saúde e das equipes, promovendo um ambiente saudável e seguro.</p>
              <ul style={sx('margin:0;padding:0;list-style:none;display:flex;flex-wrap:wrap;gap:12px 24px;justify-content:center;')}>
                {pdlFeatures.map((f, i) => (
                  <li key={i} style={sx('font-size:14px;font-weight:600;display:flex;gap:8px;align-items:center;')}><i className="ti ti-check" style={sx('color:var(--accent);')}></i>{f}</li>
                ))}
              </ul>
            </div>
            <div className="pdl-highlight" style={{ ...sx('border-radius:12px;padding:clamp(28px,5vw,48px);gap:40px;align-items:center;'), backgroundColor: '#0B1730', backgroundImage: noise, backgroundBlendMode: 'overlay' }}>
              <div style={sx("font-family:'Space Grotesk',sans-serif;font-size:clamp(48px,6vw,72px);font-weight:700;color:#FFFFFF;line-height:1;")}>R$2mi</div>
              <div>
                <div style={sx('font-size:20px;font-weight:600;color:#FFFFFF;margin-bottom:8px;')}>de economia anual</div>
                <p style={sx('font-size:15px;color:#9FAAC4;margin:0 0 20px;max-width:480px;')}>Gerada pela revisão de benefícios e custos operacionais de RH.</p>
                <a href="#cta-final" style={sx('font-size:15px;font-weight:600;color:#FFFFFF;')}>Quero saber como →</a>
              </div>
            </div>
          </div>
        </div>
      </section>

      <section id="solucoes" style={sx('padding:80px clamp(20px,5vw,64px);background:var(--bg-alt);')}>
        <div style={sx('max-width:1180px;margin:0 auto;')}>
          <div style={sx('max-width:640px;margin:0 auto 56px;text-align:center;')}>
            <div style={sx('font-size:13px;letter-spacing:0.08em;text-transform:uppercase;color:var(--accent);font-weight:700;margin-bottom:12px;')}>Soluções</div>
            <h2 style={sx("font-family:'Space Grotesk',sans-serif;font-size:clamp(28px,3.5vw,38px);font-weight:700;margin:0 0 16px;")}>Nossas soluções</h2>
            <p style={sx('font-size:16px;color:var(--muted);line-height:1.6;margin:0;')}>Conectar estratégia, pessoas e negócio, resolver problemas complexos rapidamente e transformar organizações com uma metodologia flexível e orientada a resultados.</p>
          </div>
          <div className="solucoes-grid" style={sx('gap:24px;')}>
            {solucoes.map((s, i) => (
              <div key={i} style={sx('background:var(--surface);border:1px solid var(--line);border-radius:12px;padding:36px;')}>
                <div style={sx("font-family:'Space Grotesk',sans-serif;font-size:18px;font-weight:600;margin-bottom:20px;")}>{s.title}</div>
                <ul style={sx('margin:0;padding:0;list-style:none;display:flex;flex-direction:column;gap:14px;')}>
                  {s.items.map((it, j) => (
                    <li key={j} style={sx('font-size:16px;display:flex;gap:10px;align-items:center;')}><i className="ti ti-check" style={sx('color:var(--accent);')}></i>{it}</li>
                  ))}
                </ul>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section id="sobre" style={sx('padding:80px clamp(20px,5vw,64px);')}>
        <div className="about-grid" style={sx('max-width:1180px;margin:0 auto;gap:56px;align-items:center;')}>
          <div style={sx('width:100%;aspect-ratio:1/1;border-radius:12px;overflow:hidden;')}>
            <ImagePlaceholder label="Foto do Eduardo Kayser" shape="rounded" radius={12} />
          </div>
          <div>
            <div style={sx('font-size:13px;letter-spacing:0.08em;text-transform:uppercase;color:var(--accent);font-weight:700;margin-bottom:12px;')}>Quem é</div>
            <h2 style={sx("font-family:'Space Grotesk',sans-serif;font-size:clamp(28px,3.5vw,36px);font-weight:700;margin:0 0 24px;")}>Eduardo Kayser</h2>
            <ul style={sx('margin:0 0 24px;padding:0;list-style:none;display:flex;flex-direction:column;gap:14px;')}>
              <li style={sx('font-size:16px;line-height:1.55;color:var(--muted);')}>+25 anos de experiência em indústria, varejo e serviços</li>
              <li style={sx('font-size:16px;line-height:1.55;color:var(--muted);')}>Atuação como executivo em empresas de até 12 mil colaboradores</li>
              <li style={sx('font-size:16px;line-height:1.55;color:var(--muted);')}>17 prêmios de destaque nacional em RH, educação, cultura, saúde, segurança do trabalho e ESG</li>
              <li style={sx('font-size:16px;line-height:1.55;color:var(--muted);')}>Criador do método LUCIDEZ, especialista em comportamento organizacional</li>
              <li style={sx('font-size:16px;line-height:1.55;color:var(--muted);')}>Consultor estratégico, mentor, palestrante e professor</li>
            </ul>
            <p style={sx('font-size:16px;line-height:1.6;margin:0 0 8px;')}>Eduardo trabalha com um ecossistema de parceiros — psicologia, saúde e performance — para apoiar líderes de forma integral.</p>
            <a href="#ecossistema" style={sx('font-size:15px;font-weight:600;')}>Conhecer o ecossistema →</a>
          </div>
        </div>
      </section>

      <section id="ecossistema" style={sx('padding:80px clamp(20px,5vw,64px);background:var(--bg-alt);')}>
        <div style={sx('max-width:1180px;margin:0 auto;')}>
          <div style={sx('max-width:640px;margin:0 auto 56px;text-align:center;')}>
            <div style={sx('font-size:13px;letter-spacing:0.08em;text-transform:uppercase;color:var(--accent);font-weight:700;margin-bottom:12px;')}>Ecossistema</div>
            <h2 style={sx("font-family:'Space Grotesk',sans-serif;font-size:clamp(28px,3.5vw,38px);font-weight:700;margin:0 0 16px;")}>Uma rede de parceiros para apoiar líderes de forma integral</h2>
            <p style={sx('font-size:16px;color:var(--muted);line-height:1.6;margin:0;')}>Além da consultoria estratégica, Eduardo conecta empresas e líderes a profissionais especializados em saúde, performance e desenvolvimento humano.</p>
          </div>
          <div className="partners-grid" style={sx('gap:24px;')}>
            {parceiros.map(p => (
              <div key={p.id} style={sx('background:var(--surface);border:1px solid var(--line);border-radius:12px;padding:28px;text-align:center;')}>
                <div style={sx('width:88px;height:88px;margin:0 auto 20px;')}>
                  <ImagePlaceholder label="Foto do parceiro" shape="circle" />
                </div>
                <div style={sx("font-family:'Space Grotesk',sans-serif;font-size:16px;font-weight:600;margin-bottom:6px;")}>{p.name}</div>
                <div style={sx('font-size:13px;color:var(--accent-strong);font-weight:600;margin-bottom:10px;')}>{p.area}</div>
                <p style={sx('font-size:13px;color:var(--muted);line-height:1.5;margin:0;')}>{p.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section style={sx('padding:56px clamp(20px,5vw,64px);background:var(--bg-alt);')}>
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

      <section id="resultados" style={sx('padding:80px clamp(20px,5vw,64px);background:var(--bg-alt);')}>
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

      <section style={sx('padding:80px clamp(20px,5vw,64px);')}>
        <div style={sx('max-width:1180px;margin:0 auto;')}>
          <div style={sx('font-size:13px;letter-spacing:0.06em;text-transform:uppercase;color:var(--muted);font-weight:700;text-align:center;margin-bottom:24px;')}>Marcas que confiam no Eduardo Kayser</div>
          <div className="marquee-wrap" style={sx('margin-bottom:56px;')}>
            <div className="marquee-track">
              {[...marcas, ...marcas].map((m, i) => (
                <div key={i} style={sx('flex-shrink:0;width:140px;height:56px;margin:0 20px;')}>
                  <ImagePlaceholder label={m} shape="rect" />
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

      <section style={sx('padding:80px clamp(20px,5vw,64px);background:var(--bg-alt);text-align:center;')}>
        <div style={sx('max-width:560px;margin:0 auto;')}>
          <h2 style={sx("font-family:'Space Grotesk',sans-serif;font-size:clamp(28px,3.5vw,38px);font-weight:700;margin:0 0 16px;")}>Agende uma reunião comigo</h2>
          <p style={sx('font-size:16px;color:var(--muted);line-height:1.6;margin:0 0 32px;')}>Escolha o melhor horário na minha agenda e vamos conversar sobre o seu contexto.</p>
          <a href="https://calendar.google.com/calendar/appointments/schedules/EDUARDO-KAYSER" target="_blank" rel="noreferrer" style={sx('border-radius:999px;padding:17px 32px;background:var(--accent);color:var(--on-accent);font-size:16px;font-weight:600;display:inline-flex;align-items:center;gap:8px;')}><i className="ti ti-calendar-event"></i>Agendar no Google Agenda</a>
        </div>
      </section>

      <section id="conteudos" style={sx('padding:80px clamp(20px,5vw,64px);background:var(--bg-alt);')}>
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
          <div style={sx("font-family:'Space Grotesk',sans-serif;font-weight:700;font-size:17px;")}>Eduardo Kayser - Desenvolvimento de Lideranças</div>
          <a href="#ecossistema" style={sx('font-size:14px;color:var(--muted);')}>Ecossistema de parceiros</a>
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

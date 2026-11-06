'use client';
import { useState } from 'react';
import Link from 'next/link';
import { sx } from '../lib/sx';
import { waLink } from '../lib/site';
import { track } from '../lib/track';

const NECESSIDADES = [
  'Palestra',
  'Mentoria',
  'Desenvolvimento de lideranças / PDL',
  'Treinamento / Workshop',
  'Consultoria',
  'Atuação executiva as a Service',
  'Outros'
];
const INICIO = ['Até 30 dias', 'Em 1 a 3 meses', 'Em 3 a 6 meses', 'Estou pesquisando'];
const MODALIDADES = ['Presencial', 'Online', 'Híbrida'];
const RECEBER = ['E-mail', 'WhatsApp', 'Apresentação online'];

function necessidadesSugeridas(servico) {
  if (/^Mentoria/.test(servico)) return ['Mentoria'];
  if (/^Desenvolvimento de Liderança/.test(servico)) return ['Desenvolvimento de lideranças / PDL'];
  if (/^Cursos/.test(servico)) return ['Treinamento / Workshop'];
  return [];
}

function dataBr(iso) {
  const [y, m, d] = (iso || '').split('-');
  return y && m && d ? `${d}/${m}/${y}` : '';
}

function Choice({ type, name, value, defaultChecked, required }) {
  return (
    <label className="choice">
      <input type={type} name={name} value={value} defaultChecked={defaultChecked} required={required} />
      {value}
    </label>
  );
}

export default function ProposalForm({ servico = '', perfil = '', parceiro = '' }) {
  const profissional = perfil === 'profissional';
  const sugeridas = necessidadesSugeridas(servico);
  const [erro, setErro] = useState('');
  const [envio, setEnvio] = useState(null);
  const [enviando, setEnviando] = useState(false);

  async function onSubmit(e) {
    e.preventDefault();
    if (enviando) return;
    const f = new FormData(e.currentTarget);
    const necessidades = f.getAll('necessidade');
    if (necessidades.length === 0) {
      setErro('Selecione pelo menos uma necessidade.');
      // leva a pessoa até o campo que falta, em vez de parecer que o botão não funciona
      const campo = document.getElementById('necessidades');
      if (campo) campo.scrollIntoView({ behavior: 'smooth', block: 'center' });
      return;
    }
    setErro('');

    const campos = [];
    const add = (rotulo, valor) => {
      const v = String(valor || '').trim();
      if (v) campos.push([rotulo, v]);
    };
    add('Interesse em', servico);
    add('Parceiro de interesse', parceiro);
    add('Nome', f.get('nome'));
    add('E-mail', f.get('email'));
    add('WhatsApp', f.get('whatsapp'));
    add('Empresa', f.get('empresa'));
    add('Cargo', f.get('cargo'));
    add('Cidade/UF', f.get('cidade'));
    add('Modalidade', f.get('modalidade'));
    if (!profissional) {
      add('Nº aproximado de colaboradores', f.get('colaboradores'));
      add('Nº aproximado de lideranças', f.get('liderancas'));
      add('Nº aproximado de profissionais de RH', f.get('rh'));
    }
    add('Necessidade', necessidades.join(', '));
    add('Desafio a resolver', f.get('desafio'));
    add('Início previsto', f.get('inicio'));
    add('Receber a proposta até', dataBr(f.get('prazo')));
    add('Prefere receber por', f.get('receber'));
    add('Verba disponível', f.get('verba'));
    add('Informações adicionais', f.get('extras'));

    // mensagem pronta para o WhatsApp: envio opcional depois do e-mail, ou alternativa se o e-mail falhar
    const linhas = ['*Solicitação de proposta (site Eduardo Kayser)*', '', ...campos.map(([r, v]) => `*${r}:* ${v}`)];
    const url = waLink(linhas.join('\n'));
    const origin = servico || parceiro || 'proposta';

    setEnviando(true);
    let porEmail = false;
    try {
      // limite de tempo: se o envio demorar demais, segue para o WhatsApp em vez de travar o botão
      const ctrl = new AbortController();
      const timer = setTimeout(() => ctrl.abort(), 20000);
      const resp = await fetch('/api/proposta', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ campos, site: f.get('contato_alt') || '' }),
        signal: ctrl.signal
      });
      clearTimeout(timer);
      porEmail = resp.ok;
    } catch (_) {
      porEmail = false;
    }
    setEnviando(false);

    track('generate_lead', { method: porEmail ? 'formulario_proposta_email' : 'formulario_proposta_whatsapp', origin });
    setEnvio({ url, porEmail });
    if (!porEmail) window.open(url, '_blank', 'noopener');
    window.scrollTo({ top: 0, behavior: 'smooth' });
  }

  if (envio && envio.porEmail) {
    return (
      <div style={sx('background:var(--surface);border:1px solid var(--line);border-radius:16px;padding:clamp(24px,4vw,40px);text-align:center;')}>
        <i className="ti ti-circle-check" style={sx('font-size:44px;color:var(--accent);')}></i>
        <h2 style={sx("font-family:'Space Grotesk',sans-serif;font-size:24px;font-weight:700;margin:12px 0;")}>Solicitação enviada</h2>
        <p style={sx('font-size:16px;color:var(--muted);line-height:1.65;margin:0 auto 24px;max-width:520px;')}>Recebemos o seu pedido. Eduardo Kayser vai analisar as informações e retornar com a proposta. Se preferir adiantar a conversa, você também pode falar pelo WhatsApp.</p>
        <div style={sx('display:flex;gap:14px;justify-content:center;flex-wrap:wrap;')}>
          <a href={envio.url} target="_blank" rel="noreferrer" style={sx('border-radius:999px;padding:16px 28px;background:#25D366;color:#FFFFFF;font-size:15px;font-weight:600;display:inline-flex;align-items:center;gap:8px;')}><i className="ti ti-brand-whatsapp"></i>Falar também pelo WhatsApp</a>
          <Link href="/" style={sx('border-radius:999px;padding:16px 28px;background:var(--surface);border:1px solid var(--line);color:var(--ink);font-size:15px;font-weight:600;display:inline-flex;align-items:center;gap:8px;')}>Voltar ao site</Link>
        </div>
      </div>
    );
  }

  if (envio) {
    return (
      <div style={sx('background:var(--surface);border:1px solid var(--line);border-radius:16px;padding:clamp(24px,4vw,40px);text-align:center;')}>
        <i className="ti ti-brand-whatsapp" style={sx('font-size:40px;color:#25D366;')}></i>
        <h2 style={sx("font-family:'Space Grotesk',sans-serif;font-size:24px;font-weight:700;margin:12px 0;")}>Falta só um passo</h2>
        <p style={sx('font-size:16px;color:var(--muted);line-height:1.65;margin:0 auto 24px;max-width:520px;')}>Abrimos o WhatsApp com a sua solicitação já preenchida. Para concluir, toque em <strong>enviar</strong> na conversa. Se a janela não abriu, use o botão abaixo.</p>
        <div style={sx('display:flex;gap:14px;justify-content:center;flex-wrap:wrap;')}>
          <a href={envio.url} target="_blank" rel="noreferrer" style={sx('border-radius:999px;padding:16px 28px;background:#25D366;color:#FFFFFF;font-size:15px;font-weight:600;display:inline-flex;align-items:center;gap:8px;')}><i className="ti ti-brand-whatsapp"></i>Abrir o WhatsApp</a>
          <button type="button" onClick={() => setEnvio(null)} style={sx('border-radius:999px;padding:16px 28px;background:var(--surface);border:1px solid var(--line);color:var(--ink);font-size:15px;font-weight:600;cursor:pointer;')}>Editar solicitação</button>
        </div>
      </div>
    );
  }

  const hoje = new Date().toISOString().slice(0, 10);

  return (
    <form onSubmit={onSubmit} style={sx('display:flex;flex-direction:column;gap:32px;')}>
      {/* campo isca contra robôs: invisível para pessoas */}
      <input type="text" name="contato_alt" tabIndex={-1} autoComplete="off" aria-hidden="true" style={{ position: 'absolute', left: '-9999px', width: 1, height: 1, opacity: 0 }} />
      {servico && (
        <div style={sx('background:var(--bg-alt);border-radius:12px;padding:14px 18px;font-size:15px;')}>Você está solicitando uma proposta para: <strong>{servico}</strong></div>
      )}
      {parceiro && (
        <div style={sx('background:var(--bg-alt);border-radius:12px;padding:14px 18px;font-size:15px;')}>Você tem interesse em conversar sobre o trabalho de: <strong>{parceiro}</strong></div>
      )}

      <fieldset style={sx('border:none;padding:0;margin:0;')}>
        <legend className="form-legend">Seus dados</legend>
        <div className="form-grid">
          <div className="form-field"><label htmlFor="nome">Nome *</label><input id="nome" name="nome" className="field" required autoComplete="name" /></div>
          <div className="form-field"><label htmlFor="email">E-mail profissional *</label><input id="email" name="email" type="email" className="field" required autoComplete="email" /></div>
          <div className="form-field"><label htmlFor="whatsapp">WhatsApp *</label><input id="whatsapp" name="whatsapp" type="tel" className="field" required autoComplete="tel" placeholder="(00) 00000-0000" /></div>
          <div className="form-field"><label htmlFor="empresa">{profissional ? 'Empresa (se aplicável)' : 'Empresa *'}</label><input id="empresa" name="empresa" className="field" required={!profissional} autoComplete="organization" /></div>
          <div className="form-field"><label htmlFor="cargo">Cargo</label><input id="cargo" name="cargo" className="field" autoComplete="organization-title" /></div>
          <div className="form-field"><label htmlFor="cidade">Cidade e estado</label><input id="cidade" name="cidade" className="field" placeholder="Ex.: Porto Alegre, RS" /></div>
        </div>
      </fieldset>

      <fieldset style={sx('border:none;padding:0;margin:0;')}>
        <legend className="form-legend">A proposta é para uma demanda</legend>
        <div className="choice-row">
          {MODALIDADES.map(v => <Choice key={v} type="radio" name="modalidade" value={v} />)}
        </div>
      </fieldset>

      {!profissional && (
        <fieldset style={sx('border:none;padding:0;margin:0;')}>
          <legend className="form-legend">Dados da empresa</legend>
          <div className="form-grid form-grid-3">
            <div className="form-field"><label htmlFor="colaboradores">Nº aproximado de colaboradores</label><input id="colaboradores" name="colaboradores" type="number" min="0" inputMode="numeric" className="field" /></div>
            <div className="form-field"><label htmlFor="liderancas">Nº aproximado de lideranças</label><input id="liderancas" name="liderancas" type="number" min="0" inputMode="numeric" className="field" /></div>
            <div className="form-field"><label htmlFor="rh">Nº aproximado de profissionais de RH</label><input id="rh" name="rh" type="number" min="0" inputMode="numeric" className="field" /></div>
          </div>
        </fieldset>
      )}

      <fieldset id="necessidades" onChange={() => erro && setErro('')} style={sx('border:none;padding:0;margin:0;')}>
        <legend className="form-legend">Qual é a necessidade? (pode marcar mais de uma) *</legend>
        <div className="choice-row">
          {NECESSIDADES.map(v => <Choice key={v} type="checkbox" name="necessidade" value={v} defaultChecked={sugeridas.includes(v)} />)}
        </div>
        {erro && <p role="alert" style={sx('color:#D14343;font-size:14px;font-weight:600;margin:10px 0 0;')}>{erro}</p>}
      </fieldset>

      <div className="form-field">
        <label htmlFor="desafio">Qual desafio você quer resolver? *</label>
        <textarea id="desafio" name="desafio" className="field" rows={5} maxLength={1000} required placeholder="Descreva o contexto atual e o resultado que você espera alcançar." />
      </div>

      <fieldset style={sx('border:none;padding:0;margin:0;')}>
        <legend className="form-legend">Quando pretende iniciar?</legend>
        <div className="choice-row">
          {INICIO.map(v => <Choice key={v} type="radio" name="inicio" value={v} />)}
        </div>
      </fieldset>

      <div className="form-field">
        <label htmlFor="extras">Inclua as informações que julgar necessárias para a proposta</label>
        <textarea id="extras" name="extras" className="field" rows={4} maxLength={1000} />
      </div>

      <div className="form-grid">
        <div className="form-field"><label htmlFor="prazo">Até quando quer receber a proposta?</label><input id="prazo" name="prazo" type="date" min={hoje} className="field" /></div>
        <div className="form-field"><label htmlFor="verba">Qual a verba disponível para investimento?</label><input id="verba" name="verba" className="field" placeholder="Informe um valor, uma faixa ou 'a definir'" /></div>
      </div>

      <fieldset style={sx('border:none;padding:0;margin:0;')}>
        <legend className="form-legend">Prefere receber a proposta por</legend>
        <div className="choice-row">
          {RECEBER.map(v => <Choice key={v} type="radio" name="receber" value={v} />)}
        </div>
      </fieldset>

      <label style={sx('display:flex;gap:12px;align-items:flex-start;font-size:14px;line-height:1.55;color:var(--muted);cursor:pointer;')}>
        <input type="checkbox" required style={sx('width:18px;height:18px;margin-top:2px;accent-color:var(--accent);flex-shrink:0;')} />
        <span>Li e concordo com a <Link href="/politica-de-privacidade" target="_blank" style={sx('color:var(--accent);font-weight:600;text-decoration:underline;')}>Política de Privacidade</Link> e autorizo o uso destas informações para a elaboração da proposta. *</span>
      </label>

      <div>
        {erro && <p role="alert" style={sx('color:#D14343;font-size:14px;font-weight:600;margin:0 0 12px;')}>Falta marcar a necessidade na seção acima. Depois é só enviar novamente.</p>}
        <button type="submit" disabled={enviando} style={{ ...sx('border-radius:999px;padding:17px 32px;background:var(--accent);color:var(--on-accent);border:none;font-size:16px;font-weight:600;cursor:pointer;display:inline-flex;align-items:center;gap:8px;'), opacity: enviando ? 0.7 : 1 }}>
          <i className={enviando ? 'ti ti-loader-2' : 'ti ti-send'}></i>{enviando ? 'Enviando...' : 'Enviar solicitação'}
        </button>
        <p style={sx('font-size:13px;color:var(--muted);line-height:1.55;margin:14px 0 0;')}>Sua solicitação chega por e-mail ao Eduardo, que retorna com a proposta. Se o envio por e-mail falhar, abrimos o WhatsApp com a mensagem pronta.</p>
      </div>
    </form>
  );
}

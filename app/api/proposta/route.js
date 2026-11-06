import { NextResponse } from 'next/server';

// Recebe o formulário "Solicite sua proposta" e envia por e-mail (Resend) para o Eduardo.
// Variáveis de ambiente (Vercel):
//   RESEND_API_KEY      obrigatória
//   PROPOSTA_TO         destino (padrão: eduardokayser@outlook.com)
//   PROPOSTA_FROM       remetente (padrão: onboarding@resend.dev; troque por um endereço do domínio verificado)

export const runtime = 'nodejs';

const DESTINO_PADRAO = 'eduardokayser@outlook.com';
const REMETENTE_PADRAO = 'Site Eduardo Kayser <onboarding@resend.dev>';

// limite simples por IP (por instância; protege contra rajadas, não substitui um WAF)
const janela = new Map();
function limitado(ip) {
  const agora = Date.now();
  const lista = (janela.get(ip) || []).filter(t => agora - t < 10 * 60 * 1000);
  if (lista.length >= 5) return true;
  lista.push(agora);
  janela.set(ip, lista);
  if (janela.size > 500) janela.clear();
  return false;
}

const esc = s => String(s).replace(/[&<>"']/g, c => ({ '&': '&amp;', '<': '&lt;', '>': '&gt;', '"': '&quot;', "'": '&#39;' }[c]));
const limpa = (v, max) => String(v ?? '').replace(/\r/g, '').trim().slice(0, max);

export async function POST(req) {
  try {
    const ip = (req.headers.get('x-forwarded-for') || 'anon').split(',')[0].trim();
    if (limitado(ip)) return NextResponse.json({ ok: false, erro: 'Muitas tentativas. Tente novamente em alguns minutos.' }, { status: 429 });

    const body = await req.json();

    // campo isca: robôs preenchem, pessoas não. Responde "ok" sem enviar nada.
    if (body.site) return NextResponse.json({ ok: true });

    const campos = Array.isArray(body.campos) ? body.campos.slice(0, 40) : [];
    const linhas = campos
      .map(c => [limpa(c?.[0], 80), limpa(c?.[1], 1500)])
      .filter(([r, v]) => r && v);
    const get = rotulo => (linhas.find(([r]) => r === rotulo) || [])[1] || '';

    const nome = get('Nome');
    const email = get('E-mail');
    const desafio = get('Desafio a resolver');
    if (!nome || !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email) || !desafio) {
      return NextResponse.json({ ok: false, erro: 'Dados incompletos.' }, { status: 400 });
    }

    const apiKey = process.env.RESEND_API_KEY;
    if (!apiKey) {
      console.error('[proposta] RESEND_API_KEY não configurada');
      return NextResponse.json({ ok: false, erro: 'Envio por e-mail indisponível.' }, { status: 500 });
    }

    const empresa = get('Empresa');
    const assunto = `Nova solicitação de proposta: ${nome}${empresa ? ` (${empresa})` : ''}`;
    const texto = ['Nova solicitação de proposta pelo site', '', ...linhas.map(([r, v]) => `${r}: ${v}`)].join('\n');
    const html = `<div style="font-family:Arial,Helvetica,sans-serif;font-size:15px;color:#1b2440;max-width:640px">
<h2 style="margin:0 0 16px;font-size:20px">Nova solicitação de proposta pelo site</h2>
<table style="border-collapse:collapse;width:100%">${linhas
      .map(([r, v]) => `<tr><td style="padding:8px 12px 8px 0;vertical-align:top;font-weight:700;white-space:nowrap;border-bottom:1px solid #e5e8f0">${esc(r)}</td><td style="padding:8px 0;vertical-align:top;border-bottom:1px solid #e5e8f0">${esc(v).replace(/\n/g, '<br>')}</td></tr>`)
      .join('')}</table>
<p style="margin:20px 0 0;color:#586181;font-size:13px">Para responder, basta usar "Responder": a resposta vai direto para ${esc(email)}.</p>
</div>`;

    const resposta = await fetch('https://api.resend.com/emails', {
      method: 'POST',
      headers: { Authorization: `Bearer ${apiKey}`, 'Content-Type': 'application/json' },
      body: JSON.stringify({
        from: process.env.PROPOSTA_FROM || REMETENTE_PADRAO,
        to: [process.env.PROPOSTA_TO || DESTINO_PADRAO],
        reply_to: email,
        subject: assunto,
        text: texto,
        html
      })
    });

    if (!resposta.ok) {
      console.error('[proposta] Resend', resposta.status, await resposta.text());
      return NextResponse.json({ ok: false, erro: 'Não foi possível enviar o e-mail.' }, { status: 502 });
    }
    return NextResponse.json({ ok: true });
  } catch (err) {
    console.error('[proposta]', err);
    return NextResponse.json({ ok: false, erro: 'Erro ao processar a solicitação.' }, { status: 500 });
  }
}

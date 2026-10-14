import { revalidateTag } from 'next/cache';
import { NextResponse } from 'next/server';
import { parseBody } from 'next-sanity/webhook';

// Webhook do Sanity: ao publicar/editar/excluir um post, atualiza o site na hora.
export async function POST(req) {
  try {
    const secret = process.env.SANITY_REVALIDATE_SECRET;
    if (!secret) return new NextResponse('SANITY_REVALIDATE_SECRET não configurado', { status: 500 });

    const { isValidSignature, body } = await parseBody(req, secret, true);
    if (!isValidSignature) return new NextResponse('Assinatura inválida', { status: 401 });

    revalidateTag('post');
    return NextResponse.json({ revalidated: true, type: body?._type ?? null, now: Date.now() });
  } catch (err) {
    console.error('[revalidate]', err);
    return new NextResponse(err.message, { status: 500 });
  }
}

import { createClient } from 'next-sanity';
import { projectId, dataset, apiVersion } from '../env';

export const client = createClient({ projectId, dataset, apiVersion, useCdn: true });

// Busca com cache marcado pela tag "post" (revalidada pelo webhook em /api/revalidate).
// Em caso de falha (ex.: dataset vazio ou fora do ar) retorna o fallback para não quebrar a página.
export async function sanityFetch(query, params = {}, fallback = null) {
  try {
    return await client.fetch(query, params, { next: { revalidate: 60, tags: ['post'] } });
  } catch (err) {
    console.error('[sanity] falha na consulta:', err.message);
    return fallback;
  }
}

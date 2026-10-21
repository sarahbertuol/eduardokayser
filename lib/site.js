import { siteUrl } from '../sanity/env';

export const SITE_URL = siteUrl;
export const SITE_NAME = 'Ecossistema LUCIDEZ';
export const GA_ID = process.env.NEXT_PUBLIC_GA_ID || '';
export const WHATSAPP_NUMBER = '5551991019459';
export const AGENDA_URL = 'https://calendar.app.google/BLhxyRWwqv8eLeDK6';

export const SOCIAL = [
  'https://www.instagram.com/soueduardokayser',
  'https://www.linkedin.com/in/eduardokayser',
  'https://www.youtube.com/@soueduardokayser'
];

export const servicePages = [
  { slug: 'lucidez-profissional', label: 'Lucidez Profissional' },
  { slug: 'lucidez-organizacoes', label: 'Lucidez Organizações' }
];

export function waLink(message = 'Olá, Eduardo! Vim pelo site e gostaria de conversar.') {
  return `https://wa.me/${WHATSAPP_NUMBER}?text=${encodeURIComponent(message)}`;
}

export const personJsonLd = {
  '@type': 'Person',
  '@id': `${SITE_URL}/#eduardo`,
  name: 'Eduardo Kayser',
  url: SITE_URL,
  image: `${SITE_URL}/eduardo/hero.jpg`,
  jobTitle: 'Executivo de RH, consultor, mentor e palestrante',
  description: 'Executivo de Recursos Humanos, consultor, mentor, professor e palestrante, fundador do Ecossistema de Gestão LUCIDEZ.',
  sameAs: SOCIAL
};

export const organizationJsonLd = {
  '@type': 'Organization',
  '@id': `${SITE_URL}/#organization`,
  name: SITE_NAME,
  alternateName: 'Ecossistema de Gestão LUCIDEZ',
  url: SITE_URL,
  image: `${SITE_URL}/eduardo/hero.jpg`,
  founder: { '@id': `${SITE_URL}/#eduardo` },
  sameAs: SOCIAL,
  contactPoint: {
    '@type': 'ContactPoint',
    contactType: 'customer service',
    telephone: '+55-51-99101-9459',
    availableLanguage: 'pt-BR'
  }
};

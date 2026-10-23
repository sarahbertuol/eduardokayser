import './globals.css';
import { SITE_URL, SITE_NAME, personJsonLd, organizationJsonLd } from '../lib/site';

const description = 'Profissionais e organizações crescem com clareza, método e intenção — o Ecossistema LUCIDEZ, criado e conduzido por Eduardo Kayser.';

export const metadata = {
  metadataBase: new URL(SITE_URL),
  title: 'Ecossistema LUCIDEZ | Eduardo Kayser',
  description,
  alternates: { canonical: '/' },
  robots: { index: true, follow: true },
  openGraph: {
    type: 'website',
    locale: 'pt_BR',
    siteName: SITE_NAME,
    title: 'Ecossistema LUCIDEZ | Eduardo Kayser',
    description,
    url: '/',
    images: [{ url: '/eduardo/hero.jpg', alt: 'Eduardo Kayser' }]
  },
  verification: process.env.NEXT_PUBLIC_GSC_VERIFICATION
    ? { google: process.env.NEXT_PUBLIC_GSC_VERIFICATION, other: process.env.NEXT_PUBLIC_BING_VERIFICATION ? { 'msvalidate.01': process.env.NEXT_PUBLIC_BING_VERIFICATION } : undefined }
    : undefined
};

const siteJsonLd = {
  '@context': 'https://schema.org',
  '@graph': [
    personJsonLd,
    organizationJsonLd,
    { '@type': 'WebSite', '@id': `${SITE_URL}/#website`, url: SITE_URL, name: SITE_NAME, inLanguage: 'pt-BR', publisher: { '@id': `${SITE_URL}/#organization` } }
  ]
};

export default function RootLayout({ children }) {
  return (
    <html lang="pt-BR">
      <head>
        <meta name="adopt-website-id" content="aab21b2f-0597-4c8b-9233-da4cfb0540f5" />
        <script src="//tag.goadopt.io/injector.js?website_code=aab21b2f-0597-4c8b-9233-da4cfb0540f5" className="adopt-injector"></script>
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link
          href="https://fonts.googleapis.com/css2?family=Space+Grotesk:wght@500;600;700&family=Public+Sans:wght@400;500;600;700&display=swap"
          rel="stylesheet"
        />
        <link
          rel="stylesheet"
          href="https://cdn.jsdelivr.net/npm/@tabler/icons-webfont@2.44.0/tabler-icons.min.css"
        />
        <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(siteJsonLd) }} />
      </head>
      <body>
        {children}
      </body>
    </html>
  );
}

import './globals.css';

export const metadata = {
  title: 'Ecossistema LUCIDEZ | Eduardo Kayser',
  description: 'Profissionais e organizações crescem com clareza, método e intenção — o Ecossistema LUCIDEZ, criado e conduzido por Eduardo Kayser.',
};

export default function RootLayout({ children }) {
  return (
    <html lang="pt-BR">
      <head>
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link
          href="https://fonts.googleapis.com/css2?family=Space+Grotesk:wght@500;600;700&family=Public+Sans:wght@400;500;600;700&display=swap"
          rel="stylesheet"
        />
        <link
          rel="stylesheet"
          href="https://cdn.jsdelivr.net/npm/@tabler/icons-webfont@2.44.0/tabler-icons.min.css"
        />
      </head>
      <body>{children}</body>
    </html>
  );
}

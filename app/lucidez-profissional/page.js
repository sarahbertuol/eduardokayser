import ServicePage from '../../components/ServicePage';

const description = 'Mentoria de carreira, performance e executiva, coaching executivo, avaliação comportamental, PDI e desenvolvimento de liderança para profissionais e executivos, com Eduardo Kayser.';

export const metadata = {
  title: 'Para profissionais: mentoria, coaching e desenvolvimento de liderança | Ecossistema LUCIDEZ',
  description,
  alternates: { canonical: '/lucidez-profissional' },
  openGraph: { url: '/lucidez-profissional', title: 'Para profissionais | Eduardo Kayser', description }
};

export default function Page() {
  return <ServicePage slug="lucidez-profissional" label="Para profissionais" panel="profissional" description={description} />;
}

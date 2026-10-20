import ServicePage from '../../components/ServicePage';
import { lucidezProfissional as d } from '../../lib/data';

const description = 'Mentoria de carreira, performance e executiva, coaching, avaliação comportamental e desenvolvimento de liderança para profissionais e executivos, com Eduardo Kayser.';

export const metadata = {
  title: 'Lucidez Profissional — mentoria, coaching e desenvolvimento de liderança | Ecossistema LUCIDEZ',
  description,
  alternates: { canonical: '/lucidez-profissional' },
  openGraph: { url: '/lucidez-profissional', title: 'Lucidez Profissional | Eduardo Kayser', description }
};

export default function Page() {
  return <ServicePage slug="lucidez-profissional" label="Lucidez Profissional" h1={d.titulo} intro={d.chapeu} items={d.solucoes} description={description} />;
}

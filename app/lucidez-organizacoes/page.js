import ServicePage from '../../components/ServicePage';

const description = 'Consultoria, projetos, desenvolvimento de lideranças e atuação executiva para empresas: estratégia, gestão de pessoas, cultura, performance e execução, com Eduardo Kayser e o Ecossistema LUCIDEZ.';

export const metadata = {
  title: 'Para empresas: consultoria em estratégia, liderança e gestão | Ecossistema LUCIDEZ',
  description,
  alternates: { canonical: '/lucidez-organizacoes' },
  openGraph: { url: '/lucidez-organizacoes', title: 'Para empresas | Eduardo Kayser', description }
};

export default function Page() {
  return <ServicePage slug="lucidez-organizacoes" label="Para empresas" panel="empresas" description={description} />;
}

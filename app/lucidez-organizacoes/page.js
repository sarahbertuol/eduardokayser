import ServicePage from '../../components/ServicePage';
import { lucidezOrganizacoes as d } from '../../lib/data';

const description = 'Consultoria, projetos, desenvolvimento e atuação executiva para organizações: estratégia, cultura, liderança, performance, People Analytics e governança, com Eduardo Kayser.';

export const metadata = {
  title: 'Lucidez Organizações — consultoria em estratégia, pessoas e gestão | Ecossistema LUCIDEZ',
  description,
  alternates: { canonical: '/lucidez-organizacoes' },
  openGraph: { url: '/lucidez-organizacoes', title: 'Lucidez Organizações | Eduardo Kayser', description }
};

export default function Page() {
  return <ServicePage slug="lucidez-organizacoes" label="Lucidez Organizações" h1={d.titulo} intro={d.texto} items={d.frentes} numbered footnote={d.rodape} description={description} />;
}

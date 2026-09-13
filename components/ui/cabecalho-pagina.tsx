/**
 * Cabeçalho das páginas internas.
 *
 * Projetos, Stack e Contato usam exatamente o mesmo desenho: rótulo em mono, título
 * fluido e um parágrafo de apoio. Fica num componente só para os três não divergirem com
 * o tempo.
 *
 * O Sobre não usa este: lá o cabeçalho tem foto e botão ao lado do texto.
 */
export default function CabecalhoPagina({
  rotulo,
  titulo,
  children,
}: {
  rotulo: string;
  titulo: string;
  children?: React.ReactNode;
}) {
  return (
    <section className="faixa flex flex-col items-start gap-[18px] pt-[var(--espaco-topo-pagina)] pb-[56px]">
      <p className="font-mono text-rotulo-secao font-medium text-accent-rosa">{rotulo}</p>
      <h1 className="text-titulo-pagina font-extrabold text-text">{titulo}</h1>
      {children ? (
        <div className="max-w-full text-hero-paragrafo text-text-muted">{children}</div>
      ) : null}
    </section>
  );
}

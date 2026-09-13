import { certificacoes } from "@/conteudo/sobre";

/**
 * Certificações em quatro grupos, cada um sob um filete em accent.
 * O filete de 1.5px no topo separa os grupos sem precisar de card.
 */
export default function SecaoCertificacoes() {
  return (
    <section data-revelar className="faixa pb-[72px]">
      <h2 className="font-mono text-rotulo-secao font-medium text-accent-rosa">
        CERTIFICAÇÕES
      </h2>

      <div className="mt-[36px] grid grid-cols-1 items-start gap-[24px] sm:grid-cols-2 lg:grid-cols-4">
        {certificacoes.map((grupo) => (
          <div
            key={grupo.titulo}
            className="flex flex-col items-start gap-[16px] border-t-[1.5px] border-accent-rosa pt-[20px] pr-[8px]"
          >
            <h3 className="text-corpo font-bold text-text">{grupo.titulo}</h3>
            <ul className="flex w-full flex-col gap-[14px]">
              {grupo.itens.map((item) => (
                <li key={item.nome} className="flex flex-col gap-[3px]">
                  <span className="text-card-descricao leading-[1.45] text-text">
                    {item.nome}
                  </span>
                  <span className="font-mono text-[11.5px] text-text-muted">
                    {item.origem}
                  </span>
                </li>
              ))}
            </ul>
          </div>
        ))}
      </div>
    </section>
  );
}

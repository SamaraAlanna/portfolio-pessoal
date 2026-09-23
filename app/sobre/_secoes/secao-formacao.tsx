import { formacao } from "@/conteudo/sobre";

/**
 * OS DOIS CARDS TÊM A MESMA ALTURA, e isso é a grade fazendo o padrão dela. A lista tinha
 * `items-start`, que encolhe cada card até o próprio conteúdo, e como um dos títulos ocupa
 * duas linhas e o outro uma, os dois terminavam em alturas diferentes. Tirar o
 * `items-start` devolve o `stretch`, e os dois passam a medir a linha inteira.
 *
 * O `mt-auto` na linha de período empurra os metadados para o rodapé do card. Sem ele a
 * altura ficaria igual mas a sobra apareceria embaixo do card mais curto, e os dois
 * continuariam desalinhados na única linha em que o alinhamento se nota.
 */
export default function SecaoFormacao() {
  return (
    <section data-revelar className="faixa pb-[72px]">
      <h2 className="font-mono text-rotulo-secao font-medium text-accent-rosa">FORMAÇÃO</h2>

      <ul className="mt-[36px] grid grid-cols-1 gap-[24px] lg:grid-cols-2">
        {formacao.map((curso) => (
          <li
            key={curso.titulo}
            className="flex flex-col items-start gap-[10px] rounded-[12px] border-[0.5px] border-border bg-surface px-[28px] pt-[26px] pb-[28px]"
          >
            <h3 className="text-[19px] leading-[1.35] font-bold text-text">
              {curso.titulo}
            </h3>
            <p className="text-corpo text-text-muted">{curso.instituicao}</p>
            <p className="mt-auto flex flex-wrap items-center gap-[14px] pt-[4px] font-mono text-tag">
              <span className="text-accent-rosa">{curso.periodo}</span>
              <span className="text-text-dim">{curso.modalidade}</span>
            </p>
          </li>
        ))}
      </ul>
    </section>
  );
}

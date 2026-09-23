import { formacao, idiomas } from "@/conteudo/sobre";

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

      {/* Cada idioma é um par de campos, nome e nível, e aqui ele usa a mesma construção
          dos itens de certificação: o valor em texto normal e o dado técnico em mono
          embaixo. Antes era uma frase corrida separada por hífen, que escondia o par.

          NÃO GANHA CAIXA DE PROPÓSITO. Com borda e fundo este bloco competiria com os dois
          cards de formação logo acima, e ele é apoio deles, não uma terceira formação. Quem
          separa é o espaço de 52px e o rótulo em mono.

          Três colunas no desktop e uma no mobile, pela regra de coluna única. Não vira
          carrossel: são três itens de duas palavras, e a regra de carrossel vale para grade
          que não cabe. */}
      <div className="mt-[52px] flex flex-col gap-[20px]">
        <h3 className="font-mono text-ficha-rotulo font-medium tracking-[0.08em] text-accent-rosa">
          IDIOMAS
        </h3>

        <ul className="grid grid-cols-1 gap-[20px] sm:grid-cols-3 sm:gap-[40px] lg:max-w-[720px]">
          {idiomas.map(({ idioma, nivel }) => (
            <li key={idioma} className="flex flex-col gap-[3px]">
              <span className="text-corpo text-text">{idioma}</span>
              <span className="font-mono text-tag text-text-muted">{nivel}</span>
            </li>
          ))}
        </ul>
      </div>
    </section>
  );
}

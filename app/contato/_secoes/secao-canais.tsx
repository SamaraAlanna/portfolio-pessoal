import Link from "next/link";
import { canais } from "@/conteudo/contato";

/**
 * Canais diretos.
 *
 * Cada canal é um link de verdade: mailto no e-mail, perfil no LinkedIn e no GitHub. No
 * Figma eles são só texto, mas endereço que não clica numa página de contato é atrito
 * sem motivo.
 *
 * TRÊS CARTÕES, e não a lista de linhas do Figma. Lá eles eram uma coluna do duo, ao lado
 * do formulário. Sem o formulário sobrou uma coluna num espaço de duas, e esticar a lista
 * na faixa inteira deixaria o rótulo e o endereço a novecentos pixels um do outro. Em
 * cartão os dois ficam juntos, o espaço é usado, e é a mesma linguagem dos grupos da Stack
 * e das certificações do Sobre.
 *
 * Uma coluna só abaixo de 64rem: em três colunas num tablet o endereço de e-mail não cabe
 * sem quebrar feio.
 *
 * O rótulo em mono e caixa baixa é o do Figma, e vale como cabeçalho da seção: sem ele,
 * esta seção seria a única da página sem título.
 */
export default function SecaoCanais() {
  return (
    <section className="flex w-full flex-col gap-[28px]">
      <h2 className="font-mono text-rotulo-secao font-medium text-accent-rosa">
        CANAIS DIRETOS
      </h2>

      <ul className="grid grid-cols-1 items-stretch gap-[24px] lg:grid-cols-3">
        {canais.map((canal) => (
          <li key={canal.rotulo} className="flex">
            <Link
              href={canal.destino}
              className="cartao-interativo flex w-full flex-col items-start gap-[10px] rounded-[12px] border-[0.5px] border-border bg-surface px-[26px] pt-[24px] pb-[26px]"
            >
              <span className="font-mono text-tag text-text-dim">{canal.rotulo}</span>
              <span className="text-card-descricao break-words text-text">
                {canal.valor}
              </span>
            </Link>
          </li>
        ))}
      </ul>
    </section>
  );
}

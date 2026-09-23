import Image from "next/image";
import Link from "next/link";
import { apresentacao } from "@/conteudo/sobre";
import { CURRICULO } from "@/lib/site";

/**
 * Cabeçalho do Sobre.
 *
 * É o único cabeçalho de página interna com foto e botão, por isso não usa o
 * CabecalhoPagina compartilhado.
 *
 * A ORDEM MUDA ENTRE OS DOIS TAMANHOS. No desktop são duas colunas: texto à esquerda,
 * foto e botão à direita. No mobile o Figma intercala, e a leitura vira rótulo, nome,
 * foto, apresentação e botão. A foto sobe porque no celular ela é o primeiro contato com
 * a pessoa, e enterrá-la depois de três parágrafos desperdiçaria isso.
 *
 * A COLUNA DA DIREITA É UM INVÓLUCRO SÓ, E NO MOBILE ELE DESAPARECE por `display: contents`,
 * que tira a caixa do fluxo e devolve os filhos como itens diretos da grade. É isso que
 * permite intercalar sem repetir marcação: no mobile foto e botão se separam, no desktop
 * eles são uma coluna empilhada.
 *
 * O MOTIVO É UM VÃO QUE EXISTIU ATÉ 2026-09-23. Com as quatro partes soltas na grade, a
 * foto ficava sozinha na linha 1, ao lado do bloco do título. Altura de linha de grade é a
 * do item mais alto, então a linha 1 media os 296px da foto, e a apresentação, que está na
 * linha 2, só podia começar depois disso: sobrava um vão do tamanho de `296 menos a altura
 * do título`. **Não era altura fixa nem margem, era a própria grade fazendo o que ela faz.**
 *
 * As linhas são `auto 1fr`, e o `1fr` não é enfeite. O invólucro atravessa as duas linhas, e
 * quando um item que atravessa linhas é mais alto que elas, a sobra é repartida entre as
 * linhas que ele cruza. Com duas linhas `auto` a sobra se dividiria igualmente e **metade
 * dela voltaria para o vão que acabou de ser corrigido**. Com uma linha flexível, toda a
 * sobra vai para ela, e a linha do título continua do tamanho do título.
 *
 * A COLUNA DA DIREITA É CENTRADA NA ALTURA DESDE 2026-09-23, pelo `self-center`, e ela se
 * centra contra o bloco de texto inteiro: rótulo, título e os três parágrafos. Como ela
 * atravessa as duas linhas, a área dela é exatamente a altura da coluna da esquerda.
 *
 * ISSO NÃO REABRE O VÃO, e o motivo é de ordem de cálculo: a grade dimensiona as linhas
 * primeiro e só depois posiciona os itens dentro da área deles. `align-self` nunca
 * realimenta a altura das linhas, então centrar move a caixa já medida e não mexe em onde a
 * apresentação começa. **O `1fr` continua sendo o que protege**, e não é redundante com o
 * `self-center`: os dois resolvem coisas diferentes, um o tamanho das linhas e o outro a
 * posição dentro delas.
 *
 * A ÚNICA CONDIÇÃO É A ESQUERDA CONTINUAR MAIS ALTA QUE A DIREITA, e hoje ela é, por uns
 * 70px. Se a apresentação encurtar a ponto de a direita passar, o `1fr` engorda a linha 2 e
 * a área de centragem fica maior que o texto visível, então a foto pareceria baixa demais.
 * Nesse dia a saída é encurtar a coluna da direita, e não mexer nas linhas.
 *
 * O caminho do currículo vem do `lib/site.ts`, junto do link do rodapé e do botão do hero,
 * para os quatro não divergirem.
 */
export default function SecaoCabecalho() {
  return (
    <section className="grid grid-cols-1 gap-[28px] faixa pt-[var(--espaco-topo-pagina)] pb-[56px] lg:grid-cols-[minmax(0,1fr)_auto] lg:grid-rows-[auto_1fr] lg:gap-x-[64px] lg:gap-y-[24px]">
      <div className="flex max-w-[720px] flex-col items-start gap-[18px] lg:col-start-1 lg:row-start-1 lg:self-start">
        <p className="font-mono text-rotulo-secao font-medium text-accent-rosa">SOBRE</p>
        <h1 className="text-titulo-pagina font-extrabold text-text">Samara Alanna</h1>
      </div>

      {/* No mobile este invólucro não existe, e foto e botão voltam a ser itens da grade.
          O `order` do botão é o que o joga para depois da apresentação, que é a ordem do
          Figma: rótulo, nome, foto, apresentação, botão. No desktop ele é o segundo item
          desta coluna, que é onde ele já estaria. */}
      <div className="contents lg:col-start-2 lg:row-start-1 lg:row-span-2 lg:flex lg:flex-col lg:items-center lg:gap-[24px] lg:self-center">
        <Image
          src="/imagens/sobre/foto.webp"
          alt="Retrato de Samara Alanna"
          width={736}
          height={735}
          priority
          sizes="(min-width: 64rem) 296px, 100vw"
          className="h-auto w-full rounded-full object-cover lg:h-[296px] lg:w-[296px]"
        />

        <Link
          href={CURRICULO.pt}
          target="_blank"
          rel="noopener"
          className="botao-interativo botao-cheio order-1 flex w-full items-center justify-center rounded-full bg-accent-rosa px-[30px] py-[16px] text-corpo font-medium whitespace-nowrap text-bg lg:order-none lg:w-auto"
        >
          Baixar CV
          <span className="sr-only"> (abre em nova aba)</span>
        </Link>
      </div>

      <div className="flex max-w-[720px] flex-col gap-[18px] text-hero-paragrafo text-text-muted lg:col-start-1 lg:row-start-2 lg:self-start">
        {apresentacao.map((paragrafo) => (
          <p key={paragrafo.slice(0, 32)}>{paragrafo}</p>
        ))}
      </div>
    </section>
  );
}

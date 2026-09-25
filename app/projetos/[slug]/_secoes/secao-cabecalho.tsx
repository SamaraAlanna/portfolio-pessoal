import { ViewTransition } from "react";
import Link from "next/link";
import BadgeConstrucao from "@/components/ui/badge-construcao";
import type { Projeto } from "@/lib/conteudo";
import LinksDoCase from "@/components/ui/links-do-case";

/**
 * Hero do case: migalha e título, e nada mais.
 *
 * MIGALHA E TÍTULO VIRARAM UM BLOCO SÓ em 2026-09-23. Antes eram dois elementos irmãos com
 * espaçamento próprio, e no Figma novo eles são uma pilha com 20 de intervalo. Juntar deixa
 * o espaçamento entre os dois virar responsabilidade de um lugar.
 *
 * A MIGALHA VIROU RÓTULO EM MONO E CAIXA ALTA, em `--text-dim`, no lugar do texto corrido
 * que era. Ela continua sendo `nav` com nome acessível: caixa alta é estilo, e trocar a
 * semântica junto seria perder navegação por causa de tipografia.
 *
 * TAMANHO E TRACKING VÊM DO MESMO TOKEN, o `text-rotulo-secao`, que é 11px com 0,1em. O
 * Figma pede 0,08em e **os dois tokens vizinhos estão à mesma distância dele**, 0,06 e 0,1,
 * então proximidade não desempata. O desempate é de família: este é um rótulo em mono e
 * caixa alta de 11px, igual aos rótulos de seção, e usar o par inteiro deixa os dois
 * andarem juntos se o sistema mudar. A diferença para o arquivo é de 0,22px.
 *
 * A ABERTURA SAIU DAQUI E DEIXOU DE EXISTIR. O Figma novo não tem parágrafo nenhum no hero:
 * quem abre o assunto é o texto da primeira frente. O campo `abertura` sobreviveu inerte no
 * frontmatter entre 2026-09-23 e 2026-09-24, enquanto a reescrita decidia se ele viraria a
 * primeira frente, e saiu do tipo, do parser e dos quatro cases quando nenhum frame usou.
 *
 * O RESPIRO DO TOPO VEM DO `--espaco-topo-pagina`, e não dos 56 escritos aqui, desde
 * 2026-09-24. O token vale para o site inteiro, então o vão abaixo da nav passou a ser o
 * mesmo em toda página. **O `pb` lê o mesmo token**, então o hero é simétrico nos dois
 * tamanhos: 56 em cima e embaixo no desktop, 32 e 32 no mobile. A simetria é o que o Figma
 * mostra, onde o hero de 205 é 56 mais os 93 do bloco mais 56.
 *
 * A ENTRELINHA DO TÍTULO NÃO SEGUE O FIGMA, e isso é deliberado. Lá ele é uma linha só, com
 * `leading-none` e `whitespace-nowrap`. Aqui o título quebra em tela estreita, e entrelinha
 * 1 faria as duas linhas se encostarem. Vale o `--lh-titulo-case`, de 1,12, que é o token.
 *
 * O badge âmbar fica ao lado do título quando o projeto está em construção.
 */
export default function SecaoCabecalho({ projeto }: { projeto: Projeto }) {
  return (
    <header className="flex flex-col items-start gap-[20px] faixa pt-[var(--espaco-topo-pagina)] pb-[var(--espaco-topo-pagina)]">
      <nav aria-label="Você está aqui">
        <Link
          href="/projetos"
          className="link-realce alvo-toque-vertical inline-flex items-center gap-[10px] font-mono text-rotulo-secao font-medium text-text-dim"
        >
          <span aria-hidden="true">&larr;</span>
          TODOS OS PROJETOS
        </Link>
      </nav>

      {/* TÍTULO E LINKS NA MESMA LINHA NO DESKTOP, alinhados pela base, que é como os
          frames desenham: o `items-end` encosta o fim dos botões no fim do título, e não no
          meio dele. No mobile vira coluna e os links descem para baixo do título, à esquerda.

          O `min-w-0` no bloco do título é o que impede um título longo de empurrar os
          botões para fora da faixa: sem ele o item de flex não encolhe abaixo do conteúdo.

          NA ORDEM DE LEITURA E DO TAB OS LINKS VÊM DEPOIS DO `h1`, porque é essa a ordem no
          HTML. O desktop só muda onde eles são pintados, não a sequência. */}
      <div className="flex w-full flex-col items-start gap-[20px] lg:flex-row lg:items-end lg:justify-between lg:gap-[40px]">
        <div className="flex min-w-0 flex-wrap items-center gap-[16px]">
          <ViewTransition
            name={`titulo-${projeto.slug}`}
            share="morph-projeto"
            default="none"
          >
            <h1 className="text-titulo-case font-extrabold text-text">
              {projeto.tituloCase ?? projeto.titulo}
            </h1>
          </ViewTransition>
          {projeto.estado === "em-construcao" ? <BadgeConstrucao /> : null}
        </div>

        <LinksDoCase links={projeto.links} />
      </div>
    </header>
  );
}

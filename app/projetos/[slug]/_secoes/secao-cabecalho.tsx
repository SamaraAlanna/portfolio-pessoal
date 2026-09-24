import { ViewTransition } from "react";
import Link from "next/link";
import BadgeConstrucao from "@/components/ui/badge-construcao";
import type { Projeto } from "@/lib/conteudo";

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
 * O TAMANHO VEM DO TOKEN, O TRACKING VEM DO FIGMA. O `--tipo-rotulo-secao` já é 11px, que
 * é o valor do arquivo, mas o tracking de lá é 0,08em e nenhum token do projeto tem esse
 * valor: os vizinhos são 0,06 e 0,1. **Criar um token para 0,22px de diferença custaria
 * mais do que resolve**, então o tamanho sai do sistema e o tracking fica escrito aqui.
 *
 * A ABERTURA SAIU DAQUI, E A DECISÃO DE ONDE ELA VAI É DE CONTEÚDO. O Figma novo não tem
 * parágrafo nenhum no hero: quem abre o assunto passou a ser o texto da primeira frente. O
 * campo `abertura` continua no frontmatter dos cinco cases, intacto, e a reescrita decide
 * se ele vira a primeira frente ou some. **Enquanto isso não acontece, o texto existe no
 * dado e não aparece na tela**, que é o estado esperado entre os dois passos.
 *
 * A ENTRELINHA DO TÍTULO NÃO SEGUE O FIGMA, e isso é deliberado. Lá ele é uma linha só, com
 * `leading-none` e `whitespace-nowrap`. Aqui o título quebra em tela estreita, e entrelinha
 * 1 faria as duas linhas se encostarem. Vale o `--lh-titulo-case`, de 1,12, que é o token.
 *
 * O badge âmbar fica ao lado do título quando o projeto está em construção.
 */
export default function SecaoCabecalho({ projeto }: { projeto: Projeto }) {
  return (
    <header className="flex flex-col items-start gap-[20px] faixa pt-[56px] pb-[56px]">
      <nav aria-label="Você está aqui">
        <Link
          href="/projetos"
          className="link-realce alvo-toque-vertical inline-flex items-center gap-[10px] font-mono text-rotulo-secao font-medium tracking-[0.08em] text-text-dim"
        >
          <span aria-hidden="true">&larr;</span>
          TODOS OS PROJETOS
        </Link>
      </nav>

      <div className="flex flex-wrap items-center gap-[16px]">
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
    </header>
  );
}

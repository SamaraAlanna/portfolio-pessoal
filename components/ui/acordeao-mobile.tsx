import type { ReactNode } from "react";
import IconeChevron from "@/components/ui/icone-chevron";

/**
 * Accordion. Por padrão ele só existe no mobile, e o desktop mostra tudo aberto.
 *
 * Usado em três lugares. As colunas de "O que eu faço" na home e os blocos de código dos
 * cases ficam no padrão: o Figma mostra a mesma mecânica nos dois, cabeçalho com chevron e
 * painel oculto, e nos dois o desktop mostra tudo aberto sem cabeçalho clicável.
 *
 * AS ÁREAS DE CERTIFICAÇÃO PASSAM `sempreAbertoNoDesktop={false}`, e aí o accordion fecha
 * nos dois tamanhos. São três áreas com 18 certificados: abrir tudo no desktop devolveria
 * a parede de itens que o accordion existe para evitar.
 *
 * **É um parâmetro e não um segundo componente**, porque um jeito só de fazer accordion
 * vale mais que a economia de uma condicional. A diferença toda mora em duas classes de
 * CSS, a `.acordeao` de base e a `.acordeao-mobile` que acrescenta o desktop aberto.
 *
 * É O DETAILS NATIVO, e por isso este componente não tem "use client", não tem estado e
 * não manda JavaScript nenhum para o navegador. Teclado, semântica de disclosure e
 * funcionamento sem JavaScript vêm da plataforma. A mecânica que faz o desktop ficar
 * sempre aberto está em app/globals.css, junto da explicação de por que ela é assim.
 *
 * O rótulo aparece duas vezes: dentro do summary, que é o cabeçalho do mobile, e no
 * elemento de fora, que é o do desktop. Só um dos dois está no layout por vez, e o que
 * está fora dele não é anunciado por leitor de tela, então não há repetição. Fazer o
 * summary servir aos dois custaria uma parada de tabulação no desktop, num cabeçalho que
 * lá não é clicável.
 *
 * A tag do rótulo vem de fora porque o contexto muda: na home ele é um h2 de seção, no
 * bloco de código é o nome do arquivo.
 *
 * A animação de abrir e fechar fica para a passada de animação. O ::details-content já é
 * o lugar certo para ela, com interpolate-size.
 */
export default function AcordeaoMobile({
  titulo,
  tag = "div",
  classeTag = "",
  classeLinha = "",
  classePainel = "",
  padraoAberto = false,
  sempreAbertoNoDesktop = true,
  children,
}: {
  /** Texto do cabeçalho. Vira o nome acessível do summary no mobile. */
  titulo: ReactNode;
  tag?: "h2" | "h3" | "div";
  /** Tipografia e cor do cabeçalho, nas duas versões. */
  classeTag?: string;
  /** Espaçamento e altura da linha do cabeçalho, nas duas versões. */
  classeLinha?: string;
  classePainel?: string;
  /** Se o painel nasce aberto. Com `sempreAbertoNoDesktop`, só vale no mobile. */
  padraoAberto?: boolean;
  /** Falso mantém o accordion fechado também no desktop, com o cabeçalho clicável. */
  sempreAbertoNoDesktop?: boolean;
  children: ReactNode;
}) {
  const Rotulo = tag;

  return (
    <>
      {/* O rótulo fixo só existe na variante de desktop aberto. Sem ela o summary nunca sai
          do layout, e um segundo rótulo seria repetição de verdade, não alternância. */}
      {sempreAbertoNoDesktop ? (
        <Rotulo className={`acordeao-rotulo-fixo w-full ${classeTag} ${classeLinha}`}>
          {titulo}
        </Rotulo>
      ) : null}

      <details
        open={padraoAberto}
        className={`acordeao w-full ${sempreAbertoNoDesktop ? "acordeao-mobile" : ""}`}
      >
        <summary className={`${classeTag} ${classeLinha}`}>
          <Rotulo className="min-w-0">{titulo}</Rotulo>
          <IconeChevron className="acordeao-chevron shrink-0" />
        </summary>

        <div className={`w-full ${classePainel}`}>{children}</div>
      </details>
    </>
  );
}

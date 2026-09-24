import type { ReactNode } from "react";

/**
 * Bloco de seção. É o bloco mais comum do conteúdo.
 *
 * Ritmo definido em docs/modelos-de-case.md e confirmado nos cases do Figma: rótulo curto
 * em mono caixa alta, título, um parágrafo, a prova.
 *
 * Os espaçamentos vêm do Figma: 28 entre rótulo e título, 18 entre título e primeiro
 * parágrafo, 14 entre parágrafos, e 40 antes da prova.
 *
 * O NÚMERO E A ÂNCORA NÃO VÊM DO MDX, e sim de quem monta a página. Eles são injetados
 * pelo `blocosComIndice`, que já leu as seções em ordem: número é posição, e posição não é
 * coisa que o autor deva digitar, porque inserir uma seção no meio obrigaria a renumerar
 * tudo à mão.
 *
 * A SEÇÃO RECEBE `tabIndex={-1}` PARA PODER RECEBER FOCO. Ela não é interativa e continua
 * fora da ordem de tabulação; o `-1` só a torna alcançável por código, que é o que o
 * índice faz ao ser clicado. Sem isso o foco do teclado ficaria no índice enquanto a tela
 * mostra outra coisa, e o próximo Tab continuaria de onde a pessoa não está mais.
 *
 * O `aria-labelledby` aponta para o rótulo, então ao receber foco a região é anunciada
 * pelo nome dela em vez de pelo conteúdo inteiro.
 */

/**
 * O rótulo é um `p` quando existe título grande logo abaixo, porque aí quem nomeia a
 * seção é o título. Sem título, o rótulo assume o papel e vira `h2`, para a seção não
 * ficar fora da estrutura de cabeçalhos da página.
 *
 * O NÚMERO NÃO MUDA NÍVEL DE CABEÇALHO, só entra no texto do rótulo. A seção continua
 * sendo um `h2` por página, seja no rótulo, seja no título.
 *
 * A CAIXA ALTA É `text-transform`, E NÃO O TEXTO DO MDX. O rótulo é escrito em caixa normal
 * no conteúdo, e quem sobe é o CSS. Isso serve a três coisas de uma vez: o índice usa o
 * mesmo texto sem converter nada, sigla não é destruída por uma função de caixa, e **leitor
 * de tela recebe a palavra em vez de maiúsculas**, que parte deles soletra letra a letra.
 *
 * A aparência é a mesma nos dois casos.
 */
function RotuloDaSecao({
  id,
  titulo,
  children,
}: {
  id?: string;
  titulo?: string;
  children: ReactNode;
}) {
  const Elemento = titulo ? "p" : "h2";

  return (
    <Elemento
      id={id}
      className="font-mono text-rotulo-secao font-medium whitespace-nowrap text-accent-rosa uppercase"
    >
      {children}
    </Elemento>
  );
}

export default function BlocoSecao({
  rotulo,
  titulo,
  numero,
  ancora,
  children,
}: {
  rotulo?: string;
  titulo?: string;
  /** Posição da seção no case, com zero à esquerda. Injetada, não escrita no MDX. */
  numero?: string;
  /** Destino da âncora do índice. Injetada, não escrita no MDX. */
  ancora?: string;
  children?: ReactNode;
}) {
  const idDoRotulo = ancora ? `${ancora}-rotulo` : undefined;

  return (
    <section
      data-revelar
      data-secao-case={ancora ? "" : undefined}
      id={ancora}
      tabIndex={ancora ? -1 : undefined}
      aria-labelledby={idDoRotulo}
      className="secao-de-case flex w-full flex-col items-start"
    >
      {rotulo ? (
        // Quando a seção tem título grande, ele é o cabeçalho e o rótulo é só um selo
        // acima. Quando não tem, como no "SELETOR DE MANUAL" do VOGE, quem nomeia a seção
        // é o rótulo, e aí ele precisa ser o cabeçalho, senão a seção fica sem nenhum.
        <RotuloDaSecao id={idDoRotulo} titulo={titulo}>
          {numero ? `${numero}. ` : ""}
          {rotulo}
        </RotuloDaSecao>
      ) : null}

      {titulo ? (
        <h2 className="mt-[28px] max-w-[780px] text-titulo-bloco font-bold text-text">
          {titulo}
        </h2>
      ) : null}

      <div className="mt-[18px] flex w-full flex-col gap-[14px] text-corpo-case text-text-muted [&>*+figure]:mt-[26px] [&>*+ol]:mt-[26px] [&>*+ul]:mt-[26px] [&>*+div]:mt-[26px] [&>*+dl]:mt-[26px]">
        {children}
      </div>
    </section>
  );
}

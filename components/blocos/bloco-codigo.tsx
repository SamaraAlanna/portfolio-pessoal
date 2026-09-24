import { Children, isValidElement, type ReactNode } from "react";
import AcordeaoMobile from "@/components/ui/acordeao-mobile";
import CodigoComAbas from "@/components/ui/codigo-com-abas";

/**
 * Bloco de código.
 *
 * NO MOBILE ELE É UM ACCORDION FECHADO, com o nome do arquivo no cabeçalho e as linhas
 * ocultas, confirmado no case do Figma: lá a titlebar aparece com chevron e tanto a régua
 * quanto o frame de linhas estão marcados como ocultos. No desktop o bloco é sempre
 * aberto e o cabeçalho não é clicável.
 *
 * Fechado por padrão nos dois lados de uma comparação. Num antes e depois isso significa
 * dois cabeçalhos empilhados, que é exatamente o que o Figma mostra: quem lê decide qual
 * dos dois quer abrir, em vez de rolar dois blocos de código inteiros para chegar no
 * texto seguinte.
 *
 * A régua entra dentro do painel, e não entre o cabeçalho e ele, porque quando o bloco
 * está fechado não há o que separar.
 *
 * O cabeçalho não é mais um figcaption. Ele agora vive dentro do summary do details, e um
 * figcaption precisa ser filho direto da figure. O nome do arquivo continua chegando a
 * quem usa leitor de tela pelo aria-label da região de código.
 *
 * O corpo não quebra linha, ele rola na horizontal. Isso vale nos dois tamanhos e não é
 * adaptação de mobile.
 *
 * O cabeçalho é só um rótulo, sem os três pontos coloridos. Os pontos existem no cartão
 * decorativo do hero, que é outra coisa: ali eles ilustram uma janela, aqui o bloco é
 * conteúdo do case.
 *
 * ACESSIBILIDADE: o corpo é uma região rolável, então precisa ser alcançável pelo
 * teclado. Sem tabIndex, quem navega por teclado não consegue rolar o código para ver o
 * que está fora da tela. O anel de foco aparece por fora e não é recortado, porque a
 * rolagem está aqui e não num ancestral. Quando o painel está fechado ele sai do fluxo
 * com display none, e aí o corpo também sai da ordem de tabulação, que é o correto.
 *
 * O atributo `prova` marca este bloco como a prova visual central do case, e ele ganha uma
 * entrada própria, mais elaborada que a dos outros: uma varredura de cima para baixo, como
 * se as linhas estivessem sendo escritas. Uma por case: se houver duas marcadas, vale a
 * primeira. A animação está no `app/globals.css` e só existe no desktop.
 *
 * O ATRIBUTO `abas` LIGA A VERSÃO COM MAIS DE UM CÓDIGO, e é o que substitui o
 * `antes-depois` com `formato="codigo"`. Cada cerca de código vira um painel, e os rótulos
 * saem da lista separada por vírgula:
 *
 *   :::codigo{arquivo="validacao.php" abas="Antes, Depois"}
 *   ```php
 *   ...
 *   ```
 *
 *   ```php
 *   ...
 *   ```
 *   :::
 *
 * A CONTAGEM PRECISA BATER, E O BUILD QUEBRA QUANDO NÃO BATE. Três rótulos com dois
 * códigos deixaria uma aba apontando para painel inexistente, e isso não aparece navegando
 * no desktop se a aba quebrada não for a primeira. Falhar na compilação é a única forma de
 * o autor descobrir na hora.
 */
export default function BlocoCodigo({
  arquivo,
  destaque,
  prova,
  abas,
  children,
}: {
  arquivo?: string;
  /** Marca o lado "depois" de uma comparação, que no Figma vem em accent. */
  destaque?: string;
  prova?: string;
  /** Rótulos das abas, separados por vírgula. Ausente, o bloco tem um código só. */
  abas?: string;
  children?: ReactNode;
}) {
  const rotuloEmAccent = destaque === "true";
  const rotulosDasAbas = abas
    ? abas.split(",").map((rotulo) => rotulo.trim()).filter(Boolean)
    : [];

  // Só os elementos: o MDX deixa nós de texto em branco entre uma cerca e outra, e contar
  // eles faria a validação reprovar conteúdo correto.
  const paineis = Children.toArray(children).filter((filho) => isValidElement(filho));

  if (rotulosDasAbas.length > 0 && rotulosDasAbas.length !== paineis.length) {
    throw new Error(
      `Bloco de código "${arquivo ?? "sem nome"}": ${rotulosDasAbas.length} rótulos em ` +
        `\`abas\` para ${paineis.length} blocos de código. Os dois precisam bater.`,
    );
  }

  const temAbas = rotulosDasAbas.length > 0;
  const ehProva = prova === "true";
  const marca = ehProva
    ? { "data-prova": "", "data-revelar": "", className: " prova-codigo" }
    : { className: "" };

  const corpo = (
    <div
      tabIndex={0}
      role="region"
      aria-label={arquivo ? `Código de ${arquivo}` : "Código"}
      className="w-full overflow-x-auto px-[20px] pt-[16px] pb-[18px] font-mono text-codigo whitespace-pre text-text-muted [&_code]:font-mono [&_pre]:whitespace-pre"
    >
      {children}
    </div>
  );

  // Sem nome de arquivo não há cabeçalho, e sem cabeçalho não há gatilho de accordion.
  // Nesse caso o bloco fica aberto nos dois tamanhos.
  if (!arquivo) {
    return (
      <figure
        data-prova={marca["data-prova"]}
        data-revelar={marca["data-revelar"]}
        className={`flex h-full w-full flex-col rounded-[12px] bg-surface-2${marca.className}`}
      >
        {corpo}
      </figure>
    );
  }

  return (
    <figure
        data-prova={marca["data-prova"]}
        data-revelar={marca["data-revelar"]}
        className={`flex h-full w-full flex-col rounded-[12px] bg-surface-2${marca.className}`}
      >
      <AcordeaoMobile
        tag="div"
        titulo={arquivo}
        classeTag={`font-mono text-titlebar font-medium whitespace-nowrap ${
          rotuloEmAccent ? "text-accent-rosa" : "text-text-dim"
        }`}
        classeLinha="min-h-[var(--alvo-toque)] px-[20px] py-[13px] lg:min-h-0"
        classePainel="flex flex-col"
      >
        {temAbas ? (
          // As abas trazem o próprio filete, depois da lista, então não entra outro aqui.
          <CodigoComAbas arquivo={arquivo} abas={rotulosDasAbas} paineis={paineis} />
        ) : (
          <>
            <div aria-hidden="true" className="h-px w-full bg-border" />
            {corpo}
          </>
        )}
      </AcordeaoMobile>
    </figure>
  );
}

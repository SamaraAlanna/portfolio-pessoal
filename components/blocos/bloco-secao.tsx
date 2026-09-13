import type { ReactNode } from "react";

/**
 * Bloco de seção. É o bloco mais comum do conteúdo.
 *
 * Ritmo definido em docs/modelos-de-case.md e confirmado nos cases do Figma: rótulo curto
 * em mono caixa alta, título, um parágrafo, a prova.
 *
 * Os espaçamentos vêm do Figma: 28 entre rótulo e título, 18 entre título e primeiro
 * parágrafo, 14 entre parágrafos, e 40 antes da prova.
 */
/**
 * O rótulo é um `p` quando existe título grande logo abaixo, porque aí quem nomeia a
 * seção é o título. Sem título, o rótulo assume o papel e vira `h2`, para a seção não
 * ficar fora da estrutura de cabeçalhos da página.
 *
 * A aparência é a mesma nos dois casos.
 */
function RotuloDaSecao({
  titulo,
  children,
}: {
  titulo?: string;
  children: ReactNode;
}) {
  const Elemento = titulo ? "p" : "h2";

  return (
    <Elemento className="font-mono text-rotulo-secao font-medium whitespace-nowrap text-accent-rosa">
      {children}
    </Elemento>
  );
}

export default function BlocoSecao({
  rotulo,
  titulo,
  children,
}: {
  rotulo?: string;
  titulo?: string;
  children?: ReactNode;
}) {
  return (
    <section data-revelar className="flex w-full flex-col items-start">
      {rotulo ? (
        // Quando a seção tem título grande, ele é o cabeçalho e o rótulo é só um selo
        // acima. Quando não tem, como no "SELETOR DE MANUAL" do VOGE, quem nomeia a seção
        // é o rótulo, e aí ele precisa ser o cabeçalho, senão a seção fica sem nenhum.
        <RotuloDaSecao titulo={titulo}>{rotulo}</RotuloDaSecao>
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

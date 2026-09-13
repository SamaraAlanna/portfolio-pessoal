import type { ReactNode } from "react";

/**
 * Caixa de destaque com fundo tingido.
 *
 * É A ÚNICA COISA NO PROJETO QUE USA FUNDO TINGIDO, e docs/modelos-de-case.md limita a
 * uma por página. Todo o resto de destaque usa o bloco-citacao, que é filete sem fundo.
 * Antes de acrescentar um segundo destaque numa página, troque um dos dois por citação.
 *
 * A primeira linha vem em 22px e no tom principal, o resto no corpo, pelo mesmo seletor
 * de primeiro filho da citação.
 */
export default function BlocoDestaque({ children }: { children?: ReactNode }) {
  return (
    <aside className="flex w-full flex-col gap-[14px] rounded-[12px] border-[0.5px] border-accent-rosa bg-tint-rosa px-[40px] pt-[34px] pb-[36px] text-corpo-case text-text-muted [&>p:first-child]:text-[22px] [&>p:first-child]:leading-[1.5] [&>p:first-child]:font-medium [&>p:first-child]:text-text">
      {children}
    </aside>
  );
}

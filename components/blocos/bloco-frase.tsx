import type { ReactNode } from "react";

/**
 * Frase de destaque com legenda explicativa acima.
 *
 * Existe para o posicionamento do Tech Girls, onde uma linha menor explica o que a frase
 * é e para que serve, e a frase vem logo abaixo, maior.
 *
 * É diferente da citação: ali a afirmação vem primeiro e o desenvolvimento depois. Aqui a
 * explicação prepara a frase, então a ordem é invertida e os tamanhos também.
 */
export default function BlocoFrase({
  legenda,
  children,
}: {
  legenda?: string;
  children?: ReactNode;
}) {
  return (
    <div className="flex w-full flex-col items-start gap-[10px]">
      {legenda ? (
        <p className="text-cta leading-[1.65] text-text-muted">{legenda}</p>
      ) : null}
      <div className="text-[18px] leading-[1.5] font-medium text-text">{children}</div>
    </div>
  );
}

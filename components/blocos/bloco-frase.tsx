import type { ReactNode } from "react";

/**
 * Frase de destaque com legenda explicativa acima.
 *
 * SEM USO DESDE 2026-09-23, e é candidato a remoção. Ele existia para o posicionamento do
 * Tech Girls, que saiu do site junto com os outros dois cases de identidade visual, e
 * nenhum dos cinco cases restantes o invoca. Fica parado até a passada de limpeza do
 * redesenho, para a decisão de apagar ser tomada junto com a dos outros órfãos.
 *
 * O que ele faz: uma linha menor explica o que a frase é e para que serve, e a frase vem
 * logo abaixo, maior. É diferente da citação, onde a afirmação vem primeiro e o
 * desenvolvimento depois. Aqui a explicação prepara a frase, então a ordem é invertida e
 * os tamanhos também.
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

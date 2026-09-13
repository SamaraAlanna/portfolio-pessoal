import type { ReactNode } from "react";
import TrilhoRolavel from "@/components/ui/trilho-rolavel";

/**
 * Grade de imagens.
 *
 * Cada imagem vai num parágrafo próprio no conteúdo, separada por linha em branco:
 *
 *   :::imagens{colunas="2"}
 *   ![Marca principal](/imagens/cases/tech-girls-logo-1.webp)
 *
 *   ![Aplicação em camiseta](/imagens/cases/tech-girls-logo-2.webp)
 *   :::
 *
 * Sem a linha em branco o Markdown junta tudo num parágrafo só e o trilho passa a ter um
 * item em vez de vários, o que quebra o carrossel no mobile.
 *
 * DOIS FORMATOS:
 *
 * - padrão: grade de colunas iguais, com o número em `colunas`.
 * - formato="linha": fileira de altura igual, com a largura de cada imagem saindo da
 *   própria proporção. É o que a seção de marca do Míriam precisa, onde um retrato de 357
 *   e uma paisagem de 831 dividem a mesma linha. Em colunas iguais o retrato viraria quase
 *   o dobro da altura da paisagem e a linha desmontaria.
 *
 *   A altura da fileira é fluida e limitada, calibrada pela proporção do Figma, onde a
 *   linha tem 536 de altura numa faixa de 1200. No mobile a fileira empilha, e não vira
 *   carrossel, porque as duas imagens dela são a mesma marca vista de dois jeitos:
 *   separar uma da outra por rolagem desfaz a comparação.
 *
 * MOBILE: com duas ou três colunas a grade vira carrossel horizontal, que é a regra das
 * variações de logo do Figma. Com uma coluna não vira: ali a imagem é única e ocupa a
 * largura toda, e um trilho de um item só seria rolagem sem destino.
 *
 * ALTURA DESIGUAL: os itens alinham pelo topo e não esticam. No Figma as grades de imagem
 * tinham problema de altura desigual entre itens, e esticar piorava.
 *
 * SEM RECORTE: este é o bloco mais propenso a receber overflow hidden, para arredondar
 * canto de imagem. Não faça isso aqui. Se a imagem tiver link em volta, o recorte come o
 * anel de foco. O arredondamento vai na própria imagem.
 */
export default function BlocoImagens({
  colunas = "2",
  formato,
  children,
}: {
  colunas?: string;
  formato?: string;
  children?: ReactNode;
}) {
  if (formato === "linha") {
    return (
      <div className="w-full">
        <div className="flex flex-col gap-[24px] lg:h-[min(44vw,500px)] lg:flex-row lg:items-stretch [&_img]:h-auto [&_img]:w-full [&_img]:rounded-[8px] lg:[&>p]:h-full lg:[&_img]:h-full lg:[&_img]:w-auto lg:[&_img]:max-w-none lg:[&_img]:object-contain">
          {children}
        </div>
      </div>
    );
  }

  if (colunas === "1") {
    return (
      <div className="w-full">
        <div className="grid grid-cols-1 items-start gap-[20px] [&_img]:h-auto [&_img]:w-full [&_img]:rounded-[8px]">
          {children}
        </div>
      </div>
    );
  }

  const porLinha: Record<string, string> = {
    "2": "sm:grid-cols-2",
    "3": "sm:grid-cols-3",
  };

  return (
    <TrilhoRolavel
      rotulo="Imagens do projeto"
      className="w-full overflow-x-auto overscroll-x-contain px-[2px] pb-[8px] sm:overflow-x-visible sm:px-0 sm:pb-0"
    >
      <div
        className={`flex snap-x snap-mandatory items-start gap-[20px] sm:grid sm:snap-none ${porLinha[colunas] ?? porLinha["2"]} [&>p]:w-[260px] [&>p]:shrink-0 [&>p]:snap-start sm:[&>p]:w-auto [&_img]:h-auto [&_img]:w-full [&_img]:rounded-[8px]`}
      >
        {children}
      </div>
    </TrilhoRolavel>
  );
}

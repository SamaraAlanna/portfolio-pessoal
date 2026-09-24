import type { CSSProperties, ReactNode } from "react";
import { linhasDeCampos } from "@/lib/texto";
import TrilhoRolavel from "@/components/ui/trilho-rolavel";

/**
 * Amostras de cor.
 *
 * Formato do conteúdo, uma linha por cor:
 *   #e6b7d3 | Rosa | design e produto
 *
 * O terceiro campo é opcional.
 *
 * TRÊS DESENHOS, pelo atributo formato:
 *
 * - padrão: amostra nua, arredondada, com nome e hex embaixo em mono.
 * - formato="cartao": card com borda, amostra de 120px no topo e bloco de informação
 *   embaixo, com o nome em DM Sans e o hex em mono.
 *
 *   Os dois primeiros formatos ficaram sem uso em 2026-09-23, quando os três cases de
 *   identidade visual saíram. Só o `inline` continua invocado, pelo Assistente.
 * - formato="inline": amostra de 14px ao lado do hex, numa fileira. É a mini-paleta que
 *   o Assistente usa dentro de cada painel da comparação de cor, onde a paleta é legenda
 *   do mockup e não o conteúdo principal da seção.
 *
 * MOBILE: os dois primeiros formatos viram carrossel horizontal, seguindo a mesma regra
 * dos números. O formato inline não vira, porque ele é legenda: são quatro amostras de
 * 14px que cabem em duas linhas, e mandar a pessoa rolar para ler uma legenda seria pior
 * que a quebra.
 *
 * A linha divide a largura igualmente entre quantas cores existirem, que é o que o Figma
 * faz nos três cases, com seis, seis e três.
 *
 * Itens alinhados pelo topo e não esticados, porque a legenda de cada cor tem tamanho
 * diferente e esticar deixava as amostras com altura desigual. *
 * O atributo `prova` marca este bloco como a prova visual central do case, e ele ganha uma
 * entrada própria, mais elaborada que a dos outros. Uma por case: se houver duas marcadas,
 * vale a primeira. A animação está no `app/globals.css` e só existe no desktop.
 */
export default function BlocoPaleta({
  formato,
  titulo,
  prova,
  children,
}: {
  formato?: string;
  /** Rótulo acima das amostras, para quando duas paletas aparecem lado a lado. */
  titulo?: string;
  prova?: string;
  children?: ReactNode;
}) {
  const cores = linhasDeCampos(children);
  const cartao = formato === "cartao";
  const enfileirada = formato === "inline";
  const ehProva = prova === "true" && !enfileirada;

  return (
    <div
      data-prova={ehProva ? "" : undefined}
      data-revelar={ehProva ? "" : undefined}
      className="flex w-full flex-col gap-[16px]"
    >
      {titulo ? (
        <p className="font-mono text-rotulo-secao font-medium tracking-[var(--tracking-rotulo-secao)] text-text-muted">
          {titulo}
        </p>
      ) : null}
      {enfileirada ? (
        <ul className="flex flex-wrap items-center gap-[16px]">
          {cores.map(([valor, nome], indice) => (
            <li key={`${valor}-${indice}`} className="flex items-center gap-[6px]">
              <span
                aria-hidden="true"
                style={{ backgroundColor: valor }}
                className="size-[14px] shrink-0 rounded-[4px] border-[0.5px] border-[rgba(128,128,128,0.35)]"
              />
              <span className="font-mono text-[11px] whitespace-nowrap text-text-muted">
                {nome ?? valor}
              </span>
            </li>
          ))}
        </ul>
      ) : (
        <TrilhoRolavel
          rotulo={titulo ? `Paleta ${titulo}` : "Paleta de cores"}
          className="w-full overflow-x-auto overscroll-x-contain px-[2px] pb-[8px] sm:overflow-x-visible sm:px-0 sm:pb-0"
        >
          <ul className="flex snap-x snap-mandatory items-start gap-[16px] sm:flex-wrap sm:snap-none">
            {cores.map(([valor, nome, papel], indice) => (
              <li
                key={`${valor}-${indice}`}
                className={`flex shrink-0 snap-start flex-col items-start sm:w-auto sm:min-w-[140px] sm:shrink sm:flex-1 ${
                  ehProva ? "prova-item" : ""
                } ${
                  cartao ? "w-[190px]" : "w-[150px]"
                } ${
                  cartao
                    ? "overflow-hidden rounded-[12px] border-[0.5px] border-border bg-surface"
                    : "gap-[10px]"
                }`}
              >
                {/* A cor vai numa variável, e não direto no background, para a entrada
                    da prova poder partir de outra cor sem precisar de !important contra o
                    estilo em linha. */}
                <span
                  aria-hidden="true"
                  style={{ "--cor-amostra": valor } as CSSProperties}
                  className={`${ehProva ? "prova-amostra" : ""} bg-[var(--cor-amostra)] ${
                    cartao
                      ? "h-[120px] w-full"
                      : "h-[60px] w-full rounded-[8px] border-[0.5px] border-border"
                  }`}
                />

                <span
                  className={`flex flex-col items-start ${
                    cartao ? "gap-[5px] px-[16px] pt-[14px] pb-[16px]" : "gap-[4px]"
                  }`}
                >
                  {cartao ? (
                    <>
                      <span className="text-[14px] font-medium text-text">
                        {nome ?? valor}
                      </span>
                      <span className="font-mono text-tag text-text-muted">{valor}</span>
                    </>
                  ) : (
                    <>
                      <span className="font-mono text-[11.5px] leading-[1.7] text-text-muted">
                        {nome ?? valor}
                      </span>
                      <span className="font-mono text-[11.5px] leading-[1.7] text-text-muted">
                        {valor}
                      </span>
                    </>
                  )}
                  {papel ? (
                    <span className="text-tag leading-[1.55] text-text-muted">
                      {papel}
                    </span>
                  ) : null}
                </span>
              </li>
            ))}
          </ul>
        </TrilhoRolavel>
      )}
    </div>
  );
}

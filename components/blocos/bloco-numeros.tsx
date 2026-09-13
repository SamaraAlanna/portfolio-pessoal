import type { ReactNode } from "react";
import { linhasDeCampos } from "@/lib/texto";
import TrilhoRolavel from "@/components/ui/trilho-rolavel";

/**
 * Grade de números.
 *
 * Formato do conteúdo, uma linha por número, com a camada como terceiro campo opcional:
 *   106 | formulários com validação dupla
 *   83  | formulários protegidos contra duplo clique | lavanda
 *   700+ | arquivos órfãos removidos do servidor | ciano
 *
 * A cor não é decoração: no sistema ela diz a camada a que o número pertence. No case do
 * Bajaj os números de front-end estão em lavanda e o de servidor em ciano. Sem o terceiro
 * campo, o número sai em rosa.
 *
 * MOBILE: carrossel horizontal com encaixe, com cards de 210px e espaço de 12, medidos do
 * Figma. A partir de 40rem a grade volta, porque aí já cabem duas colunas inteiras e um
 * trilho de 210 num tablet seria desperdício de largura.
 *
 * A moldura não recorta o conteúdo verticalmente: o padding de baixo dá respiro para o
 * anel de foco da própria moldura quando ela vira região rolável. *
 * O atributo `prova` marca este bloco como a prova visual central do case, e ele ganha uma
 * entrada própria, mais elaborada que a dos outros. Uma por case: se houver duas marcadas,
 * vale a primeira. A animação está no `app/globals.css` e só existe no desktop.
 */
const CORES: Record<string, string> = {
  rosa: "text-accent-rosa",
  lavanda: "text-accent-lavanda",
  ciano: "text-accent-ciano",
  ambar: "text-accent-ambar",
};

export default function BlocoNumeros({
  prova,
  children,
}: {
  prova?: string;
  children?: ReactNode;
}) {
  const numeros = linhasDeCampos(children);
  const ehProva = prova === "true";

  return (
    <div
      data-prova={ehProva ? "" : undefined}
      data-revelar={ehProva ? "" : undefined}
      className="w-full"
    >
    <TrilhoRolavel
      rotulo="Números do projeto"
      className="w-full overflow-x-auto overscroll-x-contain px-[2px] pb-[8px] sm:overflow-x-visible sm:px-0 sm:pb-0"
    >
      <dl className="flex snap-x snap-mandatory gap-[12px] sm:grid sm:snap-none sm:grid-cols-2 sm:items-start sm:gap-[20px] lg:grid-cols-3">
        {numeros.map(([valor, legenda, camada], indice) => (
          <div
            key={`${valor}-${indice}`}
            className={`flex w-[210px] shrink-0 snap-start flex-col items-start gap-[10px] rounded-[12px] border-[0.5px] border-border bg-surface px-[26px] pt-[24px] pb-[26px] sm:w-auto sm:shrink ${
              ehProva ? "prova-item prova-numero" : ""
            }`}
          >
            <dt
              className={`text-numero font-extrabold whitespace-nowrap ${
                CORES[camada ?? ""] ?? CORES.rosa
              }`}
            >
              {valor}
            </dt>
            <dd className="text-legenda text-text-muted">{legenda}</dd>
          </div>
        ))}
      </dl>
      </TrilhoRolavel>
    </div>
  );
}

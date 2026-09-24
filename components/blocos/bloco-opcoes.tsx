import type { ReactNode } from "react";
import { linhasDeCampos } from "@/lib/texto";

/**
 * Opções lado a lado, em cards.
 *
 * Formato do conteúdo, uma linha por opção:
 *   rótulo | título | descrição | camada
 *
 *   :::opcoes
 *   PRIMÁRIO | Heroína | Empoderamento: mulheres no topo da tecnologia. | rosa
 *   SUPORTE | Cuidadora | Acolhimento e sororidade. | lavanda
 *   :::
 *
 * A camada é opcional e vale para a cor do rótulo, seguindo o significado do sistema.
 *
 * SEM USO DESDE 2026-09-23, quando o Tech Girls saiu, e **não é candidato a remoção**: o
 * redesenho dos cases traz os cards de decisão do CRUD, que são este bloco com outra
 * roupa, rótulo mais título mais descrição em duas colunas. Ele espera esse uso.
 *
 * Quando o rótulo é ESCOLHIDA, o card ganha borda em accent. É assim, e não com fundo
 * tingido, porque docs/modelos-de-case.md limita a uma caixa tingida por página, e essa
 * cota costuma já estar gasta pelo bloco destaque.
 */
const CORES: Record<string, string> = {
  rosa: "text-accent-rosa",
  lavanda: "text-accent-lavanda",
  ciano: "text-accent-ciano",
  ambar: "text-accent-ambar",
};

export default function BlocoOpcoes({ children }: { children?: ReactNode }) {
  const opcoes = linhasDeCampos(children);

  return (
    <ul className="grid w-full grid-cols-1 items-start gap-[24px] lg:grid-cols-2">
      {opcoes.map(([rotulo, titulo, descricao, camada], indice) => {
        const escolhida = rotulo?.toUpperCase() === "ESCOLHIDA";
        return (
          <li
            key={`${titulo}-${indice}`}
            className={`flex h-full flex-col items-start gap-[12px] rounded-[12px] border-[0.5px] bg-surface px-[28px] pt-[26px] pb-[28px] ${
              escolhida ? "border-accent-rosa" : "border-border"
            }`}
          >
            {rotulo ? (
              <p
                className={`font-mono text-ficha-rotulo font-medium tracking-[0.08em] whitespace-nowrap ${
                  CORES[camada ?? ""] ?? CORES.rosa
                }`}
              >
                {rotulo}
              </p>
            ) : null}
            {titulo ? (
              <p className="text-[21px] font-bold text-text">{titulo}</p>
            ) : null}
            {descricao ? (
              <p className="text-corpo leading-[1.58] text-text-muted">{descricao}</p>
            ) : null}
          </li>
        );
      })}
    </ul>
  );
}

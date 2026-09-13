import { Children, type ReactNode } from "react";
import { linhasDeCampos } from "@/lib/texto";

/**
 * Antes e depois.
 *
 * Duas formas, porque no Figma o bloco aparece com dois conteúdos bem diferentes.
 *
 * 1. COMPARAÇÃO DE NÚMERO, com formato="numero". Uma linha por lado:
 *
 *      :::antes-depois{formato="numero"}
 *      2,68 GB | repositório com histórico sujo
 *      3,4 MB | depois da limpeza
 *      :::
 *
 *    O número do "antes" sai em text-dim e o do "depois" em ciano, que é a camada de
 *    dados. A diferença de cor é o que faz a melhora ser lida sem depender do texto.
 *
 * 2. COMPARAÇÃO DE CONTEÚDO, sem formato. Recebe dois filhos diretos, tipicamente dois
 *    blocos de código, e coloca um de cada lado.
 *
 * Os rótulos são atributos e não texto do conteúdo, para o par continuar legível nos dois
 * formatos.
 */
export default function BlocoAntesDepois({
  antes = "ANTES",
  depois = "DEPOIS",
  formato,
  children,
}: {
  antes?: string;
  depois?: string;
  formato?: string;
  children?: ReactNode;
}) {
  const rotulos = [antes, depois];

  if (formato === "numero") {
    const linhas = linhasDeCampos(children);

    return (
      <div className="grid w-full grid-cols-2 items-start gap-[24px]">
        {linhas.slice(0, 2).map(([valor, legenda], indice) => (
          <div
            key={`${valor}-${indice}`}
            className="flex flex-col items-start gap-[10px] rounded-[12px] border-[0.5px] border-border bg-surface px-[28px] pt-[26px] pb-[28px]"
          >
            <p className="font-mono text-ficha-rotulo font-medium text-text-muted">
              {rotulos[indice]}
            </p>
            <p
              className={`text-numero-comparado font-extrabold whitespace-nowrap ${
                indice === 0 ? "text-text-dim" : "text-accent-ciano"
              }`}
            >
              {valor}
            </p>
            <p className="text-legenda text-text-muted">{legenda}</p>
          </div>
        ))}
      </div>
    );
  }

  const partes = Children.toArray(children).filter(Boolean);

  // Com formato="codigo" os rótulos não são repetidos aqui: cada bloco de código já
  // carrega o próprio na barra de título, como está no Figma.
  const semRotulos = formato === "codigo";

  return (
    <div className="grid w-full grid-cols-1 items-stretch gap-[24px] lg:grid-cols-2">
      {partes.map((parte, indice) => (
        <div key={indice} className="flex flex-col items-start gap-[12px]">
          {!semRotulos && rotulos[indice] ? (
            <p className="font-mono text-ficha-rotulo font-medium text-text-dim">
              {rotulos[indice]}
            </p>
          ) : null}
          <div className="w-full flex-1">{parte}</div>
        </div>
      ))}
    </div>
  );
}

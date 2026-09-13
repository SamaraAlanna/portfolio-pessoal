import type { ReactNode } from "react";
import { Children, isValidElement } from "react";

/**
 * Extrai o texto cru de uma árvore de children do React.
 *
 * Serve aos blocos que usam o formato de linha "valor | rótulo", como numeros, paleta e
 * opcoes. O Markdown transforma as linhas do bloco num parágrafo só, com quebra suave,
 * então o que chega aqui é texto com "\n" no meio, e não uma lista de itens.
 *
 * LIMITE CONHECIDO: formatação Markdown dentro dessas linhas é perdida, porque só o
 * texto sobrevive. Para esses três blocos isso não é problema, já que o conteúdo é
 * número, hex e rótulo curto. Se algum dia precisar de negrito ali, o caminho é fazer a
 * conversão no plugin remark e não aqui.
 */
export function textoDeChildren(children: ReactNode): string {
  let saida = "";

  Children.forEach(children, (filho) => {
    if (filho === null || filho === undefined || typeof filho === "boolean") return;
    if (typeof filho === "string" || typeof filho === "number") {
      saida += String(filho);
      return;
    }
    if (isValidElement<{ children?: ReactNode }>(filho)) {
      saida += textoDeChildren(filho.props.children);
    }
  });

  return saida;
}

/**
 * Quebra o conteúdo de um bloco em linhas de campos separados por "|".
 *
 * "106 | formulários com validação dupla" vira ["106", "formulários com validação dupla"].
 * Linha vazia é descartada, para o autor poder respirar o arquivo sem gerar item fantasma.
 */
export function linhasDeCampos(children: ReactNode): string[][] {
  return textoDeChildren(children)
    .split("\n")
    .map((linha) => linha.trim())
    .filter((linha) => linha.length > 0)
    .map((linha) => linha.split("|").map((campo) => campo.trim()));
}

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

/**
 * A âncora de uma seção de case, derivada do rótulo dela.
 *
 * **ESTA FUNÇÃO É A ÚNICA FONTE DA ÂNCORA, e isso é a parte que importa.** O índice e o
 * `bloco-secao` calculam o mesmo valor em lugares diferentes: se cada um tivesse a própria
 * implementação, uma divergência quebraria todos os links do índice **sem quebrar o
 * build**, e ninguém repara em link de âncora que não pula.
 *
 * "CORREÇÕES PONTUAIS" vira "correcoes-pontuais". O acento é removido pela decomposição
 * NFD, que separa a letra do sinal, e o sinal cai na faixa de combinantes.
 */
export function ancoraDeRotulo(rotulo: string): string {
  return rotulo
    .normalize("NFD")
    .replace(/[̀-ͯ]/g, "")
    .toLowerCase()
    .replace(/[^a-z0-9]+/g, "-")
    .replace(/^-+|-+$/g, "");
}

/**
 * NÃO EXISTE CONVERSÃO DE CAIXA AQUI, E ISSO FOI DECIDIDO EM 2026-09-24.
 *
 * Houve uma `rotuloParaIndice` que baixava o rótulo da seção para caixa de frase, porque a
 * seção era caixa alta no MDX e o índice precisava dela em caixa normal. **Ela quebrava em
 * sigla**: "SEO TÉCNICO" virava "Seo técnico" e "UX/UI" virava "Ux/ui", e a saída seria uma
 * lista de exceções crescendo dentro de uma função de texto.
 *
 * A FONTE FOI INVERTIDA EM VEZ DA FUNÇÃO GANHAR EXCEÇÃO. O rótulo passa a ser escrito em
 * caixa normal no MDX, e **a caixa alta da seção vira `text-transform` no `BlocoSecao`**.
 * O índice usa o texto como ele está, sem transformar nada, e sigla sobrevive porque
 * ninguém mexe nela.
 *
 * Ganho que não era o objetivo e vale mais que ele: **leitor de tela deixa de receber texto
 * em maiúsculas**. Caixa alta no dado faz parte dos leitores soletrarem letra a letra, ou
 * lerem com a entonação de sigla. Em CSS, isso é aparência e o texto anunciado continua
 * sendo a palavra.
 */

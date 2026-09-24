/**
 * Tags dos projetos e regras do filtro da listagem.
 *
 * Fica separado de `lib/conteudo.ts` de propósito: a grade é um componente de cliente e
 * precisa disto, mas `conteudo.ts` lê o sistema de arquivos. Importar de lá arrastaria
 * `node:fs` para o bundle do navegador e quebraria o build. **Tudo aqui precisa continuar
 * puro, sem tocar em arquivo.**
 */

/**
 * O que um case pode declarar no frontmatter. São três, e "Full Stack" não está entre
 * elas de propósito.
 */
export const TAGS = ["UX/UI Design", "Front-End", "Back-End"] as const;

export type Tag = (typeof TAGS)[number];

/** Rótulo do chip que substitui o par Front-End e Back-End. Não é tag. */
export const FULL_STACK = "Full Stack";

/**
 * As pílulas da listagem.
 *
 * PÍLULA SEM PROJETO ATRÁS DEVOLVE LISTA VAZIA E PARECE DEFEITO, e por isso duas já saíram
 * daqui: "Projeto de estudo" com o case da Bilheteria Digital, e "Identidade visual" em
 * 2026-09-23 com os três cases que a usavam.
 */
export const FILTROS = ["Todos", ...TAGS, FULL_STACK] as const;

/**
 * A cor de camada de cada valor, como referência de token e não como classe.
 *
 * UMA FONTE SÓ PARA O CHIP DO CARD E PARA A PÍLULA DO FILTRO. Os dois pintam o mesmo
 * vocabulário, e duas tabelas divergiriam no dia em que uma camada entrasse: o chip
 * mudaria de cor e a pílula não, sem erro nenhum aparecer.
 *
 * FULL STACK E TODOS USAM `--text`, QUE É ACESO SEM SER CAMADA. Nenhum dos dois pertence a
 * uma camada: Full Stack é a união de duas e Todos é a ausência de recorte. Dar um dos
 * quatro accents a eles diria o contrário.
 *
 * Vai como valor de CSS e não como classe do Tailwind porque o mesmo mapa é lido por um
 * componente de servidor e por um de cliente, e valor não depende do scanner de classes
 * ver a string escrita num arquivo de dados.
 */
export type Cor = "rosa" | "lavanda" | "ciano" | "ambar";

/**
 * A base: cada cor do sistema e a variável que a carrega.
 *
 * ELE EXISTE PARA NÃO HAVER DOIS MAPAS DE COR NO PROJETO. O `COR_DA_CAMADA` abaixo traduz de
 * tag do filtro para cor, e os cards da Stack traduzem de camada do grupo para cor: são
 * chaves diferentes apontando para o mesmo lugar, e escrever `var(--accent-rosa)` nos dois
 * faria uma mudança de token precisar ser lembrada em dois arquivos.
 *
 * **O âmbar só existe aqui e no `TINT_DA_COR`.** Ele não tem tag correspondente, porque
 * ressalva não é camada de trabalho e não filtra projeto nenhum.
 */
export const VAR_DA_COR: Record<Cor, string> = {
  rosa: "var(--accent-rosa)",
  lavanda: "var(--accent-lavanda)",
  ciano: "var(--accent-ciano)",
  ambar: "var(--accent-ambar)",
};

/** O par tingido de cada cor, para quem precisa de fundo e não de traço. */
export const TINT_DA_COR: Record<Cor, string> = {
  rosa: "var(--tint-rosa)",
  lavanda: "var(--tint-lavanda)",
  ciano: "var(--tint-ciano)",
  ambar: "var(--tint-ambar)",
};

export const COR_DA_CAMADA: Record<string, string> = {
  "UX/UI Design": VAR_DA_COR.rosa,
  "Front-End": VAR_DA_COR.lavanda,
  "Back-End": VAR_DA_COR.ciano,
  [FULL_STACK]: "var(--text)",
  Todos: "var(--text)",
};

/**
 * Full Stack é condição, e não declaração.
 *
 * O case diz que faz front-end, que faz back-end, ou os dois, e **quem conclui que isso é
 * full stack é o código**. A alternativa seria uma quarta tag no frontmatter, que teria de
 * ser mantida em sincronia com as outras duas à mão: bastaria alguém acrescentar Back-End
 * e esquecer de acrescentar Full Stack para o mesmo case responder "sim" a um filtro e
 * "não" a outro, sem erro nenhum aparecer.
 */
export function ehFullStack(tags: readonly string[]) {
  return tags.includes("Front-End") && tags.includes("Back-End");
}

/**
 * Se um projeto entra num filtro.
 *
 * OS TRÊS COMPORTAMENTOS SÃO DIFERENTES, e é por isso que isto é função e não comparação
 * de texto na grade:
 *
 * - `Front-End` e `Back-End` **incluem** quem tem as duas, porque quem faz as duas faz
 *   cada uma. Sai de graça de o case declarar as tags de verdade.
 * - `Full Stack` mostra **só** quem tem as duas.
 * - `UX/UI Design` é literal.
 */
export function passaNoFiltro(tags: readonly string[], filtro: string) {
  if (filtro === "Todos") return true;
  if (filtro === FULL_STACK) return ehFullStack(tags);
  return tags.includes(filtro);
}

/**
 * Os chips que o card mostra, que não são as tags.
 *
 * Front-End mais Back-End viram **um** chip "Full Stack", na posição do primeiro dos dois.
 * Manter a posição importa porque o Spirito tem as três tags e o chip de UX/UI vem antes:
 * jogar o Full Stack para o fim mudaria a ordem de leitura sem motivo.
 */
export function chipsDoCard(tags: readonly string[]): string[] {
  if (!ehFullStack(tags)) return [...tags];

  const chips: string[] = [];
  for (const tag of tags) {
    if (tag === "Front-End") chips.push(FULL_STACK);
    else if (tag !== "Back-End") chips.push(tag);
  }
  return chips;
}

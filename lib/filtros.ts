/**
 * Valores do filtro da listagem de projetos.
 *
 * Fica separado de lib/conteudo.ts de propósito: a grade é um componente de cliente e
 * precisa desta lista, mas conteudo.ts lê o sistema de arquivos. Importar de lá arrastaria
 * node:fs para o bundle do navegador e quebraria o build.
 *
 * São as tags e não os tipos, apesar de o frame no Figma se chamar "Filtro - TIPO".
 *
 * "Projeto de estudo" saiu junto com o case da Bilheteria Digital, que era o único que
 * usava essa tag. Pílula de filtro sem nenhum projeto atrás devolve lista vazia e parece
 * defeito. Se um projeto de estudo voltar, a pílula volta com ele.
 */
export const FILTROS = [
  "Todos",
  "UX/UI Design",
  "Full stack",
  "Identidade visual",
] as const;

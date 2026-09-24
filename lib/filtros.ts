/**
 * Valores do filtro da listagem de projetos.
 *
 * Fica separado de lib/conteudo.ts de propósito: a grade é um componente de cliente e
 * precisa desta lista, mas conteudo.ts lê o sistema de arquivos. Importar de lá arrastaria
 * node:fs para o bundle do navegador e quebraria o build.
 *
 * São as tags e não os tipos, apesar de o frame no Figma se chamar "Filtro - TIPO".
 *
 * PÍLULA DE FILTRO SEM PROJETO ATRÁS DEVOLVE LISTA VAZIA E PARECE DEFEITO, e por isso duas
 * já saíram daqui. "Projeto de estudo" saiu com o case da Bilheteria Digital, e
 * "Identidade visual" saiu em 2026-09-23 com o Tech Girls, o Míriam Araújo e o Garage
 * StivalDay, que eram os três únicos que a usavam. Se um projeto do tipo voltar, a pílula
 * volta com ele.
 */
export const FILTROS = [
  "Todos",
  "UX/UI Design",
  "Full stack",
] as const;

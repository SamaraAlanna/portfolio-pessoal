/**
 * Conteúdo da página Contato.
 *
 * OS CANAIS NÃO SÃO SÓ DESTA PÁGINA: o rodapé de todas as páginas lê daqui também, pela
 * coluna "ONDE ME ACHAR". Endereço escrito à mão no rodapé já divergiu uma vez, então este
 * arquivo é a fonte, e o rodapé quebra a compilação se um canal sumir.
 */
export type Canal = { rotulo: string; valor: string; destino: string };

export const canais: Canal[] = [
  {
    rotulo: "email",
    valor: "sami_andrade@outlook.com.br",
    destino: "mailto:sami_andrade@outlook.com.br",
  },
  {
    rotulo: "linkedin",
    valor: "/in/samaraalanna",
    destino: "https://www.linkedin.com/in/samaraalanna/",
  },
  {
    rotulo: "github",
    valor: "/SamaraAlanna",
    destino: "https://github.com/SamaraAlanna",
  },
  {
    rotulo: "instagram",
    valor: "@saverdatech",
    destino: "https://www.instagram.com/saverdatech/",
  },
];

/**
 * Assuntos do select do formulário.
 *
 * Não estão no Figma, que tem só o placeholder "Selecione um assunto". A lista veio da
 * Samara. A ordem importa: o primeiro é o pedido mais comum e o último cobre o resto,
 * então ninguém fica sem opção que sirva.
 *
 * Ficaram aqui parados entre 2026-09-13 e 2026-09-23, enquanto o formulário esteve fora, e
 * é por isso que não precisaram ser escritos de novo quando ele voltou.
 */
export const assuntos: string[] = [
  "Projeto de site",
  "Vaga ou processo seletivo",
  "Parceria",
  "Outro assunto",
];

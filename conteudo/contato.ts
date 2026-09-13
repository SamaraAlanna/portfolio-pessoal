/**
 * Conteúdo da página Contato.
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
    destino: "https://www.linkedin.com/in/samaraalanna",
  },
  {
    rotulo: "github",
    valor: "/SamaraAlanna",
    destino: "https://github.com/SamaraAlanna",
  },
];

/**
 * Assuntos do select.
 *
 * Não estão no Figma, que tem só o placeholder. A lista veio da Samara. A ordem importa:
 * o primeiro é o pedido mais comum e o último cobre o resto, então ninguém fica sem
 * opção que sirva.
 */
export const assuntos: string[] = [
  "Projeto de site",
  "Identidade visual",
  "Vaga ou processo seletivo",
  "Parceria",
  "Outro assunto",
];

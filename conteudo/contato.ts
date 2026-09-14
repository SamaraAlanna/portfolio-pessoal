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
];

/**
 * Assuntos do select.
 *
 * Não estão no Figma, que tem só o placeholder. A lista veio da Samara. A ordem importa:
 * o primeiro é o pedido mais comum e o último cobre o resto, então ninguém fica sem
 * opção que sirva.
 */
export type MotivoDeContato = {
  titulo: string;
  texto: string;
};

/**
 * O que faz sentido me procurar.
 *
 * Qualifica o contato antes de a pessoa escrever, para não chegar mensagem que não vai a
 * lugar nenhum. É lista estruturada, e por isso vive aqui e não no TSX da seção.
 *
 * A ordem é por frequência esperada: vaga primeiro, comunidade por último.
 */
export const motivos: MotivoDeContato[] = [
  {
    titulo: "Vaga ou processo seletivo",
    texto: "Respondo sobre posições de UX/UI, front-end e full stack.",
  },
  {
    titulo: "Projeto pelo BORDA",
    texto:
      "Atendo site e identidade visual pelo meu estúdio, com escopo, prazo e orçamento fechados antes de começar.",
  },
  {
    titulo: "Mentoria",
    texto:
      "Converso com quem está começando em design ou em código e quer saber por onde seguir.",
  },
  {
    titulo: "Tech Girls",
    texto: "Administro a comunidade e falo sobre parceria, palestra ou participação.",
  },
];

/**
 * PENDENTE DA FASE DOIS. O formulário saiu da página de contato em 2026-09-13, porque
 * dependia de serviço externo para funcionar. Esta lista fica aqui de propósito: ela é a
 * única parte do formulário que é conteúdo, e não código, e não tem por que ser escrita de
 * novo quando ele voltar.
 */
export const assuntos: string[] = [
  "Projeto de site",
  "Identidade visual",
  "Vaga ou processo seletivo",
  "Parceria",
  "Outro assunto",
];

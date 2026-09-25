/**
 * A idade da Samara, calculada, nunca escrita.
 *
 * O NÚMERO NÃO FICA NO TEXTO PORQUE TEXTO COM IDADE ENVELHECE EM SILÊNCIO. Um "tenho 20
 * anos" escrito à mão fica errado no dia do aniversário e ninguém percebe, porque ninguém
 * reabre a bio para conferir. Aqui o texto guarda `{IDADE}` e quem resolve é esta função.
 *
 * A DATA DE NASCIMENTO NÃO PODE CHEGAR À PÁGINA. Ela é dado pessoal e vive só aqui: o que
 * sai daqui é um inteiro, e nem o HTML nem o metadata recebem dia, mês ou ano. **Não
 * exporte a constante abaixo.**
 *
 * O FUSO É O DE SÃO PAULO, E NÃO O DO SERVIDOR. A Vercel roda em UTC, e entre 21h e meia-noite
 * no Brasil o UTC já é o dia seguinte: sem fixar o fuso, a idade viraria três horas antes,
 * na véspera do aniversário.
 *
 * O `en-CA` é escolha deliberada: ele formata em `AAAA-MM-DD`, que é o único formato de
 * locale que dá para fatiar sem ambiguidade entre dia e mês.
 */
const NASCIMENTO = { ano: 2005, mes: 10, dia: 2 };

const FUSO = "America/Sao_Paulo";

/**
 * Anos completos hoje, no fuso de São Paulo.
 *
 * CHAME DENTRO DO RENDER, E NUNCA NO ESCOPO DO MÓDULO. Constante de módulo é avaliada uma
 * vez por instância do servidor, então ela sobreviveria à revalidação e a idade continuaria
 * velha mesmo com a página regenerada.
 */
export function idadeEmAnos(agora: Date = new Date()): number {
  const hoje = new Intl.DateTimeFormat("en-CA", {
    timeZone: FUSO,
    year: "numeric",
    month: "2-digit",
    day: "2-digit",
  }).format(agora);

  const [ano, mes, dia] = hoje.split("-").map(Number);

  const aindaNaoFezAniversario =
    mes < NASCIMENTO.mes || (mes === NASCIMENTO.mes && dia < NASCIMENTO.dia);

  return ano - NASCIMENTO.ano - (aindaNaoFezAniversario ? 1 : 0);
}

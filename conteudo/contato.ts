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
    // O destino é o wa.me com DDI e DDD, e o valor na tela é o número formatado como o
    // Brasil escreve. Os dois precisam concordar: o link leva o país junto, a tela não.
    rotulo: "whatsapp",
    valor: "(41) 92005-8670",
    destino: "https://wa.me/5541920058670",
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
 * O canal de um rótulo, ou erro de compilação.
 *
 * ELA SAIU DO `footer.tsx` EM 2026-09-25, quando o envio do formulário passou a precisar
 * do endereço de e-mail também. Eram dois consumidores do mesmo dado prestes a ter duas
 * buscas escritas à mão, que é exatamente como o rodapé e a página de Contato já
 * divergiram uma vez.
 *
 * O RODAPÉ USA O `.destino` E O ENVIO USA O `.valor`, e é por isso que ela devolve o canal
 * inteiro em vez do endereço: o rodapé precisa do `mailto:` para o link, e o servidor de
 * e-mail precisa do endereço nu, sem esquema.
 *
 * FALHA NO BUILD SE O CANAL NÃO EXISTIR, de propósito. Um `href` vazio deixaria link morto
 * no rodapé de todas as páginas, e um destinatário vazio faria o envio falhar só em
 * produção, na primeira mensagem de verdade que alguém tentasse mandar.
 */
export function canalPor(rotulo: string): Canal {
  const canal = canais.find((item) => item.rotulo === rotulo);
  if (!canal) {
    throw new Error(`Canal "${rotulo}" não existe em conteudo/contato.ts`);
  }
  return canal;
}

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

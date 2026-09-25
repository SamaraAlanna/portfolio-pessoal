import { assuntos } from "@/conteudo/contato";

/**
 * Validação, limpeza e escape do formulário de contato.
 *
 * ESTE ARQUIVO NÃO TEM `fetch` NEM REACT, de propósito. Ele é função pura: recebe
 * `FormData` e devolve dado validado ou erro. Isso é o que permite conferir a validação
 * sem rede e sem renderizar nada, e é o que mantém o `lib/email.ts` como único lugar que
 * conhece o serviço de envio.
 *
 * A VALIDAÇÃO DO CLIENTE NÃO CONTA. O `required`, o `type="email"` e o `maxLength` do HTML
 * são conveniência para quem está digitando, e somem no primeiro `curl`. Tudo que chega
 * aqui é tratado como texto hostil.
 */

export type CampoDoFormulario =
  | "nome"
  | "email"
  | "assunto"
  | "referencia"
  | "mensagem";

/**
 * A ordem do resumo de erro, que é a ordem visual dos campos.
 *
 * Ela existe porque `Object.keys` de um objeto de erros sai na ordem em que as chaves
 * foram escritas, e não na ordem da tela. Sem isso o resumo poderia listar a mensagem
 * antes do nome, e a lista de erros deixaria de espelhar o formulário que está embaixo
 * dela.
 */
export const ORDEM_DOS_CAMPOS: CampoDoFormulario[] = [
  "nome",
  "email",
  "assunto",
  "referencia",
  "mensagem",
];

/** O nome de cada campo no resumo de erro, onde o rótulo da tela não está por perto. */
export const ROTULO_DO_CAMPO: Record<CampoDoFormulario, string> = {
  nome: "Nome",
  email: "E-mail",
  assunto: "Assunto",
  referencia: "Link",
  mensagem: "Mensagem",
};

export type ErrosPorCampo = Partial<Record<CampoDoFormulario, string>>;

export type ValoresDoFormulario = Record<CampoDoFormulario, string>;

/**
 * Dado que passou na validação.
 *
 * O TIPO É A GARANTIA, e não um comentário pedindo cuidado. Ele só é construído pelo
 * `validarFormulario`, então quem recebe um `MensagemValidada` sabe que o e-mail é de uma
 * linha só e que o assunto está na lista de permissão. É isso que deixa o `lib/email.ts`
 * montar o `replyTo` sem revalidar nada.
 */
export type MensagemValidada = ValoresDoFormulario;

export type ResultadoDaValidacao =
  | { ok: true; dados: MensagemValidada }
  | { ok: false; erros: ErrosPorCampo; valores: ValoresDoFormulario };

/** O estado que a Server Action devolve e que a tela lê. */
export type EstadoDoEnvio = {
  situacao: "inicial" | "erro" | "enviado";
  erros: ErrosPorCampo;
  /**
   * O que a pessoa digitou, devolvido para o formulário se repreencher.
   *
   * ISSO EXISTE PELO CAMINHO SEM JAVASCRIPT. Com JavaScript o formulário nem desmonta e os
   * campos guardam o que está neles; sem ele o servidor re-renderiza a página do zero, e
   * sem estes valores a pessoa perderia a mensagem inteira por causa de um e-mail com erro
   * de digitação.
   */
  valores: ValoresDoFormulario | null;
  /** Aviso que não pertence a campo nenhum, como a falha de envio. */
  aviso: string | null;
};

export const ESTADO_INICIAL: EstadoDoEnvio = {
  situacao: "inicial",
  erros: {},
  valores: null,
  aviso: null,
};

/**
 * A MESMA FRASE PARA QUALQUER FALHA DE ENVIO, sem código, sem status e sem nome de
 * serviço. Detalhe de erro na tela conta para quem está sondando o que existe atrás, e não
 * ajuda em nada quem só queria mandar uma mensagem. O detalhe vai para o log.
 */
export const AVISO_DE_FALHA =
  "Não consegui enviar agora. Tenta de novo em alguns minutos, ou use um dos canais diretos aqui do lado.";

/** Nome do campo-armadilha. Parece campo de verdade para quem preenche sem olhar. */
export const CAMPO_ARMADILHA = "empresa";

/** Nome do campo do carimbo de tempo, escrito por JavaScript ao montar a página. */
export const CAMPO_CARIMBO = "carimbo";

const LIMITES = {
  nome: { minimo: 2, maximo: 80 },
  email: { maximo: 254 },
  referencia: { maximo: 500 },
  mensagem: { minimo: 10, maximo: 3000 },
} as const;

/**
 * Os únicos esquemas aceitos no campo de link.
 *
 * É ESTA LISTA QUE BARRA `javascript:`, `data:` E `file:`, e é a parte que importa da
 * validação inteira. Sem ela, um `javascript:` chegaria ao corpo do e-mail e bastaria o
 * cliente de e-mail transformar em link para existir um alvo de clique perigoso na caixa
 * de entrada. `mailto:` e `ftp:` também ficam de fora: o campo pede referência para
 * arquivo ou página, e endereço de e-mail já tem campo próprio.
 */
const ESQUEMAS_DO_LINK = ["http:", "https:"];

/**
 * E-mail de uma linha, com arroba e domínio com ponto.
 *
 * NÃO É O RFC 5322, E NÃO DEVE SER. A gramática completa aceita coisas que nenhum
 * provedor entrega e a expressão que a implementa é famosa por ser ilegível. O que
 * interessa aqui são duas coisas: que o endereço tenha forma plausível, e que ele **não
 * tenha espaço nem quebra de linha**, porque este é o único campo que encosta num
 * cabeçalho de e-mail.
 */
const FORMATO_DE_EMAIL = /^[^\s@]+@[^\s@.]+(?:\.[^\s@.]+)+$/;

/**
 * Limpeza de campo de uma linha.
 *
 * TROCA CARACTERE DE CONTROLE POR ESPAÇO, INCLUSIVE `\r` E `\n`, e é aqui que a injeção de
 * cabeçalho morre. Um nome contendo uma quebra de linha seguida de `Bcc:` só vira ataque
 * se a quebra sobreviver até a montagem da mensagem; cortada na entrada, ela nunca chega
 * lá. Fazer isso na saída, na hora de montar o e-mail, seria depender de ninguém esquecer.
 */
function limparLinha(valor: string): string {
  return valor
    .replace(/[\u0000-\u001f\u007f]/g, " ")
    .replace(/\s+/g, " ")
    .trim();
}

/**
 * Limpeza do corpo da mensagem, que é o único campo onde quebra de linha é conteúdo.
 *
 * O `\r\n` do Windows vira `\n` antes de qualquer coisa, senão o texto chegaria com
 * retorno de carro solto e a contagem de caracteres mudaria conforme o sistema de quem
 * digitou. Depois saem os demais caracteres de controle, preservando `\n` e tabulação.
 */
function limparTexto(valor: string): string {
  return valor
    .replace(/\r\n?/g, "\n")
    .replace(/[\u0000-\u0008\u000b\u000c\u000e-\u001f\u007f]/g, "")
    .trim();
}

/**
 * O campo de link, que é opcional e por isso valida diferente dos outros.
 *
 * VAZIO PASSA, e esse é o primeiro caso tratado: campo opcional que reprova em branco é o
 * jeito mais comum de transformar "opcional" em obrigatório sem perceber.
 *
 * A CONFERÊNCIA USA `new URL()`, E NÃO EXPRESSÃO REGULAR. É construtor nativo, então não
 * entra dependência nenhuma, e ele já resolve o que um regex de URL erra: porta, IPv6
 * entre colchetes, caractere internacional, credencial embutida. **Regex de URL é uma das
 * coisas que parecem simples e não são**, e a que costuma ser copiada aceita
 * `javascript:alert(1)` sem piscar.
 *
 * DEPOIS DE ANALISAR, O QUE DECIDE É O ESQUEMA. Ter forma de URL não basta: `javascript:`
 * e `data:` são URLs válidas para o construtor e são exatamente o que não pode passar.
 *
 * CREDENCIAL EMBUTIDA É RECUSADA, o `https://usuario:senha@site.com`. Ela é a forma
 * clássica de disfarçar o domínio de verdade, porque o olho lê o começo e o navegador
 * obedece o fim. Num campo que vira texto num e-mail meu, não há motivo para aceitar.
 */
function validarReferencia(valor: string): string | null {
  if (valor.length === 0) {
    return null;
  }

  if (valor.length > LIMITES.referencia.maximo) {
    return `Link longo demais. O limite é ${LIMITES.referencia.maximo} caracteres.`;
  }

  let url: URL;
  try {
    url = new URL(valor);
  } catch {
    return "Esse link não parece uma URL completa. Começa com https://";
  }

  if (!ESQUEMAS_DO_LINK.includes(url.protocol)) {
    return "Só aceito link http ou https.";
  }

  if (url.username !== "" || url.password !== "") {
    return "Tira o usuário e a senha de dentro do link.";
  }

  return null;
}

/** `FormData.get` devolve `File` quando o campo é de arquivo. Aqui só texto interessa. */
function texto(dados: FormData, chave: string): string {
  const valor = dados.get(chave);
  return typeof valor === "string" ? valor : "";
}

export function validarFormulario(dados: FormData): ResultadoDaValidacao {
  const valores: ValoresDoFormulario = {
    nome: limparLinha(texto(dados, "nome")),
    // Minúsculo para o endereço não variar só pela tecla Shift de quem digitou.
    email: limparLinha(texto(dados, "email")).toLowerCase(),
    assunto: limparLinha(texto(dados, "assunto")),
    referencia: limparLinha(texto(dados, "referencia")),
    mensagem: limparTexto(texto(dados, "mensagem")),
  };

  const erros: ErrosPorCampo = {};

  if (valores.nome.length === 0) {
    erros.nome = "Escreve seu nome, mesmo que seja só o primeiro.";
  } else if (valores.nome.length < LIMITES.nome.minimo) {
    erros.nome = "Nome curto demais. Escreve pelo menos duas letras.";
  } else if (valores.nome.length > LIMITES.nome.maximo) {
    erros.nome = `Nome longo demais. O limite é ${LIMITES.nome.maximo} caracteres.`;
  }

  if (valores.email.length === 0) {
    erros.email = "Escreve seu e-mail, senão não tenho como responder.";
  } else if (valores.email.length > LIMITES.email.maximo) {
    erros.email = "E-mail longo demais.";
  } else if (!FORMATO_DE_EMAIL.test(valores.email)) {
    erros.email = "Esse e-mail não parece completo. Confere o arroba e o domínio.";
  }

  /**
   * O ASSUNTO É CONFERIDO CONTRA A LISTA DE PERMISSÃO, e não só contra "não está vazio".
   * Ele é a única parte do formulário que entra no assunto do e-mail, que é cabeçalho, e
   * aceitar texto livre ali seria deixar o visitante escrever num cabeçalho.
   *
   * A lista é a do `conteudo/contato.ts`, a mesma que monta o select. Uma fonte só: mexer
   * na lista atualiza tela e validação juntas, e não existe o dia em que uma opção nova
   * aparece na tela e é recusada pelo servidor.
   *
   * A MENSAGEM DE ERRO É A MESMA PARA VAZIO E PARA VALOR INVENTADO, de propósito. Quem
   * mandou um valor fora da lista não errou de digitação, está sondando, e uma frase
   * diferente confirmaria que existe uma lista.
   */
  if (!assuntos.includes(valores.assunto)) {
    erros.assunto = "Escolhe um assunto na lista.";
  }

  const erroDaReferencia = validarReferencia(valores.referencia);
  if (erroDaReferencia) {
    erros.referencia = erroDaReferencia;
  }

  if (valores.mensagem.length === 0) {
    erros.mensagem = "Escreve sua mensagem.";
  } else if (valores.mensagem.length < LIMITES.mensagem.minimo) {
    erros.mensagem = `Mensagem curta demais. Conta um pouco mais, pelo menos ${LIMITES.mensagem.minimo} caracteres.`;
  } else if (valores.mensagem.length > LIMITES.mensagem.maximo) {
    erros.mensagem = `Mensagem longa demais. O limite é ${LIMITES.mensagem.maximo} caracteres.`;
  }

  if (Object.keys(erros).length > 0) {
    return { ok: false, erros, valores };
  }

  return { ok: true, dados: valores };
}

/**
 * Escape de HTML.
 *
 * A ORDEM IMPORTA E O `&` VEM PRIMEIRO. Trocando `<` antes, o `&lt;` recém-criado seria
 * pego pela troca do `&` logo depois e viraria `&amp;lt;`, que aparece literal na tela.
 * Pior, quem escrever a ordem ao contrário em outra função acha que escapou e não escapou.
 */
export function escaparHtml(valor: string): string {
  return valor
    .replaceAll("&", "&amp;")
    .replaceAll("<", "&lt;")
    .replaceAll(">", "&gt;")
    .replaceAll('"', "&quot;")
    .replaceAll("'", "&#39;");
}

/**
 * O assunto do e-mail, montado pelo servidor.
 *
 * O NOME DE QUEM ESCREVEU NÃO ENTRA AQUI. Assunto é cabeçalho, e nome é texto livre. O
 * prefixo fixo mais um dos quatro valores da lista de permissão é tudo que vai para lá.
 */
export function montarAssunto(dados: MensagemValidada): string {
  return `Portfólio: ${dados.assunto}`;
}

export function corpoEmTexto(dados: MensagemValidada): string {
  return [
    `Nome: ${dados.nome}`,
    `E-mail: ${dados.email}`,
    `Assunto: ${dados.assunto}`,
    // A linha do link só existe quando ele existe. Um "Link:" seguido de nada seria ruído
    // na maioria das mensagens, já que o campo é opcional.
    ...(dados.referencia ? [`Link: ${dados.referencia}`] : []),
    "",
    "Mensagem:",
    dados.mensagem,
  ].join("\n");
}

/**
 * O corpo em HTML.
 *
 * O ESCAPE VEM ANTES DA TROCA DE `\n` POR `<br>`, e inverter isso anula o escape inteiro:
 * o `<br>` recém-inserido viraria `&lt;br&gt;` e apareceria como texto, enquanto qualquer
 * `<script>` que a pessoa tenha digitado continuaria escapado. O resultado seria um e-mail
 * feio que parece seguro, que é o tipo de defeito que ninguém investiga.
 *
 * O LINK SAI COMO TEXTO, DENTRO DE UM `<span>`, E NUNCA COMO `<a>`. Daqui não sai marcação
 * clicável apontando para endereço que um desconhecido escreveu, e o escape garante que o
 * valor não vire marcação por conta própria.
 *
 * **O QUE O CLIENTE DE E-MAIL FAZ DEPOIS NÃO ESTÁ NO MEU CONTROLE, E ISSO FOI ACEITO.** O
 * Outlook e a maioria dos outros transformam URL solta em link clicável sozinhos, mesmo
 * dentro de um `<span>`. Quebrar a URL com espaços derrotaria o auto-link e deixaria o
 * endereço impossível de copiar de uma vez, o que foi julgado pior. **A decisão é: mando
 * texto, e se o leitor de e-mail linkar, tudo bem.** O que a validação garante é que só
 * chega ali `http` ou `https`.
 */
export function corpoEmHtml(dados: MensagemValidada): string {
  const linha = (rotulo: string, valor: string) =>
    `<p><strong>${escaparHtml(rotulo)}:</strong> <span>${escaparHtml(valor)}</span></p>`;

  const mensagem = escaparHtml(dados.mensagem).replaceAll("\n", "<br />");

  return [
    linha("Nome", dados.nome),
    linha("E-mail", dados.email),
    linha("Assunto", dados.assunto),
    ...(dados.referencia ? [linha("Link", dados.referencia)] : []),
    "<hr />",
    `<p>${mensagem}</p>`,
  ].join("\n");
}

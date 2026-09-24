import type { NextConfig } from "next";

/**
 * Um ano em segundos, que é o valor pedido para HSTS levar a sério.
 */
const UM_ANO = 31536000;

/**
 * Cases que saíram do site em 2026-09-23 e cujas URLs precisam continuar respondendo.
 *
 * Eles estiveram publicados, então podem ter sido compartilhados, indexados ou salvos.
 * **Deixar a URL virar 404 joga fora quem chega por um link antigo**, e a listagem é o
 * lugar certo para essa pessoa cair: é onde ela descobre o que existe hoje.
 */
const CASES_REMOVIDOS = ["tech-girls", "miriam-araujo", "garage-stivalday"];

const nextConfig: NextConfig = {
  /**
   * Redirecionamento dos cases removidos.
   *
   * PERMANENTE, E ISSO É DECISÃO. O 308 diz ao buscador para transferir o histórico da URL
   * antiga para a nova e parar de visitar a velha, que é o correto porque estes cases não
   * voltam. Um 307 temporário manteria as três URLs sendo rastreadas para sempre,
   * esperando um retorno que não vem.
   *
   * Não há risco do laço que o www cria, registrado no CLAUDE.md: ali o conflito é entre
   * dois lugares redirecionando o mesmo domínio, e aqui são caminhos fixos para um destino
   * que não redireciona de volta.
   */
  async redirects() {
    return CASES_REMOVIDOS.map((slug) => ({
      source: `/projetos/${slug}`,
      destination: "/projetos",
      permanent: true,
    }));
  },

  /**
   * Cabeçalhos de segurança.
   *
   * Precisam ser por código porque o plano Hobby da Vercel não expõe cabeçalho de resposta
   * no painel.
   */
  async headers() {
    return [
      {
        source: "/:caminho*",
        headers: [
          /**
           * HSTS.
           *
           * O QUE ELE FAZ: depois da primeira visita por HTTPS, o navegador guarda que este
           * domínio só existe em HTTPS e passa a recusar HTTP sozinho, sem nem tentar a
           * requisição. Isso fecha a janela do redirecionamento, que é onde alguém na mesma
           * rede poderia interceptar.
           *
           * `max-age` de um ano. É o mínimo para o domínio ser levado a sério por scanner e
           * pela lista de preload, e é reversível: baixar o valor, ou zerar, vale na próxima
           * visita de cada pessoa.
           *
           * `includeSubDomains` estende a regra para todo subdomínio, inclusive o www e os
           * que ainda não existem. Aqui ele tem função concreta: o redirecionamento do www
           * acontece na borda da Vercel, antes da aplicação, então a resposta dele não passa
           * por estes cabeçalhos. É esta diretiva que garante HSTS lá.
           *
           * `preload` ficou de fora de propósito. A diretiva sozinha não faz nada, o domínio
           * precisa ser submetido em hstspreload.org, e aí os navegadores passam a trazê-lo
           * embutido. Sair da lista depende do ciclo de versão deles, o que são meses fora
           * do nosso controle. Ele fecha só a janela da primeiríssima visita, antes de o
           * cabeçalho ter sido visto uma vez, e isso não paga um compromisso desse tamanho
           * sobre todo subdomínio futuro.
           */
          {
            key: "Strict-Transport-Security",
            value: `max-age=${UM_ANO}; includeSubDomains`,
          },

          /**
           * Impede o navegador de adivinhar o tipo de um arquivo pelo conteúdo e tratá-lo
           * como outra coisa. Vale principalmente para o que o site serve fora de HTML: os
           * dois PDFs de currículo, os SVGs das luzes, o sitemap e o robots. Só existe um
           * valor possível.
           */
          {
            key: "X-Content-Type-Options",
            value: "nosniff",
          },

          /**
           * Referrer-Policy.
           *
           * Este é o valor padrão dos navegadores modernos, e declarar serve para fixar o
           * comportamento em quem tem padrão antigo, não para mudá-lo.
           *
           * O que ele faz: caminho completo só para o próprio site, origem apenas quando o
           * destino é outro, e nada quando a conexão cair para HTTP.
           *
           * Preservar a origem é escolha, não descuido. O site leva gente para o LinkedIn,
           * o GitHub e o BORDA Design, e é o cabeçalho de origem que permite ao estúdio ver
           * que a visita veio do portfólio. `no-referrer` seria mais fechado e jogaria essa
           * informação fora, sem proteger nada que importe aqui: as URLs do site são slugs
           * públicos de case, sem dado sensível e sem query string.
           */
          {
            key: "Referrer-Policy",
            value: "strict-origin-when-cross-origin",
          },

          /**
           * Proteção contra enquadramento, em duas formas de propósito.
           *
           * `frame-ancestors` é a diretiva atual e a que os navegadores modernos respeitam
           * com prioridade. O `X-Frame-Options` é o mecanismo antigo, que segue valendo em
           * navegador velho e é o que boa parte dos scanners procura. Os dois dizem a mesma
           * coisa, então não há conflito.
           *
           * `DENY` e `'none'`, e não `SAMEORIGIN`, porque o site não se enquadra em lugar
           * nenhum: não existe iframe no projeto.
           *
           * ESTA CSP TEM SÓ UMA DIRETIVA, E ISSO NÃO É CONFIGURAÇÃO PELA METADE.
           * `frame-ancestors` controla quem pode embutir o site, e não o que o site pode
           * carregar. Diretiva que não está declarada simplesmente não é aplicada, porque
           * não existe `default-src` implícito. Por isso ela não toca em next/image, em
           * fonte nem em script.
           *
           * Uma CSP completa é outro trabalho, com custo real, e está descrito no CLAUDE.md.
           */
          {
            key: "Content-Security-Policy",
            value: "frame-ancestors 'none'",
          },
          {
            key: "X-Frame-Options",
            value: "DENY",
          },
        ],
      },
    ];
  },
};

export default nextConfig;

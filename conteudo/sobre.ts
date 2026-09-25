/**
 * Conteúdo da página Sobre.
 *
 * Os parágrafos de apresentação são texto corrido e ficariam no TSX pelo critério do
 * CLAUDE.md, mas estão aqui junto com o resto para o painel da fase dois editar a página
 * inteira num lugar só. Experiência, formação e certificações são lista estruturada e
 * pertencem aqui por definição.
 */
/**
 * O `{IDADE}` é resolvido no render, pelo `idadeEmAnos` de `lib/idade.ts`.
 *
 * ELE FICA AQUI COMO MARCADOR, E NÃO COMO NÚMERO, porque idade escrita à mão fica errada no
 * dia do aniversário e ninguém percebe: bio é texto que ninguém reabre para conferir. A data
 * de nascimento mora só no código e nunca chega à página.
 */
export const apresentacao: string[] = [
  "Sou a Samara Alanna, tenho {IDADE} anos e sou UX/UI Designer e Desenvolvedora Full Stack Pleno. Moro em Colombo, no Paraná.",
  "Meu primeiro contato com programação foi em 2020, com dois amigos desenvolvedores: um me apresentou o Python, o outro o Ruby. Desde então, não larguei mais a lógica nem a vontade de construir produtos. Em 2025 aprofundei os estudos, comecei a atender projetos como freelancer e, em agosto, entrei no tecnólogo em Análise e Desenvolvimento de Sistemas. Foi lá que conheci o UX/UI Design, e foi amor à primeira vista: em novembro, comecei também o tecnólogo em Design Gráfico.",
  "Gosto de construir e de reconstruir produtos. Trabalhar do design ao desenvolvimento me dá a visão do todo: acompanho cada etapa e garanto que o que vai ao ar é fiel ao layout, porque sou eu quem constrói. Na maioria dos meus projetos, a decisão de design e a decisão técnica saem da mesma pessoa. Atuo com autonomia técnica de ponta a ponta.",
  "Estou aberta a oportunidades remotas de nível pleno.",
];

export type Cargo = {
  periodo: string;
  vinculo: string;
  cargo: string;
  empresa: string;
  itens: string[];
};

/**
 * A ORDEM É POR RELEVÂNCIA, E NÃO POR DATA. O critério mudou em 2026-09-23, poucas horas
 * depois de a ordem por data ter sido registrada: data decrescente colocava um trabalho
 * voluntário acima do estágio e do estúdio próprio, e a seção passava a anunciar pelo topo
 * a coisa menos central da trajetória.
 *
 * O PESO É O DO PAPEL NA IDENTIDADE PROFISSIONAL: estúdio próprio primeiro, depois vínculo
 * empregatício, depois voluntariado. Entrada nova se encaixa por esse peso, e não por data.
 *
 * CUIDADO COM A COINCIDÊNCIA: hoje esta ordem é exatamente crescente por data de início,
 * 10/2025, 02/2026 e 05/2026. **Isso é acaso, e não a regra.** Quem inferir "crescente por
 * data" daqui vai acertar por sorte nesta lista e errar na próxima entrada. Quem achar que
 * é descrescente vai "corrigir" e desfazer a decisão.
 */
export const experiencia: Cargo[] = [
  {
    periodo: "10/2025 - atual",
    vinculo: "Estúdio próprio",
    cargo: "Fundadora, UX/UI Designer e Desenvolvedora Web",
    empresa: "BORDA Design",
    itens: [
      "Conduzo projetos completos de identidade visual, UX/UI e desenvolvimento web, da pesquisa estratégica à entrega.",
      "Desenvolvi o site do estúdio com arquitetura modular em PHP, design tokens em CSS Variables, tema dark e light com persistência, PT e EN sem reload e deploy automatizado via GitHub Actions.",
      "Estruturei a presença digital com SEO técnico, Open Graph, Schema JSON-LD, Search Console e Google Ads.",
    ],
  },
  {
    periodo: "02/2026 - atual",
    vinculo: "Remoto",
    cargo: "Estagiária em Design Multimídia",
    empresa: "TecSinapse",
    itens: [
      "Responsável pelo design e pelo desenvolvimento dos sites de clientes e de produtos internos, da interface ao deploy.",
      "Diagnostiquei a causa raiz de uma vulnerabilidade que permitia leads sem CPF válido chegarem ao CRM corporativo, e desenvolvi um módulo PHP central aplicado em 106 formulários e 77 páginas de concessionárias num único deploy.",
      "Construí 3 formulários do zero com validação de CPF, telefone e email sem biblioteca externa, e integrei selects dependentes de estado e cidade consumindo JSON com mais de 5.570 municípios.",
      "Criei design system, componentes e telas no Figma, com documentação de padrões e especificação de handoff para o desenvolvimento.",
    ],
  },
  {
    periodo: "05/2026 - atual",
    vinculo: "Remoto",
    cargo: "Administradora de comunidade (Voluntária)",
    empresa: "Tech Girls",
    itens: [
      "Desenvolvi a identidade visual da comunidade, com paleta, tipografia, mascote e aplicações, produzo as peças de Instagram, Discord e WhatsApp, além de guias de projeto e planilhas de apoio, e redijo os avisos e comunicados.",
      "Administro o servidor no Discord, principal canal de uma comunidade de mais de mil mulheres, com estrutura de canais, cargos e moderação, e faço a triagem de entrada que mantém o espaço exclusivo para mulheres.",
      "Dou suporte técnico às palestrantes durante as transmissões e resolvo problemas de áudio, vídeo e acesso em tempo real.",
    ],
  },
];

export type Curso = {
  titulo: string;
  instituicao: string;
  periodo: string;
  modalidade: string;
};

export const formacao: Curso[] = [
  {
    titulo: "Tecnólogo em Análise e Desenvolvimento de Sistemas",
    instituicao: "Universidade Positivo",
    periodo: "08/2025 - 08/2027",
    modalidade: "EAD",
  },
  {
    titulo: "Tecnólogo em Design Gráfico",
    instituicao: "Uninter",
    periodo: "11/2025 - 11/2027",
    modalidade: "EAD",
  },
];

/**
 * Idiomas.
 *
 * ERA UMA STRING SÓ, com os três níveis separados por hífen, e virou lista em 2026-09-23.
 * O motivo é que cada idioma é um par de campos, nome e nível, igual ao par que
 * certificações e formação já usam, e escrever par de campos como frase corrida obriga a
 * tela a exibir o que o dado não separa.
 *
 * A tradução futura também depende disso: "nativo", "intermediário" e "básico" precisam
 * ser traduzidos, e numa string única não dá para trocar só eles sem reescrever a frase.
 */
export type Idioma = { idioma: string; nivel: string };

export const idiomas: Idioma[] = [
  { idioma: "Português", nivel: "nativo" },
  { idioma: "Inglês", nivel: "intermediário" },
  { idioma: "Espanhol", nivel: "básico" },
];

/**
 * Uma imagem de certificado, ja tratada e pronta para publicar.
 *
 * UM CERTIFICADO PODE TER MAIS DE UMA IMAGEM, e o caso real é a Carreira UX Design, que a
 * Alura emite em tres niveis. **Sao tres arquivos e um certificado so**, entao no dialog
 * eles viram abas, reaproveitando o visualizador de estados dos cases em vez de um segundo
 * componente de abas.
 *
 * O `rotulo` so existe quando ha mais de uma: ele é o texto da aba.
 *
 * O NOME PUBLICADO NAO CARREGA DADO PESSOAL. Os originais têm nome inconsistente e um deles
 * traz o e-mail dela, entao o caminho daqui é sempre um slug escrito à mão.
 */
export type ImagemDeCertificado = {
  /** Caminho da versao grande, de 1400px, que abre no dialog. */
  caminho: string;
  alt: string;
  /** Texto da aba, so quando o certificado tem mais de uma imagem. */
  rotulo?: string;
  /** Linha de apoio abaixo da imagem, so na versao em abas. */
  legenda?: string;
};

/**
 * A miniatura de 480px e o mesmo caminho com sufixo.
 *
 * A CONVENCAO MORA NUMA FUNCAO E NAO EM DOIS CAMPOS. Guardar os dois caminhos no dado
 * deixaria a porta aberta para eles divergirem, e nao existe caso em que a miniatura de um
 * certificado seja outra imagem: ela e sempre a mesma, menor.
 */
export function miniaturaDe(caminho: string): string {
  return caminho.replace(/\.webp$/, "-miniatura.webp");
}

export type Certificacao = {
  /** Nome completo, como o certificado escreve. Vai no dialog e no nome acessivel do cartao. */
  nome: string;
  /**
   * Versao curta, so para o cartao da grade.
   *
   * MESMA IDEIA DO `tituloCase` DOS PROJETOS: o nome inteiro cabe onde ha espaco e contexto,
   * e encurta onde ele empurraria o cartao para uma terceira linha. **O completo nunca some**,
   * continua no dado, no dialog e no `aria-label`, entao quem usa leitor de tela ouve o nome
   * de verdade.
   */
  nomeCurto?: string;
  instituicao: string;
  /** Ausente nos tres da Anthropic, que nao declaram data no certificado. */
  ano?: number;
  /** Ausente onde o certificado nao declara carga. */
  horas?: number;
  /** Preenchido quando as imagens forem geradas a partir dos PDFs originais. */
  imagens?: ImagemDeCertificado[];
};

export type GrupoDeCertificacoes = {
  titulo: string;
  itens: Certificacao[];
};

/**
 * TRES AREAS DESDE 2026-09-24. Eram quatro: "Fundamentos" foi absorvida por
 * "Desenvolvimento", e "Seguranca e IA" virou "Dados, IA e seguranca" e recebeu o bootcamp
 * da DIO, que o nome ja anunciava.
 *
 * OS DADOS VIERAM DA LEITURA DOS 20 PDFS ORIGINAIS, e nao do nome dos arquivos, que estao
 * inconsistentes. Duas correcoes que vieram dessa leitura e valem registrar:
 *
 * 1. **As 198h nunca foram da Formacao UX Design.** Elas sao da Carreira UX Design, os tres
 *    niveis somados, 60 mais 86 mais 52. A Formacao UX Design tem 42h, e o site anunciava
 *    198 nela.
 * 2. **Duas certificacoes existiam e nao apareciam:** a Formacao Desenvolvimento de Carreira
 *    em UX e o Git e GitHub.
 *
 * Nenhum certificado tem CPF, RG, data de nascimento ou endereco. Nome completo e assinatura
 * institucional podem aparecer nas imagens.
 */
export const certificacoes: GrupoDeCertificacoes[] = [
  {
    titulo: "Desenvolvimento",
    itens: [
      { nome: "Formação React Developer", instituicao: "DIO", ano: 2026, horas: 34,
        imagens: [
          { caminho: "/imagens/certificados/react-developer-dio.webp", alt: "Certificado de Formação React Developer, emitido por DIO" },
        ],
      },
      {
        nome: "WordPress: crie sites com Elementor e Figma",
        nomeCurto: "WordPress com Elementor e Figma",
        instituicao: "Alura",
        ano: 2026,
        horas: 10,
        imagens: [
          { caminho: "/imagens/certificados/wordpress-elementor-figma-alura.webp", alt: "Certificado de WordPress: crie sites com Elementor e Figma, emitido por Alura" },
        ],
      },
      {
        nome: "Engenharia de Software",
        instituicao: "Universidade Cruzeiro do Sul",
        ano: 2025,
        horas: 20,
        imagens: [
          { caminho: "/imagens/certificados/engenharia-de-software-cruzeiro-do-sul.webp", alt: "Certificado de Engenharia de Software, emitido por Universidade Cruzeiro do Sul" },
        ],
      },
      {
        nome: "Git e GitHub: compartilhando e colaborando em projetos",
        nomeCurto: "Git e GitHub",
        instituicao: "Alura",
        ano: 2025,
        horas: 8,
        imagens: [
          { caminho: "/imagens/certificados/git-github-alura.webp", alt: "Certificado de Git e GitHub: compartilhando e colaborando em projetos, emitido por Alura" },
        ],
      },
      {
        nome: "Lógica de programação: mergulhe em programação com JavaScript",
        nomeCurto: "Lógica de programação",
        instituicao: "Alura",
        ano: 2025,
        horas: 6,
        imagens: [
          { caminho: "/imagens/certificados/logica-de-programacao-alura.webp", alt: "Certificado de Lógica de programação: mergulhe em programação com JavaScript, emitido por Alura" },
        ],
      },
      {
        nome: "Elas+ Tech: Front-End em JavaScript",
        instituicao: "Ada",
        ano: 2025,
        horas: 6,
        imagens: [
          { caminho: "/imagens/certificados/front-end-javascript-ada.webp", alt: "Certificado de Elas+ Tech: Front-End em JavaScript, emitido por Ada" },
        ],
      },
      { nome: "HTML", instituicao: "Ada", ano: 2025, horas: 3,
        imagens: [
          { caminho: "/imagens/certificados/html-ada.webp", alt: "Certificado de HTML, emitido por Ada" },
        ],
      },
    ],
  },
  {
    titulo: "UX e design",
    itens: [
      // 198h é a soma dos tres niveis: 60, 86 e 52. As tres imagens viram abas no dialog.
      {
        nome: "Carreira UX Design, 3 níveis",
        instituicao: "Alura",
        ano: 2025,
        horas: 198,
        imagens: [
          { caminho: "/imagens/certificados/carreira-ux-design-nivel-1.webp", alt: "Certificado de Carreira UX Design, nível 1, emitido por Alura", rotulo: "Nível 1", legenda: "60 horas" },
          { caminho: "/imagens/certificados/carreira-ux-design-nivel-2.webp", alt: "Certificado de Carreira UX Design, nível 2, emitido por Alura", rotulo: "Nível 2", legenda: "86 horas" },
          { caminho: "/imagens/certificados/carreira-ux-design-nivel-3.webp", alt: "Certificado de Carreira UX Design, nível 3, emitido por Alura", rotulo: "Nível 3", legenda: "52 horas" },
        ],
      },
      {
        nome: "Formação Desenvolvimento de Carreira em UX",
        instituicao: "Alura",
        ano: 2025,
        horas: 46,
        imagens: [
          { caminho: "/imagens/certificados/desenvolvimento-carreira-ux-alura.webp", alt: "Certificado de Formação Desenvolvimento de Carreira em UX, emitido por Alura" },
        ],
      },
      { nome: "Formação UX Design", instituicao: "Alura", ano: 2025, horas: 42,
        imagens: [
          { caminho: "/imagens/certificados/ux-design-alura.webp", alt: "Certificado de Formação UX Design, emitido por Alura" },
        ],
      },
      { nome: "Formação Figma", instituicao: "Alura", ano: 2025, horas: 41,
        imagens: [
          { caminho: "/imagens/certificados/figma-alura.webp", alt: "Certificado de Formação Figma, emitido por Alura" },
        ],
      },
      {
        nome: "Formação UX Research: pesquisa em ambientes dinâmicos com tecnologia e IA",
        nomeCurto: "Formação UX Research",
        instituicao: "Alura",
        ano: 2025,
        horas: 32,
        imagens: [
          { caminho: "/imagens/certificados/ux-research-alura.webp", alt: "Certificado de Formação UX Research: pesquisa em ambientes dinâmicos com tecnologia e IA, emitido por Alura" },
        ],
      },
      {
        nome: "Formação Acessibilidade em UX",
        instituicao: "Alura",
        ano: 2025,
        horas: 31,
        imagens: [
          { caminho: "/imagens/certificados/acessibilidade-em-ux-alura.webp", alt: "Certificado de Formação Acessibilidade em UX, emitido por Alura" },
        ],
      },
    ],
  },
  {
    titulo: "Dados, IA e segurança",
    itens: [
      {
        nome: "Bootcamp Bradesco: GenAI, Dados & Cyber",
        instituicao: "DIO",
        ano: 2026,
        horas: 52,
        imagens: [
          { caminho: "/imagens/certificados/bootcamp-genai-dados-cyber-dio.webp", alt: "Certificado de Bootcamp Bradesco: GenAI, Dados & Cyber, emitido por DIO" },
        ],
      },
      {
        nome: "Gerenciamento de ameaças cibernéticas",
        // A co-atribuicao à Universidade Cruzeiro do Sul saiu do texto em 2026-09-24, para o
        // cartao nao crescer. Ela continua legivel na propria imagem do certificado.
        instituicao: "Cisco Networking Academy",
        ano: 2025,
        imagens: [
          { caminho: "/imagens/certificados/ameacas-ciberneticas-cisco.webp", alt: "Certificado de Gerenciamento de ameaças cibernéticas, emitido por Cisco Networking Academy, pela Universidade Cruzeiro do Sul" },
        ],
      },
      { nome: "Claude Code in Action", instituicao: "Anthropic", ano: 2026,
        imagens: [
          { caminho: "/imagens/certificados/claude-code-in-action-anthropic.webp", alt: "Certificado de Claude Code in Action, emitido por Anthropic" },
        ],
      },
      { nome: "Claude 101", instituicao: "Anthropic", ano: 2026,
        imagens: [
          { caminho: "/imagens/certificados/claude-101-anthropic.webp", alt: "Certificado de Claude 101, emitido por Anthropic" },
        ],
      },
      { nome: "AI Fluency: Framework & Foundations", instituicao: "Anthropic", ano: 2026,
        imagens: [
          { caminho: "/imagens/certificados/ai-fluency-anthropic.webp", alt: "Certificado de AI Fluency: Framework & Foundations, emitido por Anthropic" },
        ],
      },
    ],
  },
];

/**
 * Conteúdo da página Sobre.
 *
 * Os parágrafos de apresentação são texto corrido e ficariam no TSX pelo critério do
 * CLAUDE.md, mas estão aqui junto com o resto para o painel da fase dois editar a página
 * inteira num lugar só. Experiência, formação e certificações são lista estruturada e
 * pertencem aqui por definição.
 */
export const apresentacao: string[] = [
  "Oi, muito prazer! Me chamo Samara Alanna, moro em Colombo, no Paraná, e eu comecei pelo design antes de ir pro código.",
  "Fui pro código porque queria terminar o que desenhava. Me incomodava entregar uma tela e não saber se ela ia sair do jeito que eu pensei. Hoje faço as duas partes no mesmo projeto: a pesquisa, o wireframe e a interface, e depois o PHP, o JavaScript e o deploy. Em quase tudo que eu pego, a decisão de design e a decisão técnica saem da mesma pessoa.",
  "Estou fazendo dois tecnólogos ao mesmo tempo, Análise e Desenvolvimento de Sistemas na Universidade Positivo e Design Gráfico na Uninter, os dois EAD. É bastante coisa, mas é o que me deixa confortável nos dois lados :)",
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

export type GrupoDeCertificacoes = {
  titulo: string;
  itens: { nome: string; origem: string }[];
};

export const certificacoes: GrupoDeCertificacoes[] = [
  {
    titulo: "Desenvolvimento",
    itens: [
      { nome: "React Developer", origem: "DIO - 2026" },
    ],
  },
  {
    titulo: "UX e design",
    itens: [
      { nome: "UX Design, 198h", origem: "Alura - 2025" },
      { nome: "UX Research, 32h", origem: "Alura - 2025" },
      { nome: "Acessibilidade em UX, 31h", origem: "Alura - 2025" },
      { nome: "Figma, 41h", origem: "Alura - 2025" },
      { nome: "WordPress, Elementor e Figma", origem: "Alura - 2026" },
    ],
  },
  {
    titulo: "Fundamentos",
    itens: [
      { nome: "Engenharia de Software", origem: "Cruzeiro do Sul - 2025" },
      { nome: "Lógica de Programação", origem: "Alura - 2025" },
      { nome: "Front-end com JavaScript, HTML e CSS", origem: "Ada - 2025" },
    ],
  },
  {
    titulo: "Dados, IA e segurança",
    itens: [
      { nome: "Gerenciamento de Ameaças Cibernéticas", origem: "Cisco - 2025" },
      { nome: "IA Generativa, Dados e Cibersegurança", origem: "DIO - 2026" },
      { nome: "AI Fluency: Framework and Foundations", origem: "Anthropic - 2026" },
      { nome: "Claude Code in Action", origem: "Anthropic - 2026" },
      { nome: "Claude 101", origem: "Anthropic - 2026" },
    ],
  },
];

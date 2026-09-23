/**
 * Conteúdo da página Stack.
 *
 * Lista estruturada é dado e vive aqui, não no TSX da seção. Chip novo a cada tecnologia
 * aprendida muda muito mais que o layout da página, e em TSX o painel da fase dois nunca
 * alcançaria. O critério está no CLAUDE.md.
 *
 * A camada de cada grupo não é decoração: segue o mesmo significado do resto do site,
 * com rosa em produto e design, lavanda em front-end, ciano em back-end e dados, e âmbar
 * em entrega e operação.
 */
export type Camada = "rosa" | "lavanda" | "ciano" | "ambar";

export type GrupoDaStack = {
  titulo: string;
  camada: Camada;
  /** Glifo decorativo grande, à direita do título. */
  glifo: string;
  chips: string[];
};

/**
 * A ORDEM É POR CAMADA, DUAS POR LINHA DA GRADE: rosa, lavanda, ciano, âmbar. Cada par de
 * mesma cor ocupa uma linha inteira, e dentro do par o grupo maior fica à esquerda.
 *
 * A ÂNCORA É O SISTEMA DE COR, E NÃO MAIS O TEXTO DA PÁGINA. Quando esta ordem foi
 * decidida, em 2026-09-23, o argumento era que a grade contradizia o parágrafo de abertura,
 * que explicava a lógica de cor nessa sequência. **Esse parágrafo saiu no mesmo dia**, por
 * decisão da Samara, e com ele a página deixou de explicar o que as cores significam.
 *
 * A ordem continua valendo, agora apoiada onde ela sempre esteve de verdade: a sequência
 * rosa, lavanda, ciano, âmbar é a do sistema de cor do projeto, registrada no CLAUDE.md,
 * e vale em todo o site. **Não reordene por outro critério só porque a página não explica
 * mais a lógica**: sem o texto, a sequência é o que sobrou dela na tela.
 *
 * A GRADE TEM DUAS COLUNAS, ENTÃO A POSIÇÃO NO ARRAY DECIDE QUEM DIVIDE LINHA COM QUEM.
 * Mover um grupo daqui não é reordenar uma lista, é remontar as duplas. Até 2026-09-23 a
 * sequência era rosa, lavanda, lavanda, ciano, ciano, âmbar, âmbar, rosa, com os dois
 * rosas nas pontas.
 */
export const grupos: GrupoDaStack[] = [
  {
    titulo: "Interface e design",
    camada: "rosa",
    glifo: "Aa",
    chips: [
      "Figma",
      "Design system",
      "Design tokens",
      "Wireframe",
      "Protótipo navegável",
      "Pesquisa com usuários",
      "Teste de usabilidade",
      "Heurísticas de Nielsen",
      "Acessibilidade WCAG",
      "Arquitetura da informação",
      "Identidade visual",
      "Adobe Illustrator",
      "Adobe Photoshop",
    ],
  },
  {
    titulo: "Processo",
    camada: "rosa",
    glifo: "::",
    chips: [
      "Scrum",
      "Kanban",
      "Code review",
      "Documentação técnica",
      "Gestão de múltiplos projetos",
    ],
  },
  {
    titulo: "Front-end",
    camada: "lavanda",
    glifo: "</>",
    chips: [
      "HTML5 semântico",
      "CSS3",
      "Variáveis nativas",
      "Grid",
      "Flexbox",
      "Animações",
      "JavaScript ES6+",
      "TypeScript",
      "React",
      "Hooks",
      "Context API",
      "Custom hooks",
      "React Router",
      "styled-components",
      "jQuery",
      "Bootstrap 5",
      "Design responsivo",
    ],
  },
  {
    titulo: "Integração e APIs",
    camada: "lavanda",
    glifo: "<->",
    chips: [
      "APIs REST",
      "Fetch",
      "Axios",
      "React Hook Form",
      "Webhooks",
      "n8n",
      "cURL",
      "Integração com CRM",
    ],
  },
  {
    titulo: "Back-end e CMS",
    camada: "ciano",
    glifo: "{ }",
    chips: [
      "PHP",
      "Arquitetura modular",
      "Sanitização de entrada",
      "Tratamento de status HTTP",
      "WordPress",
      "Tema customizado",
      "Page templates",
      "Nonce",
      "Elementor",
      "PHPMailer",
      "Amazon SES",
    ],
  },
  {
    titulo: "Dados e IA",
    camada: "ciano",
    glifo: "[ ]",
    chips: [
      "Python",
      "pandas",
      "SQL",
      "Power Query",
      "ETL",
      "Detecção de anomalias",
      "Engenharia de prompt",
      "Claude",
      "ChatGPT",
      "Gemini",
    ],
  },
  {
    titulo: "DevOps e qualidade",
    camada: "ambar",
    glifo: "CI",
    chips: [
      "Git",
      "GitHub",
      "GitHub Actions",
      "Deploy automatizado",
      "ESLint",
      "Prettier",
      "Node",
      "NPM",
      "SSL",
      "DNS",
      "Gestão de cache",
      "DevSecOps",
      "Chrome DevTools",
    ],
  },
  {
    titulo: "SEO e presença digital",
    camada: "ambar",
    glifo: "#",
    chips: [
      "SEO técnico",
      "Open Graph",
      "Schema JSON-LD",
      "Sitemap",
      "Search Console",
      "Google Business Profile",
      "Google Ads",
    ],
  },
];

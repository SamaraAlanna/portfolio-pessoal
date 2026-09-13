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
];

export type LinhaDoSetup = { item: string; valor: string; leve?: boolean };

/** A última linha sai mais discreta de propósito: é piada, não especificação. */
export const setup: LinhaDoSetup[] = [
  { item: "Monitor", valor: 'Alienware 320hz 25" IPS' },
  { item: "Teclado", valor: "AULA HERO 84 HE" },
  { item: "Mouse", valor: "Razer Deathadder V3 Pro" },
  { item: "Headset", valor: "MCHOSE PRO" },
  { item: "Microfone", valor: "FIFINE AM8" },
  { item: "PC", valor: "RYZEN 5600, RTX 4060, 16GB RAM, 1TB E 500GB SSD" },
  { item: "Supervisor", valor: "Dio, gato", leve: true },
];

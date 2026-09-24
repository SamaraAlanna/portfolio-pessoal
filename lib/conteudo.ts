import { readFileSync, readdirSync } from "node:fs";
import { join } from "node:path";

/**
 * Leitura dos projetos a partir dos arquivos MDX do repositório.
 *
 * Não há banco. A pasta /conteudo é a fonte, e o painel da fase dois vai gravar nela pela
 * API do GitHub. Por isso a listagem varre o diretório em vez de manter um índice: índice
 * seria um segundo lugar para o painel atualizar, e um dia ele esqueceria.
 */

export type Tipo = "identidade-visual" | "ux-produto" | "engenharia";
export type Estado = "no-ar" | "em-construcao";

export type CampoDaFicha = { rotulo: string; valor: string };

export type Projeto = {
  slug: string;
  titulo: string;
  /**
   * Título na página de case, quando difere do título do card. O card do CRUD se chama
   * "Remake do CRUD de permissões" e a página de case se chama só "CRUD".
   */
  tituloCase?: string;
  tipo: Tipo;
  tipoSecundario?: Tipo;
  tags: string[];
  estado: Estado;
  destaque: boolean;
  ordem: number;
  /** Posição na home. Ausente significa que o projeto não aparece lá. */
  ordemHome?: number;
  publicado: boolean;
  /** Texto do card na listagem. */
  descricao: string;
  /** Texto do card na home. É mais curto e diferente do da listagem, por decisão de design. */
  resumo: string;
  /** Parágrafo de abertura da página de case, logo abaixo do título. */
  abertura: string;
  /** Ficha técnica: pares de rótulo e valor, na ordem em que aparecem. */
  ficha: CampoDaFicha[];
  /** Prévia usada nos cards. */
  imagem?: string;
  /** Imagem grande no topo do case. Opcional: o Bajaj não tem. */
  heroCase?: string;
  corpo: string;
};

const PASTA = join(process.cwd(), "conteudo", "projetos");

/**
 * Frontmatter simples, sem dependência de parser de YAML.
 *
 * O formato é conhecido e fechado: chave, dois-pontos, valor, mais listas em colchetes e
 * listas em bloco com hífen, que a ficha técnica usa. Um parser de YAML completo
 * resolveria casos que este conteúdo não tem, e traria uma dependência para isso.
 */
function lerFrontmatter(
  bruto: string,
): [Record<string, string>, Record<string, string[]>, string] {
  const casamento = /^---\r?\n([\s\S]*?)\r?\n---\r?\n?([\s\S]*)$/.exec(bruto);
  if (!casamento) return [{}, {}, bruto];

  const campos: Record<string, string> = {};
  const listas: Record<string, string[]> = {};
  let listaAtual: string | null = null;

  for (const linha of casamento[1].split(/\r?\n/)) {
    // Item de lista em bloco: recuo e hífen. É o formato da ficha técnica.
    const item = /^\s+-\s+(.*)$/.exec(linha);
    if (item && listaAtual) {
      listas[listaAtual].push(item[1].trim());
      continue;
    }

    const separador = linha.indexOf(":");
    if (separador === -1) continue;
    const chave = linha.slice(0, separador).trim();
    const valor = linha.slice(separador + 1).trim();
    if (!chave) continue;

    // Chave sem valor abre uma lista em bloco.
    if (valor === "") {
      listaAtual = chave;
      listas[chave] = [];
      continue;
    }

    listaAtual = null;
    campos[chave] = valor;
  }

  return [campos, listas, casamento[2]];
}

function lerLista(valor: string | undefined): string[] {
  if (!valor) return [];
  return valor
    .replace(/^\[/, "")
    .replace(/\]$/, "")
    .split(",")
    .map((item) => item.trim().replace(/^["']|["']$/g, ""))
    .filter(Boolean);
}

function lerTexto(valor: string | undefined): string {
  return (valor ?? "").replace(/^["']|["']$/g, "");
}

function paraProjeto(arquivo: string): Projeto {
  const bruto = readFileSync(join(PASTA, arquivo), "utf8");
  const [campos, listas, corpo] = lerFrontmatter(bruto);

  return {
    slug: lerTexto(campos.slug) || arquivo.replace(/\.mdx$/, ""),
    titulo: lerTexto(campos.titulo),
    tituloCase: campos.tituloCase ? lerTexto(campos.tituloCase) : undefined,
    tipo: (lerTexto(campos.tipo) || "ux-produto") as Tipo,
    tipoSecundario: campos.tipoSecundario
      ? (lerTexto(campos.tipoSecundario) as Tipo)
      : undefined,
    tags: lerLista(campos.tags),
    estado: (lerTexto(campos.estado) || "no-ar") as Estado,
    destaque: lerTexto(campos.destaque) === "true",
    ordem: Number(lerTexto(campos.ordem) || "999"),
    ordemHome:
      campos.ordemHome === undefined ? undefined : Number(lerTexto(campos.ordemHome)),
    publicado: lerTexto(campos.publicado) !== "false",
    descricao: lerTexto(campos.descricao),
    resumo: lerTexto(campos.resumo) || lerTexto(campos.descricao),
    abertura: lerTexto(campos.abertura),
    ficha: (listas.ficha ?? []).map((linha) => {
      const [rotulo, ...resto] = linha.split("|");
      return { rotulo: rotulo.trim(), valor: resto.join("|").trim() };
    }),
    imagem: campos.imagem ? lerTexto(campos.imagem) : undefined,
    heroCase: campos.heroCase ? lerTexto(campos.heroCase) : undefined,
    corpo,
  };
}

/** Todos os projetos publicados, na ordem definida no frontmatter. */
export function lerProjetos(): Projeto[] {
  return readdirSync(PASTA)
    .filter((arquivo) => arquivo.endsWith(".mdx"))
    .map(paraProjeto)
    .filter((projeto) => projeto.publicado)
    .sort((a, b) => a.ordem - b.ordem);
}

export function lerProjeto(slug: string): Projeto | undefined {
  return lerProjetos().find((projeto) => projeto.slug === slug);
}

/**
 * Projetos que aparecem na home, na ordem definida por ordemHome.
 *
 * A seleção é explícita e não "os primeiros da listagem", porque no Figma a home mostra
 * uma escolha própria, que não são os primeiros da grade de projetos.
 *
 * **HOJE SOBRARAM TRÊS, E O DESENHO PEDE QUATRO.** O Míriam Araújo tinha `ordemHome: 3` e
 * saiu em 2026-09-23 com os cases de identidade visual. A grade da home é um card de
 * destaque ao lado de três empilhados, e o destaque não tem altura própria: ele acompanha
 * a coluna do lado. Com dois empilhados ele encolhe junto e a composição do Figma se
 * perde. Promover um projeto a `ordemHome: 3` devolve a grade, e qual promover é escolha
 * de curadoria.
 */
export function lerProjetosDaHome(): Projeto[] {
  return lerProjetos()
    .filter((projeto) => projeto.ordemHome !== undefined)
    .sort((a, b) => (a.ordemHome ?? 0) - (b.ordemHome ?? 0));
}

/**
 * O projeto seguinte na ordem da listagem, circulando no fim.
 *
 * É regra de ordem, confirmada no Figma, então não precisa de campo no frontmatter: cada
 * case aponta para o seguinte em `ordem` e o último volta para o primeiro.
 *
 * **Ela se conserta sozinha quando um case sai**, e é por isso que é regra e não campo:
 * a remoção dos três cases de identidade visual em 2026-09-23 não deixou nenhum ponteiro
 * quebrado. Com destino no frontmatter, três cases teriam passado a apontar para o vazio.
 */
export function proximoProjeto(slug: string): Projeto | undefined {
  const projetos = lerProjetos();
  const atual = projetos.findIndex((projeto) => projeto.slug === slug);
  if (atual === -1 || projetos.length < 2) return undefined;
  return projetos[(atual + 1) % projetos.length];
}

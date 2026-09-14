import type { Metadata } from "next";

/**
 * Identidade do site fora do conteúdo: endereço, nome e imagem de compartilhamento.
 *
 * O endereço vive aqui porque três lugares precisam dele e nenhum deles pode divergir: o
 * `metadataBase` do layout, o sitemap e o robots. Com a constante, trocar de domínio é
 * mudar uma linha.
 */
export const SITE = "https://portfoliosamara.com.br";

export const NOME = "Samara Alanna";

/**
 * Imagem que aparece quando alguém cola o link no LinkedIn, no WhatsApp ou no X.
 *
 * A EXTENSÃO AQUI PRECISA BATER COM O ARQUIVO EM `public/imagens`, e não batia: esta linha
 * dizia `.png` e o arquivo em disco é `.jpg`. O cartão de todas as páginas estava sem
 * imagem, e **esse defeito não aparece navegando no site**, só quando alguém cola o link
 * em algum lugar. Corrigido em 2026-09-14. Se a imagem for reexportada em outro formato,
 * esta linha muda junto.
 *
 * JPEG serve tão bem quanto PNG aqui, e por isso a correção foi na linha e não no arquivo.
 * A regra que vale é não usar WebP: o suporte dele em cartão é irregular entre as
 * plataformas, e uma imagem que não carrega ali não tem substituto, o link sai sem cartão
 * nenhum. JPEG e PNG são aceitos em todas.
 *
 * 1200x630 é a medida que Facebook, LinkedIn e X usam para o cartão grande.
 */
export const IMAGEM_COMPARTILHAMENTO = "/imagens/compartilhamento.jpg";

/**
 * Caminhos dos currículos, em `public/curriculos`.
 *
 * Ficam aqui porque quatro lugares apontam para eles: o botão do hero, o do Sobre e os
 * dois links do rodapé. Escritos à mão em cada arquivo, os quatro erraram juntos quando os
 * PDFs entraram no repositório com outro nome, e ninguém percebe link de PDF quebrado
 * navegando pelo site.
 */
export const CURRICULO = {
  pt: "/curriculos/CV_Samara_Alanna_PT.pdf",
  en: "/curriculos/CV_Samara_Alanna_EN.pdf",
} as const;

const DESCRICAO_DA_IMAGEM =
  "Portfólio de Samara Alanna, UX/UI Designer e Desenvolvedora Full Stack";

/**
 * Monta o metadata de uma página.
 *
 * Existe para o Open Graph não ser escrito à mão em cada rota. Repetido a cada página,
 * um dia alguém acrescenta uma rota e esquece do bloco, e o cartão daquela página sai
 * genérico sem ninguém perceber, porque isso só aparece quando o link é compartilhado.
 *
 * O título completo é montado aqui pelo mesmo motivo: as quatro páginas internas e os
 * oito cases seguiam o mesmo padrão copiado.
 */
export function metadataDaPagina({
  titulo,
  descricao,
  caminho,
  tipo = "website",
}: {
  titulo: string;
  descricao: string;
  /** Caminho a partir da raiz, começando com barra. Vira canonical e og:url. */
  caminho: string;
  /** "article" nos cases, que são conteúdo com autoria, e "website" no resto. */
  tipo?: "website" | "article";
}): Metadata {
  const tituloCompleto = caminho === "/" ? titulo : `${titulo} · ${NOME}`;

  return {
    title: tituloCompleto,
    description: descricao,
    alternates: { canonical: caminho },
    openGraph: {
      type: tipo,
      locale: "pt_BR",
      siteName: NOME,
      url: caminho,
      title: tituloCompleto,
      description: descricao,
      images: [
        {
          url: IMAGEM_COMPARTILHAMENTO,
          width: 1200,
          height: 630,
          alt: DESCRICAO_DA_IMAGEM,
        },
      ],
    },
    twitter: {
      card: "summary_large_image",
      title: tituloCompleto,
      description: descricao,
      images: [IMAGEM_COMPARTILHAMENTO],
    },
  };
}

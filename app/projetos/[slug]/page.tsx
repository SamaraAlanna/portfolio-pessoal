import { ViewTransition } from "react";
import type { Metadata } from "next";
import { metadataDaPagina } from "@/lib/site";
import { notFound } from "next/navigation";
import Image from "next/image";
import { MDXRemote } from "next-mdx-remote/rsc";
import remarkDirective from "remark-directive";
import { directivasParaComponentes } from "@/lib/mdx";
import { dimensaoDaImagem } from "@/lib/imagens";
import { blocos } from "@/components/blocos";
import { lerProjeto, lerProjetos, proximoProjeto } from "@/lib/conteudo";
import SecaoCabecalho from "@/app/projetos/[slug]/_secoes/secao-cabecalho";
import SecaoFicha from "@/app/projetos/[slug]/_secoes/secao-ficha";
import SecaoEmConstrucao from "@/app/projetos/[slug]/_secoes/secao-em-construcao";
import SecaoProximo from "@/app/projetos/[slug]/_secoes/secao-proximo";

/**
 * Página de case.
 *
 * É UMA página, não uma por modelo. Os modelos de case não diferem em estrutura de
 * página: diferem nos rótulos e na ordem das seções, e isso vive no MDX. A moldura aqui é
 * sempre a mesma:
 *
 *   nav → migalha → cabeçalho → ficha técnica → [hero] → corpo → próximo projeto → footer
 *
 * **O modelo identidade visual saiu em 2026-09-23**, junto com os três cases que o usavam,
 * e sobraram ux-produto e engenharia. O `tipo` do frontmatter continua valendo: ele decide
 * o accent do case, ciano em engenharia e rosa em ux-produto.
 *
 * O hero é opcional de verdade: o CRUD tem imagem no topo, o Bajaj não.
 *
 * O ESPAÇAMENTO VERTICAL SAI DO FIGMA COMO PADDING, E NUNCA COMO ALTURA. O hero lá mede
 * 205px e a ficha 105, e esses números são consequência do conteúdo daquele dia: 56 de
 * respiro em cima e embaixo do hero, 22 em cima e embaixo da faixa da ficha, 56 antes da
 * imagem de abertura e 104 antes do corpo. **Fixar a altura faria o primeiro título de duas
 * linhas vazar**, então o que o código guarda são os respiros.
 */
export function generateStaticParams() {
  return lerProjetos().map((projeto) => ({ slug: projeto.slug }));
}

export async function generateMetadata({
  params,
}: PageProps<"/projetos/[slug]">): Promise<Metadata> {
  const { slug } = await params;
  const projeto = lerProjeto(slug);
  if (!projeto) return {};

  // Cada case tem cartão próprio. Sem isso, compartilhar um projeto específico mostra o
  // cartão genérico do site, e quem recebe o link não sabe o que vai abrir.
  // O título aqui é o do card, e não o `tituloCase`, mesmo que o h1 da página use o
  // segundo. O `tituloCase` existe para encurtar na tela, onde a migalha e a ficha já
  // dizem do que se trata: o do CRUD é só "CRUD". Fora da página não existe esse contexto,
  // e um resultado de busca ou um link compartilhado chamado "CRUD" não diz nada.
  return metadataDaPagina({
    titulo: projeto.titulo,
    descricao: projeto.descricao,
    caminho: `/projetos/${projeto.slug}`,
    tipo: "article",
  });
}

export default async function PaginaCase({ params }: PageProps<"/projetos/[slug]">) {
  const { slug } = await params;
  const projeto = lerProjeto(slug);
  if (!projeto) notFound();

  const proximo = proximoProjeto(projeto.slug);
  const emConstrucao = projeto.estado === "em-construcao";
  const hero = projeto.heroCase ? dimensaoDaImagem(projeto.heroCase) : null;

  return (
    <article>
      <SecaoCabecalho projeto={projeto} />

      {emConstrucao ? (
        <SecaoEmConstrucao />
      ) : (
        <>
          <SecaoFicha ficha={projeto.ficha} />

          {/* O nome só existe quando há hero. Nos cases sem imagem o par não se forma e
              só o título viaja, que já comunica continuidade. Quando o heroCase for
              preenchido, o morph passa a funcionar sem tocar neste arquivo. */}
          {projeto.heroCase && hero ? (
            <ViewTransition
              name={`capa-${projeto.slug}`}
              share="morph-projeto"
              default="none"
            >
            <div className="faixa pt-[56px]">
              <Image
                src={projeto.heroCase}
                alt={`Tela principal do projeto ${projeto.titulo}`}
                width={hero.largura}
                height={hero.altura}
                priority
                sizes="(max-width: 1024px) 100vw, 1200px"
                className="h-auto w-full rounded-[12px]"
              />
            </div>
            </ViewTransition>
          ) : null}

          <div className="flex flex-col gap-[72px] faixa pt-[104px] pb-[80px]">
            <MDXRemote
              source={projeto.corpo}
              components={blocos}
              options={{
                mdxOptions: {
                  remarkPlugins: [remarkDirective, directivasParaComponentes],
                },
              }}
            />
          </div>
        </>
      )}

      {proximo ? <SecaoProximo projeto={proximo} /> : null}
    </article>
  );
}

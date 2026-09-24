import { ViewTransition } from "react";
import Link from "next/link";
import Tag from "@/components/ui/tag";
import { chipsDoCard } from "@/lib/filtros";
import BadgeConstrucao from "@/components/ui/badge-construcao";
import PreviewProjeto from "@/components/ui/preview-projeto";
import type { Projeto } from "@/lib/conteudo";

/**
 * Card da listagem de projetos. Nove numa grade de três colunas no desktop.
 *
 * A raiz não recorta conteúdo, de propósito. O recorte da imagem vive no PreviewProjeto.
 */
export default function CardProjeto({
  projeto,
  prioridade = false,
}: {
  projeto: Projeto;
  prioridade?: boolean;
}) {
  return (
    <Link
      href={`/projetos/${projeto.slug}`}
      className="cartao-interativo flex h-full flex-col justify-between rounded-[12px] border-[0.5px] border-border bg-surface"
    >
      <ViewTransition name={`capa-${projeto.slug}`} share="morph-projeto" default="none">
        <PreviewProjeto
          imagem={projeto.imagem}
          titulo={projeto.titulo}
          altura="h-[148px]"
          prioridade={prioridade}
        />
      </ViewTransition>

      <div className="flex flex-1 flex-col justify-between px-[22px] pt-[20px] pb-[22px]">
        <div className="flex flex-col gap-[10px]">
          <ViewTransition
            name={`titulo-${projeto.slug}`}
            share="morph-projeto"
            default="none"
          >
            <h2 className="text-card-titulo font-bold text-text">{projeto.titulo}</h2>
          </ViewTransition>
          <p className="text-card-descricao text-text-muted">{projeto.descricao}</p>
        </div>

        <div className="mt-[16px] flex flex-wrap gap-[6px]">
          {chipsDoCard(projeto.tags).map((chip) => (
            <Tag key={chip} valor={chip} />
          ))}
          {projeto.estado === "em-construcao" ? <BadgeConstrucao /> : null}
        </div>
      </div>
    </Link>
  );
}

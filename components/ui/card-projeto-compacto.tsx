import { ViewTransition } from "react";
import Link from "next/link";
import Tag from "@/components/ui/tag";
import BadgeConstrucao from "@/components/ui/badge-construcao";
import type { Projeto } from "@/lib/conteudo";

/**
 * Card menor da coluna secundária da home. Sem imagem, só texto e tags.
 *
 * Título em 18px. No Figma dois dos três estão em 18 e o do Bajaj em 22, o que parece
 * desvio e não intenção, então segui a maioria. Está anotado no relatório.
 */
export default function CardProjetoCompacto({ projeto }: { projeto: Projeto }) {
  return (
    <Link
      href={`/projetos/${projeto.slug}`}
      className="cartao-compacto cartao-interativo flex flex-1 flex-col justify-between gap-[16px] rounded-[12px] border-[0.5px] border-border bg-surface p-[26px]"
    >
      <div className="flex flex-col gap-[8px]">
        <ViewTransition
          name={`titulo-${projeto.slug}`}
          share="morph-projeto"
          default="none"
        >
          <h3 className="text-card-compacto-titulo font-bold text-text">
            {projeto.titulo}
          </h3>
        </ViewTransition>
        <p className="text-corpo leading-[1.5] text-text-muted">{projeto.resumo}</p>
      </div>

      <div className="flex flex-wrap gap-[6px]">
        {projeto.tags.map((tag) => (
          <Tag key={tag}>{tag}</Tag>
        ))}
        {projeto.estado === "em-construcao" ? <BadgeConstrucao /> : null}
      </div>
    </Link>
  );
}

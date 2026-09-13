import Link from "next/link";
import Tag from "@/components/ui/tag";
import BadgeConstrucao from "@/components/ui/badge-construcao";
import PreviewProjeto from "@/components/ui/preview-projeto";
import type { Projeto } from "@/lib/conteudo";

/**
 * Card grande da home. Filete em accent na borda, que é o que o separa dos outros.
 * Usa o campo resumo, e não descricao: a home traz um texto próprio, mais curto.
 */
export default function CardProjetoDestaque({ projeto }: { projeto: Projeto }) {
  return (
    <Link
      href={`/projetos/${projeto.slug}`}
      className="cartao-interativo flex h-full flex-col rounded-[12px] border-[0.5px] border-border bg-surface"
    >
      <PreviewProjeto
        imagem={projeto.imagem}
        titulo={projeto.titulo}
        altura="h-[344px]"
        prioridade
      />

      <div className="flex flex-col justify-center gap-[16px] px-[28px] pt-[26px] pb-[28px]">
        <div className="flex flex-col gap-[10px]">
          <h3 className="text-titulo-card font-bold text-text">{projeto.titulo}</h3>
          <p className="text-corpo leading-[1.55] text-text-muted">{projeto.resumo}</p>
        </div>

        <div className="flex flex-wrap gap-[6px]">
          {projeto.tags.map((tag) => (
            <Tag key={tag}>{tag}</Tag>
          ))}
          {projeto.estado === "em-construcao" ? <BadgeConstrucao /> : null}
        </div>
      </div>
    </Link>
  );
}

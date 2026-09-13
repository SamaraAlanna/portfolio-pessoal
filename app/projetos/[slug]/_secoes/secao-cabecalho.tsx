import Link from "next/link";
import BadgeConstrucao from "@/components/ui/badge-construcao";
import type { Projeto } from "@/lib/conteudo";

/**
 * Migalha, título e abertura do case.
 *
 * O título do case costuma ser o mesmo do card, mas nem sempre: o card do CRUD se chama
 * "Remake do CRUD de permissões" e a página dele se chama só "CRUD". Por isso existe o
 * campo tituloCase, opcional, que cai no titulo quando ausente.
 *
 * O badge âmbar fica ao lado do título quando o projeto está em construção, e não no
 * lugar de nada.
 */
export function Migalha() {
  return (
    <nav aria-label="Você está aqui" className="faixa pt-[56px]">
      <Link
        href="/projetos"
        className="alvo-toque-vertical inline-flex items-center gap-[10px] text-corpo text-text-muted"
      >
        <span aria-hidden="true">&larr;</span>
        Todos os projetos
      </Link>
    </nav>
  );
}

export default function SecaoCabecalho({ projeto }: { projeto: Projeto }) {
  return (
    <header className="flex flex-col items-start gap-[20px] faixa pt-[36px] pb-[48px]">
      <div className="flex flex-wrap items-center gap-[16px]">
        <h1 className="text-titulo-case font-extrabold text-text">
          {projeto.tituloCase ?? projeto.titulo}
        </h1>
        {projeto.estado === "em-construcao" ? <BadgeConstrucao /> : null}
      </div>

      {projeto.abertura ? (
        <p className="text-abertura-case text-text-muted">{projeto.abertura}</p>
      ) : null}
    </header>
  );
}

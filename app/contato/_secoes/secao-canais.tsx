import Link from "next/link";
import { canais } from "@/conteudo/contato";

/**
 * Canais diretos e a ponte para o BORDA.
 *
 * Cada canal é um link de verdade: mailto no e-mail, perfil no LinkedIn e no GitHub. No
 * Figma eles são só texto, mas endereço que não clica numa página de contato é atrito
 * sem motivo.
 */
export default function SecaoCanais() {
  return (
    <div className="flex w-full flex-col gap-[24px]">
      <h2 className="sr-only">Canais diretos</h2>
      {/* Sem overflow hidden: os canais são links, e recortar aqui cortaria o anel de
          foco deles. Não há o que recortar mesmo, porque nenhum item tem fundo próprio. */}
      <ul className="flex w-full flex-col rounded-[12px] border-[0.5px] border-border bg-surface">
        {canais.map((canal, indice) => (
          <li
            key={canal.rotulo}
            className={indice > 0 ? "border-t-[0.5px] border-border" : undefined}
          >
            <Link
              href={canal.destino}
              className="flex w-full items-center justify-between gap-[16px] px-[20px] py-[16px]"
            >
              <span className="font-mono text-tag text-text-dim">{canal.rotulo}</span>
              <span className="text-card-descricao text-text">{canal.valor}</span>
            </Link>
          </li>
        ))}
      </ul>

      <Link
        href="https://bordadesign.com.br"
        className="flex flex-wrap items-center gap-[8px] rounded-[12px] bg-tint-rosa px-[18px] py-[14px] text-card-descricao"
      >
        <span className="text-text-muted">Projeto para empresa ou cliente?</span>
        <span className="font-medium text-accent-rosa">BORDA Design &rarr;</span>
      </Link>
    </div>
  );
}

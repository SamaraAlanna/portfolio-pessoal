import Link from "next/link";
import { comunidade } from "@/conteudo/sobre";

/**
 * Card da comunidade. É a única caixa com fundo tingido desta página, dentro da cota de
 * uma por página.
 */
export default function SecaoComunidade() {
  return (
    <section data-revelar className="faixa pb-[72px]">
      <h2 className="font-mono text-rotulo-secao font-medium text-accent-rosa">
        COMUNIDADE
      </h2>

      <Link
        href={comunidade.destino}
        className="mt-[28px] flex w-full flex-col items-start gap-[16px] rounded-[12px] border-[0.5px] border-accent-rosa bg-tint-rosa px-[36px] pt-[32px] pb-[34px] lg:flex-row lg:items-center lg:justify-between"
      >
        <span className="flex flex-1 flex-col gap-[10px]">
          <span className="text-titulo-card font-bold text-text">{comunidade.titulo}</span>
          <span className="text-corpo-case leading-[1.62] text-text-muted">
            {comunidade.texto}
          </span>
        </span>

        <span className="flex shrink-0 items-center gap-[8px] lg:pl-[32px]">
          <span className="text-corpo font-medium text-text">{comunidade.linkRotulo}</span>
          <span aria-hidden="true" className="text-corpo text-accent-rosa">
            &rarr;
          </span>
        </span>
      </Link>
    </section>
  );
}

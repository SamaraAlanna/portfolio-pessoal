import Link from "next/link";
import type { Projeto } from "@/lib/conteudo";

/**
 * Fechamento do case, apontando para o próximo projeto.
 *
 * Quem decide qual é o próximo é a ordem da listagem, circulando no fim. Não há campo no
 * frontmatter para isso.
 *
 * A seta é decorativa: o destino já está dito pelo nome do projeto, e repetir "seta" para
 * quem usa leitor de tela só atrapalha.
 */
export default function SecaoProximo({ projeto }: { projeto: Projeto }) {
  return (
    <section data-revelar className="faixa py-[44px]">
      <Link
        href={`/projetos/${projeto.slug}`}
        className="flex flex-col items-start gap-[16px] lg:flex-row lg:items-center lg:justify-between"
      >
        <span className="flex flex-col items-start gap-[8px]">
          <span className="font-mono text-ficha-rotulo font-medium text-text-muted">
            PRÓXIMO PROJETO
          </span>
          <span className="text-proximo font-bold text-text">{projeto.titulo}</span>
        </span>
        <span aria-hidden="true" className="text-proximo text-accent-rosa">
          &rarr;
        </span>
      </Link>
    </section>
  );
}

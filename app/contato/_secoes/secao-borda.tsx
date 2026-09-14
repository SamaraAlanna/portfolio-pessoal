import Link from "next/link";

/**
 * Ponte para o BORDA.
 *
 * Fica no fim da página, e não junto dos canais como antes. O motivo é a seção nova: um
 * dos motivos de contato é justamente projeto pelo estúdio, então a pílula logo depois
 * dele vira a porta do que acabou de ser explicado, em vez de repetir o BORDA duas vezes
 * em blocos diferentes.
 */
export default function SecaoBorda() {
  return (
    <section className="flex w-full">
      <Link
        href="https://bordadesign.com.br"
        target="_blank"
        rel="noopener"
        className="alvo-toque-vertical flex flex-wrap items-center gap-[8px] rounded-[12px] bg-tint-rosa px-[18px] py-[14px] text-card-descricao"
      >
        <span className="text-text-muted">Projeto para empresa ou cliente?</span>
        <span className="font-medium text-accent-rosa">BORDA Design &rarr;</span>
        <span className="sr-only">(abre em nova aba)</span>
      </Link>
    </section>
  );
}

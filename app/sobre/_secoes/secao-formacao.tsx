import { formacao, idiomas } from "@/conteudo/sobre";

export default function SecaoFormacao() {
  return (
    <section data-revelar className="faixa pb-[72px]">
      <h2 className="font-mono text-rotulo-secao font-medium text-accent-rosa">FORMAÇÃO</h2>

      <ul className="mt-[36px] grid grid-cols-1 items-start gap-[24px] lg:grid-cols-2">
        {formacao.map((curso) => (
          <li
            key={curso.titulo}
            className="flex flex-col items-start gap-[10px] rounded-[12px] border-[0.5px] border-border bg-surface px-[28px] pt-[26px] pb-[28px]"
          >
            <h3 className="text-[19px] leading-[1.35] font-bold text-text">
              {curso.titulo}
            </h3>
            <p className="text-corpo text-text-muted">{curso.instituicao}</p>
            <p className="flex flex-wrap items-center gap-[14px] font-mono text-tag">
              <span className="text-accent-rosa">{curso.periodo}</span>
              <span className="text-text-dim">{curso.modalidade}</span>
            </p>
          </li>
        ))}
      </ul>

      <p className="mt-[52px] flex flex-wrap items-center gap-[10px]">
        <span className="font-mono text-ficha-rotulo font-medium tracking-[0.08em] text-accent-rosa">
          IDIOMAS
        </span>
        <span className="text-corpo text-text-muted">{idiomas}</span>
      </p>
    </section>
  );
}

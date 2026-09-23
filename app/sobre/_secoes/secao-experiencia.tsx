import { experiencia } from "@/conteudo/sobre";

/**
 * Experiência, em linha do tempo: período à esquerda, cargo e entregas à direita.
 *
 * No mobile o período sobe para cima do cargo, seguindo a regra de duas colunas virarem
 * uma só.
 *
 * QUEM SEPARA UMA EXPERIÊNCIA DA OUTRA É O ESPAÇO, E NÃO UMA LINHA. O filete entre elas
 * saiu em 2026-09-23. Sem ele o espaço precisa ser inequívoco, e por isso são 72px: o
 * maior vão dentro de uma experiência é 16px, então a separação é 4,5 vezes o interno e
 * não dá para confundir as duas escalas. Com os 64px de antes, que vinham de 32 de padding
 * de cada lado, o filete é que estava fazendo o trabalho.
 */
export default function SecaoExperiencia() {
  return (
    <section data-revelar className="faixa pb-[72px]">
      <h2 className="font-mono text-rotulo-secao font-medium text-accent-rosa">
        EXPERIÊNCIA
      </h2>

      <div className="mt-[36px] flex w-full flex-col gap-[72px]">
        {experiencia.map((cargo) => (
          <article
            key={cargo.empresa}
            className="flex flex-col gap-[16px] lg:flex-row lg:gap-[64px]"
          >
            <div className="flex shrink-0 flex-col gap-[8px] lg:w-[190px]">
              <p className="font-mono text-cta font-medium whitespace-nowrap text-accent-rosa">
                {cargo.periodo}
              </p>
              <p className="font-mono text-tag whitespace-nowrap text-text-dim">
                {cargo.vinculo}
              </p>
            </div>

            <div className="flex flex-1 flex-col gap-[8px]">
              <h3 className="text-[21px] font-bold text-text">{cargo.cargo}</h3>
              <p className="text-corpo text-text-muted">{cargo.empresa}</p>

              <ul className="mt-[10px] flex flex-col gap-[12px]">
                {cargo.itens.map((item) => (
                  <li key={item.slice(0, 32)} className="flex items-start gap-[14px]">
                    <span aria-hidden="true" className="font-mono text-[14px] text-accent-rosa">
                      -
                    </span>
                    <span className="flex-1 text-corpo leading-[1.58] text-text-muted">
                      {item}
                    </span>
                  </li>
                ))}
              </ul>
            </div>
          </article>
        ))}
      </div>
    </section>
  );
}

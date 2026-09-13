import { grupos, type Camada } from "@/conteudo/stack";

/**
 * Os oito grupos de habilidade, em cards de duas colunas.
 *
 * O marcador de 44x3 no topo de cada card carrega a camada, e é ele que amarra a página
 * ao sistema de cor do resto do site. O glifo grande à direita é decorativo e fica
 * escondido de leitor de tela.
 */
const MARCADORES: Record<Camada, string> = {
  rosa: "bg-accent-rosa",
  lavanda: "bg-accent-lavanda",
  ciano: "bg-accent-ciano",
  ambar: "bg-accent-ambar",
};

export default function SecaoGrupos() {
  return (
    <section data-revelar className="faixa pb-[72px]">
      <ul className="grid grid-cols-1 items-start gap-[24px] lg:grid-cols-2">
        {grupos.map((grupo) => (
          <li
            key={grupo.titulo}
            className="flex flex-col items-start rounded-[12px] border-[0.5px] border-border bg-surface px-[28px] pt-[28px] pb-[32px]"
          >
            <span
              aria-hidden="true"
              className={`h-[3px] w-[44px] rounded-full ${MARCADORES[grupo.camada]}`}
            />

            <div className="mt-[20px] flex w-full items-center justify-between gap-[16px]">
              <h2 className="text-[19px] font-bold text-text">{grupo.titulo}</h2>
              <span
                aria-hidden="true"
                className="font-mono text-[44px] leading-none text-text-dim/40"
              >
                {grupo.glifo}
              </span>
            </div>

            <ul className="mt-[20px] flex flex-wrap gap-[7px]">
              {grupo.chips.map((chip) => (
                <li
                  key={chip}
                  className="rounded-full border-[0.5px] border-border bg-surface-2 px-[11px] py-[6px] text-cta whitespace-nowrap text-text-muted"
                >
                  {chip}
                </li>
              ))}
            </ul>
          </li>
        ))}
      </ul>
    </section>
  );
}

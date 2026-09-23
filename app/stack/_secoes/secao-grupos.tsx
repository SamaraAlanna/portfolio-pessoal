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

/**
 * A cor da camada desce para os chips por herança, numa variável declarada no card.
 *
 * O chip acende nessa cor no hover, pela `.chip-stack` do `app/globals.css`. Escrever a cor
 * no próprio chip exigiria quatro pares de regra no CSS, um por camada, e a quinta camada
 * quebraria os dois lugares. Assim o CSS não precisa saber quantas camadas existem.
 */
const CORES_DE_CAMADA: Record<Camada, string> = {
  rosa: "[--cor-camada:var(--accent-rosa)]",
  lavanda: "[--cor-camada:var(--accent-lavanda)]",
  ciano: "[--cor-camada:var(--accent-ciano)]",
  ambar: "[--cor-camada:var(--accent-ambar)]",
};

export default function SecaoGrupos() {
  return (
    <section data-revelar className="faixa pb-[72px]">
      {/* Sem `items-start`, que encolhia cada card até o próprio conteúdo e deixava os dois
          da mesma linha com alturas diferentes, porque a contagem de chips varia por grupo.
          O `stretch` padrão faz os dois medirem a linha inteira. É por linha, e não pela
          grade toda, que é o que a grade faz sozinha e o que se quer aqui: igualar os oito
          pelo maior deixaria vazio embaixo dos curtos. */}
      <ul className="grid grid-cols-1 gap-[24px] lg:grid-cols-2">
        {grupos.map((grupo) => (
          <li
            key={grupo.titulo}
            className={`flex flex-col items-start rounded-[12px] border-[0.5px] border-border bg-surface px-[28px] pt-[28px] pb-[32px] ${CORES_DE_CAMADA[grupo.camada]}`}
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

            {/* O VÃO É 5px, E NÃO OS 7 DO FIGMA, e o motivo é a sobra no fim das linhas.
                Chip de largura variável quebrando em linha deixa buraco quando o próximo
                não cabe, e vão menor faz caber mais chip por linha, o que encolhe a sobra.
                Não a elimina, e não era para eliminar.

                JUSTIFICAR FOI CONSIDERADO E RECUSADO em 2026-09-23, com o motivo escrito
                para não ser retentado no escuro: numa linha de chips só a largura dos chips
                ou a largura dos vãos pode absorver o buraco, não existe terceira. Esticar
                chip quebra a gramática de pílula do site e deixa uma linha de um chip só
                virar uma pílula da largura do card. Esticar vão por `text-align: justify`
                preserva a largura e trata a última linha certo, mas faz o vão variar de
                linha para linha dentro do mesmo card, o que **troca um buraco no fim por
                vãos desiguais no meio**, e custa sair do `flex gap` para `inline-block`
                com espaço injetado no JSX e vão vertical amarrado a `line-height`.

                `justify-content: space-between` é a armadilha óbvia e é pior que as duas:
                ele estica a última linha também, então um grupo que termina com dois chips
                fica com um grudado em cada borda. */}
            <ul className="mt-[20px] flex flex-wrap gap-[5px]">
              {grupo.chips.map((chip) => (
                <li
                  key={chip}
                  className="chip-stack rounded-full border-[0.5px] border-border bg-surface-2 px-[11px] py-[6px] text-cta whitespace-nowrap text-text-muted"
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

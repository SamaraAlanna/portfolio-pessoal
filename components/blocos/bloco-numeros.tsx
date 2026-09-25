import type { ReactNode } from "react";
import { linhasDeCampos, numeroDoValor } from "@/lib/texto";
import TrilhoRolavel from "@/components/ui/trilho-rolavel";

/**
 * Números do projeto, em dois formatos.
 *
 * Formato do conteúdo, uma linha por número, com a cor como terceiro campo opcional:
 *   106 | formulários com validação dupla
 *   83  | formulários protegidos contra duplo clique | lavanda
 *   700+ | arquivos órfãos removidos do servidor | case
 *
 * O PADRÃO É A GRADE DE CARDS, com número de 44px e legenda embaixo, e carrossel no mobile.
 * Com `formato="linha"` ele vira a lista do frame novo do Bajaj: número em mono numa coluna
 * fixa, legenda ao lado, e um filete depois de cada linha.
 *
 * O FILETE É `border-b` EM TODAS AS LINHAS, E NÃO `border-t` DA SEGUNDA EM DIANTE. O Figma
 * desenha as duas coisas juntas, sem linha no topo e com linha embaixo da última, e o
 * resultado dos dois caminhos é idêntico. Um seletor a menos.
 *
 * A LISTA NÃO VIRA CARROSSEL NO MOBILE, e a grade vira. Linha empilhada já é uma coluna só,
 * e um trilho rolável ali esconderia metade da legenda sem ganhar nada.
 *
 * O VALOR `case` LÊ O `--accent-case` E É O PADRÃO DOS FRAMES NOVOS. Lá o número acompanha o
 * accent do case, ciano em engenharia e rosa em ux-produto, em vez de dizer a camada de cada
 * item. **Ele existe para a cor não precisar ser escrita linha a linha**, que era o caminho
 * óbvio e quebraria no dia em que um case mudasse de tipo: o `tipo` do frontmatter mudaria e
 * os números continuariam na cor antiga, sem erro nenhum aparecer.
 *
 * As quatro camadas continuam disponíveis para quando a cor for do item, e não do case, no
 * mesmo significado que ela tem no sistema inteiro. Sem terceiro campo, o número sai em rosa.
 *
 * MOBILE DA GRADE: carrossel horizontal com encaixe, com cards de 210px e espaço de 12,
 * medidos do Figma. A partir de 40rem a grade volta, porque aí já cabem duas colunas
 * inteiras e um trilho de 210 num tablet seria desperdício de largura.
 *
 * A moldura não recorta o conteúdo verticalmente: o padding de baixo dá respiro para o
 * anel de foco da própria moldura quando ela vira região rolável.
 *
 * O atributo `prova` marca este bloco como a prova visual central do case, e ele ganha uma
 * entrada própria, mais elaborada que a dos outros. Uma por case: se houver duas marcadas,
 * vale a primeira. A animação está no `app/globals.css` e só existe no desktop. Ela anima o
 * `dt`, então vale nos dois formatos.
 */
/**
 * O valor, preparado para a contagem do `ContarAoRolar`.
 *
 * TRÊS CAMADAS, E CADA UMA RESOLVE UMA COISA:
 *
 * 1. O `sr-only` carrega o valor final e **nunca muda**, então leitor de tela recebe "700+" e
 *    não a sequência da contagem. Ele é o único dos três que a árvore de acessibilidade vê.
 * 2. A cópia invisível reserva a largura do valor final. Sem ela o número cresceria de "0"
 *    até "700+" e empurraria o layout a cada quadro. **É ela que garante a largura, e não o
 *    `tabular-nums`**: a variante tabular iguala os dígitos entre si, mas não faz um dígito
 *    ocupar o espaço de quatro.
 * 3. O `data-contar` é o que anima, e nasce com o valor final escrito.
 *
 * O `aria-hidden` cobre as duas de baixo de uma vez, no invólucro.
 *
 * VALOR QUE NÃO É NÚMERO SAI COMO TEXTO, SEM NADA DISSO. O "UF" do Bajaj ocupa a coluna do
 * número e não conta, e envolver ele custaria uma duplicação de texto na árvore de
 * acessibilidade e um alvo a mais para o observador recusar. Quem decide é o
 * `numeroDoValor`, a mesma função que o `ContarAoRolar` usa para contar.
 */
function Valor({ children }: { children: string }) {
  if (!numeroDoValor(children)) return <>{children}</>;

  return (
    <>
      <span className="sr-only">{children}</span>
      <span aria-hidden="true" className="grid tabular-nums">
        <span className="invisible col-start-1 row-start-1">{children}</span>
        <span data-contar className="col-start-1 row-start-1">
          {children}
        </span>
      </span>
    </>
  );
}

const CORES: Record<string, string> = {
  case: "text-accent-case",
  rosa: "text-accent-rosa",
  lavanda: "text-accent-lavanda",
  ciano: "text-accent-ciano",
  ambar: "text-accent-ambar",
};

export default function BlocoNumeros({
  formato,
  prova,
  children,
}: {
  /** "linha" troca a grade de cards pela lista com filete. */
  formato?: string;
  prova?: string;
  children?: ReactNode;
}) {
  const numeros = linhasDeCampos(children);
  const ehProva = prova === "true";
  const classeDeProva = ehProva ? "prova-item prova-numero" : "";

  if (numeros.length === 0) return null;

  if (formato === "linha") {
    return (
      <div
        data-prova={ehProva ? "" : undefined}
        data-revelar={ehProva ? "" : undefined}
        className="w-full"
      >
        <dl className="flex w-full flex-col">
          {numeros.map(([valor, legenda, camada], indice) => (
            <div
              key={`${valor}-${indice}`}
              className={`flex w-full items-center gap-[32px] border-b-[0.5px] border-border py-[20px] ${classeDeProva}`}
            >
              <dt
                className={`w-[96px] shrink-0 font-mono text-numero-linha font-medium ${
                  CORES[camada ?? ""] ?? CORES.rosa
                }`}
              >
                <Valor>{valor}</Valor>
              </dt>
              <dd className="text-corpo-case text-text">{legenda}</dd>
            </div>
          ))}
        </dl>
      </div>
    );
  }

  return (
    <div
      data-prova={ehProva ? "" : undefined}
      data-revelar={ehProva ? "" : undefined}
      className="w-full"
    >
      <TrilhoRolavel
        rotulo="Números do projeto"
        className="w-full overflow-x-auto overscroll-x-contain px-[2px] pb-[8px] sm:overflow-x-visible sm:px-0 sm:pb-0"
      >
        <dl className="flex snap-x snap-mandatory gap-[12px] sm:grid sm:snap-none sm:grid-cols-2 sm:items-start sm:gap-[20px] lg:grid-cols-3">
          {numeros.map(([valor, legenda, camada], indice) => (
            <div
              key={`${valor}-${indice}`}
              className={`flex w-[210px] shrink-0 snap-start flex-col items-start gap-[10px] rounded-[12px] border-[0.5px] border-border bg-surface px-[26px] pt-[24px] pb-[26px] sm:w-auto sm:shrink ${classeDeProva}`}
            >
              <dt
                className={`text-numero font-extrabold whitespace-nowrap ${
                  CORES[camada ?? ""] ?? CORES.rosa
                }`}
              >
                <Valor>{valor}</Valor>
              </dt>
              <dd className="text-legenda text-text-muted">{legenda}</dd>
            </div>
          ))}
        </dl>
      </TrilhoRolavel>
    </div>
  );
}

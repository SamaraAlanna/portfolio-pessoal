import type { ReactNode } from "react";
import { linhasDeCampos } from "@/lib/texto";

/**
 * Cards de decisão, lado a lado.
 *
 * Formato do conteúdo, uma linha por card:
 *   rótulo | título | descrição | camada
 *
 *   :::opcoes
 *   BLOQUEIO | Funcionalidade só depois do perfil | O checkbox fica cinza até o perfil ser escolhido.
 *   SILÊNCIO | Nenhum selo de "perfil definido" | O estado normal já comunica sucesso.
 *   :::
 *
 * SEM LINHA EM BRANCO ENTRE OS CARDS, pelo mesmo motivo do `estados`: o `linhasDeCampos`
 * separa por quebra simples dentro de um parágrafo só, e linha em branco cria parágrafos
 * que o extrator concatena sem separador. Dois cards viram um, **e o build não reclama**.
 *
 * O TÍTULO É `h3` PORQUE A SEÇÃO JÁ É `h2`. O card não é uma seção nova, é um item dentro
 * da que o `bloco-secao` abriu, então o nível desce um. Deixá-lo como `p`, que era o estado
 * até 2026-09-24, tirava da estrutura de cabeçalhos a única coisa que nomeia cada card.
 *
 * OS DOIS CARDS TÊM A MESMA ALTURA, e quem garante isso é a **ausência** de `items-start` na
 * grade. Ele estava ali e encolhia cada card até o próprio conteúdo, então uma descrição de
 * três linhas ao lado de uma de duas terminava mais baixa. Sem ele volta o `stretch` e os
 * dois medem a linha inteira. É a mesma correção já registrada nos cards de formação do
 * Sobre, e no `li` o `h-full` só torna isso explícito.
 *
 * A COR PADRÃO DO RÓTULO É O `--accent-case`, E NÃO O ROSA FIXO. Ela acompanha o case, rosa
 * em ux-produto e ciano em engenharia, pelo mesmo mecanismo do rótulo de seção e do índice.
 * O atributo `camada` continua vencendo quando a linha declara uma, porque aí a cor está
 * dizendo de que camada é aquela decisão, e isso não é assunto do case inteiro.
 *
 * Quando o rótulo é ESCOLHIDA, o card ganha borda em accent, e não fundo tingido, porque
 * docs/modelos-de-case.md limita a uma caixa tingida por página e essa cota costuma já
 * estar gasta pelo bloco `destaque`.
 *
 * MEDIDAS DO FIGMA (CRUD, frame 446:930): dois cards de 442 com 16 de intervalo dentro dos
 * 900 da coluna do corpo, 28 de padding, 14 entre rótulo, título e descrição, raio 12. A
 * borda é 0,5 e não o 1 do arquivo, porque 0,5 é a espessura de card do projeto inteiro e
 * uma borda mais grossa aqui faria este card pesar diferente dos outros do mesmo case.
 */
const CORES: Record<string, string> = {
  rosa: "text-accent-rosa",
  lavanda: "text-accent-lavanda",
  ciano: "text-accent-ciano",
  ambar: "text-accent-ambar",
};

export default function BlocoOpcoes({ children }: { children?: ReactNode }) {
  const opcoes = linhasDeCampos(children);

  if (opcoes.length === 0) return null;

  return (
    <ul className="grid w-full grid-cols-1 gap-[16px] lg:grid-cols-2">
      {opcoes.map(([rotulo, titulo, descricao, camada], indice) => {
        const escolhida = rotulo?.toUpperCase() === "ESCOLHIDA";
        return (
          <li
            key={`${titulo}-${indice}`}
            className={`flex h-full flex-col items-start gap-[14px] rounded-[12px] border-[0.5px] bg-surface p-[28px] ${
              escolhida ? "border-accent-case" : "border-border"
            }`}
          >
            {rotulo ? (
              <p
                className={`font-mono text-ficha-rotulo font-medium whitespace-nowrap ${
                  CORES[camada ?? ""] ?? "text-accent-case"
                }`}
              >
                {rotulo}
              </p>
            ) : null}
            {titulo ? (
              <h3 className="text-opcao-titulo font-bold text-text">{titulo}</h3>
            ) : null}
            {descricao ? (
              <p className="text-corpo-case text-text-muted">{descricao}</p>
            ) : null}
          </li>
        );
      })}
    </ul>
  );
}

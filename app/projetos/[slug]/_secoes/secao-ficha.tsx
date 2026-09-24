import type { CampoDaFicha } from "@/lib/conteudo";

/**
 * Ficha técnica, em linha.
 *
 * Vem do frontmatter e não do corpo em MDX, porque é estruturada: sempre os mesmos
 * lugares, com rótulo e valor. No painel da fase dois isso vira campo a campo, em vez de
 * texto livre onde dá para errar a sintaxe.
 *
 * Os rótulos mudam por modelo de case, então cada campo carrega o próprio. No Bajaj e no
 * VOGE são PAPEL, CLIENTE, STACK, TIME e PERÍODO; no CRUD e no Assistente o segundo e o
 * terceiro viram CONTEXTO e ENTREGAS.
 *
 * DEIXOU DE SER CARD EM 2026-09-23. Ela era uma caixa com borda, fundo `--surface` e raio,
 * e virou uma faixa com filete em cima e embaixo, sem fundo. O filete usa a `--border`
 * comum: aqui ele separa, não delimita componente interativo.
 *
 * É `dl`, com `dt` no rótulo e `dd` no valor, e isso não é enfeite semântico: a ficha é
 * literalmente uma lista de pares termo e definição, e um leitor de tela anuncia "PAPEL,
 * Full stack" em vez de duas frases soltas.
 *
 * AS COLUNAS SÃO PROPORCIONAIS AO CONTEÚDO, E ISSO DIVERGE DO FIGMA DE PROPÓSITO. Lá quatro
 * são iguais e a segunda tem 170px fixos. **Largura fixa em coluna de texto quebra no
 * primeiro valor que não couber**, e é a mesma armadilha da altura fixa: a medida do
 * arquivo descreve o conteúdo que estava lá naquele dia.
 *
 * O `flex: 1 1 auto` faz o encolhimento ser proporcional. Com `1 0 0`, que é o do arquivo,
 * toda coluna fica com a mesma largura e "2026" desperdiça o que falta para o valor mais
 * longo do projeto, que empurra uma coluna vizinha para três linhas. Com base no conteúdo,
 * o PERÍODO devolve quase todo o espaço dele para as colunas longas.
 *
 * O `text-balance` no valor reproduz o efeito da quebra manual: duas linhas do mesmo
 * tamanho, em vez de uma cheia e uma sobra curta.
 *
 * No mobile são duas colunas, e não cinco nem uma, seguindo a exceção registrada no
 * CLAUDE.md para conteúdo comparativo curto.
 */
export default function SecaoFicha({ ficha }: { ficha: CampoDaFicha[] }) {
  if (ficha.length === 0) return null;

  return (
    <section className="faixa">
      <dl className="grid grid-cols-2 items-start gap-[24px] border-y-[0.5px] border-border py-[22px] lg:flex lg:gap-[40px]">
        {ficha.map((campo) => (
          <div
            key={campo.rotulo}
            className="flex flex-col items-start gap-[8px] lg:flex-[1_1_auto]"
          >
            <dt className="font-mono text-ficha-rotulo font-medium whitespace-nowrap text-text-dim">
              {campo.rotulo}
            </dt>
            <dd className="text-legenda text-balance text-text">{campo.valor}</dd>
          </div>
        ))}
      </dl>
    </section>
  );
}

import type { CampoDaFicha } from "@/lib/conteudo";

/**
 * Ficha técnica do case.
 *
 * Vem do frontmatter e não do corpo em MDX, porque é estruturada: sempre os mesmos
 * lugares, com rótulo e valor. No painel da fase dois isso vira campo a campo, em vez de
 * texto livre onde dá para errar a sintaxe.
 *
 * Os rótulos mudam por modelo de case, então cada campo carrega o próprio rótulo. No
 * Bajaj são PAPEL, CLIENTE, PERÍODO, STACK e TIME; no CRUD e no Tech Girls o segundo e o
 * quarto viram CONTEXTO e ENTREGAS.
 *
 * No mobile o Figma quebra em duas colunas, e não em cinco nem em uma.
 *
 * A LARGURA DAS COLUNAS É PROPORCIONAL AO CONTEÚDO, e essa é uma divergência consciente
 * do arquivo. No Figma as cinco colunas têm 227,2 cada e o espaço entre elas é zero: os
 * 1136 de dentro do card divididos em cinco partes exatas. O respiro que se vê lá não é
 * espaçamento, é efeito das quebras de linha digitadas à mão, que deixam cada linha mais
 * curta que a coluna. Como aqui a quebra é automática e o texto vem do frontmatter, o
 * respiro precisa virar regra.
 *
 * São duas mudanças, e as duas são necessárias:
 *
 * 1. Espaço de 32 entre colunas, que é o mesmo padding interno do card, então a régua do
 *    espaçamento passa a ser a do próprio card.
 * 2. `flex: 1 1 auto` em vez de `flex-1`, que é `flex: 1 1 0`. Com base zero toda coluna
 *    fica com os mesmos 227, e "2026" desperdiça o que falta para "Desenvolvimento full
 *    stack, segurança e infraestrutura". Com base no conteúdo o encolhimento é
 *    proporcional: o PERÍODO fica com cerca de 50 e devolve quase 180 para as colunas
 *    longas.
 *
 * Só o espaço de 32 não resolveria: com colunas iguais ele derruba cada uma para 201 e o
 * valor mais longo do projeto, de 56 caracteres, passa de duas linhas para três.
 *
 * O `text-balance` no valor é a última parte. Ele reproduz o efeito da quebra manual:
 * duas linhas do mesmo tamanho, em vez de uma cheia e uma sobra curta.
 */
export default function SecaoFicha({ ficha }: { ficha: CampoDaFicha[] }) {
  if (ficha.length === 0) return null;

  return (
    <section className="faixa pb-[64px]">
      <dl className="grid grid-cols-2 items-start gap-[24px] rounded-[12px] border-[0.5px] border-border bg-surface px-[32px] py-[28px] lg:flex lg:gap-[32px]">
        {ficha.map((campo) => (
          <div
            key={campo.rotulo}
            className="flex flex-col items-start gap-[10px] lg:flex-[1_1_auto]"
          >
            <dt className="font-mono text-ficha-rotulo font-medium whitespace-nowrap text-text-muted">
              {campo.rotulo}
            </dt>
            <dd className="text-legenda text-balance text-text">{campo.valor}</dd>
          </div>
        ))}
      </dl>
    </section>
  );
}

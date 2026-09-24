import type { CSSProperties } from "react";
import { COR_DA_CAMADA, FULL_STACK } from "@/lib/filtros";

/**
 * Chip do card de projeto.
 *
 * PARADO ELE É CINZA, E ACENDE NO HOVER DO CARD. Isso preserva a decisão de 2026-09-14: os
 * chips não são interativos sozinhos, são descrição do que o card contém, então quem manda
 * é o card. O que mudou em 2026-09-23 é a cor em que cada um acende, que passou a ser a da
 * própria camada em vez de rosa para todos.
 *
 * A COR DESCE POR VARIÁVEL, E A REGRA NO CSS É UMA SÓ. Cada chip declara `--cor-camada` e
 * o `.cartao-interativo:hover .tag-projeto` do `app/globals.css` lê dali. Escrever um par
 * de regras por camada daria o mesmo resultado e quebraria na quarta.
 *
 * O mapa vive em `lib/filtros.ts` e é o mesmo que a pílula do filtro usa. O padrão do
 * `.tag-projeto` é rosa, e isso é rede de segurança: chip com valor fora do mapa acende
 * como antes, em vez de não acender e parecer defeito.
 */
export default function Tag({ valor }: { valor: string }) {
  const cor = COR_DA_CAMADA[valor];

  return (
    <span
      style={cor ? ({ "--cor-camada": cor } as CSSProperties) : undefined}
      className="tag-projeto inline-flex items-center gap-[7px] rounded-full border-[0.5px] border-border bg-surface-2 px-[10px] py-[5px] text-tag whitespace-nowrap text-text-muted"
    >
      {/* Os dois pontinhos seguem o marcador de camada dos cards da Stack, e dizem as duas
          camadas que o chip resume: lavanda de front-end e ciano de back-end, nessa ordem,
          que é a da pilha. Decorativos, então escondidos de leitor de tela: o texto do chip
          já diz "Full Stack". */}
      {valor === FULL_STACK ? (
        <span aria-hidden="true" className="flex items-center gap-[3px]">
          <span className="size-[5px] rounded-full bg-accent-lavanda" />
          <span className="size-[5px] rounded-full bg-accent-ciano" />
        </span>
      ) : null}
      {valor}
    </span>
  );
}

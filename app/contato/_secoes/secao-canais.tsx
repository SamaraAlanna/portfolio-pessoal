import Link from "next/link";
import { canais } from "@/conteudo/contato";

/**
 * Canais diretos.
 *
 * Cada canal é um link de verdade: `mailto` no e-mail, perfil no LinkedIn, no GitHub e no
 * Instagram. No Figma eles são só texto, mas endereço que não clica numa página de contato
 * é atrito sem motivo.
 *
 * LINHAS COM SEPARADOR, E NÃO CARTÕES, que é o arranjo do Figma. Eles chegaram a virar três
 * cartões em 2026-09-13, quando o formulário saiu e sobrou uma coluna num espaço de duas, e
 * **voltaram a ser linhas em 2026-09-23, quando o formulário voltou e a coluna deixou de
 * sobrar**. O cartão era o remendo, não o desenho.
 *
 * A OBJEÇÃO ANTIGA ÀS LINHAS ERA A LARGURA, e ela não existe mais. Esticadas na faixa
 * inteira, de 1200, o rótulo e o endereço ficavam a novecentos pixels um do outro. Na
 * coluna de 568 eles se leem juntos, que é o ponto de pôr os dois na mesma linha.
 *
 * É POR ISSO QUE O QUARTO CANAL COUBE SEM REARRANJO. Em três cartões numa grade de três
 * colunas, o quarto abriria uma segunda fileira com um órfão; em lista, ele é mais uma
 * linha, e o quinto também será.
 *
 * O perfil abre em nova aba, o `mailto` não: ele não navega, entrega para o cliente de
 * e-mail, e abrir aba para isso deixa uma aba em branco para trás em parte dos navegadores.
 *
 * O ENDEREÇO ACENDE NO HOVER, E O RÓTULO NÃO. O endereço é o que a pessoa veio buscar, e o
 * rótulo é legenda dele. Por isso a cor mora no link, para o endereço herdar, e o rótulo
 * declara a própria.
 */
export default function SecaoCanais() {
  return (
    <section className="flex w-full flex-col gap-[20px]">
      <h2 className="font-mono text-rotulo-secao font-medium text-accent-rosa">
        CANAIS DIRETOS
      </h2>

      <ul className="flex w-full flex-col border-t-[0.5px] border-border">
        {canais.map((canal) => {
          const externo = !canal.destino.startsWith("mailto:");
          return (
            <li key={canal.rotulo} className="border-b-[0.5px] border-border">
              <Link
                href={canal.destino}
                {...(externo ? { target: "_blank", rel: "noopener" } : {})}
                className="link-realce flex min-h-[50px] items-center justify-between gap-[20px] px-[20px] py-[14px] text-text"
              >
                <span className="shrink-0 font-mono text-tag text-text-dim">
                  {canal.rotulo}
                </span>
                <span className="text-right text-corpo break-words">{canal.valor}</span>
                {externo ? <span className="sr-only">(abre em nova aba)</span> : null}
              </Link>
            </li>
          );
        })}
      </ul>
    </section>
  );
}

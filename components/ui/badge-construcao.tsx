/**
 * Badge de projeto em construção.
 *
 * ELE SEGUE A TIPOGRAFIA DAS TAGS, e não a de rótulo em mono: DM Sans regular 12, sem
 * tracking, com o mesmo padding e o mesmo raio. Do lado das tags do card, ele é um irmão
 * delas, não um rótulo de outra família.
 *
 * O QUE O SEPARA DA TAG É O MATIZ DO TEXTO, e só isso. A borda é a mesma `--border` delas.
 * Âmbar significa ressalva no sistema, e é o que separa "em construção" de "Full stack".
 *
 * Ele já teve borda em `accent-ambar` cheio e gritava do lado das tags. A medição mostrou
 * que o peso estava concentrado num eixo só: o fundo tingido custa 0,2 de contraste contra
 * o fundo do card, ou seja nada, e no tema claro é até mais fraco que o fundo da tag; o
 * texto empata no claro. A borda é que era dez vezes mais forte no escuro e seis no claro.
 * Trocar o fundo, que é a hipótese natural, não teria resolvido e ainda tiraria o badge da
 * família dos chips preenchidos.
 *
 * NO HOVER DO CARD ELE ACENDE EM ÂMBAR, enquanto as tags acendem em rosa. Sem isso ele
 * viraria o chip mais apagado da fileira no hover, e pareceria desligado. Acender em rosa
 * junto com as tags estaria errado: diria que ele é do mesmo tipo que elas, que é
 * exatamente o que âmbar existe para negar.
 *
 * A tipografia é escrita igual à do componente Tag em vez de derivada dele. Se o token
 * `text-tag` mudar, os dois mudam juntos, que é o comportamento certo.
 */
export default function BadgeConstrucao() {
  return (
    <span className="badge-construcao inline-flex items-center rounded-full border-[0.5px] border-border bg-tint-ambar px-[10px] py-[5px] text-tag whitespace-nowrap text-accent-ambar">
      Em construção
    </span>
  );
}

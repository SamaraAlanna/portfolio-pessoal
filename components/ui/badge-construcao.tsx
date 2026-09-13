/**
 * Badge de projeto em construção.
 *
 * ELE SEGUE A TIPOGRAFIA DAS TAGS, e não a de rótulo em mono: DM Sans regular 12, sem
 * tracking, com o mesmo padding e o mesmo raio. Do lado das tags do card, ele é um irmão
 * delas, não um rótulo de outra família.
 *
 * O que muda de propósito é só a cor e a cor da borda, em âmbar contra o cinza das tags.
 * Âmbar significa ressalva no sistema, e é isso que separa "em construção" de "Full stack".
 *
 * A tipografia é escrita igual à do componente Tag em vez de derivada dele, porque a
 * diferença de cor e borda é grande o bastante para não valer um componente com variante.
 * Se o token `text-tag` mudar, os dois mudam juntos, que é o comportamento certo.
 */
export default function BadgeConstrucao() {
  return (
    <span className="inline-flex items-center rounded-full border-[0.5px] border-accent-ambar bg-tint-ambar px-[10px] py-[5px] text-tag whitespace-nowrap text-accent-ambar">
      Em construção
    </span>
  );
}

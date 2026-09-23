import { idiomas } from "@/conteudo/sobre";

/**
 * Idiomas.
 *
 * VIROU SEÇÃO PRÓPRIA, COM `h2`, EM 2026-09-23, e a decisão foi forçada pela mudança de
 * lugar. Ele era um `h3` dentro de FORMAÇÃO, o que estava certo enquanto morava lá: um
 * `h3` pertence ao `h2` que vem antes dele. Ao descer para depois das certificações, ele
 * perdeu esse dono, e sobravam três saídas:
 *
 * 1. **Continuar `h3`.** O cabeçalho mais próximo acima passaria a ser um `h3` de grupo de
 *    certificação, e a estrutura passaria a dizer que idioma é uma certificação. Não é.
 * 2. **Entrar na seção de certificações.** Mesmo problema, agora explícito na marcação.
 * 3. **Virar `h2`.** É o que sobra, e é o que descreve a verdade: é um assunto ao lado de
 *    EXPERIÊNCIA, FORMAÇÃO e CERTIFICAÇÕES, e não parte de nenhum deles.
 *
 * O RÓTULO SUBIU DE PESO JUNTO, e isso é consequência e não enfeite. Ele usava o
 * `text-ficha-rotulo`, de sub-rótulo, e passou ao `text-rotulo-secao` das outras três
 * seções. A regra do projeto é que rótulo de seção é cabeçalho; o inverso também vale, e um
 * `h2` com cara de sub-rótulo seria a mesma incoerência ao contrário.
 *
 * **O custo é honesto e fica anotado:** três itens de duas palavras passam a ter o mesmo
 * peso visual que as catorze certificações. Quem achar que a seção pesa demais para o que
 * entrega está vendo o preço de ela ser um assunto próprio, que é o que a posição nova diz.
 *
 * NÃO GANHA CAIXA, e agora por um motivo melhor do que antes. Dentro da formação, o motivo
 * era não competir com os dois cards logo acima. Aqui ele vem depois das certificações, que
 * também não têm caixa, então a ausência dela é o que alinha os dois últimos blocos da
 * página.
 *
 * Três colunas no desktop e uma no mobile, pela regra de coluna única. Não vira carrossel:
 * são três itens de duas palavras, e a regra de carrossel vale para grade que não cabe.
 */
export default function SecaoIdiomas() {
  return (
    <section data-revelar className="faixa pb-[72px]">
      <h2 className="font-mono text-rotulo-secao font-medium text-accent-rosa">IDIOMAS</h2>

      {/* Cada idioma é um par de campos, nome e nível, na mesma construção dos itens de
          certificação: o valor em texto normal e o dado técnico em mono embaixo. */}
      <ul className="mt-[36px] grid grid-cols-1 gap-[20px] sm:grid-cols-3 sm:gap-[40px] lg:max-w-[720px]">
        {idiomas.map(({ idioma, nivel }) => (
          <li key={idioma} className="flex flex-col gap-[3px]">
            <span className="text-corpo text-text">{idioma}</span>
            <span className="font-mono text-tag text-text-muted">{nivel}</span>
          </li>
        ))}
      </ul>
    </section>
  );
}

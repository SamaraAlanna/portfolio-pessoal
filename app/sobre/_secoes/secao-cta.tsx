import Link from "next/link";

/**
 * Fechamento da página. Fica mesmo com o "Entre em contato" da nav, porque é fim de
 * página e cumpre outra função: ali a pessoa acabou de ler a trajetória inteira.
 */
export default function SecaoCta() {
  return (
    <section data-revelar className="faixa flex flex-col items-center pb-[104px] text-center">
      <p className="text-[44px] leading-none font-extrabold tracking-[-0.02em] text-text">
        Bora conversar?
      </p>
      <p className="mt-[16px] text-corpo-case text-text-muted">
        Me manda uma mensagem :)
      </p>
      <Link
        href="/contato"
        className="botao-interativo botao-cheio mt-[32px] rounded-full bg-accent-rosa px-[30px] py-[16px] text-corpo font-medium text-bg"
      >
        Falar comigo
      </Link>
    </section>
  );
}

import Link from "next/link";

/**
 * Marca. Aparece na nav, no menu mobile e no footer.
 *
 * A marca é só o nome, em mono. O sufixo `.dev` em accent saiu em 2026-09-14, junto com o
 * domínio que ele citava: o site mora em portfoliosamara.com.br, e uma marca que diz `.dev`
 * apontaria para um endereço que não existe.
 *
 * COM ISSO A MARCA PERDEU A ALTERNÂNCIA TIPOGRÁFICA, que é o conceito do site, e passou a
 * carregar só o lado "código", que é a fonte mono. Ela não sumiu do site: continua no
 * whoami da home, nos rótulos de seção e nos blocos de código. Some deste componente.
 *
 * Os tamanhos vêm do Figma: 15 na nav e no menu, 17 no footer.
 */
export default function Logo({ tamanho = "nav" }: { tamanho?: "nav" | "footer" }) {
  const classeTamanho = tamanho === "footer" ? "text-logo-footer" : "text-logo-nav";

  return (
    <Link
      href="/"
      className={`font-mono font-bold whitespace-nowrap text-text ${classeTamanho}`}
    >
      Samara Alanna
    </Link>
  );
}

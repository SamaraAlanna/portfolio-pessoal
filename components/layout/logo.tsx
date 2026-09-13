import Link from "next/link";

/**
 * Marca. Aparece na nav, no menu mobile e no footer.
 *
 * A alternância tipográfica é o conceito do site, e aqui ela está no nome em mono com o
 * sufixo em accent. Os tamanhos vêm do Figma: 15 na nav e no menu, 17 no footer.
 */
export default function Logo({ tamanho = "nav" }: { tamanho?: "nav" | "footer" }) {
  const classeTamanho = tamanho === "footer" ? "text-logo-footer" : "text-logo-nav";

  return (
    <Link
      href="/"
      className={`font-mono font-bold whitespace-nowrap text-text ${classeTamanho}`}
    >
      Samara Alanna<span className="text-accent-rosa">.dev</span>
    </Link>
  );
}

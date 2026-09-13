import type { Metadata } from "next";
import Link from "next/link";

/**
 * Página de 404.
 *
 * Não está no Figma. Segue a linguagem das páginas internas: rótulo em mono, título
 * grande e texto de apoio.
 *
 * O rótulo é âmbar porque no sistema de cor âmbar é ressalva e honestidade, que é
 * exatamente o que um 404 é: a página avisa que errou em vez de fingir que está tudo bem.
 *
 * Duas saídas, e não uma. Quem cai aqui chegou por link quebrado ou endereço digitado
 * errado, e nos dois casos pode estar atrás de um projeto específico. Mandar só para a
 * home obrigaria a refazer o caminho.
 */
export const metadata: Metadata = {
  title: "Página não encontrada · Samara Alanna",
  robots: { index: false, follow: true },
};

export default function NaoEncontrada() {
  return (
    <section className="faixa flex min-h-[60vh] flex-col items-start justify-center gap-[18px] py-[104px]">
      <p className="font-mono text-rotulo-secao font-medium text-accent-ambar">ERRO 404</p>

      <h1 className="text-titulo-pagina font-extrabold text-text">
        Esta página não existe
      </h1>

      <p className="max-w-[620px] text-hero-paragrafo text-text-muted">
        O endereço pode ter mudado de lugar, ou o link que te trouxe até aqui pode estar
        quebrado. Os dois caminhos abaixo levam de volta.
      </p>

      <div className="mt-[14px] flex w-full flex-col items-stretch gap-[12px] sm:w-auto sm:flex-row sm:items-center sm:gap-[14px]">
        <Link
          href="/"
          className="botao-interativo flex items-center justify-center rounded-full bg-accent-rosa px-[26px] py-[15px] text-corpo font-medium whitespace-nowrap text-bg"
        >
          Ir para a home
        </Link>
        <Link
          href="/projetos"
          className="botao-interativo botao-contorno flex items-center justify-center rounded-full border-[0.5px] border-accent-rosa px-[26px] py-[15px] text-corpo font-medium whitespace-nowrap text-accent-rosa"
        >
          Ver os projetos
        </Link>
      </div>
    </section>
  );
}

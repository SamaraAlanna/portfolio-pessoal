import type { Metadata } from "next";
import { SITE, metadataDaPagina } from "@/lib/site";
import RevelarAoRolar from "@/components/ui/revelar-ao-rolar";
import PausaForaDaTela from "@/components/ui/pausa-fora-da-tela";
import LuzSegueCursor from "@/components/ui/luz-segue-cursor";
import FocoNoHero from "@/components/ui/foco-no-hero";
import { DM_Sans, JetBrains_Mono } from "next/font/google";
import Nav from "@/components/layout/nav";
import Footer from "@/components/layout/footer";
import "./globals.css";

/**
 * DM Sans para corpo e títulos, JetBrains Mono para rótulo, código e dado técnico.
 * A alternância entre as duas é o conceito do site.
 */
const dmSans = DM_Sans({
  subsets: ["latin"],
  variable: "--fonte-dm-sans",
  display: "swap",
});

const jetBrainsMono = JetBrains_Mono({
  subsets: ["latin"],
  variable: "--fonte-jetbrains",
  display: "swap",
});

/**
 * Metadata da raiz, que vale também para a home, porque `app/page.tsx` não declara o seu.
 *
 * O `metadataBase` é o que faz as URLs relativas do Open Graph e do canonical virarem
 * absolutas. Sem ele, o caminho da imagem de compartilhamento sai relativo e as
 * plataformas não conseguem buscá-la: o link aparece sem cartão.
 */
export const metadata: Metadata = {
  metadataBase: new URL(SITE),
  ...metadataDaPagina({
    titulo: "Samara Alanna · UX/UI Designer e Desenvolvedora",
    descricao:
      "Portfólio de Samara Alanna. Design de interface, UX/UI e desenvolvimento full stack.",
    caminho: "/",
  }),
};

/**
 * Roda antes da primeira pintura e evita o piscar de tema.
 *
 * Sem isso, a página pintaria no escuro e só depois trocaria para o claro de quem tem
 * escolha salva, o que é exatamente o corte brusco que a transição existe para evitar.
 *
 * Se não houver escolha salva, o script não faz nada de propósito: aí quem decide é a
 * media query prefers-color-scheme, no CSS.
 */
const scriptTema = `
try {
  var t = localStorage.getItem("tema");
  if (t === "claro" || t === "escuro") document.documentElement.dataset.tema = t;
} catch (e) {}
`;

export default function RootLayout({ children }: LayoutProps<"/">) {
  return (
    <html
      lang="pt-BR"
      className={`${dmSans.variable} ${jetBrainsMono.variable} h-full antialiased`}
      suppressHydrationWarning
    >
      <head>
        <script dangerouslySetInnerHTML={{ __html: scriptTema }} />
      </head>
      <body className="flex min-h-full flex-col font-corpo">
        {/* Primeiro elemento focável da página. Sem ele, quem navega por teclado passa
            pela nav inteira em toda página antes de chegar ao conteúdo. */}
        <a href="#conteudo" className="link-pular">
          Pular para o conteúdo
        </a>
        <Nav />
        {/* tabIndex -1 dá destino de foco ao link de pular. Sem ele, parte dos
            navegadores rola até o conteúdo mas deixa o foco onde estava, e o Tab seguinte
            volta para a nav. O anel não aparece aqui: a regra de foco no globals.css
            deixa tabindex="-1" de fora de propósito. */}
        <main id="conteudo" tabIndex={-1} className="flex-1">
          {children}
        </main>
        <Footer />
        <RevelarAoRolar />
        <PausaForaDaTela />
        <LuzSegueCursor />
        <FocoNoHero />
      </body>
    </html>
  );
}

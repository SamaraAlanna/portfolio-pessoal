import Link from "next/link";
import Logo from "@/components/layout/logo";
import { CURRICULO } from "@/lib/site";

/**
 * Footer.
 *
 * O mesmo em todas as páginas. No Figma ele foi desanexado no mobile durante o design,
 * mas a tipografia é idêntica nas duas versões: só o padding lateral e o arranjo das
 * colunas mudam. Por isso aqui é um componente só, e o mobile é diferença de layout.
 */

const colunas = [
  {
    rotulo: "NAVEGAR",
    itens: [
      { rotulo: "Projetos", destino: "/projetos" },
      { rotulo: "Sobre", destino: "/sobre" },
      { rotulo: "Stack", destino: "/stack" },
      { rotulo: "Contato", destino: "/contato" },
    ],
  },
  {
    rotulo: "RECURSOS",
    itens: [
      { rotulo: "Currículo PT", destino: CURRICULO.pt },
      { rotulo: "Currículo EN", destino: CURRICULO.en },
    ],
  },
  {
    rotulo: "ONDE ME ACHAR",
    itens: [
      { rotulo: "GitHub", destino: "https://github.com/SamaraAlanna" },
      { rotulo: "LinkedIn", destino: "/contato" },
      { rotulo: "E-mail", destino: "/contato" },
    ],
  },
];

export default function Footer() {
  return (
    // O fundo e o filete do topo atravessam a tela inteira, então a faixa fica num
    // elemento interno em vez de no próprio footer.
    <footer className="w-full border-t-[0.5px] border-border bg-surface pt-[72px] pb-[40px]">
      <div className="faixa">
      <div className="flex w-full flex-col items-start justify-between gap-[30px] lg:flex-row lg:gap-0">
        <div className="flex flex-col items-start gap-[16px]">
          <Logo tamanho="footer" />

          <p className="w-[280px] text-corpo leading-[1.6] text-text-muted">
            UX/UI Designer &amp;
            <br />
            Desenvolvedora Full Stack
          </p>

          <Link
            href="https://bordadesign.com.br"
            className="alvo-toque-vertical flex items-center gap-[8px] rounded-full bg-tint-rosa px-[12px] py-[8px] whitespace-nowrap"
          >
            <span className="text-cta text-text-muted">Precisa de um projeto?</span>
            <span className="text-cta font-medium text-accent-rosa">
              BORDA Design →
            </span>
          </Link>
        </div>

        {/* Desktop: três colunas lado a lado com gap 72. Mobile: empilhadas com gap 28.

            O espaçamento entre os links muda com o tamanho, e isso é alvo de toque e não
            estética. No Figma eles ficam a 34px de distância, o que dá uma área clicável
            de 34 num texto de 20. No mobile o espaço vai para dentro do próprio link, com
            padding, e a área passa a 44 sem afastar mais as linhas. No desktop, onde o
            ponteiro é preciso, vale o espaçamento do arquivo. */}
        <div className="flex flex-col items-start gap-[28px] lg:flex-row lg:gap-[72px]">
          {colunas.map((coluna) => (
            <div
              key={coluna.rotulo}
              className="flex flex-col items-start gap-0 lg:gap-[14px]"
            >
              <p className="mb-[2px] font-mono text-rotulo-coluna font-medium whitespace-nowrap text-text-dim lg:mb-0">
                {coluna.rotulo}
              </p>
              {coluna.itens.map((item) => (
                <Link
                  key={item.rotulo}
                  href={item.destino}
                  className="py-[12px] text-corpo whitespace-nowrap text-text-muted lg:py-0"
                >
                  {item.rotulo}
                </Link>
              ))}
            </div>
          ))}
        </div>
      </div>

      <div className="h-[56px]" />
      <div className="h-[0.5px] w-full bg-border" />
      <div className="h-[28px]" />

      <div className="flex w-full items-center justify-between">
        <p className="font-mono text-copyright whitespace-nowrap text-text-dim">
          © 2026 Samara Alanna
        </p>
      </div>
      </div>
    </footer>
  );
}

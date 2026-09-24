import Link from "next/link";
import AcordeaoMobile from "@/components/ui/acordeao-mobile";

/**
 * Seção "O que eu faço".
 *
 * Duas colunas separadas por um filete em accent: design de um lado, código do outro. A
 * alternância tipográfica é o conceito, então a coluna de design é DM Sans com marcador
 * "-" e a de código é JetBrains Mono com marcador ">".
 *
 * NO MOBILE CADA COLUNA VIRA UM ITEM DE ACCORDION, com Design aberto e Código fechado.
 * Isso não é preferência: no Figma o frame de itens da coluna Código está marcado como
 * oculto e o da coluna Design não. Foi decisão tomada durante o design, e o motivo
 * aparente é que as duas listas abertas dariam quase 800px de rolagem numa seção que é
 * apresentação, não conteúdo principal.
 *
 * O filete vira horizontal no mobile e separa um accordion do outro.
 *
 * ELA É A FOLHA QUE SOBE POR CIMA DO HERO, e por isso não tem `data-revelar`. Seriam duas
 * entradas no mesmo elemento, e pior: durante o fade ela ficaria semitransparente justo no
 * momento em que deveria cobrir o hero. O deslize é a entrada dela.
 */
const design = [
  "Arquitetura da informação e heurísticas de Nielsen",
  "Pesquisa com usuários, qualitativa e quantitativa",
  "Design centrado no usuário",
  "Wireframe e protótipo navegável no Figma",
  "Design system e design tokens",
  "Teste de usabilidade e acessibilidade WCAG",
  "Claude, ChatGPT e Gemini no processo de design",
];

const codigo = [
  "HTML5 semântico e CSS3 (variáveis, Grid, Flexbox)",
  "JavaScript ES6+, jQuery e Bootstrap 5",
  "React, TypeScript e styled-components",
  "PHP modular e WordPress com tema customizado",
  "APIs REST, webhooks n8n e integração com CRM",
  "Git, GitHub Actions e deploy automatizado",
  "Validação e segurança sem biblioteca externa",
  "Debug de produção com análise de causa raiz",
  "Claude e Claude Code no processo de desenvolvimento",
];

export default function SecaoSkills() {
  return (
    // A seção ocupa a largura inteira da viewport e uma tela de altura, e é isso que faz
    // dela uma folha. Com a `faixa` na própria seção, o fundo parava nos 1200 e as luzes
    // do hero apareciam nas bordas. A `faixa` desceu para o conteúdo: o fundo vai de borda
    // a borda, o texto continua na medida de sempre.
    <section className="hero-folha flex min-h-[calc(100svh-var(--altura-nav))] flex-col justify-center py-[104px]">
      {/* Mesma grade das seções de trabalhos e sobre mim: rótulo e botão na mesma linha
          no desktop, botão depois do conteúdo no mobile. São três seções fazendo a mesma
          coisa, e fazer a mesma coisa de três jeitos seria pior que o custo desta grade. */}
      <div className="grid grid-cols-1 gap-y-[40px] faixa lg:grid-cols-[1fr_auto] lg:items-center">
        <h2 className="font-mono text-rotulo-secao font-medium text-accent-rosa lg:col-start-1 lg:row-start-1">
          O QUE EU FAÇO
        </h2>

        <div className="flex flex-col items-start lg:col-span-2 lg:row-start-2 lg:flex-row">
          <div className="flex w-full flex-col items-start lg:flex-1 lg:gap-[16px] lg:pr-[56px]">
            <AcordeaoMobile
              padraoAberto
              tag="h3"
              titulo="Design"
              classeTag="text-titulo-secao font-bold text-text"
              classeLinha="min-h-[var(--alvo-toque)] py-[14px] lg:min-h-0 lg:py-0"
              classePainel="pb-[10px] lg:pb-0"
            >
              <ul className="flex flex-col items-start gap-[10px]">
                {design.map((item) => (
                  <li key={item} className="flex items-start gap-[12px]">
                    <span
                      aria-hidden="true"
                      className="font-mono text-cta text-accent-rosa"
                    >
                      -
                    </span>
                    <span className="text-corpo text-text">{item}</span>
                  </li>
                ))}
              </ul>
            </AcordeaoMobile>
          </div>

          <div
            aria-hidden="true"
            className="my-[10px] h-px w-full bg-accent-rosa lg:my-0 lg:h-auto lg:w-px lg:self-stretch"
          />

          <div className="flex w-full flex-col items-start lg:flex-1 lg:gap-[16px] lg:pl-[56px]">
            <AcordeaoMobile
              tag="h3"
              titulo="Código"
              classeTag="font-mono text-titulo-secao-mono font-medium text-accent-rosa"
              classeLinha="min-h-[var(--alvo-toque)] py-[14px] lg:min-h-0 lg:py-0"
              classePainel="pb-[10px] lg:pb-0"
            >
              <ul className="flex flex-col items-start gap-[10px]">
                {codigo.map((item) => (
                  <li key={item} className="flex items-start gap-[12px]">
                    <span
                      aria-hidden="true"
                      className="font-mono text-cta text-accent-rosa"
                    >
                      &gt;
                    </span>
                    <span className="font-mono text-cta text-text">{item}</span>
                  </li>
                ))}
              </ul>
            </AcordeaoMobile>
          </div>
        </div>

        <Link
          href="/stack"
          className="botao-interativo botao-contorno flex items-center justify-center rounded-full border-[0.5px] border-accent-rosa px-[22px] py-[10px] text-corpo font-medium whitespace-nowrap text-accent-rosa lg:col-start-2 lg:row-start-1 lg:justify-self-end"
        >
          Ver stack completa
        </Link>
      </div>
    </section>
  );
}

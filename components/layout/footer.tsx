import Link from "next/link";
import Logo from "@/components/layout/logo";
import { CURRICULO } from "@/lib/site";
import { canalPor } from "@/conteudo/contato";

/**
 * Footer.
 *
 * O mesmo em todas as páginas. No Figma ele foi desanexado no mobile durante o design,
 * mas a tipografia é idêntica nas duas versões: só o padding lateral e o arranjo das
 * colunas mudam. Por isso aqui é um componente só, e o mobile é diferença de layout.
 */

/**
 * O endereço de cada canal vem do `conteudo/contato.ts`, e não escrito de novo aqui.
 *
 * O footer e a página de Contato mostram os mesmos canais, então eram dois lugares para
 * manter iguais, e já estavam diferentes: "LinkedIn" e "E-mail" apontavam para `/contato`
 * em vez de para o perfil e para o `mailto`, e o GitHub tinha a URL escrita à mão. Quem
 * clicava em "E-mail" no rodapé ia parar numa página, não no cliente de e-mail.
 *
 * O `canalPor` MORAVA AQUI E DESCEU PARA O `conteudo/contato.ts` EM 2026-09-25, quando o
 * envio do formulário passou a precisar do mesmo dado. O motivo de mover em vez de copiar
 * está comentado lá.
 */

/**
 * `externo` marca o que sai do site e abre em nova aba. O `mailto` não entra: ele não
 * navega, entrega para o cliente de e-mail, e abrir aba para isso deixa uma aba em branco
 * para trás em parte dos navegadores.
 *
 * `rota` MARCA O QUE É PÁGINA DESTE APP, E É O QUE DECIDE ENTRE `Link` E `<a>`. Só quem
 * tem `rota` ganha o `Link` do Next; currículo, perfil e `mailto` saem como âncora comum.
 *
 * ISSO NÃO É PREFERÊNCIA DE ESTILO, É CORREÇÃO DE UM 404. O `Link` pré-carrega o destino
 * pedindo o payload do React Server Components, com `?_rsc=` no fim da URL. Para uma rota
 * isso é o que deixa a navegação instantânea; **para um PDF em `public/` é um pedido de
 * payload a um arquivo que não é rota**, e o servidor responde 404. O currículo continua
 * baixando ao clicar, então o defeito só aparece no console, que é onde ninguém procura.
 *
 * O campo é `rota` e não `arquivo` de propósito: o que distingue não é ser arquivo, é ser
 * ou não uma página deste app. `mailto:` também não é arquivo e também não é rota.
 *
 * O TIPO É DECLARADO, E NÃO INFERIDO. Com três formatos de item na mesma lista, um com
 * `rota`, outro com `externo` e o `mailto` sem nenhum dos dois, o TypeScript infere uma
 * união e recusa a leitura de qualquer um dos campos. Declarar os dois como opcionais
 * resolve e ainda documenta que eles são independentes.
 */
type ItemDoRodape = {
  rotulo: string;
  destino: string;
  /** Página deste app. Só quem tem isso ganha o `Link` do Next. */
  rota?: boolean;
  /** Sai do site e abre em nova aba, com o aviso para leitor de tela. */
  externo?: boolean;
};

const colunas: { rotulo: string; itens: ItemDoRodape[] }[] = [
  {
    rotulo: "NAVEGAR",
    itens: [
      { rotulo: "Projetos", destino: "/projetos", rota: true },
      { rotulo: "Sobre", destino: "/sobre", rota: true },
      { rotulo: "Stack", destino: "/stack", rota: true },
      { rotulo: "Contato", destino: "/contato", rota: true },
    ],
  },
  {
    rotulo: "CURRÍCULOS",
    itens: [
      { rotulo: "Currículo PT", destino: CURRICULO.pt, externo: true },
      { rotulo: "Currículo EN", destino: CURRICULO.en, externo: true },
    ],
  },
  {
    rotulo: "ONDE ME ACHAR",
    itens: [
      { rotulo: "GitHub", destino: canalPor("github").destino, externo: true },
      { rotulo: "LinkedIn", destino: canalPor("linkedin").destino, externo: true },
      { rotulo: "WhatsApp", destino: canalPor("whatsapp").destino, externo: true },
      { rotulo: "Instagram", destino: canalPor("instagram").destino, externo: true },
      // O e-mail fica por último e **não é externo**: ele é `mailto:`, não navega, e abrir
      // aba para entregar ao cliente de e-mail deixa uma aba em branco para trás.
      { rotulo: "E-mail", destino: canalPor("email").destino },
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
            target="_blank"
            rel="noopener"
            className="alvo-toque-vertical flex items-center gap-[8px] rounded-full bg-tint-rosa px-[12px] py-[8px] whitespace-nowrap"
          >
            <span className="text-cta text-text-muted">Precisa de um projeto?</span>
            <span className="text-cta font-medium text-accent-rosa">
              BORDA Design →
            </span>
            <span className="sr-only">(abre em nova aba)</span>
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
              {coluna.itens.map((item) => {
                // Mesmas props nos dois casos. O que muda é só o elemento, `Link` para
                // rota deste app e `<a>` para o resto, pelo motivo comentado no `colunas`.
                const props = {
                  href: item.destino,
                  className:
                    "link-realce py-[12px] text-corpo whitespace-nowrap text-text-muted lg:py-0",
                  ...(item.externo
                    ? { target: "_blank", rel: "noopener" }
                    : {}),
                };

                const conteudo = (
                  <>
                    {item.rotulo}
                    {item.externo ? (
                      <span className="sr-only"> (abre em nova aba)</span>
                    ) : null}
                  </>
                );

                return item.rota ? (
                  <Link key={item.rotulo} {...props}>
                    {conteudo}
                  </Link>
                ) : (
                  <a key={item.rotulo} {...props}>
                    {conteudo}
                  </a>
                );
              })}
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

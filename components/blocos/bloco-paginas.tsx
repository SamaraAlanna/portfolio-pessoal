import { dimensaoDaImagem } from "@/lib/imagens";

/**
 * A página inteira, em duas janelas roláveis lado a lado.
 *
 *   :::paginas{desktop="/imagens/cases/x-desktop.webp" mobile="/imagens/cases/x-mobile.webp"}
 *   :::
 *
 * OS CAMINHOS SÃO ATRIBUTOS E NÃO LINHAS DE CONTEÚDO, porque o bloco precisa saber **qual**
 * é qual: as duas janelas têm largura diferente e cada imagem tem a sua consulta de mídia.
 * Por posição, trocar a ordem no MDX trocaria a largura das duas em silêncio.
 *
 * AS MEDIDAS SÃO AS DO FRAME: janelas de 900 de altura, 24 de intervalo, a do celular com
 * 256 fixos. **A do desktop não tem largura escrita**: ela é `flex-1`, e 620 mais 24 mais 256
 * fecha exatamente os 900 da coluna do corpo. Escrever 620 daria o mesmo pixel hoje e
 * quebraria no dia em que a coluna mudasse.
 *
 * CADA JANELA É REGIÃO ROLÁVEL ALCANÇÁVEL PELO TECLADO. Sem `tabindex`, o que está fora da
 * janela fica inacessível para quem não usa mouse, porque não há nada focável dentro da
 * imagem para levar a rolagem junto. O anel de foco vem da regra global, que já cobre
 * `[tabindex]` positivo.
 *
 * O `overscroll-behavior: contain` impede que a rolagem vaze para a página quando a janela
 * chega ao fim, que é o efeito mais irritante de rolagem dentro de rolagem.
 *
 * NO CELULAR A SEÇÃO INTEIRA SOME, e quem esconde é o `somenteDesktop` do `bloco-secao`, não
 * este bloco. Rolagem dentro de rolagem num toque é ambígua: o dedo não distingue as duas.
 *
 * É `<picture>` COM `media`, E O MOTIVO É DOWNLOAD, NÃO LAYOUT. `display: none` no pai não
 * garante que o navegador deixe de buscar a imagem; `<source media>` garante, porque a
 * escolha acontece antes da requisição. Sem consulta casada, o que carrega é o GIF
 * transparente de 42 bytes do `img`, que existe só para o elemento ser válido.
 *
 * O CUSTO É SAIR DO `next/image`, e é consciente: ele não emite `<picture>` com `media`, e
 * aqui controlar o que baixa vale mais que a otimização automática. As dimensões continuam
 * vindo do arquivo em build, então não há salto de layout.
 */

/** GIF transparente de 1x1. Só existe para o `img` do `<picture>` ser válido. */
const PIXEL =
  "data:image/gif;base64,R0lGODlhAQABAIAAAAAAAP///yH5BAEAAAAALAAAAAABAAEAAAIBRAA7";

/** A partir de onde as janelas existem. É o mesmo 64rem do `lg` do Tailwind. */
const CONSULTA = "(min-width: 64rem)";

function Janela({
  caminho,
  rotulo,
  alt,
  className,
}: {
  caminho: string;
  /** Nome acessível da região rolável. */
  rotulo: string;
  /**
   * Descrição da imagem.
   *
   * ELE NÃO REPETE O RÓTULO DA REGIÃO. Os dois são anunciados em momentos diferentes, o
   * rótulo ao entrar na região e o alt ao chegar na imagem, e repetir o mesmo texto duas
   * vezes gasta a atenção de quem ouve sem acrescentar nada.
   */
  alt: string;
  className: string;
}) {
  const medida = dimensaoDaImagem(caminho);

  return (
    <div
      tabIndex={0}
      role="region"
      aria-label={rotulo}
      className={`h-[900px] overflow-y-auto overscroll-contain rounded-[12px] bg-surface-2 ${className}`}
    >
      <picture>
        <source media={CONSULTA} srcSet={caminho} />
        <img
          src={PIXEL}
          alt={alt}
          width={medida?.largura}
          height={medida?.altura}
          className="block h-auto w-full"
        />
      </picture>
    </div>
  );
}

export default function BlocoPaginas({
  desktop,
  mobile,
}: {
  desktop?: string;
  mobile?: string;
}) {
  if (!desktop || !mobile) return null;

  return (
    <div className="flex w-full gap-[24px]">
      <Janela
        caminho={desktop}
        rotulo="Página completa, versão desktop"
        alt="A página da campanha em tela larga, do topo ao rodapé"
        className="min-w-0 flex-1"
      />
      <Janela
        caminho={mobile}
        rotulo="Página completa, versão mobile"
        alt="A mesma página em tela de celular, do topo ao rodapé"
        className="w-[256px] shrink-0"
      />
    </div>
  );
}

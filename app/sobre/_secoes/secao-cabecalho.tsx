import Image from "next/image";
import Link from "next/link";
import { apresentacao } from "@/conteudo/sobre";
import { CURRICULO } from "@/lib/site";

/**
 * Cabeçalho do Sobre.
 *
 * É o único cabeçalho de página interna com foto e botão, por isso não usa o
 * CabecalhoPagina compartilhado.
 *
 * A ORDEM MUDA ENTRE OS DOIS TAMANHOS. No desktop são duas colunas: texto à esquerda,
 * foto e botão à direita. No mobile o Figma intercala, e a leitura vira rótulo, nome,
 * foto, apresentação e botão. A foto sobe porque no celular ela é o primeiro contato com
 * a pessoa, e enterrá-la depois de três parágrafos desperdiçaria isso.
 *
 * Por isso as quatro partes são filhas diretas da grade, e não dois blocos de dois. Com
 * blocos aninhados não haveria como intercalar sem repetir marcação.
 *
 * O caminho do currículo vem do `lib/site.ts`, junto do link do rodapé e do botão do hero,
 * para os quatro não divergirem.
 */
export default function SecaoCabecalho() {
  return (
    <section className="grid grid-cols-1 gap-[28px] faixa pt-[var(--espaco-topo-pagina)] pb-[56px] lg:grid-cols-[minmax(0,1fr)_auto] lg:gap-x-[64px] lg:gap-y-[24px]">
      <div className="flex max-w-[720px] flex-col items-start gap-[18px] lg:col-start-1 lg:row-start-1 lg:self-start">
        <p className="font-mono text-rotulo-secao font-medium text-accent-rosa">SOBRE</p>
        <h1 className="text-titulo-pagina font-extrabold text-text">Samara Alanna</h1>
      </div>

      <Image
        src="/imagens/sobre/foto.webp"
        alt="Retrato de Samara Alanna"
        width={736}
        height={735}
        priority
        sizes="(min-width: 64rem) 296px, 100vw"
        className="h-auto w-full rounded-full object-cover lg:col-start-2 lg:row-start-1 lg:h-[296px] lg:w-[296px] lg:self-start"
      />

      <div className="flex max-w-[720px] flex-col gap-[18px] text-hero-paragrafo text-text-muted lg:col-start-1 lg:row-start-2 lg:self-start">
        {apresentacao.map((paragrafo) => (
          <p key={paragrafo.slice(0, 32)}>{paragrafo}</p>
        ))}
      </div>

      <Link
        href={CURRICULO.pt}
        className="flex w-full items-center justify-center rounded-full bg-accent-rosa px-[30px] py-[16px] text-corpo font-medium whitespace-nowrap text-bg lg:col-start-2 lg:row-start-2 lg:w-auto lg:justify-self-center lg:self-start"
      >
        Baixar CV
      </Link>
    </section>
  );
}

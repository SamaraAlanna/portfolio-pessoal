import Link from "next/link";
import { CURRICULO } from "@/lib/site";
import Image from "next/image";

/**
 * Hero da home.
 *
 * A transição tipográfica é o conceito do site: a primeira linha em DM Sans e a segunda
 * em JetBrains Mono, no mesmo tamanho. Preservar isso é o ponto da seção.
 *
 * O seletor de idioma vive aqui, e não no menu mobile. É estático por enquanto: a
 * tradução não está no escopo e marcar PT como ativo sem EN existir seria promessa falsa,
 * então o botão EN fica desabilitado e anuncia isso. Ele é sobre o site, e não sobre o
 * currículo: o currículo em inglês existe e está linkado no rodapé.
 *
 * As luzes são decorativas, exportadas do Figma. Ficam com aria-hidden e sem interação.
 * Elas navegam pelo hero e mudam de direção ao tocar o limite, giram, respiram e variam de
 * intensidade, cada coisa no seu período. E acompanham o cursor com atraso.
 *
 * Três níveis por fita: o de fora segue o cursor, o do meio anda no eixo X, e a imagem anda
 * no Y e recebe giro, escala e brilho. O CSS está no app/globals.css.
 */
export default function SecaoHero() {
  // O hero ocupa a viewport inteira menos a nav.
  //
  // dvh e não vh: no mobile a barra de endereço some e volta durante a rolagem, e o vh
  // fica preso à altura maior, o que corta o conteúdo ou faz a página saltar. O dvh
  // acompanha a altura realmente disponível.
  //
  // min-height e não height: se o conteúdo crescer, em tela baixa ou com fonte
  // aumentada, a seção cresce junto em vez de espremer o conteúdo.
  return (
    <section className="relative isolate flex min-h-[calc(100dvh-var(--altura-nav))] flex-col justify-center bg-bg">
      {/* Duas camadas, e as duas têm motivo.

          A de fora recorta, e não a seção: a seção contém links e botões, e recortar um
          ancestral de elemento focável cortaria o anel de foco.

          A de dentro é uma faixa centralizada, com a mesma largura máxima do conteúdo. As
          luzes foram desenhadas em relação ao texto, com a mancha atrás do título e a
          diagonal cruzando o hero. Ancoradas na borda da tela, em monitor largo elas
          ficariam à esquerda do texto e o efeito se perderia. */}
      {/* As três luzes levam largura E altura em classe, e não só as props. O preflight do
          Tailwind aplica height:auto em toda img, e com só uma das duas dimensões
          sobrescrita pelo CSS o next/image avisa no console a cada carga. Fixar as duas
          encerra o aviso e deixa a medida do Figma explícita, que é o que estas luzes
          precisam: elas são decorativas e não escalam com o conteúdo. */}
      <div
        aria-hidden="true"
        data-pausar-fora="dentro"
        data-segue-cursor
        className="pointer-events-none absolute inset-0 -z-10 overflow-hidden"
      >
        <div className="relative mx-auto h-full w-full max-w-[var(--largura-maxima)]">
        <div className="fita-cursor absolute top-[-84px] left-[513px] h-[1100px] w-[1500px]">
          <div className="fita-eixo-x h-full w-full">
            <Image
              src="/imagens/luz/campo-de-luz.svg"
              alt=""
              width={1500}
              height={1100}
              className="fita-eixo-y block h-[1100px] w-[1500px] max-w-none"
            />
          </div>
        </div>
        <div className="fita-cursor absolute top-[-86px] left-[640px] h-[780px] w-[760px]">
          <div className="fita-eixo-x h-full w-full">
            <Image
              src="/imagens/luz/halo-b.svg"
              alt=""
              width={760}
              height={780}
              className="fita-eixo-y block h-[780px] w-[760px] max-w-none"
            />
          </div>
        </div>
        <div className="fita-cursor absolute top-[-114px] left-[40px] h-[1403px] w-[1400px]">
          <div className="fita-eixo-x h-full w-full">
            <Image
              src="/imagens/luz/halo-a.svg"
              alt=""
              width={1400}
              height={1403}
              className="fita-eixo-y block h-[1403px] w-[1400px] max-w-none rotate-[44.49deg]"
            />
          </div>
        </div>
        </div>
      </div>

      <div className="flex flex-col gap-[34px] faixa py-[64px] lg:flex-row lg:items-center lg:justify-between lg:gap-[64px]">
        <div className="flex max-w-[659px] flex-col items-start gap-[34px]">
          <div
            role="group"
            aria-label="Idioma"
            className="flex items-center rounded-full border-[0.5px] border-border p-[3px]"
          >
            <span className="rounded-full bg-accent-rosa px-[11px] py-[4px] font-mono text-rotulo-secao font-medium tracking-[var(--tracking-idioma)] text-bg">
              PT
              <span className="sr-only"> (idioma atual)</span>
            </span>
            <button
              type="button"
              disabled
              aria-disabled="true"
              title="A versão em inglês ainda não existe"
              className="rounded-full px-[11px] py-[4px] font-mono text-rotulo-secao font-medium tracking-[var(--tracking-idioma)] text-text-muted"
            >
              EN
              <span className="sr-only"> (indisponível: o site ainda não tem versão em inglês)</span>
            </button>
          </div>

          <div className="flex flex-col items-start gap-[18px]">
            <h1 className="text-h1 font-extrabold text-text">
              <span className="block">
                UX/UI Designer <span className="text-accent-rosa">&amp;</span>
              </span>
              <span className="block font-mono">Desenvolvedora</span>
            </h1>

            <p className="text-hero-paragrafo text-text-muted">
              Oie! Me chamo Samara Alanna e aqui conto um pouco sobre a minha trajetória,
              minhas habilidades e meus projetos, de uma forma dinâmica e intuitiva.
            </p>
          </div>

          <div className="flex w-full flex-col items-stretch gap-[12px] lg:w-auto lg:flex-row lg:items-center lg:gap-[14px]">
            <Link
              href="/sobre"
              className="botao-interativo flex items-center justify-center rounded-full bg-accent-rosa px-[26px] py-[15px] text-corpo font-medium whitespace-nowrap text-bg"
            >
              Quem sou eu
            </Link>
            <Link
              href={CURRICULO.pt}
              className="botao-interativo botao-contorno flex items-center justify-center rounded-full border-[0.5px] border-accent-rosa px-[26px] py-[15px] text-corpo font-medium whitespace-nowrap text-accent-rosa"
            >
              Baixar CV
            </Link>
          </div>
        </div>

        {/* Cartão decorativo de tokens.css. Ilustra o conceito do site e não é conteúdo,
            por isso fica escondido de leitor de tela e some no mobile, como no Figma. */}
        <div
          aria-hidden="true"
          className="hidden w-[440px] shrink-0 flex-col overflow-hidden rounded-[18px] border border-[rgba(255,242,255,0.28)] shadow-[0px_26px_70px_0px_rgba(0,0,0,0.55)] lg:flex"
          style={{
            backgroundImage:
              "linear-gradient(147.41deg, rgba(26, 15, 33, 0.82) 0%, rgba(10, 5, 15, 0.92) 70.922%)",
          }}
        >
          <div className="flex w-full items-center gap-[8px] bg-[rgba(255,255,255,0.04)] px-[22px] py-[16px]">
            <span className="size-[9px] rounded-full bg-[#e66680]" />
            <span className="size-[9px] rounded-full bg-[#f2bf66]" />
            <span className="size-[9px] rounded-full bg-[#8cccb3]" />
            <span className="ml-[12px] font-mono text-copyright text-text-dim">
              tokens.css
            </span>
          </div>

          <pre className="w-full px-[24px] pt-[22px] pb-[26px] font-mono text-terminal leading-[2] text-text-muted">
            <span className="font-medium text-accent-rosa">{":root {"}</span>
            {"\n  --rosa:    "}
            <span className="text-accent-rosa">#e6b7d3;</span>
            {"\n  --lavanda: "}
            <span className="text-accent-lavanda">#c9b8e8;</span>
            {"\n  --ciano:   "}
            <span className="text-accent-ciano">#9fd4d8;</span>
            {"\n  --ambar:   "}
            <span className="text-accent-ambar">#e8cfa0;</span>
            {"\n"}
            <span className="font-medium text-accent-rosa">{"}"}</span>
          </pre>
        </div>
      </div>
    </section>
  );
}

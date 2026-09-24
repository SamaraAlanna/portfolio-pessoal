"use client";

import { useEffect, useRef, useState } from "react";
import AcordeaoMobile from "@/components/ui/acordeao-mobile";
import type { SecaoDoCase } from "@/lib/conteudo";

/**
 * Índice lateral do case.
 *
 * A LISTA VEM DO PRÓPRIO MDX, montada no servidor. Este componente só recebe pronta: ele é
 * cliente por causa do destaque da seção atual, e não por causa do conteúdo.
 *
 * NO MOBILE ELE É O `details` FECHADO, pelo `AcordeaoMobile`, e no desktop a mesma marcação
 * fica sempre aberta e vira a coluna fixa. Barra fixa embaixo de uma nav fixa comeria uns
 * 110px de uma tela de 667, e o case empilhado é a página mais longa do site.
 *
 * O DESTAQUE É POR INTERSECTION OBSERVER, e não por ouvinte de rolagem. Ouvinte acorda a
 * thread principal a cada quadro numa página feita para rolar; o observador só fala quando
 * algo cruza a faixa.
 *
 * A FAIXA É ESTREITA NO TOPO DE PROPÓSITO. O `rootMargin` corta a nav fixa em cima e 60% da
 * tela embaixo, então a seção "ativa" é a que está encostando no topo da área de leitura, e
 * não qualquer uma visível. Sem isso, três seções curtas na tela disputariam o destaque.
 *
 * QUANDO NENHUMA ESTÁ NA FAIXA, O ÚLTIMO DESTAQUE FICA. Acontece no fim da página e em
 * rolagem rápida, e apagar tudo faria o índice piscar para nada durante o movimento.
 */
export default function IndiceCase({ secoes }: { secoes: SecaoDoCase[] }) {
  const [ativa, setAtiva] = useState(secoes[0]?.ancora);
  const visiveis = useRef(new Set<string>());

  useEffect(() => {
    const alvos = document.querySelectorAll<HTMLElement>("[data-secao-case]");
    if (alvos.length === 0) return;

    /**
     * O `rootMargin` só aceita px e porcentagem: `calc()` e `var()` são rejeitados e o
     * observador nem é criado. Por isso a altura da nav é lida do token aqui, em vez de
     * escrita na margem. O `|| 64` cobre o instante antes de o CSS resolver.
     */
    const alturaNav =
      parseFloat(
        getComputedStyle(document.documentElement).getPropertyValue("--altura-nav"),
      ) || 64;

    const observador = new IntersectionObserver(
      (entradas) => {
        for (const entrada of entradas) {
          const id = entrada.target.id;
          if (entrada.isIntersecting) visiveis.current.add(id);
          else visiveis.current.delete(id);
        }

        // A primeira na ordem do documento, e não a primeira que o observador reportou:
        // a ordem das entradas não é a da página.
        const primeira = secoes.find((secao) => visiveis.current.has(secao.ancora));
        if (primeira) setAtiva(primeira.ancora);
      },
      {
        rootMargin: `-${alturaNav + 12}px 0px -60% 0px`,
        threshold: 0,
      },
    );

    for (const alvo of alvos) observador.observe(alvo);
    return () => observador.disconnect();
  }, [secoes]);

  /**
   * O FOCO VAI PARA A SEÇÃO, E A ROLAGEM CONTINUA SENDO A NATIVA.
   *
   * O link é uma âncora de verdade, então ele funciona sem JavaScript e o navegador cuida
   * da rolagem, com o `scroll-padding-top` do `html` descontando a nav. **Não existe
   * `preventDefault` aqui**: interceptar o clique para rolar por código trocaria um
   * comportamento que já funciona por um que depende de script.
   *
   * O `preventScroll` é o que faz os dois conviverem. Sem ele, `focus()` rola por conta
   * própria, instantaneamente, e briga com a rolagem suave que o navegador acabou de
   * começar: a página saltaria e depois deslizaria de volta.
   */
  function levarFocoPara(ancora: string) {
    document.getElementById(ancora)?.focus({ preventScroll: true });
  }

  if (secoes.length === 0) return null;

  return (
    <nav aria-label="Nesta página" className="indice-case w-full">
      <AcordeaoMobile
        titulo="NESTA PÁGINA"
        classeTag="font-mono text-ficha-rotulo font-medium tracking-[0.1em] text-text-dim"
        classeLinha="min-h-[var(--alvo-toque)] py-[14px] lg:min-h-0 lg:py-0"
        classePainel="pb-[10px] lg:pb-0"
      >
        <ol className="mt-[16px] flex w-full flex-col gap-[4px]">
          {secoes.map((secao) => (
            <li key={secao.ancora} className="w-full">
              <a
                href={`#${secao.ancora}`}
                onClick={() => levarFocoPara(secao.ancora)}
                aria-current={ativa === secao.ancora ? "location" : undefined}
                className="item-indice flex w-full items-baseline gap-[14px] border-l-2 border-border py-[10px] pl-[16px]"
              >
                <span className="font-mono text-[11px] font-medium text-text-dim">
                  {secao.numero}
                </span>
                <span className="text-legenda text-text-muted">
                  {secao.rotulo}
                </span>
              </a>
            </li>
          ))}
        </ol>
      </AcordeaoMobile>
    </nav>
  );
}

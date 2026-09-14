"use client";

import { useEffect } from "react";
import { usePathname } from "next/navigation";

/**
 * Pausa animação contínua quando o elemento sai da tela.
 *
 * Existe por causa das fitas de luz do hero, que derivam para sempre. Deslocar uma camada
 * já rasterizada é barato, porque o compositor reaproveita a textura e não repinta nada,
 * mas manter o compositor acordado o tempo todo pesa em bateria de celular. Numa página de
 * case de cinco mil pixels, a animação rodaria durante uma rolagem inteira sem ninguém ver.
 *
 * Com isso ela roda na primeira tela e para no resto. Aba em segundo plano o navegador já
 * congela sozinho, então não precisa de nada aqui.
 *
 * Marca o elemento com data-pausar-fora="dentro" ou "fora", e quem lê isso é o CSS, pelo
 * animation-play-state. Nenhum estado em React: o atributo é o estado.
 *
 * QUEM OBSERVA PODE SER OUTRO ELEMENTO, pelo `data-gatilho` com um seletor. Isso existe
 * por causa do hero preso: com `position: sticky` ele continua intersectando a viewport
 * mesmo totalmente coberto pela seção que sobe por cima, e interseção não sabe de oclusão.
 * O gatilho aponta para a sentinela na fronteira entre as duas seções, que passa para cima
 * da tela quando a cobertura acontece. Sem isso, as doze manchas do hero animariam atrás de
 * uma folha opaca.
 *
 * DEPENDE DO CAMINHO, e isso não é detalhe. Com dependências vazias ele observaria só os
 * elementos que existiam na montagem. Como o layout persiste entre rotas, sair da home e
 * voltar traz um hero que é outro nó no DOM, e sem observador ele animaria para sempre,
 * inclusive fora da tela. Era bug antes de existir transição de página e piora com ela,
 * porque aí a navegação é toda client-side.
 */
export default function PausaForaDaTela() {
  const caminho = usePathname();

  useEffect(() => {
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;

    const alvos = Array.from(
      document.querySelectorAll<HTMLElement>("[data-pausar-fora]"),
    );
    if (alvos.length === 0) return;

    // Quem é observado nem sempre é quem recebe a marca.
    const porObservado = new Map<Element, HTMLElement>();
    for (const alvo of alvos) {
      const seletor = alvo.dataset.gatilho;
      const observado = seletor ? document.querySelector(seletor) : alvo;
      if (observado) porObservado.set(observado, alvo);
    }
    if (porObservado.size === 0) return;

    const observador = new IntersectionObserver((entradas) => {
      for (const entrada of entradas) {
        const alvo = porObservado.get(entrada.target);
        if (alvo) alvo.dataset.pausarFora = entrada.isIntersecting ? "dentro" : "fora";
      }
    });

    for (const observado of porObservado.keys()) observador.observe(observado);
    return () => observador.disconnect();
    // Refaz na troca de rota, porque os elementos marcados são outros.
  }, [caminho]);

  return null;
}

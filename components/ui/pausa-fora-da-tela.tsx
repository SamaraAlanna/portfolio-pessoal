"use client";

import { useEffect } from "react";

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
 */
export default function PausaForaDaTela() {
  useEffect(() => {
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;

    const alvos = Array.from(
      document.querySelectorAll<HTMLElement>("[data-pausar-fora]"),
    );
    if (alvos.length === 0) return;

    const observador = new IntersectionObserver((entradas) => {
      for (const entrada of entradas) {
        const alvo = entrada.target as HTMLElement;
        alvo.dataset.pausarFora = entrada.isIntersecting ? "dentro" : "fora";
      }
    });

    for (const alvo of alvos) observador.observe(alvo);
    return () => observador.disconnect();
  }, []);

  return null;
}

"use client";

import { useEffect } from "react";
import { usePathname } from "next/navigation";

/**
 * As luzes do hero acompanhando o ponteiro.
 *
 * AMOSTRAGEM E ANIMAÇÃO SÃO COISAS SEPARADAS, e é isso que evita o laço por quadro. Este
 * componente só escuta `pointermove`, limita a uma escrita por quadro e grava duas
 * variáveis CSS. O atraso não é calculado aqui: é uma `transition` longa no `translate`,
 * declarada no CSS, que roda no compositor. Com o mouse parado, nada roda.
 *
 * É diferente de um `requestAnimationFrame` contínuo, que obrigaria a thread principal a
 * acordar a cada 16ms para sempre numa página feita para rolar.
 *
 * SEM PONTEIRO FINO O OUVINTE NEM É REGISTRADO. Em celular o custo é exatamente zero, e
 * quem pediu menos movimento também não recebe nada.
 *
 * As variáveis são a posição relativa ao centro da tela, de -1 a 1. Quanto cada luz se
 * desloca com isso é decisão do CSS, que multiplica pelo alcance dela.
 */
export default function LuzSegueCursor() {
  const caminho = usePathname();

  useEffect(() => {
    if (!window.matchMedia("(hover: hover) and (pointer: fine)").matches) return;
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;

    const alvos = Array.from(
      document.querySelectorAll<HTMLElement>("[data-segue-cursor]"),
    );
    if (alvos.length === 0) return;

    let quadroPendente = 0;
    let x = 0;
    let y = 0;

    function escrever() {
      quadroPendente = 0;
      for (const alvo of alvos) {
        alvo.style.setProperty("--mouse-x", String(x));
        alvo.style.setProperty("--mouse-y", String(y));
      }
    }

    function aoMover(evento: PointerEvent) {
      x = (evento.clientX / window.innerWidth) * 2 - 1;
      y = (evento.clientY / window.innerHeight) * 2 - 1;
      if (quadroPendente === 0) {
        quadroPendente = window.requestAnimationFrame(escrever);
      }
    }

    window.addEventListener("pointermove", aoMover, { passive: true });

    return () => {
      window.removeEventListener("pointermove", aoMover);
      if (quadroPendente !== 0) window.cancelAnimationFrame(quadroPendente);
    };
    // Refaz na troca de rota: o hero é outro nó quando se volta para a home.
  }, [caminho]);

  return null;
}

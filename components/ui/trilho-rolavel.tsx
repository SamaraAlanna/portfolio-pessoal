"use client";

import { useEffect, useRef, type ReactNode } from "react";

/**
 * Moldura dos carrosséis do mobile.
 *
 * No mobile as grades de números, de paletas e de imagens viram rolagem horizontal, como
 * está no Figma: no case do Bajaj os seis cards de número correm num trilho de 1320
 * dentro de uma tela de 327.
 *
 * O QUE ESTE COMPONENTE RESOLVE É TECLADO. Uma região que rola precisa ser alcançável por
 * quem navega sem mouse, senão o conteúdo fora da tela fica inacessível. Só que a mesma
 * moldura no desktop não rola nada, e um tabIndex fixo criaria uma parada de tabulação
 * inútil em cada bloco de case.
 *
 * Por isso o tabIndex é medido, e não declarado: o ResizeObserver compara a largura do
 * conteúdo com a da moldura e liga ou desliga o foco conforme a tela. No desktop, onde a
 * grade cabe, não sobra parada nenhuma.
 *
 * OS ATRIBUTOS SÃO ESCRITOS NO DOM, e não guardados em estado, de propósito. Estado aqui
 * significaria setState dentro de efeito a cada medição, que é justamente o padrão que o
 * ESLint do React proíbe neste projeto, e traria uma renderização a mais por medida sem
 * mudar nada do que aparece na tela.
 *
 * O rótulo é obrigatório porque uma região focável sem nome não diz nada a quem usa
 * leitor de tela.
 */
export default function TrilhoRolavel({
  rotulo,
  className = "",
  children,
}: {
  rotulo: string;
  className?: string;
  children: ReactNode;
}) {
  const moldura = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const elemento = moldura.current;
    if (!elemento) return;

    function medir() {
      if (!elemento) return;
      // A folga de 1px evita ligar o foco por causa de arredondamento de subpixel.
      const rola = elemento.scrollWidth > elemento.clientWidth + 1;

      if (rola) {
        elemento.setAttribute("tabindex", "0");
        elemento.setAttribute("role", "group");
        elemento.setAttribute("aria-label", rotulo);
      } else {
        elemento.removeAttribute("tabindex");
        elemento.removeAttribute("role");
        elemento.removeAttribute("aria-label");
      }
    }

    medir();

    const observador = new ResizeObserver(medir);
    observador.observe(elemento);
    return () => observador.disconnect();
  }, [rotulo]);

  return (
    <div ref={moldura} className={className}>
      {children}
    </div>
  );
}

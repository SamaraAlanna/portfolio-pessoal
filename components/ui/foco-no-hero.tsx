"use client";

import { useEffect } from "react";
import { usePathname } from "next/navigation";

/**
 * Devolve o hero para a tela quando o foco entra nele.
 *
 * O PROBLEMA: com o hero preso por `position: sticky`, ele continua geometricamente dentro
 * da viewport mesmo coberto pela seção que sobe por cima. Quem navega por teclado e dá
 * Shift+Tab a partir da seção de baixo devolve o foco para os botões do hero, o navegador
 * não rola nada porque considera que já estão visíveis, e o anel de foco é desenhado
 * debaixo de uma camada opaca. A pessoa perde o foco de vista.
 *
 * POR QUE `scroll-margin` NÃO RESOLVE. Ele age sobre a rolagem que o navegador faz para
 * trazer um elemento à tela, e essa rolagem nunca acontece: o elemento já está na tela. A
 * premissa da regra não é satisfeita, então a margem não tem o que ajustar.
 *
 * O QUE RESOLVE é isto: ao receber foco, se a página estiver rolada, volta ao topo. O
 * teclado continua alcançando os dois botões, e eles aparecem em vez de ficarem escondidos.
 *
 * Não é sequestro de rolagem: a pessoa pediu para chegar naquele controle, e levar o
 * controle à vista é o que o navegador já faria se soubesse de oclusão.
 *
 * A rolagem é instantânea, e o ouvinte só existe quando o efeito existe. Com movimento
 * reduzido o hero não fica preso, rola junto, e o comportamento nativo do navegador já
 * funciona sozinho.
 */
export default function FocoNoHero() {
  const caminho = usePathname();

  useEffect(() => {
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;

    const hero = document.querySelector<HTMLElement>("[data-hero-preso]");
    if (!hero) return;

    function aoFocar() {
      // Rolagem quase no topo significa hero quase todo à mostra: não vale o salto.
      if (window.scrollY < 8) return;
      window.scrollTo({ top: 0, behavior: "auto" });
    }

    hero.addEventListener("focusin", aoFocar);
    return () => hero.removeEventListener("focusin", aoFocar);
  }, [caminho]);

  return null;
}

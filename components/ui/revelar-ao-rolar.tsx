"use client";

import { useEffect } from "react";
import { usePathname } from "next/navigation";

/**
 * Entrada dos blocos ao rolar.
 *
 * Um observador só para a página inteira, montado no layout, em vez de um componente
 * cliente por seção. As seções continuam sendo componentes de servidor: elas só marcam
 * `data-revelar` e não sabem que existe animação.
 *
 * As cinco regras de dosagem estão comentadas no `app/globals.css`, junto do CSS que elas
 * governam. Aqui ficam as duas que dependem de JavaScript:
 *
 * NADA ANIMA NA PRIMEIRA PINTURA. O que já está visível quando a página abre é marcado
 * como visto, sem transição. Sem isso, tudo que cabe na tela inicial anima junto e vira
 * animação de carregamento, com o hero, que é o texto mais importante do site, esperando
 * para ser lido.
 *
 * UMA VEZ POR ELEMENTO. O observador para de observar assim que revela. Rolar para cima e
 * para baixo não re-anima nada, que é o que mais irrita em visita repetida.
 *
 * O ESTADO OCULTO É APLICADO AQUI, e não no CSS de saída. Assim, sem JavaScript, a página
 * aparece inteira: o pior defeito possível numa animação de entrada é ela conseguir deixar
 * conteúdo invisível.
 */
export default function RevelarAoRolar() {
  const caminho = usePathname();

  useEffect(() => {
    // Quem pediu menos movimento não recebe nem o estado oculto.
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;

    const alvos = Array.from(
      document.querySelectorAll<HTMLElement>("[data-revelar]"),
    );
    if (alvos.length === 0) return;

    const observador = new IntersectionObserver(
      (entradas) => {
        for (const entrada of entradas) {
          if (!entrada.isIntersecting) continue;
          (entrada.target as HTMLElement).dataset.revelar = "visivel";
          observador.unobserve(entrada.target);
        }
      },
      // A margem negativa embaixo atrasa o gatilho: o bloco já entrou um pouco na tela
      // quando começa, e a animação termina antes de a leitura chegar nele.
      { rootMargin: "0px 0px -12% 0px" },
    );

    for (const alvo of alvos) {
      if (alvo.getBoundingClientRect().top < window.innerHeight) {
        alvo.dataset.revelar = "visivel";
        continue;
      }

      alvo.dataset.revelar = "pendente";
      observador.observe(alvo);
    }

    return () => observador.disconnect();
    // Refaz na troca de rota, porque o conteúdo marcado é outro.
  }, [caminho]);

  return null;
}

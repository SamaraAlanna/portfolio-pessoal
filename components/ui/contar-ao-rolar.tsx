"use client";

import { useEffect } from "react";
import { usePathname } from "next/navigation";
import { numeroDoValor } from "@/lib/texto";

/**
 * Contagem dos números dos cases.
 *
 * MESMA FORMA DO `RevelarAoRolar`: um observador só para a página inteira, montado no
 * layout, com os blocos marcando um atributo e sem saber que existe animação. Um observador
 * por número multiplicaria por seis numa página de case, e a decisão de centralizar já está
 * registrada.
 *
 * O HTML DO SERVIDOR JÁ TRAZ O VALOR FINAL, e este componente só o substitui depois. Sem
 * JavaScript, com script bloqueado ou para buscador, o número certo é o que está lá. É a
 * mesma regra que governa a passada de animação inteira: nenhum estado inválido mora no
 * estilo base, porque o pior defeito de uma animação é ela conseguir esconder conteúdo.
 *
 * NADA CONTA NA PRIMEIRA PINTURA. Número que já está na tela quando a página abre fica no
 * valor final, sem contar. Sem isso quem abre o link direto no bloco de números veria o
 * valor certo virar zero e subir de novo, que lê como falha e não como animação.
 *
 * É `requestAnimationFrame`, E ISSO NÃO CONTRARIA A REGRA DO PROJETO. A regra diz para não
 * mover com JavaScript porque um laço obriga a thread principal a acordar a cada quadro
 * **para sempre**, e ela foi escrita para as luzes do hero. Aqui o laço dura um segundo, se
 * encerra sozinho e não tem substituto: **não existe propriedade de CSS que interpole texto**,
 * e contar é trocar o conteúdo do nó, não animar uma caixa.
 *
 * UMA VEZ POR NÚMERO. O observador para de observar assim que dispara.
 */

/** Um segundo, desacelerando no fim. */
const DURACAO = 1000;

export default function ContarAoRolar() {
  const caminho = usePathname();

  useEffect(() => {
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;

    const alvos = Array.from(document.querySelectorAll<HTMLElement>("[data-contar]"));
    if (alvos.length === 0) return;

    const quadros = new Map<HTMLElement, number>();

    function anima(no: HTMLElement) {
      const final = no.textContent ?? "";
      const partes = numeroDoValor(final);
      if (!partes) return;

      const { numero: destino, casas, sufixo } = partes;

      // O formato de saída é o de casa, senão "2,68" contaria passando por "2.68".
      const formata = new Intl.NumberFormat("pt-BR", {
        minimumFractionDigits: casas,
        maximumFractionDigits: casas,
      });

      const inicio = performance.now();

      function passo(agora: number) {
        const t = Math.min((agora - inicio) / DURACAO, 1);
        if (t >= 1) {
          // Fecha no texto original, e não no formatado, para o fim ser byte a byte o que o
          // servidor mandou.
          no.textContent = final;
          quadros.delete(no);
          return;
        }
        const suave = 1 - Math.pow(1 - t, 3);
        no.textContent = formata.format(destino * suave) + sufixo;
        quadros.set(no, requestAnimationFrame(passo));
      }

      no.textContent = formata.format(0) + sufixo;
      quadros.set(no, requestAnimationFrame(passo));
    }

    const observador = new IntersectionObserver(
      (entradas) => {
        for (const entrada of entradas) {
          if (!entrada.isIntersecting) continue;
          observador.unobserve(entrada.target);
          anima(entrada.target as HTMLElement);
        }
      },
      { rootMargin: "0px 0px -12% 0px" },
    );

    for (const alvo of alvos) {
      if (alvo.getBoundingClientRect().top < window.innerHeight) continue;
      observador.observe(alvo);
    }

    return () => {
      observador.disconnect();
      for (const quadro of quadros.values()) cancelAnimationFrame(quadro);
    };
    // Refaz na troca de rota, porque os números marcados são outros.
  }, [caminho]);

  return null;
}

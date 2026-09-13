"use client";

import { useSyncExternalStore, type MouseEvent } from "react";
import IconeSol from "@/components/ui/icone-sol";
import IconeLua from "@/components/ui/icone-lua";

type Tema = "claro" | "escuro";

/**
 * O tema não é estado do React: ele vive no atributo data-tema do html e na preferência
 * do sistema operacional. Por isso a leitura é por useSyncExternalStore, que assina as
 * duas fontes, em vez de estado local sincronizado por efeito.
 */
function assinar(aoMudar: () => void) {
  const preferenciaClara = window.matchMedia("(prefers-color-scheme: light)");
  preferenciaClara.addEventListener("change", aoMudar);

  const observador = new MutationObserver(aoMudar);
  observador.observe(document.documentElement, {
    attributes: true,
    attributeFilter: ["data-tema"],
  });

  return () => {
    preferenciaClara.removeEventListener("change", aoMudar);
    observador.disconnect();
  };
}

function lerNoCliente(): Tema {
  const salvo = document.documentElement.dataset.tema as Tema | undefined;
  if (salvo) return salvo;
  return window.matchMedia("(prefers-color-scheme: light)").matches ? "claro" : "escuro";
}

/**
 * No servidor não dá para saber o tema, porque ele depende do que está salvo no
 * navegador ou da preferência do sistema. Devolver null aqui faz o aria-pressed sair
 * ausente no HTML e ser preenchido depois da hidratação, em vez de sair errado.
 */
function lerNoServidor(): Tema | null {
  return null;
}

/**
 * O `startViewTransition` ainda não está na lib de tipos do TypeScript aqui, então o tipo
 * vive neste arquivo em vez de virar um `any` solto.
 */
type DocumentoComTransicao = Document & {
  startViewTransition?: (callback: () => void) => { finished: Promise<void> };
};

/**
 * Seletor de tema.
 *
 * A TROCA ENTRA POR UM CÍRCULO que cresce a partir do botão clicado, pela View
 * Transitions API. O navegador tira uma foto do estado antigo e do novo e anima um
 * clip-path entre as duas, no compositor: é um momento só, sem custo depois. O CSS que
 * desenha isso está no app/globals.css.
 *
 * Transição de mesmo documento, que é o nosso caso porque só trocamos um atributo, é
 * Baseline desde outubro de 2025. Onde não existir, cai na transição de cor de antes.
 *
 * O destaque do botão ativo não precisa de JavaScript. Os tokens tema/fundo-sol e
 * tema/fundo-lua já invertem sozinhos entre os temas: no escuro o sol é transparente e a
 * lua é tingida, no claro é o contrário. Cada botão aponta para o seu token e o realce
 * acontece por CSS, sem estado e sem piscar na hidratação.
 */
export default function SeletorTema() {
  const tema = useSyncExternalStore(assinar, lerNoCliente, lerNoServidor);

  function aplicar(novo: Tema, evento: MouseEvent<HTMLButtonElement>) {
    const raiz = document.documentElement;

    function gravar() {
      // Mudar o atributo já notifica o useSyncExternalStore, pelo MutationObserver.
      raiz.dataset.tema = novo;

      try {
        window.localStorage.setItem("tema", novo);
      } catch {
        // Navegação privada ou armazenamento bloqueado. A troca continua valendo nesta
        // sessão, só não persiste, e isso não é motivo para quebrar a interface.
      }
    }

    const documento = document as DocumentoComTransicao;
    const reduzido = window.matchMedia("(prefers-reduced-motion: reduce)").matches;

    // Sem suporte, ou com movimento reduzido, vale o caminho antigo: transição de cor por
    // CSS, que já respeita a preferência lá. Não é fallback pobre, é o que o site fazia.
    if (reduzido || typeof documento.startViewTransition !== "function") {
      raiz.classList.add("trocando-tema");
      window.setTimeout(() => raiz.classList.remove("trocando-tema"), 220);
      gravar();
      return;
    }

    // O círculo nasce no botão que foi clicado, e não no centro da tela: a pessoa vê o
    // próprio toque espalhar o tema. O raio final é a distância até o canto mais longe,
    // senão sobra um pedaço da tela sem cobrir.
    const caixa = evento.currentTarget.getBoundingClientRect();
    const x = caixa.left + caixa.width / 2;
    const y = caixa.top + caixa.height / 2;
    const raio = Math.hypot(
      Math.max(x, window.innerWidth - x),
      Math.max(y, window.innerHeight - y),
    );

    raiz.style.setProperty("--tema-origem-x", `${x}px`);
    raiz.style.setProperty("--tema-origem-y", `${y}px`);
    raiz.style.setProperty("--tema-raio", `${raio}px`);

    // A classe escopa as regras do círculo. Sem ela, elas valeriam para qualquer transição
    // de view, inclusive a de navegação entre páginas.
    raiz.classList.add("trocando-tema-circulo");

    // A troca precisa acontecer dentro do callback: é entre a foto do estado anterior e a
    // do novo que o navegador anima.
    const transicao = documento.startViewTransition(gravar);
    transicao.finished.finally(() => {
      raiz.classList.remove("trocando-tema-circulo");
    });
  }

  return (
    <div
      role="group"
      aria-label="Tema"
      className="flex items-center gap-[2px] rounded-full border-[0.5px] border-border p-[3px]"
    >
      <button
        type="button"
        onClick={(evento) => aplicar("claro", evento)}
        aria-pressed={tema === null ? undefined : tema === "claro"}
        className="alvo-toque-vertical flex items-center rounded-full bg-tema-fundo-sol p-[7px] text-tema-icone-sol"
      >
        <IconeSol />
        <span className="sr-only">Tema claro</span>
      </button>

      <button
        type="button"
        onClick={(evento) => aplicar("escuro", evento)}
        aria-pressed={tema === null ? undefined : tema === "escuro"}
        className="alvo-toque-vertical flex items-center justify-center rounded-full bg-tema-fundo-lua p-[7px] text-tema-icone-lua"
      >
        <IconeLua />
        <span className="sr-only">Tema escuro</span>
      </button>
    </div>
  );
}

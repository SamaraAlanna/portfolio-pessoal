"use client";

import { useEffect, useRef } from "react";
import Link from "next/link";
import Logo from "@/components/layout/logo";
import SeletorTema from "@/components/layout/seletor-tema";
import { linksNav } from "@/components/layout/links-nav";

/**
 * Menu do mobile.
 *
 * Painel ancorado no topo, e não tela cheia, como está no Figma.
 *
 * O seletor de idioma não entra aqui. Ele vive no hero. O documento dizia o contrário e
 * já foi corrigido.
 *
 *
 * ELE É MODAL, e por isso três coisas andam juntas:
 *
 * 1. `role="dialog"` com `aria-modal`, para o leitor de tela confinar a leitura ao painel
 *    em vez de continuar descendo pela página que ficou atrás.
 * 2. Foco preso no Tab, porque o aria-modal não prende o foco do teclado: sem isso, quem
 *    navega por teclado sai do painel e vai tabulando por uma página que não está vendo.
 * 3. Foco devolvido a quem abriu, na limpeza do efeito. Sem isso o foco volta para o
 *    começo do documento e a pessoa perde o lugar.
 */
export default function MenuMobile({
  aberto,
  aoFechar,
  caminhoAtual,
}: {
  aberto: boolean;
  aoFechar: () => void;
  caminhoAtual: string;
}) {
  const painel = useRef<HTMLDivElement>(null);
  const botaoFechar = useRef<HTMLButtonElement>(null);

  useEffect(() => {
    if (!aberto) return;

    const caixa = painel.current;
    const quemAbriu = document.activeElement as HTMLElement | null;

    function focaveisDoPainel() {
      if (!caixa) return [] as HTMLElement[];
      return Array.from(
        caixa.querySelectorAll<HTMLElement>(
          'a[href], button:not([disabled]), [tabindex]:not([tabindex="-1"])',
        ),
      );
    }

    function aoTeclar(evento: KeyboardEvent) {
      if (evento.key === "Escape") {
        aoFechar();
        return;
      }

      if (evento.key !== "Tab" || !caixa) return;

      const focaveis = focaveisDoPainel();
      if (focaveis.length === 0) return;

      const primeiro = focaveis[0];
      const ultimo = focaveis[focaveis.length - 1];
      const ativo = document.activeElement;
      const fora = !caixa.contains(ativo);

      if (evento.shiftKey && (ativo === primeiro || fora)) {
        evento.preventDefault();
        ultimo.focus();
      } else if (!evento.shiftKey && (ativo === ultimo || fora)) {
        evento.preventDefault();
        primeiro.focus();
      }
    }

    document.addEventListener("keydown", aoTeclar);

    // Trava a rolagem do fundo enquanto o painel está aberto.
    const overflowAnterior = document.body.style.overflow;
    document.body.style.overflow = "hidden";

    botaoFechar.current?.focus();

    return () => {
      document.removeEventListener("keydown", aoTeclar);
      document.body.style.overflow = overflowAnterior;
      quemAbriu?.focus();
    };
  }, [aberto, aoFechar]);

  if (!aberto) return null;

  return (
    <div
      id="menu-mobile"
      ref={painel}
      role="dialog"
      aria-modal="true"
      aria-label="Menu"
      className="fixed inset-x-0 top-0 z-50 flex max-h-dvh flex-col overflow-y-auto bg-bg pt-[18px] pb-[40px] px-[var(--padding-lateral)]"
    >
      <div className="flex w-full items-center justify-between py-[10px]">
        <Logo />
        <button
          ref={botaoFechar}
          type="button"
          onClick={aoFechar}
          className="alvo-toque flex items-center justify-center pl-[12px] py-[10px] text-fechar-menu text-text"
        >
          <span aria-hidden="true">✕</span>
          <span className="sr-only">Fechar menu</span>
        </button>
      </div>

      <div className="flex w-full items-start">
        <SeletorTema />
      </div>

      <div className="h-[23px]" />

      <nav aria-label="Principal" className="flex w-full flex-col">
        {linksNav.map((link) => {
          const ativo = caminhoAtual === link.destino;
          return (
            <Link
              key={link.destino}
              href={link.destino}
              onClick={aoFechar}
              aria-current={ativo ? "page" : undefined}
              className={`flex w-full items-center border-b border-border py-[18px] text-link-menu font-medium ${
                ativo ? "text-text" : "text-text-muted"
              }`}
            >
              {link.rotulo}
            </Link>
          );
        })}
      </nav>

      <div className="h-[40px]" />

      <Link
        href="/contato"
        onClick={aoFechar}
        className="botao-interativo flex w-full items-center justify-center rounded-full bg-accent-rosa py-[16px] text-corpo font-medium text-bg"
      >
        Entre em contato
      </Link>
    </div>
  );
}

"use client";

import { useCallback, useState } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import Logo from "@/components/layout/logo";
import SeletorTema from "@/components/layout/seletor-tema";
import MenuMobile from "@/components/layout/menu-mobile";
import { linksNav } from "@/components/layout/links-nav";

/**
 * Nav.
 *
 * Desktop tem oito controles: cinco links, os dois botões de tema e o CTA.
 * Mobile é marca mais hambúrguer, e o menu abre como painel.
 *
 * O corte entre as duas versões acontece em 1024px. Esse número não vem do Figma, que
 * tem só 375 e 1440 desenhados. Foi escolha minha: abaixo disso os cinco links, o
 * seletor de tema e o CTA começam a se espremer contra a marca.
 *
 * ELA É FIXA NO TOPO, e o fundo é opaco, não desfocado. Três motivos, em ordem de peso:
 *
 * 1. O painel do menu mobile é renderizado aqui dentro e se posiciona pela viewport.
 *    `backdrop-filter` criaria bloco de contenção para descendente `fixed`, e o painel
 *    passaria a se posicionar por esta barra em vez de pela tela. O menu quebraria por
 *    causa de um efeito visual.
 * 2. Fundo opaco tem contraste conhecido. Desfoque não garante nada: o contraste do texto
 *    passa a depender do que estiver rolando por baixo, e o sistema inteiro deste projeto
 *    é construído em contraste medido.
 * 3. Desfoque é custo de GPU por quadro, em página de case que passa de cinco mil pixels.
 *    É o tipo de coisa que engasga em celular mediano.
 *
 * O filete de baixo não está no Figma. Ele existe porque com fundo opaco o conteúdo
 * desaparece atrás de uma borda invisível, e o filete dá a linha onde isso acontece. É a
 * mesma linguagem do topo do footer.
 *
 * O z-index fica abaixo do painel do menu, que é 50, e do link de pular, que é 60.
 */
export default function Nav() {
  const [menuAberto, setMenuAberto] = useState(false);
  const caminho = usePathname();

  // Identidade estável: o efeito do painel depende dela, e uma função nova a cada render
  // refaria o efeito, cuja limpeza devolve o foco para quem abriu.
  const fecharMenu = useCallback(() => setMenuAberto(false), []);

  return (
    // A ALTURA FICA NO `header`, E NÃO NOS FILHOS. Com `box-sizing: border-box`, o filete
    // de baixo passa a caber dentro do `--altura-nav` em vez de somar a ele. Antes o
    // cabeçalho media `--altura-nav` mais 0,5px, e o `padding-top` do `body` compensa só o
    // token: o conteúdo começava meio pixel debaixo da borda.
    <header className="fixed inset-x-0 top-0 z-40 h-[var(--altura-nav)] w-full border-b-[0.5px] border-border bg-bg">
      {/* Desktop */}
      <nav
        aria-label="Principal"
        className="hidden h-full items-center justify-between faixa lg:flex"
      >
        <Logo />

        <div className="flex items-center gap-[32px]">
          {linksNav.map((link) => {
            const ativo = caminho === link.destino;
            return (
              <Link
                key={link.destino}
                href={link.destino}
                aria-current={ativo ? "page" : undefined}
                className={`link-realce text-corpo whitespace-nowrap ${
                  ativo ? "text-text" : "text-text-muted"
                }`}
              >
                {link.rotulo}
              </Link>
            );
          })}

          <SeletorTema />

          <Link
            href="/contato"
            className="botao-interativo botao-cheio rounded-full bg-accent-rosa px-[20px] py-[10px] text-cta font-medium whitespace-nowrap text-bg"
          >
            Entre em contato
          </Link>
        </div>
      </nav>

      {/* Mobile */}
      {/* A altura vem do token e não do padding, para o hero poder descontá-la com
          exatidão. Os 80px acomodam o alvo de toque de 44px do hambúrguer. */}
      <div className="flex h-full items-center justify-between faixa lg:hidden">
        <Logo />

        <button
          type="button"
          onClick={() => setMenuAberto(true)}
          aria-expanded={menuAberto}
          aria-controls="menu-mobile"
          className="flex min-h-[var(--alvo-toque)] min-w-[var(--alvo-toque)] flex-col items-end justify-center gap-[5px]"
        >
          {/* Três traços, com o último mais curto, como no Figma. */}
          <span className="h-[2px] w-[22px] rounded-[2px] bg-text" />
          <span className="h-[2px] w-[22px] rounded-[2px] bg-text" />
          <span className="h-[2px] w-[14px] rounded-[2px] bg-text" />
          <span className="sr-only">Abrir menu</span>
        </button>
      </div>

      <MenuMobile
        aberto={menuAberto}
        aoFechar={fecharMenu}
        caminhoAtual={caminho}
      />
    </header>
  );
}

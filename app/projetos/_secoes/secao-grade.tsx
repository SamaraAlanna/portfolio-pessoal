"use client";

import { Children, useState, type ReactNode } from "react";
import { FILTROS } from "@/lib/filtros";

/**
 * Filtros e grade da listagem.
 *
 * Os cards chegam prontos, renderizados no servidor, e passam por aqui como children.
 * Isso importa: o card usa next/image com dimensão lida do arquivo em build, o que só
 * acontece no servidor. Se a grade montasse os cards no cliente, essa leitura se perderia.
 * Aqui o cliente só decide quais dos elementos já prontos ficam visíveis.
 *
 * O filtro é por TAG e não por tipo, apesar de o frame no Figma se chamar "Filtro - TIPO".
 * As cinco pílulas desenhadas correspondem aos valores de tags.
 */
export default function SecaoGrade({
  tagsPorProjeto,
  children,
}: {
  tagsPorProjeto: string[][];
  children: ReactNode;
}) {
  const [filtro, setFiltro] = useState<string>("Todos");

  const cards = Children.toArray(children);
  const visiveis = cards.filter(
    (_, indice) => filtro === "Todos" || tagsPorProjeto[indice]?.includes(filtro),
  );

  return (
    <>
      <div className="faixa pb-[40px]">
        <div role="group" aria-label="Filtrar projetos" className="flex flex-wrap gap-[10px]">
          {FILTROS.map((valor) => {
            const ativo = filtro === valor;
            return (
              <button
                key={valor}
                type="button"
                onClick={() => setFiltro(valor)}
                aria-pressed={ativo}
                className={`alvo-toque-vertical rounded-full border-[0.5px] border-border px-[14px] py-[7px] text-cta whitespace-nowrap ${
                  ativo
                    ? "bg-accent-rosa font-medium text-bg"
                    : "bg-surface text-text-muted"
                }`}
              >
                {valor}
              </button>
            );
          })}
        </div>
      </div>

      <div data-revelar className="faixa pb-[96px]">
        {/* A contagem é anunciada porque filtrar esconde conteúdo, e quem usa leitor de
            tela não vê a grade encolher. */}
        <p aria-live="polite" className="sr-only">
          {visiveis.length}{" "}
          {visiveis.length === 1 ? "projeto encontrado" : "projetos encontrados"}
        </p>

        <ul className="grid grid-cols-1 items-stretch gap-[24px] sm:grid-cols-2 lg:grid-cols-3">
          {visiveis.map((card, indice) => (
            <li key={indice} className="flex">
              {card}
            </li>
          ))}
        </ul>
      </div>
    </>
  );
}

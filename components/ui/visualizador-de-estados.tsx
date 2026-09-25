"use client";

import { useId, useRef, useState, useSyncExternalStore, type ReactNode } from "react";

/**
 * Visualizador de estados de tela, em abas.
 *
 * A ATIVAÇÃO É MANUAL AQUI, E AUTOMÁTICA NO BLOCO DE CÓDIGO. A seta move o foco, e Enter ou
 * Espaço é que troca o painel. **Não é incoerência entre dois widgets parecidos, é o
 * critério que o próprio WAI-ARIA usa: latência.** Lá os painéis já estão renderizados e a
 * seta não custa nada; aqui cada ativação dispara o carregamento de uma captura, e percorrer
 * quatro abas com a seta baixaria quatro imagens que ninguém pediu ver.
 *
 * Enter e Espaço não precisam de tratamento: são `button`, e o navegador já dispara `click`
 * nos dois. O teclado aqui só cuida de mover o foco.
 *
 * A MOLDURA DA IMAGEM RESERVA A ALTURA PELA PROPORÇÃO, ANTES DE A IMAGEM CHEGAR. Sem isso a
 * troca de aba colapsaria a área para zero e o resto da página subiria, voltando quando a
 * imagem carregasse. A proporção vem da primeira imagem, lida do arquivo em build.
 *
 * É `object-contain` e não `object-cover`, e as duas são idênticas enquanto todas as
 * capturas tiverem a mesma proporção, que é o caso hoje. **A diferença aparece no dia em que
 * uma tiver outro recorte:** com `contain` ela encaixa dentro da moldura, sem salto e sem
 * perder conteúdo, e com `cover` ela seria cortada.
 *
 * SEM JAVASCRIPT, TUDO APARECE EMPILHADO, com o rótulo e a legenda de cada estado, e nenhum
 * papel de ARIA é declarado. Mesmo raciocínio do bloco de código: `role="tab"` num elemento
 * que não troca nada prometeria um widget que não existe.
 *
 * O interruptor é `useSyncExternalStore` porque o ESLint deste projeto proíbe `setState`
 * dentro de efeito, que é o padrão óbvio para "o JavaScript rodou".
 */

/** Precisa ser estável: função nova a cada render faz o React reassinar sem motivo. */
const semAssinatura = () => () => {};

export type Estado = { rotulo: string; legenda: string };

export default function VisualizadorDeEstados({
  estados,
  imagens,
  proporcao,
  total,
  rotulo = "Estados da tela",
}: {
  estados: Estado[];
  imagens: ReactNode[];
  /** Largura dividida pela altura da primeira captura, para reservar a moldura. */
  proporcao: number;
  /** Quantos estados existem no case inteiro, que é maior que o número de abas. */
  total?: string;
  /**
   * Nome acessível da lista de abas.
   *
   * **É PARÂMETRO PORQUE O COMPONENTE DEIXOU DE SER SÓ DOS CASES.** As certificações
   * reaproveitam ele para os três níveis da Carreira UX, e um tablist fixo em "Estados da
   * tela" anunciaria estado de tela para quem está olhando um certificado.
   */
  rotulo?: string;
}) {
  const base = useId();
  const [ativa, setAtiva] = useState(0);
  const botoes = useRef<(HTMLButtonElement | null)[]>([]);

  const montado = useSyncExternalStore(
    semAssinatura,
    () => true,
    () => false,
  );

  function aoTeclar(evento: React.KeyboardEvent<HTMLButtonElement>) {
    const ultima = estados.length - 1;
    let destino: number | null = null;

    if (evento.key === "ArrowRight") destino = ativa === ultima ? 0 : ativa + 1;
    else if (evento.key === "ArrowLeft") destino = ativa === 0 ? ultima : ativa - 1;
    else if (evento.key === "Home") destino = 0;
    else if (evento.key === "End") destino = ultima;
    if (destino === null) return;

    // Só o foco anda. A seleção espera Enter ou Espaço, que o botão dispara sozinho.
    evento.preventDefault();
    botoes.current[destino]?.focus();
  }

  const idDaAba = (i: number) => `${base}-aba-${i}`;
  const idDoPainel = (i: number) => `${base}-painel-${i}`;

  const contador = total ? `${estados.length} DE ${total} NO CASE` : null;

  /** A moldura que reserva a altura, igual nas duas versões. */
  function Moldura({ children }: { children: ReactNode }) {
    return (
      <div
        style={{ aspectRatio: proporcao }}
        className="w-full bg-surface-2 [&_img]:size-full [&_img]:object-contain"
      >
        {children}
      </div>
    );
  }

  if (!montado) {
    return (
      <div className="flex w-full flex-col overflow-hidden rounded-[12px] border-[0.5px] border-border bg-surface">
        {estados.map((estado, indice) => (
          <div key={estado.rotulo} className="flex w-full flex-col">
            <p className="bg-surface-2 px-[20px] py-[10px] text-legenda font-medium text-accent-case">
              {estado.rotulo}
            </p>
            <Moldura>{imagens[indice]}</Moldura>
            <p className="border-t-[0.5px] border-border px-[20px] py-[14px] text-legenda text-text-muted">
              {estado.legenda}
            </p>
          </div>
        ))}
      </div>
    );
  }

  return (
    <div className="flex w-full flex-col overflow-hidden rounded-[12px] border-[0.5px] border-border bg-surface">
      <div
        role="tablist"
        aria-label={rotulo}
        className="flex w-full flex-wrap items-center gap-[4px] bg-surface-2 p-[10px]"
      >
        {estados.map((estado, indice) => (
          <button
            key={estado.rotulo}
            ref={(elemento) => {
              botoes.current[indice] = elemento;
            }}
            type="button"
            role="tab"
            id={idDaAba(indice)}
            aria-selected={indice === ativa}
            aria-controls={idDoPainel(indice)}
            tabIndex={indice === ativa ? 0 : -1}
            onClick={() => setAtiva(indice)}
            onKeyDown={aoTeclar}
            // A `.tingido` entra só na ativa: ela traz o `--surface` opaco junto do tint,
            // e numa aba inativa isso viraria um fundo que não deveria existir.
            className={`aba-estado rounded-full px-[14px] py-[8px] text-legenda whitespace-nowrap ${
              indice === ativa ? "tingido" : ""
            }`}
          >
            {estado.rotulo}
          </button>
        ))}
      </div>

      {estados.map((estado, indice) => (
        <div
          key={estado.rotulo}
          role="tabpanel"
          id={idDoPainel(indice)}
          aria-labelledby={idDaAba(indice)}
          hidden={indice !== ativa}
          className="flex w-full flex-col"
        >
          <Moldura>{imagens[indice]}</Moldura>

          <div className="flex w-full flex-wrap items-center justify-between gap-[12px] border-t-[0.5px] border-border px-[20px] py-[14px]">
            <p className="text-legenda text-text-muted">{estado.legenda}</p>
            {contador ? (
              <p className="font-mono text-[10.5px] font-medium tracking-[0.08em] text-text-dim">
                {contador}
              </p>
            ) : null}
          </div>
        </div>
      ))}
    </div>
  );
}

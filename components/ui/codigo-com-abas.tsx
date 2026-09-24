"use client";

import { useId, useRef, useState, useSyncExternalStore, type ReactNode } from "react";

/**
 * As abas de um bloco de código com mais de uma versão.
 *
 * SEM JAVASCRIPT, TUDO APARECE EMPILHADO, COM O RÓTULO DE CADA PAINEL VISÍVEL. Nada fica
 * escondido, e **nenhum papel de ARIA é declarado**. Isso é deliberado: `role="tab"` num
 * elemento que não troca nada seria mentir para o leitor de tela, prometendo um widget que
 * não existe. Sem script, isto é uma lista de versões de código, e é isso que a marcação
 * diz.
 *
 * O INTERRUPTOR É `useSyncExternalStore`, E NÃO `setState` DENTRO DE EFEITO. O padrão óbvio
 * para "o JavaScript rodou" é um `useState(false)` virando `true` num `useEffect`, e o
 * ESLint deste projeto proíbe justamente isso. Aqui o servidor devolve `false`, o cliente
 * devolve `true`, e a troca acontece depois da hidratação sem efeito nenhum. O `subscribe`
 * mora fora do componente porque uma função nova a cada render faria o React reassinar
 * toda vez.
 *
 * ATIVAÇÃO SEGUE O FOCO. O WAI-ARIA recomenda isso quando trocar de painel é barato, e
 * aqui é: os painéis já estão renderizados e a seta só muda qual deles fica visível. Com
 * ativação manual a pessoa teria que apertar Enter depois de cada seta.
 *
 * O `tabindex` é móvel: só a aba ativa é alcançável por Tab, e as setas andam entre elas.
 * Sem isso, uma comparação de duas abas cobraria duas paradas de tabulação de quem só quer
 * passar pelo bloco.
 */

/** Precisa ser estável: função nova a cada render faz o React reassinar sem motivo. */
const semAssinatura = () => () => {};

export default function CodigoComAbas({
  arquivo,
  abas,
  paineis,
}: {
  arquivo?: string;
  abas: string[];
  paineis: ReactNode[];
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
    const ultima = abas.length - 1;
    let destino: number | null = null;

    if (evento.key === "ArrowRight") destino = ativa === ultima ? 0 : ativa + 1;
    else if (evento.key === "ArrowLeft") destino = ativa === 0 ? ultima : ativa - 1;
    else if (evento.key === "Home") destino = 0;
    else if (evento.key === "End") destino = ultima;
    if (destino === null) return;

    // Sem isso, seta para o lado rola a página junto com a troca de aba.
    evento.preventDefault();
    setAtiva(destino);
    botoes.current[destino]?.focus();
  }

  const idDaAba = (indice: number) => `${base}-aba-${indice}`;
  const idDoPainel = (indice: number) => `${base}-painel-${indice}`;

  /**
   * A moldura rolável de cada painel.
   *
   * `tabIndex` zero porque o código rola na horizontal e região rolável precisa ser
   * alcançável pelo teclado, senão o que está fora da tela fica inacessível.
   */
  function Moldura({ indice, children }: { indice: number; children: ReactNode }) {
    return (
      <div
        tabIndex={0}
        {...(montado
          ? {
              role: "tabpanel",
              id: idDoPainel(indice),
              "aria-labelledby": idDaAba(indice),
              hidden: indice !== ativa,
            }
          : {
              role: "region",
              "aria-label": arquivo
                ? `${abas[indice]}, código de ${arquivo}`
                : abas[indice],
            })}
        className="w-full overflow-x-auto px-[20px] pt-[16px] pb-[18px] font-mono text-codigo whitespace-pre text-text-muted [&_code]:font-mono [&_pre]:whitespace-pre"
      >
        {children}
      </div>
    );
  }

  if (!montado) {
    return (
      <div className="flex w-full flex-col">
        {paineis.map((painel, indice) => (
          <div key={abas[indice]} className="flex w-full flex-col">
            <p className="px-[20px] pt-[14px] font-mono text-titlebar font-medium text-text-dim uppercase">
              {abas[indice]}
            </p>
            <Moldura indice={indice}>{painel}</Moldura>
          </div>
        ))}
      </div>
    );
  }

  return (
    <div className="flex w-full flex-col">
      {/* A LISTA DE ABAS FICA AQUI, E NÃO NA BARRA DO NOME DO ARQUIVO, que é onde o Figma a
          desenha. O cabeçalho do bloco é o `AcordeaoMobile`, e ele renderiza o próprio
          rótulo duas vezes, uma para o desktop e outra dentro do `summary`. Pôr as abas ali
          duplicaria os `id` e, no mobile, **clicar numa aba fecharia o accordion**, porque
          o clique chegaria ao `summary`. Em linha própria isso não acontece. */}
      <div
        role="tablist"
        aria-label={arquivo ? `Versões de ${arquivo}` : "Versões do código"}
        className="flex w-full items-center gap-[4px] px-[20px] py-[10px]"
      >
        {abas.map((aba, indice) => (
          <button
            key={aba}
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
            className="aba-codigo rounded-full px-[14px] py-[6px] font-mono text-titlebar font-medium whitespace-nowrap uppercase"
          >
            {aba}
          </button>
        ))}
      </div>

      <div aria-hidden="true" className="h-px w-full bg-border" />

      {paineis.map((painel, indice) => (
        <Moldura key={abas[indice]} indice={indice}>
          {painel}
        </Moldura>
      ))}
    </div>
  );
}

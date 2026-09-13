import type { ReactNode } from "react";
import { linhasDeCampos } from "@/lib/texto";

/**
 * Diagrama de fluxo.
 *
 * É UM card com as etapas dentro, e não um card por etapa.
 *
 * UMA LINHA POR ETAPA, com explicação opcional no segundo campo, na mesma lógica do
 * bloco numeros:
 *
 *   :::diagrama
 *   15 telas | usam
 *   assistant/accent | o ponto único
 *   navy/900 | placeholder descartável
 *   identidade oficial | troca em 1 lugar
 *   :::
 *
 * Sem o segundo campo, a etapa é só o termo:
 *
 *   :::diagrama
 *   requisitos
 *   referências
 *   handoff
 *   :::
 *
 * A última etapa sai em ciano, porque é o estado final desejado: "handoff" no CRUD,
 * "confirmação 2xx" no VOGE, "identidade oficial" no Assistente.
 *
 * DESVIO: o caminho alternativo vem pelo atributo `desvio`, no formato
 * `condição | o que acontece`, e sai em âmbar, que no sistema significa ressalva. É o
 * "se falhar, envio por e-mail" do fluxo de leads do VOGE.
 *
 * MOBILE: o fluxo empilha e a seta vira para baixo, como pede o CLAUDE.md. Na horizontal
 * ele quebraria em várias linhas com setas apontando para a direita no fim de cada uma, e
 * a leitura passaria a depender de adivinhar onde a linha continua.
 *
 * A seta é decorativa nos dois sentidos: quem lê com leitor de tela recebe a ordem pela
 * lista numerada, que é o que o ol já garante.
 */
export default function BlocoDiagrama({
  desvio,
  children,
}: {
  desvio?: string;
  children?: ReactNode;
}) {
  const etapas = linhasDeCampos(children);
  if (etapas.length === 0) return null;

  const partesDoDesvio = desvio
    ? desvio.split("|").map((campo) => campo.trim())
    : undefined;

  return (
    <div className="w-full rounded-[12px] bg-surface-2 px-[28px] py-[24px]">
      <ol className="flex flex-col items-start gap-[10px] lg:flex-row lg:flex-wrap lg:items-start lg:gap-[16px]">
        {etapas.map(([termo, explicacao], indice) => {
          const ultimo = indice === etapas.length - 1;
          return (
            <li
              key={`${termo}-${indice}`}
              className="flex flex-col items-start gap-[10px] lg:flex-row lg:items-start lg:gap-[16px]"
            >
              <span className="flex flex-col gap-[6px]">
                <span
                  className={`font-mono text-[14px] font-medium ${
                    ultimo ? "text-accent-ciano" : "text-text-muted"
                  }`}
                >
                  {termo}
                </span>
                {explicacao ? (
                  <span className="text-terminal text-text-muted">{explicacao}</span>
                ) : null}
              </span>
              {!ultimo ? (
                <span aria-hidden="true" className="text-corpo text-text-dim">
                  <span className="lg:hidden">&darr;</span>
                  <span className="hidden lg:inline">&rarr;</span>
                </span>
              ) : null}
            </li>
          );
        })}
      </ol>

      {partesDoDesvio ? (
        <p className="mt-[18px] flex flex-col items-start gap-[10px] lg:flex-row lg:flex-wrap lg:items-center lg:gap-[16px] lg:pl-[32px]">
          <span className="font-mono text-titlebar font-medium tracking-[var(--tracking-titlebar)] text-accent-ambar">
            {partesDoDesvio[0]}
          </span>
          {partesDoDesvio.slice(1).map((parte, indice) => (
            <span
              key={indice}
              className="flex flex-col items-start gap-[10px] lg:flex-row lg:items-center lg:gap-[16px]"
            >
              <span aria-hidden="true" className="text-corpo text-text-dim">
                <span className="lg:hidden">&darr;</span>
                <span className="hidden lg:inline">&rarr;</span>
              </span>
              <span className="font-mono text-cta text-accent-ambar">{parte}</span>
            </span>
          ))}
        </p>
      ) : null}
    </div>
  );
}

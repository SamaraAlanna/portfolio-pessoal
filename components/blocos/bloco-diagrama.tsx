import type { ReactNode } from "react";
import { linhasDeCampos } from "@/lib/texto";

/**
 * Fluxo, em chips ligados por seta.
 *
 * DEIXOU DE SER UM CARD COM ETAPAS DENTRO em 2026-09-24. Agora são pílulas soltas no texto,
 * como o Figma novo mostra no "fluxo do lead" do VOGE e no "fluxo de deploy" do Bajaj.
 *
 * UMA LINHA POR ETAPA, com a camada opcional no segundo campo:
 *
 *   :::diagrama{desvio="se falhar | envio por e-mail"}
 *   formulário
 *   validação
 *   roteamento por unidade
 *   CRM | ciano
 *   confirmação 2xx
 *   :::
 *
 * O SEGUNDO CAMPO MUDOU DE SIGNIFICADO. Ele era a explicação da etapa, que o desenho novo
 * não tem mais, e passou a ser a camada. Valor fora das quatro camadas é ignorado, então
 * conteúdo escrito no formato antigo degrada para chip sem destaque em vez de quebrar.
 *
 * A CAMADA É DA ETAPA, E NÃO DO CASE. O CRM do VOGE é ciano porque é back-end e dados, no
 * significado que a cor tem no sistema inteiro, e não porque o case é de engenharia. Os
 * dois coincidem ali, e não devem ser confundidos: um fluxo de um case de ux-produto pode
 * ter uma etapa de back-end.
 *
 * A etapa destacada é a única que ganha fundo, e ele vem da `.tingido`, que põe `--surface`
 * opaco embaixo do tint. **Sem isso o chip ficaria direto sobre o fundo da página e o texto
 * em accent cairia para 4,5 no tema claro**, que é o piso exato do AA. Com a utilidade vai
 * a 5,0.
 *
 * DESVIO: o caminho alternativo vem pelo atributo `desvio`, no formato
 * `condição | o que acontece`, e a condição sai em âmbar, que no sistema significa ressalva.
 *
 * MOBILE: o fluxo empilha e a seta vira para baixo, como pede o CLAUDE.md. No desktop ele
 * é uma fileira que pode quebrar, e **a seta viaja junto do chip que ela aponta**, dentro do
 * mesmo item: sem isso uma linha poderia terminar numa seta apontando para o vazio, e a
 * leitura passaria a depender de adivinhar onde o fluxo continua.
 *
 * CADA GLIFO DE SETA É DECORATIVO, E ISSO INCLUI O `↳` DO DESVIO. Quem usa leitor de tela
 * recebe a ordem do caminho principal pela lista numerada, que o `ol` já garante, e a linha do
 * desvio precisa ser lida como frase: "se falhar, envio por e-mail". O `↳` ficou de fora do
 * `aria-hidden` até 2026-09-24, grudado no texto da condição dentro do mesmo `span`, então ele
 * era anunciado junto. **Glifo que carrega significado só visual precisa de elemento próprio**,
 * senão não existe onde pendurar o atributo.
 */
const CAMADAS: Record<string, string> = {
  rosa: "[--cor-tint:var(--tint-rosa)] border-accent-rosa text-accent-rosa",
  lavanda: "[--cor-tint:var(--tint-lavanda)] border-accent-lavanda text-accent-lavanda",
  ciano: "[--cor-tint:var(--tint-ciano)] border-accent-ciano text-accent-ciano",
  ambar: "[--cor-tint:var(--tint-ambar)] border-accent-ambar text-accent-ambar",
};

const CHIP =
  "inline-flex items-center rounded-full border px-[16px] py-[10px] font-mono text-[12px] font-medium whitespace-nowrap";

const SETA = "seta-fluxo shrink-0 text-[18px] leading-none text-text-dim";

export default function BlocoDiagrama({
  desvio,
  children,
}: {
  /** Caminho alternativo, no formato `condição | o que acontece`. */
  desvio?: string;
  children?: ReactNode;
}) {
  const etapas = linhasDeCampos(children)
    .map(([rotulo, camada]) => ({ rotulo, camada: camada ?? "" }))
    .filter((etapa) => etapa.rotulo);

  if (etapas.length === 0) return null;

  const [condicao, consequencia] = desvio
    ? desvio.split("|").map((campo) => campo.trim())
    : [];

  return (
    <div className="flex w-full flex-col items-start gap-[16px]">
      <ol className="flex w-full flex-col items-start gap-[12px] lg:flex-row lg:flex-wrap lg:items-center">
        {etapas.map((etapa, indice) => {
          const destaque = CAMADAS[etapa.camada];
          return (
            <li
              key={`${etapa.rotulo}-${indice}`}
              className="flex flex-col items-start gap-[12px] lg:flex-row lg:items-center"
            >
              {indice > 0 ? (
                <span aria-hidden="true" className={SETA}>
                  &rarr;
                </span>
              ) : null}
              <span
                className={
                  destaque
                    ? `${CHIP} tingido ${destaque}`
                    : `${CHIP} border-border text-text`
                }
              >
                {etapa.rotulo}
              </span>
            </li>
          );
        })}
      </ol>

      {condicao && consequencia ? (
        <p className="flex flex-col items-start gap-[12px] pl-[24px] lg:flex-row lg:items-center">
          <span className="flex items-center gap-[6px] font-mono text-[12px] font-medium whitespace-nowrap text-accent-ambar">
            <span aria-hidden="true">&#8627;</span>
            {condicao}
          </span>
          <span aria-hidden="true" className={SETA}>
            &rarr;
          </span>
          <span className={`${CHIP} border-border text-text`}>{consequencia}</span>
        </p>
      ) : null}
    </div>
  );
}

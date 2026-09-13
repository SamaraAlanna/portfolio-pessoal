import { Children, Fragment, type ReactNode } from "react";

/**
 * Dois conteúdos lado a lado, cada um ocupando metade.
 *
 * Existe porque a seção de formulários do VOGE põe o texto de um lado e o bloco de
 * código do outro, em vez de empilhar. Sem isso, transcrever aquele case mudaria o
 * desenho.
 *
 * Com `divisor="true"`, entra um filete em accent entre os dois, que é como a seção de
 * estrutura do Bilheteria separa o antes do depois. O filete é o mesmo elemento da seção
 * de skills da home: linha horizontal no mobile, vertical esticada no desktop.
 *
 * Recebe dois filhos diretos. No mobile empilha, seguindo a regra geral do projeto de
 * grade de duas colunas virar coluna única.
 */
export default function BlocoDuo({
  divisor,
  children,
}: {
  divisor?: string;
  children?: ReactNode;
}) {
  const partes = Children.toArray(children).filter(Boolean);

  if (divisor !== "true") {
    return (
      <div className="grid w-full grid-cols-1 items-center gap-[24px] lg:grid-cols-2">
        {partes.map((parte, indice) => (
          <div key={indice} className="w-full">
            {parte}
          </div>
        ))}
      </div>
    );
  }

  return (
    <div className="flex w-full flex-col items-start lg:flex-row">
      {partes.map((parte, indice) => (
        <Fragment key={indice}>
          {indice > 0 ? (
            <div
              aria-hidden="true"
              className="my-[32px] h-px w-full bg-accent-rosa lg:my-0 lg:h-auto lg:w-px lg:self-stretch"
            />
          ) : null}
          <div
            className={`w-full flex-1 ${indice === 0 ? "lg:pr-[56px]" : "lg:pl-[56px]"}`}
          >
            {parte}
          </div>
        </Fragment>
      ))}
    </div>
  );
}

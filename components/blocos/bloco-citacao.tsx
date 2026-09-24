import type { ReactNode } from "react";

/**
 * Citação. É o padrão de destaque do projeto.
 *
 * Filete de 2px em accent à esquerda, paddingLeft 28, sem fundo, como está em
 * docs/modelos-de-case.md e confirmado nos cases.
 *
 * A primeira linha é a afirmação e vem maior, em 20px e no tom principal. O que vem
 * depois é o desenvolvimento, no tamanho e no tom do corpo. Isso é feito por seletor de
 * primeiro filho, para o autor não precisar marcar nada no MDX.
 *
 * A COR DO FILETE DIZ A CAMADA, e não é decoração. Rosa é o padrão, lavanda é front-end,
 * ciano é back-end e dados, e âmbar é ressalva, para quando a frase avisa de um limite em vez
 * de afirmar um resultado.
 *
 * OS DOIS EXEMPLOS QUE ESTAVAM AQUI SAÍRAM DO SITE EM 2026-09-24, na reescrita dos cases: o
 * âmbar era o "Impacto esperado" do CRUD e o ciano era a integração de leads do VOGE. **O do
 * CRUD além de removido estava errado**, porque dizia que a tela não tinha sido implementada,
 * e ela foi. O bloco ficou sem nenhum uso e a decisão sobre ele é do passo 7.
 */
const FILETES: Record<string, string> = {
  rosa: "border-accent-rosa",
  lavanda: "border-accent-lavanda",
  ciano: "border-accent-ciano",
  ambar: "border-accent-ambar",
};

export default function BlocoCitacao({
  camada,
  tom,
  autor,
  children,
}: {
  camada?: string;
  /**
   * tom="neutro" desliga o realce da primeira linha. Serve para ressalva de um parágrafo
   * só, como o aviso de confidencialidade do Assistente, que sairia com peso de afirmação
   * se herdasse o realce.
   */
  tom?: string;
  autor?: string;
  children?: ReactNode;
}) {
  const realce =
    tom === "neutro"
      ? ""
      : "[&>p:first-child]:text-[20px] [&>p:first-child]:leading-[1.5] [&>p:first-child]:font-medium [&>p:first-child]:text-text";

  return (
    <figure className={`border-l-2 pl-[28px] pt-[4px] pb-[6px] ${FILETES[camada ?? ""] ?? FILETES.rosa}`}>
      <blockquote className={`flex flex-col gap-[12px] text-corpo-case text-text-muted ${realce}`}>
        {children}
      </blockquote>
      {autor ? (
        <figcaption className="mt-[12px] font-mono text-ficha-rotulo text-text-dim">
          {autor}
        </figcaption>
      ) : null}
    </figure>
  );
}

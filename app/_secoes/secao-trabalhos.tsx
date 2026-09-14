import Link from "next/link";
import CardProjetoDestaque from "@/components/ui/card-projeto-destaque";
import CardProjetoCompacto from "@/components/ui/card-projeto-compacto";
import { lerProjetosDaHome } from "@/lib/conteudo";

/**
 * Seção de trabalhos recentes da home.
 *
 * Grade assimétrica: o projeto em destaque ocupa metade, os outros três empilham na outra
 * metade. Quem aparece aqui é decidido pelo campo ordemHome do frontmatter, e não pelos
 * primeiros da listagem, porque no Figma a seleção da home é outra.
 *
 * O `data-cortina` liga a revelação das capas por recorte, e o escopo é a seção de
 * propósito: a regra vive na capa, então ela pega qualquer capa que exista aqui dentro, e
 * só aqui. Solta no `PreviewProjeto`, as oito capas da listagem abririam junto, que é
 * exatamente o escalonamento que o projeto evita. Hoje existe uma capa nesta seção, a do
 * card de destaque, porque o card compacto é só texto.
 */
export default function SecaoTrabalhos() {
  const projetos = lerProjetosDaHome();
  const destaque = projetos.find((projeto) => projeto.destaque) ?? projetos[0];

  if (!destaque) return null;

  const secundarios = projetos.filter((projeto) => projeto.slug !== destaque.slug);

  return (
    // Grade de uma coluna no mobile e de duas linhas no desktop. É ela que permite o
    // link "Todos os projetos" ficar ao lado do rótulo no desktop e depois dos cards no
    // mobile, como está no Figma, sem repetir o link no HTML.
    <section
      data-revelar
      data-cortina
      className="grid grid-cols-1 gap-y-[44px] faixa py-[96px] lg:grid-cols-[1fr_auto] lg:items-center"
    >
      <h2 className="font-mono text-rotulo-secao font-medium text-accent-rosa lg:col-start-1 lg:row-start-1">
        MEUS PROJETOS
      </h2>

      {/* items-stretch e não items-start: no Figma o card de destaque tem 648, que é a
          altura dos três cards da direita somados com os dois espaços de 24. Ele não tem
          altura própria, acompanha a coluna do lado, e as duas terminam na mesma linha. */}
      <div className="flex flex-col items-stretch gap-[24px] lg:col-span-2 lg:row-start-2 lg:flex-row lg:items-stretch">
        <div className="flex flex-1">
          <CardProjetoDestaque projeto={destaque} />
        </div>

        <div className="flex flex-1 flex-col gap-[24px]">
          {secundarios.map((projeto) => (
            <CardProjetoCompacto key={projeto.slug} projeto={projeto} />
          ))}
        </div>
      </div>

      <Link
        href="/projetos"
        className="botao-interativo botao-neutro flex items-center justify-center rounded-full border-[0.5px] px-[22px] py-[10px] text-corpo font-medium whitespace-nowrap lg:col-start-2 lg:row-start-1 lg:justify-self-end"
      >
        Todos os projetos
      </Link>
    </section>
  );
}

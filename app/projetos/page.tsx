import type { Metadata } from "next";
import { metadataDaPagina } from "@/lib/site";
import CardProjeto from "@/components/ui/card-projeto";
import { lerProjetos } from "@/lib/conteudo";
import CabecalhoPagina from "@/components/ui/cabecalho-pagina";
import SecaoGrade from "@/app/projetos/_secoes/secao-grade";

export const metadata: Metadata = metadataDaPagina({
  titulo: "Projetos",
  descricao:
    "Projetos explicados de forma dinâmica e intuitiva para você conhecer a qualidade do meu trabalho.",
  caminho: "/projetos",
});

export default function PaginaProjetos() {
  const projetos = lerProjetos();

  return (
    <>
      {/* Sem rótulo acima do título, como no Contato, no Sobre e na Stack. */}
      <CabecalhoPagina titulo="Meus melhores projetos">
        <p>
          Projetos explicados de forma dinâmica e intuitiva para você conhecer a
          qualidade do meu trabalho.
        </p>
      </CabecalhoPagina>
      <SecaoGrade tagsPorProjeto={projetos.map((projeto) => [...projeto.tags])}>
        {projetos.map((projeto, indice) => (
          <CardProjeto
            key={projeto.slug}
            projeto={projeto}
            prioridade={indice < 3}
          />
        ))}
      </SecaoGrade>
    </>
  );
}

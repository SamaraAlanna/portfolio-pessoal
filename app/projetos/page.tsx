import type { Metadata } from "next";
import { metadataDaPagina } from "@/lib/site";
import CardProjeto from "@/components/ui/card-projeto";
import { lerProjetos } from "@/lib/conteudo";
import CabecalhoPagina from "@/components/ui/cabecalho-pagina";
import SecaoGrade from "@/app/projetos/_secoes/secao-grade";

export const metadata: Metadata = metadataDaPagina({
  titulo: "Projetos",
  descricao:
    "Cada projeto traz o problema, a decisão de design, a decisão técnica e o que ficou de fora.",
  caminho: "/projetos",
});

export default function PaginaProjetos() {
  const projetos = lerProjetos();

  return (
    <>
      <CabecalhoPagina rotulo="PROJETOS" titulo="Meus melhores projetos">
        <p>
          Cada projeto traz o problema, a decisão de design, a decisão técnica e o que
          ficou de fora. Clientes sob acordo de confidencialidade aparecem anonimizados.
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

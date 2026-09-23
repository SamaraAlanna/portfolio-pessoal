import type { Metadata } from "next";
import { metadataDaPagina } from "@/lib/site";
import CabecalhoPagina from "@/components/ui/cabecalho-pagina";
import SecaoGrupos from "@/app/stack/_secoes/secao-grupos";

export const metadata: Metadata = metadataDaPagina({
  titulo: "Stack",
  descricao:
    "Ferramentas e tecnologias, agrupadas pela camada onde atuam.",
  caminho: "/stack",
});

export default function PaginaStack() {
  return (
    <>
      {/* Sem rótulo acima do título, como no Contato e no Sobre. */}
      <CabecalhoPagina titulo="Ferramentas e tecnologias">
        <p>
          Todas as tecnologias e ferramentas que eu consigo aplicar com autonomia.
        </p>
      </CabecalhoPagina>
      <SecaoGrupos />
    </>
  );
}

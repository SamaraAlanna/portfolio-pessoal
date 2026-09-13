import type { Metadata } from "next";
import { metadataDaPagina } from "@/lib/site";
import CabecalhoPagina from "@/components/ui/cabecalho-pagina";
import SecaoGrupos from "@/app/stack/_secoes/secao-grupos";
import SecaoSetup from "@/app/stack/_secoes/secao-setup";

export const metadata: Metadata = metadataDaPagina({
  titulo: "Stack",
  descricao:
    "Ferramentas e tecnologias, agrupadas pela camada onde atuam.",
  caminho: "/stack",
});

export default function PaginaStack() {
  return (
    <>
      <CabecalhoPagina rotulo="STACK" titulo="Ferramentas e tecnologias">
        <p>
          Tudo que eu uso, agrupado pela camada onde atua. A cor de cada grupo segue a
          mesma lógica do resto do site: rosa é produto e design, lavanda é front-end,
          ciano é back-end e dados, âmbar é entrega e operação.
        </p>
      </CabecalhoPagina>
      <SecaoGrupos />
      <SecaoSetup />
    </>
  );
}

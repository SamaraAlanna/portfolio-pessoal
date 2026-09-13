import type { Metadata } from "next";
import { metadataDaPagina } from "@/lib/site";
import CabecalhoPagina from "@/components/ui/cabecalho-pagina";
import SecaoCanais from "@/app/contato/_secoes/secao-canais";
import SecaoFormulario from "@/app/contato/_secoes/secao-formulario";

export const metadata: Metadata = metadataDaPagina({
  titulo: "Contato",
  descricao:
    "Respondo em até 2 dias úteis. Prefiro conversar por escrito.",
  caminho: "/contato",
});

export default function PaginaContato() {
  return (
    <>
      <CabecalhoPagina rotulo="CONTATO" titulo="Vamos construir alguma coisa">
        <p>Respondo em até 2 dias úteis. Prefiro conversar por escrito.</p>
      </CabecalhoPagina>

      <section data-revelar className="faixa grid grid-cols-1 items-start gap-[64px] pb-[96px] lg:grid-cols-2">
        <SecaoCanais />
        <SecaoFormulario />
      </section>
    </>
  );
}

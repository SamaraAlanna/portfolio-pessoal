import type { Metadata } from "next";
import { metadataDaPagina } from "@/lib/site";
import CabecalhoPagina from "@/components/ui/cabecalho-pagina";
import SecaoCanais from "@/app/contato/_secoes/secao-canais";
import SecaoMotivos from "@/app/contato/_secoes/secao-motivos";
import SecaoBorda from "@/app/contato/_secoes/secao-borda";

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

      {/* O formulário saiu daqui e volta na fase dois, quando existir rota de API
          própria. O que ele era está registrado no CLAUDE.md.

          As três seções ocupam a faixa inteira: os canais em três cartões, os motivos em
          quatro colunas e a ponte para o BORDA fechando. Não há mais largura de espera. */}
      <div data-revelar className="faixa flex flex-col gap-[64px] pb-[96px]">
        <SecaoCanais />
        <SecaoMotivos />
        <SecaoBorda />
      </div>
    </>
  );
}

import type { Metadata } from "next";
import { metadataDaPagina } from "@/lib/site";
import CabecalhoPagina from "@/components/ui/cabecalho-pagina";
import SecaoCanais from "@/app/contato/_secoes/secao-canais";
import SecaoFormulario from "@/app/contato/_secoes/secao-formulario";
import SecaoBorda from "@/app/contato/_secoes/secao-borda";

export const metadata: Metadata = metadataDaPagina({
  titulo: "Contato",
  descricao: "Canais diretos e formulário. Respondo em até 2 dias úteis.",
  caminho: "/contato",
});

export default function PaginaContato() {
  return (
    <>
      {/* Sem rótulo acima do título, diferente de Projetos e Stack. */}
      <CabecalhoPagina titulo="Vamos construir alguma coisa">
        <p>Respondo em até 2 dias úteis.</p>
      </CabecalhoPagina>

      {/* DUAS COLUNAS, COMO NO FIGMA: os canais e a ponte para o BORDA de um lado, o
          formulário do outro. São 568 e 568 com 64 de intervalo, que somam os 1200 da
          faixa.

          A ORDEM NO HTML É A DO MOBILE, e a grade reposiciona no desktop. Empilhado, a
          leitura é canais, formulário e ponte: quem só quer o endereço resolve na primeira
          tela, quem vai escrever encontra o formulário em seguida, e a ponte para o estúdio
          fecha, que é o papel dela. No desktop a ponte sobe para debaixo dos canais, onde o
          Figma a coloca.

          O `1fr` na segunda linha é o que impede um vão. O formulário atravessa as duas
          linhas e é bem mais alto que a coluna da esquerda; com duas linhas `auto` a sobra
          seria repartida entre elas e metade abriria um buraco entre os canais e a ponte.
          Com uma linha flexível, toda a sobra vai para ela. É a mesma armadilha do
          cabeçalho do Sobre, registrada no CLAUDE.md. */}
      <div
        data-revelar
        className="faixa grid grid-cols-1 gap-[56px] pb-[96px] lg:grid-cols-2 lg:grid-rows-[auto_1fr] lg:gap-x-[64px] lg:gap-y-[24px]"
      >
        <div className="lg:col-start-1 lg:row-start-1 lg:self-start">
          <SecaoCanais />
        </div>

        <div className="lg:col-start-2 lg:row-start-1 lg:row-span-2 lg:self-start">
          <SecaoFormulario />
        </div>

        <div className="lg:col-start-1 lg:row-start-2 lg:self-start">
          <SecaoBorda />
        </div>
      </div>
    </>
  );
}

import type { Metadata } from "next";
import { metadataDaPagina } from "@/lib/site";
import SecaoCabecalho from "@/app/sobre/_secoes/secao-cabecalho";
import SecaoExperiencia from "@/app/sobre/_secoes/secao-experiencia";
import SecaoFormacao from "@/app/sobre/_secoes/secao-formacao";
import SecaoCertificacoes from "@/app/sobre/_secoes/secao-certificacoes";
import SecaoIdiomas from "@/app/sobre/_secoes/secao-idiomas";

/**
 * A PÁGINA REGENERA UMA VEZ POR DIA, e a única razão é a idade da bio.
 *
 * Sem isso ela é estática e o número só mudaria num deploy novo, então um aniversário sem
 * push deixaria a idade errada por tempo indeterminado. Com `revalidate`, o Next reconstrói
 * no primeiro acesso depois da janela vencer.
 *
 * O CUSTO É QUASE NADA, E DÁ PARA AFIRMAR ISSO: a documentação da Vercel diz que
 * revalidação cujo resultado não mudou **não gera unidade de escrita**. Como o único trecho
 * variável da página é um inteiro que muda uma vez por ano, em 364 dos 365 dias a saída é
 * idêntica à anterior.
 *
 * A DATA NÃO ENTRA NA SAÍDA, só o inteiro. A mesma documentação alerta contra `new Date()`
 * no resultado de uma página com ISR, porque conteúdo que muda a cada regeneração gera
 * escrita todo dia.
 */
export const revalidate = 86400;

export const metadata: Metadata = metadataDaPagina({
  titulo: "Sobre",
  descricao:
    "UX/UI Designer e Desenvolvedora Full Stack Pleno, aberta a oportunidades remotas. Trajetória, experiência, formação e certificações.",
  caminho: "/sobre",
});

export default function PaginaSobre() {
  return (
    <>
      <SecaoCabecalho />
      <SecaoExperiencia />
      <SecaoFormacao />
      <SecaoCertificacoes />
      <SecaoIdiomas />
    </>
  );
}

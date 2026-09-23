import type { Metadata } from "next";
import { metadataDaPagina } from "@/lib/site";
import SecaoCabecalho from "@/app/sobre/_secoes/secao-cabecalho";
import SecaoExperiencia from "@/app/sobre/_secoes/secao-experiencia";
import SecaoFormacao from "@/app/sobre/_secoes/secao-formacao";
import SecaoCertificacoes from "@/app/sobre/_secoes/secao-certificacoes";
import SecaoCta from "@/app/sobre/_secoes/secao-cta";

export const metadata: Metadata = metadataDaPagina({
  titulo: "Sobre",
  descricao:
    "UX/UI Designer e Desenvolvedora Full Stack. Trajetória, experiência, formação e certificações.",
  caminho: "/sobre",
});

export default function PaginaSobre() {
  return (
    <>
      <SecaoCabecalho />
      <SecaoExperiencia />
      <SecaoFormacao />
      <SecaoCertificacoes />
      <SecaoCta />
    </>
  );
}

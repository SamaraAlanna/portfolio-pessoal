import SecaoHero from "@/app/_secoes/secao-hero";
import SecaoSkills from "@/app/_secoes/secao-skills";
import SecaoTrabalhos from "@/app/_secoes/secao-trabalhos";
import SecaoSobre from "@/app/_secoes/secao-sobre";

export default function Home() {
  return (
    <>
      <SecaoHero />
      <SecaoSkills />
      <SecaoTrabalhos />
      <SecaoSobre />
    </>
  );
}

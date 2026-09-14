import SecaoHero from "@/app/_secoes/secao-hero";
import SecaoSkills from "@/app/_secoes/secao-skills";
import SecaoTrabalhos from "@/app/_secoes/secao-trabalhos";
import SecaoSobre from "@/app/_secoes/secao-sobre";

export default function Home() {
  return (
    <>
      {/* O hero fica preso e a seção de skills sobe por cima dele, como folha sobre
          folha. O invólucro é o que contém o efeito: sem ele o hero grudaria até o fim do
          main, ou seja, a página inteira. Com ele, desgruda quando a skills acaba.

          A sentinela de altura zero fica na fronteira entre as duas, no lugar de fluxo do
          hero. Quando ela passa para cima da viewport, a skills cobriu o hero, e é isso
          que desliga a animação das luzes. Interseção sozinha não serve: preso, o hero
          continua intersectando mesmo coberto. */}
      <div className="hero-pilha">
        <SecaoHero />
        <span aria-hidden="true" id="fim-do-hero" className="block h-0" />
        <SecaoSkills />
      </div>
      <SecaoTrabalhos />
      <SecaoSobre />
    </>
  );
}

import Link from "next/link";

/**
 * Seção "Quem sou eu" da home.
 *
 * A bio de um lado e o bloco whoami do outro, que é a mesma ideia de alternância entre
 * design e código aplicada ao texto sobre a pessoa.
 *
 * O bloco whoami recorta conteúdo para arredondar o canto da titlebar, e isso é seguro
 * aqui porque não há nada focável dentro dele.
 *
 * NO MOBILE ELE EMPILHA ABAIXO DA BIO, e não some. No Figma ele não aparece na versão
 * mobile, mas isso foi consequência da adaptação de layout e não decisão de conteúdo,
 * confirmado com a Samara. Escondê-lo deixaria o celular, que é por onde a maioria entra,
 * vendo só a metade "design" da alternância que é o conceito do site.
 */
const whoami: [string, string][] = [
  ["nome", "Samara Alanna"],
  ["onde", "Colombo, Paraná, Brasil"],
  ["formação", "Análise e Desenvolvimento de Sistemas"],
  ["formação", "Design Gráfico"],
  ["estúdio", "BORDA Design"],
  ["comunidade", "Tech Girls, administradora"],
];

export default function SecaoSobre() {
  return (
    // Mesmo arranjo da seção de trabalhos: no mobile o link vai para depois do conteúdo.
    <section data-revelar className="grid grid-cols-1 gap-y-[44px] faixa py-[104px] lg:grid-cols-[1fr_auto] lg:items-center">
      <h2 className="font-mono text-rotulo-secao font-medium text-accent-rosa lg:col-start-1 lg:row-start-1">
        QUEM SOU EU
      </h2>

      <div className="flex flex-col items-stretch gap-[40px] lg:col-span-2 lg:row-start-2 lg:flex-row lg:items-center lg:gap-[80px]">
        <div className="flex flex-1 flex-col justify-center gap-[15px] text-bio text-text-muted">
          <p>
            Oi de novo! Sou a Samara Alanna, UX/UI Designer e Desenvolvedora Full Stack.
            Faço duas graduações, uma em desenvolvimento e outra em design, e é dessa
            combinação que vem o meu trabalho: desenho a interface e depois construo ela.
          </p>
          <p>
            Sou estagiária em Design Multimídia na TecSinapse, toco meu estúdio BORDA
            Design e sou voluntária na Tech Girls, uma comunidade acolhedora e segura para
            mulheres em TI. Tenho 20 anos, sou mãe de um gato chamado Dio e gosto muito de
            jogos online ;)
          </p>
        </div>

        <div className="flex flex-1 flex-col overflow-hidden rounded-[12px] border-[0.5px] border-accent-rosa bg-surface">
          <div className="flex w-full items-center gap-[8px] bg-surface-2 px-[22px] py-[16px] font-mono text-copyright font-medium">
            <span className="text-accent-rosa">$</span>
            <span className="text-text">whoami</span>
          </div>

          <dl className="flex w-full flex-col gap-[13px] px-[22px] pt-[22px] pb-[24px] font-mono text-terminal">
            {whoami.map(([rotulo, valor], indice) => (
              <div key={`${rotulo}-${indice}`} className="flex w-full gap-[14px]">
                <dt className="w-[92px] shrink-0 text-text-dim">{rotulo}</dt>
                <dd className="flex-1 leading-[1.5] text-text">{valor}</dd>
              </div>
            ))}
          </dl>
        </div>
      </div>

      <Link
        href="/sobre"
        className="alvo-toque-vertical text-corpo font-medium text-text lg:col-start-2 lg:row-start-1 lg:justify-self-end"
      >
        Minha trajetória completa <span className="text-accent-rosa">&rarr;</span>
      </Link>
    </section>
  );
}

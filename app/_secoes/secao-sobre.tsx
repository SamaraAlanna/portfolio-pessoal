import Link from "next/link";
import type { CSSProperties } from "react";

/**
 * Seção "Quem sou eu" da home.
 *
 * A bio de um lado e o bloco whoami do outro, que é a mesma ideia de alternância entre
 * design e código aplicada ao texto sobre a pessoa.
 *
 * O bloco whoami recorta conteúdo para arredondar o canto da titlebar, e isso é seguro
 * aqui porque não há nada focável dentro dele.
 *
 * A digitação e o cursor só existem a partir de 64rem. Abaixo disso o card fica estreito
 * e os valores longos quebram em duas linhas, e um recorte que abre da esquerda para a
 * direita sobre texto quebrado revela as duas linhas ao mesmo tempo, coluna a coluna, o que
 * não parece digitação nenhuma.
 *
 * NO MOBILE ELE EMPILHA ABAIXO DA BIO, e não some. No Figma ele não aparece na versão
 * mobile, mas isso foi consequência da adaptação de layout e não decisão de conteúdo,
 * confirmado com a Samara. Escondê-lo deixaria o celular, que é por onde a maioria entra,
 * vendo só a metade "design" da alternância que é o conceito do site.
 */
/**
 * A digitação do whoami.
 *
 * O ritmo sai do próprio dado: cada linha dura o número de caracteres dela vezes o tempo
 * por caractere, e a seguinte começa quando a anterior termina, mais uma pausa curta.
 * Digitar as seis ao mesmo tempo não pareceria digitação.
 *
 * TEMPO NENHUM MORA AQUI, E ISSO É DE PROPÓSITO. Daqui saem só contagens: quantos
 * caracteres a linha tem, e quantos caracteres e quantas linhas vieram antes dela. Quem
 * multiplica contagem por tempo é o CSS, nos tokens `--dur-caractere` e
 * `--intervalo-linha`.
 *
 * O tempo por caractere já foi uma constante deste arquivo e estava escrito de novo no
 * CSS, em dois lugares que precisavam concordar. Mudar a velocidade pedia mexer nos dois,
 * e errar um deles descolava o cursor do fim da última linha sem quebrar nada visível,
 * que é o tipo de defeito que ninguém encontra procurando.
 */

const whoami: [string, string][] = [
  ["nome", "Samara Alanna"],
  ["onde", "Colombo, Paraná, Brasil"],
  ["formação", "Análise e Desenvolvimento de Sistemas"],
  ["formação", "Design Gráfico"],
  ["estúdio", "BORDA Design"],
  ["comunidade", "Tech Girls, administradora"],
];

/**
 * Cada linha começa quando todas as anteriores terminaram. O que ela precisa saber para
 * isso são duas contagens acumuladas: os caracteres que já foram digitados antes dela, e
 * quantas pausas de fim de linha já aconteceram, que é o próprio índice. Calculado uma vez
 * no módulo, porque sai de uma constante e não muda entre renderizações.
 */
const linhas = whoami.map(([rotulo, valor], indice) => ({
  rotulo,
  valor,
  caracteresAntes: whoami
    .slice(0, indice)
    .reduce((total, [, anterior]) => total + anterior.length, 0),
  linhasAntes: indice,
}));

/** O cursor só aparece quando a última linha termina, ou seja depois de tudo. */
const caracteresTotal = whoami.reduce(
  (total, [, valor]) => total + valor.length,
  0,
);

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

        <div
          data-pausar-fora="dentro"
          className="flex flex-1 flex-col overflow-hidden rounded-[12px] border-[0.5px] border-accent-rosa bg-surface"
        >
          <div className="flex w-full items-center gap-[8px] bg-surface-2 px-[22px] py-[16px] font-mono text-copyright font-medium">
            <span className="text-accent-rosa">$</span>
            <span className="text-text">whoami</span>
          </div>

          {/* O valor é digitado por recorte, e não por largura: o texto ocupa o lugar
              final desde o primeiro quadro e o que anima é o clip-path. Como a fonte é
              monoespaçada, o steps com o número de caracteres faz o recorte parar na
              fronteira exata de cada glifo.

              As contagens viajam em variável, porque saem do dado. O tempo que multiplica
              cada uma delas mora no CSS, dentro do media query de movimento reduzido:
              assim nada some quando a animação não existe, e a velocidade se ajusta num
              token só. */}
          <dl className="flex w-full flex-col gap-[13px] px-[22px] pt-[22px] pb-[24px] font-mono text-terminal">
            {linhas.map(({ rotulo, valor, caracteresAntes, linhasAntes }, indice) => (
              <div key={`${rotulo}-${indice}`} className="flex w-full gap-[14px]">
                <dt className="w-[92px] shrink-0 text-text-dim">{rotulo}</dt>
                <dd className="flex-1 leading-[1.5] text-text">
                  <span
                    className="whoami-valor"
                    style={
                      {
                        "--caracteres": String(valor.length),
                        "--caracteres-antes": String(caracteresAntes),
                        "--linhas-antes": String(linhasAntes),
                      } as CSSProperties
                    }
                  >
                    {valor}
                  </span>
                  {indice === linhas.length - 1 ? (
                    <span
                      aria-hidden="true"
                      className="whoami-cursor"
                      style={
                        {
                          "--caracteres-antes": String(caracteresTotal),
                          "--linhas-antes": String(linhas.length),
                        } as CSSProperties
                      }
                    />
                  ) : null}
                </dd>
              </div>
            ))}
          </dl>
        </div>
      </div>

      <Link
        href="/sobre"
        className="botao-interativo botao-contorno flex items-center justify-center rounded-full border-[0.5px] border-accent-rosa px-[22px] py-[10px] text-corpo font-medium whitespace-nowrap text-accent-rosa lg:col-start-2 lg:row-start-1 lg:justify-self-end"
      >
        Minha trajetória completa
      </Link>
    </section>
  );
}

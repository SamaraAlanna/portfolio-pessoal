import { motivos } from "@/conteudo/contato";

/**
 * O que faz sentido me procurar.
 *
 * Existe para qualificar o contato antes de a pessoa escrever. Sem isso a página oferece
 * três endereços e nenhuma pista do que cabe mandar para eles.
 *
 * O DESENHO É O DAS CERTIFICAÇÕES DO SOBRE: filete em accent no topo, título e uma linha
 * de texto, sem borda e sem fundo. Ele é mais leve que os cartões dos canais logo acima, e
 * é isso que faz as duas seções não competirem.
 *
 * TODOS OS FILETES EM ROSA, de propósito. No sistema a cor significa camada, e vaga,
 * projeto, mentoria e comunidade não são camadas. Pintar cada uma de uma cor usaria o
 * vocabulário do sistema para dizer uma coisa que ele não diz.
 */
export default function SecaoMotivos() {
  return (
    <section className="flex w-full flex-col gap-[28px]">
      <h2 className="font-mono text-rotulo-secao font-medium text-accent-rosa">
        QUANDO ME CHAMAR
      </h2>

      <ul className="grid grid-cols-1 items-start gap-[24px] sm:grid-cols-2 lg:grid-cols-4">
        {motivos.map((motivo) => (
          <li
            key={motivo.titulo}
            className="flex flex-col items-start gap-[12px] border-t-[1.5px] border-accent-rosa pt-[20px] pr-[8px]"
          >
            <h3 className="text-corpo font-bold text-text">{motivo.titulo}</h3>
            <p className="text-card-descricao leading-[1.55] text-text-muted">
              {motivo.texto}
            </p>
          </li>
        ))}
      </ul>
    </section>
  );
}

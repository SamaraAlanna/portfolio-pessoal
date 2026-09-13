import { setup } from "@/conteudo/stack";

/**
 * Setup de trabalho, em linhas com separador.
 *
 * A última linha, do supervisor felino, sai em tom mais discreto de propósito: é piada e
 * não especificação, e o peso menor é o que deixa isso claro sem precisar avisar.
 */
export default function SecaoSetup() {
  return (
    <section data-revelar className="faixa pb-[72px]">
      <h2 className="font-mono text-rotulo-secao font-medium text-accent-rosa">
        SETUP DE TRABALHO
      </h2>

      <dl className="mt-[40px] flex w-full flex-col border-t-[0.5px] border-border">
        {setup.map((linha) => (
          <div
            key={linha.item}
            className="flex w-full flex-col gap-[4px] border-b-[0.5px] border-border py-[18px] sm:flex-row sm:items-center sm:justify-between sm:gap-[24px]"
          >
            <dt className="flex-1 text-[15.5px] font-medium text-text">{linha.item}</dt>
            <dd
              className={`font-mono text-cta sm:w-[440px] sm:text-right ${
                linha.leve ? "text-text-muted" : "font-medium text-accent-rosa"
              }`}
            >
              {linha.valor}
            </dd>
          </div>
        ))}
      </dl>
    </section>
  );
}

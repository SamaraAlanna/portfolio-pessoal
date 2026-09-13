import { assuntos } from "@/conteudo/contato";

/**
 * Formulário de contato.
 *
 * ENVIO DESLIGADO, DE PROPÓSITO. Não existe destino para a mensagem: o projeto não tem
 * back-end nem serviço de formulário, e resolver isso não estava no escopo. Um formulário
 * que aceita envio e joga fora é pior que um desligado, porque a pessoa acredita que
 * mandou. Então o botão está desabilitado e há um aviso visível ao lado dele.
 *
 * A marcação já fica pronta para quando o envio existir: cada campo tem rótulo associado
 * por id, o select tem placeholder e os tipos estão certos. Quando houver destino, é
 * ligar o onSubmit, tirar o disabled e remover o aviso.
 *
 * OS ASSUNTOS DO SELECT NÃO ESTÃO NO FIGMA. Lá existe só o placeholder "Selecione um
 * assunto". Enquanto a lista não vier, o select fica com o placeholder sozinho.
 */
// A borda usa o token border-campo, e não a border comum. Campo é componente interativo e
// o limite dele precisa de 3:1, enquanto a border de card fica em 1,2 de propósito. Isso
// deixa os campos mais visíveis que no Figma, e é intencional.
const CAMPO =
  "w-full rounded-[8px] border-[0.5px] border-border-campo bg-surface px-[18px] py-[16px] text-corpo text-text placeholder:text-text-dim";

const ROTULO =
  "font-mono text-titlebar font-medium tracking-[var(--tracking-titlebar)] text-text-muted";

export default function SecaoFormulario() {
  return (
    <form aria-labelledby="titulo-formulario" className="flex w-full flex-col gap-[20px]">
      <h2 id="titulo-formulario" className="sr-only">
        Formulário de contato
      </h2>
      <div className="flex flex-col gap-[9px]">
        <label htmlFor="nome" className={ROTULO}>
          NOME
        </label>
        <input id="nome" name="nome" type="text" placeholder="Como devo te chamar" className={CAMPO} />
      </div>

      <div className="flex flex-col gap-[9px]">
        <label htmlFor="email" className={ROTULO}>
          EMAIL
        </label>
        <input id="email" name="email" type="email" placeholder="seu@email.com" className={CAMPO} />
      </div>

      <div className="flex flex-col gap-[9px]">
        <label htmlFor="assunto" className={ROTULO}>
          ASSUNTO
        </label>
        <select id="assunto" name="assunto" defaultValue="" className={CAMPO}>
          <option value="" disabled>
            Selecione um assunto
          </option>
          {assuntos.map((assunto) => (
            <option key={assunto} value={assunto}>
              {assunto}
            </option>
          ))}
        </select>
      </div>

      <div className="flex flex-col gap-[9px]">
        <label htmlFor="mensagem" className={ROTULO}>
          MENSAGEM
        </label>
        <textarea
          id="mensagem"
          name="mensagem"
          rows={5}
          placeholder="Conta o contexto e o que você precisa"
          className={CAMPO}
        />
      </div>

      <div className="flex flex-wrap items-center gap-[16px]">
        {/* O aviso descreve o botão, então ele é ligado por aria-describedby. Sem isso,
            quem usa leitor de tela encontra um botão desabilitado sem saber por quê. */}
        <button
          type="submit"
          disabled
          aria-describedby="aviso-envio"
          className="rounded-full bg-accent-rosa px-[30px] py-[16px] text-corpo font-medium text-bg disabled:opacity-50"
        >
          enviar mensagem
        </button>
        <p id="aviso-envio" className="text-cta text-text-muted">
          O envio ainda não está ligado. Use os canais diretos ao lado.
        </p>
      </div>
    </form>
  );
}

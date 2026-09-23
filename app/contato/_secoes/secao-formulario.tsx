import { assuntos } from "@/conteudo/contato";
import CampoTelefone from "@/components/ui/campo-telefone";

/**
 * Formulário de contato.
 *
 * ENVIO DESLIGADO, DE PROPÓSITO, e o destino é decisão de outro momento. Não existe rota
 * de API nem serviço, e **um formulário que aceita envio e joga fora é pior que um
 * desligado**, porque a pessoa acredita que mandou e fica esperando resposta. Então o
 * botão está desabilitado e existe um aviso visível.
 *
 * A marcação já fica pronta: cada campo tem rótulo associado por `id`, os tipos e os
 * `autoComplete` estão certos, e o select tem placeholder. Quando houver destino, é ligar
 * o `action`, tirar o `disabled` e remover o aviso.
 *
 * O AVISO VEM ANTES DO BOTÃO NO HTML, e isso não é detalhe de estilo. Botão desabilitado
 * não recebe foco, então quem navega por teclado nunca chega nele e o `aria-describedby`
 * sozinho não seria lido. Na ordem de leitura, o aviso aparece primeiro e explica o botão
 * morto antes de a pessoa esbarrar nele. O `aria-describedby` fica assim mesmo, porque
 * leitor de tela alcança o botão por outros caminhos que não o Tab.
 *
 * ENTER NÃO ENVIA, E ISSO É DE GRAÇA. O envio implícito do HTML aciona o botão de envio
 * padrão, e um botão desabilitado não tem comportamento de ativação. Sem isso o formulário
 * faria GET na própria rota e **a mensagem inteira apareceria na barra de endereço**.
 *
 * O TELEFONE É O ÚNICO CAMPO OPCIONAL. Quem prefere escrever não deveria ser obrigado a
 * dar telefone para mandar uma mensagem, e o rótulo diz isso em texto, e não por asterisco,
 * que precisa de legenda para significar alguma coisa.
 */

/**
 * A borda usa o `--border-forte`, e não a `--border` comum. Campo é componente interativo
 * e o limite dele precisa de 3:1, enquanto a `--border` fica em 1,2 de propósito, porque
 * em card ela é decoração e o card se identifica pelo fundo. Isso deixa os campos mais
 * visíveis que no Figma, e é intencional.
 */
const CAMPO =
  "w-full rounded-[8px] border-[0.5px] border-border-forte bg-surface px-[18px] py-[16px] text-corpo text-text placeholder:text-text-dim";

const ROTULO =
  "font-mono text-titlebar font-medium tracking-[var(--tracking-titlebar)] text-text-muted";

export default function SecaoFormulario() {
  return (
    <form
      aria-labelledby="titulo-formulario"
      className="flex w-full flex-col gap-[20px]"
    >
      {/* O Figma não põe título no formulário, e a coluna ao lado já se chama CANAIS
          DIRETOS. Só para leitor de tela, senão esta região ficaria sem nome. */}
      <h2 id="titulo-formulario" className="sr-only">
        Formulário de contato
      </h2>

      <div className="flex flex-col gap-[9px]">
        <label htmlFor="nome" className={ROTULO}>
          NOME
        </label>
        <input
          id="nome"
          name="nome"
          type="text"
          autoComplete="name"
          required
          placeholder="Como devo te chamar"
          className={CAMPO}
        />
      </div>

      <div className="flex flex-col gap-[9px]">
        <label htmlFor="email" className={ROTULO}>
          EMAIL
        </label>
        <input
          id="email"
          name="email"
          type="email"
          autoComplete="email"
          required
          placeholder="seu@email.com"
          className={CAMPO}
        />
      </div>

      <div className="flex flex-col gap-[9px]">
        <label htmlFor="telefone" className={ROTULO}>
          TELEFONE <span className="text-text-dim">(opcional)</span>
        </label>
        <CampoTelefone id="telefone" name="telefone" className={CAMPO} />
      </div>

      <div className="flex flex-col gap-[9px]">
        <label htmlFor="assunto" className={ROTULO}>
          ASSUNTO
        </label>
        <select id="assunto" name="assunto" defaultValue="" required className={CAMPO}>
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
          required
          placeholder="Conta o contexto e o que você precisa"
          className={CAMPO}
        />
      </div>

      <div className="flex flex-col items-start gap-[14px]">
        <p id="aviso-envio" className="text-cta text-text-muted">
          O envio ainda não está ligado. Use os canais diretos desta página.
        </p>

        <button
          type="submit"
          disabled
          aria-describedby="aviso-envio"
          className="rounded-full bg-accent-rosa px-[30px] py-[16px] text-corpo font-medium text-bg disabled:opacity-50"
        >
          enviar mensagem
        </button>
      </div>
    </form>
  );
}

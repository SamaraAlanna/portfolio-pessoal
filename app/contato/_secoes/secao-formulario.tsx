"use client";

import { useActionState, useEffect, useRef } from "react";
import { assuntos } from "@/conteudo/contato";
import { enviarMensagem } from "@/app/contato/acoes";
import {
  CAMPO_ARMADILHA,
  CAMPO_CARIMBO,
  ESTADO_INICIAL,
  ORDEM_DOS_CAMPOS,
  ROTULO_DO_CAMPO,
} from "@/lib/contato";

/**
 * Formulário de contato.
 *
 * ELE VIROU CLIENT COMPONENT EM 2026-09-25, e antes era server. O `useActionState` é o que
 * dá erro por campo, estado de enviando e estado de enviado, e ele é hook. Não é
 * JavaScript novo na rota: o `CampoTelefone` já era client e a página já tinha fronteira
 * de cliente. **Hoje o telefone saiu e este arquivo é o único client da página.**
 *
 * FUNCIONA SEM JAVASCRIPT, e isso é requisito, não bônus. Quem envia com o script
 * desligado passa pela mesma Server Action, e o servidor re-renderiza a página com os
 * erros e com os campos repreenchidos pelos `valores` do estado. É por isso que cada campo
 * tem `defaultValue` em vez de `value`: sem script não existe re-render no cliente para
 * manter o que foi digitado.
 *
 * O TELEFONE SAIU EM 2026-09-25, por minimização de dado. Ele era o único campo opcional e
 * nunca existiu no Figma, que sempre desenhou quatro campos. Pedir telefone para receber
 * uma mensagem é guardar mais dado do que o necessário para responder, e o e-mail já
 * responde. O `components/ui/campo-telefone.tsx` foi apagado junto, porque não tinha outro
 * uso.
 *
 * O `required` E O `maxLength` FICAM, e agora são exercidos de verdade. Eles são
 * conveniência de quem digita, nunca defesa: a validação que conta é a do
 * `lib/contato.ts`, que roda no servidor e não confia em nada daqui.
 */

const CAMPO =
  "w-full rounded-[8px] border-[0.5px] border-border-forte bg-surface px-[18px] py-[16px] text-corpo text-text placeholder:text-text-dim aria-[invalid=true]:border-accent-ambar";

const ROTULO =
  "font-mono text-titlebar font-medium tracking-[var(--tracking-titlebar)] text-text-muted";

const ERRO = "text-cta text-accent-ambar";

export default function SecaoFormulario() {
  const [estado, acao, pendente] = useActionState(enviarMensagem, ESTADO_INICIAL);

  const refResumo = useRef<HTMLDivElement>(null);
  const refConfirmacao = useRef<HTMLDivElement>(null);
  const refCarimbo = useRef<HTMLInputElement>(null);

  /**
   * O carimbo é escrito aqui, e não no HTML.
   *
   * A `/contato` é pré-renderizada estática, então um valor escrito na marcação seria o
   * horário do build. O porquê disso importar está comentado no `acoes.ts`, junto da
   * conferência.
   *
   * ESCRITA DIRETO NO DOM, e não `setState`. O valor não muda nada na tela, então guardá-lo
   * em estado traria uma renderização a mais sem efeito visível, e `setState` dentro de
   * efeito é o padrão que o ESLint deste projeto proíbe. É a mesma escolha já registrada no
   * `TrilhoRolavel`.
   */
  useEffect(() => {
    if (refCarimbo.current) {
      refCarimbo.current.value = String(Date.now());
    }
  }, []);

  /**
   * O FOCO VAI PARA O RESUMO DE ERRO, E NÃO PARA O PRIMEIRO CAMPO INVÁLIDO.
   *
   * Focar o campo diria "conserta este" sem dizer quantos outros faltam, e quem usa leitor
   * de tela ouviria um erro e descobriria os demais um a um, submetendo de novo. O resumo
   * anuncia a lista inteira e cada item é um link para o campo, que é o padrão de resumo de
   * erro consagrado. **Se você preferir o campo, é trocar esta linha pelo `focus()` do
   * primeiro item de `ORDEM_DOS_CAMPOS` que tiver erro.**
   *
   * NA CONFIRMAÇÃO O FOCO É OBRIGATÓRIO, e não refinamento: o formulário inteiro sai do
   * DOM, o botão que tinha o foco vai junto, e sem isso o foco cai no `body`. Quem navega
   * por teclado voltaria ao topo da página sem saber que a mensagem foi enviada.
   *
   * Nenhum dos dois blocos tem `role="status"` ou `role="alert"`: mover o foco já faz o
   * leitor de tela anunciar o conteúdo, e somar região viva anunciaria duas vezes.
   */
  useEffect(() => {
    if (estado.situacao === "erro") {
      refResumo.current?.focus();
    }
    if (estado.situacao === "enviado") {
      refConfirmacao.current?.focus();
    }
  }, [estado]);

  if (estado.situacao === "enviado") {
    return (
      <section className="flex w-full flex-col gap-[20px]">
        <h2 id="titulo-formulario" className="sr-only">
          Formulário de contato
        </h2>

        <div
          ref={refConfirmacao}
          tabIndex={-1}
          className="tingido flex flex-col gap-[10px] rounded-[8px] border-[0.5px] border-accent-rosa p-[24px] [--cor-tint:var(--tint-rosa)]"
        >
          {/* Rosa, e não âmbar. No sistema âmbar é ressalva, e confirmar um envio que deu
              certo não é ressalva nenhuma. Rosa é a cor de ação do site, a mesma do botão
              que acabou de ser apertado, então a confirmação responde na cor do gesto.

              O texto em accent sobre fundo tingido exige `--surface` opaco embaixo, que é o
              que a `.tingido` faz. Regra endurecida em 2026-09-24 e registrada no
              CLAUDE.md: sobre `--surface-2` ou direto sobre o `--bg` a medição reprova ou
              passa no piso exato. */}
          <p className="font-mono text-titlebar font-medium tracking-[var(--tracking-titlebar)] text-accent-rosa">
            MENSAGEM ENVIADA
          </p>
          <p className="text-corpo text-text">
            Recebi sua mensagem e respondo no e-mail que você deixou. Se for urgente, os
            canais diretos estão aqui do lado.
          </p>
        </div>
      </section>
    );
  }

  const temErroDeCampo = ORDEM_DOS_CAMPOS.some((campo) => estado.erros[campo]);

  return (
    <form
      action={acao}
      aria-labelledby="titulo-formulario"
      className="relative flex w-full flex-col gap-[20px]"
    >
      {/* O Figma não põe título no formulário, e a coluna ao lado já se chama CANAIS
          DIRETOS. Só para leitor de tela, senão esta região ficaria sem nome. */}
      <h2 id="titulo-formulario" className="sr-only">
        Formulário de contato
      </h2>

      {/* ARMADILHA PARA ROBÔ.

          NÃO É `type="hidden"`, de propósito: robô que varre o formulário costuma pular
          campo escondido por tipo, e é justamente ele que precisa cair aqui. É um campo de
          texto normal, tirado da tela por posição, fora da ordem de tabulação e escondido
          de leitor de tela pelo `aria-hidden`.

          O nome "empresa" é plausível o bastante para um preenchedor automático tentar.
          Quem preencher recebe uma confirmação de envio e não manda nada, e o porquê de
          fingir sucesso está comentado no `acoes.ts`.

          O `autoComplete="off"` é para o navegador de gente de verdade não preencher
          sozinho e transformar visitante em robô aos olhos do servidor. */}
      <div
        aria-hidden="true"
        className="pointer-events-none absolute left-[-9999px] top-0 h-px w-px overflow-hidden"
      >
        <label htmlFor={CAMPO_ARMADILHA}>Empresa</label>
        <input
          id={CAMPO_ARMADILHA}
          name={CAMPO_ARMADILHA}
          type="text"
          tabIndex={-1}
          autoComplete="off"
        />
      </div>

      <input ref={refCarimbo} type="hidden" name={CAMPO_CARIMBO} defaultValue="" />

      {estado.situacao === "erro" && (
        <div
          ref={refResumo}
          tabIndex={-1}
          className="tingido flex flex-col gap-[10px] rounded-[8px] border-[0.5px] border-accent-ambar p-[18px] [--cor-tint:var(--tint-ambar)]"
        >
          <p className="font-mono text-titlebar font-medium tracking-[var(--tracking-titlebar)] text-accent-ambar">
            {temErroDeCampo ? "FALTA CONFERIR" : "NÃO CONSEGUI ENVIAR"}
          </p>

          {temErroDeCampo ? (
            // Cada item leva ao campo. O `href` com fragmento move o foco para o campo,
            // porque input é focável, e a rolagem já respeita o `scroll-padding-top` que o
            // `html` declara por causa da nav fixa.
            <ul className="flex flex-col gap-[6px]">
              {ORDEM_DOS_CAMPOS.filter((campo) => estado.erros[campo]).map((campo) => (
                <li key={campo}>
                  <a
                    href={`#${campo}`}
                    className="text-corpo text-text underline underline-offset-4"
                  >
                    {ROTULO_DO_CAMPO[campo]}: {estado.erros[campo]}
                  </a>
                </li>
              ))}
            </ul>
          ) : (
            <p className="text-corpo text-text">{estado.aviso}</p>
          )}
        </div>
      )}

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
          maxLength={80}
          defaultValue={estado.valores?.nome ?? ""}
          aria-invalid={estado.erros.nome ? true : undefined}
          aria-describedby={estado.erros.nome ? "erro-nome" : undefined}
          placeholder="Como devo te chamar"
          className={CAMPO}
        />
        {estado.erros.nome && (
          <p id="erro-nome" className={ERRO}>
            {estado.erros.nome}
          </p>
        )}
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
          maxLength={254}
          defaultValue={estado.valores?.email ?? ""}
          aria-invalid={estado.erros.email ? true : undefined}
          aria-describedby={estado.erros.email ? "erro-email" : undefined}
          placeholder="seu@email.com"
          className={CAMPO}
        />
        {estado.erros.email && (
          <p id="erro-email" className={ERRO}>
            {estado.erros.email}
          </p>
        )}
      </div>

      <div className="flex flex-col gap-[9px]">
        <label htmlFor="assunto" className={ROTULO}>
          ASSUNTO
        </label>
        <select
          id="assunto"
          name="assunto"
          required
          defaultValue={estado.valores?.assunto ?? ""}
          aria-invalid={estado.erros.assunto ? true : undefined}
          aria-describedby={estado.erros.assunto ? "erro-assunto" : undefined}
          // A `.campo-select` pinta o texto em `--text-dim` enquanto a opção vazia é a
          // escolhida, para o select parecer placeholder como os outros campos. O porquê
          // de não usar `:invalid` está comentado na regra, no `app/globals.css`.
          className={`${CAMPO} campo-select`}
        >
          <option value="" disabled>
            Selecione um assunto
          </option>
          {assuntos.map((assunto) => (
            <option key={assunto} value={assunto}>
              {assunto}
            </option>
          ))}
        </select>
        {estado.erros.assunto && (
          <p id="erro-assunto" className={ERRO}>
            {estado.erros.assunto}
          </p>
        )}
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
          maxLength={3000}
          defaultValue={estado.valores?.mensagem ?? ""}
          aria-invalid={estado.erros.mensagem ? true : undefined}
          aria-describedby={estado.erros.mensagem ? "erro-mensagem" : undefined}
          placeholder="Conta o contexto e o que você precisa"
          className={CAMPO}
        />
        {estado.erros.mensagem && (
          <p id="erro-mensagem" className={ERRO}>
            {estado.erros.mensagem}
          </p>
        )}
      </div>

      <div className="flex flex-col items-start gap-[14px]">
        {/* A LINHA DE LGPD DIZ O QUE ACONTECE, E NÃO MAIS DO QUE ISSO. Ela cita o serviço de
            envio de propósito: a mensagem passa por um operador e fica no log dele, então
            "não guardo nada" prometeria mais do que o caminho cumpre. O que é verdade sem
            ressalva é que o site não guarda, e é isso que está escrito. */}
        <p className="text-cta text-text-muted">
          Sua mensagem vai direto para o meu e-mail, por um serviço de envio. O site não
          guarda nada.
        </p>

        <button
          type="submit"
          disabled={pendente}
          className="botao-interativo botao-cheio rounded-full bg-accent-rosa px-[30px] py-[16px] text-corpo font-medium text-bg disabled:opacity-50"
        >
          {/* MAIÚSCULA INICIAL NOS DOIS, E ISSO DIVERGE DO FIGMA DE PROPÓSITO. O arquivo
              escreve "enviar mensagem" em caixa baixa, e era o único botão do site assim:
              "Baixar CV", "Ver stack completa", "Todos os projetos", "Entre em contato" e
              "Ir para a home" todos começam com maiúscula. O texto sai daqui, do código, e
              não de `text-transform` no CSS, então é aqui que se corrige. */}
          {pendente ? "Enviando..." : "Enviar mensagem"}
        </button>

        {/* A REGIÃO VIVA PRECISA EXISTIR ANTES DE TER CONTEÚDO. Leitor de tela só anuncia a
            mudança de uma região que já estava no DOM quando a página carregou; criar a
            região junto com o texto costuma não anunciar nada. Por isso ela é renderizada
            sempre, vazia, e só o texto entra e sai.

            É só para leitor de tela porque quem enxerga já lê "enviando..." no botão. */}
        <p role="status" className="sr-only">
          {pendente ? "Enviando sua mensagem." : ""}
        </p>
      </div>
    </form>
  );
}

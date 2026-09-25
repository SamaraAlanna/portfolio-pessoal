import { canalPor } from "@/conteudo/contato";
import {
  corpoEmHtml,
  corpoEmTexto,
  montarAssunto,
  type MensagemValidada,
} from "@/lib/contato";

/**
 * O envio do e-mail, pelo Brevo.
 *
 * ESTE É O ÚNICO ARQUIVO DO PROJETO QUE SABE QUAL SERVIÇO MANDA O E-MAIL. Trocar de
 * provedor é reescrever este arquivo e mais nada, porque a Server Action fala com a função
 * abaixo e não com HTTP. Foi para isso que ele nasceu separado do `acoes.ts`.
 *
 * `fetch` PURO, SEM SDK. O Brevo autentica com um cabeçalho `api-key`, e é só isso. Foi o
 * critério que decidiu a escolha contra o Amazon SES, que exige assinatura SigV4 e, sem
 * SDK, obriga a escrever requisição canônica e cadeia de HMAC à mão.
 *
 * NUNCA IMPORTE ESTE ARQUIVO DE UM CLIENT COMPONENT. Ele lê `process.env`, e a chave só
 * existe no servidor. Hoje quem importa é a Server Action, que roda no servidor por
 * definição.
 */

const ENDPOINT = "https://api.brevo.com/v3/smtp/email";

/**
 * Dez segundos, e depois desiste.
 *
 * Sem isso a requisição herda o tempo do ambiente e a pessoa fica olhando um botão
 * "enviando..." que pode não terminar nunca. Estourar o prazo cai no mesmo aviso genérico
 * das outras falhas, que é o comportamento certo: para quem está na tela, serviço lento e
 * serviço fora são a mesma coisa.
 */
const PRAZO = 10_000;

type MotivoDaFalha = "sem-configuracao" | "recusado" | "rede";

export type ResultadoDoEnvio =
  | { ok: true }
  | { ok: false; motivo: MotivoDaFalha };

/**
 * O destinatário sai do `conteudo/contato.ts`, e não escrito aqui.
 *
 * É o mesmo endereço que a página de Contato e o rodapé mostram, então escrever de novo
 * criaria um terceiro lugar para divergir. Se o canal "email" sumir de lá, isto quebra na
 * compilação em vez de mandar mensagem para lugar nenhum.
 */
const DESTINO = canalPor("email");

export async function enviarMensagemPorEmail(
  dados: MensagemValidada,
): Promise<ResultadoDoEnvio> {
  const chave = process.env.BREVO_API_KEY;
  const remetente = process.env.CONTATO_REMETENTE;

  /**
   * SEM CONFIGURAÇÃO, FALHA LIMPO E AVISA NO LOG.
   *
   * Enquanto a conta do Brevo não existir, é aqui que a execução para. **Não lança
   * exceção, e o build não quebra:** o formulário fica no ar, a pessoa recebe o aviso
   * genérico e o log diz exatamente o que falta. Lançar faria a página de erro do Next
   * aparecer, o que assusta o visitante por um problema que é de configuração, não dele.
   */
  if (!chave || !remetente) {
    console.error(
      "[contato] Envio não configurado: falta BREVO_API_KEY e/ou CONTATO_REMETENTE nas variáveis de ambiente. A mensagem NÃO foi enviada.",
    );
    return { ok: false, motivo: "sem-configuracao" };
  }

  /**
   * O REMETENTE É SEMPRE O DOMÍNIO VERIFICADO, E NUNCA O VISITANTE.
   *
   * Pôr o e-mail de quem escreveu no `sender` é a forma clássica de derrubar a própria
   * entrega: o SPF e o DKIM do domínio dele não autorizam o Brevo, a mensagem chega como
   * falsificação e o domínio de envio queima junto. Quem carrega o endereço do visitante é
   * o `replyTo`, que existe para isso e não é usado na autenticação.
   *
   * O `replyTo` só é montado com um e-mail que passou pelo `validarFormulario`, que entre
   * outras coisas garante que ele não tem quebra de linha. O tipo `MensagemValidada` é a
   * garantia de que isso aconteceu.
   */
  const corpo = {
    sender: { email: remetente, name: "Portfólio Samara Alanna" },
    to: [{ email: DESTINO.valor, name: "Samara Alanna" }],
    replyTo: { email: dados.email, name: dados.nome },
    subject: montarAssunto(dados),
    textContent: corpoEmTexto(dados),
    htmlContent: corpoEmHtml(dados),
  };

  try {
    const resposta = await fetch(ENDPOINT, {
      method: "POST",
      headers: {
        "api-key": chave,
        "content-type": "application/json",
        accept: "application/json",
      },
      body: JSON.stringify(corpo),
      signal: AbortSignal.timeout(PRAZO),
    });

    if (!resposta.ok) {
      /**
       * O DETALHE VAI PARA O LOG E NÃO PARA A TELA. O corpo de erro do Brevo traz código e
       * descrição do que ele recusou, que é útil para quem está depurando e é informação
       * sobre a infraestrutura para quem está sondando. Cortado em 500 caracteres para uma
       * resposta grande não entupir o log.
       */
      const detalhe = await resposta.text().catch(() => "");
      console.error(
        `[contato] Brevo recusou o envio: ${resposta.status} ${detalhe.slice(0, 500)}`,
      );
      return { ok: false, motivo: "recusado" };
    }

    /**
     * O `messageId` do Brevo vai para o log, e ele não é segredo.
     *
     * É o rastro que liga uma mensagem daqui a uma linha do painel do Brevo, e sem ele
     * "não chegou o e-mail" vira investigação sem ponto de partida: não dá para saber se
     * o envio nem aconteceu, se aconteceu e foi recusado depois, ou se chegou e caiu em
     * spam. O corpo da resposta de sucesso traz só esse campo.
     */
    const id = await resposta
      .json()
      .then((corpo) => (corpo as { messageId?: string }).messageId)
      .catch(() => undefined);

    console.info(
      `[contato] Brevo aceitou o envio: ${resposta.status} messageId=${id ?? "(não veio)"}`,
    );

    return { ok: true };
  } catch (erro) {
    /**
     * SÓ NOME E MENSAGEM DO ERRO VÃO PARA O LOG, e não o objeto inteiro.
     *
     * O objeto de erro de uma requisição carrega `cause` aninhado, e o que vem lá dentro
     * depende da implementação do `fetch`, não deste código. **Imprimir o objeto é confiar
     * que nenhuma versão futura vai anexar a requisição, com os cabeçalhos dela, e é onde
     * a chave vazaria.** Nome e mensagem bastam para saber se foi tempo esgotado, DNS ou
     * conexão recusada, que é o que se quer descobrir aqui.
     */
    const descricao =
      erro instanceof Error ? `${erro.name}: ${erro.message}` : String(erro);
    console.error(`[contato] Falha ao falar com o Brevo: ${descricao}`);
    return { ok: false, motivo: "rede" };
  }
}

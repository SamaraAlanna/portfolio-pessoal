"use server";

import {
  AVISO_DE_FALHA,
  CAMPO_ARMADILHA,
  CAMPO_CARIMBO,
  validarFormulario,
  type EstadoDoEnvio,
} from "@/lib/contato";
import { enviarMensagemPorEmail } from "@/lib/email";

/**
 * A Server Action do formulário de contato.
 *
 * É SERVER ACTION, E NÃO ROUTE HANDLER, e o motivo é funcionar sem JavaScript. A
 * documentação da versão instalada, em
 * `node_modules/next/dist/docs/01-app/01-getting-started/07-mutating-data.md`, diz que
 * formulário que chama Server Action é enviado mesmo com o JavaScript desligado ou ainda
 * não carregado. Um Route Handler também funcionaria sem script, mas a volta seria um
 * redirecionamento, e **os campos preenchidos se perderiam** junto com o erro, a menos que
 * fossem devolvidos por query string, o que joga a mensagem inteira na barra de endereço.
 *
 * ESTE ARQUIVO SÓ EXPORTA FUNÇÃO ASSÍNCRONA. É regra do `"use server"`, e é por isso que o
 * `EstadoDoEnvio` e o `ESTADO_INICIAL` moram no `lib/contato.ts`: uma constante exportada
 * daqui quebraria a compilação.
 *
 * A ORDEM DAS CONFERÊNCIAS É DELIBERADA: armadilha, carimbo, validação, envio. As duas
 * primeiras são baratas e descartam robô sem tocar em serviço externo nenhum.
 */

/**
 * Três segundos.
 *
 * Ninguém lê quatro campos, escolhe um assunto e escreve dez caracteres em menos que isso.
 * O valor é folgado de propósito: apertado demais, ele começaria a recusar quem cola um
 * texto pronto e clica, que é gente de verdade com pressa.
 */
const TEMPO_MINIMO = 3_000;

const ENVIADO: EstadoDoEnvio = {
  situacao: "enviado",
  erros: {},
  valores: null,
  aviso: null,
};

export async function enviarMensagem(
  _anterior: EstadoDoEnvio,
  dados: FormData,
): Promise<EstadoDoEnvio> {
  /**
   * ARMADILHA. O campo está escondido e não tem por que ter conteúdo. Preenchido, é robô.
   *
   * RESPONDE SUCESSO E NÃO MANDA NADA, e isso não é descuido. Devolver erro ensinaria o
   * robô que aquele campo é a peneira, e a próxima tentativa viria com ele vazio. Fingir
   * que deu certo não ensina nada.
   *
   * Funciona com o JavaScript desligado, porque é só um campo a mais no `FormData`.
   */
  const armadilha = dados.get(CAMPO_ARMADILHA);
  if (typeof armadilha === "string" && armadilha.trim() !== "") {
    console.warn("[contato] Armadilha preenchida. Nada foi enviado.");
    return ENVIADO;
  }

  /**
   * CARIMBO DE TEMPO, E ELE É QUEBRA-GALHO ASSUMIDO.
   *
   * O valor é escrito por JavaScript quando a página monta, porque a `/contato` é
   * pré-renderizada estática: um carimbo escrito no HTML seria o horário do **build**,
   * congelado, e a conta daria meses para todo mundo. Não quebraria com erro, daria a
   * resposta errada em silêncio, que é pior.
   *
   * CONSEQUÊNCIA, REGISTRADA: um carimbo que o cliente escreve é um carimbo que o cliente
   * forja. Isto não é controle de segurança, é peneira contra robô que preenche e envia na
   * mesma requisição. Quem segura abuso de verdade é o limite de taxa por IP, no painel da
   * Vercel.
   *
   * SEM O CAMPO, A CONFERÊNCIA É PULADA, e é isso que mantém o formulário utilizável sem
   * JavaScript. Quem está nessa situação continua passando pela armadilha, pela validação
   * e pelo limite de taxa.
   *
   * A conferência só vale para valor no passado: relógio de visitante adiantado devolveria
   * tempo negativo, e recusar por isso seria punir quem não tem culpa.
   */
  const carimbo = Number(dados.get(CAMPO_CARIMBO));
  if (Number.isFinite(carimbo) && carimbo > 0) {
    const decorrido = Date.now() - carimbo;
    if (decorrido >= 0 && decorrido < TEMPO_MINIMO) {
      console.warn(
        `[contato] Envio em ${decorrido}ms, abaixo do mínimo de ${TEMPO_MINIMO}ms. Nada foi enviado.`,
      );
      return ENVIADO;
    }
  }

  const resultado = validarFormulario(dados);

  if (!resultado.ok) {
    return {
      situacao: "erro",
      erros: resultado.erros,
      valores: resultado.valores,
      aviso: null,
    };
  }

  const envio = await enviarMensagemPorEmail(resultado.dados);

  if (!envio.ok) {
    /**
     * O MOTIVO DA FALHA NÃO CHEGA NA TELA. Ele já foi para o log dentro do `lib/email.ts`,
     * com detalhe. Aqui sai sempre a mesma frase, e os valores voltam para o formulário se
     * repreencher, senão a pessoa perderia a mensagem por causa de um problema que é meu.
     */
    return {
      situacao: "erro",
      erros: {},
      valores: resultado.dados,
      aviso: AVISO_DE_FALHA,
    };
  }

  return ENVIADO;
}

import { readFileSync } from "node:fs";
import { join } from "node:path";

/**
 * Descobre largura e altura de uma imagem do /public em tempo de build.
 *
 * Existe porque o next/image exige dimensão conhecida e o Markdown não traz essa
 * informação. Ler do próprio arquivo evita o dado que envelhece: trocar a imagem sem
 * atualizar um número declarado à mão produziria layout errado em silêncio.
 *
 * POR QUE À MÃO, E NÃO COM BIBLIOTECA: a opção óbvia, image-size, carrega duas
 * vulnerabilidades de severidade alta sem correção, nos parsers de ICNS, JXL e HEIF. O
 * risco real aqui seria quase nulo, já que isto roda em build sobre arquivos do próprio
 * repositório. O problema é outro: alerta permanente no npm audit e no GitHub vira ruído,
 * e ruído faz a pessoa parar de olhar alerta de verdade.
 *
 * FORMATOS SUPORTADOS: PNG, JPEG e WebP. É o que o conteúdo usa. Formato fora dessa lista
 * devolve null, e o chamador cai para img comum em vez de quebrar.
 *
 * Cada leitor abaixo lê só o cabeçalho, que é uma estrutura fixa e pequena. Nenhum deles
 * percorre dados de pixel, então não existe aqui o laço sobre conteúdo controlado por
 * arquivo que originou aquelas vulnerabilidades.
 */
export type Dimensao = { largura: number; altura: number };

/**
 * PNG. Assinatura de 8 bytes e, logo depois, o bloco IHDR, que começa com largura e
 * altura em 32 bits big-endian. Especificação: PNG 1.2, seção 11.2.2.
 */
function lerPng(dados: Buffer): Dimensao | null {
  if (dados.length < 24) return null;
  const assinatura = "89504e470d0a1a0a";
  if (dados.subarray(0, 8).toString("hex") !== assinatura) return null;
  if (dados.subarray(12, 16).toString("ascii") !== "IHDR") return null;

  return {
    largura: dados.readUInt32BE(16),
    altura: dados.readUInt32BE(20),
  };
}

/**
 * JPEG. Percorre os marcadores até achar um Start Of Frame, que é onde ficam as
 * dimensões. Os SOF vão de C0 a CF, menos C4 (tabela de Huffman), C8 (reservado) e CC
 * (codificação aritmética), que apesar da faixa não são SOF.
 *
 * Dentro do segmento: 2 bytes de tamanho, 1 de precisão, 2 de altura, 2 de largura.
 */
function lerJpeg(dados: Buffer): Dimensao | null {
  if (dados.length < 4) return null;
  if (dados[0] !== 0xff || dados[1] !== 0xd8) return null;

  let posicao = 2;

  while (posicao + 3 < dados.length) {
    if (dados[posicao] !== 0xff) {
      posicao += 1;
      continue;
    }

    // Sequências de FF são preenchimento e não marcador.
    let marcador = dados[posicao + 1];
    while (marcador === 0xff && posicao + 2 < dados.length) {
      posicao += 1;
      marcador = dados[posicao + 1];
    }

    // Marcadores sem carga: reinício (D0 a D7), início e fim de imagem.
    if ((marcador >= 0xd0 && marcador <= 0xd9) || marcador === 0x01) {
      posicao += 2;
      continue;
    }

    const inicioSegmento = posicao + 2;
    if (inicioSegmento + 1 >= dados.length) return null;
    const tamanho = dados.readUInt16BE(inicioSegmento);

    const ehSof =
      marcador >= 0xc0 &&
      marcador <= 0xcf &&
      marcador !== 0xc4 &&
      marcador !== 0xc8 &&
      marcador !== 0xcc;

    if (ehSof) {
      if (inicioSegmento + 7 > dados.length) return null;
      return {
        altura: dados.readUInt16BE(inicioSegmento + 3),
        largura: dados.readUInt16BE(inicioSegmento + 5),
      };
    }

    if (tamanho < 2) return null;
    posicao = inicioSegmento + tamanho;
  }

  return null;
}

/**
 * WebP. Contêiner RIFF, com três variantes de bloco que carregam dimensão.
 *
 * VP8  quadro com perda: sincronismo 9D 01 2A e depois 14 bits de largura e 14 de altura.
 * VP8L quadro sem perda: assinatura 2F e depois 14 bits de (largura - 1) e (altura - 1).
 * VP8X contêiner estendido: 3 bytes de (largura - 1) e 3 de (altura - 1), little-endian.
 *
 * O VP8X vem primeiro quando existe, e as dimensões dele são as da tela final, então é o
 * que vale quando aparece.
 */
function lerWebp(dados: Buffer): Dimensao | null {
  if (dados.length < 30) return null;
  if (dados.subarray(0, 4).toString("ascii") !== "RIFF") return null;
  if (dados.subarray(8, 12).toString("ascii") !== "WEBP") return null;

  const bloco = dados.subarray(12, 16).toString("ascii");

  if (bloco === "VP8X") {
    return {
      largura: (dados.readUIntLE(24, 3) & 0xffffff) + 1,
      altura: (dados.readUIntLE(27, 3) & 0xffffff) + 1,
    };
  }

  if (bloco === "VP8L") {
    if (dados[20] !== 0x2f) return null;
    const bits = dados.readUInt32LE(21);
    return {
      largura: (bits & 0x3fff) + 1,
      altura: ((bits >> 14) & 0x3fff) + 1,
    };
  }

  if (bloco === "VP8 ") {
    if (dados[23] !== 0x9d || dados[24] !== 0x01 || dados[25] !== 0x2a) return null;
    return {
      largura: dados.readUInt16LE(26) & 0x3fff,
      altura: dados.readUInt16LE(28) & 0x3fff,
    };
  }

  return null;
}

export function lerDimensao(dados: Buffer): Dimensao | null {
  const resultado = lerPng(dados) ?? lerWebp(dados) ?? lerJpeg(dados);
  if (!resultado) return null;
  if (resultado.largura <= 0 || resultado.altura <= 0) return null;
  return resultado;
}

const cache = new Map<string, Dimensao | null>();

export function dimensaoDaImagem(caminhoPublico: string): Dimensao | null {
  if (cache.has(caminhoPublico)) return cache.get(caminhoPublico) ?? null;

  let resultado: Dimensao | null = null;

  // Só resolve caminho local do /public. URL externa não tem arquivo para medir.
  if (caminhoPublico.startsWith("/")) {
    try {
      const absoluto = join(process.cwd(), "public", caminhoPublico.slice(1));
      resultado = lerDimensao(readFileSync(absoluto));
    } catch {
      // Arquivo ausente ou ilegível. Devolver null deixa o chamador cair para img comum,
      // que é pior em performance mas não quebra a página.
    }
  }

  cache.set(caminhoPublico, resultado);
  return resultado;
}

import BlocoSecao from "@/components/blocos/bloco-secao";
import BlocoCitacao from "@/components/blocos/bloco-citacao";
import BlocoCodigo from "@/components/blocos/bloco-codigo";
import BlocoImagens from "@/components/blocos/bloco-imagens";
import BlocoNumeros from "@/components/blocos/bloco-numeros";
import BlocoAntesDepois from "@/components/blocos/bloco-antes-depois";
import BlocoDiagrama from "@/components/blocos/bloco-diagrama";
import BlocoPaleta from "@/components/blocos/bloco-paleta";
import BlocoOpcoes from "@/components/blocos/bloco-opcoes";
import BlocoDestaque from "@/components/blocos/bloco-destaque";
import BlocoDuo from "@/components/blocos/bloco-duo";
import BlocoFrase from "@/components/blocos/bloco-frase";
import BlocoEstados from "@/components/blocos/bloco-estados";
import ImagemMdx from "@/components/ui/imagem-mdx";
import type { SecaoDoCase } from "@/lib/conteudo";

/**
 * Mapa das directives para componentes.
 *
 * A chave é o nome escrito no conteúdo, depois dos dois-pontos. É este objeto que o
 * MDXRemote recebe em `components`.
 */
export const blocos = {
  secao: BlocoSecao,
  citacao: BlocoCitacao,
  codigo: BlocoCodigo,
  imagens: BlocoImagens,
  numeros: BlocoNumeros,
  "antes-depois": BlocoAntesDepois,
  diagrama: BlocoDiagrama,
  paleta: BlocoPaleta,
  opcoes: BlocoOpcoes,

  // Visualizador de estados de tela, em abas. Entrou com o redesenho dos cases.
  estados: BlocoEstados,

  // Dois blocos que os cases exigiram e que não estavam na lista original dos nove.
  destaque: BlocoDestaque,
  duo: BlocoDuo,
  frase: BlocoFrase,

  // Toda imagem do conteúdo passa pelo next/image, e não só as de dentro do bloco de
  // imagens. Uma página de case com dez capturas sem otimização fica pesada.
  img: ImagemMdx,
};

/**
 * O mesmo mapa, com as seções sabendo o número e a âncora delas.
 *
 * POR QUE ISSO É UM MAPA POR PÁGINA, E NÃO UM ESTADO GLOBAL. O `BlocoSecao` não tem como
 * saber a própria posição: ele é montado pelo MDX, um de cada vez, sem contexto dos
 * irmãos. Quem sabe a ordem é quem leu o arquivo. Passar por `components` mantém a
 * informação fluindo de fora para dentro, sem contexto React nem contador de módulo, que
 * é a solução que parece mais simples e vaza entre renderizações do servidor.
 *
 * A LIGAÇÃO É PELO RÓTULO, e isso tem uma consequência: **duas seções com o mesmo rótulo
 * no mesmo case recebem o mesmo número e a mesma âncora**. O índice mostraria duas linhas
 * iguais e o link levaria sempre à primeira. Não acontece hoje e não é erro de build, mas
 * é o limite conhecido deste desenho.
 */
export function blocosComIndice(secoes: SecaoDoCase[]) {
  const porRotulo = new Map(secoes.map((secao) => [secao.rotulo, secao]));

  return {
    ...blocos,
    secao: function SecaoNumerada(props: { rotulo?: string; titulo?: string; children?: React.ReactNode }) {
      const encontrada = props.rotulo ? porRotulo.get(props.rotulo) : undefined;
      return (
        <BlocoSecao
          {...props}
          numero={encontrada?.numero}
          ancora={encontrada?.ancora}
        />
      );
    },
  };
}

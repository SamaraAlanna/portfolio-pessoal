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
import ImagemMdx from "@/components/ui/imagem-mdx";

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

  // Dois blocos que os cases exigiram e que não estavam na lista original dos nove.
  destaque: BlocoDestaque,
  duo: BlocoDuo,
  frase: BlocoFrase,

  // Toda imagem do conteúdo passa pelo next/image, e não só as de dentro do bloco de
  // imagens. Uma página de case com dez capturas sem otimização fica pesada.
  img: ImagemMdx,
};

import Image from "next/image";
import type { ReactNode } from "react";
import VisualizadorDeEstados, {
  type Estado,
} from "@/components/ui/visualizador-de-estados";
import { dimensaoDaImagem } from "@/lib/imagens";
import { linhasDeCampos } from "@/lib/texto";

/**
 * Visualizador de estados de tela.
 *
 * Uma linha por estado, três campos separados por barra vertical, no mesmo formato que
 * `numeros`, `paleta` e `opcoes` já usam:
 *
 *   :::estados{total="7"}
 *   Vazio | /imagens/cases/crud-estado-vazio.webp | Antes de qualquer produto ser adicionado
 *   Loading | /imagens/cases/crud-estado-loading.webp | Enquanto os produtos são buscados
 *   :::
 *
 * SEM LINHA EM BRANCO ENTRE OS ESTADOS, ao contrário de `imagens` e `diagrama`. Ali a linha
 * em branco é obrigatória; aqui ela **quebra o bloco em silêncio**, e é o mesmo motivo nos
 * dois casos. Este bloco lê as linhas pelo `linhasDeCampos`, que separa por quebra simples
 * dentro de um parágrafo só. Com linha em branco o Markdown cria parágrafos separados, o
 * extrator os concatena sem separador, e "...adicionadoLoading" vira uma linha só: o bloco
 * renderiza **um** estado com a legenda de dois grudadas.
 *
 * O `total` é quantos estados o case documentou, que é maior que o número de abas: o
 * contador diz "4 DE 7 NO CASE" justamente para não prometer que a página mostra tudo. Sem
 * o atributo, o contador não aparece.
 *
 * AS IMAGENS SÃO RENDERIZADAS AQUI, NO SERVIDOR, e descem prontas para o componente de
 * cliente. As dimensões saem do próprio arquivo em build, pelo `lib/imagens.ts`, então
 * nunca desencontram de um número escrito à mão.
 *
 * CARREGAMENTO SOB DEMANDA VEM DE GRAÇA, E POR OMISSÃO. Sem `priority`, o `next/image`
 * nasce com `loading="lazy"`, e imagem dentro de painel com `hidden` não é buscada pelo
 * navegador até o painel aparecer. **Não precisa de código para adiar; precisa de cuidado
 * para não estragar**, e o jeito de estragar é pôr `priority` achando que ajuda.
 *
 * A PROPORÇÃO SAI DA PRIMEIRA IMAGEM E VALE PARA A MOLDURA INTEIRA. Reservar a altura por
 * imagem não bastaria: se duas capturas tivessem proporções diferentes, a moldura mudaria
 * de altura a cada troca de aba e a página saltaria. Uma proporção só para todas resolve o
 * salto, e o `object-contain` do visualizador cuida de quem não encaixa.
 *
 * O alt descreve a tela pelo rótulo do estado, e não repete a legenda, que já é texto
 * visível logo abaixo e é anunciada por conta própria.
 */
export default function BlocoEstados({
  total,
  children,
}: {
  /** Quantos estados existem no case inteiro. Opcional. */
  total?: string;
  children?: ReactNode;
}) {
  const linhas = linhasDeCampos(children);

  const estados: Estado[] = [];
  const imagens: ReactNode[] = [];
  let proporcao: number | null = null;

  for (const [rotulo, caminho, legenda] of linhas) {
    if (!rotulo || !caminho) continue;

    const dimensao = dimensaoDaImagem(caminho);
    if (proporcao === null && dimensao) {
      proporcao = dimensao.largura / dimensao.altura;
    }

    estados.push({ rotulo, legenda: legenda ?? "" });
    imagens.push(
      dimensao ? (
        <Image
          key={caminho}
          src={caminho}
          alt={`Tela no estado ${rotulo}`}
          width={dimensao.largura}
          height={dimensao.altura}
          sizes="(max-width: 1024px) 100vw, 900px"
        />
      ) : (
        // Mesma escolha do ImagemMdx: perde otimização, mas a página continua correta.
        // eslint-disable-next-line @next/next/no-img-element
        <img key={caminho} src={caminho} alt={`Tela no estado ${rotulo}`} />
      ),
    );
  }

  if (estados.length === 0) return null;

  return (
    <VisualizadorDeEstados
      estados={estados}
      imagens={imagens}
      proporcao={proporcao ?? 16 / 9}
      total={total}
    />
  );
}

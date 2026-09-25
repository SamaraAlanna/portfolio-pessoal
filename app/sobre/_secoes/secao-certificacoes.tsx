import Image from "next/image";
import AcordeaoMobile from "@/components/ui/acordeao-mobile";
import DialogoCertificado from "@/components/ui/dialogo-certificado";
import VisualizadorDeEstados from "@/components/ui/visualizador-de-estados";
import { certificacoes, miniaturaDe, type Certificacao } from "@/conteudo/sobre";
import { dimensaoDaImagem } from "@/lib/imagens";

/**
 * Certificações em três áreas, cada uma num accordion fechado.
 *
 * FECHADO NOS DOIS TAMANHOS, e é por isso que o `AcordeaoMobile` ganhou o
 * `sempreAbertoNoDesktop`. São 18 certificados: abertos, eles viram a parede de itens que o
 * accordion existe para evitar, e empurram IDIOMAS para fora de qualquer tela.
 *
 * A CONTAGEM VAI NO CABEÇALHO porque o accordion fechado esconde o tamanho do que tem
 * dentro. Sem ela a pessoa abre para descobrir se vale abrir.
 *
 * O NÍVEL DO CABEÇALHO É `h3`, dentro do `h2` da seção, e continua assim dentro do accordion:
 * o `details` não cria nível nenhum.
 *
 * As imagens são renderizadas aqui, no servidor, e descem prontas para o dialog, que é
 * componente de cliente. É o mesmo arranjo do `bloco-estados`: as dimensões saem do próprio
 * arquivo em build, pelo `lib/imagens.ts`, então nunca desencontram de um número escrito à
 * mão.
 */

/** A frase da linha de apoio, montada dos campos separados. */
function legendaDe(item: Certificacao): string {
  return [item.instituicao, item.ano, item.horas && `${item.horas}h`]
    .filter(Boolean)
    .join(" · ");
}

function Certificado({ item }: { item: Certificacao }) {
  const imagens = item.imagens ?? [];
  const legenda = legendaDe(item);

  // Sem imagem o cartão não vira botão: abrir um dialog vazio é pior que não abrir.
  if (imagens.length === 0) {
    return (
      <li className="flex flex-col gap-[3px] rounded-[12px] border-[0.5px] border-border bg-surface p-[16px]">
        <span className="text-card-descricao leading-[1.45] text-text">{item.nome}</span>
        <span className="font-mono text-[11.5px] text-text-muted">{legenda}</span>
      </li>
    );
  }

  const capa = imagens[0];
  const capaMini = miniaturaDe(capa.caminho);
  const medidaMini = dimensaoDaImagem(capaMini);
  const medidaGrande = dimensaoDaImagem(capa.caminho);

  const miniatura = medidaMini ? (
    <Image
      src={capaMini}
      alt=""
      width={medidaMini.largura}
      height={medidaMini.altura}
      sizes="(max-width: 640px) 100vw, 320px"
      className="h-auto w-full"
    />
  ) : null;

  const grandes = imagens.map((imagem) => {
    const medida = dimensaoDaImagem(imagem.caminho);
    return medida ? (
      <Image
        key={imagem.caminho}
        src={imagem.caminho}
        alt={imagem.alt}
        width={medida.largura}
        height={medida.altura}
        sizes="(max-width: 1100px) 100vw, 1040px"
        className="h-auto w-full rounded-[8px]"
      />
    ) : null;
  });

  return (
    <li>
      <DialogoCertificado titulo={item.nome} legenda={legenda} miniatura={miniatura}>
        {imagens.length > 1 ? (
          /* Três arquivos e um certificado só: os níveis viram abas no mesmo visualizador
             que os cases usam, em vez de um segundo componente de abas no projeto. */
          <VisualizadorDeEstados
            estados={imagens.map((imagem, indice) => ({
              rotulo: imagem.rotulo ?? `Imagem ${indice + 1}`,
              legenda: imagem.legenda ?? "",
            }))}
            imagens={grandes}
            rotulo={`Níveis do certificado de ${item.nome}`}
            proporcao={
              medidaGrande ? medidaGrande.largura / medidaGrande.altura : 4 / 3
            }
          />
        ) : (
          grandes[0]
        )}
      </DialogoCertificado>
    </li>
  );
}

export default function SecaoCertificacoes() {
  return (
    <section data-revelar className="faixa pb-[72px]">
      <h2 className="font-mono text-rotulo-secao font-medium text-accent-rosa">
        CERTIFICAÇÕES
      </h2>

      <div className="mt-[36px] flex w-full flex-col">
        {certificacoes.map((grupo) => (
          <div
            key={grupo.titulo}
            className="w-full border-t-[1.5px] border-accent-rosa"
          >
            <AcordeaoMobile
              tag="h3"
              sempreAbertoNoDesktop={false}
              classeTag="text-corpo font-bold text-text"
              classeLinha="alvo-toque-vertical py-[20px]"
              classePainel="pb-[28px]"
              titulo={
                <span className="flex items-baseline gap-[10px]">
                  {grupo.titulo}
                  <span className="font-mono text-[11.5px] font-medium text-text-muted">
                    {grupo.itens.length}
                  </span>
                </span>
              }
            >
              <ul className="grid grid-cols-1 items-start gap-[16px] sm:grid-cols-2 lg:grid-cols-4">
                {grupo.itens.map((item) => (
                  <Certificado key={item.nome} item={item} />
                ))}
              </ul>
            </AcordeaoMobile>
          </div>
        ))}
      </div>
    </section>
  );
}

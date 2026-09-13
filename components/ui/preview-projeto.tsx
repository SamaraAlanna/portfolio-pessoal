import Image from "next/image";
import { dimensaoDaImagem } from "@/lib/imagens";

/**
 * Moldura da captura do projeto, no topo do card.
 *
 * O recorte fica AQUI e não na raiz do card. No Figma o recorte está na raiz, mas o card
 * inteiro é um link, e recortar o ancestral de um elemento focável come o anel de foco.
 * Arredondar só o topo desta moldura dá o mesmo resultado visual sem esse custo.
 */
export default function PreviewProjeto({
  imagem,
  titulo,
  altura,
  prioridade = false,
}: {
  imagem?: string;
  titulo: string;
  altura: string;
  prioridade?: boolean;
}) {
  const dimensao = imagem ? dimensaoDaImagem(imagem) : null;

  return (
    <div
      className={`flex w-full items-center justify-center overflow-hidden rounded-t-[12px] bg-surface-2 ${altura}`}
    >
      {imagem && dimensao ? (
        <Image
          src={imagem}
          alt={`Prévia do projeto ${titulo}`}
          width={dimensao.largura}
          height={dimensao.altura}
          priority={prioridade}
          sizes="(max-width: 1024px) 100vw, 400px"
          className="h-full w-full object-cover"
        />
      ) : null}
    </div>
  );
}

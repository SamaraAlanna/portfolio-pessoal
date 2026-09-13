import Image from "next/image";
import { dimensaoDaImagem } from "@/lib/imagens";

/**
 * Substitui o <img> que o Markdown gera por next/image.
 *
 * As dimensões saem do próprio arquivo, em build. A imagem é a fonte da verdade sobre o
 * próprio tamanho, então nunca desencontra de um número declarado à mão.
 *
 * Se a dimensão não puder ser lida, cai para img comum: perde otimização, mas a página
 * continua correta. Preferível a quebrar o build por causa de um arquivo estranho.
 */
export default function ImagemMdx({
  src,
  alt,
}: {
  src?: string;
  alt?: string;
}) {
  if (!src) return null;

  const dimensao = dimensaoDaImagem(src);

  if (!dimensao) {
    // eslint-disable-next-line @next/next/no-img-element
    return <img src={src} alt={alt ?? ""} className="h-auto w-full rounded-[8px]" />;
  }

  return (
    <Image
      src={src}
      alt={alt ?? ""}
      width={dimensao.largura}
      height={dimensao.altura}
      className="h-auto w-full rounded-[8px]"
      sizes="(max-width: 1024px) 100vw, 50vw"
    />
  );
}

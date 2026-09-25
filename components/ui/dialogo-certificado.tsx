"use client";

import { useRef, type ReactNode } from "react";

/**
 * O certificado grande, num dialog modal.
 *
 * É O `<dialog>` NATIVO, COM `showModal()`, E ISSO RESOLVE TRÊS COISAS DE GRAÇA: o foco fica
 * preso enquanto ele está aberto, Esc fecha, e ao fechar o foco volta para o elemento que o
 * abriu. O menu mobile faz as mesmas três coisas com armadilha de foco escrita à mão, porque
 * ele é um `div` com `role="dialog"` renderizado dentro da nav e não pode sair de lá.
 *
 * **SÃO DOIS PADRÕES DE MODAL NO SITE, E ISSO É DELIBERADO.** O do menu não migra: ele se
 * posiciona pela viewport a partir de dentro da nav, e virar `<dialog>` mudaria o
 * empilhamento de um componente que já está resolvido. Aqui o nativo ganha por outro motivo
 * além do código a menos: o dialog modal vive na *top layer*, então ele é imune aos blocos de
 * contenção que `opacity` e `backdrop-filter` criam para descendente `fixed`, que é a
 * armadilha registrada no CSS do projeto.
 *
 * O CLIQUE NO FUNDO FECHA, e isso não é nativo. Num dialog modal o clique no backdrop tem o
 * próprio `<dialog>` como alvo, porque o backdrop é um pseudo-elemento dele: comparar o alvo
 * com o elemento distingue fundo de conteúdo sem precisar medir coordenada.
 *
 * AS IMAGENS GRANDES NÃO BAIXAM ANTES DE ABRIR. Dialog fechado é `display: none`, e navegador
 * não busca imagem dentro disso. É o mesmo mecanismo de graça que o visualizador de estados
 * usa nos painéis escondidos: não precisa de código para adiar, precisa de cuidado para não
 * estragar, e o jeito de estragar é pôr `priority`.
 */
export default function DialogoCertificado({
  titulo,
  tituloCurto,
  legenda,
  miniatura,
  children,
}: {
  /** Nome completo. Vai no dialog e no nome acessível do cartão. */
  titulo: string;
  /** O que o cartão mostra, quando o completo não cabe em duas linhas. */
  tituloCurto?: string;
  /** Instituição, ano e carga, já montados. */
  legenda: string;
  /** A imagem de 480px, renderizada no servidor. */
  miniatura: ReactNode;
  /** O conteúdo grande: uma imagem só ou o visualizador em abas. */
  children: ReactNode;
}) {
  const dialogo = useRef<HTMLDialogElement>(null);

  return (
    <>
      <button
        type="button"
        onClick={() => dialogo.current?.showModal()}
        /* O NOME ACESSÍVEL É DECLARADO, E NÃO MONTADO DO TEXTO VISÍVEL. Concatenado, ele
           saía "Formação React DeveloperAlura (34h, 2026)", sem separação entre o curso e a
           instituição, porque são dois spans irmãos e nada põe pausa entre eles. Aqui ele
           carrega a mesma informação, na mesma ordem, com a pontuação certa, e começa pelo
           verbo, que é o que diz o que o clique faz. */
        aria-label={`Ver certificado de ${titulo}, ${legenda}`}
        className="cartao-interativo group flex h-full w-full flex-col items-start gap-[12px] rounded-[12px] border-[0.5px] border-border bg-surface p-[12px] text-left"
      >
        {/* A MOLDURA TEM PROPORÇÃO FIXA E A IMAGEM ENCAIXA DENTRO. Os certificados vão de
            1,32 a 1,75 de proporção, então imagem solta daria altura diferente por cartão. O
            1,45 é perto da mediana, 1,44, e reparte a sobra: o mais alto perde 9% na
            horizontal e o mais largo perde 17% na vertical. `contain` e não `cover`, porque
            cortar certificado é cortar informação. */}
        <span className="flex aspect-[1.45] w-full items-center justify-center overflow-hidden rounded-[8px] bg-surface-2">
          {miniatura}
        </span>

        {/* O `flex-1` faz este bloco absorver a sobra de altura do cartão e o `mt-auto`
            prende o detalhe na base. Nome de três linhas e nome de uma terminam com a linha
            de instituição no mesmo lugar. */}
        <span className="flex w-full flex-1 flex-col gap-[3px] px-[4px] pb-[4px]">
          <span className="text-card-descricao leading-[1.45] text-text">
            {tituloCurto ?? titulo}
          </span>
          <span className="mt-auto pt-[6px] font-mono text-[11.5px] text-text-muted">
            {legenda}
          </span>
        </span>
      </button>

      <dialog
        ref={dialogo}
        aria-label={`Certificado de ${titulo}`}
        onClick={(evento) => {
          if (evento.target === dialogo.current) dialogo.current?.close();
        }}
        className="dialogo-certificado"
      >
        <div className="flex w-full flex-col gap-[20px] p-[20px] sm:p-[28px]">
          <div className="flex items-start justify-between gap-[20px]">
            <span className="flex flex-col gap-[4px]">
              <span className="text-[19px] font-bold text-text">{titulo}</span>
              <span className="font-mono text-[11.5px] text-text-muted">{legenda}</span>
            </span>

            <button
              type="button"
              onClick={() => dialogo.current?.close()}
              className="alvo-toque shrink-0 rounded-full border-[0.5px] border-border-forte px-[16px] py-[8px] font-mono text-[11.5px] font-medium text-text"
            >
              Fechar
            </button>
          </div>

          {children}
        </div>
      </dialog>
    </>
  );
}

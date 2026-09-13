/**
 * Estado em construção.
 *
 * Quando o projeto está neste estado, o corpo do case não é renderizado. A página fica
 * com nav, migalha, título com badge âmbar, esta seção, próximo projeto e footer.
 *
 * O conteúdo já escrito continua no arquivo MDX, apenas não vai para a tela, do mesmo
 * jeito que no Figma as seções do corpo estão ocultas e não apagadas. Quando o estado
 * mudar para no-ar, o corpo volta sem ninguém precisar reescrever nada.
 *
 * A linha de apoio não existe no Figma: ela foi removida numa edição, não por decisão, e
 * está sendo restaurada aqui a partir do CLAUDE.md.
 */
export default function SecaoEmConstrucao() {
  return (
    <section className="flex flex-col items-center justify-center gap-[16px] faixa pt-[140px] pb-[160px]">
      <p className="w-full text-center text-frase-construcao font-extrabold text-text">
        Este projeto ainda está em construção
      </p>
      <p className="w-full text-center text-corpo-case text-text-muted">
        Volto aqui com o case completo quando ele estiver pronto.
      </p>
    </section>
  );
}

/**
 * Ponte entre a sintaxe de blocos do conteúdo e os componentes React.
 *
 * O `remark-directive` transforma `:::secao{rotulo="LEADS"}` num nó de directive. Este
 * plugin diz ao MDX para renderizar esse nó como um elemento com o nome da directive e
 * os atributos como props. Daí `secao` é mapeado para o componente no `components` do
 * MDXRemote.
 *
 * A travessia é escrita à mão de propósito. O `unist-util-visit` faria isso, mas ele só
 * está aqui como dependência transitiva do next-mdx-remote, e depender de dependência de
 * terceiro é dívida silenciosa: o dia em que ele sair da árvore, isso quebra sem aviso.
 * São cinco linhas.
 */

type No = {
  type: string;
  name?: string;
  attributes?: Record<string, string | null | undefined>;
  data?: { hName?: string; hProperties?: Record<string, unknown> };
  children?: No[];
};

const TIPOS_DE_DIRECTIVE = new Set([
  "containerDirective",
  "leafDirective",
  "textDirective",
]);

function percorrer(no: No, aoVisitar: (no: No) => void) {
  aoVisitar(no);
  for (const filho of no.children ?? []) percorrer(filho, aoVisitar);
}

export function directivasParaComponentes() {
  return (arvore: No) => {
    percorrer(arvore, (no) => {
      if (!TIPOS_DE_DIRECTIVE.has(no.type) || !no.name) return;
      const dados = no.data ?? (no.data = {});
      dados.hName = no.name;
      dados.hProperties = { ...(no.attributes ?? {}) };
    });
  };
}

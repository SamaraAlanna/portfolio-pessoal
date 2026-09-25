import type { LinkExterno } from "@/lib/conteudo";

/**
 * Os links externos do case: o site no ar, o repositório.
 *
 * MUDARAM DE LUGAR EM 2026-09-24. Eles fechavam a coluna do conteúdo, depois da última
 * frente, e os frames passaram a colocá-los **no hero, à direita do título**. Com isso a
 * oferta de ver o projeto no ar aparece antes da leitura e não depois dela, e deixa de
 * depender de a pessoa chegar ao fim da página.
 *
 * O componente saiu de `_secoes/` por causa disso: ele não é mais uma seção da página, é
 * uma peça dentro do cabeçalho, e `components/ui/` é onde o projeto guarda peça.
 *
 * NENHUM CASE MOSTRA OS LINKS EM DOIS LUGARES. Eles existem no hero e só ali.
 *
 * SÃO O BOTÃO SECUNDÁRIO, o `.botao-contorno` que o CV e os links de seção da home usam, em
 * rosa mesmo numa página de case ciano: o `.botao-contorno` pinta o fundo de `--tint-rosa`
 * no hover e no foco, e borda ciano com fundo rosa seria uma mistura que nenhuma regra do
 * sistema pede.
 *
 * A SETA É DECORATIVA E TEM `aria-hidden`. Ela repete visualmente o que o "(abre em nova
 * aba)" já diz para quem não vê a tela, e anunciada viraria "seta nordeste" no meio do nome
 * do botão.
 *
 * TODOS ABREM EM NOVA ABA, com `rel="noopener"` e o aviso para leitor de tela, como todo
 * link externo do site. O `noreferrer` continua fora: o `Referrer-Policy` do projeto
 * preserva a origem de propósito, e apagá-la aqui esconderia do cliente que a visita veio
 * do portfólio.
 *
 * NÃO É UM `nav`. Ele era, e virou um `div` na mudança: dois links de recurso ao lado do
 * título não são navegação do site, e um segundo landmark no mesmo cabeçalho, ao lado da
 * migalha, só aumenta a lista de saltos sem dar destino novo. Cada link já se explica
 * sozinho pelo próprio nome.
 *
 * Case sem o campo não renderiza nada, nem o espaço.
 */
export default function LinksDoCase({ links }: { links?: LinkExterno[] }) {
  if (!links || links.length === 0) return null;

  return (
    // OS BOTÕES FICAM LADO A LADO EM TODA LARGURA, e só quebram quando não couberem. O
    // `lg:shrink-0` é o que garante isso no desktop: sem ele este container é um item de
    // flex ao lado do título, encolhe abaixo do próprio conteúdo quando o título é longo, e
    // aí o `flex-wrap` passa a quebrar **um botão por linha**, que era o que acontecia na
    // SouJunior. Quem cede espaço é o título, que já tem `min-w-0` e quebra em duas linhas.
    //
    // O `shrink-0` é só do desktop de propósito: no mobile o pai é coluna, e aí um container
    // de largura máxima passaria da faixa em vez de deixar o `flex-wrap` trabalhar.
    <div className="flex flex-wrap items-center gap-[12px] lg:shrink-0">
      {links.map((link) => (
        <a
          key={link.destino}
          href={link.destino}
          target="_blank"
          rel="noopener"
          className="botao-interativo botao-contorno flex items-center gap-[8px] rounded-full border-[0.5px] border-accent-rosa px-[22px] py-[10px] text-corpo font-medium whitespace-nowrap text-accent-rosa"
        >
          {link.rotulo}
          <span aria-hidden="true">&#8599;</span>
          <span className="sr-only">(abre em nova aba)</span>
        </a>
      ))}
    </div>
  );
}

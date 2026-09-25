import type { LinkExterno } from "@/lib/conteudo";

/**
 * Os links de saída do case: o site no ar, o repositório.
 *
 * FICAM NA COLUNA DO CONTEÚDO, e não na largura da faixa. Eles fecham a leitura das frentes,
 * então alinham com o texto que acabou de ser lido em vez de recomeçarem na margem da página.
 * Quem garante isso é o lugar onde este componente é montado, dentro da segunda coluna da
 * grade do corpo, e não uma medida repetida aqui.
 *
 * SÃO O BOTÃO SECUNDÁRIO, o `.botao-contorno` que o CV e os links de seção da home usam. O
 * cheio é reservado para o que o site quer que a pessoa faça, e sair do case para ver o
 * projeto no ar não é isso: é oferta, não pedido.
 *
 * ELES SÃO ROSA, E NÃO O `--accent-case`, mesmo numa página de case ciano. O `.botao-contorno`
 * pinta o fundo de `--tint-rosa` no hover e no foco, então borda ciano com fundo rosa seria
 * uma mistura que nenhuma regra do sistema pede. **Botão rosa em página de case já existe**,
 * é o CTA da nav, que aparece em todas. Generalizar o botão para ler o accent do case é
 * possível e mudaria os três da home junto, o que é outra conversa.
 *
 * TODOS ABREM EM NOVA ABA, com `rel="noopener"` e o aviso para leitor de tela, como todo link
 * externo do site. O `noreferrer` continua fora: o `Referrer-Policy` do projeto preserva a
 * origem de propósito, e apagá-la aqui esconderia do cliente que a visita veio do portfólio.
 *
 * Case sem o campo não renderiza nada, nem o espaço.
 */
export default function SecaoLinks({ links }: { links?: LinkExterno[] }) {
  if (!links || links.length === 0) return null;

  return (
    <nav aria-label="Links do projeto" className="flex flex-wrap items-center gap-[12px]">
      {links.map((link) => (
        <a
          key={link.destino}
          href={link.destino}
          target="_blank"
          rel="noopener"
          className="botao-interativo botao-contorno flex items-center justify-center rounded-full border-[0.5px] border-accent-rosa px-[22px] py-[10px] text-corpo font-medium whitespace-nowrap text-accent-rosa"
        >
          {link.rotulo}
          <span className="sr-only"> (abre em nova aba)</span>
        </a>
      ))}
    </nav>
  );
}

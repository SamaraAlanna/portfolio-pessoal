# Portfólio Samara Alanna · estratégia de implementação

Documento para o Claude Code. Escrito depois de uma sessão longa de design no Figma,
onde o arquivo foi fechado em desktop e mobile, nos dois temas.

---

## REGRA ABSOLUTA: COMMITS

**Somente a Samara faz commit. Ninguém mais, em nenhuma circunstância.**

- Não rode `git commit`, `git push`, `git merge` ou qualquer comando que altere o histórico.
- Escreva os arquivos, mostre o diff, e pare.
- Se um passo parecer exigir commit para continuar, pare e avise.
- Isso vale mesmo se ela pedir no meio de uma tarefa longa: confirme antes.

---

## CONFIDENCIALIDADE

Vale mais que qualquer outra regra deste arquivo. Na dúvida, não publique e pergunte.

A Samara trabalha na TecSinapse e alguns projetos têm restrição contratual.

- **Nunca nomeie os produtos internos:** Wingo, Dynamo, Tecflow, KPI Vendas. Se
  aparecerem em algum lugar do Figma ou de imagem, não reproduza no código nem no
  conteúdo.
- **Clientes que podem ser nomeados:** Bajaj e VOGE. **Royal Enfield não pode.**
- O case Assistente de IA descreve o produto genericamente ("plataforma de gestão de
  conversas", "produto interno") de propósito. Não substitua por nome real, mesmo que
  você encontre um.
- **Não publique nome de colega sem autorização.** Paulo Azevedo autorizou e aparece no
  case VOGE.
- Três avaliações no case Bilheteria mostram nomes reais de terceiros nas imagens. Não
  publique sem tratar.

Se encontrar qualquer nome dessa lista dentro do Figma, avise em vez de reproduzir.

---

## Estado atual

**Repositório:** github.com/SamaraAlanna/portfolio-pessoal. O projeto local ainda não
está conectado a ele, e quem conecta é a Samara.

**Figma:** https://www.figma.com/design/P0QW4ixXLYZobH8L0pgXe8/Portfólio-Samara
(chave do arquivo: `P0QW4ixXLYZobH8L0pgXe8`)

**Nome de camada é pista, conteúdo é fonte.** Os nomes das camadas do Figma envelhecem
sozinhos, porque o Figma nomeia camada de texto pelo conteúdo no momento em que ela é
criada e não renomeia quando o texto muda. Já apareceram card com nome trocado em relação
ao texto, título de case com nome de uma versão anterior à reescrita, rótulo de seção
chamado "FRENTE 2 - SEGURANÇA" cujo texto real é "CREDENCIAIS", e frame de filtro chamado
"Filtro - TIPO" que filtra por tags.

**Consequência prática, e a origem de vários erros meus nesta sessão:** o `get_metadata`
devolve **só nomes de camada**, nunca conteúdo. Ele serve para achar estrutura e node id.
Qualquer texto que vá para o código, para o conteúdo ou para um relatório precisa vir do
`get_design_context`. Nunca cite texto lido do `get_metadata`.

Arquivo completo com 14 páginas em desktop (escuro e claro), 14 em mobile (escuro e
claro), o menu mobile aberto, e 5 telas de painel administrativo nos dois temas. Você tem acesso ao Figma via MCP. Leia de lá, não invente medida.

**Onde o código está.** Mantenha esta lista atualizada ao fim de cada passo da ordem
sugerida, para a próxima sessão saber de onde continuar sem reabrir tudo.

- **Passo 1, feito.** Projeto Next 16 com App Router, TypeScript, Tailwind 4 e ESLint,
  sem pasta `src`, alias `@/*`, Turbopack por padrão. Git não foi inicializado aqui.
- **Passo 2, feito.** `app/globals.css` com os 17 tokens da coleção "Cores" nos dois
  temas, o bloco `@theme` do Tailwind consumindo as variáveis, e os comentários de
  origem e de restrição de contraste.
- **Passo 3, feito.** Layout base. Tokens de tipografia em `app/globals.css`, lidos do
  Figma nos dois tamanhos. `app/layout.tsx` com DM Sans e JetBrains Mono via `next/font`,
  `lang="pt-BR"` e o script que evita o piscar de tema. Em `components/layout/`: `nav`,
  `menu-mobile`, `footer`, `seletor-tema`, `logo` e `links-nav`. Em `components/ui/`:
  `icone-sol` e `icone-lua`. Estado de foco, alvo de toque e transição de tema no CSS.
- **Passo 4, feito.** Os nove blocos em `components/blocos/`, com o mapa de directives em
  `components/blocos/index.ts`. Pipeline com `next-mdx-remote` e `remark-directive`, e o
  plugin que converte directive em componente em `lib/mdx.ts`. A rota `/teste-mdx` foi
  apagada quando os doze blocos passaram a ser usados pelos cases de verdade.
- **Passo 5, feito.** Home em `app/page.tsx` com quatro seções em `app/_secoes/`, e
  listagem em `app/projetos/` com cabeçalho e grade filtrável. Cards em `components/ui/`.
  Leitura do conteúdo em `lib/conteudo.ts`, dimensões de imagem em `lib/imagens.ts`. Os
  nove projetos em `conteudo/projetos/`, com as capturas em `public/imagens/projetos/`.
- **Passo 6, feito.** Página de case em `app/projetos/[slug]/`, com as seções em
  `_secoes/`. É **uma** página para os três modelos: a moldura é sempre nav, migalha,
  cabeçalho, ficha, hero opcional, corpo, próximo projeto e footer, e o que varia entre
  identidade visual, ux-produto e engenharia vive no MDX. O estado em construção troca o
  corpo pela frase e mantém o resto.
- **Conteúdo completo.** Os oito cases estão escritos, com ficha, abertura e corpo. O
  Spirito não tem corpo porque está em construção, e isso é o comportamento correto.
- **Passo 7, feito.** Sobre, Stack e Contato em `app/sobre/`, `app/stack/` e
  `app/contato/`, com o conteúdo estruturado em `conteudo/sobre.ts`, `conteudo/stack.ts` e
  `conteudo/contato.ts`. O cabeçalho de página interna virou
  `components/ui/cabecalho-pagina` e é usado por Projetos, Stack e Contato. O Sobre tem
  cabeçalho próprio, com foto.
- **A ordem de `experiencia` é por relevância, e não por data, desde 2026-09-23.** O peso é
  o do papel na identidade profissional: estúdio próprio, depois vínculo empregatício,
  depois voluntariado. **A ordem por data durou poucas horas** e foi desfeita no mesmo dia,
  porque data decrescente punha um trabalho voluntário acima do estágio e do estúdio, e a
  seção anunciava pelo topo a coisa menos central da trajetória. **Não reordene por data, em
  nenhum dos dois sentidos**, e cuidado com a coincidência que a lista atual cria: hoje ela
  é exatamente crescente por data de início, o que é acaso e não regra. O critério e a
  armadilha estão comentados em `conteudo/sobre.ts`, junto do array.
- **O Sobre perdeu o rótulo acima do `h1` em 2026-09-23**, como o Contato. **Ele não usa o
  `CabecalhoPagina`**, porque tem foto e botão ao lado do texto, então a mudança foi no
  próprio `secao-cabecalho.tsx` e o `rotulo` opcional do componente compartilhado não entra
  nessa conta. Sobrou uma consequência medida: a coluna da esquerda encurtou uns 33px e a
  folga que sustenta a centragem da foto caiu de uns 70px para uns 36px.
- **A grade da Stack foi reordenada por camada em 2026-09-23**, duas colunas, um par de
  mesma cor por linha: rosa, lavanda, ciano, âmbar. Antes era rosa, lavanda, lavanda, ciano,
  ciano, âmbar, âmbar, rosa, com os dois rosas nas pontas. **O Figma foi reordenado junto,
  nas quatro versões**, então os dois lados batem. A ordem vive em `conteudo/stack.ts`, com
  o critério comentado lá: mover um grupo não reordena uma lista, remonta as duplas.
- **A Stack perdeu o rótulo e a explicação da lógica de cor em 2026-09-23.** O texto de
  apoio virou "Todas as tecnologias e ferramentas que eu consigo aplicar com autonomia", e
  o parágrafo que explicava o significado das camadas saiu. **Foi decisão consciente, com a
  consequência declarada:** sem esse texto, os filetes dos cards e o realce dos chips
  deixam de comunicar camada para quem não conhece o sistema, e passam a ler como
  decoração. Não é regressão nem descuido.
- **Isso tirou a âncora do argumento que decidira a ordem da grade**, poucas horas antes, e
  a âncora foi trocada em vez de o critério ser abandonado: a sequência rosa, lavanda,
  ciano, âmbar é a do sistema de cor do projeto e vale em todo o site, com ou sem o
  parágrafo. **Fica como exemplo de um risco de manutenção real:** regra justificada por um
  texto morre quando o texto sai, e quem encontrar a ordem sem entender de onde ela vem
  reordena por outro critério.
- **O vão entre os chips da Stack é 5px, e não os 7 do Figma**, desde 2026-09-23. Vão menor
  faz caber mais chip por linha e encolhe a sobra no fim das linhas, que é o que incomodava.
  **Não elimina a sobra, e não era para eliminar.**
- **Justificar os chips foi considerado e recusado**, e o motivo fica registrado para não
  ser retentado no escuro. Numa linha de chips **só a largura dos chips ou a largura dos
  vãos pode absorver o buraco, não existe terceira**. Esticar chip quebra a gramática de
  pílula e deixa uma linha de um chip só virar uma pílula da largura do card. Esticar vão
  por `text-align: justify` preserva a largura e é a única técnica que trata a última linha
  certo, mas faz o vão variar de linha para linha dentro do mesmo card, o que **troca um
  buraco no fim por vãos desiguais no meio**, e custa sair do `flex gap` para `inline-block`
  com espaço injetado no JSX e vão vertical amarrado a `line-height`. **`space-between` é a
  armadilha óbvia e é pior que as duas**, porque estica a última linha também.
- **A seção "Setup de trabalho" saiu em 2026-09-23**, com as sete linhas de equipamento, e
  o `setup` mais o tipo `LinhaDoSetup` saíram do `conteudo/stack.ts` junto. A Stack ficou
  com cabeçalho e a grade de grupos, e só.
- **A seção COMUNIDADE do Sobre saiu em 2026-09-23**, e a Tech Girls virou a terceira
  entrada de EXPERIÊNCIA. Ela era um card com fundo tingido e link "Ver o case", e **o link
  saiu junto de propósito**: a experiência é linha do tempo, não card com chamada, e um
  link em uma das três entradas diria que as outras duas não têm caso, quando Bajaj e VOGE
  são trabalho da TecSinapse e o site do estúdio é do BORDA. Para o case ficar alcançável do
  Sobre, o certo é tratamento igual nas três, e isso passa pelo Figma. **Com isso a cota de
  uma caixa tingida por página está livre no Sobre.**
- **O formulário de contato voltou em 2026-09-23, só o front.** Ele tinha saído em
  2026-09-13 e foi recuperado do primeiro commit por `git show`, como estava previsto. O
  envio continua desligado e **o destino é decisão de outro momento**: não existe rota de
  API, e formulário que aceita envio e joga fora é pior que um desligado, porque a pessoa
  acredita que mandou. Botão desabilitado, com aviso visível.
- **A página voltou ao arranjo do Figma, duas colunas de 568 com 64 de intervalo:** canais
  e ponte do BORDA à esquerda, formulário à direita. Com isso **os canais voltaram a ser
  linhas com separador, e deixaram de ser três cartões**. O cartão era remendo do período
  sem formulário, quando sobrava uma coluna num espaço de duas, e a objeção antiga às
  linhas era a largura: na faixa de 1200 o rótulo e o endereço ficavam a novecentos pixels
  um do outro, e na coluna de 568 eles se leem juntos.
- **A seção "QUANDO ME CHAMAR" saiu em 2026-09-23**, com os quatro motivos, e o tipo
  `MotivoDeContato` saiu junto do `conteudo/contato.ts`. Ela existia para qualificar o
  contato enquanto não havia formulário; com o campo de assunto de volta, o select faz esse
  trabalho dentro do próprio fluxo.
- **O Contato é a única página interna sem rótulo acima do `h1`.** O `CabecalhoPagina`
  passou a aceitar `rotulo` opcional em 2026-09-23. Projetos e Stack continuam com o deles.
  Isso não mexe na estrutura de cabeçalhos, porque o rótulo sempre foi `p`, e não `h2`.
- **A linha de disponibilidade não é seção.** Ela é o texto de apoio do cabeçalho da
  página, onde o Figma a coloca, e hoje é só "Respondo em até 2 dias úteis". O "Prefiro
  conversar por escrito" saiu em 2026-09-23, **e saiu da descrição do metadata junto**:
  deixar a frase lá manteria ela viva no cartão de compartilhamento e na busca, num texto
  que ninguém reabre para conferir.
- **Passo 8, feito.** Os comportamentos de mobile. Duas peças novas em `components/ui/`:
  `acordeao-mobile`, que é o `details` nativo com o desktop sempre aberto, e `trilho-rolavel`,
  que é a moldura dos carrosséis. Elas são usadas pela seção de skills da home, pelo
  `bloco-codigo`, e por `bloco-numeros`, `bloco-paleta` e `bloco-imagens`. O
  `bloco-diagrama` empilha com seta para baixo. Alvo de toque tratado nos links do footer,
  nas pílulas do filtro, na migalha do case e nos links de seção da home.
- **Passo 9, feito.** Estrutura de cabeçalhos refeita, link de pular no `app/layout.tsx`,
  menu mobile virou modal de verdade, formulário ligado ao aviso de envio, e os três
  accents do tema claro escurecidos para passar em AA sobre o `surface-2`. Token
  `--border-forte` criado para borda que precisa ser vista, medida em 3:1.
- **Nav fixa no topo**, com fundo opaco. O `body` ganha `padding-top` e o `html` ganha
  `scroll-padding-top`, os dois pelo token de altura da nav.
- **Pacote de publicação, feito.** `lib/site.ts` guarda o endereço, o nome e a imagem de
  compartilhamento, e monta o metadata de cada rota. `app/sitemap.ts` e `app/robots.ts`
  saem do mesmo `SITE`. `app/not-found.tsx` é a página de 404, com as duas saídas. As
  sobras do template em `public/` foram apagadas.
- **Currículos no ar**, em `public/curriculos`, nos dois idiomas. Os caminhos vivem em
  `lib/site.ts` e não escritos à mão: quatro lugares apontam para eles, e os quatro erraram
  juntos quando os PDFs entraram com nome diferente do previsto.
- **Favicon e imagem de compartilhamento no ar.** O ícone é `app/icon.png`, de 512x512, e
  o `favicon.ico` do template foi apagado. O Next detecta o arquivo e emite a tag de ícone
  sozinho, mas **ele não gera tamanhos menores**: serve o mesmo 512 e declara o tamanho. O
  navegador reduz para 16 e 32, o que basta para uma marca simples.
- **Passada de animação, feita.** Tokens de movimento e o bloco de `prefers-reduced-motion`
  em `app/globals.css`, entrada ao rolar por `components/ui/revelar-ao-rolar`, accordion por
  `::details-content`, hover e foco dos cards, entrada do menu, hero, troca de tema e a
  prova visual dos cases.
- **Falta para publicar só o passo 10**, que é registrar o domínio, conectar o repositório
  e subir na Vercel.
- Próximo passo é o 10, deploy na Vercel e domínio.

### Metadata e compartilhamento

**O endereço do site vive em `lib/site.ts`**, e não espalhado. Três lugares dependem dele
e nenhum pode divergir: o `metadataBase` do layout, o sitemap e o robots.

**O `metadataBase` é o que faz o cartão existir.** Sem ele o caminho da imagem sai relativo
e as plataformas não conseguem buscá-la, e o link aparece sem cartão nenhum.

**A imagem de compartilhamento não é WebP, e essa é a única exceção à regra do projeto.** O
suporte a WebP em cartão é irregular entre as plataformas, e ali não existe substituto: ou
carrega ou o link sai sem imagem. JPEG e PNG servem os dois, e hoje o arquivo é JPEG.

**A extensão no `lib/site.ts` precisa bater com o arquivo em `public/imagens`, e não batia.**
A constante dizia `.png` e o arquivo em disco é `.jpg`, então o `og:image` de todas as 13
rotas apontava para um arquivo que não existe e **o cartão saía sem imagem em qualquer lugar
onde o link fosse colado**. Corrigido em 2026-09-14. Fica registrado porque é um defeito de
categoria ruim: **ele não aparece navegando no site**, só quando alguém compartilha, então
sobreviveu a todas as conferências visuais. Ao trocar a imagem, confira a extensão.

**Cada case tem cartão próprio**, com o título e a descrição dele. O título usado é o do
card, e não o `tituloCase`: o segundo existe para encurtar na tela, onde a migalha e a
ficha já dão contexto, e fora da página esse contexto não existe. Um link compartilhado
chamado "CRUD" não diz nada.

**HSTS vive no `next.config.ts`**, porque o plano Hobby da Vercel não expõe cabeçalho de
resposta no painel. Está em `max-age` de um ano com `includeSubDomains`, **sem `preload`**.
O `max-age` é reversível, basta baixar ou zerar que vale na próxima visita de cada pessoa;
**o preload não é**, porque os navegadores passam a trazer o domínio embutido e a remoção
depende de ciclo de versão deles. Ele fecha só a janela da primeiríssima visita, antes de o
cabeçalho ter sido visto uma vez, e para um portfólio isso não paga um compromisso de meses
sobre todo subdomínio futuro.

**Os outros três cabeçalhos** também vivem lá: `nosniff`, `Referrer-Policy` em
`strict-origin-when-cross-origin` e proteção contra enquadramento em duas formas,
`frame-ancestors 'none'` para navegador moderno e `X-Frame-Options: DENY` para os antigos e
para os scanners. O Referrer-Policy preserva a origem de propósito: é ela que permite ao
BORDA ver que a visita veio do portfólio, e as URLs do site são slugs públicos sem dado
sensível.

**A CSP tem uma diretiva só, e isso é completo, não pela metade.** `frame-ancestors` controla
quem pode embutir o site, e não o que o site carrega. Diretiva não declarada não é aplicada,
porque não existe `default-src` implícito, então ela não toca em next/image, fonte nem script.

**Uma CSP completa é outro trabalho, e o custo é concreto.** Dois obstáculos reais neste
projeto: o HTML tem dois scripts inline, o do tema e o payload do RSC, e `script-src` estrito
pediria nonce, que exige resposta dinâmica e derrubaria a pré-renderização estática das 13
rotas. E existem atributos `style` inline no hero e no bloco de paleta, que um `style-src`
estrito quebraria. O resto sairia barato: as fontes são hospedadas localmente pelo
`next/font`, em `/_next/static/media`, e todas as imagens são do próprio domínio, então
`'self'` cobriria `font-src` e `img-src`.

**O site mora no domínio raiz, sem www.** O `SITE` do `lib/site.ts` é a raiz, e dele saem
`metadataBase`, canônicas, `og:url`, sitemap e robots. O www redireciona para a raiz, e isso
é configurado na Vercel, num lugar só: duplicar em `redirects()` do `next.config.ts` arrisca
laço. O `includeSubDomains` é o que garante HSTS no www, já que o redirecionamento acontece
antes da aplicação e a resposta dele não passa pelos cabeçalhos do Next.

### Link externo abre em nova aba, e o e-mail não

**Tudo que sai do site abre em nova aba, com `rel="noopener"`:** os dois currículos em PDF,
o BORDA no rodapé e na página de Contato, o GitHub e o LinkedIn. Antes o site inteiro não
tinha **um** `target` nem **um** `rel`, e clicar em qualquer um deles abandonava a navegação.
O PDF é o caso mais claro: abrir o currículo na própria aba tira a pessoa do portfólio no
meio da leitura, e o caminho de volta é o botão voltar do navegador.

**O `mailto` é a exceção, e é deliberada.** Ele não navega, entrega para o cliente de
e-mail, e abrir aba para isso deixa uma aba em branco para trás em parte dos navegadores.

**`noopener` sim, `noreferrer` não.** O `noopener` corta o acesso da página aberta à que a
abriu, pelo `window.opener`, e é o que protege. O `noreferrer` também apaga o cabeçalho de
origem, e **isso brigaria com uma decisão já tomada**: o `Referrer-Policy` do projeto
preserva a origem de propósito, para o BORDA conseguir ver que a visita veio do portfólio.
Pôr `noreferrer` no link do BORDA apagaria exatamente a informação que a política existe
para deixar passar.

**Cada link que abre em nova aba avisa quem não vê a tela**, com um `sr-only` "(abre em nova
aba)". Mudança de contexto sem aviso é desorientação para quem usa leitor de tela, e o
projeto já tem o padrão de texto só para leitor, no "Fechar menu" e nos rótulos de bloco.

**Os canais têm uma fonte só, `conteudo/contato.ts`.** O rodapé lê de lá, pela função
`canalPor`, em vez de escrever o endereço de novo. **Eles já tinham divergido:** "LinkedIn"
e "E-mail" no rodapé apontavam para `/contato`, e não para o perfil e para o `mailto`, então
quem clicava em "E-mail" ia parar numa página em vez do cliente de e-mail. O `canalPor`
**quebra a compilação** se o canal não existir, porque um `href` vazio deixaria link morto no
rodapé de todas as páginas.

**Quando o painel da fase dois entrar, a rota dele precisa ser bloqueada no
`app/robots.ts`.** E vale lembrar que isso é para não aparecer em busca, e não é
segurança: quem protege o painel é a autenticação.

### Duas decisões de implementação do passo 8

**O accordion é o `details` nativo, e o componente não manda JavaScript nenhum.** Teclado,
semântica de disclosure e funcionamento sem JavaScript vêm da plataforma. O `open` do HTML
é o estado do mobile, que é onde o accordion existe.

**O `AcordeaoMobile` não é client component, e isso não é detalhe.** Ele não tem estado,
não tem handler e não manda JavaScript nenhum para o navegador: quem abre e fecha é o
`details`. Na passada de animação vai dar vontade de transformá-lo de volta em client para
controlar a transição, e o que se perde nisso é o funcionamento sem JavaScript, a semântica
de disclosure de graça e o teclado nativo. **A transição cabe em CSS**, no
`::details-content` com `interpolate-size`, sem voltar para estado em React.

O desktop fica sempre aberto por `::details-content`, redeclarando `content-visibility`
acima de 64rem. **Esse pseudo-elemento é a única forma de fazer isso**, porque quem esconde
o conteúdo de um `details` fechado é o navegador, e não uma regra que dê para vencer por
especificidade. Regra de folha de autor ganha da folha do user agent, então basta
redeclarar.

**O `@supports not selector(::details-content)` tem data para ser reavaliado.** O
pseudo-elemento virou Baseline em **setembro de 2025**, com Chrome 131, Safari 18.4 e
Firefox 143. O fallback existe só para quem está atrás disso, e devolve o cabeçalho
clicável no desktop. Quando a distância for grande o bastante, ele pode sair, e aí o bloco
inteiro do `@supports` no `app/globals.css` some junto.

**O caminho contrário não funciona, e está registrado no CSS porque é a armadilha óbvia:**
nascer com `open` e fechar por CSS no mobile inverte o botão. O primeiro clique tira o
`open`, o navegador esconde o que o CSS já escondia e nada acontece na tela; o segundo
devolve o `open` e o CSS esconde de novo. O painel nunca abre.

O rótulo aparece duas vezes, no `summary` do mobile e num elemento próprio do desktop, e só
um está no layout por vez. Fazer o `summary` servir aos dois custaria uma parada de
tabulação no desktop, num cabeçalho que lá não é clicável, anunciando um estado de
disclosure que a tela não mostra.

**O `tabIndex` do carrossel é medido, e não declarado.** Uma região que rola precisa ser
alcançável pelo teclado, senão o que está fora da tela fica inacessível. Só que a mesma
moldura no desktop não rola nada, e um `tabIndex` fixo criaria uma parada de tabulação
inútil em cada bloco de case. O `TrilhoRolavel` compara `scrollWidth` com `clientWidth`
por `ResizeObserver` e liga ou desliga o foco conforme a tela. Os atributos são escritos
direto no DOM em vez de virarem estado, porque estado ali seria `setState` dentro de
efeito a cada medição, que é o padrão que o ESLint deste projeto proíbe, e traria uma
renderização a mais sem mudar nada na tela.

### Como verificar o que você fez

`npm run dev` funciona normalmente, tanto com Turbopack quanto com webpack.

**Pergunte antes de subir servidor.** Em geral já existe um rodando na porta 3000. Use
ele em vez de subir outro.

**Se subir um servidor, derrube antes de encerrar.** Servidor órfão trava a porta, e o
erro que aparece depois não tem relação óbvia com a causa: o Turbopack falha ao criar o
processo do PostCSS com `0xc0000142` e parece problema de ambiente ou de CSS, quando é só
porta ocupada. Isso já custou uma sessão. `TaskStop` no comando em segundo plano não
mata o processo do node: confira a porta com `netstat -ano` e encerre pelo PID.

---

## Stack decidida

- Next.js com App Router, TypeScript
- Tailwind, sempre apoiado em design tokens declarados como CSS Variables
- Conteúdo em arquivos MDX no próprio repositório
- Deploy na Vercel, plano Hobby, a cada push na branch principal
- Sem banco de dados, sem serviço de storage

A Samara prefere soluções vanilla e evita dependência externa sem justificativa. Ela
implementa máscara e validação sem biblioteca. Respeite isso: cada dependência nova
precisa de motivo.

**Como o Tailwind entra aqui.** Cor nunca vira valor fixo no config. O config aponta para as
CSS Variables, então a alternância de tema continua acontecendo por CSS e não por classe
duplicada. Os nomes dos tokens seguem os nomes das variáveis do Figma (accent-rosa,
text-muted, surface, e assim por diante), não a escala padrão do Tailwind, porque no
sistema a cor tem significado de camada. A tipografia segue a mesma regra: DM Sans e
JetBrains Mono, com os tamanhos que estão no Figma.

---

## Estrutura de conteúdo

```
/conteudo
  /projetos
    bajaj.mdx
    voge-brasil.mdx
    assistente-de-ia.mdx
    ...
  /curriculos
    CV_Samara_Alanna_PT.pdf
    CV_Samara_Alanna_EN.pdf
```

Cada `.mdx` tem frontmatter e corpo em blocos:

```
---
slug: bajaj
titulo: Bajaj
tipo: engenharia
tags: [Full stack]
estado: no-ar
destaque: true
ordem: 1
publicado: true
---

:::secao{rotulo="LEADS" titulo="Um módulo central para os 106 formulários"}
O time comercial recebia lead com CPF inválido.
:::

:::codigo{arquivo="validacao.js"}
function validarCPF(cpf) { ... }
:::

:::numeros
106 | formulários com validação dupla
113 | arquivos refatorados
:::
```

**Campos do frontmatter:**

| Campo            | Valores                                                                           |
| ---------------- | --------------------------------------------------------------------------------- |
| `tipo`           | identidade-visual, ux-produto, engenharia                                         |
| `tipoSecundario` | opcional, mesmos valores                                                          |
| `estado`         | no-ar, em-construcao                                                              |
| `tags`           | valores do filtro: UX/UI Design, Full stack, Identidade visual, Projeto de estudo |
| `descricao`      | texto do card na listagem                                                         |
| `resumo`         | texto do card na home, mais curto e diferente do da listagem                      |
| `imagem`         | caminho da captura de prévia, em /public                                          |
| `ordemHome`      | posição na home. Ausente significa que o projeto não aparece lá                    |

### Imagens do conteúdo

**Sempre WebP, nunca PNG no repositório.** Arquivo grande entra no histórico do Git e não
sai. As nove capturas iniciais somavam 4975 kB em PNG e ficaram em 578 kB, uma redução de
88%.

O critério da conversão: **sem perda** para captura de tela com texto, onde ele já sai
barato e mantém a tipografia intacta, e **qualidade 90** para captura de site com foto,
onde o sem perda fica pesado e a perda é imperceptível.

As dimensões são lidas do próprio arquivo em build, por `lib/imagens.ts`, que traz
leitores de cabeçalho escritos à mão para PNG, JPEG e WebP. Não use biblioteca para isso:
a opção óbvia, `image-size`, carrega duas vulnerabilidades altas sem correção, e alerta
permanente vira ruído. **SVG não é suportado** e cai para `img` comum, o que não é
problema porque o next/image também não otimiza SVG.

**Por que existem `descricao` e `resumo`.** No Figma a home e a listagem usam textos
diferentes para o mesmo projeto. O Bajaj, por exemplo, fala de 77 páginas de concessionária
na home e de nove frentes de trabalho na listagem. Um campo só obrigaria a escolher um dos
dois e perder o outro.

**O filtro da listagem é por `tags`, não por `tipo`.** O frame no Figma se chama
"Filtro - TIPO", mas as cinco pílulas são valores de tags. O nome da camada é que está
errado.

**Blocos a implementar como componentes:** secao, citacao, codigo, imagens, numeros,
antes-depois, diagrama, paleta, opcoes. Todos implementados.

### Duas regras de escrita que os blocos impõem

**Linha em branco separa item.** Em `imagens`, `diagrama` e `antes-depois`, cada item vai
num parágrafo próprio, separado por linha em branco. Sem ela o Markdown junta tudo num
parágrafo só e o bloco passa a ver um item onde deveria ver vários.

**O bloco de fora precisa de mais dois-pontos que o de dentro.** Uma seção sem nada
aninhado usa três. Com um bloco dentro, quatro. Com dois níveis, cinco. Se os dois usarem
a mesma quantidade, o de dentro fecha o de fora e sobra um `:::` solto na página, visível
para quem lê.

```
::::secao{rotulo="RESULTADO" titulo="Em números"}
:::numeros
106 | formulários com validação dupla | rosa
:::
::::
```

**A cor do número diz a camada.** O terceiro campo do bloco `numeros` aceita rosa,
lavanda, ciano ou ambar, seguindo o significado de camada do sistema de cor. Sem ele, o
número sai em rosa.

**O bloco `antes-depois` tem dois formatos.** Com `formato="numero"` ele recebe duas
linhas de `valor | legenda` e monta a comparação, com o antes apagado e o depois em ciano.
Com `formato="codigo"` ele recebe dois blocos de código e não repete rótulo, porque cada
bloco já tem o seu na barra de título. Sem atributo, coloca dois filhos lado a lado com os
rótulos por cima.

**Doze blocos, e não nove.** Além dos nove previstos, os cases exigiram mais três:
`destaque`, a caixa com fundo tingido, limitada a uma por página; `duo`, que põe dois
conteúdos lado a lado, usado na seção de formulários do VOGE, onde o texto fica de um lado
e o código do outro; e `frase`, uma frase grande com legenda explicativa acima, usada no
posicionamento do Tech Girls.

**As três avaliações do Bilheteria não entram no site.** Elas são capturas reais de loja
de aplicativo e de site de reclamação, com nome de pessoas que reclamaram de verdade, e
duas trazem nome completo. A seção de evidência ficou só com o texto, que já descreve o
padrão das reclamações sem citar ninguém. As telas de perfil e de evento da imagem grande
do case são fictícias, com dados inventados e foto de banco de imagens, e essas podem ser
publicadas.

**O bloco `paleta` tem três formatos.** O padrão é a amostra nua, arredondada, com nome e
hex embaixo, que é o do Tech Girls. Com `formato="cartao"` vira card com borda, amostra de
120px no topo e bloco de informação embaixo, que é o do Míriam e do StivalDay. Com
`formato="inline"` vira amostra de 14px ao lado do hex, numa fileira, que é a mini-paleta
dos painéis de comparação do Assistente. O atributo `titulo` põe um rótulo acima, para
quando duas paletas aparecem lado a lado. A linha divide a largura igualmente entre
quantas cores existirem.

**O bloco `diagrama` é uma etapa por linha,** com explicação opcional no segundo campo, e
o caminho alternativo vem pelo atributo `desvio`, no formato `condição | o que acontece`.

**O bloco `citacao` aceita `tom="neutro"`,** que desliga o realce da primeira linha. Serve
para ressalva de um parágrafo só.

**O bloco `duo` aceita `divisor="true"`,** que põe o filete em accent entre as duas
colunas, igual ao da seção de skills da home.

**O bloco `imagens` tem dois formatos.** O padrão é grade de colunas iguais. Com
`formato="linha"` vira fileira de altura igual e largura proporcional à imagem, que é o
que a seção de marca do Míriam precisa, onde um retrato e uma paisagem dividem a linha. Em
colunas iguais o retrato viraria quase o dobro da altura da paisagem.

**Imagem de fonte tem largura máxima de 2400px.** Um mockup de 4096px para um slot de 471
gera arquivo de 660 kB que fica no histórico do Git para sempre. Redimensione antes de
converter para WebP.

**O bloco `opcoes` tem quatro campos:** `rótulo | título | descrição | camada`. A camada
colore o rótulo e é opcional. Quando o rótulo é ESCOLHIDA, o card ganha borda em accent, e
não fundo tingido, porque a cota de caixa tingida costuma já estar gasta pelo `destaque`.

**O filete da citação diz a camada.** O atributo `camada` aceita rosa, que é o padrão,
lavanda, ciano e ambar. No CRUD o "Impacto esperado" usa âmbar porque avisa que o número
não foi medido. No VOGE a integração usa ciano porque é back-end e dados.

**O diagrama é um card só, com uma linha por caminho.** A primeira linha é o caminho
principal e o último passo dela sai em ciano. As linhas seguintes são desvios e saem em
âmbar, com o primeiro campo como condição.

**`tituloCase` existe para quando o case tem nome mais curto que o card.** O card se chama
"Remake do CRUD de permissões" e a página de case se chama só "CRUD". Ausente, cai no
`titulo`.

**A ficha técnica vem do frontmatter, não do corpo.** Ela é estruturada e sempre tem os
mesmos lugares, então no painel vira campo a campo em vez de texto livre. Os rótulos mudam
por modelo, por isso cada linha carrega o próprio:

```
ficha:
  - PAPEL | Desenvolvimento full stack, segurança e infraestrutura
  - CLIENTE | Bajaj do Brasil, via TecSinapse
```

**Campos separados por barra vertical.** Em `numeros`, `paleta` e `opcoes`, cada linha é
um item e os campos são separados por `|`.

```
:::numeros
106 | formulários com validação dupla
:::

:::paleta
#e6b7d3 | Rosa | design e produto
:::

:::opcoes
Página dedicada | Mais passos, mantém o histórico à vista | escolhida
:::
```

O terceiro campo é opcional nos três. Em `opcoes` ele marca a opção escolhida. Formatação
Markdown dentro dessas linhas é perdida, porque só o texto sobrevive à extração.

---

## Organização do projeto

### Páginas e seções

Cada página é uma pasta em `app/`. Dentro dela, uma pasta `_secoes/` com um arquivo por
seção, nomeado `secao-<nome>.tsx`.

```
app/
  page.tsx
  _secoes/
    secao-hero.tsx
    secao-o-que-eu-faco.tsx
    secao-trabalhos-recentes.tsx
    secao-sobre-mim.tsx
  projetos/
    page.tsx
    _secoes/
    [slug]/
      page.tsx
  sobre/
    page.tsx
    _secoes/
  stack/
  contato/
```

O underscore em `_secoes` é obrigatório. Sem ele o Next trata a pasta como rota.

Os cases não têm seções em arquivo. O conteúdo vem dos MDX e as seções são geradas pelos
blocos.

### Componentes compartilhados

Fora de `app/`, em `components/`.

```
components/
  blocos/     componentes que o MDX invoca: bloco-secao, bloco-codigo, bloco-numeros...
  layout/     nav, footer, seletor-tema
  ui/         botao, tag, badge
```

### Onde o conteúdo vive

**Texto corrido dentro do layout fica no TSX da seção.** O parágrafo do hero, a bio da
home, a frase de um CTA. É texto que só existe naquele lugar e muda junto com o desenho.

**Lista estruturada é dado, e vive em `/conteudo`.** Os chips da Stack, as certificações,
os cargos, os cursos, os canais de contato. São listas que crescem sozinhas: chip novo a
cada tecnologia aprendida, certificação nova a cada curso, cargo novo a cada emprego.

O critério é esse: **muda mais que o layout, é dado.** Se ficar em TSX, o painel da fase
dois nunca alcança e trocar uma linha de texto vira alteração de código.

```
conteudo/
  projetos/       os cases, em MDX
  stack.ts        grupos de habilidade e setup de trabalho
  sobre.ts        experiência, formação, certificações, idiomas
  contato.ts      canais diretos e assuntos do formulário
```

**Par de campos é lista, e não frase.** Os idiomas eram uma string só, `"Português nativo -
Inglês intermediário - Espanhol básico"`, e viraram lista de `{ idioma, nivel }` em
2026-09-23. Cada idioma é um par de campos, igual ao par que certificações (`nome` e
`origem`) e formação (`periodo` e `modalidade`) já usam, e **escrever par de campos como
frase corrida obriga a tela a exibir junto o que o dado não separa**. A tradução futura
depende disso também: "nativo", "intermediário" e "básico" precisam ser traduzidos, e numa
string única não dá para trocar só eles sem reescrever a frase.

**Na tela eles usam a construção dos itens de certificação**, valor em texto normal e dado
técnico em mono embaixo, e **não ganham caixa de propósito**: eles vêm depois das
certificações, que também não têm caixa, e é a ausência dela que alinha os dois últimos
blocos da página.

**IDIOMAS virou seção própria, com `h2`, em 2026-09-23**, quando desceu para depois das
certificações. **A mudança de lugar forçou a mudança de nível, e essa é a regra a levar
adiante:** um `h3` pertence ao `h2` que vem antes dele, então bloco que muda de vizinho
muda de dono. Continuar `h3` ali faria a estrutura dizer que idioma é uma certificação.

**O rótulo subiu de peso junto**, do `text-ficha-rotulo` de sub-rótulo para o
`text-rotulo-secao` das outras seções. A regra de que rótulo de seção é cabeçalho vale no
inverso também: um `h2` com cara de sub-rótulo é a mesma incoerência ao contrário. **O custo
está anotado no componente:** três itens de duas palavras passam a pesar como as catorze
certificações, e isso é o preço de ser assunto próprio.

Sim, a home é a exceção, e é deliberada: lá o conteúdo é texto corrido, não lista.

### lib/

Código que não é componente nem seção: o plugin de MDX, leitura de arquivo, funções
puras. Nada que renderize.

```
lib/
  mdx.ts      plugin que converte directive em componente
  texto.ts    extração de texto de children, para os blocos com formato "valor | rótulo"
```

### Decoração ancora no conteúdo, nunca na viewport

Elemento decorativo posicionado em absoluto, como as luzes do hero e as manchas de seção,
tem que ancorar no contêiner de conteúdo e não na borda da tela. Eles foram desenhados em
relação ao texto: a mancha fica atrás do título, a diagonal cruza o hero. Ancorados na
viewport, eles acompanham a borda enquanto o conteúdo fica centralizado, e em monitor
largo a luz escorrega para o lado do texto.

Na prática: a camada decorativa vai dentro de um contêiner com `max-width:
var(--largura-maxima)` e `margin-inline: auto`, igual ao `.faixa`, e não solta com
`inset-0` na seção.

Isso já aconteceu uma vez, quando o `max-width` entrou. O `max-width` não criou o
problema, só tornou visível uma dependência que já existia.

### Altura de linha de grade é a do item mais alto, e isso já custou um vão

Vale para qualquer grade de duas colunas onde os lados têm alturas muito diferentes.

**O cabeçalho do Sobre teve um vão enorme entre o título e a apresentação até 2026-09-23.**
As quatro partes eram filhas diretas da grade: título e foto na linha 1, apresentação e
botão na linha 2. Como altura de linha é a do item mais alto, a linha 1 media os 296px da
foto, e a apresentação, presa à linha 2, só podia começar depois disso. **Não era altura
fixa, margem nem resto de uma versão antiga: era a grade fazendo exatamente o que ela faz.**

A saída foi tirar a foto de uma linha sozinha. Foto e botão viraram um invólucro só, que
atravessa as duas linhas, e o texto voltou a fluir. **No mobile o invólucro some por
`display: contents`**, que tira a caixa do fluxo e devolve os filhos como itens diretos da
grade, e é o que permite intercalar as duas ordens sem repetir marcação.

**As linhas são `auto 1fr`, e o `1fr` não é enfeite.** Quando um item que atravessa linhas é
mais alto que elas, a sobra é repartida entre as linhas que ele cruza. Com duas linhas
`auto` a sobra se divide igualmente e **metade dela volta para o vão que acabou de ser
corrigido**. Com uma linha flexível, toda a sobra vai para ela.

**A coluna da direita ganhou `self-center` em 2026-09-23**, para a foto e o botão ficarem
centrados contra o bloco de texto inteiro. **Isso não reabriu o vão, e a razão é ordem de
cálculo:** a grade dimensiona as linhas primeiro e só depois posiciona os itens dentro da
área deles, então `align-self` nunca realimenta a altura das linhas. Vale como regra geral:
**alinhamento move a caixa já medida, dimensionamento decide o tamanho da linha**, e trocar
um pelo outro é a confusão que faz alguém mexer em `align-items` esperando resolver vão.

Os dois não são redundantes, resolvem coisas diferentes e **precisam dos dois**: sem o
`1fr` o vão volta, sem o `self-center` a foto encosta no topo. A condição para a centragem
ficar honesta é a coluna da esquerda continuar mais alta que a direita, e hoje ela é por uns
70px; se a apresentação encurtar a ponto de inverter, a área de centragem passa a ser maior
que o texto visível e a saída é encurtar a direita, não mexer nas linhas.

**A mesma troca resolveu os cards da Stack**, onde a contagem de chips varia por grupo. Ali
ela tem um preço que foi aceito de olho aberto: com altura igual, diferença de conteúdo vira
espaço vazio, e o agrupamento por camada põe o Processo, de 5 chips, ao lado do Interface e
design, de 13, deixando uns 72px vazios embaixo do menor. **O vazio é inerente ao
agrupamento e não se resolve no layout:** as duplas passam a ser definidas pela cor, e
inverter dentro do par ou trocar a ordem das linhas não muda nada. A decisão foi preferir o
vazio à contradição com o texto de abertura.

**O mesmo grupo de regras resolveu os cards de formação.** Eles tinham `items-start`, que
encolhe cada card até o próprio conteúdo, e com um título de duas linhas ao lado de um de
uma os dois terminavam em alturas diferentes. Sem o `items-start` volta o `stretch` e os
dois medem a linha inteira; o `mt-auto` na linha de metadados empurra ela para o rodapé,
senão a altura fica igual mas a sobra aparece embaixo do card mais curto.

### Nome de seção é curto, pelo assunto

O arquivo leva o assunto da seção, não o rótulo que aparece na tela. `secao-skills.tsx` e
não `secao-o-que-eu-faco.tsx`, `secao-trabalhos.tsx` e não `secao-trabalhos-recentes.tsx`.
O rótulo visível muda com revisão de texto, e o arquivo não deveria ser renomeado por
causa disso. O componente dentro acompanha em PascalCase.

```
app/_secoes/
  secao-hero.tsx        SecaoHero
  secao-skills.tsx      SecaoSkills
  secao-trabalhos.tsx   SecaoTrabalhos
  secao-sobre.tsx       SecaoSobre
```

Exceção deliberada: `secao-em-construcao.tsx` mantém o nome longo porque ele espelha o
valor `estado: em-construcao` do frontmatter. Encurtar quebraria essa ligação.

### Nomenclatura

Arquivo em minúscula com hífen: `secao-o-que-eu-faco.tsx`.
Componente dentro do arquivo em PascalCase: `SecaoOQueEuFaco`.

Windows e macOS não diferenciam maiúscula de minúscula no nome de arquivo. Linux
diferencia, e a Vercel builda em Linux. Nome de arquivo inconsistente quebra o build só em
produção, que é o pior lugar para descobrir.

---

## Sistema de design

**Cor significa camada, não decoração:**

- rosa: design e produto
- lavanda: front-end
- ciano: back-end e dados
- âmbar: ressalva, honestidade, estado em construção

Os valores já foram lidos das variáveis do Figma nos dois modos, conferidos em contraste
e escritos em `app/globals.css`. **O CSS reflete o estado atual e não precisa ser
reconferido a cada sessão.** O Figma continua sendo a fonte quando algo mudar lá: se um
valor for alterado no arquivo, ele é relido e o CSS é atualizado a partir dele, nunca o
contrário. Não copie hex de texto em conversa, nem invente valor que não exista na
coleção.

**Tipografia:** DM Sans para corpo e títulos, JetBrains Mono para rótulo, código e dado
técnico. A alternância entre as duas é o conceito do site (design e código), então
preserve onde ela existe.

**A marca é "Samara Alanna", sem sufixo.** O `.dev` em accent saiu em 2026-09-14, junto com
o domínio que ele citava: o site mora em portfoliosamara.com.br, e uma marca que diz `.dev`
aponta para um endereço que não existe. Ela vive num componente só,
`components/layout/logo.tsx`, usado pela nav, pelo menu mobile e pelo footer, então os três
mudaram juntos. **O componente continua em uso e não deve ser removido:** o que sumiu foi o
`span` do sufixo, e com ele a alternância tipográfica dentro da marca, que agora carrega só
o lado "código", a fonte mono. A alternância continua no whoami da home, nos rótulos de
seção e nos blocos de código.

**Chip é pílula no site inteiro, e a Stack não abre exceção.** Tag de card, pílula de filtro
e chip da Stack usam o mesmo raio completo. O Figma teve os chips da Stack em raio de 8px
até 2026-09-23, e **o código é que está certo**: duas gramáticas de chip fariam o mesmo
elemento significar coisas diferentes por página, e quem lê não tem como saber qual é a
regra. O Figma foi corrigido para a pílula.

**O badge "Em construção" segue a tipografia das tags, e não a de rótulo em mono.** DM Sans
regular 12, sem tracking, mesmo padding e mesmo raio, resultando na mesma altura. Do lado
das tags do card ele é irmão delas, não rótulo de outra família.

**O que o separa da tag é o matiz do texto, e só isso.** A borda é a mesma `--border` delas.
Ele já teve borda em `accent-ambar` cheio e gritava, e a medição mostrou que **o peso estava
num eixo só**: o fundo tingido custa 0,2 de contraste contra o card, ou seja nada, e no tema
claro é até mais fraco que o fundo da tag; o texto empata no claro. A borda é que era dez
vezes mais forte no escuro e seis no claro. **Trocar o fundo, que é a hipótese natural, não
teria resolvido e ainda tiraria o badge da família dos chips preenchidos.**

**No hover do card os chips acendem, cada um na sua cor:** as tags em rosa, o badge em âmbar.
Parado, o badge viraria o chip mais apagado da fileira e pareceria desligado; em rosa, diria
que é do mesmo tipo que as tags, que é o que âmbar existe para negar. Quem manda é o card:
os chips não são interativos sozinhos, são descrição do que ele contém. O Figma teve o badge em mono 11 por um tempo, em dez
lugares, e foi corrigido em 2026-09-02: se ele reaparecer em mono, é regressão.

**Tema:** claro e escuro, controlado por CSS Variables. O Figma tem os dois modos na
coleção "Cores". A alternância precisa persistir entre sessões.

**Qual tema aparece na primeira visita.** A preferência do sistema operacional manda
enquanto não existe escolha salva, via `prefers-color-scheme`. Isso é acessibilidade:
quem configurou o sistema em claro por sensibilidade à luz não deve receber uma tela
escura de cara. A escolha explícita, no atributo `data-tema` do `html`, sobrescreve a
preferência do sistema nos dois sentidos. A mecânica e a ordem de especificidade que
sustentam isso estão comentadas em `app/globals.css`, junto do próprio código.

---

## Regras de conteúdo por tipo de case

Três modelos. O `tipo` do frontmatter decide as seções.

**identidade-visual** (Tech Girls, Míriam, StivalDay): a imagem carrega, texto entre 180 e
250 palavras. Hero com a marca, contexto, estratégia, sistema (cor e tipografia), logo,
aplicações.

**ux-produto** (CRUD, Assistente, Bilheteria): o raciocínio carrega, 300 a 400 palavras.
Hero com a tela, contexto, decisão, sistema, trade-off, status.

**engenharia** (Bajaj, VOGE): código e número carregam, 300 a 400 palavras. Hero, contexto,
três frentes, em números.

**Projeto de dois tipos** (Spirito): layout do primário, com uma seção extra do secundário.

**Estado em construção:** o case não renderiza o corpo. Só nav, título com badge âmbar,
frase centralizada "Este projeto ainda está em construção", uma linha de apoio, próximo
projeto e footer.

---

## Adaptações mobile já definidas no Figma

Leia do arquivo, mas o resumo do comportamento:

- Nav vira hambúrguer. Menu abre como painel, não tela cheia, com os cinco links, o
  seletor de tema e o CTA. **O seletor de idioma não fica no menu**, e sim no hero, que é
  onde o Figma o coloca.
- **Nav e menu mobile usam a mesma lista, com cinco links.** O Contato saiu da nav do
  desktop por um tempo, porque o CTA "Entre em contato" cobre o destino, e voltou em
  2026-09-13: link de nav é onde a pessoa procura por hábito, e não achar Contato ali custa
  mais do que a repetição. Com isso a nav do desktop volta aos oito controles do Figma, e
  `links-nav.ts` exporta uma lista só.
- Padding lateral de 120 vira 24.
- Todo grid de duas ou três colunas vira coluna única, **com duas exceções, e as duas são
  conteúdo comparativo curto**: a ficha técnica do case, que fica em duas colunas de 123,
  e o `antes-depois` com `formato="numero"`, que mantém os dois cards lado a lado.
  Empilhar destrói a comparação, que é a razão de o bloco existir. As duas estão assim no
  Figma.
- "O que eu faço" vira accordion, chevron para baixo. **O lado Design abre por padrão e o
  lado Código fica fechado**, como está no Figma. Decisão tomada durante o design.
- Blocos de código viram accordion fechado, com o nome do arquivo no cabeçalho.
  Código não quebra linha: rolagem horizontal dentro do bloco.
- Grades de números, paletas e variações de logo viram carrossel horizontal. **O bloco
  `imagens` com uma coluna só e a paleta `inline` não viram**, porque num caso é uma
  imagem única e no outro é legenda de quatro amostras de 14px.
- Diagramas de fluxo empilham com seta para baixo.
- Alvo de toque mínimo de 44px em tudo que é clicável.
- **Na home o link de seção desce.** "Todos os projetos" e "Minha trajetória completa"
  ficam ao lado do rótulo no desktop e depois do conteúdo no mobile. As duas seções são
  grade de duas linhas por causa disso, para o link não precisar existir duas vezes no
  HTML.
- **No Sobre a foto entra entre o título e a apresentação**, com a largura toda, e o
  "Baixar CV" vai para o fim. No desktop os dois são a coluna da direita. **Quem faz as duas
  ordens conviverem é `display: contents`** no invólucro da coluna da direita: no mobile a
  caixa some do fluxo e foto e botão voltam a ser itens diretos da grade, onde um `order`
  joga o botão para depois da apresentação. Esse invólucro já foi quatro partes soltas na
  grade e **isso criava um vão** (ver a seção de animação e layout, no cabeçalho do Sobre).
- **O bloco `whoami` da home empilha abaixo da bio.** No Figma ele não aparece no mobile,
  mas isso foi consequência da adaptação de layout, não decisão de conteúdo. Ele é a
  metade "código" da alternância que é o conceito do site, e some-lo deixaria o celular
  vendo só a metade "design".
- **A escala tipográfica encolhe no mobile.** Os tamanhos foram reduzidos durante o
  design, então leia a tipografia dos frames de desktop e dos de mobile, nunca só de um.
  O título do hero, por exemplo, é 80 no desktop e 34 no mobile.

---

## Painel administrativo (fase dois)

**Não bloqueia o lançamento.** O site funciona lendo os MDX direto do repositório. O painel
entra depois e vira case próprio.

**Autenticação, usuário único:**

- Senha em variável de ambiente, hash Argon2
- Sessão em cookie httpOnly, secure, sameSite strict. **Nunca localStorage.**
- Rate limit no login
- TOTP como segundo fator
- Mensagem de erro sempre igual, para não permitir enumeração de usuário
- URL secreta é conveniência, não proteção. Não trate como camada de segurança.

**Como escreve:** sem banco. O painel faz commit nos arquivos MDX pela API do GitHub, o
push dispara build na Vercel, o site atualiza em um ou dois minutos. Mostre esse estado
na interface ("publicando" que vira "publicado"), senão a pessoa acha que não salvou.

### O envio do formulário é o que falta

**O formulário está no ar desde 2026-09-23, e só o front.** A marcação, o visual e a
acessibilidade estão prontos em `app/contato/_secoes/secao-formulario.tsx`. O que não
existe é destino, e **essa decisão é dela, não foi tomada**.

Ele saiu em 2026-09-13 porque dependia de serviço externo, e formulário que despacha para
terceiro não demonstra nada tecnicamente. O que fecha o ciclo é rota de API própria, com
validação escrita à mão, e aí vira caso de uso de verdade em vez de enfeite.

**Para ligar o envio:** por o `action`, tirar o `disabled` do botão e remover o aviso. Os
cinco campos já têm `name`, tipo e `autoComplete` certos.

**Cinco campos**, cada um com rótulo associado por `htmlFor` e `id`: NOME, EMAIL, TELEFONE,
ASSUNTO e MENSAGEM. **O telefone é o único opcional**, e o rótulo diz isso em texto, e não
por asterisco, que precisa de legenda para significar alguma coisa. Os outros quatro têm
`required`, que hoje não é exercido porque o envio não acontece, e passa a valer no dia em
que acontecer.

**Os cinco assuntos do select vivem em `conteudo/contato.ts`**, e é por isso que não
precisaram ser reescritos: eles ficaram lá parados os dez dias em que o formulário esteve
fora. São a única parte do formulário que é conteúdo, e não código.

**O `--border-forte` voltou a ter uso, e é este.** Ele foi criado para borda de campo, ficou
parado quando o formulário saiu, passou pelo filete da folha do hero e pelo botão neutro e
saiu dos dois. **Manter o token parado foi a decisão certa**, porque apagar teria custado
refazer a medição de 3:1 agora. Campo é componente interativo e o limite dele precisa de
3:1; a `--border` comum fica em 1,2 e deixaria os campos quase invisíveis. Isso os deixa
mais visíveis que no Figma, e é intencional.

**Três decisões de acessibilidade que não são óbvias e não devem ser desfeitas:**

- **O `h2` do formulário é só para leitor de tela**, ligado ao `form` por `aria-labelledby`.
  O Figma não põe título ali, e a coluna ao lado já se chama CANAIS DIRETOS.
- **O aviso vem antes do botão no HTML.** Botão desabilitado não recebe foco, então quem
  navega por teclado nunca chega nele e o `aria-describedby` sozinho não seria lido. Na
  ordem de leitura o aviso explica o botão morto antes de a pessoa esbarrar nele.
- **Enter não envia, e isso vem de graça do botão desabilitado.** O envio implícito do HTML
  aciona o botão padrão, e botão desabilitado não tem comportamento de ativação. Sem isso o
  formulário faria GET na própria rota e **a mensagem inteira apareceria na barra de
  endereço**. Ao ligar o envio, isso deixa de ser automático e precisa ser tratado.

### A máscara de telefone

**Escrita à mão, sem biblioteca**, em `components/ui/campo-telefone.tsx`. **Só este campo é
client component**, e não o formulário: máscara precisa reagir a cada tecla, o resto não tem
estado nem handler e continua no servidor.

**Ela formata pelos dígitos, e não pelo que está escrito**, então colar em qualquer formato
dá o mesmo resultado. O corte muda com o tamanho: até dez dígitos sai 4 mais 4, que é fixo,
e no décimo primeiro vira 5 mais 4, que é celular.

**Três armadilhas que já custaram correção, e que a próxima reescrita vai reencontrar:**

1. **O cursor volta para onde estava, ancorado na contagem de dígitos.** Campo controlado
   joga o cursor para o fim a cada reescrita, e sem isso quem corrigisse o DDD de um número
   já digitado seria cuspido no fim da linha a cada tecla. A âncora é dígito, e não posição
   em caracteres, porque os separadores entram e saem sozinhos. Em `useLayoutEffect`, senão
   o cursor pisca no fim por um quadro.
2. **O 55 da frente cai quando passa de 11 dígitos.** Quem copia do WhatsApp cola com código
   do país, e sem a regra "+55 41 99999-8888" virava "(55) 41999-9988", **um número errado
   com cara de certo**, que é o pior defeito possível num campo de contato. A condição é o
   comprimento, e não o 55 sozinho: 55 também é DDD do Rio Grande do Sul, e um (55) legítimo
   tem 11 dígitos e não é tocado.
3. **Não existe `maxLength`, e isso é deliberado.** Ele parece o reforço óbvio e sabota a
   regra acima: "+55 41 99999-8888" tem 17 caracteres, o navegador corta em 15 antes de o
   `onChange` disparar, e a máscara recebe o texto já mutilado. **O limite real é de dígitos,
   não de caracteres**, e mora na própria função de formatar.

**Currículo:** PDF vai para o repositório, também via API do GitHub, em base64.
**Limite de 5 MB no upload**, porque arquivo grande entra no histórico do Git e não sai.

**Telas prontas no Figma:** login (senha e TOTP), lista de projetos, editor de projeto,
currículo. Nos dois temas.

**Editor:** campo de texto MDX com pré-visualização, mais uma barra que insere o esqueleto
do bloco no cursor. Não construa formulário por tipo de bloco.

---

## Trabalho futuro: tradução do site

**O seletor de idioma do hero fica desabilitado até isso acontecer.** A tradução entra
depois que o site estiver finalizado. Nada aqui é para fazer agora: está escrito para o dia
da decisão não começar do zero, e para o tamanho não ser surpresa.

O currículo já existe nos dois idiomas, e é a única parte bilíngue hoje.

### 1. Roteamento, e a decisão de como a URL fica

**Subcaminho é o caminho óbvio aqui**, `/en/projetos`, com um segmento dinâmico em `app/`.
Subdomínio exigiria outro domínio na Vercel, e query string não serve porque buscador trata
como a mesma página.

O que isso custa, em concreto:

- **As 13 rotas mudam de lugar**, para dentro de um segmento de idioma, com
  `generateStaticParams` para os dois valores. É a maior mexida estrutural da tarefa.
- **`lib/site.ts` passa a montar caminho com idioma.** Canônica, `og:url` e sitemap saem de
  lá, então o ponto de mudança é um só, o que é a boa notícia.
- **`app/sitemap.ts` dobra**, de 13 para 26 URLs.
- **O `lang="pt-BR"` do `app/layout.tsx` é fixo hoje** e passa a depender da rota.

**A decisão que precisa ser consciente: a raiz continua sendo português, ou passa a
redirecionar para `/pt`?** Manter `/` como português preserva todo link já compartilhado e
tudo que o buscador já indexou. Redirecionar é mais simétrico e quebra os dois.

### 2. Os textos das páginas e dos oito cases

Os MDX ficam em `conteudo/projetos/`. A tradução pede um conjunto paralelo, por pasta ou por
sufixo no nome, e `lib/conteudo.ts` passa a receber o idioma.

**Nem todo campo do frontmatter viaja.** `titulo`, `descricao`, `resumo`, `abertura` e a
`ficha` são texto. `slug`, `ordem`, `ordemHome`, `destaque`, `imagem` e `heroCase` são
estrutura, e duplicar estrutura convida divergência: um `ordem` diferente entre idiomas
muda a ordem da listagem e o encadeamento de próximo projeto sem ninguém perceber.

**O `slug` é uma decisão com consequência.** Manter o mesmo nos dois idiomas é mais simples
e mantém funcionando o `name` do `<ViewTransition>`, que hoje é `capa-<slug>` e
`titulo-<slug>`. Traduzir o slug é melhor para busca, mas aí o seletor de idioma precisa de
uma tabela de correspondência para saber para onde apontar.

**As `tags` são conteúdo visível**, porque são os rótulos do filtro da listagem, e vivem em
`lib/filtros.ts`. Elas também precisam de tradução, e o filtro compara por texto.

**A confidencialidade vale igual na versão em inglês.** O case do Assistente descreve o
produto genericamente de propósito, e tradução não é hora de "esclarecer" nome de produto
interno. Os nomes proibidos estão no topo deste documento e continuam proibidos.

### 3. Nav, rodapé e textos de interface

Hoje o texto de interface está solto no TSX, e **isso é regra do projeto**: texto corrido
fica na seção, lista estruturada vai para `/conteudo`. **A tradução quebra essa regra**, e
essa é a consequência arquitetural que vale antecipar: texto corrido em TSX não se traduz
sem um dicionário. Ou a regra ganha exceção, ou ela muda.

O que precisa ser varrido, além do óbvio:

- `links-nav.ts`, `nav.tsx`, `menu-mobile.tsx`, `footer.tsx` e o CTA.
- Toda seção em `app/_secoes/` e nas `_secoes/` das páginas internas.
- **Os rótulos padrão dos blocos**, como o "ANTES" e o "DEPOIS" do `bloco-antes-depois`.
- **Os nomes acessíveis, que são os mais fáceis de esquecer porque não aparecem na tela:**
  `sr-only`, `aria-label`, `alt` de imagem, "Pular para o conteúdo", "Abrir menu", "Fechar
  menu", "Código de ...", a contagem anunciada do filtro e os textos da página de 404.
- O `metadata` de cada rota, incluindo título, descrição e o texto alternativo da imagem de
  compartilhamento.

### 4. hreflang

**O lugar já existe:** `metadataDaPagina`, em `lib/site.ts`, monta o metadata de todas as
rotas, e é lá que entra `alternates.languages`. O sitemap também aceita alternates.

Três coisas que costumam sair erradas: precisa incluir **`x-default`**; as referências
precisam ser **recíprocas**, porque buscador ignora hreflang que aponta para uma página que
não aponta de volta; e cada versão precisa apontar **para si mesma** além da outra.

### 5. O seletor quando as duas versões existirem

**A colocação atual só funciona enquanto ele é decorativo.** Hoje ele vive no hero, e o hero
só existe na home. Com as duas versões no ar, quem estiver lendo um case não teria como
trocar de idioma. **Ele provavelmente precisa ir para a nav e para o menu mobile**, o que
contraria a decisão registrada na seção de mobile, tomada quando ele era estático. Isso é
mudança de desenho e passa pelo Figma.

O resto:

- **Precisa apontar para a página equivalente, não para a home.** Depende do caminho atual,
  e da tabela de slugs se os slugs forem traduzidos.
- **Precisa ser link de verdade**, e não botão, para ser rastreável e abrir em nova aba.
  Com `hreflang` e `lang` em cada opção, e `aria-current` na ativa.
- **A escolha vive na URL, e não em cookie.** Cookie com redirecionamento cria a armadilha
  clássica de a pessoa não conseguir chegar na outra versão.

### Uma decisão de ordem, antes de tudo isso

**A tradução e o painel da fase dois se atropelam, e quem vier depois paga.** O painel
escreve MDX pela API do GitHub; se ele nascer monolíngue, ganhar idioma depois significa
mexer no editor, na lista de projetos e no fluxo de publicação. Se a tradução vier primeiro,
o painel já nasce sabendo. Vale decidir a ordem antes de começar qualquer um dos dois.

---

## Acessibilidade

Ela lista WCAG na stack e isso precisa aparecer no código.

- **Estado de foco visível em tudo que é focável.** Feito no passo 3, em
  `app/globals.css`. Não existe no Figma: é requisito, não enfeite.
- Contraste mínimo AA. As variáveis do Figma já foram corrigidas para isso durante o
  design, mas confira o resultado renderizado.
- Navegação por teclado no menu mobile, nos accordions e nos carrosséis.
- HTML semântico. Ela lista isso na própria stack.

### Regras de estrutura que o passo 9 fixou

**Rótulo de seção é cabeçalho.** Os rótulos em mono e caixa alta que abrem cada seção
("O QUE EU FAÇO", "EXPERIÊNCIA", "CREDENCIAIS") são `h2`, e os títulos de item dentro delas
são `h3`. Eles já eram o título da seção na tela, só não eram no HTML, e sem isso a página
ficava com um `h1` e um monte de `h3` soltos.

**Duas exceções.** O rótulo do cabeçalho de página, aquele que fica acima do `h1`, continua
`p`: ele é um selo, não um cabeçalho. E no `bloco-secao`, quando existe título grande, o
rótulo continua `p` e o título é o `h2`; sem título grande, o rótulo vira `h2`, senão a
seção fica sem cabeçalho nenhum.

**A nav é fixa e o fundo dela é opaco, não desfocado.** O motivo principal não é estético:
o painel do menu mobile é renderizado dentro da nav e se posiciona pela viewport, e
`backdrop-filter` criaria bloco de contenção para descendente `fixed`, fazendo o painel
passar a se posicionar pela barra. O menu quebraria por causa de um efeito visual. Somam-se
a isso o contraste, que com desfoque passa a depender do que estiver rolando por baixo, e o
custo de GPU por quadro em página de case que passa de cinco mil pixels. **O filete de baixo
não está no Figma** e existe porque com fundo opaco o conteúdo some atrás de uma borda
invisível.

**Nav fixa cobra duas compensações**, as duas em `app/globals.css` e as duas presas ao
`--altura-nav`: `padding-top` no `body`, que devolve o espaço que ela ocupava, e
`scroll-padding-top` no `html`, sem o qual o link de pular leva ao conteúdo com a barra por
cima do começo dele. O `scroll-padding` está no `html`, e não no destino, para valer para
qualquer âncora futura.

**O menu mobile é modal, e isso são três coisas juntas:** `role="dialog"` com `aria-modal`,
foco preso no Tab e foco devolvido a quem abriu. O `aria-modal` sozinho não prende o foco
do teclado, então sem a armadilha a pessoa sai do painel e vai tabulando por uma página que
não está vendo.

**Cabeçalho duplicado no accordion não é erro.** O `AcordeaoMobile` renderiza o rótulo duas
vezes, no `summary` e no elemento fixo, e só um está no layout por vez. Ao contar
cabeçalhos numa auditoria, os dois aparecem no HTML e só um conta.

### Os três níveis de texto, e por que não têm folga

Resolvido em 2026-09-01, nos dois lados, Figma e código. Fica registrado porque quem for
mexer nesses tokens precisa saber onde está a margem.

O `text-dim` do tema escuro nasceu em 2,15 de contraste e foi subido durante o design para
passar em AA. A correção funcionou, mas ele acabou colando no `text-muted`: 5,41 contra
5,06, ou seja 1,07 entre os dois, indistinguível na tela. O mesmo aconteceu no tema claro,
em grau menor, com 1,30.

O diagnóstico é que **em ambos os temas o nível terciário estava certo e quem tinha se
aproximado era o secundário.** Por isso a correção subiu o `text-muted` e quase não mexeu
no `text-dim`.

Valores hoje, com 1,45 de separação nos dois temas:

| Token        | Escuro    | Claro     |
| ------------ | --------- | --------- |
| `text`       | `#f0ede8` | `#1a1815` |
| `text-muted` | `#a09c97` | `#534e4a` |
| `text-dim`   | `#847f7a` | `#6b6660` |

**O `text-dim` está encostado no piso do AA nos dois temas.** Sobre o `surface-2`, que é o
fundo mais claro do escuro e o mais escuro do claro, ele dá 4,53 e 4,58 contra o mínimo de
4,5. Não tem folga nenhuma. Se algum dia for preciso separar mais os níveis, mova o
`text-muted`. Mexer no `text-dim` ou no `surface-2` quebra AA em texto de card.

Meça sempre contra o `surface-2`, não contra o `bg`. O `bg` é o fundo mais favorável e
esconde o problema.

Os accents do tema claro têm o mesmo tipo de restrição, registrada em comentário dentro do
`app/globals.css`, junto das variáveis. **Eles foram escurecidos em 2026-09-02**, no passo
de acessibilidade: `#b64388`, `#804fd8` e `#36787d` davam 4,08, 4,20 e 4,09 sobre o
`surface-2` e reprovavam em texto pequeno. Hoje são `#aa3e7f`, `#7a47d6` e `#337075`, com
4,57, 4,57 e 4,55. **Aqui também quem tinha que se mover era o outro lado:** clarear o
`surface-2` até resolver o levaria a `#f6f1e9`, que dá 1,01 sobre o `bg` e faz a camada
deixar de existir.

### As duas bordas, e quando usar cada uma

**`--border` é decoração.** Ela delimita card, e card se identifica pelo próprio fundo, então
1,2 de contraste basta e é de propósito.

**`--border-forte` é borda que precisa ser vista para a interface funcionar, medida em 3:1.**
O critério é funcional, e não estético: **limite de componente interativo**, como campo de
formulário e botão de contorno neutro, onde 3:1 é requisito de acessibilidade.

**Fronteira decorativa não entra, mesmo quando os dois lados têm a mesma cor.** O filete da
folha do hero foi `--border-forte` por um dia: 3,3 de contraste numa linha que atravessa a
tela inteira lia como régua preta no tema claro. **Medição dizia que a linha precisava ser
vista; o olho dizia que ela gritava, e numa borda decorativa o olho decide.** Ali quem
comunica a camada são os cantos arredondados, que revelam o hero nas duas pontas; o filete é
refinamento sobre eles, não o portador do significado.

Ele se chamava `--border-campo` e foi renomeado em 2026-09-14, quando ganhou o segundo uso e
ficou claro que o nome descrevia um caso e não o critério.

**QUANDO A LINHA SAI, O ESPAÇO PRECISA CRESCER, E MAIS DO QUE PARECE.** O filete entre as
experiências do Sobre saiu em 2026-09-23, e a separação subiu de 64px para 72px. O critério
não é o valor, é a razão contra o maior vão **de dentro** do item: ali ele é 16px, então 72
dá 4,5 vezes e as duas escalas não se confundem. Manter os 64 teria deixado o grupo ambíguo,
porque quem estava separando de verdade era a linha, e não o espaço que já existia.

**CONTRASTE DECIDE SE A LINHA EXISTE, ESPESSURA DECIDE O PESO DELA.** As duas coisas são
independentes, e trocar uma pela outra é o erro comum: engrossar uma linha fraca deixa um
borrão largo em vez de uma linha. O filete da folha tem 3,3 de contraste e 0,5px de
espessura, e é fino e nítido ao mesmo tempo. Vale para qualquer linha do projeto.

---

## Animação

**O layout estático vem primeiro.** Animação é uma passada própria, depois que as páginas
estiverem fechadas. Não distribua animação no meio da construção das telas.

**Única exceção: a transição de tema.** Trocar claro e escuro sem transição dá um corte
brusco, então isso entra junto do seletor de tema, no layout base.

### Duas regras que valem para toda a passada

**1. `prefers-reduced-motion` é obrigatório, e não opcional.** Quem configurou o sistema
para reduzir movimento recebe o site sem animação. Isso precisa estar decidido desde o
começo: pensado no fim, vira remendo em cada componente. A transição de tema também
respeita a regra.

**2. Não anime propriedade que causa reflow.** Nada de `height` ou `width`. O par seguro é
`transform` e `opacity`, que o compositor resolve sem recalcular layout. O accordion é o
caso mais provável de alguém implementar do jeito fácil e o resultado engasgar, porque
revelar altura desconhecida não tem solução puramente de compositor. A técnica atual para
isso é animar `grid-template-rows` de `0fr` para `1fr`, que ainda dispara layout, mas só
dentro da própria subárvore do accordion. A escolha final fica para a passada de animação,
e precisa ser consciente.

### A regra que sustenta a passada inteira

**Nenhum estado invisível mora no estilo base.** Quem esconde é sempre o keyframe, com
`fill-mode` `backwards` ou `both`, ou um atributo que só o JavaScript escreve. Assim o
elemento aparece se a animação não rodar, por movimento reduzido, por script bloqueado ou
por qualquer falha. O caminho oposto, esconder no CSS e revelar na animação, transforma
qualquer defeito em página em branco.

**`opacity` menor que 1 cria bloco de contenção para descendente `position: fixed`**, igual
ao `backdrop-filter`. Nenhum elemento com `data-revelar` pode ser ancestral da nav, do
painel do menu ou do link de pular.

### O que anima, e o que não anima

Animam: entrada de bloco ao rolar, hover e foco dos cards e dos botões, accordion, entrada
do menu, o hero e a troca de tema.

**O botão tem dois níveis em uso, e um terceiro parado:**

| Classe | Visual | Para quê |
| --- | --- | --- |
| `.botao-cheio` | fundo accent | o que o site quer que a pessoa faça |
| `.botao-contorno` | borda e texto accent | o CV e os três links de seção da home |
| `.botao-neutro` | borda `--border-forte`, texto `--text` | **sem uso desde 2026-09-14** |

**O terceiro nível existia para os links de seção, e a Samara decidiu tirá-lo de lá em
2026-09-14**, com a consequência na mão. Fica registrado o que se perdeu, para não voltar
como descoberta: "Baixar CV" e "ir para a listagem" passam a pesar igual, e a cor accent
deixa de significar "ação" para significar "clicável". Quem olhar a home e achar que falta
hierarquia entre os três botões rosa está vendo o preço da decisão, e não um defeito.

**Os que estão em uso não respondem igual.** O cheio levanta e escurece o fundo, pelo token
`--accent-rosa-hover`. O de contorno só ganha fundo em `tint-rosa`, sem levante. O neutro,
se voltar, só afia a borda, de `--border-forte` para `--text`: fundo neutro no hover dele
não serviria, porque `--surface` e `--surface-2` ficam a menos de 1,2 do `--bg` e o estado
seria invisível.

**`.botao-neutro` ficou sem nenhum uso**, e está parado de propósito. **O `--border-forte`
não: ele voltou a ter uso em 2026-09-23**, na borda dos campos do formulário de contato, que
é para o que ele nasceu. Manter o token parado por dez dias foi o que evitou refazer a
medição de 3:1 agora, e vale lembrar disso antes de apagar a classe do botão neutro: se um
dia ela sair, o token fica, porque os dois deixaram de andar juntos.

**Cada variante é selecionada pela própria classe**, e não por exclusão das outras nem por
ordem no arquivo. Exclusão obrigaria toda variante nova a lembrar de entrar numa lista de
`:not`, e ordem quebra quando alguém reordena o CSS.

**O `--border-forte` está de volta no lugar de origem.** Ele foi criado para borda de campo
de formulário, ficou parado quando o formulário saiu, serviu no botão neutro pelo mesmo
motivo (borda é o que identifica componente sem preenchimento, e limite de componente
interativo precisa de 3:1), ficou parado de novo quando o botão neutro saiu, e **voltou aos
campos em 2026-09-23**. Os números: 3,28 no escuro e 3,38 no claro sobre o `--bg`, contra
1,2 da `--border` comum, que é decoração de card e faria um campo quase invisível.

**Os três links de seção da home são botões, e não texto com seta.** "Ver stack completa",
"Todos os projetos" e "Minha trajetória completa", todos de contorno rosa, todos na mesma
grade de duas linhas: ao lado do rótulo no desktop, depois do conteúdo no mobile. **As outras setas
do site não são links de seção e ficam como estão:** a migalha do case, o próximo projeto,
o "Ver o case" dentro do card da Tech Girls, as pílulas do BORDA e as setas do
`bloco-diagrama`.

**Eles mantêm o padding de 22 por 10, e não o de 26 por 15 do "Baixar CV".** O que a Samara
pediu igual é o tratamento de cor, e não o tamanho: eles vivem numa grade de duas linhas ao
lado do rótulo da seção, e crescer mudaria o layout. Com 10 de padding, 24 de entrelinha e
1 de borda eles dão 45px de altura, então continuam acima do alvo de toque sem precisar do
`alvo-toque-vertical`.

**O escurecimento é token medido, e não filtro de brilho**, porque é cor sobre a qual texto
é lido. O texto do botão é o `--bg`: 8,49 sobre o hover no escuro e 6,42 no claro, contra
11,26 e 5,08 no estado normal. No tema claro o hover aumenta o contraste, porque o fundo
escurece e o texto continua claro. A diferença entre normal e hover é de 1,33 no escuro e
1,26 no claro, o bastante para notar sem ser brusca.

**Não animam:** tags, chips, itens de lista, a troca de filtro na listagem, que precisa de
resposta imediata e brigaria com o `aria-live` da contagem, e o corpo de texto dos cases,
que é onde a pessoa passa mais tempo lendo.

**A nav e o footer saíram dessa lista em 2026-09-14**, e a distinção que faltava é esta:
**entrada e hover não são a mesma coisa.** O que a regra queria evitar era borda de página
se mexendo enquanto a pessoa lê, e isso continua valendo, nav e footer não têm entrada nem
movimento próprio. Hover só existe depois que a pessoa já apontou para o link, então não
compete com nada: é o retorno que confirma o alvo.

**Os chips da Stack acendem na cor da camada do card**, pela classe `.chip-stack`, com o
mesmo tratamento das tags de projeto: texto e borda passando para a cor, em `--dur-rapida`
`linear`. **A cor desce do card por herança**, numa `--cor-camada` que cada card declara, e
por isso a regra no CSS é uma só: escrever um par de regras por camada daria o mesmo
resultado e quebraria na primeira camada nova.

**Quem dispara é o chip, e não o card, e isso é o contrário do card de projeto.** Lá quem
manda é o card, porque ele é um link e as tags descrevem o que ele contém. O card da Stack
não é link nenhum, e acender dezessete chips de uma vez por causa do ponteiro sobre o card
seria um lampejo de cor sem alvo. Chip a chip, o realce segue o ponteiro e a camada de cada
item fica legível durante a varredura.

**HOVER EM COISA NÃO CLICÁVEL FOI DECISÃO CONSCIENTE, E NÃO DESCUIDO.** O chip da Stack não
é link nem botão, e resposta de ponteiro normalmente sugere que dá para clicar. Foi aceito
em 2026-09-23 porque aqui o realce lê como "este item é desta camada" e não como botão, e
porque a alternativa, deixar a página inteira sem resposta de ponteiro, custava mais. **Não
existe par no teclado, e isso está certo:** o chip não é focável porque não há o que ativar,
então não há `:focus-visible` a espelhar. No card de projeto existe, porque lá o alvo é um
link de verdade. **Isso não abre precedente para hover decorativo em qualquer lugar:** o que
justifica aqui é o chip carregar informação, a camada, que o realce revela.

**Os links de navegação acendem em rosa no hover**, pela classe `.link-realce`, usada pela
nav, pelo menu mobile e pelas colunas do footer. Antes eles não tinham resposta de cor
nenhuma, e o único sinal era o cursor virar mãozinha, o que não diz qual item está sob o
ponteiro quando eles ficam a 32px um do outro. A duração é `--dur-rapida` em `linear`, a
mesma dos chips e dos botões. **O estado ativo continua sendo o `--text` do link e o rosa
não o substitui:** ativo diz onde a pessoa está, hover diz onde o ponteiro está, e o link da
página atual também acende, porque continua sendo um link.

**As cinco regras de dosagem da entrada ao rolar** estão comentadas no `app/globals.css`,
junto do CSS que elas governam. As duas que mais importam: uma vez por elemento e nunca de
novo, e nada anima na primeira pintura.

### As três ousadias, e por que elas são exceção

O conteúdo geral não compete com a leitura. Três lugares fogem disso de propósito, porque o
custo é baixo e o ganho é alto.

**No hero, só as luzes se movem.** A troca de fonte do título e a entrada do cartão
do tokens.css existiram e foram removidas em 2026-09-13: os dois nascem prontos. Nada mais
anima na carga da página.

**Cada luz do hero é a união de três manchas**, e não uma forma só. É daí que vem a
silhueta orgânica: cada mancha é um gradiente radial que termina em transparente, e enquanto
elas deslizam e respiram uma sobre a outra o contorno da união muda de verdade. Nenhuma se
deforma; a soma sim.

**Os SVG do Figma saíram de uso em 2026-09-13, e os arquivos continuam em
`public/imagens/luz/`.** Eles tinham 1800 e 1285 de largura, maiores que a área visível e
recortados. Objeto que preenche o quadro não tem para onde viajar, então a amplitude tinha
que ser pequena e o movimento ficava quase parado. **A saída foi encolher a forma em vez de
encolher o deslocamento.**

**A paleta é a dos SVG, lida dos arquivos**: violeta `#5B21B6`, violeta `#7C3AED` e magenta
`#D82F9E`. Mudou a geometria, não a cor. **Uma quarta luz, em magenta `#D82F9E`, entrou em
2026-09-14**, porque com três formas roxas a cena ficava dominada por roxo.

**O alfa é medido, e não estimado.** O que importa não é o número do alfa, é quanto a luz
levanta a luminância do fundo. Sobre o `--bg` escuro, `#0c0c0b`, o roxo mais forte da cena,
`#7C3AED` a 0,50, levanta 0,0352. O magenta a 0,40 levanta 0,0317, que é 90% disso. **O 0,40
não foi escolhido no olho:** é exatamente o pico que o magenta já tem dentro da luz 3, então
é um valor que a cena já contém.

**O `accent-rosa` do sistema foi testado nesse lugar e não serve.** O `#e6b7d3` é rosa
pastel, com luminância 0,554 contra 0,191 do magenta. Ele funciona como texto e como acento
pequeno, mas como massa de luz clareia demais e rouba a atenção: pela mesma conta ele
empataria com o roxo mais forte já em alfa 0,237, menos da metade, e ainda leria como o
elemento mais claro da tela. **Cor clara pede alfa menor, e quando o alfa fica pequeno
demais a massa perde a cor e vira véu.**

**A quarta luz é menor e fica no canto superior direito**, que era a região vazia: o roxo se
concentra em cima à esquerda, pela luz 1, e embaixo à direita, pela luz 3. Ela é acento, não
uma quarta massa igual.

**As manchas da luz 4 têm `animation-delay` negativo**, senão as quatro luzes respirariam no
mesmo compasso, porque todas as animações partem do carregamento da página. As três
primeiras continuam em fase entre si, o que é pouco perceptível porque os pais delas se
movem diferente, mas é o mesmo truque se um dia incomodar. A opacidade de cada mancha é menor que a do arquivo
original porque três se sobrepõem, e é a soma que precisa bater com a intensidade de antes.
Como agora a cor está em CSS, dar valores por tema passou a ser trivial, o que antes exigia
dois arquivos.

**A queda do gradiente é `(1 - t²)³`, e não linear.** O primeiro desenho ia da cor cheia até
`transparent` em duas paradas, parando em 70% do raio, e no ponto de parada a inclinação
saltava de negativa para zero. O olho lê descontinuidade de inclinação como contorno, e as
manchas apareciam como elipses recortadas em vez de luz. Esta curva chega a zero com
inclinação também zero, então não existe ponto onde a queda termina. São onze paradas
amostrando a curva, o que de quebra reduz o banding. **As paradas terminam na mesma cor com
alfa zero**, e não na palavra `transparent`, para o matiz não desviar perto da borda.

**Nada de `filter: blur`, e ele já esteve ali.** Um `blur(30px)` foi acrescentado como
seguro contra banding e **removido em 2026-09-14**, quando a rolagem do hero para a folha
começou a engasgar.

**O motivo é área, e não raio.** Um desfoque de 30px sangra cerca de 90px para cada lado, e
a região filtrada de cada mancha fica 180px maior que a mancha. Somando as doze, a textura
ia de 51 para 92 MB no desktop a DPR 2, e de 33 para 88 MB num celular a DPR 3, onde ela
quase triplica, porque o sangramento é fixo em pixels CSS e a densidade de tela é maior.
Somando: as manchas animam `scale`, que muda a resolução que a textura precisa ter, e em
camada filtrada isso obriga a rodar o desfoque de novo em vez de só compor a textura pronta.

**O gradiente não precisa dele.** Quem matou a borda dura foi a curva `(1 - t²)³` com onze
paradas; o desfoque protegia só contra banding. **Se o banding aparecer, a saída é mais
paradas na curva, e não trazer o filtro de volta.**

**Como diagnosticar engasgo nas luzes, se voltar.** São 20 camadas promovidas, cinco por
luz: os dois invólucros de eixo, que são baratos porque não pintam nada, e as três manchas,
que carregam textura. No DevTools: *Rendering → Paint flashing* durante a rolagem diz se elas
estão sendo repintadas ou só compostas, e o painel *Layers* dá a memória de cada uma. **A
sentinela do `PausaForaDaTela` não ajuda nesse caso:** ela desliga as luzes depois que a
folha cobre o hero, e o engasgo acontece durante a rolagem, quando elas precisam estar
visíveis. O custo precisa cair, não ser adiado.

**Quicar é duas ondas triangulares independentes.** Uma por eixo, em elementos separados:
reflexão numa parede vertical inverte o X e não toca no Y, que é o que `alternate` faz num
eixo só. O `alternate` só retraçaria o caminho se os dois eixos tivessem o mesmo período,
que era o defeito da primeira versão.

**O curso é simétrico em volta da posição de base, e isso é acessibilidade.** Com movimento
reduzido não existe animação, a luz fica na base, e a base precisa ser uma composição boa.
Se o curso fosse de zero para um lado só, o estado parado seria o canto. O curso usa `vw` e
`dvh` porque o hero tem a altura da viewport menos a nav.

**Não use JavaScript para o movimento.** A conta é trivial, mas um laço de
`requestAnimationFrame` obriga a thread principal a acordar a cada 16ms para sempre, numa
página feita para rolar. A animação CSS roda no compositor. É diferença de categoria.

**O cursor é secundário, e a proporção diz isso**: o movimento próprio percorre centenas de
pixels, o ponteiro desloca algumas dezenas. Mouse parado, as luzes continuam navegando. O
`components/ui/luz-segue-cursor` só escuta `pointermove`, limita a uma escrita por quadro e
grava duas variáveis; o atraso é uma `transition` no `translate`. Sem ponteiro fino o ouvinte
nem é registrado.

**Os observadores de tela dependem do caminho, e isso é obrigatório.** `RevelarAoRolar`,
`PausaForaDaTela` e `LuzSegueCursor` vivem no layout, que persiste entre rotas. Com
dependência vazia eles observariam só os elementos da montagem inicial, e sair da home e
voltar traz nós novos no DOM. O `PausaForaDaTela` teve exatamente esse bug, corrigido em
2026-09-13: as luzes animavam para sempre, inclusive fora da tela.

### O hero preso, e a folha que sobe por cima

Na home o hero fica parado e a seção de skills sobe por cima dele. **É `position: sticky`,
sem JavaScript**, resolvido pelo compositor: não é ouvinte de rolagem e não acorda a thread
principal a cada quadro. Efeito de rolagem feito assim não engasga; feito com
`requestAnimationFrame` engasga.

**O invólucro `hero-pilha` é o que contém o efeito.** Sem ele o hero grudaria até o fim do
`main`, a página inteira, e ficaria composto até o rodapé. As outras três seções não sabem
que ele existe.

**Cinco coisas andam juntas, e tirar qualquer uma quebra o conjunto:**

0. **A folha precisa de borda desenhada, e isso é o que resolve o estado intermediário.**
   O fundo dela e o do hero são o mesmo `--bg`. Sem borda, parar no meio da rolagem não
   mostra folha sobre folha: mostra o título do hero cortado por uma linha invisível, o que
   lê como falha de renderização. **Com filete e cantos superiores arredondados, a posição
   intermediária deixa de ser o pior estado do efeito e vira o melhor**, porque é o único
   momento em que dá para ver que são duas superfícies.

   **O filete usa `--border-forte` e não a `--border` comum.** Aqui os dois lados têm a mesma
   cor, então a linha é o único sinal e precisa ser vista: 3,28 no escuro e 3,38 no claro,
   contra 1,2 da `--border`. Ela funciona nos dois temas sozinha, ficando mais clara que o
   fundo no escuro e mais escura no claro. **Contraste decide se a linha existe; espessura
   decide o peso**, e por isso ela continua com 0,5px. **Raio de 24px:** os cards usam 12,
   que numa borda de 1440px de largura não se vê, e acima de uns 32 a folha lê como cartão
   flutuante.

   **O filete usa a `--border` comum**, a mesma do topo do rodapé, e é discreto de
   propósito: quem comunica a camada são os cantos. Ele já foi `--border-forte` e voltou,
   porque 3,3 de contraste numa linha que atravessa a tela lia como régua preta no claro.

1. **A folha de cima precisa de fundo opaco, `z-index`, largura de borda a borda e uma tela
   de altura.** A skills era transparente e o fundo vinha do `body`. E ela tinha a `faixa`
   na própria seção, então o fundo parava nos 1200 e as luzes do hero apareciam nas bordas
   esquerda e direita. **A `faixa` desceu para um div interno:** o fundo vai de borda a
   borda e o conteúdo continua na medida de sempre. A altura mínima é a mesma do hero,
   `100svh - altura-nav`, senão a folha cobre só uma faixa no meio da tela e o resto do hero
   continua aparecendo em cima e embaixo dela.

   **Foi assim que o seletor PT/EN pareceu vazar por cima da folha.** Não era empilhamento:
   o hero é contexto isolado pelo `isolate`, nenhum filho dele tem `z-index` positivo, e
   nada ali pode pintar acima de um irmão posterior com `z-index: 1`. O seletor fica no alto
   do conteúdo do hero, e a folha curta simplesmente ainda não tinha chegado nele. Sintoma,
   não causa: se a folha não cobre a tela inteira, **todo** elemento do hero fora da faixa
   dela fica à mostra.
2. **A skills perdeu o `data-revelar`.** Seriam duas entradas no mesmo elemento, e durante o
   fade ela ficaria semitransparente justo quando deveria cobrir o hero. O deslize é a
   entrada dela.
3. **O hero usa `svh`, e não `dvh`.** O `dvh` era o certo enquanto ele rolava junto, mas
   preso vira defeito: a barra de endereço do celular some e volta, o `dvh` muda junto, e o
   hero mudaria de altura no meio do movimento com o título centralizado andando sozinho. O
   preço do `svh` é uma faixa de fundo quando a barra está escondida, que a folha cobre.
4. **A pausa das luzes deixou de poder usar interseção.** Preso, o hero continua
   intersectando a viewport mesmo totalmente coberto, e **interseção não sabe de oclusão**.
   Por isso existe a sentinela `#fim-do-hero` e o `data-gatilho` no `PausaForaDaTela`: quem
   é observado passou a poder ser outro elemento. Sem isso as doze manchas animariam atrás
   de uma folha opaca.
5. **Movimento reduzido desliga.** Sticky não anima nada e a pessoa segue no controle da
   rolagem, mas o efeito cria diferença de velocidade entre camadas com o fundo a zero, e
   isso é parallax, citado nominalmente como gatilho vestibular. Sair custa uma declaração.
   **O filete e os cantos saem junto:** sem hero preso não há camada, e borda de folha sem
   nada por baixo é decoração sem significado.

**O foco atrás da folha, e por que `scroll-margin` não resolve.** Com o hero preso e
coberto, um Shift+Tab devolve o foco aos botões dele, o navegador não rola porque considera
que já estão visíveis, e o anel é desenhado debaixo da camada opaca. O `scroll-margin` age
sobre a rolagem que o navegador faz para trazer um elemento à tela, **e essa rolagem nunca
acontece**: a premissa da regra não é satisfeita. O que resolve é o
`components/ui/foco-no-hero`, que ao receber foco volta a página ao topo se ela estiver
rolada. Não é sequestro de rolagem: a pessoa pediu para chegar naquele controle, e levar o
controle à vista é o que o navegador faria se soubesse de oclusão.

### Transição entre páginas

A capa e o título do card viajam para a página de case, pelo `<ViewTransition>` do React,
importado de `react`. **Funciona no App Router sem configuração nenhuma**: não instale
`react@canary` nem ative flag experimental. O par se forma pelo `name` igual dos dois lados,
`capa-<slug>` e `titulo-<slug>`.

**Cinco dos oito cases não têm `heroCase`**, e neles só o título viaja. O par de capa não se
forma e degrada bem. Quando o campo for preenchido, o morph passa a funcionar sem tocar em
código.

**Duas condições da documentação do Next**, que fica em `node_modules/next/dist/docs/`: o
morph só acontece quando o destino renderiza no mesmo commit da navegação, o que exige rota
pré-carregada, e **o modo de desenvolvimento não pré-carrega**, então isso só se confere em
build de produção. Durante a transição o hit-testing pula os elementos nomeados, por isso
ela dura 320ms.

**O `default="none"` com `share` explícito é o par recomendado**: sem o `share`, o
`default="none"` desliga o morph em silêncio. É uma das duas armadilhas que o guia oficial
lista.

**O círculo do tema precisou ser escopado antes disso existir.** As regras estavam escritas
como `::view-transition-new(root)` sem qualificação, e isso não é regra de troca de tema, é
regra de qualquer transição de view: toda navegação herdaria o círculo, expandindo a partir
das coordenadas do último clique no botão de tema. Hoje elas exigem a classe
`trocando-tema-circulo`, posta e retirada pelo seletor.

**O guia oficial está instalado no repositório**, em `.agents/skills/`, pela skill
`vercel-react-view-transitions`. Ele traz as receitas de CSS, os padrões e a solução de
problemas. Leia antes de mexer em transição de view.

**A troca de tema entra por um círculo que nasce no botão clicado**, pela View Transitions
API. Transição de mesmo documento é Baseline desde outubro de 2025; sem suporte, ou com
movimento reduzido, cai na transição de cor que já existia. As variáveis de origem e raio
são escritas pelo componente, porque dependem de onde o botão está na tela.

**O whoami da home é digitado**, e a técnica é a mesma ideia do resto: o texto ocupa o
lugar final desde o primeiro quadro e o que anima é `clip-path`. A receita clássica de
máquina de escrever anima `width` com `steps`, e isso é propriedade de layout mudando a
cada passo. O `steps` com o número de caracteres, que vem do dado por variável, faz o
recorte parar na fronteira de cada glifo, e isso só funciona porque a fonte é monoespaçada.

**O tempo por caractere tem um piso, e não é de gosto: um quadro, 16,7ms a 60Hz.** O
`steps` divide a duração pelo número de caracteres, então esse é o intervalo entre um
caractere e o próximo. A digitação nasceu em 14ms e ficava **abaixo do quadro**: em parte
dos quadros dois caracteres apareciam juntos e o `steps` era engolido pela taxa de
atualização da tela. Não era rápido demais para gostar, era rápido demais para existir.
**Corrigido em 2026-09-14 para 32ms**, quase dois quadros por caractere, com folga para tela
de 120Hz. A sequência inteira foi de 2,29s para 4,72s.

**A pausa entre linhas acompanha o tempo por caractere**, porque ela só lê como fim de linha
enquanto for claramente maior que o intervalo entre caracteres. Em 90ms contra 14 ela era
6,4 intervalos; contra 32 seria 2,8, e passaria a ler como um caractere lento. Está em
120ms, 3,75 intervalos, um meio-termo a favor do total: manter a proporção antiga pediria
205ms e somaria mais 1,2s à sequência.

**Os dois são token de CSS, e o TypeScript não carrega tempo nenhum.** O tempo por caractere
já foi uma constante do `secao-sobre.tsx` **e** um valor escrito de novo no CSS, dois lugares
que precisavam concordar. Hoje o componente manda só contagem, que é dado (quantos
caracteres a linha tem, quantos caracteres e quantas linhas vieram antes dela), e o CSS
multiplica por `--dur-caractere` e `--intervalo-linha`. Ajustar a velocidade é mexer num
token. **O cursor usa a mesma conta de atraso das linhas**, com o total no lugar do
acumulado, e por isso ela mora numa propriedade só.
**Só a partir de 64rem**, porque abaixo disso os valores longos quebram em duas linhas e o
recorte revelaria as duas ao mesmo tempo. O cursor pisca e para quando o bloco sai da tela,
pelo mesmo `PausaForaDaTela` das luzes do hero, que por isso subiu do hero para o layout.

**Os cards de trabalhos da home entram pelos lados**, e a assimetria da grade é o assunto:
o card grande vem da esquerda, os três empilhados vêm da direita. Não é fila, são dois lados
montando a grade. **Uma cortina por `clip-path` na capa foi tentada antes e descartada.**

**Distância e duração andam juntas.** A primeira versão era 32px em 400ms, ou 80px/s, e o
movimento passava despercebido: não era rápido demais, era **curto** demais. Aumentar só a
duração teria piorado, porque distância curta em tempo longo lê como arrasto. Hoje são 120px
em 620ms no desktop, perto de 195px/s, e 72px no mobile, onde a grade é coluna única e a
assimetria que justifica o gesto não existe.

**O escalonamento é proporcional à duração**, não um número fixo. São 110ms, cerca de 18%
dos 620: a proporção em que cada card tem início distinguível e o grupo ainda lê como um
movimento só. Com os 80ms de antes sobre uma entrada longa, os quatro empilhariam e a
sequência se perderia. A sequência inteira leva 950ms. **Este é o único lugar da home com
escalonamento.**

**Os valores são tokens:** `--dur-entrada-cartao`, `--intervalo-cartao` e
`--deslocamento-lateral`, separados do `--dur-entrada` geral porque o gesto é outro. Os
blocos fazem um fade de 12px; os cards atravessam a grade.

**O `overflow-x: clip` na seção não é enfeite.** `translate` não causa reflow, mas conta como
estouro rolável: os três cards que entram pela direita empurram a largura do documento e
aparece barra horizontal durante a animação. Quem entra pela esquerda não causa isso, porque
estouro à esquerda não é alcançável em leitura da esquerda para a direita. É `clip` e não
`hidden` de propósito: `hidden` criaria contêiner de rolagem.

**A seção não faz mais a própria entrada.** O `data-revelar` continua, porque é ele que o
observador enxerga e é o gatilho, mas o fade padrão está cancelado ali, como nos blocos de
prova dos cases. Somar os dois daria deslocamento vertical da seção ao mesmo tempo que
horizontal dos cards, e a diagonal resultante não é gesto nenhum. **O rótulo e o botão ficam
sem animação de propósito:** eles são a moldura, os cards são o conteúdo.

**A animação vai no card, e o `cartao-interativo` usa `translate` no hover.** Não colidem,
porque sem `fill-mode: forwards` o valor volta ao normal no fim. Durante os 640ms da entrada
o levante não responde, o que ninguém alcança a tempo.

**Um bloco por case é a prova visual**, marcado no conteúdo com `prova="true"`. **Uma por
case: se houver duas marcadas, vale a primeira.** Hoje são o código do Bajaj, a paleta do
Tech Girls e os números do VOGE. Funciona em `codigo`, `paleta` e `numeros`, **só no
desktop**, porque no mobile os três viram carrossel ou accordion e a animação brigaria com
o próprio comportamento. **É o único escalonamento do site**, e é deliberado: uma vez por
case, no bloco que carrega o argumento.

---

## Pendências conhecidas

- **A imagem de compartilhamento ainda diz "Samara Alanna.dev".** A marca perdeu o sufixo
  em 2026-09-14, e a imagem em `public/imagens/compartilhamento.jpg` é a única peça que
  ficou para trás, porque é arquivo exportado e não código. Só a Samara reexporta. Ao
  substituir, confira a extensão contra a constante `IMAGEM_COMPARTILHAMENTO` do
  `lib/site.ts`, que já saiu de sincronia uma vez e derrubou o cartão de todas as páginas.
- Três avaliações no case Bilheteria mostram nomes reais de terceiros. Não publique essas
  imagens sem tratar.
- O seletor de idioma do hero deixa o botão EN desabilitado, porque o site não tem versão
  em inglês. Isso não vale para o currículo, que existe nos dois idiomas. **O que a tradução
  vai exigir está na seção "Trabalho futuro: tradução do site".**

---

## Como trabalhar com ela

- **Raciocínio antes do código.** Explique a decisão técnica primeiro, depois entregue.
- **Comentários em português.**
- **Aponte riscos de manutenção e segurança mesmo sem ela perguntar.**
- **Nunca invente** nome de biblioteca, número de versão, URL ou trecho de documentação.
  Se não tiver fonte verificada, diga isso.
- **Não preencha lacuna com suposição.** Se a ambiguidade muda o resultado, pergunte.
- Ela escreve em português do Brasil, inglês intermediário. Termos técnicos em inglês
  quando for o padrão, explicados em português.
- Sem travessão no texto.

---

## Ordem sugerida

1. `create-next-app` com TypeScript, App Router, Tailwind e ESLint
2. Design tokens em CSS Variables, os dois temas, a partir das variáveis do Figma, com o
   Tailwind configurado para consumir essas variáveis
3. Layout base: nav, footer, alternância de tema
4. Componentes de bloco MDX
5. Home e listagem de projetos
6. Página de case, com os três modelos
7. Sobre, Stack, Contato
8. Mobile: os comportamentos listados acima
9. Acessibilidade: foco, teclado, contraste
10. Deploy na Vercel e domínio
11. Só então o painel

Nada disso é commitado por você.

---

## Orientações de Next.js do template

O `create-next-app` gerou um `AGENTS.md` na raiz com orientações de código atualizado para
Next.js. Ele fica importado abaixo, então vale junto com este documento. Onde os dois
divergirem, este documento manda, porque ele carrega as decisões do projeto.

@AGENTS.md

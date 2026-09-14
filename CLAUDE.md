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
- **O formulário de contato foi removido em 2026-09-13** e volta na fase dois. O que ele
  era está registrado na seção do painel, mais abaixo. A página foi rearranjada: os canais
  viraram três cartões em vez da lista de linhas do Figma, porque sem o formulário sobrou
  uma coluna num espaço de duas. Entrou a seção "QUANDO ME CHAMAR", com quatro motivos em
  `conteudo/contato.ts`, que qualifica o contato antes de a pessoa escrever. A ponte para o
  BORDA desceu para o fim, logo depois do motivo que fala do estúdio, para o link ser a
  porta do que acabou de ser explicado em vez de repetir a marca em dois blocos.
- **A linha de disponibilidade não é seção.** Ela é o texto de apoio do cabeçalho da
  página, onde o Figma a coloca: "Respondo em até 2 dias úteis. Prefiro conversar por
  escrito".
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

**A imagem de compartilhamento é PNG, e é a única exceção à regra de WebP.** O suporte a
WebP em cartão é irregular entre as plataformas, e ali não existe substituto: ou carrega ou
o link sai sem imagem.

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
  sobre.ts        experiência, formação, certificações
  contato.ts      canais diretos e assuntos do formulário
```

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

**O badge "Em construção" segue a tipografia das tags, e não a de rótulo em mono.** DM Sans
regular 12, sem tracking, mesmo padding e mesmo raio, resultando na mesma altura. Do lado
das tags do card ele é irmão delas, não rótulo de outra família. O que muda de propósito é
só a cor e a cor da borda, em âmbar. O Figma teve o badge em mono 11 por um tempo, em dez
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
  "Baixar CV" vai para o fim. No desktop os dois são a coluna da direita. Por isso as
  quatro partes são filhas diretas da grade e não dois blocos de dois.
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

### O formulário de contato volta aqui

Ele existiu e foi removido em 2026-09-13, porque dependia de serviço externo para enviar, e
formulário que despacha para terceiro não demonstra nada tecnicamente. Volta quando o
projeto tiver rota de API própria, com validação escrita à mão, e aí vira caso de uso de
verdade em vez de enfeite.

**Não recomece do zero.** O componente era `app/contato/_secoes/secao-formulario.tsx` e está
no primeiro commit do repositório, então dá para recuperar por `git show`. O que ele tinha:

- **Quatro campos**, cada um com rótulo associado por `htmlFor` e `id`: NOME (`text`,
  placeholder "Como devo te chamar"), EMAIL (`email`, "seu@email.com"), ASSUNTO (`select`
  com um `option` vazio e desabilitado de placeholder, "Selecione um assunto") e MENSAGEM
  (`textarea` de 5 linhas, "Conta o contexto e o que você precisa").
- **Os cinco assuntos do select continuam em `conteudo/contato.ts`**, anotados como
  pendentes. Eles são a única parte do formulário que é conteúdo e não código: Projeto de
  site, Identidade visual, Vaga ou processo seletivo, Parceria, Outro assunto. A ordem
  importa, o primeiro é o pedido mais comum e o último cobre o resto.
- **Rótulo** em mono, `text-titlebar` com `tracking-titlebar`, em `text-text-muted`.
- **Campo**: `rounded-[8px]`, `border-[0.5px] border-border-forte`, `bg-surface`,
  `px-[18px] py-[16px]`, `text-corpo`, placeholder em `text-text-dim`.
- **Acessibilidade**: `h2` só para leitor de tela ligado ao `form` por `aria-labelledby`, e
  o botão desabilitado ligado ao aviso por `aria-describedby`, senão a pessoa encontra um
  botão morto sem saber por quê.

**O campo usa `--border-forte`**, que é o token de borda que precisa ser vista. Quando o
formulário saiu ele ficou sem uso e foi mantido de propósito, e depois ganhou dois usos
novos, o botão de contorno neutro e o filete da folha do hero. O critério de quando usar ele
está na seção de acessibilidade.

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

**O botão tem três níveis, e a regra é que a cor accent fica reservada para ação:**

| Classe | Visual | Para quê |
| --- | --- | --- |
| `.botao-cheio` | fundo accent | o que o site quer que a pessoa faça |
| `.botao-contorno` | borda e texto accent | ação secundária de alta intenção, hoje só o CV |
| `.botao-neutro` | borda `--border-forte`, texto `--text` | navegação, os links de seção |

**Os três não respondem igual, e isso é o ponto.** O cheio levanta e escurece o fundo, pelo
token `--accent-rosa-hover`. O de contorno só ganha fundo em `tint-rosa`, sem levante. O
neutro só afia a borda, de `--border-forte` para `--text`. Se todos se comportassem igual, a
hierarquia se perderia no hover. Fundo neutro no hover do terceiro não serviria: `--surface`
e `--surface-2` ficam a menos de 1,2 do `--bg` e o estado seria invisível.

**Cada variante é selecionada pela própria classe**, e não por exclusão das outras nem por
ordem no arquivo. Exclusão obrigaria toda variante nova a lembrar de entrar numa lista de
`:not`, e ordem quebra quando alguém reordena o CSS.

**O `--border-forte` voltou a ter uso.** Ele foi criado para borda de campo de formulário,
ficou parado quando o formulário saiu, e serve no botão neutro pelo mesmo motivo: borda é o
que identifica componente sem preenchimento, e limite de componente interativo precisa de
3:1. Ele dá 3,28 no escuro e 3,38 no claro sobre o `--bg`, contra 1,2 da `--border` comum,
que é decoração de card e faria um botão invisível.

**Os três links de seção da home são botões, e não texto com seta.** "Ver stack completa",
"Todos os projetos" e "Minha trajetória completa", todos neutros, todos na mesma grade de
duas linhas: ao lado do rótulo no desktop, depois do conteúdo no mobile. **As outras setas
do site não são links de seção e ficam como estão:** a migalha do case, o próximo projeto,
o "Ver o case" dentro do card da Tech Girls, as pílulas do BORDA e as setas do
`bloco-diagrama`.

O botão neutro tem 45px de altura, com 10 de padding, 24 de entrelinha e 1 de borda, então
não precisa de `alvo-toque-vertical`.

**O escurecimento é token medido, e não filtro de brilho**, porque é cor sobre a qual texto
é lido. O texto do botão é o `--bg`: 8,49 sobre o hover no escuro e 6,42 no claro, contra
11,26 e 5,08 no estado normal. No tema claro o hover aumenta o contraste, porque o fundo
escurece e o texto continua claro. A diferença entre normal e hover é de 1,33 no escuro e
1,26 no claro, o bastante para notar sem ser brusca. **Não animam:** nav, footer, tags, chips, itens de lista, a troca de
filtro na listagem, que precisa de resposta imediata e brigaria com o `aria-live` da
contagem, e o corpo de texto dos cases, que é onde a pessoa passa mais tempo lendo.

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

**O `filter: blur` voltou, e é estático.** A distinção que importa: animar o raio, ou mover
conteúdo dentro de um elemento desfocado, obriga o filtro a ser reavaliado a cada quadro, e
isso continua proibido. Desfoque fixo numa mancha que só é transformada é rasterizado uma
vez. Por isso ele está em cada mancha e não no grupo: no grupo ficaria por cima de três
filhos que se movem, que é o caso caro. É o primeiro botão a remover se algo engasgar.

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

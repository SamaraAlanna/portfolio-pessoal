# Modelo de case · Portfólio Samara Alanna

Documento de referência para montar case no Figma e para definir o que o painel edita.
Escrito a partir do que os cases construídos fazem na prática, não de teoria.

**Reescrito em 2026-09-24**, quando os quatro cases foram refeitos a partir dos frames novos.
Antes eram três modelos. Os de identidade visual saíram com os três cases que os usavam, e o
que sobrou não eram dois modelos: era **um modelo com duas ênfases**.

---

## O modelo, e as duas ênfases

**A moldura é sempre a mesma e não muda por tipo:**

```
nav → migalha → título → ficha técnica → [abertura] → índice + frentes → próximo projeto → footer
```

O que muda entre os dois tipos é **o que carrega o argumento**, e isso aparece nos blocos de
prova, não na estrutura da página.

| | engenharia | ux-produto |
| --- | --- | --- |
| Referência | Bajaj, VOGE Brasil | CRUD de permissões, Assistente de IA |
| Quem carrega | o código e o número | o raciocínio e a tela |
| Accent do case | ciano | rosa |
| Prova típica | código com abas, fluxo, lista de números | visualizador de estados, cards de decisão, paleta |
| Ficha típica | papel, cliente, stack, time, período | papel, contexto, entregas, time, período |

**O `tipo` do frontmatter decide o accent, e é a única coisa que ele decide.** Índice, rótulo
de seção, chip destacado do fluxo, rótulo do card de decisão e o valor `case` do bloco de
números leem o `--accent-case` que sai dele. Não é campo vestigial e não deve ser removido.

---

## Regras de escrita

**Tamanho.** Os quatro cases reescritos têm entre 100 e 210 palavras de corpo. Acima de umas
250 a página vira artigo e ninguém lê quatro.

**Ritmo.** Rótulo curto, título, um parágrafo, a prova. Repete de duas a quatro vezes e acaba.

**RÓTULO SE ESCREVE EM CAIXA NORMAL.** "Leads", "Briefing", "Correções pontuais". A caixa alta
vem do `text-transform` do `bloco-secao`. Escrever em maiúscula no MDX faz o índice mostrar
maiúscula e **parte dos leitores de tela soletrar letra a letra**.

**Rótulos são diretos.** Leads, Credenciais, Estados, Decisões, Cor. Nada de "A decisão-mestra"
ou "A que se provou certa".

**Nunca prometer o que a página não mostra.** Vale para o corpo e vale para a `descricao` e o
`resumo`, que alimentam o card e o cartão de compartilhamento: **os dois sobrevivem a um corte
de seção sem ninguém perceber**, porque não aparecem na página que mudou.

**Uma caixa com fundo tingido por página, no máximo.**

**Tom.** Verbo na primeira pessoa abrindo a frase, o efeito logo depois.

**Proibido.** Antítese ("não é X, é Y"), máxima de fechamento de parágrafo, abertura em
gerúndio, pergunta retórica, travessão.

---

## Duas regras de sintaxe que os blocos impõem

**O bloco de fora precisa de mais dois-pontos que o de dentro.** Seção sem nada aninhado usa
três. Com um bloco dentro, quatro. Se os dois usarem a mesma quantidade, o de dentro fecha o
de fora e sobra um `:::` solto na página, visível para quem lê.

**Linha em branco separa item em uns blocos e quebra outros.** Em `imagens` cada item vai num
parágrafo próprio, separado por linha em branco. **Nos blocos de campos separados por barra
vertical, `numeros`, `paleta`, `opcoes` e `estados`, ela faz o contrário e funde dois itens em
um, sem o build reclamar.**

---

## Blocos

Dez blocos. A coluna de uso é de 2026-09-24, depois da reescrita dos quatro cases.

| Bloco | Atributos | Formato da linha | Uso hoje |
| --- | --- | --- | --- |
| `secao` | `rotulo`, `titulo` | texto corrido | os quatro |
| `codigo` | `arquivo`, `abas`, `prova` | cercas de código | Bajaj, VOGE |
| `numeros` | `formato="linha"`, `prova` | valor, legenda, cor | Bajaj |
| `diagrama` | `desvio` | etapa, camada | Bajaj, VOGE |
| `estados` | `total` | rótulo, caminho, legenda | CRUD |
| `opcoes` | — | rótulo, título, descrição, camada | CRUD |
| `paleta` | `formato`, `titulo`, `prova` | hex, nome, papel | Assistente |
| `imagens` | `colunas`, `formato="linha"` | uma imagem por parágrafo | VOGE |
| `duo` | `divisor` | dois filhos | Assistente |
| `citacao` | `camada`, `tom` | texto corrido | **sem uso, reservado** |

Nos blocos de campos, a separação é a barra vertical e o último campo costuma ser opcional.

**O `citacao` está sem uso e é reservado.** Ele é o jeito do sistema sinalizar ressalva, com o
filete âmbar, e o próximo case com algo não implementado ou não medido vai precisar dele. **Não
apague.**

**Três blocos foram apagados em 2026-09-24**, depois de auditoria que confirmou zero uso no
conteúdo e nenhuma importação fora do mapa de directives: `destaque`, a caixa com fundo tingido;
`antes-depois`, a comparação de dois valores ou dois códigos; e `frase`, a frase grande com
legenda acima. Os três perderam o último uso com a reescrita dos cases.

**Cores aceitas no campo de cor ou camada:** `rosa`, `lavanda`, `ciano` e `ambar`. Mais
`case`, só no `numeros`, que lê o accent do case, e `apagado`, só no `diagrama`, que é o chip
do jeito antigo em `--text-dim`.

**A cor não é decoração.** Rosa é design e produto, lavanda é front-end, ciano é back-end e
dados, âmbar é ressalva. O `case` existe para o número não precisar de cor escrita linha a
linha, que quebraria em silêncio no dia em que o `tipo` do case mudasse: o índice e os rótulos
trocariam de cor e os números continuariam na antiga.

**Formatos do `paleta`:** o padrão é amostra de 64px com o hex embaixo; `painel` põe o conjunto
inteiro num card com `--surface`, borda e raio 12; `cartao` faz um card **por cor**, com
amostra de 120px; `inline` é a mini-paleta de 14px. Os dois últimos estão sem uso.

**Uma prova por case.** O atributo `prova="true"` marca o bloco que carrega o argumento e dá a
ele uma entrada própria, só no desktop. Funciona em `codigo`, `paleta` e `numeros`. Se houver
duas marcadas, vale a primeira.

---

## A abertura

A imagem entre a ficha e o índice. **Aceita uma ou várias**, em lista de caminho e texto
alternativo, mais uma linha de apoio pelo `heroNota`.

```yaml
heroCase:
  - /imagens/cases/assistente-home.webp | Tela inicial do assistente
  - /imagens/cases/assistente-gerando.webp | Assistente gerando a resposta
heroNota: As informações e dados foram alterados para preservar a confidencialidade do produto.
```

Com **uma** imagem forma-se o par de transição com a capa do card. Com **várias** o par não se
forma e só o título viaja, porque o destino do morph seria a fileira inteira: uma capa se
esticando em três. No mobile várias viram carrossel, e só a primeira é prioritária.

---

## Estado do projeto

Campo `estado` com dois valores.

**no-ar** — sem badge, comportamento padrão.

**em-construcao** — badge âmbar com o texto "Em construção", em mono caixa alta. Aparece no
card da listagem, ao lado das tags e não no lugar delas, e na página do case junto ao título.

Nesse estado o case **não mostra o corpo**. A página fica só com nav e migalha, título com o
badge, a frase centralizada "Este projeto ainda está em construção", uma linha de apoio,
próximo projeto e footer. Sem ficha técnica e sem seções. O conteúdo já escrito fica no
arquivo, não apagado, e volta quando o estado mudar para no-ar.

Âmbar porque no sistema de cor ele já significa ressalva e honestidade.

Limite: no máximo dois projetos em construção ao mesmo tempo. Acima disso o portfólio passa a
parecer uma lista de coisas inacabadas.

---

## Campos do frontmatter

```
slug            identificador na URL
titulo          nome do projeto, usado no card e no compartilhamento
tituloCase      nome na página do case, quando difere do card
tipo            ux-produto | engenharia          decide o accent
tipoSecundario  opcional, mesmos valores
tags            UX/UI Design, Front-End, Back-End
estado          no-ar | em-construcao
destaque        card grande da home
ordem           posição na listagem
ordemHome       posição na home. Ausente significa que não aparece lá
publicado       controla se aparece no site
imagem          capa do card
heroCase        imagens da abertura, uma por linha, caminho e texto alternativo
heroNota        linha de apoio abaixo da abertura
descricao       texto do card na listagem e do cartão de compartilhamento
resumo          texto do card na home. Ausente, cai na descricao
ficha           linhas de rótulo e valor
```

**O campo `abertura` saiu em 2026-09-24.** Ele era o parágrafo abaixo do título do case, e os
frames novos não têm parágrafo nenhum no hero: quem abre o assunto é o texto da primeira
frente. Ficou inerte no frontmatter por um dia, enquanto a reescrita decidia se ele viraria a
primeira frente, e saiu do tipo, do parser e dos quatro cases quando nenhum frame usou.

O conteúdo em si é o corpo do arquivo, escrito em blocos.

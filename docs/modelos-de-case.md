# Modelos de case · Portfólio Samara Alanna

Documento de referência para montar case no Figma e para definir o que o painel edita.
Escrito a partir do que os cases já construídos fazem na prática, não de teoria.

---

## Regras que valem para os três modelos

**Tamanho.** Entre 250 e 400 palavras. Acima disso a página vira artigo e ninguém lê dez.

**Ritmo.** Rótulo curto em mono caixa alta, título, um parágrafo, a prova. Repete de três a
cinco vezes e acaba.

**Rótulos são diretos.** CONTEXTO, COR, SISTEMA, LEADS, ESTADOS. Nada de "A DECISÃO-MESTRA"
ou "A QUE SE PROVOU CERTA".

**Nunca prometer o que a página não mostra.** Se o texto diz sete telas e a página exibe
quatro, ou o texto muda ou a imagem entra.

**Uma caixa com fundo tingido por página, no máximo.** Todo o resto usa o padrão Citação:
filete de 2px em accent à esquerda, paddingLeft 28, sem fundo.

**Tom.** Verbo na primeira pessoa abrindo a frase, o efeito logo depois. "Isolei o accent num
alias e trocar a marca virou uma alteração só", não "A identidade estava em decisão e por
isso foi necessário...".

**Proibido.** Antítese ("não é X, é Y"), máxima de fechamento de parágrafo, abertura em
gerúndio, pergunta retórica, travessão.

---

## Modelo 1 · Identidade visual

Referência: Tech Girls, Míriam Araújo, Garage StivalDay.
A imagem carrega o case. Texto curto, entre 180 e 250 palavras.

| Seção         | Conteúdo                                   | Prova                                 |
| ------------- | ------------------------------------------ | ------------------------------------- |
| Cabeçalho     | o que é, para quem, o que a página cobre   | —                                     |
| Ficha técnica | papel, cliente, período, entregas, vínculo | —                                     |
| Hero          | —                                          | a marca principal aplicada            |
| Contexto      | quem procurou e com que pedido             | —                                     |
| Estratégia    | o conceito e de onde ele saiu              | —                                     |
| Sistema       | cor e tipografia, e por que essas          | amostras de cor, espécime tipográfico |
| Logo          | as variações e para que serve cada uma     | grade de variações                    |
| Aplicações    | onde a marca vive                          | peças aplicadas                       |

**Blocos disponíveis:** parágrafo, citação, grade de imagens, amostras de cor, par tipográfico.

---

## Modelo 2 · UX e produto

Referência: CRUD de permissões, Assistente de IA, Bilheteria Digital.
O raciocínio carrega o case. Entre 300 e 400 palavras.

| Seção         | Conteúdo                                           | Prova                     |
| ------------- | -------------------------------------------------- | ------------------------- |
| Cabeçalho     | o que é, o que estava errado, o que a página cobre | —                         |
| Ficha técnica | papel, contexto, período, entregas, time           | —                         |
| Hero          | —                                                  | a tela principal          |
| Contexto      | o que era e onde estava o problema                 | —                         |
| Decisão       | a escolha central e o critério que a sustenta      | diagrama ou antes/depois  |
| Sistema       | tokens, componentes, copy                          | telas ou grade de estados |
| Trade-off     | opções consideradas e o que foi escolhido          | as opções lado a lado     |
| Status        | em que pé está e como foi validado                 | —                         |

**Blocos disponíveis:** parágrafo, citação, grade de telas, cards de opção, diagrama de
fluxo, números.

---

## Modelo 3 · Engenharia

Referência: Bajaj, VOGE Brasil.
O código e o número carregam o case. Entre 300 e 400 palavras.

| Seção         | Conteúdo                                                | Prova                        |
| ------------- | ------------------------------------------------------- | ---------------------------- |
| Cabeçalho     | o que é o sistema, o que você fez, o que a página cobre | —                            |
| Ficha técnica | papel, cliente, período, stack, escopo                  | —                            |
| Hero          | —                                                       | recorte do site ou tela      |
| Contexto      | o que era o sistema e o que você faz nele hoje          | —                            |
| Frente 1      | o problema e a solução                                  | bloco de código antes/depois |
| Frente 2      | idem                                                    | —                            |
| Frente 3      | idem                                                    | antes/depois de número       |
| Em números    | os ganhos mensuráveis                                   | grade de números             |

**Blocos disponíveis:** parágrafo, citação, bloco de código, antes/depois, números,
diagrama de fluxo.

---

## Projeto de dois tipos

Spirito é UX/produto e engenharia ao mesmo tempo. Nesse caso o layout segue o tipo
primário e o secundário entra como uma seção extra antes do fechamento. No Spirito:
modelo de UX/produto com uma seção de infraestrutura e deploy no fim.

As tags do card já comunicam isso e não precisam de tratamento novo.

---

## Estado do projeto

Campo `estado` com dois valores.

**no-ar** — sem badge, comportamento padrão.

**em-construcao** — badge âmbar com o texto "Em construção", em mono caixa alta. Aparece
no card da listagem, ao lado das tags e não no lugar delas, e na página do case junto ao
título.

Nesse estado o case **não mostra o corpo**. A página fica só com:

1. Nav e migalha
2. Título com o badge âmbar ao lado
3. Frase centralizada: "Este projeto ainda está em construção"
4. Uma linha de apoio: "Volto aqui com o case completo quando ele estiver pronto."
5. Próximo projeto e footer

Sem descrição, sem ficha técnica, sem seções. O conteúdo já escrito fica oculto no
arquivo, não apagado, e volta quando o estado mudar para no-ar.

Âmbar porque no sistema de cor ele já significa ressalva e honestidade.

Limite: no máximo dois projetos em construção ao mesmo tempo. Acima disso o portfólio
passa a parecer uma lista de coisas inacabadas.

---

## Campos que o painel edita

```
slug          identificador na URL
titulo        nome do projeto
tipo          identidade-visual | ux-produto | engenharia
tipoSecundario  opcional
tags          valores do filtro da listagem
estado        no-ar | em-construcao
destaque      aparece no card grande da home
ordem         posição na listagem
publicado     controla se aparece no site
```

O conteúdo em si é o corpo do arquivo, escrito em blocos.

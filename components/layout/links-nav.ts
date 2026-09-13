/**
 * Lista única dos links de navegação.
 *
 * Fica num arquivo só porque nav, menu mobile e footer mostram os mesmos destinos. Se
 * cada um tivesse a sua cópia, um dia eles divergiriam.
 *
 * "Contato" não está na lista do desktop de propósito. Ele e o CTA "Entre em contato"
 * apontavam para o mesmo destino, e com o CTA final da página Sobre eram três caminhos
 * para /contato na mesma navegação. Ficou o CTA, que é o que tem peso visual.
 */
export const linksNav = [
  { rotulo: "Home", destino: "/" },
  { rotulo: "Projetos", destino: "/projetos" },
  { rotulo: "Sobre", destino: "/sobre" },
  { rotulo: "Stack", destino: "/stack" },
] as const;

/**
 * O menu mobile mostra um link a mais, o Contato, como está no Figma.
 *
 * O motivo é que no mobile o CTA da nav não existe: a barra fechada tem só marca e
 * hambúrguer. Quem está no celular só encontra o caminho para o contato depois de abrir o
 * menu, então tirar o link de lá deixaria o destino dependendo do botão do rodapé do
 * painel, e só dele.
 *
 * O footer mantém o link nos dois tamanhos, mas ali ele é mapa do site e cumpre outra
 * função.
 */
export const linksMenuMobile = [
  ...linksNav,
  { rotulo: "Contato", destino: "/contato" },
] as const;

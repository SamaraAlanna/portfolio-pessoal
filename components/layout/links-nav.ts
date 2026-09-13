/**
 * Lista única dos links de navegação.
 *
 * Fica num arquivo só porque nav, menu mobile e footer mostram os mesmos destinos. Se
 * cada um tivesse a sua cópia, um dia eles divergiriam.
 *
 * "Contato" já saiu daqui e voltou. Ele, o CTA "Entre em contato" e o CTA final do Sobre
 * dão três caminhos para /contato na mesma navegação, e por um tempo ficou só o CTA, que
 * tem mais peso visual. A repetição foi decidida em 2026-09-13: link de nav é o lugar onde
 * a pessoa procura por hábito, e não achar Contato ali custa mais do que a repetição.
 *
 * São cinco links de novo, que é o que o Figma desenha, então a nav do desktop volta aos
 * oito controles: cinco links, os dois botões de tema e o CTA. Nav e menu mobile passam a
 * usar a mesma lista.
 */
export const linksNav = [
  { rotulo: "Home", destino: "/" },
  { rotulo: "Projetos", destino: "/projetos" },
  { rotulo: "Sobre", destino: "/sobre" },
  { rotulo: "Stack", destino: "/stack" },
  { rotulo: "Contato", destino: "/contato" },
] as const;

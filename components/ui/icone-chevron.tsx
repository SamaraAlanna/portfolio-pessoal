/**
 * Chevron do accordion, 14x8 como no Figma.
 *
 * Decorativo: quem anuncia aberto ou fechado é o aria-expanded do botão. Repetir isso num
 * título de SVG faria o leitor de tela dizer a mesma coisa duas vezes.
 *
 * A cor vem do currentColor, então ele acompanha o cabeçalho onde estiver.
 */
export default function IconeChevron({ className }: { className?: string }) {
  return (
    <svg
      width="14"
      height="8"
      viewBox="0 0 14 8"
      fill="none"
      aria-hidden="true"
      className={className}
    >
      <path
        d="M1 1L7 7L13 1"
        stroke="currentColor"
        strokeWidth="1.5"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </svg>
  );
}

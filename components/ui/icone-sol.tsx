/**
 * Ícone do sol do seletor de tema.
 *
 * Geometria exportada do Figma sem alteração: 16x16, traço de 1.3.
 * O único ajuste é o stroke, que era fixo em #847F7A e virou currentColor, para o ícone
 * seguir o token --tema-icone-sol nos dois temas em vez de carregar a cor de um deles.
 */
export default function IconeSol() {
  return (
    <svg
      width="16"
      height="16"
      viewBox="0 0 16 16"
      fill="none"
      stroke="currentColor"
      strokeWidth="1.3"
      aria-hidden="true"
      focusable="false"
    >
      <path d="M8 11.2C9.76731 11.2 11.2 9.76731 11.2 8C11.2 6.23269 9.76731 4.8 8 4.8C6.23269 4.8 4.8 6.23269 4.8 8C4.8 9.76731 6.23269 11.2 8 11.2Z" />
      <g strokeLinecap="round">
        <path d="M8 1V2.5" />
        <path d="M8 13.5V15" />
        <path d="M1 8H2.5" />
        <path d="M13.5 8H15" />
        <path d="M3.05 3.05L4.15 4.15" />
        <path d="M11.85 11.85L12.95 12.95" />
        <path d="M12.95 3.05L11.85 4.15" />
        <path d="M4.15 11.85L3.05 12.95" />
      </g>
    </svg>
  );
}

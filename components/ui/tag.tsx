/**
 * Tag do card de projeto. Os valores são os mesmos do filtro da listagem.
 */
export default function Tag({ children }: { children: React.ReactNode }) {
  return (
    <span className="inline-flex items-center rounded-full border-[0.5px] border-border bg-surface-2 px-[10px] py-[5px] text-tag whitespace-nowrap text-text-muted">
      {children}
    </span>
  );
}

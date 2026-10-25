// Repère visible pour une information légale que le cabinet doit fournir avant la mise en ligne.
// Affiche la valeur si elle existe, sinon un badge « à compléter » avec ce qui est attendu.
export default function Todo({ value, children }) {
  if (value) return <>{value}</>
  return (
    <span className="todo" title="Information à fournir par le cabinet avant la mise en ligne">
      À compléter : {children}
    </span>
  )
}

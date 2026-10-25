import { NAV_PAGES as PAGES } from '../data'
import { linkProps } from '../router'

// Bas de page : la page suivante du parcours, pour ne jamais finir dans une impasse.
export default function PageNext({ page }) {
  const i = PAGES.findIndex((p) => p.id === page.id)
  const next = PAGES[i + 1] || PAGES[1]
  return (
    <nav className="page-next" aria-label="Page suivante">
      <div className="container">
        <a className="page-next__link" {...linkProps(next.id)}>
          <span className="page-next__kicker">Page suivante</span>
          <span className="page-next__title">
            {next.label} <span aria-hidden>→</span>
          </span>
          <span className="page-next__desc">{next.desc}</span>
        </a>
      </div>
    </nav>
  )
}

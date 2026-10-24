import { PAGES, sectionIndex } from '../data'
import { linkProps } from '../router'
import { Heading, Label, Fade } from './Heading'

// Accueil : une carte par page du site, pour aller droit à ce qui intéresse le visiteur.
export default function Explore() {
  const pages = PAGES.filter((p) => p.id !== 'accueil')
  return (
    <section className="section explore" id="explorer">
      <div className="container">
        <div className="explore__head">
          <div>
            <Label index={sectionIndex('explorer')}>Explorer</Label>
            <Heading className="h2">
              Trouvez ce qui <em>vous concerne.</em>
            </Heading>
          </div>
          <Fade>
            <p className="muted">
              Chaque page répond à une question : où se trouve le cabinet, quels soins y sont réalisés, comment se passe
              un traitement implantaire, qui vous soigne, et comment venir.
            </p>
          </Fade>
        </div>

        <ul className="explore__grid">
          {pages.map((p, i) => (
            <Fade as="li" key={p.id} delay={0.05 + i * 0.07} className={`explore__item explore__item--${p.id}`}>
              <a className="explore__card" {...linkProps(p.id)}>
                <span className="explore__n">{String(i + 1).padStart(2, '0')}</span>
                <span className="explore__title">{p.label}</span>
                <span className="explore__desc">{p.desc}</span>
                <span className="explore__go" aria-hidden>
                  Découvrir <span>→</span>
                </span>
              </a>
            </Fade>
          ))}
        </ul>
      </div>
    </section>
  )
}

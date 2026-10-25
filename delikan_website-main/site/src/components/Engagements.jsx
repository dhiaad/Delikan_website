import { ENGAGEMENTS, sectionIndex } from '../data'
import { Heading, Label, Fade } from './Heading'

export default function Engagements() {
  return (
    <section className="section engagements" id="engagements">
      <div className="container">
        <Label index={sectionIndex('engagements')}>Nos engagements</Label>
        <Heading className="h2">
          La confiance, <em>dans chaque détail.</em>
        </Heading>

        <ul className="engagements__grid">
          {ENGAGEMENTS.map((e, i) => (
            <Fade as="li" key={e.title} delay={0.1 + i * 0.08} className="engagement">
              <span className="engagement__n">{String(i + 1).padStart(2, '0')}</span>
              <h3 className="h3">{e.title}</h3>
              <p className="muted">{e.text}</p>
            </Fade>
          ))}
        </ul>
      </div>
    </section>
  )
}

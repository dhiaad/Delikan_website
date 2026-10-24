import { CABINET, SOINS, sectionIndex } from '../data'
import { Heading, Label, Fade } from './Heading'
import { Button } from './Button'
import { Calendar } from './Icons'
import Accordion from './Accordion'

const items = SOINS.map((s) => ({
  title: s.title,
  tag: s.tag,
  body: (
    <>
      <p>{s.text}</p>
      {s.points && (
        <ul className="soin__points">
          {s.points.map((p) => (
            <li key={p}>{p}</li>
          ))}
        </ul>
      )}
    </>
  ),
}))

export default function Soins() {
  return (
    <section className="section soins" id="soins">
      <div className="container soins__grid">
        <div className="soins__head">
          <Label index={sectionIndex('soins')}>Les soins</Label>
          <Heading className="h2">
            L’implantologie au cœur, <em>tous les soins autour.</em>
          </Heading>
          <Fade>
            <p className="muted">
              Implants, chirurgie orale et greffes osseuses sont au cœur de la pratique. Autour, l’ensemble des soins du
              quotidien est réalisé au cabinet, avec le même souci de confort et de clarté. Ouvrez chaque soin pour voir
              ce qu’il comprend.
            </p>
          </Fade>
          <Fade delay={0.3}>
            <Button href={CABINET.doctolib} external magnetic variant="line" icon={<Calendar />}>
              Prendre rendez-vous
            </Button>
          </Fade>
        </div>

        <Accordion id="soin" items={items} />
      </div>
    </section>
  )
}

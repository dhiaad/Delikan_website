import { CABINET, FAQ, sectionIndex } from '../data'
import { Heading, Label, Fade } from './Heading'
import { Button } from './Button'
import { Phone } from './Icons'
import Accordion from './Accordion'

const items = FAQ.map((f) => ({ title: f.q, body: <p>{f.a}</p> }))

export default function Faq() {
  return (
    <section className="section faq" id="faq">
      <div className="container soins__grid">
        <div className="soins__head">
          <Label index={sectionIndex('faq')}>Questions fréquentes</Label>
          <Heading className="h2">
            Vos questions, <em>nos réponses.</em>
          </Heading>
          <Fade>
            <p className="muted">Vous ne trouvez pas la réponse ? Le secrétariat vous renseigne par téléphone.</p>
          </Fade>
          <Fade delay={0.3}>
            <Button href={CABINET.phoneHref} variant="line" icon={<Phone />}>
              {CABINET.phone}
            </Button>
          </Fade>
        </div>

        <Accordion id="faq" items={items} className="faq__list" />
      </div>
    </section>
  )
}

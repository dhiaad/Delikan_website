import { CABINET } from '../data'
import { Heading, Label, Fade } from './Heading'
import RevealImage from './RevealImage'

const POINTS = [
  { k: 'Formation', v: '3 D.U. d’implantologie et un C.E.S. de parodontologie (Lyon, Nantes, Créteil)' },
  { k: 'Conventionné', v: 'Cabinet conventionné Assurance Maladie' },
  { k: 'Plateau technique', v: 'Radio panoramique et deux salles de soins' },
]

export default function About() {
  return (
    <section className="section about" id="cabinet">
      <div className="container">
        <Label index="05">Le cabinet</Label>
        <Heading className="h2 h2--xl about__title">
          Des soins précis, <em>une écoute sincère.</em>
        </Heading>

        <div className="about__grid">
          <RevealImage
            name="entree"
            alt="Entrée du cabinet dentaire du Dr Delikan à Saint-Estève"
            sizes="(min-width: 900px) 40vw, 100vw"
            className="about__img"
          />

          <div className="about__text">
            <Fade>
              <p className="lead">
                Installé au {CABINET.street} à Saint-Estève, le {CABINET.doctor} prend en charge toute la famille, des
                soins courants aux traitements implantaires.
              </p>
            </Fade>
            <Fade delay={0.25}>
              <p className="muted">
                Chaque traitement commence par un temps d’explication : vous savez ce qui est fait, pourquoi, et à quel
                coût. L’objectif est simple : que vous vous sentiez en confiance, du premier rendez-vous au dernier.
              </p>
            </Fade>

            <Fade as="dl" delay={0.35} className="about__points">
              {POINTS.map((p) => (
                <div key={p.k}>
                  <dt>{p.k}</dt>
                  <dd>{p.v}</dd>
                </div>
              ))}
            </Fade>
          </div>
        </div>
      </div>
    </section>
  )
}

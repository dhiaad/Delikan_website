import { CABINET, sectionIndex } from '../data'
import { Heading, Label, Fade } from './Heading'
import RevealImage from './RevealImage'

const POINTS = [
  { k: 'Cœur de pratique', v: 'Implantologie et odontologie chirurgicale' },
  { k: 'Pour qui', v: 'Toute la famille, des enfants aux seniors' },
  { k: 'Sur place', v: 'Deux salles de soins, une radio 3D et une caméra d’empreinte numérique' },
  { k: 'Rendez-vous', v: 'En ligne sur Doctolib à toute heure, ou par téléphone' },
  { k: 'Prise en charge', v: 'Cabinet conventionné Assurance Maladie' },
]

export default function About() {
  return (
    <section className="section about" id="bienvenue">
      <div className="container">
        <Label index={sectionIndex('bienvenue')}>Le cabinet</Label>
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
                Installé au {CABINET.street} à Saint-Estève, le {CABINET.doctor} a placé l’implantologie et la chirurgie
                orale au cœur de sa pratique, tout en prenant en charge les soins de toute la famille.
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

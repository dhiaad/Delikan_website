import { CABINET, FOCUS, sectionIndex } from '../data'
import { Heading, Label, Fade } from './Heading'
import { Button } from './Button'
import { Calendar } from './Icons'

// Mise en avant du traitement implantaire, sur fond sombre.
export default function Focus() {
  return (
    <section className="section focus" id="implants" data-theme="dark">
      <div className="container">
        <Label index={sectionIndex('implants')} light>
          Implantologie &amp; chirurgie
        </Label>
        <Heading className="h2 h2--xl">
          Retrouver des dents <em>fixes et naturelles.</em>
        </Heading>

        <div className="focus__grid">
          <div className="focus__intro">
            <Fade>
              <p className="lead">
                Une dent manquante, plusieurs, ou toute une arcade : l’implant remplace la racine et porte une dent fixe,
                qui se comporte comme une dent naturelle.
              </p>
            </Fade>
            <Fade delay={0.25}>
              <p className="muted">
                C’est le cœur de la pratique du {CABINET.doctor}, titulaire de trois diplômes universitaires
                d’implantologie (Créteil, Lyon). Il réalise l’ensemble du traitement au cabinet, chirurgie comprise : greffe
                osseuse ou comblement de sinus si nécessaire, pose de l’implant, puis dent définitive et suivi.
              </p>
            </Fade>
            <Fade as="dl" delay={0.35} className="about__points focus__avantages">
              {FOCUS.avantages.map((a) => (
                <div key={a.title}>
                  <dt>{a.title}</dt>
                  <dd>{a.text}</dd>
                </div>
              ))}
            </Fade>
          </div>

          <div className="focus__steps">
            <h3 className="h3">Comment se déroule le traitement</h3>
            <ol>
              {FOCUS.etapes.map((e, i) => (
                <Fade as="li" key={e.title} delay={0.1 + i * 0.06}>
                  <span className="focus__n">{String(i + 1).padStart(2, '0')}</span>
                  <div>
                    <strong>{e.title}</strong>
                    <p>{e.text}</p>
                  </div>
                </Fade>
              ))}
            </ol>
            <Fade delay={0.3}>
              <Button href={CABINET.doctolib} external magnetic variant="gold" icon={<Calendar />}>
                Prendre rendez-vous pour un bilan
              </Button>
            </Fade>
          </div>
        </div>
      </div>
    </section>
  )
}

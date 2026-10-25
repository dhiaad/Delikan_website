import { useRef } from 'react'
import { gsap } from 'gsap'
import { useGSAP } from '@gsap/react'
import { CABINET, DOCTOR, FORMATIONS, QUALIFS, sectionIndex } from '../data'
import { Heading, Label, Fade } from './Heading'
import { Button } from './Button'
import { Calendar, Phone } from './Icons'
import RevealImage from './RevealImage'
import { MQ } from '../smoothScroll'

// Le praticien : portrait, approche, domaines, puis le parcours universitaire en appui (et non en vitrine).
export default function Docteur() {
  const root = useRef(null)

  useGSAP(
    () => {
      const mm = gsap.matchMedia()
      mm.add(MQ.motion, () => {
        gsap.fromTo(
          '.frise__line span',
          { scaleY: 0 },
          {
            scaleY: 1,
            ease: 'none',
            scrollTrigger: { trigger: '.frise', start: 'top 75%', end: 'bottom 60%', scrub: true },
          },
        )
        gsap.utils.toArray('.formation').forEach((el) => {
          gsap
            .timeline({ scrollTrigger: { trigger: el, start: 'top 85%', once: true } })
            .from(el.querySelector('.formation__year'), { yPercent: 100, duration: 1, ease: 'expo.out' })
            .from(el.querySelectorAll('h3, p'), { y: 20, opacity: 0, duration: 0.9, stagger: 0.08, ease: 'power3.out' }, 0.1)
        })
      })
    },
    { scope: root },
  )

  return (
    <section className="section docteur" id="docteur" ref={root}>
      <div className="container">
        <Label index={sectionIndex('docteur')}>Le praticien</Label>

        {/* Le niveau de formation, d'un coup d'œil. */}
        <ul className="docteur__chiffres">
          {DOCTOR.chiffres.map((c, i) => (
            <Fade as="li" key={c.n} delay={0.05 + i * 0.08}>
              <strong>{c.n}</strong>
              <span>{c.t}</span>
            </Fade>
          ))}
        </ul>

        <div className="docteur__grid">
          <div className="docteur__aside">
            <RevealImage name="portrait" alt="Portrait du Dr Ibrahim Delikan" className="docteur__portrait" />
            <div className="docteur__id">
              <strong>{CABINET.doctor}</strong>
              <span>{CABINET.title} · Saint-Estève</span>
            </div>
          </div>

          <div className="docteur__body">
            <Heading className="h2 h2--xl">
              Rencontrez le <em>Dr Delikan.</em>
            </Heading>
            <Fade>
              <p className="lead">{DOCTOR.intro}</p>
            </Fade>
            <Fade delay={0.25}>
              <p className="muted">{DOCTOR.approche}</p>
            </Fade>

            {/* Citation à recueillir auprès du praticien : jamais inventée à sa place. */}
            <Fade as="figure" delay={0.3} className="docteur__quote is-todo">
              <blockquote>« Citation à recueillir auprès du Dr Delikan »</blockquote>
              <figcaption>
                Une ou deux phrases, dans ses mots, sur sa façon de soigner : ce qui compte pour lui face à un patient.
              </figcaption>
            </Fade>

            <Fade as="dl" delay={0.35} className="about__points docteur__domaines">
              {DOCTOR.domaines.map((d) => (
                <div key={d.title}>
                  <dt>{d.title}</dt>
                  <dd>{d.text}</dd>
                </div>
              ))}
            </Fade>

            <Fade delay={0.4} className="docteur__ctas">
              <Button href={CABINET.doctolib} external magnetic icon={<Calendar />}>
                Rendez-vous avec le Dr Delikan
              </Button>
              <Button href={CABINET.phoneHref} variant="line" icon={<Phone />}>
                {CABINET.phone}
              </Button>
            </Fade>
          </div>
        </div>

        <div className="docteur__parcours">
          <div className="docteur__parcours-head">
            <h3 className="h3">Parcours universitaire</h3>
            <p className="muted">
              Après son diplôme de chirurgien-dentiste, une formation continue en implantologie et en parodontologie.
              Les D.U. et le C.E.S. sont des formations universitaires complémentaires : ce ne sont pas des spécialités.
            </p>
            <div className="docteur__qualifs">
              {QUALIFS.map((q) => (
                <div key={q.key} className="qualif">
                  <span className="qualif__sigle" aria-hidden>
                    <span>{q.sigle}</span>
                  </span>
                  <div>
                    <strong>{q.title}</strong>
                    <span>{q.org}</span>
                    {q.link && (
                      <a href={q.link.href} target="_blank" rel="noreferrer">
                        {q.link.label} →
                      </a>
                    )}
                  </div>
                </div>
              ))}
            </div>
          </div>

          <ol className="frise">
            <span className="frise__line" aria-hidden>
              <span />
            </span>
            {FORMATIONS.map((f, i) => (
              <li key={f.year} className={`formation ${i === 0 ? 'formation--last' : ''}`}>
                <span className="mask formation__mask">
                  <span className="formation__year">{f.year}</span>
                </span>
                <div>
                  <h3>{f.title}</h3>
                  <p>{f.school}</p>
                </div>
              </li>
            ))}
          </ol>
        </div>
      </div>
    </section>
  )
}

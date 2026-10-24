import { useRef } from 'react'
import { gsap } from 'gsap'
import { useGSAP } from '@gsap/react'
import { FORMATIONS, QUALIFS } from '../data'
import { Heading, Label, Fade } from './Heading'
import { MQ } from '../smoothScroll'
import { Treatise } from './Engravings'

// Diplômes du praticien : frise des formations universitaires, qualifications vérifiables, plaque du cabinet.
export default function Diplomes() {
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
        gsap.from('.diplomes__aside > *', {
          y: 40,
          opacity: 0,
          duration: 1.1,
          stagger: 0.12,
          ease: 'expo.out',
          scrollTrigger: { trigger: '.diplomes__aside', start: 'top 85%', once: true },
        })
      })
    },
    { scope: root },
  )

  return (
    <section className="section diplomes" id="diplomes" ref={root}>
      <Treatise className="bg-plate bg-plate--diplomes" />
      <div className="container">
        <div className="diplomes__head">
          <div>
            <Label index="01">Diplômes &amp; formation</Label>
            <Heading className="h2 h2--xl">
              Implantologie &amp; parodontologie, <em>vingt ans de formation.</em>
            </Heading>
          </div>
          <Fade className="diplomes__intro">
            <p className="muted">
              Après son diplôme de chirurgien-dentiste, le Dr Delikan s’est formé à l’université en implantologie et en
              parodontologie, de Créteil à Nantes et à Lyon.
            </p>
          </Fade>
        </div>

        <div className="diplomes__grid">
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

          <aside className="diplomes__aside">
            <figure className="diplomes__plaque">
              <picture>
                <source type="image/webp" srcSet="/media/plaque.webp" />
                <img
                  src="/media/plaque.jpg"
                  alt="Plaque du cabinet : Dr Ibrahim Delikan, chirurgien-dentiste, DU implantologie orale, Université de Lyon"
                  loading="lazy"
                  width="300"
                  height="220"
                />
              </picture>
              <figcaption>La plaque, à l’entrée du cabinet</figcaption>
            </figure>
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
          </aside>
        </div>
      </div>
    </section>
  )
}

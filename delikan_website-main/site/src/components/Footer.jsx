import { useRef } from 'react'
import { gsap } from 'gsap'
import { useGSAP } from '@gsap/react'
import { CABINET, SOINS } from '../data'
import { Heading, Fade } from './Heading'
import { Button } from './Button'
import { Calendar } from './Icons'
import { MQ, scrollToId } from '../smoothScroll'

export default function Footer() {
  const root = useRef(null)

  useGSAP(
    () => {
      const mm = gsap.matchMedia()
      mm.add(MQ.motion, () => {
        // Le grand DELIKAN monte lettre par lettre en suivant le scroll.
        gsap.from('.footer__letter', {
          yPercent: 100,
          stagger: 0.05,
          ease: 'none',
          scrollTrigger: { trigger: '.footer__word', start: 'top bottom', end: 'bottom bottom', scrub: 0.6 },
        })
      })
    },
    { scope: root },
  )

  return (
    <footer className="footer" ref={root} data-theme="dark">
      <div className="container">
        <div className="footer__cta">
          <Heading className="h2 h2--xl">
            Prêt pour votre <em>prochain sourire ?</em>
          </Heading>
          <Fade>
            <Button href={CABINET.doctolib} external magnetic variant="gold" size="lg" icon={<Calendar />}>
              Prendre rendez-vous
            </Button>
          </Fade>
        </div>

        <div className="footer__grid">
          <div>
            <span className="footer__title">Cabinet</span>
            <span>{CABINET.doctor}</span>
            <span>{CABINET.title}</span>
            <span>{CABINET.diploma}</span>
          </div>
          <div>
            <span className="footer__title">Adresse</span>
            <span>{CABINET.street}</span>
            <span>{CABINET.city}</span>
            <a href={CABINET.phoneHref}>{CABINET.phone}</a>
          </div>
          <div>
            <span className="footer__title">Soins</span>
            {SOINS.map((s) => (
              <a
                key={s.title}
                href="#soins"
                onClick={(e) => {
                  e.preventDefault()
                  scrollToId('soins')
                }}
              >
                {s.title}
              </a>
            ))}
          </div>
          <div>
            <span className="footer__title">Liens</span>
            <a href={CABINET.doctolib} target="_blank" rel="noreferrer">
              Doctolib
            </a>
            <a href={CABINET.facebook} target="_blank" rel="noreferrer">
              Facebook
            </a>
            <a href={CABINET.maps} target="_blank" rel="noreferrer">
              Google Maps
            </a>
            <a href={CABINET.annuaire} target="_blank" rel="noreferrer">
              Annuaire santé.fr
            </a>
          </div>
        </div>
      </div>

      <div className="footer__word" aria-hidden>
        {CABINET.name.split('').map((l, i) => (
          <span className="mask" key={i}>
            <span className="footer__letter">{l}</span>
          </span>
        ))}
      </div>

      <div className="container footer__legal">
        <span>
          © {new Date().getFullYear()} Cabinet dentaire du {CABINET.doctor} · Saint-Estève
        </span>
        <a
          href="#top"
          onClick={(e) => {
            e.preventDefault()
            scrollToId('top')
          }}
        >
          Haut de page ↑
        </a>
      </div>
    </footer>
  )
}

import { useRef, useEffect, useState } from 'react'
import { gsap } from 'gsap'
import { SplitText } from 'gsap/SplitText'
import { useGSAP } from '@gsap/react'
import { CABINET, HOURS } from '../data'
import { Button } from './Button'
import { Calendar, Clock, Phone, Pin } from './Icons'
import Picture from './Picture'
import { Seal } from './Logo'
import { MQ } from '../smoothScroll'
import { linkProps } from '../router'

// Premier écran, sur fond noir : le cœur de pratique, le praticien, et tout pour prendre rendez-vous.
export default function Hero({ ready }) {
  const root = useRef(null)
  const tl = useRef(null)
  // Horaires du jour, calculés côté visiteur. getDay() : 0 = dimanche ; HOURS commence au lundi.
  const [today, setToday] = useState(null)
  useEffect(() => setToday(HOURS[(new Date().getDay() + 6) % 7]), [])

  useGSAP(
    () => {
      const mm = gsap.matchMedia()

      mm.add(MQ.motion, () => {
        const title = SplitText.create('.hero__title', { type: 'lines', mask: 'lines' })
        tl.current = gsap
          .timeline({ paused: true, defaults: { ease: 'expo.out' }, onComplete: () => title.revert() })
          .from('.hero__eyebrow', { y: 16, opacity: 0, duration: 0.9 })
          .from(title.lines, { yPercent: 110, duration: 1.3, stagger: 0.1 }, 0.1)
          .from('.hero__lead, .hero__ctas, .hero__proofs > *', { y: 24, opacity: 0, duration: 1.1, stagger: 0.08 }, 0.45)
          .from('.hero__visual', { clipPath: 'inset(100% 0% 0% 0%)', duration: 1.5, ease: 'expo.inOut' }, 0.2)
          .from('.hero__badge', { scale: 0.6, opacity: 0, rotate: -40, duration: 1.4 }, 0.9)
          .from('.hero__bar > *', { y: 20, opacity: 0, duration: 1, stagger: 0.06 }, 0.8)
        if (ready) tl.current.play()

        // Au scroll : le visuel s'enfonce légèrement, le grand sceau en filigrane tourne.
        gsap.to('.hero__visual-inner', {
          yPercent: 8,
          ease: 'none',
          scrollTrigger: { trigger: root.current, start: 'top top', end: 'bottom top', scrub: true },
        })
        gsap.to('.hero__watermark', {
          rotate: 40,
          ease: 'none',
          scrollTrigger: { trigger: root.current, start: 'top top', end: 'bottom top', scrub: true },
        })
        return () => title.revert()
      })
    },
    { scope: root },
  )

  useEffect(() => {
    if (ready) tl.current?.play()
  }, [ready])

  return (
    <section className="hero" id="top" ref={root} data-theme="dark">
      <div className="hero__watermark" aria-hidden>
        <Seal disc={false} />
      </div>

      <div className="container hero__grid">
        <div className="hero__copy">
          <p className="hero__eyebrow">
            <span className="hero__eyebrow-rule" aria-hidden />
            Cabinet dentaire · Saint-Estève
          </p>
          <h1 className="hero__title">
            Implantologie <em>&amp; chirurgie dentaire.</em>
          </h1>
          <p className="hero__lead">
            Le {CABINET.doctor} vous accueille pour vos implants, vos chirurgies et tous les soins de la famille, avec le
            temps d’expliquer chaque étape.
          </p>
          <div className="hero__ctas">
            <Button href={CABINET.doctolib} external magnetic variant="gold" size="lg" icon={<Calendar />}>
              Prendre rendez-vous
            </Button>
            <Button variant="line-light" size="lg" {...linkProps('cabinet')}>
              Découvrir le cabinet
            </Button>
          </div>
          <ul className="hero__proofs">
            <li>
              <strong>4</strong>
              <span>diplômes universitaires en implantologie et parodontologie</span>
            </li>
            <li>
              <strong>20</strong>
              <span>ans de formation continue, de 2003 à 2023</span>
            </li>
            <li>
              <strong>Bac +12</strong>
              <span>années d’études supérieures, de la faculté aux diplômes universitaires</span>
            </li>
          </ul>
        </div>

        <div className="hero__visual-wrap">
          <div className="hero__visual">
            <div className="hero__visual-inner">
              <Picture name="hero" alt="Le Dr Delikan en consultation" eager sizes="(min-width: 900px) 45vw, 100vw" />
            </div>
          </div>
          <div className="hero__badge" aria-hidden>
            <Seal />
          </div>
        </div>
      </div>

      <div className="container hero__bar">
        <a className="hero__info-item" href={CABINET.maps} target="_blank" rel="noreferrer">
          <Pin />
          <span>
            <small>Adresse</small>
            <strong>{CABINET.street}</strong>
            <span>{CABINET.city}</span>
          </span>
        </a>
        <div className="hero__info-item">
          <Clock />
          <span>
            <small>Aujourd’hui</small>
            <strong>{today ? today.time : '8h30 – 13h00'}</strong>
            <span>Du lundi au vendredi</span>
          </span>
        </div>
        <a className="hero__info-item" href={CABINET.phoneHref}>
          <Phone />
          <span>
            <small>Téléphone</small>
            <strong>{CABINET.phone}</strong>
            <span>Secrétariat</span>
          </span>
        </a>
        <a
          className="hero__scroll"
          href="#/bienvenue"
          onClick={(e) => {
            e.preventDefault()
            document.getElementById('bienvenue')?.scrollIntoView({ behavior: 'smooth' })
          }}
          aria-label="Défiler vers la suite"
        >
          <span />
        </a>
      </div>
    </section>
  )
}

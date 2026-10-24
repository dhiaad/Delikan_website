import { useRef, useEffect, useState } from 'react'
import { gsap } from 'gsap'
import { SplitText } from 'gsap/SplitText'
import { useGSAP } from '@gsap/react'
import { CABINET, HOURS } from '../data'
import { Button } from './Button'
import { Calendar, Clock, Phone, Pin } from './Icons'
import Picture from './Picture'
import { Mandible } from './Engravings'
import { MQ, scrollToId } from '../smoothScroll'

// L'essentiel d'abord : qui, pour quels soins, où, quand, comment prendre rendez-vous.
export default function Hero({ ready }) {
  const root = useRef(null)
  const tl = useRef(null)
  // Horaires du jour, calculés côté visiteur. getDay() : 0 = dimanche ; HOURS commence au lundi.
  const [today, setToday] = useState(null)
  useEffect(() => setToday(HOURS[(new Date().getDay() + 6) % 7]), [])
  const toSoins = (e) => {
    e.preventDefault()
    scrollToId('soins')
  }

  useGSAP(
    () => {
      const mm = gsap.matchMedia()

      mm.add(MQ.motion, () => {
        const title = SplitText.create('.hero__title', { type: 'lines', mask: 'lines' })
        tl.current = gsap
          .timeline({ paused: true, defaults: { ease: 'expo.out' }, onComplete: () => title.revert() })
          .from(title.lines, { yPercent: 110, duration: 1.3, stagger: 0.1 })
          .from('.hero__kicker', { y: 16, opacity: 0, duration: 0.9, stagger: 0.1 }, 0.3)
          .from('.hero__row > *', { y: 22, opacity: 0, duration: 1, stagger: 0.08 }, 0.45)
          .from('.hero__rule', { scaleX: 0, duration: 1.2, ease: 'expo.inOut' }, 0.5)
          .from('.hero__info > *', { y: 22, opacity: 0, duration: 1, stagger: 0.07 }, 0.65)
          .from('.hero__frame', { yPercent: 10, opacity: 0, duration: 1.4 }, 0.7)
        if (ready) tl.current.play()

        // Au scroll : le cadre s'ouvre jusqu'aux bords, l'image se pose (léger zoom arrière).
        gsap.fromTo(
          '.hero__frame',
          { clipPath: 'inset(0% 5% 0% 5% round 0px)' },
          {
            clipPath: 'inset(0% 0% 0% 0% round 0px)',
            ease: 'none',
            scrollTrigger: { trigger: '.hero__media', start: 'top 85%', end: 'top 10%', scrub: true },
          },
        )
        gsap.fromTo(
          '.hero__media-inner',
          { scale: 1.15 },
          {
            scale: 1,
            ease: 'none',
            scrollTrigger: { trigger: '.hero__media', start: 'top bottom', end: 'bottom top', scrub: true },
          },
        )
        return () => title.revert()
      })
    },
    { scope: root },
  )

  useEffect(() => {
    if (ready) tl.current?.play()
  }, [ready])

  return (
    <section className="hero" id="top" ref={root}>
      <div className="hero__top container">
        <p className="hero__kicker">Implantologie · Chirurgie orale · Soins dentaires</p>
        <p className="hero__kicker hero__kicker--right">Saint-Estève · Pyrénées-Orientales</p>
      </div>

      <Mandible className="bg-plate bg-plate--hero" />
      <div className="container hero__body">
        <h1 className="hero__title">
          {CABINET.doctor}, <em>chirurgien-dentiste.</em>
        </h1>

        <div className="hero__row">
          <p className="hero__lead">
            L’implantologie et la chirurgie orale au cœur de la pratique, et tous les soins dentaires pour la famille,
            dans un cabinet où l’on prend le temps d’expliquer.
          </p>
          <div className="hero__ctas">
            <Button href={CABINET.doctolib} external magnetic size="lg" icon={<Calendar />}>
              Prendre rendez-vous
            </Button>
            <Button href="#soins" variant="line" size="lg" onClick={toSoins}>
              Découvrir les soins
            </Button>
          </div>
        </div>

        <span className="hero__rule" aria-hidden />

        {/* Infos pratiques en un coup d'œil. */}
        <div className="hero__info">
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
        </div>
      </div>

      <div className="hero__media">
        <div className="hero__frame">
          <div className="hero__media-inner">
            <Picture name="hero" alt="Le Dr Delikan en consultation" eager sizes="100vw" />
          </div>
          <div className="hero__caption">
            <span>Au cabinet</span>
            <span>{CABINET.street}, Saint-Estève</span>
          </div>
        </div>
      </div>
    </section>
  )
}

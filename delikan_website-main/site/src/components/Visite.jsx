import { useRef, useState } from 'react'
import { gsap } from 'gsap'
import { useGSAP } from '@gsap/react'
import { VISITE, sectionIndex } from '../data'
import { Heading, Label } from './Heading'
import Picture from './Picture'
import { MQ } from '../smoothScroll'

const pad = (n) => String(n).padStart(2, '0')

export default function Visite() {
  const root = useRef(null)
  const track = useRef(null)
  const [current, setCurrent] = useState(1)

  useGSAP(
    () => {
      const mm = gsap.matchMedia()

      // Grand écran : section épinglée, les photos défilent à l'horizontale.
      mm.add(`${MQ.motion} and (min-width: 900px)`, () => {
        const cards = gsap.utils.toArray('.visite__card')
        const distance = () => track.current.scrollWidth - window.innerWidth
        const tween = gsap.to(track.current, {
          x: () => -distance(),
          ease: 'none',
          scrollTrigger: {
            trigger: root.current,
            start: 'top top',
            end: () => `+=${distance()}`,
            pin: true,
            scrub: 0.6,
            invalidateOnRefresh: true,
            onUpdate: (self) => setCurrent(Math.min(cards.length, Math.round(self.progress * (cards.length - 1)) + 1)),
          },
        })
        gsap.to('.visite__bar span', {
          scaleX: 1,
          ease: 'none',
          scrollTrigger: { trigger: root.current, start: 'top top', end: () => `+=${distance()}`, scrub: true },
        })
        cards.forEach((card) => {
          // L'image glisse légèrement dans son cadre : effet de profondeur.
          gsap.fromTo(
            card.querySelector('.visite__img > *'),
            { xPercent: -7 },
            {
              xPercent: 7,
              ease: 'none',
              scrollTrigger: { trigger: card, containerAnimation: tween, start: 'left right', end: 'right left', scrub: true },
            },
          )
        })
      })
    },
    { scope: root },
  )

  // Mobile : carrousel natif, le compteur suit le balayage.
  const onSwipe = (e) => {
    const el = e.currentTarget
    if (window.innerWidth >= 900 && !window.matchMedia(MQ.reduce).matches) return
    const card = el.firstElementChild?.offsetWidth || 1
    setCurrent(Math.min(VISITE.length, Math.round(el.scrollLeft / card) + 1))
  }

  // Carrousel : flèches précédente / suivante, et glisser à la souris (le doigt fait défiler nativement).
  const go = (dir) => {
    const el = track.current
    const card = el.firstElementChild?.offsetWidth || el.clientWidth
    el.scrollBy({ left: dir * (card + 24), behavior: 'smooth' })
  }
  const drag = useRef(null)
  const onDown = (e) => {
    if (e.pointerType !== 'mouse' || window.getComputedStyle(track.current).overflowX !== 'auto') return
    drag.current = { x: e.clientX, left: track.current.scrollLeft, moved: false }
    track.current.setPointerCapture(e.pointerId)
    track.current.classList.add('is-dragging')
  }
  const onMove = (e) => {
    if (!drag.current) return
    const dx = e.clientX - drag.current.x
    if (Math.abs(dx) > 3) drag.current.moved = true
    track.current.scrollLeft = drag.current.left - dx
  }
  const onUp = () => {
    if (!drag.current) return
    drag.current = null
    track.current.classList.remove('is-dragging')
  }

  return (
    <section className="visite" id="visite" data-theme="dark" ref={root}>
      <div className="visite__intro container">
        <div>
          <Label index={sectionIndex('visite')} light>
            Visite du cabinet
          </Label>
          <Heading className="h2 h2--xl visite__title">
            Entrez, <em>on vous fait visiter.</em>
          </Heading>
        </div>
        <div className="visite__counter" aria-hidden>
          <span className="visite__current">{pad(current)}</span>
          <span className="visite__total">/ {pad(VISITE.length)}</span>
          <span className="visite__bar">
            <span />
          </span>
        </div>
        <div className="visite__nav">
          <button type="button" onClick={() => go(-1)} disabled={current === 1} aria-label="Photo précédente">
            ←
          </button>
          <button
            type="button"
            onClick={() => go(1)}
            disabled={current === VISITE.length}
            aria-label="Photo suivante"
          >
            →
          </button>
        </div>
      </div>

      <div
        className="visite__track"
        ref={track}
        onScroll={onSwipe}
        onPointerDown={onDown}
        onPointerMove={onMove}
        onPointerUp={onUp}
        onPointerCancel={onUp}
      >
        {VISITE.map((v, i) => (
          <figure className="visite__card" key={v.img}>
            <div className="visite__img">
              <Picture name={v.img} alt={v.title} sizes="(min-width: 900px) 34vw, 82vw" />
            </div>
            <figcaption>
              <span className="visite__num">{pad(i + 1)}</span>
              <div>
                <h3>{v.title}</h3>
                <p>{v.text}</p>
              </div>
            </figcaption>
          </figure>
        ))}
      </div>
    </section>
  )
}

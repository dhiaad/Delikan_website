import { useRef, useState } from 'react'
import { gsap } from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'
import { useGSAP } from '@gsap/react'
import { MQ } from '../smoothScroll'

// Liste éditoriale dépliable (soins, questions fréquentes).
// Chaque ligne s'ouvre et se ferme indépendamment : rien ne se referme au-dessus, donc la page ne saute pas.
// Le dépliage est une transition CSS (grid-template-rows 0fr → 1fr), le contenu reste dans la page.
export default function Accordion({ id, items, initial = [0], className = '' }) {
  const [open, setOpen] = useState(() => new Set(initial))
  const list = useRef(null)

  const toggle = (i) =>
    setOpen((prev) => {
      const next = new Set(prev)
      if (next.has(i)) next.delete(i)
      else next.add(i)
      return next
    })

  useGSAP(
    () => {
      const mm = gsap.matchMedia()
      mm.add(MQ.motion, () => {
        gsap.from('.soin', {
          y: 40,
          opacity: 0,
          duration: 1.1,
          stagger: 0.07,
          ease: 'expo.out',
          scrollTrigger: { trigger: list.current, start: 'top 85%', once: true },
        })
        gsap.from('.soin__rule', {
          scaleX: 0,
          duration: 1.4,
          stagger: 0.07,
          ease: 'expo.inOut',
          scrollTrigger: { trigger: list.current, start: 'top 85%', once: true },
        })
      })
    },
    { scope: list },
  )

  return (
    <ul className={`soins__list ${className}`} ref={list}>
      {items.map((it, i) => {
        const isOpen = open.has(i)
        return (
          <li key={it.title} className={`soin ${isOpen ? 'is-open' : ''}`}>
            <span className="soin__rule" aria-hidden />
            <button
              className="soin__head"
              aria-expanded={isOpen}
              aria-controls={`${id}-${i}`}
              onClick={() => toggle(i)}
            >
              <span className="soin__n">{String(i + 1).padStart(2, '0')}</span>
              <span className="soin__title">{it.title}</span>
              {it.tag && <span className="soin__tag">{it.tag}</span>}
              <span className="soin__plus" aria-hidden />
            </button>
            <div
              id={`${id}-${i}`}
              className="soin__panel"
              role="region"
              aria-hidden={!isOpen}
              inert={!isOpen}
              // La hauteur de la page a changé : les animations au scroll recalculent leurs positions.
              onTransitionEnd={(e) => e.propertyName === 'grid-template-rows' && ScrollTrigger.refresh()}
            >
              <div className="soin__panel-inner">
                <div className="soin__body">{it.body}</div>
              </div>
            </div>
          </li>
        )
      })}
    </ul>
  )
}

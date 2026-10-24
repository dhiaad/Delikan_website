import { useRef, useState } from 'react'
import * as m from 'motion/react-m'
import { AnimatePresence } from 'motion/react'
import { gsap } from 'gsap'
import { useGSAP } from '@gsap/react'
import { MQ } from '../smoothScroll'

const ease = [0.16, 1, 0.3, 1]

// Liste éditoriale dépliable (soins, questions fréquentes). Une seule ligne ouverte à la fois.
export default function Accordion({ id, items, initial = 0, className = '' }) {
  const [open, setOpen] = useState(initial)
  const list = useRef(null)

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
        const isOpen = open === i
        return (
          <li key={it.title} className={`soin ${isOpen ? 'is-open' : ''}`}>
            <span className="soin__rule" aria-hidden />
            <button
              className="soin__head"
              aria-expanded={isOpen}
              aria-controls={`${id}-${i}`}
              onClick={() => setOpen(isOpen ? -1 : i)}
            >
              <span className="soin__n">{String(i + 1).padStart(2, '0')}</span>
              <span className="soin__title">{it.title}</span>
              {it.tag && <span className="soin__tag">{it.tag}</span>}
              <span className="soin__plus" aria-hidden />
            </button>
            <AnimatePresence initial={false}>
              {isOpen && (
                <m.div
                  id={`${id}-${i}`}
                  className="soin__panel"
                  initial={{ height: 0, opacity: 0 }}
                  animate={{ height: 'auto', opacity: 1 }}
                  exit={{ height: 0, opacity: 0 }}
                  transition={{ duration: 0.6, ease }}
                >
                  <div className="soin__body">{it.body}</div>
                </m.div>
              )}
            </AnimatePresence>
          </li>
        )
      })}
    </ul>
  )
}

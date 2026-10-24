import { useRef, useState } from 'react'
import * as m from 'motion/react-m'
import { AnimatePresence } from 'motion/react'
import { gsap } from 'gsap'
import { useGSAP } from '@gsap/react'
import { CABINET, SOINS } from '../data'
import { Heading, Label, Fade } from './Heading'
import { Button } from './Button'
import { Calendar } from './Icons'
import { MQ } from '../smoothScroll'
import { ToothSection } from './Engravings'

const ease = [0.16, 1, 0.3, 1]

export default function Soins() {
  const [open, setOpen] = useState(0)
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
    <section className="section soins" id="soins">
      <ToothSection className="bg-plate bg-plate--soins" />
      <div className="container soins__grid">
        <div className="soins__head">
          <Label index="04">Les soins</Label>
          <Heading className="h2">
            Tout pour votre santé <em>bucco-dentaire.</em>
          </Heading>
          <Fade>
            <p className="muted">
              Du simple contrôle à la pose d’implants, l’ensemble des soins est réalisé au cabinet, avec le même souci de
              confort et de clarté.
            </p>
          </Fade>
          <Fade delay={0.3}>
            <Button href={CABINET.doctolib} external magnetic variant="line" icon={<Calendar />}>
              Prendre rendez-vous
            </Button>
          </Fade>
        </div>

        <ul className="soins__list" ref={list}>
          {SOINS.map((s, i) => {
            const isOpen = open === i
            return (
              <li key={s.title} className={`soin ${isOpen ? 'is-open' : ''}`}>
                <span className="soin__rule" aria-hidden />
                <button
                  className="soin__head"
                  aria-expanded={isOpen}
                  aria-controls={`soin-${i}`}
                  onClick={() => setOpen(isOpen ? -1 : i)}
                >
                  <span className="soin__n">{String(i + 1).padStart(2, '0')}</span>
                  <span className="soin__title">{s.title}</span>
                  {s.tag && <span className="soin__tag">{s.tag}</span>}
                  <span className="soin__plus" aria-hidden />
                </button>
                <AnimatePresence initial={false}>
                  {isOpen && (
                    <m.div
                      id={`soin-${i}`}
                      className="soin__panel"
                      initial={{ height: 0, opacity: 0 }}
                      animate={{ height: 'auto', opacity: 1 }}
                      exit={{ height: 0, opacity: 0 }}
                      transition={{ duration: 0.6, ease }}
                    >
                      <p>{s.text}</p>
                    </m.div>
                  )}
                </AnimatePresence>
              </li>
            )
          })}
        </ul>
      </div>
    </section>
  )
}

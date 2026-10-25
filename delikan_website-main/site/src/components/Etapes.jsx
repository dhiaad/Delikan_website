import { useRef } from 'react'
import { gsap } from 'gsap'
import { useGSAP } from '@gsap/react'
import { ETAPES, sectionIndex } from '../data'
import { Heading, Label, Fade } from './Heading'
import { MQ } from '../smoothScroll'
import { TOOTH_PATH } from './Logo'

export default function Etapes() {
  const root = useRef(null)

  useGSAP(
    () => {
      const mm = gsap.matchMedia()
      mm.add(MQ.motion, () => {
        gsap.fromTo(
          '.etapes__progress',
          { scaleY: 0 },
          {
            scaleY: 1,
            ease: 'none',
            scrollTrigger: { trigger: '.etapes__list', start: 'top 75%', end: 'bottom 60%', scrub: true },
          },
        )
        gsap.utils.toArray('.etape').forEach((el) => {
          gsap
            .timeline({
              scrollTrigger: {
                trigger: el,
                start: 'top 78%',
                once: true,
                onEnter: () => el.classList.add('is-active'),
              },
            })
            .from(el.querySelector('.etape__n'), { yPercent: 100, duration: 1.1, ease: 'expo.out' })
            .from(el.querySelectorAll('h3, p'), { y: 20, opacity: 0, duration: 1, stagger: 0.08, ease: 'power3.out' }, 0.1)
        })
      })
      // Sans animation, les étapes sont directement marquées comme atteintes.
      mm.add(MQ.reduce, () => gsap.utils.toArray('.etape').forEach((el) => el.classList.add('is-active')))
    },
    { scope: root },
  )

  return (
    <section className="section etapes" id="etapes" ref={root}>
      {/* Ornement de transition depuis la partie précédente : filet d'or et dent au centre. */}
      <div className="ornament" aria-hidden>
        <span />
        <svg viewBox="0 0 16 21" width="14" height="18">
          <path d={TOOTH_PATH} fill="currentColor" />
        </svg>
        <span />
      </div>
      <div className="container etapes__grid">
        <div className="etapes__head">
          <Label index={sectionIndex('etapes')}>Première visite</Label>
          <Heading className="h2">
            Simple, <em>du début à la fin.</em>
          </Heading>
          <Fade>
            <p className="muted">Nouveau patient ? Voici comment se passe votre prise en charge.</p>
          </Fade>
        </div>

        <ol className="etapes__list">
          <span className="etapes__track" aria-hidden>
            <span className="etapes__progress" />
          </span>
          {ETAPES.map((e) => (
            <li className="etape" key={e.n}>
              <span className="mask etape__mask">
                <span className="etape__n">{e.n}</span>
              </span>
              <div>
                <h3>{e.title}</h3>
                <p>{e.text}</p>
              </div>
            </li>
          ))}
        </ol>
      </div>
    </section>
  )
}

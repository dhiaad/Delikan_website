import { useRef } from 'react'
import { gsap } from 'gsap'
import { SplitText } from 'gsap/SplitText'
import { useGSAP } from '@gsap/react'
import { CABINET, SECTIONS } from '../data'
import { linkProps } from '../router'
import { Button } from './Button'
import { Calendar } from './Icons'
import { Seal } from './Logo'
import Arch3D from './Arch3D'
import { MQ, scrollToId } from '../smoothScroll'

// En-tête des pages intérieures : fil d'Ariane, titre, introduction et sommaire de la page.
export default function PageHeader({ page }) {
  const root = useRef(null)
  const sections = page.sections.map((id) => SECTIONS.find((s) => s.id === id))

  useGSAP(
    () => {
      const mm = gsap.matchMedia()
      mm.add(MQ.motion, () => {
        const title = SplitText.create('.page-head__title', { type: 'lines', mask: 'lines' })
        gsap
          .timeline({ defaults: { ease: 'expo.out' }, onComplete: () => title.revert() })
          .from('.page-head__crumbs', { y: 14, opacity: 0, duration: 0.8 })
          .from(title.lines, { yPercent: 110, duration: 1.2, stagger: 0.1 }, 0.05)
          .from('.page-head__lead, .page-head__aside > *, .page-head__toc li', { y: 22, opacity: 0, duration: 1, stagger: 0.07 }, 0.35)
        gsap.to('.page-head__watermark', {
          rotate: 30,
          ease: 'none',
          scrollTrigger: { trigger: root.current, start: 'top top', end: 'bottom top', scrub: true },
        })
        return () => title.revert()
      })
    },
    { scope: root },
  )

  return (
    <section className="page-head" id="top" data-theme="dark" ref={root}>
      <div className="page-head__clip" aria-hidden>
        <div className="page-head__watermark">
          <Seal disc={false} />
        </div>
      </div>
      <div className="container page-head__grid">
        <div>
          <p className="page-head__crumbs">
            <a {...linkProps('accueil')}>Accueil</a>
            <span aria-hidden>/</span>
            <span aria-current="page">{page.label}</span>
          </p>
          <h1 className="page-head__title">
            {page.title} <em>{page.em}</em>
          </h1>
          <p className="page-head__lead">{page.lead}</p>
        </div>

        <aside className="page-head__aside">
          <Button href={CABINET.doctolib} external magnetic variant="gold" icon={<Calendar />}>
            Prendre rendez-vous
          </Button>
        </aside>
      </div>

      {/* Sommaire : une carte par partie de la page, avec ce qu'on y trouve. */}
      {sections.length > 1 && (
        <nav className="container page-head__toc" aria-label="Au sommaire de cette page">
          <p className="page-head__toc-title">Au sommaire</p>
          {/* Cartes + arcade 3D : 2 colonnes à partir de 4 cases, sinon une seule rangée. */}
          <ol style={{ '--cols': sections.length + 1 > 3 ? 2 : sections.length + 1 }}>
            {sections.map((s, i) => (
              <li key={s.id}>
                <a
                  href={`#/${page.id}/${s.id}`}
                  onClick={(e) => {
                    e.preventDefault()
                    scrollToId(s.id)
                  }}
                >
                  <small>{String(i + 1).padStart(2, '0')}</small>
                  <strong>{s.label}</strong>
                  <span>{s.desc}</span>
                  <i aria-hidden>↓</i>
                </a>
              </li>
            ))}
            <li className="page-head__arch">
              <Arch3D />
            </li>
          </ol>
        </nav>
      )}
    </section>
  )
}

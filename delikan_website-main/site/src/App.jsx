import { useCallback, useEffect, useLayoutEffect, useState } from 'react'
import { LazyMotion, MotionConfig, domAnimation } from 'motion/react'
import { gsap } from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'
import { useGSAP } from '@gsap/react'
import { initSmoothScroll, scrollToId, scrollToTopNow } from './smoothScroll'
import { PAGES } from './data'
import { useRoute } from './router'
import Intro from './components/Intro'
import Nav from './components/Nav'
import Hero from './components/Hero'
import Marquee from './components/Marquee'
import About from './components/About'
import Explore from './components/Explore'
import PageHeader from './components/PageHeader'
import PageNext from './components/PageNext'
import Soins from './components/Soins'
import Visite from './components/Visite'
import Docteur from './components/Docteur'
import Focus from './components/Focus'
import Engagements from './components/Engagements'
import Faq from './components/Faq'
import Etapes from './components/Etapes'
import Infos from './components/Infos'
import Footer from './components/Footer'
import MobileBar from './components/MobileBar'

const SECTION_COMPONENTS = {
  bienvenue: About,
  explorer: Explore,
  visite: Visite,
  engagements: Engagements,
  etapes: Etapes,
  soins: Soins,
  implants: Focus,
  docteur: Docteur,
  infos: Infos,
  faq: Faq,
}

export default function App() {
  const [ready, setReady] = useState(false)
  const onReveal = useCallback(() => setReady(true), [])
  const route = useRoute()
  const page = PAGES.find((p) => p.id === route.page) || PAGES[0]

  useEffect(() => {
    const stop = initSmoothScroll()
    // Recalcule les positions une fois polices et images chargées.
    const refresh = () => ScrollTrigger.refresh()
    window.addEventListener('load', refresh)
    document.fonts?.ready.then(refresh)
    return () => {
      window.removeEventListener('load', refresh)
      stop()
    }
  }, [])

  // Changement de page : en haut de la nouvelle page, ou directement à la section demandée.
  useLayoutEffect(() => {
    document.title =
      page.id === 'accueil'
        ? 'Dr Ibrahim Delikan · Chirurgien-dentiste à Saint-Estève'
        : `${page.label} · Dr Ibrahim Delikan, chirurgien-dentiste à Saint-Estève`
    if (!route.section) scrollToTopNow()
  }, [page.id, page.label, route.section])
  useEffect(() => {
    ScrollTrigger.refresh()
    if (route.section) {
      const t = setTimeout(() => scrollToId(route.section), 120)
      return () => clearTimeout(t)
    }
  }, [page.id, route.section])

  // Le fond de page glisse vers le brun profond en entrant dans les sections sombres.
  useGSAP(
    () => {
      const html = document.documentElement
      html.classList.remove('is-dark')
      gsap.utils.toArray('[data-theme="dark"]').forEach((el) => {
        // Une section épinglée est enveloppée par GSAP : on suit l'enveloppe pour couvrir toute la durée.
        const wrap = el.parentElement.classList.contains('pin-spacer') ? el.parentElement : el
        ScrollTrigger.create({
          trigger: wrap,
          start: 'top 55%',
          end: 'bottom 45%',
          onToggle: (self) => html.classList.toggle('is-dark', self.isActive),
        })
      })
    },
    { dependencies: [page.id], revertOnUpdate: true },
  )

  return (
    <MotionConfig reducedMotion="user">
      <LazyMotion features={domAnimation} strict>
        <a
          className="skip"
          href="#contenu"
          onClick={(e) => {
            e.preventDefault()
            document.getElementById('contenu')?.focus()
          }}
        >
          Aller au contenu
        </a>
        <Intro onReveal={onReveal} />
        <Nav page={page} />
        <main key={page.id} id="contenu" tabIndex={-1} className="page">
          {page.id === 'accueil' ? (
            <>
              <Hero ready={ready} />
              <Marquee />
            </>
          ) : (
            <PageHeader page={page} />
          )}
          {page.sections.map((id) => {
            const Section = SECTION_COMPONENTS[id]
            return <Section key={id} />
          })}
          {page.id !== 'accueil' && <PageNext page={page} />}
        </main>
        <Footer />
        <MobileBar />
      </LazyMotion>
    </MotionConfig>
  )
}

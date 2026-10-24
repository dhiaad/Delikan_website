import { useCallback, useEffect, useState } from 'react'
import { LazyMotion, MotionConfig, domAnimation } from 'motion/react'
import { gsap } from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'
import { useGSAP } from '@gsap/react'
import { initSmoothScroll } from './smoothScroll'
import Intro from './components/Intro'
import Nav from './components/Nav'
import Hero from './components/Hero'
import About from './components/About'
import Soins from './components/Soins'
import Visite from './components/Visite'
import Diplomes from './components/Diplomes'
import Etapes from './components/Etapes'
import Infos from './components/Infos'
import Footer from './components/Footer'
import MobileBar from './components/MobileBar'

export default function App() {
  const [ready, setReady] = useState(false)
  const onReveal = useCallback(() => setReady(true), [])

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

  // Le fond de page glisse vers le taupe profond en entrant dans les sections sombres.
  useGSAP(() => {
    const html = document.documentElement
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
  })

  return (
    <MotionConfig reducedMotion="user">
      <LazyMotion features={domAnimation} strict>
        <a className="skip" href="#diplomes">
          Aller au contenu
        </a>
        <Intro onReveal={onReveal} />
        <Nav />
        <main>
          {/* L'essentiel en haut (diplômes, images, adresse), les textes longs ensuite. */}
          <Hero ready={ready} />
          <Diplomes />
          <Visite />
          <Infos />
          <Soins />
          <About />
          <Etapes />
        </main>
        <Footer />
        <MobileBar />
      </LazyMotion>
    </MotionConfig>
  )
}

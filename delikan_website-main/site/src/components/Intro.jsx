import { useRef, useState } from 'react'
import { gsap } from 'gsap'
import { useGSAP } from '@gsap/react'
import { Seal } from './Logo'
import { prefersReducedMotion } from '../smoothScroll'

const KEY = 'delikan-intro-sceau-1'

const shouldPlay = () => {
  if (prefersReducedMotion()) return false
  try {
    return !sessionStorage.getItem(KEY)
  } catch {
    return true
  }
}

// Entrée en scène : le sceau se trace, le iD monte, la dent d'or tombe sur le i,
// les mots se posent en couronne, puis le rideau noir se lève sur le site.
// Jouée une fois par session, jamais avec « réduire les animations », sans bloquer le scroll.
export default function Intro({ onReveal }) {
  const root = useRef(null)
  const tl = useRef(null)
  const [play] = useState(shouldPlay)
  const [done, setDone] = useState(!play)

  useGSAP(
    () => {
      if (!play) {
        onReveal()
        return
      }
      try {
        sessionStorage.setItem(KEY, '1')
      } catch {
        /* stockage indisponible : l'intro rejouera, sans gravité */
      }

      gsap.set('.intro .seal__ring', { strokeDasharray: 760, strokeDashoffset: 760 })

      tl.current = gsap
        .timeline({ paused: true, onComplete: () => setDone(true) })
        .to('.intro .seal__ring', { strokeDashoffset: 0, duration: 1.3, stagger: 0.15, ease: 'power2.inOut' })
        .from('.intro .seal__mono text', { yPercent: 30, opacity: 0, duration: 0.9, ease: 'expo.out' }, 0.5)
        .from('.intro .seal__tooth', { y: -60, opacity: 0, duration: 0.8, ease: 'bounce.out' }, 0.9)
        .from('.intro .seal__words > *', { opacity: 0, duration: 0.8, stagger: 0.08, ease: 'power2.out' }, 1.1)
        .from('.intro .seal__sub', { opacity: 0, y: 6, duration: 0.6, ease: 'power2.out' }, 1.3)
        .to('.intro__seal', { rotate: 18, duration: 2.4, ease: 'none' }, 0)
        .to('.intro__seal', { scale: 0.86, opacity: 0, duration: 0.6, ease: 'power2.in' }, 2.25)
        .call(onReveal, null, 2.45)
        .to('.intro__curtain', { yPercent: -100, duration: 0.9, ease: 'expo.inOut' }, 2.4)

      const fonts = document.fonts?.ready ?? Promise.resolve()
      Promise.race([fonts, new Promise((r) => setTimeout(r, 700))]).then(() => tl.current?.play())

      // Si le visiteur fait défiler ou tape une touche, l'intro accélère au lieu de bloquer.
      const hurry = () => tl.current?.timeScale(4)
      const opts = { passive: true, once: true }
      window.addEventListener('wheel', hurry, opts)
      window.addEventListener('touchstart', hurry, opts)
      window.addEventListener('keydown', hurry, { once: true })
      return () => {
        window.removeEventListener('wheel', hurry)
        window.removeEventListener('touchstart', hurry)
        window.removeEventListener('keydown', hurry)
      }
    },
    { scope: root },
  )

  if (done) return null

  return (
    <div className="intro" ref={root} aria-hidden>
      <div className="intro__curtain">
        <div className="intro__seal">
          <Seal disc={false} />
        </div>
      </div>
    </div>
  )
}

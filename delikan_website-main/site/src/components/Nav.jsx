import { useEffect, useState } from 'react'
import * as m from 'motion/react-m'
import { AnimatePresence } from 'motion/react'
import { CABINET, SECTIONS } from '../data'
import { Logo } from './Logo'
import { Mandible } from './Engravings'
import { scrollToId, setScrollLocked } from '../smoothScroll'

const ease = [0.76, 0, 0.24, 1]
const pad = (n) => String(n).padStart(2, '0')

// Navigation éditoriale : « Menu » à gauche, logo au centre, rendez-vous à droite,
// sommaire plein écran façon table des matières, et repère de section sur le côté.
export default function Nav() {
  const [hidden, setHidden] = useState(false)
  const [solid, setSolid] = useState(false)
  const [open, setOpen] = useState(false)
  const [active, setActive] = useState(null)

  // Se masque en descendant, réapparaît dès qu'on remonte.
  useEffect(() => {
    let last = window.scrollY
    const onScroll = () => {
      const y = window.scrollY
      setSolid(y > 30)
      setHidden(y > window.innerHeight * 0.8 && y > last + 2)
      if (y < last - 2) setHidden(false)
      last = y
    }
    onScroll()
    window.addEventListener('scroll', onScroll, { passive: true })
    return () => window.removeEventListener('scroll', onScroll)
  }, [])

  // Section active, pour le repère latéral et le sommaire.
  useEffect(() => {
    const io = new IntersectionObserver(
      (entries) =>
        entries.forEach((e) => {
          if (e.isIntersecting) setActive(SECTIONS.some((s) => s.id === e.target.id) ? e.target.id : null)
        }),
      { rootMargin: '-45% 0px -50% 0px' },
    )
    document.querySelectorAll('main > section[id]').forEach((el) => io.observe(el))
    return () => io.disconnect()
  }, [])

  useEffect(() => {
    setScrollLocked(open)
    const onKey = (e) => e.key === 'Escape' && setOpen(false)
    window.addEventListener('keydown', onKey)
    return () => window.removeEventListener('keydown', onKey)
  }, [open])

  const go = (id) => (e) => {
    e.preventDefault()
    setOpen(false)
    // Laisse le sommaire se refermer avant de défiler.
    setTimeout(() => scrollToId(id), open ? 450 : 0)
  }

  const activeIndex = SECTIONS.findIndex((s) => s.id === active)

  return (
    <>
      <header
        className={`nav ${solid ? 'nav--solid' : ''} ${hidden && !open ? 'nav--hidden' : ''} ${open ? 'nav--open' : ''}`}
      >
        <div className="nav__inner">
          <button
            className="nav__menu"
            aria-label={open ? 'Fermer le sommaire' : 'Ouvrir le sommaire'}
            aria-expanded={open}
            onClick={() => setOpen((o) => !o)}
          >
            <span className="nav__menu-lines" aria-hidden>
              <span />
              <span />
            </span>
            <span className="nav__menu-label">{open ? 'Fermer' : 'Sommaire'}</span>
          </button>

          <a href="#top" className="brand" onClick={go('top')} aria-label="Cabinet Delikan, retour en haut">
            <Logo />
          </a>

          <div className="nav__actions">
            <a className="nav__phone" href={CABINET.phoneHref}>
              {CABINET.phone}
            </a>
            <a className="nav__book" href={CABINET.doctolib} target="_blank" rel="noreferrer">
              <span>Rendez-vous</span>
            </a>
          </div>
        </div>
      </header>

      {/* Repère de section, sur le bord gauche (grand écran). */}
      <nav className={`rail ${activeIndex >= 0 && !open ? 'rail--on' : ''}`} aria-label="Sections">
        {SECTIONS.map((s, i) => (
          <a
            key={s.id}
            href={`#${s.id}`}
            onClick={go(s.id)}
            className={active === s.id ? 'is-active' : ''}
            aria-current={active === s.id ? 'true' : undefined}
          >
            <span className="rail__n">{pad(i + 1)}</span>
            <span className="rail__label">{s.label}</span>
          </a>
        ))}
      </nav>

      <AnimatePresence>
        {open && (
          <m.div
            className="menu"
            initial={{ clipPath: 'inset(0% 0% 100% 0%)' }}
            animate={{ clipPath: 'inset(0% 0% 0% 0%)' }}
            exit={{ clipPath: 'inset(0% 0% 100% 0%)' }}
            transition={{ duration: 0.8, ease }}
          >
            <div className="menu__grid">
              <div>
                <p className="menu__kicker">Sommaire</p>
                <ol className="menu__list">
                  {SECTIONS.map((s, i) => (
                    <li key={s.id}>
                      <span className="mask">
                        <m.a
                          href={`#${s.id}`}
                          onClick={go(s.id)}
                          className={active === s.id ? 'is-active' : ''}
                          initial={{ y: '110%' }}
                          animate={{ y: '0%' }}
                          exit={{ y: '110%', transition: { duration: 0.35, ease } }}
                          transition={{ delay: 0.3 + i * 0.06, duration: 0.9, ease: [0.16, 1, 0.3, 1] }}
                        >
                          <small>{['I', 'II', 'III', 'IV', 'V', 'VI'][i]}</small>
                          {s.label}
                        </m.a>
                      </span>
                    </li>
                  ))}
                </ol>
              </div>

              <m.aside
                className="menu__aside"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
                transition={{ delay: 0.45, duration: 0.6 }}
              >
                <Mandible className="menu__plate" />
                <div className="menu__contact">
                  <a className="menu__book" href={CABINET.doctolib} target="_blank" rel="noreferrer">
                    Prendre rendez-vous sur Doctolib
                  </a>
                  <a href={CABINET.phoneHref}>{CABINET.phone}</a>
                  <span>
                    {CABINET.street}, {CABINET.city}
                  </span>
                </div>
              </m.aside>
            </div>
          </m.div>
        )}
      </AnimatePresence>
    </>
  )
}

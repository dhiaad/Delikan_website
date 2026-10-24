import { useEffect, useRef, useState } from 'react'
import * as m from 'motion/react-m'
import { AnimatePresence } from 'motion/react'
import { CABINET, HOURS, PAGES, SECTIONS } from '../data'
import { linkProps } from '../router'
import { Logo } from './Logo'
import { Calendar, Clock, Phone, Pin } from './Icons'
import { scrollToId, setScrollLocked } from '../smoothScroll'

const ease = [0.76, 0, 0.24, 1]
const pad = (n) => String(n).padStart(2, '0')

// Barre du haut : logo (accueil), les pages du site, téléphone, rendez-vous et « Menu » (toutes les pages et
// leurs sections, avec contact direct). Repère des sections de la page sur le côté.
export default function Nav({ page }) {
  const [hidden, setHidden] = useState(false)
  const [solid, setSolid] = useState(false)
  const bar = useRef(null)
  const [open, setOpen] = useState(false)
  const [active, setActive] = useState(null)
  const [today, setToday] = useState(null)
  useEffect(() => setToday(HOURS[(new Date().getDay() + 6) % 7]), [])

  // Se masque en descendant, réapparaît dès qu'on remonte.
  useEffect(() => {
    let last = window.scrollY
    const onScroll = () => {
      const y = window.scrollY
      setSolid(y > 30)
      // Barre de lecture : progression dans la page, sans re-rendu.
      const max = document.documentElement.scrollHeight - window.innerHeight
      bar.current?.style.setProperty('--p', max > 0 ? Math.min(1, y / max) : 0)
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
  }, [page.id])

  useEffect(() => {
    setScrollLocked(open)
    const onKey = (e) => e.key === 'Escape' && setOpen(false)
    window.addEventListener('keydown', onKey)
    return () => window.removeEventListener('keydown', onKey)
  }, [open])

  const close = () => setOpen(false)
  const pageSections = page.sections.map((id) => SECTIONS.find((s) => s.id === id))
  const activeIndex = pageSections.findIndex((s) => s.id === active)

  return (
    <>
      <header
        className={`nav ${solid ? 'nav--solid' : ''} ${hidden && !open ? 'nav--hidden' : ''} ${open ? 'nav--open' : ''}`}
      >
        <div className="nav__inner">
          <a className="brand" {...linkProps('accueil', null, close)} aria-label="Cabinet Delikan, accueil">
            <Logo />
          </a>

          {/* Les pages du site : dans la barre sur grand écran, en rangée défilante sous le logo ailleurs. */}
          <nav className="nav__links" aria-label="Pages du site">
            {PAGES.filter((p) => p.bar).map((p) => (
              <a
                key={p.id}
                {...linkProps(p.id, null, close)}
                className={page.id === p.id ? 'is-active' : ''}
                aria-current={page.id === p.id ? 'page' : undefined}
              >
                {p.bar}
              </a>
            ))}
          </nav>

          <div className="nav__actions">
            <a className="nav__phone" href={CABINET.phoneHref}>
              {CABINET.phone}
            </a>
            <a className="nav__book" href={CABINET.doctolib} target="_blank" rel="noreferrer">
              <span>Rendez-vous</span>
            </a>
            <button
              className="nav__menu"
              aria-label={open ? 'Fermer le menu' : 'Ouvrir le menu complet'}
              aria-expanded={open}
              onClick={() => setOpen((o) => !o)}
            >
              <span className="nav__menu-label">{open ? 'Fermer' : 'Menu'}</span>
              <span className="nav__menu-lines" aria-hidden>
                <span />
                <span />
              </span>
            </button>
          </div>
        </div>
        <span className="nav__progress" ref={bar} aria-hidden />
      </header>

      {/* Repère de section, sur le bord gauche (grand écran). */}
      <nav
        className={`rail ${activeIndex >= 0 && pageSections.length > 1 && !open ? 'rail--on' : ''}`}
        aria-label="Sections de la page"
      >
        {pageSections.map((s, i) => (
          <a
            key={s.id}
            href={`#/${page.id}/${s.id}`}
            onClick={(e) => {
              e.preventDefault()
              scrollToId(s.id)
            }}
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
            data-lenis-prevent
            role="dialog"
            aria-modal="true"
            aria-label="Sommaire du site"
            initial={{ clipPath: 'inset(0% 0% 100% 0%)' }}
            animate={{ clipPath: 'inset(0% 0% 0% 0%)' }}
            exit={{ clipPath: 'inset(0% 0% 100% 0%)' }}
            transition={{ duration: 0.8, ease }}
          >
            <div className="menu__grid">
              <nav className="menu__groups" aria-label="Sommaire">
                {PAGES.map((p, pi) => (
                  <m.div
                    key={p.id}
                    className={`menu__group ${page.id === p.id ? 'is-current' : ''}`}
                    initial={{ opacity: 0, y: 30 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0, transition: { duration: 0.2 } }}
                    transition={{ delay: 0.25 + pi * 0.06, duration: 0.9, ease: [0.16, 1, 0.3, 1] }}
                  >
                    <a className="menu__page" {...linkProps(p.id, null, close)} aria-current={page.id === p.id ? 'page' : undefined}>
                      <small>{pad(pi + 1)}</small>
                      <strong>{p.label}</strong>
                      <em>{p.desc}</em>
                    </a>
                    {p.sections.length > 1 && (
                      <ul className="menu__sections">
                        {p.sections.map((id) => {
                          const s = SECTIONS.find((x) => x.id === id)
                          return (
                            <li key={id}>
                              <a {...linkProps(p.id, id, close)}>{s.label}</a>
                            </li>
                          )
                        })}
                      </ul>
                    )}
                  </m.div>
                ))}
              </nav>

              <m.aside
                className="menu__aside"
                initial={{ opacity: 0, y: 30 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, transition: { duration: 0.2 } }}
                transition={{ delay: 0.55, duration: 0.9, ease: [0.16, 1, 0.3, 1] }}
              >
                <p className="menu__kicker">Prendre rendez-vous</p>
                <a className="menu__book" href={CABINET.doctolib} target="_blank" rel="noreferrer">
                  <Calendar />
                  <span>Réserver sur Doctolib</span>
                  <small>En ligne, à toute heure</small>
                </a>
                <a className="menu__line" href={CABINET.phoneHref}>
                  <Phone />
                  <span>
                    <strong>{CABINET.phone}</strong>
                    <small>Secrétariat</small>
                  </span>
                </a>
                <div className="menu__line">
                  <Clock />
                  <span>
                    <strong>{today ? today.time : '8h30 – 13h00'}</strong>
                    <small>Aujourd’hui · {today ? today.day : 'du lundi au vendredi'}</small>
                  </span>
                </div>
                <a className="menu__line" href={CABINET.maps} target="_blank" rel="noreferrer">
                  <Pin />
                  <span>
                    <strong>{CABINET.street}</strong>
                    <small>{CABINET.city} · Itinéraire</small>
                  </span>
                </a>
              </m.aside>
            </div>
          </m.div>
        )}
      </AnimatePresence>
    </>
  )
}

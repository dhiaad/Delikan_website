import { useEffect, useState } from 'react'
import { PAGES, pageOf } from './data'
import { scrollToId } from './smoothScroll'

// Routage par ancre (#/soins, #/contact/faq) : fonctionne sur n'importe quel hébergeur statique, sans configuration.
// Une ancre simple héritée (#faq) ouvre la page qui contient la section.
export function parseHash(hash = window.location.hash) {
  const raw = hash.replace(/^#\/?/, '')
  if (!raw) return { page: 'accueil', section: null }
  const [first, second] = raw.split('/')
  if (PAGES.some((p) => p.id === first)) return { page: first, section: second || null }
  return { page: pageOf(first).id, section: first }
}

export const hrefFor = (page, section) => (page === 'accueil' && !section ? '#/' : `#/${page}${section ? `/${section}` : ''}`)

export function navigate(page, section = null) {
  const href = hrefFor(page, section)
  // Même adresse : pas d'événement hashchange, on défile directement.
  if (window.location.hash === href || (href === '#/' && !window.location.hash)) {
    scrollToId(section || 'top')
    return
  }
  window.location.hash = href
}

export function useRoute() {
  const [route, setRoute] = useState(() => parseHash())
  useEffect(() => {
    const onChange = () => setRoute(parseHash())
    window.addEventListener('hashchange', onChange)
    return () => window.removeEventListener('hashchange', onChange)
  }, [])
  return route
}

// Lien interne : garde une vraie adresse (clic droit, nouvel onglet) et passe par navigate.
export function linkProps(page, section = null, after) {
  return {
    href: hrefFor(page, section),
    onClick: (e) => {
      if (e.metaKey || e.ctrlKey || e.shiftKey || e.button === 1) return
      e.preventDefault()
      after?.()
      navigate(page, section)
    },
  }
}

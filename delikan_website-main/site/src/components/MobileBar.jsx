import { useEffect, useState } from 'react'
import * as m from 'motion/react-m'
import { AnimatePresence } from 'motion/react'
import { CABINET } from '../data'
import { Calendar, Phone } from './Icons'

// Barre d'action fixe sur mobile, visible après le premier écran et masquée au pied de page.
export default function MobileBar() {
  const [show, setShow] = useState(false)

  useEffect(() => {
    const onScroll = () => {
      const footer = document.querySelector('.footer')
      const nearEnd = footer && footer.getBoundingClientRect().top < window.innerHeight * 0.6
      setShow(window.scrollY > window.innerHeight * 0.7 && !nearEnd)
    }
    onScroll()
    window.addEventListener('scroll', onScroll, { passive: true })
    return () => window.removeEventListener('scroll', onScroll)
  }, [])

  return (
    <AnimatePresence>
      {show && (
        <m.div
          className="mobilebar"
          initial={{ y: 120 }}
          animate={{ y: 0 }}
          exit={{ y: 120 }}
          transition={{ type: 'spring', stiffness: 260, damping: 30 }}
        >
          <a className="mobilebar__call" href={CABINET.phoneHref} aria-label={`Appeler le cabinet au ${CABINET.phone}`}>
            <Phone />
          </a>
          <a className="mobilebar__book" href={CABINET.doctolib} target="_blank" rel="noreferrer">
            <Calendar /> Prendre rendez-vous
          </a>
        </m.div>
      )}
    </AnimatePresence>
  )
}

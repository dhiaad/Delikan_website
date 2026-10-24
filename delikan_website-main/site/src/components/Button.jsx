import { useRef } from 'react'
import * as m from 'motion/react-m'
import { useMotionValue, useSpring } from 'motion/react'

const canMagnet = () =>
  window.matchMedia('(pointer: fine)').matches && !window.matchMedia('(prefers-reduced-motion: reduce)').matches

// Texte qui « roule » au survol : une copie remonte pendant que l'original sort par le haut.
export function Roll({ children }) {
  return (
    <span className="roll">
      <span className="roll__inner" data-text={children}>
        {children}
      </span>
    </span>
  )
}

// Bouton-lien avec attraction magnétique vers le curseur (souris uniquement).
export function Button({ href, variant = 'primary', size, icon, magnetic = false, external, className = '', children, ...rest }) {
  const ref = useRef(null)
  const x = useSpring(useMotionValue(0), { stiffness: 220, damping: 18, mass: 0.4 })
  const y = useSpring(useMotionValue(0), { stiffness: 220, damping: 18, mass: 0.4 })

  const onMove = (e) => {
    if (!magnetic || !canMagnet()) return
    const r = ref.current.getBoundingClientRect()
    x.set((e.clientX - (r.left + r.width / 2)) * 0.28)
    y.set((e.clientY - (r.top + r.height / 2)) * 0.38)
  }
  const reset = () => {
    x.set(0)
    y.set(0)
  }

  return (
    <m.a
      ref={ref}
      href={href}
      className={`btn btn--${variant} ${size ? `btn--${size}` : ''} ${className}`}
      style={{ x, y }}
      onPointerMove={onMove}
      onPointerLeave={reset}
      {...(external ? { target: '_blank', rel: 'noreferrer' } : {})}
      {...rest}
    >
      {icon && <span className="btn__icon">{icon}</span>}
      <Roll>{children}</Roll>
    </m.a>
  )
}

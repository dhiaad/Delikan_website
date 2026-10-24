import { useRef } from 'react'
import { gsap } from 'gsap'
import { useGSAP } from '@gsap/react'
import Picture from './Picture'
import { MQ } from '../smoothScroll'

// Photo dévoilée par un rideau, puis légère profondeur au scroll (grand écran uniquement).
export default function RevealImage({ name, alt, sizes, className = '', children }) {
  const ref = useRef(null)

  useGSAP(
    () => {
      const mm = gsap.matchMedia()
      mm.add(MQ.motion, () => {
        gsap
          .timeline({ scrollTrigger: { trigger: ref.current, start: 'top 85%', once: true } })
          .from(ref.current, { clipPath: 'inset(100% 0% 0% 0%)', duration: 1.4, ease: 'expo.inOut' })
          .from('.reveal-img__inner', { scale: 1.3, duration: 1.8, ease: 'expo.out' }, 0.15)
      })
      mm.add(`${MQ.motion} and ${MQ.desktop}`, () => {
        gsap.fromTo(
          '.reveal-img__depth',
          { yPercent: -6 },
          {
            yPercent: 6,
            ease: 'none',
            scrollTrigger: { trigger: ref.current, start: 'top bottom', end: 'bottom top', scrub: true },
          },
        )
      })
    },
    { scope: ref },
  )

  return (
    <div className={`reveal-img ${className}`} ref={ref}>
      <div className="reveal-img__depth">
        <div className="reveal-img__inner">
          <Picture name={name} alt={alt} sizes={sizes} />
        </div>
      </div>
      {children}
    </div>
  )
}

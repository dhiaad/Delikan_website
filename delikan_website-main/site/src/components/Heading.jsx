import { useRef } from 'react'
import { gsap } from 'gsap'
import { SplitText } from 'gsap/SplitText'
import { useGSAP } from '@gsap/react'
import { MQ } from '../smoothScroll'

// Titre révélé ligne par ligne derrière un masque, au premier passage dans l'écran.
export function Heading({ as: Tag = 'h2', className = 'h2', children }) {
  const ref = useRef(null)

  useGSAP(() => {
    const mm = gsap.matchMedia()
    mm.add(MQ.motion, () => {
      const split = SplitText.create(ref.current, {
        type: 'lines',
        mask: 'lines',
        linesClass: 'split-line',
        autoSplit: true,
        onSplit: (self) =>
          gsap.from(self.lines, {
            yPercent: 110,
            duration: 1.15,
            stagger: 0.09,
            ease: 'expo.out',
            scrollTrigger: { trigger: ref.current, start: 'top 88%', once: true },
          }),
      })
      return () => split.revert()
    })
  })

  return (
    <Tag ref={ref} className={className}>
      {children}
    </Tag>
  )
}

// Petit index de section : « 01 — Le cabinet ».
export function Label({ index, children, light = false }) {
  const ref = useRef(null)

  useGSAP(() => {
    const mm = gsap.matchMedia()
    mm.add(MQ.motion, () => {
      gsap.from(ref.current.children, {
        y: 14,
        opacity: 0,
        duration: 0.9,
        stagger: 0.08,
        ease: 'power3.out',
        scrollTrigger: { trigger: ref.current, start: 'top 90%', once: true },
      })
      gsap.from(ref.current.querySelector('.label__rule'), {
        scaleX: 0,
        duration: 1.1,
        ease: 'expo.out',
        scrollTrigger: { trigger: ref.current, start: 'top 90%', once: true },
      })
    })
  })

  return (
    <p ref={ref} className={`label ${light ? 'label--light' : ''}`}>
      <span className="label__index">{index}</span>
      <span className="label__rule" aria-hidden />
      <span>{children}</span>
    </p>
  )
}

// Paragraphe qui apparaît en fondu léger, synchronisé après le titre.
export function Fade({ as: Tag = 'div', delay = 0.15, className, children }) {
  const ref = useRef(null)

  useGSAP(() => {
    const mm = gsap.matchMedia()
    mm.add(MQ.motion, () => {
      gsap.from(ref.current, {
        y: 24,
        opacity: 0,
        duration: 1.1,
        delay,
        ease: 'power3.out',
        scrollTrigger: { trigger: ref.current, start: 'top 90%', once: true },
      })
    })
  })

  return (
    <Tag ref={ref} className={className}>
      {children}
    </Tag>
  )
}

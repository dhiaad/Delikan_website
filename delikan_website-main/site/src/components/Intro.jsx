import { useRef, useState } from 'react'
import { gsap } from 'gsap'
import { MorphSVGPlugin } from 'gsap/MorphSVGPlugin'
import { useGSAP } from '@gsap/react'
import { MarkShapes, LOGO_COLORS } from './Logo'
import { prefersReducedMotion } from '../smoothScroll'

gsap.registerPlugin(MorphSVGPlugin)

const KEY = 'delikan-intro-brossage-2'

// Scène du logo (unités SVG).
const CX = 800
const CY = 470
const K = 1.25 // taille du monogramme
// Dent du « i » (voir MarkShapes : translate(-63 -66) scale(1.35), dent de 16 × 21 unités).
const toothPoint = (lx, ly) => ({ x: CX + (-63 + lx * 1.35) * K, y: CY + (-66 + ly * 1.35) * K })
const TOOTH = toothPoint(8, 10.5) // centre de la dent
const TOOTH_GLINT = toothPoint(17, -1)

// Scène du sourire : photo fournie par le cabinet (public/media/sourire.webp, 1536 × 1024 px).
const SX = 800
const SY = 500
const IMG = { w: 1536, h: 1024 }
const S = 900 / IMG.w // échelle image → scène
const PHOTO = { x: SX - 450, y: SY + 40 - (IMG.h * S) / 2, w: 900, h: IMG.h * S }
const fromImg = (px, py) => ({ x: PHOTO.x + px * S, y: PHOTO.y + py * S })
const ANCHOR = fromImg(680, 440) // centre de l'incisive centrale gauche

// Contour de cette incisive dans la photo (pixels). La dent du logo prend exactement cette forme
// avant le fondu, pour que la photo vienne se caler dessus.
const INCISOR_PX = [
  ['M', 597, 430],
  ['C', 597, 380, 628, 345, 682, 345],
  ['C', 734, 345, 762, 372, 764, 420],
  ['L', 764, 505],
  ['C', 762, 530, 745, 540, 702, 540],
  ['L', 652, 539],
  ['C', 612, 537, 597, 522, 597, 494],
  ['Z'],
]
const M = 0.18 // unités du logo par pixel de photo : l'incisive a la taille de la dent du logo
// Même contour exprimé dans le repère propre de la dent du logo (centre 8 ; 10,5).
const toothLocal = (px, py) => {
  const k = M / (1.35 * K)
  return [(8 + (px - 680) * k).toFixed(3), (10.5 + (py - 440) * k).toFixed(3)]
}
const INCISOR_LOCAL = INCISOR_PX.map(([c, ...n]) => {
  const pts = []
  for (let i = 0; i < n.length; i += 2) pts.push(...toothLocal(n[i], n[i + 1]))
  return [c, ...pts].join(' ')
}).join(' ')
const GLINT = fromImg(1420, 170)

// Mousse du brossage, autour de la dent (décalages en unités de scène).
const FOAM = [
  [-15, -9, 2.4],
  [-17, 2, 1.6],
  [-12, 13, 2],
  [14, -12, 1.8],
  [17, -2, 2.6],
  [13, 11, 1.5],
  [-4, -19, 1.4],
  [5, 18, 2.1],
  [-20, -3, 1.1],
  [20, 7, 1.2],
]

const shouldPlay = () => {
  if (prefersReducedMotion()) return false
  try {
    return !sessionStorage.getItem(KEY)
  } catch {
    return true
  }
}

// Éclat à quatre branches.
const sparkle = (x, y, r) =>
  `M ${x} ${y - r} Q ${x + r * 0.16} ${y - r * 0.16} ${x + r} ${y} Q ${x + r * 0.16} ${y + r * 0.16} ${x} ${y + r} Q ${x - r * 0.16} ${y + r * 0.16} ${x - r} ${y} Q ${x - r * 0.16} ${y - r * 0.16} ${x} ${y - r} Z`

// Cadre de caméra : centre et largeur, la hauteur suit le ratio de l'écran.
const view = (cx, cy, w) => ({ cx, cy, w })
const toViewBox = (v, aspect) => {
  const h = v.w / aspect
  return `${v.cx - v.w / 2} ${v.cy - h / 2} ${v.w} ${h}`
}

// Mouvement de caméra fluide : la largeur varie en exponentielle (vitesse de zoom constante à l'œil)
// et le centre se déplace au même rythme, comme un vrai zoom vers un point.
function camera(svgEl, from, to, aspect) {
  const p = { u: 0 }
  const apply = () => {
    const w = from.w * Math.pow(to.w / from.w, p.u)
    const f = from.w === to.w ? p.u : (from.w - w) / (from.w - to.w)
    svgEl.setAttribute('viewBox', toViewBox(view(from.cx + (to.cx - from.cx) * f, from.cy + (to.cy - from.cy) * f, w), aspect))
  }
  return { p, apply }
}

// Brosse à dents (tête centrée sur l'origine, manche vers la droite).
function Toothbrush() {
  const tufts = []
  for (let i = 0; i < 8; i++) {
    for (let j = 0; j < 2; j++) {
      tufts.push(
        <circle
          key={`${i}-${j}`}
          cx={-11.5 + i * 3.3}
          cy={-1.9 + j * 3.8}
          r="1.25"
          fill={(i + j) % 2 ? '#ffffff' : '#8db3de'}
          stroke="#d7dfe8"
          strokeWidth="0.2"
        />,
      )
    }
  }
  return (
    <g>
      {/* Manche */}
      <path d="M 13 -2.2 Q 22 -3.4 40 -3.2 L 92 -3.6 Q 97 -3.6 97 0 Q 97 3.6 92 3.6 L 40 3.2 Q 22 3.4 13 2.2 Z" fill="#f6f1e8" stroke="#d8ccb7" strokeWidth="0.35" />
      <rect x="52" y="-3.7" width="30" height="7.4" rx="3.7" fill="#356aa6" />
      <rect x="54" y="-2.6" width="26" height="1.3" rx="0.65" fill="#ffffff" opacity="0.35" />
      {/* Tête */}
      <rect x="-15" y="-5" width="30" height="10" rx="5" fill="#f6f1e8" stroke="#d8ccb7" strokeWidth="0.35" />
      {tufts}
    </g>
  )
}

// Entrée en scène : le logo se dessine, on s'approche de la dent du « i », une brosse la fait passer
// de l'or au blanc, on plonge dans la dent blanche, et on en ressort sur un sourire dont elle est l'incisive.
// Jouée une fois par session, jamais avec « réduire les animations », sans bloquer le scroll.
export default function Intro({ onReveal }) {
  const root = useRef(null)
  const logoSvg = useRef(null)
  const smileSvg = useRef(null)
  const tl = useRef(null)
  const [play] = useState(shouldPlay)
  const [done, setDone] = useState(!play)
  const [aspect] = useState(() => (typeof window === 'undefined' ? 1.6 : window.innerWidth / window.innerHeight))
  const portrait = aspect < 0.9

  // Cadres de caméra.
  const logoView = view(CX, CY + 40, Math.max(1000, 780 * aspect))
  const brushView = view(TOOTH.x, TOOTH.y, portrait ? 70 : Math.max(120, 70 * aspect))
  // Cadre du sourire où son incisive occupe à l'écran la même place que la dent du logo.
  const matchView = view(ANCHOR.x, ANCHOR.y, (brushView.w * S) / M)
  const smileView = view(SX, SY + 40, portrait ? 960 : Math.max(1200, 760 * aspect))

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

      const approach = camera(logoSvg.current, logoView, brushView, aspect)
      const reveal = camera(smileSvg.current, matchView, smileView, aspect)

      gsap.set('.intro .mark__oval', { strokeDasharray: 1, strokeDashoffset: 1 })
      gsap.set('.intro .mark__tooth', { attr: { stroke: LOGO_COLORS.gold, 'stroke-width': 0.14, filter: 'url(#tooth-shadow)' } })
      gsap.set('.brush', { x: 150, y: 60, rotation: -35, opacity: 0, svgOrigin: `${TOOTH.x} ${TOOTH.y}` })
      gsap.set('.foam circle, .tooth-glint', { scale: 0, transformOrigin: '50% 50%' })
      gsap.set(smileSvg.current, { opacity: 0 })

      tl.current = gsap
        .timeline({ paused: true, onComplete: () => setDone(true) })
        // 1. Le logo se dessine.
        .to('.intro .mark__oval', { strokeDashoffset: 0, duration: 1, stagger: 0.12, ease: 'power2.inOut' })
        .from('.intro .mark__letters text', { opacity: 0, y: 24, duration: 0.8, ease: 'power3.out' }, 0.25)
        .from('.intro .mark__tooth', { opacity: 0, y: -40, duration: 0.7, ease: 'back.out(2.2)' }, 0.6)
        .from('.intro__words > *', { opacity: 0, y: 18, duration: 0.7, stagger: 0.1, ease: 'power3.out' }, 0.5)
        // 2. Le logo s'efface, la caméra s'approche de la dent dorée.
        .to('.intro .mark__oval, .intro .mark__letters text, .intro__words', { opacity: 0, duration: 0.6, ease: 'power2.out' }, 1.35)
        .to(approach.p, { u: 1, duration: 1.1, ease: 'power3.inOut', onUpdate: approach.apply }, 1.4)
        // 3. Brossage : la brosse arrive, frotte, la mousse apparaît, la dent devient blanche.
        .to('.brush', { x: -5, y: 1, rotation: -18, opacity: 1, duration: 0.6, ease: 'power3.out' }, 2.35)
        .to('.brush', { x: 7, y: -2, duration: 0.17, ease: 'sine.inOut', yoyo: true, repeat: 7 }, 2.95) // va-et-vient
        .to('.foam circle', { scale: 1, duration: 0.35, stagger: 0.07, ease: 'back.out(2)' }, 3.05)
        .to('.intro .mark__tooth', { fill: '#ffffff', duration: 1.2, ease: 'power1.inOut' }, 3.0)
        .to('.brush', { x: 160, y: 50, rotation: -30, duration: 0.5, ease: 'power2.in' }, 4.3)
        .to('.foam circle', { scale: 0, opacity: 0, duration: 0.4, stagger: 0.03, ease: 'power2.in' }, 4.35)
        .to('.tooth-glint', { scale: 1, rotation: 90, duration: 0.5, ease: 'back.out(3)' }, 4.55)
        .to('.tooth-glint', { scale: 0, duration: 0.3, ease: 'power2.in' }, 5.05)
        // 4. La dent blanche prend la forme exacte de l'incisive, puis le sourire apparaît autour d'elle.
        .to('.intro .mark__tooth', { morphSVG: INCISOR_LOCAL, duration: 0.7, ease: 'power2.inOut' }, 5.0)
        .to('.intro .mark__tooth', { attr: { 'stroke-width': 0 }, duration: 0.5 }, 5.1)
        .set('.intro .mark__tooth', { attr: { filter: 'none' } }, 5.6)
        .call(reveal.apply, null, 5.7)
        .to(smileSvg.current, { opacity: 1, duration: 0.7, ease: 'power1.inOut' }, 5.7)
        .set(logoSvg.current, { opacity: 0 }, 6.4)
        // 5. On recule : la dent est l'incisive d'un sourire.
        .to(reveal.p, { u: 1, duration: 1.6, ease: 'expo.inOut', onUpdate: reveal.apply }, 6.2)
        .from(
          '.smile__glint',
          { opacity: 0, scale: 0, rotation: -45, svgOrigin: `${GLINT.x} ${GLINT.y}`, duration: 0.7, ease: 'back.out(3)' },
          7.5,
        )
        // 6. On entre sur le site.
        .to(smileSvg.current, { opacity: 0, scale: 0.97, duration: 0.6, ease: 'power2.in' }, 8.2)
        .call(onReveal, null, 8.4)
        .to(root.current, { opacity: 0, duration: 0.6, ease: 'power1.out' }, 8.55)

      // Démarre une fois la police du logo chargée (au plus 0,7 s d'attente).
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
      {/* Scène 1 : le logo, puis le brossage de la dent du « i ». */}
      <svg ref={logoSvg} className="intro__scene" viewBox={toViewBox(logoView, aspect)} preserveAspectRatio="xMidYMid slice">
        <defs>
          <filter id="tooth-shadow" x="-30%" y="-30%" width="160%" height="160%">
            <feDropShadow dx="0" dy="0.6" stdDeviation="0.9" floodColor="#8a7458" floodOpacity="0.28" />
          </filter>
        </defs>
        <g transform={`translate(${CX} ${CY}) scale(${K})`}>
          <MarkShapes />
        </g>
        <g
          className="intro__words"
          textAnchor="middle"
          fontFamily="'Bodoni Moda', Didot, Georgia, serif"
          style={{ fontVariationSettings: "'opsz' 18" }}
        >
          <text x={CX + 7} y={CY + 230} fontSize="26" letterSpacing="14" fill={LOGO_COLORS.grey}>
            CABINET
          </text>
          <text x={CX + 9} y={CY + 300} fontSize="64" letterSpacing="18" fill={LOGO_COLORS.ink}>
            DELIKAN
          </text>
        </g>

        <g className="foam">
          {FOAM.map(([dx, dy, r], i) => (
            <circle
              key={i}
              cx={TOOTH.x + dx}
              cy={TOOTH.y + dy}
              r={r}
              fill="#ffffff"
              stroke="#dfe7f0"
              strokeWidth="0.25"
            />
          ))}
        </g>

        <g className="brush">
          <g transform={`translate(${TOOTH.x} ${TOOTH.y})`}>
            <Toothbrush />
          </g>
        </g>

        <path className="tooth-glint" d={sparkle(TOOTH_GLINT.x, TOOTH_GLINT.y, 3.2)} fill={LOGO_COLORS.gold} />
      </svg>

      {/* Scène 2 : le sourire, sur lequel on ressort de la dent. */}
      <svg ref={smileSvg} className="intro__scene" viewBox={toViewBox(smileView, aspect)} preserveAspectRatio="xMidYMid slice">
        <defs>
          {/* Bords de la photo adoucis pour qu'aucun cadre ne se devine. */}
          <filter id="soft-edge" x="-10%" y="-10%" width="120%" height="120%">
            <feGaussianBlur stdDeviation="10" />
          </filter>
          <mask id="photo-edge">
            <rect x={PHOTO.x + 14} y={PHOTO.y + 14} width={PHOTO.w - 28} height={PHOTO.h - 28} fill="#fff" filter="url(#soft-edge)" />
          </mask>
        </defs>
        <g className="smile">
          <image
            href="/media/sourire.webp"
            x={PHOTO.x}
            y={PHOTO.y}
            width={PHOTO.w}
            height={PHOTO.h}
            preserveAspectRatio="xMidYMid meet"
            mask="url(#photo-edge)"
          />
          <path className="smile__glint" d={sparkle(GLINT.x, GLINT.y, 22)} fill={LOGO_COLORS.gold} />
        </g>
      </svg>
    </div>
  )
}

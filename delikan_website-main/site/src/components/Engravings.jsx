import { useRef } from 'react'
import { gsap } from 'gsap'
import { DrawSVGPlugin } from 'gsap/DrawSVGPlugin'
import { useGSAP } from '@gsap/react'
import { MQ } from '../smoothScroll'

gsap.registerPlugin(DrawSVGPlugin)

// Planches façon gravure d'anatomie ancienne, posées en fond de section (elles ne prennent pas de place).
// Elles se dessinent trait par trait à l'arrivée, puis bougent avec le défilement :
// légère dérive en profondeur pour toutes, et un mouvement propre à chaque planche (`motion`).
function Plate({ viewBox, className = '', label, motion, children }) {
  const ref = useRef(null)

  useGSAP(
    () => {
      const mm = gsap.matchMedia()
      mm.add(MQ.motion, () => {
        const svg = ref.current
        const section = svg.closest('section, footer, .menu') ?? svg.parentElement
        gsap
          .timeline({ scrollTrigger: { trigger: section, start: 'top 80%', once: true } })
          .from(svg.querySelectorAll('.e-line'), { drawSVG: 0, duration: 2.4, stagger: 0.03, ease: 'power2.inOut' })
          .from(svg.querySelectorAll('.e-note'), { opacity: 0, duration: 0.8, stagger: 0.06 }, '-=1.2')
        // Dérive lente : la planche monte un peu moins vite que la page.
        gsap.fromTo(
          svg,
          { yPercent: 12 },
          {
            yPercent: -12,
            ease: 'none',
            scrollTrigger: { trigger: section, start: 'top bottom', end: 'bottom top', scrub: true },
          },
        )
        motion?.(svg, { trigger: section, start: 'top 75%', end: 'bottom 40%', scrub: 0.8 })
      })
    },
    { scope: ref },
  )

  const svg = (
    <svg ref={ref} viewBox={viewBox} className="engraving" role="img" aria-label={label}>
      {children}
    </svg>
  )
  // En fond de section : un calque pleine hauteur, la planche y reste collée pendant le défilement.
  return className.includes('bg-plate') ? (
    <div className={`bg-track ${className}`} aria-hidden>
      {svg}
    </div>
  ) : (
    <div className={className}>{svg}</div>
  )
}

// Hachures parallèles (ombrage de gravure), découpées par un clipPath.
function Hatch({ id, x, y, w, h, gap = 7 }) {
  const lines = []
  const n = Math.ceil((w + h) / gap)
  for (let i = 0; i < n; i++) {
    const d = i * gap
    lines.push(<line key={i} x1={x + d} y1={y} x2={x + d - h} y2={y + h} />)
  }
  return (
    <g clipPath={`url(#${id})`} className="e-hatch">
      {lines}
    </g>
  )
}

/* ---------- Planche I : mandibule — elle s'ouvre autour du condyle au défilement ---------- */
const JAW =
  'M95 305 C 200 334, 380 324, 465 297 C 497 286, 507 240, 499 182 C 495 152, 505 122, 513 102 C 519 84, 501 70, 488 80 C 477 90, 482 110, 475 126 C 465 146, 450 151, 440 141 C 430 129, 428 101, 420 78 C 413 94, 408 142, 398 190 L 130 204 C 105 207, 85 226, 82 256 C 80 281, 85 300, 95 305 Z'
const LOWER_TEETH = [
  [132, 22, 30],
  [156, 22, 34],
  [180, 24, 36],
  [206, 26, 32],
  [234, 28, 30],
  [264, 36, 28],
  [303, 40, 27],
  [346, 42, 26],
]
// Arcade supérieure (fixe) : la mâchoire du bas s'en écarte puis s'y referme.
const UPPER_TEETH = LOWER_TEETH.map(([x, w, h]) => [x, w, h * 0.9])

const toothPath = (x, w, h, base, dir) =>
  `M${x} ${base} C ${x} ${base - dir * h * 0.7}, ${x + 2} ${base - dir * h}, ${x + w * 0.3} ${base - dir * h} C ${x + w * 0.45} ${base - dir * (h - 4)}, ${x + w * 0.55} ${base - dir * (h - 4)}, ${x + w * 0.7} ${base - dir * h} C ${x + w - 2} ${base - dir * h}, ${x + w} ${base - dir * h * 0.7}, ${x + w} ${base}`

export function Mandible({ className }) {
  const motion = (svg, st) => {
    gsap
      .timeline({ scrollTrigger: { ...st, start: 'top top', end: 'bottom top' } })
      .to(svg.querySelector('.jaw'), { rotation: 9, svgOrigin: '505 100', ease: 'sine.inOut', duration: 1 })
      .to(svg.querySelector('.jaw'), { rotation: 0, svgOrigin: '505 100', ease: 'sine.inOut', duration: 1 })
  }
  return (
    <Plate viewBox="40 30 560 340" className={className} label="Gravure d'une mâchoire, vue latérale" motion={motion}>
      <defs>
        <clipPath id="jaw-clip">
          <path d={JAW} />
        </clipPath>
      </defs>
      {/* Maxillaire supérieur, fixe */}
      <path className="e-line e-thin" d="M110 160 C 180 140, 320 136, 410 146 C 440 150, 470 140, 488 120" />
      {UPPER_TEETH.map(([x, w, h], i) => (
        <path key={i} className="e-line e-thin" d={toothPath(x, w, h, 162, -1)} />
      ))}
      {/* Mandibule, articulée au condyle */}
      <g className="jaw">
        <path className="e-line e-strong" d={JAW} />
        {LOWER_TEETH.map(([x, w, h], i) => (
          <path key={i} className="e-line" d={toothPath(x, w, h, 204, 1)} />
        ))}
        <path className="e-line e-dash" d="M150 262 C 230 270, 330 262, 420 236 C 445 228, 460 210, 462 185" />
        <ellipse className="e-line" cx="150" cy="262" rx="7" ry="5" />
        <Hatch id="jaw-clip" x={80} y={250} w={430} h={80} gap={8} />
        <path className="e-line e-thin" d="M110 290 C 220 312, 360 304, 455 280" />
      </g>
      <g className="e-note">
        <line className="e-leader" x1="512" y1="96" x2="560" y2="70" />
        <text x="563" y="68">Condyle</text>
      </g>
      <text className="e-note e-caption" x="320" y="366">
        Pl. I — Mandibula
      </text>
    </Plate>
  )
}

/* ---------- Planche II : coupe d'une molaire — elle pivote et la pulpe s'éclaire ---------- */
export function ToothSection({ className }) {
  const motion = (svg, st) => {
    gsap.fromTo(svg.querySelector('.tooth'), { rotation: -8 }, { rotation: 8, svgOrigin: '180 260', ease: 'none', scrollTrigger: st })
    gsap.fromTo(svg.querySelectorAll('.e-pulp'), { drawSVG: '0% 0%' }, { drawSVG: '0% 100%', ease: 'none', scrollTrigger: st })
  }
  return (
    <Plate viewBox="0 0 360 520" className={className} label="Gravure d'une coupe de molaire" motion={motion}>
      <defs>
        <clipPath id="bone-clip">
          <path d="M20 250 L340 250 L340 470 L20 470 Z" />
        </clipPath>
      </defs>
      <Hatch id="bone-clip" x={20} y={250} w={320} h={220} gap={9} />
      <path className="e-line e-thin" d="M20 250 C 80 240, 110 246, 120 262 M240 262 C 250 246, 280 240, 340 250" />
      <g className="tooth">
        <path
          className="e-line e-strong"
          d="M110 196 C 100 150, 96 110, 104 80 C 112 50, 140 40, 160 52 C 170 58, 190 58, 200 52 C 220 40, 248 50, 256 80 C 264 110, 260 150, 250 196 C 246 260, 252 330, 244 400 C 240 432, 222 446, 214 420 C 206 390, 200 330, 186 300 C 182 292, 178 292, 174 300 C 160 330, 154 390, 146 420 C 138 446, 120 432, 116 400 C 108 330, 114 260, 110 196 Z"
        />
        <path className="e-line" d="M118 190 C 110 150, 110 112, 118 90 C 126 70, 146 66, 162 74 C 172 79, 188 79, 198 74 C 214 66, 234 70, 242 90 C 250 112, 250 150, 242 190" />
        <path
          className="e-pulp"
          d="M150 150 C 150 128, 160 120, 168 128 C 174 133, 186 133, 192 128 C 200 120, 210 128, 210 150 C 210 175, 204 190, 200 210 C 198 260, 216 340, 222 410"
        />
        <path className="e-pulp" d="M150 150 C 150 175, 156 190, 160 210 C 162 260, 144 340, 138 410" />
      </g>
      <text className="e-note" x="268" y="70">Émail</text>
      <text className="e-note" x="276" y="150">Dentine</text>
      <text className="e-note" x="262" y="300">Racine</text>
      <text className="e-note e-caption" x="180" y="512" textAnchor="middle">
        Pl. II — Dens molaris
      </text>
    </Plate>
  )
}

/* ---------- Planche III : implant — il se visse dans l'os, puis reçoit sa couronne ---------- */
export function Implant({ className }) {
  const threads = []
  for (let i = 0; i < 9; i++) {
    const y = 250 + i * 22
    const w = 46 - i * 1.6
    threads.push(<path key={i} className="e-line" d={`M${180 - w} ${y} L${180 + w} ${y + 10}`} />)
  }
  const motion = (svg, st) => {
    gsap
      .timeline({ scrollTrigger: st })
      .fromTo(svg.querySelector('.implant__screw'), { y: -150 }, { y: 0, ease: 'none', duration: 1 })
      // Le filetage défile : l'implant « tourne » en descendant.
      .fromTo(svg.querySelector('.implant__threads'), { y: -22 * 6 }, { y: 0, ease: 'none', duration: 1 }, 0)
      .fromTo(svg.querySelector('.implant__crown'), { y: -120, opacity: 0 }, { y: 0, opacity: 1, ease: 'power2.out', duration: 0.6 }, 0.9)
  }
  return (
    <Plate viewBox="40 0 280 520" className={className} label="Gravure d'un implant dentaire avec sa couronne" motion={motion}>
      <defs>
        <clipPath id="implant-clip">
          <path d="M134 240 L226 240 L218 430 C 214 452, 146 452, 142 430 Z" />
        </clipPath>
      </defs>
      <g className="implant__crown">
        <path
          className="e-line e-strong"
          d="M120 190 C 108 150, 108 100, 122 76 C 134 56, 160 54, 172 64 C 176 67, 184 67, 188 64 C 200 54, 226 56, 238 76 C 252 100, 252 150, 240 190 Z"
        />
        <path className="e-line e-thin" d="M134 100 C 140 84, 152 78, 162 82" />
      </g>
      <g className="implant__screw">
        <path className="e-line" d="M150 190 L152 236 L208 236 L210 190" />
        <path className="e-line e-strong" d="M134 240 L226 240 L218 430 C 214 452, 146 452, 142 430 Z" />
        <g clipPath="url(#implant-clip)">
          <g className="implant__threads">
            {threads}
            {threads.map((t, i) => (
              <path key={`b${i}`} className="e-line" d={`M${134} ${250 - (i + 1) * 22} L${226} ${260 - (i + 1) * 22}`} />
            ))}
          </g>
        </g>
      </g>
      {/* Gencive et os, fixes */}
      <path className="e-line e-thin" d="M50 214 C 100 206, 118 210, 126 222 M234 222 C 242 210, 260 206, 310 214" />
      <defs>
        <clipPath id="bone2-clip">
          <path d="M50 262 L120 262 L120 480 L50 480 Z M240 262 L310 262 L310 480 L240 480 Z" />
        </clipPath>
      </defs>
      <Hatch id="bone2-clip" x={50} y={262} w={260} h={218} gap={9} />
      <text className="e-note e-caption" x="180" y="506" textAnchor="middle">
        Pl. III — Implantatio
      </text>
    </Plate>
  )
}

/* ---------- Planche IV : traité ancien — ses pages se tournent au défilement ---------- */
const LEAF = 'M260 120 C 320 92, 400 86, 480 110 L480 300 C 400 278, 320 282, 260 306 Z'
const LEAF_LINES = [150, 166, 182, 198, 214, 230, 246, 262]

function Leaf({ i, figure }) {
  return (
    <g className="book__leaf" data-i={i}>
      <path className="e-line e-strong book__paper" d={LEAF} />
      {figure ?? (
        <>
          <text className="e-note e-book-sub" x="370" y="140" textAnchor="middle">
            {['Chap. I — De l’émail', 'Chap. II — Des racines', 'Chap. III — De l’implant'][i]}
          </text>
          {LEAF_LINES.map((y, k) => (
            <path key={y} className="e-line e-thin" d={`M${290 + (k % 2) * 6} ${y} C 340 ${y - 6}, 400 ${y - 4}, ${452 - (k % 3) * 10} ${y + 4}`} />
          ))}
        </>
      )}
    </g>
  )
}

export function Treatise({ className }) {
  const motion = (svg, st) => {
    const leaves = [...svg.querySelectorAll('.book__leaf')].sort((a, b) => a.dataset.i - b.dataset.i)
    const tl = gsap.timeline({ scrollTrigger: st })
    leaves.forEach((leaf, i) => {
      // Une page tourne autour de la reliure : elle se rétrécit, bascule, puis s'étale à gauche.
      tl.to(leaf, { scaleX: 0, skewY: -6, svgOrigin: '260 210', ease: 'power1.in', duration: 0.5 }, i * 0.8).to(
        leaf,
        { scaleX: -1, skewY: 0, svgOrigin: '260 210', ease: 'power1.out', duration: 0.5 },
        i * 0.8 + 0.5,
      )
    })
  }
  return (
    <Plate viewBox="0 40 520 320" className={className} label="Gravure d'un traité ancien d'art dentaire" motion={motion}>
      {/* Couverture et page de gauche */}
      <path className="e-line e-strong" d="M40 110 C 120 86, 200 92, 260 120 L260 306 C 200 282, 120 278, 40 300 Z" />
      <text className="e-note e-book-title" x="150" y="150" textAnchor="middle">
        TRAITÉ
      </text>
      <text className="e-note e-book-sub" x="150" y="170" textAnchor="middle">
        de l’Art du Dentiste
      </text>
      <path className="e-line" d="M110 200 L190 200 M126 210 L174 210" />
      {/* Page de droite fixe, sous la pile : une dent en planche */}
      <path className="e-line e-strong" d={LEAF} />
      <path
        className="e-line"
        d="M340 220 C 334 196, 332 170, 338 156 C 344 142, 358 138, 366 146 C 370 150, 380 150, 384 146 C 392 138, 406 142, 412 156 C 418 170, 416 196, 410 220 C 408 244, 412 266, 404 278 C 398 286, 392 270, 388 256 C 384 244, 382 242, 375 242 C 368 242, 366 244, 362 256 C 358 270, 352 286, 346 278 C 338 266, 342 244, 340 220 Z"
      />
      {/* Pages qui tournent (la dernière du tableau est au-dessus) */}
      {[2, 1, 0].map((i) => (
        <Leaf key={i} i={i} />
      ))}
      <path className="e-line" d="M260 120 L260 306" />
      <text className="e-note e-caption" x="260" y="345" textAnchor="middle">
        Pl. IV — De arte dentaria
      </text>
    </Plate>
  )
}

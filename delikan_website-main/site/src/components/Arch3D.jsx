import { useEffect, useId, useRef } from 'react'
import { prefersReducedMotion } from '../smoothScroll'

// Mâchoire complète en 3D (CSS + SVG, sans bibliothèque) : 28 dents dessinées au trait d'après les dimensions
// moyennes d'une denture adulte, posées sur deux arcades en ellipse ; la canine supérieure droite est en or.
// Elle tourne seule autour de son centre ; on peut la faire tourner à la souris, au doigt ou au clavier.

const S = 3.6 // pixels par millimètre

// Dimensions moyennes en mm, de l'incisive centrale à la deuxième molaire :
// cw largeur de couronne, ch hauteur de couronne, nw largeur au collet, rl longueur de racine.
const UPPER = [
  { type: 'incisive', cw: 8.6, ch: 10.5, nw: 6.4, rl: 13 },
  { type: 'incisive', cw: 6.6, ch: 9, nw: 4.8, rl: 13 },
  { type: 'canine', cw: 7.6, ch: 10, nw: 5.5, rl: 17 },
  { type: 'premolaire', cw: 7, ch: 8.5, nw: 5, rl: 14 },
  { type: 'premolaire', cw: 6.8, ch: 8, nw: 5, rl: 14 },
  { type: 'molaire', cw: 10.2, ch: 7.5, nw: 8, rl: 12 },
  { type: 'molaire', cw: 9, ch: 7, nw: 7.5, rl: 11 },
]
const LOWER = [
  { type: 'incisive', cw: 5.4, ch: 9, nw: 3.6, rl: 12.5 },
  { type: 'incisive', cw: 5.9, ch: 9.5, nw: 3.9, rl: 14 },
  { type: 'canine', cw: 7, ch: 11, nw: 5.4, rl: 16 },
  { type: 'premolaire', cw: 7, ch: 8.5, nw: 4.8, rl: 14 },
  { type: 'premolaire', cw: 7.2, ch: 8, nw: 5, rl: 14.5 },
  { type: 'molaire', cw: 11.2, ch: 7.5, nw: 9, rl: 14 },
  { type: 'molaire', cw: 10.5, ch: 7, nw: 8.5, rl: 13 },
]

const f = (n) => n.toFixed(2)

// Profil vu de face, collet en y = 0, couronne vers le bas (y > 0), racine vers le haut (y < 0).
function toothPath({ type, cw, ch, nw, rl }) {
  const h = cw / 2
  const n = nw / 2
  // Bord libre selon le type de dent.
  let edge
  if (type === 'incisive') {
    edge = `L${f(-h * 0.9)} ${f(ch - 0.6)} Q${f(-h * 0.85)} ${f(ch)} ${f(-h * 0.6)} ${f(ch)} Q0 ${f(ch + 0.35)} ${f(h * 0.6)} ${f(ch)} Q${f(h * 0.85)} ${f(ch)} ${f(h * 0.9)} ${f(ch - 0.6)}`
  } else if (type === 'canine') {
    edge = `L${f(-h * 0.92)} ${f(ch * 0.74)} Q${f(-h * 0.6)} ${f(ch * 0.86)} 0 ${f(ch + 0.6)} Q${f(h * 0.6)} ${f(ch * 0.86)} ${f(h * 0.92)} ${f(ch * 0.74)}`
  } else if (type === 'premolaire') {
    edge = `L${f(-h * 0.92)} ${f(ch * 0.82)} Q${f(-h * 0.5)} ${f(ch * 0.95)} 0 ${f(ch + 0.3)} Q${f(h * 0.5)} ${f(ch * 0.95)} ${f(h * 0.92)} ${f(ch * 0.82)}`
  } else {
    edge = `L${f(-h * 0.95)} ${f(ch * 0.8)} Q${f(-h * 0.8)} ${f(ch + 0.2)} ${f(-h * 0.45)} ${f(ch + 0.15)} Q${f(-h * 0.15)} ${f(ch + 0.1)} 0 ${f(ch - 0.5)} Q${f(h * 0.15)} ${f(ch + 0.1)} ${f(h * 0.45)} ${f(ch + 0.15)} Q${f(h * 0.8)} ${f(ch + 0.2)} ${f(h * 0.95)} ${f(ch * 0.8)}`
  }
  // Couronne : du collet gauche, galbe jusqu'au bord libre, puis remontée symétrique.
  const crown = `M${f(-n)} 0 C${f(-n - (h - n) * 0.9)} ${f(ch * 0.15)} ${f(-h)} ${f(ch * 0.35)} ${f(-h)} ${f(ch * 0.55)} ${edge} C${f(h)} ${f(ch * 0.35)} ${f(n + (h - n) * 0.9)} ${f(ch * 0.15)} ${f(n)} 0`
  // Racine : une seule, effilée ; deux pour les molaires, avec la furcation.
  const root =
    type === 'molaire'
      ? `C${f(n * 1.02)} ${f(-rl * 0.4)} ${f(n * 0.75)} ${f(-rl * 0.85)} ${f(n * 0.5)} ${f(-rl)} Q${f(n * 0.2)} ${f(-rl * 0.95)} ${f(n * 0.15)} ${f(-rl * 0.6)} Q0 ${f(-rl * 0.3)} ${f(-n * 0.15)} ${f(-rl * 0.6)} Q${f(-n * 0.2)} ${f(-rl * 0.95)} ${f(-n * 0.5)} ${f(-rl)} C${f(-n * 0.75)} ${f(-rl * 0.85)} ${f(-n * 1.02)} ${f(-rl * 0.4)} ${f(-n)} 0`
      : `C${f(n * 0.95)} ${f(-rl * 0.45)} ${f(n * 0.4)} ${f(-rl * 0.9)} 0 ${f(-rl)} C${f(-n * 0.4)} ${f(-rl * 0.9)} ${f(-n * 0.95)} ${f(-rl * 0.45)} ${f(-n)} 0`
  return {
    outline: `${crown} ${root}Z`,
    // Collet (jonction émail-cément), légèrement arqué.
    collet: `M${f(-n)} 0 Q0 ${f(-ch * 0.12)} ${f(n)} 0`,
    // Lobes de la face visible : deux légères dépressions verticales.
    lobes: `M${f(-h * 0.33)} ${f(ch * 0.25)} Q${f(-h * 0.38)} ${f(ch * 0.6)} ${f(-h * 0.3)} ${f(ch * 0.85)} M${f(h * 0.33)} ${f(ch * 0.25)} Q${f(h * 0.38)} ${f(ch * 0.6)} ${f(h * 0.3)} ${f(ch * 0.85)}`,
  }
}

// Point d'une ellipse paramétrée par la longueur d'arc, avec la normale extérieure.
function arcPlacer(a, b) {
  const pts = [{ t: 0, s: 0 }]
  const step = 0.002
  for (let t = step; t < Math.PI; t += step) {
    const dx = a * (Math.sin(t) - Math.sin(t - step))
    const dz = b * (Math.cos(t) - Math.cos(t - step))
    pts.push({ t, s: pts[pts.length - 1].s + Math.hypot(dx, dz) })
  }
  return (s) => {
    const p = pts.find((q) => q.s >= Math.abs(s)) || pts[pts.length - 1]
    const t = Math.sign(s) * p.t
    const x = a * Math.sin(t)
    const z = b * Math.cos(t)
    const yaw = (Math.atan2(Math.sin(t) / a, Math.cos(t) / b) * 180) / Math.PI
    return { x, z, yaw }
  }
}

function buildArch(teeth, a, b, zShift, jaw) {
  const place = arcPlacer(a, b)
  const out = []
  ;[-1, 1].forEach((side) => {
    let s = 0
    teeth.forEach((t, i) => {
      const center = s + t.cw / 2
      s += t.cw
      const { x, z, yaw } = place(side * center)
      out.push({ ...t, ...toothPath(t), x, z: z + zShift, yaw, jaw, side, index: i })
    })
  })
  return out
}

const TEETH = [...buildArch(UPPER, 27, 40, 0, 'upper'), ...buildArch(LOWER, 24.5, 36, -1.8, 'lower')]
// Centre de rotation : le centre de la mâchoire, pour une rotation bien équilibrée.
const CZ = TEETH.reduce((sum, t) => sum + t.z, 0) / TEETH.length
const isGold = (t) => t.jaw === 'upper' && t.side === 1 && t.index === 2

export default function Arch3D({ className = '' }) {
  const gid = `jaw-${useId().replace(/:/g, '')}`
  const spin = useRef(null)
  const els = useRef([])
  const state = useRef({ angle: -25, velocity: 0, dragging: false, lastX: 0, lastT: 0, idleAt: 0 })

  useEffect(() => {
    const reduce = prefersReducedMotion()
    let raf
    let prev = performance.now()
    const frame = (now) => {
      const st = state.current
      const dt = Math.min(64, now - prev) / 1000
      prev = now
      if (!st.dragging) {
        st.angle += st.velocity * dt
        st.velocity *= Math.pow(0.05, dt)
        if (!reduce && Math.abs(st.velocity) < 6 && now > st.idleAt) st.angle += 12 * dt
      }
      spin.current.style.transform = `rotateX(-14deg) rotateY(${st.angle}deg)`
      // Profondeur : les dents vues de dos s'estompent progressivement.
      els.current.forEach((el, i) => {
        const facing = Math.cos(((TEETH[i].yaw + st.angle) * Math.PI) / 180)
        el.style.opacity = (0.22 + 0.78 * ((facing + 1) / 2) ** 1.6).toFixed(3)
      })
      raf = requestAnimationFrame(frame)
    }
    raf = requestAnimationFrame(frame)
    return () => cancelAnimationFrame(raf)
  }, [])

  const onDown = (e) => {
    const st = state.current
    st.dragging = true
    st.lastX = e.clientX
    st.lastT = performance.now()
    st.velocity = 0
    e.currentTarget.setPointerCapture(e.pointerId)
  }
  const onMove = (e) => {
    const st = state.current
    if (!st.dragging) return
    const now = performance.now()
    const d = (e.clientX - st.lastX) * 0.45
    st.angle += d
    st.velocity = d / Math.max(0.008, (now - st.lastT) / 1000)
    st.lastX = e.clientX
    st.lastT = now
  }
  const onUp = () => {
    const st = state.current
    st.dragging = false
    st.velocity = Math.max(-420, Math.min(420, st.velocity))
    st.idleAt = performance.now() + 2500
  }
  const onKey = (e) => {
    if (e.key !== 'ArrowLeft' && e.key !== 'ArrowRight') return
    e.preventDefault()
    const st = state.current
    st.velocity += e.key === 'ArrowLeft' ? -150 : 150
    st.idleAt = performance.now() + 2500
  }

  return (
    <div
      className={`arch ${className}`}
      role="img"
      tabIndex={0}
      aria-label="Mâchoire en 3D, canine supérieure en or. Faites glisser ou utilisez les flèches pour la faire tourner."
      onPointerDown={onDown}
      onPointerMove={onMove}
      onPointerUp={onUp}
      onPointerCancel={onUp}
      onKeyDown={onKey}
    >
      <svg width="0" height="0" className="arch__defs" aria-hidden>
        <defs>
          {/* Le trait s'efface vers la pointe des racines (en haut du dessin). */}
          {[
            [gid, '#d3c0a0'],
            [`${gid}-gold`, '#d8b26c'],
          ].map(([id, color]) => (
            <linearGradient key={id} id={id} x1="0" y1="0" x2="0" y2="1">
              <stop offset="0" stopColor={color} stopOpacity="0.04" />
              <stop offset="0.45" stopColor={color} stopOpacity="0.75" />
              <stop offset="1" stopColor={color} stopOpacity="1" />
            </linearGradient>
          ))}
        </defs>
      </svg>
      <div className="arch__stage">
        <div className="arch__float">
          <div className="arch__spin" ref={spin}>
            {TEETH.map((t, i) => {
              const gold = isGold(t)
              const vx = -t.cw / 2 - 0.6
              const vy = -t.rl - 0.6
              const vw = t.cw + 1.2
              const vh = t.rl + t.ch + 1.6
              // Mâchoire du haut : couronne en bas ; mâchoire du bas : dessin retourné, couronne en haut.
              const lift = t.jaw === 'upper' ? -(t.ch + 0.4) : t.ch + 0.4
              return (
                <svg
                  key={i}
                  ref={(el) => (els.current[i] = el)}
                  className={`arch__tooth ${gold ? 'is-gold' : ''}`}
                  viewBox={`${f(vx)} ${f(vy)} ${f(vw)} ${f(vh)}`}
                  width={vw * S}
                  height={vh * S}
                  style={{
                    left: vx * S,
                    top: vy * S,
                    transformOrigin: `${-vx * S}px ${-vy * S}px`,
                    transform: `translate3d(${f(t.x * S)}px, ${f(lift * S)}px, ${f((t.z - CZ) * S)}px) rotateY(${f(t.yaw)}deg)${
                      t.jaw === 'lower' ? ' scaleY(-1)' : ''
                    }`,
                  }}
                >
                  <path d={t.outline} className="arch__outline" stroke={`url(#${gid}${gold ? '-gold' : ''})`} />
                  <path d={t.collet} className="arch__line" />
                  <path d={t.lobes} className="arch__line arch__line--soft" />
                </svg>
              )
            })}
          </div>
        </div>
        <span className="arch__shadow" />
      </div>
    </div>
  )
}

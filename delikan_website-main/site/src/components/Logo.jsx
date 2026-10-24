// Logo du cabinet redessiné en vectoriel (fidèle à logo-cabinet-delikan.png) :
// ovale double trait or sable, « iD » en Bodoni, le point du i est une dent.

export const LOGO_COLORS = { gold: '#b9a07e', ink: '#45403a', grey: '#8a8580' }

export const TOOTH_PATH =
  'M4 0C1.5 0 0 2 0 5c0 3 1 4.5 1.6 8 .5 3 .8 8 2.4 8 1.5 0 1.6-4 2.3-6.2.4-1.2.9-1.8 1.7-1.8s1.3.6 1.7 1.8c.7 2.2.8 6.2 2.3 6.2 1.6 0 1.9-5 2.4-8C15 9.5 16 8 16 5c0-3-1.5-5-4-5-1.7 0-2.6.8-4 .8S5.7 0 4 0z'

// Monogramme seul (ovale + iD), centré sur (0, 0), environ 236 × 270 unités.
export function MarkShapes({ ink = LOGO_COLORS.ink, gold = LOGO_COLORS.gold, ovals = true, className }) {
  return (
    <g className={className}>
      {ovals && (
        <>
          <ellipse className="mark__oval" rx="116" ry="133" fill="none" stroke={gold} strokeWidth="2.6" pathLength="1" />
          <ellipse className="mark__oval mark__oval--inner" rx="108" ry="125" fill="none" stroke={gold} strokeWidth="1" pathLength="1" />
        </>
      )}
      <g className="mark__letters">
        <text
          x="-6"
          y="56"
          textAnchor="middle"
          fontFamily="'Bodoni Moda', Didot, Georgia, serif"
          fontSize="150"
          fill={ink}
          style={{ fontVariationSettings: "'opsz' 24" }}
        >
          <tspan dx="0">ı</tspan>
          <tspan>D</tspan>
        </text>
        <path className="mark__tooth" d={TOOTH_PATH} fill={gold} transform="translate(-63 -66) scale(1.35)" />
      </g>
    </g>
  )
}

// Logo complet (navigation, pied de page) : monogramme + CABINET / DELIKAN.
// Les lettres suivent la couleur du texte (currentColor) pour passer en clair dans les sections sombres.
export function Logo({ className = '' }) {
  return (
    <span className={`logo ${className}`}>
      <svg className="logo__mark" viewBox="-122 -139 244 278" aria-hidden>
        <MarkShapes ink="currentColor" />
      </svg>
      <span className="logo__text">
        <span className="logo__cabinet">Cabinet</span>
        <span className="logo__name">Delikan</span>
      </span>
    </span>
  )
}

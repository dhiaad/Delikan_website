import { useId } from 'react'

// Identité « Le Sceau » (branding/concepts/a-sceau.svg) : double cercle d'or, IBRAHIM DELIKAN en couronne,
// monogramme iD dont le point du i est une dent d'or, CABINET DENTAIRE au centre, CHIRURGIEN-DENTISTE en bas.

export const BRAND = { gold: '#c2a06b', ink: '#2e2925', ivory: '#f3ede4' }

export const TOOTH_PATH =
  'M4 0C1.5 0 0 2 0 5c0 3 1 4.5 1.6 8 .5 3 .8 8 2.4 8 1.5 0 1.6-4 2.3-6.2.4-1.2.9-1.8 1.7-1.8s1.3.6 1.7 1.8c.7 2.2.8 6.2 2.3 6.2 1.6 0 1.9-5 2.4-8C15 9.5 16 8 16 5c0-3-1.5-5-4-5-1.7 0-2.6.8-4 .8S5.7 0 4 0z'

const SERIF = "'Bodoni Moda', 'Bodoni MT', Didot, serif"

// Sceau complet, viewBox 256 × 256. `disc` : pastille noire pleine (sinon fond transparent).
// `compact` : sans les textes, pour les petites tailles (nav, favicon).
export function Seal({ disc = true, compact = false, mono, className = '', title }) {
  const id = useId().replace(/:/g, '')
  const gold = mono || BRAND.gold
  const ivory = mono || BRAND.ivory
  return (
    <svg
      className={`seal ${className}`}
      viewBox="0 0 256 256"
      role={title ? 'img' : undefined}
      aria-label={title}
      aria-hidden={title ? undefined : true}
    >
      <defs>
        <path id={`${id}-top`} d="M 30 128 A 98 98 0 0 1 226 128" />
        <path id={`${id}-bottom`} d="M 21 128 A 107 107 0 0 0 235 128" />
      </defs>
      {disc && <circle className="seal__disc" cx="128" cy="128" r="124" fill={BRAND.ink} />}
      <circle className="seal__ring" cx="128" cy="128" r="117" fill="none" stroke={gold} strokeWidth={compact ? 5 : 2.5} />
      {!compact && (
        <>
          <circle className="seal__ring seal__ring--inner" cx="128" cy="128" r="83" fill="none" stroke={gold} strokeWidth="0.8" />
          <g className="seal__words" fill={gold} fontFamily={SERIF} textAnchor="middle">
            <text fontSize="14" letterSpacing="5">
              <textPath href={`#${id}-top`} startOffset="50%">
                IBRAHIM DELIKAN
              </textPath>
            </text>
            <text fontSize="10.5" letterSpacing="3.4">
              <textPath href={`#${id}-bottom`} startOffset="50%">
                CHIRURGIEN-DENTISTE
              </textPath>
            </text>
            <circle cx="28" cy="128" r="2.2" />
            <circle cx="228" cy="128" r="2.2" />
          </g>
        </>
      )}
      <g className="seal__mono">
        <text
          x="137"
          y={compact ? 166 : 150}
          textAnchor="middle"
          fontFamily={SERIF}
          fontSize={compact ? 118 : 92}
          fill={ivory}
          style={{ fontVariationSettings: "'opsz' 28" }}
        >
          ıD
        </text>
        <path
          className="seal__tooth"
          d={TOOTH_PATH}
          fill={gold}
          transform={compact ? 'translate(78.4 76) scale(1.15)' : 'translate(91.3 79) scale(0.9)'}
        />
      </g>
      {!compact && (
        <g className="seal__sub" fill={gold}>
          <line x1="104" y1="165" x2="152" y2="165" stroke={gold} strokeWidth="0.8" />
          <text x="128" y="180" textAnchor="middle" fontFamily={SERIF} fontSize="7.6" letterSpacing="2.2">
            CABINET DENTAIRE
          </text>
        </g>
      )}
    </svg>
  )
}

// Logo de navigation : sceau complet + nom.
export function Logo({ className = '' }) {
  return (
    <span className={`logo ${className}`}>
      <Seal className="logo__mark" />
      <span className="logo__text">
        <span className="logo__name">Ibrahim Delikan</span>
        <span className="logo__cabinet">Chirurgien-dentiste</span>
      </span>
    </span>
  )
}

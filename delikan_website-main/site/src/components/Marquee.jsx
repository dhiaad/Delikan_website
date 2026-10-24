import { TOOTH_PATH } from './Logo'

const WORDS = ['Implantologie', 'Chirurgie orale', 'Greffe osseuse', 'Parodontologie', 'Prothèses sur implants', 'Soins de la famille']

// Bandeau qui défile en continu sous le premier écran (figé avec « réduire les animations »).
export default function Marquee() {
  const row = (hidden) => (
    <div className="marquee__row" aria-hidden={hidden || undefined}>
      {WORDS.map((w) => (
        <span className="marquee__item" key={w}>
          <span>{w}</span>
          <svg viewBox="0 0 16 21" width="12" height="16" aria-hidden>
            <path d={TOOTH_PATH} fill="currentColor" />
          </svg>
        </span>
      ))}
    </div>
  )
  return (
    <div className="marquee">
      <div className="marquee__track">
        {row(false)}
        {row(true)}
      </div>
    </div>
  )
}

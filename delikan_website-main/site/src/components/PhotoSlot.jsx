import { PHOTOS } from '../data'

const NAMES = Object.keys(PHOTOS)

// Cadre provisoire : décrit la photo à prendre (sujet, format, conseils) à l'endroit exact où elle ira.
export default function PhotoSlot({ name, className = '' }) {
  const p = PHOTOS[name]
  if (!p) return null
  const n = String(NAMES.indexOf(name) + 1).padStart(2, '0')

  return (
    <div className={`photo-slot ${className}`} role="img" aria-label={`Emplacement photo : ${p.title}`}>
      <div className="photo-slot__inner">
        <div className="photo-slot__top">
          <svg className="photo-slot__icon" viewBox="0 0 24 24" width="22" height="22" aria-hidden>
            <path
              d="M4 8.5A1.5 1.5 0 0 1 5.5 7h2.2l1.4-2h5.8l1.4 2h2.2A1.5 1.5 0 0 1 20 8.5v9a1.5 1.5 0 0 1-1.5 1.5h-13A1.5 1.5 0 0 1 4 17.5z"
              fill="none"
              stroke="currentColor"
              strokeWidth="1.2"
            />
            <circle cx="12" cy="12.8" r="3.4" fill="none" stroke="currentColor" strokeWidth="1.2" />
          </svg>
          <span className="photo-slot__kicker">Photo {n} à prendre</span>
          <span className="photo-slot__format">{p.format}</span>
        </div>
        <strong className="photo-slot__title">{p.title}</strong>
        <p className="photo-slot__brief">{p.brief}</p>
        {p.tips && (
          <ul className="photo-slot__tips">
            {p.tips.map((t) => (
              <li key={t}>{t}</li>
            ))}
          </ul>
        )}
      </div>
    </div>
  )
}

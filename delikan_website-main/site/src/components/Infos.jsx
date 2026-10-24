import { useEffect, useState } from 'react'
import { CABINET, HOURS, sectionIndex } from '../data'
import { Heading, Label, Fade } from './Heading'
import { Button } from './Button'
import { Calendar, Phone, Pin } from './Icons'
import MapConsent from './MapConsent'

export default function Infos() {
  // Calculé côté client pour toujours refléter le jour du visiteur. getDay() : 0 = dimanche.
  const [today, setToday] = useState(-1)
  useEffect(() => setToday((new Date().getDay() + 6) % 7), [])

  return (
    <section className="section infos" id="infos">
      <div className="container">
        <Label index={sectionIndex('infos')}>Infos pratiques</Label>
        <Heading className="h2 h2--xl">
          Nous trouver, <em>nous joindre.</em>
        </Heading>

        <div className="infos__grid">
          <Fade className="infos__col infos__booking">
            <h3 className="h3">Rendez-vous</h3>
            <p className="muted">
              Réservez en ligne en quelques clics, ou appelez le secrétariat. Les consultations se font uniquement sur
              rendez-vous.
            </p>
            <div className="infos__buttons">
              <Button href={CABINET.doctolib} external magnetic icon={<Calendar />}>
                Réserver sur Doctolib
              </Button>
              <Button href={CABINET.phoneHref} variant="line" icon={<Phone />}>
                {CABINET.phone}
              </Button>
            </div>
            <p className="infos__urgence">
              <strong>Urgence dentaire ?</strong> Appelez le cabinet aux heures d’ouverture. En dehors, composez le{' '}
              <a href="tel:15">15</a>.
            </p>
          </Fade>

          <Fade className="infos__col infos__hours" delay={0.25}>
            <h3 className="h3">Horaires</h3>
            <ul>
              {HOURS.map((h, i) => (
                <li key={h.day} className={i === today ? 'is-today' : ''}>
                  <span>
                    {h.day}
                    {i === today && <em>Aujourd’hui</em>}
                  </span>
                  <span className={h.time === 'Fermé' ? 'closed' : ''}>{h.time}</span>
                </li>
              ))}
            </ul>
          </Fade>

          <Fade className="infos__col infos__map" delay={0.35}>
            <div className="infos__mapframe">
              <MapConsent />
            </div>
            <a className="infos__address" href={CABINET.maps} target="_blank" rel="noreferrer">
              <Pin />
              <span>
                <strong>{CABINET.street}</strong>
                <span>{CABINET.city}</span>
              </span>
              <span className="infos__go">Itinéraire</span>
            </a>
          </Fade>
        </div>
      </div>
    </section>
  )
}

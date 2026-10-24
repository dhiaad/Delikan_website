import { useState } from 'react'
import { CABINET } from '../data'
import { linkProps } from '../router'

const KEY = 'delikan-carte-ok'

const accepted = () => {
  try {
    return localStorage.getItem(KEY) === '1'
  } catch {
    return false
  }
}

// Carte Google Maps chargée uniquement après accord du visiteur (recommandation CNIL sur les contenus tiers) :
// tant qu'il n'a pas cliqué, aucune requête ne part vers Google et aucun traceur n'est déposé.
export default function MapConsent() {
  const [ok, setOk] = useState(accepted)

  const accept = () => {
    try {
      localStorage.setItem(KEY, '1')
    } catch {
      /* stockage indisponible : la carte s'affiche pour cette visite seulement */
    }
    setOk(true)
  }

  if (ok) {
    return (
      <iframe title="Plan d’accès au cabinet" src={CABINET.mapsEmbed} loading="lazy" referrerPolicy="no-referrer-when-downgrade" />
    )
  }

  return (
    <div className="map-consent">
      <p className="map-consent__title">Plan d’accès</p>
      <p className="map-consent__text">
        La carte est fournie par Google Maps. En l’affichant, vous acceptez que Google dépose des cookies et reçoive votre
        adresse IP.{' '}
        <a href="https://policies.google.com/privacy?hl=fr" target="_blank" rel="noreferrer">
          Politique de Google
        </a>{' '}
        · <a {...linkProps('confidentialite')}>Notre politique de confidentialité</a>
      </p>
      <div className="map-consent__actions">
        <button type="button" className="btn btn--sm" onClick={accept}>
          Afficher la carte
        </button>
        <a className="map-consent__alt" href={CABINET.maps} target="_blank" rel="noreferrer">
          Ouvrir dans Google Maps ↗
        </a>
      </div>
    </div>
  )
}

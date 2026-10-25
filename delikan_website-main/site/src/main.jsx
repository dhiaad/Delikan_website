import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
// Polices hébergées avec le site (aucun appel à Google Fonts : pas de transfert d'adresse IP à un tiers).
import '@fontsource-variable/bodoni-moda/opsz.css'
import '@fontsource-variable/bodoni-moda/opsz-italic.css'
import '@fontsource/montserrat/latin-300.css'
import '@fontsource/montserrat/latin-400.css'
import '@fontsource/montserrat/latin-500.css'
import '@fontsource/montserrat/latin-600.css'
import './index.css'
import './theme.css'
import './pages.css'
import './flows.css'
import './polish.css'
import './arch.css'
import './legal.css'
import './details.css'
import App from './App.jsx'

createRoot(document.getElementById('root')).render(
  <StrictMode>
    <App />
  </StrictMode>,
)

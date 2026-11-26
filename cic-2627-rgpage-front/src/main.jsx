import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'

/* CSS import order: variables → animations → globals → utilities → sections → page */
import './assets/styles/variables.css'
import './assets/styles/animations.css'
import './assets/styles/globals.css'
import './assets/styles/utilities.css'
import './assets/styles/sections.css'
import './assets/styles/past-events.css'
import './assets/styles/departments-editorial.css'
import './assets/styles/workshop-network.css'
import './assets/styles/polish.css'
import './index.css'

import App from './App.jsx'

createRoot(document.getElementById('root')).render(
  <StrictMode>
    <App />
  </StrictMode>,
)

import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import './index.css'
import Request from './Request.jsx'

createRoot(document.getElementById('root')).render(
  <StrictMode>
    <Request />
  </StrictMode>,
)

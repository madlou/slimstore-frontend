import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import './index.css'
import App from './App.jsx'

document.addEventListener('touchmove', function (event) {
    if (event.scale !== 1) { event.preventDefault(); }
}, { passive: false });


createRoot(document.getElementById('root')).render(
    // <StrictMode>
    <App />
    // </StrictMode>,
)

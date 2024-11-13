import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import './index.css'
import App from './App.jsx'

function preventDefault(e) {
    e.preventDefault();
}
document.body.addEventListener('touchmove', preventDefault, { passive: false });
document.body.removeEventListener('touchmove', preventDefault);

createRoot(document.getElementById('root')).render(
    // <StrictMode>
    <App />
    // </StrictMode>,
)

import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
// import './index.css'
import App from './App.tsx'
import StarRating from './StarRating.tsx'

createRoot(document.getElementById('root')!).render(
  <StrictMode>
    {/* <App /> */}
    <StarRating maxRating={5} messages={["Terrible", "Bad", "Okay", "Good", "Amazing"]}/>
    {/* <StarRating maxRating={10} size={24} color="red"/> */}
  </StrictMode>,
)

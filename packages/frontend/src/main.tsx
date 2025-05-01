import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'

import { Routes, Route, HashRouter } from 'react-router-dom'

import { LoginForm } from "../routes/login"
import CalendarEvents from "../routes/calendar"

import './index.css'

createRoot(document.getElementById('root')!).render(
  <StrictMode>
    <HashRouter>
      <Routes>
        <Route path='/' element={<LoginForm/>}/>
        <Route path='/calendar' element={<CalendarEvents/>}/>
      </Routes>
    </HashRouter>
  </StrictMode>
)

import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'

import { Routes, Route, BrowserRouter } from 'react-router-dom'

import { LoginForm } from "../routes/login"
import CalendarEvents from "../routes/calendar"
import EventDay from "../routes/eventsDay"


import './index.css'

createRoot(document.getElementById('root')!).render(
  <StrictMode>
      <BrowserRouter>
        <Routes>
          <Route path='/' element={<LoginForm/>}/>
          <Route path='/Сalendar' element={<CalendarEvents/>}>
            <Route path='/Сalendar/:date' element={<EventDay/>}/>
          </Route>
        </Routes>
      </BrowserRouter>
  </StrictMode>
)

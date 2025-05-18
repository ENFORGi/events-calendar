import { StrictMode } from 'react';
import { createRoot } from 'react-dom/client';
import { Routes, Route, BrowserRouter } from 'react-router-dom';

import { LoginForm } from "../routes/login";

import CalendarEvents from "../routes/calendar";
import EventDay from "../routes/eventsDay";
import SubscribeEventsList from "../routes/subsribeEvents";
import SelectDay from "../routes/SelectDay"

import './index.css'

createRoot(document.getElementById('root')!).render(
  <StrictMode>
      <BrowserRouter>
        <Routes>
          <Route path='/' element={<LoginForm/>}/>
          <Route path='/Сalendar' element={<CalendarEvents/>}>
            <Route path='/Сalendar/:date' element={<EventDay/>}/>
            <Route path='/Сalendar/SelectDay/:date' element={<SelectDay/>}/>
            <Route path='/Сalendar/SubscribeEvents' element={<SubscribeEventsList/>}/>
          </Route>
        </Routes>
      </BrowserRouter>
  </StrictMode>
)

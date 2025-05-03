import { useState } from "react";

import { Outlet } from "react-router-dom";
import UserHeader from "../components/UserHeader";
import SelectedIVCList from "../components/ui/SelectedIVC"
import SelectedEventList from "../components/ui/SelectedEvents"
import LocaleCalendar from "../components/CalendarEvents";
import React from "react";


export default function CalendarEvents() {

  const [selectedIVC, setSelectedIVC] = useState("");

  const [selectedEvents, setSelectedEvents] = useState<string[]>([]);

  const [isOpen, setIsOpen] = useState(false);

  const [date, setDate] = useState<Date>(new Date());
  
  return (
    <div>
        { /* Header */ }
        <UserHeader onClick={setIsOpen}/>
        {
          isOpen && (
            <div className="flex flex-col w-auto">
              <LocaleCalendar onClick={setDate} onOpen={setIsOpen}/>
              <SelectedIVCList selectedIVC={selectedIVC} setSelectedIVC={setSelectedIVC} />
              <SelectedEventList selectedEvents={selectedEvents} setSelectedEvents={setSelectedEvents} />
            </div>
          )
        }
        { /* Main */ }
        <Outlet/>
    </div>
  );
}

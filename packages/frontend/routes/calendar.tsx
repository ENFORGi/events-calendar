import { useState } from "react";

import { Outlet, useSearchParams } from "react-router-dom";
import UserHeader from "../components/UserHeader";
import SelectedIVCList from "../components/SelectedIVC"
import SelectedEventList from "../components/SelectedEvents"
import LocaleCalendar from "../components/CalendarEvents";

export default function CalendarEvents() {

  const [selectedIVC, setSelectedIVC] = useState("");

  const [selectedEvents, setSelectedEvents] = useState<string[]>([]);

  const [isOpen, setIsOpen] = useState(false);

  // const [date, setDate] = useState<Date>(new Date());

  
  return (
    <div className="mt-2">
        { /* Header */ }
        <UserHeader onClick={setIsOpen}/>
        {
          isOpen && (
            <div className="flex flex-col w-auto mb-2">
              <LocaleCalendar onOpen={setIsOpen}/>
              <SelectedIVCList className="md-2" selectedIVC={selectedIVC} setSelectedIVC={setSelectedIVC} />
              <SelectedEventList selectedEvents={selectedEvents} setSelectedEvents={setSelectedEvents} />
            </div>
          )
        }
        { /* Main */ }
        <Outlet/>
    </div>
  );
}

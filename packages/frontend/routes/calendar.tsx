import { useState } from "react";

import { Outlet } from "react-router-dom";
import UserHeader from "../components/UserHeader";
import SelectedIVCList from "../components/SelectedIVC"
import SelectedEventList from "../components/SelectedEvents"
import LocaleCalendar from "../components/CalendarEvents";

export default function CalendarEvents() {

  const [selectedIVC, setSelectedIVC] = useState("");

  const [selectedEvents, setSelectedEvents] = useState<string[]>([]);

  const [isOpen, setIsOpen] = useState(false);
  
  return (
    <div className="mt-2">
        { /* Header */ }
        <UserHeader onClick={setIsOpen}/>
        {
          isOpen && (
            <div className="absolute mr-5">
              <div className="flex flex-col w-auto mb-2 bg-gray-700/15 p-2 rounded-2xl backdrop-blur-2xl">
                <LocaleCalendar/>
                <SelectedIVCList className="md-2" selectedIVC={selectedIVC} setSelectedIVC={setSelectedIVC} />
                <SelectedEventList selectedEvents={selectedEvents} setSelectedEvents={setSelectedEvents} />
              </div>
            </div>
          )
        }
        { /* Main */ }
        <Outlet/>
    </div>
  );
}

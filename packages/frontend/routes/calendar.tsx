import { useState } from "react";

import { Outlet, useSearchParams } from "react-router-dom";
import UserHeader from "../components/UserHeader";
import SelectedIVCList from "../components/SelectedIVC"
import SelectedEventList from "../components/SelectedEvents"
import LocaleCalendar from "../components/CalendarEvents";
import { Button } from "antd";

export default function CalendarEvents() {

  const [selectedIVC, setSelectedIVC] = useState("");

  const [selectedEvents, setSelectedEvents] = useState<string[]>([]);

  const [isOpen, setIsOpen] = useState(false);

  // const [date, setDate] = useState<Date>(new Date());

  const [searchParams, setSearchParams] = useSearchParams();

  const period = searchParams.get("period") || "";

  const updatePeriod = (newPeriod: "day" | "week" | "month") => {
    setSearchParams({period: newPeriod});
  }
  
  return (
    <div className="mt-2">
        { /* Header */ }
        <UserHeader onClick={setIsOpen}/>
        {
          isOpen && (
            <div className="flex flex-col w-auto mb-2">
              <LocaleCalendar onOpen={setIsOpen} period={period}/>
              <SelectedIVCList className="md-2" selectedIVC={selectedIVC} setSelectedIVC={setSelectedIVC} />
              <SelectedEventList className="md-2" selectedEvents={selectedEvents} setSelectedEvents={setSelectedEvents} />
              <div className="flex flex-row md-2">
                <div className="flex w-full">
                  <Button type={period === "day" ? "primary" : "default"} className="w-full" onClick={() => updatePeriod("day")}>День</Button>
                </div>
                <div className="flex w-full">
                  <Button type={period === "week" ? "primary" : "default"} className="w-full" onClick={() => updatePeriod("week")}>Неделя</Button>
                </div>
                <div className="flex w-full">
                  <Button type={period === "month" ? "primary" : "default"} className="w-full" onClick={() => updatePeriod("month")}>Месяц</Button>
                </div>
              </div>
            </div>
          )
        }
        { /* Main */ }
        <Outlet/>
    </div>
  );
}

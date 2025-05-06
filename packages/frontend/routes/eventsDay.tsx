import dayjs from "dayjs";
import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { getWeekDates } from "../scripts/getDateWeek";
import EventsWeek from "../components/ui/EventsWeek";
import React from "react";

export default function EventDay(){
    
    const { date } = useParams();

    if(!date) return;

    const [week, setWeek] = useState<Date[]>([]);

    const [startTime, setStartTime] = useState<string>("");

    const [endTime, setEndTime] = useState<string>("");

    useEffect(() => {
        setWeek(getWeekDates(dayjs(date).toDate()));
        // setStartTime(week[0].toLocaleDateString())
        // setEndTime(week[week.length - 1].toLocaleDateString());
    }, [date])

    return(
        <>
            <div className="flex flex-col justify-center items-start">
                <p className="text-xl">Сегодня: {new Date().toLocaleDateString()}</p>
                <p className="text-sm">Выбранная неделя: с {startTime} до {endTime}</p>
            </div>
            <EventsWeek weeks={week}/>
        </>
    )
}
import dayjs from "dayjs";
import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { getWeekDates } from "../scripts/getDateWeek";
import EventsWeek from "../components/ui/EventsWeek";

export default function EventDay(){
    
    const { date } = useParams();

    if(!date) return;

    const current = dayjs(date);
    
    const [start, setStar] = useState<dayjs.Dayjs>();

    const [selectedDay, setSelectedDay] = useState<Date>(new Date());

    const [week, setWeek] = useState<Date[]>([])

    const centerDayOfWeek: number = 3;

    useEffect(() => {
        setSelectedDay(dayjs(date).toDate());
        // setStar()
        // console.log("start: ", start.day());

        setWeek(getWeekDates(dayjs(date).toDate()));
    }, [date])

    

    return(
        <>
            <div>
                {selectedDay.toLocaleDateString()}
            </div>
            <EventsWeek weeks={week}/>
        </>
    )
}
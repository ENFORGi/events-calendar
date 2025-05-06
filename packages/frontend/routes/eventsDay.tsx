import dayjs from "dayjs";
import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { getWeekDates } from "../scripts/getDateWeek";
import EventsWeek from "../components/ui/EventsWeek";

export default function EventDay(){
    
    const { date } = useParams();

    if(!date) return;

    const [selectedDay, setSelectedDay] = useState<Date>(new Date());

    const [week, setWeek] = useState<Date[]>([])

    useEffect(() => {
        setSelectedDay(dayjs(date).toDate());

        setWeek(getWeekDates(dayjs(date).toDate()));
    }, [date])

    

    return(
        <>
            <div>
                Сегодня: {selectedDay.toLocaleDateString()}
            </div>
            <EventsWeek weeks={week}/>
        </>
    )
}
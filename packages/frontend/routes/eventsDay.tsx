import dayjs from "dayjs";

import { useEffect, useState } from "react";
import { useParams, useSearchParams } from "react-router-dom";

import { getWeekDates } from "../scripts/getDateWeek";
import { getMonthDates } from "../scripts/getDateMonth"

import EventsWeek from "../components/EventsWeek";
import { Spin } from "antd";

export default function EventDay(){
    
    dayjs.locale("ru");

    const { date } = useParams();

    const [searchParams] = useSearchParams();

    const period = searchParams.get("period") || "";

    if(!date) return;

    const [week, setWeek] = useState<Date[]>([]);

    useEffect(() => {
        if(period === "day"){
            const test: Date[] = [dayjs(date).toDate()];
            setWeek(test);
        }
        if(period === "week"){
            setWeek(getWeekDates(dayjs(date).toDate()));
        }
        if(period === "month"){
            const year = dayjs(date).toDate().getFullYear();
            const month = dayjs(date).toDate().getMonth();
            setWeek(getMonthDates(year, month));
        }
        console.log(period);
    }, [date, searchParams, period])

    return(
        <>
            <div className="flex flex-col justify-center items-start">
                {week.length > 0 ? (
                        <p>Выбранный период: с {week[0].toLocaleDateString()} до {week[week.length - 1].toLocaleDateString()}</p>
                    ) : (
                        <Spin/>
                    )}
            </div>
            <EventsWeek weeks={week}/>
        </>
    )
}
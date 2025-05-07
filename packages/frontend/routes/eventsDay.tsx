import dayjs from "dayjs";

import { useEffect, useState } from "react";
import { useParams, useSearchParams } from "react-router-dom";

import { getWeekDates } from "../scripts/getDateWeek";
import { getMonthDates } from "../scripts/getDateMonth"

import EventsWeek from "../components/ui/EventsWeek";
import { Spin } from "antd";

export default function EventDay(){
    
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
            console.log("year", year);
            const month = dayjs(date).toDate().getMonth();
            console.log("month", month);
            setWeek(getMonthDates(year, month));
        }
        console.log(period);
        // setStartTime(week[0].toLocaleDateString())
        // setEndTime(week[week.length - 1].toLocaleDateString());
    }, [date, searchParams, period])

    return(
        <>
            <div className="flex flex-col justify-center items-start">
                <p className="text-xl">Сегодня: {new Date().toLocaleDateString()}</p>
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
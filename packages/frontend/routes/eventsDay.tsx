import dayjs from "dayjs";

import { useEffect, useState } from "react";
import { useNavigate, useParams, useSearchParams } from "react-router-dom";

import { getWeekDates } from "../scripts/getDateWeek";
import { getMonthDates } from "../scripts/getDateMonth"

import EventsWeek from "../components/ui/EventsWeek";
import { Button, Spin } from "antd";
import React from "react";

export default function EventDay(){
    
    dayjs.locale("ru");

    const navigate = useNavigate();

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

    function getFullDateCurrent(): string{
        const firtSybmwol = dayjs(new Date()).format("dddd D MMMM YYYY г.")[0].toUpperCase();
        const res = dayjs(new Date()).format("dddd D MMMM YYYY г.").slice(1);
        return firtSybmwol + res;
    }

    return(
        <>
            <div className="flex flex-col justify-center items-start">
                <a className="cursor-pointer hover:underline hover:underline-offset-2" onClick={() => navigate(`/Сalendar/${new Date()}?period=day`)}>
                    <p className="text-xl">{getFullDateCurrent()}</p>
                </a>
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
import React from "react";
import { nameOfWeek } from "../../scripts/getDateWeek";

interface IPropsEventsWeek{
    weeks: Date[],
}

export default function EventsWeek({weeks}: IPropsEventsWeek) {
    return(
        weeks.map((item) => (
            <div className="flex flex-row items-center">
                <>
                    <div className={item.getDate() === new Date().getDate() ? "bg-red-500 m-2 p-2 rounded-xl" : "m-2 p-2 rounded-xl"}>
                        <p className="text-xl">{item.getDate()}</p>
                        <p className="text-xs">{nameOfWeek(item)}</p>
                    </div>
                    <div>
                        dsadadasa
                    </div>
                </>
            </div>
        ))
    )
}
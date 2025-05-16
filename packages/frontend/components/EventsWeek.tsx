import { nameOfWeek } from "../scripts/getDateWeek";
import '@ant-design/v5-patch-for-react-19';
import { useNavigate } from "react-router-dom";
import { PATHSELECTDAY } from "../scripts/constans/pathOrigin";

interface IPropsEventsWeek{
    weeks: Date[],
}

export default function EventsWeek({weeks}: IPropsEventsWeek) {

    const navigate = useNavigate();

    function onHandle(date: Date){
        console.log("Выбранный день недели: ", date);
        navigate(PATHSELECTDAY(date.toLocaleDateString()));
    }

    return(
        weeks.map((item) => (
            <div key={item.getDate()} className="flex flex-row items-center">
                <div className={item.toLocaleDateString() === new Date().toLocaleDateString() ? "bg-red-500 m-2 p-2 rounded-xl text-white font-semibold" : "m-2 p-2 rounded-xl"}>
                    <p className="text-xl">{item.getDate()}</p>
                    <p className="text-sm">{nameOfWeek(item)}</p>
                </div>
                <div onClick={() => onHandle(item)} className="cursor-pointer">
                    dsadsa
                </div>
            </div>
        ))
    )
}
import { useEffect, useState } from "react";

import { IEvents } from "../scripts/interfaces/IEvents";
import { useParams } from "react-router-dom";

import { Button } from 'antd';

import IconTransport from "../components/ui/IconTransport";
import IconCalendarToday from "../components/ui/IconCalendarToday";
import IconPaperClip from "../components/ui/IconPaperClip";

export default function SelectDay() {

    const { date } = useParams();
        
    const testEvents: IEvents = {
        id: 1,
        IdIVC: 1,
        Name: "Набор наставников",
        Description: "Приглашаем всех желающих принять участие в организованной прогулке на свежем воздухе, которая направлена на укрепление физического и психоэмоционального здоровья участников. Мероприятие будет проходить в расслабленной, непринужденной атмосфере с элементами легкой физической активности, дыхательных упражнений и возможности общения с другими участниками. В ходе прогулки будет предусмотрено несколько остановок для отдыха, общения и проведения коротких дыхательных практик. Участники смогут насладиться природой, отвлечься от повседневной рутины и улучшить общее самочувствие. Особое внимание будет уделено безопасности и комфорту: предусмотрены сопровождающие организаторы, медицинская поддержка при необходимости и рекомендации по одежде и обуви",
        Datestart: "13.05.2025",
        Dateend: "14.05.2025",
        Typeoc: false,
        Placeadress: "Парк им. Горького, набережная Москва-реки, г. Москва. Место сбора: у центрального входа в парк в 10:30.",
        Typeevents: "Оздоровительно-досуговое мероприятие на свежем воздухе"
    }

    const [events, setEvents] = useState<IEvents>(testEvents);

    useEffect(() => {

    const fetchData = async () => {
        //TODO: Попросить у @INFORG какой у базы будет адресс для фетча данных
        const resFetch = await fetch("", {
            method: "POST",
            headers: {
                "Content-Type": "application/json"
            },
            // { date: 13.05.2025 }
            body: JSON.stringify(date)
        });
        const data: IEvents = await resFetch.json();
        setEvents(data);
    }

    fetchData();

    }, [])

    return(
        <div>
            <h1 className="text-3xl text-left mb-1 rounded-2xl p-2 text-white bg-red-500">{events.Name}</h1>
            <div className="p-2">
                <div className="flex flex-row justify-around mb-2">
                    <div className="text-justify rounded-2xl m-2 p-2 bg-emerald-500/15 shadow-lg shadow-emerald-600/15">
                        <span>{events.Typeevents}</span>
                        <div className="flex justify-end mt-2 ">
                            <IconPaperClip width ={60} height={60} />
                        </div>
                    </div>
                    <div className="text-justify rounded-2xl m-2 p-2 bg-blue-500/15 shadow-lg shadow-blue-600/15">
                        <span className="mr-1">Дата проведения:</span>
                        <span className="text-base underline mr-2">{ events.Datestart }</span>
                        <div className="flex justify-end mt-2">
                            <IconCalendarToday width={60} height={60}/>
                        </div>
                    </div>
                    <div className="text-justify rounded-2xl m-2 p-2 bg-indigo-500/15 shadow-lg shadow-indigo-600/15">
                        <span className="mr-1">Место проведения: </span>
                        <span className="mb-2">{events.Placeadress}</span>
                        <div className="flex justify-end mb-2">
                            <IconTransport width={60} height={60}/>
                        </div>
                    </div>
                </div>
                <div className="text-xl text-justify bg-slate-400/20 rounded-2xl mb-2 p-2">
                    {events.Description}
                </div>
                <div className=" flex text-xl text-justify bg-slate-400/20 rounded-2xl p-2">
                    <div>
                        Картинки...
                    </div>
                </div>
                <div className="text-xl text-justify bg-slate-400/20 rounded-2xl p-2 mb-2">
                    Картинки...
                </div>
                <div>
                    <Button>Приду</Button>
                    <Button>Не приду</Button>
                </div>
            </div>
        </div>
    );
}
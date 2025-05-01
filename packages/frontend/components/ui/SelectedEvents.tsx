

import { Select, SelectProps } from "antd";
import { JSX, useEffect, useState } from "react";

interface IPropsSelectedEvents extends SelectProps<string[]>{
    setSelectedEvents: React.Dispatch<React.SetStateAction<string[]>>
    selectedEvents: string[],
}

interface IPropsEvents{
    label: JSX.Element,
    title: string,
    options: {
        label: JSX.Element,
        value: string
    }[]
}

export default function SelectedEventsList({setSelectedEvents, selectedEvents, ...props}: IPropsSelectedEvents){

    const [events, setEvents] = useState<IPropsEvents[]>([]);

    useEffect(() => {
            //TODO: Fetch запрос на ивенты с базы
            const fetchData = async () => {
                const options = [
                    {
                        label: <span>manager</span>,
                        title: 'manager',
                        options: [
                            { label: <span>Jack</span>, value: 'Jack' },
                            { label: <span>Lucy</span>, value: 'Lucy' },
                        ],
                    },
                    {
                        label: <span>engineer</span>,
                        title: 'engineer',
                        options: [
                          { label: <span>Chloe</span>, value: 'Chloe' },
                          { label: <span>Lucas</span>, value: 'Lucas' },
                        ],
                    },
                ]
                setEvents(options);
                console.log("localEvents: ", events);
                await setEvents(options)
            }
    
            fetchData();
    }, []);
    

    return (
        <Select
        {...props}
        mode="multiple"
        defaultValue={['gold', 'cyan']}
        style={{ width: '100%' }}
        options={events}
        onChange={setSelectedEvents}
        value={selectedEvents}
        />
    );
}
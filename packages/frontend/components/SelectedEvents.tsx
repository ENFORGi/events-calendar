

import {TreeSelect } from "antd";
import React from "react";
import { useEffect, useState } from "react";

interface IPropsSelectedEvents{
    setSelectedEvents: React.Dispatch<React.SetStateAction<string[]>>
    selectedEvents: string[],
}

interface IPropsEvents{
    title: string,
    value: string,
    key: string,
    children:{
        title: string,
        value: string,
        key: string
    }[]
}

export default function SelectedEventsList({setSelectedEvents, selectedEvents}: IPropsSelectedEvents){

    const { SHOW_PARENT } = TreeSelect;

    const [events, setEvents] = useState<IPropsEvents[]>([]);

    useEffect(() => {
            //TODO: Fetch запрос на ивенты с базы
            const fetchData = async () => {
                const options = [
                    {
                        title: 'Node1',
                        value: '1',
                        key: '1',
                        children: [
                        {
                            title: 'Child Node1',
                            value: '2',
                            key: '2',
                        },
                        ],
                    },
                    {
                        title: 'Node2',
                        value: '0-1',
                        key: '0-1',
                        children: [
                        {
                            title: 'Child Node3',
                            value: '0-1-0',
                            key: '0-1-0',
                        },
                        {
                            title: 'Child Node4',
                            value: '0-1-1',
                            key: '0-1-1',
                        },
                        {
                            title: 'Child Node5',
                            value: '0-1-2',
                            key: '0-1-2',
                        },
                        ],
                    },
                    ];
                setEvents(options);
                console.log("localEvents: ", events);
                await setEvents(options)
            }
    
            fetchData();
    }, []);
    

    const onChange = (newValue: string[]) => {
        console.log('onChange ', newValue);
        setSelectedEvents(newValue);
    };

    const tProps = {
        onChange,
        treeCheckable: true,
        showCheckedStrategy: SHOW_PARENT,
        style: {
            width: '100%',
        },
    };

    return (
        <TreeSelect
        value={selectedEvents}
        treeData={events}
        {...tProps}
        />
    );
}
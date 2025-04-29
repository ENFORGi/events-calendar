import { ivcArr } from "@/constants/ivc";

import { useEffect, useState } from "react";

import { View, StyleSheet, Text, useWindowDimensions, TouchableOpacity, Modal, Button} from "react-native";
import { Dropdown } from 'primereact/dropdown';
import { MultiSelect } from 'primereact/multiselect';

import { monthArr } from "@/constants/month";
import { main, stylesBody, stylesHeader } from "@/assets/styles/calendarPage";

interface IPropsListEvents{
    label: string,
    items: {
        label: string,
        value: string
    }[]
}
 
export default function CalendarEvents() {

    //TODO: Лучше использовать хук useState? Или делать отдельную переменную для хранения значения года?
    //const [currentYear, setCurrentYear] = useState(new Date(Date.now().valueOf()).getFullYear());

    const [selectedMonth, setSelectedMonth] = useState(() => {
        const formatDate = new Date().toLocaleDateString("ru-RU", {
            month: "long",
        });

        return `${formatDate[0].toUpperCase() + formatDate.slice(1)}, ${new Date().getFullYear()}`;
    });

    const [yearAndMonth, setYearAndMonth] = useState<string[]>([]);

    const [selectedIVC, setSelectedIVC] = useState(ivcArr[5]);

    const [events, setEvents] = useState<IPropsListEvents[]>([]);

    const [selectedEvent, setSelectedEvents] = useState(null);

    const { width } = useWindowDimensions();
    
    const isMobile = width < 600;
    
    const [isMenuOpen, setIsMenuOpen] = useState(false);

    useEffect(() => {
        setYearAndMonth(monthArr.map(item => {
            return `${item}, ${new Date(Date.now().valueOf()).getFullYear()}`;
        }));

        //TODO: Fetch запрос на ивенты с базы
        const localEvents = [
            {
                label: "волонтерство",
                items: [
                    { label: "донорство крови1", value: "донорство крови1" },
                    { label: "донорство крови2", value: "донорство крови2" },
                    { label: "донорство крови3", value: "донорство крови3" }
                ]
            },
        ];
        console.log(localEvents);
        setEvents(localEvents);
    }, []);


    const templateItem = (options: any) => {
        return (
            <View style={stylesHeader.items} >
                <Text>
                    {options}
                </Text>
            </View>
        )
    }

    const templateItemGroups = (options: any) => {
        return (
            <View style={stylesHeader.items} >
                <Text>
                {
                    options.label
                }
                </Text>
            </View>
        )
    }


    return(
        //Body
        <>
            <View style={main.container}>
                {/* бокове меню с разными фильматри  */}
                <View style={[{zIndex: 99}, {position: "absolute"}]}>
                {
                    isMobile && isMenuOpen && (
                        <View style={[{flex: 1}, {flexDirection: "column"}]}>
                            <View style={stylesHeader.mobileMenu}>
                                <Dropdown
                                    itemTemplate={templateItem}
                                    style={stylesHeader.dropdown} panelStyle={stylesHeader.dropdownPanel} 
                                    value={selectedMonth} 
                                    onChange={(e) => setSelectedMonth(e.value)} 
                                    options={yearAndMonth} 
                                    placeholder="Месяц, год" />

                                <Dropdown style={stylesHeader.dropdown} panelStyle={stylesHeader.dropdownPanel} 
                                    itemTemplate={templateItem}
                                    value={selectedIVC} 
                                    onChange={(e) => setSelectedIVC(e.value)} 
                                    options={ivcArr} placeholder="ИВЦ" />

                                <MultiSelect 
                                    value={selectedEvent}
                                    itemTemplate={templateItemGroups}
                                    options={events} 
                                    onChange={(e) => setSelectedEvents(e.value)} 
                                    optionLabel="label" 
                                    optionGroupLabel="label" 
                                    optionGroupChildren="items" 
                                    placeholder="Выбор мероприятия" 
                                    style={stylesHeader.dropdown} panelStyle={stylesHeader.dropdownPanel} />
                            </View>
                            <View>
                                <Button title="X" onPress={() => {setIsMenuOpen(false)}}>
                                    
                                </Button>
                            </View>
                        </View>
                    )
                }
                </View>
                {/* Header с текущем месяцем и фильтрами */}
                <View style={stylesHeader.container}>
                    <View style={stylesHeader.containerCurrentMonth}>
                        <View style={stylesHeader.containerDiff}>
                            <Text style={stylesHeader.textCurrentMonth}>{selectedMonth}</Text>
                        </View>
                        {
                            isMobile ? (
                                <View style={stylesHeader.mobileView}>
                                    <Button onPress={() => setIsMenuOpen(state => !state)} title="🖥"></Button>
                                </View>
                            ) : (
                                <View style={stylesHeader.containerDiffMenus}>
                                <Dropdown
                                    itemTemplate={templateItem}
                                    style={stylesHeader.dropdown} panelStyle={stylesHeader.dropdownPanel} 
                                    value={selectedMonth} 
                                    onChange={(e) => setSelectedMonth(e.value)} 
                                    options={yearAndMonth} 
                                    placeholder="Месяц, год" />
            
                                <Dropdown style={stylesHeader.dropdown} panelStyle={stylesHeader.dropdownPanel} 
                                    itemTemplate={templateItem}
                                    value={selectedIVC} 
                                    onChange={(e) => setSelectedIVC(e.value)} 
                                    options={ivcArr} placeholder="ИВЦ" />
            
                                <MultiSelect 
                                    value={selectedEvent}
                                    itemTemplate={templateItemGroups}
                                    options={events} 
                                    onChange={(e) => {
                                        setSelectedEvents(e.value);
                                    }} 
                                    optionLabel="label" 
                                    optionGroupLabel="label" 
                                    optionGroupChildren="items" 
                                    placeholder="Выбор мероприятия" 
                                    style={stylesHeader.dropdown} panelStyle={stylesHeader.dropdownPanel} />
                            </View>
                        )
                    }
                    </View>
                    <View style={stylesBody.containerCalendar}>
                        <Text>Hello wrold</Text>
                    </View>
                </View>
            </View>
        </>
    );
}
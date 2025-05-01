import { ivcArr } from "@/constants/ivc";

import { useEffect, useState } from "react";

import { View, Text, useWindowDimensions } from "react-native";
import { Dropdown } from 'primereact/dropdown';
import { MultiSelect } from "primereact/multiselect";

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

    const [selectedEvent, setSelectedEvents] = useState<string[]>([]);

    const { width } = useWindowDimensions();
    
    const isMobile = width < 600;
    
    const [isMenuOpen, setIsMenuOpen] = useState(false);

    useEffect(() => {
        setYearAndMonth(monthArr.map(item => {
            return `${item}, ${new Date(Date.now().valueOf()).getFullYear()}`;
        }));

        //TODO: Fetch запрос на ивенты с базы
        const fetchData = async () => {
            const localEvents: IPropsListEvents[] = [
                {
                    label: "волонтерство",
                    items: [
                        { label: "донорство крови1", value: "донорство крови1" },
                        { label: "донорство крови2", value: "донорство крови2" },
                        { label: "донорство крови3", value: "донорство крови3" }
                    ]
                },
                {
                    label: "спорт",
                    items: [
                        { label: "бег по стадиону", value: "бег по стадиону" },
                    ]
                }
            ];
            console.log("localEvents: ", localEvents);
            await setEvents(localEvents)
        }

        fetchData();
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
        <>
            <View style={main.container}>
                {/* body */}
                <View style={stylesHeader.container}>
                    {/* Header с текущем месяцем и фильтрами */}
                    <View style={[stylesHeader.containerCurrentMonth, {justifyContent: "center"}]}>
                        <View style={stylesHeader.containerDiff}>
                            <Text onPress={() => setIsMenuOpen(state => !state)} style={stylesHeader.textCurrentMonth}>{selectedMonth}</Text>
                            {
                                isMobile && (
                                    <Text onPress={() => setIsMenuOpen(state => !state)} style={{marginTop: 4}}>
                                        {
                                            isMenuOpen ? (
                                                <svg width="40" height="40" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                                                    <path d="M12 15L7 10H17L12 15Z" fill="#1D1B20"/>
                                                </svg>
                                            ) : (
                                                <svg width="40" height="40" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                                                    <path d="M7 14L12 9L17 14H7Z" fill="#1D1B20"/>
                                                </svg>

                                            )
                                        }
                                    </Text>
                                )
                            }
                        </View>
                        {
                            !isMobile && (
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
                                    value={selectedEvent || []}
                                    itemTemplate={templateItemGroups}
                                    options={events} 
                                    defaultValue={""}
                                    onChange={(e) => {
                                        setSelectedEvents(e.value);
                                    }} 
                                    optionLabel="label"
                                    optionGroupLabel="label" 
                                    optionGroupChildren="items"
                                    placeholder="Категория мероприятия" 
                                    style={stylesHeader.dropdown} panelStyle={stylesHeader.dropdownPanel} />
                                </View>
                        )
                    }
                    </View>
                    {/* main */}
                    <View>
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
                                        filter={false}
                                        onChange={(e) => {
                                            console.log("e.value: ", e.value);
                                            setSelectedEvents(e.value);
                                            console.log("selectedEvent: ", selectedEvent);
                                        }} 
                                        optionLabel="label" 
                                        optionGroupLabel="label" 
                                        optionGroupChildren="items" 
                                        placeholder="Категория мероприятия" 
                                        style={stylesHeader.dropdown} panelStyle={stylesHeader.dropdownPanel} />
                                </View>
                            </View>
                        )
                    }
                    </View>
                    <View style={stylesBody.containerCalendar}>
                        <Text>Hello wrold</Text>
                    </View>
                    {/* footer  */}
                    {/* <View style={stylesBody.containerCalendar}>
                        <Text>Hello wrold</Text>
                    </View> */}
                </View>
            </View>
        </>
    );
}
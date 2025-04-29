import { ivcArr } from "@/constants/ivc";

import { useEffect, useState } from "react";

import { View, StyleSheet, Text} from "react-native";
import { Dropdown } from 'primereact/dropdown';
import { MultiSelect } from 'primereact/multiselect';

import { monthArr } from "@/constants/month";

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

    const styles = StyleSheet.create({
        container: {
            flex: 1
        },
        containerCurrentMonth:{
            borderColor: "black",
            flex: 0.4,
            borderWidth: 1,
            marginLeft: 10,
            marginRight: 10,
        },
        containerDiff:{
            flex: 1,
            flexDirection: "row",
            justifyContent: "space-around",
            alignItems: "center"
        },
        textCurrentMonth: {
            fontSize: 24
        },

        dropdown: {
            width: 180,                     // фиксированная ширина поля :contentReference[oaicite:0]{index=0}  
            backgroundColor: '#FFFFFF',
            padding: 10,  
            borderWidth: 1,                 // рамка  
            borderColor: 'black',         // цвет рамки  
            borderRadius: 6,                // скругления углов  
            paddingVertical: 8,             // внутр. отступ по вертикали  
            paddingHorizontal: 12,          // внутр. отступ по горизонтали  
        },

        dropdownPanel: {                 // ограничиваем высоту списка :contentReference[oaicite:1]{index=1}               // включаем скролл  
            backgroundColor: '#FFFFFF',
            padding: 10,
            borderRadius: 6,
            marginTop: 4,
        },

        containerCalendar:{
            borderWidth: 1,
            flex: 2,
            borderColor: "black",
        }
    })


    return(
        <View style={styles.container}>
            <View style={styles.containerCurrentMonth}>
                <View style={styles.containerDiff}>
                    <Text style={styles.textCurrentMonth}>{selectedMonth}</Text>
                    <Dropdown 
                        style={styles.dropdown} panelStyle={styles.dropdownPanel} 
                        value={selectedMonth} 
                        onChange={(e) => setSelectedMonth(e.value)} 
                        options={yearAndMonth} 
                        placeholder="Месяц, год" />

                    <Dropdown style={styles.dropdown} panelStyle={styles.dropdownPanel} 
                        value={selectedIVC} 
                        onChange={(e) => setSelectedIVC(e.value)} 
                        options={ivcArr} placeholder="ИВЦ" />

                    <MultiSelect 
                        value={selectedEvent}
                        options={events} 
                        onChange={(e) => {
                            setSelectedEvents(e.value);
                        }} 
                        optionLabel="label" 
                        optionGroupLabel="label" 
                        optionGroupChildren="items" 
                        placeholder="Выбор мероприятия" 
                        style={styles.dropdown} panelStyle={styles.dropdownPanel} />
                </View>
            </View>
            <View style={styles.containerCalendar}>
                <Text>Hello wrold</Text>
            </View>
        </View>
    );
}
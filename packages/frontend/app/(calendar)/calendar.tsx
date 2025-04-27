import { ivcArr } from "@/constants/ivc";
import { useState } from "react";
import { View, StyleSheet, Text, FlatList} from "react-native";

export default function CalendarEvents() {

    const [currentDate, setCurrentDate] = useState(Date.now());

    const [date, setDate] = useState(() => {
        const formatDate = new Date(currentDate.valueOf()).toLocaleDateString("ru-RU", {
            month: "long",
            year: "numeric"
        });

        return formatDate[0].toUpperCase() + formatDate.slice(1);
    });

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
            justifyContent: "center"
        },
        textCurrentMonth: {
            fontSize: 24
        },


        containerCalendar:{
            borderWidth: 1,
            flex: 2,
            borderColor: "black",
        }
    })

    type ItemProps = {title: string};

    const Item = ({title}: ItemProps) => (
        <View>
            <Text>{title}</Text>
        </View>
    );

    return(
        <View style={styles.container}>
            <View style={styles.containerCurrentMonth}>
                <View>
                    <Text style={styles.textCurrentMonth}>{date}</Text>
                    {/* <FlatList data={ivcArr} renderItem={(ItemIn) => <Item title={ItemIn.item}/>}/> */}
                </View>
            </View>
            <View style={styles.containerCalendar}>
                <Text>Hello wrold</Text>
            </View>
        </View>
    );
}
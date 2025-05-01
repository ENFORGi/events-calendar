import { StyleSheet } from "react-native";

export const main = StyleSheet.create({
    container: {
        flex: 1,
        // borderWidth: 1,
        // borderColor: "red",
    }
})

export const stylesHeader = StyleSheet.create({
    container: {
        flex: 1,
        zIndex: 9
    },
    containerCurrentMonth:{
        //borderColor: "black",
        flex: 0.4,
        //borderWidth: 1,
        marginLeft: 10,
        marginRight: 10,
        flexDirection: "row",
    },
    containerDiff:{
        flex: 0.5,
        flexDirection: "row",
        justifyContent: "center",
        alignItems: "center"
    },
    containerDiffMenus:{
        flex: 2,
        flexDirection: "row",
        justifyContent: "space-around",
        alignItems: "center"
    },
    mobileMenu:{
        flex: 1,
        flexDirection: "row",
        padding: 10,
        backgroundColor: "white",
        borderRadius: 5,
        margin: 2
    },
    mobileView: {
        flex: 1,
        justifyContent: "center",
        alignItems: "center",
    },
    textCurrentMonth: {
        fontSize: 24,
        width: 170,
        marginLeft: 10
    },
    dropdown: {
        width: 180,                       
        backgroundColor: '#FFFFFF',
        padding: 10,  
        borderWidth: 1,                     
        borderRadius: 6,                  
        paddingVertical: 8,               
        paddingHorizontal: 12,
    },
    dropdownPanel: {  
        backgroundColor: '#FFFFFF',
        padding: 10,
        borderRadius: 6,
        marginTop: 4,
    },
    items:{
        padding: 4,
        margin: 2,
    }
});

export const stylesBody = StyleSheet.create({
    containerCalendar:{
        //borderWidth: 1,
        flex: 2,
        borderColor: "black",
    }
})
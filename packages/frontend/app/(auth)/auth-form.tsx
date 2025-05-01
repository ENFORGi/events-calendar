import { useState } from "react";
import { Button, GestureResponderEvent, StyleSheet, Text, TextInput, View } from "react-native";

interface IPropsAuthForm{
    navigation: any
}

export default function authForm({navigation}: IPropsAuthForm){

    const [mail, setMail] = useState("");

    const [name, setName] = useState("");

    const [succesMessage, setSuccesMessage] = useState("");

    const [errorMessage, setErrorMessage] = useState("");

    const handleSend = (e: GestureResponderEvent) => {
        e.preventDefault();

        setSuccesMessage("");
        
        setErrorMessage("");
        
        if(!name){
            setErrorMessage(`Поле ${name} не должны быть пустыми!`);
            return;
        }

        if(!mail.includes("@")){
            setErrorMessage("Почта должна содержать знак '\@ '\ ");
            return;
        }
        
        const body = JSON.stringify({
            mail,
            name
        });
        //TODO: PUT || POST запрос к базе
        setSuccesMessage("Вход успешно произведен!");
        localStorage.setItem("user", body);
        console.log(body);
        setTimeout(() => {
            navigation.navigate("Calendar");
        }, 300)
        return;
    }

    const styles = StyleSheet.create({
        container: {
            flex: 1,
            alignItems: "center",
            justifyContent: "center",
        },
        form: {
            width: "40%",
            minWidth: "40%",
        },
        label:{
            fontSize: 17,
            marginBottom: 10
        },
        input: {
            borderWidth: 1,
            borderColor: '#ccc',
            borderRadius: 4,
            padding: 10,
            marginBottom: 12,
            width: "100%",
        },
        info: {
            padding: 10,
            marginBottom: 12,
            borderRadius: 4,
        },
        success: {
            backgroundColor: "#10b981",
            opacity: 1200,
            padding: 10,
            borderRadius: 4,
            minWidth: "40%",
        },
        successText: {
            color: "#065f46",
        },
        error: {
            backgroundColor: "#ef4444",
            opacity: 1200,
            padding: 10,
            borderRadius: 4,
            minWidth: "40%",
        },
        errorText: {
            color: "#450a0a",
        },
    })

    return(
        <View style={styles.container}>
            <View style={styles.form}>
                <Text>Почта</Text>
                <TextInput style={[styles.input, mail ? {color: "black"} : {color: "grey"}]} value={mail} onChangeText={text => {setMail(text)}} placeholder="example@mail.ru"></TextInput>
                <Text>ФИО</Text>
                <TextInput style={[styles.input, name ? {color: "black"} : {color: "grey"}]} value = {name} onChangeText={text => {setName(text)}} placeholder="Пугач Савва Евгенеьвич"></TextInput>
                    <View style={styles.info}>
                    {
                            !!succesMessage && (
                                <View style={styles.success}>
                                    <Text style={styles.successText}>{succesMessage}</Text>
                                </View>
                                )
                            }
                            {
                                !!errorMessage && (
                                    <View style={styles.error}>
                                         <Text style={styles.errorText}>{errorMessage}</Text>
                                    </View>
                                )
                            }
                    </View>
                <Button title="Войти" onPress={handleSend}/>
            </View>
        </View>
    );
}
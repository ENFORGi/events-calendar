import { FormEvent, useState } from "react";
import { Button } from "react-native";

interface IUser {
    mail: string,
    name: string
}

export default function authForm(){

    const [formData, setDataForm] = useState<IUser>({
        mail: "",
        name: ""
    });

    const handleChangeMail = (e: React.ChangeEvent<HTMLInputElement>) => {
        setDataForm({...formData, mail: e.target.value})
    }

    const handleChangeName = (e: React.ChangeEvent<HTMLInputElement>) => {
        setDataForm({...formData, name: e.target.value})
    }

    const handleSend = (e: React.MouseEvent<HTMLButtonElement, MouseEvent>) => {
        e.preventDefault();
        const body = JSON.stringify(formData);
        localStorage.setItem("user", body);
        console.log(body);
        //TODO: PUT || POST запрос к базе
    }

    return(
        <div>
            <form>
                <label>Почта</label>
                <input value={formData.mail} onChange={handleChangeMail} placeholder="Почта"></input>
                <br/>
                <label>ФИО</label>
                <input value = {formData.name} onChange={handleChangeName} placeholder="ФИО"></input>
                <br/>
                <button type="submit" onClick={handleSend}>Войти</button>
            </form>
        </div>
    );
}
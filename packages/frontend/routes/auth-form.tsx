import { useState } from "react";

interface IUser {
    mail: string,
    name: string
}

export default function authForm(){

    const [formData, setDataForm] = useState<IUser>();

    return(
        <div style={}>
            <form>
                <label>Почта</label>
                <input onChange={() => {}}></input>
                <br/>
                <label>ФИО</label>
                <input onChange={() => {}}></input>
            </form>
        </div>
    );
}
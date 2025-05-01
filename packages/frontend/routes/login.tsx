import React from "react";
import { useState } from "react";

import MessageSucces from "../components/ui/messageSucces"
import MessageError from "../components/ui/messageError"

import { isStrictValidEmail } from "../scripts/validateEmail"

import { useNavigate } from "react-router-dom"

interface IUser {
    mail: string,
    name: string
}

export function LoginForm(){

    const navigate = useNavigate();

    const [formData, setDataForm] = useState<IUser>({
        mail: "",
        name: ""
    });

    const [succesMessage, setSuccesMessage] = useState("");

    const [errorMessage, setErrorMessage] = useState("");

    const handleChangeMail = (e: React.ChangeEvent<HTMLInputElement>) => {
        setDataForm({...formData, mail: e.target.value})
    }

    const handleChangeName = (e: React.ChangeEvent<HTMLInputElement>) => {
        setDataForm({...formData, name: e.target.value})
    }

    const handleSend = (e: React.MouseEvent<HTMLButtonElement, MouseEvent>) => {
        e.preventDefault();

        setErrorMessage("");

        setSuccesMessage("");

        // console.log(succesMessage, errorMessage);

        if(isStrictValidEmail(formData.mail)){
            setErrorMessage("Почта введена не правильно!");
            return;
        }

        if(!formData.name){
            setErrorMessage(`Поле ${formData.name} не должно быть пустым!`);
            return;
        }

        if(formData.name.length < 6){
            setErrorMessage(`Поле ФИО должно иметь минимум 6 символов`);
            return;
        }

        const body = JSON.stringify(formData);
        localStorage.setItem("user", body);
        console.log(body);
        //TODO: PUT || POST запрос к базе

        setSuccesMessage("Успешнный вход");

        navigate("/calendar");

    }

    return(
        <div className="flex flex-col">
            <form>
                <label>Почта</label>
                <input className= "flex h-9 w-full rounded-md border border-input px-3 py-1 text-base shadow-sm mb-3" value={formData.mail} onChange={handleChangeMail} placeholder="example@mail.ru"></input>
                <label>ФИО</label>
                <input className= "flex h-9 w-full rounded-md border border-input px-3 py-1 text-base shadow-sm mb-3" value = {formData.name} onChange={handleChangeName} placeholder="Шульгин Степа Сергеевич"></input>
                <MessageSucces message={succesMessage} />
                <MessageError message={errorMessage} />
                <button className="p-2 w-full rounded-md border" type="submit" onClick={handleSend}>Войти</button>
            </form>
        </div>
    );
}
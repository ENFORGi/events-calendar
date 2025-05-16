import { IUser } from "./interfaces/IUser"

export function GetUser(){

    const userParse = localStorage.getItem("user");

    //Так нельзя делать!!
    const user: IUser = JSON.parse(userParse as string);

    return user;
}

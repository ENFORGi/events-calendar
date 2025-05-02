
interface IUser{
    name: string,
    mail: string | undefined
}

export function GetUser(){
    const userParse = localStorage.getItem("user");

    if(!userParse){
        return undefined;
    }

    const user: IUser = JSON.parse(userParse);

    return user;
}

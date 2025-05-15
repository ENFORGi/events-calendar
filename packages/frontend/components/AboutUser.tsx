import { GetUser } from "../scripts/users";

export default function AboutUser(){
    
    const user = GetUser();

    function getUsers(): string {
        const arrayUser = user?.name.split(" ");
        const firstName = arrayUser[0]; //0 - Фамилия
        const name = arrayUser[1]; // 1 - Имя
        const lastName = arrayUser[2]; //2 - Отчество
        return `${firstName} ${name[0]}.${lastName[0]}.`; //0 - первые буквы имени и отчества
    }

    function getFirstSymbol(): string {
        const arrayFullName = user?.name.split(" ");
        const firstName = arrayFullName[0]; // 0 - Фамилия
        const name = arrayFullName[1]; // 1 - Имя
        
        return `${firstName[0]}${name[0]}`; // 0 - Первая буква фамилии и имени
    }
    
    return (
        <div className="flex">
            <div className="flex justify-center items-center p-2 border rounded-2xl">
                {getFirstSymbol()}
            </div>
            <div className="flex flex-col items-start">
                <p className="ml-2 text-xl">
                    {getUsers()}
                </p>
                <p className="ml-2 text-sm">
                    {user.mail}
                </p>
            </div>
        </div>
    );
}
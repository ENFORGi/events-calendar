import { Popover } from "antd";
import { ComponentType } from "react";
import ButtonIcon from "./ButtonIcon";

import { IPropsIcon } from "../scripts/interfaces/IPropsIcon"


interface IPropsButtonPopover{
    Icon: ComponentType<IPropsIcon>,
    isOpen: boolean,
    setIsOpen: React.Dispatch<React.SetStateAction<boolean>>
}

export default function ButtonPopover({Icon, isOpen, setIsOpen}: IPropsButtonPopover){
    
    const handleOpenChange = () => {
        setIsOpen(prev => !prev);
    }

    const hide = () => {
        setIsOpen(prev => !prev);
    };

    return (
        <Popover
            //TODO: Сделать отдельный комопнент для контента уведомления
            content={<a onClick={hide}>Закрыть</a>}
            open={isOpen}
            title="Уведомления"
            onOpenChange={handleOpenChange}
            trigger="click"
            >
            <button className="cursor-pointer hover:bg-gray-700/15 p-2 hover:rounded-2xl mr-1">
                <Icon width={30} height={30}/>
            </button>
        </Popover>
    );
}
import React from "react";

import { IPropsIcon } from "../scripts/interfaces/IPropsIcon"


interface IPropsButtonIcon {
    Icon: React.ComponentType<IPropsIcon>,
    onClick?: () => void,
    width: number,
    height: number
}

export default function ButtonIcon({Icon, onClick, width, height}: IPropsButtonIcon) {
    return(
        <button type="button" onClick={onClick} className="cursor-pointer hover:bg-gray-700/15 p-2 hover:rounded-2xl mr-1">
            <Icon width={width} height={height}></Icon>
        </button>
    );
}